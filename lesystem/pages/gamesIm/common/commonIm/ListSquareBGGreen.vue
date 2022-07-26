<template>
	<view class="list-square">
		<view class="item-box" :class="{ active: v.active }" v-for="(v, index) in list" :key="index">
			<view class="special-item" @click="selectedItem(v)">
				<view v-if="repeatLen" class="flex">
					<view v-for='(n) in 3' :key='n'  :class="'dice-0' + v.N"></view>
				</view>
				<view v-if="Number(v.N) && !repeatLen" class="flex"><view v-for="(n, idx) in v.N" :key="idx" :class="'dice-0' + n"></view></view>

				<text v-else style="color: #fff;">{{ v.N }}</text>
				<text style="color:#c4e3cf;">{{ v.odds }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: () => [{ N: 'AA', odds: 'AA' }]
		},
		repeatLen: {
			type: Number,
			default: () => 0
		}
	},
	data() {
		return {
			num: 0
		};
	},

	watch: {
		'$store.state.GDV3.clearSelected': function(val) {
			this.resetData();
		}
	},

	created() {
		// console.log(this.list);
	},

	methods: {
		resetData() {
			this.list.forEach(item => {
				if (item.active) {
					item.active = false;
				}
			});

			this.list.push({});
			this.list.pop();
			this.$store.commit('v3IsHasSelected', false);
		},
		selectedItem(item) {
			if (item.active) {
				item.active = false;
				this.num--;
			} else {
				item.active = true;
				this.num++;
			}

			if (this.num) {
				this.$store.commit('v3IsHasSelected', true);
			} else {
				this.$store.commit('v3IsHasSelected', false);
			}

			this.list.push({});
			this.list.pop();
		}
	}
};
</script>

<style lang="scss" scoped>
@import url('@/common/css/discCss.scss');
.list-square {
	display: flex;
	flex-wrap: wrap;
	// border: 1px solid #f3f3f3;
	width: 100%;
	.item-box {
		width: 25%;
		background-color: #317455;
		padding: 10rpx;
		.special-item {
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border: 1px solid #82b39c;
			padding-top: 10rpx;
			.text-name {
				color: #ff4372;
				font-weight: 600;
			}
			.text-name-b {
				color: #6ebaff;
			}
		} // .active {
		// 	background-color: #ffd800;
		// }
	}

	.active {
		.special-item {
			border: 1px solid #ffd800;
		}
	}
}
</style>
