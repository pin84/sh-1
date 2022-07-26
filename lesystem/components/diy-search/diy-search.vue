<template>
	<view>
		<view class="search-box" :style="{ backgroundColor: value.bg_color }">
			<view class="search-content" :style="{ backgroundColor: value.input_bg_color }">
				<input
					type="text"
					class="uni-input"
					maxlength="50"
					:style="{ backgroundColor: value.input_bg_color, color: value.text_color, fontSize: fontSize + 'rpx' }"
					:placeholder="value.placeholder"
					v-model="searchText"
					confirm-type="search"
					@confirm="search()"
				/>
				<text class="iconfont iconIcon_search" @click="search()"></text>
			</view>
		</view>
	</view>
</template>

<script>
// 搜索
export default {
	name: 'diy-search',
	props: {
		value: {
			type: Object,
			default: () => {
				return { bg_color: '#ffffff', font_size: 12, input_bg_color: '#f4f4f4', placeholder: '商品搜索', text_color: '#333333' };
			}
		}
	},
	data() {
		return {
			searchText: '',
			fontSize: 12
		};
	},
	created() {
		this.fontSize = this.value.font_size * 2;
	},
	methods: {
		search() {
			if (this.searchText.length == 0) {
				this.$util.showToast({
					title: '请输入要搜索的内容'
				});
				return;
			}
			this.$util.redirectTo('/pages/goods/list/list', { keyword: this.searchText });
		}
	}
};
</script>

<style>
.search-box {
	position: relative;
	padding: 20rpx;
}
.search-box input {
	display: block;
	height: 80rpx;
	width: 590rpx;
	padding: 0 20rpx;
}
.search-box .iconfont {
	position: absolute;
	top: 50%;
	right: 20rpx;
	transform: translateY(-50%);
	font-size: 40rpx;
	z-index: 10;
	color: #89899a;
	width: 80rpx;
	text-align: center;
}
</style>
