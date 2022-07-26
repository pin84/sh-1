<template>
	<view class="bbs-countdown" style="color: #F4487F;">
		
		{{minutes}} : {{seconds}} : {{mseconds}}
		
	</view>
</template>

<script>
	
	// const MILLISECONDS_MSECOND = 10;
	// const MILLISECONDS_SECOND = 100 * MILLISECONDS_MSECOND;
	// const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND;
	// const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE;
	// const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR;
	
	export default{
		name: 'diy-countdown',
		data(){
			return{
				
				minutes:'00',
				seconds:'00',
				mseconds:'00',
				interval:10,
				tms: 0,
				timer:0
			}
		},
		props:['time'],
		// props:{
			
		// 	time:{
		// 		type: Number,
		// 		default: 0
		// 	}
			
		// },
		computed:{
			
		},
		created(){
			
			this.start()
			
		},
		methods:{
			getTotleMS(){
				let now = new Date().getTime()
				let end = this.time * 1000
				if(end <= now){
					// this.$emit('end')
					return false
				}else{
					return end - now
				}
			},
			
			showtime(){
				
				this.tms = this.getTotleMS()
				this.minutes = this.timeFormat(Math.floor(this.tms / (60 * 100 * 10)))
				this.seconds = this.timeFormat(Math.floor(this.tms / (100 * 10)))
				this.mseconds = this.timeFormat(Math.floor(this.tms / (10)))
				
			},
			
			start(){
				console.log('start!!!~~~')
				console.log(this.time)
				let _this = this
				if(_this.getTotleMS()){
					
					_this.$emit('start')
					
					clearInterval(_this.timer)
					
					_this.timer = setInterval(()=>{
						_this.showtime()
					},10)
					
				}else{
					
					_this.$emit('end')
					
				}
				
			},
			
			timeFormat(tt){
				let t = tt - 0
				return t > 9 ? '' + t : '0' + t
			}
			
		}
		
	}
	
</script>

<style>
	
	
</style>
