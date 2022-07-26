<template>
	<view class="home">
		<view class="list uni-flex uni-column">
			<view class="wrap-item">
				<view class="lis uni-flex uni-column" :animation="animationData">
					<view class="uni-flex uni-column" v-for="(item, index) in scrollList" :key="index">
						<view class="swiper-item item_title uni-flex list_item">
							<view class="nickname uni-flex-item justify-align-center uni-flex">{{ item.nickname }}</view>
							<view class="num uni-flex-item justify-align-center uni-flex">{{ item.num }}</view>
							<view class="create_time uni-flex-item justify-align-center uni-flex">{{ item.create_time }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			type: Array
		}
	},
	watch:{
			'list.length':{
				handler(newval){
					this.scrollList = this.list
				},
				immediate:true
			}
	},
	data() {
		return {
			scrollList:[],
			scrollHeight: 0, //向上滚动距离
			height: 0, //.lis高度（滚动框高度）
			animationData: {} //动画对象
		};
	},
	components: {},
	mounted() {
		
		this.prizeScroll();
		
	},
	methods: {
		getHeight(Class) {
			let query = uni.createSelectorQuery().in(this);
			query
				.selectAll(Class)
				.boundingClientRect(data => {
					this.height = data[0].height;
				})
				.exec();
		},
		prizeScroll() {
			let speed = 50;
			let animation = uni.createAnimation({
				duration: this.getHeight('.lis') / speed,
				timingFunction: 'linear',
				delay: 0
			});
			this.animation = animation;
			setInterval(() => {
				if (this.scrollHeight >= this.height) {
					animation.translateY(0).step();
					this.scrollHeight = 0;
					this.animationData = animation.export();
				} else {
					this.scrollHeight = this.scrollHeight + 1;
					animation.translateY(-this.scrollHeight).step();
					this.animationData = animation.export();
				}
			}, speed);
		}
	}
};
</script>

<style>
	page{
		width: 100%;
	}
	.home,.list {
		width: 750upx;
		padding-top: 30upx;
	}
</style>
