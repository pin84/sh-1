<template>
	<view class="screen-bar">
		<view class="cu-bar bg-white">
			<view class="picker-box flex justify-between align-center">
				<ruiDatePicker :value="startTime" @change="changeStartTime"></ruiDatePicker>
				<i class='iconfont icon-icon-test1'></i>
			</view>
			<view class="picker-box flex justify-between align-center">
				<ruiDatePicker :value="endTime" @change="changeEndTime"></ruiDatePicker>
				<i class='iconfont icon-icon-test1'></i>
			</view>
			<view class="flex-sub flex justify-between align-center">
				<picker class="flex-sub margin-left-sm text-cut" mode="selector" :range='gameTypeData'
					:value='gamePickerCur' range-key='name' @change="changeGameType">
					<view v-if="gameTypeData[gamePickerCur]">
						{{gameTypeData[gamePickerCur].name}}
					</view>
				</picker>
				<i class='iconfont icon-icon-test1 margin-right-xs'></i>
			</view>
		</view>
	</view>

</template>

<script>
	import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue'
	export default {
		data() {
			return {
				initTime: '02:00:00',
				// gamePickerCur: 0 ,
			};
		},
		props: {
			'startTime': String,
			'endTime': String,
			'gameTypeData': {
				type: Array
			}
		},
		components: {
			ruiDatePicker
		},
		computed: {
			gamePickerCur: {
				get() {
					let _gamePickerCur = null
					if (this.gameTypeData) {
						this.gameTypeData.forEach((item, index) => {
							if (item.code == 'CPYX') {
								_gamePickerCur = index
							}
						})
					}
					return _gamePickerCur
				},
				set() {}
			}
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
			changeStartTime(value) {
				this.$emit('changeStartTime', value);
			},
			changeEndTime(value) {
				this.$emit('changeEndTime', value);
			},
			changeGameType(e) {
				this.$emit('changeGameType', e.target.value);
				// console.log( e.target.value)
				this.gamePickerCur = e.target.value;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.screen-bar {
		.rui-picker {
			border: none;
			white-space: nowrap;
			overflow: hidden;
		}

		.picker-box {
			width: 33.33%;
			border-right: 1px solid #d6d6d6;
		}


		button {
			margin: 0;
		}
	}
</style>
