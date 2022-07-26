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
      let i = 1;
      let temObj = C[0];
      while (i < 12) {
        Nlist.push(
          Object.assign({}, temObj, {
            isSelected: false,
            N: i < 10 ? '0'+i:i,
          })
        );
        i++;
      }
      this.Nlist = Nlist;
      this.$BDH.changeOdds(this.Nlist);
    },
    changeOdds() {
      this.$BDH.changeOdds(this.Nlist);
      this.handlerData();
    },
    addRandom(val) {
      let { n } = val;
      while (n--) {
        let obj = this.config.addRandom(this.randomArr);
         obj.money = obj.times * obj.radix * obj.moneyMode;
        obj.num = 1;
        this.$store.commit("basketList", obj);
      }
    },

    toBuy() {
      this.addToBasket();
      let ts = new Date().getTime();
      this.$store.commit("toBuyNext", ts);
    },
    addToBasket() {
      let numArr = [];
      for (let arr of this.selectedMap.values()) {
        if (arr.length == 0) continue;
        let tem = [];
        arr.forEach((item) => {
          tem.push(item.N);
        });
        numArr.push(tem);
      }

      let { num, money } = this.$store.state.gd.footMoney;

      let obj = this.$BDH.createBuyObj();
      let str = numArr.join("|")
      obj.numStr = str;
      obj.orderStr = str;
      obj.gName = obj.gName;
      obj.num = num;
      obj.money = money;
      obj.I = this.randomArr[0].I;

      this.$store.commit("basketList", obj);
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
      let s = 0
      let i =0
      for(let [key,value] of this.selectedMap.entries()){
        let len = value.length
        if(len==0)continue
        s+=len
        i++
      }
      if (!s) {
        this.$store.commit("footMoney", {});
      }
      let money = s * this.radix * this.times * this.mode;
      this.$store.commit("footMoney", { num: s, money });
      let n = this.Nlist[0].odds;
      this.$store.commit("moneyDeviation", (i - 1) * n);
    },
  },
};
</script>
<style lang="scss" scoped>
.fushi {
  height: 200px;
  padding:20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>