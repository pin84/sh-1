<template>
  <div class="seriesa" :style="styleObj">
    <div class="top">{{ title1 }}</div>
    <ul class="list">
      <li class="item" v-for="(arr, idx) in resultList" :key="idx">
        <div v-for="(n, i) in arr" :key="i">
          <span
            class="no"
            :style="{
              backgroundColor:
                n % 5 == 0
                  ? 'gray'
                  : n % 4 == 1
                  ? 'green'
                  : n % 4== 2
                  ? '#CC4d33'
                  : n % 4 == 3
                  ? 'darkblue'
                  : '#2366A1',
            }"
          >
            {{ n }}
          </span>
          {{ arr.length - 2 == i ? "=" : arr.length - 1 == i ? "" : "+" }}
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    title1: {
      type: String,
      default: () => "aa",
    },
    title2: {
      type: Array,
      default: () => [],
    },
    resultList: {
      type: Array,
      default: () => [[]],
    },

    seriesList: {
      type: Array,
      default: () => [],
    },
    titleList: {
      type: Array,
      default: () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
  },
  data() {
    return {
      styleObj: {},
    };
  },

  created() {
    // this.initPage();
  },
  methods: {
    initPage() {
      let len = this.resultList[0].length * 66 + "px";

      this.styleObj = {
        width: len,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
// @import url("../common.css");
$numWidth: 19px;
$numWidth_s: 16px;
.seriesa {
  width: 100%;
  font-size: 14px;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  border-left: 1px solid #c0c0c0;
  border-right: 1px solid #c0c0c0;
  box-sizing: border-box;
  .top {
    background-color: #efefef;
    color: #000;
    text-align: center;
    border-bottom: 1px solid #c0c0c0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    // box-sizing: border-box;
  }

  .list {
    width: 600px;
    // border: 1px solid red;
    .item {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      justify-content: center;
      width: 100%;
      border-bottom: 1px solid #c0c0c0;
      height: 30px;
      &:first-child {
        border-top: none !important;
      }
      .no {
        display: inline-block;
        width: 25px;
        height: 25px;
        line-height: 25px;
        border-radius: 50%;
        background-color: darkblue;
        color: white;
        font-weight: 600;
        margin: 0 5px;
      }
    }
    // .item-title {
    //   height: 20px;
    //   line-height: 20px;
    //   background-color: #efefef;
    //   .title {
    //     height: 20px;
    //     line-height: 20px;
    //   }
    // }
  }
}
</style>