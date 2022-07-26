<template>
	<view>
		<view @touchmove.prevent.stop>
			<uni-popup ref="auth" :custom="true" :mask-click="false">
				<view class="uni-tip">
					<view class="uni-tip-title">您还未登录</view>
					<view class="uni-tip-content">请先登录之后再进行操作</view>
					<view class="uni-tip-icon"><image src="/static/images/member/not_logo.png" mode="widthFix"></image></view>
					<view class="uni-tip-group-button">
						<button type="default" class="uni-tip-button ns-text-color-gray" @click="noLogin">暂不登录</button>
						<!-- #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU -->
						<button type="primary" open-type="getUserInfo" @getuserinfo="bindgetuserinfo" class="uni-tip-button">立即登录</button>
						<!-- #endif  -->
						<!-- #ifdef MP-ALIPAY -->
						<button type="primary" open-type="getAuthorize" scope="userInfo" @getAuthorize="bindgetuserinfo" class="uni-tip-button ns-bg-color">立即登录</button>
						<!-- #endif  -->
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
import uniPopup from '../uni-popup/uni-popup.vue';
import http from 'common/js/http.js';

export default {
	name: 'ns-login',
	components: {
		uniPopup
	},
	mixins: [http],
	props: {
		href: ''
	},
	data() {
		return {};
	},
	created() {
		// #ifdef H5
		if (this.$util.isWeiXin()) {
			const getUrlCode = function() {
				var url = location.search;
				var theRequest = new Object();
				if (url.indexOf('?') != -1) {
					var str = url.substr(1);
					var strs = str.split('&');
					for (var i = 0; i < strs.length; i++) {
						theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1];
					}
				}
				return theRequest;
			};
			var urlParams = getUrlCode();
			if (urlParams.code != undefined && urlParams.code != '') {
				this.sendRequest({
					url: 'System.WchatPublic.getOpenid',
					data: { code: urlParams.code },
					success: res => {
						if (res.data.openid != undefined) {
							Object.assign(res.data, { provider: 'weixinPublic' });
							this.checkOpenid(res.data);
						} else {
							this.$util.redirectTo('/pages/login/login/login', { goback: 'member_index' });
						}
					}
				});
			}
		}
		// #endif
	},
	methods: {
		noLogin() {
			this.$refs.auth.close();
		},
		clickLogin() {
			// #ifdef H5
			if (this.$util.isWeiXin()) {
				this.sendRequest({
					url: 'System.WchatPublic.getCode',
					data: {
						redirect_uri: location.href
					},
					success: res => {
						if (res.data.code == 0) {
							location.href = res.data.url;
						} else {
							this.$util.showToast({
								title: res.data.message,
								success: () => {
									setTimeout(() => {
										this.$util.redirectTo('/pages/login/login/login', { goback: this.href });
									}, 1000);
								}
							});
						}
					}
				});
			} else {
				this.$util.redirectTo('/pages/login/login/login', { goback: this.href });
			}
			// #endif

			// #ifdef MP
			this.$refs.auth.open();
			// #endif
		},
		// 小程序获取授权登录
		bindgetuserinfo() {
			this.$refs.auth.close();
			this.getOpenid();
		},
		// 获取openid
		getOpenid() {
			// 获取服务商
			var provider = [];
			uni.getProvider({
				service: 'oauth',
				success: res => {
					provider = res.provider;
				}
			});
			if (provider[0] != undefined) {
				uni.login({
					provider: provider[0],
					timeout: 3000,
					scopes: 'auth_user',
					success: res => {
						if (res.errMsg == 'login:ok') {
							switch (provider[0]) {
								// 微信小程序
								case 'weixin':
									this.sendRequest({
										url: 'System.Login.getWechatBasicInfo',
										data: { code: res.code },
										success: res => {
											if (res.data != undefined) {
												var data = JSON.parse(res.data);
												if (data.errcode == undefined) {
													Object.assign(data, { provider: 'weixin' });
													this.checkOpenid(data);
												} else {
													this.$util.showToast({
														title: data.errmsg
													});
												}
											}
										}
									});
									break;
								case 'alipay':
									console.log(res);
									break;
							}
						} else {
							this.$util.showToast({
								title: res.errMsg
							});
						}
					},
					fail: res => {
						// this.$util.redirectTo('/pages/login/login/login', { goback: this.href });
					}
				});
			}
		},
		checkOpenid(params) {
			let data = {};
			if (params.provider) data.provider = params.provider;
			if (params.openid) data.openid = params.openid;
			if (params.unionid) data.unionid = params.unionid;

			Object.assign(data, params);

			uni.setStorage({
				key: 'bind_data',
				data: data,
				success: () => {
					this.$util.redirectTo('/pages/login/login/login');
				}
			});
		}
	}
};
</script>

<style>
.uni-tip {
	width: 600rpx;
	background: #fff;
	box-sizing: border-box;
	border-radius: 20rpx;
	overflow: hidden;
	height: initial;
}

.uni-tip-title {
	text-align: center;
	font-weight: bold;
	font-size: $ns-font-size-lg;
	padding: $ns-padding;
}

.uni-tip-content {
	padding: 0 30rpx;
	color: #666;
}

.uni-tip-icon {
	width: 100%;
	text-align: center;
}

.uni-tip-icon image {
	width: 300rpx;
}

.uni-tip-group-button {
	margin-top: 20rpx;
	line-height: 120rpx;
	display: flex;
	border-top: 2rpx solid $ns-border-color-gray;
}

.uni-tip-button {
	width: 100%;
	text-align: center;
	border: none;
	border-radius: 0;
	padding: 0;
	margin: 0;
	background: #fff;
}

.uni-tip-button:after {
	border: none;
}
</style>
