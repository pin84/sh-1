<template>
	<view class="play">
		<ListCircle :list="list1" />

		<view class="title">两面</view>
		<ListSquare :list="list2" />
		<ListSquare :list="list3" itemWidth="50%" />
		<ListSquare :list="list4" />

		<view class="title">特码包三</view>
		<view class="c-box" @click.self='selectedBaosan' :class="{'c-box-active':isSelected}" >
			<ListPicker  @selctedObj='selctedArr' />
			<view class="odds">{{ obj5.odds }}</view>
		</view>
	</view>
</template>


<script>
import ListCircle from '@/pages/gamesIm/common/commonIm/ListCircleBgRandom';
import ListSquare from '@/pages/gamesIm/common/commonIm/ListSquare';
import ListPicker from '@/pages/gamesIm/common/commonIm/ListPicker';
export default {
	data() {
		return {
			isSelected:false,
			curSelectedArr:[0,1,2],
			list1: [],
			list2: [],
			list3: [],
			list4: [],
			obj5: 0,
			isHasSelected: 0,
			colorObj: {
				'#807f7f': ['0', '13', '14', '27'],
				'#38b81b': ['1', '4', '7', '10', '16', '19', '22', '25'],
				'#408ce8': ['2', '5', '8', '11', '17', '20', '23', '26'],
				'#e13f51': ['3', '6', '9', '12', '15', '18', '21', '24']
			}
		};
	},
	components: {
		ListCircle,
		ListSquare,
		ListPicker
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
		},
		'$store.state.GDV3.clearSelected': function(val) {
			this.isSelected =false
		}
	},

	created() {
		this.initData();
	},

	methods: {
		selectedBaosan(){
			if(this.isSelected){
				this.isSelected = false
				this.$store.commit('v3SelectedCount', -1);
			}else {
				this.isSelected = true
				this.$store.commit('v3SelectedCount', 1);
			}
		},
		
		selctedArr(arr){
			this.curSelectedArr = arr
		},
	
		addToBasketRandom(val) {
			let { n } = val;
			let randomArr = []
			randomArr.push(...this.list1,...this.list2,...this.list3,...this.list4,this.obj5)
			
			let len = randomArr.length - 1;
			while (n--) {
				let i = this.$buyDataHandler.createRandomNum(0,len)
				
				this.$store.commit('v3NumBasket', randomArr[i]);
			}
			this.$store.commit('v3IsShowNumBaket', true);
		},
		v3ToBuy() {
		let flag = 	this.addToBasket(false);
		if(!flag)return 
			//触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
			let ts = new Date().getTime();
			this.$store.commit('v3ToBuyNext', ts);
		},
		
		listHandler(arr){
			let temArr = []
			arr.forEach(item=>{
				if(item.active){
					temArr.push(item)
				}
			})
			return temArr
		},
		
		addToBasket(isShowBasket = true) {
			let temArr = [];
			let arr1 = this.listHandler(this.list1)
			let arr2 = this.listHandler(this.list2)
			let arr3 = this.listHandler(this.list3)
			let arr4 = this.listHandler(this.list4)
			temArr.push(...arr1,...arr2,...arr3,...arr4)
			
			if(this.isSelected){
				this.obj5.N = this.curSelectedArr.join(',')
				temArr.push(this.obj5)
			}
			
			

			let basketArr = this.$store.state.GDV3.numBasket;
			if (temArr.length === 0 && basketArr.length === 0) {
				this.$util.showConfirm({
					content: '您还没有勾选',
					showCancel: false
				});
				return;
			}
			let money = this.$store.state.GDV3.v3InputMoney;
			
			temArr.forEach(item => {
				
				item.money = money
				this.$store.commit('v3NumBasket', item);
			});
			if (isShowBasket) {
				this.$store.commit('v3IsShowNumBaket', true);
			}
			this.$store.commit('v3ClearSelected', new Date().getTime());
			return true
		},
		changeRate(val) {
			let { percentage } = val;

			this.list1.forEach(item => {
				item.odds = this.$buyDataHandler.setNumDecimal(item.MxO - (item.MxO - item.MiO) * percentage, 3);
			});
			this.list2.forEach(item => {
				item.odds = this.$buyDataHandler.setNumDecimal(item.MxO - (item.MxO - item.MiO) * percentage, 3);
			});
			this.list3.forEach(item => {
				item.odds = this.$buyDataHandler.setNumDecimal(item.MxO - (item.MxO - item.MiO) * percentage, 3);
			});
			this.list4.forEach(item => {
				item.odds = this.$buyDataHandler.setNumDecimal(item.MxO - (item.MxO - item.MiO) * percentage, 3);
			});

			this.list1.push({});
			this.list1.pop();

			this.list2.push({});
			this.list2.pop();

			this.list3.push({});
			this.list3.pop();

			this.list4.push({});
			this.list4.pop();

			let { MxO, MiO } = this.obj5;
			this.obj5.odds = this.$buyDataHandler.setNumDecimal(MxO - (MxO - MiO) * percentage, 3);
		},
		initData() {
			let { percentage, selectBack } = this.$store.state.GDV3.officialRate;
			let allArr = this.$store.state.GDV3.v3CurGame;
			if (!Array.isArray(allArr)) return;

			let obj1 = allArr[0];
			let list1 = [];
			obj1.C[0].C.forEach(item => {
				for (let [key, value] of Object.entries(this.colorObj)) {
					if (value.includes(item.N)) {
						item.bgcolor = key;
						continue;
					}
				}
				item.N1 = obj1.N + obj1.C[0].N
				item.odds = this.$buyDataHandler.setNumDecimal(item.MxO - (item.MxO - item.MiO) * percentage, 3);
				list1.push(item);
			});
			this.list1 = list1;
			
			

			let list2 = [];
			let list3 = [];
			let obj2 = allArr[2];
			obj2.C.forEach(outItem => {
				outItem.C.forEach(item => {
					item.N1 = outItem.N;
					item.odds = this.$buyDataHandler.setNumDecimal(item.MxO - (item.MxO - item.MiO) * percentage, 3);

					if (outItem.Id == 3171) {
						list3.push(item);
					} else {
						list2.push(item);
					}
				});
			});
			this.list2 = list2;
			this.list3 = list3;

			let list4 = [];
			let obj3 = allArr[3];
			obj3.C[0].C.forEach(item => {
				item.N1 = obj3.N;
				item.odds = this.$buyDataHandler.setNumDecimal(item.MxO - (item.MxO - item.MiO) * percentage, 3);

				list4.push(item);
			});

			let obj4 = allArr[4].C[0].C[0];
			obj4.N1 = '豹子';
			obj4.odds = this.$buyDataHandler.setNumDecimal(obj4.MxO - (obj4.MxO - obj4.MiO) * percentage, 3);
			list4.push(obj4);
			this.list4 = list4;

			let obj5 = allArr[1].C[0].C[0];
			let { MxO, MiO } = obj5;
			obj5.N1 = allArr[1].N
			obj5.N = this.curSelectedArr.join(',')
			obj5.odds = this.$buyDataHandler.setNumDecimal(obj5.MxO - (obj5.MxO - obj5.MiO) * percentage, 3);
			this.obj5 = obj5;

		
		}
	}
};
</script>

<style lang="scss" scoped>
.play {
	// height: 100%;
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
	.c-box-active{
		background-color: #ffd800;
	}
}
</style>
