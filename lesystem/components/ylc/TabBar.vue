<template>
	<scroll-view scroll-x class="nav ">
		<view class="flex text-center">
			<view class="flex-sub cu-item" :class="curSelectGameType == 'all'? 'bg-red text-white' : ''"
				@tap="curSelectGameType = 'all'">全部</view>
			<view class="flex-sub cu-item" :class="curSelectGameType == item.gameType? 'bg-red text-white' : ''"
				v-for="(item, index) in tabs" :key="index" @tap="chanageTabItem(item,index)">
				{{item.gameTypeName}}
			</view>
			<!-- <view v-if="curSelectGameType == 'search'" class="flex-sub cu-item" :class="curSelectGameType == 'search'? 'bg-red text-white' : ''">搜索结果</view> -->
		</view>
	</scroll-view>

</template>

<script>
	export default {
		data() {
			return {
				curSelectGameType: 'all',
			}
		},
		props: {
			'tabs': Array
		},
		methods: {
			chanageTabItem(val) {
				this.curSelectGameType = val.gameType
				this.$emit('chanageTabItem', val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cu-item {
		margin: 0;
	}

	.tab-bar {
		.item {
			padding: 5px 15px;
		}
	}
</style>
