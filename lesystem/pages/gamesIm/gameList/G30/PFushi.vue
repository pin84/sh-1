<template>
  <view
    ><ListCircle
      :titleArr="titleArr"
      @selectedNum="selectedNum"
      :numLen="10"
      :isAddZero="false"
      :listStart="0"
      :size="4"
  /></view>
</template>

<script>
import playList from "./playList.js";
import ListCircle from "@/pages/gamesIm/common/ListCircle";
export default {
  data() {
    return {
      gameConfig: {},
      titleArr: ["百位", "十位", "个位"],
      selectedObj: {},
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
  },

  created() {
    this.initPage();
  },

  methods: {
    initPage() {
      let { I, C } = this.$store.state.GDV3.v3CurGame;
      let gameConfig = playList[I];
      if (!gameConfig) {
        this.$util.showToast({ title: "config undefind!" });
        return;
      }

      let { MB, MxO, MiO } = C[0];
      let ratioObj = {
        MB,
        MxO,
        MiO,
      };
      this.$store.commit("v3RatioInitValue", ratioObj);

      this.gameConfig = gameConfig;
      let { titleArr } = gameConfig;
      this.titleArr = titleArr;
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
    addToBasket(isShowBasket = true) {
      let basket = this.$store.state.GDV3.selectedNum;
      if (JSON.stringify(basket) !== "{}") {
        this.$store.commit("v3NumBasket", basket);
        this.$store.commit("v3selectedNum", {});
        this.$store.commit("v3FootMoney", {});
        this.$store.commit("v3ClearSelected", new Date().getTime());
        if (isShowBasket) {
          this.$store.commit("v3IsShowNumBaket", true);
        }
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
        obj.money = (obj.money / 2) * radix;
        let num = obj.len;
        let money = obj.money;
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
