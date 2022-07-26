<template>
	<view v-if="isEnabled">
		<view class="cu-modal" :class="true ? 'show' : ''">
			<view class="cu-dialog">
				<view class="padding-xl flex  " style="flex-direction: column;"><text>该游戏已被禁用，请重新选择其他游戏</text></view>
				<view class="cu-bar bg-white justify-center"><button class="cu-btn bg-green margin-left" @tap="toIndexPage">确定</button></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			isEnabled: {
				type: Number,
				default: () => 0
			},
		},
		
		methods:{
			toIndexPage() {
				uni.switchTab({
					url: '/'
				});
			},
		}
	}
</script>

<style>
</style>
