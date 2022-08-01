<template>
  <div
    class="box"
    :class="[{'middle':itemSize == 'middle'},{'white-bg':onlyTP},{'hide':!isHas}]"
  >
    <div class="com-box h-line-box">
      <div
        class="line"
        v-for="(n,idx) in 3"
        :key="idx"
      ></div>
    </div>
    <div class="com-box v-line-box">
      <div
        class="line line-v"
        v-for="(n,idx) in 3"
        :key="idx"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onlyTP:{
      type:Number,
      default:()=>0
    },
    isHas: {
      type: Number,
      default: 1,
    },
    itemSize: {
      type: String,
      default: "small", //middle
    },
  },
  data() {
    return {};
  },

  watch: {},
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
$w: 40px;
@mixin wh($w, $h: $w) {
  width: $w;
  height: $h;
}
.box {
  @include wh($w);
  position: relative;
  user-select: none;
  box-sizing: border-box;
  background-color: $case-background;
  &.white-bg{
    background-color: $case-background-1;
    border: $case-border-1;
  }
  &.hide{
    opacity:0;
  }
  .line {
    @include wh(100%, 1px);
    background-color: #fff;
  }
  .line-v {
    @include wh(1px, 100%);
  }

  .com-box {
    position: absolute;
    @include wh(100%);
    top: 0;
    left: 0;
    display: flex;
  }
  .h-line-box {
    flex-direction: column;
    justify-content: space-around;
  }

  .v-line-box {
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>