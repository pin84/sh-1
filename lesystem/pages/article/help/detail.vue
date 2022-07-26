<template>
	<view>
		<view class="article-meta">
			<text class="article-title">{{info.help_title}}</text>
		</view>
		<view class="article-content"><view v-html="htmlNodes"></view></view>
		<view class="titles">
			<view class="ns-padding-left" v-if="lastTitle" @click="goDetail(lastId)">
				<text class="ns-text-color-gray">上一篇</text>
				:&nbsp;{{ lastTitle }}
			</view>
			<view v-else></view>
			<view class="ns-padding-right" @click="goDetail(nextId)" v-if="nextTitle">
				<text class="ns-text-color-gray">下一篇</text>
				:&nbsp;{{ nextTitle }}
			</view>
			<view v-else></view>
		</view>
	</view>
</template>

<script>
import http from 'common/js/http.js';
import htmlParser from '@/common/js/html-parser';
export default {
	data() {
		return {
			id: '',
			info: {},
			htmlNodes: '',
			lastTitle: '',
			nextTitle: '',
			lastId: '',
			nextId: ''
		};
	},
	onLoad(event) {
		this.id = event.id;
		this.getDetail(event.id);
		//this.setArticleClick(event.id);
		//this.getLast();
		//this.getNext();
	},
	mixins: [http],
	methods: {
		getDetail(id) {
			var data = {
				id: id
			};
			this.sendRequest({
				url: 'System.Help.getHelpInfo',
				data: data,
				success: res => {
					if (res.code == 0) {
						this.info = res.data;
						this.htmlNodes = res.data.help_content;
						//console.log(this.htmlNodes)
						uni.setNavigationBarTitle({
							help_title: this.info.help_title
						});
					}
				}
			});
		},
		setArticleClick(id) {
			var data = {
				id: id
			};
			this.sendRequest({
				url: 'System.Article.setArticleClick',
				data: data,
				success: res => {}
			});
		},
		getLast() {
			// 上一篇
			var data = {
				order: 'public_time asc',
				condition: JSON.stringify({
					id: ['gt', this.id]
				})
			};
			this.sendRequest({
				url: 'System.Article.articleFirst',
				data: data,
				success: res => {
					this.lastTitle = res.data.help_title;
					this.lastId = res.data.id;
				}
			});
		},
		getNext() {
			// 下一篇
			var data = {
				order: 'public_time desc',
				condition: JSON.stringify({
					id: ['lt', this.id]
				})
			};
			this.sendRequest({
				url: 'System.Article.articleFirst',
				data: data,
				success: res => {
					this.nextTitle = res.data.help_title;
					this.nextId = res.data.article_id;
				}
			});
		},
		goDetail(id) {
			uni.redirectTo({
				url: 'detail?article_id=' + id
			});
		}
	}
};
</script>

<style lang="scss">
	page{
		background:#fff;
	}
	
.banner {
	height: 360rpx;
	overflow: hidden;
	position: relative;
	background-color: $ns-bg-color-gray;
}

.banner-img {
	width: 100%;
}

.article-meta {
	padding: 20rpx 40rpx;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	color: $ns-text-color-gray;
}
.article-title{
	font-size:40rpx;
	font-weight: bold;
	line-height: 40rpx;
	margin: 5px auto;
	text-align: center;
}
img{width: 700rpx;}
.article-text {
	font-size: $ns-font-size-base;
	line-height: 50rpx;
	margin: 0 20rpx;
}

.article-author,
.article-time {
	font-size: $ns-font-size-base;
}

.article-content {
	padding: 0 30rpx;
	overflow: hidden;
	font-size: $ns-font-size-base;
	margin-bottom: 30rpx;
}
.titles {
	display: flex;
	justify-content: space-between;
	padding-left: $ns-padding;
	padding-right: $ns-padding;
	margin-bottom: 100rpx;
	view {
		width: 45%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.float-right {
		text-align: right;
	}
}
</style>
