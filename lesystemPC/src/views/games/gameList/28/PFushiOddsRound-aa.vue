<template>
  <div class="fushi">
    <!-- <ListRoundOdds
      @selectedNum="selectedNum($event, 'A')"
      :title="titleArr[0]"
      :numList="list1"
    /> -->

    <ListRandomOdds
      :isSquare="isSquare"
      :numList="list2"
      :title="titleArr[0]"
      @selectedNum="selectedNum($event, 'B')"
      :size="5"
      :Tlist="Tlist"
    />
  </div>
</template>
<script>
// import ListRoundOdds from "@/views/games/components/list/ListRoundOdds";
import ListRandomOdds from "@/views/games/components/list/ListRandomOdds";
export default {
  props: {
    config: {
      type: Object,
      defaule: () => {},
    },
  },

  data() {
    return {
      isSquare:true,
      numArr: [],
      selectedObj: {},
      titleArr: [],
      radix: 2,
      mode: 1,
      times: 1,
      nameArr: [], //记录选中的 万位 千位等
      list1: [],
      list2: [],
      maxMxOObj: {},
      textArr: ["全", "大", "小", "单", "双", "清"],
      Tlist: [],
    };
  },

  components: {
    ListRandomOdds,
    // ListRoundOdds,
  },

  watch: {
    "$store.state.gd.footRate": {
      handler: function (val) {
        let { mode, times } = val;
        this.mode = mode;
        this.times = times;
        this.changeOdds();
        this.handlerData();
      },
      deep: true,
    },
    "$store.state.gd.footOdds": {
      handler: function (val) {
        this.changeOdds();
      },
      deep: true,
    },

    "$store.state.gd.addToBasket": function (val) {
      this.addToBasket();
    },
    "$store.state.gd.toBuy": function (val) {
      this.toBuy();
    },
  },

  created() {
    this.initData();
    this.initPage();
  },

  methods: {
    initPage() {
      this.textArr.forEach((text) => {
        this.Tlist.push({
          isSelected: false,
          text,
        });
      });
    },
    initData() {
      let { radix } = this.$store.state.gd.indexGameData;
      this.radix = radix;
      let { mode, times } = this.$store.state.gd.footRate;
      this.mode = mode;
      this.times = times;
      let { titleArr,isSquare ,textArr} = this.config;
      this.titleArr = titleArr;
      this.textArr = textArr;
      this.isSquare = isSquare || false
      let { percentage } = this.$store.state.gd.footOdds;

      let arr = this.$store.state.gd.curGame.C;

      let tem = [];
      arr.forEach((obj) => {
        let arr1 = obj.N.split("_")[1].split(",");
        arr1.forEach((n) => {
          let obj1 = JSON.parse(JSON.stringify(obj));
          obj1.N = n < 10 ? "0" + n : n;
          obj1.odds = this.$BDH.setNumDecimal(
            obj1.MxO - (obj1.MxO - obj1.MiO) * percentage,
            3
          );
          tem.push(obj1);
        });
      });

      let list = this.config.sortList(tem)

      
      this.list2 = list;


      this.initOdds();
    },

    initOdds() {
      let n = 0;
      let obj = {};

      // this.list1.forEach((item) => {
      //   item.odds = item.MxO;
      //   if (item.MxO > n) {
      //     n = item.MxO;
      //     obj = item;
      //   }
      // });
      this.list2.forEach((item) => {
        item.odds = item.MxO;
        if (item.MxO > n) {
          n = item.MxO;
          obj = item;
        }
      });

      this.refreshList();
      this.maxMxOObj = obj;
      this.$store.commit("odds", obj);
    },

    changeOdds() {
      // this.$BDH.changeOdds(this.list1);
      this.$BDH.changeOdds(this.list2);
      this.refreshList();
    },

    refreshList() {
      this.list1.push({});
      this.list1.pop();
      this.list2.push({});
      this.list2.pop();
    },

    dataHandler(arr) {
      let { percentage } = this.$store.state.gd.footOdds;
      let tem = [];
      arr.forEach((element) => {
        element.C.forEach((item) => {
          item.N1 = element.N;
          item.odds = this.$BDH.setNumDecimal(
            item.MxO - (item.MxO - item.MiO) * percentage,
            3
          );
          tem.push(item);
        });
      });

      return tem;
    },

    toBuy() {
      this.addToBasket();
      let ts = new Date().getTime();
      this.$store.commit("toBuyNext", ts);
    },
    addToBasket() {
      let objArr = [];

      for (let [key, value] of Object.entries(this.selectedObj)) {
        if (key == "A") {
          value.forEach((item) => {
            let obj = this.$BDH.createBuyObj();
            obj.numStr = item.N;
            obj.orderStr = item.N;
            obj.gName = item.N1;
            obj.I = item.I;
            obj.num = 1;
            obj.money = obj.radix * obj.times * obj.moneyMode;
            objArr.push(obj);
          });
        } else {
          let temArr = [];
          value.forEach((item) => {
            temArr.push(item.N);
          });
          let obj = this.$BDH.createBuyObj();
          obj.num = temArr.length;
          obj.money = temArr.length * obj.radix * obj.times * obj.moneyMode;
          obj.numStr = temArr.join(",");
          obj.orderStr = temArr.join(",");
          obj.I = value[0].I;
          objArr.push(obj);
        }
      }

      this.$store.commit("basketList", objArr);
      this.$store.commit("footMoney", {});
      this.$store.commit("clearSelect", new Date().getTime());
      this.selectedObj = {};
    },
    selectedNum(arr, type) {
      this.selectedObj[type] = arr;
      this.handlerData();
    },


    handlerData() {
      let values = Object.values(this.selectedObj);
      let s = values.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.length;
      }, 0);
      if (!s) {
        this.$store.commit("footMoney", {});
        this.$store.commit("odds", this.maxMxOObj);
        return;
      }

      let n = 0;
      let obj = {};
      // let DeviationObj = {};
      values.forEach((arr) => {
        arr.forEach((item) => {
          if (item.odds > n) {
            n = item.odds;
            obj = item;
          }

          // if (DeviationObj[item.N1]) {
          //   if (DeviationObj[item.N1] < item.odds) {
          //     DeviationObj[item.N1] = item.odds;
          //   }
          // } else {
          //   DeviationObj[item.N1] = item.odds;
          // }
        });
      });

      let money = s * this.radix * this.times * this.mode;
      this.$store.commit("footMoney", { num: s, money });

      // let moneyDeviation = 0;
      // for (let [key, value] of Object.entries(DeviationObj)) {
      //   if (key == obj.N1) continue;
      //   moneyDeviation += value;
      // }

      // this.$store.commit("moneyDeviation", 0);
      this.$store.commit("odds", obj);
    },
  },
};
</script>
<style lang="scss" scoped>
.fushi {
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>