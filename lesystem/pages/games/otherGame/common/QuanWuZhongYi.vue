<template>
	<view class="quanwu"><CircleList :list="curPlayList[0].C" /></view>
</template>

<script>
import CircleList from  '@/components/lesystem/CircleList'
export default {
	data() {
		return {
			curPlayList: []
		};
	},

	created() {
		this.initData();
	},

	components: {
		CircleList
	},

	watch: {
		'$store.state.gameDataV2.cancelAll': {
			handler: function(val) {
				this.cancelAll();
			}
		},
		'$store.state.gameDataV2.rate': {
			handler: function(val) {
				this.handlerData(this.curPlayList);
			},
			deep: true
		}
	},
	methods: {
		cancelAll() {
			this.curPlayList.forEach(outItem => {
				outItem.C.forEach(item => {
					if (item.active) {
						item.active = false;
					}
				});
			});
			this.curPlayList[0].C.push({});
			this.curPlayList[0].C.pop();
		},
		initData() {
      
			let list = uni.getStorageSync('curPlayList');
			if (list) {
				this.handlerData(list.C);
			} else {
				setTimeout(() => {
					let list = uni.getStorageSync('curPlayList');
					this.handlerData(list.C);
				}, 0);
			}

			// this.$emit('hiddenBasket');
		},

		handlerData(arr) {
			let { percentage } = this.$store.state.gameDataV2.rate;
			arr.forEach(outObj => {
				outObj.C.forEach(inObj => {
					inObj.curMxO = this.$util.handlerNum(+inObj.MxO - (+inObj.MxO - inObj.MiO) * percentage, 3);
				});
			});
			this.curPlayList = arr;
			this.$store.commit('setD1', arr);
		}
	}
};
</script>

<style lang="scss" scoped>
.quanwu {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 5rpx;
	.item {
		width: 100%;
		margin-bottom: 6rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		.item-num {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 96rpx;
			height: 96rpx;
			line-height: 38rpx;
			border-radius: 50%;
			background-color: #b62929;
			color: white;
			margin: 0 20rpx 20rpx 20rpx;
			.mxo {
				color: #e7ff00;
			}
			.idx-0 {
				background-color: #cf271e;
			}
			.idx-1 {
				background-color: #02cf02;
			}
			.idx-2 {
				background-color: #2373d6;
			}
			// .item-r {
			// 	color: #c42133;
			// 	margin-top: 15rpx;
			// }
		}

		.active {
			background-color: rgba(255, 199, 25, 0.4);
		}
	}
}
</style>
