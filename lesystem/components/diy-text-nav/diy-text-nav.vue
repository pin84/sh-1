<template>
	<view v-if="value.arrangement == 1" class="diy-text-nav" :style="{ padding: value.padding + 'rpx', background: background }" @click="redirectTo(value.items[0].href)">
		<view class="single" :style="{ textAlign: textAlign, fontSize: value['font_size'] + 'rpx' }">
			{{ value.items[0].text }}
			<text class="iconfont iconright ns-font-size-sm"></text>
		</view>
	</view>
	<view v-else class="diy-text-nav" :style="{ padding: value.padding + 'rpx', background: background }">
		<scroll-view scroll-x>
			<view
				v-for="(item, index) in value.items"
				:key="index"
				class="item"
				@click="redirectTo(item.href)"
				:style="{ textAlign: textAlign, fontSize: value['font_size'] + 'rpx' }"
			>
				{{ item.text }}
			</view>
		</scroll-view>
	</view>
</template>

<script>
// 文本导航
export default {
	name: 'diy-text-nav',
	props: {
		value: {
			type: Object,
			default: () => {
				return { padding: 0, bg_color: '#fff', bg_img: '' };
			}
		}
	},
	data() {
		return {
			background: '',
			textAlign: 'left'
		};
	},
	created() {
		this.value.padding *= 2; //转行比率
		this.value.font_size *= 2; //转行比率
		this.background = `url('${this.value.bg_img}') 50% / 100% no-repeat ${this.value.bg_color}`;
		if (this.value['text_align'] == 1) {
			this.textAlign = 'left';
		} else if (this.value['text_align'] == 2) {
			this.textAlign = 'center';
		} else {
			this.textAlign = 'right';
		}
	},
	methods: {
		redirectTo(link) {
			this.$emit('redirectTo', link);
		}
	}
};
</script>

<style>
.control-text-navigation i {
	float: right;
	margin: 3px 10px 0 0;
}

.diy-text-nav scroll-view {
	width: 100%;
	flex-direction: row;
	white-space: nowrap;
}

.diy-text-nav scroll-view .item {
	display: inline-block;
	margin-left: 16rpx;
	position: relative;
	min-width: 25%;
	text-overflow: ellipsis;
	text-align: center;
}
.diy-text-nav .single {
	position: relative;
}
.diy-text-nav .iconfont {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: 0;
}
</style>
<style scoped>
.diy-text-nav >>> .uni-scroll-view::-webkit-scrollbar {
	display: none;
}
</style>
