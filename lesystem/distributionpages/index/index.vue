<template>
	<view>
		<view class="distribution-container" v-if="promoterInfo">
			<view
				class="member-head ns-bg-color"
				:style="{ background: promoterInfo['background_img'] ? 'url(' + $util.img(promoterInfo['background_img']) + ')' : '' }"
				:class="!promoterInfo['background_img'] ? 'ns-bg-color' : ''"
			>
				<navigator url="/distributionpages/account/account" class="user-info-box" v-if="memberInfo">
					<view class="face-img">
						<image :src="memberInfo.user_headimg ? $util.img(memberInfo.user_headimg) : '/static/images/default_head.png'" mode="aspectFill"></image>
					</view>
					<view class="info">
						<text class="promoter-shop-name">{{ promoterInfo.promoter_shop_name }}的店铺</text>
						<view class="level-name">
							<text class="iconfont iconzuanshi1"></text>
							<text>{{ promoterInfo['promoter_level_info']['level_name'] }}</text>
						</view>
					</view>
				</navigator>
				<navigator class="qrcode iconfont iconqrcode" url="/distributionpages/share_shop/share_shop"></navigator>
			</view>

			<view class="main" v-if="promoterInfo.commission">
				<view class="quick-wrap">
					<view class="item" @click="$util.redirectTo('/distributionpages/team/team', { promoter_id: promoterInfo.promoter_id })">
						<text class="num">{{ promoterInfo.team_count }}</text>
						<text>我的团队</text>
					</view>
					<view class="line"></view>
					<view class="item" @click="$util.redirectTo('/distributionpages/commission_shop/commission_shop')">
						<text class="num">{{ promoterInfo.commission.commission_cash }}</text>
						<text>可提现佣金</text>
					</view>
					<view class="line"></view>
					<view class="item" @click="$util.redirectTo('/distributionpages/commission_shop/commission_shop')">
						<text class="num">{{ promoterInfo.commission.commission }}</text>
						<text>累计佣金</text>
					</view>
				</view>

				<view class="distribution-goods">
					<view class="distribution-goods-title">
						<view class="pull-left">
							<text class="iconfont iconhuo"></text>
							<text class="ns-font-size-lg">推荐商品</text>
						</view>
						<navigator url="/distributionpages/goods/goods" class="pull-right ns-text-color-gray">
							<text>添加推荐商品</text>
							<text class="iconfont ns-text-color">&#xe6a3;</text>
						</navigator>
					</view>
					<view class="goods-list">
						<navigator :url="'/pages/goods/detail/detail?goods_id=' + item.goods_id" class="item" v-for="(item, index) in distributionGoodsList" :key="index">
							<image :src="$util.img(item['pic_cover_small'])" mode="widthFix" />
						</navigator>
					</view>
				</view>

				<view class="shop-box">
					<view class="shop-box-head" @click="openMenu('shop')">
						<text class="title">店铺</text>
						<text class="iconfont ns-text-color-gray ns-font-size-base" :class="menu.shop.switch == false ? 'iconunfold' : 'iconfold'"></text>
					</view>
					<view v-if="menu.shop.switch == true" class="shop-box-list">
						<view @click="redirectToLink('/distributionpages/team/team?promoter_id=' + promoterInfo.promoter_id)" class="shop-box-list-item">
							<image src="/static/images/distribution/store_my_team.png" mode="aspectFill"></image>
							<view>我的团队</view>
						</view>
						<view @click="redirectToLink('/distributionpages/user_shop_goods/user_shop_goods')" class="shop-box-list-item">
							<image src="/static/images/distribution/store_my_shop.png" mode="aspectFill"></image>
							<view>我的店铺</view>
						</view>
						<view @click="redirectToLink('/distributionpages/shop_edit/shop_edit?promoter_id=' + promoterInfo.promoter_id)" class="shop-box-list-item">
							<image src="/static/images/distribution/store_my_shop_edit.png" mode="aspectFill"></image>
							<view>店铺设置</view>
						</view>
						<view @click="redirectToLink('/distributionpages/share_shop/share_shop')" class="shop-box-list-item">
							<image src="/static/images/distribution/store_my_share.png" mode="aspectFill"></image>
							<view>店铺推广</view>
						</view>
						<view @click="redirectToLink('/distributionpages/my_goods/my_goods')" class="shop-box-list-item">
							<image src="/static/images/distribution/store_my_goodsfx.png" mode="aspectFill"></image>
							<view>推荐商品</view>
						</view>
					</view>
				</view>
				<view class="shop-box">
					<view class="shop-box-head" @click="openMenu('commission')">
						<text class="title">佣金</text>
						<text class="iconfont ns-text-color-gray ns-font-size-base" :class="menu.commission.switch == false ? 'iconunfold' : 'iconfold'"></text>
					</view>
					<view v-if="menu.commission.switch == true" class="shop-box-list list-few">
						<view @click="redirectToLink('/distributionpages/commission_shop/commission_shop')" class="shop-box-list-item">
							<image src="/static/images/distribution/store_my_commission.png" mode="aspectFill"></image>
							<view>我的佣金</view>
						</view>
						<view @click="redirectToLink('/distributionpages/commission_recording/commission_recording')" class="shop-box-list-item">
							<image src="/static/images/distribution/store_my_processing.png" mode="aspectFill"></image>
							<view>进行中佣金</view>
						</view>
					</view>
				</view>
				<view class="shop-box">
					<view class="shop-box-head" @click="openMenu('agent')">
						<text class="title">代理商</text>
						<text class="iconfont ns-text-color-gray ns-font-size-base" :class="menu.agent.switch == false ? 'iconunfold' : 'iconfold'"></text>
					</view>
					<view v-if="menu.agent.switch == true" class="shop-box-list list-few">
						<template v-if="shopConfig && shopConfig.is_partner_enable > 0">
							<view
								@click="redirectToLink('/distributionpages/partner/partner')"
								v-if="promoterInfo && promoterInfo.shop_user_info.is_partner != 0"
								class="shop-box-list-item"
							>
								<image src="/static/images/distribution/store_partner.png" mode="aspectFill"></image>
								<view>股东</view>
							</view>

							<view @click="redirectToLink('/distributionpages/apply_partner/apply_partner')" v-else class="shop-box-list-item">
								<image src="/static/images/distribution/store_apply_partner.png" mode="aspectFill"></image>
								<view>申请股东</view>
							</view>
						</template>

						<template v-if="shopConfig && shopConfig.is_regional_agent > 0">
							<view
								@click="redirectToLink('/distributionpages/region/region')"
								v-if="promoterInfo && promoterInfo.shop_user_info.region_center_id != 0"
								class="shop-box-list-item"
							>
								<image src="/static/images/distribution/store_region_agent.png" mode="aspectFill"></image>
								<view>区域代理</view>
							</view>
							<view @click="redirectToLink('/distributionpages/apply_region/apply_region')" v-else class="shop-box-list-item long-item">
								<image src="/static/images/distribution/store_region_agent.png" mode="aspectFill"></image>
								<view>申请区域代理</view>
							</view>
						</template>
					</view>
				</view>
			</view>
		</view>

		<loading-cover ref="loadingCover"></loading-cover>
		<ns-login ref="login" href="distribution"></ns-login>
	</view>
</template>

<script>
import http from 'common/js/http.js';
import nsLogin from 'components/ns-login/ns-login.vue';
import uniGrid from '@/components/uni-grid/uni-grid.vue';
import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue';
import loadingCover from '@/components/loading/loading.vue';
export default {
	components: {
		uniGrid,
		uniGridItem,
		loadingCover,
		nsLogin
	},
	data() {
		return {
			memberInfo: {},
			promoterInfo: {
				background_img: '',
				promoter_level_info: ''
			},
			menu: {
				shop: {
					switch: true
				},
				commission: {
					switch: true
				},
				agent: {
					switch: true
				}
			},
			shopConfig: null,
			distributionGoodsList: null,
			uid: 0
		};
	},
	onLoad(data) {},
	onShow() {
		var isLogin = false;
		// #ifdef H5
		getApp().checkLogin(() => {
			isLogin = true;
			setTimeout(() => {
				this.$refs.login.clickLogin();
			}, 100);
		});
		// #endif
		// #ifdef MP
		getApp().$vm.checkLogin(() => {
			isLogin = true;
			this.$refs.login.clickLogin();
		});
		// #endif

		if (isLogin) return;

		this.getMemberInfo();
		this.getPromoterDetail();
		this.getShopConfig();
	},
	mixins: [http],
	methods: {
		//获取用户信息
		getMemberInfo() {
			this.sendRequest({
				url: 'System.Member.memberInfo',
				success: res => {
					if (res.code == 0 && res.data) {
						this.memberInfo = res.data.user_info;
						this.uid = this.memberInfo.uid;
					}
				}
			});
		},
		//推广详情
		getPromoterDetail() {
			this.sendRequest({
				url: 'Nsfx.Distribution.promoterDetail',
				success: res => {
					if (res.code == 0) {
						this.promoterInfo = res.data;
						if (this.promoterInfo) {
							this.getDistributionGoodsList();
						} else {
							this.$util.redirectTo('/distributionpages/apply_promoter/apply_promoter');
						}
					}
				}
			});
		},
		//店铺推广设置
		getShopConfig() {
			this.sendRequest({
				url: 'System.Distribution.shopConfig',
				success: res => {
					if (res.code == 0) {
						this.shopConfig = res.data;
					}
				}
			});
		},
		//推广商品列表
		getDistributionGoodsList() {
			this.sendRequest({
				url: 'System.Distribution.distributionGoodsList',
				data: { page: 1, page_size: 4, uid: this.uid, type: 'selected' },
				success: res => {
					if (res.code == 0) {
						this.distributionGoodsList = res.data.data;
					}
					if (this.$refs.loadingCover == undefined) return;
					this.$refs.loadingCover.hide();
				}
			});
		},
		/**
		 * 检测是否登录
		 */
		redirectToLink(url) {
			var isLogin = true;
			// #ifdef MP
			getApp().$vm.checkLogin(() => {
				isLogin = false;
				this.$util.redirectTo('/pages/member/index/index', {}, 'tabbar');
			});
			// #endif
			// #ifdef H5
			getApp().checkLogin(() => {
				isLogin = false;
				this.$util.redirectTo('/pages/member/index/index', {}, 'tabbar');
			});
			// #endif

			if (isLogin) this.$util.redirectTo(url);
		},
		// 打开菜单
		openMenu(item) {
			if (item == 'shop') {
				if (this.menu.shop.switch == false) {
					this.menu.shop.switch = true;
				} else {
					this.menu.shop.switch = false;
				}
			}
			if (item == 'commission') {
				if (this.menu.commission.switch == false) {
					this.menu.commission.switch = true;
				} else {
					this.menu.commission.switch = false;
				}
			}
			if (item == 'agent') {
				if (this.menu.agent.switch == false) {
					this.menu.agent.switch = true;
				} else {
					this.menu.agent.switch = false;
				}
			}
		}
	}
};
</script>

<style lang="scss">
%flex-row-centered {
	display: flex;
	justify-content: space-around;
	align-items: center;
}

%flex-column-centered {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.member-head {
	height: 300rpx;
	padding: 70rpx 50rpx 0;
	box-sizing: border-box;
	background-size: cover !important;
	.user-info-box {
		display: flex;
		align-items: flex-start;

		.face-img {
			box-sizing: content-box;
			width: 124rpx;
			height: 124rpx;
			border: 6rpx solid #fff;
			border-radius: 50%;
			overflow: hidden;

			image {
				width: 124rpx;
				height: 124rpx;
				vertical-align: middle;
			}
		}

		.info {
			max-width: 45%;
			margin-left: 20rpx;
			overflow: hidden;
			.promoter-shop-name {
				display: block;
				max-width: 300rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 36rpx;
				color: #fff;

				&:last-of-type {
					padding: 6rpx 10rpx;
					font-size: $ns-font-size-lg;
					color: #fff;
				}
			}
			.level-name {
				display: inline-block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: $base-color;
				border: 2rpx solid #e7e525;
				border-radius: 100rpx;
				background-color: #fff;
				font-size: $ns-font-size-sm;
				padding: 6rpx 16rpx;
				line-height: 1;
				image {
					width: 40rpx;
					height: 40rpx;
					vertical-align: middle;
					margin-right: 10rpx;
				}
				text {
					vertical-align: middle;
				}
			}
		}
	}

	.qrcode {
		position: absolute;
		right: 50rpx;
		top: 70rpx;
		font-size: 60rpx;
		color: #fff;
	}
}

.main {
	position: relative;
	margin-top: -58rpx;
	padding: 0 20rpx;
}

.quick-wrap {
	@extend %flex-row-centered;
	height: 140rpx;
	background-color: #fff;
	border-radius: 10rpx;

	.item {
		@extend %flex-column-centered;

		text {
			font-size: $ns-font-size-base;
		}

		.num {
			font-size: $ns-font-size-lg + 8rpx;
			color: $base-color;
		}
	}
}

.distribution-goods {
	margin: 30rpx auto;
	background: #fff;
	border-radius: $ns-border-radius;
	padding: 10rpx 0;

	.distribution-goods-title {
		width: 94%;
		margin: 0 auto;
		height: 80rpx;
		overflow: hidden;
		line-height: 80rpx;
		font-size: $ns-font-size-base;
		.iconfont {
			font-size: 32rpx;
			margin-left: 10rpx;
		}
		.pull-left {
			float: left;
			line-height: 80rpx;
		}
		.pull-right {
			float: right;
		}
	}

	.goods-list {
		width: 92%;
		margin: 0 auto;
		padding: 0 10rpx;
		overflow: hidden;
		.item {
			width: 22%;
			margin-right: 4%;
			float: left;
			min-height: 19vw;
			text-align: center;
			line-height: 100%;
			&:nth-child(4) {
				margin-right: 0;
			}
			image {
				width: 100%;
			}
		}
	}
}

.image {
	width: 110rpx;
	height: 110rpx;
}

.text {
	font-size: 26rpx;
	margin-top: 15rpx;
}
.line {
	width: 3rpx;
	height: 44rpx;
	background: $ns-bg-color-gray;
}
.iconzuanshi1 {
	color: #ffc703;
	margin-right: $ns-margin - 10rpx;
	font-size: 36rpx;
}
.iconhuo {
	color: $base-color;
	margin-right: $ns-margin - 10rpx;
}

.shop-box {
	border-radius: 10rpx;
	margin: $ns-margin 0;
	padding: $ns-padding;
	background: #fff;
	&-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.title {
			border-left: 4rpx solid $base-color;
			line-height: 1;
			height: 24rpx;
			padding-left: $ns-padding;
		}
	}

	&-list {
		border-top: 2rpx solid $ns-border-color-gray;
		display: flex;
		flex-wrap: wrap;
		padding: $ns-padding 0;
		&-item {
			width: 166rpx;
			text-align: center;
			line-height: 1;
			margin-top: $ns-margin - 10rpx;
			image {
				width: 84rpx;
				height: 84rpx;
			}
			view {
				font-size: $ns-font-size-sm;
			}
		}
		.long-item {
			width: 170rpx;
		}
	}
	.list-few {
		justify-content: unset;
	}
}
</style>
