<template>
	<view>
		<view class="tabs">
			<view :class="type == 'account' ? 'active' : ''" @click="getAccountRecordsList()">佣金明细</view>
			<view :class="type == 'commission' ? 'active' : ''" @click="getCommissionWithdrawList()">提款记录</view>
		</view>
		<view v-if="type == 'account'" class="items">
			<view v-for="item in accountRecordsList" :key="item.id" class="item ns-border-color-gray">
				<view>
					<view>{{ item.type_name }}</view>
					<view class="ns-text-color-gray">{{ $util.timeStampTurnTime(item.create_time) }}</view>
				</view>
				<view class="price">￥{{ item.money }}</view>
			</view>
		</view>
		<view v-if="type == 'commission'" class="items">
			<view v-for="item in commissionWithdrawList" :key="item.id" class="item ns-border-color-gray">
				<view>
					<view>{{ item.bank_name }}</view>
					<view class="ns-text-color-gray">
						{{ $util.timeStampTurnTime(item.ask_for_date) }}
						
					</view>
				</view>
				<view class="price">
					<view class="ns-text-color price-num">￥{{ item.cash }}</view>
					<text class="ns-text-color" v-if="item.status == -1">已拒绝</text>
					<text class="ns-text-color" v-else-if="item.status == 0">已申请(等待处理)</text>
					<text class="ns-text-color" v-if="item.status == 1">已同意</text>
				</view>
			</view>
		</view>
		<view class="empty" v-if="isEmpty">
			<view class="iconfont iconyue ns-margin-bottom"></view>
			<view class="ns-text-color-gray ns-margin-top">您暂时还没有任何记录哦！</view>
		</view>
		<ns-login ref="login" href="distribution"></ns-login>
	</view>
</template>

<script>
import http from 'common/js/http.js';
import nsLogin from 'components/ns-login/ns-login.vue';
export default {
	components: {
		nsLogin
	},
	data() {
		return {
			accountRecordsList: [],
			commissionWithdrawList: [],
			type: 'account',
			isEmpty: false
		};
	},
	onLoad(data) {
		var isLogin = false;
		// #ifdef H5
		getApp().checkLogin(() => {
			isLogin = true;
			setTimeout(() => {
				this.$refs.login.clickLogin();
			}, 100);
		});
		// #endif
		// #ifdef MP
		getApp().$vm.checkLogin(() => {
			isLogin = true;
			this.$refs.login.clickLogin();
		});
		// #endif

		if (isLogin) return;
		this.getAccountRecordsList();
	},
	mixins: [http],
	methods: {
		getAccountRecordsList() {
			this.type = 'account';
			this.isEmpty = false;
			this.sendRequest({
				url: 'System.Distribution.accountRecordsList',
				success: res => {
					if (res.code == 0) {
						let list = res.data.account_records_detail;
						if (list.length == 0) {
							this.isEmpty = true;
						}
						this.accountRecordsList = list;
					}
				}
			});
		},
		getCommissionWithdrawList() {
			this.type = 'commission';
			this.isEmpty = false;
			this.sendRequest({
				url: 'System.Distribution.commissionWithdrawList',
				success: res => {
					if (res.code == 0) {
						let list = res.data.data;
						if (list.length == 0) {
							this.isEmpty = true;
						}
						this.commissionWithdrawList = list;
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.tabs {
	display: flex;
	height: 80rpx;
	background: #fff;
	box-shadow: 2rpx 4rpx 10rpx rgba(0, 0, 0, 0.1);
	position: relative;
	z-index: 9;
	view {
		width: 50%;
		line-height: 80rpx;
		text-align: center;
	}
}
.items{
	background: #FFFFFF;
	overflow: hidden;
}
.item {
	border-top: 1px solid;
	&:first-child{
		border:none;
	}
	display: flex;
	justify-content: space-between;
	margin: $ns-margin - 10rpx $ns-margin;
	padding-top:$ns-padding;
	height: 100rpx;
	background: #fff;
}
.price {
	color: $base-color;
}
.active {
	color: $base-color;
	position:relative;
	&:after{
		content: '';
		position:absolute;
		width:40rpx;
		height:4rpx;
		background:$base-color;
		bottom:0;
		left: 168rpx;
	}
}
.price-num{
	text-align: right;
}
</style>
