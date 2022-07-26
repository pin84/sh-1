<template>
	<view class="filter-panel bg-white padding-sm shadow" >
		<view class="flex align-center">
			<text class="form-label text-right">订单号：</text>
			<view class="border form-input flex-sub ">	
				<input type="text" v-model="orderNumber" pla ceholder-class="text-gray text-sub" placeholder="订单号" class="text-df " @/>
			</view>
		</view>
		<view class="flex align-center margin-top-sm">
			<text class="form-label text-right">充值状态：</text>
			<view class="position-relative flex-sub">
				<view class="border form-input ">
					<input type="text" @focus="showInfoList" @blur="hideInfoList" v-model="info" placeholder-class="text-gray text-sub" placeholder="全部" class="text-df " />
				</view>
				
				<scroll-view scroll-y class="info-list bg-white border" v-show="listShow">
					<view class="cu-list  menu ">
					
						<view class="cu-item" :class="item.status == selectedStatus? 'cur' : ''"
							v-for="(item,index) in statusList" 
							:key="index" 
							@tap="changeItem(item.status, item.name)">
							<view class="">
								{{item.name}}
							</view>
						</view>
					</view>
					
				</scroll-view>
			</view>
		</view>
		<view class="flex align-center margin-top-sm">
			<text class="form-label text-right">用户名：</text>
			<view class="border form-input flex-sub ">	
				<input type="text" v-model="username" placeholder-class="text-gray text-sub" placeholder="用户名" class="text-df " @/>
			</view>
		</view>
		<view class="flex align-center" v-if="isAgent">
			<text class="form-label text-right">包含下级：</text>
			<view class="flex-sub form-input">	
				<switch :checked="cantainStatus" @change="changeSwitch" />
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderNumber: '',
			selectedStatus: -1,
			cantainStatus:false,
			info: '',
			username: '',
			listShow: false,
			statusList0: [
				{'status': -1, 'name': '全部'},
				{'status': 1, 'name': '充值成功'},
				{'status': 2, 'name': '充值失败'},
				{'status': 0, 'name': '等待支付'}
			],
			statusList1: [
				{'status': -1, 'name': '全部'},
				{'status': 1, 'name': '提现成功'},
				{'status': 2, 'name': '提现失败'},
				{'status': 0, 'name': '等待处理'}
			],
			
		};
	},
	props: {
		'filterType': Number,
		'isAgent': Boolean,
	},
	computed:{
		statusList() {        //根据type选择list显示
			return this['statusList' + this.filterType];
		},
		// containStatus(){
		// 	if(this.isAgent){
		// 		return true
		// 	}else {
		// 		return false
		// 	}
		// }
	},
	watch: {
	  isAgent(val) {
		  //console.log(val)
		  this.cantainStatus=val;
	    //this.containStatus=val;
	  },
	},
	methods: {
		
		showInfoList() {        //展示彩种信息
			this.listShow = true;
			this.$emit('showInfoList');
		},
		hideInfoList() {         //隐藏彩种信息
			setTimeout(()=>this.listShow = false,50);
		},
		changeItem(status, text) {
			this.info = text;
			this.selectedStatus = status;
		},
		changeSwitch(e) {
			this.cantainStatus = e.detail.value;
		},
		getFilterData() {        //返回筛选数据
			let filterData = {};
			if (this.orderNumber != '') {
				filterData.orderNum = this.orderNumber;
			}
			filterData.status = this.selectedStatus;
			if (this.username != '') {
				filterData.accountName = this.username.replace(/(^\s*)|(\s*$)/g, "");
			}
			filterData.isContainSub  = this.cantainStatus? 1 : 0;
			return filterData;
		}
	},
	created(){
		this.cantainStatus = this.isAgent;//如果是代理的话默认选中
		//console.log(this.isAgent)
	}
};	
</script>

<style lang="scss" scoped>
	.uni-switch-input.uni-switch-input-checked {
		background-color: #e54d42!important;
		border-color: #e54d42!important;
	}
	.filter-panel {
		position: absolute;
		width: 100%;
		background-color: #fff;
		z-index: 10;
		.form-label {
			width: 22%;
		}
		.form-input {
			padding: 8px;
			border-radius: 4px;
		}
		.border {
			border: 1px solid #d6d6d6;
		}
		.info-list {
			margin-top: -1px;
			position: absolute;
			z-index: 10;
			height: calc(30vh);
			
		}
	}
</style>
