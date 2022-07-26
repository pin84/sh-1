<template>
  <view class="G260">
    <ZhengHe v-if="playType === '整合'" />
    <DiYiDiShi v-if="playType === '第1-10名'" />
    <GuanYaHeZhi v-if="playType === '冠亚和值'" />
    <GuanYaZhuHe v-if="playType === '冠亚组合'" />
  </view>
</template>

<script>
import ZhengHe from "./PZhengHe.vue";
import DiYiDiShi from "./PDiYiDiShi.vue";
import GuanYaHeZhi from "./GuanYaHeZhi.vue";
import GuanYaZhuHe from "./GuanYaZhuHe.vue";
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
    GuanYaZhuHe,
    ZhengHe,
    DiYiDiShi,
    GuanYaHeZhi,
  },

  watch: {
    "$store.state.GDV3.v3CurPlayList": {
      handler: function () {
        this.initData();
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
    initData() {
      this.playType = "";
      let { N, C } = uni.getStorageSync("curPlayList");
      
      if (!N || !C) return;
      let obj = C[0].C[0];
      this.$store.commit("v3RatioInitValue", obj);

      setTimeout(() => {
        this.playType = N;
      }, 100);
    },
  },

  destroyed() {
    uni.removeStorageSync("curPlayList");
    this.$store.commit("v3CurPlayList", {});
  },
};
</script>
