<template>
	<view>
		<view v-for="(text, idx) in titleArr" :key="idx">
			<ListCircle :titleArr="[text]" @selectedNum="selectedNum" :isShowSort="false" :size="4" :isShowTitle="isShowTitle" :numList="numList[idx]" :isMaxLen='isMaxLen' />
		</view>
	</view>
</template>

<script>
import ListCircle from '@/pages/gamesIm/common/ListCircle_1';
import playList from './playList.js';
export default {
	data() {
		return {
			isMaxLen:false,
			selectedList: [],
			selectedNumLen: 0, //注数
			numList: [],
			gameConfig: {},
			titleArr: ['上', '下'],
			cbLen: 1, //
			selectedobj: {},
			isShowTitle: true, //是否显示全大小之类的
			ratio: 1,
			rate: 1
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
				let { rate, ratio } = val;
				this.ratio = ratio;
				this.rate = rate;
				this.handlerData();
			},
			deep: true
		}
	},

	created() {
		this.initPage();
		this.initData();
	},

	methods: {
		initData() {
			let arr = [];
			let tem1 = [];
			let tem2 = [];
			let i = 0;
			while (i++ < 40) {
				tem1.push({ num: i < 10 ? '0' + i : i });
			}
			let j = 40;
			while (j++ < 80) {
				tem2.push({ num: j < 10 ? '0' + j : j });
			}

			arr.push(tem1, tem2);

			this.numList = arr;
		},
		initPage() {
			let { I, C } = this.$store.state.GDV3.v3CurGame;
			let { MB, MxO, MiO } = C[0];

			let ratioObj = {
				MB,
				MxO,
				MiO
			};
			this.$store.commit('v3RatioInitValue', ratioObj);

			this.gameConfig = playList[I];

			let { titleArr, cbLen, isShowTitle } = this.gameConfig;
			this.cbLen = cbLen;
			this.isShowTitle = isShowTitle;
		},
		v3ToBuy() {
			this.addToBasket(false);
			//触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
			let ts = new Date().getTime();
			this.$store.commit('v3ToBuyNext', ts);
		},
		addToBasketRandom(n) {
			let len = this.numList[0].length
			let numArr = []
			this.numList[0].forEach(item=>{
				numArr.push(item.num)
			})
			while (n--) {
				let obj = this.gameConfig.addToBasketRandom(numArr)
				

				this.$store.commit('v3NumBasket', obj);
			}
			
			this.$store.commit('v3IsShowNumBaket', true);
		},

		addToBasket(isShowBasket = true) {
			if(this.selectedList.length == 0) return 
			
			let basketArr = this.$store.state.GDV3.numBasket;
			let { money } = this.$store.state.GDV3.footMoney;
			
			let obj = 	this.gameConfig.addToBasket(this.selectedList)
			obj.money = money
			
			this.$store.commit('v3NumBasket', obj);
			
			this.selectedobj = {};
			this.selectedList = [];
			this.$store.commit('v3selectedNum', {});
			this.$store.commit('v3FootMoney', {});
			if (isShowBasket) {
				this.$store.commit('v3IsShowNumBaket', true);
			}
			this.$store.commit('v3ClearSelected', new Date().getTime());
	
		},
		selectedNum(selected) {
			this.selectedobj[Object.keys(selected)[0]] = Object.values(selected)[0];
			
			let arr = [];
			for (let [key, value] of Object.entries(this.selectedobj)) {
				value.forEach(item => {
					arr.push(item.num);
				});
			}
			
			let len = arr.length
			
			if(len >=8 ){
				this.isMaxLen = true
			} else {
				this.isMaxLen = false
			}
			
			if(len !==0){
				this.$store.commit('v3selectedNum',{a:1}) //显示回收站
			} else {
				this.$store.commit('v3selectedNum',{})
				return
			}
			
			let s = this.$buyDataHandler.combinatorialNumber(arr.length, this.cbLen);
			if (!s) {
				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
				return;
			}

			this.selectedList = arr;
			this.selectedNumLen = s;
			this.handlerData();
		},

		handlerData() {
			let { radix } = this.$store.state.GDV3.v3IndexGameAllData;
			let money = this.selectedNumLen * radix * this.rate * this.ratio;
			this.$store.commit('v3FootMoney', { num: this.selectedNumLen, money });
		}
	}
};
</script>
