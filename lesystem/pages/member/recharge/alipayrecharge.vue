<template>
	<view class="page-body">
		<view  style="display: flex;flex-direction: row; justify-content: center; ">
			<view class="v-left">
			<text class="iconfont iconzhifubao" style="color: rgb(21, 151, 237); font-size:80rpx; padding-right:10rpx;"></text>
			</view>
			<view style="height: 150rpx; line-height: 150rpx;font-size:40rpx;"> 
			<text class="title">支付宝</text>
			</view>
		</view>
		<view class="content" v-if="amount>0" style="border:1px dashed rgb(220, 219, 219);padding:20rpx; border-radius:20rpx;width: 650rpx;background-color: white; margin:10rpx 0;">
			
			
			<view class="item">
				<text class="pricetitle" >￥{{amount}}</text>
			</view>
			<view class="item">
				<img  class="banner-img"  :src="$util.img(alipayqrcodeurl)" mode="widthFix"></img>
			</view>
			<view class="item">
				<text class="title">交易单号：</text>
				<text class="title">{{orderId}}</text>
			</view>
			<view class="item">
				<text class="title">交易时间：</text>
				<text class="title">{{actionTime}}</text>
			</view>
			<view class="item">
				<view class="v-left">
				<text class="iconfont iconzhifubao" style="color: rgb(21, 151, 237); font-size: 130rpx; padding-right: 20rpx;"></text>
				</view>
				<view class="v-right"> 
				<text class="title">请用支付宝扫一扫 <br/>扫码支付宝完成支付</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			
			return {
				needTransfer:0,
				amount:0,
				actionTime:0,
				orderId:'',
				alipayqrcodeurl:''
			}
		
		},
		onLoad(options){

			let data = JSON.parse(decodeURIComponent(options.param)); 

			// 获取 传过来的商品的 goodsId
			this.amount = data.amount || 0;
			this.actionTime = data.actionTime || 0;
			this.orderId = data.orderId || '';
			this.needTransfer = data.needTransfer||0;
			if(data.needTransfer != 1){
				this.alipayqrcodeurl = data.url || '';
			}else{
				let tempUrl = data.url;
				this.alipayqrcodeurl = tempUrl.replace(/&/g, "%26");
			}
			

			},
		methods: {
			
		}
	}
</script>


<style lang="scss" scoped>

.page-body {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	min-height: 100vh;
	background-color: #F1F1F1;
	/* #ifdef H5 */
	min-height: calc(100vh - 44px);
	/* #endif */
	.content {
				color: #aaa;
				margin-bottom: 40rpx;
				background-color: white;
				.pricetitle{font-size: 52rpx;align-items: center; font-weight: bold;}
				.banner-img{width: 600rpx;}
				.item {
					border-bottom: 2rpx solid #eee;
					display: flex;
					align-items: center;
					justify-content: center;
					padding:20rpx 0rpx;
					
					
				}
			}
	
	}
	
</style>
