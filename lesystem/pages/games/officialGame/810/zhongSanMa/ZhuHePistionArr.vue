<template>
	<view>
		<view><PositionRandom :listArr="positioArr" @toggleCheck="toggleCheck" :limitLen='limitLen' /></view>
		<view><ListCircleRandomNum :titleArr="titleArr" :numArr="numArr" @selectedNum="selectedNum" /></view>
	</view>
</template>

<script>
import playList from './playList.js';
import ListCircleRandomNum from '@/pages/games/common/ListCircleRandomNum';
import PositionRandom from '@/pages/games/officialGame/common/PositionRandom_1';
export default {
	data() {
		return {
			gameConfig: {},
			isShowPosition: true,
			positioArr: [],
			titleArr: ['直选和值'],
			selectedObj: {},
			rate: 1,
			ratio: 1,
			odds: 1,
			num: 0,
			money: 0,
			numArr: [],
			positionNum:10,
			limitLen:2,
			randomArr:[],
			sumlen:0
		};
	},
	components: {
		ListCircleRandomNum,
		PositionRandom
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
	toggleCheck(obj){
		let {s,temArr}=obj
		this.positionNum = temArr
		this.sumlen = s
		this.selectedNum()
	},
		initPage(n) {
			let { rate, ratio, odds } = this.$store.state.GDV3.officialRate;
			this.rate = rate;
			this.ratio = ratio;
			this.odds = odds;

			if (!n) {
				let { N } = this.$store.state.gameData.curGame;
				n = N;
			}
			let gameConfig = playList[n];
			this.gameConfig = gameConfig;

			let { len, titleArr, positioArr, start,positionNum,limitLen } = gameConfig;
			this.titleArr = titleArr;
			this.positioArr = positioArr;
			this.positionNum = positionNum;
			this.limitLen = limitLen || 2

			this.numArr = [];
			let i = start || 0;
			while (i < len) {
				this.numArr.push({ num: i });
				i++;
			}
			let {C} = this.$store.state.gameData.curGame
			this.randomArr = C
		},
		v3ToBuy() {
			this.addToBasket();
			this.$emit('buy810');
		},
		addToBasket() {
			let basket = this.$store.state.GDV3.selectedNum;
			
			if (JSON.stringify(basket) === '{}') {
				return;
			}
			
			let {C,N}  = this.$store.state.gameData.curGame
			

			if (basket.length !== 0) {
				let temArr = [];
				basket.forEach(item => {
					temArr.push(item.num);
				});
				
				// console.log(this.$dataHandler);
					let { num, money } = this.$store.state.GDV3.footMoney;
					let c = this.gameConfig.zhuhe(this.positionNum )
			
				c.forEach(name=>{
					let obj = this.$buyDataHandler.createBuyObj();
					let obj1 = this.randomArr.find(item=>item.N.includes(name))
					
					obj.gName = obj1.N 
					obj.I =obj1.I
					obj.len = num / this.sumlen
					obj.money = money / this.sumlen
					
					obj.numStr = temArr.join('|');
					obj.orderStr = temArr.join(',');
					
						
						this.$store.commit('v3NumBasket', obj);
				})
				

	
				
				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
				this.$store.commit('v3ClearSelected', new Date().getTime());
			} else {
				this.$util.showConfirm({ content: '号码选择不完整，请重新选择', showCancel: false });
			}
		},
		selectedNum(obj) {
			this.selectedObj = Object.assign(this.selectedObj, obj);
			if(JSON.stringify(this.selectedObj) === '{}')return
			let arr = this.selectedObj[this.titleArr[0]];
			let length = arr.length;
			if (length !== 0) {
				let temArr = [];
				arr.forEach(item => {
					temArr.push(item.num);
				});

				let s = 0;
				while (temArr.length) {
					let n = temArr.pop();
					let res = this.gameConfig.dataHandler(n);
					s += res;
				}
				
				let c = this.gameConfig.countLen(this.positionNum)
				
				s = s * c

				let { rate, ratio } = this.$store.state.GDV3.officialRate;
				let {radix} = this.$store.state.GDV3.v3IndexGameAllData
				
				this.$store.commit('v3FootMoney', { num: s, money: radix * s * rate * ratio });
				this.$store.commit('v3selectedNum', arr);
			} else {
				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
			}
		}
	}
};
</script>

<style></style>
