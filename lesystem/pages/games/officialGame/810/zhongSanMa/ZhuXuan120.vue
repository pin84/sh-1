<template>
  <view
    ><ListCircle
      :titleArr="titleArr"
      @selectedNum="selectedNum"
      :isShowSort="false"
  /></view>
</template>

<script>
import ListCircle from "@/pages/games/common/ListCircle";
import playList from "./playList.js";
export default {
  data() {
    return {
      gameConfig: {},
      titleArr: ["组三"],
      selectedObj: {},
      rate: 1,
      ratio: 1,
      odds: 1,
      lenLimit: 3, //
    };
  },
  components: {
    ListCircle,
  },

  watch: {
    "$store.state.GDV3.v3AddRandom": {
      handler: function (val) {
        this.addToBasketRandom(val.n);
      },
    },
    "$store.state.GDV3.clearSelected": function (val) {
      this.selectedObj = {};
    },

    "$store.state.GDV3.addToBasket": function (val) {
      this.addToBasket();
    },
    "$store.state.GDV3.v3ToBuy": {
      handler: function () {
        this.v3ToBuy();
      },
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
        this.initPage(val.N);
      },
      deep: true,
    },
  },

  created() {
    this.initPage();
  },

  methods: {
    initPage(n) {
      let { N } = this.$store.state.gameData.curGame;

      this.gameConfig = playList[N];
      let { rate, ratio, odds } = this.$store.state.GDV3.officialRate;
      this.rate = rate;
      this.ratio = ratio;
      this.odds = odds;
      if (!n) {
        let { N } = this.$store.state.gameData.curGame;
        n = N;
      }

      let { titleArr, lenLimit, randomLen } = this.gameConfig;
      this.titleArr = titleArr;
      this.lenLimit = lenLimit;
    },
    v3ToBuy() {
      this.addToBasket(true);
      this.$emit("buy810");
    },
    addToBasketRandom(n) {
      let { N, C } = this.$store.state.gameData.curGame;
      let { radix } = this.$store.state.GDV3.v3IndexGameAllData;
      while (n--) {
        let obj;
        if (this.gameConfig.addToBasketRandom) {
          obj = this.gameConfig.addToBasketRandom();
          obj.I = C[0].I;
          obj.gName = N;
          obj.len = 2;
          obj.money = radix * 2;
        } else {
          obj = this.$buyDataHandler.createBuyObj();
          let { rate, ratio } = obj;
          let str = this.$buyDataHandler.createNoReaptRandomNum(1);
          obj.I = C[0].I;
          obj.gName = N;
          obj.len = 1;
          obj.money = this.$buyDataHandler.handlerMoneyDecimal(
            radix * rate * ratio
          );
          obj.numStr = str.split("").join("|");
          obj.orderStr = str.split("").join("");
        }

        this.$store.commit("v3NumBasket", obj);
      }
    },

    addToBasket(comfromSelect = false) {
      let basket = this.$store.state.GDV3.selectedNum;

      if (JSON.stringify(basket) === "{}") {
        if (!comfromSelect) {
          this.$util.showConfirm({
            content: "号码选择不完整，请重新选择",
            showCancel: false,
          });
        }
      } else {
        this.$store.commit("v3NumBasket", basket);

        this.$store.commit("v3selectedNum", {});
        this.$store.commit("v3FootMoney", {});
        this.$store.commit("v3ClearSelected", new Date().getTime());
      }
    },
    selectedNum(obj) {
      this.selectedObj = Object.assign(this.selectedObj, obj);
      let flag = false;
      let len = 0;
      for (const [key, value] of Object.entries(this.selectedObj)) {
        if (value.length >= this.gameConfig.lenLimit) {
          flag = true;
          len = value.length;
        }
      }

      if (flag) {
        this.handlerData(len);
      } else {
        this.$store.commit("v3selectedNum", {});
        this.$store.commit("v3FootMoney", {});
      }
    },

    handlerData(len) {
      let handlerData = this.gameConfig.dataHandler({
        selectedObj: this.selectedObj,
        len,
      });

      let { obj, s, money } = handlerData;
      let { N, C } = this.$store.state.gameData.curGame;

      let { radix } = this.$store.state.GDV3.v3IndexGameAllData;
      money = (money / 2) * radix;
      obj.I = C[0].I;
      obj.gName = N;
      obj.money = money;
      this.$store.commit("v3FootMoney", { num: s, money });
      this.$store.commit("v3selectedNum", obj);
    },
  },
};
</script>

<style></style>
