<template>
	<view>
		<picker mode="multiSelector" :range="dates" :value="value" @change="valueChange" @columnchange="columnChange">
			<view>{{dates[0][yearIndex]}}/{{dates[1][monthIndex]}}/{{dates[2][dayIndex]}} {{dates[3][hourIndex]}}:{{dates[4][minuteIndex]}}:{{dates[5][secondIndex]}}</view>
		</picker>
		
	</view>
</template>

<script>
	export default{
		name:'dateTime',
		props: ["timeStamp","selectTime"],
		
		data(){
			
			const date = new Date()
			
			// 计算 35天前 的时间戳
			let before_time_stamp = date.getTime() - 1000*60*60*24*35
			
			let beforeDate = new Date(before_time_stamp)
			let before_year = beforeDate.getFullYear()
			let before_month = beforeDate.getMonth() +1
			let before_day = beforeDate.getDate()
			let before_hour = beforeDate.getHours()
			let before_minute = beforeDate.getMinutes()
			let before_second = beforeDate.getSeconds()
			
			// 计算 1天后 的时间戳
			let after_time_stamp = date.getTime() + 1000*60*60*24*1
			
			let afterDate = new Date(after_time_stamp)
			let after_year = afterDate.getFullYear()
			let after_month = afterDate.getMonth() +1
			let after_day = afterDate.getDate()
			let after_hour = afterDate.getHours()
			let after_minute = afterDate.getMinutes()
			let after_second = afterDate.getSeconds()
			
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
				   
				for (let i = before_year; i <= after_year; i++) {
					       years.push(this.timeFormat(i))
					   }
				// 根据前后月份不同计算月数天数
				if(before_month > after_month){
						
						if(month >= 7){
							for (let i = before_month; i <= 12; i++) {
									   months.push(this.timeFormat(i))
								   }
							if(month > before_month){
								for (let i = 1; i <= this.daysNum(year,month); i++) {
									       days.push(this.timeFormat(i))
									   }
							}else{
								for (let i = before_day; i <= this.daysNum(year,month); i++) {
									       days.push(this.timeFormat(i))
									   }
							}
								   
						}else if(month <= 6){
							for (let i = 1; i <= after_month; i++) {
									   months.push(this.timeFormat(i))
								   }
							if(month < after_month){
								for (let i = 1; i <= this.daysNum(year,month); i++) {
									       days.push(this.timeFormat(i))
									   }
							}else{
								for (let i = 1; i <= after_day; i++) {
									       days.push(this.timeFormat(i))
									   }
							}
								   
						}
					
					
					}else{
						for (let i = before_month; i <= after_month; i++) {
								   months.push(this.timeFormat(i))
							   }
						if(month == before_month){
							if(month == after_month){
								for (let i = before_day; i <= after_day; i++) {
									       days.push(this.timeFormat(i))
									   }
							}else if(month < after_month){
								for (let i = before_day; i <= this.daysNum(year,month); i++) {
									       days.push(this.timeFormat(i))
									   }
							}
						}else if(month == after_month){
							for (let i = 1; i <= after_day; i++) {
								       days.push(this.timeFormat(i))
								   }
						}else{
							for (let i = 1; i <= this.daysNum(year,month); i++) {
								       days.push(this.timeFormat(i))
								   }
						}	   
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
			
			return{
				year,
				month,
				day,
				hour,
				minute,
				second,
				years,
				months,
				days,
				hours,
				minutes,
				seconds,
				dates:[ years,months,days,hours,minutes,seconds ],
				yearIndex:years.indexOf(this.timeFormat(year)),
				monthIndex:months.indexOf(this.timeFormat(month)),
				dayIndex:days.indexOf(this.timeFormat(day)),
				hourIndex:hours.indexOf(this.timeFormat(hour)),
				minuteIndex:minutes.indexOf(this.timeFormat(minute)),
				secondIndex:seconds.indexOf(this.timeFormat(second)),
				value:[ year - years[0], month - months[0], day - days[0], hour - hours[0], minute - minutes[0], second - seconds[0] ],
				selectYear:year,
				selectMonth:month,
				selectDay:day,
				selectHour:hour,
				selectMinute:minute,
				selectSecond:second,
				before_time_stamp,
				after_year,
				after_month,
				after_day,
				after_hour,
				after_minute,
				after_second,
				before_year,
				before_month,
				before_day,
				before_hour,
				before_minute,
				before_second
				
			}
		},
		created(){
			
			this.tomorrow()
			
			// this.$util.showToast({ title: '开始初始化数据～～～' })
			
			if(this.selectTime){
				
				console.log(this.selectTime)
				
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
				
			}
			
			
			
		},
		onReady(){
			
		},
		onLoad(){
			
			// this.$util.showToast({ title: '加载了～～～' })
			
		},
		watch:{
			timeStamp(){
				this.setTimeStamp();
			}	
		},
		methods:{
			setTimeStamp(){
				
				// console.log('监控到 timeStamp 数据已更改 ～ ～ ～ ');
				
				if(this.timeStamp){
					
					// console.log('在监控事件中，已获取到 timeStamp');
					
					this.tomorrow();
					
				}
				
			},
			valueChange(e){
				
				// this.years = this.dates[0]
				// this.months = this.dates[1]
				// this.days = this.dates[2]
				// this.hours = this.dates[3]
				// this.minutes = this.dates[4]
				// this.seconds = this.dates[5]
				
					this.yearIndex = e.detail.value[0]
					this.monthIndex = e.detail.value[1]
					this.dayIndex = e.detail.value[2]
					this.hourIndex = e.detail.value[3]
					this.minuteIndex = e.detail.value[4]
					this.secondIndex = e.detail.value[5]
				
				// if(this.timeStamp){
					
				// 	this.yearIndex=this.dates[0].indexOf(this.selectYear)
				// 	this.monthIndex=this.dates[1].indexOf(this.selectMonth)
				// 	this.dayIndex=this.dates[2].indexOf(this.selectDay)
				// 	this.hourIndex=this.dates[3].indexOf(this.selectHour)
				// 	this.minuteIndex=this.dates[4].indexOf(this.selectMinute)
				// 	this.secondIndex=this.dates[5].indexOf(this.selectSecond)
					
				// }else{
				// 	this.yearIndex = e.detail.value[0]
				// 	this.monthIndex = e.detail.value[1]
				// 	this.dayIndex = e.detail.value[2]
				// 	this.hourIndex = e.detail.value[3]
				// 	this.minuteIndex = e.detail.value[4]
				// 	this.secondIndex = e.detail.value[5]
				// }
				
				// console.log(this.dates[3])
				// console.log(this.hourIndex)
				
				let date = [
					this.dates[0][this.yearIndex],
					this.dates[1][this.monthIndex],
					this.dates[2][this.dayIndex],
					this.dates[3][this.hourIndex],
					this.dates[4][this.minuteIndex],
					this.dates[5][this.secondIndex]
				]
				this.$emit('dateChange',date)
			},
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
					if(this.selectYear == this.before_year && this.selectMonth == this.before_month && this.selectDay == this.before_day && this.selectHour == this.before_hour && this.selectMinute == this.before_minute){
						
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
				
				// console.log(this.dates[3])
				// console.log(this.hourIndex)
				this.value = [ this.year - this.years[0], this.month - this.months[0], this.day - this.days[0], this.hour - this.hours[0], this.minute - this.minutes[0], this.second - this.seconds[0] ]
				
				// console.log('this.day - this.day - this.day - ')
				// console.log(this.day)
				// console.log(this.days)
				// console.log(this.value)
				
			},
			tomorrow(){
				
				// this.$util.showToast({ title: '已进入了 tomorrow 函数～～' })
				// console.log('this.timeStamp - - - - ')
				// console.log(this.timeStamp)
				
				if(this.timeStamp){
					
				// this.$util.showToast({ title: '在 tomorrow 函数中，传值 timeStamp 生效～～' })
					
					this.dates[0] = []
					this.dates[1] = []
					this.dates[2] = []
					this.dates[3] = []
					this.dates[4] = []
					this.dates[5] = []
					
					let date = new Date()
					
					// console.log(date)
					
					let after_time_stamp = date.getTime() + 1000*60*60*24*1
					
					date = new Date(after_time_stamp)
					
					// date.setTime(date.getTime()+24*60*60*1000)
					
					let year = date.getFullYear()
					let month = date.getMonth() + 1
					let day = date.getDate()
					let hour = 2
					let minute = 0
					let second = 0
					
					// 计算 XX天前 的时间戳 （根据前一个时间选择器传递点参数 timeStamp 获取）
					let beforeDate = new Date(this.timeStamp)
					
					this.before_year = beforeDate.getFullYear()
					this.before_month = beforeDate.getMonth() +1
					this.before_day = beforeDate.getDate()
					this.before_hour = beforeDate.getHours()
					this.before_minute = beforeDate.getMinutes()
					this.before_second = beforeDate.getSeconds()
					
					this.year = year
					this.month = month
					this.day = day
					
					if(this.before_hour > 2){
						this.hour = this.before_hour
						this.minute = this.before_minute
						this.second = this.before_second
					}else if(this.before_hour == 2){
						this.hour = hour
						if(this.before_minute > 0){
							this.minute = this.before_minute
							this.second = this.before_second
						}else{
							this.minute = minute
							if(this.before_second > 0){
								this.second = this.before_second
							}else{
								this.second = second
							}
						}
					}else{
						this.hour = hour
						this.minute = minute
						this.second = second
					}
					
					this.selectYear = this.timeFormat(year)
					this.selectMonth = this.timeFormat(month)
					this.selectDay = this.timeFormat(day)
					this.selectHour = this.timeFormat(hour)
					this.selectMinute = this.timeFormat(minute)
					this.selectSecond = this.timeFormat(second)
					
					
					for (let i = this.before_year; i <= this.after_year; i++) {
							       this.dates[0].push(this.timeFormat(i))
							   }
						if(this.before_month > this.after_month){
								for (let i = 1; i <= this.after_month; i++) {
										   this.dates[1].push(this.timeFormat(i))
									   }
								for (let i = 1; i <= this.after_day; i++) {
									       this.dates[2].push(this.timeFormat(i))
									   }
							}else{
								for (let i = this.before_month; i <= this.after_month; i++) {
										   this.dates[1].push(this.timeFormat(i))
									   }
								
								if(month == this.before_month){
									if(month == this.after_month){
										for (let i = this.before_day; i <= this.after_day; i++) {
											       this.dates[2].push(this.timeFormat(i))
											   }
									}else if(month < this.after_month){
										for (let i = this.before_day; i <= this.daysNum(year,month); i++) {
											       this.dates[2].push(this.timeFormat(i))
											   }
									}
								}else if(month == this.after_month){
									for (let i = 1; i <= this.after_day; i++) {
										       this.dates[2].push(this.timeFormat(i))
										   }
								}else{
									for (let i = 1; i <= this.daysNum(year,month); i++) {
										       this.dates[2].push(this.timeFormat(i))
										   }
								}	   
							}	
							
					if(this.before_day == this.after_day){
						for (let i = this.before_hour; i <= this.after_hour; i++) {
							       this.dates[3].push(this.timeFormat(i))
							   }
						if(this.before_hour < 2){
							for (let i = 0; i <= 59; i++) {
								       this.dates[4].push(this.timeFormat(i))
								   }
							for (let i = 0; i <= 59; i++) {
								       this.dates[5].push(this.timeFormat(i))
								   }
						}else if(this.before_hour == 2){
							
							for (let i = this.before_minute; i <= 59; i++) {
								       this.dates[4].push(this.timeFormat(i))
								   }
							for (let i = this.before_second; i <= 59; i++) {
								       this.dates[5].push(this.timeFormat(i))
								   }
							
						}else{
							for (let i = this.before_minute; i <= this.after_minute; i++) {
								       this.dates[4].push(this.timeFormat(i))
								   }
							for (let i = this.before_second; i <= this.after_minute; i++) {
								       this.dates[5].push(this.timeFormat(i))
								   }
						}
						
					}else{
						if(this.after_hour < 2){
							this.dates[3] = ['00','01','02']
							this.dates[4] = ['00']
							this.dates[5] = ['00']
						}else if(this.after_hour == 2){
							this.dates[3] = ['00','01','02']
							if(this.after_minute == 0){
								this.dates[4] = ['00']
								if(this.after_second == 0){
									this.dates[5] = ['00']
								}else{
									for (let i = 0; i <= this.after_second; i++) {
										       this.dates[5].push(this.timeFormat(i))
										   }
								}
							}else{
								for (let i = 0; i <= this.after_minute; i++) {
									       this.dates[4].push(this.timeFormat(i))
									   }
								for (let i = 0; i <= 59; i++) {
									       this.dates[5].push(this.timeFormat(i))
									   }
							}
							
						}else if(this.after_hour > 2){
							for (let i = 0; i <= this.after_hour; i++) {
								       this.dates[3].push(this.timeFormat(i))
								   }
							for (let i = 0; i <= 59; i++) {
								       this.dates[4].push(this.timeFormat(i))
								   }
							for (let i = 0; i <= 59; i++) {
								       this.dates[5].push(this.timeFormat(i))
								   }
						}
					}
							
					this.years = this.dates[0]
					this.months = this.dates[1]
					this.days = this.dates[2]
					this.hours = this.dates[3]
					this.minutes = this.dates[4]
					this.seconds = this.dates[5]
					
					
					this.yearIndex=this.dates[0].indexOf(this.selectYear)
					this.monthIndex=this.dates[1].indexOf(this.selectMonth)
					this.dayIndex=this.dates[2].indexOf(this.selectDay)
					this.hourIndex=this.dates[3].indexOf(this.selectHour)
					this.minuteIndex=this.dates[4].indexOf(this.selectMinute)
					this.secondIndex=this.dates[5].indexOf(this.selectSecond)
					
					this.value = [ this.year - this.years[0], this.month - this.months[0], this.day - this.days[0], this.hour - this.hours[0], this.minute - this.minutes[0], this.second - this.seconds[0] ]
					// this.value = [ this.year - this.dates[0][0], this.month - this.dates[1][0], this.day - this.dates[2][0], this.hour - this.dates[3][0], this.minute - this.dates[4][0], this.second - this.dates[5][0] ]
					// this.value = [ year - this.dates[0][0], month - this.dates[1][0], day - this.dates[2][0], hour - this.dates[3][0], minute - this.dates[4][0], second - this.dates[5][0] ]
				}
			},
			timeFormat(i){
				return i > 9 ? i+'' : '0' + i
			},
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
</style>
