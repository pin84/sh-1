<template>
	<view>
		<picker mode="multiSelector" :range="dates" :value="value" @change="valueChange" @columnchange="columnChange">
			<view>{{dates[0][yearIndex]}}/{{dates[1][monthIndex]}}/{{dates[2][dayIndex]}} {{dates[3][hourIndex]}}:{{dates[4][mintueIndex]}}:{{dates[5][secondIndex]}}</view>
		</picker>
		
	</view>
</template>

<script>
	export default{
		name:'dateTime',
		props: ["isTomorrow","timeStamp"],
		data(){
			
			const date = new Date()
			
			// 计算 35天前 的时间戳
			var before_time_stamp = date.getTime() - 1000*60*60*24*35
			
			var beforeDate = new Date(before_time_stamp)
			var before_year = beforeDate.getFullYear()
			var before_month = beforeDate.getMonth() +1
			var before_day = beforeDate.getDate()
			var before_hour = beforeDate.getHours()
			var before_minute = beforeDate.getMinutes()
			var before_second = beforeDate.getSeconds()
			
			// 计算 1天后 的时间戳
			var after_time_stamp = date.getTime() + 1000*60*60*24*1
			
			var afterDate = new Date(after_time_stamp)
			var after_year = afterDate.getFullYear()
			var after_month = afterDate.getMonth() +1
			var after_day = afterDate.getDate()
			var after_hour = afterDate.getHours()
			var after_minute = afterDate.getMinutes()
			var after_second = afterDate.getSeconds()
			
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
				   
				for (var i = before_year; i <= after_year; i++) {
					       years.push(this.timeFormat(i))
					   }
				// 根据前后月份不同计算月数天数
				if(before_month > after_month){
						
						if(month >= 7){
							for (var i = before_month; i <= 12; i++) {
									   months.push(this.timeFormat(i))
								   }
							if(month > before_month){
								for (var i = 1; i <= this.daysNum(year,month); i++) {
									       days.push(this.timeFormat(i))
									   }
							}else{
								for (var i = before_day; i <= this.daysNum(year,month); i++) {
									       days.push(this.timeFormat(i))
									   }
							}
								   
						}else if(month <= 6){
							for (var i = 1; i <= after_month; i++) {
									   months.push(this.timeFormat(i))
								   }
							if(month < after_month){
								for (var i = 1; i <= this.daysNum(year,month); i++) {
									       days.push(this.timeFormat(i))
									   }
							}else{
								for (var i = 1; i <= after_day; i++) {
									       days.push(this.timeFormat(i))
									   }
							}
								   
						}
					
					}else{
						for (var i = before_month; i <= after_month; i++) {
								   months.push(this.timeFormat(i))
							   }
						if(month == before_month){
							if(month == after_month){
								for (var i = before_day; i <= after_day; i++) {
									       days.push(this.timeFormat(i))
									   }
							}else if(month < after_month){
								for (var i = before_day; i <= this.daysNum(year,month); i++) {
									       days.push(this.timeFormat(i))
									   }
							}
						}else if(month == after_month){
							for (var i = 1; i <= after_day; i++) {
								       days.push(this.timeFormat(i))
								   }
						}else{
							for (var i = 1; i <= this.daysNum(year,month); i++) {
								       days.push(this.timeFormat(i))
								   }
						}	   
					}
				
				
				 
				for (var i = 0; i <= 23; i++) {
					       hours.push(this.timeFormat(i))
					   }
				for (var i = 0; i <= 59; i++) {
					       minutes.push(this.timeFormat(i))
					   }
				for (var i = 0; i <= 59; i++) {
					       seconds.push(this.timeFormat(i))
					   }
			
			return{
				year,
				month,
				day,
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
				mintueIndex:minutes.indexOf(this.timeFormat(minute)),
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
				after_second
				
				
			}
		},
		created(){
			
			this.tomorrow()
		},
		onLoad(){
			
		},
		methods:{
			valueChange(e){
				
				this.yearIndex = e.detail.value[0]
				this.monthIndex = e.detail.value[1]
				this.dayIndex = e.detail.value[2]
				this.hourIndex = e.detail.value[3]
				this.mintueIndex = e.detail.value[4]
				this.secondIndex = e.detail.value[5]
				
				var date = [
					this.dates[0][this.yearIndex],
					this.dates[1][this.monthIndex],
					this.dates[2][this.dayIndex],
					this.dates[3][this.hourIndex],
					this.dates[4][this.mintueIndex],
					this.dates[5][this.secondIndex]
				]
				this.$emit('dateChange',date)
			},
			columnChange(e){
				
				var date = new Date()
				
				// 计算 XX天前 的时间戳
				var beforeDate = new Date(this.before_time_stamp)
				var before_year = beforeDate.getFullYear()
				var before_month = beforeDate.getMonth() +1
				var before_day = beforeDate.getDate()
				var before_hour = beforeDate.getHours()
				var before_minute = beforeDate.getMinutes()
				var before_second = beforeDate.getSeconds()
				
				// 计算 年 月 日
				if(e.detail.column == 0){
					this.dates[1] = []
					this.dates[2] = []
					
					this.selectYear = this.years[e.detail.value]
					
					if(before_month > this.after_month){
							if(this.month >= 7){
								if(this.year == this.selectYear){
									for(var i = before_month ; i <= 12 ; i++){
										this.dates[1].push(this.timeFormat(i))
									}
									for (var i = before_day; i <= this.daysNum(this.selectYear,before_month); i++) {
												this.dates[2].push(this.timeFormat(i))
										   }
									
								}else{
									for(var i = 1 ; i <= this.after_month ; i++){
										this.dates[1].push(this.timeFormat(i))
									}
									if(this.after_month == 1){
										for (var i = 1; i <= this.after_day; i++) {
													this.dates[2].push(this.timeFormat(i))
											   }
									}else if(this.after_month > 1){
										for (var i = 1; i <= 31; i++) {
													this.dates[2].push(this.timeFormat(i))
											   }
									}
									
								}
							}else if(this.month <= 6){
								if(this.year == this.selectYear){
									for(var i = 1 ; i <= this.after_month ; i++){
										this.dates[1].push(this.timeFormat(i))
									}
									if(this.after_month == 1){
										for (var i = 1; i <= this.after_day; i++) {
													this.dates[2].push(this.timeFormat(i))
											   }
									}else if(this.after_month > 1){
										for (var i = 1; i <= 31; i++) {
													this.dates[2].push(this.timeFormat(i))
											   }
									}
									
								}else{
									for(var i = before_month ; i <= 12 ; i++){
										this.dates[1].push(this.timeFormat(i))
									}
									for (var i = before_day; i <= this.daysNum(this.selectYear,before_month); i++) {
												this.dates[2].push(this.timeFormat(i))
										   }
								}
							}
						}else{
							for(var i = before_month ; i <= this.after_month ; i++){
								this.dates[1].push(this.timeFormat(i))
							}
							for (var i = before_day; i <= this.daysNum(this.selectYear,before_month); i++) {
										this.dates[2].push(this.timeFormat(i))
								   }
						}
					
				}else if(e.detail.column == 1){
					this.dates[1] = []
					this.dates[2] = []
					
					var monthIndex = e.detail.value
					
					if(before_month > this.after_month){
							if(this.month >= 7){
								if(this.year == this.selectYear){
									for(var i = before_month ; i <= 12 ; i++){
										this.dates[1].push(this.timeFormat(i))
									}
									this.selectMonth = this.dates[1][e.detail.value]
									if(monthIndex == 0){
										for (var i = before_day; i <= this.daysNum(this.selectYear,before_month); i++) {
													this.dates[2].push(this.timeFormat(i))
											   }
									}else if(monthIndex > 0){
										for (var i = 1; i <= this.daysNum(this.selectYear,this.selectMonth); i++) {
													this.dates[2].push(this.timeFormat(i))
											   }
									}
								}else{
									for(var i = 1 ; i <= this.after_month ; i++){
										this.dates[1].push(this.timeFormat(i))
									}
									this.selectMonth = this.dates[1][e.detail.value]
									if(this.after_month == 1){
										for (var i = 1; i <= this.after_day; i++) {
													this.dates[2].push(this.timeFormat(i))
											   }
									}else if(this.after_month > 1){
										for (var i = 1; i <= this.daysNum(this.selectYear,this.selectMonth); i++) {
													this.dates[2].push(this.timeFormat(i))
											   }
									}
									
								}
							}else if(this.month <= 6){
								if(this.year == this.selectYear){
									for(var i = 1 ; i <= this.after_month ; i++){
										this.dates[1].push(this.timeFormat(i))
									}
									this.selectMonth = this.dates[1][e.detail.value]
									if(this.after_month == 1){
										for (var i = 1; i <= this.after_day; i++) {
													this.dates[2].push(this.timeFormat(i))
											   }
									}else if(this.after_month > 1){
										if(this.selectMonth == this.after_month){
											for (var i = 1; i <= this.after_day; i++) {
														this.dates[2].push(this.timeFormat(i))
												   }
										}else{
											for (var i = 1; i <= this.daysNum(this.selectYear,this.selectMonth); i++) {
														this.dates[2].push(this.timeFormat(i))
												   }
										}
									}
									
								}else{
									for(var i = before_month ; i <= 12 ; i++){
										this.dates[1].push(this.timeFormat(i))
									}
									this.selectMonth = this.dates[1][e.detail.value]
									if(before_month == 12){
										for (var i = before_day; i <= 31; i++) {
													this.dates[2].push(this.timeFormat(i))
											   }
									}else if(before_month < 12){
										if(this.selectMonth == before_month){
											for (var i = before_day; i <= this.daysNum(this.selectYear,before_month); i++) {
														this.dates[2].push(this.timeFormat(i))
												   }
										}else if(this.selectMonth > before_month){
											// console.log('选择了不是最前页面')
											for (var i = 1; i <= this.daysNum(this.selectYear,this.selectMonth); i++) {
														this.dates[2].push(this.timeFormat(i))
												   }
										}
									}
									
								}
							}
						}else{
							for(var i = before_month ; i <= this.after_month ; i++){
								this.dates[1].push(this.timeFormat(i))
							}
							this.selectMonth = this.dates[1][e.detail.value]
							if(this.selectMonth == before_month){
								for (var i = before_day; i <= this.daysNum(this.selectYear,before_month); i++) {
											this.dates[2].push(this.timeFormat(i))
									   }
							}else if(this.selectMonth == this.after_month){
								for (var i = 1; i <= this.after_day; i++) {
											this.dates[2].push(this.timeFormat(i))
									   }
							}else{
								for (var i = 1; i <= this.daysNum(this.selectYear,this.selectMonth); i++) {
											this.dates[2].push(this.timeFormat(i))
									   }
							}
						}
					
				}else if(e.detail.column == 2){
					
					if(this.selectYear == before_year && this.selectMonth == before_month){
						var arr = []
						for (var i = before_day; i <= this.daysNum(this.selectYear,before_month); i++) {
									arr.push(this.timeFormat(i))
							   }
							this.selectDay = arr[e.detail.value]
					}else if(this.selectYear == this.after_year && this.selectMonth == this.after_month){
						var arr = []
						for (var i = 1; i <= this.after_day; i++) {
									arr.push(this.timeFormat(i))
							   }
							this.selectDay = arr[e.detail.value]
					}else{
						this.selectDay = this.timeFormat(e.detail.value + 1)
					}
					
				}else if(e.detail.column == 3){
					
					if(this.selectYear == before_year && this.selectMonth == before_month && this.selectDay == before_day){
						var arr = []
						for (var i = before_hour; i <= 23; i++) {
									arr.push(this.timeFormat(i))
							   }
							this.selectHour = arr[e.detail.value]
					}else if(this.selectYear == this.after_year && this.selectMonth == this.after_month && this.selectDay == this.after_day){
						var arr = []
						for (var i = 1; i <= this.after_hour; i++) {
									arr.push(this.timeFormat(i))
							   }
							this.selectHour = arr[e.detail.value]
					}else{
						this.selectHour = this.timeFormat(e.detail.value + 1)
					}
				}else if(e.detail.column == 4){
					if(this.selectYear == before_year && this.selectMonth == before_month && this.selectDay == before_day && this.selectHour == before_hour){
						var arr = []
						for (var i = before_minute; i <= 59; i++) {
									arr.push(this.timeFormat(i))
							   }
							this.selectMinute = arr[e.detail.value]
					}else if(this.selectYear == this.after_year && this.selectMonth == this.after_month && this.selectDay == this.after_day && this.selectHour == this.after_hour){
						var arr = []
						for (var i = 1; i <= this.after_minute; i++) {
									arr.push(this.timeFormat(i))
							   }
							this.selectMinute = arr[e.detail.value]
					}else{
						this.selectMinute = this.timeFormat(e.detail.value + 1)
					}
				}else if(e.detail.column == 5){
					if(this.selectYear == before_year && this.selectMonth == before_month && this.selectDay == before_day && this.selectHour == before_hour && this.selectMinute == before_minute){          
						var arr = []
						for (var i = before_second; i <= 59; i++) {
									arr.push(this.timeFormat(i))
							   }
							this.selectSecond = arr[e.detail.value]
					}else if(this.selectYear == this.after_year && this.selectMonth == this.after_month && this.selectDay == this.after_day && this.selectHour == this.after_hour && this.selectMinute == this.after_minute){
						var arr = []
						for (var i = 1; i <= this.after_second; i++) {
									arr.push(this.timeFormat(i))
							   }
							this.selectSecond = arr[e.detail.value]
					}else{
						this.selectSecond = this.timeFormat(e.detail.value + 1)
					}
				}
				
				// 计算 时 分 秒
				this.dates[3] = []
				this.dates[4] = []
				this.dates[5] = []
				if(this.selectYear == before_year && this.selectMonth == before_month && this.selectDay == before_day){
					for(var i = before_hour; i <= 23; i++){
						this.dates[3].push(this.timeFormat(i))
					}
					if(this.selectHour == before_hour){
						for(var i = before_minute; i <= 59; i++){
							this.dates[4].push(this.timeFormat(i))
						}
						if(this.selectMinute == before_minute){
							for (var i = before_second; i <= 59; i++) {
								       this.dates[5].push(this.timeFormat(i))
								   }
						}else{
							for (var i = 0; i <= 59; i++) {
								       this.dates[5].push(this.timeFormat(i))
								   }
						}
					}else{
						for (var i = 0; i <= 59; i++) {
							       this.dates[4].push(this.timeFormat(i))
							   }
						for (var i = 0; i <= 59; i++) {
							       this.dates[5].push(this.timeFormat(i))
							   }
					}
				}else if(this.selectYear == this.after_year && this.selectMonth == this.after_month && this.selectDay == this.after_day){
					for(var i = 0; i <= this.after_hour; i++){
						this.dates[3].push(this.timeFormat(i))
					}
					if(this.selectHour== this.after_hour){
						
						for(var i = 0; i <= this.after_minute; i++){
							this.dates[4].push(this.timeFormat(i))
						}
						
						if(this.selectMinute == this.after_minute){
							for (var i = 0; i <= this.after_second; i++) {
								       this.dates[5].push(this.timeFormat(i))
								   }
						}else{
							for (var i = 0; i <= 59; i++) {
								       this.dates[5].push(this.timeFormat(i))
								   }
						}
						
					}else if(this.selectHour < this.after_hour){
						for (var i = 0; i <= 59; i++) {
							       this.dates[4].push(this.timeFormat(i))
							   }
						for (var i = 0; i <= 59; i++) {
							       this.dates[5].push(this.timeFormat(i))
							   }
					}
					
				}else{
					for (var i = 0; i <= 23; i++) {
						       this.dates[3].push(this.timeFormat(i))
						   }
					for (var i = 0; i <= 59; i++) {
						       this.dates[4].push(this.timeFormat(i))
						   }
					for (var i = 0; i <= 59; i++) {
						       this.dates[5].push(this.timeFormat(i))
						   }
				}
				
				this.yearIndex=this.dates[0].indexOf(this.timeFormat(this.selectYear))
				this.monthIndex=this.dates[1].indexOf(this.timeFormat(this.selectMonth))
				this.dayIndex=this.dates[2].indexOf(this.timeFormat(this.selectDay))
				this.hourIndex=this.dates[3].indexOf(this.timeFormat(this.selectHour))
				this.mintueIndex=this.dates[4].indexOf(this.timeFormat(this.selectMinute))
				this.secondIndex=this.dates[5].indexOf(this.timeFormat(this.selectSecond))
				
				this.value = [ this.selectYear - this.dates[0][0], this.selectMonth - this.dates[1][0], this.selectDay - this.dates[2][0], this.selectHour - this.dates[3][0], this.selectMinute - this.dates[4][0], this.selectSecond - this.dates[5][0] ]
				
				
			},
			tomorrow(){
				if(this.isTomorrow && this.timeStamp){
					
					this.before_time_stamp = this.timeStamp
					
					this.dates[0] = []
					this.dates[1] = []
					this.dates[2] = []
					this.dates[3] = []
					this.dates[4] = []
					this.dates[5] = []
					
					var date = new Date()
					// 获取明天 02:00:00 时间戳
					date.setTime(date.getTime()+24*60*60*1000)
					
					var year = date.getFullYear()
					var month = date.getMonth() + 1
					var day = date.getDate()
					var hour = 2
					var minute = 0
					var second = 0
					
					// 计算 XX天前 的时间戳 （根据前一个时间选择器传递点参数 timeStamp 获取）
					var beforeDate = new Date(this.timeStamp)
					var before_year = beforeDate.getFullYear()
					var before_month = beforeDate.getMonth() +1
					var before_day = beforeDate.getDate()
					var before_hour = beforeDate.getHours()
					var before_minute = beforeDate.getMinutes()
					var before_second = beforeDate.getSeconds()
					
					
					for (var i = before_year; i <= this.after_year; i++) {
							       this.dates[0].push(this.timeFormat(i))
							   }
						
						if(before_month > this.after_month){
								
								if(month >= 7){
									for (var i = before_month; i <= 12; i++) {
											   this.dates[1].push(this.timeFormat(i))
										   }
									if(month > before_month){
										for (var i = 1; i <= this.daysNum(year,month); i++) {
											       this.dates[2].push(this.timeFormat(i))
											   }
									}else{
										for (var i = before_day; i <= this.daysNum(year,month); i++) {
											       this.dates[2].push(this.timeFormat(i))
											   }
									}
										   
								}else if(month <= 6){
									for (var i = 1; i <= this.after_month; i++) {
											   this.dates[1].push(this.timeFormat(i))
										   }
									if(month < this.after_month){
										for (var i = 1; i <= this.daysNum(year,month); i++) {
											       this.dates[2].push(this.timeFormat(i))
											   }
									}else{
										for (var i = 1; i <= this.after_day; i++) {
											       this.dates[2].push(this.timeFormat(i))
											   }
									}
										   
								}
							
							}else{
								for (var i = before_month; i <= this.after_month; i++) {
										   this.dates[1].push(this.timeFormat(i))
									   }
								if(month == before_month){
									if(month == this.after_month){
										for (var i = before_day; i <= this.after_day; i++) {
											       this.dates[2].push(this.timeFormat(i))
											   }
									}else if(month < this.after_month){
										for (var i = before_day; i <= this.daysNum(year,month); i++) {
											       this.dates[2].push(this.timeFormat(i))
											   }
									}
								}else if(month == this.after_month){
									for (var i = 1; i <= this.after_day; i++) {
										       this.dates[2].push(this.timeFormat(i))
										   }
								}else{
									for (var i = 1; i <= this.daysNum(year,month); i++) {
										       this.dates[2].push(this.timeFormat(i))
										   }
								}	   
							}	
							
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
								for (var i = 0; i <= this.after_second; i++) {
									       this.dates[5].push(this.timeFormat(i))
									   }
							}
						}else{
							for (var i = 0; i <= this.after_minute; i++) {
								       this.dates[4].push(this.timeFormat(i))
								   }
							for (var i = 0; i <= 59; i++) {
								       this.dates[5].push(this.timeFormat(i))
								   }
						}
						
					}else if(this.after_hour > 2){
						for (var i = 0; i <= this.after_hour; i++) {
							       this.dates[3].push(this.timeFormat(i))
							   }
						for (var i = 0; i <= 59; i++) {
							       this.dates[4].push(this.timeFormat(i))
							   }
						for (var i = 0; i <= 59; i++) {
							       this.dates[5].push(this.timeFormat(i))
							   }
					}		
					
					this.yearIndex=this.dates[0].indexOf(this.timeFormat(year))
					this.monthIndex=this.dates[1].indexOf(this.timeFormat(month))
					this.dayIndex=this.dates[2].indexOf(this.timeFormat(day))
					this.hourIndex=this.dates[3].indexOf(this.timeFormat(hour))
					this.mintueIndex=this.dates[4].indexOf(this.timeFormat(minute))
					this.secondIndex=this.dates[5].indexOf(this.timeFormat(second))
					
					this.value = [ year - this.dates[0][0], month - this.dates[1][0], day - this.dates[2][0], hour - this.dates[3][0], minute - this.dates[4][0], second - this.dates[5][0] ]
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
