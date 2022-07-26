<template>
	<view>
		<view class="distribution-shop-edit">
			<!-- <image class="bg-img" src="/static/images/distribution/shop_edit.png" mode="widthFix"></image> -->
			<view class="shop-edit-wrap">
				<view class="shop-name">
					<text class="head">店铺名称：</text>
					<input type="text" class="uni-input" placeholder="请输入店铺名称" v-model="promoterInfo.promoter_shop_name" />
				</view>
				<view class="bg-wrap">
					<view class="head">店铺背景图</view>
					<view class="js-save upload-img ns-border-color-gray-shade-20" @click="upload">
						<view v-if="promoterInfo.background_img">
							<image class="bg-image"  :src="$util.img(promoterInfo.background_img)" mode="widthFix"></image>
						</view>
						<view v-else class="add-wrap">
							<text class="iconfont iconadd"></text>
						</view>
					</view>
				</view>
				<button type="primary" @click="saveImage()">保存</button>
			</view>
		</view>
		<ns-login ref="login" href="distribution"></ns-login>
	</view>
</template>

<script>
import http from 'common/js/http.js';
import nsLogin from 'components/ns-login/ns-login.vue';
export default {
	components: {
		nsLogin
	},
	data() {
		return {
			promoterInfo: {
				background_img:''
			},
			promoterId: ''
		};
	},
	mixins: [http],
	onLoad(event) {
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
		
		this.promoterId = event.promoter_id;
		this.getPromoterDetail();
	},
	onShow() {
		
	},
	methods: {
		/* 获取当前图片 */
		getPromoterDetail() {
			this.sendRequest({
				url: 'System.Distribution.promoterDetail',
				success: res => {
					this.promoterInfo = res.data;
				}
			});
		},
		/* 保存图片 */
		saveImage() {
			if (this.promoterInfo.background_img == '') {
				this.$util.showToast({
					title: '请上传图片'
				});
				return;
			}
			var params = {
				promoter_id: this.promoterId,
				promoter_shop_name: this.promoterInfo.promoter_shop_name,
				background_img: this.promoterInfo.background_img
			};
			this.sendRequest({
				url: 'System.Distribution.updatePromoter',
				data: params,
				success: res => {
					if (res.data > 0) {
						this.$util.showToast({
							title: '提交成功'
						});
						setTimeout(() => {
							this.$util.redirectTo('/distributionpages/index/index', {}, '', 'redirectTo');
						}, 1000);
					} else {
						this.$util.showToast({
							title: res.message
						});
					}
				}
			});
		},
		// 上传
		upload: function() {
			this.$util.upload(1, { file_path: 'wap_member' }, res => {
				this.promoterInfo.background_img = res[0];
			});
		}
	}
};
</script>

<style lang="scss">
page {
	overflow: hidden;
	background: $page-color-base;
}
.distribution-shop-edit {
	background: url(../../static/images/distribution/shop_edit.png) no-repeat top;
	background-size: 100%;
	.bg-img{
		width: 100%;
	}
	.shop-edit-wrap{
		box-sizing: border-box;
		padding: 0 30rpx;
		padding-top: 190rpx;
		.shop-name{
			line-height: 100rpx;
			border-radius: $ns-border-radius;
			overflow: hidden;
			box-sizing: border-box;
			padding: 0 30rpx;
			background: #fff;
			.head {
				font-size: 14px;
				display: block;
				float: left;
			}
			input {
				height: 100rpx;
				line-height: 100rpx;
				border: none;
				box-sizing: border-box;
			}
		}
		.bg-wrap{
			margin-top: 20rpx;
			border-radius: $ns-border-radius;
			box-sizing: border-box;
			padding: 0 30rpx 30rpx;
			background: #fff;
			.head{
				font-size: 14px;
				line-height: 100rpx;
				margin-bottom: 30rpx;
				border-bottom: 2rpx solid $ns-border-color-gray;
			}
		}
	}
}

.distribution-shop-edit button {
	line-height: 80rpx;
	height: 80rpx;
	border-radius: 10rpx;
	border: 0;
	width: 90%;
	margin: 100rpx auto 0;
	display: block;
}
.upload-img {
	position: relative;
	min-height: 200rpx;
	text-align: center;
	.add-wrap{
		 border: 2rpx dashed $ns-border-color-gray;
	}
	.iconfont{
		font-size: 80rpx;
		line-height: 200rpx;
		color:$ns-text-color-gray;
	}
	image {
		width: 100%;
	}
}

.upload-img .input-file {
	width: 100%;
	height: 100% !important;
	padding: 0;
	border: none 0;
	opacity: 0;
	filter: alpha(opacity=0);
	cursor: pointer;
	margin: 0 2% 0 2%;
	position: absolute;
	z-index: 10;
	top: 0;
	max-width: 100% !important;
}
</style>
