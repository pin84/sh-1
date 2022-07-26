<template>
	<view class="screen-bar flex bg-white align-center">
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
		<view class="flex flex-sub justify-center">
			<button type="default" class="cu-btn "  @tap="filterTap">筛选</button>
			<button type="default" class="cu-btn "  @tap="filterSubmit">
				<text class="iconfont iconsize icon-icon-test text-red text-bold"></text>
			</button>
		</view>
	</view>
	
</template>

<script>
	import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue'
export default {
	data() {
		return {
			initTime: '02:00:00',
			startTime: '',
			endTime: '',
		};
	},
	components: {
		ruiDatePicker
	},
	created() {
		this.startTime = this.getTimeString('today');
		this.endTime =  this.getTimeString('tomorrow');
	},
	computed:{
		
	},
	methods: {
		getTimeString(type) {     //today, tomorrow
			if (type == 'today') {
				let date = new Date();
				let y = date.getFullYear();
				let m = this.prefixZero(date.getMonth() + 1, 2);
				let d = this.prefixZero(date.getDate(), 2);
				return y + '-' + m + '-' + d + ' ' + this.initTime;
			}else if (type == 'tomorrow') {
				let tStamp = new Date().getTime();
				tStamp += 3600 * 24 * 1000;
				let date = new Date(tStamp);
				let y = date.getFullYear();
				let m = this.prefixZero(date.getMonth() + 1, 2);
				let d = this.prefixZero(date.getDate(), 2);
				return y + '-' + m + '-' + d + ' ' + this.initTime;
			}
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
		filterTap() {
			this.$emit('filterTap');
		},
		changeStartTime(time){
			this.startTime = time;
			this.changeTime();
		},
		changeEndTime(time) {
			this.endTime = time;
			this.changeTime();
		},
		changeTime(){
			this.$emit('changeTime');
		},
		getTime() {   //不触发事件，只是获取time值
			let time = {};
			time.startTime = this.startTime;
			time.endTime = this.endTime;
			return time;
		},
		filterSubmit() {
			this.$emit('filterSubmit');
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
	
		
		button {
			margin: 0;
			font-size: 15px;
			width: 110rpx;
			border: 0.5px solid #ddd;
			background-color: #fff;
			padding: 0;
			margin-right: 2px;
			.iconfont{
				font-size: 18px;
				line-height: 35px;
			}
		}
		
	}
</style>
