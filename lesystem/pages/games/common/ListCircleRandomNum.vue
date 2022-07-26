<template>
	<view class="bettin-shop">
		<view class="list-wrapper">
			<view class="flex list-box align-start padding-top-sm" v-for="(item, idx) in titleArr" :key="idx">
				<view class="title-box flex flex-direction">
					<view class="title text-white text-center">{{ item }}</view>
				</view>
				<view class="select-box margin-left-xl" style="width: 100%;">
					<view class="num-box ">
						<view @click="selectedNum(i, idx)" class="text-box" v-for="(i, index) in numArr" :key="index">
							<view class="select-num" :class="{ 'active-num': i.active }"></view>
							<text class="innerText text-lg" :class="{ 'active-text': i.active }">{{ i.num }}</text>
					
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		titleArr: {
			type: Array,
			default: () => ['a', 'b', 'c', 'a', 'b']
		},
		numArr: {
			type: Array,
			default: () => [{ num: 0 }, { num: 1 }]
		},
		isShowSort: {
			type: Boolean,
			default: () => true
		}
	},
	data() {
		return {
			temText: '',
			curGame: {},
			selectedData: [],
			selectedValue: '排行',
			isShowFirstSelect: false,
			rank: [], //冷热数据
			isShowRank: false,
			selectedCount: 0
		};
	},

	components: {
		// MyRecord: () => import('./MyRecord.vue')
	},

	watch: {
		'$store.state.GDV3.clearSelected': function(val) {
			this.resetData();
		}
	},

	methods: {
		async selected(e) {
			if (this.selectedValue === '不显示') {
				this.selectedValue = '排行';
				this.isShowRank = false;
				return;
			}

			let routes = getCurrentPages()
      let { id } = routes[routes.length - 1].options
			let obj = {
				url: this.$api.getCodeRank,
				data: {
					gameId: id
				}
			};
			let res = await this.$http(obj);

			res.data.forEach(outItem => {
				let mMc = Math.max(...outItem.map(m => m.MC));
				let mAc = Math.min(...outItem.map(m => m.AC));
				outItem.find(item => item.MC === mMc).isMaxmc = true;
				outItem.find(item => item.AC === mAc).isMaxac = true;
			});

			this.rank = res.data;
			this.isShowRank = true;
		},

		selectedNum(obj, idx) {
			obj.active = !obj.active;
			this.refreshView();
			this.handlerData(idx);
		},

		handlerData(idx) {
			let title = this.titleArr[idx];
			
			let temArr = [];
			this.numArr.forEach(item => {
				if (item.active) {
					temArr.push(item);
				}
			});

			let obj = {};
			obj[title] = temArr;
			this.$emit('selectedNum', obj);
			if(temArr.length !== 0){
				this.$store.commit('v3IsHasSelected', true);
			} else {
				this.$store.commit('v3IsHasSelected', false);
			}
		},



		resetData() {
			this.numArr.forEach(item => {
				item.active = false;
			});
			this.refreshView();
		},

		refreshView() {
			this.numArr.push({});
			this.numArr.pop();
		}
	}
};
</script>

<style lang="scss" scoped>
.bettin-shop {
	.list-wrapper {
		.list-box {
			border-top: 1px solid #d0d0d0;
			.title-box {
				flex: 0 0 120rpx;
				padding: 0;
				font-size: 24rpx;
				.title {
					position: relative;
					background-color: #b62929;
					// padding: 0 30rpx;
					height: 60rpx;
					line-height: 60rpx;
				}
				.title:after {
					position: absolute;
					right: -30rpx;
					top: 50%;
					margin-top: -30rpx;
					content: '';
					display: block;
					width: 0;
					height: 0;
					border-top: 30rpx solid transparent;
					border-left: 30rpx solid #b62929;
					border-bottom: 30rpx solid transparent;
				}
				.select {
					border: none;
					outline: none;
					background-color: #f1f1f1;
					font-size: 20rpx;
				}
			}

			.select-type {
				font-size: 32rpx;
				padding: 0 20rpx;
				color: #3b3a3a;
				background: #fff;
				border: 1px solid #bfbfbf;
			}

			.select-type-active {
				border: 1px solid #b62929;
				background-color: #b62929;
				color: #fff;
			}
			.num-box {
				flex-wrap: wrap;
				// padding-right: 30rpx;
				display: flex;
				// justify-content: space-around;
				.text-box {
					position: relative;
					margin: 0 15rpx 25rpx;
					.select-num {
						width: 80rpx;
						height: 80rpx;
						line-height: 80rpx;
						border: 1px solid #bfbfbf;
						border-radius: 50%;
						background-color: #fff;
						font-size: 36rpx;
						transform: rotate(-60deg);
						transition: 0.2s;
					}
					.select-num::after {
						position: absolute;
						right: -18rpx;
						top: 60%;
						margin-top: -38rpx;
						content: '';
						display: block;
						width: 0;
						height: 0;
						transform: scale(0);
						border-top: 30rpx solid transparent;
						border-left: 30rpx solid #b62929;
						border-bottom: 30rpx solid transparent;
					}
					.hot {
						position: absolute;
						top: 8rpx;
						right: 5rpx;
						width: 26rpx;
						height: 26rpx;
						line-height: 26rpx;
						text-align: center;
						overflow: hidden;
						font-size: 18rpx;
					}
					.innerText {
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
					}
					.active-text {
						color: #fff;
					}
					.active-num {
						position: relative;
						border-color: #b62929;
						background-color: #b62929;
						// color: #fff;
						transform: rotate(-140deg);
						.innerText {
							color: #fff;
						}
					}
					.active-num::after {
						transform: scale(1);
					}
				}
			}
		}
	}

	@keyframes rotate_60 {
		0% {
			transform: rotate(-60deg);
		}

		100% {
			transform: rotate(-140deg);
		}
	}
}
</style>
