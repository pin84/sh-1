<template>
	<view class="apply-promoter">
		<template v-if="info && info.promoter_info && reapply == 0">
			<template v-if="info.promoter_info.is_audit == 0">
				<view class="frog ns-text-color-gray">
					<image src="/static/images/distribution/agent_apply.png" class="w107" mode="widthFix" />
					<text>申请正在审核中......</text>
					<button type="primary" @click="goMember()">返回会员中心</button>
				</view>
			</template>
			<template v-else-if="info.promoter_info.is_audit == -1">
				<div class="frog ns-text-color-gray">
					<image src="/static/images/distribution/agent_apply.png" class="w107" mode="widthFix" />
					<text>申请已被拒绝......</text>
				</div>
			</template>
		</template>
		<template v-else>
			<view class="title-img"><image :src="$util.img('upload/default/apply_promoter_bg.png')" mode="widthFix" /></view>
			<template v-if="promoterLevel">
				<view class="apply-content">
					<view class="apply-title ns-border-color">申请等级</view>
					<view class="content-wrap ns-border-color-gray">
						<text class="info">{{ promoterLevel.level_name }}（消费满{{ promoterLevel.level_money }}/已消费{{ shopSaleMoney }}）</text>
					</view>
				</view>

				<view class="apply-content">
					<view class="apply-title ns-border-color">申请信息</view>
					<view class="content-wrap ns-border-color-gray">
						<text class="label">店铺名称</text>
						<input class="uni-input" type="text" v-model="promoterShopName" placeholder="请输入店铺名称" />
					</view>
				</view>

				<button type="primary" class="apply-promoter-btn" @click="applyPromoter()">申请</button>
			</template>
			<template v-else>
				<view class="no-apply">暂无可申请等级</view>
			</template>
		</template>

		<view class="apply-content-desc ns-text-color-gray" v-if="info && info['promoter_level']">
			<text>
				<text class="iconquestionfill iconfont"></text>
				等级说明：
			</text>
			<view class="item ns-text-color-gray" v-for="(item, index) in info.promoter_level" :key="index">
				{{ item['level_name'] }}:需消费满{{ item['level_money'] }},本店销售佣金比率：{{ item['level_0'] }}%,给上级的佣金比率：{{ item['level_1'] }}%,给上上级的佣金比率：{{
					item['level_2']
				}}%;
			</view>
		</view>

		<view class="apply-content">
			<div class="apply-title-item ns-border-color-gray">
				<image src="/static/images/distribution/apply_promoter_add.png" mode="widthFix" />
				<text class="item-title">无门槛加入</text>
				<text class="text12 ns-text-color-gray">零成本、不囤货，轻松获利</text>
			</div>
			<div class="apply-title-item ns-border-color-gray">
				<image src="/static/images/distribution/apply_promoter_extension.png" mode="widthFix" />
				<text class="item-title">多维度推广</text>
				<text class="text12 ns-text-color-gray">商品、商铺、二维码任选</text>
			</div>
			<div class="apply-title-item ns-border-color-gray">
				<image src="/static/images/distribution/apply_promoter_team.png" mode="widthFix" />
				<text class="item-title">新增团队玩法</text>
				<text class="text12 ns-text-color-gray">支持线上组件团队，奖励更多</text>
			</div>
		</view>
		<loading-cover ref="loadingCover"></loading-cover>
	</view>
</template>

<script>
import http from 'common/js/http.js';
import loadingCover from '@/components/loading/loading.vue';
export default {
	mixins: [http],
	components: {
		loadingCover
	},
	data() {
		return {
			shopSaleMoney: 0,
			info: null,
			promoterLevel: null,
			reapply: 0,
			flag: false, //防重复标识
			promoterShopName: ''
		};
	},
	async onShow() {
		this.getCheckApplyPromoter();
	},
	methods: {
		// 推广商申请检测
		getCheckApplyPromoter() {
			this.sendRequest({
				url: 'System.Distribution.checkApplyPromoter',
				success: async res => {
					let data = res.data;
					if (data) {
						this.flag = true;
						this.info = data;
						if (this.info.promoter_info && this.info.promoter_info.is_audit == 1) {
							this.$util.redirectTo('/distributionpages/index/index', {}, '', 'redirectTo');
							return;
						}

						await this.getUserConsume();
						for (var i = 0; i < this.info.promoter_level.length; i++) {
							if (this.info.promoter_level[i].level_money <= this.shopSaleMoney) {
								this.promoterLevel = this.info.promoter_level[i];
								break;
							}
						}
						if (this.$refs.loadingCover == undefined) return;
						this.$refs.loadingCover.hide();
					} else {
						this.$util.showToast({
							title: res.message
						});
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 1000);
					}
				}
			});
		},
		// 用户店铺消费
		async getUserConsume() {
			let res = await this.sendRequest({
				url: 'System.Distribution.userConsume',
				async: false,
				success: res => {}
			});

			let data = res.data;
			if (data) this.shopSaleMoney = data;
		},
		//申请推广员
		applyPromoter() {
			if (Number(this.promoterLevel.level_money) > Number(this.shopSaleMoney)) {
				this.$util.showToast({
					title: '您未满足消费条件!'
				});
				return;
			}
			if (this.promoterShopName == '') {
				this.$util.showToast({
					title: '名称不能为空!'
				});
				return;
			}
			if (this.flag) {
				this.flag = false;
				this.sendRequest({
					url: 'System.Distribution.applyPromoter',
					data: { promoter_shop_name: this.promoterShopName },
					success: res => {
						if (res.data > 0) {
							this.$util.showToast({
								title: '已提交申请,等待审核'
							});
							setTimeout(() => {
								this.getCheckApplyPromoter();
							}, 1000);
						} else {
							this.flag = true;
							this.$util.showToast({
								title: '申请失败,等待审核'
							});
						}
					}
				});
			} else {
				this.$util.showToast({
					title: '请勿重复提交申请'
				});
			}
		},
		goMember() {
			this.$util.redirectTo('/pages/member/index/index', {}, 'tabbar');
		}
	}
};
</script>

<style lang="scss">
.title-img image {
	width: 100%;
	background: #fff;
}

.apply-content {
	margin: $ns-margin;
	border-radius: 10rpx;
	background-color: #fff;
	overflow: hidden;
	padding: 0 $ns-padding;
	.apply-title {
		border-left: 6rpx solid;
		margin: 20rpx 0;
		padding-left: 20rpx;
		line-height: 1;
	}
	.content-wrap {
		padding: 20rpx 0;
		border-top: 2rpx solid;
		.info {
			display: inline-block;
			width: 92%;
			height: 60rpx;
			line-height: 60rpx;
			margin: 0 4%;
			font-size: $ns-font-size-sm;
		}
	}
	.apply-title-item {
		width: 97%;
		display: inline-block;
		overflow: hidden;
		border-bottom: 2rpx solid;
		padding: 20rpx 10rpx;
		&:last-child {
			border-bottom: none;
		}
		image {
			margin-right: 20rpx;
			display: inline-block;
			width: 52rpx;
			float: left;
			margin-top: 9px;
		}
	}
}
.label,
.uni-input {
	height: 42rpx;
	display: inline-block;
	line-height: 42rpx;
	padding: 12rpx 20rpx;
	vertical-align: middle;
}

.apply-promoter-btn {
	margin-top: 80rpx;
	margin-bottom: 40rpx;
}

.item-title {
	margin-bottom: 10rpx;
	display: block;
}
.no-apply {
	text-align: center;
	margin-top: 80rpx;
}
.apply-content-desc {
	padding: 20rpx 30rpx;
}

.frog {
	text-align: center;
	padding-bottom: 20rpx;
	image {
		width: 250rpx;
		display: block;
		margin: 80rpx auto 30rpx;
	}
	text {
		font-size: $ns-font-size-base;
	}
	button {
		margin-top: 80rpx;
		margin-bottom: 20rpx;
	}
}
.iconquestionfill {
	margin-right: $ns-margin - 10rpx;
}
</style>
