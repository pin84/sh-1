<template>
	<view class="bg-white invitation-code">
		<view class="cu-form-group margin-top flex">
			<view class="title" style="flex :0 0 190rpx;">推广域名：</view>
			<input type="text" v-model="curInvitationCode.createLink" disabled />
		</view>
		<view class="cu-form-group margin-top flex">
			<view class="title" style="flex :0 0 190rpx;">推广域名2：</view>
			<input type="text" v-model="curInvitationCode.createLink2" disabled />
		</view>
		<view class="cu-form-group margin-top flex" v-if="isShowAgency">
			<view class="title" style="flex :0 0 190rpx;">用户类型：</view>
			<picker @change="userTypeChange" :value="userTypeIndex" :range="userType">
				<view class="picker">{{ this.userType[this.userTypeIndex] }}</view>
			</picker>
			<i class="iconfont icon-icon-test4 " style="font-size:42rpx; font-weight: 400;"></i>
		</view>

		<view class="cu-form-group margin-top flex">
			<view class="title" style="flex :0 0 190rpx;">链接有效期：</view>
			<picker @change="expirationChange" :value="expirationIndex" :range="expiration">
				<view class="picker">{{ this.expiration[this.expirationIndex] }}</view>
			</picker>
			<i class="iconfont icon-icon-test4 " style="font-size:42rpx; font-weight: 400;"></i>
		</view>

		<view class="cu-form-group margin-top">
			<view class="title">请为下级设置代理返点</view>
			<!-- <input placeholder="再次输入密码" name="input" /> -->
		</view>

		<Fandian v-if="games.length !== 0" :games="games" />
		<view class="padding flex flex-direction" style="border-top: 1px solid #f1f1f1;"><button class="cu-btn bg-green margin-tb-sm lg" @tap="saveEdit">编辑保存</button></view>

		<view class="cu-modal " :class="{ show: isCodeUsed }">
			<view class="cu-dialog">
				<view class="padding-xl">
					<text class="text-red">邀请码[{{ this.code }}]已被注册，请重新输入</text>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action"><button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import http from 'common/js/http.js';
import Fandian from './Fandian.vue';
import InvitationManage from './InvitationManage.vue';
import commonFn from './commonFn.js';
export default {
	mixins: [http],
	data() {
		return {
			timeout: 1,
			inputType: 'text',
			invitationCodePlaceholder: '只能是4-11位数字与字母组合',
			isCodeUsed: false,
			code: null,
			// agencyBelowDisabledUserTypeUpdate:0,
			// hierarchy:1,
			isShowAgency: true,
			games: [],
			TabCur: '0',
			tabName: ['生成邀请码', '邀请码管理'],
			domains: [],
			domainIndex: 0,
			userType: ['会员', '代理'],
			userTypeIndex: 0,
			expiration: [],
			expirationIndex: 0,
			curInvitationCode: {},
			hierarchy: null
		};
	},
	components: {
		Fandian,
		InvitationManage
	},
	created() {},
	mounted() {
		this.curInvitationCode = uni.getStorageSync('curInvitationCodeInfo');
		// this.hierarchy = uni.getStorageSync('hierarchy')
		this.initData();
	},
	methods: {
		//生成邀请码
		saveEdit() {
			if (this.timeout === 0) {
				return;
			}
			this.timeout = 0;

			setTimeout(() => {
				this.timeout = 1;
			}, 5000);

			let flag = commonFn.checkFandian(this.games);
			if (!flag) {
				return;
			}

			let domainNo = this.domains[this.domainIndex] === '本站' ? 1 : '';
			let arr = this.games.map((item, index) => {
				return {
					typeId: item.fid,
					kickback: item.kickbak
				};
			});
			let obj = {
				id: this.curInvitationCode.id,
				customerType: this.userTypeIndex,
				linkValidityPeriod: this.expirationIndex,
				kickBack: JSON.stringify(arr)
			};

			this.sendRequest({
				url: 'System.MemberAdregister.editMemberAdregister',
				method: 'POST',
				data: obj,
				success: res => {
					if (res.code == -1) {
						this.$util.showToast({ title: res.message });
						return;
					}

					this.$util.showToast({
						title: '更新成功'
					});

					setTimeout(() => {
						// this.$util.redirectTo('/pages/member/user/registerManage/registerManage');
						uni.redirectTo({
							url: '/pages/member/user/registerManage/registerManage?tabCur=1'
						});
						// uni.navigateBack({
						//     delta: 1
						// });
					}, 2000);
				}
			});
		},
		codeOnblur() {
			this.sendRequest({
				url: 'System.MemberAdregister.checkInviteCode',
				data: {
					inviteCode: this.code
				},
				success: res => {
					if (res.code === -1) {
						this.isCodeUsed = true;
					}
				}
			});
		},
		initData() {
			let gameList = uni.getStorageSync('gameList');
			let kickback = JSON.parse(this.curInvitationCode.kickback);
			gameList.forEach(item => {
				kickback.forEach(i => {
					if (item.fid == i.typeId) {
						item.kickbak = i.kickback;
					}
				});
			});
			this.games = gameList;

			//用户类型绑定值
			let { customerValue } = uni.getStorageSync('curInvitationCodeInfo');

			this.userTypeIndex = this.userType.findIndex(item => item === customerValue);

			this.sendRequest({
				// System.MemberAdregister.getPageData
				url: 'System.MemberAdregister.getPageData',
				success: resault => {

					let { linkValidityPeriod, generalizeDomain, agencyBelowDisabledUserTypeUpdate, invitationCodeTip, invitationCodeType } = resault.data;
					let hierarchy = Number(uni.getStorageSync('hierarchy'));
					let { linkValidityPeriodValue } = this.curInvitationCode;
					for (let [key, value] of Object.entries(linkValidityPeriod)) {
						if (linkValidityPeriodValue === value) {
							this.expirationIndex = key;
						}
						this.expiration.push(value);
					}

					for (let [key, value] of Object.entries(generalizeDomain)) {
						this.domains.push(value);
					}
					if (invitationCodeType === 1) {
						inputType = 'number';
					}
					if (hierarchy > 1 && agencyBelowDisabledUserTypeUpdate == 0) {
						this.isShowAgency = false;
					}
				}
			});
		},
		domainChange(e) {
			this.domainIndex = e.detail.value;
		},
		userTypeChange(e) {
			this.userTypeIndex = e.detail.value;
		},
		expirationChange(e) {
			this.expirationIndex = e.detail.value;
		},

		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			// this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
		},
		hideModal() {
			this.isCodeUsed = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.title,
uni-picker {
	padding-right: 0;
}
uni-picker::after {
	display: none;
}
.cur {
	color: #c42133;
}
</style>
