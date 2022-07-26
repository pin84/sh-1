<template>
	<view>
		<PositionRandom @toggleCheck="toggleCheck" :positonLenLimit="positonLenLimit" />
		<ListCircle :titleArr="titleArr" @selectedNum="selectedNum" :numLen="10" :isAddZero="false" :listStart="0" :size="4" :isShowSort="isShowSort" />
	</view>
</template>

<script>
import playList from './playList.js';
import ListCircle from '@/pages/gamesIm/common/ListCircle';
import PositionRandom from '@/pages/gamesIm/common/commonIm/PositionRandom';
export default {
	data() {
		return {
			gameConfig: {},
			titleArr: ['百位', '十位', '个位'],
			selectedObj: {},
			isShowSort: false,
			positonLenLimit: 2,
			resultArr: [],
			positonLen: 10,
			unHandlerArr: [],
			randomArr: [],
			handledObj:undefined, //处理后生成的obj,可添加到号码蓝里
		};
	},
	components: {
		ListCircle,
		PositionRandom
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
		}
	},

	created() {
		this.initPage();
	},

	methods: {
		toggleCheck(obj) {
			let { resultArr, s, unHandlerArr } = obj;
			this.resultArr = resultArr;
			this.positonLen = s || 10;
			this.unHandlerArr = unHandlerArr;
			this.handlerData();
		},
		initPage() {
			let { I, C } = this.$store.state.GDV3.v3CurGame;
			let gameConfig = playList[I];
			this.randomArr = C;
			if (!gameConfig) {
				this.$util.showToast({ title: 'config undefind!' });
				return;
			}

			let { MB, MxO, MiO } = C[0];
			let ratioObj = {
				MB,
				MxO,
				MiO
			};
			this.$store.commit('v3RatioInitValue', ratioObj);

			this.gameConfig = gameConfig;
			let { titleArr, isShowSort, positonLenLimit } = gameConfig;
			this.titleArr = titleArr;
			this.isShowSort = isShowSort || false;
			this.positonLenLimit = positonLenLimit || 2;
		},
		addToBasketRandom(n) {
			while (n--) {
				let obj = this.gameConfig.addToBasketRandom(this.randomArr);
				this.$store.commit('v3NumBasket', obj);
			}
			this.$store.commit('v3IsShowNumBaket', true);
		},
		async v3ToBuy() {
			
			this.addToBasket(false)
		
			//触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
			let ts = new Date().getTime();
			this.$store.commit('v3ToBuyNext', ts);
		},
		addToBasket(isShowBasket = true) {
			let basket = this.$store.state.GDV3.selectedNum;
			
			if(Array.isArray(basket)){
				basket.forEach(item => {
					this.$store.commit('v3NumBasket', item);
				});
				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
				this.$store.commit('v3ClearSelected', new Date().getTime());
				this.handledObj = undefined
				if (isShowBasket) {
					this.$store.commit('v3IsShowNumBaket', true);
				}
			} else {
				this.$util.showConfirm({ content: '号码选择不完整，请重新选择', showCancel: false });
			}
			
		
		},
		selectedNum(selected) {
			let allSelected = Object.assign(this.selectedObj, selected);
			let obj = this.gameConfig.dataHandler(allSelected, this.titleArr);
		
			if (this.resultArr.length == 0 || !obj) {
				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
			} else {
				let { radix } = this.$store.state.GDV3.v3IndexGameAllData;
				obj.money = (obj.money / 2) * radix;
				this.handledObj = obj
				this.handlerData();
			}
		},

		handlerData() {
			if(!this.handledObj)return
			let objArr = [];
			this.resultArr.forEach(str => {
				let { I, N } = this.randomArr.find(item => item.N.includes(str));
				
				
				let obj1 = JSON.parse(JSON.stringify(this.handledObj));
				obj1.I = I;
				obj1.gName = N;

				objArr.push(obj1);
			});

			let length = objArr.length;

			let num = this.handledObj.len * length;
			let money = this.handledObj.money * length;
			this.$store.commit('v3FootMoney', { num, money });
			this.$store.commit('v3selectedNum', objArr);
		}
	}
};
</script>

<style></style>
