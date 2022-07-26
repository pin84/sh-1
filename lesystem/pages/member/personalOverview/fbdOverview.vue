<template>
	<view>
		<ScreenBar ref="ScreenBar" @changeStartTime="changeStartTime" @changeEndTime="changeEndTime" inittimes='00:00:00'></ScreenBar>
		<view style="margin-bottom: 5rpx;">
			<view class="cu-bar bg-white solid-bottom margin-top ">
				<view class="action flex align-center">
					<text class=" iconfont icon-dian text-bold"
						style="transform: scale(2); line-height: 0; color: #b62929;"></text>
					<text class=" ">个人详情</text>
				</view>
			</view>
		</view>

		<view class="main-body margin-bottom-xs">
			<view class="list" v-if="personalSummaryList">
				<view class="flex-item bg-white flex text-center padding" v-for="(item, index) in personalSummaryList"
					:key="index">
					<view class="text-bold text-orange"><span class="text-lg">{{item.val}}</span></view>
					<view>
						<text class="text-lg">{{ item.name }}</text>
					</view>
				</view>
			</view>
		</view>

		<view style="margin-bottom: 5rpx;">
			<view class="cu-bar bg-white solid-bottom margin-top ">
				<view class="action flex align-center">
					<text class=" iconfont icon-dian text-bold"
						style="transform: scale(2); line-height: 0; color: #b62929;"></text>
					<text class="text-red">净盈利=中奖金额-投注金额</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/common/js/http.js';
	export default {
		mixins: [http],
		data() {
			return {
				personalSummaryList: [{
						code: 'userMoney',
						name: '余额',
						val: '',
					},
					{
						code: 'rechargeAmount',
						name: '充值',
						val: ''
					},
					{
						code: 'withdrawAmount',
						name: '提现',
						val: ''
					},
					{
						code: 'betAmount',
						name: '投注金额',
						val: ''
					},
					{
						code: 'effectiveAmount',
						name: '有效投注',
						val: ''
					},
					{
						code: 'zhongBonus',
						name: '中奖金额',
						val: ''
					},
					{
						code: 'winLossAmount',
						name: '盈利',
						val: ''
					}
				],
				startTime: this.getTimeString('start'),
				endTime: this.getTimeString('end'),
			}
		},
		components: {
			ScreenBar: () => import('./ScreenBar')
		},

		methods: {
			getTimeString(type) {     //start, end
				if (type == 'start') {
					let date = new Date();
					let y = date.getFullYear();
					let m = this.prefixZero(date.getMonth() + 1, 2);
					let d = this.prefixZero(date.getDate(), 2);
					return y + '-' + m + '-' + d + ' ' + '00:00:00';
				}else if (type == 'end') {
					let date = new Date();
					let y = date.getFullYear();
					let m = this.prefixZero(date.getMonth() + 1, 2);
					let d = this.prefixZero(date.getDate(), 2);
					return y + '-' + m + '-' + d + ' ' + '23:59:59';
				}
			},
			prefixZero(value, len) { //前置补充0
				if (value.toString().length >= len) { //不用补0
					return value;
				}
				if (Number.isInteger(value)) {
					let str = '';
					for (let i = 0; i < len - 1; i++) {
						str += '0';
					}
					return str + value;
				}
			},
			changeStartTime(value) {
				this.startTime = value;
				this.getDzyxOverviewList();
			},
			changeEndTime(value) {
				this.endTime = value;
				this.getDzyxOverviewList();
			},
			getDzyxOverviewList() {
				let self = this
				self.sendRequest({
					url: "System.Member.getMemberFbdGamesTotalReport",
					data: {
						startTime: self.startTime,
						endTime: self.endTime,
					},
					success: res => {
						if (res.code == 0) {
							let result = res.data.fbdGameReport;
							// console.log(res)
							for (let j = 0; j < self.personalSummaryList.length; j++) {
								let code = self.personalSummaryList[j].code;
								let value = result[code];
								self.personalSummaryList[j].val = value;
							}
						}
					},
				});
			}
		},
		created() {
			this.getDzyxOverviewList()
		},
	}
</script>

<style lang="scss" scoped>
	.list {
		display: flex;
		flex-wrap: wrap;

		.flex-item {
			margin-right: 4rpx;
			width: calc(33.3% - 4rpx);
			margin-bottom: 4rpx;
			flex-direction: column;

			.iconsize {
				font-size: 40rpx;
			}
		}
	}

	.personal-overview {
		width: 100%;
		height: 100%;
		background-color: #f1f1f1;
		display: flex;
		flex-direction: column;

		.main-body {
			// border: 1px solid #cdc9c9;
			height: 100%;
		}
	}
</style>
