<template>
  <view class="play">
    <ShengXiao :list="list1" />
  </view>
</template>

<script>
import ShengXiao from "./ShengXiao";
import ListSquare from "@/pages/gamesIm/common/commonIm/ListSquare";
export default {
  data() {
    return {
      list1: [],
    };
  },
  components: {
    ShengXiao,
    ListSquare,
  },
  watch: {
    "$store.state.GDV3.officialRate": {
      handler: function (val) {
        this.changeRate(val);
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
    selectedItem(n) {
      console.log(n);
    },
    addToBasketRandom(val) {
      let { n } = val;
      let randomArr = [];
      randomArr.push(...this.list1, ...this.list2);
      this.$buyOptions.addToBasketRandomCredit(randomArr, n);
    },
    async v3ToBuy() {
      let flag = await this.addToBasket(false);
      if (!flag) return;
      //触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
      let ts = new Date().getTime();
      this.$store.commit("v3ToBuyNext", ts);
    },

    addToBasket(isShowBasket = true) {
      let arr1 = this.$buyOptions.filteActive(this.list1);
      let arr = [];
      arr.push(...arr1);

      return this.$buyOptions.addToBasket({ selectArr: arr, isShowBasket });
    },

    changeRate(val) {
      let { percentage } = val;
      this.$buyOptions.changeRateOption(this.list1, percentage);
    },

    initData() {
      let { percentage, selectBack } = this.$store.state.GDV3.officialRate;
      let curObj = this.$store.state.GDV3.v3CurGame.C[0];
       let list = JSON.parse(JSON.stringify(curObj.C));
      list.forEach((item) => {
        item.goal = item.I
        item.N1 = curObj.N;
        item.odds = this.$buyDataHandler.setNumDecimal(
          item.MxO - (item.MxO - item.MiO) * percentage,
          3
        );
      });
      list.sort((a, b) => a.I - b.I);
      this.list1 = list;
    },
    setOdds(arr, percentage, N1) {
      arr.forEach((item) => {
        item.N1 = N1;
        item.odds = this.$buyDataHandler.setNumDecimal(
          item.MxO - (item.MxO - item.MiO) * percentage,
          3
        );
      });
    },
    createlist(allArr, percentage, ids = []) {
      let list = [];
      ids.forEach((id) => {
        let obj = allArr.find((outItem) => outItem.Id == id);
        if (!obj) return;
        obj.C.forEach((item) => {
          item.N1 = obj.N;
          item.odds = this.$buyDataHandler.setNumDecimal(
            item.MxO - (item.MxO - item.MiO) * percentage,
            3
          );
          list.push(item);
        });
      });
      return list;
    },
  },
};
</script>

