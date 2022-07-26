<template>
	<view class="form">
		<view class="title">
			<text class="title-item text-xs flex-sub" :class="{ 'flex-twice': index === 0 }" v-for="(title, index) in titleList" :key="index">{{ title }}</text>
		</view>

		<view class="list">
			<view class="item " v-for="(item, idx) in list" :key="idx">
				<text class="text flex-twice">
					<text class="text-xs">{{item.N}}</text>
					<text class="text-red text-xs">@{{item.C.N}}</text>
				</text>
				<text class="text flex-sub text-xs">{{item.C.curMxO}}</text>
				<text class="text flex-sub text-xs">{{item.money}}</text>
			</view>
		</view>
		
		<view style="padding:  0 20rpx;">
			共{{len}}注，下注金额{{money}}元
		</view>
	</view>
</template>

<script>
export default {
	props: {
		titleList: {
			type: Array,
			default: () => ['项目', '赔率', '金额']
		}
	},
	data(){
		return {
			list:[],
			len:0,
			money:0
			
		}
	},
	
	created() {
		this.initData()
	},
	
	methods:{
		initData(){
			this.list = this.$store.state.gameDataV2.numFormData
			this.len = this.list.length
			this.money = this.list.reduce((accumulator,currentValue)=>{
				return  accumulator + Number(currentValue.money)
			},0)
		}
	}
};
</script>

<style lang="scss" scoped>
.form {
	.title {
		display: flex;
		width: 100%;
		.title-item {
			background-color: rgba(0, 0, 0, 0.2);
			padding: 15rpx 0;
			border-right: 1px solid #fff;
			// flex-grow:1;
			text-align: center;
		}
	}
	.list {
		background-color: #fff;
		.item {
			display: flex;
			text-align: center;
			border-bottom: 1px solid #f1f1f1;
			.text{
				border-right: 1px solid #f1f1f1;
				padding: 8rpx 0;
			}
		}
	}
}
</style>
