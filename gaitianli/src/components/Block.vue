<template>
  <div class="item-block">
    <div
      class="list"
      :class="[{'mr_20':mrArr_20.includes(index)},{'mr_40':mrArr_40.includes(index)}]"
      v-for="(arr,index) of d"
      :key="index"
    >
      <div
        class="item"
        :class="[{'bg_green':obj.isHas}]"
        v-for="(obj,idx) of arr"
        :key="idx"
      >
        <span
          class="text-box"
          v-if="obj.Days"
        >{{obj.Days}}</span>
      </div>
    </div>

    <div class="tc-box" :style="TCStyle.styleTC">
      <div class="zs" :class="{'active':TCStyle.ZSZT}"></div>
      <div class="tc" :class="{'active':TCStyle.TCZT}"></div>
    </div>

    <div class="zs-box" :style="TCStyle.styleZS">
      <div class="zs" :class="{'active':TCStyle.ZSZT}"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    d: {
      type: Array,
      default: () => [],
    },

    mrArr_20: {
      type: Array,
      default: () => [6, 20, 27, 34],
    },
    mrArr_40: {
      type: Array,
      default: () => [13],
    },

    TCStyle:{
      type:Object,
      default :()=>{
        return {
          
        }
      }
    },
    // styleTC:{
    //   type:Object,
    //   default:()=>{}
    // },
    // styleZS:{
    //   type:Object,
    //   default:()=>{}
    // },
    // TCZT:{
    //   type:Number,
    //   default:()=>0
    // },
    // ZSZT:{
    //   type:Number,
    //   default:()=>0
    // },

  },

  data() {
    return {
    };
  },

  created() {
    this.initData();
  },

  methods: {
    initData() {},
  },
};
</script>

<style lang="scss" scoped>
$w: 10px;
$h: 6px;
.item-block {
  position: relative;
  display: flex;
  justify-content: center;
  .list {
    &.mr_20 {
      margin-right: 10px;
    }

    &.mr_40 {
      margin-right: 50px;
    }
    .item {
      width: $w;
      height: $h;
      border: 1px solid #ccc;
      box-sizing: border-box;
      margin-bottom: 1px;
      margin-right: 2px;
      display: flex;
      align-items: center;
      justify-content: center;

      &.bg_green {
        background-color: $block-bg;
        border: 1px solid $block-bg;
      }
      .text-box {
        display: inline-block;
        width: $w;
        height: $h;
        line-height: $h;
        text-align: center;
        font-size: 6px;
        color: #fff;
      }
    }
  }

  .tc-box,
  .zs-box {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 20px);
    height: calc(100% - 15px);
    // border: 1px solid red;
  }

  .tc-box {
    transform: translateX(0%);
    .tc {
      width: 18px;
      height: 4px;
      background-color: $tc-stop;
      transform: translateY(-250%);
      &.active {
        background-color: $tc-run;
      }
    }
  }

  .zs-box {
    transform: translateX(0%) translateY(0%);
    .zs {
      width: 12px;
      height: 8px;
      border: 3px solid $zs-release;
      background-color: transparent;
      &.active {
        background-color: $zs-catch;
        border: 3px solid $zs-catch;
      }
    }
  }
}
</style>