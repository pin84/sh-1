<template>
	<view class="canvas-img-code">
		<image :style="{ width: width + 'px', height: height + 'px' }" :src="canvasImg" @click="refresh()"></image>
		<canvas :style="{ width: width + 'px', height: height + 'px' }" id="imgcanvas" canvas-id="imgcanvas" @error="canvasIdErrorCallback" @click="refresh()"></canvas>
	</view>
</template>

<script>
export default {
	name: 'imgcode',
	props: ['width', 'height'],
	data() {
		return {
			currPage: '',
			canvasImg: ''
		};
	},
	mounted: function() {
		var _self = this;
		setTimeout(function() {
			_self.init();
		}, 200);

		var pages = getCurrentPages();
		_self.currPage = pages[pages.length - 1].route;
	},
	methods: {
		init: function() {
			var context = uni.createCanvasContext('imgcanvas', this),
				w = this.width,
				h = this.height;
			context.setFillStyle('white');
			context.setLineWidth(5);
			context.fillRect(0, 0, w, h);
			var pool = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
				str = '';
			for (var i = 0; i < 4; i++) {
				var c = pool[this.rn(0, pool.length - 1)]; //随机的字
				var deg = this.rn(-30, 30); //字体的旋转角度
				context.setFontSize(14);
				context.setTextBaseline('top');
				context.setFillStyle(this.rc(80, 150));
				context.save();
				context.translate(20 * i + 15, parseInt(h / 1.2));
				context.rotate((deg * Math.PI) / 180);
				context.fillText(c, -15 + 5, -15);
				context.restore();
				str += c;
			}
			uni.setStorage({
				key: 'imgcode/' + this.currPage,
				data: str
			});
			for (var i = 0; i < 40; i++) {
				context.beginPath();
				context.setFillStyle(this.rc(150, 200));
				context.arc(this.rn(0, w), this.rn(0, h), 1, 0, 2 * Math.PI);
				context.closePath();
				context.fill();
			}
			context.draw(false, () => {
				// 延迟保存图片，解决生成图片错位bug。
				setTimeout(() => {
					this.canvasToTempImage();
				}, 100);
			});
		},
		canvasToTempImage: function() {
			uni.canvasToTempFilePath(
				{
					canvasId: 'imgcanvas',
					success: res => {
						let tempFilePath = res.tempFilePath;
						this.canvasImg = tempFilePath;
					}
				},
				this
			);
		},
		rc: function(min, max) {
			var r = this.rn(min, max);
			var g = this.rn(min, max);
			var b = this.rn(min, max);
			return 'rgb(' + r + ',' + g + ',' + b + ')';
		},
		rn: function(max, min) {
			return parseInt(Math.random() * (max - min)) + min;
		},
		refresh: function() {
			this.init();
		},
		canvasIdErrorCallback: function(e) {
			console.error(e.detail.errMsg);
		},
		checkCode(code) {
			var imgcode = uni.getStorageSync('imgcode/' + this.currPage);
			
			return imgcode == code;
		}
	}
};
</script>

<style>
.canvas-img-code {
	display: inline-block;
}
.canvas-img-code canvas {
	position: fixed;
	top: 9999999rpx;
}
</style>
