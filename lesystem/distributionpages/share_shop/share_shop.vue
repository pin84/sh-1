<template>
	<view>
		<image :src="qrcodeImg" mode="widthFix"></image>
		<loading-cover ref="loadingCover"></loading-cover>
		<ns-login ref="login" href="distribution"></ns-login>
	</view>
</template>

<script>
import http from 'common/js/http.js';
import loadingCover from '@/components/loading/loading.vue';
import nsLogin from 'components/ns-login/ns-login.vue';

export default {
	components: {
		loadingCover,
		nsLogin
	},
	data() {
		return {
			qrcodeImg: '',
			uid: 0
		};
	},
	methods: {
		getShopQrcode() {
			let domain = '';
			// #ifdef H5
			let url = window.location.href;
			domain = url.split('#')[0];
			// #endif
			this.sendRequest({
				url: 'System.Distribution.userFxQrcode',
				data: {
					domain: domain
				},
				success: res => {
					if (res.code == 0 && res.data) {
						this.qrcodeImg = this.$util.img(res.data);
						if (this.$refs.loadingCover == undefined) return;
						this.$refs.loadingCover.hide();
					} else {
						this.$util.showToast({ title: res.message });
						setTimeout(() => {
							this.$util.redirectTo('/distributionpages/index/index', {}, '', 'redirectTo');
						}, 1500);
					}
				}
			});
		},
		/**
		 * 获取当前用户id
		 */
		getUserId() {
			if (uni.getStorageSync('token')) {
				this.sendRequest({
					url: 'System.Member.getUserId',
					success: res => {
						if (res.data) this.uid = res.data;
					}
				});
			}
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

		this.getShopQrcode();

		this.getUserId();
	},
	mixins: [http],
	/**
	 * 自定义分享内容
	 * @param {Object} res
	 */
	onShareAppMessage(res) {
		var path = '/distributionpages/user_shop_goods/user_shop_goods';
		if (this.uid) path += '?source_uid=' + this.uid;
		return {
			path: path,
			success: res => {},
			fail: res => {}
		};
	}
};
</script>

<style>
image {
	width: 100%;
}
</style>
