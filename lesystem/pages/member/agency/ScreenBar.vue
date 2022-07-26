<template>
	<view class="screen-bar">
		<view class="cu-bar bg-white ">
			<view class="picker-box flex justify-between align-center">
				<ruiDatePicker :value="startTime" @change="changeStartTime"></ruiDatePicker>
				<i class='iconfont icon-icon-test1'></i>
			</view>
			<view class="picker-box flex justify-between align-center">
				<ruiDatePicker :value="endTime" @change="changeEndTime"></ruiDatePicker>
				<i class='iconfont icon-icon-test1'></i>
			</view>
		</view>
	</view>

</template>

<script>
	import ruiDatePicker from  '@/components/rattenking-dtpicker/rattenking-dtpicker.vue'
	export default {
		data() {
			return {
				initTime: '12:00:00',
			};
		},
		components: {
			ruiDatePicker
		},
		computed: {
			startTime () {
				return this.getTimeString('start');
			},
			endTime () {
				return this.getTimeString('end');
			},
		},
		methods: {
			getTimeString(type) {     //start, end
				if (type == 'start') {
					let date = new Date();
					let y = date.getFullYear();
					let m = this.prefixZero(date.getMonth() + 1, 2);
					let d = this.prefixZero(date.getDate(), 2);
					return y + '-' + m + '-' + d + ' ' + '00:00:00';
				}else if (type == 'end') {
					let date = new Date();
					let y = date.getFullYear();
					let m = this.prefixZero(date.getMonth() + 1, 2);
					let d = this.prefixZero(date.getDate(), 2);
					return y + '-' + m + '-' + d + ' ' + '23:59:59';
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
			changeStartTime(value) {
				this.$emit('changeStartTime', value);
			},
			changeEndTime(value) {
				this.$emit('changeEndTime', value);
			},
			changeGameType(e) {
				this.$emit('changeGameType', e.target.value);
				this.gamePickerCur = e.target.value
			}
		}
	};
</script>

<style lang="scss" scoped>
	.screen-bar {
		.cu-bar{
			border-bottom: 1px solid #eeeeee;
		}
		.rui-picker {
			border: none;
			white-space: nowrap;
			overflow: hidden;
		}

		.picker-box {
			width: 50%;
			border-right: 1px solid #eeeeee;
		}


		button {
			margin: 0;
		}
	}
</style>
