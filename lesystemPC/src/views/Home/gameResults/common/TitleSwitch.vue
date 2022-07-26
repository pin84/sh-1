<template>
  <div class="type-box">
    <span
      class="type pointer"
      :class="{ active: curIndex == idx }"
      v-for="(title, idx) in titleList"
      :key="idx"
      @click="selectType(idx)"
      >{{ title }}</span
    >
  </div>
</template>

<script>
export default {
  props: {
    titleList: {
      type: Array,
      default: () => ["排名", "大小单双龙虎"],
    },
  },
  data() {
    return {
      curIndex: 0,
    };
  },

  methods: {
    selectType(idx) {
      this.curIndex = idx;
      this.$emit("selectType", idx);
    },
  },
};
</script>

<style lang="scss" scoped>
.type-box {
  display: flex;
  justify-content: center;
  padding: 20px 0 0 0;
  background-color: #ddd;
  font-size: 12px;
  .type {
    color: rgb(255, 0, 0);
    padding: 3px 6px;
    &.active {
      background-color: rgb(57, 94, 170);
      color: #fff;
    }
  }
}
</style>