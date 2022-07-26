<template>
  <div class="seriesa" :style="styleObj">
    <div class="top">{{ title1 }}</div>
    <ul class="list">
      <li class="item item-title">
        <span class="no title" v-for="(n, index) in title2" :key="index">{{
          n
        }}</span>
      </li>
      <template v-for="(arr, idx) in resultList">
        <li class="item" :key="idx">
          <span class="no" v-for="(item, i) in arr" :key="i">
            <span
              class="bg"
              :style="[
                {
                  color:
                    item.includes('单') ||
                    item.includes('小') ||
                    item.includes('兽')
                      ? 'red'
                      : item == '红波' || item == '蓝波' || item == '绿波'
                      ? '#fff'
                      : '#039',
                },
                {
                  background:
                    item == '红波'
                      ? 'red'
                      : item == '蓝波'
                      ? 'blue'
                      : item == '绿波'
                      ? 'green'
                      : '',
                },
              ]"
            >
              {{ item }}
            </span>
          </span>
        </li>
      </template>
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
  // border: 1px solid red;
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
        background-position: center;
        font-weight: 400;
        .bg {
          display: inline-block;
          width: 25px;
          height: 18px;
          line-height: 18px;
        }
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
      // border: 1px solid red;
      // width: 30px;
        height: 20px;
        line-height: 20px;
      }
    }
  }
}
</style>