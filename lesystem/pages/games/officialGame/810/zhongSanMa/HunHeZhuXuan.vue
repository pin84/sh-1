<template>
	<view class="danshi">
		<view><textarea maxlength='-1' v-model="inputNum" @input="changeInput" class="uni-textarea radius text-sm" /></view>

		<view class="margin-top-xl flex justify-center">
			<button @click="deleteRepeat" class="cu-btn round bg-orange">删除重复号</button>
			<button @click="clear" class="cu-btn round bg-orange">清空</button>
		</view>
		<view class="margin-top-lg" style="line-height: 30rpx;">
			<text class="text-sm">程序会自动过滤掉不合法的号码。您也可以点击"删除重复号"按钮对输入内容进行格式化。</text>
			<!-- <br>注意：不足2位数的号码要在前面补0，如号码为5，则输入时应为05 -->
		</view>

		<view class="margin-top-sm"><!-- <MyRecord  /> --></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			inputNum: '',
			curRate: {},
			curGame: {},
			limitLen:3,  //这个页面一些公用的限制
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
		}
	},

	created() {
		this.initData();
	},

	methods: {
		addToBasket() {
			if (this.inputNum === '') {
				this.$util.showToast({ title: '号码选择不完整，请重新选择' });
				return;
			}

			let res = this.dataHandler();
			if (!res) return;
			let { spliceEl, repeatEl, handlerArr } = res;

			if (handlerArr.length < this.limitLen) {
				this.$util.showConfirm({
					content: '输入的号码不合法，请检查',
					showCancel: false
				});
				return;
			}
			let confromAdd = true; // 加入号码蓝时 没有重复的号码，不出现提示
			this.tips(spliceEl, repeatEl, handlerArr, confromAdd);

			let obj = this.createObj();
			let arr = handlerArr.split(',');
			;
			let temArr = [];
			arr.forEach(item => {
				let tem = [];
				tem.push(item.split(''));
				temArr.push(tem);
			});

			;
			obj.numStr = temArr.join('|');
			obj.orderStr = arr.join('_');
			obj.len = arr.length;
			obj.money = this.$util.handlerMoneyDecimal(arr.length * 2 * this.curRate.ratio * this.curRate.rate);

			this.$store.commit('v3NumBasket', obj);
			this.$store.commit('v3FootMoney', { num: 0, money: 0 });
			this.inputNum = '';
		},
		changeInput() {
			if (this.inputNum === '') return;

			let res = this.dataHandler();
			if (!res) return;
			let { spliceEl, repeatEl, handlerArr } = res;
			if (handlerArr.length < this.limitLen) {
				this.$store.commit('v3FootMoney', { num: 0, money: 0 });
				return;
			}
			let arr = handlerArr.split(',');
			let len = arr.length;
			let money = len * this.curRate.rate * 2 * this.curRate.ratio;
			this.$util.handlerMoneyDecimal(money);
			this.$store.commit('v3FootMoney', { num: len, money });
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
			while (n--) {
				let obj = this.createObj();
				let str = [];
				let len = this.limitLen
				while (len--) {
					str.push(this.$util.createRandomNum(0, 9));
				}
				obj.numStr = str.join(','); //显示的格式
				obj.orderStr = str.join(''); //购买的格式
				this.$store.commit('v3NumBasket', obj);
			}
		},

		createObj() {
			let obj = {
				rate: this.curRate.rate, // 模式
				ratio: Number(this.curRate.ratio), //倍数
				gName: this.curGame.N,
				gName_1: '',
				gType: '',
				numStr: '',
				orderStr: '',
				len: 1, //注数
				money: this.$util.handlerMoneyDecimal(2 * this.curRate.ratio * this.curRate.rate),
				unitPrice: 2 * this.curRate.rate,
				I: this.curGame.C[0].I,
				odds: this.curRate.odds,
				ts: new Date().getTime() / 1000
			};

			return obj;
		},
		initData() {
			this.curRate = this.$store.state.GDV3.officialRate;
			this.curGame = this.$store.state.gameData.curGame;
		},

		dataHandler() {
			let reg = /[0-9]/g;

			let arr = this.inputNum.match(reg) || [];

			let len = Math.floor(arr.length / this.limitLen);
			let spliceEl = arr.splice(this.limitLen * len);

			let i = 0;
			let temArr = [];
			while (i++ < len) {
				temArr.push(arr.splice(0, this.limitLen).join(''));
			}
			let map = new Map();
			temArr.forEach(item => {
				if (map.get(item)) {
					let v = map.get(item);
					v++;
					map.set(item, v);
				} else {
					map.set(item, 1);
				}
			});

			let repeatEl = [];
			map.forEach((value, key, map) => {
				if (value > 1) {
					let v = value - 1;
					while (v--) {
						repeatEl.push(key);
					}
				}
			});

			let handlerArr = Array.from(map.keys()).join(',');
			return { spliceEl, repeatEl, handlerArr };
		},
		deleteRepeat() {
			if (this.inputNum === '') {
				this.$util.showConfirm({
					content: '您还没有输入号码',
					showCancel: false
				});
				return;
			}
			let { spliceEl, repeatEl, handlerArr } = this.dataHandler();

			this.inputNum = this.tips(spliceEl, repeatEl, handlerArr);
		},
		tips(spliceEl, repeatEl, handlerArr, confromAdd = false) {
			if (this.inputNum === '') {
				this.$util.showToast({ title: '您还没有输入号码' });
				return;
			}

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

			if (str == '没有重复号码' && confromAdd === true) {
			} else {
				this.$util.showConfirm({
					showCancel: false,
					content: str
				});
			}

			return handlerArr;
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
