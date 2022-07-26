<template>
  <div class="fushi">
    <ListCircular
      :size="5"
      :Nlist="Nlist"
      :Tlist="Tlist"
      :titleArr="titleArr"
      @selectedNum="selectedNum"
    />
  </div>
</template>
<script>
import ListCircular from "@/views/games/components/ListCircular";
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
          num: "01",
        },
        {
          isSelected: false,
          num: "02",
        },
        {
          isSelected: false,
          num: "03",
        },
        {
          isSelected: false,
          num: "04",
        },
        {
          isSelected: false,
          num: "05",
        },
        {
          isSelected: false,
          num: "06",
        },
        {
          isSelected: false,
          num: "07",
        },
        {
          isSelected: false,
          num: "08",
        },
        {
          isSelected: false,
          num: "09",
        },
        {
          isSelected: false,
          num: "10",
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
    };
  },

  components: {
    ListCircular,
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
    initData() {
      let { radix } = this.$store.state.gd.indexGameData;
      let { mode, times } = this.$store.state.gd.footRate;
      this.radix = radix;
      this.mode = mode;
      this.times = times;

      let { titleArr } = this.config;
      this.titleArr = titleArr;
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
      let { numStr, orderStr } = this.config.dataHandler(
        this.selectedArr,
        this.nameArr
      );

      let obj = this.$BDH.createBuyObj();

      obj.numStr = numStr;
      obj.orderStr = orderStr;

      this.$store.commit("basketList", obj);
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
      if (this.selectedArr.length == 0) {
        this.$store.commit("footMoney", {});
        return;
      }

      let obj = this.config.moneyHandler(this.selectedArr);
      if (!obj || obj.money == 0) {
        this.$store.commit("footMoney", {});
        return;
      }

      let { num, money } = obj;
      money = money * this.radix * this.times * this.mode;
      this.$store.commit("footMoney", { num, money });
    },
  },
};
</script>
<style lang="scss" scoped>
.fushi {
  min-height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>