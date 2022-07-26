<template>
  <view class="othergame-list">
    <G79 v-if="curTemplate == '79'" />
    <G10 v-if="curTemplate == '10'" />
  </view>
</template>

<script>
import G79 from "./79";
import G10 from "./10";
export default {
  data() {
    return {
      curTemplate: "",
    };
  },
  components: {
    G79,
    G10,
  },
  created() {
    let routes = getCurrentPages()
      let { id } = routes[routes.length - 1].options
    id = Number(id);

    let idsObj = {
      79: [79, 65, 138, 60, 136, 68, 134],
      10: [10, 59, 7,196],
      // 810:[810,64,61,137,142,67,135]
    };
    let curId;
    for (let [key, value] of Object.entries(idsObj)) {
      if (value.includes(id)) {
        curId = key;
        break;
      }
    }

    this.curTemplate = curId;
  },
};
</script>

<style lang="scss" scoped>
.othergame-list {
  height: 100%;
  overflow: hidden;
}
</style>
