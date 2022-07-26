<template>
  <div>
    <OfficiaBar v-if="curType == 'A'" v-on="$listeners" />
    <CreditBar v-if="curType == 'B'" v-on="$listeners" />
  </div>
</template>
<script>
import OfficiaBar from "./OfficiaBar";
import CreditBar from "./CreditBar";
export default {
  data() {
    return {
      curType: 0,
    };
  },
  components: {
    OfficiaBar,
    CreditBar,
  },

  created() {
    let { gameType } = this.$store.state.gd.indexGameData;
    if (gameType == 0) {
      this.curType = "B";
    } else {
      this.curType = "A";
    }


  },
};
</script>