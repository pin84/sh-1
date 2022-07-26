<template>
	<view>
		<view class="items" v-if="accountRecordsList.length > 0">
			<view v-for="item in accountRecordsList" :key="item.id" class="item ns-border-color-gray">
				<view>
					<view>{{ item.type_name }}</view>
					<view class="ns-text-color-gray">{{ $util.timeStampTurnTime(item.create_time) }}</view>
				</view>
				<view class="price ns-text-color">￥{{ item.money }}</view>
			</view>
		</view>
		<view v-if="isEmpty" class="empty">
			<view class="iconfont iconyue ns-padding-bottom"></view>
			<view class="ns-text-color-gray">您还没有佣金...</view>
		</view>
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
			accountRecordsList: [],
			isEmpty:false
		};
	},
	onShow(e) {},
	mixins: [http],
	onLoad(e) {
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
		
		var type_id = e.type_id;
		this.getAccountRecordsList(type_id);
	},
	methods: {
		getAccountRecordsList(id) {
			this.sendRequest({
				url: 'System.Distribution.accountRecordsList',
				data: { type_id: id },
				success: res => {
					if (res.code == 0) {
						this.accountRecordsList = res.data.account_records_detail;
						if(this.accountRecordsList.length == 0){
							this.isEmpty = true;
						}else{
							this.isEmpty = false;
						}
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.items{
	background: #fff;
	overflow: hidden;
}
.item {
	border-top: 2rpx solid;
	display: flex;
	justify-content: space-between;
	margin: $ns-margin;
	padding-top:$ns-padding;
	height: 100rpx;
	background:#fff;
}
.price {
	color: $base-color;
}
</style>
