<template>
  <div class="fushi">
    <div class="position-box" v-if="isShowPosition">
      <PositionList @toggleCheck="toggleCheck" :limitLen="limitLen" />
    </div>

    <div class="circular-box">
      <ListCircularHeZhi
        :startNum="startNum"
        :title="title"
        :numLimit="numLimit"
        @selectedNum="selectedNum"
      />
    </div>
  </div>
</template>
<script>
import ListCircularHeZhi from "@/views/games/components/ListCircularHeZhi";
import PositionList from "@/views/games/components/PositionList";

export default {
  props: {
    config: {
      type: Object,
      defaule: () => {},
    },
  },

  data() {
    return {
      selectedArr: [],
      titleArr: [],
      radix: 2,
      mode: 1,
      times: 1,
      startNum: 0,
      nameArr: [], //记录选中的 万位 千位等
      countLenArr: [], //记录处理后的每一注的钱数
      isShowPosition: true,
      limitLen: 2, //位置长度
      numLimit: 2, //数字长度
      positionArr: [],
    };
  },

  components: {
    ListCircularHeZhi,
    PositionList,
  },

  watch: {
    "$store.state.gd.footRate": {
      handler: function (val) {
        let { mode, times } = val;
        this.mode = mode;
        this.times = times;

        this.handlerData();
      },
      deep: true,
    },

    "$store.state.gd.addToBasket": function (val) {
      this.addToBasket();
    },
    "$store.state.gd.toBuy": function (val) {
      this.toBuy();
    },
  },

  created() {
    this.initData();
  },

  methods: {
    toggleCheck(arr) {
      this.positionArr = arr;
      console.log(arr);
      if (this.selectedArr.length == 0 || this.positionArr.length == 0) {
         this.$store.commit("footMoney", { num: 0, money:0 });
        return;
      }
      this.handlerData();
    },
    initData() {
      let { radix } = this.$store.state.gd.indexGameData;
      let { mode, times } = this.$store.state.gd.footRate;
      this.radix = radix;
      this.mode = mode;
      this.times = times;
      let { title, isShowPosition, limitLen, numLimit, startNum } = this.config;
      this.title = title;
      this.numLimit = numLimit;
      this.startNum = startNum;
      this.isShowPosition = isShowPosition;
      this.limitLen = limitLen || 2;
    },

    toBuy() {
      this.addToBasket();
      let ts = new Date().getTime();
      this.$store.commit("toBuyNext", ts);
    },
    addToBasket() {
      let { radix } = this.$store.state.gd.indexGameData;
      let { C } = this.$store.state.gd.curGame;
      let { numStr, orderStr } = this.config.dataHandler(this.selectedArr);

      let objArr = [];
      if (this.positionArr.length !== 0) {
        this.positionArr.forEach((str) => {
          let robj = C.find((item) => item.N.includes(str));
          let obj = this.$BDH.createBuyObj();
          obj.numStr = numStr;
          obj.orderStr = orderStr;
          obj.I = robj.I;
          obj.gName = robj.N;
          obj.num = obj.num / this.positionArr.length;
          obj.money = obj.money / this.positionArr.length;
          objArr.push(obj);
        });
      } else {
        let obj = this.$BDH.createBuyObj();
        obj.numStr = numStr;
        obj.orderStr = orderStr;
        objArr.push(obj);
      }

      this.$store.commit("basketList", objArr);
      this.$store.commit("footMoney", {});
      this.$store.commit("clearSelect", new Date().getTime());
      this.selectedArr = [];
    },
    selectedNum(arr) {
      this.selectedArr = arr;
      this.handlerData();
    },

    handlerData() {
      let s = this.config.moneyHandler(this.selectedArr);

      if (!s) {
        this.$store.commit("footMoney", {});
        return;
      }

      let len = this.positionArr.length;
      if (len == 0) {
        len = 1;
      }

      s = s * len;

      let money = s * this.radix * this.times * this.mode;
      this.$store.commit("footMoney", { num: s, money });
    },
  },
};
</script>
<style lang="scss" scoped>
.fushi {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .position-box {
    padding: 20px;
  }
}
</style>