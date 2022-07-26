<template>
	<view class="user-account">
		<ScreenBar :gameTypeData='gameTypeData' @changeStartTime="changeStartTime" @changeEndTime="changeEndTime"
			@changeGameType="changeGameType" />
		<AccountList :accountList="accountList" />
	</view>
</template>

<script>
	import http from 'common/js/http.js';
	import AccountList from  './AccountList'
	import ScreenBar from './ScreenBar'
	export default {
		data() {
			return {
				startTime: this.getTimeString('start'),
				endTime: this.getTimeString('end'),
				GameTypeCur: 0, //0
				gameTypeData: [], //游戏种类信息
				accountList: {}, //细目表
			}
		},
		created() {
			this.init();
		},
		components: {
			AccountList,
			ScreenBar
		},
		methods: {
			init() { //初始化
				let postData = this.setRequestData();
				this.requestData('System.HomePage.getAllGameCategory', {}, res => {
					this.gameTypeData = res.data;
				});

				//初始化棋牌游戏
				this.requestData('System.Report.fishGameIndividualReport', postData, res => {
					this.accountList = res.data;
				});
			},
			getTimeString(type) {     //start, end
				if (type == 'start') {
					let date = new Date();
					let y = date.getFullYear();
					let m = this.prefixZero(date.getMonth() + 1, 2);
					let d = this.prefixZero(date.getDate(), 2);
					return y + '-' + m + '-' + d + ' ' + '00:00:00';
				}else if (type == 'end') {
					let date = new Date();
					let y = date.getFullYear();
					let m = this.prefixZero(date.getMonth() + 1, 2);
					let d = this.prefixZero(date.getDate(), 2);
					return y + '-' + m + '-' + d + ' ' + '23:59:59';
				}
			},
			prefixZero(value, len) { //前置补充0
				if (value.toString().length >= len) { //不用补0
					return value;
				}
				if (Number.isInteger(value)) {
					let str = '';
					for (let i = 0; i < len - 1; i++) {
						str += '0';
					}
					return str + value;
				}
			},
			changeStartTime(time) {
				this.startTime = time;
				let postData = this.setRequestData();
				console.log(postData);
				this.requestList(postData);
			},
			changeEndTime(time) {
				this.endTime = time;
				let postData = this.setRequestData();
				this.requestList(postData);
			},
			changeGameType(index) { //更换游戏种类选项
				this.GameTypeCur = index;

				if (this.gameTypeData[index].code == "ZRSX") {
					setTimeout(function() {
						uni.redirectTo({
							url: '/pages/member/index/ZrsxUserAccount/UserAccount'
						});
					}, 280);
				} else if (this.gameTypeData[index].code == "CPYX") {
					setTimeout(function() {
						uni.redirectTo({
							url: '/pages/member/index/userAccount/UserAccount'
						});
					}, 280);

				} else if (this.gameTypeData[index].code == "DZYX") {
					setTimeout(function() {
						uni.redirectTo({
							url: '/pages/member/index/DzyxUserAccount/UserAccount'
						});
					}, 280);

				} else if (this.gameTypeData[index].code == "TYJJ") {
					setTimeout(function() {
						uni.redirectTo({
							url: '/pages/member/index/TyssUserAccount/UserAccount'
						});
					}, 280);

				} else if (this.gameTypeData[index].code == "QPYX") {
					setTimeout(function() {
						uni.redirectTo({
							url: '/pages/member/index/QpyxUserAccount/UserAccount'
						});
					}, 280);

				} else if (this.gameTypeData[index].code == "BYYX") {
					setTimeout(function() {
						uni.redirectTo({
							url: '/pages/member/index/ByyxUserAccount/UserAccount'
						});
					}, 280);

				} else if (this.gameTypeData[index].code == "FBD") {
					setTimeout(function() {
						uni.redirectTo({
							url: '/pages/member/index/FbdUserAccount/UserAccount'
						});
					}, 280);

				}

			},
			setRequestData() { //生成发送数据
				let postData = {};
				postData.startTime = this.startTime
				postData.endTime = this.endTime;
				return postData;
			},
			requestList(data, callback) { //根据数据获取列表
				let postData = this.setRequestData();
				this.requestData('System.Report.fishGameIndividualReport',
					postData, res => {
						this.accountList = res.data;
						console.log(this.accountList)
					});

			},
			requestData(url, data, callback, failCallback) {
				uni.showLoading({
					title: '加载中...'
				});
				this.sendRequest({ //游戏订单请求
					url: url,
					data: data,
					success: res => {
						console.log(res);
						if (res.code == 0) { //成功返回
							if (callback)
								callback(res);
						} else {
							this.$util.showToast({
								title: res.message
							});
						}
					},
					fail: () => {
						if (failCallback) {
							failCallback();
						}
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
		},
		mixins: [http],
	}
</script>

<style lang="scss" scoped>

</style>
