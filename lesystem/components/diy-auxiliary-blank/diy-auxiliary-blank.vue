<template>
	<view :style="{ backgroundColor: value.bg_color, height: height + 'rpx' }"></view>
</template>

<script>
// 辅助空白
export default {
	name: 'diy-auxiliary-blank',
	props: {
		value: {
			type: Object,
			default: () => {
				return { bg_color: '#ffffff', height: 10 };
			}
		}
	},
	data() {
		return {
			height : 10
		};
	},
	created() {
		this.height = this.value.height*2; //转行比率
	},
	methods: {}
};
</script>

<style>
</style>
