<template>
	<view class="diy-notice">
		<text class="gonggao iconfont icon-gonggao" @click="$util.redirectTo('/pages/notice/list/list')"></text>

		<view class="main-wrap">
			<view v-if="value.scroll_way == 1" class="notice" :style="{ background: background, backgroundColor: value.bg_color }">
				<view
					id="notice-con"
					class="notice-item ns-font-size-base"
					@click="redirectTo(value.items[0].href)"
					:style="{ left: move_left + 'px', color: value.text_color, fontSize: value.font_size * 2 + 'rpx' }"
				>
					{{ value.items[0].notice }}
				</view>
			</view>
			<view v-else-if="value.scroll_way == 2" class="uni-swiper-msg" :style="{ background: background, backgroundColor: value.bg_color }">
				<swiper vertical="true" autoplay="true" circular="true">
					<swiper-item
						v-for="(item, index) in value.items"
						:key="index"
						:class="value.text_align == 1 ? 'text-left' : value.text_align == 2 ? 'text-center' : 'text-right'"
					>
						<text @click="redirectTo(item.href)" class="beyond-hiding" :style="{ color: value.text_color, fontSize: value.font_size * 2 + 'rpx' }">
							{{ item.notice }}
						</text>
					</swiper-item>
				</swiper>
			</view>
			<view
				v-else-if="value.scroll_way == 0"
				class="notice beyond-hiding"
				:class="value.text_align == 1 ? 'text-left' : value.text_align == 2 ? 'text-center' : 'text-right'"
				:style="{ background: background, backgroundColor: value.bg_color }"
			>
				<view class="notice-item ns-font-size-base" @click="redirectTo(value.items[0].href)" :style="{ color: value.text_color, fontSize: value.font_size * 2 + 'rpx' }">
					{{ value.items[0].notice }}
				</view>
			</view>
		</view>
	</view>
</template>
<script>
// 公告
export default {
	name: 'diy-notice',
	props: {
		value: {
			type: Object,
			default: () => {
				return { border_color: '#e5e5e5' };
			}
		}
	},
	data() {
		return {
			move_left: 0,
			screenWidth: 0,
			domWidth: 0,
			background: ''
		};
	},
	created() {
		if (this.value.bg_img != '') {
			this.background = 'url(' + this.$util.img(value.bg_img) + ') no-repeat center / cover';
		}
	},
	mounted() {
		if (this.value.scroll_way == 1) {
			this.getScreenWidth();
			this.horizontalRolling();
		} else if (this.value.scroll_way == 2) {
			this.longitudinalRolling();
		}
	},
	methods: {
		/* 链接跳转 */
		redirectTo(link) {
			this.$emit('redirectTo', link);
		},
		/* 纵向滚动 */
		longitudinalRolling() {
			if (this.value.items.length == 1) {
				this.value.items.push(this.value.items[0]);
			}
		},
		/* 横向滚动 */
		horizontalRolling() {
			setInterval(()=> {
				this.move_left = this.move_left -1;
				//console.log(this.move_left);
				if (this.move_left <= -this.domWidth) {
					this.move_left = this.screenWidth;
				}
				//console.log("domWidth:"+this.domWidth);
			}, 20);
		},
		getScreenWidth() {
			/* 获取屏幕宽度 */
			this.screenWidth = uni.getSystemInfoSync().windowWidth;
//console.log("this.screenWidth:"+this.screenWidth);
			/* 横向滚动 判断对其方式  1表示向左对其  2表示居中  3表示向右对齐*/
			if (this.value.text_align == 1) {
				this.move_left = 0;
			} else if (this.value.text_align == 2) {
				this.move_left = this.screenWidth / 2;
			} else if (this.value.text_align == 3) {
				this.move_left = this.screenWidth;
			}

			/* 获取内容宽度 */
			const query = uni.createSelectorQuery().in(this);
			query
				.select('#notice-con')
				.boundingClientRect(data => {
					this.domWidth = data.width;
				})
				.exec();
		}
	}
};
</script>

<style>
.diy-notice {
	padding: 20rpx;
	line-height: 0;
	background-color: #fff;
  display: flex;
  align-items: center;
}
.diy-notice .main-wrap {
	display: inline-block;
	width: 85%;
	position: relative;
}
.diy-notice .gonggao {
	margin-right: 20rpx;
}
.uni-swiper-msg {
	padding: 0;
}
.notice {
	position: relative;
	/* height: 60rpx; */
	overflow: hidden;
	/*text-overflow: ellipsis;*/
}
.notice .notice-item {
	display: inline-block;
	position: relative;
	/* height: 60rpx;
	line-height: 60rpx; */
	white-space: nowrap;
}
.beyond-hiding {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.text-left {
	text-align: left;
}
.text-center {
	text-align: center;
}
.text-right {
	text-align: right;
}
</style>
