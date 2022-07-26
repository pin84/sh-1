<template>
	<view>
		<view v-if="src!=''">
			<web-view :src="src" :webview-styles="webviewStyles"></web-view>
		</view>
		<view v-if="isOpenNewWindow">
			<view class="kefu-container">
				<view style="display: flex;flex-direction:column">
				<view>您已经在浏览器打开，请切换到新浏览器窗口或:</view>
				<view><button @click="openURL">重新连接客服</button></view>
				</view>
			</view>
		</view>
	</view>


</template>

<script>
	import http from 'common/js/http.js';
	//import htmlParser from '@/common/js/html-parser';
	export default {
		data() {
			return {
				src: '',
				isOpenNewWindow: false,
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}

		},
		mixins: [http],
		methods: {
			openURL() {
            let kefu_address = this.$util.getKefuURL();
			//console.log(kefu_address);
			// #ifdef APP-PLUS  
			plus.runtime.openURL(kefu_address);
			//_this.src = res.data.url;
			// #endif
			}
		},
		onLoad() {
			let kefu_address = this.$util.getKefuURL();
			// #ifdef APP-PLUS  
			this.isOpenNewWindow=true;
			plus.runtime.openURL(kefu_address);
			// #endif

			// #ifdef H5
			if (kefu_address != null && kefu_address != undefined && kefu_address != '') {
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
			 //#endif

		}
	}
</script>

<style lang="scss" scoped>
	.kefu-container {
		min-height: 100vh;
		background: url(/static/images/2020/kefubg.jpg) no-repeat top;
		background-size: cover;
		text-align: center;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-align: center;
		align-items: center;
		-ms-flex-pack: center;
		justify-content: center;
	}
</style>
