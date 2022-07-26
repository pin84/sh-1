<template>
	<view><ListCircle :titleArr="titleArr" @selectedNum="selectedNum" :isShowSort='false' /></view>
</template>

<script>
import ListCircle from '@/pages/games/common/ListCircle';
export default {
	data() {
		return {
			titleArr: ['组六'],
			selectedObj: {},
			rate: 1,
			ratio: 1,
			odds: 1,
			num: 0,
			money: 0,
			limitlen:3  //
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
		}
	},
 
	 // n先m
	created() {
		let { rate, ratio, odds } = this.$store.state.GDV3.officialRate;
		this.rate = rate;
		this.ratio = ratio;
		this.odds = odds;
	},

	methods: {
		v3ToBuy() {
			let basket = this.$store.state.GDV3.selectedNum;
			if (JSON.stringify(basket) !== '{}') {
				this.$store.commit('v3NumBasket', basket);
			
				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
				this.$store.commit('v3ClearSelected', new Date().getTime());
			}

			this.$emit('buy810');
		},
		addToBasketRandom(n) {
			while (n--) {
				
				let obj = this.$buyDataHandler.addToBasketRandom(this.limitlen);
				this.$store.commit('v3NumBasket', obj);
			}
		},

		addToBasket() {
			let basket = this.$store.state.GDV3.selectedNum;
			if (JSON.stringify(basket) !== '{}') {
				this.$store.commit('v3NumBasket', basket);

				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
				this.$store.commit('v3ClearSelected', new Date().getTime());
			} else {
				this.$util.showConfirm({ content: '号码选择不完整，请重新选择', showCancel: false });
			}
		},
		selectedNum(obj) {
			this.selectedObj = Object.assign(this.selectedObj, obj);
			
			console.log(this.selectedObj)
			let flag = false;
			let len = 0;
			for (const [key, value] of Object.entries(this.selectedObj)) {
				if (value.length >= this.limitlen) {
					flag = true;
					len = value.length;
				}
			}

			if (flag) {
				this.handlerData(len);
			} else {
				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
			}
		},

		handlerData(len) {
			let s = this.$buyDataHandler.combinatorialNumber(len, this.limitlen);
			this.num = s;
			this.money = this.$buyDataHandler.handlerMoneyDecimal(s * 2 * this.rate * this.ratio);
			this.$store.commit('v3FootMoney', { num: this.num, money: this.money });
			// let { I, N } = this.$store.state.gameData.curGame;

			let temArr = [];
			for (const [key, value] of Object.entries(this.selectedObj)) {
				value.forEach(item => {
					temArr.push(item.num);
				});
			}
			let obj = this.$buyDataHandler.createBuyObj();

			obj.len = this.num;
			obj.money = this.money;
			obj.numStr = temArr.join('|');
			obj.orderStr = temArr.join('|');
			this.$store.commit('v3selectedNum', obj);
		}
	}
};
</script>

<style></style>
