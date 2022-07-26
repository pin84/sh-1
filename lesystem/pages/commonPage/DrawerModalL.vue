<template>
  <view
    class="cu-modal drawer-modal justify-start"
    :class="isShow ? 'show' : ''"
    @tap="hideModal"
  >
    <view
      class="cu-dialog basis-lg"
      @tap.stop=""
      :style="[
        { top: CustomBar + 'px', height: 'calc(100vh - ' + CustomBar + 'px)' },
      ]"
    >
      <view class="cu-list menu text-left">
        <view class="cu-header">
          <view style="width: 100%">
            <view style="text-align: center">
              <span class="usericon"><i class="iconfont icon-yonghu"></i></span>
              <span class="welinfo" v-if="!isLogin">Welcome</span>
              <view v-else class="userbox">
                <span class="name">{{ username }}</span>
                <span class="balance">{{ balance }}</span>
              </view>
            </view>
            <view v-if="!isLogin">
              <view
                class="search-form radius flex align-center padding-sm margin-top-df bg"
              >
                <i
                  class="iconfont icon-yonghu text-gray text-bold margin-right-sm"
                ></i>
                <input
                  v-model="submitData.userName"
                  placeholder-class="text-gray text-sub"
                  placeholder="请输入账号"
                  name="input"
                  class="text-white text-df flex-sub"
                />
              </view>

              <view
                v-if="isShowPwdType"
                class="search-form radius flex align-center padding-sm margin-top-df bg"
              >
                <i
                  class="iconfont icon-mima text-gray text-bold margin-right-sm"
                ></i>
                <input
                  v-model="submitData.userPwd"
                  placeholder-class="text-gray text-sub"
                  placeholder="请输入密码"
                  name="input"
                  type="password"
                  class="text-white text-df flex-sub"
                />
                <i
                  @click="changePwdType"
                  class="iconfont icon-yanjing text-gray text-bold margin-right-sm"
                ></i>
              </view>

              <view
                v-else
                class="search-form radius flex align-center padding-sm margin-top-df bg"
              >
                <i
                  class="iconfont icon-mima text-gray text-bold margin-right-sm"
                ></i>
                <input
                  v-model="submitData.userPwd"
                  placeholder-class="text-gray text-sub"
                  placeholder="请输入密码"
                  name="input"
                  class="text-white text-df flex-sub"
                />
                <i
                  @click="changePwdType"
                  class="iconfont icon-yan text-bold text-white margin-right-sm"
                ></i>
              </view>

              <view
                v-if="threeExemption === 1"
                class="flex align-center margin-top-df"
              >
                <view
                  class="search-form radius flex align-center padding-sm margin-top-xs bg"
                >
                  <i
                    class="iconfont icon-yanzhengma1 text-gray text-bold margin-right-sm"
                  ></i>
                  <input
                    v-model="submitData.userYZM"
                    placeholder-class="text-gray text-sub"
                    placeholder="请输入验证码"
                    name="input"
                    class="text-white text-df flex-sub"
                  />
                </view>

								<view class="vercode margin-top-sm margin-left-sm">
									<imgcode width="80" height="22" ref="imgcode"></imgcode>
								</view>
							</view>
							<view class="margin-top-xl" @click="login"><button class="btn text-white bg-red">登录</button>
							</view>
						</view>
						<view v-else>
							<view class="margin-top-xl" @click="toggleAccount"><button class="btn text-white bg-red">登出</button>
							</view>
						</view>
					</view>

				</view>
				<view class="cu-list menu">
					<view class="cu-item">
						<view class="content solid-right" v-for="(item, idx) in moneyOptions" :key="idx">
							<navigator :url="item.url">
								<text class="iconfont  margin sefticon text-yellow" :class="item.icon"></text>
								<text class="">{{ item.name }}</text>
							</navigator>
						</view>
					</view>
					<view v-show="item.isShow" v-for="(item, index) in textList" :key="index">
						<view class="cu-item arrow" @click="showSubmenuOrUrl(index)">
							<view class="content">
								<text class="iconfont margin sefticon text-red"
									:class="[item.icon, item.iconColor]"></text>
								<text class="">{{ item.title }}</text>
							</view>
						</view>
						<view v-for="(sub,n) in item.subMenu"  :key="n">
							<view v-show="showShowMenuId == index" @click="gotosubmenuUrl(sub.url)"
								class="solid-bottom padding-xs">
								<text class="iconfont margin sefticon icon-dian margin-left-xxxl"></text>
								<text class="">{{ sub.title }}</text>
							</view>
						</view>
					</view>
					<!-- <view class="cu-item arrow" @click="toggleAccount">
						<view class="content">
							<text class="iconfont margin sefticon icon-tuichu text-gray"></text>
							<text class="">退出登录</text>
						</view>
					</view> -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import http from "common/js/http.js";
export default {
  mixins: [http],
  props: {
    isShow: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
	balance: {
	  type: String,
	  default: () => {
	    return '';
	  },
	},
	username: {
	  type: String,
	  default: () => {
	    return '';
	  },
	},
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isLogin() {
      if (this.isLogin) {
        this.initData();
      }
    },
  },
  data() {
    return {
      userInfo: {},
      isAgent: false,
      // balance: "",
      // username: "",
      showShowMenuId: -1,
      moneyOptions: [
        {
          name: "充值",
          icon: "icon-chongzhi",
          url: "/pages/member/recharge/recharge",
        },
        {
          name: "提现",
          icon: "icon-tixian",
          url: "/pages/member/pickGoods/index/index",
        },
      ],
      textList: [
        {
          title: "投注记录",
          icon: "icon-gouwuche2",
          iconColor: "text-red",
          isShow: true,
          url: "/pages/member/index/gameRecord/GameRecord",
        },
        {
          title: "报表管理",
          icon: "icon-04",
          iconColor: "text-green",
          isShow: true,
          url: "/pages/member/index/userAccount/UserAccount",
        },
        {
          title: "账户管理",
          icon: "icon-zhanghuguanli",
          iconColor: "text-mauve",
          isShow: true,
          url: "",
          subMenu: [
            {
              title: "个人总览",
              icon: "icon-dailishang",
              iconColor: "text-yellow",
              url: "/pages/member/personalOverview/index",
            },
            {
              title: "修改密码",
              icon: "icon-dailishang",
              iconColor: "text-yellow",
              url: "/pages/member/editPassword/edit/edit",
            },
            {
              title: "银行卡管理",
              icon: "icon-dailishang",
              iconColor: "text-yellow",
              url: "/pages/member/bankCard/bankCardList/bankCardList",
            },
            {
              title: "资料修改",
              icon: "icon-dailishang",
              iconColor: "text-yellow",
              url: "/pages/member/user/userDetail/userDetail",
            },
            {
              title: "彩种信息",
              icon: "icon-dailishang",
              iconColor: "text-yellow",
              url: "/pages/member/index/gameInfor/gameInfor",
            },
            {
              title: "USDT地址管理",
              icon: "icon-dailishang",
              iconColor: "text-yellow",
              url: "/pages/member/usdtAddr/index",
            },
          ],
        },
        {
          title: "代理管理",
          icon: "icon-dailishang",
          iconColor: "text-yellow",
          isShow: this.isAgent,
          subMenu: [
            {
              title: "团队总览",
              icon: "icon-dailishang",
              iconColor: "text-yellow",
              url: "/pages/member/agency/index",
            },
            {
              title: "用户列表",
              icon: "icon-dailishang",
              iconColor: "text-yellow",
              url: "/pages/member/memberList/index",
            },
            {
              title: "注册管理",
              icon: "icon-dailishang",
              iconColor: "text-yellow",
              url: "/pages/member/user/registerManage/registerManage",
            },
            {
              title: "推广注册",
              icon: "icon-dailishang",
              iconColor: "text-yellow",
              url: "/pages/member/user/registerManage/registerManage?action=1",
            },
          ],
        },
        {
          title: "站内短信",
          icon: "icon-mail",
          iconColor: "text-blue",
          isShow: true,
          url: "/pages/member/message/message",
        },
      ],
      CustomBar: this.CustomBar,
      submitData: {
        userName: "",
        userPwd: "",
        userYZM: "",
        remember: false,
      },
      threeExemption: 1,
      hasMobileIndexRegister: 1,
      isShowPwdType: true,
      //isLogin: false,
    };
  },
  beforeCreate() {
    let hierarchy = uni.getStorageSync("hierarchy");
    //console.log(hierarchy);
    if (hierarchy != undefined && hierarchy != "" && hierarchy > 0) {
      this.isAgent = true;
    }
  },
  // onShow(){
  // 	let token = uni.getStorageSync("token");
  // 	if (token) {
  // 		this.isLogin = true;
  // 		this.initData();
  // 	}
  // },
  created() {
    this.initData();
    this.getLoginConfig();
    // let token = uni.getStorageSync("token");
    // if (token) {
    // 	this.isLogin = true;
    // }
    
  },
  methods: {
    initData() {
	  //console.log("start")
      this.userInfo = uni.getStorageSync("userInfo");
      // this.balance = this.userInfo.coin;
      // this.username = this.userInfo.username;
    },
    refreshUserInfo() {
      this.balance = "正在刷新...";
      this.sendRequest({
        url: "System.Member.memberInfo",
        success: (res) => {
          this.userInfo = res.data;
          uni.setStorageSync("userInfo", res.data);
          this.balance = res.data.coin;
        },
      });
    },
    gotosubmenuUrl(url) {
      if (url != undefined && url != "") {
        uni.navigateTo({
          url: url,
        });
      }
    },
    showSubmenuOrUrl(id) {
      let menu = this.textList[id];
      if (this.showShowMenuId == id) {
        this.showShowMenuId = -1;
      } else {
        this.showShowMenuId = id;
      }

      if (menu.subMenu == undefined || menu.subMenu == "") {
        //console.log(menu.url);
        let gotourl = menu.url;
        if (gotourl != undefined && gotourl != "") {
          uni.navigateTo({
            url: gotourl,
          });
        }
      }
    },
    hideModal() {
      this.$emit("hideModal");
    },
    toggleAccount() {
      this.hideModal();
      uni.showModal({
        title: "注意！",
        content: "确定退出当前账号吗？",
        success: (res) => {
          if (res.confirm) {
            uni.removeStorageSync("token");
            uni.removeStorageSync("userInfo");
            uni.removeStorageSync("hierarchy");
            uni.redirectTo({
              url: "/pages/login/login/login",
            });
          } else if (res.cancel) {
          }
        },
      });
    },
    // login start
    getLoginConfig() {
      this.sendRequest({
        url: "System.Login.getLoginConfig",
        method: "GET",
        success: (res) => {
          let { hasMobileIndexRegister, threeExemption } = res.data;
          this.hasMobileIndexRegister = hasMobileIndexRegister;
          this.threeExemption = threeExemption;
        },
      });
    },
    backHome() {
      uni.switchTab({
        url: "/pages/index/index/index",
      });
    },
    isShowRegister() {},
    changePwdType() {
      this.isShowPwdType = !this.isShowPwdType;
    },
    loginClick() {
      let rule = [];
      if (this.submitData.userName == "") {
        this.$util.showToast({
          title: "用户名不能为空",
        });
        return false;
      }
      if (this.submitData.userPwd == "") {
        this.$util.showToast({
          title: "密码不能为空",
        });
        return false;
      }
      if (this.submitData.userPwd.length < 6) {
        this.$util.showToast({
          title: "密码不能少于6个字符",
        });
        return false;
      }
      if (this.threeExemption === 1) {
        if (this.submitData.userYZM == "") {
          this.$util.showToast({
            title: "请填写验证码",
          });
          return false;
        }
      }
      if (this.submitData.userYZM != "") {
        rule.push({
          name: "userYZM",
          checkType: "custom",
          errorMsg: "验证码错误",
          validate: (value) => {
            return this.$refs.imgcode.checkCode(value);
          },
        });
        var checkRes = validate.check(this.submitData, rule);
        if (checkRes) {
          return true;
        } else {
          this.$util.showToast({
            title: validate.error,
          });
          return false;
        }
      } else {
        return true;
      }
      return true;
    },
    appLogin: function () {
      var self = this;
      uni.showLoading({
        mask: true,
        title: "正在登录···",
        complete: () => {},
      });
      uni.getProvider({
        service: "oauth",
        success: function (res) {
          //支持微信、qq和微博等
          if (~res.provider.indexOf("weixin")) {
            uni.login({
              provider: "weixin",
              success: function (loginRes) {
                // 获取用户信息
                uni.getUserInfo({
                  provider: "weixin",
                  success: function (infoRes) {
                    //登录注册
                    //self.$util.showToast({ title: infoRes.userInfo.nickName});
                    self.sendRequest({
                      url: "System.Login.appWxLogin",
                      data: {
                        openid: infoRes.userInfo.openId,
                        avatarUrl: infoRes.userInfo.avatarUrl,
                        nickname: infoRes.userInfo.nickName,
                        unionId: infoRes.userInfo.unionId,
                        sid: uni.getStorageSync("sid"),
                      },
                      success: (res) => {
                        if (res.code == 1) {
                          uni.setStorage({
                            key: "token",
                            data: res.data.token,
                          });
                          uni.removeStorage({
                            key: "sid",
                          });
                          uni.removeStorage({
                            key: "register_validate_token",
                          });
                          self.$util.redirectTo(
                            "/pages/member/index/index",
                            {},
                            "tabbar"
                          );
                        } else {
                          self.$util.showToast({
                            title: res.message,
                          });
                        }
                      },
                    });
                    //结束登录注册
                  },
                });
              },
            });
          }
        },
      });
    },
    login() {
      //登录接口
      // ceshi  密码 go123456

      if (!this.loginClick()) {
        return;
      }

      let d = {
        username: this.submitData.userName,
        password: this.submitData.userPwd,
        vcode: this.submitData.userYZM,
        remember: this.submitData.remember,
      };

      this.sendRequest({
        url: "System.Login.login",
        method: "POST",
        data: d,
        success: (res) => {
          if (res.data.code < 0) {
            let msg = res.data.message;
            this.$util.showToast({
              title: msg,
            });

            let flag = Number(msg.substring(4, 5));

            if (flag > 2) {
              this.getLoginConfig();
            }
          }

          if (res.data.code == 1) {
            this.$util.showToast({
              title: "登录成功",
            });
            uni.setStorage({
              key: "token",
              data: res.data.token,
            });

            //setTimeout(() => {
            this.$util.redirectTo(
              "/pages/member/index/index",
              {},
              "tabbar",
              "reLaunch"
            );
            //}, 1500);
          }
        },

        fail: (err) => {
          console.log(err);
        },
      });
    },
    owchatLogin() {
      if (this.$util.isWeiXin()) {
        this.sendRequest({
          url: "System.WchatPublic.getCode",
          data: {
            redirect_uri: location.href,
          },
          success: (res) => {
            if (res.data.code == 0) {
              location.href = res.data.url;
            } else {
              this.$util.showToast({
                title: res.data.message,
                success: () => {
                  setTimeout(() => {
                    this.$util.redirectTo("/pages/login/login/login", {
                      goback: this.href,
                    });
                  }, 1000);
                },
              });
            }
          },
        });
      }
    },

    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      let url = window.location.href.split("#")[0];
      let search = url.split("?")[1];
      if (search) {
        var r = search.substr(0).match(reg);
        if (r !== null) return unescape(r[2]);
        return null;
      } else {
        return null;
      }
    },
    registerClick() {
      this.$util.redirectTo("/pages/login/register/register", {}, "");
    },
    resetClick() {
      this.$util.redirectTo("/pages/login/reset/reset", {}, "");
    },
    switchChange(e) {
      this.submitData.remember = e.target.value;
    },
    /**
     * 获取验证码
     */
    getVertificationCode() {
      this.$refs.imgcode.refresh();
    },
  },
};
</script>
<style lang="scss" scoped>
.cu-dialog {
  background-color: #313131;
  uni-view {
    color: #c5c5c5;
  }
  .cu-list {
    border-top: 1.2px solid #434343 !important;
    border-bottom: 1.2px solid #434343 !important;
  }

  .cu-list.menu > .cu-item {
    background-color: #313131;

    uni-view {
      color: #c5c5c5;
    }
  }

  .cu-list.menu-avatar > .cu-item:after,
  .cu-list.menu > .cu-item:after {
    display: none;
  }

  .cu-header {
    padding: 15px;
    .userbox {
      display: inline-block;
      text-align: left;
      margin-left: 15px;
      vertical-align: middle;
      .balance {
        color: #e28417;
        display: block;
      }
      .name {
        color: #c5c5c5;
        display: block;
      }
    }

    .btn.bg-red {
      border-radius: 24px;
      background: #0087fe;
    }

    .usericon {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      border: 1px solid #eee;
      color: #c5c5c5;

      .iconfont {
        font-size: 20px;
      }
    }

    .welinfo {
      display: block;
      color: #c5c5c5;
      font-size: 20px;
      line-height: 30px;
    }

    .search-form {
      border-bottom: 1px solid #b8b8b8;
    }

    uni-button {
      margin: 0;
    }
  }
}
</style>
<style lang="scss">
@import "/common/css/bg.css";
</style>
