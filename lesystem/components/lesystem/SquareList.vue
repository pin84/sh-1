<template>
	<view class="list">
		<view class="flex-item bg-white flex text-center padding" v-for="(item, indexs) in blokList" :key="indexs" @click="toDetailsPage(item.name)">
			<view class="text-bold  "><i class="iconfont iconsize" :class="[item.iconClass, item.iconColor ? item.iconColor : 'text-red']"></i></view>
			<view>
				<text class="text-lg">{{ item.name }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		blokList: {
			type: Array,
			default: () => [	{
					iconClass: 'icon-che',
					name: '游戏记录'
				},
				{
					iconClass: 'icon-suiji',
					name: '追号查询'
				},
				{
					iconClass: 'icon-baobiao',
					name: '个人报表'
				},
				{
					iconClass: 'icon-V',
					iconColor: 'text-green',
					name: '团队报表'
				}]
		}
	}
};
</script>

<style lang="scss" scoped>
.list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	.flex-item {
		margin-right: 1px;
		width: calc(((100% - 1px * 3) / 3));
		margin-bottom: 1px;
		flex-direction: column;
		.iconsize {
			font-size: 40rpx;
		}
	}
}

.list:after {
	content: ' ';
	flex: auto;
}
</style>
