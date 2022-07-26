<template>
	<view>
		<view class="cf-container ns-border-color-gray">
			<view class="tab">
				<view @click="navToggle('promoter_commission', 1)"><text :class="toggle == 1 ? 'ns-text-color active' : ''">推广员佣金</text></view>
				<view @click="navToggle('region_agent_commission', 2)" v-if="promoterInfo.shop_user_info.region_center_id > 0">
					<text :class="toggle == 2 ? 'ns-text-color active' : ''">区域代理佣金</text>
				</view>
				<view @click="navToggle('partner_commission', 3)" v-if="promoterInfo.shop_user_info.partner_id > 0">
					<text :class="toggle == 3 ? 'ns-text-color active' : ''">股东分红</text>
				</view>
			</view>
		</view>
		<view class="tablelist-append">
			<view class="water-item " v-for="(item, index) in recordingList" :key="index">
				<view class="water-top ns-border-color-gray">
					<text class="pull-left ns-text-color-black" :selectable="true">订单号：{{ item.order_no }}</text>
					<text class="pull-right ns-text-color-black">{{ $util.timeStampTurnTime(item.create_time) }}</text>
				</view>
				<view class="water-bottom">
					<view class="water-info ">
						<view class="water-name pull-left ns-text-color-black">{{ item.nick_name }}</view>
						<view class="water-status pull-right ns-text-color-black">{{ item.status_name }}</view>
					</view>
					<view class="water-info">
						<view class="water-name pull-left ns-text-color-black">订单金额</view>
						<view class="water-price pull-right ns-text-color">￥{{ item.order_money }}</view>
					</view>
					<view class="water-info">
						<view class="water-name pull-left ns-text-color-black">佣金金额</view>
						<view class="water-price pull-right ns-text-color">￥{{ item.commission_money }}</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="status" v-if="recordingList.length > 0 && pageCount > 1" />
		<view v-if="isEmpty && recordingList.length == 0" class="empty">
			<view class="iconfont iconwenzhangchaxun"></view>
			<view class="ns-text-color-gray">没有找到您想要的商品...</view>
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
			is_load: true, //防止重复加载
			page: 1,
			toggle: 1,
			pageCount: 0,
			type: 'promoter_commission',
			promoterInfo: {
				shop_user_info: {
					region_center_id: '',
					partner_id: ''
				}
			},
			isEmpty: false,
			status: 'loading',
			recordingList: []
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
		this.getPromoterDetail();
		this.getgoodlist(1);
	},
	onReachBottom() {
		if (!this.is_load) return;
		if (this.page < this.pageCount) {
			this.getgoodlist(this.page);
		}
	},
	mixins: [http],
	methods: {
		getgoodlist(page) {
			var params = {
				page: page,
				type: this.type
			};
			if (this.is_load) {
				this.is_load = false;
				this.sendRequest({
					url: 'System.Distribution.commissionDistributionList',
					data: params,
					success: res => {
						if (res.code == 0) {
							if (res.data) {
								let list = res.data.data;
								this.pageCount = res.data.page_count;
								if (page == 1) {
									this.recordingList = list;
								} else if (page > 1) {
									if (this.pageCount == 0) {
										this.status = 'nomore';
										this.isEmpty = true;
									} else {
										if (this.page < this.pageCount) {
											this.status = 'more';
										} else {
											this.status = 'nomore';
										}
										this.isEmpty = false;
										if (list.length > 0) {
											this.recordingList = this.recordingList.concat(list);
											this.page++;
										}
									}
								}
								this.is_load = true;
							}
						} else {
							this.$util.showToast(res.message);
						}
					}
				});
			}
		},
		getPromoterDetail() {
			this.sendRequest({
				url: 'Nsfx.Distribution.promoterDetail',
				success: res => {
					if (res.code == 0) {
						if (res.data) {
							this.promoterInfo = res.data;
						}
					}
				}
			});
		},
		navToggle(type, id) {
			if (id == this.toggle) return;
			this.toggle = id;
			this.type = type;
			this.getgoodlist(1);
		}
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
}

.cf-container {
	max-width: 1280rpx;
	background: #fff;
	overflow: hidden;
	border-bottom: 2rpx solid;
	border-top: 2rpx solid;
	margin-bottom: 20rpx;
}
.active {
	border-bottom: 4rpx solid $base-color;
}
.tab {
	display: flex;
	justify-content: space-between;
}

.tab > view {
	text-align: center;
	width: 33%;

	text {
		display: inline-block;
		line-height: 88rpx;
	}
}

.coupon-empty {
	text-align: center;
	line-height: 80rpx;
}
.water-item {
	background: #fff;
	margin-bottom: 30rpx;
	.water-top {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		padding: 20rpx 20rpx 16rpx;
		border-bottom: 2rpx solid;
	}
	.water-bottom {
		padding: 20rpx 0;
		.water-info {
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			padding: 10rpx 20rpx 10rpx;
			.water-name {
				width: 33.333%;
			}
			.water-price {
				width: 30%;
				text-align: right;
			}
		}
	}
}
</style>
