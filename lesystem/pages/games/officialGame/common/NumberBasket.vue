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
        <view v-if="list.length == 0" class="padding"
          >暂无任何投注内容</view
        >
        <RandomList :randomList="list" @clearAll="clearAll" v-else />
      </view>
    </view>
  </view>
</template>

<script>
import RandomList from "./NumberBasket_random.vue";
export default {
  data() {
    return {
      btnList: [],
      curGameobj: {},
      list: [],

      banRandom: [1314, 1298, 3376, 3374, 3182, 1358],
    };
  },
  components: {
    RandomList,
  },

  watch: {
    "$store.state.gameData.curGame": {
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
      let { I, N } = this.$store.state.gameData.curGame;
      let index = this.banRandom.findIndex((item) => item === I);
      let banNameList = [
        "百家乐",
        "牛牛",
        "万千",
        "万百",
        "万十",
        "万个",
        "千百",
        "千十",
        "千个",
        "百十",
        "百个",
        "十个",
      ];
      let idx = banNameList.findIndex((name) => name === N);
      if (index !== -1 || idx != -1) {
        this.btnList = ["继续下注"];
      } else {
        this.btnList = ["机选1注", "机选5注", "继续下注"];
      }
    },
    initData() {
      let basketArr = this.$store.state.GDV3.numBasket;
      this.list = basketArr;

      
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
          this.$emit("showNumber");
          break;
        default:
          break;
      }
    },

    createGame() {
      let curGameObj = this.$store.state.gameData.curGame;
      let { rule } = this.$store.state.gameData.curGameRule;
      let { rate, ratio } = this.$store.state.gameData.curRate;
      // let obj = jsonGameList[curGameObj.gameType][curGameObj.N];

      let game = {
        gName: curGameObj.gameType,
        gName_1: curGameObj.N,
        gType: obj.title[this.createRandomNum(0, obj.title.length - 1)].name,
        rule: obj.rule,
        numStr: [this.createRandomNum(0, 9)],
        len: 1,
        money: 2 * rate * ratio,
        rate,
        ratio: String(ratio),
      };

      if (rule === 5) {
        let arr = [];
        for (let i = 0; i < 5; i++) {
          arr.push(this.createRandomNum(0, 9));
        }
        game.numStr = arr;
        game.gName = "";
        game.gType = "";
      }

      return game;
    },

    createRandomNum(minInt, manInt) {
      // 生成 [n,m)，包含n但不包含m的正整数： parseInt(Math.random()*(m-n)+n)
      // 生成 (n,m]，不包含n但包含m的正整数： parseInt(Math.random()*(m-n)+n)+1
      // 生成 [n,m]，包含n和m的随机数： parseInt(Math.random()*(m-n+1)+n)
      // 生成 (n,m)，不包含n和m的正整数：parseInt(Math.random()*(m-n-1)+n+1)
      return parseInt(Math.random() * (manInt - minInt + 1) + minInt);
    },
    clearAll() {
      this.list = [];
      this.$store.commit("v3NumBasket", "clearAll");
      this.$emit("showNumber");
    },
  },
};
</script>

<style lang="scss" scoped>
.number-basket{
  height: 78vh;
  overflow:scroll;
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
    color: #b5aaca;
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
