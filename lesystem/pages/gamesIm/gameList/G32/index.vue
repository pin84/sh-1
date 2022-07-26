<template>
  <view class="G260">
    <PDingWeiDan v-if="playType == 'A'" />
    <PDanshi v-if="playType === 'C'" />
    <PMN v-if="playType === 'D'" />
    <PFun v-if="playType === 'E'" />
    <PFushi v-if="playType === 'F'" />
  </view>
</template>

<script>
import playList from "./playList.js";
import PDingWeiDan from "./PDingWeiDan.vue";
import PDanshi from "./PDanshi.vue";
import PMN from "./PM_N.vue";
import PFun from "./PFun.vue";
import PFushi from "./PFushi.vue";
export default {
  data() {
    return {
      isShowBasket: false,
      isShowRecord: false,
      gameConfig: {},
      playType: "",
      titleArr: [],
    };
  },
  components: {
    PDingWeiDan,
    PDanshi,
    PMN,
    PFun,
    PFushi,
  },

  watch: {
    "$store.state.GDV3.v3CurGame": {
      handler: function (val) {
        this.initData(val);
      },
    },
    "$store.state.GDV3.v3ShowRecord": function (val) {
      this.isShowRecord = val;
    },
    "$store.state.GDV3.v3IsShowNumBaket": function (val) {
      this.isShowBasket = val;
    },
  },

  created() {
    this.initData();
  },
  methods: {
    initData(val) {
      this.playType = "";
      if (!val) {
        val = this.$store.state.GDV3.v3CurGame;
      }
      let { I } = val;

      if (!I || !playList[I]) return;
      let { playType } = playList[I];
      setTimeout(() => {
        this.playType = playType;
      }, 0);
    },

    //切换  我要投注 或 投注记录页面
    changeTal(index) {
      this.TabCur = index;
      index == 0 ? (this.isShowRecord = false) : (this.isShowRecord = true);
    },
  },
};
</script>
