<template>
	<view><ListCircle :titleArr="titleArr" @selectedNum="selectedNum" :isShowSort="false" :numLen="12" /></view>
</template>

<script>
import ListCircle from '@/pages/gamesIm/common/ListCircle';
import playList from './playList.js';
export default {
	data() {
		return {
			gameConfig: {},
			titleArr: ['组三'],
			selectedObj: {},
			lenLimit: 3 //
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
				this.selectedNum();
			},
			deep: true
		},
		// '$store.state.gameData.curGame': {
		// 	handler: function(val) {
		// 		this.$store.commit('setNumBasket', []);
		// 		this.initPage();
		// 	},
		// 	deep: true
		// }
	},

	created() {
		this.initPage();
	},

	methods: {
		initPage() {
			let { I, C } = this.$store.state.GDV3.v3CurGame;
			let { MB, MxO, MiO } = C[0];

			;

			let ratioObj = {
				MB,
				MxO,
				MiO
			};
			this.$store.commit('v3RatioInitValue', ratioObj);

			this.gameConfig = playList[I];

			let { titleArr, lenLimit, randomLen } = this.gameConfig;
			this.titleArr = titleArr;
			this.lenLimit = lenLimit;
		},
		v3ToBuy() {
			this.addToBasket(false);
			//触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
			let ts = new Date().getTime();
			this.$store.commit('v3ToBuyNext', ts);
		},
			
		addToBasketRandom(n) {
			let {radix} = this.$store.state.GDV3.v3IndexGameAllData
			while (n--) {
				let obj = this.gameConfig.addToBasketRandom();
				obj.money = obj.money / 2 * radix
				this.$store.commit('v3NumBasket', obj);
			}
			this.$store.commit('v3IsShowNumBaket', true);
		},

		addToBasket(isShowBasket = true) {
			let selectedNum = this.$store.state.GDV3.selectedNum;
			let basketArr = this.$store.state.GDV3.numBasket;
			;
			if (JSON.stringify(selectedNum) === '{}' && basketArr.length === 0) {
				this.$util.showConfirm({ content: '号码选择不完整，请重新选择', showCancel: false });
			} else {
				if (JSON.stringify(selectedNum) !== '{}') {
					this.$store.commit('v3NumBasket', selectedNum);
				}
				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
				if (isShowBasket) {
					this.$store.commit('v3IsShowNumBaket', true);
				}
				this.$store.commit('v3ClearSelected', new Date().getTime());
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
				this.handlerData(len);
			} else {
				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
			}
		},

		handlerData(len) {
			let {radix} = this.$store.state.GDV3.v3IndexGameAllData
			let obj = this.gameConfig.dataHandler({ selectedObj: this.selectedObj, len });
			obj.money = obj.money / 2 * radix
			
			
			this.$store.commit('v3FootMoney', { num: obj.len, money: obj.money });
			this.$store.commit('v3selectedNum', obj);
		}
	}
};
</script>

<style></style>
