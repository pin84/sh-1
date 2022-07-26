<template>
	<view>
		<view class="category-goods-list" :class="value.goods_list_type == 1 ? 'control-goods-list-big' : 'control-goods-list-small'">
			<view v-for="(item, index) in goodsList" :key="index" @click="goDetail(item.goods_id)" class="item ns-border-color-gray">
				<view class="control-thumbnail"><image :src="$util.img(item['pic_cover_mid'])" mode="aspectFit" /></view>

				<view class="control-con">
					<view v-if="value['goods_show_goods_name'] == 1" class="control-goods-name ns-font-size-base">
						<text v-if="item.group_name != ''" class="goods-tab ns-font-size-sm ns-bg-color">{{ item.group_name }}</text>
						<text>{{ item['goods_name'] }}</text>
					</view>
					
					<view v-if="value['goods_show_goods_price'] == 1" class="control-goods-price">
						<text class="ns-text-color price ns-font-size-lg">
							￥{{ item['promotion_price'] }}
							<text v-if="item.shipping_fee == 0" class="shipping-fee ns-font-size-sm ns-text-color ns-border-color">包邮</text>
						</text>
					</view>
				</view>
			</view>
		</view>
		
		
		
		<view class="category-goods-loading" v-if="loading_flag" @click="clickLoadMore">
			<uni-load-more :status="loading_status" 
							:contentText="contentText">
			</uni-load-more>
		</view>
		
		
		
		
	</view>
</template>

<script>
// 商品列表
import http from 'common/js/http.js';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';

export default {
	components: {
		uniLoadMore
	},
	name: 'diy-goods-list',
	props: {
		value: {
			type: Object,
			default: () => {
				return { goods_limit_count: 6, goods_source: 0 };
			}
		}
	},
	mixins: [http],
	data() {
		return {
			goodsList: [],
			loading_flag:false,
			timer:0,
			loading_status:'loading',
			contentText:{
				contentdown: "加载失败，点击重新刷新产品",
				contentrefresh: "正在刷新...",
				contentnomore: "没有更多数据了"}
		};
	},
	created() {
		this.getGoodsList();
	},
	methods: {
		clickLoadMore(){},
		
		getGoodsList() {
			let condition = JSON.stringify({
				'ng.category_id_1': this.value.goods_source,
				'ng.state': 1
			});
			
			this.loading_flag = true
			
			this.loading_status = 'loading'
			
			clearTimeout(this.timer)
			
			this.timer = setTimeout(()=>{
				
				if(this.goodsList.length === 0){
					
					this.loading_status = 'more'
					
					this.clickLoadMore = this.getGoodsList
				}
				
			}, 30000);
			
			this.sendRequest({
				url: 'System.Goods.getGoodsList',
				//data: { page_size: this.value.goods_limit_count, condition: condition },
				success: res => {
					// console.log(res)
					let data = res.data;
					if (data != null) {
						this.goodsList = data.data;
						this.loading_flag = false
						clearTimeout(this.timer)
					}
					
				}
			});
		},
		goDetail(goodsId) {
			this.$util.redirectTo('/pages/goodsDetail/goods-detail', { goods_id: goodsId });
		}
	}
};
</script>

<style>
.control-con{
	padding: 20rpx 20rpx 16rpx;
}
.control-thumbnail {
	text-align: center;
}
.control-goods-price {
	height: 60rpx;
	line-height: 60rpx;
}
.control-goods-price .price {
	font-weight: bold;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: inline-block;
	font-size: $ns-font-size-base;
}

.goods-tab {
	color: #fff;
	padding: 2rpx 6rpx;
	margin-right: 10rpx;
	border-radius: 4rpx;
}

.shipping-fee {
	background: #fff;
	padding: 2rpx 6rpx;
	margin-left: 10rpx;
	border-radius: 4rpx;
	border: 1px solid;
	display: inline-block;
	line-height: 1;
}

.control-goods-list-big .item {
	margin: 0 30rpx 30rpx;
	background-color: #fff;
	border-radius: 12rpx;
}
.control-goods-list-big .control-thumbnail{
	width: 690rpx;
	height: 500rpx;
}
.control-goods-list-big .control-thumbnail image{
	width: 690rpx;
	height: 500rpx;
}
.control-goods-list-big .item .control-goods-name {
	font-weight: bold;
	margin: 20rpx 0 0;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.control-goods-list-small {
	overflow: hidden;
	display: flex;
	flex-flow: wrap;
	padding: 0 30rpx;
}
.control-goods-list-small .item {
	margin: 2% 0;
	flex-direction: column;
	width: 48%;
	background: #fff;
	border-radius: 12rpx;
}
.control-goods-list-small .item:nth-child(2n + 1) {
	margin-right: 4%;
}
.control-goods-list-small .control-thumbnail {
	overflow: hidden;
	width: 334rpx;
	height: 260rpx;
	border-radius: 10rpx;
	text-align: center;
	line-height: 260rpx;
}
.control-goods-list-small .control-thumbnail image{
	width: 334rpx;
	height: 260rpx;
}
.control-goods-list-small .control-goods-name {
	font-weight: 600;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.category-goods-loading{
	width: 750upx;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 120upx;
}

</style>
