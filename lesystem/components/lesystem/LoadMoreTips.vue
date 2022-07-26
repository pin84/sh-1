<template>
	<view class="tips padding  text-center">
		
		<text v-if="isShowAll" @click="loadmore" class="text-xl text-gray">加载更多</text>
		<text v-else  class="text-xl text-gray">已全部显示</text>
	</view>
</template>

<script>
	export default{
		props:{
			isShowAll:{
				type:Boolean,
				default:()=>false
			}
		},
		
		methods:{
			loadmore(){
				this.$store.commit('loadmore',new Date().getTime())
			},
		}
	}
</script>

<style lang="scss">
	
</style>
