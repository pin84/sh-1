<template>
  <view class="home-page-wrapper">
    <uni-nav-bar backgroundColor="rgb(58, 58, 58)">
      <view v-if="!isLogin" style="text-align: center; margin: 0 auto"
        ><i class="indexlogo"></i
      ></view>
      <view v-if="isLogin" style="text-align: center; margin: 0 auto">
        <i class="iconfont icon-qiandai text-yellow"></i>
        <span class="text-white">{{ balance }}</span>
      </view>
      <view v-if="!isLogin" slot="left" @click="registClick"
        ><span class="text-white">注册</span></view
      >
      <view v-if="!isLogin" slot="right" @click="loginClick"
        ><span class="text-white">登陆</span></view
      >
      <view v-if="isLogin" slot="right" @click="navigationBarButtonClick"
        ><i
          class="iconfont icon-menu"
          style="color: #ffffff; font-size: 24px"
        ></i
      >
	  </view>
	  <view v-if="isLogin" slot="left" @click="backHomeButtonClick"><i
	      class="iconfont icon-shouye"
	      style="color: #ffffff; font-size: 24px"
	    ></i
	  >
	  </view>
    </uni-nav-bar> 
    <template v-if="configData.img_ad">
      <!-- 图片广告 -->
      <diy-img-ad
        :value="configData.img_ad"
        @redirectTo="redirectTo"
      ></diy-img-ad>
    </template>
    <template v-if="configData.notice">
      <!-- 公告区 -->
      <diy-notice
        :value="configData.notice"
        @redirectTo="redirectTo"
      ></diy-notice>
    </template>
    <template v-if="auxiliaryBlankConfig.height > 0">
      <!-- 辅助隔断 -->
      <diy-auxiliary-blank :value="auxiliaryBlankConfig"></diy-auxiliary-blank>
    </template>
    <template v-if="configData.nav_hybrid">
      <!-- 图文导航 -->
      <diy-nav-hybrid
        :value="configData.nav_hybrid"
        @redirectTo="redirectTo"
      ></diy-nav-hybrid>
    </template>
    <template v-if="auxiliaryBlankConfig.height > 0">
      <!-- 辅助隔断 -->
      <diy-auxiliary-blank :value="auxiliaryBlankConfig"></diy-auxiliary-blank>
    </template>
    <!--猜你喜欢 groupType0 信用-->
    <template v-if="configData.guessLikeList">
      <view class="cu-bar bg-white">
        <view class="action">
          <text class="iconfont icon-shuxian text-orange"></text>
          猜你喜欢
        </view>
      </view>
      <scroll-view scroll-x class="bg-white nav" scroll-with-animation>
        <view class="flex justify-between padding-xs text-center">
          <block v-for="(item, index) in configData.guessLikeList" :key="index">
            <view @click="toGuessLike(item)" class="flex-direction">
              <view class="position-relative" style="width: 185rpx">
                <image
                  style="width: 100rpx; height: 100rpx"
                  :src="item.imgUrl"
                />
                <text v-if="item.groupType == 0" class="cu-tag floatbadge"
                  >信</text
                >
                <text
                  v-if="item.groupType == 1"
                  class="cu-tag floatbadge bg-green"
                  >官</text
                >
              </view>
              <view>
                <text class="text-xs">{{ item.gameName }}</text>
              </view>
              <view>
                <text class="text-xs text-gray">{{ item.isSys }}</text>
              </view>
            </view>
          </block>
        </view>
      </scroll-view>
    </template>
    <template v-if="auxiliaryBlankConfig.height > 0">
      <!-- 辅助隔断 -->
      <diy-auxiliary-blank :value="auxiliaryBlankConfig"></diy-auxiliary-blank>
    </template>
    <!--大厅-->
    <view v-if="gameList.length !== 0"
      ><GameList
        :gameList="gameList"
        :gameType="gameType"
        @showGameList="showGameList"
    /></view>

    <DrawerModalR
      :isShow="isShowRightDrawer"
      :balance="balance"
      @hideModal="isShowRightDrawer = false"
    />

    <view @touchmove.prevent.stop>
      <uni-popup
        ref="uniPopup"
        type="center"
        class="wap-floating"
        :maskClick="false"
      >
        <view class="image-wrap"
          ><image
            :src="$util.img(wapFloatData.nav_icon)"
            mode="widthFix"
            @click="navigatorOut(wapFloatData.nav_url)"
          ></image
        ></view>
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
              class="bg-gradual-orange text-xl padding-sm text-white text-bold"
              >平台公告</view
            >

            <scroll-view
              style="height: 450rpx"
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
                    <view v-if="item.textShow" class="item-content-text">{{
                      item.notice_content
                    }}</view>
                    <view v-if="item.imgShow"
                      ><image
                        class="item-content-img"
                        :src="item.mobile_img_url"
                        mode="widthFix"
                      ></image
                    ></view>
                  </view>

                  <view class="content-item-time">{{ item.create_time }}</view>
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
    <loading-cover ref="loadingCover"></loading-cover>
  </view>
</template>
<script>
import http from "common/js/http.js";
import DrawerModalR from "@/pages/commonPage/DrawerModalR";
import diyImgAd from "@/components/diy-img-ad/diy-img-ad.vue";
import loadingCover from "@/components/loading/loading.vue";
import GameList from "./GameList.vue";
export default {
  components: {
    GameList,
    DrawerModalR,
    diyImgAd,
    loadingCover,
  },
  mixins: [http],
  data() {
    return {
      gameList: [],
      gameType: 0,
      balance: "",
      configData: {},
      isShowRightDrawer: false,
      isLogin: false,
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
      auxiliaryBlankConfig: {
        height: 5,
        bg_color: "#f4f4f4",
      },
      goodListTitleConfig: {
        title_name:
          "推荐产品(" + uni.getStorageSync("shop_game_second") + "购物区)",
        subtitle_name: "",
        text_align: "2",
        text_color: "#333333",
        bg_color: "#ffffff",
        bg_img: "",
        padding: "10",
        whether_bold: "2",
        href: "",
      },
      goodsListConfig: {
        goods_source: 1,
        goods_limit_count: 20,
        goods_list_type: 2,
        goods_show_goods_name: 1,
        goods_show_goods_price: 1,
        goods_show_buy_button: 1,
        goods_buy_button_style: 1,
        goods_buy_button_src:
          "public/static/wapCustomTemplate/images/goods_buy_button_style1.png",
      },
      uid: 0,

      loading_flag: true,
      loading_status: "more",
      contentText: {
        contentdown: "上拉加载更多",
        contentrefresh: "正在加载...",
        contentnomore: "没有更多数据了",
      },

      isShowNoticeContentList: [],
    };
  },
  // onNavigationBarButtonTap(e) {
  // 	this.isShowRightDrawer = !this.isShowRightDrawer;
  // },

  //下拉刷新
  onPullDownRefresh() {
    this.getWapPageLayout();
  },
  onLoad(data) {
    this.getWapPageLayout();
    this.order_list_index = 0;
    this.page = 1;
    if (data.sid != undefined && data.sid != "") {
      uni.setStorageSync("sid", data.sid);
    }
  },

  onShow() {
    let token = uni.getStorageSync("token");
    if (token) {
      //if(this.isLogin==)
      this.isLogin = true;
      this.refreshUserInfo();
    }
    //this.cur_second_area = uni.getStorageSync('shop_game_second');
    //this.goodListTitleConfig.title_name = '推荐产品(' + this.cur_second_area + 'S 购物区)';
  },
  methods: {
    toGuessLike(item) {

      console.log(item)
      let id = item.linkUrl.split("=")[1];
      item.id = Number(id)

      
      
      this.$buyDataHandler.changeGame(item);
    },
    showGameList() {
      uni.pageScrollTo({
        scrollTop: 99999,
        duration: 100,
      });
    },
    refreshUserInfo() {
      this.sendRequest({
        url: "System.Member.memberInfo",
        success: (res) => {
          this.userInfo = res.data;
          this.balance = res.data.coin;
          uni.setStorageSync("userInfo", res.data);
        },
      });
    },
    registClick() {
      uni.navigateTo({
        url: "/pages/login/register/register",
      });
    },
    loginClick() {
      uni.navigateTo({
        url: "/pages/login/login/login",
      });
    },
    navigationBarButtonClick() {
      this.isShowRightDrawer = !this.isShowRightDrawer;
    },
	backHomeButtonClick() {
	  uni.switchTab({
	  	url:'/pages/index/index/index'
	  })
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
      // let currentWebview = this.page.$getAppWebview();
      // currentWebview.setTitleNViewButtonStyle(0, {
      //    text: "登陆"
      // });

      this.popupnotice.items = [];
      //1.获取页面配置参数
      this.sendRequest({
        url: "System.HomePage.getData",
        //data: { template_type: 'index', type: 2 },
        success: (res) => {
          this.configData = res.data;
          let { gameType0, gameType1 } = res.data;
          this.gameList.push(gameType1.gameCateList);
          this.gameList.push(gameType0.gameCateList);

          this.memberInfo = res.data.memberInfo;

          this.partTabData = res.data.orderList;
          if (
            res.data.popupNotice &&
            res.data.popupNotice.items !== undefined &&
            res.data.popupNotice.items.length > 0
          ) {
            // this.popupnotice = res.data.popupNotice;
            const arr = res.data.popupNotice.items;
            arr.forEach((item, index) => {
              if (item.notice_info_type == 0) {
                item.textShow = true;
                item.imgShow = false;
              } else if (item.notice_info_type == 1) {
                item.textShow = false;
                item.imgShow = true;
              }

              //item.isShow = false
              this.popupnotice.items.push(item);
            });

            this.$refs.noticePopup.open();
          }
          //let data = res.data;
          //this.noticeData = data.notice;
          uni.stopPullDownRefresh();
          if (this.$refs.loadingCover == undefined) return;
          this.$refs.loadingCover.hide();
        },
      });
    },
    timezoneRadioChange(e) {
      this.selectedRadioTimezone = e.target.value;
    },
    popupnoticeClose() {
      this.$refs.noticePopup.close();
    },
    timezoneConfirm() {
      if (this.selectedRadioTimezone != this.cur_second_area) {
        this.cur_second_area = this.selectedRadioTimezone;
        uni.setStorage({
          key: "shop_game_second",
          data: this.selectedRadioTimezone,
        });

        this.goodListTitleConfig.title_name =
          "推荐产品(" + this.cur_second_area + "购物区)";
      }
      this.$refs.timezonePopup.close();
    },
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
  },
  /**
   * 自定义分享内容
   * @param {Object} res
   */
  // onShareAppMessage(res) {
  // 	var path = '/pages/index/index/index';
  // 	if (this.uid) path += '?source_uid=' + this.uid;
  // 	return {
  // 		path: path,
  // 		success: res => {},
  // 		fail: res => {}
  // 	};
  // }
};
</script>

<style lang="scss" scoped>
@import "/common/css/bg.css";

.indexlogo {
  height: 48rpx;
  width: 110rpx;
  background: url(/static/images/2020/logo.png);
  background-size: cover;
  display: block;
}

.home-page-wrapper {
  height: 100%;
  overflow: hidden;
  background-color: #e4e4e4;
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
    height: 120rpx;
    line-height: 120rpx;
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
      width: 450upx;
      font-size: 32upx;
      height: 80upx;
      line-height: 80upx;
      color: #555;
    }

    .content-item-content {
      .item-content-text {
        width: 450upx;
        font-size: 28upx;
        line-height: 40upx;
        color: #666;
      }

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
  border-radius: 20rpx;
  width: 650rpx;
}

.goods-orders-load-more {
  width: 750upx;
  height: 120upx;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
