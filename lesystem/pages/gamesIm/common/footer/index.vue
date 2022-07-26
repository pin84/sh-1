<template>
  <view class="foot-wrapper">
    <FooterOfficial v-if="curFoot == 'A'" />
    <FooterCredit v-if="curFoot == 'B'" />
    <FooterCredit1 v-if="curFoot == 'C'" />
  </view>
</template>

<script>
import FooterOfficial from "./FooterOfficial";
import FooterCredit1 from "./FooterCredit_1";
import FooterCredit from "./FooterCredit";
export default {
  data() {
    return {
      curFoot: "A",
      footIds: [118, 119, 116, 121],
    };
  },

  components: {
    FooterCredit,
    FooterCredit1,
    FooterOfficial,
  },



  created() {
    this.initData();
  },
  methods: {
    initData() {
      let { curGameId, gameType } = this.$store.state.GDV3.v3IndexGameAllData;
      if (this.footIds.includes(curGameId)) {
        this.curFoot = "C";
      } else if (gameType == 0) {
        this.curFoot = "B";
      } else {
        this.curFoot = "A";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.foot-wrapper{
  background-color: #fff;
}
</style>