<template>
  <!-- :style="styleObj" -->
  <div class="lhc-list" :style="styleObj">
    <div class="top">{{ title1 }}</div>
    <ul class="list">
      <div class="title-list">
        <div class="item" v-for="(n, index) in title2" :key="index">
          {{ n }}
        </div>
      </div>

      <div class="num-list">
        <li class="item" v-for="(arr, idx) in resultList" :key="idx">
          <span class="item-text" :style="{color:['上','奇','龙'].includes(item) ? 'red' : ['偶','虎','下'].includes(item) ? '#039': '#000'}" v-for="(item, i) in arr" :key="i">
            {{ item }}
          </span>
        </li>
      </div>
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
      colorArr:[]
    };
  },

  created() {
    console.log(this.resultList);
    this.initPage();
  },
  methods: {
    initPage() {
      let len = this.title2.length * 35 + "px";
      this.styleObj = {
        width: len,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
$numWidth: 19px;
$numWidth_s: 16px;
.lhc-list {
  font-size: 12px;
  text-align: center;
   border-right: 1px solid #c0c0c0;
  .top {
    background-color: #efefef;
    color: #000;
    text-align: center;
    border-bottom: 1px solid #c0c0c0;
    height: 20px;
  }

  .list {
    .title-list {
      border-bottom: 1px solid #c0c0c0;
      display: flex;
      .item {
        width: 100%;
        border-right: 1px solid #c0c0c0;
        height: 19px;
        line-height: 19px;
        &:last-child {
          border-right: none !important;
        }
      }
    }

    .num-list {
      .item {
        display: flex;
        border-bottom: 1px solid #c0c0c0;
        .item-text {
          border-right: 1px solid #c0c0c0;
          width: 100%;
          line-height: 29px;
          height: 29px;
          &:last-child {
            border-right: none !important;
          }
        }
      }
    }
  }
}
</style>