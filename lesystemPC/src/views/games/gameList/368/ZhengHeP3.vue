<template>
  <div class="zhenghe">
    <!-- <div class="title">冠，亚军和</div>
    <div class="list">
      <div class="item w_25" v-for="(title, index) in 4" :key="index">
        <div class="name">{{ title }}</div>
        <ZhengHeList
          :isShowInput="isShowInput"
          :titleList="bettingType"
          :list="list2[index]"
        />
      </div>
    </div> -->

    <div class="list">
      <div class="item" v-for="(title, index) in 5" :key="index">
        <!-- <div class="name">{{ title }}</div> -->
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
        "冠军",
        "亚军",
        "第三名",
        "第四名",
        "第五名",
        "第六名",
        "第七名",
        "第八名",
        "第九名",
        "第十名",
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


    initData() {
      let type = this.$store.state.gd.bettingType;
      this.changeBettingType(type);

      let arr = this.$store.state.gd.curGame.C;
      let { percentage } = this.$store.state.gd.footOdds;

      let temArr = arr[0].C;
      temArr.forEach((obj) => {
        obj.N1 = arr[0].N;
        obj.odds = obj.MxO - (obj.MxO - obj.MiO) * percentage;
      });

      let list = this.$BDH.arrayDivision(temArr, 4);

      let ids = [803, 804];
      let list2 = [];
      arr
        .filter((item) => ids.includes(item.Id))
        .forEach((outObj, idx) => {
          outObj.C.forEach((obj) => {
            obj.N1 = arr[0].N;
            obj.odds = obj.MxO - (obj.MxO - obj.MiO) * percentage;
            list2.push(obj);
          });
        });

      list2.forEach((item, idx) => {
        list[idx].push(item);
      });

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
  .title {
    font-size: 14px;
    text-align: center;
    background-color: #cf271e;
    color: #fff;
    padding: 5px;
  }
  .list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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
    .w_25 {
      width: 25%;
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