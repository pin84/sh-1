<template>
	<view>
		<view class="shop-top">
			<view class="shop-info ns-bg-color" :style="{ background: promoterDetail['background_img'] ? 'url(' + $util.img(promoterDetail['background_img']) + ')' : '' }">
				<view class="shop-name">
					<image :src="promoterDetail.user_headimg ? $util.img(promoterDetail.user_headimg) : '/static/images/default_head.png'" mode="aspectFit"></image>
					<view>{{ promoterDetail.promoter_shop_name }}的店铺</view>
				</view>
			</view>
		</view>
		<view class="my-share">
			<view>
				<text class="iconfont iconappreciate ns-text-color"></text>
				<text class="ns-margin-left ns-font-size-lg">我的推荐</text>
			</view>
		</view>
		<view class="goods-list">
			<navigator :url="'/pages/goods/detail/detail?goods_id=' + item.goods_id" v-for="item in goodsList" :key="item.good_id">
				<view class="sale-num">
					<view class="sale-num-tag ns-bg-color">销量 {{ item.sales }}</view>
					<view class="triangle"></view>
				</view>
				<view class="goods-img"><image :src="$util.img(item.pic_cover_small)" mode="aspectFit"></image></view>
				<view class="is-by padding">
					<view v-if="item['shipping_fee'] == 0" class="tag uni-bold">包邮</view>
					<view class="ns-text-color uni-bold">￥{{ item.promotion_price }}</view>
				</view>
				<view class="goods-title uni-bold">{{ item.goods_name }}</view>
				<view class="ns-padding"></view>
			</navigator>
		</view>
		<uni-load-more :status="status" :content-text="contentText" v-if="goodsList.length > 0 && pageCount > 1" />
		<loading-cover ref="loadingCover"></loading-cover>
		<!-- 数据为空 -->
		<view v-if="isEmpty" class="empty">
			<view class="iconfont iconwenzhangchaxun"></view>
			<view class="ns-text-color-gray">Sorry！您还没有推荐商品…</view>
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
			pageIndex: 1,
			pageCount: 0,
			pageSize: 10,
			total: 0,
			myNum: 0,
			promoterDetail: {
				promoter_shop_name: '我',
				background_img: ''
			},
			memberInfo: [],
			id: 0,
			goodsList: [],
			status: 'loading',
			contentText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '没有更多了'
			},
			ident: false, //防止初始化时，触发上拉加载
			isEmpty: false
		};
	},
	onShow() {
		this.getPromoterDetail();
	},
	onLoad(data) {
		if (data.source_uid) this.id = data.source_uid;
		if (data.scene && data.scene.indexOf('sourceuid_') != -1) this.id = data.scene.split('_')[1];
	},
	onReachBottom() {
		if (!this.ident) return;
		this.getGoodsList();
	},
	mixins: [http],
	methods: {
		getPromoterDetail() {
			this.sendRequest({
				url: 'System.Distribution.promoterDetailByUid',
				data: {
					uid: this.id
				},
				success: res => {
					if (res.code == 0 && res.data) {
						this.promoterDetail = res.data;
						this.getGoodsList();
						if (this.$refs.loadingCover == undefined) return;
						this.$refs.loadingCover.hide();
					} else {
						this.$util.redirectTo('/pages/index/index/index', {}, '', 'redirectTo');
					}
				}
			});
		},
		getGoodsList() {
			if (this.status == 'nomore') return;
			this.sendRequest({
				url: 'System.Distribution.distributionGoodsList',
				data: {
					page: this.pageIndex,
					page_size: this.pageSize,
					uid: this.id,
					type: 'selected'
				},
				success: res => {
					this.ident = true;
					this.pageCount = res.data.page_count;
					this.myNum = res.data.total_count;
					if (this.pageCount == 0) {
						this.status = 'nomore';
						this.isEmpty = true;
						this.contentText.contentnomore = '';
					} else {
						if (this.pageIndex < this.pageCount) {
							this.status = 'more';
						} else {
							this.status = 'nomore';
							this.contentText.contentnomore = '没有更多了';
						}
						this.isEmpty = false;

						if (res.data.data.length > 0) {
							this.goodsList = this.goodsList.concat(res.data.data);
							this.pageIndex++;
						}
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
.shop-top {
	height: 360rpx;
}
.shop-info {
	height: 240rpx;
	display: flex;
	position: relative;
	.shop-name {
		width: 100%;
		position: absolute;
		top: 140rpx;
		text-align: center;
		image {
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
		}
		view {
			text-align: center;
			line-height: 1;
			color: $ns-text-color-gray;
			font-weight: bold;
		}
	}
}
.goods-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 10rpx 36rpx;
	& > navigator {
		view {
			line-height: 1.5;
		}
		background: #fff;
		width: 47.5%;
		border-radius: 10rpx;
		margin-bottom: 36rpx;
		position: relative;
		.sale-num {
			top: 20rpx;
			position: absolute;
			z-index: 9;
			left: -14rpx;
			.sale-num-tag {
				padding: 0 $ns-padding;
				border-top-right-radius: 10rpx;
				border-bottom-right-radius: 10rpx;
				color: #fff;
				font-weight: bold;
			}
			.triangle {
				position: relative;
				width: 0px;
				height: 0px;
				border-width: 0 14rpx 8rpx 0;
				border-style: solid;
			}
		}
		.goods-img {
			height: 240rpx;
			border-bottom: 2rpx solid $ns-border-color-gray;
			image {
				max-width: 100%;
				max-height: 100%;
			}
		}
		.is-by {
			display: flex;
			justify-content: space-between;
			padding: $ns-padding;
			.tag {
				background: $base-color;
				color: #fff;
				border-radius: 10rpx;
				padding: 0 16rpx;
			}
		}

		.goods-title {
			padding: 0 $ns-padding;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}
}
.my-share {
	display: flex;
	justify-content: space-between;
	padding: 0 $ns-padding;
	text {
		font-weight: 900;
		line-height: 72rpx;
	}
}
.iconappreciate {
	font-size: 40rpx;
}
</style>
