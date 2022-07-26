<template>
  <view class="G260">
    <ZhengHe v-if="playType == '1'" />
    <G2 v-if="playType == '2'" />
    <G3 v-if="playType == '3'" />
    <G4 v-if="playType == '4'" />
    <G5 v-if="playType == '5'" />
    <G6 v-if="playType == '6'" />
    <GLongHuDou v-if="playType == '7'" />
    <G8 v-if="playType == '8'" />
  </view>
</template>

<script>
import ZhengHe from "./PZhengHe.vue";
import G2 from "./G2.vue";
import G3 from "./G3.vue";
import G4 from "./G4.vue";
import G5 from "./G5.vue";
import G6 from "./G6.vue";
import G8 from "./G8.vue";
import GLongHuDou from "./GLongHuDou.vue";

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
    ZhengHe,
    G2,
    G3,
    G4,
    G5,
    G6,
    G8,
    GLongHuDou,
  },

  watch: {
    "$store.state.GDV3.v3CurPlayList": {
      handler: function (val) {
        // this.isShowBasket = false;
        let obj = val.C[0].C[0];
        this.$store.commit("v3RatioInitValue", obj);
        this.initData();
      },
      // deep: true
    },

    "$store.state.GDV3.v3ShowRecord": function (val) {
      this.isShowRecord = val;
    },

    "$store.state.GDV3.v3IsShowNumBaket": function (val) {
      console.log(val);

      this.isShowBasket = val;
    },
  },

  created() {
    this.initData();
  },

  methods: {
    initData() {
      this.playType = "";
      let { Id } = uni.getStorageSync("curPlayList");
      if (!Id) return;
      setTimeout(() => {
        this.playType = Id;
      }, 0);
    },

    //切换  我要投注 或 投注记录页面
    changeTal(index) {
      this.TabCur = index;
      index == 0 ? (this.isShowRecord = false) : (this.isShowRecord = true);
    },
  },

  destroyed() {
    uni.removeStorageSync("curPlayList");
    this.$store.commit("v3CurPlayList", {});
  },
};
</script>

