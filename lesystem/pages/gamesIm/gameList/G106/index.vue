<template>
  <view class="G106">
    <G1 v-if="playType == '1767'" />
    <G2 v-if="playType == '1765'" />
    <G3 v-if="playType == '1766'" />
    <G4 v-if="playType == '1772'" />
    <G5 v-if="playType == '1773'" />
    <G6 v-if="playType == '1775'" />
    <G7 v-if="playType == '1776'" />
    <G8 v-if="playType == '1777'" />
  </view>
</template>

<script>
import G1 from "./G1"
import G2 from "./G2"
import G3 from "./G3"
import G4 from "./G4"
import G5 from "./G5"
import G6 from "./G6"
import G7 from "./G7"
import G8 from "./G8"
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
    G1,
    G2,
    G3,
    G4,
    G5,
    G6,
    G7,
    G8,
  },

  watch: {
    "$store.state.GDV3.v3CurGame": {
      handler: function (val) {
        this.initData(val);
      },
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
      if (!I) return;
      setTimeout(() => {
        this.playType = I;
      }, 0);
    },

 
  },
};
</script>
