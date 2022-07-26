<template>
  <view class="rotio-box-wrapper">
    <RatioOfficalWhite v-if="curR == 'A'" />
    <RatioCreditWhite v-if="curR == 'B'" />
    <RatioCreditWhite118 v-if="curR == 'C'" />
    <!-- <RatioCredit58 v-if="curR == 'E'" /> -->
  </view>
</template>

<script>
import RatioOfficalWhite from "./RatioOffical_white";
// import RatioCreditDeepGreen from './RatioCredit_deepGreen'
import RatioCreditWhite118 from "./RatioCredit_white_1";
import RatioCreditWhite from "./RatioCredit_white";
// import RatioCredit58 from "./RatioCredit58";
export default {
  data() {
    return {
      curR: "",
      ids: [118, 119, 116, 121],
    };
  },

  components: {
    RatioOfficalWhite,
    RatioCreditWhite118,
    RatioCreditWhite,
    // RatioCredit58,
  },

  watch: {
    "$store.state.GDV3.v3IndexGame": {
      handler: function (val) {
        this.initData();
      },
      deep: true,
    },
  },

  created() {
    this.initData();
  },
  methods: {
    initData() {
      let { curGameId, gameType } = this.$store.state.GDV3.v3IndexGameAllData;
      if (this.ids.includes(Number(curGameId))) {
        this.curR = "C";
      } else if (gameType == 0) {
        this.curR = "B";
      } else {
        this.curR = "A";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.rotio-box-wrapper {
  background-color: #fff;
}
</style>
