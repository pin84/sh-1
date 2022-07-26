<template>
  <view class="G260">
    <PDingWeiDan v-if="playType == 'A'" />
    <PMN v-if="playType == 'B'" />
    <PMNRepeat v-if="playType == 'B1'" />
    <PDanshi v-if="playType == 'C'" />
    <PDanshiRepeat v-if="playType == 'C1'" />
    <FushiCustom v-if="playType == 'D'" />
    <PFushi v-if="playType == 'F'" />
    <PFushiRepeat v-if="playType == 'F1'" />
    <PLonghu v-if="playType == 'E'" />
    <PNiuNiu v-if="playType == 'E1'" />
    <PBaiJiaLe v-if="playType == 'E2'" />
  </view>
</template>

<script>
import playList from "./playList.js";
import Footer from "@/pages/gamesIm/common/footer/FooterOfficial.vue";
import Ratio from "@/pages/gamesIm/common/ratioBar/RatioOffical_white.vue";
import PDingWeiDan from "./PDingWeiDan.vue";
import PDanshi from "./PDanshi.vue";
import PDanshiRepeat from "./PDanshiRepeat.vue";
import PMN from "./PM_N.vue";
import PMNRepeat from "./PM_NRepeat.vue";
import FushiCustom from "./FushiCustom.vue";
import PFushi from "./PFushi.vue";
import PFushiRepeat from "./PFushiRepeat.vue";
import PLonghu from "./PLonghu.vue";
import PNiuNiu from "./PNiuNiu.vue";
import PBaiJiaLe from "./PBaiJiaLe.vue";
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
    Ratio,
    Footer,
    PDingWeiDan,
    PDanshi,
    PDanshiRepeat,
    PMN,
    PMNRepeat,
    PFushi,
    PFushiRepeat,
    PLonghu,
    PNiuNiu,
    PBaiJiaLe,
    FushiCustom,
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

      //龙虎
      let ids = [3186, 3189, 3192, 3195, 3198, 3201, 3204, 3207, 3210];
      if (ids.includes(I)) {
        I = 3183;
      }
      if (!I || !playList[I]) return;
      let { playType } = playList[I];
      setTimeout(() => {
        this.playType = playType;
      }, 100);
    },

    //切换  我要投注 或 投注记录页面
    changeTal(index) {
      this.TabCur = index;
      index == 0 ? (this.isShowRecord = false) : (this.isShowRecord = true);
    },
  },
};
</script>

