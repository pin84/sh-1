<template>
  <view class="play">
    <ListSquare :list="list" itemWidth="25%" />
  </view>
</template>

<script>
import ListSquare from "@/pages/gamesIm/common/commonIm/ListSquare";
export default {
  data() {
    return {
      list: [],
    };
  },
  components: {
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
    // "$store.state.GDV3.temValue": function (val) {
    //   this.initData(val);
    // },
  },

  created() {
    this.initData();
  },

  methods: {
    addToBasketRandom(val) {
      let randomArr = [];
      this.allData.forEach((arr) => {
        randomArr.push(...arr);
      });
      let { n } = val;
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
      let selectArr = [];
      this.list.forEach((item) => {
        if (item.active) {
          selectArr.push(item);
        }
      });

      // console.log(selectArr);
      // return


      return this.$buyOptions.addToBasket({ selectArr, isShowBasket });
    },
    changeRate(val) {
      let { percentage } = val;
      this.list.forEach((item) => {
        item.odds = this.$buyDataHandler.setNumDecimal(
          item.MxO - (item.MxO - item.MiO) * percentage,
          3
        );
      });
      this.list.push({});
      this.list.pop();
    },
    initData() {
      let { percentage, selectBack } = this.$store.state.GDV3.officialRate;
      let curObj = this.$store.state.GDV3.v3CurGame;
      let list = JSON.parse(JSON.stringify(curObj.C));
      let arr = [];
      list.forEach((obj) => {
        obj.C.forEach((item) => {
          item.goal = item.I
          item.N1 = obj.N;
          item.odds = this.$buyDataHandler.setNumDecimal(
            item.MxO - (item.MxO - item.MiO) * percentage,
            2
          );
          arr.push(item);
        });
      });

      this.list = arr;
    },


  },
};
</script>

