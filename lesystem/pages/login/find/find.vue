<template>
	<view class="find">
		<view class="find-head">
			<!-- 自定义状态栏高度 -->
			<view class="head-nav"></view>
			<view class="head-content">
				<view class="head-return">
					<text class="iconfont iconback_light" @click="navigateBack">返回</text>
				</view>
			</view>
		</view>
		<view class="find-form">
			<!-- 下一步 -->
			<block v-if="stepShow == 0">
				<view class="form-input"><input class="uni-input" type="text" maxlength="30" v-model="formData.account" placeholder="请输入账户" /></view>
                <view class="form-input"><input class="uni-input" type="text" maxlength="17" v-model="formData.mobileOrEmail" placeholder="请输入绑定的手机号" /></view>
				<button type="primary" class="find-btn" @click="nextStep">下一步</button>
			</block>

			<!-- 找回密码 -->
			<block v-if="stepShow == 1">
				<view class="form-input align-type">
					<input class="uni-input" type="number" maxlength="6" v-model="formData.dynacode" placeholder="请输入动态码" />
					<view class="dynacode ns-text-color" @click="sendDynaCode">{{ codeText }}</view>
				</view>

				<view class="form-input"><input class="uni-input" type="text" maxlength="30" password="true" placeholder="请输入新密码" v-model="formData.password" /></view>

				<view class="form-input"><input class="uni-input" type="text" maxlength="30" password="true" placeholder="请确认新密码" v-model="formData.rePassword" /></view>

				<button type="primary" class="find-btn" @click="preservation">保存</button>
			</block>
		</view>
	</view>
</template>

<script>
import http from 'common/js/http.js';
import validate from 'common/js/validate.js';
export default {
	data() {
		return {
			findMode: 'mobile',
			codeText: '获取动态码',
			seconds: 0,
			timer: null,
			formData: {
				account:'',
				mobileOrEmail: '',
				password: '',
				rePassword: '',
				dynacode: ''
			},
			stepShow: 0
		};
	},
	methods: {
		/**
		 * 导航跳转
		 */
		navigateBack(){
			if(this.stepShow == 1){
				this.stepShow = 0;
			}else if(this.stepShow == 0){
				this.$util.redirectTo('/pages/login/login/login', '', '', 'reLaunch');
			}
		},
		
		/**
		 * 下一步
		 */
		async nextStep() {
			let mobileRule = [{ name: 'mobileOrEmail', checkType: 'phoneno', errorMsg: ' ' }], //手机验证
				emailRule = [{ name: 'mobileOrEmail', checkType: 'email', errorMsg: ' ' }], //邮箱验证
				mobileCheckRes,
				emailCheckRes;

			mobileCheckRes = validate.check(this.formData, mobileRule);
			emailCheckRes = validate.check(this.formData, emailRule);

			if (mobileCheckRes) {
				this.findMode = 'mobile';
				//await this.sendDynaCode();
				if(this.formData.account==''){
					this.$util.showToast({ title: '账号不能为空' });
					return false;
				}
				
				

				/* 检测手机号是否存在 */
				this.sendRequest({
					url:'System.Member.checkMobile',
					data:{
						account:this.formData.account,
						mobile: this.formData.mobileOrEmail,
					},
					success:res=>{
						if (res.code<0) {
							this.$util.showToast({ title: res.message });
							return false;
						}
						else{
							this.stepShow = 1;
						}
					},
					fail: (err) => {
						uni.showToast({
						  title: "接口出错.请重试！",
						  icon: "none",
						});
					},
					});
				
				
				
				
				// let res = await this.sendRequest({
				// 	url: 'System.Member.checkMobile',
				// 	data: { mobile: this.formData.mobileOrEmail },
				// 	async: false,
				// 	fail: res => {
				// 		console.log("error");
				// 	}
				// });
				// console.log(res);
				// if (!res.data) {
				// 	this.$util.showToast({ title: '该手机号未注册' });
				// 	return false;
				// }
				
				
			} 
			// else if (emailCheckRes) {
			// 	this.findMode = 'email';
			// 	//await this.sendDynaCode();
			// 	this.stepShow = 1;

			// 	/* 检测邮箱号是否存在 */
			// 	let res = await this.sendRequest({
			// 		url: 'System.Member.checkEmail',
			// 		data: { send_param: this.formData.mobileOrEmail },
			// 		async: false
			// 	});
			// 	if (!res.data) {
			// 		this.$util.showToast({ title: '该邮箱号未注册' });
			// 		return false;
			// 	}
				
				
			// } else {
			// 	this.$util.showToast({ title: '请输入正确的手机号或邮箱' });
			// }
		},
		/**
		 * 保存修改 
		 */
		async preservation() {
			if (await this.vertify()) {
				let phone = this.findMode == 'mobile' ? this.formData.mobileOrEmail : this.formData.mobileOrEmail,
					type = this.findMode == 'mobile' ? 'mobile' : 'email';

				this.sendRequest({
					url: 'System.Login.resetPassword',
					data: {
						phone: phone,
						password: this.formData.password,
						code: this.formData.dynacode,
						type,
						record_id: uni.getStorageSync('forgot_password_token')
					},
					success: res => {
						//let data = res.data;
						if (res.code == 0) {
							this.$util.showToast({ title: "修改成功" });
							setTimeout(() => {
								uni.removeStorage({ key: 'forgot_password_token' });
								this.$util.redirectTo('/pages/login/login/login');
							}, 1000);
						} else {
							this.$util.showToast({ title: res.message });
							clearInterval(this.timer);
							this.seconds = 0;
							this.codeText = `获取验证码`;
						}
					}
				});
			}
		},
		/**
		 * 注册表单验证
		 */
		async vertify() {
			var rule = [],
				checkRes;

			rule.push(
				{ name: 'dynacode', checkType: 'required', errorMsg: '请输入动态码' },
				{ name: 'password', checkType: 'required', errorMsg: '请输入新密码' },
				{ name: 'password', checkType: 'lengthMin', checkRule: 6, errorMsg: '密码长度不能小于6位' }
			);

			if (this.formData.password != this.formData.rePassword) {
				this.$util.showToast({ title: '两次密码不一致' });
				return false;
			}
			checkRes = validate.check(this.formData, rule);
			if (checkRes) {
				return true;
			} else {
				this.$util.showToast({ title: validate.error });
				return false;
			}
		},
		/**
		 * 发送动态验证码
		 */
		async sendDynaCode() {
			if(this.seconds>0)return;
			
			this.seconds=60;
			this.timer = setInterval(() => {
			  this.seconds--;
			  this.codeText = `${this.seconds} 秒后再发送`;
			  if (!this.seconds || this.seconds < 0) {
			    clearInterval(this.timer);
			    this.seconds = 0;
			    this.codeText = `获取验证码`;
			  }
			}, 1000);
			
			var phone, type;
			if (this.findMode == 'mobile') {
				type = 'sms';
				phone = this.formData.mobileOrEmail;
			}

			// if (this.findMode == 'email') {
			// 	type = 'email';
			// 	phone = this.formData.mobileOrEmail;
			// }
			
			// if (this.seconds == 60 && this.timer == null) {
			// 	this.timer = setInterval(() => {
			// 		this.seconds--;
			// 		this.codeText = this.seconds + 'S';
			// 	}, 1000);
			// }
			
			
			

			this.sendRequest({
				url: "System.SendMsg.sendVeryCode",
				methods: "POST",
				data: {
					phone,
					key: 'forgot_password',
					type
				},
				success: res => {
					if (res.code == 0) {
						uni.setStorageSync('forgot_password_token', res.data.record_id);
					} else {
						this.$util.showToast({ title: res.message });
						clearInterval(this.timer);
						this.seconds = 0;
						this.codeText = `获取验证码`;
					}
				}
			});
		}
	},
	watch: {
		seconds(value) {
			if (value == 0) {
				this.seconds = 120;
				this.codeText = '获取验证码';
				clearInterval(this.timer);
			}
		}
	},
	mixins: [http]
};
</script>

<style lang="scss">
	page{
		background: #FFFFFF;
	}
.find-head {
	/* 自定义导航 */
	.head-nav {
		width: 100%;
		height: var(--status-bar-height);
	}
	.head-content {
		position: relative;
		width: 750rpx;
		height: 540rpx;
		background: #efa70b url(../../../static/images/authorize_bj.png) no-repeat;
		background-size: contain;
		.head-return {
			padding-left: 30rpx;
			height: 90rpx;
			line-height: 90rpx;
			color: #fff;
			font-size: $ns-font-size-lg;
			text {
				display: inline-block;
				margin-right: 10rpx;
			}
		}
	}
}

.find-form {
	padding: 100rpx 80rpx 0;
	.form-input {
		margin-top: 60rpx;
		height: 60rpx;
		border-bottom: 2rpx solid $ns-bg-color-gray;
		input {
			padding:0;
			font-size: $ns-font-size-base;
		}
	}
	.find-btn {
		margin: 100rpx 0 0;
		border-radius: 40rpx;
		color: #fff;
		background-color: #efa70b !important;
	}
}
.forget-section {
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-between;
	margin-top: 10rpx;
	height: 70rpx;
	line-height: 70rpx;
}

.align-type {
	display: flex;
	justify-content: space-between;
}
</style>
