<template>
	<view>
	<view v-if="src!=''">
		<web-view :src="src" :webview-styles="webviewStyles"></web-view>
	</view>
	<view v-if="isOpenNewWindow">
		<view class="kefu-container">
			<view style="display: flex;flex-direction:column">
			<view>您已经在浏览器打开游戏</view>
			<view>请切换到新浏览器窗口或返回首页</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import http from 'common/js/http.js';
	export default {
		data() {
			return {
				gameId:-1,
				channelId:'',
				thirdpartyUrl:'',
				src:'',
				isOpenNewWindow:false,
				webviewStyles: {
					progress: {
						color: '#FF3333'
					},
					isOpen:true
				}
			}
		},
		mixins: [http],
		methods: {
			initilCloseButton(){
				// #ifdef APP-PLUS
				this.closeDrawer();
				this.showClosedDrawerIcon();
				this.initialSubnvueEvent();
				// #endif
				
			},
			showDrawer() {
				// #ifdef APP-PLUS
				uni.getSubNVueById('drawer').show('slide-in-left', 200);
				// #endif
			},
			showClosedDrawerIcon(){
				// #ifdef APP-PLUS
				uni.getSubNVueById('closeddrawer').show('slide-in-left', 200);
				// #endif
			},
			closeDrawer() {
				// #ifdef APP-PLUS
				let closedIconSubNVue = uni.getSubNVueById('drawer');
				closedIconSubNVue.hide('fade-out', 200)
				// #endif
			},
			closeClosedDrawerIcon() {
				// #ifdef APP-PLUS
				let closedIconSubNVue = uni.getSubNVueById('closeddrawer');
				closedIconSubNVue.hide('fade-out', 200)
				// #endif
			},
			initialSubnvueEvent(){
				// #ifdef APP-PLUS
				uni.$on('drawer-page', (data) => {
					if(data=='open'){
						this.closeClosedDrawerIcon();
						this.showDrawer();
					}
					else if(data=='hide'){
						this.showClosedDrawerIcon();
					}
					else if(data=='back'){
						uni.switchTab({
							url:"/pages/index/index/index"
						})
					}
					// else if(data=='refresh'){
					// 	console.log("refresh")
					// 	var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
					// 	var wv = currentWebview.children()[0]
					// 	wv.reload();
					// }
					
					
				});
				// #endif
			},
			getWapPageLayout() {
				
				uni.showLoading({
					title: '加载中...'
				});
				this.sendRequest({
					url: 'Pc.ThirdPartyGame.getThirdPartyGameLoginUrl',
					data: { gameId: this.gameId, channelId: this.channelId},
					success: res => {
						uni.hideLoading();
						if (res.code == 0) {
						this.thirdpartyUrl=res.data;
						//console.log(this.thirdpartyUrl)
						if(this.thirdpartyUrl!=undefined&&this.thirdpartyUrl!=""){
							this.thirdpartyUrl = this.thirdpartyUrl.trim();
						}
						// #ifdef APP-PLUS
						plus.screen.unlockOrientation();
						plus.navigator.setFullscreen(true);
						if (this.isOpenNewWindow) {
							plus.runtime.openURL(encodeURI(this.thirdpartyUrl));

						} else {
							this.src = this.thirdpartyUrl;
						}
						// #endif
						// #ifdef H5
						location.href =this.thirdpartyUrl; 
						// #endif
						
						// uni.switchTab({
						// 	url:"/pages/index/index/index"
						// })
						}
						else{
							uni.showModal({
								title:'错误',
								content:res.message,
								showCancel:false
							});
						}
					}
				});
			}
		},
		onPullDownRefresh() {
			this.getWapPageLayout();
		},
		onReady() {
			//this.showClosedDrawerIcon();
		},
		onResize(){
			// #ifdef APP-PLUS
			this.initilCloseButton();
			uni.getSystemInfo({  
			                success: function(res) {  
			                    if (res.windowWidth > res.windowHeight) {  
			                        //console.log('横屏'); 
									plus.navigator.setFullscreen(true);
			                    } 
			                }  
			});
			 // #endif
		},
		onLoad(data) {
			if (data.gameId != undefined && data.gameId != '') {
				this.gameId=data.gameId;
			}
			if (data.channelId != undefined && data.channelId != '') {
				this.channelId=data.channelId;
			}
			if (data.isOpenNewWindow != undefined && data.isOpenNewWindow != ''&&data.isOpenNewWindow==1) {
				this.isOpenNewWindow=true;
			}
			if(this.channelId!=''&& this.gameId!=-1){
				
				this.getWapPageLayout();
				this.closeDrawer();
				this.closeClosedDrawerIcon();
				setTimeout(() => {
					this.initilCloseButton();
				}, 4000);
				
			}
			
			else{
				uni.showToast({
					title:'参数错误'
				});
			}
			
		},
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
