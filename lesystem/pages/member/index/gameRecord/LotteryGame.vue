<template>
	<view class="lottery">
		<ScreenBar></ScreenBar>
		
		<FilterPanel></FilterPanel>
	</view>
</template>

<script>
import ScreenBar from "./ScreenBar"
import FilterPanel from "./FilterPanel"
export default {
	data() {
		return {
			TabCur: 0,
			titleList: ['全部', '未开奖', '已中奖', '未中奖']
		};
	},
	components: {
		ScreenBar,
		FilterPanel
	},
	methods: {
	
	}
};
</script>

<style lang="scss" scoped>
	
</style>
