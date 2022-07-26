<template>
	<view>
		<template>
			<view
				class="can-apply"
				v-if="toWithdrawDetail && $util.img('upload/default/to_withdraw_bn.png')"
				:style="{ background: 'url(' + $util.img('upload/default/to_withdraw_bn.png') + ')  no-repeat', backgroundSize: 'contain' }"
			>
				<view>
					<text>可提现金额</text>
					<text class="apply-num">¥{{ toWithdrawDetail.user_account.commission_cash }}</text>
				</view>
				<view>
					<text>佣金总金额</text>
					<text class="apply-num">¥{{ toWithdrawDetail.user_account.commission }}</text>
				</view>
			</view>
			<view class="withdraw-box">
				<view class="method">
					<view class="method-title">
						<text class="ns-text-color">*</text>
						<text class="ns-font-size-sm">提款方式：</text>
					</view>
					<view class="method-select">
						<picker @change="changeMethod" :value="method.selected" :range="method.array" range-key="name" class="picker">
							<view class="uni-input ns-font-size-sm">{{ method.array[method.selected].name }}</view>
						</picker>
						<text class="iconright iconfont ns-text-color-gray position-right ns-font-size-lg"></text>
					</view>
				</view>
				<view v-if="method.selected == 1" class="panel side-nav">
					<view v-if="isEmpty">
						<navigator url="/pages/member/account/account?goback=apply_withdrawal" class="apply-account">
							<text>请添加提现账号</text>
							<text class="iconright iconfont ns-text-color-gray ns-font-size-lg"></text>
						</navigator>
					</view>
					<view v-if="!isEmpty">
						<navigator url="/pages/member/account/account?goback=apply_withdrawal" v-for="(item, index) in accountList1" :key="index">
							<text>
								{{ item.branch_bank_name }}
								<br />
								{{ item.account_number }}
							</text>
							<text class="iconright iconfont ns-text-color-gray"></text>
						</navigator>

						<navigator url="/pages/member/account/account?goback=apply_withdrawal" v-for="(item, index) in accountList2" :key="index">
							<text>{{ item.account_type_name }}</text>
							<text class="iconright iconfont ns-text-color-gray"></text>
						</navigator>
						<navigator url="/pages/member/account/account?goback=apply_withdrawal" v-for="(item, index) in accountList3" :key="index">
							<text>
								{{ item.account_type_name }}
								<br />
								{{ item.account_number }}
							</text>
							<text class="iconright iconfont ns-text-color-gray"></text>
						</navigator>
					</view>
				</view>
				<view class="withdraw-input-box">
					<text>
						<text class="ns-text-color">*</text>
						<text class="label">提现现金：</text>
					</text>
					<input type="digit" class="withdraw-input" placeholder="请输入提现金额" v-model.trim="money" />
				</view>
			</view>

			<view class="ns-text-color ns-padding-top ns-padding-left ns-margin-left uni-bold">
				最低提现金额为{{ toWithdrawDetail['withdraw_info']['withdraw_cash_min'] }}元 ，必须为{{ toWithdrawDetail['withdraw_info']['withdraw_multiple'] }}的整数倍
			</view>
			<view class="ns-text-color-gray ns-padding-left ns-font-size-sm ns-margin-left ns-margin-top">注:可提现金额为交易成功后7天且未提现的金额</view>
			<view class="btn-wrap"><button @click="btnSave()" type="primary">立即提取</button></view>
		</template>
		<loading-cover ref="loadingCover"></loading-cover>
		<ns-login ref="login" href="distribution"></ns-login>
	</view>
</template>

<script>
import http from 'common/js/http.js';
import loadingCover from '@/components/loading/loading.vue';
import nsLogin from 'components/ns-login/ns-login.vue';
export default {
	components: {
		loadingCover,
		nsLogin
	},
	data() {
		return {
			toWithdrawDetail: {
				user_account: {
					commission_cash: 0,
					commission: 0
				},
				withdraw_info: {
					withdraw_cash_min: 0
				}
			},
			method: {
				selected: 0,
				array: [
					{
						name: '提现到余额',
						value: 1
					},
					{
						name: '提现到第三方',
						value: 2
					}
				]
			},
			cash: '',
			accountList1: [],
			accountList2: [],
			accountList3: [],
			bankAccountId: 0,
			isEmpty: false,
			money: '',
			repeat: true
		};
	},
	mixins: [http],
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

		this.getToWithdrawDetail();
		this.getAccountList();
	},
	onHide() {
		this.accountList1 = [];
		this.accountList2 = [];
		this.accountList3 = [];
	},
	methods: {
		getToWithdrawDetail() {
			this.sendRequest({
				url: 'System.Distribution.toWithdrawDetail',
				success: res => {
					if (res.code == 0) {
						let list = res.data;
						this.toWithdrawDetail = list;
						if (this.$refs.loadingCover == undefined) return;
						this.$refs.loadingCover.hide();
					}
				}
			});
		},
		getAccountList() {
			this.sendRequest({
				url: 'System.Member.defaultAccount',
				success: res => {
					if (res.code == 0) {
						let list = res.data;
						if (list != null && list.length > 0) {
							this.bankAccountId = list[0].id;
							for (var i = 0; i < list.length; i++) {
								if (list[i].account_type == 1) {
									this.accountList1.push(list[i]);
								} else if (list[i].account_type == 2) {
									this.accountList2.push(list[i]);
								} else if (list[i].account_type == 3) {
									this.accountList3.push(list[i]);
								}
							}
							this.isEmpty = false;
						} else {
							this.isEmpty = true;
						}
					}
				}
			});
		},
		changeMethod(e) {
			let index = e.target.value;
			this.method.selected = index;
		},
		btnSave() {
			var bank_account_id = this.bankAccountId;
			var cash = this.money;
			var withdraw_no = 123456;
			var type = this.method.array[this.method.selected].value;

			var MaxCashAmount = this.toWithdrawDetail.user_account.commission_cash;
			var Minaamountcash = this.toWithdrawDetail['withdraw_info']['withdraw_cash_min'];
			var IntTimes = this.toWithdrawDetail['withdraw_info']['withdraw_multiple'];
			if (type == 2) {
				if (bank_account_id == null || bank_account_id == '') {
					this.$util.showToast({
						title: '未添加提现账号'
					});
					return;
				}
			}

			var reg = /^\+?[1-9][0-9]*$/;
			if (reg.test(cash)) {
				cash = Number(cash);
				MaxCashAmount = Number(MaxCashAmount);
				Minaamountcash = Number(Minaamountcash);
				if (cash > 0) {
					if (cash <= MaxCashAmount) {
						if (cash >= Minaamountcash) {
							if (cash % parseInt(IntTimes) == 0 && parseInt(IntTimes) > 0) {
								if (this.repeat) {
									this.repeat = false;

									this.sendRequest({
										url: 'System.Distribution.applyWithdraw',
										data: {
											bank_account_id: bank_account_id,
											cash: cash,
											withdraw_no: withdraw_no,
											type: type
										},
										success: res => {
											if (res.data > 0) {
												this.$util.showToast({
													title: '已提交申请，等待审核'
												});
												setTimeout(() => {
													this.$util.redirectTo('/distributionpages/commission_shop/commission_shop');
												}, 1500);
											} else {
												this.repeat = true;
												this.$util.showToast({
													title: res.message
												});
											}
										}
									});
								} else {
									this.$util.showToast({
										title: '正在审核中，请勿重复本操作！'
									});
									return false;
								}
							} else {
								this.$util.showToast({
									title: '提现金额必须是' + IntTimes + '的整数倍'
								});
								return false;
							}
						} else {
							this.$util.showToast({
								title: '提现金额必须大于' + Minaamountcash
							});
							return false;
						}
					} else {
						this.$util.showToast({
							title: '可提现金额最大为' + MaxCashAmount
						});
						return false;
					}
				} else {
					this.$util.showToast({
						title: '当前不可提现'
					});
					return false;
				}
			} else {
				this.$util.showToast({
					title: '输入金额不合法'
				});
				return false;
			}
		}
	}
};
</script>

<style lang="scss">
.method {
	background: #fff;
	height: 120rpx;
	display: flex;
	margin: 0 30rpx;
	justify-content: space-between;
	align-items: center;
	.method-select {
		width: 506rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.picker {
			width: 100%;
		}
	}
}

.tip-text {
	padding: 40rpx 20rpx;
}

.btn-wrap {
	text-align: center;
	margin-top: 120rpx;
}

.panel {
	margin: 0 30rpx;
	border-top: 2rpx solid $ns-border-color-gray;
}

.side-nav {
	padding: 0;
}

.side-nav > view {
	position: relative;
}

.side-nav > view navigator {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 120rpx;
	line-height: 120rpx;
	text:first-child {
		font-size: $ns-font-size-sm;
	}
}

.side-nav > view navigator text {
	line-height: 50rpx;
}

.side-nav > view navigator .iconfont {
	line-height: 90rpx;
}

.side-nav > view navigator.apply-account .iconfont {
	line-height: 50rpx;
}

.can-apply {
	border-radius: 10rpx;
	background: #fff;
	margin: $ns-margin;
	padding: 50rpx $ns-padding 0;
	display: flex;
	justify-content: space-around;
	height: 204rpx;
	& > view {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #fff;
		.apply-num {
			font-size: $ns-font-size-lg + 4rpx;
		}
	}
}
.withdraw-box {
	margin: $ns-margin;
	background: #fff;
	border-radius: 10rpx;
	overflow: hidden;
}
.withdraw-input-box {
	display: flex;
	margin: 0 30rpx;
	line-height: 120rpx;
	border-top: 2rpx solid $ns-bg-color-gray;
	justify-content: space-between;
	text,
	input {
		font-size: $ns-font-size-sm;
	}
	input {
		width: 506rpx;
		height: 120rpx;
		padding-left: 24rpx;
		box-sizing: border-box;
	}
}
</style>
