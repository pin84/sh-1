<template>
	<view ><ListCircle :titleArr="titleArr" @selectedNum="selectedNum" /></view>
</template>

<script>
import playList from './playList.js';
import ListCircle from '@/pages/gamesIm/common/ListCircle';
export default {
	data() {
		return {
			titleArr: ['组三'],
			gameConfig: {},
			selectedObj: {},
			limitlen: 1 //
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
				this.handlerData();
			},
			deep: true
		}
	},

	// n选m
	created() {
		this.initData();


	},

	methods: {
		initData() {
			let { N } = this.$store.state.GDV3.v3CurGame;
			this.gameConfig = playList[N];
			let { titleArr } = this.gameConfig;
			this.titleArr = titleArr;
		},
		v3ToBuy() {
			let basket = this.$store.state.GDV3.selectedNum;

			;
			if (JSON.stringify(basket) !== '{}') {
				this.addToBasket(false);
			}

			//触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
			let ts = new Date().getTime();
			this.$store.commit('v3ToBuyNext', ts);
		},
		addToBasketRandom(n) {
			while (n--) {
				let obj = this.gameConfig.addToBasketRandom();
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
		selectedNum(selectedObj) {
			this.selectedObj = selectedObj;
			let arr = selectedObj[this.titleArr];
			let len = arr.length;
			if (len !== 0) {
				this.handlerData();
			} else {
				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
			}
		},

		handlerData() {
			if (JSON.stringify(this.selectedObj) === '{}') {
				return;
			}
			let obj = this.gameConfig.handlerData(this.selectedObj);
			let { len, money } = obj;
			let {radix} = this.$store.state.GDV3.v3IndexGameAllData
			money = money / 2  * radix
			obj.money = money
			
			this.$store.commit('v3FootMoney', { num: len, money });
			this.$store.commit('v3selectedNum', obj);
		}
	}
};
</script>

<style></style>
