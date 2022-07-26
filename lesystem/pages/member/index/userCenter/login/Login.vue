<template>
  <view class="main-body">
    <view class="main">
      <view class="title">登录</view>
      <view class="form">
        <view class="item" v-for="(item, idx) in textArr" :key="idx">
          <view class="input-box" v-show="isShowPhoneCode || idx < 2">
            <i class="iconfont" :class="item.icon"></i>
            <input
              class="input"
              :type="item.inputType"
              :placeholder="item.placeholder"
              @focus="onFocus(idx)"
              @blur="onBlur"
              autocomplete="new-password"
              v-model="item.inputText"
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
          <!-- <view class="tip-box" v-show="curFocus == idx">
            <i class="iconfont icon-bangzhu1"></i>
            <text>{{ item.tips }}</text>
          </view> -->
        </view>
        <view class="remenber">
          <view class="remenber-item">
            <i
              @click="toggleIsAgree"
              v-if="isAgree"
              class="iconfont icon-zhengque"
            ></i>
            <i @click="toggleIsAgree" v-else class="iconfont icon-circle"></i>
            <text>记住密码</text>
          </view>
          <view class="remenber-item">
            <!-- <text>忘记密码？</text> -->
          </view>
        </view>

        <view class="item" @click="login">
          <view class="input-box bc-g">登录</view>
        </view>
        <view class="remenber">
          <view class="remenber-item">
            <text>先去逛逛</text>
          </view>
          <view class="remenber-item">
            <text>在线客服</text>
          </view>
        </view>
      </view>
    </view>
    <view class="left" @click="$emit('changeType', '1')">
      <i class="iconfont icon-yonghu"></i>
      <text class="return-to-login">注册新用户</text>
    </view>
  </view>
</template>

<script>
import ImageBox from "@/pages/newApp/components/ImageBox.vue";
export default {
  data() {
    return {
      isShowPhoneCode: false,
      getCodeTimeout: 0,
      btnText: "获取验证码",
      isAgree: true,
      curFocus: null,
      isAgree: true,
      textArr: [
        {
          icon: "icon-zhucehuiyuan",
          placeholder: "用户名",
          tips: "用户名为4-11位，最少两个字母加数字组合，首位为字母",
          inputType: "text",
          autocomplete: "off",
          inputText: "",
        },
        {
          icon: "icon-mima",
          placeholder: "密码",
          tips: "密码长度为8-12位，字母加数字组合",
          inputType: "password",
          autocomplete: "new-password",
          inputText: "",
        },
        {
          icon: "icon-shouji",
          placeholder: "请输入手机号",
          tips: "",
          inputType: "text",
          autocomplete: "off",
          inputText: "",
        },
        {
          icon: "icon-liuyanguanli",
          placeholder: "请输入验证码",
          tips: "",
          inputType: "text",
          autocomplete: "off",
          inputText: "",
        },
      ],
      boxStyle1: {
        width: "176rpx",
        height: "176rpx",
      },
      boxStyle2: {
        width: "100%",
        height: "190rpx",
      },
    };
  },
  components: {
    ImageBox,
  },
  methods: {
    async checkUser() {
      let d = {
        url: "System.Login.checkUser",
        data: {
          username: this.submitData.userName,
        },
      };
      let res = await this.$http(d);

      //
      if (res.code == -3333) {
        this.isShowPhoneCode = true;
      } else {
        this.isShowPhoneCode = false;
      }
    },
    async login() {
      let d = {
        url: "System.Login.login",
        method: "POST",
        data: {
          username: this.textArr[0].inputText,
          password: this.textArr[1].inputText,
          phone: this.textArr[2].inputText,
          code: this.textArr[3].inputText,
          remember: this.isAgree,
          record_id: this.record_id,
        },
      };
      
      let { code, data, message } = await this.$http(d);
      

      if (code == 0) {
        let { token } = data;
        uni.setStorageSync("token", token);

        uni.switchTab({
          url: "/pages/newApp/index",
        });
      } else {
        if (code == -3333) {
          this.isShowPhoneCode = true;
        } else {
          this.isShowPhoneCode = false;
        }
      }
      this.$util.showConfirm({
        content:
          message == "success" ? "登录成功" : message || "登录失败，请重试",
        showCancel: false,
      });
    },
    async getVerifyCode() {
      if (this.getCodeTimeout) return;
      this.getCodeTimeout = 60;
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
        this.record_id = data.record_id;
        this.$util.showConfirm({
          content: "短信发送成功",
          showCancel: false,
        });
      } else {
        this.$util.showConfirm({
          content: message || "获取失败，请重试",
          showCancel: false,
        });
        this.getCodeTimeout = 5;
      }

      let interval = setInterval(() => {
        this.getCodeTimeout -= 1;
        this.btnText = `${this.getCodeTimeout}秒后再获取`;
        if (this.getCodeTimeout <= 0) {
          this.getCodeTimeout = 0;
          this.btnText = "获取验证码";
          clearTimeout(interval);
        }
      }, 1000);
    },
    onBlur() {
      this.curFocus = null;
    },
    onFocus(idx) {
      this.curFocus = idx;
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

.main-body {
  width: 100%;
  height: 100%;
  padding: 0 20rpx 80rpx 20rpx;
  color: #fff;
  display: flex;
  .main {
    width: 100%;
    background-color: rgba(216, 216, 216, 0.4);
    padding: 0 40rpx;
    .title {
      padding: 20rpx 0;
      color: #fff;
      text-align: center;
      margin-top: 20rpx;
      font-size: 38rpx;
    }
    .form {
      .remenber {
        padding: 0 40rpx;
        @extend .df;
        justify-content: space-between;
        height: 100rpx;
        .remenber-item {
          color: #fff;
          font-size: 24rpx;
          .iconfont {
            font-size: 24rpx;
          }
        }
      }
      .item {
        margin-bottom: 15rpx;
        .input-box {
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 90rpx;
          height: 90rpx;
          color: #fff;
          @extend .df;
          position: relative;
          overflow: hidden;
          padding: 40rpx;
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
            font-weight: 600;
          }
          &.input-box-verify {
            justify-content: flex-start;
          }
        }
        .tip-box {
          color: #fff;
          font-size: 20rpx;
          @extend .df;
          justify-content: flex-start;
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
    background-color: rgba(0, 0, 0, 0.4);
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
</style>