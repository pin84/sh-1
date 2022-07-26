<template>
  <view class="hezhi">
    <view class="top">
      <view class="left"
        >选择1对相同号码和1个不同号码投注，选号与奖号相同，即为中奖。</view
      >
      <view class="audio"></view>
    </view>
    <view class="margin-top-df"
      ><ListSquare :dataList="arr2" @selected="selected($event, '2')"
    /></view>
    <view
      ><ListSquare :dataList="arr1" @selected="selected($event, '1')"
    /></view>
  </view>
</template>

<script>
import ListSquare from "./ListSquare_1.vue";
export default {
  data() {
    return {
      arr1: [],
      arr2: [],
      dataList: [],
      i: 0, //选择的个数
      j: 0, //选择的个数
      seletedArr1: [],
      seletedArr2: [],
    };
  },
  components: {
    ListSquare,
  },
  watch: {
    "$store.state.GDV3.officialRate": {
      handler: function (val) {
        let { percentage } = val;
        this.percentage = percentage;
        this.setValue();
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
    "$store.state.GDV3.clearSelected": function (val) {
      this.seletedArr2 = [];
      this.seletedArr1 = [];
    },
  },
  created() {
    this.initData();
  },

  methods: {
    v3ToBuy() {
      this.addToBasket(false);
      //触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
      let ts = new Date().getTime();
      this.$store.commit("v3ToBuyNext", ts);
    },
    addToBasketRandom(val) {
      let { n } = val;
      let len = this.arr1.length - 1;
      while (n--) {
        let i = this.$buyDataHandler.createRandomNum(0, len);
        let j = this.$buyDataHandler.createRandomNum(0, len);
        if (i == j) {
          j = this.$buyDataHandler.createRandomNum(0, len);
        }
        let obj = this.$buyDataHandler.createBuyObj();
        obj.numStr = this.arr2[i].N + "|" + this.arr1[j].N;
        obj.orderStr = this.arr2[i].N + "|" + this.arr1[j].N;
        this.$store.commit("v3NumBasket", obj);
      }
      this.$store.commit("v3IsShowNumBaket", true);
    },
    addToBasket(isShowBasket = true) {
      if (this.seletedArr1.length === 0 || this.seletedArr2.length === 0) {
        this.$util.showConfirm({
          content: "号码选择不完整，请重新选择",
          showCancel: false,
        });
        return;
      }

      let temArr1 = [];
      let temArr2 = [];
      this.seletedArr1.forEach((item) => {
        temArr1.push(item.N);
      });
      this.seletedArr2.forEach((item) => {
        temArr2.push(item.N);
      });

      let obj = this.$buyDataHandler.createBuyObj();
      let { num, money } = this.$store.state.GDV3.footMoney;
      obj.len = num;
      obj.money = money;
      obj.numStr = temArr2.join(",") + "|" + temArr1.join(",");
      obj.orderStr = temArr2.join(",") + "|" + temArr1.join(",");

      this.$store.commit("v3NumBasket", obj);
      if (isShowBasket) {
        this.$store.commit("v3IsShowNumBaket", true);
      }
      this.$store.commit("v3ClearSelected", new Date().getTime());
      this.$store.commit("v3FootMoney", {});
      this.$store.commit("v3selectedNum", {});
      this.seletedArr1 = [];
      this.seletedArr2 = [];
    },
    selected(obj, n) {
      if (obj.active) {
        if (n == 1) {
          let idx = this.arr1.findIndex((item) => item.N == obj.N);
          if (this.arr2[idx].active) {
            this.arr2[idx].active = false;
          }
        } else {
          let idx = this.arr2.findIndex((item) => item.N == obj.N);
          if (this.arr1[idx].active) {
            this.arr1[idx].active = false;
          }
        }
      }

      this.refreshPage();
      let seletedArr1 = [];
      let seletedArr2 = [];
      let i = 0;
      let j = 0;
      this.arr1.forEach((item) => {
        if (item.active) {
          i++;
          seletedArr1.push(item);
        }
      });
      this.arr2.forEach((item) => {
        if (item.active) {
          j++;
          seletedArr2.push(item);
        }
      });

      this.i = i;
      this.j = j;
      if (i == 0 || j == 0) {
        this.$store.commit("v3selectedNum", []);
        this.$store.commit("v3FootMoney", {});
      } else {
        this.seletedArr1 = seletedArr1;
        this.seletedArr2 = seletedArr2;
        this.setValue();
      }
    },

    setValue() {
      let { rate, ratio } = this.$store.state.GDV3.officialRate;
      let { radix } = this.$store.state.GDV3.v3IndexGameAllData;
      let num = this.i * this.j;
      let money = radix * num * rate * ratio;
      this.$store.commit("v3FootMoney", { num, money });
      this.$store.commit("v3selectedNum", this.seletedArr1);

      let { MB, MxO, MiO } = this.ratioObj;
      let odds = this.$buyDataHandler.setNumDecimal(
        (MxO - (MxO - MiO) * this.percentage) * rate,
        3
      );

      //   console.log(odds, this.percentage, this.ratioObj);
      this.$store.commit("sumBonus", odds);
    },

    initData() {
      // let obj = this.$store.state.GDV3.v3CurPlayList;
      let obj = this.$store.state.GDV3.v3CurGame;
      let { rate, ratio, percentage } = this.$store.state.GDV3.officialRate;
      this.percentage = percentage;
      let { MB, MxO, MiO } = obj.C[0];
      let ratioObj = {
        MB,
        MxO,
        MiO,
      };
      this.ratioObj = ratioObj;
      this.$store.commit("v3RatioInitValue", ratioObj);
      this.$store.commit("sumBonus", MxO);
      let i = 0;
      let tem = [];
      let tem1 = [];
      while (i++ < 6) {
        tem.push({ N: i });
        tem1.push({ N: String(i) + String(i) });
      }
      this.arr1 = tem;
      this.arr2 = tem1;
      // this.dataList.push(...this.arr2);
      // this.dataList.push(...this.arr1);
    },

    refreshPage() {
      this.arr1.push({});
      this.arr1.pop();
      this.arr2.push({});
      this.arr2.pop();
    },
  },
};
</script>

<style lang="scss" scoped>
.hezhi {
  background-color: #317455;
  color: #fff;
  padding: 20rpx;
  height: 300%;
  // border:1px solid red;
  // height: 50vh;
  // padding-bottom: 30vh;
  .top {
    .left {
      width: 70%;
      line-height: 42rpx;
      color: #fff;
      font-size: 30rpx;
    }
  }
}
</style>
