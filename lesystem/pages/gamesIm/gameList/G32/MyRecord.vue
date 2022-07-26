<template>
	<view class="my-record" style="padding: 0 20rpx;">
		<view style="padding: 0 20rpx;"><text class="text-xl text-bold">我的投注</text></view>
		<Record  :isShowNoDataIcon='false' :lineNum='num'/>
		<view class="flex justify-end padding-bottom-xl margin-top-sm" >
			<text class="text-xs" style="padding: 0 20rpx;color: #777;">更多 >></text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			num:3,
			titles: ['期号', '投注金额', '奖金', '操作']
		};
	},
	
	components:{
		Record:()=>import('./Record.vue')
	}
};
</script>

<style lang="scss" scoped>
.text-box {
	border: 1px solid #ccc;

	.text {
		height: 80rpx;
		line-height: 80rpx;
		border-right: 1px solid #ccc;
	}
	text:last-child {
		border-right: none;
	}
}
</style>
