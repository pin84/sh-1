<template>
	<scroll-view scroll-x class="nav bg-white">
		<view class="flex text-center">
			<view class="flex-sub cu-item" :class="tabCur == index? 'bg-red text-white' : ''" v-for="(item, index) in tabs" :key="index" @tap="chanageTabItem(item,index)">
				{{item.name}}
			</view>
		</view>
	</scroll-view>
	
</template>
         
<script>
	export default {
		data() {
			return {
				tabCur:0
			}
		},
		props: {
			'tabs': Array
		},
		methods:{
			chanageTabItem(val,ide){
					this.tabCur = ide
					this.$emit('chanageTabItem',val,ide)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab-bar {
		.item {
			padding: 5px 15px;
		}
	}
</style>
