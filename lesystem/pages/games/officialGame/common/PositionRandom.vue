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
		listArr: {
			type: Array,
			default: () => [
				{ name: '万', isChecked: true },
				{ name: '千', isChecked: true },
				{ name: '百', isChecked: true },
				{ name: '十', isChecked: true },
				{ name: '个', isChecked: true }
			]
		},
		limitLen: {
			type: Number,
			default: 2
		}
	},
	data() {
		return {
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
			this.listArr.forEach(obj => {
				if (obj.isChecked) {
					i++;
				}
			});
			let s = this.$buyDataHandler.combinatorialNumber(i, this.limitLen);
			this.len = i;
			this.c = s;
			this.$emit('toggleCheck', s);
		}
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
