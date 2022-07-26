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
			isHasSelected: 0
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
			while (n--) {
				let i = Math.random() > 0.5 ? 1 : 0;
				let len = this.randomArr.length - 1;
				let n1 = this.$buyDataHandler.createRandomNum(0, len);
				let obj = this.randomArr[n1];
				let obj1 = obj.C[i];
				let bObj = {};
				bObj.N = obj.N;
				bObj.money = 22;
				// bObj.gName = obj.N
				bObj.C = obj1;

				console.log(bObj);
				this.$store.commit('v3NumBasket', bObj);
			}
			this.$emit('showBasket');
		},

		initData() {
			let val = this.$store.state.GDV3.officialRate;

			let { percentage, selectBack } = val;
			let C = this.$store.state.GDV3.v3CurPlayList;
			console.log(C.C);
			if (JSON.stringify(C) === '{}') return;
			
			let nameArr = ['1vs2', '1vs3', '1vs4', '1vs特', '2vs3', '2vs4', '2vs特', '3vs4', '3vs特', '4vs特']
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
