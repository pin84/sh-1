<template>
	<view>
		<view class="banner" v-if="info.image"><image class="banner-img" :src="$util.img(info.image)"></image></view>
		<view class="article-meta">
			<text class="article-author">{{ info.name }}</text>
			<text class="article-text">发表于</text>
			<text class="article-time">{{ $util.timeStampTurnTime(info.create_time) }}</text>
		</view>
		<view class="article-content"><rich-text :nodes="htmlNodes"></rich-text></view>
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
			articleId: '',
			info: {},
			htmlNodes: '',
			lastTitle: '',
			nextTitle: '',
			lastId: '',
			nextId: ''
		};
	},
	onLoad(event) {
		this.articleId = event.article_id;
		this.getDetail(event.article_id);
		this.setArticleClick(event.article_id);
		this.getLast();
		this.getNext();
	},
	mixins: [http],
	methods: {
		getDetail(id) {
			var data = {
				article_id: id
			};
			this.sendRequest({
				url: 'System.Article.articleInfo',
				data: data,
				success: res => {
					if (res.code == 0) {
						this.info = res.data;
						this.htmlNodes = htmlParser(res.data.content);
						uni.setNavigationBarTitle({
							title: this.info.title
						});
					}
				}
			});
		},
		setArticleClick(id) {
			var data = {
				article_id: id
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
					article_id: ['gt', this.articleId]
				})
			};
			this.sendRequest({
				url: 'System.Article.articleFirst',
				data: data,
				success: res => {
					this.lastTitle = res.data.title;
					this.lastId = res.data.article_id;
				}
			});
		},
		getNext() {
			// 下一篇
			var data = {
				order: 'public_time desc',
				condition: JSON.stringify({
					article_id: ['lt', this.articleId]
				})
			};
			this.sendRequest({
				url: 'System.Article.articleFirst',
				data: data,
				success: res => {
					this.nextTitle = res.data.title;
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
