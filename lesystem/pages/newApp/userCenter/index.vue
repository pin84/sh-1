<template>
  <view id="usercenter">
    <view class="top">
      <UserCard :ts='ts' />
      <VipAndStore />
      <Recode />
    </view>

    <view class="bottom">
      <view class="item-box" v-for="(item, index) in textArr" :key="index">
        <view class="item" :class="{ 'item-3': index == 3 }">
          <view class="text-box">
            <i class="iconfont icon" :class="item.icon"></i>
            <text>{{ item.text }}</text>
          </view>
          <view class="text-box placeholder">
            <text>{{ item.placeholder }}</text>
            <i class="iconfont icon-1 icon-icon-test5"></i>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import UserCard from "./login/UserCard.vue";
import VipAndStore from "@/pages/newApp/userCenter/vipAndStore/index.vue";
import Recode from "@/pages/newApp/userCenter/recode/index.vue";
export default {
  data() {
    return {
      ts:0,//check login status

      textArr: [
        {
          text: "兑奖记录",
          placeholder: "奖品兑换记录",
          icon: "icon-baobiao",
        },
        {
          text: "帮助中心",
          placeholder: "存取款、投注有疑问，看这里",
          icon: "icon-bangzhu1",
        },
        {
          text: "加入我们",
          placeholder: "合营计划",
          icon: "icon-zhucehuiyuan",
        },
        {
          text: "关于亚博",
          placeholder: "",
          icon: "icon-info",
        },
        {
          text: "打开亚博体育APP",
          placeholder: "",
          icon: "icon-shouji",
        },
      ],
    };
  },
  components: {
    UserCard,
    VipAndStore,
    Recode,
  },

  onShow() {
    this.ts = new Date().getTime()
  },
};
</script>
<style lang="scss" scoped>
.df {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#usercenter {
  height: 90vh;
  // border: 1px solid blue;
  background-color: #eee;
  .top {
    background-color: #fff;
    padding-bottom: 20rpx;
    border-radius: 0 0 30rpx 30rpx;
  }
  .bottom {
    .item-box {
      padding-left: 26rpx;
      background-color: #fff;
      .item {
        background-color: #fff;
        @extend .df;
        height: 100rpx;
        padding-right: 15rpx;
        margin-top: 20rpx;
        // border-top: 1px solid #f1f1f1;
        &.item-3 {
          margin-top: 0;
          border-top: 1px solid #f1f1f1;
        }
        .text-box {
          @extend .df;
          color: #414655;
          &.placeholder {
            width: 55%;
            font-size: 24rpx;
            color: #cbced8;
            justify-content: flex-end;
            .icon-1 {
              font-size: 42rpx;
            }
          }
          .iconfont {
            color: gray;
          }
          .icon {
            margin-right: 15rpx;
            font-size: 48rpx;
          }
        }
      }
    }
  }
}
</style>