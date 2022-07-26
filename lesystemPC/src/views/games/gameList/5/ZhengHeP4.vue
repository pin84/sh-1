<template>
  <div class="zhenghe">
    <div class="list">
      <div class="item" v-for="(title, index) in 5" :key="index">
        <!-- <div v-if="index == 0 " class="name">特码</div>
        <div v-else-if="index ==8  " class="name">总和</div>
        <div v-else class="name">{{ title }}</div> -->
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
      curIndex: 0,
      lenLimit: 5,
      selectedArr: [],
      rateObj: { times: 1, mode: 1 },
      listCache: [],
      list: [],
      list2: [],
      titleList: [
        "特",
        "正码一",
        "正码二",
        "正码三",
        "正码四",
        "正码五",
        "正码六",
        "正码七",
        "总",
      ],
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
    selected(index) {
      this.curIndex = index;
      let arr = this.listCache[index];
      let list = [];
      arr.forEach((item) => {
        list.push([item]);
      });
      this.list2 = list;
    },

    dataHandler(titleList, arr, percentage) {
      let allArr = [];
      titleList.forEach((title) => {
        let tem = [];
        let list = arr.filter((item) => item.N.includes(title));
        list.forEach((obj1) => {
          obj1.C.forEach((obj) => {
            obj.N1 = obj1.N;
            obj.odds = obj.MxO - (obj.MxO - obj.MiO) * percentage;
            tem.unshift(obj);
          });
        });
        allArr.push(tem);
      });
      return allArr;
    },

    initData() {
      let type = this.$store.state.gd.bettingType;
      this.changeBettingType(type);

      let arr = this.$store.state.gd.curGame.C;
      let { percentage } = this.$store.state.gd.footOdds;

      let list = this.$BDH.arrayDivision(arr[0].C, 4);
      list.forEach((outArr) => {
        outArr.forEach((obj) => {
          obj.N1 = arr[0].N;
          obj.odds = obj.MxO - (obj.MxO - obj.MiO) * percentage;
        });
      });

      // let temArr = [];
      // for (let item of arr) {
      //   if (item.N.includes("球号")) continue;
      //   item.C.forEach((obj) => {
      //     obj.N1 = item.N;
      //     obj.odds = this.$BDH.setNumDecimal(
      //       obj.MxO - (obj.MxO - obj.MiO) * percentage,
      //       3
      //     );
      //     temArr.push(obj);
      //   });
      // }

      // this.$BDH.arrayDivision(temArr, 4).forEach((arr, index) => {
      //   list[index].push(...arr);
      // });

      this.list = list;
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


      let tem = [];
      this.list.forEach((arr) => {
        arr.forEach((item) => {
          if (item.active || item.money) {
            if (!this.isShowInput) {
              item.money = commonMoney;
            }
            tem.push(item);
          }
        });
      });
      this.list2.forEach((arr) => {
        arr.forEach((item) => {
          if (item.active || item.money) {
            if (!this.isShowInput) {
              item.money = commonMoney;
            }
            tem.push(item);
          }
        });
      });

      if (tem.length == 0) {
        this.$gutils.confirm({ text: "请选择号码" });
        return;
      }

      let ts = new Date().getTime();
      // this.$store.commit("clearSelect", ts);  //购买成功后再清除。共用一个Object,提前清除数据也会跟着清除
      this.$store.commit("basketList", tem);

      setTimeout(() => {
        this.$store.commit("showCreditBasket", ts);
      }, 100);
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
    flex-wrap: wrap;
    .item {
      width: 20%;
      border-right: 1px solid #c9c7c7;
      border-bottom: 1px solid #c9c7c7;
      box-sizing: border-box;
      .name {
        border-right: 1px solid #fff;
        color: #fff;
        background-color: #cf271e;
        padding: 6px 0;
        text-align: center;
        font-size: 14px;
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