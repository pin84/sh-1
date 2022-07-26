<template>
  <ul class="num-list">
    <li
      class="num-item"
      :style="{ color: colorList[index].color }"
      v-for="(item,index) in colorList"
      :key="index"
    >
      <div class="num" v-for="(n,m) in list[index]" :key="m">{{ n }}</div>
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

  data() {
    return {
      colorList: [
        {
          name: "出现总次数",
          color: "rgb(255, 0, 255)",
        },
        {
          name: "平均遗漏",
          color: "rgb(72, 90, 48)",
        },
        {
          name: "最大遗漏",
          color: "rgb(128, 57, 5)",
        },
        {
          name: "最大连出",
          color: "rgb(24, 86, 107)",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
$numWidth: 20px;
$numWidth_s: 20px;
.num-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // background-color: #efefef;
  .num-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 21px;
    line-height: 21px;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    .num {
      display: inline-block;
      border-right: 1px solid #ddd;
      width: 20px;
      height: $numWidth;
      line-height: $numWidth;
      text-align: center;
      font-size: 12px;
      box-sizing: border-box;
    }
  }
}
</style>