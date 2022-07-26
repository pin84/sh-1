<template>
  <div class="G810">
    <ZhengHe v-if="curId == 1" />
    <LongHuDou v-if="curId == 7" />
    <QuanWuZhongYi v-if="curId == 8" />
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
    ZhengHe: () => import("./ZhengHe"),
    LongHuDou: () => import("./LongHuDou"),
    QuanWuZhongYi: () => import("./QuanWuZhongYi"),
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