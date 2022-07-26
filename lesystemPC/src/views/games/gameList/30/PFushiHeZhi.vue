<template>
  <div class="fushi">
    <ListCircularHeZhi
      :Nlist="Nlist"
      :titleArr="titleArr"
      @selectedNum="selectedNum"
    />
  </div>
</template>
<script>
import ListCircularHeZhi from "@/views/games/components/list/ListCircularHeZhi.vue";
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
      startNum:0,
      endNum:28
    };
  },

  components: {
    ListCircularHeZhi,
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
    this.initPage();
  },

  methods: {
    initPage() {
      let i = this.startNum
      while (i < this.endNum) {
        this.Nlist.push({
          isSelected: false,
          num: i,
        });
        i++;
      }
    },
    initData() {
      let { radix } = this.$store.state.gd.indexGameData;
      let { mode, times } = this.$store.state.gd.footRate;
      this.radix = radix;
      this.mode = mode;
      this.times = times;

      let { titleArr,startNum,endNum } = this.config;
      this.titleArr = titleArr;
      this.startNum = startNum || 0
      this.endNum = endNum || 28

      
    },


    toBuy() {
      this.addToBasket();
      let ts = new Date().getTime();
      this.$store.commit("toBuyNext", ts);
    },
    addToBasket() {
      let { numStr, orderStr } = this.config.dataHandler(this.selectedArr);

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
      if (this.selectedArr.length == 0) {
        this.$store.commit("footMoney", {});
        return;
      };

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