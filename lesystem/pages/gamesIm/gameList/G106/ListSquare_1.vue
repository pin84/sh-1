<template>
	<view class="list">
		<view @click="selectItem(item)" class="item-box" :class="{ active: item.active }" v-for="(item, idx) in dataList" :key="idx">
			<view class="item">
				<text class="name">{{ item.N }}</text>
				<!-- <text class="num">{{ prefixText + item.odds }}</text> -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		dataList: {
			type: Array,
			default: () => [{N:'aa',odds:''}]
		},
		prefixText: {
			type: String,
			default: () => '赔'
		}
	},

	
	watch:{
		'$store.state.GDV3.clearSelected':function(val){
			this.clearAll()
		}
	},
	methods: {
		clearAll(){
			this.dataList.forEach(item=>{
				if(item.active){
					item.active = false
				}
			})
			this.dataList.push({});
			this.dataList.pop();
		},
		selectItem(item) {
			if (item.active) {
				item.active = false;
			} else {
				item.active = true;
			}
			this.dataList.push({});
			this.dataList.pop();
			this.$emit('selected',item)
		}
	}
};
</script>

<style lang="scss" scoped>
.list {
	width: 100%;
	display: flex;
	flex-wrap:  nowrap;
	.item-box {
		min-width: 12%;
		// padding: 10rpx;
		display: flex;
		flex-direction: column;
		border: 1px solid hsla(0, 0%, 100%, 0.3);
		margin-right: 30rpx ;
		margin-bottom: 30rpx ;
		.item {
			width: 100%;
			// height: 100rpx;
			// border: 1px solid hsla(0, 0%, 100%, 0.3);
			border: 2px solid transparent;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding:  15rpx;
			.name {
				color: #fff;
				font-size: 42rpx;
				line-height: 35rpx;
			}
			.num {
				color: #caebda;
			}
		}
	}
	.active {
		.item {
			border: 2px solid #ffd83f;
			// border: 2px solid #ffd83f;
			background: rgba(0,0,0,0.3);
			.num {
				color: #ffd83f;
			}
		}
	}
}
</style>
