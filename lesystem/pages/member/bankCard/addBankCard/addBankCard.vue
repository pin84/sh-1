<template>
	<view class="page-body">
		<block v-if="loadingType == 'noMore'">
			<block v-if="bankCardCount">
				<view class="info item">
					添加绑定银行卡需提供最近一次绑定的卡号信息！
					<text class="iconfont iconbangzhu" @click="showInfo_1"></text>
				</view>
				<view class="item alignFlex">
					<text>开户姓名：</text>
					<input class="uni-input" type="text" placeholder="最近一次绑定的银行卡开户人姓名" v-model="username_1"/>
				</view>
				<view class="item alignFlex">
					<text>银行卡号：</text>
					<input class="uni-input" type="text" placeholder="最近一次绑定的银行卡卡号" v-model="cardNo_1"/>
				</view>
			</block>
			<view class="item title ns-font-size-lg">
				<text class="iconfont iconyuandian"></text>
				新增银行卡
			</view>
			<view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						开户银行：
					</view>
					<view class="uni-list-cell-db">
						<picker @change="bankListChange" :value="bankListIndex" :range="bankList" :range-key="'name'">
							<view class="uni-input">{{bankList[bankListIndex].name}}</view>
						</picker>
					</view>
				</view>
			</view>
			<block v-if="openAddress == '1'">
				<view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							开户省份：
						</view>
						<view class="uni-list-cell-db">
							<picker @change="provinceListChange" :value="provinceListIndex" :range="provinceList" :range-key="'name'">
								<view class="uni-input">{{provinceList[provinceListIndex].name}}</view>
							</picker>
						</view>
					</view>
				</view>
				<view>
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							开户城市：
						</view>
						<view class="uni-list-cell-db">
							<picker @change="cityListChange" :value="cityListIndex" :range="cityList" :range-key="'name'">
								<view class="uni-input">{{cityList[cityListIndex].name}}</view>
							</picker>
						</view>
					</view>
				</view>
				<view class="item alignFlex">
					<text>支行名称：</text>
					<input class="uni-input" type="text" placeholder="支行名称有1至20个字符组成" v-model="bankName"/>
					<text class="iconfont iconbangzhu" @click="showInfo_2"></text>
				</view>
			</block>
			<view class="item alignFlex">
				<text>开户姓名：</text>
				<input class="uni-input" type="text" placeholder="请输入开户预留姓名" v-model="username_2"/>
			</view>
			<view class="item alignFlex">
				<text>银行卡号：</text>
				<input class="uni-input" type="text" placeholder="银行卡号必须是16至19位数字组成" v-model="cardNo_2"/>
			</view>
			<view class="item alignFlex">
				<text>确认卡号：</text>
				<input class="uni-input" type="text" placeholder="手动输入确认卡号不能粘贴" onpaste="return false" v-model="okCardNo_2"/>
			</view>
			<button @click="save">保存并使用</button>
		</block>
		<uni-load-more :status="loadingType" :contentText='contentText'></uni-load-more>
	</view>
</template>

<script>
	import http from 'common/js/http.js';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				loadingType: 'loading',
				contentText: {
					contentrefresh: '正在加载...',
					contentnomore: ''
				},
				username_1: '',
				cardNo_1: '',
				bankListIndex: 0,
				provinceListIndex: 0,
				cityListIndex: 0,
				bankList: [{
					id: '',
					name: '请选择银行'
				}],
				provinceList: [{
					id: '',
					name: '请选择省份'
				}],
				cityList: [{
					id: '',
					name: '请选择城市'
				}],
				bankName: '',
				username_2: '',
				cardNo_2: '',
				okCardNo_2: '',
				openAddress: '',
				bankCardCount: ''
			}
		},
		methods: {
			showInfo_1(){
				uni.showModal({
					showCancel: false,
				    content: '如需要删除请联系客服提供银行卡照片和充值截图进行处理！'
				});
			},
			showInfo_2(){
				uni.showModal({
					showCancel: false,
				    content: '支行是指您最初办理开户手续的营业网点，我们通常称为支行。您可以在银行微信公众号输入卡号查询开户支行信息；如填写支行信息错误会导致出款失败，届时您需要联系在线客服为您重新绑定正确信息。'
				});
			},
			getBankCardCount(){
				this.sendRequest({
					url: 'System.Member.getMemberBankCardCount',
					data: {},
					success: res => {
						// console.log(res);
						if(res.code == 0) {
							this.bankCardCount = res.data;
							this.getBankList();
						}
					}
				})
			},
			getBankList(){
				this.sendRequest({
					url: 'System.Member.getBankList',
					data: {},
					success: res =>{
						// console.log(res);
						if(res.code == 0){
							Object.keys(res.data).forEach(key => {
								let item = res.data[key];
								this.bankList.push({
									id: item.id,
									name: item.name
								});
							})
							this.isNeedOpenAddress();
						}
					}
				})
			},
			bankListChange(e){
				this.bankListIndex = e.target.value;
				// console.log(this.bankListIndex);
			},
			isNeedOpenAddress(){
				this.sendRequest({
					url: 'System.Member.isNeedOpenAddress',
					data: {},
					success: res => {
						// console.log(res)
						if(res.code == 0){
							this.openAddress = res.data.isNeedOpenAddress;
							if(this.openAddress != 0){
								Object.keys(res.data.division_list).forEach(key => {
									let item = res.data.division_list[key];
									this.provinceList.push({
										id: item.division_id,
										name: item.division_name
									});
								})
							}
							this.loadingType = 'noMore';
						}
					}
				})
			},
			provinceListChange(e){
				this.provinceListIndex = e.target.value;
				// console.log(this.provinceListIndex);
				this.getCityList(this.provinceList[this.provinceListIndex].id);
			},
			getCityList(parant_id){
				this.sendRequest({
					url: 'System.Member.getDivisionByParenId',
					method:"POST",
					data: {
						parant_id: parant_id
					},
					success: res => {
						// console.log(res);
						this.cityListIndex = 0;
						this.cityList = [{
							id: '',
							name: '请选择城市'
						}]
						if(res.code == 0){
							Object.keys(res.data).forEach(key => {
								let item = res.data[key];
								this.cityList.push({
									id: item.division_id,
									name: item.division_name
								});
							})
						}
					}
				})
			},
			cityListChange(e){
				this.cityListIndex = e.target.value;
				// console.log(this.cityListIndex)
			},
			save(){
				if(this.bankCardCount && this.username_1 == ''){
					this.$util.showToast({ title: '请填写最近一次绑定的银行卡开户人姓名' });
					return false;
				}
				if(this.bankCardCount && this.cardNo_1 == ''){
					this.$util.showToast({ title: '请填写最近一次绑定的银行卡卡号' });
					return false;
				}
				if(this.bankList[this.bankListIndex].id == ''){
					this.$util.showToast({ title: '请选择开户银行' });
					return false;
				}
				if(this.openAddress == '1' && this.provinceList[this.provinceListIndex].id == ''){
					this.$util.showToast({ title: '请选择开户省份' });
					return false;
				}
				if(this.openAddress == '1' && this.cityList[this.cityListIndex].id == ''){
					this.$util.showToast({ title: '请选择开户城市' });
					return false;
				}
				if(this.openAddress == '1' && this.bankName == ''){
					this.$util.showToast({ title: '请填写支行名称' });
					return false;
				}
				if(this.openAddress == '1' && this.username_2 == ''){
					this.$util.showToast({ title: '请填写开户预留姓名' });
					return false;
				}
				if(this.cardNo_2 == ''){
					this.$util.showToast({ title: '请填写银行卡号' });
					return false;
				}
				if(this.okCardNo_2 == ''){
					this.$util.showToast({ title: '请确认银行卡号' });
					return false;
				}
				
				this.sendRequest({
					url: 'System.Member.addBankcard',
					method:"POST",
					data: {
						open_bank: this.bankList[this.bankListIndex].id,//银行id
						bank_name: this.bankList[this.bankListIndex].name,
						real_name: this.username_2,//真实姓名
						bank_account: this.cardNo_2,//银行卡号
						ok_bank_account: this.okCardNo_2,//确认银卡卡号
						addBankSetting: this.openAddress,//是否需要银卡地址
						province: this.provinceList[this.provinceListIndex].id==''?'':this.provinceList[this.provinceListIndex].name,//省
						city: this.cityList[this.cityListIndex].id==''?'':this.cityList[this.cityListIndex].name,//市
						subbranch: this.bankName,//支行
						userBankCardAmount: this.bankCardCount,//银行卡数目
						last_bank_account: this.cardNo_1,//上次银行卡号
						last_real_name: this.username_1//上次姓名
					},
					success: res => {
						// console.log(res)
						if(res.code < 0){
							this.$util.showToast({ title: res.message });
						}
						else{
							this.$util.showToast({ title: '保存成功' });
							uni.redirectTo({
								url:'/pages/member/bankCard/bankCardList/bankCardList'
							})
							// setTimeout(function() {
							// 	uni.navigateBack({
							// 		delta: 1
							// 	});
							// }, 1000);
						}
					}
				})
			}
		},
		onLoad(){
			this.getBankCardCount();
		},
		mixins: [http]
	}
</script>

<style lang="scss" scoped>
		.alignFlex{display: flex;    align-items: center;}
.page-body{
	min-height: 100vh;
	background-color: white;
	/* #ifdef H5 */
	min-height: calc(100vh - 44px);
	/* #endif */
	
	>view{
		border-bottom: 2rpx solid #eee;
		color: #333;
		height: 40px;
		line-height: 40px;
		
		.uni-list-cell::after {
			position: absolute;
			z-index: 3;
			right: 0;
			bottom: 0;
			left: 15px;
			height: 0;
			content: '';
			-webkit-transform: scaleY(.5);
			transform: scaleY(.5);
			background-color: #c8c7cc;
		}
	}
	
	.info{
		text-align: center;
		color: #FF0036;
	}
	
	.item{
		padding: 0 30rpx;
		
		input{
			flex-grow: 1;
		}
	}
	
	.title{
		color: black;
		font-weight: 700;
		
		text{
			color: #FF0036;
		}
	}
	
	button {
		width: 680rpx;
		margin: 0 auto;
		border: none;
		background-color: #FF0036;
		color: white;
		margin-top: 40rpx;
	}
	
	.iconbangzhu{
		color: #aaa;
	}
	
	.uni-load-more{
		border-bottom: none;
	}
}
</style>
