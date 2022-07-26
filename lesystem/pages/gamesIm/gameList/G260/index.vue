<template>
  <view class="G260">
    <PlayA v-if="playType === 'A'" />
    <PlayB v-if="playType === 'B'" />
    <PDanshi v-if="playType === 'C'" />
    <PFushi v-if="playType === 'D'" />
    <PDingWeiDan v-if="playType === 'E'" />
  </view>
</template>

<script>
import playList from "./playList";
import PlayA from "./PlayA";
import PlayB from "./PlayB";
import PDanshi from "./PDanshi";
import PFushi from "./PFushi";
import PDingWeiDan from "./PDingWeiDan";


export default {
  data() {
    return {
      // isShowBasket: false,
      isShowRecord: false,
      gameConfig: {},
      playType: "",
      titleArr: [],
    };
  },
  components: {
    PlayA,
    PlayB,
    PDanshi,
    PFushi,
    PDingWeiDan,
  },

  watch: {
    "$store.state.GDV3.v3CurGame": {
      handler: function () {
        this.initData();
      },
      deep: true,
    },
    "$store.state.GDV3.v3ShowRecord": function (val) {
      this.isShowRecord = val;
    },
  },

  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.playType = "";
      let { N } = this.$store.state.GDV3.v3CurGame;

      if (!N) return;
      let obj = playList[N];

      if (!obj) return;
      let { playType } = obj;

      setTimeout(() => {
        this.playType = playType;
      }, 0);

      this.setRatioBarValue();
    },

    setRatioBarValue() {
      let { C } = this.$store.state.GDV3.v3CurGame;

      if (!C) return;
      let curMxO = 0;
      let obj = {};
      C.forEach((item) => {
        if (item.MxO > curMxO) {
          curMxO = item.MxO;
          obj = item;
        }
      });

      this.$store.commit("v3RatioInitValue", obj);
    },
  },
};
</script>
