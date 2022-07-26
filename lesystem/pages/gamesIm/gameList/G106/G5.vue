<template>
  <view class="hezhi">
    <view class="top">
      <view class="left"
        >对所有相同的三个号码(111、222、333、444、555、666)进行投注，任意号码开出，即为中奖。</view
      >
      <view class="audio"></view>
    </view>
    <view class="margin-top-df"
      ><ListSquare :dataList="arr2" @selected="selected($event, '2')"
    /></view>
    <!-- <view><ListSquare :dataList="arr1" @selected="selected($event, '1')" /></view> -->
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
		this.percentage = val.percentage
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
      let len = this.arr2.length - 1;
      while (n--) {
        let i = this.$buyDataHandler.createRandomNum(0, len);
        // let j = this.$buyDataHandler.createRandomNum(0,len)
        // if(i == j){
        // 	 j = this.$buyDataHandler.createRandomNum(0,len)
        // }
        let obj = this.$buyDataHandler.createBuyObj();
        obj.numStr = this.arr2[i].N;
        obj.orderStr = this.arr2[i].N;
        this.$store.commit("v3NumBasket", obj);
      }
      this.$store.commit("v3IsShowNumBaket", true);
    },
    addToBasket(isShowBasket = true) {
      let basketArr = this.$store.state.GDV3.numBasket;
      let selectedObj = this.$store.state.GDV3.selectedNum;

      if (JSON.stringify(selectedObj) !== "{}") {
        this.$store.commit("v3NumBasket", selectedObj);
      }

      if (isShowBasket) {
        this.$store.commit("v3IsShowNumBaket", true);
      }
      this.$store.commit("v3ClearSelected", new Date().getTime());
      this.$store.commit("v3FootMoney", {});
      this.$store.commit("v3selectedNum", {});
    },
    selected(obj, n) {
      if (obj.active) {
        this.isHasSelected = true;
        this.setValue();
      } else {
        this.isHasSelected = false;
        this.$store.commit("v3selectedNum", []);
        this.$store.commit("v3FootMoney", {});
      }
    },

    setValue() {
      if (!this.isHasSelected) return;
      let { rate, ratio } = this.$store.state.GDV3.officialRate;
      let { radix } = this.$store.state.GDV3.v3IndexGameAllData;
      let num = 1;
      let money = radix * num * rate * ratio;
      let obj = this.$buyDataHandler.createBuyObj();
      obj.money = money;
      obj.numStr = "三同号通选";
      obj.orderStr = "111,222,333,444,555,666";
      this.$store.commit("v3FootMoney", { num, money });
      this.$store.commit("v3selectedNum", obj);

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
      let { MB, MxO, MiO } = obj.C[0];
      let ratioObj = {
        MB,
        MxO,
        MiO,
      };
	  this.percentage = percentage
	  this.ratioObj = ratioObj
      this.$store.commit("v3RatioInitValue", ratioObj);
      this.$store.commit("sumBonus", MxO);
      let i = 0;
      let tem = [];
      let tem1 = [];
      while (i++ < 6) {
        // tem.push({ N: i });

        tem1.push({ N: String(i) + String(i) + String(i) });
      }
      // this.arr1 = tem;
      this.arr2 = [{ N: "三同号通选" }];
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
