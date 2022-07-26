<template>
  <view id="user-card" @click="toLogin">
    <view class="left">
      <view class="image-content">
        <image
          src="/static/newApp/usercenter/login-bg.png"
          style="width: 100%; height: 100%"
        ></image>
      </view>
      <view v-if="isLogin" class="ml-20 left-username">
        <UserVip />
        <text class="join-day">加入亚博体育第{{ joinTime }}天</text>
      </view>
      <view v-else class="ml-20 bold">点击登录/注册</view>
    </view>
    <i class="iconfont icon-icon-test5"></i>
  </view>
</template>

<script>
import UserVip from "@/pages/newApp/components/UserVip.vue";
export default {
  props: {
    ts: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      yb_userinfo:{},
      isLogin: false,
      joinTime: 0,
    };
  },

  watch: {
    ts: function (val) {
      this.initData();
    },
  },

  components: {
    UserVip,
  },

  created() {
    this.initData();
  },
  methods: {
    initData() {
      let token = uni.getStorageSync("token");
      if (token == "") {
        this.isLogin = false;
      } else {
        this.isLogin = true;
       this.yb_userinfo = this.$store.state.YB.yb_userinfo;
      }

    },
    toLogin() {
      const token = uni.getStorageSync("token");
      if (!token || token == "") {
        uni.navigateTo({
          url: "/pages/newApp/userCenter/login/index",
        });
      }else {

      }
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
#user-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 28rpx;

  .left {
    display: flex;
    align-items: center;
    .ml-20 {
      margin-left: 20rpx;
      color: #414655;
    }
    .bold {
      font-weight: bold;
      font-size: 30rpx;
    }
    .image-content {
      width: 140rpx;
      height: 140rpx;
      border-radius: 50%;
      overflow: hidden;
    }
    .left-username {
      @extend .df;
      flex-direction: column;
      align-items: flex-start;
      font-size: 24rpx;
      .join-day {
        color: #a5a9b3;
      }
      // .username-box {
      //   .username {
      //     font-size: 36rpx;
      //   }
      //   .vip {
      //     display: inline-block;
      //     width: 80rpx;
      //     height: 32rpx;
      //     line-height: 32rpx;
      //     color: #fff;
      //     background-color: #ccc;
      //     border-radius: 6rpx;
      //   }
      // }
    }
  }
  .icon-icon-test5 {
    font-size: 42rpx;
    color: gray;
  }
}
</style>