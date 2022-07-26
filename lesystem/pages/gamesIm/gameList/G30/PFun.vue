<template>
	<view><ListSquareCustom :title="titleArr[0]" @selectedNum="selectedNum" :isShowSort="isShowSort" :selectTypeArr="selectTypeArr" :numArr="numArr" /></view>
</template>

<script>
import playList from './playList.js';
import ListSquareCustom from '@/pages/gamesIm/common/commonIm/ListSquareCustom.vue';
export default {
	data() {
		return {
			gameConfig: {},
			selectTypeArr: [{ type: '全' }, { type: '清' }],
			numArr: [],
			isShowSort: true,
			titleArr: ['百位', '十位', '个位'],
			selectedArr: [],
		};
	},
	components: {
		ListSquareCustom
	},

	watch: {
		'$store.state.GDV3.clearSelected': function(val) {
			this.selectedArr = [];
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
				this.changeRate();
				this.selectedNum();
			},
			deep: true
		},

		// '$store.state.GDV3.v3CurGame': {
		// 	handler: function(val) {
		// 		this.$store.commit('setNumBasket', []);
		// 		this.initPage();
		// 	},
		// 	deep: true
		// }
	},

	created() {
		this.initPage();
		// this.initData()
	},

	methods: {
		initPage() {
			let { I, C } = this.$store.state.GDV3.v3CurGame;
			let {rate,ratio,percentage} = this.$store.state.GDV3.officialRate
			let obj = {};
			let n = 0;
			C.forEach(item => {
				if (item.MxO > n) {
					obj = item;
					n = item.MxO;
				}
			});
			let { MB, MxO, MiO } = obj;
			let ratioObj = {
				MB,
				MxO,
				MiO
			};
			this.$store.commit('v3RatioInitValue', ratioObj);
			this.gameComfig = playList[I];
			let { titleArr } = this.gameComfig;
			this.titleArr = titleArr;
			let dataArr = 	this.gameComfig.divideData(C)
			dataArr.forEach(item => {
				item.odds = this.$buyDataHandler.setNumDecimal((item.MiO + (item.MxO - item.MiO) * percentage) * rate, 3);
			});
			this.numArr = dataArr
			
		},
		
		changeRate(){
			let {rate,ratio,percentage} = this.$store.state.GDV3.officialRate
			this.numArr.forEach(item => {
				item.odds = this.$buyDataHandler.setNumDecimal((item.MiO + (item.MxO - item.MiO) * percentage) * rate , 3);
			});
			this.numArr.push({})
			this.numArr.pop()
		},
	
		v3ToBuy() {
			this.addToBasket(false)
			
			//触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
			let ts = new Date().getTime();
			this.$store.commit('v3ToBuyNext', ts);
		},
		addToBasket(isShowBasket=true) {
			let basket = this.$store.state.GDV3.selectedNum;
			if(!Array.isArray(basket)) return 
			;
			if (basket.length !== 0) {
				basket.forEach(item=>{
					let obj = this.$buyDataHandler.createBuyObj()
					obj.I = item.I
					obj.numStr = item.N1
					obj.orderStr = item.N1
					obj.gName='定位胆'
					obj.gName_1=item.N.split('_')[0]
					this.$store.commit('v3NumBasket', obj);
				})
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

		
		selectedNum(){
			let i = 0
			let selectedArr = []
			let maxMxO = 0
			let maxObj = {}
			this.numArr.forEach(item=>{
				if(item.active){
					i++
					selectedArr.push(item)
					if(item.MxO > maxMxO){
						maxObj = item
						maxMxO = item.MxO
					}
				}
			})
			
			if (i !== 0) {
				let  {rate,ratio} = this.$store.state.GDV3.officialRate
				let money = this.$buyDataHandler.handlerMoneyDecimal(i * 2 * rate * ratio)
				this.$store.commit('v3FootMoney', { num: i, money });
				this.$store.commit('v3selectedNum', selectedArr);
				this.$store.commit('v3RatioCurValue', maxObj);
			} else {
				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
				this.$store.commit('v3RatioCurValue', {});
			}
		}
	}
};
</script>

<style></style>
