<template>
	<view>
		<view>
			<view v-for="(item, index) in randomList" :key="index" class="item flex align-center justify-between">
				<view class="flex align-center">
					<i @click="deleteRandom(index)" class="iconfont icon-guanbi margin-right-sm" style="font-size: 48rpx;"></i>
					<view class="flex flex-direction ">
						<view class=" flex">
							<text class="num-box text-red" style="text-align: left;">{{ item.numStr }}</text>
						</view>
						<view class="flex">
							<text>{{ item.gName + item.gName_1 + item.gType }}</text>
						</view>
					</view>
				</view>
				<view>
					<view class="flex align-center">
						<!-- <AddReduce @addReduce="addReduce($event,index)" :ratio='item.ratio'/> -->

						<view class="add-reducea radius flex align-center">
							<i class="iconfont icon-jian  padding" @click="addReduce(item, '0')"></i>
							<input type="number" :placeholder="String(item.ratio)" v-model="item.ratio" @input="inputText(item)" class="uni-input" />
							<i class="iconfont icon-tianjia padding" @click="addReduce(item, '1')"></i>
						</view>
						<text class="margin-left-xs">倍</text>
					</view>
					<view>{{ item.len }}注{{ item.money }}元</view>
				</view>
			</view>
		</view>

		<view class="options padding">
			<!-- <button class="cu-btn bg-green ">追号</button> -->
			<button class="cu-btn bg text-white" @click="$emit('clearAll')">清空</button>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		randomList: {
			type: Array,
			default: () => []
		}
	},



	methods: {
		inputText(item) {
			let { ratio, len, unitPrice, rate } = item;
			if (ratio.indexOf('.') != -1) {
				ratio = ratio.replace('.', '');
			}
			if (!ratio) {
				ratio = 1;
			}

			if (ratio == 1) {
				ratio = 1;
			}

			item.ratio = ratio;

			let decimalNum = rate === 0.001 ? 3 : 2;
			item.money = this.$util.handlerNum(item.len * item.unitPrice * item.ratio, decimalNum);

			this.randomList.push({});
			this.randomList.pop();
		},
		deleteRandom(index) {
			this.randomList.splice(index, 1);
		},

		addReduce(item, type) {
			let {rate} =item
			let decimalNum = rate === 0.001 ? 3 : 2;
			if (type == 0) {
				if (item.ratio < 2) {
					item.ratio = 1;
				} else {
					item.ratio--;
				}
			} else {
				item.ratio++;
			}

			item.money = this.$util.handlerNum(item.len * item.unitPrice * item.ratio, decimalNum);

			// return;
			// let { len, unitPrice, rate, ratio } = this.randomList[index];
			// this.randomList[index].ratio = val;

			// 
			// let decimalNum =  rate === 0.001 ? 3 : 2
			// this.randomList[index].money =this.$util.handlerNum( len * unitPrice * val,decimalNum)
		}
	}
};
</script>
<style lang="scss" scoped>
.num-box {
	max-width: 300rpx;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}

.item {
	border-bottom: 2px dotted rgba(0, 0, 0, 0.1);
	padding: 15rpx 30rpx 5rpx 30rpx;
}
.options {
	.cu-btn {
		padding: 0 60rpx;
		font-size: 30rpx;
	}

	.bg {
		background-color: #a7a7a7;
	}
}

.add-reducea {
	padding: 1px;
	border: 1px solid #a7a8ac;
	.uni-input {
		text-align: center;
		width: 70rpx;
		padding: 0 2px;
		outline: none;
		border: none;
	}
	.icon-jian {
		border-right: 1px solid #a7a8ac;
	}
	.icon-tianjia {
		border-left: 1px solid #a7a8ac;
	}

	.padding {
		padding: 0 15rpx;
	}
}
</style>
