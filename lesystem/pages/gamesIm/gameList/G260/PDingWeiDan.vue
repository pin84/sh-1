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
      isShowSort: false,
      titleArr: ["百位", "十位", "个位"],
      selectedObj: {},
      randomArr: [],
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
    "$store.state.GDV3.v3CurGame": {
      handler: function (val) {
        this.$store.commit("setNumBasket", []);
        this.initPage(val.N);
      },
      deep: true,
    },
  },

  created() {
    this.initPage();
  },

  mounted() {
    this.initData();
  },

  methods: {
    initData() {
      let arr = this.$store.state.GDV3.v3CurPlayList;
      if (JSON.stringify(arr) == "{}") return;
      let arr1 = arr.c[0].C[0].C;
      this.randomArr = arr1;
    },
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
      let len = this.randomArr.length - 1;
      let arr = this.randomArr;
      while (n--) {
        let obj = this.$buyDataHandler.createBuyObj();
        let i = this.$buyDataHandler.createRandomNum(0, 9);
        let randomObj = arr[i];

        let m = +i + 1;
        obj.numStr = m < 10 ? "0" + m : m;
        (obj.orderStr = m < 10 ? "0" + m : m),
          (obj.gName = obj.gName + randomObj.N);
        obj.I = randomObj.I;

        this.$store.commit("v3NumBasket", obj);
      }
      this.$store.commit("v3IsShowNumBaket", true);
    },
    v3ToBuy() {
      this.addToBasket(true);
      //触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
      let ts = new Date().getTime();
      this.$store.commit("v3ToBuyNext", ts);
    },
    addToBasket(isToBuy = false) {
      let basket = this.$store.state.GDV3.selectedNum;
      if (Array.isArray(basket) && basket.length != 0) {
        basket.forEach((item) => {
          this.$store.commit("v3NumBasket", item);
        });

        this.$store.commit("v3selectedNum", {});
        this.$store.commit("v3FootMoney", {});
        this.$store.commit("v3ClearSelected", new Date().getTime());
      } else {
        if (!isToBuy) {
          this.$util.showConfirm({
            content: "号码选择不完整，请重新选择",
            showCancel: false,
          });
        }
      }
    },
    selectedNum(selected) {
      let allSelected = Object.assign(this.selectedObj, selected);
      let obj = {};
      let flag = false;
      for (let [key, value] of Object.entries(allSelected)) {
        if (value.length) {
          flag = true;
          break;
        }
      }
      if (flag) {
        let temArr = [];
        let { radix } = this.$store.state.GDV3.v3IndexGameAllData;
        this.randomArr.forEach((obj) => {
          let curArr = allSelected[obj.N];
          if (curArr && curArr.length !== 0) {
            let cobj = this.$buyDataHandler.createBuyObj();

            
            cobj.I = obj.I;
            cobj.gName = cobj.gName + obj.N;
            cobj.len = curArr.length;
            cobj.money = this.$buyDataHandler.handlerMoneyDecimal(
              radix * curArr.length * cobj.rate * cobj.ratio
            );
            let tem = [];
            curArr.forEach((item) => {
              tem.push(item.num);
            });
            cobj.numStr = tem.join("|");
            cobj.orderStr = tem.join("|");
            temArr.push(cobj);
          }
        });

        let len1 = 0;
        Object.values(allSelected).forEach((arr) => {
          if (arr.length != 0) {
            len1++;
          }
        });

        let { C } = this.$store.state.GDV3.v3CurGame;
        let { MxO } = C[0];
        // this.$store.commit("sumBonus", MxO * len1);
        this.$store.commit("sumBonus",  len1);

        let money = temArr.reduce((accumulator, currentValue) => {
          return accumulator + Number(currentValue.money);
        }, 0);

        let num = temArr.reduce((accumulator, currentValue) => {
          return accumulator + Number(currentValue.len);
        }, 0);


        this.$store.commit("v3FootMoney", { num, money });
        this.$store.commit("v3selectedNum", temArr);
      } else {
        this.$store.commit("v3selectedNum", {});
        this.$store.commit("v3FootMoney", {});
        this.$store.commit("sumBonus", 0);
      }
    },
  },
};
</script>

<style></style>
