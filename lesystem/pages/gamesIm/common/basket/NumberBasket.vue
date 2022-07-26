<template>
  <view class="number-basket">
    <view class="flex justify-around bg-gray title-list">
      <view
        @click="addRandomObj(btnText)"
        class="title-item bg-white radius-xl flex align-center justify-center"
        v-for="(btnText, index) in btnList"
        :key="index"
      >
        <i
          v-if="index === 2"
          class="iconfont icon-shuangxiang text-bold text-gray"
          style="font-size: 40rpx; line-height: 0rpx"
        ></i>
        <i
          v-else
          class="iconfont icon-tianjia text-bold text-gray"
          style="font-size: 40rpx; line-height: 0rpx"
        ></i>
        <text class="margin-left-sm text-lg">{{ btnText }}</text>
      </view>
    </view>

    <view class="main-body flex justify-center margin-top-xs">
      <view class="no-content bg-white text-center">
        <view v-if="randomList.length === 0" class="padding"
          >暂无任何投注内容</view
        >
        <RandomList :randomList="randomList" @clearAll="clearAll" v-else />
      </view>
    </view>
  </view>
</template>

<script>
import RandomList from './NumberBasket_random.vue'

export default {
  data() {
    return {
      btnList: [],
      curGameobj: {},
      randomList: [],

			banRandom: ['五星组合', '后四组合']
		};
	},
	components: {
		RandomList
	},

  watch: {
    // '$store.state.gameData.curGame': {
    // 	handler: function(val) {
    // 		this.initPage();
    // 	}
    // },

    "$store.state.GDV3.v3CurGame": {
      handler: function (val) {
        this.initPage();
      },
    },

    "$store.state.GDV3.numBasket": {
      handler: function (val) {
        this.initData();
      },
      deep: true,
    },
  },

  created() {
    this.initPage();
    this.initData();
  },
  methods: {
    initPage() {
      let { I } = this.$store.state.GDV3.v3CurGame;
      let bandIdList = [2255, 1399, 1398, 1404, 1767, 1376];
      let index = bandIdList.findIndex((item) => item === I);
      if (index !== -1) {
        this.btnList = ["继续下注"];
      } else {
        this.btnList = ["机选1注", "机选5注", "继续下注"];
      }
    },
    initData() {
      let basketArr = this.$store.state.GDV3.numBasket;
      this.randomList = basketArr;
    },
    addRandomObj(type) {
      switch (type) {
        case "机选1注":
          this.$store.commit("v3AddRandom", {
            n: 1,
            timestamp: new Date().getTime(),
          });
          break;
        case "机选5注":
          this.$store.commit("v3AddRandom", {
            n: 5,
            timestamp: new Date().getTime(),
          });
          break;
        case "继续下注":
          this.$store.commit("v3IsShowNumBaket", false);
          break;
        default:
          break;
      }
    },

    clearAll() {
      this.randomList = [];
      this.$store.commit("v3NumBasket", "clearAll");
      this.$store.commit("v3IsShowNumBaket", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.number-basket {
  height: 100%;
}
.title-list {
  padding: 5px 15rpx;
  .title-item {
    width: 32%;
    border: 1px solid #bfbfbf;
    padding: 10rpx 0;
    text-align: center;
  }
}

.main-body {
  position: relative;
  padding: 0 20rpx;
  z-index: 1;
  .no-content {
    width: 95%;
    position: absolute;
    font-size: 32rpx;
    color: #b5acaa;
  }

  .no-content::before {
    display: block;
    content: "";
    position: absolute;
    top: -10rpx;
    left: -1%;
    height: 20rpx;
    background: #a09e96;
    border-radius: 5rpx;
    width: 102%;
    z-index: -1;
  }
}
</style>
