<template>
	<view class="page-body">
		<block v-if="loadingType == 'noMore'">
			<block v-if="bankCardList.length != 0">
				<view class="list">
					<view class="item" v-for="(item, index) in bankCardList" :key="index">
						<view class="left">
							<text class="ns-font-size-lg">{{item.bank_name}}<text class="ns-font-size-sm" :class="item.enable=='1'?'normal':'wait'">{{item.enable=='1'?'正常':'待审核'}}</text></text>
							<text class="ns-text-color-gray">{{item.account}}</text>
						</view>
						<view class="right">
							<text class="ns-font-size-lg">{{item.card_owner}}</text>
							<text class="ns-text-color-gray">{{item.addtime}}</text>
						</view>
					</view>
				</view>
			</block>
			<block v-else>
				<view class="list noItem">
					<view>
						<text class="iconfont iconiconfontzhizuobiaozhun023132"></text>
					</view>
					<view>
						<text>抱歉，你还没有一张银行卡！</text>
					</view>
				</view>
			</block>
			<button @click="addBankCard">+ 添加银行卡</button>
		</block>
		<uni-load-more v-if="loadingType == 'loading'" :status="loadingType" :contentText='contentText'></uni-load-more>
	</view>
</template>

<script>
	import http from '@/common/js/http.js';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				loadingType: 'loading',
				contentText: {
					contentrefresh: '正在加载...',
					contentnomore: ''
				},
				bankCardList:[]
			}
		},
		methods: {
			getMemberBankCardList(){
				this.sendRequest({
					url: 'System.Member.getMemberBankCardList',
					data: {},
					success: res =>{
						if(res.code == 0){
							this.bankCardList = [];
							Object.keys(res.data).forEach(key => {
								let item = res.data[key];
								this.bankCardList.push({
									bank_name: item.bank_name,
									enable: item.enable,
									account: item.account.replace(/^(\d{4})\d+(\d{4})$/,"$1********$2"),
									card_owner: item.card_owner,
									addtime: item.addtime
								});
							})
							this.loadingType = 'noMore';
						}
					}
				})
			},
			addBankCard(){
				this.$util.redirectTo('/pages/member/bankCard/addBankCard/addBankCard', {}, '');
			}
		},
		onLoad(){
			this.getMemberBankCardList();
		},
		mixins: [http]
	}
</script>

<style lang="scss" scoped>
.page-body{
	min-height: 100vh;
	background-color: white;
	/* #ifdef H5 */
	min-height: calc(100vh - 44px);
	/* #endif */
	
	.list{
		box-sizing: border-box;
		height: calc(100vh - 208rpx);
		overflow: scroll;
		
		.item{
			display: flex;
			padding: 20rpx;
			border-bottom: 2rpx solid #ddd;
			
			view{
				display: flex;
				flex-direction: column;
				flex-grow: 1;
			}
			
			.left{
				text{
					text{
						color: white;
						padding: 4rpx 8rpx;
						border-radius: 4rpx;
						margin-left: 30rpx;
					}
					
					.normal{
						background-color: #18BC03;
					}
					
					.wait{
						background-color: #aaa;
					}
				}
			}
			
			.right{
				text-align: right;
			}
		}
	}
	
	.noItem{
		view{
			text-align: center;
		}
		
		view:nth-child(1){
			padding: 160rpx 0 20rpx;
			
			text{
				font-size: 70rpx;
			}
		}
	}
	
	button {
		height: 80rpx;
		margin: 0 30rpx;
		border: none;
		background-color: #FF0036;
		color: white;
		position: fixed;
		bottom: 20rpx;
		left: 0;
		right: 0;
	}
}
</style>
