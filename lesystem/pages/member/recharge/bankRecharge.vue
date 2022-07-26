<template>
	<view class="page-body">
		<block v-if="loadingType == 'noMore'">
			<view class="title">
				<text class="iconfont iconyuandian ns-text-color"></text>
				请选择入款银行卡
			</view>
			<view class="content">
				<view class="bankCardList">
					<view :style="{backgroundColor: item.bgColor}" class="item" v-for="(item,index) in top_bankCardList" :key="index" @click="bankCardSelect(top_bankCardList[index].bankCardIndex)">
						<text class="left iconfont" :class="'icon-'+item.short_name"></text>
						<view class="right">
							<view class="ns-font-size-lg whiteFont">{{item.name}}</view>
							<view class="whiteFont">{{item.branch}}</view>
							<view class="whiteFont">{{item.holders}}</view>
							<view class="whiteFont">{{item.card_no}}</view>
						</view>
					</view>
				</view>
				<view class="infoItem" v-for="(item,index) in copyList" :key="index">
					<text class="label">{{item.label}}</text>:
					<text class="textContent">{{item.text}}</text>
					<button class="btn" @click="copy(item.text)">复制</button>
				</view>
				<view class="infoItem">
					<text class="label">存入金额:</text>
					<input class="uni-input" @blur="moneyBlur" @change="moneyChange" type="digit" v-model="money" placeholder="请输入存入金额"/>
				</view>
				<view class="infoItem">
					<text class="label">开户姓名:</text>
					<input class="uni-input" type="text" v-model="name" placeholder="请填写中文字符">
				</view>
				<view class="infoItem uni-list-cell">
					<text class="label">转账类型:</text>
					<view class="uni-list-cell-db">
						<picker @change="showBelongsBank" :value="belongsListIndex" :range="belongsList" :range-key="'name'">
							<view class="uni-input" style="padding: 0 20rpx;">{{belongsList[belongsListIndex].name}}</view>
						</picker>
					</view>
				</view>
				<view class="infoItem" v-if="belongsList[belongsListIndex].value == '银行柜台'">
					<text class="label">所属分行:</text>
					<input class="uni-input" type="text" v-model="branchName" placeholder="请填写所属分行">
				</view>
				<view class="tip">
					<view v-if="showTip">您指定存款金额为<text class="ns-text-color">{{money}}</text>,请存入该指定金额,否则无法自动到账</view>
					<view v-if="bankCardList[bankCardIndex].is_charge">使用该支付方式，需要承担入款手续费<text class="ns-text-color">{{bankCardList[bankCardIndex].charge}}</text>%</view>
					<view>温馨提示：</view>
					<view>1.最小金额：<text class="ns-text-color">{{min_deposit_amount}}</text>;最大金额：<text class="ns-text-color">{{max_deposit_amount}}</text></view>
					<view>2.充值成功后<text class="ns-text-color">5</text>分钟后未到账，请联系客服</view>
					<button class="custService" @click="onlineServer">在线客服</button>
					<button class="submit" @click="submit">{{isSubmit==false?'提交':'提交中...'}}</button>
					<view style=" width:95%;padding: 20rpx; text-align: center; margin-top: 15rpx; background-color:#fff;border-radius:10rpx;text-align: left;
					margin: 0px auto;">
									<rich-text :nodes="front_remark"></rich-text>
					</view>
				</view>
				<view class="bankCardList bottom_bankCardList">
					<view :style="{backgroundColor: item.bgColor}" class="item" v-for="(item,index) in bottom_bankCardList" :key="index" @click="bankCardSelect(bottom_bankCardList[index].bankCardIndex)">
						<text class="left iconfont" :class="'icon-'+item.short_name"></text>
						<view class="right">
							<view class="ns-font-size-lg whiteFont">{{item.name}}</view>
							<view class="whiteFont">{{item.branch}}</view>
							<view class="whiteFont">{{item.holders}}</view>
							<view class="whiteFont">{{item.card_no}}</view>
						</view>
					</view>
				</view>
				
			
				
			</view>
			<view class="showModal" v-if="showModal">
				<view class="uni-mask"></view>
				<view class="uni-modal">
					<view class="uni-modal__bd">
						<view>尊敬的会员您好:恭喜您可获得充值送30%(最高:200)的存款优惠,达到基础抢购量即可提现!(活动详情联系在线客服)</view>
						<view>
							<radio-group @change="radioChange">
								<label v-for="(item, index) in modalList" :key="item.value">
									<view>
										<radio :value="item.value" :checked="index === current" />
									</view>
									<view>{{item.name}}</view>
								</label>
							</radio-group>
						</view>
					</view>
					<view class="uni-modal__ft">
						<view class="uni-modal__btn uni-modal__btn_primary" @click="modalSubmit">确定</view>
					</view>
				</view>
			</view>
		</block>
		<uni-load-more v-if="loadingType == 'loading'" :status="loadingType" :contentText='contentText'></uni-load-more>
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
				isSubmit: false,
				isFirstRecharge: '',
				bankDepositIdStr: '',
				bankCardIndex: 0,
				bankCardList:[{
					short_name: '',
					name: '',
					branch: '',
					holders: '',
					card_no: '',
					bgColor: '#FF0036',
					id: '',
					min_deposit_amount: '',
					front_remark: '',
					max_deposit_amount: '',
					is_charge: '',
					charge: '',
					bankCardIndex: '',
					is_deposit_add_random: '',
					deposit_random_num: '',
					is_give_up: '',
					recharge_privilege: '',
					preference_percent: ''
				}],
				top_bankCardList:[{
					short_name: '',
					name: '',
					branch: '',
					holders: '',
					card_no: '',
					bgColor: '#FF0036',
					id: '',
					min_deposit_amount: '',
					front_remark:'',
					max_deposit_amount: '',
					is_charge: '',
					charge: '',
					bankCardIndex: '',
					is_deposit_add_random: '',
					deposit_random_num: '',
					is_give_up: '',
					recharge_privilege: '',
					preference_percent: ''
				}],
				bottom_bankCardList:[{
					short_name: '',
					name: '',
					branch: '',
					holders: '',
					card_no: '',
					bgColor: '',
					id: '',
					min_deposit_amount: '',
					front_remark:'',
					max_deposit_amount: '',
					is_charge: '',
					charge: '',
					bankCardIndex: '',
					is_deposit_add_random: '',
					deposit_random_num: '',
					is_give_up: '',
					recharge_privilege: '',
					preference_percent: ''
				}],
				copyList:[{
					label: '收款账号名',
					text: ''
				},{
					label: '卡号',
					text: ''
				},{
					label: '支行',
					text: ''
				}],
				money: '',
				name: '',
				branchName: '',
				belongsListIndex: 0,
				belongsList: [{
					value: '网银转账',
					name: '网银转账'
				},{
					value: '银行柜台',
					name: '银行柜台'
				},{
					value: '手机转账',
					name: '手机转账'
				},{
					value: '支付宝转账',
					name: '支付宝转账'
				},{
					value: '微信',
					name: '微信'
				}],
				min_deposit_amount: '',
				front_remark:'',
				max_deposit_amount: '',
				random: '',
				showModal: false,
				current: 0,
				modalList:[{
					value: '0',
					name: '我要获取存款优惠',
					checked: 'true'
				},
				{
					value: '1',
					name: '我要放弃存款优惠'
				}],
				choicePre: '',
				showTip: false
			}
		},
		methods: {
			getOfflinePayments(option){
				this.bankDepositIdStr = option.bankDepositIdStr;
				this.sendRequest({
					url: 'System.Recharge.getOfflinePayments',
					data: {
						bankDepositIdStr: this.bankDepositIdStr
					},
					success: res => {
						// console.log(res)
						if(res.code == 0){
							this.isFirstRecharge = res.data.isFirstRecharge;
							this.bankCardList = [];
							this.top_bankCardList = [];
							this.bottom_bankCardList = [];
							Object.keys(res.data.userBankDepositLists).forEach(key => {
								let item = res.data.userBankDepositLists[key];
								this.bankCardList.push({
									short_name: item.short_name,
									name: item.name,
									branch: item.branch,
									holders: item.holders,
									card_no: item.card_no,
									//bgColor: item.bg_color,
									id: item.id,
									min_deposit_amount: item.min_deposit_amount,
									max_deposit_amount: item.max_deposit_amount,
									is_charge: item.is_charge,
									front_remark: item.front_remark,
									charge: item.charge,
									bankCardIndex: key,
									is_deposit_add_random:item.is_deposit_add_random,
									deposit_random_num: item.deposit_random_num,
									is_give_up: item.is_give_up,
									recharge_privilege: item.recharge_privilege,
									preference_percent: item.preference_percent
								})
							})
							// console.log(this.bankCardList);
							// 银行卡背景色
							for(var i=0;i < this.bankCardList.length;i++){
								if(this.bankCardList[i].short_name == "ZGGSYX"){//工商银行
									this.bankCardList[i].bgColor = "#E03B5F";
								}
								else if(this.bankCardList[i].short_name == "ZGJSYX"){//建设银行
									this.bankCardList[i].bgColor = "#2E4799";
								}
								else if(this.bankCardList[i].short_name == "HYNCXYX"){//湖南农村信用社
									this.bankCardList[i].bgColor = "#E03B5F";
								}
								else if(this.bankCardList[i].short_name == "ZGNYYX"){//农业银行
									this.bankCardList[i].bgColor = "#208f7f";
								}
								else if(this.bankCardList[i].short_name == "ZGJTYX"){//交通银行
									this.bankCardList[i].bgColor = "#015fd2";
								}
								else if(this.bankCardList[i].short_name == "ZGZSYX"){//招行
									this.bankCardList[i].bgColor = "#c8152d";
								}
								else if(this.bankCardList[i].short_name == "ZGYX"){//中国银行
									this.bankCardList[i].bgColor = "#c8152d";
								}
								else if(this.bankCardList[i].short_name == "PFYX"){//pufayinghang
									this.bankCardList[i].bgColor = "#000073";
								}
								else if(this.bankCardList[i].short_name == "PAYX"){//平安银行
									this.bankCardList[i].bgColor = "#f05a23";
								}
								else if(this.bankCardList[i].short_name == "ZGMSYX"){//民生银行
									this.bankCardList[i].bgColor = "#0072bc";
								}
								else if(this.bankCardList[i].short_name == "YZYX"){//邮储银行
									this.bankCardList[i].bgColor = "#00754a";
								}
								else if(this.bankCardList[i].short_name == "XYYX"){//兴业银行
									this.bankCardList[i].bgColor = "#0d2468";
								}
								else if(this.bankCardList[i].short_name == "GLYX"){//桂林银行
									this.bankCardList[i].bgColor = "#842fa3";
								}
								else if(this.bankCardList[i].short_name == "NCXYS"){//农村信用社
									this.bankCardList[i].bgColor = "#00a550";
								}
								else{
									this.bankCardList[i].bgColor = "#c8152d";
								}
							}
							this.copyList[0].text = this.bankCardList[this.bankCardIndex].holders;
							this.copyList[1].text = this.bankCardList[this.bankCardIndex].card_no;
							this.copyList[2].text = this.bankCardList[this.bankCardIndex].branch;
							this.min_deposit_amount = this.bankCardList[this.bankCardIndex].min_deposit_amount;
							this.max_deposit_amount = this.bankCardList[this.bankCardIndex].max_deposit_amount;
							this.front_remark= this.bankCardList[this.bankCardIndex].front_remark;
							this.top_bankCardList = [];
							this.bottom_bankCardList = [];
							if(this.bankCardList.length == 1){
								this.top_bankCardList = this.bankCardList;
								this.bottom_bankCardList = [];
							}
							else{
								if(this.bankCardIndex == 0){
									this.top_bankCardList.push(this.bankCardList[0]);
									for(var i = 0;i < this.bankCardList.length - 1;i++){
										this.bottom_bankCardList.push(this.bankCardList[i+1]);
									}
								}
								else{
									for(var i = 0;i < this.bankCardIndex + 1;i++){
										this.top_bankCardList.push(this.bankCardList[i]);
									}
									for(var i = 0;i < this.bankCardList.length - (this.bankCardIndex + 1);i++){
										this.bottom_bankCardList.push(this.bankCardList[i]);
									}
								}
							}
							this.loadingType = 'noMore';
						}
					}
				})
			},
			copy(value){
				this.$util.multiPlatformCopy(value);
			},
			bankCardSelect(i){
				if(this.bankCardIndex == i){
					return;
				}
				this.money = "";
				this.name = "";
				this.belongsListIndex = 0;
				this.choicePre = "";
				this.showTip = false;
				this.bankCardIndex = Number(i);
				this.copyList[0].text = this.bankCardList[i].holders;
				this.copyList[1].text = this.bankCardList[i].card_no;
				this.copyList[2].text = this.bankCardList[i].branch;
				this.min_deposit_amount = this.bankCardList[i].min_deposit_amount;
				this.front_remark = this.bankCardList[i].front_remark;
				this.max_deposit_amount = this.bankCardList[i].max_deposit_amount;
				this.top_bankCardList = [];
				this.bottom_bankCardList = [];
				if(this.bankCardList.length == 1){
					this.top_bankCardList = this.bankCardList;
					this.bottom_bankCardList = [];
				}
				else{
					if(this.bankCardIndex == 0){
						this.top_bankCardList.push(this.bankCardList[0]);
						for(var i = 0;i < this.bankCardList.length - 1;i++){
							this.bottom_bankCardList.push(this.bankCardList[i+1]);
						}
					}
					else{
						for(var i = 0;i < this.bankCardIndex + 1;i++){
							this.top_bankCardList.push(this.bankCardList[i]);
						}
						for(var i = 0;i < this.bankCardList.length - (this.bankCardIndex + 1);i++){
							this.bottom_bankCardList.push(this.bankCardList[i]);
						}
					}
				}
			},
			showBelongsBank(e){
				this.belongsListIndex = e.target.value;
				this.branchName = '';
			},
			submit(){
				if(this.money == ''){
					this.$util.showToast({ title: '请填写存入金额' });
					return false;
				}
				if(parseFloat(this.money) < parseFloat(this.min_deposit_amount) || parseFloat(this.money) > parseFloat(this.max_deposit_amount)){
					this.$util.showToast({ title: "输入金额不在范围内,请重新输入" });
					return false
				}
				if(this.name == ''){
					this.$util.showToast({ title: '请填写开户姓名' });
					return false;
				}
				if(this.belongsList[this.belongsListIndex].value == '银行柜台' && this.branchName == ''){
					this.$util.showToast({ title: '请填写所属分行' });
					return false;
				}
				else{
					if (this.isSubmit) return;
					this.isSubmit = true;
					this.saveOfflinePayment();
				}
			},
			saveOfflinePayment(){
				this.sendRequest({
					url: 'System.Recharge.saveOfflinePayment',
					method:"POST",
					data: {
						amount: this.money,
						companyCardId: this.bankCardList[this.bankCardIndex].card_no,
						bankId: this.bankCardList[this.bankCardIndex].id,
						way: this.belongsList[this.belongsListIndex].value,
						realName: this.name,
						isFirstRecharge: this.isFirstRecharge,
						choicePre: this.choicePre
					},
					success: res => {
						// console.log(res);
						let id = res.data.id;
						let _this = this;
						if(res.code >= 0){
							uni.showModal({
								showCancel: false,
							    content: res.message,
								success: function(res){
									if(res.confirm){
										_this.$util.redirectTo('/pages/member/recharge/rechargeInfo?id=' + id,{});
									}
								}
							});
						}
						else{
							this.isSubmit = false;
							_this.$util.showToast({ title: "充值失败" });
						}
					}
				})
			},
			onlineServer(){
				// this.sendRequest({
				// 	url: 'System.CustomerService.getCustomerService',
				// 	success: res => {
				// 		// console.log(res)
				// 		if(res.code == 0){
							
				// 		}
				// 	}
				// })
				this.$util.redirectTo('/pages/kefu/kefu',{},'tabbar');
			},
			moneyBlur(e){
				if(e.target.value == ""){
					return false;
				}
				var reg = /^([1-9]\d*(\.\d*[1-9][0-9])?)|(0\.\d*[1-9][0-9])|(0\.\d*[1-9])$/;
				if(reg.test(e.target.value)){
					if(this.money.indexOf(".")==-1){//整数
						let deposit_random_num = this.bankCardList[this.bankCardIndex].deposit_random_num;
						let is_deposit_add_random = this.bankCardList[this.bankCardIndex].is_deposit_add_random;
						if(is_deposit_add_random == 1){
							if(deposit_random_num == 1){
								if(parseFloat(Number(this.money) - this.random) == parseFloat(Number(e.target.value))){
									this.random = parseFloat(Math.floor(Math.random()*9+1)/10);
									this.money = parseFloat(Number(this.money)) + this.random;
								}
							}
							else if(deposit_random_num == 2){
								if(parseFloat(Number(this.money) - this.random) == parseFloat(Number(e.target.value))){
									this.random = parseFloat((Math.floor(Math.random()*90) + 10)/100);
									this.money = parseFloat(Number(this.money)) + this.random;
								}
							}
							this.showTip = true;
						}
						else{
							this.showTip = false;
						}
						
					}
					else{
						if(this.random != ""){
							this.showTip = true;
						}
						else{
							this.showTip = false;
						}
					}
					if(this.bankCardList[this.bankCardIndex].is_give_up == 1 && ((this.isFirstRecharge == 1 && this.bankCardList[this.bankCardIndex].recharge_privilege == 1) || this.bankCardList[this.bankCardIndex].recharge_privilege == 2) && this.bankCardList[this.bankCardIndex].preference_percent > 0){
						if(this.choicePre === ''){
							this.showModal = true;
						}
					}
				}
				else{
					this.money = "";
				}
			},
			moneyChange(){
				this.random = '';
			},
			radioChange(e){
				for (let i = 0; i < this.modalList.length; i++) {
					if (this.modalList[i].value === e.target.value) {
						this.current = i;
						break;
					}
				}
			},
			modalSubmit(){
				if(this.current == 0){
					this.choicePre = true;
				}
				else{
					this.choicePre = false;
				}
				this.showModal = false;
			}
		},
		onLoad(option) {
			this.getOfflinePayments(option);
		},
		onHide() {
			this.isSubmit = false;
		},
		mixins: [http]
	}
</script>

<style lang="scss" scoped>
.page-body{
	min-height: 100vh;
	background-color: white;
	/* #ifdef H5 */
	min-height: calc(100vh - 44px);
	/* #endif */
	
	.title{
		padding: 10rpx;
	}
	
	.content{
		padding: 0 30rpx;
		
		.bankCardList{
			.item{
				border-radius: 10rpx;
				display: flex;
				margin-bottom: 20rpx;
				
				.left{
					width: 160rpx;
					text-align: center;
					font-size: 66rpx;
					color: white;
				}
				
				.right{
					padding: 16rpx 0;
					flex-grow: 1;
					
					.whiteFont{
						color: white!important;
						line-height: 36rpx;
					}
					
					uni-view:first-child{
						font-weight: 700;
					}
					
					uni-view:last-child{
						margin-top: 16rpx;
					}
				}
			}
		}
		
		.bottom_bankCardList{
			
			.item:last-child{
				margin-bottom: 0;
			}
		}
		
		.infoItem{
			display: flex;
			align-items: center;
			padding: 20rpx;
			border-bottom: 2rpx solid #ddd;
			
			.label{
				width: 148rpx;
				text-align: justify;
				text-align-last: justify;
			}
			
			.textContent,.uni-input{
				flex: 1;
				padding: 0 20rpx;
			}
			
			.btn{
				margin: 0;
				height: 54rpx;
				line-height: 54rpx;
				background-color: #eee;
				font-size: 28rpx;
				color: #555;
			}
		}
		
		.uni-list-cell::after{
			height: 0;
		}
		
		.tip{
			background-color: #efefef;
			padding: 40rpx 20rpx 20rpx;
			margin-bottom: 20rpx;
			
			.custService{
				margin: 0;
				padding: 0;
				width: 140rpx;
				font-size: 26rpx;
				height: 50rpx;
				line-height: 50rpx;
				background-color: #BC283B;
				color: white;
			}
			
			.submit{
				background-color: #1AB20A;
				color: white;
				margin: 50rpx 0 0;
			}
		}
	}
	
	.showModal{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 999;
		display: block;
		box-sizing: border-box;
		
		.uni-mask {
		    position: fixed;
		    z-index: 999;
		    top: 0;
		    right: 0;
		    left: 0;
		    bottom: 0;
		    background: rgba(0,0,0,.6);
		}
		
		.uni-modal {
		    position: fixed;
		    z-index: 999;
		    width: 80%;
		    max-width: 600rpx;
		    top: 50%;
		    left: 50%;
		    transform: translate(-50%,-50%);
		    background-color: #fff;
		    text-align: center;
		    border-radius: 6rpx;
		    overflow: hidden;
			
			.uni-modal__bd{
				padding: 40rpx 48rpx 20rpx;
				min-height: 80rpx;
				font-size: 30rpx;
				line-height: 1.4;
				color: #999;
				max-height: 800rpx;
				overflow-y: auto;
				
				uni-view:nth-child(2){
					uni-radio-group{
						uni-label{
							display: flex;
							justify-content: center;
							align-items: center;
							height: 80rpx;
						}
					}
				}
			}
			
			.uni-modal__ft{
				position: relative;
				display: flex;
				
				&::after{
					content: " ";
					position: absolute;
					left: 0;
					top: 0;
					right: 0;
					height: 2rpx;
					border-top: 2rpx solid #d5d5d6;
					color: #d5d5d6;
					transform-origin: 0 0;
					transform: scaleY(.5);
				}
				
				.uni-modal__btn_primary{
					color: rgb(0, 122, 255);
				}
				
				.uni-modal__btn{
					line-height: 96rpx;
					font-size: 36rpx;
					display: block;
					flex: 1;
					text-decoration: none;
					position: relative;
				}
			}
		}
	}
}
</style>
