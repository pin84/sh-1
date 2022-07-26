<template>
  <div class="zhenghe">
    <!-- <div class="top">
      <div
        :class="{ active: curTopIndex == idx }"
        class="top-item pointer"
        v-for="(str, idx) in topList"
        :key="idx"
        @click="selectTop(idx)"
      >
        {{ str }}
      </div>
    </div> -->
    <div class="list">
      <div class="item" v-for="(title, index) in topList" :key="index">
        <div class="title">{{title}}</div>
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
import common from "./common";
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
      topList: [
        "正码一",
        "正码二",
        "正码三",
        "正码四",
        "正码五",
        "正码六",
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
    selectTop(idx) {
      this.curTopIndex = idx;
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

    initData() {
      let type = this.$store.state.gd.bettingType;
      this.changeBettingType(type);
      let arr = this.$store.state.gd.curGame.C;
      let { percentage } = this.$store.state.gd.footOdds;

      let tem1 = JSON.parse(JSON.stringify(arr));
      let idArr = [
        [485, 497, 479, 491],
        [498, 492, 486, 480],
        [487, 499, 493, 481],
        [500, 482, 488, 494],
        [489, 495, 501, 483],
        [490, 502, 484, 496],
      ];

      let list = [];
      idArr.forEach((ids) => {
        let tem = [];
        let arr = tem1.filter((obj) => ids.includes(obj.Id));
        arr.sort((a, b) => a.Id - b.Id);
        arr.forEach((obj) => {
          obj.C.forEach((item) => {
            item.N1 = obj.N;
            // for (let [key, value] of Object.entries(common.bgColor())) {
            //   if (value.includes(Number(item.N))) {
            //     item.bgcolor = key;
            //     break;
            //   }
            // }
            this.setOdds(item, percentage);
            tem.push(item);
          });
        });
        list.push(tem);
      });
      this.list = list;
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
      });
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
      width: 16.6666%;
      border-right: 1px solid #c9c7c7;
      border-bottom: 1px solid #c9c7c7;
      box-sizing: border-box;
      .title{
        background-color: #cf271e;
        color:#fff;
        font-size: 12px;
        text-align: center;
        padding: 5px 0;
      }
    }
  }
}
</style>