<template>
	<view class="app-download-body">
		<view class="header">
			<view class="logo">

			</view>
		</view>

		<div class="content-container">
			<div class="main-slogan"></div>
			<div class="main-tip">ZH娱乐，体验快乐生活</div>
			<block v-show="version!=''">
			<view v-for="(item, index) in iosUrlList" :key="index">
				<div class="main-btn download_btn" >
					<span class="iconfont icon-ios"></span>
					<span v-if="isApp" @click="iosDownload(item.url)" class="main-btn-text">{{item.name}}</span>
					<a v-if="!isApp" :href="item.url"  target="_blank" style="color: #FFFFFF;text-decoration: none;"> {{item.name}}</a>
				</div>
			</view>
			<view v-for="(aitem, aindex) in androidUrlList">
				<div class="main-btn download_btn" >
					<span class="iconfont icon-anzhuo"></span>
					<span v-if="isApp" @click="androidDownload(aitem.url)" class="main-btn-text"> {{aitem.name}}</span>
					<a v-if="!isApp" :href="aitem.url"  target="_blank" style="color: #FFFFFF;text-decoration: none;"> {{aitem.name}}</a>
				</div>
				
				
				
			</view>
			<div class="main-tip">verson:{{this.version}}</div>
            </block>
		</div>
		<div class="main-bg main-bg-webp" id="main_bg"></div>
	</view>
</template>

<script>
	import http from 'common/js/http.js';
	export default {
		data() {
			return {
				isAndroid: false,
				isIos: false,
				iosUrlList: [],
				androidUrlList: [],
				version: '',
				isApp:false

			};
		},
		mixins: [http],
		methods: {
			convertToVersionStyle(version) {
				let res = '';
				let versionS = version + "";
				//let b = parseInt(version).toString();
				let arr = versionS.split('');
				for (let i = 0; i < arr.length; i++) {
					if (i == arr.length-1) {
						res = res + arr[i];
					} else {
						res =res+arr[i] + ".";
					}
				}
				return res;
			},
			loadDownloadUrl(type = '') {
				uni.showLoading({
					title: '加载中...'
				});
				this.sendRequest({
					url: 'System.DownloadUrl.downloadUrlList',
					success: res => {
						if (res.data) {
							this.iosUrlList=[];
							this.androidUrlList=[];
							this.version = this.convertToVersionStyle(res.data.version);
							let availIosUrlCount = 0;
							let iphones = res.data.iosData;
							for (let i = 0; i < iphones.length; i++) {
								let iphoneurl = iphones[i];
								if (iphoneurl != undefined && iphoneurl != '') {
									availIosUrlCount = availIosUrlCount + 1;
									//console.log(availIosUrlCount);
									let iosdname ='苹果下载';
									if(availIosUrlCount>1){
										iosdname ='苹果下载通道' + availIosUrlCount;
									}
									this.iosUrlList.push({
										name: iosdname,
										url: iphoneurl
									});
								}
							}

							let availAndroidUrlCount = 0;
							let androids = res.data.androidData;
							for (let a = 0; a < androids.length; a++) {
								let url = androids[a];
								if (url != undefined && url != '') {
									availAndroidUrlCount = availAndroidUrlCount + 1;
									let androidname = availAndroidUrlCount > 1 ? '安卓下载通道' + availAndroidUrlCount : '安卓下载'
									this.androidUrlList.push({
										name: androidname,
										url: url
									});
								}
							}

						} else {
							this.$util.showToast({
								title: "下载链接加载失败，请下拉重试"
							});
						}
						if (type == 'refresh') {
							uni.stopPullDownRefresh();
						}
						uni.hideLoading();
					}
				});
			},
			// androidLocalDownload(){
			// 	let url = '/apk/ygz.v1.5.3.apk';
			// 	window.open(url);
			// },
			androidDownload(url) {
				//console.log(url);
				// #ifdef H5
				window.open(url);
				//#endif
				//#ifdef APP-PLUS
				plus.runtime.openURL(url);
				//#endif
			},
			iosDownload(url) {
				// #ifdef H5
				window.open(url);
				//#endif
				//#ifdef APP-PLUS
				plus.runtime.openURL(url);
				//#endif
			}
		},
		onPullDownRefresh() {
			this.loadDownloadUrl("refresh");
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.isApp=true;
			// #endif
			// #ifdef H5
			this.isApp=false;
			// #endif
			this.loadDownloadUrl();
			uni.getSystemInfo({
				success(e) {
					if (e.platform == 'ios') {
						this.isIos = true;
					} else if (e.platform == 'android') {
						this.isAndroid = true;
					}

				}
			})
		}
	}
</script>

<style lang="scss">
	.app-download-body .content-container {
		position: absolute;
		top: 250rpx;
		left: 50%;
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
		z-index: 2;
	}

	.main-tip {
		font-size: 3.2vw;
		color: #fff;
		line-height: 4.53333vw;
		letter-spacing: 1.6vw;
		margin: 0 auto 6.66667vw;
		text-align: center;
	}

	.main-slogan {
		width: 750rpx;
		height: 82rpx;
		margin: 0 auto;
		background: url('/static/images/2020/download_title.png') no-repeat center center/cover;
	}

	.main-btn {
		width: 300rpx;
		height: 80rpx;
		margin: 0 auto;
		margin-bottom: 30rpx;
		padding-left: .53333vw;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		background: rgba(0, 0, 0, .3);
		border: .26667vw solid rgba(255, 255, 255, .4);
		border-radius: 2.13333vw;
		font-weight: 500;
		font-size: 3.73333vw;
		color: #fff;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-transition: background-color .2s;
		transition: background-color .2s
	}

	.main-btn-text {
		padding-left: .53333vw
	}

	.main-bg {
		//position: relative;
		//background: #16d5cb  url('/static/images/2020/download_bg.jpg') top/cover no-repeat;
		height: 100vh;
		background: #16d5cb url(/static/images/2020/download-video.webp) no-repeat center center/cover;
	}

	.main-bg {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}

	.main-bg::after {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		content: "";
		background: rgba(0, 0, 0, .8);
	}

	.header {
		position: absolute;
		z-index: 100;
		left: 0;
		right: 0;
		top: 30px;
		width: 100%;
		height: 100rpx;
	}

	.logo {
		width: 750rpx;
		height: 118rpx;
		background: url(/static/images/2020/yougou_logo.png) no-repeat;
		background-size: 100% 100%;
		-webkit-animation: logo-ani-data-v-049260ec .8s ease-in forwards;
		animation: logo-ani-data-v-049260ec .8s ease-in forwards;
	}
</style>
