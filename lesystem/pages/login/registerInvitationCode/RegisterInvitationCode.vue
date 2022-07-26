<template>
	<view class="lebg " style="min-height:100vh">
		<view class=" padding-xl">
			<!-- 用户名，手机号，密码，手机验证码 -->
			<view class="cu-form-group flex justify-center padding-xl text-white"><h1>注册账户</h1></view>
			<view>
				<text class="text-xs text-white">如果你已拥有本公司账户，</text>
				<a href="" class="text-xs text-yellow" @click="loginClick">点击此处登录</a>
			</view>

			<view class="search-form radius flex align-center  padding-sm margin-top-df bg">
				<i class="iconfont icon-yonghu text-white margin-right-sm text-df"></i>
				<input v-model="submitData.userName" placeholder-class="text-gray text-sm" placeholder="请输入3-15个字母或数字组合" name="input" class="text-white text-df flex-sub" />
			</view>
			<view class="search-form radius flex align-center  padding-sm margin-top-df bg">
				<i class="iconfont icon-mima text-white margin-right-sm text-df"></i>
				<input
					v-model="submitData.userPwd"
					placeholder-class="text-gray text-sm"
					placeholder="请输入密码（6-14个字母或数字组合）"
					name="input"
					class="text-white text-df flex-sub"
				/>
			</view>

			<view class="search-form radius flex align-center  padding-sm margin-top-df bg">
				<i class="iconfont icon-shouji text-white margin-right-sm text-df"></i>
				<input v-model="submitData.userPhone" placeholder-class="text-gray text-sm" placeholder="请输入手机号码" name="input" class="text-white text-df flex-sub" />
			</view>
			<view class="flex align-center margin-top-df">
				<view class="search-form radius flex align-center  padding-sm bg flex-sub">
					<i class="iconfont icon-yanzhengma1 text-white margin-right-sm text-df"></i>
					<input v-model="submitData.phoneCode" placeholder-class="text-gray text-sm" placeholder="请输入手机验证码" name="input" class="text-white text-df flex-sub" />
				</view>

				<view class="flex flex-wrap justify-between align-center">
					<button class="cu-btn bg-green round" @tap="getCodeClick">{{ btnVal }}</button>
				</view>
			</view>

			<view class="search-form radius flex align-center  padding-sm margin-top-df bg" v-for="(item, index) in registerList" :key="index" v-show="item.isShow">
				
				<i class="iconfont  text-white margin-right-sm text-df" :class="item.icon"></i>
				<picker v-if="item.name === 'birthday'" mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange" style="width: 100%; " >
					<view class="picker text-white">
						<input class="text-white text-df flex-sub" type="text" placeholder-class="text-gray text-sm"  :value="date" :placeholder="item.placeholder"/>
					</view>
				</picker>
				<input v-else v-model="registerList[index].value" placeholder-class="text-gray text-sm" :placeholder="item.placeholder" name="input" class="text-white text-df flex-sub" />
			</view>
			<view class="flex align-center margin-top-df">
				<view class="search-form radius flex align-center  padding-sm margin-top-xs bg">
					<i class="iconfont icon-yanzhengma1 text-gray  text-bold  margin-right-sm "></i>
					<input v-model="submitData.verifycode" placeholder-class="text-gray text-sub" placeholder="请输入验证码" name="input" class="text-white text-df flex-sub" />
				</view>
			
				<view class="vercode margin-top-sm margin-left-sm"><imgcode width="80" height="22" ref="imgcode"></imgcode></view>
			</view>

			<view class="flex align-center margin-top-sm margin-bottom-sm">
				<view>
					<text @click="CheckboxChange" v-if="!isCheck" class="iconfont icon-3209268-boxformrectanglesquareuncheck    text-white margin-right-sm "></text>
					<text @click="CheckboxChange" v-else class="iconfont icon-duoxuanyidong text-white margin-right-sm "></text>
				</view>
				<view class="text-white">
					<text class=" text-sm">同意并愿意遵守本公司</text>
					<text class="text-yellow text-sm" @tap="showModal">用户协议</text>
				</view>
			</view>
			<view class="flex " @click="register"><button class="flex-sub cu-btn bg-red lg btn">立即注册</button></view>
		</view>

		<!-- <view class="cu-modal" :class="modalName=='DialogModal1'?'show':''"> -->
		<view class="cu-modal show" v-if="isShowModal">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">用户协议</view>
					<view class="action" @tap="hideModal"><text class="cuIcon-close text-red"></text></view>
				</view>
				<view class="padding-xl " style="height:30vh; overflow: scroll;text-align: left;">
					在开户后进行一次有效存款，恭喜您成为本公司有效会员！存款免手续费，开户最低入款金额100人民币。本公司严禁会员有重复申请账号行为，每位玩家、每一住址
					、每一电子邮箱、每一电话号码、相同支付卡/信用卡号码，及共享计算机环境(例如网吧、其他公共用计算机等)只能拥有一个帐户数据。本公司是提供互联网投注服务的机构。请会员在注册前参考当地政府的法律，在博彩不被允许的地区，如有会员在本公司注册、下注，为会员个人行为，本公司不负责、承担任何相关责任。无论是个人或是团体，如有任何威胁、滥用本公司名义的行为，本公司保留杈利取消、收回玩家账号。玩家注册信息有争议时，为确保双方利益、杜绝身份盗用行为，本公司保留权利要求客户向我们提供充足有效的档，并以各种方式辨别客户是否符合资格享有我们的任何优惠。本公司是使用利鑫科技所提供的在线娱乐软件，若发现您在同系统的娱乐场上开设多个会员账户，并进行套利下注；本公司有权取消您的会员账号并将所有下注营利取消！
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
import imgcode from '../../../components/imgcode/imgcode.vue';
export default {
	data() {
		return {
			date: '',
			registerList: [
				//顺序不能换。跟提交时的数据关联上
				{
					name: 'fundPassword',
					icon: 'icon-mima',
					placeholder: '资金密码长度由4-6个数字或字母组成',
					value: '',
					isShow: false
				},

				{
					name: 'qq',
					icon: 'icon-qq',
					placeholder: 'QQ',
					value: '',
					isShow: false
				},
				{
					icon: 'icon-weixin',
					placeholder: '微信格式由6-13个字母或数字组成',
					value: '',
					isShow: false
				},
				{
					name: 'realname',
					icon: 'icon-zhenshixingming',
					placeholder: '真实姓名',
					value: '',
					isShow: false
				},
				{
					name: 'birthday',
					icon: 'icon-rili-copy-copy-copy-copy',
					placeholder: '请填写出生日期',
					value: '',
					isShow: true
				},
				{
					name: 'email',
					icon: 'icon-mail',
					placeholder: '邮箱',
					value: '',
					isShow: false
				},
				{
					name: 'introducer',
					icon: 'icon-zhuanjieshaoren',
					placeholder: '介绍人',
					value: '',
					isShow: false
				},
				{
					name: 'inviteCode',
					icon: 'icon-yinhangqia',
					placeholder: '邀请码',
					value: '',
					isShow: false
				}
			],
			submitData: {
				userName: '',
				userPwd: '',
				userPhone: '',
				phoneCode: '',
				record_id: '',
				verifycode:''
			},
			count: 0,
			isClick: true,
			btnVal: '获取验证码',
			Interval: null,
			isCheck: false,
			isShowModal: false,
			isTimeOut: true,

			originalInviteCode: ''
		};
	},
	components:{
		imgcode
	},
	onUnload() {
		if (this.Interval != null) {
			clearInterval(this.Interval);
		}
	},

	created() {
		    let routes = getCurrentPages()
      let { inviteCode } = routes[routes.length - 1].options
		this.originalInviteCode = inviteCode;
		
		
		
		
		this.initData();
	},
	methods: {
		initData() {
			this.sendRequest({
				url: 'System.MemberAdregister.generalizeRegistered',
				data: { inviteCode: 'aaaaa3' },
				success: res => {
					let { list } = res.data;
					list.forEach(item => {
						this.registerList.forEach(i => {
							if (item.name === i.name) {
								i.isShow = true;
							}
						});
					});
				}
			});
		},
		showModal() {
			this.isShowModal = true;
		},
		hideModal() {
			this.isShowModal = false;
		},
		CheckboxChange() {
			this.isCheck = !this.isCheck;
		},
		setTime() {
			clearInterval(this.Interval);
			this.isClick = false;
			this.count = 60;
			this.Interval = setInterval(() => {
				this.count--;
				if (this.count > 0) {
					this.btnVal = this.count + 's后重新获取';
				} else {
					this.btnVal = '重新发送';
					this.isClick = true;
					clearInterval(this.Interval);
				}
			}, 1000);

			this.sendRequest({
				url: 'System.SendMsg.sendVeryCode',
				method: 'POST',
				data: {
					phone: this.submitData.userPhone
				},
				success: res => {
					if (res.code == 0) {
						this.submitData.record_id = res.data.record_id;
					}
				}
			});
		},
		getCodeClick() {
			if (this.count !== 0) {
				return;
			}
			if (!/^1[3|4|5|8|7|6|9][0-9]\d{4,8}$/.test(this.submitData.userPhone)) {
				this.$util.showToast({
					title: '手机号不正确'
				});
			} else {
				this.setTime();
			}
		},
		registerClick() {
			if (this.submitData.userName == '') {
				this.$util.showToast({
					title: '用户名不能为空'
				});
				return false;
			}

			if (!/^1[3|4|5|8|7|6|9][0-9]\d{4,8}$/.test(this.submitData.userPhone)) {
				this.$util.showToast({
					title: '手机号不正确'
				});
				return false;
			}
			if (this.submitData.userPwd == '') {
				this.$util.showToast({
					title: '密码不能为空'
				});
				return false;
			}
			if (this.submitData.userPwd.length < 6) {
				this.$util.showToast({
					title: '密码不能少于6个字符'
				});
				return false;
			}
			if (this.submitData.phoneCode == '') {
				this.$util.showToast({
					title: '请填写验证码'
				});
				return false;
			}

			if (this.registerList[5].value !== '') {
				if (!this.$util.checkEmail(this.registerList[5].value)) {
					return false;
				}
			}

			if (!this.isCheck) {
				this.$util.showToast({
					title: '请同意用户协议'
				});
				return false;
			}

			return true;
			// this.register();
		},
		register() {
			let flag = this.registerClick();

			if (!flag) {
				return;
			}
			let obj = {
				username: this.submitData.userName,
				phone: this.submitData.userPhone,
				password: this.submitData.userPwd,
				record_id: this.submitData.record_id,
				code: this.submitData.phoneCode,
				originalInviteCode: this.originalInviteCode || '333ttt',
				wechat: this.registerList[2].value,
				realname: this.registerList[3].value,
				email: this.registerList[5].value,
				introducer: this.registerList[6].value,
				inviteCode: this.registerList[0].value,
				birthday: this.date,
				verifycode: this.submitData.verifycode,
				fundPassword: this.registerList[0].value,
				qq: this.registerList[1].value
			};
				
				
			//注册接口
			this.sendRequest({
				url: 'System.Login.generalizeRegisteredMemberAdd',
				method: 'POST',
				data: obj,
				success: res => {
					
					if (res.code == -1) {
						this.$util.showToast({
							title: res.message
						});
						return false;
					}
					if (res.code == 1) {
						this.$util.showToast({
							title: '注册成功'
						});
						uni.setStorage({
							key: 'token',
							data: res.token
						});
						setTimeout(() => {
							this.$util.redirectTo('/pages/member/index/index', {}, 'tabbar', 'reLaunch');
						}, 2000);
					}
				}
			});
		},
		
		DateChange(e) {
			this.date = e.detail.value
		},

		// this.$util.showToast({title:'注册成功'})
		// setTimeout(()=>{
		// 	uni.redirectTo({
		// 	    url: 'test?id=1'
		// 	});
		// },2000)
		loginClick() {
			this.$util.redirectTo('/pages/login/login/login', {}, '');
		},
		resetClick() {
			this.$util.redirectTo('/pages/login/reset/reset', {}, '');
		}
	},
	mixins: [http]
};
</script>

<style lang="scss" scoped>
@import '/common/css/bg.css';

.lebg {
	.bg {
		background-color: rgba(0, 0, 0, 0.4);
	}

	.btn {
		margin: 0;
		padding: 45rpx 10rpx;
	}

	.iconfont {
		font-size: 24rpx;
	}
}

a {
	text-decoration: none;
}

.cu-form-group {
	background-color: rgba(0, 0, 0, 0);
	padding: 0;
}
</style>
