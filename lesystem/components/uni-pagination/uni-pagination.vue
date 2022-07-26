<template>
	<view class="uni-pagination">
		<view class="uni-pagination__num">
			<view class="uni-pagination__num-current">
				<text style="margin-right:5px;">{{total}}个用户</text>
				<text class="uni-pagination__num-current-text" style="color:#007aff">{{ currentIndex }}</text>
				<text class="uni-pagination__num-current-text">/{{ maxPage || 0 }}页</text>
			</view>
		</view>
		<view class="uni-pagination__btns">
			<view class="uni-pagination__btn" v-if="currentIndex != 1" :class="currentIndex === 1 ? 'uni-pagination--disabled' : 'uni-pagination--enabled'"
			 :hover-class="currentIndex === 1 ? '' : 'uni-pagination--hover'" :hover-start-time="20" :hover-stay-time="70"
			 @click="clickLeft" style="margin-bottom:5px;">
				<template v-if="showIcon===true || showIcon === 'true'">
					<uni-icons color="#000" size="20" type="arrowleft" />
				</template>
				<template v-else><text class="uni-pagination__child-btn">{{ prevText }}</text></template>
			</view>
			<view class="uni-pagination__btn" v-if="currentIndex != maxPage" :class="currentIndex === maxPage ? 'uni-pagination--disabled' : 'uni-pagination--enabled'"
			 :hover-class="currentIndex === maxPage ? '' : 'uni-pagination--hover'" :hover-start-time="20" :hover-stay-time="70"
			 @click="clickRight">
				<template v-if="showIcon===true || showIcon === 'true'">
					<uni-icons color="#000" size="20" type="arrowright" />
				</template>
				<template v-else><text class="uni-pagination__child-btn">{{ nextText }}</text></template>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '../uni-icons/uni-icons.vue'
	export default {
		name: 'UniPagination',
		components: {
			uniIcons
		},
		props: {
			prevText: {
				type: String,
				default: '上一页'
			},
			nextText: {
				type: String,
				default: '下一页'
			},
			current: {
				type: [Number, String],
				default: 1
			},
			total: { // 数据总量
				type: [Number, String],
				default: 0
			},
			pageSize: { // 每页数据量
				type: [Number, String],
				default: 10
			},
			showIcon: { // 是否以 icon 形式展示按钮
				type: [Boolean, String],
				default: false
			}
		},
		data() {
			return {
				currentIndex: 1
			}
		},
		computed: {
			maxPage() {
				let maxPage = 1
				let total = Number(this.total)
				let pageSize = Number(this.pageSize)
				if (total && pageSize) {
					maxPage = Math.ceil(total / pageSize)
				}
				return maxPage
			}
		},
		watch: {
			current(val) {
				this.currentIndex = +val
			}
		},
		created() {
			this.currentIndex = +this.current
		},
		methods: {
			clickLeft() {
				if (Number(this.currentIndex) === 1) {
					return
				}
				this.currentIndex -= 1
				this.change('prev')
			},
			clickRight() {
				if (Number(this.currentIndex) === this.maxPage) {
					return
				}
				this.currentIndex += 1
				this.change('next')
			},
			change(e) {
				this.$emit('change', {
					type: e,
					current: this.currentIndex
				})
			}
		}
	}
</script>

<style>
	.uni-pagination {
		/* #ifndef APP-NVUE */
		// display: flex;
		/* #endif */
		/* #ifdef APP-NVUE */
		// padding: 0 20px;
		/* #endif */
		// width: 350px;
		position: relative;
		overflow: hidden;
		// flex-direction: row;
		// justify-content: center;
		// align-items: center;
		margin: 0 20px;
	}

	.uni-pagination__btns {
		/* #ifndef APP-NVUE */
		// display: flex;
		/* #endif */
		// flex: 1;
		// justify-content: space-between;
		// align-items: center;
		// flex-direction: row;
	}

	.uni-pagination__btn {
		/* #ifndef APP-NVUE */
		// display: flex;
		/* #endif */
		// width: 60px;
		height: 30px;
		line-height: 30px;
		font-size: $uni-font-size-base;
		position: relative;
		background-color: $uni-bg-color-grey;
		// flex-direction: row;
		// justify-content: center;
		// align-items: center;
		text-align: center;
		border-width: 1px;
		border-style: solid;
		border-color: $uni-border-color;
		border-radius: 5px;
		margin: 0 auto;
	}

	.uni-pagination__child-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		font-size: $uni-font-size-base;
		position: relative;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.uni-pagination__num {
		/* #ifndef APP-NVUE */
		// display: flex;
		/* #endif */
		// position: absolute;
		// left: 150px;
		// top: 0;
		// flex-direction: row;
		// justify-content: center;
		// align-items: center;
		// width: 50px;
		height: 30px;
		line-height: 30px;
		font-size: $uni-font-size-base;
		color: $uni-text-color;
		text-align: center;
		margin: 5px 0 10px;
	}

	.uni-pagination__num-current {
		/* #ifndef APP-NVUE */
		// display: flex;
		/* #endif */
		// flex-direction: row;
	}

	.uni-pagination__num-current-text {
		font-size: 15px;
	}

	.uni-pagination--enabled {
		color: white;
		background-color: #53B12E;
		opacity: 1;
		border: none;
	}

	.uni-pagination--disabled {
		opacity: 0.3;
	}

	.uni-pagination--hover {
		color: rgba(0, 0, 0, .6);
		background-color: $uni-bg-color-hover;
	}
</style>
