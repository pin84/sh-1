<template>
	<div class="diy-notice">
		<text class="flag ns-border-color ns-text-color ns-font-size-sm">公告</text>
		<div class="main-wrap">
			<div class="notice-logo"><img src="/images/indexgonggao.png" width="140" height="40"/></div>
			<div class="notice" :style="{backgroundColor:bg_color }">
				<div id="notice-con" class="notice-item" @click="redirectTo(href)" :style="{left: move_left + 'px'}">
					{{ noticeText }}
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	// 公告
	export default {
		name: 'diy-notice',
		props: {
			noticeText: {
				type: String,
				default:''
				},
				bg_color:{
					type:String,
					default:'#FFFFFF'
				},
				href:{
					type:String,
					default:'#'
				}
			
		},
		data() {
			return {
				move_left: 300,
				screenWidth: 600,
				domWidth: 800,
				background: ''
			};
		},
		// watch: {
		//   noticeText(val) {
		//     if (val) {
		//       this.noticeText = val;
		//     }
		//   }
		// },
		created() {
		},
		mounted() {
			this.horizontalRolling();
		},
		methods: {
			/* 链接跳转 */
			redirectTo(link) {
				this.$emit('redirectTo', link);
			},
			/* 横向滚动 */
			horizontalRolling() {
				let textDom = document.getElementById('notice-con');
				let domWidth= textDom.offsetWidth;
				setInterval(() => {
					this.move_left = this.move_left - 1;
					if (this.move_left <= -domWidth) {
						this.move_left = this.screenWidth;
					}
				}, 20);
			}
		}
	};
</script>

<style>
	.diy-notice {
		line-height: 40px;
		font-size: 13px;
		margin-top: 6px;
		background-color: #fff;
	}
.diy-notice .notice-logo{display: inline-block;float: left;}
	.diy-notice .main-wrap {
		display: inline-block;
		width: 96%;
		position: relative;
	}

	.diy-notice .flag {
		border: 1px solid;
		padding: 4rpx 10rpx;
		border-radius: 24rpx;
		margin-right: 20rpx;
		float: left;
		line-height: initial;
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
