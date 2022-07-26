<template>
	<view class="loading-layer page-bc-color" v-show="isShow">
		<view class="loading-anim">
			<view class="box">
				<view class="border out ns-border-color"></view>
				<view class="border in ns-border-color"></view>
				<view class="border mid ns-border-color"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'loading-cover',
		data() {
			return {
				isShow: true
			}
		},
		methods: {
			show() {
				this.isShow = true;
			},
			hide() {
				this.isShow = false;
			}
		}
	}
</script>

<style>
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.loading-layer {
		opacity: 0.9;
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 997;
	}

	.loading-anim {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

	}

	.loading-anim>view {
		position: relative;
		width: 40px;
		height: 40px;
		perspective: 800px;
		transform-style: preserve-3d;
		transition: all .2s ease-out;
	}

	.loading-anim .border {
		position: absolute;
		border-radius: 50%;
		border: 2px solid;
	}

	.loading-anim .out {
		top: 15%;
		left: 15%;
		width: 70%;
		height: 70%;
		border-left-color: transparent !important;
		border-right-color: transparent !important;
		animation: spin .8s linear reverse infinite;
	}

	.loading-anim .in {
		top: 25%;
		left: 25%;
		width: 50%;
		height: 50%;
		border-top-color: transparent !important;
		border-bottom-color: transparent !important;
		animation: spin .8s linear infinite;
	}

	.loading-anim .mid {
		top: 40%;
		left: 40%;
		width: 20%;
		height: 20%;
		border-left-color: transparent;
		border-right-color: transparent;
		animation: spin .6s linear infinite;
	}
</style>
