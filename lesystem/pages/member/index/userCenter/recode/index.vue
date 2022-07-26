<template>
  <view id="recode">
    <view class="item" v-for="(item, index) in textArr" :key="index">
      <ImageBox :boxStyle='boxStyle' :src='item.img' />
      <text class="text">{{ item.text }}</text>
    </view>
  </view>
</template>

<script>
import ImageBox from "pages/newApp/components/ImageBox.vue";
export default {
  data() {
    return {
      boxStyle:{
        width:'72rpx',
        height:'72rpx'
      },
      textArr: [
        {
          text: "我的钱包",
          img: "/static/newApp/usercenter/p2-purse.png",
        },
        {
          text: "投注记录",
          img: "/static/newApp/usercenter/p2-recode.png",
        },
        {
          text: "交易记录",
          img: "/static/newApp/usercenter/p2-accoutMannage.png",
        },
        {
          text: "账户管理",
          img: "/static/newApp/usercenter/p2-tradingRecode.png",
        },
      ],
    };
  },

  components: {
    ImageBox,
  },
};
</script>
<style lang="scss" scoped>
#recode {
  display: flex;
  justify-content: space-around;
  padding: 10rpx 20rpx;
  .item{
    display: flex;
    flex-direction: column;
    align-items: center;
    .text{
      color: #414655;
      margin-top: 6rpx;
    }
  }
}
</style>