<template>
  <view>
    <ListCircle
      :titleArr="titleArr"
      @selectedNum="selectedNum"
      :isShowSort="isShowSort"
  /></view>
</template>

<script>
import playList from "./playList.js";
import ListCircle from "@/pages/games/common/ListCircle";
export default {
  data() {
    return {
      gameConfig: {},
      titleArr: ["百位", "十位", "个位"],
      selectedObj: {},
      randomArr: [],
      isShowSort: true,
      curName: "",
    };
  },
  components: {
    ListCircle,
  },

  watch: {
    "$store.state.GDV3.clearSelected": function (val) {
      this.selectedObj = {};
    },

    "$store.state.GDV3.addToBasket": function (val) {
      this.addToBasket();
    },
    "$store.state.GDV3.v3ToBuy": function (val) {
      this.v3ToBuy();
    },
    "$store.state.GDV3.v3AddRandom": {
      handler: function (val) {
        this.addToBasketRandom(val.n);
      },
      deep: true,
    },
    "$store.state.GDV3.officialRate": {
      handler: function (val) {
        this.selectedNum();
      },
      deep: true,
    },
    "$store.state.GDV3.v3CurGame": {
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

    initPage() {
      // let { I, C } = this.$store.state.GDV3.v3CurGame;
      let { N, C } = this.$store.state.gameData.curGame;
      this.randomArr = C;
      this.gameConfig = playList[N];
      this.curName = N;

      let { MB, MxO, MiO } = C[0];
      let ratioObj = {
        MB,
        MxO,
        MiO,
      };
      this.$store.commit("v3RatioInitValue", ratioObj);
      let { titleArr } = this.gameConfig;
      this.titleArr = titleArr;
    },
    addToBasketRandom(n) {
      let len = this.randomArr.length - 1;
      let arr = this.randomArr;
      while (n--) {
        let obj = this.$buyDataHandler.createBuyObj();
        let i = this.$buyDataHandler.createRandomNum(0, len);
        let j = this.$buyDataHandler.createRandomNum(0, 9);
        let randomObj = arr[i];

        obj.gName = this.curName;
        obj.numStr = j;

        let t = randomObj.N.slice(3);
        obj.gType = t;
        obj.orderStr = j
        obj.I = randomObj.I;
        this.$store.commit("v3NumBasket", obj);
      }
      this.$store.commit("v3IsShowNumBaket", true);
    },
    v3ToBuy() {
      this.addToBasket(false);
      this.$emit("buy810");
    },
    addToBasket(isShowBasket = true) {
      let basket = this.$store.state.GDV3.selectedNum;
      let basketArr = this.$store.state.GDV3.numBasket;
      if (basketArr.length == 0 && JSON.stringify(basket) === "{}") {
        this.$util.showConfirm({
          content: "号码选择不完整，请重新选择",
          showCancel: false,
        });
        return;
      }

      if (Array.isArray(basket)) {
        basket.forEach((item) => {
          this.$store.commit("v3NumBasket", item);
        });

        this.$store.commit("v3selectedNum", {});
        this.$store.commit("v3FootMoney", {});
        this.$store.commit("v3ClearSelected", new Date().getTime());
        if (isShowBasket) {
          this.$store.commit("v3IsShowNumBaket", true);
        }
      }
    },
    selectedNum(selected) {
      let basketArr = [];
      let allSelected = Object.assign(this.selectedObj, selected);
      let { radix } = this.$store.state.GDV3.v3IndexGameAllData;

      let len1 = 0;
      Object.values(allSelected).forEach((arr) => {
        if (arr.length != 0) {
          len1++;
        }
      });

      if (len1) {
        let { C } = this.$store.state.gameData.curGame;
        let { MxO } = C[0];
        // this.$store.commit("sumBonus", MxO * len1);
        this.$store.commit("sumBonus", len1);
      } else {
        this.$store.commit("sumBonus", 0);
      }

      let m = 0,
        num = 0;

      for (let [key, value] of Object.entries(allSelected)) {
        let len = value.length;
        num += len;

        let numArr = [];
        value.forEach((item) => {
          numArr.push(item.num);
        });

        let { I, N } = this.randomArr.find((obj) => obj.N.includes(key));
        let obj = this.$buyDataHandler.createBuyObj();
        let { rate, ratio } = obj;
        obj.gName = N;
        obj.I = I;
        obj.len = len;
        let money = this.$buyDataHandler.handlerMoneyDecimal(
          len * radix * rate * ratio
        );
        obj.money = money;
        m += money;
        obj.numStr = numArr.join("|");
        obj.orderStr = numArr.join("|");
        basketArr.push(obj);
      }

      this.$store.commit("v3selectedNum", basketArr);
      this.$store.commit("v3FootMoney", { num, money: m });
    },
  },
};
</script>

<style></style>
