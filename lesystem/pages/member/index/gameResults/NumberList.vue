<template>
  <ul class="num-list">
    <li class="num-item" v-for="n in list" :key="n">
      <span class="num">{{ n }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
$numWidth: 20px;
$numWidth_s: 16px;
.num-list {
  display: flex;
  border-bottom: 1px solid #ddd;
  background-color: #efefef;
  .num-item {
    width: $numWidth;
    border-right: 1px solid #ddd;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    .num {
      display: inline-block;
      width: $numWidth_s;
      height: $numWidth_s;
      line-height: $numWidth_s;
      text-align: center;
      border-radius: 50%;
      font-size: 12px;
    }
  }
}
</style>