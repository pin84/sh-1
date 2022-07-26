<template>
	<view class="page-body">
		<view class="content">
			<view class="head">
				<view class="">
					本次充值:
					<text class="ns-text-color">{{amount}}</text>元
				</view>
				<view class="">
					当前余额:
					<text class="ns-text-color">{{coin}}</text>元
				</view>
			</view>
			<view class="item" :style="{backgroundColor: bgColor}">
				<text class="left iconfont" :class="'icon' + short_name"></text>
				<view class="right">
					<view class="ns-font-size-lg">{{name}}</view>
					<view class="">{{branch}}</view>
					<view class="">
						<text>{{holders}}</text>
						<button @click="copy(holders)">复制</button>
					</view>
					<view class="">
						<text>{{card_no}}</text>
						<button @click="copy(card_no)">复制</button>
					</view>
				</view>
			</view>
			<view class="infoItem">
				<text>订单编号:</text>
				<text>{{recharge_id}}</text>
				<button @click="copy(recharge_id)">复制</button>
			</view>
			<view class="infoItem">
				<text>开户姓名:</text>
				<text>{{real_name}}</text>
			</view>
			<view class="infoItem">
				<text>转账类型:</text>
				<text>{{remittance_way}}</text>
			</view>
			<view class="goBack">
				<button @click="goBack">返回会员中心</button>
			</view>
		</view>
	</view>
</template>

<script>
	import http from 'common/js/http.js';
	export default {
		data() {
			return {
				id: '',
				amount: '',
				coin: '',
				bgColor: '',
				short_name: '',
				name: '',
				branch: '',
				holders: '',
				card_no: '',
				recharge_id: '',
				real_name: '',
				remittance_way: ''
			}
		},
		methods: {
			copy(value){
				this.$util.multiPlatformCopy(value);
			},
			goBack(){
				this.$util.redirectTo('/pages/member/index/index', {}, 'tabbar');
			},
			getOfflinePaymentInfo(option){
				this.id = option.id;
				this.sendRequest({
					url: 'System.Recharge.getOfflinePaymentInfo',
					data: {
						id: this.id
					},
					success: res => {
						// console.log(res)
						if(res.code == 0){
							this.amount = res.data.amount;
							this.recharge_id = res.data.recharge_id;
							this.real_name = res.data.real_name;
							this.remittance_way = res.data.remittance_way;
							this.short_name = res.data.short_name;
							this.name = res.data.name;
							this.branch = res.data.branch;
							this.holders = res.data.holders;
							this.card_no = res.data.card_no;
							if(this.short_name == "ZGGSYX"){
								this.bgColor = "#E03B5F";
							}
							else if(this.short_name == "ZGJSYX"){
								this.bgColor = "#2E4799";
							}
						}
					}
				})
			},
			memberInfo(){
				this.sendRequest({
					url: 'System.Member.memberInfo',
					data: {},
					success: res => {
						// console.log(res)
						if(res.code == 0){
							this.coin = res.data.coin;
						}
					}
				})
			}
		},
		onLoad(option) {
			this.getOfflinePaymentInfo(option);
			this.memberInfo();
		},
		mixins: [http]
	}
</script>

<style lang="scss" scoped>
.page-body{
	min-height: calc(100vh - 104rpx);
	padding-top: 16rpx;

	.content{
		background-color: white;
		min-height: calc(100vh - 104rpx);
		
		.head{
			text-align: center;
			padding: 40rpx 0;
			
			uni-view:nth-child(1){
				font-size: 50rpx;
			}
		}
		
		.item{
			border-radius: 10rpx;
			display: flex;
			margin-bottom: 20rpx;
			margin: 0 30rpx 20rpx;
			
			.left{
				width: 160rpx;
				text-align: center;
				font-size: 66rpx;
				color: white;
			}
			
			.right{
				padding: 16rpx 0;
				flex-grow: 1;
				
				uni-view{
					color: white!important;
					line-height: 36rpx;
				}
				
				uni-view:first-child{
					font-weight: 700;
				}
				
				uni-view:last-child{
					margin-top: 16rpx;
				}
				
				uni-view:nth-child(3),uni-view:nth-child(4){
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					uni-text{
						flex-grow: 1;
					}
					
					uni-button{
						height: 48rpx;
						line-height: 48rpx;
						font-size: 26rpx;
						background-color: rgba(255,255,255,0.3);
						color: white;
					}
				}
			}
		}
		
		.infoItem{
			display: flex;
			align-items: center;
			padding: 20rpx;
			border-bottom: 2rpx solid #ddd;
			
			uni-text:nth-child(1){
				width: 148rpx;
				text-align: justify;
				text-align-last: justify;
			}
			
			uni-text:nth-child(2){
				flex-grow: 1;
				padding: 0 20rpx;
			}
			
			uni-button{
				margin: 0;
				height: 54rpx;
				line-height: 54rpx;
				background-color: #eee;
				font-size: 28rpx;
				color: #555;
			}
		}
		
		.goBack{
			
			uni-button{
				background-color: #1AB20A;
				color: white;
				border-radius: 0;
				width: 360rpx;
				margin: 40rpx auto 0;
			}
		}
	}
}
</style>
