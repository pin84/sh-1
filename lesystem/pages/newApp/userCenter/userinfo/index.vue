<template>
  <view id="user-card">
    <view class="left">
      <view class="image-content">
        <image style="width: 100%; height: 100%"></image>
      </view>
      <view class="left-username">
        <text class="username-box">
          <text class="username">sdfdsf</text>
          <text class="vip">aa</text>
        </text>
        <text>加入亚博体育第{{ joinTime }}天</text>
      </view>
    </view>
    <i class="iconfont icon-icon-test5"></i>
  </view>
</template>

<script>
export default {
  data() {
    return {
      joinTime: 0,
    };
  },
};
</script>
<style lang="scss" scoped>
.df{
  display: flex;
  align-items: center;
  justify-content: center;
}
#user-card {
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 28rpx;
  
  .left{
    display: flex;
    .image-content {
      border: 1px solid red;
      width: 140rpx;
      height: 140rpx;
      border-radius: 50%;
      overflow: hidden;
    }
    .left-username{
      @extend .df;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 10px;
      font-size: 24rpx;
      .username-box{
        .username{
          font-size: 36rpx;
        }
        .vip{
          display: inline-block;
          width: 80rpx;
          height: 32rpx;
          line-height: 32rpx;
          color: #fff;
          background-color: #ccc;
          border-radius: 6rpx;
        }
      }
    }
  }
}
</style>