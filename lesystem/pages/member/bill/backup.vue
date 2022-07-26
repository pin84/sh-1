<template>
	<view>
		
		<view class="bill-time-selector bill-top-box">
			<view class="bill-time" @click="openTime('popup')">
					<text>{{startTime.year}}/{{startTime.month}}/{{startTime.day}} {{startTime.hour}}:{{startTime.minute}}:{{startTime.second}}</text>
					<icon class="iconfont icon-icon-test1" type=""></icon>
			</view>
			<view class="bill-time" @click="openTime('popup')">
					<text>{{endTime.year}}/{{endTime.month}}/{{endTime.day}} {{endTime.hour}}:{{endTime.minute}}:{{endTime.second}}</text>
					<icon class="iconfont icon-icon-test1" type=""></icon>
			</view>
			<view class="bill-btn" @click="bill_flag = !bill_flag">筛选</view>
			<view class="iconfont icon-icon-test bill-btn bill-search-icon" @click="drawer_flag=!drawer_flag"></view>
		</view>
		
		<view class="bill-top-box bill-type" v-show="bill_flag">
			
			<view class="bill-type-left">
				
				 <view class="bill-type-left-box" @click="toggleBillType">
					 <text>{{billTypeBig}}</text>
					 <icon class="iconfont icon-icon-test1" type=""></icon>
				 </view>
				 
				 <view class="bill-type-left-list">
					 <view class="aaaaa" :animation="animationData">
					 		<text v-for="(item,index) in billList" :key="index">{{item}}</text>
					 </view>
				 </view>
				 
			</view>
			
			<view class="bill-type-right">
				
			</view>
			
		</view>
		
		
		<uni-drawer :visible="drawer_flag" mode="right" @close="drawer_flag=!drawer_flag">
		    
		</uni-drawer>
		
		
		<uni-popup ref="popup" type="bottom">
			<view class="content">
			        <picker-view class="mpvue-picker-view" v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
			            <picker-view-column>
			                <view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
			            </picker-view-column>
			            <picker-view-column>
			                <view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
			            </picker-view-column>
			            <picker-view-column>
			                <view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
			            </picker-view-column>
						<picker-view-column>
						    <view class="item" v-for="(item,index) in hours" :key="index">{{item}}</view>
						</picker-view-column>
						<picker-view-column>
						    <view class="item" v-for="(item,index) in minutes" :key="index">{{item}}</view>
						</picker-view-column>
						<picker-view-column>
						    <view class="item" v-for="(item,index) in seconds" :key="index">{{item}}</view>
						</picker-view-column>
			        </picker-view>
			</view>
		</uni-popup>
			
	</view>
</template>

<script>
	
	
import http from '../../../common/js/http.js';
import pickerView from '@/components/uni-calendar/uni-calendar'
import pickerViewColumn from '@/components/uni-calendar/uni-calendar-item'
import uniPopup from "@/components/uni-popup/uni-popup.vue"
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
import uniList from "@/components/uni-list/uni-list.vue"
import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	
	export default {
	    components: {
	        pickerView,
			pickerViewColumn,
			uniPopup,
			uniDrawer,
			uniList,
			uniListItem
	    },
		mixins: [http],
	    data() {
	                
					 const date = new Date()
					       
						   const years = []
						   const year = date.getFullYear()
						   const months = []
						   const month = date.getMonth() + 1
						   const days = []
						   const day = date.getDate()
						   const hours = []
						   const hour = 2
						   const minutes = []
						   const minute = 0
						   const seconds = []
						   const second = 0
						   
						   for (let i = 2000; i <= date.getFullYear()+10; i++) {
						       years.push(i)
						   }
						   for (let i = 1; i <= 12; i++) {
						       months.push(i)
						   }
						   for (let i = 1; i <= date.getMonth()+1; i++) {
						       days.push(i)
						   }
						   for (let i = 0; i <= 23; i++) {
						       hours.push(this.timeFormat(i))
						   }
						   for (let i = 0; i <= 59; i++) {
						       minutes.push(this.timeFormat(i))
						   }
						   for (let i = 0; i <= 59; i++) {
						       seconds.push(this.timeFormat(i))
						   }
						   
					        return {
								startTime:{
									year:0,
									month:0,
									day:0,
									hour:0,
									minute:0,
									second:0
								},
								endTime:{
									year:0,
									month:0,
									day:0,
									hour:0,
									minute:0,
									second:0
								},
								
					            title: 'picker-view',
					            years,
					            year,
					            months,
					            month,
					            days,
					            day,
								
								hours,
								hour,
								minutes,
								minute,
								seconds,
								second,
								
					            value: [year-2000, month - 1, day - 1, hour, minute, second],
					            visible: true,
					            indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
					        
					billList:[
						'类型1',
						'类型2',
						'类型3',
						'类型4'
						
					],
					bill_flag:false,
					drawer_flag:false,
					type_flag:true,
					bill_type:'',
					billTypeList:[],
					billTypeBig:'类型',
					animationData:{}
					
					}
	            },
	            onLoad() {
					
					var date = new Date()
					
					var nextDate = new Date((new Date).getTime()+24*60*60*1000)
				
					this.startTime.year = date.getFullYear()
					this.startTime.month = this.timeFormat(date.getMonth()+1)
					this.startTime.day = this.timeFormat(date.getDate())
					this.startTime.hour = '02'
					this.startTime.minute = '00'
					this.startTime.second = '00'
					
					this.endTime.year = nextDate.getFullYear()
					this.endTime.month = this.timeFormat(nextDate.getMonth()+1)
					this.endTime.day = this.timeFormat(nextDate.getDate())
					this.endTime.hour = '02'
					this.endTime.minute = '00'
					this.endTime.second = '00'
					
					this.daysNum(parseInt(this.year),parseInt(this.month))
					
					this.getSomeData()
	                
	            },
				created(){
						
				},
				onShow(){
						var animation = uni.createAnimation({
						       duration: 600,
						       timingFunction: "ease"
						   })							
						  this.animation = animation
						  this.animation.translateY(-135).step()
						  this.animationData = this.animation.export()
				},
	    methods: {
	        bindChange: function (e) {
				
							const val = e.detail.value
							
				            this.year = this.years[val[0]]
				            this.month = this.months[val[1]]
				            this.day = this.days[val[2]]
							
							this.daysNum(parseInt(this.year),parseInt(this.month))
				
							this.hour = this.hours[val[3]]
							this.minute = this.minutes[val[4]]
							this.second = this.seconds[val[5]]
							
							this.startTime.year = this.years[val[0]]
							this.startTime.month = this.timeFormat(val[1]+1)
							this.startTime.day = this.timeFormat(val[2]+1)
							this.startTime.hour = this.timeFormat(val[3])
							this.startTime.minute = this.timeFormat(val[4])
							this.startTime.second = this.timeFormat(val[5])
							
							},
						daysNum(y,m){
							if(m==1||m==3||m==5||m==7||m==8||m==10||m==12){
							    if(this.days.length!=31){
							        this.days = []
							        for (let i = 1; i <= 31; i++) {
							            this.days.push(i)
							        }
							    }
							}else if(m==4||m==6||m==9||m==11){
							    if(this.days.length!=30){
							        this.days = []
							        for (let i = 1; i <= 30; i++) {
							            this.days.push(i)
							        }
							    }
							}else if(m==2){
							    if((y%4==0&&y%100!=0)||(y%400==0)){//闰年
							        if(this.days.length!=29){
							            this.days = []
							            for (let i = 1; i <= 29; i++) {
							                this.days.push(i)
							            }
							        }
							    }else{//平年
							        if(this.days.length!=28){
							            this.days = []
							            for (let i = 1; i <= 28; i++) {
							                this.days.push(i)
							            }
							        }
							    }
							}
						},
						openTime(ref){
							this.$refs[ref].open()
						},
						timeFormat(i){
							return i > 9 ? i : '0' + i
						},
						
						drawerAppear(){
							this.drawer_flag = true
						},
						toggleBillType(){
							
							if(this.type_flag){
								
								this.animation.translateY(0).step()
								
								this.animationData = this.animation.export()
								
							}else{
								
								this.animation.translateY(-135).step()
								
								this.animationData = this.animation.export()
							}
							
							this.type_flag=!this.type_flag
							
							console.log(' - - - -  1 1 1 1 1 1 1 1 1 1 1 1 1 1  - - - - - ')
						},
						getSomeData(){
							let _this = this
							_this.sendRequest({
								url:'System.Member.getCashChangeType',
								success:res=>{
									if(res.code === 0){
										console.log(res.data)
										res.data.forEach(item=>{
											_this.billTypeList.push(item.Key)
										})
									}
								}
							})
						}

	    }
	}
	
</script>

<style lang="scss">
	
	
.bill-top-box{
		width: 100%;
		height: 80upx;
		padding: 2upx 10upx;
		box-sizing: border-box;
		color: #444;
		border-bottom: 1upx solid #eee;
		background-color: #fff;
	}
	.bill-time-selector{
		font-size: 10upx;
		border-top: 2upx solid #eee;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.bill-time{
			border-right: 1upx solid #eee;
			padding: 0 12upx;
			display: flex;
			align-items: center;
			text{
				width: 185upx;
				overflow: hidden;
				white-space: nowrap;
			}
		}
		.bill-btn{
			line-height: 60upx;
			padding: 0upx 25upx;
			border-radius: 14upx;
			border: 1upx solid #ddd;
			&:active{
				background-color: #ddd;
			}
		}
		.bill-search-icon{
			font-size: 48upx;
			color: #DC3639;
			font-weight: 600;
		}
	}
	.content{
	        height: 504upx;
	        width: 100%;
	        .mpvue-picker-view {
	            width: 100%;
	            height: 100%;
	            background-color: rgba(255, 255, 255, 1);
	            .item {
	              text-align: center;
	              width: 100%;
	              line-height: 101upx;
	              text-overflow: ellipsis;
	              white-space: nowrap;
	              font-size: 35upx;
	            }
	        }
	    }
		
		.bill-type{
			box-shadow: 0 6upx 10upx 0 #aaa;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 4upx 6upx 4upx 48upx;
			box-sizing: border-box;
			color: #333;
			background-color: #fff;
			font-size: 30upx;
			
			
			.bill-type-left{
				letter-spacing: 8upx;
				width: 25%;
				border: 2upx solid #eee;
				padding: 5upx 34upx;
				box-sizing: border-box;
				height: 90%;
				border-radius: 12upx;
				position: relative;
				
				.bill-type-left-list{
					width: 100%;
					position: absolute;
					top: 72upx;
					left: 0;
					overflow: hidden;
					height: 228upx;
					.aaaaa{
						width: 100%;
						height: 228upx;
						border-radius: 12upx;
						overflow: hidden;
						background-color: #F5F5F5;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						text{
							letter-spacing: 8upx;
							text-align: center;
							line-height: 55upx;
							background-color: #fff;
						}
					}
					
				}
				
				&:active {
					border-color: pink;
				}
			
			}
		}
		.bill-type-drop{
			
			
		}
		.uni-list-cell {
		    justify-content: flex-start
		}

		
	
	
	
</style>
