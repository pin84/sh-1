<template>
  <div class="zhenghe">
    <div style="margin-top: 1px">
      <LongHuList :isShowInput="isShowInput" :list="list" />
    </div>
    <div style="margin-top: 1px">
      <LongHuList :isShowInput="isShowInput" :list="list2" />
    </div>
    <div style="margin-top: 1px">
      <LongHuList :isShowInput="isShowInput" :list="list3" />
    </div>
    <div style="margin-top: 1px">
      <LongHuList :isShowInput="isShowInput" :list="list4" />
    </div>
  </div>
</template>
<script>
import LongHuList from "@/views/games/components/LongHuList";
import Input from "@/views/games/components/input/InputSelectList";
// import Tips from "@/views/games/components/tips";
export default {
  data() {
    return {
      commonMoney: "",
      isShowInput: true,
      curTitle: "前三",
      lenLimit: 5,
      selectedArr: [],
      rateObj: { times: 1, mode: 1 },
      list: [],
      list2: [],
      list3: [],
      list4: [],
      // list3: [],
      // list2: [],
      titleList: ["正一VS"],
      titleList1: ["前三", "中三", "后三"],
      bettingType: ["号码", "赔率", "金额"],
    };
  },

  components: {
    LongHuList,
    Input,
    // Tips
  },

  watch: {
    "$store.state.gd.addToBasket": function () {
      this.addToBasket();
    },
    "$store.state.gd.bettingType": {
      handler: function (val) {
        if (val == 0) {
          this.isShowInput = true;
        } else {
          this.isShowInput = false;
        }
      },
      deep: true,
    },

    "$store.state.gd.footOdds": {
      handler: function (val) {
        this.changeOdds(val);
      },
      deep: true,
    },
  },

  created() {
    this.initData();
  },

  methods: {
    inputValue(n) {
      this.commonMoney = n;
    },
    selected(title) {
      let { percentage } = this.$store.state.gd.footOdds;
      this.curTitle = title;
      let obj = this.$store.state.gd.curGame;
      let { c } = obj;
      let temobj = {
        前三: 5,
        中三: 6,
        后三: 7,
      };

      let arr6 = c[temobj[title]].c[0].C[0].C;

      let list2 = [];
      arr6.forEach((item) => {
        item.odds = item.MxO - (item.MxO - item.MxO) * percentage;
        item.N1 = title;
        list2.push([item]);
      });

      this.list2 = list2;
    },
    initData() {
      let type = this.$store.state.gd.bettingType;
      if (type == 0) {
        this.isShowInput = true;
      } else {
        this.isShowInput = false;
      }

      let list = this.$store.state.gd.curGame.C;
      let { percentage } = this.$store.state.gd.footOdds;

      // let list = obj.c[0].C;

      let ids = [266, 275, 276, 277];
      let arr = [];
      list.forEach((item) => {
        if (ids.includes(item.Id)) {
          item.C.forEach((obj) => {
            obj.N1 = item.N;
            obj.odds = obj.MxO - (obj.MxO - obj.MiO) * percentage;
          });

          arr.push(item);
        }
      });

      this.list = arr;

      let ids2 = [278, 279, 280];
      let arr2 = [];
      list.forEach((item) => {
        if (ids2.includes(item.Id)) {
          item.C.forEach((obj) => {
            obj.N1 = item.N;
            obj.odds = obj.MxO - (obj.MxO - obj.MiO) * percentage;
          });
          arr2.push(item);
        }
      });

      this.list2 = arr2;

      let ids3 = [281, 330];
      let arr3 = [];
      list.forEach((item) => {
        if (ids3.includes(item.Id)) {
          item.C.forEach((obj) => {
            obj.N1 = item.N;
            obj.odds = obj.MxO - (obj.MxO - obj.MiO) * percentage;
          });
          arr3.push(item);
        }
      });

      this.list3 = arr3;

      let ids4 = [282];
      let arr4 = [];
      list.forEach((item) => {
        if (ids4.includes(item.Id)) {
          item.C.forEach((obj) => {
            obj.N1 = item.N;
            obj.odds = obj.MxO - (obj.MxO - obj.MiO) * percentage;
          });
          arr4.push(item);
        }
      });

      this.list4 = arr4;
    },

    changeOddsOption(list, percentage) {
      list.forEach((arr) => {
        arr.C.forEach((item) => {
          item.odds = this.$BDH.setNumDecimal(
            item.MxO - (item.MxO - item.MiO) * percentage,
            3
          );
        });
      });

      list.push({});
      list.pop();
    },

    changeOdds(val) {
      let { percentage } = val;

      this.changeOddsOption(this.list, percentage);
      this.changeOddsOption(this.list2, percentage);
      this.changeOddsOption(this.list3, percentage);
      this.changeOddsOption(this.list4, percentage);
    },

    // toBuy() {
    //   this.addToBasket();
    //   let ts = new Date().getTime();
    //   this.$store.commit("toBuyNext", ts);
    // },
    addToBasket() {
      let commonMoney = this.$store.state.gd.inputMoney;
      if (!this.isShowInput && commonMoney == "") {
        this.$gutils.confirm({ text: "请填写下注金额" });
        return;
      }

      let arr = [];
      arr.push(
        ...this.listHandler(this.list,commonMoney),
        ...this.listHandler(this.list2,commonMoney),
        ...this.listHandler(this.list3,commonMoney),
        ...this.listHandler(this.list4,commonMoney)
      );

      if (arr.length == 0) {
        this.$gutils.confirm({ text: "请选择号码" });
        return;
      }

      this.$store.commit("basketList", arr);
      let ts = new Date().getTime();
      this.$store.commit("showCreditBasket", ts);
      // this.$store.commit("clearSelect", ts);
    },

    listHandler(list,commonMoney) {
      let tem = [];
      list.forEach((arr) => {
        arr.C.forEach((item) => {
          if (item.active || item.money) {
            if (!this.isShowInput) {
              item.money = commonMoney;
            }
            tem.push(item);
            item.active = false;
          }
        });
      });
      return tem;
    },
  },
};
</script>
<style lang="scss" scoped>
.zhenghe {
  height: 100%;

  .btn-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    margin: 10px auto;
    .input-box {
      width: 80px;
      margin-right: 5px;
    }
    .btn {
      width: 65px;
    }
  }
}
</style>