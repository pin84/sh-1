<template>
  <view id="login">
    <view class="top-img-box img-box-1">
      <ImageBox
        :boxStyle="boxStyle1"
        src="/static/newApp/usercenter/login-1.png"
      />
    </view>
    <view class="top-img-box img-box-2">
      <ImageBox
        :boxStyle="boxStyle2"
        src="/static/newApp/usercenter/login-2.png"
      />
    </view>

    <Login @changeType='changeType'  v-if="isLogin"/>
    <Register @changeType='changeType'   v-else/>
    
  </view>
</template>

<script>
import ImageBox from "@/pages/newApp/components/ImageBox.vue";
import Login from './Login.vue'
import Register from './Register.vue'
export default {
  data() {
    return {
        isLogin:true,
      curFocus:null,
      isAgree:true,
      textArr: [
        {
          icon: "icon-zhucehuiyuan",
          placeholder: "用户名",
          tips: "用户名为4-11位，最少两个字母加数字组合，首位为字母",
        },
        {
          icon: "icon-mima",
          placeholder: "密码",
          tips: "密码长度为8-12位，字母加数字组合",
        },
        {
          icon: "icon-mima",
          placeholder: "确认密码",
          tips: "两次密码输入不一致",
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
    Register,
    Login
  },
  methods:{
      changeType(type){
          console.log(type);
          this.isLogin = !this.isLogin
      },
    onBlur(){
      this.curFocus=null
    },
    onFocus(idx){
      this.curFocus = idx
    },
    toggleIsAgree(){
      this.isAgree = !this.isAgree
    }
  }
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
          .iconfont{
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
            padding: 40rpx;
            .iconfont {
              display: inline-block;
              width: 44rpx;
              font-size: 42rpx;
              margin-right: 20rpx;
            }
            .input {
              width: 100%;
              // border: 1px solid red;
            }
            &.bc-g {
              background: linear-gradient(90deg, #62b3ff, #3d72fa);
              opacity: 0.5;
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