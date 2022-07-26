<template>
	<view class="danshi">
		<view><PositionRandom :listArr="positioArr" @toggleCheck="toggleCheck" :limitLen="positionLimit" /></view>
		<view><textarea maxlength='-1' v-model="inputNum" @input="changeInput" class="uni-textarea radius text-sm" /></view>

		<view class="margin-top-xl flex justify-center">
			<button @click="deleteRepeat" class="cu-btn round bg-orange">删除重复号</button>
			<button @click="clear" class="cu-btn round bg-orange">清空</button>
		</view>
		<view class="margin-top-lg" style="line-height: 30rpx;">
			<text class="text-sm">程序会自动过滤掉不合法的号码。您也可以点击"删除重复号"按钮对输入内容进行格式化。</text>
			<!-- <br>注意：不足2位数的号码要在前面补0，如号码为5，则输入时应为05 -->
		</view>
	</view>
</template>

<script>
import playList from './playList.js';
import PositionRandom from '@/pages/games/officialGame/common/PositionRandom';
export default {
	data() {
		return {
			positioArr:  [
				{ name: '万', isChecked: true },
				{ name: '千', isChecked: true },
				{ name: '百', isChecked: true },
				{ name: '十', isChecked: true },
				{ name: '个', isChecked: true }
			],
			gameConfig: {},
			inputNum: '',
			curRate: {},
			curGame: {},
			limitLen: 3, //这个页面一些公用的限制
			positionLen: 10,
			positionLimit: 3
		};
	},
	components: {
		PositionRandom
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

		'$store.state.gameData.curGame': {
			handler: function(val) {
				this.$store.commit('setNumBasket', []);
				this.initPage(val.N);
			},
			deep: true
		}
	},

	created() {
		this.initPage();
	},

	methods: {
		initPage(n) {
			this.curRate = this.$store.state.GDV3.officialRate;
			this.curGame = this.$store.state.gameData.curGame;

			if (!n) {
				let { N } = this.curGame;
				n = N;
			}

			this.gameConfig = playList[n];
			this.limitLen = this.gameConfig.lenLimit;
			// this.positioArr = this.gameConfig.positioArr;
			this.positionLimit = this.gameConfig.positionLimit || 3;
		},
		addToBasket() {
			if (this.inputNum === '' ) {
				this.$util.showToast({ title: '号码选择不完整，请重新选择' });
				return;
			}
			let { spliceEl, repeatEl, handlerArr } = this.gameConfig.dataHandler(this.inputNum)
			
			if (handlerArr.length < this.limitLen) {
				this.$util.showConfirm({
					content: '输入的号码不合法，请检查',
					showCancel: false
				});
				return;
			}

			let titleArr = []
			this.positioArr.forEach(item =>{
				if(item.isChecked){
					titleArr.push(item.name)
				}
			})
			let confromAdd = true; // 加入号码蓝时 没有重复的号码，不出现提示
			this.tips({ spliceEl, repeatEl, handlerArr, confromAdd: true });
			let hta = this.gameConfig.titleHandler(titleArr)
			let {C} = this.$store.state.gameData.curGame
			
			let {radix} = this.$store.state.GDV3.v3IndexGameAllData
			hta.forEach(t =>{
				let {I,N} = C.find(item => item.N === t)
				let obj = 	this.gameConfig.addToBasketHandler(I,N,handlerArr)
				obj.money = obj.money / 2 * radix
				this.$store.commit('v3NumBasket', obj);
			})
			
			this.$store.commit('v3FootMoney', { num: 0, money: 0 });
			this.inputNum = '';
		},
		changeInput() {
			if (this.inputNum === '') return;
			let res = this.gameConfig.dataHandler(this.inputNum);
			let { handlerArr } = res;
			if (handlerArr.length < this.limitLen) {
				this.$store.commit('v3FootMoney', { num: 0, money: 0 });
				return;
			}
			let {radix} = this.$store.state.GDV3.v3IndexGameAllData
			let arr = handlerArr.split(',');
			let len = arr.length * this.positionLen;
			let money = len * this.curRate.rate * radix * this.curRate.ratio;
			let m = this.$util.handlerMoneyDecimal(money);
			this.$store.commit('v3FootMoney', { num: len, money: m });
		},
		async v3ToBuy() {
			this.addToBasket();

			this.$emit('buy810');
			this.inputNum = '';

			// this.$store.commit('v3selectedNum', {});
			// this.$store.commit('v3NumBasket', 'clearAll');
			// this.$store.commit('v3FootMoney', {});
			// this.$store.commit('v3ClearSelected', new Date().getTime());
		},

		addToBasketRandom(n) {
			let temArr = [];
			let {C} = this.$store.state.gameData.curGame

			while (n--) {
				let obj = this.gameConfig.addToBasketRandom(C)
				this.$store.commit('v3NumBasket', obj);
			}
		},

		
		deleteRepeat() {
			if (this.inputNum === '') {
				this.$util.showConfirm({
					content: '您还没有输入号码',
					showCancel: false
				});
				return;
			}
			let { spliceEl, repeatEl, handlerArr } = this.gameConfig.dataHandler(this.inputNum);


			this.inputNum = handlerArr;
			this.tips({ spliceEl, repeatEl });
		},
		tips({ spliceEl, repeatEl, confromAdd = false }) {
			console.log(confromAdd);
			let len1 = repeatEl.length;
			let len2 = spliceEl.length;
			let repeatStr = repeatEl.join(',');
			let isShowMark = len1 && len2 ? ',' : '';
			let str;
			if (!len1 && !len2) {
				str = '没有重复号码';
			} else {
				str = `已经为您过滤了${len1}个重复号，${len2}个无效号，过滤内容为：${repeatStr}${isShowMark}${spliceEl}`;
			}

			if (str == '没有重复号码') {
				if (!confromAdd) {
					this.$util.showConfirm({
						showCancel: false,
						content: str
					});
				}
			} else {
				this.$util.showConfirm({
					showCancel: false,
					content: str
				});
			}
		},
		toggleCheck(s) {
			this.positionLen = s;
			this.changeInput();
		},
		clear() {
			this.inputNum = '';
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
