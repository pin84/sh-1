<template>
	<view class="wrapper flex  flex-direction   align-center justify-center">
		<view class="setting ">
			<block v-for="(text, index) in textList" :key="index">
				<view @click="cleickEvent(text)" class="text-box text-xs" style="padding: 5rpx 0;">{{ text }}</view>
			</block>
		</view>
		<view>
			
		<view class="triangle"></view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		textList: {
			type: Array,
			default: () => ['走势图', '近期开奖', '玩法说明', '官方网址']
		}
	},
	methods: {
		cleickEvent(text) {
			this.$emit('clickEvent',text)
		}
	}
};
</script>

<style lang="scss" scoped>
.wrapper {
	position: relative;
	border-radius: 5rpx;
	
	transform: translateY(10rpx);
	background-color: transparent;
	
	.setting {
		width: 100%;
		background-color: #fff;
		padding: 0 10rpx;
		text-align: center;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
		.text-box {
			border-bottom: 1px solid #efefef;
			color: #434955;
		}

		.text-box:last-child {
			border-bottom: none;
		}
	}
	.triangle {
		width: 0;
		height: 0;
		border-left: 10rpx solid transparent;
		border-right: 10rpx solid transparent;
		border-top: 15rpx solid #fff;
	}
}
</style>
