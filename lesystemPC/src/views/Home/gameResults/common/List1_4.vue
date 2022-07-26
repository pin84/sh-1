<template>
  <div class="list1-4" :style="styleObj">
    <div class="top">{{ title }}</div>
    <div class="title-box">
      <span class="title" v-for="(ta, n) in titleArr" :key="n">{{ ta }}</span>
    </div>
    <ul class="list">
      <div class="item" v-for="(arr, idx) in dList" :key="idx">
        <span
          class="no"
          :style="{
            color: redLsit.includes(n)
              ? 'red'
              : blueLsit.includes(n)
              ? '#039'
              : '',
          }"
          v-for="(n, i) in arr"
          :key="i"
          >{{ n }}</span
        >
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: () => "aaa",
    },
    titleArr: {
      type: Array,
      default: () => [],
    },
    dList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      styleObj: {},
      redLsit: ["小", "单", "虎",'上','奇'],
      blueLsit: ["大", "双", "龙", "偶"],
    };
  },

  created() {
    this.initPage();
  },
  methods: {
    initPage() {
      let len = this.dList.length * 32 + "px";

      this.styleObj = {
        width: len,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
// @import url("./common.css");
$numWidth: 19px;
$numWidth_s: 16px;
.list1-4 {
  width: 120px;
  height: 100%;
  overflow: hidden;
  border-left: 1px solid #c0c0c0;
  font-size: 14px;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  // border-left: 1px solid #c0c0c0;
  // border-right: 1px solid #c0c0c0;
  box-sizing: border-box;
  .top {
    background-color: #efefef;
    color: #000;
    text-align: center;
    border-bottom: 1px solid #c0c0c0;
    border-right: 1px solid #c0c0c0;
    // border-left: 1px solid #c0c0c0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 20px;
    box-sizing: border-box;
    font-weight: 600;
  }
  .title-box {
    display: flex;
    .title {
      width: 100%;
      text-align: center;
      box-sizing: border-box;
      border-right: 1px solid #c0c0c0;
      border-bottom: 1px solid #c0c0c0;
    }
  }

  .list {
    width: 100%;
    height: 100%;
    // border: 1px solid red;
    box-sizing: border-box;
    display: flex;
    .item {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      align-items: center;
      // border-right: 1px solid #c0c0c0;
      // border-bottom: 1px solid #c0c0c0;
      height: 30px;
      line-height: 30px;
      .no {
        // width: 65px;
        width: 100%;
        height: 30px;
        border-right: 1px solid #c0c0c0;
        border-bottom: 1px solid #c0c0c0;
        box-sizing: border-box;
        // &:last-child {
        //   border-right: none;
        // }
      }
    }
  }
}
</style>