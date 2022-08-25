<template>
    <div class="vale">
      <div class="half-circle"></div>
      <div class="line"></div>
      <div class="ract"></div>
    </div>
</template>

<script>

export default {
  
}
</script>

<style lang="scss" scoped>
  .vale {
    width: $fmw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: $fmw;
    .half-circle {
      background-color: $bg-famen;
      width: 100%;
      height: $fmw / 2;
      border-radius: $fmw $fmw 0 0;
    }
    .line {
      height: 6px;
      width: 80px;
      background-color: $bg-famen;
      transform: rotate(90deg);
    }
    .ract {
      width: 0;
      height: 0;
      border-top: $fmw / 5 solid;
      border-bottom: $fmw / 5 solid;
      border-left: $fmw / 2  solid;
      border-right: $fmw / 2  solid;
      border-color: transparent $bg-famen transparent $bg-famen;
      margin-top: 12px;
    }
  }
</style>