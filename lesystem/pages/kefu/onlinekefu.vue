<template>
	<view v-if="src!=''">
		<web-view :src="src" :webview-styles="webviewStyles"></web-view>
	</view>
</template>

<script>
	import http from 'common/js/http.js';
	//import htmlParser from '@/common/js/html-parser';
	export default {
		data() {
			return {
				src: '',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}

		},
		mixins: [http],
		methods: {

		},
		onShow() {
			let kefu_address = uni.getStorageSync("kefu");
			if (kefu_address != null && kefu_address != undefined && kefu_address != '') {
				//console.log("kefu is ok");
				this.src = kefu_address;
			} else {
				uni.showLoading({
					title: '客服加载中...'
				});
				this.sendRequest({
					url: 'System.CustomerService.getCustomerService',
					success: res => {
						if (res.data && res.data.kefu_address) {
							this.src = res.data.kefu_address;
						} else {
							this.$util.showToast({
								title: "客服加载失败，请重试"
							});
						}
						uni.hideLoading();
					}
				});
			}

		}
	}
</script>

<style>

</style>
