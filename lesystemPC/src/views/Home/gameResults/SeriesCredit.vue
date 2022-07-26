<template>
  <div class="seriesa">
    <div class="top h">
      <span class="no">期数</span>
      <span class="num" :style="styleObj">开奖时间</span>
    </div>

    <ul class="list">
      <li class="item " v-for="(item, idx) in seriesList" :key="idx">
        <span class="no">{{item.number}}</span>
        <span class="num">{{item.time}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    seriesList: {
      type: Array,
      default: () => [],
    },

  },
  data() {
    return {
      styleObj: {},
      titleList: [
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

  created() {
    // this.initPage();
  },
  methods: {
    initPage() {
      let len = this.list[0].result.length * 20 + "px";
      this.styleObj = {
        flex: `0 0 ${len}`,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
$numWidth: 19px;
$numWidth_s: 16px;
.seriesa {
  width: 100%;
  font-size: 12px;
  // border: 1px solid red;
   text-align: center;
  .top {
    background-color: #efefef;
    color: #000;
    text-align: center;
    border-bottom: 1px solid #C0C0C0;
    // box-sizing: border-box;
    display: flex;
    justify-content: space-between;
   
  }
  .list {
    width: 100%;
    .item {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid #C0C0C0;
      height: 30px;
      line-height: 30px;
      &:first-child {
        border-top: none !important;
      }
      &:last-child {
        border-bottom: 1px solid #C0C0C0;
      }
      // .no {
      //   width: 150px;
      //   text-align: center;
      //   font-size: 12px;
      //   box-sizing: border-box;
      //   border-right: 1px solid #C0C0C0;
      // }
      // .num {
      //   display: inline-block;
      //   display: flex;
      //   width: 200px;
      //   text-align: center;
      //   // border: 1px solid #C0C0C0;
      // }
    }
  }

  .h{
    height: 40px;
    line-height: 40px;
  }

  .no {
    // text-align: center;
    width: 150px;
  }
  .num {
    flex: 0 0 200px;
    border-left: 1px solid #C0C0C0;
    display: inline-block;
    // text-align: center;
  }
  // .title {
  //   height: 84px;
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: space-between;
  //   .title-item {
  //     border-bottom: 1px solid #C0C0C0;
  //     text-align: center;
  //     font-size: 12px;
  //     height: 21px;
  //     line-height: 21px;
  //     box-sizing: border-box;
  //   }
  // }
}
</style>