<template>
  <div class="p8">
    <div class="zhenghe-3">
      <div class="item" v-for="(n, index) in 2" :key="index">
        <ZhengHeList
          :isShowInput="isShowInput"
          :titleList="bettingType"
          :list="list[index]"
          :numList="numList[index]"
        />
      </div>
    </div>
    <div class="qisebo">
      <div class="title">七色波</div>
      <div class="list">
        <div class="item" v-for="(n, idx) in 2" :key="idx">
          <ZhengHeList
            :isShowInput="isShowInput"
            :titleList="bettingType2"
            :list="list2[idx]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ZhengHeList from "./ZhengHeList";
// import ZhengHeList1 from "@/views/games/components/ZhengHeList";
import common from "./common";
export default {
  data() {
    return {
      numList: [],
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
      bettingType: ["项目", "赔率", "金额"],
    };
  },

  components: {
    ZhengHeList,
    // ZhengHeList1,
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
        this.bettingType = ["项目", "赔率", "金额", "号码"];
        this.bettingType2 = ["项目", "赔率", "金额"];
      } else {
        this.isShowInput = false;
        this.bettingType = ["项目", "赔率", "号码"];
        this.bettingType2 = ["项目", "赔率"];
      }
    },

    initData() {
      let type = this.$store.state.gd.bettingType;
      this.changeBettingType(type);
      let arr = this.$store.state.gd.curGame.C;
      let { percentage } = this.$store.state.gd.footOdds;
      let tem1 = arr[0].C;
      tem1.forEach((item) => {
        item.N1 = arr[0].N;
        // for (let [key, value] of Object.entries(common.bgColor())) {
        //   if (value.includes(Number(item.N))) {
        //     item.bgcolor = key;
        //     break;
        //   }
        // }
        this.setOdds(item, percentage);
      });
      tem1.sort((a, b) => a.I - b.I);
      this.list = this.$BDH.arrayDivision(tem1, 6);
      this.numList = this.$BDH.arrayDivision(common.ShengXiaoList(), 6);

      let obj1 = arr[1];

      let list2 = [];
      obj1.C.forEach((item) => {
        this.setOdds(item, percentage);
        item.N1 = obj1.N;
        list2.push(item);
      });
      this.list2 = this.$BDH.arrayDivision(list2, 2);
    },

    setOdds(item, percentage) {
      item.odds = this.$BDH.setNumDecimal(
        item.MxO - (item.MxO - item.MiO) * percentage,
        3
      );
    },

    changeOdds(val) {
      let { percentage } = val;
      this.list.forEach((arr) => {
        arr.forEach((item) => {
          this.setOdds(item, percentage);
        });
        arr.push({});
        arr.pop();
      });
      this.list2.forEach((arr) => {
        arr.forEach((item) => {
          this.setOdds(item, percentage);
        });
        arr.push({});
        arr.pop();
      });
    },

  

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
.p8 {
  .zhenghe-3 {
    display: flex;
    .item {
      width: 50%;
      border-right: 1px solid #c9c7c7;
    }
  }

  .qisebo {
    .title {
      background-color: #cf271e;
      color: #fff;
      text-align: center;
      font-size: 14px;
      padding: 3px;
    }
    .list {
      display: flex;
      .item {
        width: 50%;
        border-right: 1px solid #c9c7c7;
      }
    }
  }
}
</style>
