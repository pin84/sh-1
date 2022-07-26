<template>
	<view class="page-body">
		<view v-html="formStr"></view>
	</view>
</template>

<script>
	export default {
		data() {

			return {

				formStr: '',

			}

		},
		onLoad(options) {
			if (options.param != undefined) {
				let data = decodeURIComponent(options.param);
				this.formStr = data;
				//console.log(this.formStr); 
				
			}
			else{
				this.formStr = '参数错误,请重试或者联系管理员';
			}

		},
		onReady(){
			document.Form1.submit();
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.page-body {
		min-height: 100vh;
		background-color: white;
		/* #ifdef H5 */
		min-height: calc(100vh - 44px);
		/* #endif */

		.title {
			padding: 10rpx;
		}

		.content {
			padding: 0 30rpx;

			.bankCardList {
				.item {
					border-radius: 10rpx;
					display: flex;
					margin-bottom: 20rpx;

					.left {
						width: 160rpx;
						text-align: center;
						font-size: 66rpx;
						color: white;
					}

					.right {
						padding: 16rpx 0;
						flex-grow: 1;

						.whiteFont {
							color: white !important;
							line-height: 36rpx;
						}

						uni-view:first-child {
							font-weight: 700;
						}

						uni-view:last-child {
							margin-top: 16rpx;
						}
					}
				}
			}

			.bottom_bankCardList {

				.item:last-child {
					margin-bottom: 0;
				}
			}

			.infoItem {
				display: flex;
				align-items: center;
				padding: 20rpx;
				border-bottom: 2rpx solid #ddd;

				.label {
					width: 148rpx;
					text-align: justify;
					text-align-last: justify;
				}

				.textContent,
				.uni-input {
					flex: 1;
					padding: 0 20rpx;
				}

				.btn {
					margin: 0;
					height: 54rpx;
					line-height: 54rpx;
					background-color: #eee;
					font-size: 28rpx;
					color: #555;
				}
			}

			.uni-list-cell::after {
				height: 0;
			}

			.tip {
				background-color: #efefef;
				padding: 40rpx 20rpx 20rpx;
				margin-bottom: 20rpx;

				.custService {
					margin: 0;
					padding: 0;
					width: 140rpx;
					font-size: 26rpx;
					height: 50rpx;
					line-height: 50rpx;
					background-color: #BC283B;
					color: white;
				}

				.submit {
					background-color: #1AB20A;
					color: white;
					margin: 50rpx 0 0;
				}
			}
		}

		.showModal {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 999;
			display: block;
			box-sizing: border-box;

			.uni-mask {
				position: fixed;
				z-index: 999;
				top: 0;
				right: 0;
				left: 0;
				bottom: 0;
				background: rgba(0, 0, 0, .6);
			}

			.uni-modal {
				position: fixed;
				z-index: 999;
				width: 80%;
				max-width: 600rpx;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				background-color: #fff;
				text-align: center;
				border-radius: 6rpx;
				overflow: hidden;

				.uni-modal__bd {
					padding: 40rpx 48rpx 20rpx;
					min-height: 80rpx;
					font-size: 30rpx;
					line-height: 1.4;
					color: #999;
					max-height: 800rpx;
					overflow-y: auto;

					uni-view:nth-child(2) {
						uni-radio-group {
							uni-label {
								display: flex;
								justify-content: center;
								align-items: center;
								height: 80rpx;
							}
						}
					}
				}

				.uni-modal__ft {
					position: relative;
					display: flex;

					&::after {
						content: " ";
						position: absolute;
						left: 0;
						top: 0;
						right: 0;
						height: 2rpx;
						border-top: 2rpx solid #d5d5d6;
						color: #d5d5d6;
						transform-origin: 0 0;
						transform: scaleY(.5);
					}

					.uni-modal__btn_primary {
						color: rgb(0, 122, 255);
					}

					.uni-modal__btn {
						line-height: 96rpx;
						font-size: 36rpx;
						display: block;
						flex: 1;
						text-decoration: none;
						position: relative;
					}
				}
			}
		}
	}
</style>
