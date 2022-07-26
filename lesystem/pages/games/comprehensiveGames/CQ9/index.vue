<template>
	<view class="scrool-page">
		<view class="header-cont">
			<view class="search-box bg-white padding-xs">
				<uni-search-bar @input="input" @cancel="cancel"></uni-search-bar>
			</view>
			<TabBar ref="tabBar" :tabs="gameChannelList" @chanageTabItem='chanageTabItem' />
		</view>

		<view class="bg-gray list-scroll">
			<view class="flex-a" v-if="curSelectGameType!=='search'">
				<view class="flex-item bg-white flex text-center padding" v-for="(item, indexs) in curGameList"
					:key="indexs">
					<image v-if="isApp" :src="item.imgurl" mode="aspectFit"
						@tap="routerToGame(item)" />
					
					<a v-if="!isApp" :href="item.url"  target="_blank"><image :src="item.imgurl" mode="aspectFit"/></a>
					
					<view>{{item.gameName}}</view>
				</view>
			</view>
			<view class="flex-a" v-else>
				<view class="flex-item bg-white flex text-center padding" v-for="(item, indexs) in searchGameList"
					:key="indexs">
					<image v-if="isApp" :src="item.imgurl" mode="aspectFit"
						@tap="routerToGame(item)" />
					<a v-if="!isApp" :href="item.url"  target="_blank"><image :src="item.imgurl" mode="aspectFit"/></a>
						
					<view>{{item.gameName}}</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import http from 'common/js/http.js';
	import UniSearchBar from 'components/uni-search-bar/uni-search-bar';
	import TabBar from 'components/ylc/TabBar';
	export default {
		data() {
			return {
				gameId: 166,//默认ID
				gameType:"DZYX",//默认类型
				isApp:false,//如果是h5需要打开新的窗口。一定要用户主动打开的方式打开新窗口,不然会被部分浏览器阻止
				gameCategory: [],
				gameChannelList: [],
				searchResult: "",
				curSelectGameType: "all",
				searchGameList: [],
				allGameList: [],
				defaultImg: 'this.src="/static/images/defaultImg.png"', //默认图地址
			};
		},
		components: {
			TabBar,
			UniSearchBar
		},
		computed: {
			curGameList() {
				let _curGameList = [];
				if (this.curSelectGameType == "all") {
					this.gameChannelList.forEach((item) => {
						item.gameList.forEach((ite) => {
							_curGameList.push(ite);
						});
					});
				} else {
					this.gameChannelList.forEach((item) => {
						if (item.gameType == this.curSelectGameType) {
							_curGameList = item.gameList;
						}
					});
				}
				return _curGameList;
			},
		},
		methods: {
			routerToGame(v) {
				let url = v.url
				uni.navigateTo({
					url:url
				});

			},
			// 取消搜索
			cancel(res) {
				this.curSelectGameType = 'all'
				this.$refs.tabBar.curSelectGameType = 'all'
			},
			// search
			input(res) {
				this.curSelectGameType = 'search'
				// this.$refs.tabBar.curSelectGameType='search'
				this.fuzzyQuery(this.allGameList, res)
			},
			// tababar
			chanageTabItem(v) {
				this.curSelectGameType = v.gameType
			},
			// 获取全部游戏列表
			get_allGameList() {
				this.gameChannelList.forEach((item) => {
					item.gameList.forEach((ite) => {
						this.allGameList.push(ite);
					});
				});
			},
			// 初始化游戏列表
			get_game_category() {
				this.requestData("Pc.ThirdPartyGame.getThirdPartyGameList", {
					gameType: "DZYX",
				}, res => {
					if (res.code == 0) {
						this.gameCategory = res.data;
						//console.log(this.gameCategory);
						this.get_game_typename();
					} else {
						return this.$message.error(res.msg);
					}
				});
			},

			// 获取游戏种类
			get_game_typename() {
				this.requestData("Pc.ElectronicGame.getGameChannelList", {
					gameId: this.gameId, //暂时写死
				}, res => {
					if (res.code == 0) {
						let _gameChannelList = res.data;
						this.gameChannelList = Object.values(_gameChannelList);
						this.get_allGameList();
						//console.log(this.gameChannelList);
					} else {
						return this.$message.error(res.msg);
					}
				});
			},
			/**
			 * 使用match方法实现模糊查询
			 * @param  {Array}  list     进行查询的数组
			 * @param  {String} keyWord  查询的关键词
			 * @return {Array}           查询的结果
			 */
			fuzzyQuery(list, keyWord) {
				this.curSelectGameType = "search";
				let arr = [];
				for (var i = 0; i < list.length; i++) {
					if (list[i].gameName.match(keyWord) != null) {
						arr.push(list[i]);
					}
				}
				// console.log(arr);
				this.searchGameList = arr;
			},
			requestData(url, data, callback, failCallback) {
				uni.showLoading({
					title: '加载中...'
				});
				this.sendRequest({ //游戏订单请求
					url: url,
					data: data,
					success: res => {
						// console.log(res);
						if (res.code == 0) { //成功返回
							if (callback)
								callback(res);
						} else {
							this.$util.showToast({
								title: res.message
							});
						}
					},
					fail: () => {
						if (failCallback) {
							failCallback();
						}
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
		},
		created() {
		},
		onLoad(data) {
			if (data.gameId != undefined && data.gameId != "") {
				this.gameId = data.gameId;
			}
			if (data.channelId != undefined && data.channelId != "") {
				this.channelId = data.channelId;
			}
			// #ifdef APP-PLUS
			this.isApp=true;
			plus.screen.unlockOrientation();
			// #endif
			// #ifdef H5
			this.isApp=false;
			// #endif
			this.get_game_category();
		},
		onShow(){
			//#ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary'); //锁定
			//#endif
		},
		onNavigationBarButtonTap(e) {
		  if (e.index == 0) {
		    uni.switchTab({
		    	url:"/pages/index/index/index"
		    })
		  } 
		},
		mounted() {},
		mixins: [http],
	};
</script>

<style lang="scss" scoped>
	.list-scroll {
		height: calc(100vh - 214rpx - var(--status-bar-height) - var(--window-top));
		overflow-y: auto;
	}

	.flex-a {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		background: #fff;

		&:after {
			content: '';
			flex: auto;
		}

		.flex-item {
			width: calc(((100% - 2px * 3) / 3));
			flex-direction: column;
			border-right: 1px solid #eee;
			border-bottom: 1px solid #eee;
		}

		uni-image {
			width: 180rpx;
			height: 180rpx;
			background: #eee;
			padding: 12px;
			border-radius: 50%;
			border: 1px solid #dddddd;
			margin: 0 auto;

			img {
				width: 100%;
				height: 100%;
			}
		}

	}

	.c-games {
		display: flex;

		.c-games-box {
			margin: 15px 0;

			.no-border-bottom {
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			}

		}
	}
</style>
