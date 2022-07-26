<template>
  <view><LongHuDou :list="list" /></view>
</template>

<script>
import LongHuDou from "@/pages/gamesIm/common/commonIm/LongHuDouLiuHeCai";
export default {
  data() {
    return {
      randomArr: [],
      list: [],
      nameArr: [
        "1vs2",
        "1vs3",
        "1vs4",
        "1vs5",
        "1vs6",
        "1vs特",
        "2vs3",
        "2vs4",
        "2vs5",
        "2vs6",
        "2vs特",
        "3vs4",
        "3vs5",
        "3vs6",
        "3vs特",
        "4vs5",
        "4vs6",
        "4vs特",
        "5vs6",
        "5vs特",
        "6vs特",
      ],
    };
  },
  components: {
    LongHuDou,
  },
  watch: {
    "$store.state.GDV3.officialRate": {
      handler: function (val) {
        console.log(val);
        let { percentage } = val;
        this.changeRate(percentage);
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
    changeRate(percentage) {
      this.list.forEach((item, idx) => {
        item.C.forEach((inItem) => {
          inItem.odds = this.$buyDataHandler.setNumDecimal(
            inItem.MxO - (inItem.MxO - inItem.MiO) * percentage,
            3
          );
        });
      });

      this.list.push({});
      this.list.pop();
    },
    v3ToBuy() {
      this.addToBasket(false);
      //触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
      let ts = new Date().getTime();
      this.$store.commit("v3ToBuyNext", ts);
    },
    addToBasket(isShowBasket = true) {
      let money = this.$store.state.GDV3.v3InputMoney;
      let temArr = [];
      this.list.forEach((outItem) => {
        outItem.C.forEach((item) => {
          if (item.active) {
            item.money = money;
            temArr.push(item);
          }
        });
      });

      let basketArr = this.$store.state.GDV3.numBasket;
      if (temArr.length === 0 && basketArr.length === 0) {
        this.$util.showConfirm({
          content: "您还没有勾选",
          showCancel: false,
        });
        return;
      }
      temArr.forEach((item) => {
        this.$store.commit("v3NumBasket", item);
      });
      this.$store.commit("v3ClearSelected", new Date().getTime());
      if (isShowBasket) {
        this.$store.commit("v3IsShowNumBaket", true);
      }
    },

    initData() {
      let val = this.$store.state.GDV3.officialRate;

      let { percentage, selectBack } = val;
      let list = this.$store.state.GDV3.v3CurGame.C;
      list.sort((a, b) => a.Id - b.Id);
      let temArr1 = [];
      list.forEach((item, idx) => {
        item.N1 = this.nameArr[idx];
        item.C.forEach((inItem) => {
          inItem.N1 = item.N;
          inItem.goal = inItem.I;
          inItem.odds = this.$buyDataHandler.setNumDecimal(
            inItem.MxO - (inItem.MxO - inItem.MiO) * percentage,
            3
          );
        });
        item.C.sort((a,b)=>a.I-b.I)
        temArr1.push(item);
      });

      temArr1

      this.list = temArr1;

      console.log(temArr1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
