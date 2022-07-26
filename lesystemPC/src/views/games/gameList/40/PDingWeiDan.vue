<template>
  <div class="fushi">
    <ListDingWeiDan
      :size="4"
      :Nlist="Nlist"
      :Tlist="Tlist"
      :titleArr="titleArr"
      @selectedNum="selectedNum"
    />
  </div>
</template>
<script>
import ListDingWeiDan from "@/views/games/components/list/ListDingWeiDan.vue";
import Tips from "@/views/games/components/tips";
export default {
  props: {
    config: {
      type: Object,
      defaule: () => {},
    },
  },

  data() {
    return {
      selectedMap: undefined,
      selectedArr: [],
      titleArr: [],
      radix: 2,
      mode: 1,
      times: 1,
      Nlist: [],
      textArr: ["全", "大", "小", "单", "双", "清"],
      Tlist: [],
      randomArr: [],
    };
  },

  components: {
    ListDingWeiDan,
    Tips,
  },

  watch: {
    "$store.state.gd.footRate": {
      handler: function (val) {
        let { mode, times } = val;
        this.mode = mode;
        this.times = times;
        this.changeOdds(val);
        this.handlerData();
      },
      deep: true,
    },
    "$store.state.gd.footOdds": {
      handler: function (val) {
        this.changeOdds();
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
      let i = 0;
      this.textArr.forEach((text) => {
        this.Tlist.push({
          isSelected: false,
          text,
        });
      });
    },
    initData() {
      let { C } = this.$store.state.gd.curGame;
      this.randomArr = C;
      let { radix } = this.$store.state.gd.indexGameData;
      let { mode, times } = this.$store.state.gd.footRate;
      this.radix = radix;
      this.mode = mode;
      this.times = times;
      let { titleArr } = this.config;
      this.titleArr = titleArr;

      let Nlist = [];
      // C.forEach(item=>{
      //   Nlist.push(JSON.parse(JSON.stringify(item)))
      // })

      let { MB, MiO, MxO } = this.randomArr[0];

      for (let i = 0; i < 10; i++) {
        Nlist.push({
          isSelected: false,
          N: i,
          MxO,
          MiO,
          MB,
        });
      }

      // Nlist.forEach((item, index) => {
      //   item.isSelected = false;
      //   item.N = +index + 1 < 10 ? "0" + (+index + 1) : +index + 1;
      // });
      this.Nlist = Nlist;
      this.$BDH.changeOdds(this.Nlist);
    },
    changeOdds() {
      this.$BDH.changeOdds(this.Nlist);
      this.handlerData();
    },
    addRandom(val) {
      let { C } = this.$store.state.gd.curGame;
      let { n } = val;
      while (n--) {
        let obj = this.config.addRandom(this.randomArr);
        obj.num = 1
        obj.money =  this.radix * this.mode * this.times
        this.$store.commit("basketList", obj);
      }
    },

    toBuy() {
      this.addToBasket();
      let ts = new Date().getTime();
      this.$store.commit("toBuyNext", ts);
    },

    addToBasket() {
      let objArr = [];
      for (let [key, value] of this.selectedMap.entries()) {
        let len = value.length;
        if (len) {
          let obj = this.$BDH.createBuyObj();
          let tem = [];
          value.forEach((item) => {
            tem.push(item.N);
          });
          obj.numStr = tem.join("|");
          obj.orderStr = tem.join("|");
          obj.gName = obj.gName + key;
          obj.num = len;
          obj.money = obj.radix * obj.times * obj.moneyMode * len;
          let { I } = this.randomArr.find((o) => o.N.includes(key));

          obj.I = I;
          objArr.push(obj);
        }
      }

      this.$store.commit("basketList", objArr);
      this.$store.commit("footMoney", {});
      this.$store.commit("clearSelect", new Date().getTime());
      this.selectedMap = undefined;
    },
    selectedNum(map) {
      this.selectedMap = map;
      this.handlerData();
    },

    handlerData() {
      if (!this.selectedMap) return;
      let s = 0;
      let j = 0;
      for (let [key, value] of this.selectedMap.entries()) {
        let len = value.length;
        if (len) {
          s += len;
          j++;
        }
      }
      if (!s) {
        this.$store.commit("footMoney", {});
      }
      let money = s * this.radix * this.times * this.mode;
      this.$store.commit("footMoney", { num: s, money });
      let n = this.Nlist[0].odds;

      this.$store.commit("moneyDeviation", (j - 1 )* n   );
    },
  },
};
</script>
<style lang="scss" scoped>
.fushi {
  // height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>