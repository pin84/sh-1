<template>
	<view>
		<view class="status_bar">
		   <!-- 这里是虚拟的状态栏,为了在app里不遮挡顶部 -->
		</view>
	<view class="home-page-wrapper">
		<nav-bar></nav-bar>
		<template v-if="configData.img_ad">
			<!-- 图片广告 -->
			<diy-img-ad :value="configData.img_ad" @redirectTo="redirectTo"></diy-img-ad>
		</template>
		<template v-if="configData.notice">
			<!-- 公告区 -->
			<diy-notice :value="configData.notice" @redirectTo="redirectTo"></diy-notice>
		</template>
		<!-- 分类菜单 -->
		<template>
			<view class="category-list">
				<scroll-view scroll-x class="nav">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="index == TabCur ? 'text-orange cur' : ''"
							v-for="(item, index) in categoryList" :key="index" @tap="tapSelect(item)">
							<span class="hotico" v-if="item.channelCode=='RMYX'"><i
									class="iconfont icon-hot"></i></span>
							<span class="dzyxico" v-if="item.channelCode=='DZYX'"><i
									class="iconfont icon-GamePadyouxishoubing"></i></span>
							<span class="zrspico" v-if="item.channelCode=='ZRSP'"><i
									class="iconfont icon-videorecorder"></i></span>
							<span class="cpyxico" v-if="item.channelCode=='CPYX'"><i
									class="iconfont icon-caipiao1"></i></span>
							{{ item.shortName }}
						</view>
					</view>
				</scroll-view>
			</view>
		</template>
		<!-- 子分类 -->
		<template>
			<view class="flex sub-category" v-if="updated">
				<view class="flex-item  flex text-center" v-for="(item,index) in curList" :key="index">
					<view class="flex-box" @click="routerToGame(item)">
						<image class="subimg" :src="item.picUrl" mode="aspectFit" />
						<view>{{item.showName}}</view>
					</view>
				</view>
			</view>
		</template>

		<view @touchmove.prevent.stop>
			<uni-popup ref="uniPopup" type="center" class="wap-floating" :maskClick="false">
				<view class="image-wrap">
					<image :src="$util.img(wapFloatData.nav_icon)" mode="widthFix"
						@click="navigatorOut(wapFloatData.nav_url)"></image>
				</view>
				<text class="iconfont iconroundclose" @click="closeNum"></text>
			</uni-popup>
		</view>
		<loading-cover ref="loadingCover"></loading-cover>
	</view>
	</view>
</template>
<script>
	import http from "common/js/http.js";
	import diyImgAd from "@/components/diy-img-ad/diy-img-ad.vue";
	import loadingCover from "@/components/loading/loading.vue";
	import navBar from './nav.vue'
	export default {
		components: {
			navBar,
			diyImgAd,
			loadingCover,
		},
		mixins: [http],
		data() {
			return {
				gameList: [],
				gameType: 0,
				balance: "",
				configData: {},
				isShowRightDrawer: false,
				isLogin: false,
				//-------------
				isMenuDrawerShow: false,
				memberInfo: {},
				cur_second_area: 60,
				showNoticeId: 0, //默认显示弹出公告的第一条
				wapFloatData: "",
				templateData: [],
				noticeData: {},
				popupnotice: {},
				page: 1,
				loading_flag: true,
				loading_status: "more",
				contentText: {
					contentdown: "上拉加载更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了",
				},

				isShowNoticeContentList: [],
				categoryList: {},
				TabCur: "RMYX",
				updated: false
			};
		},

		//下拉刷新
		onPullDownRefresh() {
			this.getWapPageLayout();
		},
		onLoad(data) {
			this.getWapPageLayout();
			this.order_list_index = 0;
			this.page = 1;
			if (data.sid != undefined && data.sid != "") {
				uni.setStorageSync("sid", data.sid);
			}
		},

		onShow() {
			let token = uni.getStorageSync("token");
			if (token) {
				//if(this.isLogin==)
				this.isLogin = true;
				this.refreshUserInfo();
			}
		},
		computed: {
			curList() {
				let _curList = this.categoryList[this.TabCur]
				return _curList.gameList
			}
		},
		created() {
			this.getSubCategory()
		},
		methods: {

			toGuessLike(item) {
				console.log(item)
				let id = item.linkUrl.split("=")[1];
				item.id = Number(id)
				this.$buyDataHandler.changeGame(item);
			},
			showGameList() {
				uni.pageScrollTo({
					scrollTop: 99999,
					duration: 100,
				});
			},
			refreshUserInfo() {
				this.sendRequest({
					url: "System.Member.memberInfo",
					success: (res) => {
						this.userInfo = res.data;
						this.balance = res.data.coin;
						uni.setStorageSync("userInfo", res.data);
					},
				});
			},

			navigationBarButtonClick() {
				this.isShowRightDrawer = !this.isShowRightDrawer;
			},
			showNoticeDetail(index) {
				this.showNoticeId = index;
			},

			closeDrawer(e) {
				if (e === "left") {
					this.showLeft = false;
				} else {
					this.showRight = false;
				}
			},
			drawerChange(status) {
				this.isMenuDrawerShow = status;
			},
			getWapPageLayout() {
				this.popupnotice.items = [];
				//1.获取页面配置参数
				this.sendRequest({
					url: "System.HomePage.getYLCData",
					success: (res) => {
						this.configData = res.data;
						console.log(this.configData)

						this.memberInfo = res.data.memberInfo;

						this.partTabData = res.data.orderList;
						if (
							res.data.popupNotice &&
							res.data.popupNotice.items !== undefined &&
							res.data.popupNotice.items.length > 0
						) {
							// this.popupnotice = res.data.popupNotice;
							const arr = res.data.popupNotice.items;
							arr.forEach((item, index) => {
								if (item.notice_info_type == 0) {
									item.textShow = true;
									item.imgShow = false;
								} else if (item.notice_info_type == 1) {
									item.textShow = false;
									item.imgShow = true;
								}

								//item.isShow = false
								this.popupnotice.items.push(item);
							});

							// this.$refs.noticePopup.open();
						}
						//let data = res.data;
						//this.noticeData = data.notice;
						uni.stopPullDownRefresh();
						if (this.$refs.loadingCover == undefined) return;
						this.$refs.loadingCover.hide();
					},
				});
			},
			timezoneRadioChange(e) {
				this.selectedRadioTimezone = e.target.value;
			},
			popupnoticeClose() {
				this.$refs.noticePopup.close();
			},
			timezoneConfirm() {
				if (this.selectedRadioTimezone != this.cur_second_area) {
					this.cur_second_area = this.selectedRadioTimezone;
					uni.setStorage({
						key: "shop_game_second",
						data: this.selectedRadioTimezone,
					});

					this.goodListTitleConfig.title_name =
						"推荐产品(" + this.cur_second_area + "购物区)";
				}
				this.$refs.timezonePopup.close();
			},
			/**
			 * 获取首页浮层信息
			 */
			getWapFloating() {
				this.sendRequest({
					url: "System.Shop.appletFloating",
					success: (res) => {
						let data = res.data;
						this.wapFloatData = data;
						this.wapFloatData.show_type =
							this.wapFloatData.show_type == undefined ?
							"once" :
							this.wapFloatData.show_type;
						this.wapFloatData.show_num =
							this.wapFloatData.show_num == undefined ?
							1 :
							this.wapFloatData.show_num;
						if (this.wapFloatData.nav_icon && this.wapFloatData.is_show == 1) {
							this.refreshFloating();
						}
					},
				});
			},
			refreshFloating() {
				let that = this;
				if (
					uni.getStorageSync("index_wap_floating_layer") != null &&
					uni.getStorageSync("index_wap_floating_layer") != ""
				) {
					var wap_floating_cookie = JSON.parse(
						uni.getStorageSync("index_wap_floating_layer")
					);
					if (this.wapFloatData.nav_icon != wap_floating_cookie.imgPath) {
						this.$refs.uniPopup.open();
					} else {
						if (
							this.wapFloatData.show_type == "many" &&
							wap_floating_cookie.closeNum < this.wapFloatData.show_num
						) {
							this.$refs.uniPopup.open();
						}
					}
				} else {
					this.$refs.uniPopup.open();
				}
			},
			closeNum() {
				this.$refs.uniPopup.close();
				var closeNum = 1;
				if (
					uni.getStorageSync("index_wap_floating_layer") != null &&
					uni.getStorageSync("index_wap_floating_layer") != ""
				) {
					var wap_floating_cookie = JSON.parse(
						uni.getStorageSync("index_wap_floating_layer")
					);
					if (this.wapFloatData.nav_icon == wap_floating_cookie.imgPath) {
						closeNum = wap_floating_cookie.closeNum + 1;
					}
				}
				if (this.wapFloatData.show_type == "many") {
					uni.setStorageSync(
						"index_wap_floating_layer",
						JSON.stringify({
							imgPath: this.wapFloatData.nav_icon,
							closeNum: closeNum,
						})
					);
				} else {
					uni.setStorageSync(
						"index_wap_floating_layer",
						JSON.stringify({
							imgPath: this.wapFloatData.nav_icon,
							closeNum: closeNum,
						})
					);
				}
			},
			//自定义模板的跳转链接
			redirectTo(link) {
				if (link == null || link == "") return;
				var uniapp_template = link.uniapp_template;
				if (uniapp_template == undefined || !uniapp_template) {
					this.$util.redirectTo(link);
				} else {
					if (uniapp_template.url.indexOf("http") != -1) {
						this.$util.redirectTo(
							"/pages/index/web/web?src=" + uniapp_template.url
						);
					} else if (uniapp_template.is_tabbar == 1) {
						this.$util.redirectTo(uniapp_template.url, {}, "tabbar");
					} else {
						this.$util.redirectTo(uniapp_template.url);
					}
				}
			},
			navigatorOut(src) {
				this.$util.redirectTo("/pages/index/web/web", {
					src,
				});
			},
			// tap 分类导航
			tapSelect(item) {
				this.TabCur = item.channelCode;
			},
			// 获取子分类导航
			getSubCategory() {
				this.sendRequest({
					url: "System.HomePage.getYLCNavInfoList",
					success: (res) => {
						this.categoryList = res.data
						this.updated = true
						console.log(this.categoryList)
					},
				});
			},
			// 链接跳转
			routerToGame(v) {
				let urls = v.urlLink 
				uni.redirectTo({
					 url: '/pages/games/comprehensiveGames/CQ9/index' //test 跳转 
				})
			}
		},

	};
</script>

<style lang="scss" scoped>
	@import "/common/css/bg.css";

	.indexlogo {
		height: 48rpx;
		width: 110rpx;
		background: url(/static/images/2020/logo.png);
		background-size: cover;
		display: block;
	}

	.home-page-wrapper {
		height: 100%;
		overflow: hidden;
	}

	navigator {
		padding: 20rpx;
		color: #fff;
		background: $base-color;
		margin: 20rpx 0;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.timezone-select-info {
		.header {
			height: 120rpx;
			line-height: 120rpx;
			text-align: center;
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		}

		.main {
			font-size: 24rpx;
			line-height: 40rpx;
			//padding-right: 40rpx;
			//height: 460rpx;
		}

		.footer {
			margin: 0;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			//width: 720rpx;
			color: #fff;
			border-radius: 0;
		}
	}

	.notice-item-box {
		padding: 0 16upx 20upx;

		.notice-item {
			border: 1upx solid #ddd;
			border-radius: 16upx;
			margin: 16upx 0;
			padding-bottom: 10upx;

			.content-item-time {
				font-size: 26upx;
				height: 50upx;
				line-height: 50upx;
				color: #999;
			}

			.content-item-title {
				width: 450upx;
				font-size: 32upx;
				height: 80upx;
				line-height: 80upx;
				color: #555;
			}

			.content-item-content {
				.item-content-text {
					width: 450upx;
					font-size: 28upx;
					line-height: 40upx;
					color: #666;
				}

				.item-content-img {
					width: 450upx;
					padding: 0 10upx;

					image {
						width: 430upx;
					}
				}

				.content-hidden {
					width: 0;
					height: 0;
					display: none;
				}
			}
		}
	}

	.popnotice-title {
		background-color: #fd7986;
		height: 80rpx;
		line-height: 80rpx;
		font-weight: bold;
		font-size: 30rpx;
		color: #fff;
		box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2);
	}

	.notice-item {
		text-align: left;
		padding-left: 15rpx;
		font-size: 26rpx;
	}

	.item-content-text {
		font-size: 24rpx;
		color: #666666;
	}

	.item-content-img {
		width: 500rpx;
		border-radius: 10rpx;
	}

	.close-notice-footer {
		height: 70rpx;
		line-height: 70rpx;
		border-top: 2rpx #f5f5f5 solid;
		text-align: center;
		color: #666;
		box-shadow: 0rpx -2rpx 5rpx rgba(0, 0, 0, 0.1);
	}
</style>
<style scoped lang="scss">
	uni-page-body {
		background: #000;

		.diy-notice {
			background-color: #000;
		}

		.notice {
			background-color: #000;
		}
	}

	.category-list {
		.nav {
			background: #1d1d1d;
		}

		.flex-sub {
			padding: 10px 0;
			font-size: 12px;
			span {
				display: block;
				.iconfont {
					font-size: 68rpx;
				}
			}

			.hotico {
				color: #d25410;
			}

			.dzyxico {
				color: #ffe400;
			}

			.cpyxico {
				color: #aa0000;
			}

			.zrspico {
				color: #003bff;
			}
		}

		.cu-item {
			margin: 0;
			min-width: 60px;
			color: #fff;
			height: auto;
			line-height: 20px;
			height: 134rpx;
		}

		.cur {
			color: #fff;
			position: relative;
			border-bottom: 0 none;
			background-color: #3e3e3e;
		}

		.cur::after {
			content: '';
			position: absolute;
			left: calc(50% - 6px );
			bottom: 0;
			width: 0;
			height: 0;
			border-width: 0 6px 6px;
			border-style: solid;
			border-color: transparent transparent #d25410;
		}
	}


	.sub-category {
		flex-wrap: wrap;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;

		.flex-item {
			position: relative;
			width: calc(((100% - 1px * 2) / 2));
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-webkit-flex-direction: column;
			flex-direction: column;
			padding: 10px 0;
		}

		.flex-box {
			background-color: #1d1d1d;
			border-radius: 10px;
			margin: 0 10px;
			padding:8rpx 0;

			uni-view {
				color: #fff;
			}
		}

		.subimg {
			width: 124rpx;
			height: 124rpx;
			margin: 0 auto;
		}
	}
</style>
