<template>
	<view class="page-body">
		<view class="content">
			<view class="item">
				<text class="title">昵称：</text>
				<input class="uni-input" v-model="userInfo.nickname" maxlength="11" type="text" placeholder="昵称" :disabled="userInfo_c.nickname !== '' && canchangeprofile === 0" />
			</view>
			<view class="item">
				<text class="title">用户手机：</text>
				<input class="uni-input" v-model="userInfo.phoneno" type="text" placeholder="用户手机" :disabled="userInfo_c.phoneno !== '' && canchangeprofile === 0" />
			</view>
			<view class="item">
				<text class="title">真实姓名：</text>
				<input class="uni-input" v-model="userInfo.name" type="text" placeholder="真实姓名" :disabled="userInfo_c.name !== '' && canchangeprofile === 0" />
			</view>
			<view class="item">
				<text class="title">出生日期：</text>
				<picker  @change="DateChange" class="uni-input" mode="date" style="width: 70%;min-height: 20rpx;" :value="date" start="2015-09-01" end="2020-09-01" >
					<view class="picker">
						{{date}}
					</view>
				</picker>
				<!-- <input class="uni-input" v-model="userInfo.birthday" type="text" placeholder="出生日期" :disabled="userInfo_c.birthday !== '' && canchangeprofile === 0" /> -->
			</view>
			<view class="item">
				<text class="title">用户邮箱：</text>
				<input class="uni-input" v-model="userInfo.email" type="text" placeholder="用户邮箱" :disabled="userInfo_c.email !== '' && canchangeprofile === 0" />
			</view>
			<view class="item">
				<text class="title">QQ：</text>
				<input class="uni-input" v-model="userInfo.qq" type="text" placeholder="QQ" :disabled="userInfo_c.qq !== '' && canchangeprofile === 0" />
			</view>
			<view class="item">
				<text class="title">用户微信：</text>
				<input class="uni-input" v-model="userInfo.wechat" type="text" placeholder="用户微信" :disabled="userInfo_c.wechat !== '' && canchangeprofile === 0" />
			</view>
		</view>
		<button v-show="canchangeprofile==1" class="btn" @click="confirmClick">确认修改</button>
	</view>
</template>

<script>
	import http from 'common/js/http.js';
	export default {
		data() {
			return {
				canchangeprofile: 0,
				userInfo: [],
				userInfo_c: [],
				date: '',
			};
		},
		methods: {
			DateChange(e) {
				this.date = e.detail.value
				this.userInfo.birthday = this.date
			},
			//获取用户信息
			getUserInfo() {
				this.sendRequest({
					url: 'System.Member.getMemberEditableInfo',
					data: {},
					success: res => {
						if (res.code == 0) {
							this.userInfo = res.data;
							this.date=this.userInfo.birthday
							for (let i in this.userInfo) {
								if (this.userInfo[i] == null) {
									this.userInfo[i] = '';
								}
							}
							// console.log('aaaaaaaaaaa')
							this.canchangeprofile = res.data.canchangeprofile
							this.userInfo_c = JSON.parse(JSON.stringify(this.userInfo));
						}
					}
				});
			},
			//提交修改
			confirmClick() {
				let a = this.userInfo
				if (!this.userInfo_c.phoneno) {
					if (!this.$util.checkPhone(this.userInfo.phoneno)) {
						return
					}
				}
				if (!this.userInfo_c.qq) {
					if (!this.$util.checkQq(this.userInfo.qq)) {
						return
					}
				}
				if (!this.$util.checkEmail(this.userInfo.email)) {
					return
				}
				this.sendRequest({
					url: 'System.Member.editMyAccount',
					data: {
						name: this.userInfo.name,
						email: this.userInfo.email,
						qq: this.userInfo.qq,
						phoneno: this.userInfo.phoneno,
						nickname: this.userInfo.nickname,
						wechat: this.userInfo.wechat,
						birthday: this.userInfo.birthday,
					},
					success: res => {
						if (res.code == 1) {
							this.$util.showToast({
								title: '修改成功'
							});
						}
						else if(res.code <0){
							this.$util.showToast({
								title: res.data.message
							});
						}
					}
				});
			}
		},
		created() {
			this.getUserInfo();
		},
		mixins: [http]
	};
</script>

<style lang="scss" scoped>
	.page-body {
		min-height: 100vh;
		background-color: white;
		/* #ifdef H5 */
		min-height: calc(100vh - 44px);
		/* #endif */

		.content {
			color: #aaa;
			margin-bottom: 40rpx;
			background-color: white;

			.item {
				border-bottom: 2rpx solid #eee;
				display: flex;
				align-items: center;
				padding: 10rpx 30rpx;

				.title {
					width: 140rpx;
					text-align: left;
				}

				.uni-input {
					padding: 0 10rpx;
				}
			}

			.item:nth-child(1) {
				border-top: 2rpx solid #eee;

			}
		}

		.btn {
			margin: 0 30rpx;
			border: none;
			background-color: #d5001a;
			color: white;
		}
	}
</style>
