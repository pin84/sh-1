<template>
	<scroll-view scroll-y="true" class="container">
		<block v-if="config.is_partner_enable">
			<block v-if="applyInfo.level_isexist">
				<block v-if="applyInfo.agent_type == 2">
					<!-- 未申请 -->
					<view class="apply-steps">
						<view class="step first is-in">
							<view class="line"></view>
							<view class="point"></view>
							<text class="text">提交股东申请</text>
						</view>
						<view class="step">
							<view class="line"></view>
							<view class="point"></view>
							<text class="text">等待审核</text>
						</view>
						<view class="step last">
							<view class="line"></view>
							<view class="point"></view>
							<text class="text">申请成功</text>
						</view>
					</view>
					<view class="apply-wrap">
						<view class="tit"><text>股东协议</text></view>
						<view class="cont">
							<text>在成为股东期间，所有股东应该根据总店的政策和决意走。</text>
						</view>
					</view>		
					<view class="apply-wrap">
						<view class="tit"><text>申请条件</text></view>
						<view class="cont">
							<view class="condition">
								<text>条件一：成为本店推广员</text>
								<text class="ns-text-color status">已完成</text>
							</view>
							<view class="condition">
								<text>条件二：最低消费满<text class="ns-text-color">￥{{applyInfo.shop_sale_money}}</text>元，已消费<text class="ns-text-color">￥{{userConsume}}</text></text>
								<text class="status" :class="{'ns-text-color': isMeet}">{{isMeet ? '已完成' : '未完成'}}</text>
							</view>
						</view>
					</view>
					<button type="primary" @click="applayPartner" v-if="isMeet">立即申请</button>
				</block>
				<block v-else-if="applyInfo.agent_type == 0 || applyInfo.agent_type == -1">
					<!-- 审核中 审核未通过-->
					<view class="apply-steps">
						<view class="step first is-process">
							<view class="line"></view>
							<view class="point"></view>
							<text class="text">提交股东申请</text>
						</view>
						<view class="step is-in">
							<view class="line"></view>
							<view class="point"></view>
							<text class="text">等待审核</text>
						</view>
						<view class="step last">
							<view class="line"></view>
							<view class="point"></view>
							<text class="text">申请成功</text>
						</view>
					</view>
					<view class="apply-wrap">
						<view class="not-opened">
							<view class="img"></view>
							<text class="ns-font-size-sm ns-text-color-gray" v-if="applyInfo.agent_type == 0">审核中请耐心等待</text>
							<text class="ns-font-size-sm ns-text-color-gray" v-if="applyInfo.agent_type == -1">申请未通过可<text class="ns-text-color" @click="againApply">重新申请</text></text>
						</view>
					</view>
				</block>
				<block v-else-if="applyInfo.agent_type == 1">
					<!-- 审核通过 -->
					<view class="apply-steps">
						<view class="step first is-process">
							<view class="line"></view>
							<view class="point"></view>
							<text class="text">提交股东申请</text>
						</view>
						<view class="step is-process">
							<view class="line"></view>
							<view class="point"></view>
							<text class="text">等待审核</text>
						</view>
						<view class="step last is-in">
							<view class="line"></view>
							<view class="point"></view>
							<text class="text">申请成功</text>
						</view>
					</view>
					<view class="apply-wrap">
						<view class="not-opened">
							<view class="img"></view>
							<text class="ns-font-size-sm ns-text-color-gray">申请已通过，您已成为股东</text>
						</view>
					</view>
					<navigator url="/distributionpages/index/index"><button type="primary">前往推广中心</button></navigator>
				</block>
			</block>
			<block v-else>
				<view class="not-opened">
					<view class="img"></view>
					<text class="ns-font-size-sm ns-text-color-gray">暂未设置股东等级，请联系管理人员。</text>
				</view>
			</block>
		</block>
		<block v-else>
			<view class="not-opened">
				<view class="img"></view>
				<text class="ns-font-size-sm ns-text-color-gray">股东功能暂未开启，请联系管理人员。</text>
			</view>
		</block>
		<ns-login ref="login" href="distribution"></ns-login>
	</scroll-view>
</template>

<script>
import http from 'common/js/http.js';
import nsLogin from 'components/ns-login/ns-login.vue';

export default {
	components: {
		nsLogin
	},
	data() {
		return {
			applyInfo: {
				level_isexist: false
			},
			config: {
				is_partner_enable: 0
			},
			userConsume: '0.00',
			isMeet: false,
			isSub: false
		};
	},
	methods: {
		/**
		 * 获取股东申请信息
		 */
		getApplyInfo(){
			this.sendRequest({
				url: 'System.Distribution.checkApplyPartner',
				success: res => {
					this.applyInfo = res.data;
					this.getUserConsume();
				}
			})
		},
		/**
		 * 获取店铺推广设置
		 */
		getConfig(){
			this.sendRequest({
				url: 'System.Distribution.shopConfig',
				success: res => {
					this.config = res.data;
				}
			})
		},
		/**
		 * 获取用户消费
		 */
		getUserConsume(){
			this.sendRequest({
				url: 'System.Distribution.userConsume',
				success: res => {
					this.userConsume = res.data;
					this.isMeet = this.userConsume >= this.applyInfo.shop_sale_money;
				}
			})
		},
		/**
		 * 申请股东
		 */
		applayPartner(){
			if (this.isSub) return;
			this.isSub = true;
			this.sendRequest({
				url: 'System.Distribution.applyPartner',
				success: res => {
					if(res.data > 0){
						this.$util.showToast({ title: '股东申请成功' });
						this.getApplyInfo();
					}else{
						this.isSub = false;
						this.$util.showToast({ title: '股东申请失败' });
					}
				}
			})
		},
		/**
		 * 重新申请
		 */
		againApply(){
			this.applyInfo.agent_type = 2;
		}
	},
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
		
		this.getApplyInfo();
		this.getConfig();
	},
	mixins: [http]
};
</script>

<style lang="scss">
.container {
	width: 100%;
	height: 100vh;
}
.apply-steps{
	width: 100%;
	display: flex;
	padding: 80rpx 0 40rpx 0;
	
	.step{
		flex: 1;
		text-align: center;
		position: relative;
		overflow: hidden;
		padding-top: 40rpx;
		
		.text {
			font-size: 24rpx;
			color: $ns-text-color-gray;
		}
		
		.line {
			position: absolute;
			height: 2rpx;
			background: $ns-bg-color-gray;
			width: 100%;
			top: 20rpx;
		}
		
		.point {
			position: absolute;
			width: 12rpx;
			height: 12rpx;
			border-radius: 50%;
			background: $ns-bg-color-gray;
			top: 20rpx;
			left: 50%;
			transform: translateY(-50%);
		}
	}
	
	.first {
		.line,.point{
			left: 50%;
		}
	}
	
	.last {
		.line,.point{
			right: 50%;
		}
	}
	
	.is-process {
		.line {
			background: $base-color;
		}
		.point {
			background: $base-color;
		}
	}
	
	.is-in {
		.line {
			background: $base-color;
		}
		.point {
			background: #fff;
			border: 6rpx solid $base-color;
		}
	}
	
}
.apply-wrap{
	margin: 20rpx;
	border-radius: $ns-border-radius;
	background: #fff;
	padding: 0 20rpx;
	
	.tit {
		line-height: 70rpx;
		height: 70rpx;
		
		text{
			padding-left: 10rpx;
			border-left: 4rpx solid $base-color;
		}
	}
	
	.cont {
		padding: 0 0 20rpx 0;
		line-height: normal;
		
		.condition {
			position: relative;
			padding-right: 100rpx;
			
			.status{
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
			}
		}
		
		text{
			color: $ns-text-color-gray;
			font-size: $ns-font-size-sm;
			line-height: 1.3;
		}
	}
	
	.not-opened{
		margin: 0;
		padding: 40rpx 0;
		
		.img{
			margin-top: 0;
		}
	}
}
.not-opened {
	margin: 140rpx 40rpx 0 40rpx;
	text-align: center;
	
	.img {
		width: 220rpx;
		height: 220rpx;
		display: block;
		margin: 80rpx auto 0;
		background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAACpCAYAAAB0zJLvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZGMTREQkMzNTI0NzExRTc4RjMyQTA4MEEyQkFEOEVDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZGMTREQkM0NTI0NzExRTc4RjMyQTA4MEEyQkFEOEVDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkYxNERCQzE1MjQ3MTFFNzhGMzJBMDgwQTJCQUQ4RUMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkYxNERCQzI1MjQ3MTFFNzhGMzJBMDgwQTJCQUQ4RUMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz43nOhWAAARBElEQVR42uxd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) no-repeat center;
		background-size: 220rpx;
	}
}
</style>
