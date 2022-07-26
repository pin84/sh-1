<template>
  <div class="fushi">
    <!-- <ListCircular
      :size="5"
      :Nlist="Nlist"
      :Tlist="Tlist"
      :titleArr="titleArr"
      @selectedNum="selectedNum"
    /> -->
    aa
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
      Nlist: [],
      textArr: ["全", "大", "小", "单", "双", "清"],
      Tlist: [],
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
    this.initPage();
    this.initData();
  },

  methods: {
    initPage() {
      let i = 1;
      while (i < 12) {
        this.Nlist.push({
          isSelected: false,
          num: i < 10 ? '0' + i : i,
        });
        i++;
      }

      this.textArr.forEach((text) => {
        this.Tlist.push({
          isSelected: false,
          text,
        });
      });
    },
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
      let { n } = val;
      while (n--) {
        let obj = this.config.addRandom();
        obj.money = obj.times * obj.radix * obj.moneyMode
        obj.num = 1
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
        this.selectedArr
      );

      let obj = this.$BDH.createBuyObj();

      obj.numStr = numStr;
      obj.orderStr = orderStr;

      this.$store.commit("basketList", obj);
      this.$store.commit("footMoney", {});
      this.$store.commit("clearSelect", new Date().getTime());
      this.selectedArr = [];
    },
    selectedNum(arr) {
      this.selectedArr = arr;
      this.handlerData();
    },

    handlerData() {
      if (this.selectedArr.length == 0) return;

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
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>