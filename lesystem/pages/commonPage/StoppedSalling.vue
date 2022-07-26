<template>
	<view class="stopped-salling"><image src="../../static/images/common/stoppedSelling.png" mode="aspectFit"></image></view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.stopped-salling {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(255, 255, 255, 0.6);
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 70rpx;
	image {
		width: 100%;
		height: 100%;
	}
}
</style>
