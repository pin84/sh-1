<template>
  <div class="item-block" ref="itemBlock">
    <div class="list" :class="[{'mr_20':mrArr_20.includes(index)},{'mr_40':mrArr_40.includes(index)}]" v-for="(arr,index) of d" :key="index">
      <div class="item" :class="[{'bg_green':obj.isHas}]" v-for="(obj,idx) of arr" :key="idx" :data-index="index + '-'+idx">
        <span class="text-box" v-if="obj.Days">{{obj.Days}}</span>
      </div>
    </div>

    <!-- <div class="tc-box" :style="TCStyle.styleTC">
      <div class="zs" :class="{'active':TCStyle.ZSZT}"></div>
    </div> -->
    <!-- <div class="tc" :style="TCStyle.styleTC" :class="{'active':TCStyle.TCZT}"></div> -->
    <div class="tc" ref="tc" :style="{transform:`translateX(${TCStyle.TCX * width / 100 }px) translateY(-0.1rem)`}" :class="{'active':TCStyle.TCZT}"></div>

    <!-- <div class="zs-box" :style="TCStyle.styleZS">
    </div> -->

    <!-- TCStyle.ZSX -->
    <div class="zs" ref="zs" :style="{transform:`translateX(${TCStyle.ZSX * width / 100 }px) translateY(${TCStyle.ZSY * height / 100}px)`}"  :class="{'active':TCStyle.ZSZT}"></div>
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
      default: () => [], //[13]
    },

    TCStyle: {
      type: Object,
      default: () => {
        return {  
          // ZSZT: 0,
          // TCZT: 0,
          // TCX: 100,
          // ZSX: 100,
          // ZSY: 0
          };
      },
    },
  },

  data() {
    return {
      width:0,
      height:0,
      tcW:0,
      zsW:0,
      zsH:0
    };
  },

  mounted() {
    this.initData();
  },

  methods: {
    initData() {
      let itemBlock = this.$refs.itemBlock
      this.width = itemBlock.clientWidth
      this.height = itemBlock.clientHeight
      this.tcW = this.$refs.tc.clientWidth
      this.zsH = this.$refs.zs.clientHeight
      
    },
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
  // border: 1px solid red;
  .list {
    &.mr_20 {
      margin-right: 10px;
    }

    &.mr_40 {
      margin-right: 50px;
    }
    .item {
      user-select: none;
      width: $w;
      height: $h;
      border: 1px solid #ccc;
      box-sizing: border-box;
      margin-bottom: 1px;
      margin-right: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      // &:hover {
      //   transform: scale(3);
      //   z-index:10;
      // }

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
  .tc,
  .zs {
    position: absolute;
    top: 0;
    left: 0;
    transition: 2s ease;
    z-index: 3;
  }

  .tc {
    width: 8px;
    height: 4px;
    background-color: $tc-stop;
     transform: translateX(0%) translateY(0);
    &.active {
      background-color: $tc-run;
    }
  }

  .zs {
    width: 6px;
    height: 3px;
    border: 2px solid $zs-release;
    background-color: transparent;
    transform: translateX(0) translateY(0);
    &.active {
      background-color: $zs-catch;
      border: 3px solid $zs-catch;
    }
  }


}
</style>