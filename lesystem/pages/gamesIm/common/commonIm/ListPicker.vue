<template>
	<view class="picker-box">
		<block v-for="(item, idx) in allArr">
			<picker @change="PickerChange($event, idx)" :value="curIndex[idx]" :range="item" range-key="num">
				<view class="picker" :style="{ backgroundColor: item[curIndex[idx]].bc }">{{ item[curIndex[idx]].num }}</view>
			</picker>
			<text class="iconfont icon-icon-test4"></text>
		</block>
	</view>
</template>

<script>
export default {
	data() {
		return {
			index: 0,
			selectedObj: {},
			handlerPickerList: [],
			colorObj: {
				'#807f7f': ['0', '13', '14', '27'],
				'#38b81b': ['1', '4', '7', '10', '16', '19', '22', '25'],
				'#408ce8': ['2', '5', '8', '11', '17', '20', '23', '26'],
				'#e13f51': ['3', '6', '9', '12', '15', '18', '21', '24']
			},
			allArr: [],
			curValue: [0, 1, 2],
			curIndex: [0, 0, 0]
		};
	},
	created() {
		this.createNumArr();
	},
	methods: {
		createNumArr() {
			let curValue = this.curValue;
			curValue.forEach((n, idx) => {
				let fArr = curValue.filter(num => num != n);
				// console.log(fArr);
				let i = 0;
				let j = 0
				let numArr = [];
				while (i < 28) {
					if (fArr.includes(i)) {
						i++;
						j++
						continue;
					}
					
					if(n == i){
						this.curIndex[idx] = i - j
					}
					for (let [key, value] of Object.entries(this.colorObj)) {
						let str = String(i);
						if (value.includes(str)) {
							numArr.push({ num: str, bc: key });
							continue;
						}
					}
					i++;
				}
				this.allArr.push(numArr);
			});
			
			// console.log();
			this.$emit('selctedObj',this.curValue)
		},
		PickerChange(e, idx) {
			let n = e.detail.value;
			let m = Number(this.allArr[idx][n].num);
			this.curIndex[idx] = n;
			this.curValue[idx] = m;
			// console.log(this.curIndex, this.curValue);
			this.allArr = [];
			this.createNumArr();
		}
	}
};
</script>

<style lang="scss" scoped>
$width: 80rpx;
.picker-box {
	// width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	.picker {
		width: $width;
		height: $width;
		line-height: $width;
		border-radius: 50%;
		background-color: #38b81b;
		color: #fff;
		text-align: center;
	}
	.iconfont {
		color: #e13f51;
		font-size: 42rpx;
		font-weight: 600;
	}
}
</style>
