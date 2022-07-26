<template>
	<view class="ZRSX">
		<QpyxScreenBar @filterTap="filterTap" @tapCancelButton='tapCancelButton' @changeStartTime="changeStartTime"
			@changeEndTime="changeEndTime" :ShowCancelButton='false' />
		<QpyxFilterPanel v-show="filterPanelShow" :listDropItems='listDropItems' @submit="searchSubmit" />
		<!-- 折叠面板 -->
		<view class="flex bg-gray text-center padding-xs ">
			<view class="flex-sub">游戏名称</view>
			<view class="flex-sub">有效投注</view>
			<view class="flex-sub">盈亏金额</view>
			<view class="flex-sub">详情</view>
		</view>

		<scroll-view class="list-view bg-white" scroll-y>
			<view v-if="qpyxOrderList.length>0" class="bg-white  margin-top solid-bottom">
				<block v-for="(item,index) in qpyxOrderList" :key="index">
					<view class="flex bg-white text-center row-line" @tap="showDetail(index)">
						<view class="flex-sub ">
							{{item.gameName}}
						</view>
						<view class="flex-sub ">
							{{item.effectiveAmount}}
						</view>
						<view class="flex-sub ">
							{{item.winLossAmount}}
						</view>
						<view class="flex-sub ">
							<i class="iconfont iconsize icon-xiangyou text-gray"
								:class="listDetailShow[index]? 'arrow-bottom':''"></i>
						</view>
					</view>
					<view v-if="listDetailShow[index]">
						<view class="flex bg-gray row-line">
							<view class="flex-sub ">
								注单编号：{{item.orderNo}}
							</view>
							<view class="flex-sub ">
								投注时间：{{item.betTime}}
							</view>
						</view>
						<view class="flex bg-gray row-line">
							<view class="flex-sub ">
								游戏平台：{{item.gameHall}}
							</view>
							<view class="flex-sub ">
								游戏名称：{{item.gameName}}
							</view>
						</view>
						<view class="flex bg-gray row-line">
							<view class="flex-sub ">
								投注金额：{{item.betAmount}}
							</view>
							<view class="flex-sub ">
								有效投注：{{item.effectiveAmount}}
							</view>
						</view>
						<view class="flex bg-gray row-line">
							<view class="flex-sub ">
								中奖金额：{{item.bonus}}
							</view>
							<view class="flex-sub ">
								盈亏：{{item.winLossAmount}}
							</view>
						</view>
					</view>
				</block>
				<view class="flex bg-gray text-center row-line">
					<view class="flex-sub bg-gradual-green">
						小计：
					</view>
					<view class="flex-sub bg-black">
						{{subTotal.totalEffectiveAmount}}
					</view>
					<view class="flex-sub bg-black">
						{{subTotal.totalWinLossAmount}}
					</view>
					<view class="flex-sub bg-black"></view>
				</view>
				<view class="flex bg-gray text-center row-line">
					<view class="flex-sub bg-gradual-green">
						总计：
					</view>
					<view class="flex-sub bg-black ">
						{{total.totalEffectiveAmount}}
					</view>
					<view class="flex-sub bg-black">
						{{total.totalWinLossAmount}}
					</view>
					<view class="flex-sub bg-black"></view>
				</view>
				<view class="margin-top-sm margin-bottom-sm" v-if="page_index < pageCount">
					<view class="flex flex-direction">
						<button class="cu-btn bg-green lg shadow-blur" @tap="showMore">查看更多</button>
					</view>
					<view class="text-center margin-top-xs" v-show="page_index > 1">
						<text>第 {{page_index}}/{{pageCount}} 页</text>
					</view>
				</view>
				<view class="text-center no-more margin-top-sm" v-else-if="page_index !== 1">
					<text>已全部加载~</text>
				</view>
			</view>
			<view v-else class="text-center no-more margin-top-sm">暂无数据！</view>
		</scroll-view>
	</view>
</template>

<script>
	import QpyxScreenBar from './QpyxScreenBar'
	import QpyxFilterPanel from './QpyxFilterPanel'
	import http from 'common/js/http.js';
	export default {
		data() {
			return {
				filterPanelShow: false,
				listDropItems: [],
				filterData: '',
				qpyxOrderList: [],
				listDetailShow: {},
				total: {},
				subTotal: {},
				page: 1,
				pageCount: 0,
				page_size: 10,
				page_index: 1,
				SumeffectiveAmount: 0,
				SumwinLossAmount: 0,
				typeDropItems: '',
				startTime: '',
				endTime: ''
			};
		},
		components: {
			QpyxScreenBar,
			QpyxFilterPanel
		},

		methods: {
			tapCancelButton(v){
				console.log(v)
			},
			showMore() {
				if (this.page_index < this.pageCount) {
					this.page_index += 1;
					let postData = this.setPostData();
					this.requestData('System.Report.getChessCardBetRecord', postData, res => {
						this.qpyxOrderList.push(...res.data.list);
						this.computeSubtotal()
						this.$set(this.subTotal, 'totalEffectiveAmount', this.SumeffectiveAmount)
						this.$set(this.subTotal, 'totalWinLossAmount', this.SumwinLossAmount)
						// console.log(this.subTotal)
					});
				}
			},
			computeSubtotal() {
				this.SumeffectiveAmount = 0
				this.SumwinLossAmount = 0
				this.qpyxOrderList.forEach(item => {
					this.SumeffectiveAmount += item.effectiveAmount
					this.SumwinLossAmount += item.winLossAmount
				})
				// console.log(this.SumeffectiveAmount)
			},
			showDetail(index) { //显示详情
				let value = this.listDetailShow[index];
				value = value == null ? false : value;
				this.$set(this.listDetailShow, index, !value);
				for (let key in this.listDetailShow) {
					if (key != index) {
						this.$set(this.listDetailShow, key, false);
					}
				}
			},
			initPlatform() {
				// 初始化游戏平台数据
				this.requestData('System.Report.getPlatform', {
					channelCode: 'QPYX'
				}, res => {
					// 添加全部
					let allGame = {
						gameId: 0,
						gameName: '全部'
					}
					let _listDropItems = res.data
					_listDropItems.unshift(allGame)
					this.listDropItems = _listDropItems;
					// console.log(this.listDropItems)
				});
			},
			filterTap() { //点击筛选按钮
				this.filterPanelShow = !this.filterPanelShow;
			},
			searchSubmit(obj) { //提交搜索
				this.filterData = obj; //记录数据
				let postData = this.setPostData();
				postData.page_index = this.page_index;
				postData.page_size = this.page_size;
				console.log(postData);
				this.requestOrderList('System.Report.getChessCardBetRecord', postData, res => {
					this.filterPanelShow = false; //隐藏筛选面板
				});
			},
			changeStartTime(value) { //更改起始时间
				this.startTime = value;
				//请求订单
				let postData = this.setPostData();
				postData.page_index = this.page_index;
				postData.page_size = this.page_size;
				this.requestOrderList('System.Report.getChessCardBetRecord', postData, res => {
					this.filterPanelShow = false; //隐藏筛选面板
				});
			},
			changeEndTime(value) { //更改结束时间
				this.endTime = value;
				//请求订单
				let postData = this.setPostData();
				postData.page_index = this.page_index;
				postData.page_size = this.page_size;
				this.requestOrderList('System.Report.getChessCardBetRecord', postData, res => {
					this.filterPanelShow = false; //隐藏筛选面板
				});
			},
			requestOrderList(url, data, callback) { //请求订单列表
				this.requestData(url, data, res => {
					this.qpyxOrderList = res.data.list
					this.total = res.data.total
					this.subTotal = res.data.subTotal
					this.pageCount = res.data.page_count;
					if (callback) {
						callback(res);
					}
				});
			},
			setPostData() { //生成发送数据
				let postData = {};
				let keys = ['startTime', 'endTime', 'page_index', 'page_size'];
				for (let i = 0; i < keys.length; i++) {
					let key = keys[i];
					if (this[key] != '') {
						postData[key] = this[key];
					}
				}
				postData = Object.assign(postData, this.filterData);
				console.log(postData);

				return postData;
			},
			requestData(url, data, callback, failCallback) {
				uni.showLoading({
					title: '加载中...'
				});
				this.sendRequest({ //游戏订单请求
					url: url,
					data: data,
					success: res => {
						console.log(res);
						if (res.code == 0) { //成功返回
							if (callback)
								callback(res);
						} else {
							this.$util.showToast({
								title: res.message
							});
						}
					},
					fail: () => {
						if (failCallback) {
							failCallback();
						}
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
		},
		created() {
			this.initPlatform()
			//初始化棋牌游戏游戏
			let postData = uni.getStorageSync('postDateItem');
			if (postData) {
				this.startTime = postData[0]
				this.endTime = postData[1];
				this.requestOrderList('System.Report.getChessCardBetRecord', {
					startTime: this.startTime,
					endTime: this.endTime
				}, res => {});
			}
		},
		mixins: [http]
	};
</script>

<style lang="scss" scoped>
	.row-line {
		border-bottom: 1px solid #f0f0f0;

		&:last-child,
		&.no-border {
			border-bottom: none;
		}

		.flex-sub {
			font-size: 14px;
			padding: 8px 10px;
		}
	}

	.bg-gray.row-line {
		border-color: #fff;
	}

	.col-2 {
		width: 50%;
	}

	.col-4 {
		width: 25%;
	}

	.list-view {
		height: calc(100vh - 200rpx - var(--status-bar-height) - var(--window-top));

	}

	.icon-xiangyou {
		display: inline-block;
		transition: transform .2s ease-in-out;
	}

	.arrow-bottom {
		transform: rotateZ(90deg);
	}

	.no-more {
		color: #8cabb2;
	}
</style>
