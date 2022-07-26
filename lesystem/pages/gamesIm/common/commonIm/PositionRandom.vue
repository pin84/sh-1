<template>
	<view>
		<view class="p-wrapper">
			<view class="checkbox" v-for="(item, index) in listArr" :key="index">
				<i @click="toggleCheck(item)" class="iconfont icon-duoxuanyidong" v-if="item.isChecked"></i>
				<i @click="toggleCheck(item)" class="iconfont icon-duoxuan" v-else></i>
				<text class="text-sm margin-left-xs">{{ item.name }}</text>
			</view>
		</view>
		<view style="padding: 0 5rpx;">
			<text class="text-xs">(温馨提示：你选择了{{ len }}个位置,系统会自动根据位置组合成{{ c }}个方案)</text>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		positonLenLimit: {
			type: Number,
			default: 2
		}
	},
	data() {
		return {
			listArr: [
				{ name: '万', isChecked: true },
				{ name: '千', isChecked: true },
				{ name: '百', isChecked: true },
				{ name: '十', isChecked: true },
				{ name: '个', isChecked: true }
			],
			len: 0,
			c: 0
		};
	},
	created() {
		this.toggleCheck();
	},
	methods: {
		toggleCheck(item) {
			if (item) {
				item.isChecked ? (item.isChecked = false) : (item.isChecked = true);
			}
			let i = 0;
			let temArr = [];
			this.listArr.forEach(obj => {
				if (obj.isChecked) {
					i++;
					temArr.push(obj.name);
				}
			});

			let resultArr =this.$buyDataHandler.getCombine(temArr,this.positonLenLimit);
			let s = resultArr.length
			this.len = i;
			this.c = s;
			this.$emit('toggleCheck', { resultArr, s, unHandlerArr:temArr});
		},
		
	

	}
};
</script>

<style lang="scss" scoped>
.p-wrapper {
	display: flex;
	width: 100%;
	padding: 0 120rpx;
	// justify-content: space-around;
	.checkbox {
		display: flex;
		align-items: flex-end;
		margin-right: 30rpx;
		.iconfont {
			font-weight: 600;
		}
		.icon-duoxuanyidong {
			color: #b62929;
		}
	}
}
</style>
