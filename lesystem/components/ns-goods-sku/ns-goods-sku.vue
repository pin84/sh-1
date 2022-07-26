<template>
	<view>
		<uni-popup ref="nsSkuPopup" type="bottom" class="sku-layer">
			<view class="sku-info" :style="{ height: systemInfo.windowHeight * 0.8 + 'px' }">
				<view class="header">
					<view class="img-wrap"><image class="wrap-image" :src="$util.img(selectedSkuInfo.picCoverSmall)" /></view>
					<view class="main">
						<view v-if="goodsDetail['is_open_presell'] == 1">
							<view class="price-wrap">
								<text class="price ns-text-color">定金¥{{ goodsDetail.presell_price }}</text>
							</view>
						</view>
						<view v-else>
							<view class="price-wrap">
								<template v-if="(goodsDetail.point_exchange_type == 2 && fromSource == 'point') || goodsDetail.point_exchange_type == 3">
									<!--积分-->
									<text class="price ns-text-color">{{ goodsDetail.point_exchange }}积分</text>
								</template>
								<template v-else>
									<text class="price ns-text-color">{{ selectedSkuInfo.displayPrice }}</text>
								</template>
							</view>
						</view>

						<view v-if="goodsDetail.is_stock_visible == 1" class="stock">
							库存{{ selectedSkuInfo.stock }}
							<template v-if="goodsDetail.goods_unit != ''">
								{{ goodsDetail.goods_unit }}
							</template>
							<template v-else>
								件
							</template>
						</view>

						<view class="sku-name">
							<template v-if="currentGoodsSkuName.length > 0">
								已选择：
								<text v-for="(item, index) in currentGoodsSkuName" :key="index">{{ item }}</text>
							</template>
						</view>
					</view>

					<view class="sku-close iconfont iconclose" @click="closeSkuPopup()"></view>
				</view>

				<scroll-view scroll-y>
					<view class="body-item">
						<view v-for="(item, index) in goodsDetail['spec_list']" :key="index" class="sku-list-wrap">
							<text class="title">{{ item.spec_name }}</text>
							<view
								v-for="(item_value, index_value) in item.value"
								:key="index_value"
								class="items ns-border-color-gray ns-bg-color-gray"
								:class="{ selected: item_value['selected'], disabled: item_value['disabled'] }"
								@click="selectedSku(item_value)"
							>
								<template v-if="item_value.spec_show_type == 2">
									<text>{{ item_value.spec_value_name }}</text>
								</template>
								<template v-else-if="item_value.spec_show_type == 2">
									<!-- 图片 -->
									<image class="items-image" v-if="item_value.spec_value_data != ''" :src="$util.img(item_value.spec_value_data)"></image>
									<text>{{ item_value.spec_value_name }}</text>
								</template>

								<template v-else-if="item_value.spec_show_type == 1">
									<!-- 颜色 -->
									<text v-if="item_value.spec_value_data != ''" class="color" :style="{ background: item_value.spec_value_data }"></text>
									<text>{{ item_value.spec_value_name }}</text>
								</template>
							</view>
						</view>

						<view class="number-wrap">
							<view class="number-line">
								<text class="title">购买数量</text>
								<text class="limit-txt" v-if="goodsDetail['max_buy'] > 0">
									(每人限购{{ goodsDetail['max_buy'] }}
									<template v-if="goodsDetail.goods_unit != ''">
										{{ goodsDetail.goods_unit }}
									</template>
									<template v-else>
										件
									</template>
									)
								</text>

								<view class="number">
									<button type="default" class="button decrease" @click="changeNum('-')">-</button>
									<input class="uni-input" type="number" v-model="number" placeholder="0" @input="keyInput" />
									<button type="default" class="button increase" @click="changeNum('+')">+</button>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>

				<button type="primary" @click="confirm()" class="footer" :class="{ disabled: selectedSkuInfo.stock == 0 }">确定</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '..//uni-popup/uni-popup.vue';
import http from 'common/js/http.js';
export default {
	name: 'NsGoodsSku',
	components: {
		uniPopup
	},
	mixins: [http],
	props: {
		options: {
			type: Array,
			default() {
				return [
					{
						icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/dianpu.png',
						text: '店铺'
					}
				];
			}
		},
		buttonGroup: {
			type: Array,
			default() {
				return [
					{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					}
				];
			}
		},
		goodsId: {
			type: [Number, String],
			default: 0
		}
	},
	data() {
		return {
			systemInfo: {},
			goodsDetail: {}
		};
	},
	created() {
		this.systemInfo = uni.getSystemInfoSync();
		this.getSkuList();
		// this.openPopup();
	},
	methods: {
		onClick(index, item) {
			this.$emit('click', {
				index,
				content: item
			});
		},
		getSkuList() {
			this.sendRequest({
				url: 'NsCombopackage.ComboPackage.comboPackageSelectSku',
				data: { goods_id: this.goodsId },
				success: res => {
					let data = res.data;
					if (data != null) {
						this.goodsDetail = data;
					}
				}
			});
		},

		changeNum(tag) {
			if (this.selectedSkuInfo.stock == 0) return;

			if (tag == '+') {
				// 加
				if (this.number < this.maxBuy) {
					this.number++;
				} else {
					return;
				}
			} else if (tag == '-') {
				// 减
				if ((this.number > this.minBuy && this.minBuy > 0) || (this.number > 1 && this.minBuy == 0)) {
					this.number -= 1;
				} else {
					return;
				}
			}
		},
		//输入数量
		keyInput() {
			if (this.selectedSkuInfo.stock == 0) {
				this.number = 0;
				return;
			}

			this.number = parseInt(this.number);

			if (this.minBuy > 0 && this.number < this.minBuy) {
				this.number = this.minBuy;
				return;
			}

			if (this.maxBuy > 0 && this.number > this.maxBuy) {
				this.number = this.maxBuy;
			}
		},
		// 打开优惠券弹出层
		open() {
			this.$refs.nsSkuPopup.open();
		},
		// 关闭优惠券弹出层
		close() {
			this.$refs.nsSkuPopup.close();
		}
	}
};
</script>

<style>
scroll-view {
	height: 65%;
}
.header {
	padding: 30rpx 0 30rpx 300rpx;
	position: relative;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.img-wrap {
	width: 250rpx;
	height: 250rpx;
	position: absolute;
	top: -56rpx;
	left: 20rpx;
	border-radius: 8rpx;
	overflow: hidden;
	border: 1px solid rgba(0, 0, 0, 0.1);
	padding: 2rpx;
	background-color: #fff;
	line-height: 208rpx;
}

.img-wrap .wrap-image {
	width: 100%;
	height: 100%;
}
.main {
	font-size: 12px;
	line-height: 40rpx;
	padding-right: 40rpx;
}
.main .price {
	font-size: $ns-font-size-lg;
	word-wrap: break-word;
}
.main .sku-name {
	display: -webkit-box;
	font-size: $ns-font-size-sm;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	height: 90rpx;
	overflow: hidden;
}
.sku-name text {
	margin-right: 10rpx;
}
.sku-close {
	position: absolute;
	top: 20rpx;
	right: 20rpx;
	width: 40rpx;
	height: 80rpx;
	font-size: 50rpx;
}
.body-item {
	padding: 0 30rpx 20rpx;
}
.sku-list-wrap {
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	padding-bottom: 20rpx;
}
.title {
	font-size: $ns-font-size-base;
	font-weight: 400;
	padding: 26rpx 0;
	margin: 0;
	display: block;
}
.items {
	position: relative;
	display: inline-block;
	border: 1px solid;
	padding: 4rpx 20rpx;
	border-radius: 16rpx;
	font-size: $ns-font-size-base;
	margin: 0 10rpx 10rpx 0;
}
.items .disabled {
	border: 1px dashed;
}
.items .items-image,
.color {
	height: 48rpx;
	width: 48rpx;
	border-radius: 4rpx;
	margin-right: 10rpx;
	display: inline-block;
	vertical-align: middle;
}
.number-line {
	padding: 20rpx 0;
	line-height: 72rpx;
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.title {
	font-size: $ns-font-size-base;
	font-weight: 400;
}
.limit-txt {
	font-size: $ns-font-size-sm;
}
.number {
	height: 72rpx;
	border-radius: 6rpx;
	float: right;
}
.number .button {
	display: inline-block;
	line-height: 64rpx;
	height: 68rpx;
	width: 60rpx;
	font-size: 48rpx;
	box-sizing: content-box;
	border: 1px solid;
	padding: 0;
	margin: 0;
	border-radius: 0;
}
.number .button.decrease {
	border-right: 1px solid #fff !important;
}
.number .button.increase {
	border-left: 1px solid #fff !important;
}
.number .button:after {
	border-radius: 0;
	border: none;
}
.number .uni-input {
	display: inline-block;
	line-height: 64rpx;
	height: 68rpx;
	width: 72rpx;
	text-align: center;
	font-size: $ns-font-size-base;
	font-weight: 700;
	border: 1px solid;
	margin: 0;
	padding: 0;
}
.footer {
	margin: 0;
	height: 96rpx;
	text-align: center;
	line-height: 96rpx;
	width: 100%;
	position: absolute;
	bottom: 0;
	color: #fff;
	z-index: 1;
	border-radius: 0;
}
.footer.disabled {
	cursor: not-allowed !important;
	pointer-events: none !important;
	opacity: 0.5 !important;
	box-shadow: none !important;
	filter: grayscale(100%);
}
</style>
