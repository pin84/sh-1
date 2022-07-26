<template>
	<view>
		<rich-text :nodes="value"></rich-text>
	</view>
</template>

<script>
// 富文本
import htmlParser from '@/common/js/html-parser';
export default {
	name: 'diy-rich-text',
	props: {
		value: {
			type: String
		}
	},
	data() {
		return {};
	},
	created() {
		
		this.value = htmlParser(this.value);
	},
	methods: {}
};
</script>

<style>
	.test{
		font-size: 20rpx;
	}
</style>
