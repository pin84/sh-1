<template class="">
	<view class="main">
			<view class="cells-title ns-text-color-gray">会员名称：{{member_info.user_info.nick_name}}</view>
			<view class="cells">
				<view class="cell">
					<view class="cell-bd cell-primary">
						<text class="ns-text-color-black">股东等级：{{partner.level_name}}</text>
					</view>
					<view class="cell-ft ns-text-color">分红比率&nbsp;:&nbsp;{{partner.commission_rate}}</view>
				</view>
			</view>
			
			<view class="cells-title ns-text-color-gray">佣金</view>
			<view class="cells cells-access">
				<navigator class="cell" url="/distributionpages/account_detail/account_detail?type_id=4">
					<view class="cell-bd cell-primary">
						<text class="ns-text-color-black">股东分红</text>
					</view>
					<view class="cell-ft ns-text-color">¥{{partner.commission_partner}}</view>
					<view class="iconright iconfont ns-text-color-gray ns-font-size-sm"></view>
				</navigator>
			</view>
			
		</view>
	</view>
</template>

<script>
import http from 'common/js/http.js';
export default {
	data() {
		return {
			member_info : {'user_info' : {'nick_name' : ''}},
			partner : {},
		};
	},
	async onShow() {
		this.token = uni.getStorageSync('token');
		if (this.token) {
			this.getMemberInfo();
			this.getPartnerDetail();
		}
	},
	mixins: [http],
	onLoad(data) {

	},
	methods: {
		
		/**
		 * 股东信息
		 */
		getPartnerDetail() {
			this.sendRequest({
				url: 'System.Distribution.partnerDetail',
				success: res => {
					if (res.code == 0) {
						this.partner = res.data;
					}
				}
			});
		},
		
		/**
		 * 会员信息
		 */
		getMemberInfo() {
			this.sendRequest({
				url: 'System.Member.memberInfo',
				success: res=> {
					if (res.code == 0) {
						this.member_info = res.data;
					}
				}
			})
		}

	}
};
</script>

<style lang="scss">
	.cells-title {
	    margin: 0 0 0;
	    padding: 16rpx 8rpx 5rpx 20rpx;
	}
	.cells {
	    position: relative;
	    line-height: 1.41176471;
	    background-color: #fff;
	}
	.cell {
	    padding: 15rpx 20rpx;
	    position: relative;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    -ms-flex-align: center;
	    align-items: center;
	}
	.cell-ft {
	    text-align: right;
	}
	.cell-primary {
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    -ms-flex: 1;
	    flex: 1;
	}
	.main {
		/*  #ifdef H5 */
		height: calc(100vh - 44px);
		/*  #endif  */
		/*  #ifdef MP */
		height: calc(100vh - 0px);
		/*  #endif  */
	}
	
</style>
