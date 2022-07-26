<template>
  <view class="G260">
    <PFun v-if="playType == 'A'" />
    <PMN v-if="playType == 'B'" />
  </view>
</template>

<script>
import PMN from "./PM_N.vue";
import PFun from "./PFun";
import playList from "./playList.js";
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
    PFun,
    PMN,
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
