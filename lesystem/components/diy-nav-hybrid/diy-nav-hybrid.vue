<template>
	<view>
		<view class="text-nav" :style="{ backgroundColor: value.bg_color }">
			<view v-for="(item, index) in value.items" :key="index" class="text-item" @click="redirectTo(item.href)">
				<image v-if="item.src" :src="$util.img(item.src)" mode="widthFix"></image>
				<text v-if="item.text" :style="{ color: value.text_color }">{{ item.text }}</text>
			</view>
		</view>
	</view>
</template>

<script>
// 图文导航
export default {
	name: 'diy-nav-hybrid',
	props: {
		value: {
			type: Object,
			default: () => {
				return { bg_color: '#ffffff', text_color: '#666666' };
			}
		}
	},
	data() {
		return {};
	},
	created() {
	},
	methods: {
		redirectTo(link) {
			this.$emit('redirectTo', link);
		}
	}
};
</script>

<style>
.text-nav {
	display: flex;
	flex-wrap: wrap;
}
.text-nav .text-item {
	display: flex;
	flex:1;
	flex-direction: column;
	justify-content: space-around;
	align-content: center;
	align-items: center;
	padding: 16rpx;
	box-sizing: border-box;
}
.text-nav .text-item image {
	margin-bottom: 10rpx;
	width: 70rpx;
	height: 70rpx;
}
.text-nav .text-item text {
	display: block;
	height: 50rpx;
	line-height: 50rpx;
}
</style>
