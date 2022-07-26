<template>
	<view>
		<view>
			<view class="hr-view">
				<view class="hr"></view>
				<text>可能你想要</text>
				<view class="hr"></view>
			</view>

			<view class="category-goods-list">
				<view v-for="(item, index) in goodsList" :key="index" @click="goDetail(item.goods_id)" class="item ns-border-color-gray">
					<view class="control-thumbnail"><image :src="$util.img(item['pic_cover_mid'])" mode="widthFix" /></view>

					<view class="control-goods-name ns-font-size-base">
						<text v-if="item.group_name != ''" class="ns-font-size-sm ns-bg-color">{{ item.group_name }}</text>
						<text>{{ item['goods_name'] }}</text>
					</view>

					<view class="control-goods-price">
						<text class="ns-text-color price ns-font-size-lg">
							￥{{ item['promotion_price'] }}
							<text v-if="item.shipping_fee == 0" class="shipping-fee ns-font-size-sm ns-text-color ns-border-color">包邮</text>
						</text>
					</view>
				</view>
			</view>
			<uni-load-more :status="status" v-if="goodsList.length > 0 && pageCount > 1" />
		</view>
	</view>
</template>

<script>
// 商品推荐
import http from 'common/js/http.js';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';

export default {
	name: 'ns-goods-recommend',
	components: {
		uniLoadMore
	},
	mixins: [http],
	data() {
		return {
			pageIndex:1,
			pageSize:6,
			goodsList: [],
			status: 'loading',
			pageCount: 0,
			ident: false //防止初始化时，触发上拉加载
		};
	},
	created() {
		this.getGoodsList();
	},
	methods: {
		getGoodsList() {
			this.status = 'loading';
			this.sendRequest({
				url: 'System.Goods.guessMemberLikes',
				data: { page_size: this.pageSize, page_index: this.pageIndex },
				success: res => {
					let data = res.data;
					this.ident = true;
					if (data != null) {
						// this.goodsList = data.data;
						let goosList = data.data;
						let pageCount = data.page_count;
						this.pageCount = pageCount;
						if (this.pageCount == 0) {
							this.status = 'nomore';
						} else {
							if (this.pageIndex < this.pageCount) {
								this.status = 'more';
							} else {
								this.status = 'nomore';
							}
							if (goosList.length > 0) {
								this.goodsList = this.goodsList.concat(goosList);
								this.pageIndex++;
							}
						}
					}
				}
			});
		},
		goDetail(goodsId) {
			this.$util.redirectTo('/pages/goods/detail/detail', { goods_id: goodsId });
		}
	}
};
</script>

<style>
.hr-view {
	margin-top: 120rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	box-sizing: border-box;
}
.hr-view .hr {
	width: 36%;
	height: 2rpx;
	background: #e5e5e5;
}
.hr-view text {
	font-size: 24rpx;
	color: #898989;
}
.category-goods-list {
	margin-top: 20rpx;
	width: 100%;
	display: flex;
	flex-flow: wrap;
}
.item {
	padding: 20rpx;
	margin-right: 20rpx;
	margin-bottom: 20rpx;
	box-sizing: border-box;
	background: #fff;
	width: calc(50% - 12rpx);
}
.item .control-goods-price {
	height: 60rpx;
	line-height: 60rpx;
}
.item .control-goods-price .price {
	font-weight: bold;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: inline-block;
}
.item .control-goods-name {
	margin: 20rpx 0 0;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.item .control-goods-name .goods-tab {
	color: #fff;
	padding: 2rpx 6rpx;
	margin-right: 10rpx;
	border-radius: 4rpx;
}
.item .control-thumbnail {
	text-align: center;
}
.item .control-thumbnail image {
	width: 100%;
}
.item:nth-child(2n) {
	margin-right: 0;
}
</style>
