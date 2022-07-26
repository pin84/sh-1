<template>
  <view id="merber-info">
    <view class="left">
      <view v-if="false" class="no-log">
        <text>您还未登录</text>
        <text class="tip">请先登录/注册后查看</text>
      </view>
      <view v-else>
        <view class="userinfo">
          <UserVip />
        </view>
        <view class="money">
          <i class="iconfont icon-rmb"></i>
          <text class="coin">{{ coin }}</text>
          <i class="iconfont icon-bangzhu1"></i>
        </view>
      </view>
    </view>
    <view class="right">
      <view class="right-item" v-for="(item, idx) in textArr" :key="idx">
        <ImageBox :src="item.img" :boxStyle="boxStyle" />
        <text class="text">{{ item.text }}</text>
      </view>
    </view>
  </view>
</template>
<script>
import UserVip from "@/pages/newApp/components/UserVip.vue";
import ImageBox from "@/pages/newApp/components/ImageBox.vue";
export default {
  data() {
    return {
      coin: 0,
      boxStyle: {
        width: "72rpx",
        height: "72rpx",
      },
      textArr: [
        {
          text: "存款",
          img: "/static/newApp/home/1.png",
          toUrl: "",
        },
        {
          text: "转账",
          img: "/static/newApp/home/2.png",
          toUrl: "",
        },
        {
          text: "取款",
          img: "/static/newApp/home/3.png",
          toUrl: "",
        },
        {
          text: "VIP",
          img: "/static/newApp/home/4.png",
          toUrl: "",
        },
      ],
    };
  },
  components: {
    UserVip,
    ImageBox,
  },

  created() {
    this.initData();
  },

  methods: {
    initData() {
      let { coin } = this.$store.state.YB.yb_userinfo;
      this.coin = coin;
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
#merber-info {
  width: 100%;
  height: 104rpx;
  display: flex;
  padding: 10rpx 20rpx;
  .left {
    flex: 0 0 280rpx;
    display: flex;
    flex-direction: column;
    .no-log {
      font-size: 24rpx;
      @extend .df;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      .tip {
        color: #a5a9b3;
      }
    }
    .userinfo {
      display: flex;
      align-items: center;
      line-height: 36rpx;
    }
    .money {
      align-items: center;
      display: flex;
      font-size: 36rpx;
      line-height: 36rpx;
      .coin{
        
      }
      .icon-bangzhu1 {
        color: gray;
        margin-left: 10rpx;
      }
    }
  }
  .right {
    @extend .df;
    width: 100%;
    justify-content: space-around;
    .right-item {
      @extend .df;
      flex-direction: column;
      .text {
        color: #414655;
        font-size: 24rpx;
        line-height: 30rpx;
      }
    }
  }
}
</style>