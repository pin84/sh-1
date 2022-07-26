<template>
	<view>
		<view :style="{ borderTop : '1px solid ' + value.border_color }"></view>
	</view>
</template>

<script>
// 辅助线
export default {
	name: 'diy-auxiliary-line',
	props: {
		value: {
			type: Object,
			default: () => {
				return { border_color: '#e5e5e5' };
			}
		}
	},
	data() {
		return {
			
		};
	},
	created() {
	},
	methods: {}
};
</script>

<style>
</style>
