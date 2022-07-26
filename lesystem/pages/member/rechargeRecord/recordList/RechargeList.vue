<template>
	<view class="recharge-list">
		<view class="flex bg-gray text-center row-line border-bottom">
			<view class="flex-sub ">
				日期
			</view>
			<view class="flex-sub ">
				用户名
			</view>
			<view class="flex-sub ">
				充值金额
			</view>
			<view class="flex-sub ">
				充值状态
			</view>
			<view class="flex-sub ">
				详情
			</view>
		</view>
		
		<scroll-view class="list-view bg-white" scroll-y >
			<view class="flex bg-gray border-bottom total-style">
				<view class="flex-sub">
					小计：<text class="text-red">{{rechargeList.page_total.page_number}}</text>笔
				</view>
				<view class="flex-sub">
					<view class="">
						充值成功：
					</view>
					<text class="text-red">
						{{stringToFloat(rechargeList.page_total.page_success_amount,3)}}
					</text>
					<view class="">
						优惠：
					</view>
					<text class="text-red">
						{{stringToFloat(rechargeList.page_total.page_rebate,3)}}
					</text>
				</view>
				<view class="flex-sub">
					<view class="">
						充值失败：
					</view>
					<text class="text-red">
						{{stringToFloat(rechargeList.page_total.page_fail_amount,3)}}
					</text>
					<view class="">
						实际充值金额：
					</view>
					<text class="text-red">
						{{stringToFloat(rechargeList.page_total.page_actual_amount,3)}}
					</text>
				</view>
			</view>
			<view class="flex bg-gray  total-style" >
				<view class="flex-sub">
					总计：<text class="text-red">{{rechargeList.total.totalNumber}}</text> 笔
				</view>
				<view class="flex-sub">
					<view class="">
						充值成功：
					</view>
					<text class="text-red">
						{{stringToFloat(rechargeList.total.totalSuccessMoney,3)}}
					</text>
					<view class="">
						优惠：
					</view>
					<text class="text-red">
						{{stringToFloat(rechargeList.total.totalRebate,3)}}
					</text>
				</view>
				<view class="flex-sub">
					<view class="">
						充值失败：
					</view>
					<text class="text-red">
						{{stringToFloat(rechargeList.total.totalFailedAmount,3)}}
					</text>
					<view class="">
						实际充值金额：
					</view>
					<text class="text-red">
						{{stringToFloat(rechargeList.total.totalActualAmount,3)}}
					</text>
				</view>
			</view>
			
			<view class="cu-list menu" v-if="rechargeList.list.length > 0">
				<block v-for="(item,index) in rechargeList.list">
					<view class="cu-item" @tap="toggleDetail(item.recharge_id)">
						<view class="line-height1">
							<view class="line-height1 margin-bottom-xs">
								{{item.deposit_date.split(' ')[0]}}
							</view>
							<text class="">
								{{item.deposit_date.split(' ')[1]}}
							</text>
						</view>
						<view class="text-cut width-limit">
							{{item.username}}
						</view>
						<view class="text-cut width-limit">
							{{stringToFloat(item.amount, 3)}}
						</view>
						<view class="">
							<text :class="item.statcn == '充值失败'? 'text-red' : 'text-green'">
								{{item.statcn}}
							</text>
						</view>
						<view class="">
							<text class="iconfont iconsize icon-xiangyou" :class="listDetail[item.recharge_id]? 'arrow-bottom' : ''"></text>
						</view>
					</view>
					<view class="bg-gray padding-sm" v-show="listDetail[item.recharge_id]">
						<view class="">
							订单编号：{{item.recharge_id}}
						</view>
						<view class="grid col-2">
							<view class="">
								充值方式：
								<text class="text-green">
									{{item.paytypecn}}
								</text>
							</view>
							<view class="">
								入款手续费：
								<text class="text-green">
									{{stringToFloat(item.deposit_fee, 3)}}
								</text>
							</view>
							<view class="">
								优惠：
								<text class="text-red">
									{{stringToFloat(item.rebate, 3)}}
								</text>
							</view>
							<view class="flex">
								<view class="">
									实际充值金额：
								</view>
								<view class="flex-sub text-cut">
									{{stringToFloat(item.actual_amount , 3)}}
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="margin-top-sm margin-bottom-sm" v-if="page < pageCount">
				<view class="flex flex-direction margin-top-df">
					<button class='cu-btn bg-green radius lg shadow-blur' @tap="showMore">查看更多</button>
				</view>
				<view class="text-center margin-top-xs" v-show="page > 1">
					<text >第 {{page}}/{{pageCount}} 页</text>
				</view>
			</view>
			<view class="text-center text-grey margin-top-sm padding-bottom" v-else-if="page !== 1 || rechargeList.list.length == 0">
				<text>已全部加载~</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listDetail: {}
			};
		},
		props: {
			'page': Number,
			'pageCount': Number,
			'rechargeList': Object
		},
		methods:{
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
			},
			toggleDetail(recharge_id){       //展示收起详情
				let value = this.listDetail[recharge_id];
				value = value ? true : false;
				for (let i=0; i<this.rechargeList.list.length; i++) {
					let id = this.rechargeList.list[i].recharge_id;
					if (id != recharge_id) {
						this.$set(this.listDetail, id, false);
					} else {
						this.$set(this.listDetail, recharge_id, !value);
					}
				}
				
				
			},
			showMore() {      //查看更多
				this.$emit('showMore');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recharge-list {
		.row-line {
			height: 50px;
			.flex-sub {
				line-height: 50px;
			}
		}
		.total-style {
			text-align: center;
			justify-items: center;
			align-items: center;
			padding: 5px 0;
		}
		
		.border-bottom {
			border-bottom: 1px solid #fff;
		}
		
		.list-view {
			height: calc(100vh - 270rpx - var(--status-bar-height) - var(--window-top));
		}
		
		.width-limit {
			max-width: 18%;
		}
		.line-height1 {
			line-height: 1;
		}
		
		.icon-xiangyou {
			display: inline-block;
			transition: transform .2s ease-in-out;
		}
		
		.arrow-bottom {
			transform: rotateZ(90deg);
		}
	}
</style>
