<template>
  <view
    ><ListCircle
      :titleArr="titleArr"
      @selectedNum="selectedNum"
      :isShowSort="true"
      :numList="numList"
      :size="4"
  /></view>
</template>

//只能用于定位胆
<script>
import playList from "./playList.js";
import ListCircle from "@/pages/gamesIm/common/ListCircle_1";
export default {
  data() {
    return {
      rate: 1,
      ratio: 1,
      gameConfig: {},
      titleArr: ["百位", "十位", "个位"],
      selectedObj: {},
      randomArr: [],
      mxo: 0,
      numList: [],
      numArr: [],
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
        let { rate, ratio } = val;
        this.rate = rate;
        this.ratio = Number(ratio);
        this.handlerData();
      },
      deep: true,
    },
    // '$store.state.GDV3.v3CurGame': {
    // 	handler: function(val) {
    // 		this.$store.commit('setNumBasket', []);
    // 		this.initPage(val.N);
    // 	},
    // }
  },

  created() {
    this.initPage();
  },

  methods: {
    initPage() {
      let { I, C } = this.$store.state.GDV3.v3CurGame;
      this.randomArr = C;
      this.gameConfig = playList[I];
      let { MB, MxO, MiO } = C[0];
      this.mxo = MxO;
      let ratioObj = {
        MB,
        MxO,
        MiO,
      };
      this.$store.commit("v3RatioInitValue", ratioObj);
      let { titleArr } = this.gameConfig;
      this.titleArr = titleArr;

      this.numList = this.$buyDataHandler.creatList();
    },

    addToBasketRandom(n) {
      let len = this.randomArr.length - 1;
      let arr = this.randomArr;
      while (n--) {
        let obj = this.$buyDataHandler.createBuyObj();
        let j = this.$buyDataHandler.createRandomNum(0, arr.length - 1);
        let i = this.$buyDataHandler.createRandomNum(0, 9);
        let randomObj = arr[j];

        obj.numStr = i;
        obj.orderStr = i;
        obj.gName = randomObj.N;
        obj.I = randomObj.I;
        this.$store.commit("v3NumBasket", obj);
      }
      this.$store.commit("v3IsShowNumBaket", true);
    },
    v3ToBuy() {
      this.addToBasket(false);

      //触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
      let ts = new Date().getTime();
      this.$store.commit("v3ToBuyNext", ts);
    },
    addToBasket(isShowBasket = true) {
      console.log(this.randomArr,this.selectedObj);
      let { radix } = this.$store.state.GDV3.v3IndexGameAllData;
      for (let [key, value] of Object.entries(this.selectedObj)) {
        if (value.length) {
          let obj = this.$buyDataHandler.createBuyObj();
          let str = [];
          value.forEach((item) => {
            str.push(item.num);
          });
          obj.numStr = str.join("|");
          obj.orderStr = str.join("|");
          let len = str.length;
          obj.len = len;
          obj.money =this.$buyDataHandler.setNumDecimal_1(this.rate * this.ratio * len * radix) 
          let I = this.randomArr.find(item=>item.N.includes(key)).I
          obj.I = I
          
          this.$store.commit("v3NumBasket", obj);
          console.log(obj);
        }
      }

      this.$store.commit("v3selectedNum", {});
      this.$store.commit("v3FootMoney", {});
      this.$store.commit("v3ClearSelected", new Date().getTime());
      this.selectedObj = {}
      if (isShowBasket) {
        this.$store.commit("v3IsShowNumBaket", true);
      }
    },

    selectedNum(selected) {
      let key = Object.keys(selected)[0];
      let value = Object.values(selected)[0];
      this.selectedObj[key] = value;
      this.handlerData();
    },

    handlerData() {
      let numArr = this.$buyDataHandler.sortData_1(this.selectedObj);

      if (numArr.join(",") == "") {
        this.$store.commit("v3selectedNum", {});
        this.$store.commit("v3FootMoney", {});
        return;
      }
      let i = 0;
      let len = numArr.reduce((acumulator, currentValue) => {
        if (currentValue.length != 0) {
          i++;
        }
        return acumulator + currentValue.length;
      }, 0);
      let { radix } = this.$store.state.GDV3.v3IndexGameAllData;

      let { MxO } = this.randomArr[0];

      // this.$store.commit("sumBonus", MxO * i);
      this.$store.commit("sumBonus",  i);

      this.$store.commit("v3selectedNum", { a: 1 });
      this.$store.commit("v3FootMoney", {
        num: len,
        money: this.rate * this.ratio * radix * len,
      });
    },
  },
};
</script>

<style></style>
