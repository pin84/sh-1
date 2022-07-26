<template>
	<view class="record flex flex-direction">
		<view class="title-bg flex">
			<view class="title-item text-center flex-sub" :class="{ 'flex-twice': index === 0 || index === 1 }" v-for="(title, index) in titles" :key="index">{{ title }}</view>
		</view>

		<view v-if="recordList.length === 0 && isShowNoDataIcon" style="height: 100%; padding-top:300rpx ;" class="flex  align-center flex-direction  margin-top-xl">
			<i class="iconfont icon-kelian text-gray" style="font-size: 200rpx; line-height: 180rpx;"></i>
			<view><text class="text-xl text-gray">暂无记录</text></view>
		</view>
		<view v-else class="main-body">
			<view class="body-content">
				<view class="flex re-item" v-for="(record, index) in recordList" :key="index">
					<view @click="toOrderDetail(record)" class="order-num text-center flex-twice text-blue">{{ record.numberOfPeriod }}</view>
					<view class="text-center flex-twice">{{ record.amount * 2 }} </view>
					<view class="text-center flex-sub">{{ record.bonus }}</view>
					<view @click="deleteOrder(record)" class="text-center flex-sub " :class="{ 'text-green': record.status_cn === '已派奖' }">{{ record.status_cn }}</view>
				</view>
			</view>
			<view v-if="!lineNum" class="tip-box"><LoadMoreTip @loadmore="loadmore" :isShowAll="isShowAll" /></view>
		</view>
	</view>
</template>

<script>
import LoadMoreTip from '@/components/lesystem/LoadMoreTips.vue';
export default {
	props: {
		isShowNoDataIcon: {
			type: Boolean,
			default: () => true
		},
		lineNum: {
			type: Number,
			default: () => 0
		}
	},
	data() {
		return {
			curid: 0,
			curname: '',
			isShowAll: false,
			titles: ['彩种期号', '投注金额', '奖金', '操作'],
			recordList: [],
			num: 20
		};
	},
	components: {
		LoadMoreTip
		// TitleList
	},


	created() {
		this.initPage();
		this.initData();
	},

	methods: {
		async cancelOrder(record) {
			let confirmObj = {
				content: '即将撤销一笔订单，确定要继续操作吗？'
			};
			let flag = await this.$util.showConfirm(confirmObj);
			if (flag) {
				this.toOrderDetail(record);
			}
		},
		initPage() {
			let { id, frontShowName, categoryCode } = uni.getStorageSync('indexGame');
			this.curid = id;
			this.curname = frontShowName + (categoryCode === 'CREDIT_' ? '[信]' : '[官]');
		},
		async toOrderDetail(record) {
			let { orderId, numberOfPeriod, status_cn } = record;
			uni.navigateTo({
				url: `/pages/games/common/RecordOrderDetail?orderId=${orderId}&pid=${numberOfPeriod}&status=${status_cn}`
			});
		},
		async deleteOrder(item) {
			// periodStatus =0或者（periodstatus=1 &&orderStatus=1）是
			if (item.periodStatus === 0 || (item.periodStatus === 1 && item.orderStatus === 1)) {
				let flag = await this.$confirm({
					msg: '是否要撤销该笔单？'
				});
				if (!flag) {
					return;
				}
				let { gameId, orderId } = uni.getStorageSync('indexGame');
				let obj = {
					url: this.$api.revokeOrder,
					data: {
						gameId,
						ids: item.orderId
					}
				};
				let res = await this.$http(obj);
				if (res.code === -1) {
					await this.$confirm({
						msg: res.message,
						textColor: 'red',
						isShowLeftBtn: false
					});
				} else {
					await this.$confirm({
						msg: res.message,
						textColor: 'green',
						isShowLeftBtn: false
					});
				}
			}
		},
		async loadmore() {
			this.num === 20 ? (this.num = 40) : (this.num += 40);
			let res = await this.getData();
			this.recordList = res.data;
			if (this.recordList.length === this.num) {
				this.isShowAll = true;
			} else {
				this.isShowAll = false;
			}
		},
		async initData() {
			if (this.lineNum === 3) {
				this.num = this.lineNum;
			} else {
				this.num = 20;
			}
			let res = await this.getData();
			this.recordList = res.data;
			if (this.recordList.length === 20) {
				this.isShowAll = true;
			}
		},
		getData() {
			let routes = getCurrentPages()
      let { id } = routes[routes.length - 1].options
			let obj = {
				url: this.$api.getHistoryOrdersForMobile,
				data: {
					gameId: id,
					num: this.num
				}
			};
			return this.$http(obj);
		}
	}
};
</script>

<style lang="scss" scoped>
.record {
	height: 100%;
	.title-bg {
		// padding: 15rpx 20rpx;
		.title-item {
			width: 100%;
			background-color: #3c3c3c;
			color: #fff;
			height: 70rpx;
			line-height: 70rpx;
			padding: 0 5rpx;
			border-right: 1px solid gray;
			// padding: 15rpx 20rpx;
		}
	}

	.main-body {
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;

		.body-content {
			height: 100%;
			overflow: scroll;
		}
		.tip-box {
			flex: 0 0 100rpx;
		}
		.re-item {
			padding: 10rpx 0;
			border-bottom: 1px solid #ccc;
			.order-num {
				// text-decoration: underline;
			}
		}
	}

	.loadmore {
	}
}
</style>
