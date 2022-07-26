<template>
  <view>
    <C1 v-bind="$attrs"  v-if="isShow" />
    <ChangeGame v-bind="$attrs" v-else />
  </view>
</template>

<script>
import ChangeGame from "./ChangeGame.vue";
import C1 from "./C1";
import ids from "@/pages/gamesIm/ids.js";
export default {
  data() {
    return {
      isShow: false,
    };
  },
  components: {
    ChangeGame,
    C1,
  },

  created() {
    this.initData();
  },

  methods: {
    initData() {
      let { curGameId } = this.$store.state.GDV3.v3IndexGameAllData;

      let idType;
      for (let [key, value] of Object.entries(ids)) {
        if (value.includes(curGameId)) {
          idType = key;
        }
      }

      let idTypes = [105, 106];
      if (idTypes.includes(Number(idType))) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
  },
};
</script>

<style>
</style>
