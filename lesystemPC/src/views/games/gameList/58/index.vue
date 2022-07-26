<template>
  <div class="G810">
    <ZhengHe v-if="curId == 1" />
    <ZhengHeP2 v-if="curId == 2" />
    <ZhengHeP3 v-if="curId == 3" />
    <LongHuDou v-if="curId == 7" />
    <ZhengHeP4QuanWu v-if="curId == 8" />
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
    ZhengHeP2: () => import("./ZhengHeP2"),
    ZhengHeP3: () => import("./ZhengHeP3"),
    LongHuDou: () => import("./LongHuDou"),
    ZhengHeP4QuanWu: () => import("./ZhengHeP4QuanWu"),
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

      let ids = [3,4,5,6]
      if(ids.includes(Id)){
        Id = 3
      }
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