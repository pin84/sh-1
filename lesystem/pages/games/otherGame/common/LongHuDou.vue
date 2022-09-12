<template>
	<view class="long-hu">
		<view class="item" v-for="(item, index) in curPlayList" :key="index">
			<view class="item-name">{{ curPlayListTitle[index] }}</view>
			<view class="item-con-box">
				<view @click="selectedItem(C)" class="item-con flex-sub " :class="{ active: C.active }" v-for="(C, idx) in item.C" :key="idx">
					<text class="item-n" :class="'idx-' + idx">{{ C.N }}</text>
					<text class="item-r">{{ C.curMxO }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			curPlayListTitle: ['万千 1vs2', '万百  1vs3', '万十 1vs4', '万个 1vs4', '千百 2vs3', '千十 2vs4', '千个 2vs5', '百十 3vs4', '百个 3vs5', '十个 4vs5'],
			curPlayList: []
		};
	},

	created() {
		this.initData();
	},

	watch: {
		'$store.state.gameDataV2.cancelAll': {
			handler: function(val) {
				this.cancelAll();
			}
		},
		// '$store.state.gameDataV2.rate': {
		// 	handler: function(val) {
		// 		this.handlerData(this.curPlayList);
		// 	},
		// 	deep: true
		// },
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

			this.refreshPage();
		},
		selectedItem(C) {
			C.active ? (C.active = false) : (C.active = true);
			this.refreshPage();
			this.$store.commit('setIsHasSelected', C.active ? 1 : -1);
		},

		refreshPage() {
			this.curPlayList.push({});
			this.curPlayList.pop();
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

			this.$emit('hiddenBasket');
		},

		handlerData(arr) {
			let { percentage } = this.$store.state.gameDataV2.rate;
			arr.forEach(outObj => {
				outObj.C.forEach(inObj => {
					let num = this.$util.handlerNum(+inObj.MxO - (+inObj.MxO - inObj.MiO) * percentage, 3);
					inObj.curMxO = num;
				});
			});
			this.curPlayList = arr;

			console.log('--aaaaaa---',arr);
			this.refreshPage();
			this.$store.commit('setD1', arr);
		}
	}
};
</script>

<style lang="scss" scoped>
.long-hu {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 5rpx;
	.item {
		width: 49vw;
		margin-bottom: 6rpx;
		.item-name {
			text-align: center;
			padding: 10rpx 0;
			background-color: #e5e5e5;
			color: #5d5d5d;
			font-size: 36rpx;
		}
		.item-con-box {
			display: flex;
			.item-con {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 25rpx 20rpx;
				background-color: #fff;
				border-right: 1px solid #f1f1f1;
				.item-n {
					width: 70rpx;
					height: 70rpx;
					line-height: 70rpx;
					border-radius: 50%;
					background-color: red;
					text-align: center;
					font-weight: 700;
					color: white;
					font-size: 36rpx;
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
				.item-r {
					color: #c42133;
					margin-top: 15rpx;
				}
			}

			.active {
				background-color: rgba(255, 199, 25, 0.4);
			}
		}
	}
}
</style>
