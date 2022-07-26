<template>
  <div
    class="conveyor"
    :class="statu == 1 ? 'border-green' : statu == 2 ? 'border-yellow' : '' "
  >
    <div
      class="line"
      :class="statu == 1 ? 'border-green' : statu == 2 ? 'border-yellow' : '' "
      v-for="(item,idx) in lineNum"
      :key="idx"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    statu: {
      type: Number,
      default: 0,
    },
    lineNum: {
      type: Number,
      default: 16,
    },
  },

  created(){
    // console.log(this.statu);
  }
};
</script>

<style lang="scss" scoped>
.conveyor {
  width: 13px;
  border: 1px solid $border-convey-stop;
  border-top: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-color: $border-convey-stop;
  box-sizing: border-box;
  margin-bottom: 2px;
  &.border-green {
    border-color: $border-convey-run;
  }
  &.border-yellow {
    border-color: $border-convey-reverse;
  }
  .line {
    width: 100%;
    height: 3px;
    margin-bottom: 2px;
    background-color: $border-convey-stop;
    &.border-green {
      background-color: $border-convey-run;
    }
    &.border-yellow {
      background-color: $border-convey-reverse;
    }
  }
}
</style>