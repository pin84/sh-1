<template>
	<view><ListCircle :titleArr="titleArr" @selectedNum="selectedNum" :isShowSort="false" :numLen="numLen" :isAddZero="false" :listStart="listStart" :size="4" :isShowTitle='isShowTitle' /></view>
</template>

<script>
import ListCircle from '@/pages/gamesIm/common/ListCircle';
import playList from './playList.js';
export default {
	data() {
		return {
			gameConfig: {},
			titleArr: ['组三'],
			lenLimit: 3 ,//
			selectedArr:[],
			listStart:0, //列表开始的值
			numLen:10, // 列表最大值 ，默认为10（必须）
			isShowTitle:true, //是否显示全大小之类的
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
				this.handlerData();
			},
			deep: true
		}
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

			let { titleArr, lenLimit, listStart,numLen ,isShowTitle} = this.gameConfig;
			this.titleArr = titleArr;
			this.lenLimit = lenLimit;
			this.listStart = listStart || 0
			this.numLen = numLen || 10
			this.isShowTitle = isShowTitle 
		},
		v3ToBuy() {
			this.addToBasket(false);
			//触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
			let ts = new Date().getTime();
			this.$store.commit('v3ToBuyNext', ts);
		},
		addToBasketRandom(n) {
			while (n--) {
				let obj = this.gameConfig.addToBasketRandom();
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
				
				this.selectedArr = []
				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
				if (isShowBasket) {
					this.$store.commit('v3IsShowNumBaket', true);
				}
				this.$store.commit('v3ClearSelected', new Date().getTime());
			}
		},
		selectedNum(selected) {
			let arr = Object.values(selected)[0];
			if (arr.length < this.lenLimit) {
				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
				return;
			}
			
			this.selectedArr = arr
			this.handlerData()
		},

		handlerData() {
			let arr = []
			this.selectedArr.forEach(item=>{
				arr.push(item.num)
			})
			if(arr.length == 0) return
			let obj = this.gameConfig.dataHandler(arr);
			let {radix} = this.$store.state.GDV3.v3IndexGameAllData
			obj.money = obj.money / 2 * radix
			this.$store.commit('v3FootMoney', { num: obj.len, money: obj.money });
			this.$store.commit('v3selectedNum', obj);
		}
	}
};
</script>

<style></style>
