<template>
	<view class="scroll">
		
		<view class="scroll-list" :animation="animationData">
			
			<view class="goods-detail-snaplist-box" v-for="(item,index) in scrollList" :key='index'>
				<view class="snaplist-img">
					<image class="img-content" :src="item.user_headimg" mode=""></image>
				</view>
				<text class="snaplist-red">{{item.nickname}}</text>
				抢购
				<text class="snaplist-red">{{item.num}}</text>
				单
				<text class="snaplist-date">{{formatDate(item.create_time)}}</text>
			</view>
			
		</view>
		
	</view>
</template>



<script>
	
	export default{
		
		props: {
			list: {
				type: Array,
				default:()=>{
					return []
				}
			}
		},
		watch:{
				'list.length':{
					handler(newval,oldval){
						
						if(newval >= 5){
							
							
							this.scrollList = this.list.concat(this.list)
							
							this.num = newval
							
							if(oldval >= 5){
								
								
							}else if(oldval < 5){
								
								clearTimeout(this.timer)
								
								this.animationScroll()
								
							}else{
								
								clearTimeout(this.timer)
								
								this.animationScroll()
								
							}
							
							
						}else if(newval < 5){
							
							clearTimeout(this.timer)
							
							this.scrollList = this.list
							
						}
						
						
					},
					immediate:true
				}
		},
		data(){
			return{
				scrollList:[],
				animationData: {},
				timer:0,
				num:0,
				randomnum:1
			}
		},
		methods:{
			
			animationScroll(){
				
					let animation = uni.createAnimation({
						
						duration: 800 * this.num,
						
						timingFunction: 'linear'
						
					});
					
					this.animation = animation;
					
					this.timer = setTimeout(function(){
						
						animation.translateY(0 - uni.upx2px(82 * this.num) - Math.random() * 3).step({duration:800 * this.num});
						
						animation.translateY(- Math.random() * 3).step({duration:0});
						
						this.animationData = animation.export();
						
						// console.log('动画循环～～～')
						
						this.animationScroll();
						
					}.bind(this), 800 * this.num + 22);
					
			},
			
			formatDate(datetime) {
				
			        let date = new Date((datetime - 0)*1000)
					
			        let year = date.getFullYear()
			        let month = ("0" + (date.getMonth() + 1)).slice(-2)
			        let day = ("0" + date.getDate()).slice(-2)
					
			        let hour = ("0" + date.getHours()).slice(-2)
			        let minute = ("0" + date.getMinutes()).slice(-2)
			        let second = ("0" + date.getSeconds()).slice(-2)
			        
			        let result = year + "-"+ month +"-"+ day +" "+ hour +":"+ minute +":" + second
			       
			        return result
					
			}
		}
		
	}
	
</script>



<style>
	
	.scroll{
		height: 410upx;
		overflow: hidden;
		background-color: #fff;
	}
	.scroll-list .goods-detail-snaplist-box{
		height: 80upx;
		font-size: 26upx;
		letter-spacing: 0;
		line-height: 1;
		background-color: #fff;
		border-bottom: 2upx solid #eee;
		display: flex;
		align-items: center;
	}
	.goods-detail-snaplist-box .snaplist-img{
		width: 42upx;
		height: 42upx;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 4upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.snaplist-img .img-content{
		width: 42upx;
		height: 42upx;
	}
	.goods-detail-snaplist-box .snaplist-red{
		padding: 0 5upx;
		color: #F44D81;
		font-size: 26upx;
		line-height: 1;
		letter-spacing: 0;
	}
	.goods-detail-snaplist-box .snaplist-date{
		padding-left: 5upx;
		color: #aaa;
		font-size: 24upx;
		line-height: 1;
		letter-spacing: 0;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	// .scroll{
		
	// 	height: 410upx;
	// 	overflow: hidden;
	// 	background-color: #fff;
	// 	// position: relative;
	// 	// z-index: 1000;
	// 	.scroll-list{
			
	// 		.goods-detail-snaplist-box{
	// 			// transition: all .5s;
	// 			// width: 690upx;
	// 			height: 80upx;
	// 			font-size: 18upx;
	// 			letter-spacing: 0;
	// 			line-height: 1;
	// 			background-color: #fff;
	// 			border-bottom: 2upx solid #eee;
	// 			display: flex;
	// 			align-items: center;
	// 			.snaplist-img{
	// 				width: 42upx;
	// 				height: 42upx;
	// 				border-radius: 50%;
	// 				overflow: hidden;
	// 				margin-right: 4upx;
	// 				display: flex;
	// 				justify-content: center;
	// 				align-items: center;
	// 				/deep/ .img-content{
	// 					width: 42upx;
	// 					height: 42upx;
	// 				}
	// 			}
	// 			.snaplist-red{
	// 				padding: 0 5upx;
	// 				color: #F44D81;
	// 				font-size: 18upx;
	// 				line-height: 1;
	// 				letter-spacing: 0;
	// 			}
	// 			.snaplist-date{
	// 				padding-left: 5upx;
	// 				color: #aaa;
	// 				font-size: 18upx;
	// 				line-height: 1;
	// 				letter-spacing: 0;
	// 			}
	// 		}
	// 	}
	// }
	
	
	
</style>
