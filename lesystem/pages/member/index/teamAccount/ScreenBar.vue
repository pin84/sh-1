<template>
	<view class="screen-bar">
		<view class="flex bg-white border-bottom">
			<view class="picker-box flex justify-between align-center">
				<ruiDatePicker
				    :value="startTime"
				    @change="changeStartTime"
				></ruiDatePicker>
				<i class='iconfont icon-icon-test1'></i>
			</view>
			<view class="picker-box flex justify-between align-center">
				<ruiDatePicker
				    :value="endTime"
				    @change="changeEndTime"
					
				></ruiDatePicker>
				<i class='iconfont icon-icon-test1'></i>
			</view>
			<view class="flex-sub flex justify-between align-center">
				<input type="text" 
				value="" 
				@blur="inputChange"
				placeholder="用户名"
				:adjust-position="false"
				:cursor-spacing="10"
				maxlength="300"
				class="margin-left-sm margin-right-sm" />
			</view>
		</view>
		<scroll-view scroll-x class="nav bg-white">
			<view class="flex justify-around margin-top-sm margin-bottom-sm ">
				<view class="flex-sub text-center" v-for="(item,index) in dateList" :key="index">
					<button class="cu-btn btn-date " :class="dateCur==index? 'bg-green text-white' : 'bg-gray' " @tap="changeDate(index)">{{item}}</button>
				</view>
			</view>
		</scroll-view>
	</view>
	
</template>

<script>
import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue'
export default {
	created() {
		let date = new Date();
		this.startTime =  this.getTimeString(date);
		
		let tStamp = new Date().getTime();
		tStamp += 3600 * 24 * 1000;
		date = new Date(tStamp);
		this.endTime = this.getTimeString(date);
	},
	data() {
		return {
			initTime: '02:00:00',
			startTime: '',
			endTime: '',
			accountName: '',
			dateList: [
				'昨天',
				'今天',
				'上周',
				'本周',
				'上月',
				'本月',
			],
			dateCur: null,
		};
	},
	props: {
		
	},
	components: {
		ruiDatePicker
	},
	computed:{
		
	},
	methods: {
		getTimeString(date) {     //today, tomorrow
			let y = date.getFullYear();
			let m = this.prefixZero(date.getMonth() + 1, 2);
			let d = this.prefixZero(date.getDate(), 2);
			return y + '-' + m + '-' + d + ' ' + this.initTime;	
		},
		prefixZero(value,len) {     //前置补充0
			if (value.toString().length >= len) {  //不用补0
				return value;
			}
			if (Number.isInteger(value)) {
				let str = '';
				for (let i=0; i<len-1; i++) {
					str += '0';
				}
				return str + value;
			}
		},
		dateCompute(index) {
		  let date = new Date();
		  let time = date.getTime();
		  let y = date.getFullYear();
		  let m = date.getMonth();
		  let d = date.getDate();
		  let w = date.getDay();
		
		  let startDate;
		  let endDate;
		  
		  if (w == 0) { //周日会得到 0，为了便于计算，将w置为 7
		    w = 7;
		  }
		  switch (index) {
		    case 0:
		      let yesterday = time - 3600 * 24 * 1000;
		      startDate = new Date(yesterday);
		      endDate = new Date();
		      break;
		    case 1:
		      startDate = new Date();
		      let tomorrow = time + 3600 * 24 * 1000;
		      endDate = new Date(tomorrow);
		      break;
		    case 2:
		      let lastWeek = time - 3600 * 24 * 1000 * (7 + w - 1);
		      let lastWeekend = time - 3600 * 24 * 1000 * (w - 1);
		      startDate = new Date(lastWeek);
		      endDate = new Date(lastWeekend);
		      break;
		    case 3:
		      let week = time - 3600 * 24 * 1000 * (w - 1);
		      let weekEnd = time + 3600 * 24 * 1000 * (8 - w);
		      startDate = new Date(week);
		      endDate = new Date(weekEnd);
		      break;
		    case 4:
		      let lastMonth;
		      if (m > 0) { //非第一个月
		        lastMonth = m - 1;
		      } else {
		        lastMonth = 11;
		        y--;
		      }
		    
		      startDate = new Date();
		      startDate.setDate(1);
		      startDate.setMonth(lastMonth);
		      startDate.setFullYear(y);
		      
		      endDate = new Date();
		      endDate.setDate(1);
		      break;
		    case 5:
		      startDate = new Date();
		      startDate.setDate(1);
		
		      let nextMonth;
		      if (m < 11) {      //非最后一个月
		        nextMonth = m + 1;
		      }else {
		        nextMonth = 0;
		        y++;
		      }
		      endDate = new Date();
		      endDate.setDate(1);
		      endDate.setMonth(nextMonth);
		      endDate.setFullYear(y);
		      break;    
		  }
		
		  return [startDate, endDate];
		},
		changeStartTime(value) {
			this.startTime = value;
		},
		changeEndTime(value) {
			this.endTime = value;
		},
		changeDate(index) {
			this.dateCur = index;
			let timeArr = this.dateCompute(index);
			this.startTime = this.getTimeString(timeArr[0]);
			this.endTime = this.getTimeString(timeArr[1]);
		},
		inputChange(event) {
			this.accountName = event.detail.value
		}
		
	}
};
</script>

<style lang="scss" scoped>
	.screen-bar{
		.rui-picker {
			border: none;
			white-space: nowrap;
			overflow: hidden;
		}
		.picker-box{
			height: 40px;
			width: 33.33%;
			border-right: 0.5px solid #ddd;
			box-sizing: border-box;
		}
			
		

		
		.btn-date {
			margin: 0;
			padding: 0 12px;
			font-size: 15px;
		}
	
		.border-bottom {
			border-bottom: 1px solid #dedede;
		};
	}
</style>
