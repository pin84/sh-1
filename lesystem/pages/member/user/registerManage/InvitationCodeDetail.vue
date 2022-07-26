<template>
	<view class="invitation-code-detail">
		<view class="flex justify-center margin-top-sm"><image style="width: 300rpx; height: 288rpx;" :src="qrCodeUrl"></image></view>
		<view class="cu-form-group bg-gray">
			<input placeholder="输入框带个按钮" name="input" disabled="" v-model="codeInfo.createLink" />
			<button class="cu-btn bg-green shadow " @tap='copyLink'>复制链接</button>
		</view>
		<view class="cu-form-group bg-gray">
			<input name="input" disabled="" v-model="codeInfo.createLink2" />
			<button class="cu-btn bg-green shadow " @tap='copyLink2'>复制备用</button>
		</view>
		<view class="text-xs text-center margin-top-sm text-gray">通过以上二维码活链接注册的用户即为您的下级</view>

		<view class="cu-form-group margin-top-sm" style="border-top:none;justify-content:flex-start;min-height: 60rpx; ">
			<view class="title" style="width: 50%;text-align: right; text-align: right;">推广邀请码:</view>
			<view>{{ codeInfo.invitationCode }}</view>
		</view>
		<view class="cu-form-group " style="border-top:none;justify-content:flex-start;min-height: 60rpx;">
			<view class="title" style="width: 50%;text-align: right;text-align: right;">访问量:</view>
			<view>{{ codeInfo.visitedAmout }}</view>
		</view>
		<view class="cu-form-group " style="border-top:none;justify-content:flex-start;min-height: 60rpx;">
			<view class="title" style="width: 50%;text-align: right;">开户类型:</view>
			<view>{{ codeInfo.customerValue }}</view>
		</view>
		<view class="cu-form-group " style="border-top:none;justify-content:flex-start;min-height: 60rpx;">
			<view class="title" style="width: 50%;text-align: right;">状态:</view>
			<view>{{ codeInfo.linkValidityPeriodValue }}</view>
		</view>
		<view class="cu-form-group " style="border-top:none;justify-content:flex-start;min-height: 60rpx;">
			<view class="title" style="width: 50%;text-align: right;">推广资金组</view>
		</view>
		
		<view class="cu-form-group " style="border-top:none;justify-content:flex-start;min-height: 60rpx;" v-for="(item,index) in gameList" :key='index'>
			<view class="title" style="width: 50%;text-align: right;">{{item.name}}:</view>
			<view>{{ item.kickbak }}</view>
		</view>
	</view>
</template>

<script>
import http from 'common/js/http.js';
import Fandian from './Fandian.vue';
export default {
	mixins: [http],
	data() {
		return {
			codeInfo: {},
			qrCodeUrl: '',
			gameList: []
		};
	},
	components: {
		Fandian
	},
	created() {},

	mounted() {
		
		
		this.initData();
		this.createQrCode();
	},

	methods: {
		copyLink(){
			this.$util.multiPlatformCopy(this.codeInfo.createLink)
		},
		copyLink2(){
			this.$util.multiPlatformCopy(this.codeInfo.createLink2)
		},
		initData(){
			this.codeInfo = uni.getStorageSync('curInvitationCodeInfo');
			let gameList = uni.getStorageSync('gameList');
			let kickback = JSON.parse(this.codeInfo.kickback)
			
			kickback.forEach(item => {
				gameList.forEach(i => {
					if (Number(item.typeId) == Number(i.fid)) {
						i.kickbak = item.kickback;
					}
				});
			});
			this.gameList =gameList
			
		},
		createQrCode() {
			let link = this.codeInfo.createLink;
			;
			this.sendRequest({
				url: 'System.MemberAdregister.getQrcode',
				data: {
					createLink: link
				},
				success: res => {
					;
					if (res.code === 0) {
						this.qrCodeUrl = res.data;

						;
					}
				}
			});
		}
	}
};
</script>

	
<style lang="scss" scoped>
	.fandian-box{
		
		padding-left: 75rpx;
	}
		
</style>
