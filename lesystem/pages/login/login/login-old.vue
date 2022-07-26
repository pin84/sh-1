<template>
  <view class="lebg login_container flex align-center">
    <view class="flex justify-center" style="margin-top: 20rpx"
      ><image
        style="width: 420rpx; height: 160rpx"
        src="/static/images/le/zlogo.png"
    /></view>

    <view style="width: 80vw">
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

    <view class="flex margin-top-df">
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
    </view>
	<view style="color: rgb(116 165 179); position: absolute;bottom: 60rpx;">Version:{{SiteConfig.myversion}}</view>
  </view>
</template>

<script>
import http from "common/js/http.js";
import validate from "common/js/validate.js";
import imgcode from "@/components/imgcode/imgcode.vue";
export default {
  components: {
    imgcode,
  },
  data() {
    return {
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
    // #ifdef H5
    if (this.$util.isWeiXin()) {
      const getUrlCode = function () {
        var url = location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
          var str = url.substr(1);
          var strs = str.split("&");
          for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
          }
        }
        return theRequest;
      };
      var urlParams = getUrlCode();
      //this.$util.showToast({ title: urlParams.code });
      if (urlParams.code != undefined && urlParams.code != "") {
        uni.showLoading({
          mask: true,
          title: "正在登录···",
          complete: () => {},
        });
        this.sendRequest({
          url: "System.Login.oauthLogin",
          data: {
            access_code: urlParams.code,
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
              this.$util.redirectTo("/pages/member/index/index", {}, "tabbar");
            } else {
              this.$util.showToast({
                title: res.message,
              });
            }
          },
        });
      }
    }
    // #endif
  },
  methods: {
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
		  if (res.code <0) {
		    this.$util.showToast({
		      title: res.message,
		    });
		  }
		  else {
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
          console.log("============", err);
        },
      });
    },
    // owchatLogin() {
    //   if (this.$util.isWeiXin()) {
    //     this.sendRequest({
    //       url: "System.WchatPublic.getCode",
    //       data: {
    //         redirect_uri: location.href,
    //       },
    //       success: (res) => {
    //         if (res.data.code == 0) {
    //           location.href = res.data.url;
    //         } else {
    //           this.$util.showToast({
    //             title: res.data.message,
    //             success: () => {
    //               setTimeout(() => {
    //                 this.$util.redirectTo("/pages/login/login/login", {
    //                   goback: this.href,
    //                 });
    //               }, 1000);
    //             },
    //           });
    //         }
    //       },
    //     });
    //   }

    //   //   let link = window.location.href;
    //   //    // let params = this._getUrlParams(link);  // 地址解析

    //   //     let params =this.getUrlParam('code');  // 地址解析
    //   //        // 已经授权登录过的就不用再授权了
    //   //     // if (store.state.token) return;

    //   //     // 如果拿到code，调用授权接口，没有拿到就跳转微信授权链接获取
    //   //    // if (params.code) {
    //   //     if (params) {
    //   //         api.wxAuth(params.code); // 调用后台接口，授权
    //   //     }else {

    //   //         let appid = 'wxd3799ca023cf3005';
    //   //         //1.使用encodeURIComponent以及JSON.stringify()方法对对象进行字符串化和编码，这样可以控制url参数的长度，参考示例代码（uni-app书写方式，微信小程序自己改。）

    //   //         let uri = encodeURIComponent(link);
    //   //         //2.接受信息的页面使用JSON.parse()以及decodeURIComponent()接收和解码参数。

    //   //         //snsapi_base   //snsapi_base    scope = snsapi_base（不弹出授权页面，直接跳转，只能获取用户 openid ）。
    //   //         //snsapi_userinfo  弹出
    //   //         let authURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${uri}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;

    //   //         window.location.href = authURL;

    //   // }
    //   // this.sendRequest({
    //   // 	url: 'System.Login.oauthLogin',
    //   // 	method:"POST",
    //   // 	data: {
    //   // 		type: 'WCHAT',
    //   // 	},
    //   // 	success: res =>{
    //   // 		if(res.data.code < 0){
    //   // 			this.$util.showToast({ title: res.data.message });
    //   // 			return false;
    //   // 		}
    //   // 		if(res.data.code == 1){
    //   // 			this.$util.showToast({ title: '登录成功' });
    //   // 			uni.setStorage({
    //   // 				key: 'token',
    //   // 				data: res.data.token
    //   // 			});
    //   // 			setTimeout(() => {
    //   // 				this.$util.redirectTo('/pages/member/index/index', {}, 'tabbar', 'reLaunch');
    //   // 			}, 1500);
    //   // 		}
    //   // 	}
    //   // })
    // },

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
  flex-direction: column;

  .bg {
    background-color: rgb(232, 240, 254);
    color: #000000;
  }

  .btn {
    margin: 0;
  }
}
</style>
