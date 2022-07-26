<template>
	<view class="play">
		<view class="special-list">
			<!-- <view class="special-item" @click="select(v)" :class="{ active: v.active }" v-for="(v, index) in C1" :key="index">
				<text>{{ v.N }}</text>
				<text style="color: #c42133;">{{ v.curMxO || 0 }}</text> -->
			<ListCircleBgRed :list="C1" />
			<ListSquare :list="C2" />
		</view>
	</view>
</template>

<script>
import ListCircleBgRed from '@/pages/gamesIm/common/ListCircleBgRed';
import ListSquare from '@/pages/gamesIm/common/commonIm/ListSquare';
export default {
	data() {
		return {
			randomArr: [],
			C1: [],
			C2: [],
			isHasSelected: 0
		};
	},
	components: {
		ListCircleBgRed,
		ListSquare
	},
	watch: {
		'$store.state.GDV3.officialRate': {
			handler: function(val) {
				
				this.initData();
			},
			deep: true
		},

		'$store.state.GDV3.v3AddRandom': {
			handler: function(val) {
				this.addToBasketRandom(val);
			},
			deep: true
		},
		'$store.state.GDV3.addToBasket': {
			handler: function(val) {
				this.addToBasket();
			},
			deep: true
		},

		'$store.state.GDV3.v3ToBuy': function(val) {
			this.v3ToBuy();
		}
	},

	created() {
		this.initData();
	},
	methods: {
		v3ToBuy() {
			this.addToBasket(false);
			//触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
			let ts = new Date().getTime();
			this.$store.commit('v3ToBuyNext', ts);
		},
		addToBasket(isShowBasket = true) {
			let money = this.$store.state.GDV3.v3InputMoney;
			let temArr = [];
			this.C1.forEach(item => {
				if (item.active) {
					item.money = money;
					temArr.push(item);
				}
			});
			this.C2.forEach(item => {
				if (item.active) {
					item.money = money;
					temArr.push(item);
				}
			});

			let basketArr = this.$store.state.GDV3.numBasket;
			if (temArr.length === 0 && basketArr.length === 0) {
				this.$util.showConfirm({
					content: '您还没有勾选',
					showCancel: false
				});
				return;
			}
			temArr.forEach(item => {
				this.$store.commit('v3NumBasket', item);
			});
			if (isShowBasket) {
				this.$store.commit('v3IsShowNumBaket', true);
			}
			this.$store.commit('v3ClearSelected', new Date().getTime());
		},
		addToBasketRandom(val) {
			let { n } = val;
			while (n--) {
				let i = Math.random() > 0.5 ? 1 : 0;
				let len = this.randomArr.length - 1;
				let n1 = this.$buyDataHandler.createRandomNum(0, len);
				let obj = this.randomArr[n1];
				let obj1 = obj.C[i];
				let bObj = {};
				bObj.N = obj.N;
				bObj.money = 22;
				// bObj.gName = obj.N
				bObj.C = obj1;

				console.log(bObj);
				this.$store.commit('v3NumBasket', bObj);
			}
			this.$emit('showBasket');
		},

		initData() {
			let val = this.$store.state.GDV3.officialRate;
			let allPlayList = this.$store.state.GDV3.v3playList;

			let { percentage, selectBack } = val;
			let C = this.$store.state.GDV3.v3CurPlayList;
			if (JSON.stringify(C) === '{}') return;

			let N = C.C[0].N;
			// let  N1 = C.C[1].N;
			// let  N2 = C.C[2].N;
			let temArr1 = [];
			C.C[0].C.forEach(item => {
				item.N1 = N;
				item.odds = this.$buyDataHandler.setNumDecimal(item.MxO - (item.MxO - item.MiO) * percentage, 3);
				temArr1.push(item);
			});

			this.C1 = temArr1;

			// let temArr = [];
			// let arr1 = C.C[1].C;
			// let arr2 = C.C[2].C;
			// arr1.forEach(item => {
			// 	item.N1 = N1;
			// 	item.odds = this.$buyDataHandler.setNumDecimal(item.MxO - (item.MxO - item.MiO) * percentage, 3);
			// });
			// arr2.forEach(item => {
			// 	item.N1 = N2;
			// 	item.odds = this.$buyDataHandler.setNumDecimal(item.MxO - (item.MxO - item.MiO) * percentage, 3);
			// });

			// temArr.push(...arr1);
			// temArr.push(...arr2);

			let temArr = [];
			let allArr = allPlayList[0].C.concat(allPlayList[1].C);
			// console.log(allArr)
			let { PIs } = C;
			let arr3 = [];
			PIs.split(',').forEach(id => {
				let obj = allArr.find(item => item.Id == id);
				if (obj) {
					obj.C.forEach(inItem => {
						inItem.N1 = obj.N;
						inItem.odds = this.$buyDataHandler.setNumDecimal(inItem.MxO - (inItem.MxO - inItem.MiO) * percentage, 3);
						temArr.push(inItem);
					});
				}
			});
			this.C2 = temArr;
		},
		refreshPage() {
			this.C1.push({});
			this.C1.pop();
		}
	}
};
</script>

<style lang="scss" scoped>
.play {
	height: 100%;
	padding: 5rpx;
	background-color: #e5e5e5;
	overflow: scroll;
	.special-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		border: 1px solid #f3f3f3;
		width: 100%;
		.special-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 25%;
			// height: 100rpx;
			border: 1px solid #e3e3e3;
			background-color: #fff;
			border-radius: 15rpx;
			padding: 5rpx 0;
			.text-name {
				color: #ff4372;
				font-weight: 600;
			}
			.text-name-b {
				color: #6ebaff;
			}
		}
		.active {
			background-color: #ffd800;
		}

		.w_50 {
			width: 50%;
		}
	}
}
</style>
