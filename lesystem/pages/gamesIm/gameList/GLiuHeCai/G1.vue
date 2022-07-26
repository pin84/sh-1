<template>
  <view class="play">
    <ListCircleLiuHeCai :list="list1" />
  </view>
</template>


<script>
import ListCircleLiuHeCai from "@/pages/gamesIm/common/list/ListCircleLiuHeCai.vue";
import bgcolor from "./bgcolor";
export default {
  data() {
    return {
      list1: [],
      list2: [],
    };
  },
  components: {
    ListCircleLiuHeCai,
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
      let selectArr = [];

      let money = this.$store.state.GDV3.v3InputMoney;
      this.list1.forEach((item) => {
        if (item.active) {
          item.money = money;
          selectArr.push(item);
        }
      });

      let basketArr = this.$store.state.GDV3.numBasket;
      if (selectArr.length == 0 && basketArr.length === 0) {
        this.$util.showConfirm({
          content: "您还没有勾选",
          showCancel: false,
        });
        return;
      }

      selectArr.forEach((item) => {
        this.$store.commit("v3NumBasket", item);
      });
      if (isShowBasket) {
        this.$store.commit("v3IsShowNumBaket", true);
      }
      this.$store.commit("v3ClearSelected", new Date().getTime());

      return true;
    },

    changeRate(val) {
      let { percentage } = val;
      this.$buyOptions.changeRateOption(this.list1, percentage);
      this.$buyOptions.changeRateOption(this.list2, percentage);
    },

    initData() {
      let { percentage, selectBack } = this.$store.state.GDV3.officialRate;
      let curObj = this.$store.state.GDV3.v3CurGame;
      let list = JSON.parse(JSON.stringify(curObj.C[0].C));

      list.sort((a,b)=>a.N -b.N)

      list.forEach((item) => {
        item.N1 = curObj.N;
        item.goal = item.I
        item.odds = this.$buyDataHandler.setNumDecimal(
          item.MxO - (item.MxO - item.MiO) * percentage,
          3
        );

        for (let [key, value] of Object.entries(bgcolor)) {
          if (value.includes(Number(item.N))) {
            item.bc = key;
            break;
          }
        }
      });

      this.list1 = list;
      console.log(list)
    },

  },
};
</script>

