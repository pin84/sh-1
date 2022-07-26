<template>
	<view>
		<picker mode="multiSelector" :range="dates" :value="value" @change="valueChange" @columnchange="columnChange">
			<!-- <view>{{dates[0][yearIndex]}}/{{dates[1][monthIndex]}}/{{dates[2][dayIndex]}} {{dates[3][hourIndex]}}:{{dates[4][minuteIndex]}}:{{dates[5][secondIndex]}}</view> -->
			<view class="timeContent">{{dataContent}}</view>
		</picker>
		
	</view>
</template>

<script>
	export default{
		
		name:'dateTimeHms',
		
		// 组件 3个 参数
		props:{
			// 起始时间 时间戳
			startTimeStamp:{
				type: Number,
				default: 0
			},
			// 结束时间 时间戳
			endTimeStamp:{
				type: Number,
				default: 0
			},
			// 当前选择时间 时间戳
			selectTime:{
				type: Number,
				default: 0
			}
		},
		
		data(){
			
			return{
				year:0,
				month:0,
				day:0,
				hour:0,
				minute:0,
				second:0,
				years:[],
				months:[],
				days:[],
				hours:[],
				minutes:[],
				seconds:[],
				
				yearIndex:0,
				monthIndex:0,
				dayIndex:0,
				hourIndex:0,
				minuteIndex:0,
				secondIndex:0,
				
				selectYear:'',
				selectMonth:'',
				selectDay:'',
				selectHour:'',
				selectMinute:'',
				selectSecond:'',
				
				after_year:0,
				after_month:0,
				after_day:0,
				after_hour:0,
				after_minute:0,
				after_second:0,
				before_year:0,
				before_month:0,
				before_day:0,
				before_hour:0,
				before_minute:0,
				before_second:0,
				
				value:[],
				
				dates:[],
				dataContent: ''
			}
		},
		created(){
			// 初始化时间选择器
			this.setTimeList()
			
			// 设置当前选择时间
			this.setTimeStamp()
			
		},
		watch:{
			
			// 监控 初始时间戳 变化事件
			startTimeStamp(){
				
				this.setTimeList()
				this.setTimeStamp()
				
			},
			
			// 监控 结束时间戳 变化事件
			endTimeStamp(){
				
				this.setTimeList()
				this.setTimeStamp()
				
			}
			
		},
		methods:{
			
			// 设置 时间选择器 列表
			setTimeList(){
				
				this.dates[0] = []
				this.dates[1] = []
				this.dates[2] = []
				this.dates[3] = []
				this.dates[4] = []
				this.dates[5] = []
				
				this.years = []
				this.months = []
				this.days = []
				this.hours = []
				this.minutes = []
				this.seconds = []
				
				let date = new Date()
				
				// 根据父组件传值 获取 时间选择器的 起始和结束 时间戳
				let beforeDate = new Date(this.startTimeStamp)
				let afterDate = new Date(this.endTimeStamp)
				
				// 计算 时间选择器的 开始时间（年、月、日、时、分、秒）
				this.before_year = beforeDate.getFullYear()
				this.before_month = beforeDate.getMonth() +1
				this.before_day = beforeDate.getDate()
				this.before_hour = beforeDate.getHours()
				this.before_minute = beforeDate.getMinutes()
				this.before_second = beforeDate.getSeconds()
				
				// 计算 时间选择器的 结束时间（年、月、日、时、分、秒）
				this.after_year = afterDate.getFullYear()
				this.after_month = afterDate.getMonth() +1
				this.after_day = afterDate.getDate()
				this.after_hour = afterDate.getHours()
				this.after_minute = afterDate.getMinutes()
				this.after_second = afterDate.getSeconds()
				
				// console.log(this.before_year + '-' + this.before_month + '-' + this.before_day + '-' + this.before_hour + '-' + this.before_minute + '-' + this.before_second)
				// console.log(this.after_year + '-' + this.after_month + '-' + this.after_day + '-' + this.after_hour + '-' + this.after_minute + '-' + this.after_second)
				
				// 计算 当前 选择的时间（年、月、日、时、分、秒）
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate()
				let hour = 2
				let minute = 0
				let second = 0
				
				for (let i = this.before_year; i <= this.after_year; i++) {
					       this.years.push(this.timeFormat(i))
					   }
				// 根据前后月份不同计算月数天数
				if(this.before_month > this.after_month){
						
						if(this.month >= 7){
							for (let i = this.before_month; i <= 12; i++) {
									   this.months.push(this.timeFormat(i))
								   }
							if(this.month > this.before_month){
								for (let i = 1; i <= this.daysNum(year,month); i++) {
									       this.days.push(this.timeFormat(i))
									   }
							}else{
								for (let i = this.before_day; i <= this.daysNum(year,month); i++) {
									       this.days.push(this.timeFormat(i))
									   }
							}
								   
						}else if(this.month <= 6){
							for (let i = 1; i <= this.after_month; i++) {
									   this.months.push(this.timeFormat(i))
								   }
							if(this.month < this.after_month){
								for (let i = 1; i <= this.daysNum(year,month); i++) {
									       this.days.push(this.timeFormat(i))
									   }
							}else{
								for (let i = 1; i <= this.after_day; i++) {
									       this.days.push(this.timeFormat(i))
									   }
							}
								   
						}
					
					
					}else{
						for (let i = this.before_month; i <= this.after_month; i++) {
								   this.months.push(this.timeFormat(i))
							   }
						if(this.month == this.before_month){
							if(this.month == this.after_month){
								for (let i = this.before_day; i <= this.after_day; i++) {
									       this.days.push(this.timeFormat(i))
									   }
							}else if(this.month < this.after_month){
								for (let i = this.before_day; i <= this.daysNum(year,month); i++) {
									       this.days.push(this.timeFormat(i))
									   }
							}
						}else if(this.month == this.after_month){
							for (let i = 1; i <= this.after_day; i++) {
								       this.days.push(this.timeFormat(i))
								   }
						}else{
							for (let i = 1; i <= this.daysNum(year,month); i++) {
								       this.days.push(this.timeFormat(i))
								   }
						}
					}
				// 获取 时 分 秒 列表
				for (let i = 0; i <= 23; i++) {
					       this.hours.push(this.timeFormat(i))
					   }
				for (let i = 0; i <= 59; i++) {
					       this.minutes.push(this.timeFormat(i))
					   }
				for (let i = 0; i <= 59; i++) {
					       this.seconds.push(this.timeFormat(i))
					   }
				
				this.dates[0] = this.years
				this.dates[1] = this.months
				this.dates[2] = this.days
				this.dates[3] = this.hours
				this.dates[4] = this.minutes
				this.dates[5] = this.seconds
				
				// 重新 给选择器 赋值
				this.yearIndex=this.dates[0].indexOf(this.timeFormat(year))
				this.monthIndex=this.dates[1].indexOf(this.timeFormat(month))
				this.dayIndex=this.dates[2].indexOf(this.timeFormat(day))
				this.hourIndex=this.dates[3].indexOf(this.timeFormat(hour))
				this.minuteIndex=this.dates[4].indexOf(this.timeFormat(minute))
				this.secondIndex=this.dates[5].indexOf(this.timeFormat(second))
				
				this.value = [ year - this.years[0], month - this.months[0], day - this.days[0], hour - this.hours[0], minute - this.minutes[0], second - this.seconds[0] ]
				
				this.year = year
				this.month = month
				this.day = day
				this.hour = hour
				this.minute = minute
				this.second = second
				
				this.selectYear = this.timeFormat(year)
				this.selectMonth = this.timeFormat(month)
				this.selectDay = this.timeFormat(day)
				this.selectHour = this.timeFormat(hour)
				this.selectMinute = this.timeFormat(minute)
				this.selectSecond = this.timeFormat(second)	
				
				this.dataContent = this.dates[0][this.yearIndex] + '-' + this.dates[1][this.monthIndex] + '-' + this.dates[2][this.dayIndex] + ' ' + this.dates[3][this.hourIndex] + ':' + this.dates[4][this.minuteIndex] + ':' + this.dates[5][this.secondIndex];
			},
			
			// 设置 当前选择时间
			setTimeStamp(){
				if(this.selectTime){
					
					let selectDate = new Date(this.selectTime)
					
					let year = selectDate.getFullYear()
					let month = selectDate.getMonth() + 1
					let day = selectDate.getDate()
					let hour = selectDate.getHours()
					let minute = selectDate.getMinutes()
					let second = selectDate.getSeconds()
					
					this.yearIndex=this.dates[0].indexOf(this.timeFormat(year))
					this.monthIndex=this.dates[1].indexOf(this.timeFormat(month))
					this.dayIndex=this.dates[2].indexOf(this.timeFormat(day))
					this.hourIndex=this.dates[3].indexOf(this.timeFormat(hour))
					this.minuteIndex=this.dates[4].indexOf(this.timeFormat(minute))
					this.secondIndex=this.dates[5].indexOf(this.timeFormat(second))
					
					this.value = [ year - this.years[0], month - this.months[0], day - this.days[0], hour - this.hours[0], minute - this.minutes[0], second - this.seconds[0] ]
					
					this.year = year
					this.month = month
					this.day = day
					this.hour = hour
					this.minute = minute
					this.second = second
					
					this.selectYear = this.timeFormat(year)
					this.selectMonth = this.timeFormat(month)
					this.selectDay = this.timeFormat(day)
					this.selectHour = this.timeFormat(hour)
					this.selectMinute = this.timeFormat(minute)
					this.selectSecond = this.timeFormat(second)	
					
					this.dataContent = this.selectYear + '-' + this.selectMonth + '-' + this.selectDay + ' ' + this.selectHour + ':' + this.selectMinute + ':' + this.selectSecond;
				}
				
			},
			
			// 点击时间选择器 ‘确定’ 按钮后触发
			valueChange(e){
				this.yearIndex = e.detail.value[0]
				this.monthIndex = e.detail.value[1]
				this.dayIndex = e.detail.value[2]
				this.hourIndex = e.detail.value[3]
				this.minuteIndex = e.detail.value[4]
				this.secondIndex = e.detail.value[5]	
				
				let date = [
					this.dates[0][this.yearIndex],
					this.dates[1][this.monthIndex],
					this.dates[2][this.dayIndex],
					this.dates[3][this.hourIndex],
					this.dates[4][this.minuteIndex],
					this.dates[5][this.secondIndex]
				]
				
				this.dataContent = this.dates[0][this.yearIndex] + '-' + this.dates[1][this.monthIndex] + '-' + this.dates[2][this.dayIndex] + ' ' + this.dates[3][this.hourIndex] + ':' + this.dates[4][this.minuteIndex] + ':' + this.dates[5][this.secondIndex];
				// 在父组件中触发 dateChange 事件，可以返回一个 date ，数据如上
				this.$emit('dateChange',date)
				
			},
			
			// 滚动 时间选择器 后触发
			columnChange(e){
				
				if(e.detail.column == 0){
					
					this.dates[1] = []
					
					this.selectYear = this.years[e.detail.value]
					
					this.yearIndex=this.dates[0].indexOf(this.selectYear)
					
					this.year = this.selectYear
					
					if(this.before_month > this.after_month){
							if(this.month >= 7){
								if(this.year == this.selectYear){
									for(let i = this.before_month ; i <= 12 ; i++){
										this.dates[1].push(this.timeFormat(i))
									}
									
								}else{
									for(let i = 1 ; i <= this.after_month ; i++){
										this.dates[1].push(this.timeFormat(i))
									}
									
								}
							}else if(this.month <= 6){
								if(this.year == this.selectYear){
									for(let i = 1 ; i <= this.after_month ; i++){
										this.dates[1].push(this.timeFormat(i))
									}
									
								}else{
									for(let i = this.before_month ; i <= 12 ; i++){
										this.dates[1].push(this.timeFormat(i))
									}
									
								}
							}
						}else{
							for(let i = this.before_month ; i <= this.after_month ; i++){
								this.dates[1].push(this.timeFormat(i))
							}
							
						}
						
						this.months = this.dates[1]
						
						if(this.monthIndex > this.months.length - 1){
							this.monthIndex = this.months.length - 1
						}
						
						this.month = this.dates[1][this.monthIndex]
					
				}else if(e.detail.column == 1){
					
					this.dates[2] = []
					
					this.selectMonth = this.months[e.detail.value]
					this.monthIndex=this.dates[1].indexOf(this.selectMonth)
					this.month = this.selectMonth
					if(this.selectMonth == this.before_month){
						if(this.selectMonth == this.after_month){
							for (let i = this.before_day; i <= this.after_day; i++) {
										this.dates[2].push(this.timeFormat(i))
								   }
						}else{
							for (let i = this.before_day; i <= this.daysNum(this.selectYear,this.selectMonth); i++) {
										this.dates[2].push(this.timeFormat(i))
								   }
						}
						
					}else if(this.selectMonth == this.after_month){
						for (let i = 1; i <= this.after_day; i++) {
									this.dates[2].push(this.timeFormat(i))
							   }
					}else{
						for (let i = 1; i <= this.daysNum(this.selectYear,this.selectMonth); i++) {
									this.dates[2].push(this.timeFormat(i))
							   }
					}
					
					this.days = this.dates[2]
					
					if(this.dayIndex > this.days.length - 1){
						this.dayIndex = this.days.length - 1
					}
					
					this.day = this.dates[2][this.dayIndex]
					
					
				}else if(e.detail.column == 2){
					
					this.dates[3] = []
					
					this.selectDay = this.days[e.detail.value]
					this.dayIndex=this.dates[2].indexOf(this.selectDay)
					this.day = this.selectDay
					
					if(this.selectYear == this.before_year && this.selectMonth == this.before_month && this.selectDay == this.before_day){
						
						for (let i = this.before_hour; i <= 23; i++) {
									this.dates[3].push(this.timeFormat(i))
							   }
						
					}else if(this.selectYear == this.after_year && this.selectMonth == this.after_month && this.selectDay == this.after_day){
						
						for (let i = 0; i <= this.after_hour; i++) {
									this.dates[3].push(this.timeFormat(i))
							   }
							   
					}else{
						
						for (let i = 0; i <= 23; i++) {
									this.dates[3].push(this.timeFormat(i))
							   }
						
					}
					
					this.hours = this.dates[3]
					
					if(this.hourIndex > this.hours.length - 1){
						this.hourIndex = this.hours.length - 1
					}
					
					this.hour = this.dates[3][this.hourIndex]
					
				}else if(e.detail.column == 3){
					
					this.dates[4] = []
					
					this.selectHour = this.hours[e.detail.value]
					this.hourIndex=this.dates[3].indexOf(this.selectHour)
					this.hour = this.selectHour
					if(this.selectYear == this.before_year && this.selectMonth == this.before_month && this.selectDay == this.before_day && this.selectHour == this.before_hour){
						
						for (let i = this.before_minute; i <= 59; i++) {
									this.dates[4].push(this.timeFormat(i))
							   }
						// 为 秒 列表赋值
						this.dates[5] = []
						for (let i = this.before_second; i <= 59; i++) {
									this.dates[5].push(this.timeFormat(i))
							   }
						this.seconds = this.dates[5]
						this.second = this.before_second
						
					}else if(this.selectYear == this.after_year && this.selectMonth == this.after_month && this.selectDay == this.after_day && this.selectHour == this.after_hour){
						
						for (let i = 0; i <= this.after_minute; i++) {
									this.dates[4].push(this.timeFormat(i))
							   }
						
					}else{
						
						for (let i = 0; i <= 59; i++) {
									this.dates[4].push(this.timeFormat(i))
							   }
							   
					}
					
					this.minutes = this.dates[4]
					
					if(this.minuteIndex > this.minutes.length - 1){
						this.minuteIndex = this.minutes.length - 1
					}
					
					this.minute = this.dates[4][this.minuteIndex]
					
				}else if(e.detail.column == 4){
					
					this.dates[5] = []
					
					this.selectMinute = this.minutes[e.detail.value]
					this.minuteIndex=this.dates[4].indexOf(this.selectMinute)
					this.minute = this.selectMinute
					
					// console.log(this.selectYear + '-' + this.selectMonth + '-' + this.selectDay + '-' + this.selectHour + '-' + this.selectMinute)
					
					if(this.selectYear == this.before_year && this.selectMonth == this.before_month && this.selectDay == this.before_day && this.selectHour == this.before_hour && this.selectMinute == this.before_minute){
						
						// console.log('进入判断——～～～～～')
						
						for (let i = this.before_second; i <= 59; i++) {
									this.dates[5].push(this.timeFormat(i))
							   }
						
					}else if(this.selectYear == this.after_year && this.selectMonth == this.after_month && this.selectDay == this.after_day && this.selectHour == this.after_hour && this.selectMinute == this.after_minute){
						
						for (let i = 0; i <= this.after_second; i++) {
									this.dates[5].push(this.timeFormat(i))
							   }
						
					}else{
						
						for (let i = 0; i <= 59; i++) {
									this.dates[5].push(this.timeFormat(i))
							   }
						
					}
					
					this.seconds = this.dates[5]
					
					if(this.secondIndex > this.seconds.length - 1){
						this.secondIndex = this.seconds.length - 1
					}
					
					this.second = this.dates[5][this.secondIndex]
					
				}else if(e.detail.column == 5){
					
					this.selectSecond = this.seconds[e.detail.value]
					
					this.secondIndex=this.dates[5].indexOf(this.selectSecond)
					
					this.second = this.selectSecond
					
				}
				
				this.value = [ this.year - this.years[0], this.month - this.months[0], this.day - this.days[0], this.hour - this.hours[0], this.minute - this.minutes[0], this.second - this.seconds[0] ]
				
				
			},
			
			// 对时间数字格式化（转变为 string 格式）
			timeFormat(i){
				
				return i > 9 ? '' + i : '0' + i
				
			},
			// 根据 年份 和 月份 获取该月的天数（包含2月、闰年、平年等）
			daysNum(y,m){
				
				if(m==1||m==3||m==5||m==7||m==8||m==10||m==12){
				    return 31
				}else if(m==4||m==6||m==9||m==11){
				    return 30
				}else if(m==2){
				    if((y%4==0&&y%100!=0)||(y%400==0)){//闰年
				        return 29
				    }else{//平年
				        return 28
				    }
				}
				
			}
		}
	}
</script>

<style>
.timeContent{
	height: 80rpx;
	line-height: 40rpx;
}
</style>
