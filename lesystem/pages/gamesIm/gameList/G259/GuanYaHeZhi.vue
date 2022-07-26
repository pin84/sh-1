<template>
  <view class="play">
    <!-- <view class="special-box" v-for="(item, idx) in playList" :key="idx"> -->
    <!-- <view class="text-bold">{{ item.N }}</view> -->
    <ListCircleBgRed :list="playList" />
    <!-- </view> -->
  </view>
</template>

<script>
import ListCircleBgRed from "@/pages/gamesIm/common/ListCircleBgRed";
export default {
  data() {
    return {
      playList: [],
      randomArr: [],
      isHasSelected: 0,
    };
  },
  components: {
    ListCircleBgRed,
  },
  watch: {
    "$store.state.GDV3.officialRate": {
      handler: function (val) {
        this.initData(val);
      },
      deep: true,
    },

    "$store.state.GDV3.v3AddRandom": {
      handler: function (val) {
        this.addToBasketRandom(val);
      },
      deep: true,
    },
    "$store.state.GDV3.addToBasket": {
      handler: function (val) {
        this.addToBasket();
      },
      deep: true,
    },
    "$store.state.GDV3.v3ToBuy": function (val) {
      this.v3ToBuy();
    },
  },

  created() {
    this.initData();
  },
  methods: {
    v3ToBuy() {
      let flag = this.addToBasket(false);
      if (!flag) {
        return;
      }

      //触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
      let ts = new Date().getTime();
      this.$store.commit("v3ToBuyNext", ts);
    },
    addToBasket(isShowBasket = true) {
      let m = this.$store.state.GDV3.v3InputMoney;
      let { N } = this.$store.state.GDV3.v3CurPlayList;

      let i = 0;
      this.playList.forEach((item) => {
        if (item.active) {
          let obj = this.$buyDataHandler.createBuyObj();
          obj.I = item.I;
          obj.gName = N;
          obj.numStr = item.N;
          obj.orderStr = item.N;
          obj.money = m;
          obj.odds = item.odds;
          obj.MiO = item.MiO;
          obj.MxO = item.MxO;
          this.$store.commit("v3NumBasket", obj);

          i++;
        }
      });

      let numBasket = this.$store.state.GDV3.numBasket;

      if (i === 0 && numBasket.length === 0) {
        this.$util.showConfirm({
          content: "您还没有勾选",
          showCancel: false,
        });
        return;
      }

      if (m) {
        numBasket.forEach((item) => {
          item.money = m;
        });
      }

      if (isShowBasket) {
        this.$store.commit("v3IsShowNumBaket", true);
      }

      this.$store.commit("v3ClearSelected", new Date().getTime());
      this.$store.commit("v3IsHasSelected", false);

      return true
    },

    addToBasketRandom(val) {
      let { n } = val;
      let len = this.playList.length - 1;
      let { N } = this.$store.state.GDV3.v3CurPlayList;
      while (n--) {
        let i = this.$buyDataHandler.createRandomNum(0, len);
        let obj = this.$buyDataHandler.createBuyObj();
        let item = this.playList[i];
        obj.I = item.I;
        obj.gName = N;
        obj.numStr = item.N;
        obj.orderStr = item.N;
        obj.money = "";
        obj.odds = item.odds;
        obj.MiO = item.MiO;
        obj.MxO = item.MxO;
        this.$store.commit("v3NumBasket", obj);
      }
      this.$store.commit("v3IsShowNumBaket", true);
    },

    initData(val) {
      if (!val) {
        val = this.$store.state.GDV3.officialRate;
      }
      let { percentage, selectBack } = val;
      // let list = uni.getStorageSync('curPlayList').C;
      let obj = this.$store.state.GDV3.v3CurPlayList;
      if (JSON.stringify(obj) === "{}") return;
      let list = this.$store.state.GDV3.v3CurPlayList.C[0].C;
      list.forEach((inItem) => {
        inItem.odds = this.$buyDataHandler.setNumDecimal(
          inItem.MxO - (inItem.MxO - inItem.MiO) * percentage,
          3
        );
      });

      this.playList = list;
      this.refreshPage();
    },
    refreshPage() {
      this.playList.push({});
      this.playList.pop();
    },
  },
};
</script>

<style lang="scss" scoped>
.play {
  height: 100%;
  background-color: #e5e5e5;
  overflow: scroll;
  .special-box {
    text-align: center;
    .text-bold {
      font-size: 28rpx;
      color: #5d5d5d;
      padding: 8rpx 0;
    }
    .special-list {
      display: flex;
      justify-content: space-around;
      border: 1px solid #f3f3f3;
      width: 100%;
      .special-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 25%;
        border: 1px solid #e3e3e3;
        background-color: #fff;
        border-radius: 15rpx;
        padding: 5rpx 0;
        .text-name {
          color: #ff4372;
          font-weight: 600;
        }
        .text-name-b {
          color: #6ebaff;
        }
      }
      .active {
        background-color: #ffd800;
      }

      .w_50 {
        width: 50%;
      }
    }
  }
}
</style>
