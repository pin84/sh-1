<template>
	<view class="page-body">
		<TitleList :bgColor="bgColor" :titleList="titleList" @tabSelect="tabSelect" />
		<block v-if="gameTypeData[curSelectTitle].code=='CPYX'">
		<view class="bill-time-selector top-top">
			<view class="bill-time">
				<date-time class="bill-time-date" @dateChange='startDateChange'></date-time>
				<icon class="iconfont icon-icon-test1" type=""></icon>
			</view>
			<view class="bill-time">
				<date-time class="bill-time-date" :time-stamp='before_time_stamp' @dateChange='endDateChange'></date-time>
				<icon class="iconfont icon-icon-test1" type=""></icon>
			</view>
		</view>
		<view class="content">
			<view class="title">
				<text class="iconfont iconyuandian"></text>
				<text>团队详情</text>
			</view>
			<view class="box">
				<view class="item">
					<view class="uni-color-warning">{{totalCount}}</view>
					<view>团队人数</view>
				</view>
				<view class="item">
					<view class="uni-color-warning">{{totalRegisterCount}}</view>
					<view>注册人数</view>
				</view>
				<view class="item">
					<view class="uni-color-warning">{{totalBalance}}</view>
					<view>余额</view>
				</view>
				<view class="item">
					<view class="uni-color-warning">{{totalDepositAmount}}</view>
					<view>充值</view>
				</view>
				<view class="item">
					<view class="uni-color-warning">{{totalEncashment}}</view>
					<view>提现</view>
				</view>
				<view class="item">
					<view class="uni-color-warning">{{fBuyAmount}}</view>
					<view>消费总额</view>
				</view>
				<view class="item">
					<view class="uni-color-warning">{{fWinningAmount}}</view>
					<view>获胜金额</view>
				</view>
				<view class="item">
					<view class="uni-color-warning">{{commissionAmount}}</view>
					<view>消费红利金</view>
				</view>
				<view class="item">
					<view class="uni-color-warning">{{rebateAmount}}</view>
					<view>优惠</view>
				</view>
				<view class="item">
					<view class="uni-color-warning">{{netProfit}}</view>
					<view>净利润</view>
				</view>
			</view>
			<view class="tip">
				<view>温馨提示：</view>
				<view>净利润 =获胜金额+消费红利金+优惠-消费总额</view>
			</view>
		</view>
		</block>
		<block v-if="gameTypeData[curSelectTitle].code=='ZRSX'">
			<ZrsxOverview></ZrsxOverview>
		</block>
		<block v-if="gameTypeData[curSelectTitle].code=='DZYX'">
			<DzyxOverview></DzyxOverview>
		</block>
		<block v-if="gameTypeData[curSelectTitle].code=='TYJJ'">
			<TyssOverview></TyssOverview>
		</block>
		<block v-if="gameTypeData[curSelectTitle].code=='QPYX'">
			<QpyxOverview></QpyxOverview>
		</block>
		<block v-if="gameTypeData[curSelectTitle].code=='BYYX'">
			<ByyxOverview></ByyxOverview>
		</block>
		<block v-if="gameTypeData[curSelectTitle].code=='FBD'">
			<FbdOverview></FbdOverview>
		</block>
	</view>
</template>

<script>
	import http from 'common/js/http.js';
	import dateTime from '@/components/date-time/date_time';
	import TitleList from '@/components/lesystem/TitleList';
	import ZrsxOverview from './zrsxOverview'
	import DzyxOverview from './dzyxOverview'
	import TyssOverview from './tyssOverview'
	import QpyxOverview from './qpyxOverview'
	import ByyxOverview from './byyxOverview'
	import FbdOverview from './fbdOverview'
	export default {
		components: {
			dateTime,
			TitleList,
			ZrsxOverview,
			DzyxOverview,
			TyssOverview,
			QpyxOverview,
			ByyxOverview,
			FbdOverview
		},
		data() {
			let date = new Date()
			const year = this.timeFormat(date.getFullYear())
			const month = this.timeFormat(date.getMonth() + 1)
			const day = this.timeFormat(date.getDate())
			date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * 1)
			const year1 = this.timeFormat(date.getFullYear())
			const month1 = this.timeFormat(date.getMonth() + 1)
			const day1 = this.timeFormat(date.getDate())
			// 初始化第一选择时间选择器的时间戳
			let t = `${year}-${month}-${day} 02:00:00`
			let before_time_stamp = (new Date(t)).getTime()
			return {
				accountID: '',
				type: 0,
				tabList: [{
					type: 0,
					name: "商城"
				}
				// , {
				// 	type: 1,
				// 	name: "抢购"
				// }
				],
				totalCount: '',
				totalRegisterCount: '',
				totalBalance: '',
				totalDepositAmount: '',
				totalEncashment: '',
				fBuyAmount: '',
				fWinningAmount: '',
				commissionAmount: '',
				rebateAmount: '',
				netProfit: '',
				startTime: year + '/' + month + '/' + day + ' 02:00:00',
				endTime: year1 + '/' + month1 + '/' + day1 + ' 02:00:00',
				before_time_stamp,
				titleList:[],
				curSelectTitle:0,
				bgColor: '#f0f0f0',
				gameTypeData:[{
					code:''
				}]
			}
		},
		methods: {
			tabSelect(val) {
				this.curSelectTitle = val
			},
			getAllGameCategory() {
				let self = this
				self.sendRequest({
					url: "System.HomePage.getAllGameCategory",
					success: res => {
						self.gameTypeData = res.data
						if (res.code == 0) {
							if (res.data.length) {
								self.titleList = [];
								res.data.forEach(item => {
									self.titleList.push(item.name);
								})
							}
						}
					},
				});
			},
			ontabtap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.switchTab(index);
			},
			switchTab(index) {
				if (this.type === index) {
					return;
				}
				this.type = index;
				if (this.type == 0) {

				} else {

				}
			},
			timeFormat(i) {
				return i > 9 ? '' + i : '0' + i
			},
			startDateChange(date) {
				this.startTime = date[0] + '/' + date[1] + '/' + date[2] + ' ' + date[3] + ':' + date[4] + ':' + date[5]

				let year = date[0] - 0
				let month = date[1] - 0
				let day = date[2] - 0
				let hour = date[3] - 0
				let minute = date[4] - 0
				let second = date[5] - 0

				let t = `${date[0]}-${date[1]}-${date[2]} ${date[3]}:${date[4]}:${date[5]}`

				this.before_time_stamp = (new Date(t)).getTime()
				this.teamReportInfo();
			},
			endDateChange(date) {
				this.endTime = date[0] + '/' + date[1] + '/' + date[2] + ' ' + date[3] + ':' + date[4] + ':' + date[5]
				
				let year = date[0] - 0
				let month = date[1] - 0
				let day = date[2] - 0
				let hour = date[3] - 0
				let minute = date[4] - 0
				let second = date[5] - 0
				
				let t = `${date[0]}-${date[1]}-${date[2]} ${date[3]}:${date[4]}:${date[5]}`
				
				this.before_time_stamp = (new Date(t)).getTime()
				// this.selectByConditions();
				this.teamReportInfo();
			},
			teamReportInfo(){
				this.sendRequest({
					url: 'System.Agent.TeamReportInfo',
					data: {
						accountID: this.accountID,
						startTime: this.startTime,
						endTime: this.endTime
					},
					success: res => {
						if(res.code >= 0){
							this.totalCount = res.data.totalCount;
							this.totalRegisterCount = res.data.totalRegisterCount;
							this.totalBalance = res.data.totalBalance;
							this.totalDepositAmount = res.data.totalDepositAmount;
							this.totalEncashment = res.data.totalEncashment;
							this.fBuyAmount = res.data.listReport[0].reportModel.fBuyAmount;
							this.fWinningAmount = res.data.listReport[0].reportModel.fWinningAmount;
							this.commissionAmount = res.data.listReport[0].reportModel.commissionAmount;
							this.rebateAmount = res.data.listReport[0].reportModel.rebateAmount;
							this.netProfit = res.data.listReport[0].reportModel.netProfit;
						}
					}
				})
			}
		},
		onLoad(option) {
			this.getAllGameCategory()
			this.accountID = option.uid == undefined ? 0 : option.uid;
			this.teamReportInfo();
			
		},
		mixins: [http]
	}
</script>

<style lang="scss" scoped>
.page-body {
	min-height: 100vh;
	/* #ifdef H5 */
	min-height: calc(100vh - 44px);
	/* #endif */

	.edit-nav {
		box-sizing: border-box;
		height: 80rpx;
		flex-direction: row;
		background: #fff;
		border-bottom: 2rpx solid $ns-border-color-gray;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */

		.uni-tab-item {
			flex-wrap: nowrap;
			display: inline-block;
			width: 50%;
			box-sizing: border-box;
			text-align: center;
		}

		.uni-tab-item-title {
			color: #555;
			font-size: 30rpx;
			display: block;
			height: 76rpx;
			line-height: 76rpx;
			border-bottom: 4rpx solid #fff;
			padding: 0 10rpx;
			flex-wrap: nowrap;
		}

		.uni-tab-item-title-active {
			display: block;
			height: 76rpx;
			color: $base-color;
			border-bottom: 4rpx solid $base-color;
			padding: 0 10rpx;
		}

		::-webkit-scrollbar {
			width: 0;
			height: 0;
			color: transparent;
		}
	}

	.bill-time-selector {
		height: 80rpx;
		mirgin-top: 125rpx;
		color: #444;
		border-bottom: 2rpx solid #eee;
		background-color: #fff;
		display: flex;

		.bill-time {
			flex-grow: 1;
			padding: 0 12rpx 0 20rpx;
			display: flex;
			align-items: center;

			.bill-time-date {
				flex-grow: 1;
				overflow: hidden;
				white-space: nowrap;
			}
		}

		.bill-time:nth-child(1) {
			border-right: 2rpx solid #eee;
		}
	}
	
	.content{
		background-color: white;
		margin-top: 12rpx;
		
		.title{
			padding: 20rpx;
			border-bottom: 2rpx solid #eee;
			
			.iconyuandian{
				color: #FF0036;
			}
		}
		
		.box{
			display: flex;
			flex-wrap: wrap;
			
			.item{
				width: calc(100%/3);
				height: 220rpx;
				box-sizing: border-box;
				border-right: 2rpx solid #eee;
				border-bottom: 2rpx solid #eee;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
				.uni-color-warning{
					color: $uni-color-warning;
				}
			}
			
			.item:nth-child(3n){
				border-right: none;
			}
		}
		
		.tip{
			padding: 40rpx 20rpx 20rpx;
		}
	}
}
</style>
