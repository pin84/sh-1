<template>
  <view id="game-overview">
    <view class="left">
      <view
        class="type-box"
        @click="selectType(index)"
        :class="{'active':curSelectIndex == index}"
        v-for="(item, index) in gameType"
        :key="index"

      >
        <i class="iconfont" :class="item.icon"></i>
        <text class="text">{{ item.name }}</text>
      </view>
    </view>
    <view class="right">
      <view
        v-for="(item, index) in curType.len"
        :key="index"
        class="game-card"
        :class="[{ h_142: curType.type ==1 },{ h_92: curType.type ==4 },]"
      >
        <ImageBox
          :boxStyle="boxStyle"
          :src="
            require(`static/newApp/home/gamelist/${curType.prefix}_${
              index + 1
            }.png`)
          "
        />
      </view>
    </view>
  </view>
</template>
<script>
import ImageBox from "@/pages/newApp/components/ImageBox.vue";
export default {
  data() {
    return {
      curSelectIndex:0,
      boxStyle: {
        width: "100%",
        // height: "100%",
      },
      curType: {},
      gameType: [
        {
          icon: "icon-TYJJ",
          name: "体育",
          type: 1,
          prefix: "ty",//图片名字前缀
          len: 2, //右边图片的数量
        },
        {
          icon: "icon-TYJJ",
          name: "真人",
          type: 2,
          prefix: "zr",
          len: 5,
        },
        {
          icon: "icon-TYJJ",
          name: "棋牌",
          type: 3,
          len: 4,
          prefix: "qp",
        },
        {
          icon: "icon-TYJJ",
          name: "电竞",
          type: 4,
          len: 3,
          prefix: "dj",
        },
        {
          icon: "icon-TYJJ",
          name: "彩票",
          type: 5,
          len: 4,
          prefix: "cp",
        },
        {
          icon: "icon-TYJJ",
          name: "电子",
          type: 6,
          len: 7,
          prefix: "dz",
        },
      ],
    };
  },
  components: {
    ImageBox,
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.curType = this.gameType[0];
    },
    selectType(index) {
      this.curSelectIndex = index
      this.curType = this.gameType[index];
      console.log(this.curType);
    },
  },
};
</script>

<style lang="scss" scoped>
#game-overview {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 10rpx;
  .left {
    flex: 0 0 108rpx;
    .type-box {
      width: 100%;
      height: 84rpx;
      border-radius: 26rpx;
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      // background: linear-gradient(#fff, 80%, #9198e5);
      background: url('/static/newApp/home/home_tabs_no_active.png') center center;
      background-size: contain;
      font-size: 20rpx;
      &.active {
        background: url('/static/newApp/home/home_tabs_active.png') center center;
        .text{
          color: #fff;
        }
      }
      .text{
        color: #9aa4c2;
      }
      .iconfont {
        display: inline-block;
        flex: 0 0 50%;
        text-align: center;
        font-size: 36rpx;
      }
    }
  }
  .right {
    width: 100%;
    height: 100%;
    // border: 1px solid blue;
    margin-left: 25rpx;
    overflow: scroll;
    .game-card {
      height: 176rpx;
      margin-bottom: 15rpx;
      border-radius: 20rpx;

      box-shadow: 0 0  13rpx  rgba(187, 197, 240 ,0.5);
      &.h_142 {
        height: 284rpx;
      }
 
      &.h_92 {
        height: 184rpx;
      }
    }
  }
}
</style>