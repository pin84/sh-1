<template>
	<view>
		<view class="ns-padding ns-text-color-gray">会员名称：{{memberInfo.user_info.nick_name}}</view>
		<view class="ns-bg-fff">
			<view class="ns-padding">代理类型：{{regionAgent.agent_name}}</view>
			<view class="ns-padding">代理地区：{{regionAgent.address_info}}</view>
			<view class="ns-padding">佣金比率：{{regionAgent.rate}}%</view>
		</view>
		<view class="ns-padding ns-text-color-gray">佣金</view>
		<navigator url="/distributionpages/account_detail/account_detail?type_id=2" class="ns-padding ns-bg-fff gold">
			<view>区域代理佣金</view>
			<view>
				<text class="ns-text-color">￥{{regionAgent.commission_region_agent}}</text>
				<text class="iconright iconfont ns-text-color-gray ns-font-size-sm"></text>
			</view>
		</navigator>
		<ns-login ref="login" href="distribution"></ns-login>
	</view>
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
			regionAgent:{
				agent_name:'',
				address_info:'',
				rate:0,
				commission_region_agent:0
			},
			memberInfo:{
				user_info:{
					nick_name:''
				}
			}
		};
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
		
		this.getRegionAgentDetail();
		this.getMemberInfo();
	},
	onLoad(data) {},
	mixins: [http],
	methods: {
		getRegionAgentDetail(){
			this.sendRequest({
				url: 'System.Distribution.regionAgentDetail',
				success: res => {
					if(res.code == 0){
						this.regionAgent = res.data;
					}
				}
			});
		},
		getMemberInfo(){
			this.sendRequest({
				url: 'System.Member.memberInfo',
				success: res => {
					if(res.code == 0){
						this.memberInfo = res.data;
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
	.ns-bg-fff{
		background:#fff;
	}
	.gold{
		display: flex;
		justify-content: space-between;
	}
</style>
