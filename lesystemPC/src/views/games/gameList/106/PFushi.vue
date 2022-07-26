<template>
  <div class="fushi">
    <ListSquare :isRadio='isRadio' :numArr='numArr' :titleArr="titleArr" @selectedNum="selectedNum" />
  </div>
</template>
<script>
import ListSquare from "@/views/games/components/list/ListSquare_106";
export default {
  props: {
    config: {
      type: Object,
      defaule: () => {},
    },
  },

  data() {
    return {
      isRadio:0,
      numArr:[],
      selectedArr: [],
      titleArr: [],
      radix: 2,
      mode: 1,
      times: 1,
      nameArr:[]//记录选中的 万位 千位等
    };
  },

  components: {
    ListSquare,
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
      this.radix = radix;
      let { mode, times } = this.$store.state.gd.footRate;
      this.mode = mode;
      this.times = times;
      let { titleArr,isRadio } = this.config;
      this.titleArr = titleArr;
      this.isRadio = isRadio;

      this.numArr = this.config.createNumList()
  

    },
    addRandom(val) {
      let { n } = val;
      while (n--) {
        let obj = this.config.addRandom();
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
      this.selectedArr = []
    },
    selectedNum(arr) {
      this.selectedArr = arr;
      this.handlerData();
    },

    handlerData() {
      if(this.selectedArr.length == 0){
        this.$store.commit("footMoney", {});
        return;
      }
      let obj = this.config.moneyHandler(this.selectedArr);
      
      if(!obj){
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
  justify-content: space-between;
}
</style>