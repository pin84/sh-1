<template>
	<view>
		<view v-if="value.layout == 2" class="magic-cube-two" :style="{ padding: value.padding + 'px' + ' 0' }">
			<view class="magic-item" @click="redirectTo(value.itemList[0].href)">
				<image :src="$util.img(value.itemList[0].src)" mode="widthFix"></image>
				<text v-if="value.itemList[0].show_text == 1" class="ns-font-size-base">{{ value.itemList[0].text }}</text>
			</view>
			<view class="magic-item-right">
				<view class="magic-item" :class="value.clearance == 1 ? 'magic-item-clear' : ''" @click="redirectTo(value.itemList[1].href)">
					<image :src="$util.img(value.itemList[1].src)" mode="widthFix"></image>
					<text v-if="value.itemList[1].show_text == 1" class="ns-font-size-base">{{ value.itemList[1].text }}</text>
				</view>
				<view class="magic-item" :class="value.clearance == 1 ? 'magic-item-clear' : ''" @click="redirectTo(value.itemList[2].href)">
					<image :src="$util.img(value.itemList[2].src)" mode="widthFix"></image>
					<text v-if="value.itemList[2].show_text == 1" class="ns-font-size-base">{{ value.itemList[2].text }}</text>
				</view>
			</view>
		</view>
		<view v-if="value.layout == 3" class="magic-cube-three" :style="{ padding: value.padding + 'px' + ' 0' }">
			<view v-for="(item, index) in value.itemList" :key="index" :class="value.clearance == 0 ? 'magic-item-clear' : ''" class="magic-item" @click="redirectTo(item.href)">
				<image :src="$util.img(item.src)" mode="widthFix"></image>
				<text v-if="item.show_text == 1" class="ns-font-size-base">{{ item.text }}</text>
			</view>
		</view>
	</view>
</template>

<script>
// 魔方、橱窗
export default {
	name: 'diy-rubik-cube',
	props: {
		value: {
			type: Object,
			default: () => {
				return { layout: '2', padding: 0, clearance: 1 };
			}
		}
	},
	data() {
		return {};
	},
	created() {
	},
	methods: {
		redirectTo(link) {
			this.$emit('redirectTo', link);
		}
	}
};
</script>

<style>
.magic-item text {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	display: block;
	height: 40rpx;
	line-height: 40rpx;
	padding: 0 10rpx;
	background-color: rgba(0, 0, 0, 0.5);
	color: #fff;
}

.magic-item image {
	width: 100%;
}

/* 三列 */
.magic-cube-three {
	display: flex;
	justify-content: space-between;
}
.magic-cube-three .magic-item {
	position: relative;
	margin-right: 5rpx;
	flex: 1;
}
.magic-cube-three .magic-item:last-child {
	margin-right: 0;
}
.magic-cube-three .magic-item.magic-item-clear {
	width: 100%;
	margin-right: 0;
}

.magic-cube-two {
	display: flex;
	justify-content: space-between;
}
.magic-cube-two .magic-item {
	float: left;
	position: relative;
	width: 100%;
}

.magic-cube-two .magic-item-right {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
}
.magic-cube-two .magic-item-right .magic-item-clear {
	margin-left: 10rpx;
}
</style>
