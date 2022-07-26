<template>
  <view class="bg_whrite">
    <view class="status_bar">
      <!-- 这里是虚拟的状态栏,为了在app里不遮挡顶部 -->
    </view>
    <view class="home-page-wrapper">
      <view class="nav-box">
        <nav-bar
          :isLogin="isLogin"
          :balance="balance"
          :username="username"
        ></nav-bar>
      </view>
      <view class="main-body">
        <template v-if="configData.img_ad">
          <!-- 图片广告 -->
          <diy-img-ad
            :value="configData.img_ad"
            @redirectTo="redirectTo"
          ></diy-img-ad>
        </template>

        <!-- 公告区 -->
        <template v-if="configData.notice">
          <diy-notice
            :value="configData.notice"
            @redirectTo="redirectTo"
          ></diy-notice>
        </template>

        <!-- <NoticeBar  /> -->
        <view class="components-box">
          <MerberInfo :isLogin="isLogin" 
          :balance="balance"
          :username="username" />
        </view>

        <view class="game-box">
          <GameOverview
            v-if="gameList.length"
            :gameList="gameList"
            @toGame="routerToGame"
          />
        </view>
        <view class="partners">
          <Partners />
        </view>


        <view @touchmove.prevent.stop>
          <uni-popup
            ref="uniPopup"
            type="center"
            class="wap-floating"
            :maskClick="false"
          >
            <view class="image-wrap">
              <image
                :src="$util.img(wapFloatData.nav_icon)"
                mode="widthFix"
                @click="navigatorOut(wapFloatData.nav_url)"
              ></image>
            </view>
            <text class="iconfont iconroundclose" @click="closeNum"></text>
          </uni-popup>
        </view>
        <view @touchmove.prevent.stop>
          <uni-popup
            ref="noticePopup"
            type="center"
            class="notice-floating"
            :maskClick="true"
          >
            <view class="noticePopupContent">
              <view v-if="popupnotice.items">
                <view
                  class="
                    bg-gradual-orange
                    text-xl
                    padding-sm
                    text-white text-bold
                  "
                  >平台公告</view
                >

                <scroll-view
                  style="height: 520rpx"
                  scroll-y="true"
                  show-scrollbar="true"
                >
                  <view class="notice-item-box">
                    <view
                      class="notice-item"
                      v-for="(item, index) in popupnotice.items"
                      :key="index"
                      @click="showNoticeDetail(index)"
                    >
                      <view class="content-item-title">{{
                        item.notice_title
                      }}</view>

                      <view v-show="showNoticeId == index">
                        <view v-if="item.textShow" class="item-content-text">
                          <view v-html="item.notice_content"></view>
                        </view>
                        <view v-if="item.imgShow">
                          <image
                            class="item-content-img"
                            :src="item.mobile_img_url"
                            mode="widthFix"
                          ></image>
                        </view>
                      </view>

                      <view class="content-item-time">{{
                        item.create_time
                      }}</view>
                    </view>
                  </view>
                </scroll-view>
              </view>
              <view
                class="padding-sm bg-gray solids-top"
                @click="popupnoticeClose()"
                ><text>关闭</text></view
              >
            </view>
          </uni-popup>
        </view>
        <view v-if="isH5" class="app-downlaod">
          <navigator url="/pages/index/app/app">
            <i class="iconfont icon-appxiazai" style="font-size: 62rpx"></i>
          </navigator>
        </view>
        <!-- <loading-cover ref="loadingCover"></loading-cover> -->
      </view>
    </view>
  </view>
</template>
<script>
import http from "@/common/js/http.js";
import diyImgAd from "@/components/diy-img-ad/diy-img-ad.vue";
import loadingCover from "@/components/loading/loading.vue";
import navBar from "@/components/ylc/goldnav.vue";
import NoticeBar from "@/pages/index/index/newApp/homePages/NoticeBar.vue";
import MerberInfo from "@/pages/index/index/newApp/homePages/MerberInfo.vue";
import GameOverview from "@/pages/index/index/newApp/homePages/GameOverview.vue";
import Partners from '@/pages/index/index/newApp/homePages/Partners.vue'
export default {
  components: {
    navBar,
    diyImgAd,
    loadingCover,
    NoticeBar,
    MerberInfo,
    GameOverview,
    Partners
  },
  mixins: [http],
  data() {
    return {
      getUserInfoDone: false,
      userInfo: {},
      isH5: false,
      gameList: [],
      gameType: 0,
      balance: "",
      configData: {},
      isShowRightDrawer: false,
      isLogin: false,
      username: "",
      //-------------
      isMenuDrawerShow: false,
      memberInfo: {},
      cur_second_area: 60,
      showNoticeId: 0, //默认显示弹出公告的第一条
      wapFloatData: "",
      templateData: [],
      noticeData: {},
      popupnotice: {},
      page: 1,
      loading_flag: true,
      loading_status: "more",
      contentText: {
        contentdown: "上拉加载更多",
        contentrefresh: "正在加载...",
        contentnomore: "没有更多数据了",
      },

      isShowNoticeContentList: [],
      categoryList: {},
      TabCur: "RMYX",
      updated: false,
 

    };
  },



  //下拉刷新
  onPullDownRefresh() {
    this.loadAndRefreshPage();
  },
  onLoad(data) {
     this.loadAndRefreshPage();
    this.order_list_index = 0;
    this.page = 1;
    if (data.sid != undefined && data.sid != "") {
      uni.setStorageSync("sid", data.sid);
    }
  },

  onShow() {
    let token = uni.getStorageSync("token");
    //console.log(token)
    if (token) {
      //if(this.isLogin==)
      //console.log("onshow:"+token);
      this.isLogin = true;
      this.refreshUserInfo();
    }
  },
  computed: {
    curList() {
      let _curList = this.categoryList[this.TabCur];
      return _curList.gameList;
    },
  },
  created() {
    //#ifdef APP-PLUS
    plus.screen.lockOrientation("portrait-primary"); //锁定
    //#endif
    
  },
  methods: {
	  loadAndRefreshPage(){
		this.getWapPageLayout();
		this.getSubCategory();  
	  },
    toGuessLike(item) {
      //console.log(item)
      let id = item.linkUrl.split("=")[1];
      item.id = Number(id);
      this.$buyDataHandler.changeGame(item);
    },
    showGameList() {
      uni.pageScrollTo({
        scrollTop: 99999,
        duration: 100,
      });
    },
    refreshUserInfo() {
      this.getUserInfoDone = false;
      this.sendRequest({
        url: "System.Member.memberInfo",
        success: (res) => {
          this.userInfo = res.data;
          this.balance = res.data.coin;
          this.username = res.data.username;
          uni.setStorageSync("userInfo", res.data);
          this.getUserInfoDone = true;
        },
      });
    },

    navigationBarButtonClick() {
      this.isShowRightDrawer = !this.isShowRightDrawer;
    },
    showNoticeDetail(index) {
      this.showNoticeId = index;
    },

    closeDrawer(e) {
      if (e === "left") {
        this.showLeft = false;
      } else {
        this.showRight = false;
      }
    },
    drawerChange(status) {
      this.isMenuDrawerShow = status;
    },
    getWapPageLayout() {
      // #ifdef H5
      this.isH5 = true;
      // #endif
      this.popupnotice.items = [];

      //1.获取页面配置参数
      this.sendRequest({
        // url: "System.HomePage.getYLCData",
        url: "System.HomePage.getBlueData",
        success: (res) => {
          // res.data.notice.bg_color = '#fff'
          this.configData = res.data;

          console.log(res);

          // return

          this.memberInfo = res.data.memberInfo;

          this.partTabData = res.data.orderList;
          if (
            res.data.popupNotice &&
            res.data.popupNotice.items !== undefined &&
            res.data.popupNotice.items.length > 0
          ) {
            const arr = res.data.popupNotice.items;
            arr.forEach((item, index) => {
              if (item.notice_info_type == 0) {
                item.textShow = true;
                item.imgShow = false;
              } else if (item.notice_info_type == 1) {
                item.textShow = false;
                item.imgShow = true;
              }
              this.popupnotice.items.push(item);
            });

            this.$refs.noticePopup.open();
          }
          uni.stopPullDownRefresh();
          if (this.$refs.loadingCover == undefined) return;
          this.$refs.loadingCover.hide();
        },
        fail: (res) => {
			//console.log("netware error");
          //this.$refs.loadingCover.hide();
          // #ifdef H5
          uni.showToast({
            title: "网络连接超时，刷新页面重试！",
            icon: "none",
          });
          // #endif
          //#ifdef APP-PLUS
uni.showModal({
	title: '当前网络超时',
	content: '检查网络。点击确定重新加载页面',
	showCancel: false,
	success: showResult => {
		 this.loadAndRefreshPage();
	}
}); 
          //#endif
          //this.getWapPageLayout();
        },
      });
    },
    // timezoneRadioChange(e) {
    //   this.selectedRadioTimezone = e.target.value;
    // },
    popupnoticeClose() {
      this.$refs.noticePopup.close();
    },
    // timezoneConfirm() {
    // 	if (this.selectedRadioTimezone != this.cur_second_area) {
    // 		this.cur_second_area = this.selectedRadioTimezone;
    // 		uni.setStorage({
    // 			key: "shop_game_second",
    // 			data: this.selectedRadioTimezone,
    // 		});

    // 		this.goodListTitleConfig.title_name =
    // 			"推荐产品(" + this.cur_second_area + "购物区)";
    // 	}
    // 	this.$refs.timezonePopup.close();
    // },
    /**
     * 获取首页浮层信息
     */
    getWapFloating() {
      this.sendRequest({
        url: "System.Shop.appletFloating",
        success: (res) => {
          let data = res.data;
          this.wapFloatData = data;
          this.wapFloatData.show_type =
            this.wapFloatData.show_type == undefined
              ? "once"
              : this.wapFloatData.show_type;
          this.wapFloatData.show_num =
            this.wapFloatData.show_num == undefined
              ? 1
              : this.wapFloatData.show_num;
          if (this.wapFloatData.nav_icon && this.wapFloatData.is_show == 1) {
            this.refreshFloating();
          }
        },
      });
    },
    refreshFloating() {
      let that = this;
      if (
        uni.getStorageSync("index_wap_floating_layer") != null &&
        uni.getStorageSync("index_wap_floating_layer") != ""
      ) {
        var wap_floating_cookie = JSON.parse(
          uni.getStorageSync("index_wap_floating_layer")
        );
        if (this.wapFloatData.nav_icon != wap_floating_cookie.imgPath) {
          this.$refs.uniPopup.open();
        } else {
          if (
            this.wapFloatData.show_type == "many" &&
            wap_floating_cookie.closeNum < this.wapFloatData.show_num
          ) {
            this.$refs.uniPopup.open();
          }
        }
      } else {
        this.$refs.uniPopup.open();
      }
    },
    closeNum() {
      this.$refs.uniPopup.close();
      var closeNum = 1;
      if (
        uni.getStorageSync("index_wap_floating_layer") != null &&
        uni.getStorageSync("index_wap_floating_layer") != ""
      ) {
        var wap_floating_cookie = JSON.parse(
          uni.getStorageSync("index_wap_floating_layer")
        );
        if (this.wapFloatData.nav_icon == wap_floating_cookie.imgPath) {
          closeNum = wap_floating_cookie.closeNum + 1;
        }
      }
      if (this.wapFloatData.show_type == "many") {
        uni.setStorageSync(
          "index_wap_floating_layer",
          JSON.stringify({
            imgPath: this.wapFloatData.nav_icon,
            closeNum: closeNum,
          })
        );
      } else {
        uni.setStorageSync(
          "index_wap_floating_layer",
          JSON.stringify({
            imgPath: this.wapFloatData.nav_icon,
            closeNum: closeNum,
          })
        );
      }
    },
    //自定义模板的跳转链接
    redirectTo(link) {

    console.log(link);
      if (link == null || link == "") return;
      var uniapp_template = link.uniapp_template;
      if (uniapp_template == undefined || !uniapp_template) {
        this.$util.redirectTo(link);
      } else {
        if (uniapp_template.url.indexOf("http") != -1) {
          this.$util.redirectTo(
            "/pages/index/web/web?src=" + uniapp_template.url
          );
        } else if (uniapp_template.is_tabbar == 1) {
          this.$util.redirectTo(uniapp_template.url, {}, "tabbar");
        } else {
          this.$util.redirectTo(uniapp_template.url);
        }
      }
    },
    navigatorOut(src) {
      this.$util.redirectTo("/pages/index/web/web", {
        src,
      });
    },
    // tap 分类导航
    tapSelect(item) {
      this.TabCur = item.channelCode;
    },
    // 获取子分类导航
    getSubCategory() {
      this.sendRequest({
        // url: "System.HomePage.getYLCNavInfoList",
        url: "System.HomePage.getBlueNavInfoList",
        success: (res) => {
          console.log(res.data);
          this.gameList = Object.values(res.data);

          this.categoryList = res.data;
          // console.log(res.data);
          this.updated = true;
          //console.log(this.categoryList)
        },
      });
    },
    // 链接跳转
    routerToGame(v) {
      let url = v.urlLink;
      if (this.isLogin == true) {
        //console.log(url)
        uni.navigateTo({
          url: url,
          //url:'/pages/games/comprehensiveGames/CQ9/index?gameId=166&channelId=DZYX'
        });
      } else if (v.isMaintain) {
        this.$util.showToast({
          title: "此游戏暂时维护中，请等会再试...",
        });
      } else {
        let goback = encodeURIComponent(url);
        uni.navigateTo({
          url: "/pages/login/login/login?goback=" + goback,
        });
      }
    },
  },
};
</script>
<style lang="scss">
.app-downlaod uni-navigator {
  padding: 0px;
  color: #bf7000;
  background-color: transparent;
  margin: 0px 0;
}
</style>
<style lang="scss" scoped>
@import "/common/css/bg.css";
.bg_black {
  background-color: #fff;
}
.bg_whrite {
  background-color: #fff;
}
.app-downlaod {
  font-size: 20rpx;
  position: fixed;
  right: 20rpx;
  bottom: 150rpx;
  width: 100rpx;
  height: 100rpx;
  line-height: 100rpx;
  border-radius: 50%;
  text-align: center;
  display: block;
  color: #bf7000;
  background-color: #fff5d1;
  font-size: 62rpx;
  box-shadow: inset 0 0 0 1px rgba(168, 112, 0, 0.2),
    0 2px 6px rgba(0, 0, 0, 0.4);
  opacity: 0.95;
}

.indexlogo {
  flex: 0 0 48rpx;
  height: 48rpx;
  width: 110rpx;
  background: url(/static/images/2020/logo.png);
  background-size: cover;
  display: block;
}

.home-page-wrapper {
  height: calc(100vh - 92rpx);
  overflow: hidden;
  overflow: hidden;
  background-color: #f9f9fa;
  display: flex;
  flex-direction: column;
  .nav-box {
    // flex: 0 0 86rpx;
  }
  .main-body {
    height: 100%;
    overflow: scroll;
  }
  .components-box {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    margin-top: 10rpx;
  }
  .game-box {
    height: 950rpx;
    overflow: hidden;
    margin-top: 10rpx;
  }
}

navigator {
  padding: 20rpx;
  color: #fff;
  background: $base-color;
  margin: 20rpx 0;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

.timezone-select-info {
  .header {
    height: 100rpx;
    line-height: 100rpx;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .main {
    font-size: 24rpx;
    line-height: 40rpx;
    //padding-right: 40rpx;
    //height: 460rpx;
  }

  .footer {
    margin: 0;
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    //width: 720rpx;
    color: #fff;
    border-radius: 0;
  }
}

.notice-item-box {
  padding: 0 16upx 20upx;

  .notice-item {
    border: 1upx solid #ddd;
    border-radius: 16upx;
    margin: 16upx 0;
    padding-bottom: 10upx;

    .content-item-time {
      font-size: 26upx;
      height: 50upx;
      line-height: 50upx;
      color: #999;
    }

    .content-item-title {
      width: 550upx;
      font-size: 28upx;
      height: 80upx;
      font-weight: bold;
      line-height: 80upx;
      color: #2d2d2d;
    }

    .content-item-content {
      .item-content-img {
        width: 450upx;
        padding: 0 10upx;

        image {
          width: 430upx;
        }
      }

      .content-hidden {
        width: 0;
        height: 0;
        display: none;
      }
    }
  }
}

.popnotice-title {
  background-color: #fd7986;
  height: 80rpx;
  line-height: 80rpx;
  font-weight: bold;
  font-size: 30rpx;
  color: #fff;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
}

.notice-item {
  text-align: left;
  padding-left: 15rpx;
  font-size: 26rpx;
}

.item-content-text {
  font-size: 24rpx;
  color: #666666;
  width: 98%;
  line-height: 40upx;
  color: #666;
  height: 250rpx;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.item-content-img {
  width: 500rpx;
  border-radius: 10rpx;
}

.close-notice-footer {
  height: 70rpx;
  line-height: 70rpx;
  border-top: 2rpx #f5f5f5 solid;
  text-align: center;
  color: #666;
  box-shadow: 0rpx -2rpx 5rpx rgba(0, 0, 0, 0.1);
}
</style>
<style scoped lang="scss">
.diy-notice {
  background-color: #fff;
}

.notice {
  background-color: #000;
}

.category-list {
  .nav {
    background: #1d1d1d;
  }

  .flex-sub {
    padding: 5px 0;
    font-size: 12px;
    span {
      display: block;
      .iconfont {
        font-size: 68rpx;
      }
    }

    .hotico {
      color: #d25410;
    }

    .dzyxico {
      color: #ffe400;
    }
    .fbdico {
      color: #39c1b5;
    }
    .cpyxico {
      color: #aa0000;
    }
    .qpyxico {
      color: #d85250;
    }

    .byyxico {
      color: #8441c9;
    }
    .tyjjico {
      color: #6edc7c;
    }
    .jjyxico {
      color: #d4237a;
    }
    .otherico {
      color: #d85250;
    }

    .zrspico {
      color: #003bff;
    }
  }

  .cu-item {
    margin: 0;
    //min-width: 60px;
    min-width: 89rpx;
    color: #fff;
    height: auto;
    line-height: 50rpx;
    height: 140rpx;
  }

  .cur {
    color: #fff;
    position: relative;
    border-bottom: 0 none;
    background-color: #3e3e3e;
  }

  .cur::after {
    content: "";
    position: absolute;
    left: calc(50% - 6px);
    bottom: 0;
    width: 0;
    height: 0;
    border-width: 0 6px 6px;
    border-style: solid;
    border-color: transparent transparent #d25410;
  }
}

.sub-category {
  flex-wrap: wrap;
  background-color: #000;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;

  .flex-item {
    position: relative;
    width: calc(((100% - 1px * 2) / 2));
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    padding: 10rpx 0;
  }

  .flex-box {
    background-color: #1d1d1d;
    border-radius: 20rpx;
    margin: 0 10rpx;
    padding: 8rpx 0;

    uni-view {
      color: #fff;
    }
  }

  .subimg {
    width: 100rpx;
    height: 100rpx;
    margin: 0 auto;
  }
}
</style>
<style scoped>
.cu-item:nth-child(3n) .subgames {
  margin-left: -200%;
}

.cu-item:nth-child(2n) .subgames {
  margin-left: -100%;
}

.wap-floating >>> .uni-popup__wrapper.uni-custom .uni-popup__wrapper-box {
  background: none !important;
  height: 500px;
}

.notice-floating >>> .uni-popup__wrapper.uni-custom .uni-popup__wrapper-box {
  border-radius: 15rpx;
  width: 620rpx;
  max-width: 90%;
}

.goods-orders-load-more {
  width: 750upx;
  height: 120upx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>