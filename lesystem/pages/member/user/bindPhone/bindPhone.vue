<template>
	<view class="page-body login_container">
		<view>
			<view class="alignFlex whiteBg" style="padding: 20rpx;">
				<text class="iconfont icon-shouji1"></text>
				<input class="uni-input" v-model="submitData.UserName" maxlength="11" type="text" placeholder="请输入手机号" />
			</view>
			<view class="alignFlex whiteBg padding-lg" style="padding: 20rpx;">
				<text class="iconfont icon-yanzhengma1"></text>
				<input class="uni-input" v-model="submitData.UserYZM" type="text" maxlength="6" placeholder="请输入验证码" />
				<button id="getCode" class="getCode" @click="getCodeClick" :disabled="submitData.UserName.length!=11||!isClick"
				 :class="submitData.UserName.length!=11||!isClick?'error':'primary'">{{btnVal}}</button>
			</view>
		</view>
		<button @click="bindClick">绑定</button>
		<view class="flex margin-top-df">
		  <text class="text-black margin-right-sm text-sm" @click="backHome"
		    >返回首页</text
		  >
		</view>
	</view>
</template>

<script>
	import http from 'common/js/http.js';
	export default {
		data() {
			return {
				submitData: {
					UserName: '',
					UserYZM: '',
					record_id: ''
				},
				count: 60,
				isClick: true,
				btnVal: "获取验证码",
				Interval: ''
			}
		},
		methods: {
			backHome() {
			  uni.switchTab({
			    url: "/pages/index/index/index",
			  });
			},
			setTime() {
				this.sendRequest({
					url: 'System.SendMsg.sendVeryCode',
					method:"POST",
					data: {
						phone: this.submitData.UserName
					},
					success: res => {
						this.submitData.record_id = res.data.record_id;
						
					}
				})
			},
			getCodeClick() {
				if (!(/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test(this.submitData.UserName))) {
					this.$util.showToast({ title: '手机号不正确' });
					return false;
				} else {
					
					
					this.Interval = setInterval(() => {
						this.count--;
						if (this.count > 0) {
							this.isClick = false;
							this.btnVal = this.count + "s后重新获取";
						} else {
							this.count = 60;
							this.btnVal = "重新发送";
							this.isClick = true;
							clearInterval(this.Interval);
						}
					}, 1000);
					
					
					this.setTime();
				}
			},
			bindClick() {
				if (this.submitData.UserName == "") {
					this.$util.showToast({ title: '手机号不能为空' });
					return false;
				}
				if (!(/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test(this.submitData.UserName))) {
					this.$util.showToast({ title: '手机号不正确' });
					return false;
				}
				if (this.submitData.UserYZM == "") {
					this.$util.showToast({ title: '请填写验证码' });
					return false;
				}
				this.bind(this.submitData.UserName, this.submitData.UserPwd);
			},
			bind() {
				//绑定接口
				this.sendRequest({
					url: 'System.Login.bindPhone',
					method:"POST",
					data: {
						phone: this.submitData.UserName,
						record_id: this.submitData.record_id,
						code: this.submitData.UserYZM
					},
					success: res => {
						if (res.code < 0) {
							this.$util.showToast({ title: res.message });
							return false;
						}
						if (res.code == 1) {
							this.$util.showToast({ title: '绑定成功' });
							setTimeout(function() {
								uni.navigateBack();
							}, 1000);
						}
					}
				})
			},
			loginClick(){
				this.$util.redirectTo('/pages/login/login/login', {}, '');
			},
			resetClick() {
				this.$util.redirectTo('/pages/login/reset/reset', {}, '');
			},
		},
		mixins: [http]
	}
</script>

<style lang="scss" scoped>
	.login_container {

		>view {
			margin: 0 auto;
			color: #aaa;
			width: 560rpx;
		}

		>view:nth-child(1) {
			padding: 40rpx 0;

			>view {
				padding: 0 30rpx;
				border: 2rpx solid #ddd;
			}

			>view:nth-child(2) {
				border-top: none;
				//border-bottom: none;
			}

			button {
				width: 230rpx;
				margin: 0;
				padding: 0;
				height: 70rpx;
				line-height: 70rpx;
			}
		}

		>view:nth-child(3) {
			margin-top: 20rpx;
		}

		>button {
			width: 560rpx;
			margin: 0 auto;
			border: none;
			background-color: #E9521D;
			color: white;
		}

		.primary {
			background-color: #E9521D;
			color: white;
		}

		.error {
			background-color: #ddd;
			color: #aaa;
		}
	}

	.iconfont {
		font-size: 48rpx;
		color: #aaa;
	}
</style>
