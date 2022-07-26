<template>
  <div class="my-canvas-box" :style="{ height: canvasH + 'px' }">
    <canvas :id="canvasId" :width="canvasW" :height="canvasH"></canvas>
  </div>
</template>


<script>
export default {
  props: {
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
  },
  data() {
    return {
      canvasW: 120,
      canvasH: 1001,
      ctx: null,
    };
  },
  watch: {
    showArr: {
      handler: function (val) {
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
        this.startDrawBg();
      },
      deep: true,
    },
  },
  created() {
    this.canvasW = this.listHeader.length * 20;
    let len = this.numList.length || this.drawType2Num.length;
    this.canvasH = len * 20;

    
  },
  mounted() {
    this.initCanvas();
  },

  methods: {
    draw(ctx) {
      let numarr = this.numList;
      let padding = 20;
      let startX = 10,
        startY = 10;
      let radius = 8;

      let numIndexList = {};
      numarr.forEach((num, index) => {
        if (!numIndexList[Number(num)]) {
          numIndexList[Number(num)] = [];
        }
        numIndexList[Number(num)].push(index);
      });

      this.drawMc(ctx, padding, startX, startY, numIndexList);

      if (this.drawType == 2) {
        this.draw2(ctx, padding, radius, startX, startY);
        this.drawMc2(ctx, padding, startX, startY, numIndexList);
      }

      //线
      if (this.showArr.includes(0)) {
        ctx.beginPath();
        numarr.forEach((num, index) => {
          let x = startX + padding * (this.startNum == 1 ? num - 1 : num);
          let y = startY + padding * index;
          if (index == 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
            let idx = this.canvasId.split("-")[1];
            let flag = idx % 2 == 0;
            ctx.strokeStyle = flag ? "orange" : "green"; //设定描边颜色为蓝色
            ctx.stroke();
          }
        });
      }

      this.drawBall(ctx, padding, radius, startX, startY);
    },

    drawBall(ctx, padding, radius, startX, startY) {
      //bg
      let numObj = {};
      if (this.showArr.includes(1)) {
        this.listHeader.forEach((n) => {
          let len = this.numList.filter((item) => Number(item) == n).length;
          if (len == 1) {
            numObj[n] = "#00A0E9";
          } else if (len > 1 && len < 4) {
            numObj[n] = "#FF6501";
          } else {
            numObj[n] = "#e30d0d";
          }
        });
      } else {
        let idx = this.canvasId.split("-")[1];
        let flag = idx % 2 == 0;
        this.listHeader.forEach((n) => {
          if (flag) {
            numObj[n] = "#E30D0D";
          } else {
            numObj[n] = "#00A0E9";
          }
        });
      }

      //球
      this.numList.forEach((num, index) => {
        ctx.beginPath();

        ctx.fillStyle = numObj[Number(num)];

        let x = startX + padding * (this.startNum == 1 ? num - 1 : num);
        let y = startY + padding * index;
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = "12px Microsoft YaHei";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(num, x, y);
      });
    },

    //画分布的球
    draw2(ctx, padding, radius, startX, startY) {
      ctx.beginPath();
      this.drawType2Num.forEach((arr, index) => {
        for (let n_str of arr) {
          let filterArr = arr.filter((item) => item == n_str);

          if (filterArr.length > 1) {
            ctx.fillStyle = "#9a019a";
          } else {
            ctx.fillStyle = "#666";
          }

          let num = Number(n_str);

          ctx.beginPath();

          let x = startX + padding * (this.startNum == 1 ? num - 1 : num);
          let y = startY + padding * index;
          ctx.arc(x, y, radius, 0, Math.PI * 2, false);
          ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.font = "12px Microsoft YaHei";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(num, x, y);
        }
      });
    },

    drawMc2(ctx, padding, startX, startY, numIndexList) {
      ctx.beginPath();
      let startNum = 0;
      let mcList = [];
      this.listHeader.forEach((n, idx) => {
        let x = startX + idx * padding;
        let temArr = [];
        this.drawType2Num.forEach((arr, index) => {
          let y = startY + index * padding;
          ctx.fillStyle = "#666";
          ctx.font = "12px Microsoft YaHei";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          let numIndex = arr.findIndex((num) => num == n);
          startNum++;
          if (numIndex == -1) {
            temArr.push(startNum);
            ctx.fillText(startNum, x, y);
          } else {
            temArr.push(0);
            startNum = 0;
          }
        });
        mcList.push(temArr);
      });

      this.$emit("mcacData", mcList);
    },

    drawMc(ctx, padding, startX, startY, numIndexList) {
      //字 方块
      let mcList = [];
      let len = this.numList.length;
      ctx.beginPath();
      this.mcacList.forEach((obj, index) => {
        let temMcArr = [];
        let x = index * padding + startX;
        let n = this.startNum == 1 ? 1 : 0;
        let arr = numIndexList[+index + n];
        let startNum = obj.MC;
        let j = 0;
        ctx.font = "12px Microsoft YaHei";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (this.showArr.includes(2)) {
          for (let i = len; i--; ) {
            if (arr && arr.includes(i)) {
              break;
            }
            let y = i * padding;
            ctx.fillStyle = "rgba(204, 204, 238,1)";
            ctx.fillRect(x - startX + 1, y + 1, 18, 18);
          }
        }

        if (this.showArr.includes(3)) {
          for (let i = 0; i < len; i++) {
            ctx.fillStyle = "#999999";
            let y = i * padding + startY;
            if (arr && arr.includes(i)) {
              startNum = 0;
              j = +i + 1;
              continue;
            }
            let num = +startNum + i + 1 - j;
            temMcArr.push(num);
            ctx.fillText(num, x, y);
          }
        }
        mcList.push(temMcArr);
      });

      if (this.drawType == 1) {
        this.$emit("mcacData", mcList);
      }
    },

    startDrawBg() {
      let ctx = this.ctx;
      ctx.clearRect(0, 0, this.canvasW, this.canvasH);
      let padding = 20;
      let flag = this.showArr.includes(5);
      let hlen = this.canvasH / 20;

      for (let i = 1; i < hlen; i++) {
        ctx.beginPath();

        if (i % 5 == 0 && flag) {
          ctx.strokeStyle = "#ca151e";
        } else {
          ctx.strokeStyle = "#ccc";
        }
        ctx.moveTo(0, i * padding);
        ctx.lineTo(this.canvasW, i * padding);
        ctx.stroke();
        ctx.closePath();
      }

      ctx.beginPath();
      ctx.strokeStyle = "#ccc";
      let len = this.canvasW / 20;
      for (let i = 1; i < len; i++) {
        ctx.moveTo(padding * i, 0);
        ctx.lineTo(padding * i, this.canvasH);
      }
      ctx.stroke();
      ctx.closePath();

      this.draw(ctx);
    },
     initCanvas() {
      const canvas = document.getElementById(this.canvasId);
      const ctx = canvas.getContext("2d");
      ctx.translate(-0.5, -0.5);
      this.ctx = ctx;
       this.startDrawBg();
    },

    drawObliqueLine(ctx, x, y, n) {
      x = (x + 1) * 22;
      y = y < 0 ? 0 : y;
      y = y * 22;

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#00c400";

      ctx.moveTo(x - 5, y + 5);
      ctx.lineTo(x - 10, y + 20);
      if (n > 1) {
        ctx.fillStyle = "#fff";
        ctx.setFontSize(12);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n, x - 11, y + 11);
        ctx.fill();
      }
      ctx.closePath();
      ctx.stroke();
    },
  },
};
</script>

<style lang="scss" scoped>
.my-canvas-box {
  // height: 601px;
  background-color: #fff;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
}
</style>
