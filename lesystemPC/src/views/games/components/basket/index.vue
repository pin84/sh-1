<template>
  <div>
    <div v-if="basketType == 1">
      <TopBar :isShowRandom="isShowRandom" />
      <BasketOffice />
    </div>

    <div v-else>
      <BasketCredit v-if="isShowBasketCrdit" />
    </div>
  </div>
</template>

<script>
import TopBar from "./TopBar";
import BasketOffice from "./BasketOffice";
import BasketCredit from "./BasketCredit";
export default {
  data() {
    return {
      isShowBasketCrdit: false,
      basketType: 1,
      isShowRandom: true,
      prohibitList: [
        1376,
        1377,
        1378,
        1379,
        1380,
        2255,
        2256,
        1404,
        1398,
        1399,
        1775,
        1298,
        1307,
        2531,
        1358,
        1361,
        1364,
        1368,
        1314,
        1318,
        1337,
        1343,
        1344,
        3183,
        3186,
        3192,
        3189,
        3195,
        3198,
        3201,
        3204,
        3207,
        3210,
        3375,
        3377,
        1773,
        1767,
      ],
    };
  },
  components: {
    TopBar,
    BasketOffice,
    BasketCredit,
  },

  watch: {
    "$store.state.gd.showCreditBasket": function (val) {
      this.showCreditBasket(val);
    },
    "$store.state.gd.curGame": {
      handler: function (val) {
        let { I } = val;
        this.isShowRandom = !this.prohibitList.includes(I);
      },
      deep: true,
    },
  },

  created() {
    this.initData();
  },

  methods: {
    showCreditBasket(val) {
      this.isShowBasketCrdit = val;
    },
    initData() {
      let { id } = this.$route.query;
      let { gameType } = this.$store.state.gd.indexGameData;
      this.basketType = gameType;
    },
  },
};
</script>