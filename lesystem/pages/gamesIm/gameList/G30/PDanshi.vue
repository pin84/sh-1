<template>
	<view class="danshi">
		<view><textarea maxlength='-1' v-model="inputNum" @input="changeInput" class="uni-textarea radius text-sm" /></view>

		<view class="margin-top-xl flex justify-center">
			<button @click="deleteRepeat" class="cu-btn round bg-orange">删除重复号</button>
			<button @click="clear" class="cu-btn round bg-orange">清空</button>
		</view>
		<view class="margin-top-lg" style="line-height: 30rpx;">
			<text class="text-sm">程序会自动过滤掉不合法的号码。您也可以点击“删除重复号”按钮对输入内容进行格式化。</text>
			<!-- <br />
			<text class="text-sm">注意：不足2位数的号码要在前面补0，如号码为5，则输入时应为05</text> -->
		</view>

		<view class="margin-top-sm"><!-- <MyRecord  /> --></view>
	</view>
</template>

<script>
import playList from './playList.js';
export default {
	data() {
		return {
			gameConfig: {},
			inputNum: '',
			curRate: {},
			curGame: {},
			curObj: {}
		};
	},
	components: {
		// MyRecord:()=>import('./MyRecord.vue')
	},

	watch: {
		'$store.state.GDV3.officialRate': {
			handler: function(val) {
				this.curRate = val;
				this.changeInput();
			},
			deep: true
		},

		'$store.state.GDV3.v3AddRandom': {
			handler: function(val) {
				this.addToBasketRandom(val.n);
			}
		},
		'$store.state.GDV3.v3ToBuy': {
			handler: function() {
				this.v3ToBuy();
			}
		},
		'$store.state.GDV3.addToBasket': {
			handler: function() {
				this.addToBasket();
			}
		},
		'$store.state.GDV3.clearSelected': function() {
			this.clear();
		}
	},

	created() {
		this.initPage();
	},

	methods: {
		initPage(n) {
			this.curRate = this.$store.state.GDV3.officialRate;
			let curGame = this.$store.state.GDV3.v3CurGame;
			let { I, C } = curGame;
			let { MB, MxO, MiO } = C[0];
			let ratioObj = {
				MB,
				MxO,
				MiO
			};
			this.$store.commit('v3RatioInitValue', ratioObj);
			this.gameConfig = playList[I];

			// this.curObj = this.$buyDataHandler.createBuyObj()
		},

		async v3ToBuy() {
			let flag = await this.addToBasket({ isShowBasket: false });
			if (!flag) return;
			//触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
			let ts = new Date().getTime();
			this.$store.commit('v3ToBuyNext', ts);
		},

		async addToBasket({ isShowBasket = true } = {}) {
			let res = this.gameConfig.dataHandler(this.inputNum);
			let { spliceEl, repeatEl, handlerArr } = res;

			// let basketArr = this.$store.state.GDV3.numBasket;
			// if(handlerArr.length === 0  && basketArr.length === 0) return false

			let flag = await this.tips({ spliceEl, repeatEl });
			if (!flag) return false;

			if (handlerArr.length) {
				// let obj = this.$buyDataHandler.createBuyObj();
				let obj = this.gameConfig.createObj(handlerArr);

				let { num, money } = this.$store.state.GDV3.footMoney;

				obj.len = num;
				obj.money = money;

				this.$store.commit('v3NumBasket', obj);
			}
			this.$store.commit('v3FootMoney', { num: 0, money: 0 });
			this.inputNum = '';
			if (isShowBasket) {
				this.$store.commit('v3IsShowNumBaket', true);
			}
			this.$store.commit('v3selectedNum', {});
			return true;
		},
		changeInput() {
			if (this.inputNum === '') return;
			let { handlerArr } = this.gameConfig.dataHandler(this.inputNum);

			let len = handlerArr.length;
			if (len === 0) {
				this.$store.commit('v3FootMoney', { num: 0, money: 0 });
				return;
			}
			
			let {radix} = this.$store.state.GDV3.v3IndexGameAllData

			let money = len * this.curRate.rate * radix * this.curRate.ratio;
			let m = this.$util.handlerMoneyDecimal(money);
			this.$store.commit('v3FootMoney', { num: len, money: m });

			let obj = this.gameConfig.createObj(handlerArr);
			// let obj = this.$buyDataHandler.createBuyObj();

			obj.len = len;
			obj.money = money;
			this.$store.commit('v3selectedNum', obj);
		},

		addToBasketRandom(n) {
			while (n--) {
				let obj = this.gameConfig.addToBasketRandom();
				this.$store.commit('v3NumBasket', obj);
			}
			this.$store.commit('v3IsShowNumBaket', true);
		},

		async deleteRepeat() {
			if (this.inputNum === '') {
				this.$util.showConfirm({
					content: '您还没有输入号码',
					showCancel: false
				});
				return;
			}

			let { spliceEl, repeatEl, handlerArr } = this.gameConfig.dataHandler(this.inputNum);
			this.tips({ spliceEl, repeatEl, isShowCancel: false });
			this.inputNum = handlerArr
				.join('|')
				.replace(/\,/g, '')
				.replace(/\|/g, ',');
		},

		async tips({ spliceEl, repeatEl, isShowCancel = true }) {
			let len1 = repeatEl.length;
			let len2 = spliceEl.length;
			let spStr = spliceEl
				.join('|')
				.replace(/\,/g, '')
				.replace(/\|/g, ',');

			let reStr = repeatEl
				.join('|')
				.replace(/\,/g, '')
				.replace(/\|/g, ',');
			let isShowMark = len1 && len2 ? ',' : '';
			let str;
			if (!len1 && !len2) {
				str = '没有重复号码';
			} else {
				str = `已经为您过滤了${len1}个重复号，${len2}个无效号，过滤内容为：${reStr}${isShowMark}${spStr}`;
			}

			let flag = true;

			if (str == '没有重复号码') {
				if (!isShowCancel) {
					await this.$util.showConfirm({
						content: str,
						showCancel: false
					});
				}
			} else {
				flag = await this.$util.showConfirm({
					showCancel: isShowCancel ? true : false,
					content: str
				});
			}

			return flag;
		},

		clear() {
			this.inputNum = '';
			this.$store.commit('v3selectedNum', {});
			this.$store.commit('v3FootMoney', { num: 0, money: 0 });
		}
	}
};
</script>

<style lang="scss" scoped>
.danshi {
	padding: 10rpx;
	.uni-textarea {
		border: 1px solid #727272;
		background: rgba(0, 0, 0, 0.2);
		color: #fff;
		padding: 10rpx;
		height: 350rpx;
	}

	.cu-btn {
		height: 80rpx;
	}
}
</style>
