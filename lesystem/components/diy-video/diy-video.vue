<template>
	<view v-if="value.url != ''" :style="{ padding: value.padding + 'rpx 0' }"><video :id="value.id" :src="$util.img(value.url)"></video></view>
</template>

<script>
// 视频
export default {
	name: 'diy-video',
	props: {
		value: {
			type: Object,
			default: () => {
				return { id: '', url: '' };
			}
		}
	},
	data() {
		return {};
	},
	created() {
		this.value.padding *= 2;
	},
	methods: {}
};
</script>

<style>
video {
	width: 100%;
}
</style>
