<template>
	<view class="play">
		<view class="num-box flex">
			<block v-for="(item, idx) in list">
				<view @click="selected(item)" class="item-num   flex flex-direction" :class="{ 'item-num-active': item.active }" :key="idx">
					<text class="text text-white text-bold text-xxl">{{ item.N }}</text>
					<text class="text text-c text-xs">{{item.curMxO}}</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: () => [{ N: 1,curMxO:3.22 }]
		}
	},
	data() {
		return {
			curPlayList: {},
			P1: [], //本页面第一部份的数据
			P2: [], //本页面第二部份的数据
			P3: [], //本页面第三部份的数据
			curObjName: '前三',
			P2CurObj: {}, //当前选择的P2里的对象。用于页面显示
			curRatio: 0.9,
			curSelectArr: []
		};
	},


	methods: {
		selected(C1) {
			C1.active ? (C1.active = false) : (C1.active = true);
			this.refreshPage();

			this.$store.commit('setIsHasSelected', C1.active ? 1 : -1);
		},

		cancelAll() {
			this.P1.forEach(outItem => {
				outItem.C.forEach(inItem => {
					inItem.active = false;
				});

				outItem.bottomText.forEach(b => {
					b.active = false;
				});
			});

			this.P2.forEach(outItem => {
				outItem.C.forEach(inItem => {
					inItem.active = false;
				});
			});
			this.refreshPage();

			let num = this.$store.state.gameDataV2.isHasSelected;
			this.$store.commit('setIsHasSelected', -num);
		},

		changeSelected() {
			this.P2CurObj = this.curPlayList.C.find(item => item.N === this.curObjName);
		},
		selectedSpecial(it) {
			it.active ? (it.active = false) : (it.active = true);
			this.refreshPage();
			this.$store.commit('setIsHasSelected', it.active ? 1 : -1);
		},
		selectedType(text) {
			text.active ? (text.active = false) : (text.active = true);
			this.refreshPage();
			this.$store.commit('setIsHasSelected', text.active ? 1 : -1);
		},

		handlerData(obj) {
			let P1 = obj.C.slice(0, 5);
			let P1_size = obj.C.slice(6, 11);
			let P1_single = obj.C.slice(12, 17);
			P1.forEach((item, index) => {
				item.bottomText = [];
				item.bottomText.push(...P1_single[index].C);
				item.bottomText.push(...P1_size[index].C);

				item.C.forEach(C => {
					C.curMxO = +C.MxO + this.curRatio;
				});

				item.bottomText.forEach(b => {
					b.curMxO = +b.MxO + this.curRatio;
				});
			});

			this.P1 = P1;

			let arr = this.P1;
			this.$store.commit('setD1', arr);
		},

		refreshPage() {
			this.list.push({});
			this.list.pop();
		}
	}
};
</script>

<style lang="scss" scoped>
.play {
	.num-box {
		flex-wrap: wrap;
		justify-content: space-around;
		.item-num {
			width: 13vw;
			height: 13vw;
			margin: 10rpx 20rpx 10rpx 20rpx;
			border-radius: 50%;
			background-color: #b62929;
			align-items: center;
			justify-content: center;
			padding-top: 15rpx;
			.text {
				line-height: 40rpx;
			}
			.text-c{
				color: #e7ff00;
			}
		}
		.item-num-active {
			position: relative;
			background-color: #ffe100;
			.text {
				color: black;
			}
		}

		.item-num-active::after {
			position: absolute;
			left: -15rpx;
			top: -2.2vw;
			content: '';
			display: block;
			width: 0;
			height: 0;
			transform: rotate(213deg);
			// transform: scale(0);
			border-top: 5vw solid transparent;
			border-left: 5vw solid #ffe100;
			border-bottom: 5vw solid transparent;
		}
	}
}
</style>
