<template>
  <view class="my-canvas-box" :style="{ height: canvasH + 'px' }">
    <canvas
      :id="canvasId"
      :canvas-id="canvasId"
      :style="{ height: canvasH + 'px', width: canvasW + 'px' }"
    ></canvas>
  </view>
</template>


<script>
export default {
  props: {
    sumData: {
      type: Array,
      default: () => [],
    },

    seriesList: {
      type: Array,
      default: () => [],
    },
    listHeader: {
      type: Array,
      default: () => [],
    },
    startNum: {
      type: Number,
      default: () => 0,
    },
    drawType: {
      type: Number,
      default: () => 1,
    },
    canvasId: {
      type: String,
      default: () => "cid",
    },
    numList: {
      type: Array,
      default: () => [],
    },
    mcacList: {
      type: Array,
      default: () => [],
    },
    drawType2Num: {
      type: Array,
      default: () => [],
    },
    showArr: {
      type: Array,
      default: () => [1],
    },
    showType: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      canvasW: null,
      canvasH: null,
      ctx: null,
      zx: 1,
      yl: 1,
      tj: 1,
      ylfc: 1,
    };
  },
  watch: {
    numList: {
      handler: function (val) {
        // console.log(val);
        this.initCanvas();
      },
      deep: true,
    },

    showType: {
      handler: function (val) {
        let { zx, yl, tj, ylfc } = this.showType;
        this.zx = zx;
        this.yl = yl;
        this.tj = tj;
        this.ylfc = ylfc;
        this.startDrawBg();
      },
      deep: true,
    },
  },
  created() {
    this.padding = 26;
    this.radius = 10;

    const res = uni.getSystemInfoSync();
    let h = res.screenHeight;
    let w = res.screenWidth;
    this.canvasW = w;
    let hl = this.seriesList.length;
    this.canvasH = hl * this.padding;

    this.startX = this.canvasW - this.padding * 10;
  },
  mounted() {
    this.initCanvas();
  },

  methods: {
    drawBall() {
      let ctx = this.ctx;
      ctx.beginPath();
      let p = this.padding / 2;
      ctx.fillStyle = "#CC99CC";

      let deviationNum = this.listHeader[0] == 0 ? 0 : 1;
      let len = this.numList.length;
      for (let i = 0; i < len; i++) {
        let j = this.numList[i];
        let x = this.startX + this.padding * (j - deviationNum) + p; // -1 是因为canvas的坐标从0开始
        let y = this.padding * (i + 1) + p; // +1 是因为title要占一行
        ctx.arc(x, y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
      }
    },

    drawNum() {
      let ctx = this.ctx;
      let len = this.numList.length;
      ctx.beginPath();
      ctx.font = "12px Microsoft YaHei";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillStyle = "#fff";
      let deviationNum = this.listHeader[0] == 0 ? 0 : 1;
      let p = this.padding / 2;
      for (let i = 0; i < len; i++) {
        let j = this.numList[i];
        let x = this.startX + this.padding * (j - deviationNum) + p; // -1 是因为canvas的坐标从0开始
        let y = this.padding * (i + 1) + p; // +1 是因为title要占一行

        ctx.fillText(j, x, y);
      }

      ctx.closePath();
    },

    drawSerieas() {
      let ctx = this.ctx;
      ctx.beginPath();
      ctx.fillStyle = "#222";
      ctx.font = "14px Microsoft YaHei";
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      this.seriesList.forEach((str, i) => {
        ctx.fillText(str, 20, i * this.padding + 16);
      });
      ctx.closePath();
    },

    drawheader(ctx) {
      ctx.beginPath();
      ctx.font = "12px Microsoft YaHei";
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillStyle = "#000";
      let p = this.padding / 2;
      this.listHeader.forEach((n, i) => {
        let x = this.startX + this.padding * i + p;
        ctx.fillText(n, x, p);
      });
      ctx.closePath();
    },

    drawBlock(ctx) {
      ctx.beginPath();
      let len = this.numList.length;
      this.listHeader.forEach((n, idx) => {
        let x = this.startX + idx * this.padding;
        for (let i = len; i--; ) {
          let y = (i + 1) * this.padding;
          if (this.numList[i] == n) break;
          ctx.fillStyle = "#CCFFFF";
          if (this.ylfc == 1) {
            ctx.fillRect(x, y, this.padding, this.padding);
          }
        }
      });
      ctx.closePath();
    },

    drawLine(ctx) {
      let len = this.numList.length;
      ctx.beginPath();
      let p = this.padding / 2;
      let deviationNum = this.listHeader[0] == 0 ? 0 : 1;
      for (let i = 0; i < len; i++) {
        let j = this.numList[i];
        let x = this.startX + this.padding * (j - deviationNum) + p; // -1 是因为canvas的坐标从0开始
        let y = this.padding * (i + 1) + p; // +1 是因为title要占一行
        if (i == 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = true ? "orange" : "green"; //设定描边颜色为蓝色
      ctx.stroke();
      ctx.closePath();
    },

    drawMc(ctx) {
      ctx.beginPath();
      let len = this.numList.length;
      ctx.fillStyle = "#666666";
      let p = this.padding / 2;
      let mcList = [];
      this.listHeader.forEach((n, idx) => {
        let tem = [];
        let j = this.mcacList[idx];
        let x = this.startX + idx * this.padding + p;
        for (let i = 0; i < len; i++) {
          let y = (i + 1) * this.padding + p;
          j++;
          if (this.numList[i] == n) {
            j = 0;
            continue;
          }
          tem.push(j);
          if (this.yl == 1) {
            ctx.fillText(j, x, y);
          }
        }
        mcList.push(tem);
      });
      ctx.closePath();
      this.$emit("mcList", mcList);
      // console.log('--',mcList);
    },

    drawType2(ctx) {
      let p = this.padding / 2;
      // console.log(this.drawType2Num);
      ctx.beginPath();
      this.drawType2Num.forEach((arr, index) => {
        let y = (index + 1) * this.padding + p;
        let i = 0;
        for (let n of this.listHeader) {
          let x = this.padding * i + this.startX + p;
          let temArr = arr.filter((item) => item == n);
          let len = temArr.length;
          if (len == 0) {
            i++;
            continue;
          }
          if (len == 1) {
            ctx.fillStyle = "gray";
          } else {
            ctx.fillStyle = "#CC6699";
          }
          ctx.arc(x, y, this.radius, 0, Math.PI * 2, false);
          ctx.fill();
          ctx.closePath();

          ctx.beginPath();
          ctx.fillStyle = "#fff";
          ctx.fillText(n, x, y);
          i++;
        }
      });

      ctx.closePath();
    },

    drawMc2(ctx) {
      ctx.beginPath();
      let len = this.drawType2Num.length;
      let p = this.padding / 2;
      ctx.fillStyle = "#222";
      let mcList = [];
      this.listHeader.forEach((n, idx) => {
        let tem = [];
        let j = 0;
        let x = this.startX + idx * this.padding + p;
        for (let i = 0; i < len; i++) {
          let y = this.padding * (i + 1) + p;
          let index = this.drawType2Num[i].findIndex((item) => item == n);
          if (index != -1) {
            j = 0;
            tem.push(j);
            continue;
          }
          j++;
          if (this.yl == 1) {
            ctx.fillText(j, x, y);
          }
          tem.push(j);
        }
        mcList.push(tem);
      });

      // console.log(mcList);

      ctx.closePath();
      this.$emit("mcList", mcList);
    },

    drawSumData(ctx) {
      ctx.beginPath();
      let colorObj = {
        0: "#FF33CC",
        1: "#663333",
        2: "#336699",
        3: "#000",
      };

      let p = this.padding / 2;
      let len = this.numList.length.length || this.drawType2Num.length;
      let startY = (len + 1) * this.padding;
      this.sumData.forEach((arr, idx) => {
        ctx.fillStyle = colorObj[idx];
        let y = startY + idx * this.padding + p;
        arr.forEach((n, index) => {
          let x = this.startX + index * this.padding + p;
          ctx.fillText(n, x, y);
        });
      });

      ctx.closePath();
    },

    async startDrawBg() {
      let ctx = this.ctx;
      ctx.clearRect(0, 0, this.canvasW, this.canvasH);

      let hl = this.canvasH / this.padding;
      ctx.beginPath();
      ctx.fillStyle = "#eee";
      for (let i = 0; i < hl; i++) {
        if (i % 2 == 0) continue;
        ctx.fillRect(0, i * this.padding, this.canvasW, this.padding);
      }
      ctx.stroke();
      ctx.closePath();

      let wl = (this.canvasW - this.startX) / this.padding;
      ctx.beginPath();
      ctx.strokeStyle = "#ccc";
      for (let i = 0; i < wl; i++) {
        ctx.moveTo(i * this.padding + this.startX, 0);
        ctx.lineTo(i * this.padding + this.startX, this.canvasH);
      }
      ctx.stroke();
      ctx.closePath();

      let { zx, yl, tj, ylfc } = this.showType;
      // console.log(zx, yl, tj, ylfc);

      this.drawheader(this.ctx);
      this.drawSerieas();
      this.drawBlock(this.ctx);
      if (zx != 2) {
        this.drawLine(this.ctx);
      }
      this.drawBall();
      this.drawNum();

      if (this.numList.length == 0) {
        this.drawType2(this.ctx);
        this.drawMc2(this.ctx);
      } else {
        this.drawMc(this.ctx);
      }

      setTimeout(() => {
        this.drawSumData(this.ctx);
        ctx.draw();
      }, 100);
    },
    initCanvas() {
      // const canvas = document.getElementById(this.canvasId);
      // const ctx = canvas.getContext("2d");
      const ctx = uni.createCanvasContext(this.canvasId, this);
      ctx.translate(0.5, 0.5);
      this.ctx = ctx;
      this.startDrawBg();
    },
  },
};
</script>

<style lang="scss" scoped>
.my-canvas-box {
  background-color: #fff;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
