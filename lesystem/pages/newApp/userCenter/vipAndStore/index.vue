<template>
  <view id="vip-store">
    <view class="box">
      <view class="item" v-for="(item, index) in textArr" :key="index">
        <ImageBox :src='item.img' :boxStyle='boxStyle' />
        <view class="text-box">
          <text class="title" >{{item.title}}</text>
          <text class="subTitle">{{item.subTitle}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import UserCard from "../login/UserCard.vue";
import ImageBox from '@/pages/newApp/components/ImageBox.vue'
export default {
  data() {
    return {
      boxStyle:{
        flex:' 0 0 128rpx',
        height:'128rpx'
      },
      textArr: [
        {
          img: "/static/newApp/usercenter/vip-icon.png",
          title: "VIP特权",
          subTitle: "VIP PRIVILEGE",
        },
        {
          img: "/static/newApp/usercenter/currency_shop.png",
          title: "亚博商城",
          subTitle: "YABO MALL",
        },
      ],
    };
  },
  components: {
    UserCard,
    ImageBox
  },
};
</script>
<style lang="scss" scoped>
.df{
  display: flex;
}
#vip-store {
  padding: 20rpx;
  .box{
    @extend .df;
    box-shadow: 0rpx 0rpx 10rpx #ccc;
    border-radius: 10rpx;
    box-sizing: border-box;
    .item{
      @extend .df;
      width: 50%;
      border-right: 1px solid #f1f1f1;
      padding-left: 20rpx;
      .text-box{
         @extend .df;
         flex-direction: column;
         justify-content: center;
         .title{
           font-size: 32rpx;
           font-weight: 600;
           color: #414655;
         }
         .subTitle{
           font-size: 16rpx;
               color: #a5a9b3;
         }
      }
    }
  }
}
</style>