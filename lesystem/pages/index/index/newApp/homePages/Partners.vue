<template>
  <view id="partners">
    <view class="title">官方认证</view>
    <view class="list">
      <view class="item" v-for="(item, index) in list1" :key="index">
        <view
          class="img"
          :style="{
            background: `url(${item.icon})`,
            'background-size': 'contain',
          }"
        ></view>
        <text>{{ item.text1 }}</text>
        <text>{{ item.text2 }}</text>
      </view>
    </view>
    <view class="title">支付方式</view>
    <view class="list">
      <view class="item2" v-for="(str, index) in list2" :key="index">
        <img :src="str" alt="" />
      </view>
    </view>
    <view class="title">合作品牌</view>
    <view class="img-box">
      <img src="static/newApp/home/17.png" alt="" />
    </view>

    <view class="text">
      公司注册办事处地址Ground Floor, St George’s Court, UpperChurch Street,
      Douglas, Isle of Man, IM1
      1EE自2007年8月31日起获得马恩岛博彩监管委员会颁发的执照并受其监管（最后更新：31/08/2017）
    </view>
    <view class="text"> © 2008-2023 . All rights Reserved </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      list1: [
        {
          icon: "static/newApp/home/10.png",
          text1: "英国GC",
          text2: "监督委员会",
        },
        {
          icon: "static/newApp/home/11.png",
          text1: "马耳他博彩牌照",
          text2: "[MGA]认证",
        },
        {
          icon: "static/newApp/home/12.png",
          text1: "英属维尔京群岛",
          text2: "[BVI]认证",
        },
        {
          icon: "static/newApp/home/13.png",
          text1: "菲律宾[PAGCOR]",
          text2: "监督博彩牌照",
        },
      ],
      list2: [
        "static/newApp/home/14.png",
        "static/newApp/home/15.png",
        "static/newApp/home/16.png",
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
$w: 84rpx;
.df {
  display: flex;

  justify-content: center;
  align-items: center;
}
#partners {
  padding-top: 40rpx;
  .title {
    text-align: center;
    color: #5c5c66;
    padding: 30rpx 20rpx 10rpx;
    font-size: 36rpx;
  }
  .text{
    color: #a1a1b2;
    font-size: 23rpx;
    text-align: center;
    padding: 5rpx 20rpx;
  }

  .text1{
    font-size: 20rpx
  }
  .list {
    @extend .df;
    padding: 0 10rpx;
    .item {
      @extend .df;
      flex-direction: column;
      width: 200rpx;
      color: #a1a1b2;
      font-size: 20rpx;
      line-height: 26rpx;
      .img {
        width: $w;
        height: $w;
        background-size: contain;
      }
    }
    .item2 {
      width: 23%;
      margin-right: 20rpx;
      img {
        width: 100%;
      }
    }
  }
  .img-box {
    width: 100%;
    padding: 0 60rpx;
    img {
      width: 100%;
    }
  }
}
</style>