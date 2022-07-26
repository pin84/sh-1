<template>
  <div class="zhenghe">
    <div class="list">
      <div class="item" v-for="(title, index) in 1" :key="index">
        <!-- <div v-if="index == 0" class="name">特码</div>
        <div v-else-if="index == 8" class="name">总和</div>
        <div v-else class="name">{{ title }}</div> -->
        <ZhengHeList
          :isShowInput="isShowInput"
          :titleList="bettingType"
          :list="list"
          :numList="numList"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ZhengHeList from "./ZhengHeList";
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
      } else {
        this.isShowInput = false;
        this.bettingType = ["项目", "赔率", "号码"];
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
      this.list = tem1;

      let numList = [];
      for (let [key, value] of Object.entries(common.bgColor())) {
        let tem1 = [];
        let tem2 = [];
        let tem3 = [];
        let tem4 = [];
        value.forEach((n) => {
          if (n % 2 == 1 && n < 49) {
            tem1.push({
              bc: key,
              num: n,
            });
          }
          if (n % 2 == 0) {
            tem2.push({
              bc: key,
              num: n,
            });
          }
          if (n > 24 && n < 49) {
            tem3.push({
              bc: key,
              num: n,
            });
          }
          if (n <= 24) {
            tem4.push({
              bc: key,
              num: n,
            });
          }
        });
        numList.push(tem1, tem2, tem3, tem4);
      }
      this.numList = numList;
    },

    setOdds(item, percentage) {
      item.odds = this.$BDH.setNumDecimal(
        item.MxO - (item.MxO - item.MiO) * percentage,
        3
      );
    },

    changeOdds(val) {
      let { percentage } = val;
      this.list.forEach(item=>{
        this.setOdds(item,percentage)
      })
      this.list.push({})
      this.list.pop()
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
      this.list.forEach((item) => {
          if (item.active || item.money) {
            if (!this.isShowInput) {
              item.money = commonMoney;
            }
            tem.push(item);
          }
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
