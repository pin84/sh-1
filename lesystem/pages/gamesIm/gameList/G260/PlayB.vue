<template>
	<view><ListCircle :titleArr="titleArr" @selectedNum="selectedNum" :isShowSort="false" /></view>
</template>

// 组选。去重并*组合
<script>
import playList from './playList.js';
import ListCircle from '@/pages/gamesIm/common/ListCircle';
export default {
	data() {
		return {
			gameComfig: {},
			titleArr: ['二重号', '单号'],
			selectedObj: {},
			rate: 1,
			ratio: 1,
			odds: 1,
			num: 0,
			money: 0,
			limit1: 1,
			limit2: 2
		};
	},
	components: {
		ListCircle
	},

	watch: {
		'$store.state.GDV3.v3AddRandom': {
			handler: function(val) {
				this.addToBasketRandom(val.n);
			}
		},
		'$store.state.GDV3.clearSelected': function(val) {
			this.selectedObj = {};
		},

		'$store.state.GDV3.addToBasket': function(val) {
			this.addToBasket();
		},
		'$store.state.GDV3.v3ToBuy': {
			handler: function() {
				this.v3ToBuy();
			}
		},
		'$store.state.GDV3.officialRate': {
			handler: function(val) {
				let { rate, ratio, odds } = val;
				this.rate = rate;
				this.ratio = ratio;
				this.odds = odds;
				this.selectedNum();
			},
			deep: true
		},

		'$store.state.GDV3.v3CurGame': {
			handler: function(val) {
				this.$store.commit('setNumBasket', []);
				this.initPage();
			},
			deep: true
		}
	},

	created() {
		this.initPage();
	
	},

	methods: {
		toggleCheck(s) {
			this.positionLen = s;
			this.selectedNum();
		},
		initPage() {
			let { rate, ratio, odds } = this.$store.state.GDV3.officialRate;
			this.rate = rate;
			this.ratio = ratio;
			this.odds = odds;

			let { N } = this.$store.state.GDV3.v3CurGame;

			this.gameComfig = playList[N];
			let { titleArr, limit1, limit2 } = this.gameComfig;
			this.titleArr = titleArr;
			this.limit1 = limit1 || 1;
			this.limit2 = limit2 || 2;
		},

		v3ToBuy() {
			let basket = this.$store.state.GDV3.selectedNum;
			;
			if (JSON.stringify(basket) !== '{}') {
				this.$store.commit('v3NumBasket', basket);

				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
				this.$store.commit('v3ClearSelected', new Date().getTime());
			}

			//触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
			let ts = new Date().getTime();
			this.$store.commit('v3ToBuyNext', ts);
		},
		addToBasketRandom(n) {
			while (n--) {
				let obj = this.gameComfig.addToBasketRandom();
				this.$store.commit('v3NumBasket', obj);
			}
			this.$store.commit('v3IsShowNumBaket',true)
		},

		addToBasket(isShowBasket = true) {
			let basket = this.$store.state.GDV3.selectedNum;
			if (JSON.stringify(basket) !== '{}') {
				this.$store.commit('v3NumBasket', basket);

				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
				this.$store.commit('v3ClearSelected', new Date().getTime());
				if (isShowBasket) {
					this.$store.commit('v3IsShowNumBaket', true);
				}
			} else {
				this.$util.showConfirm({ content: '号码选择不完整，请重新选择', showCancel: false });
			}
		},
		selectedNum(obj) {
			this.selectedObj = Object.assign(this.selectedObj, obj);
			let arr1 = this.selectedObj[this.titleArr[0]] || [];
			let arr2 = this.selectedObj[this.titleArr[1]] || [];
			if (arr1.length >= this.limit1 && arr2.length >= this.limit2) {
				let { num, money } = this.gameComfig.dataHandler({ arr1, arr2 });
				let {radix} = this.$store.state.GDV3.v3IndexGameAllData
				money = money / 2  * radix
				if (money !== 0) {
					this.$store.commit('v3FootMoney', { num, money });
					let o = this.createObj(arr1, arr2);
					o.len = num;
					o.money = money;
					this.$store.commit('v3selectedNum', o);
				} else {
					this.$store.commit('v3selectedNum', {});
					this.$store.commit('v3FootMoney', {});
				}
			} else {
				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
			}
		},

		createObj(arr1, arr2) {
			let tem = [];
			arr1.forEach(item => {
				tem.push(item.num);
			});
			let tem2 = [];
			arr2.forEach(item => {
				tem2.push(item.num);
			});

			if (tem.length === 1) {
				let idx = tem2.findIndex(num => num === tem[0]);
				if (idx !== -1) {
					tem2.splice(idx, 1);
				}
			}

			let obj = this.$buyDataHandler.createBuyObj();

			obj.numStr = tem.join() + '|' + tem2.join();
			obj.orderStr =tem.join() + '|' + tem2.join();
			return obj;
		},

		// handlerData(arr1, arr2) {
		// 	let len = arr2.length;
		// 	let temArr = [];
		// 	arr1.forEach(item => {
		// 		let index = arr2.findIndex(n => n.num === item.num);
		// 		if (index !== -1) {
		// 			temArr.push(this.$buyDataHandler.combinatorialNumber(len - 1, this.limit2));
		// 		} else {
		// 			temArr.push(this.$buyDataHandler.combinatorialNumber(len, this.limit2));
		// 		}
		// 	});

		// 	let num = temArr.reduce((accumulator, currentValue) => {
		// 		return accumulator + currentValue;
		// 	}, 0);

		// 	let money = this.$buyDataHandler.handlerMoneyDecimal(num * 2 * this.rate * this.ratio);
		// 	return { num, money };
		// }
	}
};
</script>

<style></style>
