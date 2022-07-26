<template>
  <div class="fushi">
    <div class="position-box" v-if="isShowPosition">
      <PositionList @toggleCheck="toggleCheck" :limitLen="limitLen" />
    </div>
    <div class="circular-box">
      <ListCircular :Nlist="Nlist" :Tlist="Tlist" :titleArr="titleArr" @selectedNum="selectedNum" />
    </div>
  </div>
</template>
<script>
import ListCircular from "@/views/games/components/ListCircular";
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
      Nlist: [
        {
          isSelected: false,
          num: 0,
        },
        {
          isSelected: false,
          num: 1,
        },
        {
          isSelected: false,
          num: 2,
        },
        {
          isSelected: false,
          num: 3,
        },
        {
          isSelected: false,
          num: 4,
        },
        {
          isSelected: false,
          num: 5,
        },
        {
          isSelected: false,
          num: 6,
        },
        {
          isSelected: false,
          num: 7,
        },
        {
          isSelected: false,
          num: 8,
        },
        {
          isSelected: false,
          num: 9,
        },
      ],
      Tlist: [
        {
          isSelected: false,
          text: "全",
        },
        {
          isSelected: false,
          text: "大",
        },
        {
          isSelected: false,
          text: "小",
        },
        {
          isSelected: false,
          text: "单",
        },
        {
          isSelected: false,
          text: "双",
        },

        {
          isSelected: false,
          text: "清",
        },
      ],
      nameArr: [], //记录选中的 万位 千位等
      countLenArr: [], //记录处理后的每一注的钱数
      isShowPosition: true,
      limitLen: 2,
    };
  },

  components: {
    ListCircular,
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
    "$store.state.gd.addRandom": {
      handler: function (val) {
        this.addRandom(val);
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
    toggleCheck(obj) {
    },
    initData() {
      let { radix } = this.$store.state.gd.indexGameData;
      let { mode, times } = this.$store.state.gd.footRate;
      this.radix = radix;
      this.mode = mode;
      this.times = times;
      let { titleArr, Nlist, Tlist, isShowPosition, limitLen } = this.config;
      this.titleArr = titleArr;
      this.isShowPosition = isShowPosition;
      this.limitLen = limitLen || 2;

      if (Nlist) {
        this.Nlist = Nlist;
      }
      if (Tlist) {
        this.Tlist = Tlist;
      }
    },
    addRandom(val) {
      let { C } = this.$store.state.gd.curGame;
      let { n } = val;
      while (n--) {
        let obj = this.config.addRandom(C);
        this.$store.commit("basketList", obj);
      }
    },

    toBuy() {
      this.addToBasket();
      let ts = new Date().getTime();
      this.$store.commit("toBuyNext", ts);
    },
    addToBasket() {
      let { radix } = this.$store.state.gd.indexGameData;
      let { C } = this.$store.state.gd.curGame;
      let objArr = this.config.dataHandler(
        this.selectedArr,
        this.nameArr,
        C,
        radix
      );

   

  


      this.$store.commit("basketList", objArr);
      this.$store.commit("footMoney", {});
      this.$store.commit("clearSelect", new Date().getTime());
      this.selectedArr = [];
    },
    selectedNum(arr, nameArr) {
      this.selectedArr = arr;
      this.nameArr = nameArr;
      this.handlerData();
    },

    handlerData() {
      let s = this.config.moneyHandler(this.selectedArr, this.nameArr);
      if (!s) {
        this.$store.commit("footMoney", {});
        return;
      }

      // let lenArr = [];
      // list.forEach((str) => {
      //   let arr = str.split(",");
      //   let s = arr.reduce((accumulator, currentValue) => {
      //     return accumulator * currentValue.length;
      //   }, 1);
      //   lenArr.push(s);
      // });
      // this.countLenArr = lenArr;
      // let s = lenArr.reduce((accumulator, currentValue) => {
      //   return accumulator + currentValue;
      // }, 0);

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