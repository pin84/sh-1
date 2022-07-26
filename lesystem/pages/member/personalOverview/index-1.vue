<template>
	<view class="canvas-box"><canvas class="canvas" style="width:750rpx; height: 260rpx;" :canvas-id="id"></canvas></view>
</template>

<script>
export default {
	props: {
		orderType: {
			type: Number,
			default: () => 1
		},
		numList: {
			type: Array,
			default: () => [[4], [8], [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], [4], [5, 5, 5, 5, 5, 5, 5, 5, 5, 5], [11], [9], [9], [9], [9], [9, 9, 9, 9, 9, 9, 9], [9], [9], [9], [10]]
		},
		id: {
			type: String,
			default: () => 'firstCanvas'
		}
	},
	mounted() {
		this.initCanvas();
		// this.$nextTick(function() {
		// 	let dom = document.querySelector('.canvas-box');
		// 	dom.scrollTo(dom.scrollWidth, 0);
		// });
	},

	watch: {
		numList: {
			handler: function(val) {
				this.initCanvas();
				this.$nextTick(function() {
					let dom = document.querySelector('.canvas-box');
					dom.scrollTo(dom.scrollWidth, 0);
				});
			}
		}
	},

	methods: {
		initCanvas() {
			let list = this.numList;

			let ctx = uni.createCanvasContext('firstCanvas', this);

			let padding = 22;
			let radius = 9;
			let border = 22;
			var startAngle = 0; // 开始点
			var endAngle = Math.PI * 2; // 结束点

			// let len = list.length;
			let maxLine = 6;
			let inLen = 6;
			let arrLen = this.numList.length;
			let maxLineI = 0;

			if (this.orderType === 1) {
				for (var i = 0; i < 100; i++) {
					if (list[i]) {
						inLen = list[i].length;
						if (inLen < 6) {
							inLen = 6;
						}

						if (list[i].length > maxLine) {
							maxLine = maxLine - 1;
							maxLineI = list[i].length - 1 - maxLine - 1;
							console.log(list[i].length);
						} else {
							if (!maxLineI--) {
								maxLine = 6;
							}
						}
					}

					for (var j = 0; j < inLen; j++) {
						let n, m;
						if (j > maxLine) {
							n = i + j - maxLine;
							m = j - (j - maxLine);
						} else {
							n = i;
							m = j;
						}

						var x = radius + n * padding; // x 坐标值

						var y = radius + m * padding; // y 坐标值

						ctx.beginPath();
						ctx.strokeStyle = '#ccc';
						ctx.strokeRect(x - radius, y - radius, border, border);

						let num;

						if (list[i]) {
							num = list[i][j];
						}

						if (num) {
							ctx.fillStyle = num % 2 === 0 ? '#c8262c' : '#0656cb';
						} else {
							ctx.fillStyle = '#f1f1f1';
						}

						if (num) {
							ctx.arc(x + (border / 2 - radius), y + (border / 2 - radius), radius, startAngle, endAngle, false);
							ctx.fill();

							ctx.fillStyle = '#fff';
							ctx.setFontSize(12);
							ctx.textAlign = 'center';
							ctx.textBaseline = 'middle';
							ctx.fillText(num, x + (border / 2 - radius), y + (border / 2 - radius));
						}
					}
				}
			}
			if (this.orderType === 2) {
				let arr = uni.getStorageSync('aaa-o');
				list = arr;
				let m = 0;
				for (var i = 0; i < 102; i++) {
					let n = Math.floor(i / 6);
					if (m === 6) {
						m = 0;
					}
					var x = radius + n * padding; // x 坐标值

					var y = radius + m * padding; // y 坐标值
					m++;
					ctx.beginPath();
					ctx.strokeStyle = '#ccc';
					ctx.strokeRect(x - radius, y - radius, border, border);

					let num;

					if (list[i]) {
						num = list[i];
					}

					if (num) {
						ctx.fillStyle = num % 2 === 0 ? '#c8262c' : '#0656cb';
					} else {
						ctx.fillStyle = '#f1f1f1';
					}

					if (num) {
						ctx.arc(x + (border / 2 - radius), y + (border / 2 - radius), radius, startAngle, endAngle, false);
						ctx.fill();

						ctx.fillStyle = '#fff';
						ctx.setFontSize(12);
						ctx.textAlign = 'center';
						ctx.textBaseline = 'middle';
						ctx.fillText(num, x + (border / 2 - radius), y + (border / 2 - radius));
					}
				}
				// }
			}

			ctx.draw();
		}
	}
};
</script>

<style lang="scss" scoped>
.canvas-box {
	width: 100%;
	background-color: #f1f1f1;
	overflow-x: scroll;
	.canvas {
		border-bottom: 1px solid #ccc;
	}
}
</style>
