<template>
	<view><LongHuDou :list="C1" /></view>
</template>

<script>
import LongHuDou from '@/pages/gamesIm/common/commonIm/LongHuDou';
export default {
	data() {
		return {
			randomArr: [],
			C1: [],
		};
	},
	components: {
		LongHuDou
	},
	watch: {
		'$store.state.GDV3.officialRate': {
			handler: function(val) {
				this.initData();
			},
			deep: true
		},

		'$store.state.GDV3.v3AddRandom': {
			handler: function(val) {
				this.addToBasketRandom(val);
			},
			deep: true
		},
		'$store.state.GDV3.addToBasket': {
			handler: function(val) {
				this.addToBasket();
			},
			deep: true
		},

	'$store.state.GDV3.v3ToBuy': function(val) {
			this.v3ToBuy();
		}
	},

	created() {
		this.initData();
	},
	methods: {
		v3ToBuy() {
			this.addToBasket(false);
			//触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
			let ts = new Date().getTime();
			this.$store.commit('v3ToBuyNext', ts);
		},
		addToBasket(isShowBasket = true) {
			let money = this.$store.state.GDV3.v3InputMoney
			let temArr = [];
			this.C1.forEach(outItem=>{
				outItem.C.forEach(item=>{
					if(item.active){
						item.money = money
						temArr.push(item);
					}
				})
			})

			let basketArr = this.$store.state.GDV3.numBasket;
			if (temArr.length === 0 && basketArr.length === 0) {
				this.$util.showConfirm({
					content: '您还没有勾选',
					showCancel: false
				});
				return;
			}
			temArr.forEach(item => {
				this.$store.commit('v3NumBasket', item);
			});
			this.$store.commit('v3ClearSelected', new Date().getTime());
			if (isShowBasket) {
				this.$store.commit('v3IsShowNumBaket', true);
			}
		},
		addToBasketRandom(val) {
			let { n } = val;
			console.log(this.C1);
			this.$buyOptions.addToBasketRandomCreditLongHuDou(this.C1,n)
		},

		initData() {
			let val = this.$store.state.GDV3.officialRate;

			let { percentage, selectBack } = val;
			let C = this.$store.state.GDV3.v3CurGame;
			if (JSON.stringify(C) === '{}') return;
			
			let nameArr 
			let {id} = uni.getStorageSync('indexGame')
			if(id != 6){
				nameArr = ['1vs2', '1vs3', '1vs4','1vs5','1vs6', '1vs7','1vs特', '2vs3', '2vs4','2vs5','2vs6','2vs7', '2vs特', '3vs4', '3vs5', '3vs6', '3vs7', '3vs特','4vs5','4vs6','4vs7', '4vs特','5vs6','5vs7','5vs特','6vs7','6vs特','7vs特',]
			} else {
				nameArr = ['1vs2', '1vs3', '1vs4','1vs特', '2vs3', '2vs4','2vs特', '3vs4',  '3vs特', '4vs特']
			}
			
			let temArr1 = [];
			C.C.forEach((item,idx) => {
				item.N1 = nameArr[idx];
				
				item.C.forEach(inItem => {
					inItem.N1 = item.N
					inItem.odds = this.$buyDataHandler.setNumDecimal(inItem.MxO - (inItem.MxO - inItem.MiO) * percentage, 3);
				});

				temArr1.push(item);
			});

			this.C1 = temArr1;
		}

	}
};
</script>

<style lang="scss" scoped></style>
