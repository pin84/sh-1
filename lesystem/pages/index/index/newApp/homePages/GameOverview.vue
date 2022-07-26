<template>
  <view id="game-overview">
    <view class="left">
      <view
        class="type-boxa"
        @click="selectType(item, index)"
        :class="{ active: curSelectIndex == index }"
        v-for="(item, index) in gameList"
        :key="index"
      >
        <i class="iconfont" :class="gameTypeIcon[index]"></i>
        <text class="text">{{ item.shortName }}</text>
      </view>
    </view>
    <view class="right">
      <view
        @click="toGame(obj)"
        v-for="(obj, index) in curGame"
        :key="index"
        class="game-card"
      >
        <!-- :class="[{ h_142: curGame.type ==1 },{ h_92: curGame.type ==4 },]" -->
        <ImageBox :boxStyle="boxStyle" :src="obj.picUrl" />
      </view>
    </view>
  </view>
</template>
<script>
import ImageBox from "../components/ImageBox.vue";
export default {
  props: {
    gameList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      gameTypeIcon: [
        "icon-hot",
        "icon-GamePadyouxishoubing",
        "icon-videorecorder",
        "icon-caipiao1",
        "icon-puke",
        "icon-zuqiu2",
        "icon-yu1",
        "icon-TYJJ",
        "icon-jieji",
      ],
      curSelectIndex: 0,
      boxStyle: {
        width: "100%",
      },
      curGame: [],
    };
  },
  components: {
    ImageBox,
  },
  created() {
    this.initData();
    console.log(this.gameList);
  },
  methods: {
    toGame(obj) {
      this.$emit("toGame", obj);
    },
    initData() {
      this.curGame = this.gameList[0].gameList;
    },
    selectType(obj, index) {
      this.curSelectIndex = index;
      this.curGame = obj.gameList;
    },
  },
};
</script>

<style lang="scss" scoped>
$w: 250rpx;
#game-overview {
  width: 100%;
  height: 100%;
  padding: 10rpx;
  display: flex;
  overflow: hidden;
  .left {
    //  height: 300px;
    flex: 0 0 160rpx;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    .type-boxa {
      width: 100%;
      height: 88rpx;
      border-radius: 10rpx;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0 10rpx;
      // background: url("/static/newApp/home/home_tabs_no_active.png") center
      //   center no-repeat;
      background-color: #fff;
      font-size: 20rpx;
      margin-bottom: 20rpx;
      color: #595859;
      &.active {
        background: url("/static/newApp/home/8.png") center center no-repeat;
        color: #fff;
      }
      .text {
        font-size: 30rpx;
      }
      .iconfont {
        display: inline-block;
        flex: 0 0 30%;
        text-align: center;
        font-size: 48rpx;
        line-height: 42rpx;
      }
    }
  }
  .right {
    width: 100%;
    height: 100%;
    margin-left: 25rpx;
    overflow: scroll;
    .game-card {
      display: inline-block;
      width: $w;
      height: $w;
      margin-bottom: 18rpx;
      margin-right: 18rpx;
      overflow: hidden;
      border-radius: 6rpx;
      box-shadow: 0 10rpx 10rpx #d3d3e5;
    }
  }
}
</style>