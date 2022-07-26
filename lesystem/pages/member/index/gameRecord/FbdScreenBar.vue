<template>
	<view class="screen-bar flex align-center bg-white">
		<view class="picker-box flex justify-between align-center bg-white">
			<ruiDatePicker :value="startTime" @change="changeStartTime"></ruiDatePicker>
			<i class='iconfont icon-icon-test1'></i>
		</view>
		<view class="picker-box flex justify-between align-center bg-white">
			<ruiDatePicker :value="endTime" @change="changeEndTime"></ruiDatePicker>
			<i class='iconfont icon-icon-test1'></i>
		</view>
		<view class="flex flex-sub justify-center">
			<button type="default" class="cu-btn " @tap="filterTap">筛选</button>
			<button v-if="ShowCancelButton" type="default" class="cu-btn "
				@tap='tapCancelButton'>{{cancelActive? '取消' : '撤单'}}</button>
		</view>
	</view>

</template>

<script>
	import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue'
	export default {

		props: ["ShowCancelButton"],
		data() {
			return {
				initTime: '00:00:00',
				cancelActive: false, //点击撤单按钮，显示多选框
			};
		},
		components: {
			ruiDatePicker
		},
		computed: {
			startTime() {
				console.log(this.getTimeString('today'));
				return this.getTimeString('today');
			},
			endTime() {
				console.log(this.getTimeString('tomorrow'));
				return this.getTimeString('tomorrow');
			},
		},
		methods: {
			getTimeString(type) { //today, tomorrow
				if (type == 'today') {
					let date = new Date();
					let y = date.getFullYear();
					let m = this.prefixZero(date.getMonth() + 1, 2);
					let d = this.prefixZero(date.getDate(), 2);
					return y + '-' + m + '-' + d + ' ' + this.initTime;
				} else if (type == 'tomorrow') {
					let tStamp = new Date().getTime();
					tStamp += 3600 * 24 * 1000;
					let date = new Date(tStamp);
					let y = date.getFullYear();
					let m = this.prefixZero(date.getMonth() + 1, 2);
					let d = this.prefixZero(date.getDate(), 2);
					return y + '-' + m + '-' + d + ' ' + this.initTime;
				}
			},
			prefixZero(value, len) { //前置补充0

				if (value.toString().length >= len) { //不用补0
					return value;
				}
				if (Number.isInteger(value)) {
					let str = '';
					for (let i = 0; i < len - 1; i++) {
						str += '0';
					}
					return str + value;
				}
			},
			filterTap() {
				this.$emit('filterTap');
			},
			changeStartTime(value) {
				this.$emit('changeStartTime', value);
			},
			changeEndTime(value) {
				this.$emit('changeEndTime', value);
			},
			tapCancelButton() { //点击撤单按钮，显示多选框
				this.cancelActive = !this.cancelActive;
				this.$emit('tapCancelButton');
			}
		},
		created() {
			uni.setStorageSync('postDateItem', [this.startTime, this.endTime])
		}
	};
</script>

<style lang="scss" scoped>
	.screen-bar {
		box-sizing: border-box;
		border-bottom: 0.5px solid #ddd;

		.rui-picker {
			border: none;
			white-space: nowrap;
			overflow: hidden;
		}


		.picker-box {
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

			.iconfont {
				font-size: 18px;
				line-height: 35px;
			}
		}

		.cu-btn {
			width: 90%;
		}
	}
</style>
