<template>
	<view class="list">
		<view @click="selectItem(item)" class="item-box" :class="{ active: item.active }" v-for="(item, idx) in dataList" :key="idx">
			<view class="item">
				<text class="name">{{ item.N }}</text>
				<text class="num">{{ prefixText + item.odds }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		dataList: {
			type: Array,
			default: () => []
		},
		prefixText: {
			type: String,
			default: () => '赔'
		}
	},
	data() {
		return {
			num: 0
		};
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
				this.num--;
			} else {
				item.active = true;
				this.num++;
			}
			this.dataList.push({});
			this.dataList.pop();
			this.$emit('selected')
		}
	}
};
</script>

<style lang="scss" scoped>
.list {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	.item-box {
		width: 25%;
		padding: 10rpx;
		display: flex;
		flex-direction: column;
		.item {
			width: 100%;
			height: 100rpx;
			border: 1px solid hsla(0, 0%, 100%, 0.3);
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 10rpx;
			.name {
				color: #fff;
				font-size: 30rpx;
				line-height: 35rpx;
			}
			.num {
				color: #caebda;
			}
		}
	}
	.active {
		.item {
			border: 1px solid #ffd83f;
			.num {
				color: #ffd83f;
			}
		}
	}
}
</style>
