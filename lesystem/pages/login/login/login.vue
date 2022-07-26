<template>
  <view class="login_container">
    <view class="login-box">
      <view class="top">
        <view @click="changeTitle(idx)" v-for="(title, idx) in topTitle" :key="idx" class="item-box">
          <view
            class="top-item item-1"
            :class="[{ 'item-2': idx == 1 }, { active: curTitle == idx }]"
          >
            <text class="text">{{ title }}</text>
          </view>
        </view>
      </view>

      <LoginEntity v-if="curTitle ==0" :goback='goback' />
      <RigisterEntity v-else />

    </view>

    <view v-if="false" style="width: 80vw">
      <view
        class="search-form radius flex align-center padding-sm margin-top-df bg"
      >
        <i class="iconfont icon-yonghu text-gray text-bold margin-right-sm"></i>
        <input
          v-model="submitData.userName"
          placeholder-class="text-gray text-sub"
          placeholder="请输入账号"
          name="input"
          class="text-df flex-sub"
          @blur="checkUser"
        />
      </view>

      <view
        v-if="isShowPwdType"
        class="search-form radius flex align-center padding-sm margin-top-df bg"
      >
        <i class="iconfont icon-mima text-gray text-bold margin-right-sm"></i>
        <input
          v-model="submitData.userPwd"
          placeholder-class="text-gray text-sub"
          placeholder="请输入密码"
          name="input"
          type="password"
          autocomplete="new-password"
          class="text-black text-df flex-sub"
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
        <i class="iconfont icon-mima text-gray text-bold margin-right-sm"></i>
        <input
          v-model="submitData.userPwd"
          placeholder-class="text-gray text-sub"
          placeholder="请输入密码"
          name="input"
          class="text-black text-df flex-sub"
        />
        <i
          @click="changePwdType"
          class="iconfont icon-yan text-bold text-black margin-right-sm"
        ></i>
      </view>

      <view v-if="threeExemption === 1" class="flex align-center margin-top-df">
        <view
          class="
            search-form
            radius
            flex
            align-center
            padding-sm
            margin-top-xs
            bg
          "
        >
          <i
            class="
              iconfont
              icon-yanzhengma1
              text-gray text-bold
              margin-right-sm
            "
          ></i>
          <input
            v-model="submitData.userYZM"
            placeholder-class="text-gray text-sub"
            placeholder="请输入验证码"
            name="input"
            class="text-black text-df flex-sub"
          />
        </view>

        <view class="vercode margin-top-sm margin-left-sm"
          ><imgcode width="80" height="22" ref="imgcode"></imgcode
        ></view>
      </view>

      <view
        v-if="isShowPhoneCode"
        class="search-form radius flex align-center padding-sm margin-top-df bg"
      >
        <i
          class="iconfont icon-shouji1 text-gray text-bold margin-right-sm"
        ></i>
        <input
          v-model="submitData.phone"
          placeholder-class="text-gray text-sub"
          placeholder="请输入手机号码"
          name="input"
          class="text-df flex-sub"
        />
      </view>
      <view
        v-if="isShowPhoneCode"
        class="
          code-box
          search-form
          radius
          flex
          align-center
          padding-sm
          margin-top-df
          bg
        "
      >
        <i class="iconfont icon-ico text-gray text-bold margin-right-sm"></i>
        <input
          v-model="submitData.code"
          placeholder-class="text-gray text-sub"
          placeholder="请输入手机验证码"
          name="input"
          class="text-df flex-sub"
        />
        <button class="btn" type="default" @click="send_sms">
          {{ btnText }}
        </button>
      </view>

      <view class="margin-top-xxl"
        ><button
          class="btn text-white bg-red"
          @click="login"
          :class="{ error: btnDisable, primary: true }"
          :disabled="btnDisable"
        >
          {{ btnName }}
        </button></view
      >
    </view>

    <view v-if="false" class="flex margin-top-df">
      <text class="text-white margin-right-sm text-sm" @click="backHome"
        >返回首页</text
      >
      <text
        v-if="this.hasMobileIndexRegister === 1"
        class="text-white margin-right-sm text-sm"
        @click="registerClick"
        >立刻注册</text
      >
      <text class="text-white text-sm"
        ><navigator url="/pages/index/app/app">APP下载 </navigator></text
      >
	  <text class="text-white text-sm">联系客服</text>
    </view>
    <view  class="text-black"  style="color: #000000;left: 300rpx; position: absolute; bottom: 60rpx"
        >Version:{{ SiteConfig.myversion }}</view
      >
    </view>
  </view>
</template>

<script>
import http from "common/js/http.js";
import validate from "common/js/validate.js";
import imgcode from "@/components/imgcode/imgcode.vue";
import LoginEntity from "./LoginEntitya.vue";
import RigisterEntity from "./RigisterEntity.vue";
export default {
  components: {
    imgcode,
    RigisterEntity,
    LoginEntity,
  },
  data() {
    return {
      curTitle: 0,
      topTitle: ["登入", "注册"],
      timeout: 0,
      isShowPhoneCode: false,
      btnText: "获取验证码",
      threeExemption: 1,
      countDownInterval: null,
      hasMobileIndexRegister: 1,
      isShowPwdType: true,
      goback: "",
      btnDisable: false,
      btnCountDown: 4,
      btnName: "登陆",
      submitData: {
        phone: "",
        code: "",
        record_id: "",
        userName: "",
        userPwd: "",
        userYZM: "",
        remember: false,
      },
    };
  },
  onLoad(data) {
    if (data.goback) {
      this.goback = data.goback;
    }
    this.getLoginConfig();
  },
  methods: {
    changeTitle(idx){
      this.curTitle = idx
    },
    async send_sms() {
      if (this.timeout) {
        return;
      }
      if (this.submitData.phone == "") {
        this.$util.showToast({
          title: "请先填写手机号码",
        });
        return;
      }

      let d = {
        url: "System.SendMsg.sendVeryCode",
        methods: "POST",
        data: {
          phone: this.submitData.phone,
        },
      };

      //
      let res = await this.$http(d);

      //

      if (res.code == 0) {
        this.$util.showToast({
          title: res.message,
        });
        this.timeout = 60;
        let interval = setInterval(() => {
          this.timeout--;
          this.btnText = `${this.timeout} 秒后再发送`;
          this.submitData.record_id = res.data.record_id;

          if (!this.timeout || this.timeout < 0) {
            clearInterval(interval);
            this.timeout = 0;
            this.btnText = `获取验证码`;
          }
        }, 1000);
      }

      // .then((res) => {
      //   this.info.record_id = res.data.record_id;
      // });
    },
    checkUser() {
      let d = {
        url: "System.Login.checkUser",
        data: {
          username: this.submitData.userName,
        },
      };
      //let res = await this.$http(d);
      this.sendRequest({
        url: "System.Login.checkUser",
        method: "GET",
        data: {
          username: this.submitData.userName,
        },
        success: (res) => {
          if (res.code == -3333) {
            this.isShowPhoneCode = true;
          }
          if (res.code < 0) {
            this.$util.showToast({
              title: res.message,
            });
          } else {
            this.isShowPhoneCode = false;
          }
        },
      });

      //
    },
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
      if (this.isShowPhoneCode) {
        if (this.submitData.phone == "") {
          this.$util.showToast({
            title: "请填入手机号",
          });
          return false;
        }
        if (this.submitData.code == "") {
          this.$util.showToast({
            title: "请填入手机验证码",
          });

          return false;
        }
      }

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
      if (!this.loginClick()) {
        return;
      }

      let d = {
        username: this.submitData.userName,
        password: this.submitData.userPwd,
        vcode: this.submitData.userYZM,
        remember: this.submitData.remember,
        phone: this.submitData.phone,
        code: this.submitData.code,
        record_id: this.submitData.record_id,
      };

      this.btnDisable = true;
      this.btnName = "正在登陆(" + this.btnCountDown-- + ")";
      this.countDownInterval = setInterval(() => {
        if (this.btnCountDown < 1) {
          this.recoverToNormalBtn();
        } else {
          this.btnDisable = true;
          this.btnName = "正在登陆(" + this.btnCountDown-- + ")";
        }
      }, 1000);
      //
      this.sendRequest({
        url: "System.Login.login",
        method: "POST",
        data: d,
        success: (res) => {
          if (res.code == -3333) {
            this.isShowPhoneCode = true;
          } else {
            this.isShowPhoneCode = false;
          }
          if (res.code < 0) {
            //
            let msg = res.message;
            this.$util.showToast({
              title: msg,
            });
            this.recoverToNormalBtn();
            let flag = Number(msg.substring(4, 5));

            if (flag > 2) {
              this.getLoginConfig();
            }
          }

          if (res.code == 0) {
            uni.setStorageSync("token", res.data.token);
            this.$util.showToast({
              title: "登录成功",
            });

            this.recoverToNormalBtn();
            if (
              res.data.isNeedChangePassword != undefined &&
              res.data.isNeedChangePassword != "" &&
              res.data.isNeedChangePassword > 0
            ) {
              this.dealwithPasswordchangeNotice(res.data.isNeedChangePassword);
            } else if (this.goback != "") {
              let backurl = decodeURIComponent(this.goback);
              uni.redirectTo({
                url: backurl,
              });
            } else {
              this.$util.redirectTo(
                "/pages/member/index/index",
                {},
                "tabbar",
                "reLaunch"
              );
            }
          }
        },

        fail: (err) => {
          uni.showToast({
          	title:"网络请求出错",
          	icon:'none',
          });
        },
      });
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
    recoverToNormalBtn() {
      this.btnDisable = false;
      this.btnName = "登陆";
      this.btnCountDown = 4;
      clearInterval(this.countDownInterval);
      this.countDownInterval = null;
    },
    dealwithPasswordchangeNotice(isNeedChangePassword) {
      if (isNeedChangePassword == 1) {
        uni.showModal({
          title: "提示",
          showCancel: false,
          content: "您需要重新修改设置密码才能正常使用",
          success: function (res) {
            if (res.confirm) {
              uni.redirectTo({
                url: "/pages/member/editPassword/edit/edit",
              });
            }
          },
        });
      } else if (isNeedChangePassword == 2) {
        uni.showModal({
          title: "提示",
          showCancel: false,
          content: "您需要重新修改资金密码才能正常使用",
          success: function (res) {
            if (res.confirm) {
              uni.redirectTo({
                url: "/pages/member/editPassword/edit/edit?index=1",
              });
            }
          },
        });
      } else if (isNeedChangePassword == 3) {
        uni.showModal({
          title: "提示",
          showCancel: false,
          content: "您需要同时修改密码和提货密码才能正常使用",
          success: function (res) {
            if (res.confirm) {
              uni.redirectTo({
                url: "/pages/member/editPassword/edit/edit",
              });
            }
          },
        });
      }
    },
    /**
     * 获取验证码
     */
    getVertificationCode() {
      this.$refs.imgcode.refresh();
    },
  },
  onReady() {},

  mixins: [http],
};
</script>

<style lang="scss" scoped>
@import "/common/css/bg.css";
$deg: 20deg;
.code-box {
  padding: 0;
  padding-left: 10px;
  .btn {
    background-color: #f1f1f1;
    margin: 0;
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    border: none;
    color: #333;
  }
}

.login_container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
   background: url('/static/images/login/loginbg.jpg') center no-repeat;
   background-size: cover;
  .btn {
    margin: 0;
  }

  .login-box {
    width: 80%;
    min-height: 50vh;
    background: rgba(255, 255, 255, 0.6);
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    .top {
      display: flex;
      .item-box {
        width: 50%;
        overflow: hidden;
        .top-item {
          color: #989898;
          background-color: #d8d8d8;
          height: 108rpx;
          line-height: 108rpx;
          text-align: center;
          width: 230rpx;
          &.active {
            color: #b68111;
            background-color: #fff;
          }
        }
        .item-1 {
          transform: skew($deg) translateX(20rpx);
          .text {
            display: inline-block;
            transform: skew(-$deg);
          }
        }
        .item-2 {
          transform: skew(-$deg) translateX(-20rpx);
          .text {
            display: inline-block;
            transform: skew($deg);
          }
        }
      }
    }
  }
}
</style>
