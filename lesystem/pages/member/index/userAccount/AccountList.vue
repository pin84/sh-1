<template>
	<view class="accountList">
		<view class="flex bg-gray text-center row-line">
			<view class="flex-sub ">
				日期
			</view>
			<view class="flex-sub ">
				彩票投注
			</view>
			<view class="flex-sub ">
				彩票盈亏
			</view>
			<view class="flex-sub ">
				详情
			</view>
		</view>

		<scroll-view class="list-view bg-white" scroll-y >
			<block v-for="(item,index) in accountList.listReport" :key="index" v-if="accountList.listReport">
				<view class="flex bg-white text-center row-line" @tap="showDetail(index)">
					<view class="flex-sub ">
						{{item.days}}
					</view>
					<view class="flex-sub ">
						{{stringToFloat(item.buyTotal, 3)}}
					</view>
					<view class="flex-sub ">
						{{stringToFloat(item.winLoss, 3)}}
					</view>
					<view class="flex-sub " >
						<i class="iconfont iconsize icon-xiangyou text-gray" :class="listDetailShow[index]? 'arrow-bottom':''"></i>
					</view>
				</view>
				<view v-if="listDetailShow[index]">
					<view class="flex bg-gray text-center row-line">
						<view class="flex-sub ">
							提款
						</view>
						<view class="flex-sub ">
							{{stringToFloat(item.withdrawAmount, 3)}}
						</view>
						<view class="flex-sub ">
							充值
						</view>
						<view class="flex-sub ">
							{{stringToFloat(item.rechargeAmount, 3)}}
						</view>
					</view>
					<view class="flex bg-gray text-center row-line">
						<view class="flex-sub ">
							彩票中奖
						</view>
						<view class="flex-sub ">
							{{stringToFloat(item.zhongBonus, 3)}}
						</view>
						<view class="flex-sub ">
							代理返点
						</view>
						<view class="flex-sub ">
							{{stringToFloat(item.agentFadian, 3)}}
						</view>
					</view>
					<view class="flex bg-gray text-center row-line">
						<view class="flex-sub  col-4">
							投注返点
						</view>
						<view class="col-4">
							
						</view>
						<view class="col-4">
							
						</view>
						<view class="flex-sub  col-4">
							{{stringToFloat(item.fanDian, 3)}}
						</view>
					</view>
				</view>
			</block>
			<view class="row-line no-border text-center" v-if="!accountList.listReport || accountList.listReport.length == 0">
				<text class="flex-sub  text-gray text-lg">
					暂无数据
				</text>
			</view>
			<view class="total-bar" v-if="accountList.listReport && accountList.listReport.length > 0">
				<view class="flex  bg-grey text-center  row-line" v-if="accountList.total" @tap="showDetail('total')">
					<view class="flex-sub bg-green ">
						总计
					</view>
					<view class="flex-sub text-white ">
						{{stringToFloat(accountList.total.buyTotal, 3)}}
					</view>
					<view class="flex-sub text-white">
						{{stringToFloat(accountList.total.winLoss, 3)}}
					</view>
					<view class="flex-sub text-white " >
						<i class="iconfont iconsize icon-xiangyou text-white" :class="listDetailShow['total']? 'arrow-bottom':''"></i>
					</view>
				</view>
				<view v-if='listDetailShow["total"]'>
					<view class="flex bg-gray text-center row-line" v-for="(item,index) in totalDetailItem" :key="index">
						<view class="flex-sub  col-2">
							{{item.name}}
						</view>
					
						<view class="flex-sub  col-2">
							{{stringToFloat(accountList.total[item.key], 3)}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listDetailShow: {},
				totalDetailItem: [
					{name:'提款', key: 'withdrawAmount'},
					{name:'充值', key: 'rechargeAmount'},
					{name:'彩票中奖', key: 'zhongBonus'},
					{name:'代理返点', key: 'agentFadian'},
					{name:'投注返点', key: 'fanDian'},
				],
			}
		},
		props: {
			'accountList': {
				type: Object
			}
		},
		methods: {
			showDetail(index) {        //显示详情
				let value = this.listDetailShow[index];
				value = value == null ? false : value;
				this.$set(this.listDetailShow, index, !value);
				for (let key in this.listDetailShow) {
					if(key != index) {
						this.$set(this.listDetailShow, key, false);
					}
				}
				
			},
			stringToFloat(str, fixNum){             //设置number小数位，返回string类型
				if(str == null || str == '')
				{
					return 0;
				}
				str = '' + str;       //转换成字符串处理
				let number = Number.parseFloat(str);
				if (fixNum > 0)
				number = number.toFixed(fixNum);
				return Number.parseFloat(number);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.accountList {
		.row-line {
			height: 50px;
			border-bottom: 1px solid #f0f0f0;
			&:last-child,
			&.no-border{
				border-bottom: none;
			}
			.flex-sub {
				line-height: 50px;
			}
		}
		
		.bg-gray.row-line{
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
		// .total-bar {
		// 	position: fixed;
		// 	bottom: 0;
		// 	width: 100%;
		// }
	}
</style>
