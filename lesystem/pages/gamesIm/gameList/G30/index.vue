<template>
  <view class="G260">
    <PDanshi v-if="playType == 'C'" />
    <PMN v-if="playType == 'D'" />
    <PFushi v-if="playType == 'F'" />
    <PDingWeiDan v-if="playType == 'A'" />
    <FushiCustom v-if="playType == 'E'" />
  </view>
</template>

//山东11选5 官方,
<script>
import playList from './playList.js';
import PDingWeiDan from './PDingWeiDan.vue';
import PDanshi from './PDanshi.vue';
import PMN from './PM_N.vue';
import FushiCustom from './FushiCustom.vue';
import PFushi from './PFushi.vue';
export default {
  data() {
    return {
      isShowBasket: false,
      isShowRecord: false,
      gameConfig: {},
      playType: '',
      titleArr: []
    };
  },
  components: {
    PDingWeiDan,
    // PlayB,
    PDanshi,
    PMN,
    FushiCustom,
    PFushi
  },

  watch: {
    '$store.state.GDV3.v3CurGame': {
      handler: function (val) {
        this.initData(val);
      }
    },
    '$store.state.GDV3.v3ShowRecord': function (val) {
      this.isShowRecord = val;
    },
    '$store.state.GDV3.v3IsShowNumBaket': function (val) {
      this.isShowBasket = val;
    }
  },

  created() {
    this.initData();
  },
  methods: {
    initData(val) {
      this.playType = '';
      if (!val) {
        val = this.$store.state.GDV3.v3CurGame;
      }
      let { I } = val;

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
    }
  }
};
</script>

