<template>
  <canvas
    class="my-canvas"
    :id="canvasId"
    :width="canvasW"
    :height="canvasH"
  ></canvas>
</template>

<script>
export default {
  props: {
    numList: {
      type: Array,
      default: () => [],
    },
    gameType: {
      type: Number,
      default: () => 0,
    },
    btnIndex: {
      type: Number,
      default: () => 0,
    },
    orderType: {
      type: String,
      default: () => {
        return "1";
      },
    },

    canvasId: {
      type: String,
      default: () => "id-a",
    },

    drawPicType: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      padding:20,
      canvasW: 1260,
      canvasH: 121,
      dataList: [],
      heList: [],
      heCoordinate: [],
      xs: 0,
      boxStyle: {
        width: "1260px",
      },
      ctx: null, //2d对象
    };
  },
  created() {
    this.initData();
    this.countWidth();
  },
  mounted() {
    this.initCanvas();
  },

  watch: {
    numList: function (val) {
      this.initData();
      setTimeout(() => {
        this.startDrawBg();
      }, 100);
    },
  },

  methods: {
    initData() {
      if (this.numList.length === 0) {
        return;
      }
      let list;
      let text = this.numList[0][0];
      if (this.drawPicType === 0) {
        if (text === "龙" || text === "虎" || text === "和") {
          let { arrt, heArr } = this.longhuHandler(this.numList);
          list = arrt;
          this.heList = heArr;
        } else {
          list = this.numList;
        }
      } else {
        list = this.numList;
      }
      this.dataList = list;
    },
    countWidth() {
      let len = this.dataList.length;
      if (this.orderType === "2") {
        len = this.dataList.length / 6;
      }
      let w = (+len + 5) * this.padding;
      if (Math.abs(w - this.canvasW) > 80) {
        this.canvasW = w < 180 ? 180 :w
      }
    },

    longhuHandler(list) {
      // let aa = [[1],[2],[3,4,5,3,3],[4]]
      let arrt = [];
      let heArr = [];
      list.forEach((item, index) => {
        let tem = [];
        let temHe = [];
        item.forEach((i, idx) => {
          if (i !== "和") {
            tem.push(i);
          } else {
            temHe.push([index, idx]);
          }
        });
        arrt.push(tem);
        if (temHe.length !== 0) {
          heArr.push(temHe);
        }
      });

      return { arrt, heArr };
    },

    initCanvas() {
      const canvas = document.getElementById(this.canvasId);
      const ctx = canvas.getContext("2d");
      ctx.translate(-0.5, -0.5);

      this.ctx = ctx;

      this.startDrawBg();
    },

    startDrawBg() {
      // var w = theCanvas.width;
      // var h = theCanvas.height;
      this.ctx.clearRect(0, 0, 9999, 600);

      let list = this.dataList;

      let padding = 20;
      let radius = 8.5;
      let border = 20;
      var startAngle = 0; // 开始点
      var endAngle = Math.PI * 2; // 结束点

      let maxLine = 6;
      let inLen = 5;
      let maxLineI = 0;

      let listLength = +list.length + 5;
      let heNum = 0;
      let heArr = [];

      this.ctx.beginPath();
      this.ctx.strokeStyle = "#ccc";
      this.ctx.lineWidth = 1;

      for (let i = 1; i < 7; i++) {
        this.ctx.moveTo(0, i * padding);
        this.ctx.lineTo(this.canvasW, i * padding);
      }

      this.ctx.closePath();
      this.ctx.stroke();
      for (let i = 1; i < 110; i++) {
        this.ctx.moveTo(i * padding, 0);
        this.ctx.lineTo(i * padding, this.canvasH);
      }
      this.ctx.closePath();
      this.ctx.stroke();

      if (this.orderType == "1") {
        for (var i = 0; i < listLength; i++) {
          if (list[i] || list[i] == 0) {
            inLen = list[i].length;
            if (inLen < 6) {
              inLen = 6;
            }

            if (list[i].length > maxLine) {
              maxLine = maxLine - 1;
              maxLineI = list[i].length - 1 - maxLine - 1;
            } else {
              if (!maxLineI--) {
                maxLine = 6;
              }
            }
          }

          for (var j = 0; j < inLen; j++) {
            let num;
            // if (list[i]) {
            if (list[i] || list[i] == 0) {
              num = list[i][j];
            }

            let n, m;

            if (num === "和") {
              // heNum++;
            }

            if (j > maxLine) {
              n = i + j - maxLine - heNum;
              m = j - (j - maxLine);
            } else {
              n = i;
              m = j - heNum;
            }

            if (num == "和") {
              this.heCoordinate.push([n, m, heNum]);
              // continue;
            }

            let x = radius + n * padding; // x 坐标值
            let y = radius + m * padding; // y 坐标值

            if (num || num == 0) {
              this.ctxDraw(
                this.ctx,
                num,
                x,
                y,
                border,
                radius,
                startAngle,
                endAngle
              );
            }
          }

          heNum = 0;
        }
      }

      if (this.orderType == "2") {
        let temArr = [];
        let m = 0;
        let len = this.numList.length;
        for (var i = 0; i < len; i++) {
          let n = Math.floor(i / 6);
          if (m === 6) {
            m = 0;
          }
          let x = radius + n * padding; // x 坐标值

          let y = radius + m * padding; // y 坐标值
          m++;

          let num;

          if (this.numList[i]|| this.numList[i] ==0) {
            num = this.numList[i];
          }
          if (num || num == 0) {
            this.ctxDraw(
              this.ctx,
              num,
              x,
              y,
              border,
              radius,
              startAngle,
              endAngle
            );
          }
        }
      }

      setTimeout(() => {
        // 画和斜线
        if (this.drawPicType === 0) {
          this.heList.forEach((arr, index) => {
            let i = 1;
            let j = 0;
            arr.forEach((item, idx) => {
              j++;
              let count;
              if (arr[+idx + 1]) {
                count = arr[+idx + 1][1] - arr[+idx][1];
              }
              if (count === 1) {
                i++;
              } else {
                let x = item[0];
                let y = item[1] - j;
                if (y > 5) {
                  x = +x + y - 5;
                  y = 5;
                }
                this.drawObliqueLine(this.ctx, x, y, i);
                i = 1;
              }
            });
          });
        }
        // this.ctx.draw();
      }, 200);
    },

    drawObliqueLine(ctx, x, y, n) {
      x = (x + 1) * this.padding;
      y = y < 0 ? 0 : y;
      y = y * this.padding;

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#00c400";

      ctx.moveTo(x - 5, y + 5);
      ctx.lineTo(x - 10, y +this.padding-3);
      if (n > 1) {
        ctx.fillStyle = "#fff";
        // ctx.setFontSize(12);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n, x - this.padding/ 2, y + this.padding/2);
        ctx.fill();
      }
      ctx.closePath();
      ctx.stroke();
    },

    setFillColor(num) {
      let color = "#fff";
      if (num === "大" || num === "小") {
        color = num === "大" ? "#c8262c" : "#0656cb";
      } else if (num === "单" || num === "双") {
        color = num === "双" ? "#c8262c" : "#0656cb";
      } else if (num === "红" || num === "蓝") {
        color = num === "红" ? "#c8262c" : "#0656cb";
      } else if (num === "龙" || num === "虎" || num === "和") {
        if (num === "和") {
          color = "#00c400";
        }
        if (num === "龙") {
          color = "#c8262c";
        }
        if (num === "虎") {
          color = "#0656cb";
        }
      } else {
        color = num % 2 == 0 ? "#c8262c" : "#0656cb";
      }

      return color;
    },

    ctxDraw(ctx, num, x, y, border, radius, startAngle, endAngle) {
      ctx.fillStyle = this.setFillColor(num);

      if (this.drawPicType === 0) {
        ctx.beginPath();
        ctx.arc(
          x + (border / 2 - radius),
          y + (border / 2 - radius),
          radius,
          startAngle,
          endAngle,
          false
        );
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = "12px Microsoft YaHei";
        // ctx.setFontSize(Math.ceil(10));
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (this.btnIndex === 0 && this.gameType === 0) {
          ctx.fillText(
            num,
            x + (border / 2 - radius),
            y + (border / 2 - radius)
          );
        }
      }

      if (this.drawPicType === 1) {
        ctx.beginPath();
        ctx.arc(
          x + (border / 2 - radius),
          y + (border / 2 - radius),
          radius,
          startAngle,
          endAngle,
          false
        );
        ctx.fill();
        ctx.fillStyle = "#fff";
        // ctx.setFontSize(Math.ceil(10));
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(num, x + (border / 2 - radius), y + (border / 2 - radius));
      }

      if (this.drawPicType === 2) {
        ctx.beginPath();
        ctx.strokeStyle = this.setFillColor(num);
        ctx.lineWidth = 2;
        ctx.arc(
          x + (border / 2 - radius),
          y + (border / 2 - radius),
          radius - 1.5,
          startAngle,
          endAngle,
          false
        );
        ctx.stroke();
      }

      if (this.drawPicType === 3) {
        this.ctx.beginPath();
        this.ctx.arc(
          x + (border / 2 - radius),
          y + (border / 2 - radius),
          radius,
          startAngle,
          endAngle,
          false
        );
        this.ctx.fill();
      }

      if (this.drawPicType === 4) {
        if (this.btnIndex === 0 && this.gameType === 0) return;

        this.ctx.beginPath();
        this.ctx.strokeStyle = this.setFillColor(num);
        this.ctx.lineWidth = 5;
        this.ctx.moveTo(x + radius + 1, y - 5);
        this.ctx.lineTo(x - 3, y + 8);
        this.ctx.closePath();
        this.ctx.stroke();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.my-canvas {
  height: 121px;
  background-color: #fff;
  overflow: hidden;
  // border: 1px solid gray;
  // box-sizing: border-box;
}
</style>
