<template>
	<view>
		<navigator class="ns-operation" :url="'/distributionpages/account/account'">明细</navigator>
		<view class="distribution-commission-shop" :style="{ background: 'url(' + $util.img('upload/default/commission_shop_bg.png') + ')  no-repeat', backgroundSize: 'contain' }">
			<view class="tip-head">
				<view class="tip-txt">
					<text class="icon-money"></text>
					可提现佣金余额
				</view>
				<text class="commission-cash">¥{{ userAccount.commission_cash }}</text>
			</view>
			<view class="tip-bottom">
				<view class="field-2 pull-left">
					累计佣金
					<text class="ns-text-color">￥{{ userAccount.commission }}</text>
				</view>
				<view class="line"></view>
				<view class="field-2 pull-left">
					待审核金额
					<text class="ns-text-color">￥{{ userAccount.commission_locked }}</text>
				</view>
				<view class="line"></view>
				<view class="field-2 pull-right">
					已提现
					<text class="ns-text-color">￥{{ userAccount.commission_withdraw }}</text>
				</view>
			</view>
		</view>
		<!--推广商-->
		<view class="distributors">
			<view class="ns-border-color-gray head">
				<view class="title ns-text-color-black">
					<text class="iconfont iconguanggaozhuhuodongtuiguang ns-text-color ns-margin-right"></text>
					<text>推广商</text>
				</view>
			</view>
			<view class="money-list">
				<view class="money-list-li ns-border-color-gray">
					<navigator class="a-personal" :url="'/distributionpages/account_detail/account_detail?type_id=1'">
						<text class="text ns-text-color-black">推广佣金</text>
						<text class="money-number ns-text-color">
							<text class="num-new">¥{{ userAccount.commission_promoter }}</text>
							<text class="iconfont iconright ns-text-color-gray"></text>
						</text>
					</navigator>
				</view>
				<view class="money-list-li ns-border-color-gray" v-if="shopConfig.is_regional_agent > 0">
					<navigator class="a-personal" :url="'/distributionpages/account_detail/account_detail?type_id=2'">
						<text class="text ns-text-color-black">区域代理佣金</text>
						<text class="money-number ns-text-color">
							<text class="num-new">¥{{ userAccount.commission_region_agent }}</text>
							<text class="iconfont iconright ns-text-color-gray"></text>
						</text>
					</navigator>
				</view>
			</view>
		</view>
		<view class="shareholders" v-if="shopConfig.is_partner_enable > 0">
			<view class="ns-border-color-gray head">
				<view class="title gd ns-text-color-black">
					<text class="iconfont icongudongxinxi ns-text-color ns-margin-right"></text>
					<text>股东</text>
				</view>
			</view>
			<view class="money-list">
				<view class="money-list-li ns-border-color-gray">
					<navigator class="a-personal" :url="'/distributionpages/account_detail/account_detail?type_id=4'">
						<text class="text ns-text-color-black">股东分红</text>
						<text class="money-number ns-text-color">
							<text class="num-new">¥{{ userAccount.commission_partner }}</text>
							<text class="iconfont iconright ns-text-color-gray"></text>
						</text>
					</navigator>
				</view>
				<view class="money-list-li ns-border-color-gray" v-if="shopConfig.is_global_enable > 0">
					<navigator class="a-personal" :url="'/distributionpages/account_detail/account_detail?type_id=5'">
						<text class="text ns-text-color-black">全球分红</text>
						<text class="money-number ns-text-color">
							<text class="num-new">¥{{ userAccount.commission_partner_global }}</text>
							<text class="iconfont iconright ns-text-color-gray"></text>
						</text>
					</navigator>
				</view>
			</view>
		</view>
		<loading-cover ref="loadingCover"></loading-cover>
		<view class="btn-wrap"><button type="primary" @click="redirectTo('/distributionpages/to_withdraw/to_withdraw')">申请提现</button></view>
		<ns-login ref="login" href="distribution"></ns-login>
	</view>
</template>

<script>
import http from 'common/js/http.js';
import nsLogin from 'components/ns-login/ns-login.vue';
import loadingCover from '@/components/loading/loading.vue';
export default {
	components: {
		nsLogin,
		loadingCover
	},
	data() {
		return {
			userAccount: {
				commission_cash: ''
			},
			shopConfig: {}
		};
	},
	onLoad() {},
	onShow() {
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

		this.getMyCommission();
		this.getShopConfig();
	},
	mixins: [http],
	methods: {
		getMyCommission() {
			this.sendRequest({
				url: 'System.Distribution.myCommission',
				success: res => {
					if (res.code == 0) {
						if (res.data) {
							this.userAccount = res.data;
							if (this.$refs.loadingCover == undefined) return;
							this.$refs.loadingCover.hide();
						}
					}
				}
			});
		},
		getShopConfig() {
			this.sendRequest({
				url: 'System.Distribution.shopConfig',
				success: res => {
					if (res.code == 0) {
						if (res.data) {
							this.shopConfig = res.data;
						}
					}
				}
			});
		},
		redirectTo(url) {
			this.$util.redirectTo(url);
		}
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
}
.ns-operation {
	position: fixed;
	line-height: 88rpx;
	top: 0;
	right: 30rpx;
	z-index: 9999;
	/* #ifdef MP  */
	color: #ffffff;
	/* #endif */
}
.distribution-commission-shop {
	border: 0;
	padding: 40rpx 30rpx 10rpx 30rpx;
	overflow: hidden;
	margin-top: 0;
	.tip-head {
		width: 56%;
		margin: auto;
		text-align: center;

		.commission-cash {
			display: block;
			font-size: 42rpx;
			color: #fff;
			line-height: 1.5;
		}
		.tip-txt {
			margin-bottom: 0;
			margin-top: 28rpx;
			color: #fff;
			line-height: 50rpx;
		}
	}
	.tip-bottom {
		background: #fff;
		border-radius: 10rpx;
		margin: $ns-margin;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 36rpx;
		.field-2 {
			text-align: center;
			text {
				display: block;
			}
		}
	}
}
.shareholders {
	margin-top: 20rpx;
}
.distributors,
.shareholders {
	background: #fff;
	margin: $ns-margin + 10rpx;
	border-radius: 10rpx;
	padding: $ns-padding;
	.head {
		padding: 16rpx;
		margin-bottom: 0;
	}
	.title {
		padding: 6rpx;
		line-height: 40rpx;
	}
	.money-list {
		margin: 0 0 0 30rpx;
		.money-list-li {
			position: relative;
			box-sizing: border-box;
			padding: 20rpx 0 20rpx 30rpx;
			background: #fff;
			border-top: 2rpx solid $ns-border-color-gray !important;
			clear: both;
			.money-number {
				float: right;
				margin: 0 40rpx 0 0;
				padding: 0 10rpx;
				border-radius: 20rpx;
				height: 40rpx;
				line-height: 40rpx;
				font-size: $ns-font-size-base;
				vertical-align: middle;
			}
			navigator {
				width: 100%;
				position: relative;
				display: block;
				font-size: $ns-font-size-sm;
			}
			.text {
				vertical-align: middle;
			}
			.iconright {
				font-size: $ns-font-size-lg;
				position: absolute;
				right: 10rpx;
				top: 50%;
				margin-top: -20rpx;
			}
		}
		.money-list-li:first-child {
			border-top: 0;
		}
	}
}
.btn-wrap {
	padding: 40rpx 30rpx;
	margin-top: 0;
	button {
		margin: 0 !important;
	}
}
.line {
	width: 4rpx;
	height: 64rpx;
	background: $ns-bg-color-gray;
}
.num-new {
	line-height: 40rpx;
}
</style>
