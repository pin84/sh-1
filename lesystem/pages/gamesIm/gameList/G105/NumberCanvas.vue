<template>

	<view class="canvas-box" :style="[{height:canvasH+'rpx'},{ width: canvasW + 'rpx' }]" >
		<canvas class="canvas" style=" height: 100%;width: 100%;"  :canvas-id="id"></canvas>
	</view>
</template>

<script>
export default {
	props: {
		numList: {
			type: Array,
			default: () => []
		},
		gameType: {
			type: Number,
			default: () => 0
		},
		btnIndex: {
			type: Number,
			default: () => 0
		},
		orderType: {
			type: String,
			default: () => {
				return '1';
			}
		},

		id: {
			type: String,
			default: () => 'id-a'
		},

		drawPicType: {
			type: Number,
			default: () => 0
		}
	},
	data() {
		return {
			canvasW: 200,
			canvasH:265,
			dataList: [],
			heList: [],
			heCoordinate: [],
			xs:0
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
		numList: {
			handler: function(val) {
				this.dataList = val;
				this.initData()
				this.countWidth();
				this.initCanvas();
			}
		}
	},

	methods: {
		initData() {
			if(this.numList.length === 0){
				return 
			}
			let list;
			let text = this.numList[0][0];
			if (this.drawPicType === 0) {
				if (text === '龙' || text === '虎' || text === '和') {
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
			const res = uni.getSystemInfoSync()
			let oh = res.screenHeight
			let ow = res.screenWidth
			this.xs  = ow / 375
			let ys = oh / 667 
			
			
			let len = this.dataList.length;
			if (this.orderType === '2') {
				len = this.dataList.length / 6;
			}
			let w = ((+len + 3) * 44) ;
			if (Math.abs(w - this.canvasW) > 80) {
				this.canvasW = w 
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
					if (i !== '和') {
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
			const res = uni.getSystemInfoSync()
			let h = res.screenHeight
			let w = res.screenWidth
			let xs  = w / 375
			let ys = h / 667 
			
			
			let list = this.dataList;
			let ctx = uni.createCanvasContext(this.id, this);
			let padding = 22 * xs;
			let radius = 8.5 * xs ;
			let border = 22 * xs;
			var startAngle = 0; // 开始点
			var endAngle = Math.PI * 2; // 结束点

			let maxLine = 6;
			let inLen = 5;
			let maxLineI = 0;

			let listLength = +list.length + 5;
			let heNum = 0;
			let heArr = [];

			ctx.beginPath();
			ctx.strokeStyle = '#fff';
			// ctx.lineWidth = 1;

			for (let i = 0; i < 7; i++) {
				ctx.moveTo(0, i * padding);
				ctx.lineTo(this.canvasW*xs, i * padding);
			}

			ctx.closePath();
			ctx.stroke();
			for (let i = 0; i < 110; i++) {
				ctx.moveTo(padding + i * padding, 0);
				ctx.lineTo(padding + i * padding, this.canvasH* ys);
			}
			ctx.closePath();
			ctx.stroke();

			if (this.orderType === '1') {
				for (var i = 0; i < listLength; i++) {
					if (list[i]) {
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
						if (list[i]) {
							num = list[i][j];
						}

						let n, m;

						if (num === '和') {
							// heNum++;
						}

						if (j > maxLine) {
							n = i + j - maxLine - heNum;
							m = j - (j - maxLine);
						} else {
							n = i;
							m = j - heNum;
						}

						if (num === '和') {
							this.heCoordinate.push([n, m, heNum]);
							// continue;
						}

						let x = radius + n * padding; // x 坐标值
						let y = radius + m * padding; // y 坐标值

						if (num) {
							this.ctxDraw(ctx, num, x, y, border, radius, startAngle, endAngle);
						}
					}

					heNum = 0;
				}
			}

			if (this.orderType === '2') {
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

					if (this.numList[i]) {
						num = this.numList[i];
					}
					if (num) {
						this.ctxDraw(ctx, num, x, y, border, radius, startAngle, endAngle);
					}
				}
			}

			setTimeout(() => {
				// 画和斜线
				if (this.drawPicType === 0) {
					this.heList.forEach((arr, index) => {
						let i = 1;
						let j = 0 
						arr.forEach((item, idx) => {
							j++
							let count;
							if (arr[+idx + 1]) {
								count = arr[+idx + 1][1] - arr[+idx][1];
							}
							if (count === 1) {
								i++;
							} else {
								let x = item[0];
								let y = item[1] -j;
								if(y > 5){
									x  = +x + y -5
									y = 5
								}
								this.drawObliqueLine(ctx,x, y, i);
								i = 1;
							}
						});
						
					});
				}
				ctx.draw();
			}, 200);
		},

		drawObliqueLine(ctx, x, y, n) {
			x = (x + 1) * 22;
			y = y < 0 ? 0 : y;
			y = y * 22;

			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.strokeStyle = '#00c400';

			ctx.moveTo(x - 5, y + 5);
			ctx.lineTo(x - 10, y + 20);
			if (n > 1) {
				ctx.fillStyle = '#fff';
				ctx.setFontSize(12);
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				ctx.fillText(n, x - 11, y + 11);
				ctx.fill();
			}
			ctx.closePath();
			ctx.stroke();
		},

		setFillColor(num) {
			let color = '#fff';
			if (num === '大' || num === '小') {
				color = num === '大' ? '#c8262c' : '#0656cb';
			} else if (num === '单' || num === '双') {
				color = num === '双' ? '#c8262c' : '#0656cb';
			} else if (num === '红' || num === '蓝') {
				color = num === '红' ? '#c8262c' : '#0656cb';
			} else if (num === '龙' || num === '虎' || num === '和') {
				if (num === '和') {
					color = '#00c400';
				}
				if (num === '龙') {
					color = '#c8262c';
				}
				if (num === '虎') {
					color = '#0656cb';
				}
			} else {
				color = num % 2 === 0 ? '#c8262c' : '#0656cb';
			}

			return color;
		},

		ctxDraw(ctx, num, x, y, border, radius, startAngle, endAngle) {
			ctx.fillStyle = this.setFillColor(num);

			if (this.drawPicType === 0) {
				ctx.beginPath();
				ctx.arc(x + (border / 2 - radius), y + (border / 2 - radius), radius, startAngle, endAngle, false);
				ctx.fill();
				ctx.fillStyle = '#fff';
				ctx.setFontSize(Math.ceil(10*this.xs));
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';

				if (this.btnIndex === 0 && this.gameType === 0) {
					ctx.fillText(num, x + (border / 2 - radius), y + (border / 2 - radius));
				}
			}

			if (this.drawPicType === 1) {
				ctx.beginPath();
				ctx.arc(x + (border / 2 - radius), y + (border / 2 - radius), radius, startAngle, endAngle, false);
				ctx.fill();
				ctx.fillStyle = '#fff';
					ctx.setFontSize(Math.ceil(10*this.xs));
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';

				ctx.fillText(num, x + (border / 2 - radius), y + (border / 2 - radius));
				// if (this.gameType === 1) {
				// } else {
				// 	if (this.btnIndex === 0) {
				// 		ctx.fillText(num, x + (border / 2 - radius), y + (border / 2 - radius));
				// 	}
				// 	if (this.btnIndex === 1 || this.btnIndex === 3) {
				// 		num % 2 === 0 ? (num = '双') : (num = '单');
				// 		ctx.fillText(num, x + (border / 2 - radius), y + (border / 2 - radius));
				// 	}
				// 	if (this.btnIndex === 2 || this.btnIndex === 4) {
				// 		num > 5 ? (num = '大') : (num = '小');
				// 		ctx.fillText(num, x + (border / 2 - radius), y + (border / 2 - radius));
				// 	}
				// }
			}

			if (this.drawPicType === 2) {
				// if (this.btnIndex === 0 && this.gameType === 0) return;
				ctx.beginPath();
				ctx.strokeStyle = this.setFillColor(num);
				ctx.lineWidth = 2;
				ctx.arc(x + (border / 2 - radius), y + (border / 2 - radius), radius - 1.5, startAngle, endAngle, false);
				ctx.stroke();
			}

			if (this.drawPicType === 3) {
				// if (this.btnIndex === 0 && this.gameType === 0) return;
				ctx.beginPath();
				ctx.arc(x + (border / 2 - radius), y + (border / 2 - radius), radius, startAngle, endAngle, false);
				ctx.fill();
			}

			if (this.drawPicType === 4) {
				if (this.btnIndex === 0 && this.gameType === 0) return;

				ctx.beginPath();
				ctx.strokeStyle = this.setFillColor(num);
				ctx.lineWidth = 5;
				ctx.moveTo(x + radius + 1, y - 5);
				ctx.lineTo(x - 3, y + 8);
				ctx.closePath();
				ctx.stroke();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.canvas-box {
	width: 100%;
	background-color: #317455;
	.canvas {
		border-bottom: 1px solid #ccc;
	}
}
</style>
