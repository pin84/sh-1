<template>
  <div class="title-list">
    <div class="top" :style="styleObj1">
      <span class="no">期数</span>
      <span class="num" :style="styleObj">开奖号码</span>
    </div>
    <ul class="list">
      <li class="item" v-for="(header, index) in listHeader[0]" :key="index">
        <div class="title">{{ header || "00" }}</div>
        <NumberList  :list="listHeader[1]"  />
      </li>
    </ul>
  </div>
</template>
<script>
import NumberList from "./NumberList";
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    listHeader: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      styleObj: {},
      styleObj1: {},
    };
  },

  components:{
    NumberList
  },
  created() {
    this.initPage();
  },

  methods: {
    initPage() {
      console.log(this.list);
      let len = this.list[0].result.length * 20 ;
      
      this.styleObj = {
        flex: `0 0 ${len}px`,
      };
      // let len1 = +len + 84
      // this.styleObj1 = {
      //   flex: `0 0 ${len1}px`,
      // };
    },
  },
};
</script>
<style lang="scss" scoped>
.title-list {
  background-color: #efefef;
  height: 36px;
  display: flex;
  align-items: center;
  // justify-content: space-between;
  // border: 1px solid red;
  .top {
    flex: 0 0 291px;
    height: 36px;
    line-height: 36px;
    color: #000;
    display: flex;
    font-size: 14px;
    // border: 1px solid red;
    .no {
      width: 100%;
      border: none;
      text-align: center;
    }
    .num {
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      display: inline-block;
      // box-sizing: border-box;
      text-align: center;
    }
  }

  .list {
    display: flex;
    // border: 1px solid red;
    // width: 100%;
    .item {
      .top {
        height: 36px;
        overflow: hidden;
      }
      .title {
        border-bottom: 1px solid #ddd;
        text-align: center;
        background-color: #efefef;
        font-size: 12px;
        height: 20px;
        box-sizing: border-box;
      }
    }
  }
}
</style>