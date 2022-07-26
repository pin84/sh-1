<template>
  <div class="my-list">
    <div class="title">{{ title }}</div>
    <ul class="list">
      <li
        class="item"
        :style="{
          color:
            String(n).includes('小') || String(n).includes('单')
              ? 'red'
              : String(n).includes('大') || String(n).includes('双')
              ? '#039'
              : '',
        }"
        v-for="(n, idx) in list"
        :key="idx"
      >
        {{ n }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => "冠亚和值",
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.my-list {
  width: 100%;
  border-right: 1px solid #c0c0c0;
  .title {
    height: 40px;
    line-height: 40px;
    background-color: #efefef;
    font-size: 12px;
    font-weight: 600;
    padding: 0 20px;
    border-bottom: 1px solid #c0c0c0;
    word-break: keep-all;
    text-align: center;
  }
  .list {
    font-size: 12px;
    .item {
      border-bottom: 1px solid #c0c0c0;
      text-align: center;
      height: 30px;
      line-height: 30px;
      box-sizing: border-box;
    }
  }
}
</style>