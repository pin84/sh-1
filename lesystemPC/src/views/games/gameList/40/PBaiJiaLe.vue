<template>
  <ul class="longhu">
    <li class="item" v-for="(title, idx) in titleArr" :key="idx">
      <div class="title">{{ title }}</div>
      <ul class="num item-list">
        <li
          @click="selectNum(item)"
          class="num-box"
          v-for="(item, index) in numList[idx]"
          :key="index"
        >
          <span class="out-line" :class="item.isSelected ? 'active' : 'bg'">
            <span >{{ item.N }}</span>
          </span>
          <span class="odds">{{ item.odds }}</span>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    config: {
      type: Object,
      defaule: () => {},
    },
  },

  data() {
    return {
      selectedArr: [],
      titleArr: [],
      numList: [],
      radix: 2,
      mode: 1,
      times: 1,
      MaxOdds: {},
      allOdds: {}, //存当前选择的有几个种类。 龙虎。大小，单双为三个种类
    };
  },

  watch: {
    "$store.state.gd.footOdds": {
      handler: function (val) {
        let { percentage } = val;
        this.percentage = percentage;
        this.changeOdds();
      },
      deep: true,
    },
    "$store.state.gd.footRate": {
      handler: function (val) {
        let { mode, times } = val;
        this.mode = mode;
        this.times = times;

        console.log(mode, times);

        this.changeOdds();
        this.handlerData();
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

  beforeDestroy() {
    this.$store.commit("moneyDeviation", 0);
  },

  methods: {
    initData() {
      let { percentage } = this.$store.state.gd.footOdds;
      let { radix } = this.$store.state.gd.indexGameData;
      let { mode, times } = this.$store.state.gd.footRate;
      this.radix = radix;
      this.mode = mode;
      this.times = times;
      let { titleArr } = this.config;
      this.titleArr = titleArr;

      let obj = this.$store.state.gd.curGame;

      let tem = [];
      let maxMxO = 0;
      let MaxOdds = {};
      let obj1 = obj.C[0];
      obj1.C.forEach((item) => {
        item.N1 = obj1.N;
        item.odds = item.MxO - (item.MxO - item.MiO) * percentage;
        if (item.MxO > maxMxO) {
          MaxOdds = item;
          maxMxO = item.MxO;
        }
        tem.push(item);
      });

      let tem2 = [];
      let obj2 = obj.C[1];
      let obj3 = obj.C[2];
      obj2.C.forEach((item) => {
        item.N1 = obj2.N;
        item.odds = item.MxO - (item.MxO - item.MiO) * percentage;
        if (item.MxO > maxMxO) {
          MaxOdds = item;
          maxMxO = item.MxO;
        }
        tem2.push(item);
      });
      obj3.C.forEach((item) => {
        item.N1 = obj3.N;
        item.odds = item.MxO - (item.MxO - item.MiO) * percentage;
        if (item.MxO > maxMxO) {
          MaxOdds = item;
          maxMxO = item.MxO;
        }
        tem2.push(item);
      });

      this.numList.push(tem);
      this.numList.push(tem2);

      this.MaxOdds = MaxOdds;
      this.$store.commit("odds", this.MaxOdds);
    },

    changeOdds() {
      this.numList.forEach((arr) => {
        arr.forEach((item) => {
          item.odds = this.$BDH.setNumDecimal(
            (item.MxO - (item.MxO - item.MiO) * this.percentage) * this.mode,
            4
          );
        });
      });
      this.numList.push({});
      this.numList.pop();
    },

    selectNum(item, index) {
      item.isSelected = !item.isSelected;
      this.numList.push({});
      this.numList.pop();

      let selectedArr = [];
      let maxMxO = 0;
      let selectedOdds = {};
      let allOdds = {};
      this.numList.forEach((arr) => {
        arr.forEach((item) => {
          if (item.isSelected) {
            selectedArr.push(item);

            if (item.MxO > maxMxO) {
              selectedOdds = item;
              maxMxO = item.MxO;
            }

            if (allOdds[item.N1]) {
              if (allOdds[item.N1].MxO < item.MxO) {
                allOdds[item.N1] = item;
              }
            } else {
              allOdds[item.N1] = item;
            }
          }
        });
      });

      if (selectedArr.length == 0) {
        this.allOdds = {};
        this.selectedArr = [];
        this.$store.commit("odds", this.MaxOdds);
        this.$store.commit("footMoney", {});
        return;
      }

      this.allOdds = allOdds;
      this.$store.commit("odds", selectedOdds);
      this.selectedArr = selectedArr;
      this.handlerData();
    },

    toBuy() {
      this.addToBasket();
      let ts = new Date().getTime();
      this.$store.commit("toBuyNext", ts);
    },
    addToBasket() {
      // let { numStr, orderStr } = this.config.dataHandler(this.selectedArr);
      let len = this.selectedArr.length;
      let objArr = [];
      this.selectedArr.forEach((item) => {
        let obj = this.$BDH.createBuyObj();

        obj.I = item.I;
        obj.gName = item.N1;
        obj.numStr = item.N;
        obj.orderStr = item.N;
        obj.num = 1;
        obj.money = obj.money / len;

        objArr.push(obj);
      });

      this.$store.commit("basketList", objArr);
      this.$store.commit("footMoney", {});
      // this.$store.commit("clearSelect", new Date().getTime());
      this.selectedArr = [];
      this.clearSelect();
    },

    clearSelect() {
      this.numList.forEach((arr) => {
        arr.forEach((item) => {
          if (item.isSelected) {
            item.isSelected = false;
          }
        });
      });
      this.numList.push({});
      this.numList.pop();
    },

    handlerData() {
      if (this.selectedArr.length == 0) {
        this.$store.commit("footMoney", {});
        return;
      }

      let moneyDeviation = 0;
      let temMxo = 0;
      for (let [key, value] of Object.entries(this.allOdds)) {
        let n = value.MxO;
        if (temMxo < n) {
          temMxo = n;
        }
        moneyDeviation += value.MxO;
      }
      this.$store.commit(
        "moneyDeviation",
        (moneyDeviation - temMxo) * this.mode
      );
      let s = this.selectedArr.length;
      let money = s * this.radix * this.times * this.mode;
      this.$store.commit("footMoney", { num: s, money });
    },
  },
};
</script>
<style lang="scss" scoped>
$width: 40px;
$width1: 32px;
$width3: 36px;
$width2: 28px;
.longhu {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  user-select: none;
  .item {
    width: 100%;
    display: flex;
    padding-bottom: 20px;
    .title {
      flex: 0 0 100px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      background-color: #5a5a5a;
      color: #fff;
      border-radius: 5px;
      font-style: oblique;
      font-weight: 600;
    }
    .item-list {
      display: flex;
      align-content: center;
      justify-content: space-between;
      margin-left: 40px;
      .num-box {
        position: relative;
        width: 75px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-right: 30px;
        .odds {
          color: #444;
          margin-top: 10px;
        }
        .out-line {
          width: 100%;
          border: 1px solid #ccc;
          // border-radius: 50%;
          background-color: #ccc;
          padding: 7px 0;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          &:hover {
            cursor: pointer;
            background-color: orange;
          }


        }

        .active {
          color: #fff;
          background-color: #d82136;
          &:hover {
            background-color: #d82136;
          }
        }
      }
    }
  }
}
</style>