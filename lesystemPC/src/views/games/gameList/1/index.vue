<template>
  <div class="G810">
  <!-- 特码 -->
    <ZhengHe v-if="curId == 1" />
  <!-- 色波 -->
    <ZhengHeP2 v-if="curId == 3" />
    <!-- <ZhengHeP3 v-if="curId == 3" /> -->

    <!-- 特肖 -->
    <GTeXiao v-if="curId == 4" />
     <!-- 正码 -->
    <ZhengHeP4 v-if="curId == 5" />
    <!-- 正特 -->
    <ZhengHeP5 v-if="curId == 6" />

    <!-- 正码1-6 -->
    <ZhengHeP6 v-if="curId == 7" />
    <!-- 连码 -->
    <ZhengHeP7 v-if="curId == 8" />
    <!-- 一肖 -->
    <ZhengHeP8 v-if="curId == 9" />
    <!-- 尾数 -->
    <ZhengHeP9 v-if="curId == 10" />
    <!-- 合肖 -->
    <ZhengHeP10 v-if="curId == 11" />
    <!-- 自选不中 -->
    <ZhengHeP11 v-if="curId == 12" />
    <!-- 连肖 -->
    <ZhengHeP12 v-if="curId == 13" />
    <!-- 连尾 -->
    <ZhengHeP13 v-if="curId == 14" />
    <!-- 龙虎斗 -->
    <LongHuDou v-if="curId == 15" />
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      config: null,
      type: null,
      curId: null,
    };
  },
  components: {
    GTeXiao: () => import("./GTeXiao"),
    ZhengHe: () => import("./ZhengHe"),
    ZhengHeP2: () => import("./ZhengHeP2"),
    ZhengHeP3: () => import("./ZhengHeP3"),
    ZhengHeP4: () => import("./ZhengHeP4"),
    ZhengHeP5: () => import("./ZhengHeP5"),
    ZhengHeP6: () => import("./ZhengHeP6"),
    ZhengHeP7: () => import("./ZhengHeP7"),
    ZhengHeP8: () => import("./ZhengHeP8"),
    ZhengHeP9: () => import("./ZhengHeP9"),
    ZhengHeP10: () => import("./ZhengHeP10"),
    ZhengHeP11: () => import("./ZhengHeP11"),
    ZhengHeP12: () => import("./ZhengHeP12"),
    ZhengHeP13: () => import("./ZhengHeP13"),
    LongHuDou: () => import("./LongHuDou"),
  },

  watch: {
    "$store.state.gd.curGame": {
      handler: function (val) {
        this.initData(val);
      },
    },
  },

  created() {
    let curGame = this.$store.state.gd.curGame;
    if (!curGame) return;
    this.initData(curGame);
  },

  methods: {
    initData(val) {
      this.curId = null;
      let { Id } = val;
      // let ids = [3, 4, 5, 6, 7, 8, 9];
      // if (ids.includes(Id)) {
      //   Id = 3;
      // }
      setTimeout(() => {
        this.curId = Id;
      }, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.G810 {
  height: 100%;
}
</style>