<template>
<div id="canvas-box">

  <canvas
    class="my-canvas"
    id="my-canvas"
    :width="w"
    :height="h"
  />
</div>
</template>

<script>
export default {
  props:{
    w:{
      type:Number,
      default:()=>0
    },
    h:{
      type:Number,
      default:()=>0
    },
    ts:{
      type:Number,
      default:()=>0
    },
  },
  data() {
    return {};
  },

  watch:{
    ts:function(val){
     
    }
  },

  mounted() {
   this.initCanvas();
  },

  methods: {
    initCanvas() {
      const canvas = document.getElementById("my-canvas");
      const ctx = canvas.getContext("2d");

      //获取屏幕的宽度
      var clientWidth = document.documentElement.clientWidth;
      var clientHeight = document.documentElement.clientHeight;
      var scrollHeight = document.documentElement.scrollHeight;
      var scrollHeight = document.documentElement.scrollHeight;
      console.log(clientHeight,scrollHeight);
     
      

      this.ctx = ctx;

       this.startDrawBg();
    },

    startDrawBg() {
      let width = 10;
      let height = 10;
    console.log('-----');
      this.ctx.strokeStyle = "red";
        this.ctx.lineWidth = 1;

      this.ctx.strokeRect(15, 15, width, height);
    },
  },
};
</script>

<style lang="scss" scoped>
#canvas-box{
  width: 100%;
  height: 100%;
  border: 1px solid red;
  .my-canvas {
    border: 3px solid red;
    box-sizing: border-box;
  }
}
</style>