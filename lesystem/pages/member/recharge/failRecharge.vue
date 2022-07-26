<template>
	<view class="page-body">
		<view class="icon">
			<text class="iconfont iconzhengque"></text>
		</view>
		<view class="message ns-text-color">支付失败:{{message}}</view>
		<button class="btn" @click="goBack">会员中心</button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				message:''
			}
		},
		methods: {
			getMessage(option){
				this.message = option.message;
			},
			goBack(){
				this.$util.redirectTo('/pages/member/index/index', {}, 'tabbar');
			},
			goBack_2(){
				uni.navigateBack({
					delta: 1
				});
			}
		},
		onLoad(option){
			this.getMessage(option);
		},
	}
</script>

<style lang="scss" scoped>
.page-body{
	height: 100vh;
	/* #ifdef H5 */
	height: calc(100vh - 44px);
	/* #endif */
	
	.icon{
		text-align: center;
		padding-top: 80rpx;
		
		.iconfont{
			font-size: 120rpx;
			color: #5ACD66;
		}
	}
	
	.message{
		text-align: center;
		margin-bottom: 80rpx;
	}
	
	.btn{
		width: 270rpx;
		margin: 0 auto;
		font-size: 28rpx;
		height: 80rpx;
		line-height: 80rpx;
		border: 2rpx solid #FF0036;
	}
	
	.btn:last-child{
		margin-top: 20rpx;
		background-color: #FF0036;
		color: white;
	}
	
}
</style>
