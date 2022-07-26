<template>
  <view class="main-body">
    <view class="left" @click="$emit('changeType', '2')">
      <i class="iconfont icon-yonghu"></i>
      <text class="return-to-login">返回登录</text>
    </view>
    <view class="main">
      <view class="title">注册</view>
      <view class="form">
        <view class="item" v-for="(item, idx) in textArr" :key="idx">
          <view class="input-box">
            <i class="iconfont" :class="item.icon"></i>
            <input
              class="input"
              :type="item.inputType"
              :placeholder="item.placeholder"
              @focus="onFocus(idx)"
              @blur="onBlur(idx)"
              @input="onInputa(idx)"
              v-model="item.inputText"
              autocomplete="new-password"
            />
            <!-- <i v-if="idx == 2" class="iconfont icon-yanjing"></i> -->
            <view
              class="get-verify-code-btn"
              @click="getVerifyCode"
              v-if="idx == 3"
            >
              {{ btnText }}
            </view>
          </view>
          <view
            class="tip-box"
            :class="{ 'c-red': colorRedArr.includes(idx) }"
            v-show="curFocusArr.includes(idx)"
          >
            <i class="iconfont icon-bangzhu1"></i>
            <text>{{ item.tips }}</text>
          </view>
        </view>
        <!-- <view class="item" @click="verify" v-if="btntype==1">
          <view class="input-box input-box-verify">
            <i class="iconfont icon-radioactive"></i>
            <text>点击按钮进行验证</text>
          </view>
        </view>
        <view class="item" v-else-if="btntype==2">
          <view class="input-box ">
             <button type="primary" class="primary-btn"  loading="true"></button>
          </view>
        </view>
        <view class="item" v-else>
          <view class="input-box input-box-verify-done">
            <i class="iconfont icon-zhengque"></i>
            <text>验证完成</text>
          </view>
        </view> -->

        <view class="item-text">
          <i
            @click="toggleIsAgree"
            v-if="isAgree"
            class="iconfont icon-zhengque"
          ></i>
          <i @click="toggleIsAgree" v-else class="iconfont icon-circle"></i>
          <text>我已阅读并同意</text>
          <text class="blue">相关条款</text>
          <text>和</text>
          <text class="blue">隐私政策</text>
        </view>
        <view @click="register" class="item">
          <view class="input-box bc-g">注册 </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import ImageBox from "@/pages/newApp/components/ImageBox.vue";
export default {
  data() {
    return {
      getCodeTimeout: 0,
      btnText: "获取验证码",
      btntype: "1",
      registerData: {
        username: "",
        password: "",
        rePassword: "",
      },
      colorRedArr: [],
      curFocusArr: [],
      isAgree: true,
      inputArr: ["", "", ""],
      textArr: [
        {
          icon: "icon-zhucehuiyuan",
          placeholder: "用户名",
          tips: "用户名为4-11位，最少两个字母加数字组合，首位为字母",
          inputText: "",
          inputType: "text",
        },
        {
          icon: "icon-mima",
          placeholder: "密码",
          tips: "密码长度为8-12位，字母加数字组合",
          inputText: "",
          inputType: "password",
        },
        {
          icon: "icon-shouji",
          placeholder: "请输入手机号",
          tips: "",
          inputText: "",
          inputType: "text",
        },
        {
          icon: "icon-liuyanguanli",
          placeholder: "请输入验证码",
          tips: "",
          inputText: "",
          inputType: "text",
        },
        // {
        //   icon: "icon-mima",
        //   placeholder: "确认密码",
        //   tips: "两次密码输入不一致",
        //   inputText: "",
        //   inputType: "password",
        // },
      ],
      boxStyle1: {
        width: "176rpx",
        height: "176rpx",
      },
      boxStyle2: {
        width: "100%",
        height: "190rpx",
      },
      regUsername: "",
      password: "",
    };
  },
  components: {
    ImageBox,
  },

  methods: {
    async getVerifyCode() {
      if (this.getCodeTimeout) return;
      this.getCodeTimeout = 5;
      let d = {
        url: "System.SendMsg.sendVeryCode",
        method: "POST",
        data: {
          phone: this.textArr[2].inputText,
        },
      };
      let res = await this.$http(d);
      let { code, data, message } = res;

      
      if (code == 0) {
        //"MDAwMDAwMDAwMIKJot1_qKGf"
        this.record_id = data.record_id;
        this.$util.showConfirm({
          content: "短信发送成功",
          showCancel: false,
        });

        let interval = setInterval(() => {
          this.getCodeTimeout -= 1;
          console.log(this.getCodeTimeout);
          this.btnText = `${this.getCodeTimeout}秒后再获取`;
          if (this.getCodeTimeout <= 0) {
            this.getCodeTimeout = 0;
            this.btnText = "获取验证码";
            clearTimeout(interval);
          }
        }, 1000);
      } else {
        this.$util.showConfirm({
          content: message,
          showCancel: false,
        });
      }
    },

    async register() {
      let flag = this.registerCheck();
      let d = {
        url: "System.Login.mobileRegisterAPI",
        method: "POST",
        data: {
          username: this.textArr[0].inputText,
          password: this.textArr[1].inputText,
          phone: this.textArr[2].inputText,
          // record_id: this.record_id,
          record_id: "MDAwMDAwMDAwMIKJot1_qKGf",
          code: this.textArr[3].inputText,
        },
        // isShowLoading: false,
      };
      let { code, data, message } = await this.$http(d);
      if (code == 0) {
        if (data.code == 1) {
          localStorage.setItem("token", data.token);
          this.$util.showConfirm({
            content: "注册成功",
            showCancel: false,
          });
        } else {
          this.$util.showConfirm({
            content: data.message,
            showCancel: false,
          });
        }
      } else {
        this.$util.showConfirm({
          content: message,
          showCancel: false,
        });
      }
    },
    registerCheck() {
      console.log(this.colorRedArr);
      if (this.colorRedArr.length != 0) {
        return false;
      }

      let i = 0;
      this.textArr.forEach((item) => {
        if (item.inputText == "") {
          i++;
        }
      });
      if (i) {
        return false;
      }

      if (!this.isAgree) {
        return false;
      }

      return true;
    },
    verify() {
      this.btntype = 2;
      setTimeout(() => {
        this.btntype = 3;
      }, 2000);
    },
    onInputa(idx) {
      switch (idx) {
        case 0:
          let usernameIndex = 0;
          let username = this.textArr[usernameIndex].inputText;
          this.regUsername = username.replace(/[^\w\.\/]/gi, "");
          this.arrayOptions(
            this.verifyUsername(this.regUsername),
            usernameIndex,
            username
          );
          break;
        case 1:
          let pwdIndex = 1;
          let pwd = this.textArr[pwdIndex].inputText;
          this.password = pwd;
          this.arrayOptions(this.verifyPwd(pwd), pwdIndex, pwd);
          break;
        // case 2:
        //   let rePwdIndex = 2;
        //   let index = this.curFocusArr.findIndex(item=>item==rePwdIndex)
        //   if(index == -1){
        //      this.curFocusArr.push(rePwdIndex)
        //   }
        //   let rePwd = this.textArr[rePwdIndex].inputText;
        //   this.arrayOptions(this.verifyRePwd(rePwd), rePwdIndex,rePwd);
        //   break;
        default:
          break;
      }

      setTimeout(() => {
        this.textArr[0].inputText = this.regUsername;
        this.textArr[1].inputText = this.password;

        this.textArr.push({});
        this.textArr.pop();
      }, 0);
    },

    arrayOptions(flag, reference, entry) {
      if (flag || !entry) {
        let index = this.colorRedArr.findIndex((item) => item == reference);
        this.colorRedArr.splice(index, 1);
      } else if (!this.colorRedArr.includes(reference)) {
        this.colorRedArr.push(reference);
      }
    },

    verifyPwd(pwd) {
      let len = pwd.length;
      if (len < 8 || len > 12) {
        return false;
      }
      let arr = pwd.match(/[a-zA-Z]/g);
      if (!arr || arr.length == 0) {
        return false;
      }
      let arr1 = pwd.match(/[0-9]/g);
      if (!arr1 || arr1.length == 0) {
        return false;
      }

      return true;
    },

    verifyRePwd(rePwd) {
      if (rePwd !== this.textArr[1].inputText) {
        return false;
      }

      // let index = this.colorRedArr.findIndex(item=>item==2)
      let idx = this.curFocusArr.findIndex((item) => item == 2);
      // this.colorRedArr.splice(index,1)
      this.curFocusArr.splice(idx, 1);
      return true;
    },
    verifyUsername(username) {
      let len = username.length;
      if (len < 4 || len > 11) {
        return false;
      }

      let reg = /^[a-zA-Z]/;
      if (!reg.test(username)) {
        return false;
      }

      let arr = username.match(/[a-zA-Z]/g);
      if (arr.length < 2) {
        return false;
      }

      let arr1 = username.match(/[0-9]/g);
      if (!arr1 || arr1.length == 0) {
        return false;
      }

      return true;
    },
    onBlur(idx) {
      let redIndex = this.findIndex(this.colorRedArr, idx);
      if (redIndex != -1) return;
      let index = this.curFocusArr.findIndex((item) => item == idx);
      if (index == -1) return;
      this.curFocusArr.splice(index, 1);
    },
    onFocus(idx) {
      if (idx > 1) return;
      let index = this.curFocusArr.findIndex((item) => item == idx);
      if (index == -1) {
        this.curFocusArr.push(idx);
      }
    },
    findIndex(arr, reference) {
      let index = arr.findIndex((item) => item == reference);
      return index;
    },
    toggleIsAgree() {
      this.isAgree = !this.isAgree;
    },
  },
};
</script>

<style lang="scss" scoped>
.df {
  display: flex;
  align-items: center;
  justify-content: center;
}
#login {
  width: 100vw;
  height: 100vh;
  background: url("/static/newApp/usercenter/entry-bg.jpeg");
  background-size: contain;
  @extend .df;
  flex-direction: column;
  .main-body {
    width: 100%;
    // border: 1px solid red;
    height: 100%;
    padding: 0 20rpx 80rpx 20rpx;
    color: #fff;
    display: flex;
    .main {
      width: 100%;
      // border: 1px solid red;
      background-color: rgba(0, 0, 0, 0.5);
      padding: 0 40rpx;
      .title {
        padding: 20rpx 0;
        color: #fff;
        text-align: center;
        margin-top: 20rpx;
        font-size: 38rpx;
      }
      .form {
        .item-text {
          color: #fff;
          justify-content: flex-start;
          padding-left: 40rpx;
          font-size: 24rpx;
          @extend .df;
          .iconfont {
            font-size: 30rpx;
            margin-right: 20rpx;
          }
          .blue {
            color: #6aaaf5;
            text-decoration: underline;
          }
        }
        .item {
          margin-bottom: 15rpx;
          .input-box {
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 90rpx;
            height: 90rpx;
            color: #fff;
            @extend .df;
            padding: 0 40rpx;
            position: relative;
            overflow: hidden;
            .get-verify-code-btn {
              width: 200rpx;
              height: 90rpx;
              text-align: center;
              line-height: 90rpx;
              font-size: 26rpx;
              position: absolute;
              right: 0;
              top: 0;
              background-color: #fff;
            }
            .primary-btn {
              background-color: transparent !important;
            }
            .iconfont {
              display: inline-block;
              width: 44rpx;
              font-size: 42rpx;
              margin-right: 20rpx;
            }
            .input {
              width: 100%;
              background-color: transparent;
              border: none;
              outline: none;
              color: #fff;
            }
            &.bc-g {
              background: linear-gradient(90deg, #62b3ff, #3d72fa);
              opacity: 0.5;
            }
            &.input-box-verify {
              justify-content: flex-start;
            }
            &.input-box-verify-done {
              justify-content: flex-start;
              background-color: #eefff5;
              color: #000;
              .iconfont {
                color: green;
              }
            }
          }
          .tip-box {
            color: #fff;
            font-size: 20rpx;
            @extend .df;
            justify-content: flex-start;
            &.c-red {
              color: #db6372;
            }
            .iconfont {
              margin-right: 10rpx;
            }
          }
        }
      }
    }
    .left {
      flex: 0 0 100rpx;
      width: 100rpx;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.3);
      color: #fff;
      @extend .df;
      border-radius: 24rpx 0 0 24rpx;
      flex-direction: column;
      .iconfont {
        font-size: 42rpx;
      }
      .return-to-login {
        writing-mode: vertical-lr;
        letter-spacing: 10rpx;
      }
    }
  }
  .top-img-box {
    width: 100%;
    @extend .df;
    flex-direction: column;
  }
  .img-box-1 {
    flex: 0 0 176rpx;
    padding-top: 88rpx;
  }
  .img-box-2 {
    flex: 0 0 190rpx;
    padding: 40rpx 28rpx;
  }
}
</style>