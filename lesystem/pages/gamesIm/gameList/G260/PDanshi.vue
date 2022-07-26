<template>
  <view class="danshi">
    <view>
      <textarea
        v-model="inputNum"
        @input="changeInput"
        class="uni-textarea radius text-sm"
        maxlength='-1'
      />
    </view>

    <view class="margin-top-xl flex justify-center">
      <button @click="deleteRepeat" class="cu-btn round bg-orange">
        删除重复号
      </button>
      <button @click="clear" class="cu-btn round bg-orange">清空</button>
    </view>
    <view class="margin-top-lg" style="line-height: 42rpx">
      <text class="text-sm"
        >程序会自动过滤掉不合法的号码。您也可以点击"删除重复号"按钮对输入内容进行格式化。</text
      >
      <br />
      <text class="text-sm"
        >注意：不足2位数的号码要在前面补0，如号码为5，则输入时应为05</text
      >
    </view>

    <view class="margin-top-sm"><!-- <MyRecord  /> --></view>
  </view>
</template>

<script>
import playList from "./playList.js";
export default {
  data() {
    return {
      gameConfig: {},
      inputNum: "",
      curRate: {},
      curGame: {},
      limitLen: 3, //这个页面一些公用的限制
    };
  },

  watch: {
    "$store.state.GDV3.officialRate": {
      handler: function (val) {
        this.curRate = val;
        this.changeInput();
      },
      deep: true,
    },

    "$store.state.GDV3.v3AddRandom": {
      handler: function (val) {
        this.addToBasketRandom(val.n);
      },
    },
    "$store.state.GDV3.v3ToBuy": {
      handler: function () {
        this.v3ToBuy();
      },
    },
    "$store.state.GDV3.addToBasket": {
      handler: function () {
        this.addToBasket();
      },
    },

    "$store.state.GDV3.v3CurGame": {
      handler: function (val) {
        this.$store.commit("setNumBasket", []);
        this.initPage(val.N);
      },
      deep: true,
    },
  },

  created() {
    this.initPage();
  },

  methods: {
    initPage(n) {
      this.curRate = this.$store.state.GDV3.officialRate;
      this.curGame = this.$store.state.GDV3.v3CurGame;

      if (!n) {
        let { N } = this.curGame;
        n = N;
      }

      this.gameConfig = playList[n];
      this.limitLen = this.gameConfig.lenLimit;
    },
    async addToBasket({ isShowBasket = true } = {}) {
      let res = this.gameConfig.dataHandler(this.inputNum);
      let { spliceEl, repeatEl, handlerArr } = res;

      if (handlerArr.length === 0) return true;

      let flag = await this.tips({ spliceEl, repeatEl });
      if (!flag) return false;
      let obj = this.gameConfig.addToBasket(handlerArr);

      let { num, money } = this.$store.state.GDV3.footMoney;

      obj.len = num;
      obj.money = money;

      this.$store.commit("v3NumBasket", obj);
      this.$store.commit("v3FootMoney", { num: 0, money: 0 });
      this.inputNum = "";
      if (isShowBasket) {
        this.$store.commit("v3IsShowNumBaket", true);
      }
      return true;
    },
    changeInput() {
      if (this.inputNum === "") return;
      let { handlerArr } = this.gameConfig.dataHandler(this.inputNum);
      let len = handlerArr.length;
      if (len === 0) {
        this.$store.commit("v3FootMoney", { num: 0, money: 0 });
        return;
      }
      let { radix } = this.$store.state.GDV3.v3IndexGameAllData;

      let money = len * this.curRate.rate * radix * this.curRate.ratio;
      let m = this.$util.handlerMoneyDecimal(money);
      this.$store.commit("v3FootMoney", { num: len, money: m });
    },
    async v3ToBuy() {
      let flag = await this.addToBasket({ isShowBasket: false });

      if (!flag) return;

      //触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
      let ts = new Date().getTime();
      this.$store.commit("v3ToBuyNext", ts);
      this.inputNum = "";
    },

    addToBasketRandom(n) {
      while (n--) {
        let obj = this.gameConfig.addToBasketRandom();
        this.$store.commit("v3NumBasket", obj);
      }
      this.$store.commit("v3IsShowNumBaket", true);
    },

    async deleteRepeat() {
      if (this.inputNum === "") {
        this.$util.showConfirm({
          content: "您还没有输入号码",
          showCancel: false,
        });
        return;
      }
      let { spliceEl, repeatEl, handlerArr } = this.gameConfig.dataHandler(
        this.inputNum
      );

      let flag = await this.tips({ spliceEl, repeatEl, comformdelete: true });
      if (!flag) return;
      this.inputNum = handlerArr.join(",");
    },

    async tips({ spliceEl, repeatEl, comformdelete }) {
      let len1 = repeatEl.length;
      let len2 = spliceEl.length;

      let repeatStr = repeatEl.join(",");
      let isShowMark = len1 && len2 ? "," : "";
      let str;
      if (!len1 && !len2) {
        str = "没有重复号码";
      } else {
        str = `已经为您过滤了${len1}个重复号，${len2}个无效号，过滤内容为：${repeatStr}${isShowMark}${spliceEl}`;
      }

      let flag = true;

      if (str == "没有重复号码") {
        if (comformdelete) {
          await this.$util.showConfirm({
            content: str,
            showCancel: false,
          });
        }
      } else {
        flag = await this.$util.showConfirm({
          // showCancel: false,
          content: str,
        });
      }

      return flag;
    },

    clear() {
      this.inputNum = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.danshi {
  padding: 10rpx;
  .uni-textarea {
    border: 1px solid #727272;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    padding: 10rpx;
    height: 350rpx;
  }

  .cu-btn {
    height: 80rpx;
  }
}
</style>
