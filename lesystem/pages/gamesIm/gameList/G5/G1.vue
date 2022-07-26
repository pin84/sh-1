<template>
	<view class="play">
		<block v-for="(title, idx) in titleList">
			<view class="title">{{ title }}</view>
			<ListSquare :list="allData[idx]" />
		</block>
	</view>
</template>

<script>
import ListCircle from '@/pages/gamesIm/common/commonIm/ListCircleBgRandom';
import ListSquare from '@/pages/gamesIm/common/commonIm/ListSquare';
// import ListPicker from '@/pages/gamesIm/common/commonIm/ListPicker';
export default {
	data() {
		return {
			titleList: ['特码', '正码一', '正码二', '正码三', '正码四', '正码五', '正码六', '正码七', '总和'],
			allData: []
		};
	},
	components: {
		ListCircle,
		ListSquare
		// ListPicker
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
			let randomArr = [];
			this.allData.forEach(arr => {
				randomArr.push(...arr);
			});
			let { n } = val;
			this.$buyOptions.addToBasketRandomCredit(randomArr, n);
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
			this.allData.forEach(outItem => {
				outItem.forEach(item => {
					if (item.active) {
						selectArr.push(item);
					}
				});
			});

			return this.$buyOptions.addToBasket({ selectArr, isShowBasket });
		},
		changeRate(val) {
			let { percentage } = val;

			this.allData.forEach(outItem => {
				outItem.forEach(item => {
					item.odds = this.$buyDataHandler.setNumDecimal(item.MxO - (item.MxO - item.MiO) * percentage, 3);
				});
				outItem.push({});
				outItem.pop();
			});
		},
		initData() {
			this.titleList = ['特码', '正码一', '正码二', '正码三', '正码四', '正码五', '正码六', '正码七', '总和'];
			let { id } = uni.getStorageSync('indexGame');
			if (id == 6) {
				this.titleList = ['特码', '正码一', '正码二', '正码三', '正码四', 'Y总和单双'];
			}
			let { percentage, selectBack } = this.$store.state.GDV3.officialRate;
			let allArr = this.$store.state.GDV3.v3CurGame.C;

			// let arr = [];
			// arr.push(this.createlist(allArr, percentage, [167, 166, 168, 729,660,669,684,736,209,208,211,585]));
			// arr.push(this.createlist(allArr, percentage, [139, 138, 140, 718,173,172,175,581]));
			// arr.push(this.createlist(allArr, percentage, [143, 142, 144, 723]));
			// arr.push(this.createlist(allArr, percentage, [147, 146, 148, 724]));
			// arr.push(this.createlist(allArr, percentage, [151, 150, 152, 725]));
			// arr.push(this.createlist(allArr, percentage, [155, 154, 156, 726]));
			// arr.push(this.createlist(allArr, percentage, [159, 158, 160, 727]));
			// arr.push(this.createlist(allArr, percentage, [163, 162, 164, 728]));
			// arr.push(this.createlist(allArr, percentage, [135, 133, 136]));

			let hArr = [];
			let sstr = ['Y总和单双', '总和'];
			this.titleList.forEach(str => {
				let arr = allArr.filter(item => item.N.includes(str));
				if (sstr.includes(str)) {
					arr = allArr.filter(item => item.N.startsWith(str.slice(0, 1)));
				}
				let tem = [];
				arr.forEach(obj => {
					obj.C.forEach(item => {
						item.N1 = obj.N;
						item.odds = this.$buyDataHandler.setNumDecimal(item.MxO - (item.MxO - item.MiO) * percentage, 5);
						tem.push(item);
					});
				});
				hArr.push(tem);
			});
			this.allData = hArr;
		},

		createlist(allArr, percentage, ids = []) {
			let list = [];
			ids.forEach(id => {
				let obj = allArr.find(outItem => outItem.Id == id);
				if (obj) {
					obj.C.forEach(item => {
						item.N1 = obj.N;
						item.odds = this.$buyDataHandler.setNumDecimal(item.MxO - (item.MxO - item.MiO) * percentage, 3);
						list.push(item);
					});
				}
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
