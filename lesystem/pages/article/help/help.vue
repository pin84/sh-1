<template>
	<view class="list-content" >
		<view class="list-box">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value, key) in listData" :key="key" @click="goDetail(value.id)">
				<view class="uni-media-list">
					<view class="uni-media-list-body">
						<view class="uni-media-list">
						<view class="uni-media-list-title">{{ value.help_title }}</view>
						<view class="uni-media-list-icon">></view>
						</view>
						<!--
						<view class="uni-media-list-text-bottom">
							<text class="media-list-content">{{ value.publisher_name }}</text>
							<text class="media-list-num" v-if="value.click > 0">浏览&nbsp;&nbsp;{{ value.click > 10000 ? value.click / 10000 + '万' : value.click }}</text>
						</view>
						-->
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="status" :content-text="contentText" v-if="listData.length > 0 && page_count > 1" />
		<loading-cover ref="loadingCover"></loading-cover>
		<view v-if="isEmpty && listData.length == 0" class="empty">
			<view class="iconfont iconwenzhangchaxun"></view>
			<view class="ns-text-color-gray">暂时没有问题文章！</view>
		</view>
	</view>
</template>

<script>
import http from 'common/js/http.js';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import loadingCover from '@/components/loading/loading.vue';

export default {
	components: {
		uniLoadMore,
		loadingCover
	},
	data() {
		return {
			headerPosition: 'fixed',
			headerTop: '0px',
			classListData: [],
			listData: [],
			helpType:'',
			page:1,
			page_size:15,
			classId: 0,
			status: 'loading',
			page_count: 0,
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多了'
			},
			isEmpty: false,
			ident: false, //防止初始化时，触发上拉加载
			isIphoneX: false //判断手机是否是iphoneX以上
		};
	},
	onLoad(data) {
		if(data.id!=''&&data.id!=undefined){
			this.helpType = data.id;
		}
		// uni.getSystemInfo({
		// 	success: res => {
		// 		if (res.model.search('iPhone X') != -1) {
		// 			this.isIphoneX = true;
		// 		}
		// 	}
		// });
	},
	onShow() {
		// // #ifdef H5
		// this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight + 'px';
		// // #endif
		// //this.getClassList();
		this.getList();
	},
	// onPageScroll(e) {
	// 	//兼容iOS端下拉时顶部漂移
	// 	if (e.scrollTop >= 0) {
	// 		this.headerPosition = 'fixed';
	// 	} else {
	// 		this.headerPosition = 'absolute';
	// 	}
	// },
	onPullDownRefresh() {
		this.getList('refresh');
	},
	onReachBottom() {
		if (!this.ident) return;
		this.getList();
	},
	mixins: [http],
	methods: {
		// getClassList() {
		// 	this.sendRequest({
		// 		url: 'System.Help.getHelpList',
		// 		data: {
		// 			pid: 0
		// 		},
		// 		success: res => {
		// 			if (res.code == 0) {
		// 				let list = res.data.data;
		// 				this.classListData = list;
		// 			}
		// 		}
		// 	});
		// },
		getList(type = 'add') {
			if (type === 'add') {
				if (this.status === 'nomore') return;
				this.status = 'loading';
			} else {
				this.status = 'more';
			}
			if (type === 'refresh') {
				this.status = 'loading';
				this.page = 1;
				this.listData = [];
			}

			var data = {
				page: this.page,
				page_size:this.page_size
			};
			if (this.helpType!=''&&this.helpType !== 0) {
				let helpTypeParam = {helpType: this.helpType};
				Object.assign(data, helpTypeParam);
			}
			this.sendRequest({
				url: 'System.Help.getHelpListByType',
				data: data,
				success: res => {
					this.ident = true;
					if (res.code == 0) {
						let data = res.data;
						let list = data.list;
						this.page_count = data.page_count;
						if (this.page_count == 0) {
							this.status = 'nomore';
							this.isEmpty = true;
							this.contentText.contentnomore = '';
						} else {
							if (this.page < this.page_count) {
								this.status = 'more';
							} else {
								this.status = 'nomore';
								this.contentText.contentnomore = '没有更多了';
							}
							this.isEmpty = false;

							if (list.length > 0) {
								if (type === 'refresh') {
									this.listData = list;
								} else {
									this.listData = this.listData.concat(list);
								}
								this.page++;
							}
						}

						if (type === 'refresh') {
							uni.stopPullDownRefresh();
						}
						if (this.$refs.loadingCover == undefined) return;
						this.$refs.loadingCover.hide();
					}
				}
			});
		},
		goDetail(id) {
			//console.log(id);
			uni.navigateTo({
				url:"/pages/article/help/detail?id="+id
			});
		},
		reloadList: function(value) {
			if (value == 0) {
				this.classId = 0;
			} else {
				this.classId = value;
			}
			this.getList('refresh');
		}
	}
};
</script>

<style lang="scss">
	.uni-media-list{
		flex-direction: row;
		font-size: 42rpx;
		.uni-media-list-title{width: 80%;}
		.uni-media-list-icon{width: 20%;     text-align: right;}
	}
.list-content {
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
}
.padding-bottom {
	padding-bottom: 68rpx !important;
}
.scroll-h {
	width: 750rpx;
	height: 90rpx;
	line-height: 90rpx;
	flex-direction: row;
	position: fixed;
	z-index: 999;
	border-top: 2rpx solid $ns-border-color-gray;
	background-color: #fff;
	overflow: hidden;
	top: 88rpx;
	/* #ifndef APP-PLUS */
	white-space: nowrap;
	/* #endif */
}
.list-box {
	background-color: #fff;
}
.uni-tab-item {
	/* #ifndef APP-PLUS */
	display: inline-block;
	/* #endif */
	flex-wrap: nowrap;
	padding-left: 34rpx;
	padding-right: 34rpx;
}

.uni-tab-item-title {
	color: #555;
	font-size: 30rpx;
	height: 80rpx;
	line-height: 80rpx;
	padding: 10rpx $ns-padding;
	border-radius: 40rpx;
	flex-wrap: nowrap;
	/* #ifndef APP-PLUS */
	white-space: nowrap;
	/* #endif */
}

.uni-tab-item-title-active {
	color: #ffffff;
	background: $base-color;
}

.uni-media-list-logo {
	width: 200rpx;
	height: 100rpx;
}

.uni-media-list-body {
	height: auto;
	justify-content: space-around;
}

.uni-media-list-text-top {
	font-size: $ns-font-size-base;
	font-weight: bold;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

.uni-media-list-text-bottom {
	color: $ns-text-color-gray;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	font-size: $ns-font-size-base;
	margin-top: 12rpx;
	align-items: flex-end;
	.media-list-content {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		max-width: 350rpx;
		margin-right: 20rpx;
		line-height: 1.3;
	}
	.media-list-num {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		line-height: 1.3;
	}
}

.tab {
	display: flex;
}

.tab-item {
	padding: 20rpx;
}
.uni-list-cell::after {
	left: 0 !important;
}
</style>
<style scoped>
.scroll-h >>> .uni-scroll-view::-webkit-scrollbar {
	display: none;
}
</style>
