<template>
	<view v-if="couponList.length > 0">
		<template v-if="value.style == 1">
			<!-- 样式一 -->
			<scroll-view class="coupon-all" :scroll-x="true" :show-scrollbar="false">
				<view
					v-for="(item, index) in couponList"
					:key="index"
					class="coupon"
					:class="item.max_fetch > 0 && item.received_num >= item.max_fetch ? 'ns-bg-color-gray' : 'ns-bg-color'"
					@click="couponReceive(item, index)"
				>
					<view class="coupon-content">
						<text class="money-number">￥{{ item.money }}</text>
						<view class="explanation ns-font-size-sm">满{{ item.at_least }}可用</view>
					</view>
					<text v-if="item.max_fetch > 0 && item.received_num >= item.max_fetch" class="receiving-status">已领取</text>
					<text v-else class="receiving-status ns-font-size-sm">领取</text>
				</view>
			</scroll-view>
		</template>
		<template v-else-if="value.style == 2">
			<!-- 样式二 -->
			<view class="coupon-all2">
				<view v-for="(item, index) in couponList" :key="index" class="coupons-style2" @click="couponReceive(item, index)">
					<text class="money-number">￥{{ item.money }}</text>
					<view class="explanation ns-font-size-sm">满{{ item.at_least }}可用</view>
					<text v-if="item.max_fetch > 0 && item.received_num >= item.max_fetch" class="get">已领取</text>
					<text v-else class="get ns-font-size-sm">领取</text>
				</view>
			</view>
		</template>
		<ns-login ref="login" href = 'index'></ns-login>
	</view>
</template>

<script>
// 优惠券
import http from 'common/js/http.js';
import nsLogin from 'components/ns-login/ns-login.vue';
export default {
	components: {
		nsLogin
	},
	name: 'diy-coupons',
	props: {
		value: {
			type: Object,
			default: () => {
				return { style: 1 };
			}
		}
	},
	mixins: [http],
	data() {
		return {
			token: '',
			couponList: [],
			isHave: true
		};
	},
	created() {
		this.token = uni.getStorageSync('token');
		this.getCanReceiveCouponQuery();
	},
	methods: {
		getCanReceiveCouponQuery() {
			this.sendRequest({
				url: 'System.Member.canReceiveCouponQuery',
				success: res => {
					let data = res.data;
					if (data != null) {
						this.couponList = data;
					}
				}
			});
		},
		couponReceive(item, index) {
			var info = new Array();
			info['maxFetch'] = item.max_fetch;
			info['receivedNum'] = this.token != '' ? item.received_num : 0;

			this.isHave = false;
			if (this.isHave) return;

			this.sendRequest({
				url: 'System.Member.getCoupon',
				data: { coupon_type_id: item.coupon_type_id, scenario_type: 2 },
				success: res => {
					if (res.code >= 0) {
						this.$util.showToast({
							title: '领取成功'
						});
						this.isHave = true;
						this.couponList[index].received_num = parseInt(info['receivedNum']) + 1; // 更新该用户已领取数
					} else if (res.code == -9999) {
						this.$util.showToast({
							title: res.message
						});
						setTimeout(() => {
							this.$refs.login.clickLogin();
						}, 1000);
					} else {
						this.isHave = true;
						this.$util.showToast({
							title: res.message
						});
					}
				}
			});
		}
	}
};
</script>

<style>
/* 样式一 */
.coupon-all {
	background: #fff;
	width: 100%;
	flex-direction: row;
	white-space: nowrap;
	padding: 30rpx 0;
	line-height: 1;
}
.coupon-all .coupon:after {
	content: '';
	position: absolute;
	top: -18rpx;
	left: 184rpx;
	width: 30rpx;
	height: 30rpx;
	border-radius: 50%;
	background-color: #fff;
}
.coupon-all .coupon:before {
	content: '';
	position: absolute;
	bottom: -20rpx;
	left: 184rpx;
	width: 30rpx;
	height: 30rpx;
	border-radius: 50%;
	background-color: #fff;
}
.coupon-all .coupon {
	position: relative;
	display: inline-block;
	justify-content: space-between;
	margin-left: 30rpx;
	width: 300rpx;
	height: 160rpx;
	line-height: 160rpx;
	border-radius: 10rpx;
	color: #fff;
	padding: 0 10rpx;
	box-sizing: border-box;
}
.coupon-all .coupon .coupon-content {
	display: inline-block;
	color: #fff;
	text-align: center;
	vertical-align: middle;
	width: 180rpx;
	border-right: 2rpx dashed;
	margin-right: 18rpx;
	padding-right: 10rpx;
}
.coupon-all .coupon .money-number {
	font-size: 38rpx;
}
.coupon-all .coupon .explanation {
	font-size: 28rpx;
	color: #fff;
}
.coupon-all .coupon .receiving-status {
	display: inline-block;
	white-space: initial;
	width: 40rpx;
	margin-left: 18rpx;
	line-height: 1.5;
	vertical-align: middle;
}

/*样式二*/
.coupon-all2 {
	padding: 10rpx 0 10rpx;
	background: #fff;
	overflow: hidden;
}
.coupon-all2 .coupons-style2 {
	width: 31.33%;
	height: 180rpx;
	display: inline-block;
	float: left;
	background: #f23c3c url('/static/images/diy/index_coupon_bg.png') no-repeat;
	background-size: 100% 100%;
	margin: 0 0 1.5% 1.5%;
	color: #fff;
	text-align: center;
}
.coupon-all2 .coupons-style2 .money-number {
	display: block;
	margin: 0;
	padding-top: 30rpx;
	line-height: 44rpx;
	font-size: 40rpx;
	color: #fff;
	text-align: center;
}
.coupon-all2 .coupons-style2 .explanation {
	color: rgba(255, 255, 255, 0.7);
	text-align: center;
}
.coupon-all2 .coupons-style2 .get {
	position: relative;
	color: rgba(255, 255, 255, 0.7);
}
</style>
<style scoped>
.coupon-all >>> .uni-scroll-view::-webkit-scrollbar {
	display: none;
}
</style>
