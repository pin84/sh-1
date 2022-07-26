<template>
	<view class="uni-countdown">
		<!-- <view v-if="showDay" class="uni-countdown__number" :style="{borderColor:borderColor, color:color, background:backgroundColor}">{{d}}</view>
		<view v-if="showDay" class="uni-countdown__splitor" :style="{color:splitorColor}">天</view>
		<view class="uni-countdown__number" :style="{borderColor:borderColor, color:color, background:backgroundColor}">{{h}}</view>
		<view class="uni-countdown__splitor" :style="{color:splitorColor}">{{showColon ? ':' : '时'}}</view> -->
		<view class="uni-countdown__number" :style="{color:color}">{{i}}</view>
		<view class="uni-countdown__splitor" :style="{color:color}">:</view>
		<view class="uni-countdown__number" :style="{color:color}">{{s}}</view>
		<view class="uni-countdown__splitor" :style="{color:color}">:</view>
		<view class="uni-countdown__number" :style="{color:color}">{{ms}}</view>
		<!-- <view v-if="!showColon" class="uni-countdown__splitor" :style="{color:splitorColor}">秒</view> -->
	</view>
</template>
<script>
	export default {
		name: "uni-countdown",
		props: {
			showDay: {
				type: Boolean,
				default: true
			},
			showColon: {
				type: Boolean,
				default: true
			},
			backgroundColor: {
				type: String,
				default: "#FFFFFF"
			},
			borderColor: {
				type: String,
				default: "#000000"
			},
			color: {
				type: String,
				value: "#000000"
			},
			splitorColor: {
				type: String,
				default: "#000000"
			},
			day: {
				type: Number,
				default: 0
			},
			hour: {
				type: Number,
				default: 0
			},
			minute: {
				type: Number,
				default: 0
			},
			second: {
				type: Number,
				default: 0
			},
			msecond: {
				type: Number,
				default: 0
			},
			reset: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				timer: null,
				d: '00',
				h: '00',
				i: '00',
				s: '00',
				ms:'00',
				leftTime: 0,
				seconds: 0,
				mseconds:0
			}
		},
		watch: {
			reset(val) {
				clearInterval(this.timer)	
				this.startData();
			}
		},
		created: function(e) {
			this.startData()
		},
		beforeDestroy() {
			clearInterval(this.timer)
		},
		methods: {
			startData() {
				this.mseconds = this.toMseconds(this.minute, this.second, this.msecond)
				if (this.mseconds <= 0) {
					return
				}
				this.countDown()
				let _this = this
				_this.timer = setInterval(() => {
					_this.mseconds--
					if (_this.mseconds < 0) {
						_this.timeUp()
						return
					}
					_this.countDown()
				},1)
			},
			toMseconds(minute, second, msecond) {
				return (minute * 60 * 1000) + (second * 1000) + msecond
			},
			timeUp() {
				clearInterval(this.timer)
				this.$emit('timeup')
			},
			countDown() {
				let mseconds = this.mseconds
				let [minute, second, msecond] = [0, 0, 0]
				if (mseconds > 0) {
					
					minute = Math.floor(mseconds / (60 * 1000))
					second = Math.floor(mseconds / 1000) - (minute * 60)
					msecond = mseconds - (minute * 60 * 1000) - (second * 1000)
					
				} else {
					this.timeUp()
				}
				
				if (minute < 10) {
					minute = '0' + minute
				}
				if (second < 10) {
					second = '0' + second
				}
				
				if (msecond < 10) {
					msecond = '00'
				}else if(msecond < 100){
					msecond = '0' + Math.floor(msecond/10)
				}else if(msecond < 1000){
					msecond = Math.floor(msecond/10)
				}
				
				this.i = minute
				this.s = second
				this.ms = msecond
			}
		}
	}
</script>
<style lang="scss">
	
	$countdown-height:44upx;

	.uni-countdown {
		// padding: 2upx 0;
		height: $countdown-height;
		display: flex;
		flex-wrap: nowrap;
		// justify-content: center;
		align-items: center;
		&__splitor {
			height: $countdown-height;
			display: flex;
			align-items: center;
			// justify-content: center;
			line-height: 1;
			padding: 0 3upx;
			font-size: $uni-font-size-base;
			// vertical-align: middle;
		}

		&__number {
			display: flex;
			line-height: 1;
			// justify-content: center;
			align-items: center;
			height: $countdown-height;
			// border-radius: $uni-border-radius-base;
			margin: 0 3upx;
			font-size: $uni-font-size-base;
			// border: 1px solid #000000;
			// font-size: $uni-font-size-sm;
			padding: 0 3upx;
			// vertical-align: text-bottom;
		}
	}
</style>
