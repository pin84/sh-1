<template>
	<view class="diy-title" :style="{ padding: value.padding + 'rpx 10rpx', background: background }" @click="redirectTo(value.href)">
		<view class="title ns-font-size-lg" :style="{ color: value.text_color, fontWeight: value['whether_bold'] == 2 ? 'normal' : 'bold', textAlign: textAlign }">
			<text class="title-content">{{ value.title_name }}</text>
		</view>
		<view class="sub-title ns-font-size-base" :style="{ color: value.text_color, fontWeight: value['whether_bold'] == 1 ? 'normal' : 'bold', textAlign: textAlign }">{{ value.subtitle_name }}</view>
	</view>
</template>

<script>
// 标题
export default {
	name: 'diy-title',
	props: {
		value: {
			type: Object,
			default: () => {
				return { padding: 0, bg_color: '#fff', bg_img: '' };
			}
		}
	},
	data() {
		return {
			background: '',
			textAlign: 'left'
		};
	},
	created() {
		this.value.padding *= 2; //转行比率
		this.background = `url('${this.value.bg_img}') 50% / 100% no-repeat ${this.value.bg_color}`;
		if (this.value['text_align'] == 1) {
			this.textAlign = 'left';
		} else if (this.value['text_align'] == 2) {
			this.textAlign = 'center';
		} else {
			this.textAlign = 'right';
		}
	},
	methods: {
		redirectTo(link) {
			this.$emit('redirectTo', link);
		}
	}
};
</script>

<style>
.diy-title .title-content {
	position: relative;
	display: inline-block;
	padding: 0 40rpx;
}
.diy-title .title-content:before{
	content: "";
	position: absolute;
	top: 8rpx;
	right: -12rpx;
	width: 30rpx;
	height: 24rpx;
	background: url(../../static/images/index/title_right.png) no-repeat center/ contain;
}
.diy-title .title-content:after{
	content: "";
	position: absolute;
	top: 8rpx;
	left: -12rpx;
	width: 30rpx;
	height: 24rpx;
	background: url(../../static/images/index/title_left.png) no-repeat center/ contain;
}
</style>
