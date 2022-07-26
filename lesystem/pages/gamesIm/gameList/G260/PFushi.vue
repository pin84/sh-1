<template>
  <view
    ><ListCircle
      :titleArr="titleArr"
      @selectedNum="selectedNum"
      :isShowSort="isShowSort"
  /></view>
</template>

<script>
import playList from "./playList.js";
import ListCircle from "@/pages/gamesIm/common/ListCircle";
export default {
  data() {
    return {
      gameConfig: {},
      isShowSort: true,
      titleArr: ["百位", "十位", "个位"],
      selectedObj: {},
      rate: 1,
      ratio: 1,
      odds: 1,
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
        let { rate, ratio, odds } = val;
        this.rate = rate;
        this.ratio = ratio;
        this.odds = odds;
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
    let { rate, ratio, odds } = this.$store.state.GDV3.officialRate;
    this.rate = rate;
    this.ratio = ratio;
    this.odds = odds;

    this.initPage();


    
  },

  methods: {
    initPage() {
      let { N } = this.$store.state.GDV3.v3CurGame;
      let gameConfig = playList[N];
      if (!gameConfig) {
        this.$util.showToast({ title: "config undefind!" });
        return;
      }
      this.gameConfig = gameConfig;
      let { titleArr, isShowSort } = gameConfig;
      this.titleArr = titleArr;
      this.isShowSort = isShowSort;
    },
    addToBasketRandom(n) {
      while (n--) {
        let obj = this.gameConfig.addToBasketRandom();
        this.$store.commit("v3NumBasket", obj);
      }
      this.$store.commit("v3IsShowNumBaket", true);
    },
    v3ToBuy() {
      let basket = this.$store.state.GDV3.selectedNum;
      if (JSON.stringify(basket) !== "{}") {
        this.$store.commit("v3NumBasket", basket);
        this.$store.commit("v3selectedNum", {});
        this.$store.commit("v3FootMoney", {});
        this.$store.commit("v3ClearSelected", new Date().getTime());
      }
      //触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
      let ts = new Date().getTime();
      this.$store.commit("v3ToBuyNext", ts);
    },
    addToBasket() {
      let basket = this.$store.state.GDV3.selectedNum;
      if (JSON.stringify(basket) !== "{}") {
        this.$store.commit("v3NumBasket", basket);
        this.$store.commit("v3selectedNum", {});
        this.$store.commit("v3FootMoney", {});
        this.$store.commit("v3ClearSelected", new Date().getTime());
        this.$store.commit("v3IsShowNumBaket", true);
      } else {
        this.$util.showConfirm({
          content: "号码选择不完整，请重新选择",
          showCancel: false,
        });
      }
    },
    selectedNum(selected) {
      let allSelected = Object.assign(this.selectedObj, selected);
      let obj = this.gameConfig.dataHandler(allSelected, this.titleArr);

      if (obj) {
        let { radix } = this.$store.state.GDV3.v3IndexGameAllData;
        let num = obj.len;
        let money = (obj.money / 2) * radix;
        obj.money = money;
        this.$store.commit("v3FootMoney", { num, money });
        this.$store.commit("v3selectedNum", obj);
      } else {
        this.$store.commit("v3selectedNum", {});
        this.$store.commit("v3FootMoney", {});
      }
    },
  },
};
</script>

<style></style>
