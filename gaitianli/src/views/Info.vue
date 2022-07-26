<template>
  <div class="info">
    <div>运行状态</div>
    <div>
      <span class="timing">计时:</span>
      <span>{{ d.xing_cheng_ji_shi }}</span>
    </div>
    <div>
      <span class="temperature">温度:</span>
      <span>{{ d.ping_jun_wen_du }}</span>
    </div>
    <div>
      <span class="pressure">压力:</span>
      <span>{{ d.ya_li }}</span>
    </div>
    <div>
      <span class="miles">托盘数量:</span>
      <span>{{ d.tuo_pan_shu_liang }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    d: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
  width: 125px;
  height: 80px;
  background: url("../../public/gaitianli/wenzibg.png") center no-repeat;
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px;
  box-sizing: border-box;
  font-size: 10px;
  color: #99CCFF;
  .timing{
    // color: red;
  }
}
</style>