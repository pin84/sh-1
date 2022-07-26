<template>
	<view><ListCircleCustom :titleArr="titleArr" @selectedNum="selectedNum" :isShowSort="isShowSort" :selectTypeArr="selectTypeArr" :numArr="numArr" /></view>
</template>

//只能用于大小单双 
<script>
import playList from './playList.js';
import ListCircleCustom from '@/pages/games/common/ListCircleCustom.vue';
export default {
	data() {
		return {
			gameConfig: {},
			selectTypeArr: [{ type: '全' }, { type: '清' }],
			numArr: [{	num: '大'},{num: '小'},{num: '单'},{num: '双'}], 
			isShowSort: true,
			titleArr: ['百位', '十位', '个位'],
			selectedObj:{}, //未处理的数据
			selectedArr: [], //处理后的数据 。
			rateObj:{},
			lenLimit: 5
		};
	},
	components: {
		ListCircleCustom
	},

	watch: {
		'$store.state.GDV3.clearSelected': function(val) {
			// this.selectedObj = {};
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
				this.rateObj = val
				this.setData();
			},
			deep: true
		}
	},

	created() {
		this.initPage();
	},
	mounted() {
		this.rateObj = this.$store.state.GDV3.officialRate
	},

	methods: {
		initPage() {
			let { I,C } = this.$store.state.GDV3.v3CurGame;
			
			let { MB, MxO, MiO } = C[0];
			let ratioObj = {
				MB,
				MxO,
				MiO
			};
			this.$store.commit('v3RatioInitValue', ratioObj);
			
			this.gameConfig = playList[I];

			let { titleArr, isShowSort, numArr, selectTypeArr, lenLimit } = this.gameConfig;
			this.titleArr = titleArr;
			this.isShowSort = isShowSort;
			this.selectTypeArr = selectTypeArr;
			this.lenLimit = lenLimit;
		},
		addToBasketRandom(n) {
			let temArr = [];
			this.numArr.forEach(item=>{
				temArr.push(item.num)
			})
			while (n--) {
				let obj = this.$buyDataHandler.createBuyObj()
				let i = this.$buyDataHandler.createRandomNum(0,3)
				let j = this.$buyDataHandler.createRandomNum(0,3)
				obj.numStr =temArr[i] + '|' + temArr[j] 
				obj.orderStr =temArr[i] + ',' + temArr[j] 
				this.$store.commit('v3NumBasket', obj);
			}
			this.$store.commit('v3IsShowNumBaket', true);
		},
		v3ToBuy() {
			this.addToBasket(false)
			
			//触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
			let ts = new Date().getTime();
			this.$store.commit('v3ToBuyNext', ts);
		},
		addToBasket(isShowBasket = true) {

			if (this.selectedArr.length != 0) {
				let obj = this.$buyDataHandler.createBuyObj()
				let {num,money} = this.$store.state.GDV3.footMoney
				obj.len = num
				obj.money = money
				obj.numStr = this.selectedArr.join('|')
				obj.orderStr = this.selectedArr.join('|').replace(/\,/g,'').replace(/\|/g,',')
				
				this.$store.commit('v3NumBasket', obj);
				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
				this.$store.commit('v3ClearSelected', new Date().getTime());
				this.selectedArr = []
				this.selectedObj = {}
				if (isShowBasket) {
					this.$store.commit('v3IsShowNumBaket', true);
				}
			} else {
				this.$util.showConfirm({ content: '号码选择不完整，请重新选择', showCancel: false });
			}
		},
		selectedNum(obj) {
			this.selectedObj = Object.assign(this.selectedObj, obj);
			let selectedArr = []
			this.titleArr.forEach(title =>{
				if(this.selectedObj[title] && this.selectedObj[title].length !== 0){
					let arr = []
					this.selectedObj[title].forEach(item=>{
						arr.push(item.num)
					})
					selectedArr.push(arr)
				}
			})
			
			if(selectedArr.length < 2){
				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
			} else {
				this.selectedArr = selectedArr
				this.setData()
			}
		},
		
		setData(){
			let {rate,ratio} = this.rateObj
			let num = this.selectedArr.reduce((accumulator,currentValue)=>{
				return accumulator * currentValue.length
			},1)
			let {radix} = this.$store.state.GDV3.v3IndexGameAllData
			let money = this.$buyDataHandler.handlerMoneyDecimal(num * radix * rate * ratio)
			
			this.$store.commit('v3FootMoney', { num, money });
			this.$store.commit('v3selectedNum', this.selectedArr);
		}
	}
};
</script>

<style></style>
