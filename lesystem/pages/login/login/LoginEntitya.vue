<template>
  <view id="login-entity">
    <view class="list">
      <view
        class="item"
        v-show="idx < 2 || isShowPhoneCode"
        v-for="(item, idx) in list"
        :key="idx"
      >
        <text class="iconfont" :class="item.icon"></text>
        <input
          @blur="checkUser(idx)"
          v-model="item.inputText"
          class="input"
          :type="idx == 1 ? 'password' : 'text'"
          :placeholder="item.placeholder"
          autocomplete="new-password"
        />
        <button
          v-if="item.placeholder == '请输入验证码'"
          class="btn"
          type="primary"
          @click="send_sms"
        >
          {{ btnText }}
        </button>
      </view>
    </view>
<!-- 	<view style="text-align: center;margin: 0 auto;">
		
	</view> -->
	<view class="uni-list-cell uni-list-cell-pd">
	                <view>记住密码 <switch  @change="switchRememberChange" style="transform:scale(0.7)" /></view>
	                
	 </view>

    <button
      class="log-btn"
      :class="{ ban: loginTimeout }"
      type="primary"
      @click="login"
    >
      {{ btnName }}
      <text v-if="loginTimeout" class="loginTimeout">({{ loginTimeout }})</text>
    </button>
	<view  class="flex margin-top-df" style="margin-top: 20px;margin-left: 40rpx;">
	    <text class="text-black margin-right-sm text-sm text-blod" @click="backHome"
	      >返回首页</text
	    >
	    <text class="text-black text-sm text-blod margin-right-sm "
	      ><navigator url="/pages/index/app/app">APP下载 </navigator></text
	    >
		<text  @click="backKefu" class="text-black  text-sm text-blod margin-right-sm">联系客服</text>
		<text  class="text-black  text-sm text-blod" @click="forgetpassword">忘记密码？</text>
		
	  </view>
	  
  </view>
</template>

<script>
import http from "common/js/http.js";
export default {
  mixins: [http],
  props: {
  	goback: {
  		type: String,
  		default: () => {
  			return '';
  		}
  	}
  },
  data() {
    return {
      record_id: "",
      timeout: 0,
	  remember:0,
      isShowPhoneCode: false,
      btnName: "登陆",
      btnText: "获取验证码",
      loginTimeout: 0,
      //goback: "",
      list: [
        {
          icon: "icon-yonghu",
          placeholder: "账号",
          inputText: "",
        },
        {
          icon: "icon-mima",
          placeholder: "密码",
          inputText: "",
        },
        {
          icon: "icon-shouji",
          placeholder: "请输入手机号",
          inputText: "",
        },
        {
          icon: "icon-yanzhengma",
          placeholder: "请输入验证码",
          inputText: "",
        },
      ],

      warnList: [
        "用户名不能为空",
        "密码不能少于6个字符",
        "请输入手机号码",
        "请填写验证码",
      ],
    };
  },
  created() {
	 console.log(this.goback)
    //this.getLoginConfig();

  },
  methods: {
	  switchRememberChange: function (e) {
	              console.log('switch1 发生 change 事件，携带值为', e.target.value)
				  if(e.target.value==true){
					  this.remember=1;
				  }
				  else{
					  this.remember=0;
				  }
	   },
	  backHome() {
	    uni.switchTab({
	      url: "/pages/index/index/index",
	    });
	  },
	  forgetpassword(){
		uni.navigateTo({
			url:'/pages/login/find/find?type=mobile'
		});
	  },
	  backKefu() {
	    uni.switchTab({
	      url: "/pages/kefu/kefu",
	    });
	  },
	  
    async send_sms() {
      if (this.timeout) {
        return;
      }
      if (this.list[2].inputText == "") {
        this.$util.showToast({
          title: "请先填写手机号码",
        });
        return;
      }

      let d = {
        url: "System.SendMsg.sendVeryCode",
        methods: "POST",
        data: {
          phone: this.list[2].inputText,
        },
      };
      let res = await this.$http(d);

      if (res.code == 0) {
        this.$util.showToast({
          title: res.message,
        });
        this.timeout = 60;
        let interval = setInterval(() => {
          this.timeout--;
          this.btnText = `${this.timeout} 秒后再发送`;
          this.record_id = res.data.record_id;
          if (!this.timeout || this.timeout < 0) {
            clearInterval(interval);
            this.timeout = 0;
            this.btnText = `获取验证码`;
          }
        }, 1000);
      }
    },
    checkUser(idx) {
      if (idx != 0) return;
      this.sendRequest({
        url: "System.Login.checkUser",
        method: "GET",
        data: {
          username: this.list[0].inputText,
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
    },

    login() {
      //登录接口
      if (this.loginTimeout) return;
      let flag = this.loginClick();

      console.log(flag);
      if (!flag) {
        return;
      }
      this.loginTimeout = 4;
      this.interval = setInterval(() => {
        this.loginTimeout--;

        if (this.loginTimeout <= 0) {
          this.loginTimeout = 0;
          clearInterval(this.interval);
        }
      }, 1000);

      let d = {
        username: this.list[0].inputText,
        password: this.list[1].inputText,
		
        // vcode: this.submitData.userYZM,
        remember: this.remember,
        phone: this.list[2].inputText,
        code: this.list[3].inputText,
        record_id: this.record_id,
      };

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
			// #ifdef H5
			uni.showToast({
			  title: "网络连接超时，刷新页面重试！",
			  icon: "none",
			});
			// #endif
			//#ifdef APP-PLUS
			uni.showToast({
			  title: "网络超时.关闭APP再重试",
			  icon: "none",
			});
			//#endif
			// uni.showToast({
			// 	title:"网络请求出错",
			// 	icon:'none',
			// });
			// uni.getNetworkType({
			//     success: function (netres) {
			//         console.log(netres.networkType);
			// 		if(netres.networkType=='none'){
			// 			uni.showToast({
			// 				title:"无网络.请再试",
			// 				icon:'none',
			// 			});
			// 		}
			//     }
			// });
        },
      });
    },
    loginClick() {
      let i = 0;
      for (let obj of this.list) {
        if (i > 1 && !this.isShowPhoneCode) continue;
        if (obj.inputText == "") {
          this.$util.showToast({
            title: this.warnList[i],
          });
          return false;
        }
        i++;
      }
      return true;
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
  },
};
</script>

<style lang="scss" scoped>
.df {
  display: flex;
  justify-content: center;
  align-items: center;
}
#login-entity {
  width: 100%;
  padding: 30rpx;
  .list {
    @extend .df;
    flex-direction: column;
    width: 100%;
    .item {
      position: relative;
      width: 100%;
      @extend .df;
      background-color: #fff;
      padding: 20rpx 20rpx;
      font-size: 24rpx;
      border-radius: 6rpx;
      overflow: hidden;
      margin-bottom: 16rpx;
      .iconfont {
        display: inline-block;
        flex: 0 0 60rpx;
      }
      .input {
        width: 100%;
        font-size: 28rpx;
        outline: none;
        border: none;
      }
      .btn {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        line-height: 100rpx;
        width: 150rpx;
        font-size: 20rpx;
        margin: 0;
        padding-left: 0;
        padding-right: 0;
        background-color: rgb(9, 88, 119) !important;
        border-radius: 0;
      }
    }
  }
  .log-btn {
    width: 100%;
    margin: 0;
    padding-left: 0;
    padding-right: 0;
    margin-top: 40rpx;
    // background: linear-gradient(to bottom, #f5df83 22%, #FBB21A) ;
    &.ban {
      background-color: gray !important;
    }
  }
  .loginTimeout {
    margin-left: 10rpx;
  }
}
</style>