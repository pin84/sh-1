<template>
	<view class="box"><view class="left" :style="{width:ts + '%'}"></view></view>
</template>

<script>
export default {
	props: {
		ts: {
			type: Number,
			default: () => 0
		}
	},
};
</script>

<style lang="scss" scoped>
.box {
	width: 100%;
	height: 10rpx;
	background-color: #000;
	.left {
		width: 50%;
		height: 100%;
		background-image: linear-gradient(to right, #14d096, #0e62aa);
	}
}
</style>
