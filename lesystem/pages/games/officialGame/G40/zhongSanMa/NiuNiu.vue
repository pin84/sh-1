<template>
  <view
    ><ListSquare
      :titleArr="titleArr"
      :contentArr="contentArr"
      @selectedNum="selectedNum"
      :isShowSort="false"
  /></view>
</template>

<script>
import ListSquare from "@/pages/games/common/ListSquare";
import playList from "./playList.js";
export default {
  data() {
    return {
      gameConfig: {},
      contentArr: [],
      titleArr: ["牛牛", "牛牛双面"],
      dataArr: [],
      rate: 1,
      ratio: 1,
      odds: 1,
      limitlen: 3, //
    };
  },
  components: {
    ListSquare,
  },

  watch: {
    "$store.state.GDV3.clearSelected": function (val) {
      this.dataArr = [];
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
        this.handlerData();
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

      let { titleArr } = this.gameConfig;
      // this.titleArr = titleArr || []
      let gameData = this.$store.state.gameData.curGame;

      gameData.C.forEach((outObj) => {
        outObj.C.forEach((item) => {
          item.temI = outObj.I;
          item.temN = outObj.N;
        });
      });

      let temArr1 = gameData.C[0].C;
      let temArr2 = gameData.C[1].C.concat(gameData.C[2].C).concat(
        gameData.C[3].C
      );

      this.contentArr = [temArr1, temArr2];
    },
    v3ToBuy() {
      // let basket = this.$store.state.GDV3.selectedNum;
      // if (JSON.stringify(basket) !== '{}') {
      // 	this.$store.commit('v3NumBasket', basket);
      // 	this.$store.commit('v3selectedNum', {});
      // 	this.$store.commit('v3FootMoney', {});
      // 	this.$store.commit('v3ClearSelected', new Date().getTime());
      // }
      this.addToBasket();

      this.$emit("buy810");
    },

    addToBasket() {
      let basket = this.$store.state.GDV3.selectedNum;

      if (JSON.stringify(basket) !== "{}") {
        basket.dataArr.forEach((item) => {
          basket.gName = item.temN;
          basket.numStr = item.N;
          basket.orderStr = item.N;
          basket.I = item.I;

          this.$store.commit("v3NumBasket", JSON.parse(JSON.stringify(basket)));
        });

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
    selectedNum(dataArr) {
      this.dataArr = dataArr;
      let len = dataArr.length;
      if (len) {
        this.handlerData();
      } else {
        this.$store.commit("v3selectedNum", {});
        this.$store.commit("v3FootMoney", {});
        this.$store.commit("sumBonus", 0);
          this.$store.commit("v3RatioCurValue", {});
      }
    },

    handlerData() {
      //触发比率条的更新
      let len = this.dataArr.length;
      let { odds, rate, ratio } = this.$store.state.GDV3.officialRate;
      let { radix } = this.$store.state.GDV3.v3IndexGameAllData;
      let money = this.$buyDataHandler.handlerMoneyDecimal(
        len * radix * rate * ratio
      );

      let obj = this.$buyDataHandler.createBuyObj();

      obj.dataArr = this.dataArr;

      let moxObj = {};
      let maxMxO = {};
      let mxo = 0;
      this.dataArr.forEach((item) => {
         if (item.MxO > mxo) {
          maxMxO = item;
          mxo = item.MxO;
        }
        if (moxObj[item.temN]) {
          if (moxObj[item.temN] < item.MxO) {
            moxObj[item.temN] = item.MxO;
          }
        } else {
          moxObj[item.temN] = item.MxO;
        }
      });

      this.$store.commit("v3RatioCurValue", maxMxO);

      let n = Object.values(moxObj).reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue);
      }, 0);

      this.$store.commit("sumBonus", n);

      this.$store.commit("v3FootMoney", { num: len, money });
      this.$store.commit("v3selectedNum", obj);
    },
  },
};
</script>

<style></style>
