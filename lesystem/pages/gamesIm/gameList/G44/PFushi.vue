<template>
	<view><ListCircle :titleArr="titleArr" @selectedNum="selectedNum" :numLen="10" :isAddZero="false" :listStart="0" :size="4" :isShowSort="isShowSort" /></view>
</template>

<script>
import playList from './playList.js';
import ListCircle from '@/pages/gamesIm/common/ListCircle';
export default {
	data() {
		return {
			gameConfig: {},
			titleArr: ['百位', '十位', '个位'],
			selectedObj: {},
			isShowSort: false,
			randomArr: []
		};
	},
	components: {
		ListCircle
	},

	watch: {
		'$store.state.GDV3.clearSelected': function(val) {
			this.selectedObj = {};
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
				this.selectedNum();
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
			let gameConfig = playList[I];
			this.randomArr = C;
			if (!gameConfig) {
				this.$util.showToast({ title: 'config undefind!' });
				return;
			}

			let { MB, MxO, MiO } = C[0];
			let ratioObj = {
				MB,
				MxO,
				MiO
			};
			this.$store.commit('v3RatioInitValue', ratioObj);

			this.gameConfig = gameConfig;
			let { titleArr, isShowSort } = gameConfig;
			this.titleArr = titleArr;
			this.isShowSort = isShowSort || false;
		},
		addToBasketRandom(n) {
			while (n--) {
				let obj = this.gameConfig.addToBasketRandom(this.randomArr);
				this.$store.commit('v3NumBasket', obj);
			}
			this.$store.commit('v3IsShowNumBaket', true);
		},
		async v3ToBuy() {
			let { I } = this.$store.state.GDV3.v3CurGame;
			let showTipsList = [1297];

			let flag = showTipsList.includes(I);
			if (flag) {
				let active = await this.$util.showConfirm({ content: '此注单为单挑模式, 最高派奖30000元' });

				if (!active) return;
			}
			
			this.addToBasket(false)
		
			//触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
			let ts = new Date().getTime();
			this.$store.commit('v3ToBuyNext', ts);
		},
		addToBasket(isShowBasket = true) {
			let basket = this.$store.state.GDV3.selectedNum;

			if (JSON.stringify(basket) == '{}') {
				this.$util.showConfirm({ content: '号码选择不完整，请重新选择', showCancel: false });
				return;
			}

			if (Array.isArray(basket)) {
				basket.forEach(item => {
					this.$store.commit('v3NumBasket', item);
				});
			} else {
				this.$store.commit('v3NumBasket', basket);
			}

			this.$store.commit('v3selectedNum', {});
			this.$store.commit('v3FootMoney', {});
			this.$store.commit('v3ClearSelected', new Date().getTime());
			if (isShowBasket) {
				this.$store.commit('v3IsShowNumBaket', true);
			}
		},
		selectedNum(selected) {
			let allSelected = Object.assign(this.selectedObj, selected);
			let obj = this.gameConfig.dataHandler(allSelected, this.titleArr, this.randomArr);

			if (obj) {
				let { radix } = this.$store.state.GDV3.v3IndexGameAllData;
				let num = 0,
					money = 0;
				if (Array.isArray(obj)) {
					obj.forEach(item => {
						item.money = (item.money / 2) * radix;
						money += item.money;
						num += item.len;
					});
				} else {
					obj.money = (obj.money / 2) * radix;
					num = obj.len;
					money = obj.money;
				}

				this.$store.commit('v3FootMoney', { num, money });
				this.$store.commit('v3selectedNum', obj);
			} else {
				this.$store.commit('v3selectedNum', {});
				this.$store.commit('v3FootMoney', {});
			}
		}
	}
};
</script>

<style></style>
