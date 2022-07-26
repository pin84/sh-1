<template>
	<view>
		
		<view class="bill-time-selector top-top">
			<view class="bill-time">
					
					<date-time-hms class="bill-time-date" :select-time='select_time' :start-time-stamp='before_stamp' :end-time-stamp='after_stamp' @dateChange='dateChange'></date-time-hms>
					
					<icon class="iconfont icon-icon-test1" type=""></icon>
			</view>
			
			<view class="bill-time">
					
					<date-time-hms class="bill-time-date" :select-time='select_time2' :start-time-stamp='before_stamp2' :end-time-stamp='after_stamp' @dateChange='dateChange2'></date-time-hms>
					
					<icon class="iconfont icon-icon-test1" type=""></icon>
					
			</view>
			<view class="bill-btn" @click="drawer_flag=!drawer_flag">筛选</view>
			<view class="iconfont icon-icon-test bill-btn bill-search-icon" @click="selectByConditions"></view>
		</view>
		
		
		<view class="bill-detail">
			<view class="bill-detail-box" v-for="(item,index) in billList" :key="index">
				<view class="bill-detail-box-item">
					
					<text class="color_default bill-detail-box-text">{{item.bill_time}}</text>
					
					<view class="box-item-name bill-detail-box-text" :class="{'name-hidden':is_self}">
						用户
						<text class="box-item-name-text">{{item.username}}</text>
					</view>
					
				</view>
				<view class="bill-detail-box-item">
					<text class="bill-detail-box-text">
						收入
						<text class="color_red detail-indent bill-detail-box-font" :class="{'balance-hidden':item.deposit_or_withdraw}">{{item.coin}}<text class="balance-font" :class="[(item.liq_type == 1 || item.liq_type == 2 || item.liq_type == 3)?'':'balance-hidden']">(+{{item.rebate_charge}})</text></text>
						<text class="detail-indent bill-detail-box-font" :class="{'balance-hidden':!item.deposit_or_withdraw}">-</text>
					</text>
					<text class="bill-detail-box-text">
						支出
						<text class="color_yellow detail-indent bill-detail-box-font" :class="{'balance-hidden':!item.deposit_or_withdraw}">{{item.coin}}<text class="balance-font" :class="[(item.liq_type == 11 || item.liq_type == 101)?'':'balance-hidden']">({{item.rebate_charge}})</text></text>
						<text class="detail-indent bill-detail-box-font" :class="{'balance-hidden':item.deposit_or_withdraw}">-</text>
					</text>
				</view>
				<view class="bill-detail-box-item">
					<text class="bill-detail-box-text">
						账变类型
						<text class="color_green detail-indent bill-detail-box-font"> {{item.liq_type_name}}</text>
					</text>
					<text class="bill-detail-box-text">
						余额
						<text class="color_default detail-indent bill-detail-box-font">{{item.balance}}</text>
					</text>
				</view>
				<view class="bill-detail-box-item">
					<text class="bill-detail-box-text">
						备注
						<text class="color_default detail-indent bill-detail-box-font">{{item.remark}}</text>
					</text>
				</view>
			</view>
		</view>
		
		<view class="load-box" @click="loadMore" :class="{loadhidden:load_more_flag}">上滑加载更多</view>
		<view class="load-box" :class="{loadhidden:load_over_flag}">已全部加载</view>
		
		<view class="bill-total">
			<view class="bill-total-box total-box-flex2">
				<text class="bill-total-box-text bill-total-box-title">总计</text>
				<text class="bill-total-box-text">{{pageTotalList[0]}} 笔</text>
			</view>
			<view class="bill-total-box total-box-flex3">
				<text class="bill-total-box-text bill-total-box-title">总支出</text>
				<text class="bill-total-box-text">{{pageTotalList[1]}}</text>
			</view>
			<view class="bill-total-box total-box-flex3">
				<text class="bill-total-box-text bill-total-box-title">总收入</text>
				<text class="bill-total-box-text">{{pageTotalList[2]}}</text>
			</view>
		</view>
		
		<uni-drawer :visible="drawer_flag" mode="right" @close="billInit">
			
			<view class="bill-detail-card">
				
				<view class="bill-detail-card-top">
					<checkbox-group @change="checkChangeAll" class="bill-detail-card-top-box">
						<label class="card-indent">
							<checkbox class="bill-detail-card-checkbox" :value="checkAll.value" :checked="checkAll.checked" /><text class="bill-detail-card-text">{{checkAll.name}}</text>
						</label>
					</checkbox-group>
					
					<checkbox-group @change="checkChangeIncome" class="bill-detail-card-top-box">
						<label class="card-indent">
							<checkbox class="bill-detail-card-checkbox" :value="checkIncome.value" :checked="checkIncome.checked" /><text class="bill-detail-card-text">{{checkIncome.name}}</text>
						</label>
					</checkbox-group>
					
					<checkbox-group @change="checkChangeExpend" class="bill-detail-card-top-box">
						<label class="card-indent">
							<checkbox class="bill-detail-card-checkbox" :value="checkExpend.value" :checked="checkExpend.checked" /><text class="bill-detail-card-text">{{checkExpend.name}}</text>
						</label>
					</checkbox-group>
					
				</view>
				
				<scroll-view class="bill-detail-card-box" :style="{height:box_height}" scroll-y>
					
					<view class="bill-detail-card-item" v-for="(item,index) in billTypeList" :key="index">
						<checkbox-group name="bill-detail-card-box-type" @change="checkTypeChange($event,index)">
							<label class="card-indent-3">
								<checkbox class="bill-detail-card-checkbox" :value="item.Key" :checked="item.checked" /><text class="bill-detail-card-text3">{{item.Key}}</text>
							</label>
						</checkbox-group>
						<text class="bill-detail-card-box-h1">收入：</text>
						<view class="bill-detail-card-box-checks">
							<checkbox-group class="bill-detail-checkbox-group" name="bill-detail-card-income" @change="checkIncomeChange($event,index)">
								<label class="card-indent-2 bill-detail-checkbox-label" v-for="(ite,ind) in item.Value.income" :key="ind">
									<checkbox class="bill-detail-card-checkbox" :value="ite.FId" :checked="ite.checked" /><text class="bill-detail-card-text2">{{ite.FName}}</text>
								</label>
							</checkbox-group>
						</view>
						<text class="bill-detail-card-box-h1">支出：</text>
						<view class="bill-detail-card-box-checks">
							<checkbox-group class="bill-detail-checkbox-group" name="bill-detail-card-expend" @change="checkExpendChange($event,index)">
								<label class="card-indent-2 bill-detail-checkbox-label" v-for="(ite,ind) in item.Value.expend" :key="ind">
									<checkbox class="bill-detail-card-checkbox" :value="ite.FId" :checked="ite.checked" /><text class="bill-detail-card-text2">{{ite.FName}}</text>
								</label>
							</checkbox-group>
						</view>
					</view>
					
				</scroll-view>
				
				<view class="bill-detail-card-confirm">
					<view class="confirm-btn" @click="billSubmit">
						确定
					</view>
				</view>
				
			</view>
			
		</uni-drawer>
		
			
	</view>
</template>

<script>
	
import http from '../../../common/js/http.js';
import pickerView from '@/components/uni-calendar/uni-calendar';
import pickerViewColumn from '@/components/uni-calendar/uni-calendar-item';
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniDrawer from '@/components/uni-drawer/old-uni-drawer.vue';
import uniList from "@/components/uni-list/uni-list.vue";
import uniListItem from "@/components/uni-list-item/uni-list-item.vue";

import dateTimeHms from '@/components/date-time/date_time_hms';
	
	
	export default {
	    components: {
	        pickerView,
			pickerViewColumn,
			uniPopup,
			uniDrawer,
			uniList,
			uniListItem,
			dateTimeHms
	    },
		mixins: [http],
	    data() {
				let date = new Date()
				const year = this.timeFormat(date.getFullYear())
				const month = this.timeFormat(date.getMonth() + 1)
				const day = this.timeFormat(date.getDate())
				date.setTime(date.getTime() + 24*60*60*1000*1)
				const year1 = this.timeFormat(date.getFullYear())
				const month1 = this.timeFormat(date.getMonth() + 1)
				const day1 = this.timeFormat(date.getDate())
				// 初始化第一选择时间选择器的时间戳
				
				let t = `${year}/${month}/${day} 02:00:00`
				
				let before_time_stamp = (new Date(t)).getTime()
				
	             return {
							startTime:year + '/' + month + '/' + day + ' 02:00:00',
							endTime:year1 + '/' + month1 + '/' + day1 + ' 02:00:00',
							before_time_stamp,
							billList:[],
							pageList:[],
							pageTotalList:[0,0,0],
								bill_flag:false,
								drawer_flag:false,
								type_flag:true,
								load_more_flag:true,
								load_over_flag:true,
								checkAll:{
									value: 'select_all',
									name: '全部'
								},
								checkIncome:{
									value: 'select_income',
									name: '收入'
								},
								checkExpend:{
									value: 'select_expend',
									name: '支出'
								},
								
								billTypeList:[],
								box_height:'0px',
								selectTypeList:'',
								billSelectList:[],
								income_num:0,
								expend_num:0,
								income_num_list:[],
								expend_num_list:[],
								page:1,
								page_size:20,
								before_stamp:0,
								after_stamp:0,
								select_time:0,
								select_time2:0,
								before_stamp2:0,
								uid:0,
								is_self:1
								
							}
				},
	            onLoad(data) {
					// console.log(data.uid)
					let date = new Date()
					let tomrrow_date_stamp = date.getTime() + 1000*60*60*24*1
					let tomrrow_date = new Date(tomrrow_date_stamp)
					// 设置开始时间
					this.before_stamp = date.getTime() - 1000*60*60*24*35
					// 设置结束时间
					this.after_stamp = date.getTime() + 1000*60*60*24*1
					
					const year = this.timeFormat(date.getFullYear())
					const month = this.timeFormat(date.getMonth() + 1)
					const day = this.timeFormat(date.getDate())
					const tomrrow_year = this.timeFormat(tomrrow_date.getFullYear())
					const tomrrow_month = this.timeFormat(tomrrow_date.getMonth() + 1)
					const tomrrow_day = this.timeFormat(tomrrow_date.getDate())
					
					const hour = this.timeFormat(2)
					const minute = this.timeFormat(0)
					const second = this.timeFormat(0)
					
					let select_1 = `${year}/${month}/${day} ${hour}:${minute}:${second}`
					let select_2 = `${tomrrow_year}/${tomrrow_month}/${tomrrow_day} ${hour}:${minute}:${second}`
					
					this.select_time = new Date(select_1).getTime()
					
					this.before_stamp2 = this.select_time
					
					this.select_time2 = new Date(select_2).getTime()
					
					if(this.after_stamp < this.select_time2){
					
						this.after_stamp = this.select_time2
						
					}
					
					this.getBillChangeType();
					this.setHeight();
					this.getMemberInfo();
	            },
				onReachBottom(){
					!this.load_more_flag && this.loadMore()
				},
				
	    methods: {
			
			dateChange(date){
				
				this.startTime = date[0] + '/' + date[1] + '/' + date[2] + ' ' + date[3] + ':' + date[4] + ':' + date[5]
				
				let year = date[0] - 0
				let month = date[1] - 0
				let day = date[2] - 0
				let hour = date[3] - 0
				let minute = date[4] - 0
				let second = date[5] - 0
				
				let t = `${date[0]}/${date[1]}/${date[2]} ${date[3]}:${date[4]}:${date[5]}`
				
				this.select_time = (new Date(t)).getTime()
				
				this.before_stamp2 = this.select_time
				
				
			},
			dateChange2(date){
				
				this.endTime = date[0] + '/' + date[1] + '/' + date[2] + ' ' + date[3] + ':' + date[4] + ':' + date[5]
				
				let year = date[0] - 0
				let month = date[1] - 0
				let day = date[2] - 0
				let hour = date[3] - 0
				let minute = date[4] - 0
				let second = date[5] - 0
				
				let t = `${date[0]}/${date[1]}/${date[2]} ${date[3]}:${date[4]}:${date[5]}`
				
				this.select_time2 = (new Date(t)).getTime()
				
				this.selectByConditions()
				
			},
			billInit(){
					this.drawer_flag = !this.drawer_flag
					this.$set(this.checkAll,'checked',false)
					this.selectTypeAll('income',false)
					this.selectTypeAll('expend',false)
			},
			startDateChange(date){
				this.startTime = date[0] + '/' + date[1] + '/' + date[2] + ' ' + date[3] + ':' + date[4] + ':' + date[5]
				
				let year = date[0] - 0
				let month = date[1] - 0
				let day = date[2] - 0
				let hour = date[3] - 0
				let minute = date[4] - 0
				let second = date[5] - 0
				
				let t = `${date[0]}/${date[1]}/${date[2]} ${date[3]}:${date[4]}:${date[5]}`
				
				this.before_time_stamp = (new Date(t)).getTime()
				
			},
			endDateChange(date){
				this.endTime = date[0] + '/' + date[1] + '/' + date[2] + ' ' + date[3] + ':' + date[4] + ':' + date[5]
				this.selectByConditions()
				
			},
			// 获取 会员基本信息
			getMemberInfo(){
				let _this = this
				_this.sendRequest({
					url:'System.Member.memberInfo',
					data:{
						
						token:uni.getStorageSync('token'),
						is_uniapp:1
						
					},
					success:res=>{
						_this.uid = res.data.uid
						
					},
					complete:()=>{
						
					}
				})
				
			},
			// 点击 搜索 按钮 根据 开始和结束 时间以及 账变类型 获取账变数据
			selectByConditions(){
				
				uni.showLoading({
				  title: '加载中...'
				})
				
				let _this = this
				_this.billList = []
				_this.pageList = []
				_this.page = 1
				_this.getAccount(_this)
				// 获取第一页订单的内容
					_this.sendRequest({
						url:"System.Member.getAccountChangeList",
						data:{
							uid:_this.uid,
							token:uni.getStorageSync('token'),
							is_uniapp:1,
							checkType:_this.selectTypeList,
							startTime:_this.startTime,
							endTime:_this.endTime,
							page:_this.page,
							page_size:_this.page_size
						},
						success:res=>{
							// console.log(res)
							_this.is_self = res.data.is_self
							if(res.data.data.length){
								res.data.data.forEach(item=>{
									let date = new Date(item.action_time*1000)
									let Y = date.getFullYear() + '/'
									let M = _this.timeFormat(date.getMonth()+1) + '/'
									let D = _this.timeFormat(date.getDate()) + '  '
									let h = _this.timeFormat(date.getHours()) + ':'
									let m = _this.timeFormat(date.getMinutes()) + ':'
									let s = _this.timeFormat(date.getSeconds())
									item.bill_time = Y+M+D+h+m+s
									_this.pageList.push(item)
								})
								_this.billList = _this.pageList
								// 判断是否还有下一页
								if(_this.page < res.data.page_count){
									// 下一页有内容
									_this.load_more_flag = false
									_this.load_over_flag = true
								}else{
									// 下一页无内容
									_this.load_more_flag = true
									_this.load_over_flag = false
								}
								
							}else{
								
								_this.$util.showToast({ title: '未找到相关数据' })
								_this.load_more_flag = true
								_this.load_over_flag = true
								
							}
						},
						complete: () => {
							uni.pageScrollTo({
								scrollTop: 0,
								duration: 200
							})
							uni.hideLoading()
							uni.stopPullDownRefresh()
						}
					})
				
			},
			loadMore(){
				uni.showLoading({
				  title: '加载中...'
				})
				let _this = this
				_this.page++	
				_this.sendRequest({
					url:"System.Member.getAccountChangeList",
					data:{
						uid:_this.uid,
						token:uni.getStorageSync('token'),
						is_uniapp:1,
						checkType:_this.selectTypeList,
						startTime:_this.startTime,
						endTime:_this.endTime,
						page:_this.page++,
						page_size:_this.page_size
					},
					success:res=>{
						_this.pageList = []
						res.data.data.forEach(item=>{
							let date = new Date(item.action_time*1000)
							let Y = date.getFullYear() + '/'
							let M = _this.timeFormat(date.getMonth()+1) + '/'
							let D = _this.timeFormat(date.getDate()) + '  '
							let h = _this.timeFormat(date.getHours()) + ':'
							let m = _this.timeFormat(date.getMinutes()) + ':'
							let s = _this.timeFormat(date.getSeconds())
							item.bill_time = Y+M+D+h+m+s
							_this.pageList.push(item)
						})
						// 将获取到到数据加到之前到数据之后，注意：.concat()方法并不会改变原数组，返回到新数组
						_this.billList = _this.billList.concat(_this.pageList)
						// 判断是否还有下一页
						if(_this.page < res.data.page_count){
							// 下一页有内容
							_this.load_more_flag = false
							_this.load_over_flag = true
						}else{
							// 下一页无内容
							_this.load_more_flag = true
							_this.load_over_flag = false
						}
					},
					complete: () => {
					  uni.hideLoading()
					  uni.stopPullDownRefresh()
					}
				})
				
			},
						openTime(ref){
							this.$refs[ref].open()
						},
						
						// 对时间数字格式化（转变为 string 格式）
						timeFormat(i){
							
							return i > 9 ? '' + i : '0' + i
							
						},
						
						drawerAppear(){
							this.drawer_flag = true
						},
						// 获取账变订单总数据
						getAccount(thi){
								thi.sendRequest({
									url:"System.Member.getAccountChangeList",
									data:{
										uid:thi.uid,
										token:uni.getStorageSync('token'),
										is_uniapp:1,
										checkType:thi.selectTypeList,
										startTime:thi.startTime,
										endTime:thi.endTime,
										page:1,
										page_size:100000
									},
									success:res=>{
										// console.log(res)
										thi.pageTotalList = [0,0,0]
										if(res.data.data.length){
											
											res.data.data.forEach(item=>{
												
												if(res.data.data.length){
													
													thi.pageTotalList[0]++
													if(item.deposit_or_withdraw == 0){
														thi.pageTotalList[2] += parseFloat(item.coin)
													}else if(item.deposit_or_withdraw == 1){
														thi.pageTotalList[1] += -parseFloat(item.coin)
													}
													
												}
											})
											thi.pageTotalList[1] = thi.pageTotalList[1].toFixed(2)
											thi.pageTotalList[2] = thi.pageTotalList[2].toFixed(2)
										}
									}
								})
						},
						// 获取账变类型数据列表
						getBillChangeType(){
							let _this = this
							_this.sendRequest({
								url:'System.Member.getCashChangeType',
								success:res=>{
									// console.log(res.data)
									if(res.code === 0){
										let arr = []
										res.data.forEach((item,index)=>{
											
											let bill_type = {
												Key:'',
												Value:{
													income:[],
													expend:[]
												}
											}
											bill_type.Key = item.Key
											item.Value.forEach(item=>{
												item.FId = item.FId + ''
												arr.push(item.FId)
												switch(item.FType){
													case 0:
													bill_type.Value.income.push(item)
													break;
													case 1:
													bill_type.Value.expend.push(item)
													break;
												}
											})
											_this.billTypeList.push(bill_type)
										})
										// console.log(_this.billTypeList)
										this.billCount()
										this.selectTypeList = arr.join(',')
									}else{
										
									}
								}
							})
						},
						// 设置账变类型选取框的高度
						setHeight(){
							const query = uni.createSelectorQuery().selectViewport()
							let diff = 118
							let box_height
							query.boundingClientRect(res=>{
								box_height = res.height - diff
							}).exec()
							this.box_height = box_height + 'px'
						},
						// 监控全选按钮选中事件
						checkChangeAll(e){
							let arr = e.detail.value
							let select_all = arr.some(item=>item=="select_all")
							if(select_all){
								this.$set(this.checkAll,'checked',true)
								this.selectTypeAll('income',true)
								this.selectTypeAll('expend',true)
								this.billTypeList.forEach((item,index)=>{
									this.billTypeList[index].checked = true
								})
							}else{
								this.$set(this.checkAll,'checked',false)
								this.selectTypeAll('income',false)
								this.selectTypeAll('expend',false)
							}
						},
						// 监控 收入 全选按钮选中(或取消)事件
						checkChangeIncome(e){
							let arr = e.detail.value
							let select_income = arr.some(item=>item=="select_income")
							if(select_income){
								this.selectTypeAll('income',true)
								if(this.checkExpend.checked == true){
									this.$set(this.checkAll,'checked',true)
									this.billTypeList.forEach((item,index)=>{
										this.billTypeList[index].checked = true
									})
								}else{
									this.$set(this.checkAll,'checked',false)
								}
							}else{
								this.selectTypeAll('income',false)
								this.$set(this.checkAll,'checked',false)
							}
						},
						// 监控 支出 全选按钮选中(或取消)事件
						checkChangeExpend(e){
							let arr = e.detail.value
							let select_expend = arr.some(item=>item=="select_expend")
							if(select_expend){
								this.selectTypeAll('expend',true)
								if(this.checkIncome.checked == true){
									this.$set(this.checkAll,'checked',true)
									this.billTypeList.forEach((item,index)=>{
										this.billTypeList[index].checked = true
									})
								}else{
									this.$set(this.checkAll,'checked',false)
								}
							}else{
								this.selectTypeAll('expend',false)
								this.$set(this.checkAll,'checked',false)
							}
						},
						
						// 监控 账变类型 选中（或取消选中）事件
						checkTypeChange(e,index){
							let arr = e.detail.value
							if(arr[0] == this.billTypeList[index].Key){
								// 如果勾选了账变类型后，实现相应勾选
								this.$set(this.billTypeList[index],'checked',true)
								this.selectTypePayments(arr[0],"income",true)
								this.selectTypePayments(arr[0],"expend",true)
								
								let list = this.billTypeList.filter(item=>{
									if(item.checked == true){
										return item.Key
									}
								})
								
								if(list.length == this.billTypeList.length){
									this.$set(this.checkAll,'checked',true)
									this.$set(this.checkIncome,'checked',true)
									this.$set(this.checkExpend,'checked',true)
								}else{
									this.$set(this.checkAll,'checked',false)
								}
								
								let income_num = 0
								let expend_num = 0
								this.billTypeList.forEach(item=>{
									item.Value.income.forEach(ite=>{
										if(ite.checked){
											income_num++
										}
									})
									item.Value.expend.forEach(ite=>{
										if(ite.checked){
											expend_num++
										}
									})
								})
								
								if(income_num == this.income_num){
									this.$set(this.checkIncome,'checked',true)
								}else{
									this.$set(this.checkIncome,'checked',false)
								}
								
								if(expend_num == this.expend_num){
									this.$set(this.checkExpend,'checked',true)
								}else{
									this.$set(this.checkExpend,'checked',false)
								}
								
							}else{
								// 如果取消勾选账变类型后实现相应取消勾选
								this.$set(this.checkAll,'checked',false)
								this.$set(this.checkIncome,'checked',false)
								this.$set(this.checkExpend,'checked',false)
								
								this.$set(this.billTypeList[index],'checked',false)
								this.selectTypePayments(this.billTypeList[index].Key,"income",false)
								this.selectTypePayments(this.billTypeList[index].Key,"expend",false)
							}
						},
						billCount(){
								this.billTypeList.forEach((item,index)=>{
									this.income_num += item.Value.income.length
									this.expend_num += item.Value.expend.length
									this.income_num_list[index] = 0
									this.expend_num_list[index] = 0
									this.income_num_list[index] += item.Value.income.length
									this.expend_num_list[index] += item.Value.expend.length
								})
						},
						// 监控点击每个 收入 模块的按钮触发事件
						checkIncomeChange(e,index){
							let arr = e.detail.value
							let income_select_num = 0
							let current_income_num = 0
							let current_expend_num = 0
							this.billTypeList[index].Value.income.forEach((item,ind)=>{
								this.billTypeList[index].Value.income[ind].checked = false
							})
							this.billTypeList[index].Value.expend.forEach(item=>{
								if(item.checked){
									current_expend_num++
								}
							})
							arr.forEach(item=>{
								this.billTypeList[index].Value.income.some((ite,ind)=>{
									if(item == ite.FId){
										this.billTypeList[index].Value.income[ind].checked = true
										current_income_num++
										return item == ite.FId
									}
								})
							})
							
							if(current_income_num == this.income_num_list[index] && current_expend_num == this.expend_num_list[index]){
								this.billTypeList[index].checked = true
								
							}else{
								this.billTypeList[index].checked = false
							}
							
							this.billTypeList.forEach((item,index)=>{
								if(!this.billSelectList[index]){
									this.billSelectList[index] = []
								}
								this.billSelectList[index][0] = 0
								item.Value.income.forEach(ite=>{
									if(ite.checked){
										this.billSelectList[index][0]++
									}
								})
							})
							this.billSelectList.forEach((item,index)=>{
								income_select_num += item[0]
							})
							
							income_select_num == this.income_num ? this.$set(this.checkIncome,'checked',true) : this.$set(this.checkIncome,'checked',false)
							if(this.checkIncome.checked && this.checkExpend.checked){
								this.$set(this.checkAll,'checked',true)
							}else{
								this.$set(this.checkAll,'checked',false)
							}
						},
						// 监控点击每个 支出 模块的按钮触发事件
						checkExpendChange(e,index){
							let arr = e.detail.value
							let expend_select_num = 0
							let current_income_num = 0
							let current_expend_num = 0
							this.billTypeList[index].Value.expend.forEach((item,ind)=>{
								this.billTypeList[index].Value.expend[ind].checked = false
							})
							this.billTypeList[index].Value.income.forEach(item=>{
								if(item.checked){
									current_income_num++
								}
							})
							arr.forEach(item=>{
								this.billTypeList[index].Value.expend.some((ite,ind)=>{
									if(item == ite.FId){
										this.billTypeList[index].Value.expend[ind].checked = true
										current_expend_num++
									}
									return item == ite.FId
								})
							})
							
							if(current_income_num == this.income_num_list[index] && current_expend_num == this.expend_num_list[index]){
								this.billTypeList[index].checked = true
							}else{
								this.billTypeList[index].checked = false
							}
							
							this.billTypeList.forEach((item,index)=>{
								if(!this.billSelectList[index]){
									this.billSelectList[index] = []
								}
								this.billSelectList[index][1] = 0
								item.Value.expend.forEach(ite=>{
									if(ite.checked){
										this.billSelectList[index][1]++
									}
								})
							})
							this.billSelectList.forEach((item,index)=>{
								expend_select_num += item[1]
							})
							
							expend_select_num == this.expend_num ? this.$set(this.checkExpend,'checked',true) : this.$set(this.checkExpend,'checked',false)
							if(this.checkIncome.checked && this.checkExpend.checked){
								this.$set(this.checkAll,'checked',true)
							}else{
								this.$set(this.checkAll,'checked',false)
							}
						},
						// 根据 账变类型 和 收支类型 全选(或全不选)该系列
						selectTypePayments(bill_type,cash_type,bool){
							let _this = this
							_this.billTypeList.some((item,index)=>{
								if(item.Key == bill_type){
									
									let arr = item.Value[cash_type].map(item1=>{
										
										_this.$set(item1,'checked',bool)
										return item1
									})
									_this.billTypeList[index].Value[cash_type] = arr
								}
							})
						},
						// 收入 或者 支出 全选(或全不选)
						selectTypeAll(type,bool){
							
							if(type == 'income'){
								this.$set(this.checkIncome,'checked',bool)
							}else if(type == 'expend'){
								this.$set(this.checkExpend,'checked',bool)
							}
							
							this.billTypeList.forEach(item=>{
								// this.$set(item,'checked',bool)
								this.selectTypePayments(item.Key,type,bool)
							})
							
							if(!bool){
								this.billTypeList.forEach((item,index)=>{
									this.billTypeList[index].checked = false
								})
							}
							
						},
						billSubmit(){
							let arr = []
							this.billTypeList.forEach(item=>{
								item.Value.income.forEach(item2=>{
									if(item2.checked == true){
										arr.push(item2.FId)
									}
								})
								item.Value.expend.forEach(item3=>{
									if(item3.checked == true){
										arr.push(item3.FId)
									}
								})
							})
							arr.join(',')
							this.selectTypeList = arr
							this.drawer_flag = !this.drawer_flag
							
							// this.$set(this.checkAll,'checked',false)
							// this.selectTypeAll('income',false)
							// this.selectTypeAll('expend',false)
						}

	    }
	}
	
</script>

<style lang="scss">
	
	@import './bill.scss';
	
</style>
