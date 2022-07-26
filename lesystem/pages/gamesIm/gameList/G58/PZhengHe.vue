<template>
	<view class="play" >
		<view class="special-box" v-for="(item, idx) in C1" :key="idx">
			<view class="special ">
				<text class="text-bold">{{ item.n }}</text>
			</view>
			<view class="special-list">
				<view class="special-item" @click="select(v)" :class="{ active: v.active }" v-for="(v, index) in item.C" :key="index">
					<text>{{ v.N }}</text>
					<text style="color: #c42133;">{{ v.odds }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			randomArr:[],
			C1: [],
			C2: [],
			isHasSelected: 0
		};
	},
	watch: {
		'$store.state.GDV3.clearSelected': {
			handler: function(val) {
				this.cancelAll();
			}
		},
		'$store.state.GDV3.officialRate': {
			handler: function(val) {
				this.initData();
			},
			deep: true
		},	
		
		'$store.state.GDV3.v3AddRandom': {
			handler: function(val) {
				this.addToBasketRandom(val)
			},
			deep: true
		},
		'$store.state.GDV3.addToBasket': {
			handler: function(val) {
				this.addToBasket()
			},
			deep: true
		},
		
		'$store.state.GDV3.v3ToBuy': function(val){
			this.v3ToBuy()
		},
		
		// '$store.state.GDV3.v3CurPlayList': {
		// 	handler:function(val){
		// 		
		// 		this.initData();
		// 	},
		// 	deep:true
		// }
		
	},

	created() {
		this.initData();
	},
	methods: {
		v3ToBuy(){
			this.addToBasket(false)
			//触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
			let ts = new Date().getTime();
			this.$store.commit('v3ToBuyNext', ts);
		},
		addToBasket(isShowBasket=true){
			let money = this.$store.state.GDV3.v3InputMoney
			let temArr = []
			this.C1.forEach(outItem => {
				outItem.C.forEach(item=>{
					if(item.active){
						item.money = money
						temArr.push(item)
					}
				})
			});
			
			let basket = this.$store.state.GDV3.numBasket;
			
			if(temArr.length ===0 && basket.length === 0){
				this.$util.showConfirm({
					content:'您还没有勾选',
					showCancel:false
				})
				return
			}
			
			console.log(temArr)
			
			
			temArr.forEach(item=>{
				this.$store.commit('v3NumBasket', item);
			})
		
			
			if(isShowBasket){
				this.$store.commit('v3IsShowNumBaket',true)
			}
			this.cancelAll() 
		},
		addToBasketRandom(val){
			let {n} = val
			while(n--){
				let i = Math.random() > 0.5 ? 1 : 0
				let len = this.randomArr.length -1
				let n1 = this.$buyDataHandler.createRandomNum(0,len)
				let obj = this.randomArr[n1]
				let obj1 = obj.C[i]
				let bObj = {}
				bObj.N = obj.N
				bObj.money = 22;
				// bObj.gName = obj.N
				bObj.C = obj1
				
				console.log(bObj)
				this.$store.commit('v3NumBasket', bObj);
			}
			this.$emit('showBasket');
		},
		cancelAll() {
			this.C1.forEach(item => {
				item.C.forEach(inItem=>{
					if(inItem.active){
							inItem.active = false
					}
				})
			});
			this.refreshPage();
			this.$store.commit('v3IsHasSelected', false);
		},
		select(obj) {
			if (obj.active) {
				obj.active = false;
				this.isHasSelected--;
			} else {
				obj.active = true;
				this.isHasSelected++;
			}

			this.refreshPage();
			if (this.isHasSelected) {
				this.$store.commit('v3IsHasSelected', true);
			} else {
				this.$store.commit('v3IsHasSelected', false);
			}
		},
		initData() {
			let { percentage, selectBack } = this.$store.state.GDV3.officialRate;
			let arr = this.$store.state.GDV3.v3CurPlayList.C;
			
			if(!arr)return
			
			let kvArr = [
				{
					ids:[130,131],
					n:'特码',
					C:[]
				},	{
					ids:[118,119],
					n:'正码一',
					C:[]
				},	{
					ids:[121,122],
					n:'正码二',
					C:[]
				},{
					ids:[124,125],
					n:'正码三',
					C:[]
				},{
					ids:[127,128],
					n:'正码四',
					C:[]
				},
				{
					ids:[115,116,117],
					n:'总和',
					C:[]
				},
			];

			kvArr.forEach((kv) => {
				let temArr = arr.filter(item => kv.ids.includes(item.Id));
				temArr.forEach(item=>{
					kv.C.push(...item.C)
				})
				
				kv.C.forEach(inItem=>{
					inItem.N1 = temArr[0].N
					inItem.odds = this.$buyDataHandler.setNumDecimal(inItem.MxO - (inItem.MxO - inItem.MiO) * percentage, 3);
				})
			});
			console.log(kvArr)
			this.C1 = kvArr;
		},
		refreshPage() {
			this.C1.push({});
			this.C1.pop();
		}
	}
};
</script>

<style lang="scss" scoped>
.play {
	height: 100%;
	padding: 5rpx;
	background-color: #e5e5e5;
	overflow: scroll;
	.special-box {
		.special {
			position: relative;
			padding: 5rpx 20rpx;
			background-color: #e5e5e5;
			text-align: center;
			.text-bold {
				font-size: 30rpx;
				color: #5d5d5d;
			}
		}
		.special-list {
			display: flex;
			flex-wrap: wrap;
			// justify-content: space-around;
			border: 1px solid #f3f3f3;
			width: 100%;
			.special-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 25%;
				border: 1px solid #e3e3e3;
				background-color: #fff;
				border-radius: 15rpx;
				padding: 5rpx 0;
				.text-name {
					color: #ff4372;
					font-weight: 600;
				}
				.text-name-b {
					color: #6ebaff;
				}
			}
			.active {
				background-color: #ffd800;
			}

			.w_50 {
				width: 50%;
			}
		}
	}
}
</style>
