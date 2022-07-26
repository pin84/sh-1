<template>
	<view v-if="reload"><ListCircleCustom :titleArr="titleArr" @selectedNum="selectedNum" :isShowSort="isShowSort" :selectTypeArr="selectTypeArr" :numArr="numArr" /></view>
</template>

<script>
import playList from './playList.js';
import ListCircleCustom from '@/pages/games/common/ListCircleCustom.vue';
export default {
	data() {
		return {
			reload: false,
			gameConfig: {},
			selectTypeArr: [{ type: '全' }, { type: '清' }],
			numArr: [], // [{ num: 2 }],
			isShowSort: true,
			titleArr: ['百位', '十位', '个位'],
			selectedObj: {},
			rate: 1,
			ratio: 1,
			odds: 1,
			num: 0,
			money: 0,
			lenLimit: 5
		};
	},
	components: {
		ListCircleCustom
	},

	watch: {
		'$store.state.GDV3.clearSelected': function(val) {
			this.selectedObj = {};
		},

		'$store.state.GDV3.addToBasket': function(val) {
			this.addToBasket();
		},
		'$store.state.GDV3.v3ToBuy': function(val) {
			this.v3ToBuy();
		},
		'$store.state.GDV3.v3AddRandom': {
			handler: function(val) {
				this.addToBasketRandom(val.n);
			},
			deep: true
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
				this.reload = false;
				this.numArr = [];
				this.titleArr = [];
				;
				this.$store.commit('setNumBasket', []);
				this.initPage();
			},
			deep: true
		}
	},

	created() {
		let { rate, ratio, odds } = this.$store.state.GDV3.officialRate;
		this.rate = rate;
		this.ratio = ratio;
		this.odds = odds;

		this.initPage();
	},

	methods: {
		initPage() {
			let { N } = this.$store.state.gameData.curGame;
			this.gameConfig = playList[N];

			let { titleArr, isShowSort, numArr, selectTypeArr, lenLimit } = this.gameConfig;
			this.titleArr = titleArr;
			this.isShowSort = isShowSort;
			this.numArr = numArr;
			this.selectTypeArr = selectTypeArr;
			this.lenLimit = lenLimit;
			setTimeout(() => {
				this.reload = true;
			}, 0);
		},
		addToBasketRandom(n) {
			let temArr = [];
			let {C,N} = this.$store.state.gameData.curGame
			
			while (n--) {
				let obj = this.gameConfig.addToBasketRandom(C)
				obj.I = C[0].I
				obj.gName = N
				this.$store.commit('v3NumBasket', obj);
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
			let i = 0;
			for (const [key, value] of Object.entries(this.selectedObj)) {
				if (value.length !== 0) {
					i++;
				}
			}

			if (i >= this.lenLimit) {
				let {C , N } = this.$store.state.gameData.curGame
				let { len, money, obj } = this.gameConfig.dataHandler(this.selectedObj);
				
				let {radix} = this.$store.state.GDV3.v3IndexGameAllData
				money = money / 2 * radix
				obj.gName = N 
				obj.I = C[0].I
				obj.money = obj.money / 2 * radix
				
				
				this.$store.commit('v3FootMoney', { num: len, money });
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
