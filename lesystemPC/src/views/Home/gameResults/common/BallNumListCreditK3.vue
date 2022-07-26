<template>
  <div class="seriesa" :style="styleObj">
    <div class="top">{{ gameInfo.t1 }}</div>
    <ul class="list">
      <li class="item item-title">
        <span class="no title" v-for="(n,index) in gameInfo.t2" :key="index">{{ n }}</span>
      </li>
      <li class="item" v-for="(arr, idx) in resultList" :key="idx">
        <span
          :class="'k3_' + Number(n)"
          class="no"
          v-for="(n,i) in arr"
          :key="i"
        ></span>
      </li>
    </ul>

  </div>
</template>
<script>
export default {
  props: {
    resultList: {
      type: Array,
      default: () => [[]],
    },
    gameInfo: {
      type: Object,
      default: () => {},
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
    this.initPage();
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
    height: 20px;
    // box-sizing: border-box;
  }

  .list {
    width: 100%;
    .item {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid #c0c0c0;
      height: 30px;
      line-height: 30px;
      &:first-child {
        border-top: none !important;
      }
      .no {
        width: 65px;
        height: 30px;
        border-right: 1px solid #c0c0c0;
        background-position: center ;
        &:last-child {
          border-right: none;
        }
      }
    }
    .item-title {
      height: 20px;
      line-height: 20px;
      background-color: #efefef;
      .title {
        height: 20px;
        line-height: 20px;
      }
    }
  }
}
</style>