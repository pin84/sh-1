<template>
  <div class="fushi">
    <ListRandomOdds
      @selectedNum="selectedNum($event, 'A')"
      :title="titleArr[1]"
      :numList="list2"
      :isShowSelectType="false"
    />

    <ListRandomOdds
      :isRadio="isRadio"
      :numList="list1"
      :title="titleArr[0]"
      @selectedNum="selectedNum($event, 'B')"
      :size="10"
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
      isRadio: 0,
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
      Tlist: [
        {
          isSelected: false,
          text: "大",
        },
        {
          isSelected: false,
          text: "小",
        },
        {
          isSelected: false,
          text: "单",
        },
        {
          isSelected: false,
          text: "双",
        },

        {
          isSelected: false,
          text: "清",
        },
      ],
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

    "$store.state.gd.addRandom": {
      handler: function (val) {
        this.addRandom(val);
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
  },

  methods: {
    initData() {
      let { radix } = this.$store.state.gd.indexGameData;
      this.radix = radix;
      let { mode, times } = this.$store.state.gd.footRate;
      this.mode = mode;
      this.times = times;
      let { titleArr, isRadio } = this.config;
      this.titleArr = titleArr;
      this.isRadio = isRadio;

      let obj = this.$store.state.gd.curGame;
      let arr = obj.C[0].C;

      let list1 = [];
      let tem1 = JSON.parse(JSON.stringify(arr[2].C[1]));
      tem1.C.forEach((item) => {
        let arr = item.N.split(",");
        arr.forEach((str) => {
          let obj = JSON.parse(JSON.stringify(item));
          obj.N = str;
          obj.N1 = tem1.N;
          list1.push(obj);
        });
      });

      list1.sort((a, b) => a.N - b.N);
      this.list1 = list1;

      let list2 = [];
      let tem2 =JSON.parse(JSON.stringify( arr[0].C[0]))
      let tem3 = JSON.parse(JSON.stringify(arr[1].C[0]));
      tem2.C.forEach((obj) => {
        obj.N1 = tem2.N;
        list2.push(obj);
      });
      tem3.C.forEach((obj) => {
        obj.N1 = tem3.N;
        list2.push(obj);
      });

      this.list2 = list2;
      this.initOdds();
    },

    initOdds() {
      let n = 0;
      let obj = {};

      this.list1.forEach((item) => {
        item.odds = item.MxO;
        if (item.MxO > n) {
          n = item.MxO;
          obj = item;
        }
      });
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
      this.$BDH.changeOdds(this.list1);
      this.$BDH.changeOdds(this.list2);
      this.refreshList();
    },

    refreshList() {
      this.list1.push({});
      this.list1.pop();
      this.list2.push({});
      this.list2.pop();
    },

    toBuy() {
      this.addToBasket();
      let ts = new Date().getTime();
      this.$store.commit("toBuyNext", ts);
    },
    addToBasket() {
      let objArr = [];
      for (let [key, value] of Object.entries(this.selectedObj)) {
        if (key == "A" || key=='B') {
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
      let DeviationObj = {};
      values.forEach((arr) => {
        arr.forEach((item) => {
          if (item.odds > n) {
            n = item.odds;
            obj = item;
          }

          if (DeviationObj[item.N1]) {
            if (DeviationObj[item.N1] < item.odds) {
              DeviationObj[item.N1] = item.odds;
            }
          } else {
            DeviationObj[item.N1] = item.odds;
          }
        });
      });

      let money = s * this.radix * this.times * this.mode;
      this.$store.commit("footMoney", { num: s, money });

      let moneyDeviation = 0;
      for (let [key, value] of Object.entries(DeviationObj)) {
        if (key == obj.N1) continue;
        moneyDeviation += value;
      }

      console.log(moneyDeviation,obj);

      this.$store.commit("moneyDeviation", moneyDeviation);
      this.$store.commit("odds", obj);
    },
  },
};
</script>
<style lang="scss" scoped>
.fushi {
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>