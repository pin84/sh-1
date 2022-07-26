<template>
	<view >
		<view><PositionRandom :listArr="positioArr" @toggleCheck="toggleCheck" :limitLen="positionLimit" /></view>
		<view><ListCircle :titleArr="titleArr" @selectedNum="selectedNum" :isShowSort="false" /></view>
	</view>
</template>

<script>
import ListCircle from '@/pages/games/common/ListCircle';
import playList from './playList.js';
import PositionRandom from '@/pages/games/officialGame/common/PositionRandom';
export default {
	data() {
		return {
			positionLen: 10,
			positioArr: [
				{ name: '万', isChecked: true },
				{ name: '千', isChecked: true },
				{ name: '百', isChecked: true },
				{ name: '十', isChecked: true },
				{ name: '个', isChecked: true }
			],
			gameConfig: {},
			titleArr: ['组三'],
			selectedObj: {},
			rate: 1,
			ratio: 1,
			odds: 1,
			limitlen: 3, //
			positionLimit: 3
		};
	},
	components: {
		ListCircle,
		PositionRandom
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
		'$store.state.gameData.curGame': {
			handler: function(val) {
				this.$store.commit('setNumBasket', []);
				this.initPage(val.N);
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
		initPage(n) {
			let { N } = this.$store.state.gameData.curGame;
			this.gameConfig = playList[N];
			let { rate, ratio, odds } = this.$store.state.GDV3.officialRate;
			this.rate = rate;
			this.ratio = ratio;
			this.odds = odds;
			if (!n) {
				let { N } = this.$store.state.gameData.curGame;
				n = N;
			}

			let { titleArr, positioArr, positionLimit } = this.gameConfig;
			this.titleArr = titleArr;
			// this.positioArr = positioArr;
			this.positionLimit = positionLimit || 3;
		},
		v3ToBuy() {
			let basket = this.$store.state.GDV3.selectedNum;
			if (JSON.stringify(basket) !== '{}') {
				this.addToBasket();
			}

			this.$emit('buy810');
		},
		addToBasketRandom(n) {
			let { C } = this.$store.state.gameData.curGame;
			let {radix} = this.$store.state.GDV3.v3IndexGameAllData
			while (n--) {
				let obj = this.gameConfig.addToBasketRandom(C);
				obj.money = obj.money /2 * radix
				this.$store.commit('v3NumBasket', obj);
			}
		},

		addToBasket() {
			let basket = this.$store.state.GDV3.selectedNum;
			if (JSON.stringify(basket) !== '{}') {
				let titleArr = [];
				this.positioArr.forEach(item => {
					if (item.isChecked) {
						titleArr.push(item.name);
					}
				});

				let tha = this.gameConfig.titleHandler(titleArr);
				let { C } = this.$store.state.gameData.curGame;
				let {radix} = this.$store.state.GDV3.v3IndexGameAllData
				;
				tha.forEach(name => {
					let obj = this.$buyDataHandler.createBuyObj();

					let { I, N } = C.find(item => item.N === name);

					obj.I = I;
					obj.gName = N;
					obj.len = basket.len / this.positionLen;
					obj.money = (basket.money / this.positionLen ) / 2 * radix ;
					obj.numStr = basket.numStr;
					obj.orderStr = basket.orderStr;

					this.$store.commit('v3NumBasket', obj);
				});

				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
				this.$store.commit('v3ClearSelected', new Date().getTime());
			} else {
				this.$util.showConfirm({ content: '号码选择不完整，请重新选择', showCancel: false });
			}
		},
		selectedNum(obj) {
			this.selectedObj = Object.assign(this.selectedObj, obj);
			let flag = false;
			let len = 0;
			for (const [key, value] of Object.entries(this.selectedObj)) {
				if (value.length >= this.gameConfig.lenLimit) {
					flag = true;
					len = value.length;
				}
			}

			if (flag) {
				let handlerData = this.gameConfig.dataHandler({ selectedObj: this.selectedObj, len, positionLen: this.positionLen });

				let { obj, s, money } = handlerData;
				let {radix} = this.$store.state.GDV3.v3IndexGameAllData
				money = money /2  * radix
				this.$store.commit('v3FootMoney', { num: s, money });
				this.$store.commit('v3selectedNum', obj);
			} else {
				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
			}
		}
	}
};
</script>

<style></style>
