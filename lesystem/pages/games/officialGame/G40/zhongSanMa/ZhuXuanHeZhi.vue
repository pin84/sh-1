<template>
	<view><ListCircleRandomNum  :titleArr='titleArr' :numArr='numArr' @selectedNum="selectedNum" /></view>
</template>

<script>
import ListCircleRandomNum from '@/pages/games/common/ListCircleRandomNum';
export default {
	data() {
		return {
			titleArr: [ '组选和值'],
			selectedObj: {},
			rate: 1,
			ratio: 1,
			odds: 1,
			num: 0,
			money: 0,
			numArr:[]
		};
	},
	components: {
		ListCircleRandomNum
		
	},

	watch: {
		'$store.state.GDV3.clearSelected': function(val) {
			this.selectedObj = {};
			this.$store.commit('v3selectedNum', {});
			this.$store.commit('v3FootMoney', {});
		},

		'$store.state.GDV3.addToBasket': function(val) {
			this.addToBasket();
		},
		'$store.state.GDV3.v3ToBuy': function(val) {
			this.v3ToBuy();
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

	created() {
		this.initData()
	},

	methods: {
		initData(){
			let { rate, ratio, odds } = this.$store.state.GDV3.officialRate;
			this.rate = rate;
			this.ratio = ratio;
			this.odds = odds;
			this.numArr = []
			let i = 0
			while(i++ < 26){
				this.numArr.push({num:i})
			}
		},
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
			let len = this.titleArr.length;
			let i = 0;
			for (const [key, value] of Object.entries(this.selectedObj)) {
				if (value.length !== 0) {
					i++;
				}
			}

			if (i === len) {
				this.handlerData();
			} else {
				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
			}
		},

		handlerData() {
			let n = Object.entries(this.selectedObj).reduce((accumulator, currentValue) => {
				return accumulator * currentValue[1].length;
			}, 1);
			this.num = 5 * n;
			this.money = 5 * n * 2 * this.rate * this.ratio;

			this.$store.commit('v3FootMoney', { num: this.num, money: this.money });

			let { I, N ,C} = this.$store.state.gameData.curGame;
			let handlerStr = this.$buyDataHandler.sortData(this.selectedObj);
			let ts = new Date().getTime() / 1000;
			let obj = {
				rate: this.rate, // 模式
				ratio: Number(this.ratio), //倍数
				gName: N,
				gName_1: '',
				gType: '',
				numStr: handlerStr,
				orderStr: handlerStr,
				len: this.num, //注数
				money: this.money,
				unitPrice: 2,
				I:C[0].I,
				odds: this.odds,
				ts
			};

			this.$store.commit('v3selectedNum', obj);
		}
	}
};
</script>

<style></style>
