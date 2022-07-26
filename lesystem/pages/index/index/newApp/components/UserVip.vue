<template>
  <view id="user-vip">
    <text class="name">{{userinfo.username}}</text>

    <!-- <text class="vip-bg-box">
      <i class="iconfont icon-f-vip"></i>
      <text class="lv">0</text>
    </text> -->
  </view>
</template>

<script>
export default {
  data(){
    return {
      userinfo:{},
    }
  },

  created(){
    this.userinfo = uni.getStorageSync('userInfo')
  }
}
</script>

<style lang="scss" scoped>
#user-vip {
  display: flex;
  align-items: center;
  .name{
    font-size: 28rpx;
    vertical-align: top;
    min-width: 60rpx;
    max-width: 160rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #6c7ba8;
  }
  .vip-bg-box {
    background-color: gray;
    padding: 0 15rpx;
    padding-left: 26rpx;
    border-radius: 6rpx;
    display: flex;
    align-items: center;
    color: #fff;
    height: 38rpx;
    margin-left: 10rpx;
    .iconfont {
        display: inline-block;
      font-size: 24rpx;
      line-height: 0;
      transform: scale(2);
    }
    .lv {
        margin-left: 20rpx;
    }
  }
}
</style>