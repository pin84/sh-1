<template>
  <div class="zhenghe">
    <div v-for="(item, index) in list" :key="index" style="margin-top: 1px">
      <LongHuList :isShowInput="isShowInput" itemWidth="16.66%" :list="item" />
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
      titleList: ["正码一", "正码二", "正码三", "正码四", "正码五", "正码六"],
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
      console.log(list);

      let list1 = [];
      this.titleList.forEach((str) => {
        let arr = list.filter((item) => item.N.startsWith(str));
        arr.forEach((obj) => {
          obj.C.forEach((item) => {
            item.N1 = arr[0].N
            item.odds = this.$BDH.setNumDecimal(
              item.MxO - (item.MxO - item.MiO) * percentage,
              3
            );
          });
        });
        list1.push(arr);
      });
      this.list = list1;
    },

    changeOddsOption(list, percentage) {
      list.forEach((arr) => {
        arr.forEach((obj) => {
          obj.C.forEach((item) => {
            item.N1 = obj.N;
            item.odds = this.$BDH.setNumDecimal(
              item.MxO - (item.MxO - item.MiO) * percentage,
              3
            );
          });
          obj.C.push({});
          obj.C.pop();
        });
      });
    },

    changeOdds(val) {
      let { percentage } = val;
      this.changeOddsOption(this.list, percentage);
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

      let tem = [];
      this.list.forEach((arr) => {
        arr.forEach((obj) => {
          obj.C.forEach((item) => {
            if (item.active || item.money) {
              if (!this.isShowInput) {
                item.money = commonMoney;
              }
              tem.push(item);
            }
          });
        });
      });

      if (tem.length == 0) {
        this.$gutils.confirm({ text: "请选择号码" });
        return;
      }

      this.$store.commit("basketList", tem);
      let ts = new Date().getTime();
      this.$store.commit("showCreditBasket", ts);
      // this.$store.commit("clearSelect", ts);
    },

    // listHandler(list, commonMoney) {
    //   let tem = [];
    //   list.forEach((arr) => {
    //     arr.C.forEach((item) => {
    //       if (item.active || item.money) {
    //         if (!this.isShowInput) {
    //           item.money = commonMoney;
    //         }
    //         tem.push(item);
    //         item.active = false;
    //       }
    //     });
    //   });
    //   return tem;
    // },
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