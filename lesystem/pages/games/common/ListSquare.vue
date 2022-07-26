<template>
	<view class="bettin-shop">
		<view class="flex list-box align-start padding-top-sm" v-for="(item, idx) in titleArr" :key="idx">
			<view class="title-box flex flex-direction">
				<view class="title text-white text-center">{{ item }}</view>
			</view>
			<view class="select-box">
				<view class="select-item" v-for="(obj, index) in contentArr[idx]" :key="index" @click="selectedObj(obj)">
					<view class="up" :class="{ active: obj.active }">{{ obj.N }}</view>
					<view class="down">{{ obj.MxO }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		titleArr: {
			type: Array,
			default: () => ['百家乐', '百家乐']
		},
		contentArr: {
			type: Array,
			default: () => [[], []]
		}
	},
	data() {
		return {
			temText: '',
			textArr: [],
			numArr: [],
			curGame: {},
			selectedData: [],
			isShowFirstSelect: false,
			rank: [], //冷热数据
			isShowRank: false,
			selectedCount: 0
		};
	},

	watch: {
		'$store.state.GDV3.clearSelected': function(val) {
			this.resetData();
		}
	},

	methods: {
		selectedObj(obj) {
			if (obj.active) {
				obj.active = false;
				this.selectedCount--;
			} else {
				obj.active = true;
				this.selectedCount++;
			}

			this.refreshView();
			this.isHasSelected()
			
			let temArr = []
			this.contentArr.forEach(outItem => {
				outItem.forEach(inItem => {
					if(inItem.active){
						temArr.push(inItem)
					}
				});
			});
			
			this.$emit('selectedNum',temArr)
				
			
			
		},

		isHasSelected() {
			let flag = this.selectedCount;
			if (flag) {
				this.$store.commit('v3IsHasSelected', true);
			} else {
				this.$store.commit('v3IsHasSelected', false);
			}
		},

		resetData() {
			this.contentArr.forEach(outItem => {
				outItem.forEach(inItem => (inItem.active = false));
			});
			this.selectedCount = 0
			this.isHasSelected()
			this.refreshView();
		},

		refreshView() {
			this.contentArr.push({});
			this.contentArr.pop();
		}
	}
};
</script>

<style lang="scss" scoped>
.bettin-shop {
	.list-box {
		border-top: 1px solid #d0d0d0;
		padding: 30rpx 0rpx 10rpx 0;
		.title-box {
			flex: 0 0 120rpx;
			padding: 0;
			font-size: 24rpx;
			.title {
				position: relative;
				background-color: #b62929;
				height: 60rpx;
				line-height: 60rpx;
			}
			.title:after {
				position: absolute;
				right: -30rpx;
				top: 50%;
				margin-top: -30rpx;
				content: '';
				display: block;
				width: 0;
				height: 0;
				border-top: 30rpx solid transparent;
				border-left: 30rpx solid #b62929;
				border-bottom: 30rpx solid transparent;
			}
		}

		.select-box {
			width: 100%;
			padding: 0 10rpx 0 40rpx;
			display: flex;
			flex-wrap: wrap;
			// justify-content: space-between;
			.select-item {
				width: 30%;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-bottom: 20rpx;
				margin-right: 18rpx;
				.up {
					width: 100%;
					border: 1px solid #bfbfbf;
					border-radius: 10rpx;
					padding: 10rpx 0;
					text-align: center;
					background-color: #fff;
					font-size: 36rpx;
				}
				.down {
					margin-top: 10rpx;
					color: #b62929;
				}
				.active {
					background-color: #b62929;
					border: 1px solid #b62929;
					color: #fff;
				}
			}
		}

		.select-type {
			font-size: 32rpx;
			padding: 0 20rpx;
			color: #3b3a3a;
			background: #fff;
			border: 1px solid #bfbfbf;
		}

		.select-type-active {
			border: 1px solid #b62929;
			background-color: #b62929;
			color: #fff;
		}
	}

	@keyframes rotate_60 {
		0% {
			transform: rotate(-60deg);
		}

		100% {
			transform: rotate(-140deg);
		}
	}
}
</style>
