<template>
	<view class="changlong" v-if="false">
		<view class="item" v-for="(item,idx) in 2" :key='idx'>
			<text>三军</text>
			<text>三军</text>
			<text>三军</text>
		</view>
	</view>
</template>

<script>
	export default{
		
	}
</script>

<style lang="scss" scoped>
	.changlong{
		border-top: 1px solid #c4e3cf;
		.item{
			color: #c4e3cf;
			display: flex;
			border-bottom: 1px solid #c4e3cf;
			padding: 8rpx 0;
			text{
				width: 33%;
				text-align: center;
			}
		}
	}
</style>
