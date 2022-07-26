<template>
	<view>
		<view>
			<view class="successhead">
				<view style="width: 150rpx"><text class="iconfont icondagou" style="font-size: 120rpx; color: #4CAF50;"></text></view>
				<view style="width: 500rpx"><text style="font-size: 40rpx;font-weight: bold;">你的提款申请已经提交!<br /></text>

					<text style="color: #808080;">申请提款完成后，我们将会以最快的速度进行审核。如有任何提款问题或想知道作业进度。可以联络我们的线上客服，感谢您!</text>
				</view>
			</view>
			<view class="successhead">
				<text class="ns-text-color ns-font-size-lg">提款信息</text>

			</view>

			<view class="recharge_info">
				<view class="recharge_info_row"><text class="rir-title">申请时间: </text><text>{{applyTime}}</text></view>
				<view class="recharge_info_row"><text class="rir-title">收款人:</text><text>{{payee}}</text></view>
				<view class="recharge_info_row"><text class="rir-title">提款金额:</text><text>{{withdrawAmount}}</text></view>
				<view class="recharge_info_row"><text class="rir-title">实际提领:</text><text>{{acturalMoney}}</text></view>
				<view class="recharge_info_row"><text class="rir-title">订单号:</text><text>{{orderId}}</text></view>
				<view class="recharge_info_row"><text class="rir-title">收款账户:</text><text>{{bankInfo}}</text></view>
			</view>

			<view class="successhead">
				<button type="primary" @click="finished">完成</button>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				acturalMoney,
				withdrawAmount,
				applyTime,
				bankInfo,
				orderId,
				payee
			};
		},
		methods: {
			getRechargeResult(option) {

				let res = JSON.parse(decodeURIComponent(option.data));
				this.acturalMoney=res.acturalMoney;
				this.withdrawAmount=res.withdrawAmount;
				this.applyTime=res.applyTime;
				this.bankInfo=res.bankInfo;
				this.orderId=res.orderId;
				this.payee=res.payee;
				//console.log(res);
			},
			finished() {
				uni.switchTab({
					url: "/pages/member/index/index"
				})
			}
		},
		onLoad(option) {

			this.getRechargeResult(option);
		},
	}
</script>

<style lang="scss" scoped>
	.successhead {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30rpx;
	}

	.recharge_info {
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		width: 680rpx;
		background-color: #FFFFFF;
		border-radius: 3%;
		height: auto;
		justify-content: center;
		align-items: center;
		padding: 40rpx 20rpx;
		.rir-title{
			text-align: left;
			margin-right: 20rpx;
			font-weight: bold;
		}
	}

	.recharge_info_row {
		width: 100%;
	}
</style>
