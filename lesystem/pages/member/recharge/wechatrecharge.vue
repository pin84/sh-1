<template>
	<view class="page-body">
		<view class="content">
			<view style="border: 2px solid rgb(220, 219, 219);padding:10rpx; border-radius:30rpx;width: 650rpx;background-color: white; margin: 30rpx 0;">
			<view class="item">
				<view class="v-left">
				<text class="iconfont iconweixin" style="color: #53B12E; font-size: 100rpx; padding-right: 20rpx;"></text>
				</view>
				<view class="v-right">
				<text class="title">微信银行卡转账</text>
				</view>
			</view>
			<view class="item">
				<text class="pricetitle">￥{{amount}}</text>
			</view>
			
			<view class="item-bankinfo">
				<view><text class="title">转账金额：</text></view>
				<view><text class="title">{{amount}}</text></view>
			    <view><button @click="copy(amount)"> <text style="color: #1AAD19;">复制</text></button></view>
	
			</view>
			<view class="item-bankinfo">
				<view><text class="title">银行卡姓名：</text></view>
				<view><text class="title">{{cardname}}</text></view>
				<view style="color: #1AAD19;"><button @click="copy(cardname)"><text style="color: #1AAD19;">复制</text></button></view>
	
			</view>
			<view class="item-bankinfo">
				<view><text class="title">银行卡号：</text></view>
				<view><text class="title">{{cardnumber}}</text></view>
				<view style="color: #1AAD19;"><button @click="copy(cardnumber)"><text style="color: #1AAD19;">复制</text></button></view>
		
			</view>
			<view class="item-bankinfo" style="border-bottom: 1px solid #F1F1F1;">
				<view><text class="title">开户银行：</text></view>
				<view><text class="title">{{bank}}</text></view>
				<view> </view>
			</view>
			<view class="item">
				<view style="width: 700rpx;">
				<text  style="color: #D1372C; font-size: 30rpx;">
					转账步骤：<br/>
				1. 打开微信 -> 点击右上角 "+" 号->收付款->转账到银行卡 <br/>
				2. 务必填写金额{{amount}} 元 , 否则不到账 <br/>
				3. 微信提示两小时到账 , 实际2分钟内到账 <br/>
					
				</text>
				</view>
				
			</view>
			
			<view class="item">
				<text  style="color: #B2B2B2; font-size: 30rpx;">
			      支付成功后列账 , 请放心支付 
			</text>
			</view>
			
			<view class="item" style="font-size: 38rpx;">
				<text class="title">有效时间：</text>
				<text style="color: #C40000;font-weight: bold;">{{remaining}}</text>
			</view>
			<view class="item">
				<text class="title">订单号：</text>
				<text class="title">{{orderId }}</text>
			</view>
			
			
			
			
			
			</view>
			
			
			
		</view>
	</view>
</template>

<script>
	export default {
		   
		data() {
			
			return {
				amount:0,
				actionTime:0,
				orderId:'',
				cardname:'',
				cardnumber:'',
                bank:'',
				remaining: '', //显示剩余时间
				remainingd: ''  //数据返回时间秒


			}
		
		},
		onLoad(options){

		

					var _self = this;
			let data = JSON.parse(decodeURIComponent(options.param)); 

			// 获取 传过来的商品的 goodsId
			this.amount = data.amount || 0;
			this.actionTime = data.actionTime || 0;
			this.orderId = data.orderId || '';			
			this.cardname = data.cardname || '';
			this.cardnumber = data.cardnumber || '';
			this.bank = data.bank || '';
			
			this.remainingd = 300;
			this.jishiqi();
		    
            const timer0 = setInterval(function() {
										_self.jishiqi();
									}, 1000);
			setTimeout(() => {
							clearInterval(timer0)

			}, 301000);
			
			this.$once('hook:beforeDestroy', () => {            
			    clearInterval(timer0);                                    
			})

			//this.alipayqrcodeurl = data.url || '';
			//console.log(data.url);
			},
		methods: {
			copy(value){
				this.$util.multiPlatformCopy(value);
			},
			//倒计时计时器
						jishiqi() {

							var dj = this.remainingd;
							if (dj <= 0) {
								this.remaining = "已过期";
							} else {
								var ddf = this.djs(dj); //格式化过后的时间
								this.remaining = ddf;
								//当前时间减去时间
								dj = dj - 1;
								this.remainingd = dj;
							}
			 
						},
						//得到的秒换算成时分秒
						djs(ms) { 
							var m = parseInt((ms % (60 * 60)) / 60);
							var s = (ms % (60 * 60)) % 60;
							return  m + ":" + s;
						},
	
			
			
		}
	}
</script>


<style lang="scss" scoped>
.page-body {
	min-height: 100vh;
	background-color: #058e04;
	/* #ifdef H5 */
	min-height: calc(100vh - 44px);
	/* #endif */
	.content {
				color: #aaa;
				margin-bottom: 20rpx;
				
				display: flex;
				align-items: center;
				justify-content: center;
				.pricetitle{font-size:58rpx;align-items: center;font-weight: bold;}
				.banner-img{width: 600rpx;}
				.item {
					border-bottom: 2rpx solid #eee;
					display: flex;
					align-items: center;
					justify-content: center;
					padding:10rpx 0rpx;
					
					
				}
				.item-bankinfo{
					justify-content: space-between;
					display: flex;
					padding:7rpx 0rpx;
					line-height: 50rpx;
				}
			}
	
	}
	
</style>
