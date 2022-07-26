<template>
  <view><ListCircle :titleArr="titleArr" @selectedNum="selectedNum" /></view>
</template>

<script>
import playList from "./playList.js";
import ListCircle from "@/pages/games/common/ListCircle";
export default {
  data() {
    return {
      gameConfig: {},
      titleArr: ["万位", "千位", "百位", "十位"],
      selectedObj: {},
      rate: 1,
      ratio: 1,
      odds: 1,
      num: 0,
      money: 0,
    };
  },
  components: {
    ListCircle,
  },

  watch: {
    "$store.state.GDV3.clearSelected": function (val) {
      this.selectedObj = {};
      this.$store.commit("v3selectedNum", {});
      this.$store.commit("v3FootMoney", {});
    },

    "$store.state.GDV3.addToBasket": function (val) {
      this.addToBasket();
    },
    "$store.state.GDV3.v3ToBuy": function (val) {
      this.v3ToBuy();
    },

    "$store.state.GDV3.officialRate": {
      handler: function (val) {
        let { rate, ratio, odds } = val;
        this.rate = rate;
        this.ratio = ratio;
        this.odds = odds;
        this.selectedNum();
      },
      deep: true,
    },
    "$store.state.gameData.curGame": {
      handler: function (val) {
        this.$store.commit("setNumBasket", []);
        this.initPage();
      },
      deep: true,
    },
  },

  created() {
    this.initPage();
  },

  methods: {
    initPage() {
      let { rate, ratio, odds } = this.$store.state.GDV3.officialRate;
      this.rate = rate;
      this.ratio = ratio;
      this.odds = odds;

      let { N } = this.$store.state.gameData.curGame;

      this.gameConfig = playList[N];
      let { titleArr } = this.gameConfig;
      this.titleArr = titleArr;
    },
    v3ToBuy() {
      let basket = this.$store.state.GDV3.selectedNum;
      if (JSON.stringify(basket) !== "{}") {
        this.$store.commit("v3NumBasket", basket);
        this.$store.commit("v3selectedNum", {});
        this.$store.commit("v3FootMoney", {});
        this.$store.commit("v3ClearSelected", new Date().getTime());
      }
      this.$emit("buy810");
    },
    addToBasket() {
      let basket = this.$store.state.GDV3.selectedNum;
      if (JSON.stringify(basket) !== "{}") {
        this.$store.commit("v3NumBasket", basket);
        this.$store.commit("v3selectedNum", {});
        this.$store.commit("v3FootMoney", {});
        this.$store.commit("v3ClearSelected", new Date().getTime());
      } else {
        this.$util.showConfirm({
          content: "号码选择不完整，请重新选择",
          showCancel: false,
        });
      }
    },
    selectedNum(obj) {
      this.selectedObj = Object.assign(this.selectedObj, obj);
      let len = this.titleArr.length;
      let i = 0;
      for (const [key, value] of Object.entries(this.selectedObj)) {
        if (value.length !== 0) {
          i++;
        }
      }

      if (i === len) {
        this.handlerData();
      } else {
        this.$store.commit("v3selectedNum", {});
        this.$store.commit("v3FootMoney", {});
      }
    },

    handlerData() {
      let n = Object.entries(this.selectedObj).reduce(
        (accumulator, currentValue) => {
          return accumulator * currentValue[1].length;
        },
        1
      );
      let titleLength = this.titleArr.length;
      let { radix } = this.$store.state.GDV3.v3IndexGameAllData;

      this.num = titleLength * n;
      this.money = titleLength * n * radix * this.rate * this.ratio;
      this.$store.commit("v3FootMoney", { num: this.num, money: this.money });

      let { I, N, C } = this.$store.state.gameData.curGame;
      let handlerStr = this.$buyDataHandler.sortData(this.selectedObj);
      let str = handlerStr.replace(/\,/g, "").replace(/\|/g, ",");
      let ts = new Date().getTime() / 1000;
      let obj = {
        rate: this.rate, // 模式
        ratio: Number(this.ratio), //倍数
        gName: N,
        gName_1: "",
        gType: "",
        numStr: handlerStr,
        orderStr: str,
        len: this.num, //注数
        money: this.money,
        unitPrice: radix * this.rate,
        I: C[0].I,
        odds: this.odds,
        ts,
      };

      this.$store.commit("v3selectedNum", obj);
    },
  },
};
</script>

<style></style>
