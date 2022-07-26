<template>
  <div class="zhenghe">
    <div class="list">
      <div class="item" v-for="(title, index) in titleList" :key="index">
        <ZhengHeList
          :isShowInput="isShowInput"
          :titleList="bettingType"
          :list="list[index]"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ZhengHeList from "@/views/games/components/ZhengHeList";
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
      // list3: [],
      // list2: [],
      titleList: ["第一球", "第二球", "第三球", "第四球", "第五球"],
      titleList1: ["前三", "中三", "后三"],
      bettingType: ["号码", "赔率", "金额"],
    };
  },

  components: {
    ZhengHeList,
    Input,
    // Tips
  },

  watch: {
    "$store.state.gd.addToBasket": function () {
      this.addToBasket();
    },
    "$store.state.gd.bettingType": {
      handler: function (val) {
        this.changeBettingType(val);
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
    changeBettingType(val) {
      if (val == 0) {
        this.isShowInput = true;
        this.bettingType = ["号码", "赔率", "金额"];
      } else {
        this.isShowInput = false;
        this.bettingType = ["号码", "赔率"];
      }
    },
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
        item.odds = this.$BDH.setNumDecimal(
          item.MxO - (item.MxO - item.MiO) * percentage,
          3
        );
        item.N1 = title;
        list2.push([item]);
      });

      this.list2 = list2;
    },
    initData() {
      let type = this.$store.state.gd.bettingType;
      this.changeBettingType(type);

      let obj = this.$store.state.gd.curGame;
      let { percentage } = this.$store.state.gd.footOdds;

      let arr = obj.C[0].C;
      let temArr = [];
      let tem = [];
      let i = 0;
      arr.forEach((item) => {
        item.N1 = "全五中1";
        item.odds = this.$BDH.setNumDecimal(
          item.MxO - (item.MxO - item.MiO) * percentage,
          3
        );
        tem.push(item);
        i++;
        if (i == 2) {
          temArr.push(tem);
          tem = [];
          i = 0;
        }
      });

      this.list = temArr;
    },

    changeOddsOption(list, percentage) {
      list.forEach((arr) => {
        arr.forEach((item) => {
          item.odds = this.$BDH.setNumDecimal(
            item.MxO - (item.MxO - item.MiO) * percentage,
            3
          );
        });
        arr.push({});
        arr.pop();
      });
    },

    changeOdds(val) {
      let { percentage } = val;
      this.changeOddsOption(this.list, percentage);
      this.changeOddsOption(this.list2, percentage);
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

      let objArr = [];
      this.list.forEach((arr) => {
        arr.forEach((item) => {
          if (item.active || item.money) {
            if (!this.isShowInput) {
              item.money = commonMoney;
            }
            objArr.push(item);
            item.active = false;
          }
        });
      });
      this.list2.forEach((arr) => {
        arr.forEach((item) => {
          if (item.active || item.money) {
            if (!this.isShowInput) {
              item.money = commonMoney;
            }
            objArr.push(item);
            item.active = false;
          }
        });
      });

      if (objArr.length == 0) {
        this.$gutils.confirm({ text: "请选择号码" });
        return;
      }

      this.$store.commit("basketList", objArr);
      let ts = new Date().getTime();
      this.$store.commit("showCreditBasket", ts);
    },
  },
};
</script>
<style lang="scss" scoped>
.zhenghe {
  height: 100%;
  .list {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .item {
      width: 100%;
      border-right: 1px solid #c9c7c7;
      border-bottom: 1px solid #c9c7c7;
      .name {
        border-right: 1px solid #fff;
        color: #fff;
        background-color: #cf271e;
        padding: 6px 0;
        text-align: center;
      }
      .bcy {
        background-color: #f69c11;
      }
    }
  }
  .list2 {
    display: flex;
  }
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