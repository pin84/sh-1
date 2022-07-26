<template>
	<view>
		<block v-for="(arr, idx) in numArr"><ListSquareCustom :title="titleArr[idx]" @selectedNum="selectedNum" :numArr="arr" :isShowTitle='true'/></block>
	</view>
</template>

<script>
import playList from './playList.js';
import ListSquareCustom from '@/pages/gamesIm/common/commonIm/ListSquareCustom.vue';
export default {
	data() {
		return {
			gameConfig: {},
			titleArr: ['百位', '十位', '个位'],
			selectArr: [],
			numArr: [],
			rate: 1,
			ratio: 1
		};
	},
	components: {
		ListSquareCustom
	},

	watch: {
		'$store.state.GDV3.clearSelected': function(val) {
			this.selectArr = [];
		},

		'$store.state.GDV3.addToBasket': function(val) {
			this.addToBasket();
		},
		'$store.state.GDV3.v3ToBuy': function(val) {
			this.v3ToBuy();
		},

		'$store.state.GDV3.officialRate': {
			handler: function(val) {
				let { rate, ratio } = val;
				this.rate = rate;
				this.ratio = ratio;
				this.handlerData();
				this.changeRate(val);
			},
			deep: true
		}
	},

	created() {
		this.initData();
		this.initPage();
	},

	methods: {
		changeRate(val) {
			let { percentage, rate, ratio } = val;
			this.numArr.forEach(arr => {
				arr.forEach(item => {
					item.odds = this.$buyDataHandler.setNumDecimal((item.MiO + (item.MxO - item.MiO) * percentage) * rate, 5);
					arr.push({});
					arr.pop();
				});
			});
		},
		initPage() {
			let { I, C } = this.$store.state.GDV3.v3CurGame;
			let gameConfig = playList[I];
			if (!gameConfig) {
				this.$util.showToast({ title: 'config undefind!' });
				return;
			}

			let odds = 0;
			let obj = {};
			this.numArr.forEach(arr => {
				arr.forEach(item => {
					if (item.odds > odds) {
						obj = item;
						odds = item.odds;
					}
				});
			});

			let { MB, MxO, MiO } = obj;
			let ratioObj = {
				MB,
				MxO,
				MiO
			};
			this.$store.commit('v3RatioInitValue', ratioObj);

			this.gameConfig = gameConfig;
			let { titleArr } = gameConfig;
			this.titleArr = titleArr;
		},

		initData() {
			let { percentage, rate, ratio } = this.$store.state.GDV3.officialRate;

			this.rate = rate;
			this.ratio = ratio;
			let {C} = this.$store.state.GDV3.v3CurGame;
			let numArr = []
			C.forEach(outItem=>{
				outItem.C.forEach(item=>{
					item.N1 = item.N
					item.gName = outItem.N
					item.odds = this.$buyDataHandler.setNumDecimal((item.MiO + (item.MxO - item.MiO) * percentage) * rate, 5);
					numArr.push(item)
				})
			})


			this.numArr.push(numArr);
		},


		async v3ToBuy() {
			this.addToBasket(false);
			//触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
			let ts = new Date().getTime();
			this.$store.commit('v3ToBuyNext', ts);
		},
		addToBasket(isShowBasket = true) {
			let basket = this.$store.state.GDV3.selectedNum;
			if (!Array.isArray(basket)) return;
			basket.forEach(item => {
				this.$store.commit('v3NumBasket', item);
			});

			this.$store.commit('v3selectedNum', {});
			this.$store.commit('v3FootMoney', {});
			this.$store.commit('v3ClearSelected', new Date().getTime());
			if (isShowBasket) {
				this.$store.commit('v3IsShowNumBaket', true);
			}
		},

		selectedNum(selected) {
			let selectArr = [];
			this.numArr.forEach(arr => {
				arr.forEach(item => {
					if (item.active) {
						selectArr.push(item);
					}
				});
			});

			if (selectArr.length == 0) {
				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
				this.$store.commit('v3RatioCurValue', {});
				return;
			}
			this.selectArr = selectArr;
			console.log(selectArr);
			let maxMxO = 0;
			let maxObj = {};
			let temObj = {};
			this.selectArr.forEach(item => {
				if (item.odds > maxMxO) {
					maxObj = item;
					maxMxO = item.odds;
				}

				if (temObj[item.gName] && temObj[item.gName] < item.odds) {
					temObj[item.gName] = item.odds;
				} else {
					temObj[item.gName] = item.odds;
				}
			});
			
			

			maxObj.sumBonus = Object.values(temObj).reduce((accumulator, currentValue) => {
				return accumulator + currentValue;
			}, 0);
			
			console.log(	maxObj.sumBonus);

			this.$store.commit('v3RatioCurValue', maxObj);
			this.handlerData();
		},

		handlerData() {
			let { radix } = this.$store.state.GDV3.v3IndexGameAllData;

			let num = this.selectArr.length;
			let money = num * radix * this.rate * this.ratio;

			let objArr = [];
			this.selectArr.forEach(item => {
				let obj = this.$buyDataHandler.createBuyObj();
				obj.I = item.I;
				obj.gName = item.gName;
				obj.numStr = item.N;
				obj.orderStr = item.N;
				objArr.push(obj);
			});

			this.$store.commit('v3FootMoney', { num, money });
			this.$store.commit('v3selectedNum', objArr);
		}
	}
};
</script>

<style></style>
