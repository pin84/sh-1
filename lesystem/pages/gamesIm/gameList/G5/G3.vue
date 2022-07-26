<template>
	<view class="play">
		<ListCircleBgRandom :list="list1" />
		<ListSquare :list="list2" />
	</view>
</template>

<script>
import ListSquare from '@/pages/gamesIm/common/commonIm/ListSquare';
import ListCircleBgRandom from '@/pages/gamesIm/common/commonIm/ListCircleBgRandom_1';
export default {
	data() {
		return {
			list1: [],
			list2: []
		};
	},
	components: {
		ListSquare,
		ListCircleBgRandom
	},
	watch: {
		'$store.state.GDV3.officialRate': {
			handler: function(val) {
				this.changeRate(val);
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
		addToBasketRandom(val) {
			let { n } = val;
			let randomArr = [];
			randomArr.push(...this.list1,...this.list2);
			this.$buyOptions.addToBasketRandomCredit(randomArr,n)
		},
		async v3ToBuy() {
			let flag = await this.addToBasket(false);
			if (!flag) return;
			//触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
			let ts = new Date().getTime();
			this.$store.commit('v3ToBuyNext', ts);
		},

		addToBasket(isShowBasket = true) {
			let selectArr = [];
			
			let arr1 = this.$buyOptions.filteActive(this.list1)
			let arr2 = this.$buyOptions.filteActive(this.list2)
			selectArr.push(...arr1,...arr2)
			
			return this.$buyOptions.addToBasket({ selectArr, isShowBasket });
		},
		
		
		changeRate(val) {
			let { percentage } = val;
			this.$buyOptions.changeRateOption(this.list1, percentage);
			this.$buyOptions.changeRateOption(this.list2, percentage);
		},

	

		initData() {
			let { percentage, selectBack } = this.$store.state.GDV3.officialRate;
			let curObj = this.$store.state.GDV3.v3CurGame;
			let list1 = [];
			let obj1 = curObj.C[0];
			obj1.C.forEach(item => {
				item.N1 = obj1.N;
				item.odds = this.$buyDataHandler.setNumDecimal(item.MxO - (item.MxO - item.MiO) * percentage, 3);
				list1.push(item);
			});
			this.list1 = list1;

			let list2 = [];
			let ids = curObj.PIs.split(',')
			let allList = this.$store.state.GDV3.v3AllCurPlayList;
			let temArr2 = this.createlist(allList, percentage, ids);
			let {id} = uni.getStorageSync('indexGame')
			if(id == 6){
				let c1 = curObj.C[1].C
				let c2 = curObj.C[2].C
				this.setOdds(c1,percentage,curObj.C[1].N)
				this.setOdds(c2,percentage,curObj.C[2].N)
				list2.push(...c1,...c2)
			}
			list2.push(...temArr2);
			this.list2 = list2;
		},
		setOdds(arr,percentage,N1){
			arr.forEach(item=>{
				item.N1 = N1
				item.odds = this.$buyDataHandler.setNumDecimal(item.MxO - (item.MxO - item.MiO) * percentage, 3);
			})
		},
		createlist(allArr, percentage, ids = []) {
			let list = [];
			ids.forEach(id => {
				let obj = allArr.find(outItem => outItem.Id == id);
				if (!obj) return;
				obj.C.forEach(item => {
					item.N1 = obj.N;
					item.odds = this.$buyDataHandler.setNumDecimal(item.MxO - (item.MxO - item.MiO) * percentage, 3);
					list.push(item);
				});
			});
			return list;
		}
	}
};
</script>

<style lang="scss" scoped>
.play {
	height: 100%;
	background-color: #fff;
	overflow: scroll;
	.title {
		background-color: #e5e5e5;
		text-align: center;
		padding: 10rpx;
		color: #5d5d5d;
		font-weight: 600;
	}
	.c-box {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30rpx;
		.odds {
			color: #e13f51;
			margin-left: 20rpx;
		}
	}
	.c-box-active {
		background-color: #ffd800;
	}
}
</style>
