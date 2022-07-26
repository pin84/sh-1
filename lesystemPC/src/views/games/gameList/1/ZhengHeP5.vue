<template>
  <div class="zhenghe">
    <div class="left">
      <div class="top">
        <div
          :class="{ active: curTopIndex == idx }"
          class="top-item pointer"
          v-for="(str, idx) in topList"
          :key="idx"
          @click="selectTop(idx)"
        >
          {{ str }}
        </div>
      </div>
      <div class="list">
        <div class="item" v-for="(title, index) in 5" :key="index">
          <ZhengHeList
            :isShowInput="isShowInput"
            :titleList="bettingType"
            :list="list[index]"
          />
        </div>
      </div>
    </div>
    <div class="f-box">
      <FastBets :list="listFast" />
    </div>
  </div>
</template>
<script>
import ZhengHeList from "@/views/games/components/ZhengHeList";
import common from "./common";
import FastBets from "./FastBets";
export default {
  data() {
    return {
      curTopIndex: 0,
      commonMoney: "",
      isShowInput: true,
      curIndex: 0,
      lenLimit: 5,
      selectedArr: [],
      rateObj: { times: 1, mode: 1 },
      listCache: [],
      list: [],
      list2: [],
      listFast: [],
      topList: [
        "正码特一",
        "正码特二",
        "正码特三",
        "正码特四",
        "正码特五",
        "正码特六",
      ],
      titleList1: ["前三", "中三", "后三"],
      bettingType: ["号码", "赔率", "金额"],
    };
  },

  components: {
    ZhengHeList,
    FastBets,
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
    selectTop(idx) {
      this.curTopIndex = idx;
      let ts = new Date().getTime();
      this.$store.commit("clearSelect", ts);
      this.$store.commit("clearInput", ts);
      this.initData();
    },

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

      let obj = JSON.parse(
        JSON.stringify(
          arr.find((item) => item.N == this.topList[this.curTopIndex])
        )
      );

      let tem1 = obj.C;
      tem1.sort((a, b) => a.N - b.N);

      tem1.forEach((item) => {
        item.N1 = obj.N;
        for (let [key, value] of Object.entries(common.bgColor())) {
          if (value.includes(Number(item.N))) {
            item.bgcolor = key;
            break;
          }
        }
        this.setOdds(item, percentage);
      });

      this.listFast = JSON.parse(JSON.stringify(tem1));
      // console.log(this.listFast);
      let list1 = this.$BDH.arrayDivision(tem1, 10);

      this.list = list1;
    },

    setOdds(item, percentage) {
      item.odds = this.$BDH.setNumDecimal(
        item.MxO - (item.MxO - item.MiO) * percentage,
        3
      );
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
      // this.changeOddsOption(this.list2, percentage);
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
  display: flex;
  .left {
    width: 100%;
  }
  .top {
    display: flex;
    padding: 5px;
    .top-item {
      border: 1px solid #ccc;
      margin-right: 10px;
      border-radius: 5px;
      font-size: 12px;
      padding: 3px 8px;
      color: #585858;
      &.active {
        background-color: #cc0033;
        color: #fff;
      }
    }
  }
  .list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 20%;
      border-right: 1px solid #c9c7c7;
      border-bottom: 1px solid #c9c7c7;
      box-sizing: border-box;
    }
  }
  .f-box {
    border-left: 1px solid #ccc;
    flex: 0 0 220px;
  }
}
</style>