<template>
	<view><ListCircle :titleArr="titleArr" @selectedNum="selectedNum" :numLen="12" /></view>
</template>

<script>
import playList from './playList.js';
import ListCircle from '@/pages/gamesIm/common/ListCircle';
export default {
	data() {
		return {
			gameConfig: {},
			titleArr: ['百位', '十位', '个位'],
			selectedObj: {},
			randomArr: [],
			mxo:0,
		};
	},
	components: {
		ListCircle
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
				this.selectedNum();
			},
			deep: true
		},
		// '$store.state.GDV3.v3CurGame': {
		// 	handler: function(val) {
		// 		this.$store.commit('setNumBasket', []);
		// 		this.initPage(val.N);
		// 	},
		// }
	},

	created() {
		this.initPage();
	},

	methods: {
		initPage() {
			let { I, C } = this.$store.state.GDV3.v3CurGame;
			this.randomArr = C;
			this.gameConfig = playList[I];
			let { MB, MxO, MiO } = C[0];
			this.mxo = MxO
			let ratioObj = {
				MB,
				MxO,
				MiO
			};
			this.$store.commit('v3RatioInitValue', ratioObj);
			let { titleArr } = this.gameConfig;
			this.titleArr = titleArr;
		},
		addToBasketRandom(n) {
			let len = this.randomArr.length - 1;
			let arr = this.randomArr;
			while (n--) {
				let obj = this.$buyDataHandler.createBuyObj();
				let i = this.$buyDataHandler.createRandomNum(0, 9);
				let randomObj = arr[i];

				let m = +i + 1;
				obj.numStr = m < 10 ? '0' + m : m;
				(obj.orderStr = m < 10 ? '0' + m : m), (obj.gName = obj.gName + randomObj.N);
				obj.I = randomObj.I;

				this.$store.commit('v3NumBasket', obj);
			}
			this.$store.commit('v3IsShowNumBaket', true);
		},
		v3ToBuy() {
			this.addToBasket(false);
			
			//触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
			let ts = new Date().getTime();
			this.$store.commit('v3ToBuyNext', ts);
		},
		addToBasket(isShowBasket = true) {
			let basket = this.$store.state.GDV3.selectedNum;
			let basketArr = this.$store.state.GDV3.numBasket;
			if (basketArr.length == 0 && JSON.stringify(basket) === '{}') {
				this.$util.showConfirm({ content: '号码选择不完整，请重新选择', showCancel: false });
				return;
			}

			if (Array.isArray(basket)) {
				basket.forEach(item => {
					this.$store.commit('v3NumBasket', item);
				});

				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
				this.$store.commit('v3ClearSelected', new Date().getTime());
				if (isShowBasket) {
					this.$store.commit('v3IsShowNumBaket', true);
				}
			}
		},
		selectedNum(selected) {
			let basketArr = [];
			let allSelected = Object.assign(this.selectedObj, selected);
			let {radix} = this.$store.state.GDV3.v3IndexGameAllData
			for (let [key, value] of Object.entries(allSelected)) {
				if (value.length) {
					let arr = [];
					value.forEach(item => {
						arr.push(item.num);
					});

					let obj = this.$buyDataHandler.createBuyObj();

					let len = arr.length;
					obj.len = len;
					let { rate, ratio } = obj;
					obj.money = this.$buyDataHandler.handlerMoneyDecimal(len * radix * rate * ratio);
					obj.numStr = arr.join(',');
					let orderArr = [];
					this.titleArr.forEach(title => {
						if (title == key) {
							orderArr.push(arr.join(','));
						} else {
							orderArr.push('-');
						}
					});
					obj.orderStr = orderArr.join('|');
					obj.gName_1 = '_';
					obj.gType = key;

					let temItem = this.randomArr.find(item => item.N.includes(key));
					obj.I = temItem.I;
					basketArr.push(obj);
				} else {
					this.$store.commit('v3selectedNum', {});
					this.$store.commit('v3FootMoney', {});
				}
			}
			
			// if(basketArr.length !== 0){
			// 	let mxOObj = this.randomArr[1]
			// 	mxOObj.MxO = this.mxo * basketArr.length
			// 	this.$store.commit('v3RatioCurValue', mxOObj);
			// } else {
			// 	this.$store.commit('v3RatioCurValue', {});
			// }
			
			let len1 =0
			Object.values(allSelected).forEach(arr=>{
				if(arr.length != 0){
					len1++
				}
			})
			
			if (len1) {
				let { C } = this.$store.state.GDV3.v3CurGame;
				let { MxO } = C[0];
				// this.$store.commit('sumBonus', MxO * len1);
				this.$store.commit('sumBonus', len1);
			} else {
				this.$store.commit('sumBonus', 0);
			}
			
			
			let money = basketArr.reduce((accumulator, currentValue) => {
				return accumulator + Number(currentValue.money);
			}, 0);
			let len = basketArr.reduce((accumulator, currentValue) => {
				return accumulator + Number(currentValue.len);
			}, 0);
			this.$store.commit('v3selectedNum', basketArr);
			this.$store.commit('v3FootMoney', { num: len, money });
		}
	}
};
</script>

<style></style>
