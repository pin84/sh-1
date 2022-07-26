<template>
	<scroll-view scroll-x class="bg-white nav">
		<view class="flex text-center">
			<view
				class="cu-item flex-sub"
				:class="[{ 'text-orange cur': index == TabCur }]"
				:style="{ 'background-color': bgColor }"
				v-for="(item, index) in titleList"
				:key="index"
				@tap="tabSelect"
				:data-id="index"
			>
				{{ item }}
			</view>
		</view>
	</scroll-view>
</template>

<script>
export default {
	props: {
		bgColor: {
			type: String,
			default: () => ''
		},
		titleList: {
			type: Array,
			default: () => ['a']
		}
	},
	data() {
		return {
			TabCur: 0
		};
	},

	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.$emit('tabSelect', this.TabCur);
			// this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
		}
	}
};
</script>

<style lang="scss" scoped>
.cu-item {
	margin: 0;
}

.cur {
	color: #b62929;
	background-color: #fff  !important;
}
</style>
