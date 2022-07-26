<template>
	<view class="G260">
		<G1 v-if="playType == '1'" />
		<G2 v-if="playType == '2'" />
		<G3 v-if="playType == '3'" />
		<G11 v-if="playType == '11' || playType == '8'" />
		<GLongHuDou v-if="playType == '10' || playType == '7'" />
	</view>
</template>

<script>
import playList from './playList';
import G1 from './G1';
export default {
	data() {
		return {
			isShowBasket: false,
			isShowRecord: false,
			gameConfig: {},
			playType: '',
			titleArr: [],
			isSelectedName: 0
		};
	},
	components: {
		G1,
		G2: () => import('./G2'),
		G3: () => import('./G3'),
		G11: () => import('./G11'),
		GLongHuDou: () => import('./GLongHuDou'),
	},

	watch: {
		'$store.state.GDV3.v3CurGame': {
			handler: function(val) {
				this.initData(val);
			}
		},

		'$store.state.GDV3.v3ShowRecord': function(val) {
			this.isShowRecord = val;
		},
		'$store.state.GDV3.v3IsShowNumBaket': function(val) {
			this.isShowBasket = val;
		}
	},

	created() {
		this.initData();
	},
	methods: {
		initData(val) {
			this.$store.commit('v3NumBasket', 'clearAll');
			this.playType = '';
			if (!val) {
				val = this.$store.state.GDV3.v3CurGame;
			}

			let { Id } = val;

			if (!Id) return;
			setTimeout(() => {
				let {id} = uni.getStorageSync('indexGame')
				let sameIds
				if(id != 6){
					sameIds = [3, 4, 5, 6, 7, 8, 9];
				} else {
					sameIds = [3, 4, 5, 6];
				}
				if (sameIds.includes(Id)) {
					this.playType = 3;
				} else {
					this.playType = Id;
				}
			}, 0);

			let obj = val.C[0].C[0];
			this.$store.commit('v3RatioInitValue', obj);
		},

		selectedName(n) {
			this.isSelectedName = n;
		},

		//切换  我要投注 或 投注记录页面
		changeTal(index) {
			this.TabCur = index;
			index == 0 ? (this.isShowRecord = false) : (this.isShowRecord = true);
		}
	}
};
</script>
