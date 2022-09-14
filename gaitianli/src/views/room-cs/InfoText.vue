<template>
  <div class="info-text" :class="{'stop':!state}">
     {{state ? '运行':'停止'}}
  </div>
</template>

<script>
export default {
  props:{
    state:{
      type:Number,
      default:()=>0
    }
  }
}
</script>
<style lang="scss" scoped>
  .info-text{
    color: green;
    font-size: 20px;
    &.stop{
      color: red;
    }
  }
</style>