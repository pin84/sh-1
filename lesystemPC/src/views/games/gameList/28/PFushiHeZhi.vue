<template>
  <div class="fushi">
    <ListCircularHeZhi
      :Nlist="list"
      :titleArr="titleArr"
      :isLimitEight='isLimitEight'
      @selectedNum="selectedNum"
    />
  </div>
</template>
<script>
import ListCircularHeZhi from "@/views/games/components/list/ListCircularHeZhi_28.vue";
export default {
  props: {
    config: {
      type: Object,
      defaule: () => {},
    },
  },

  data() {
    return {
      isLimitEight:false,
      selectedArr: [],
      titleArr: [],
      radix: 2,
      mode: 1,
      times: 1,
      list: [],
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
    this.initPage();
  },

  methods: {
    initPage() {
      let i = 1;
      let tem1 = [];
      while (i < 41) {
        tem1.push({
          isSelected: false,
          num: i < 10 ? "0" + i : i,
        });
        i++;
      }
      let j = 41;
      let tem2 = [];
      while (j < 81) {
        tem2.push({
          isSelected: false,
          num: j,
        });
        j++;
      }
      this.list.push(tem1, tem2);
    },
    initData() {
      let curGame = this.$store.state.gd.curGame;
      if(curGame.I == 1369){
        this.isLimitEight = false
      }else {
         this.isLimitEight = true
      }

      let { radix } = this.$store.state.gd.indexGameData;
      let { mode, times } = this.$store.state.gd.footRate;
      this.radix = radix;
      this.mode = mode;
      this.times = times;

      let { titleArr, startNum, endNum } = this.config;
      this.titleArr = titleArr;
      this.startNum = startNum || 0;
      this.endNum = endNum || 28;
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
      let obj = this.config.moneyHandler(this.selectedArr);
      if (!obj) {
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
  height: 260px;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
}
</style>