<template>
	<view class="orders-list">
		
		<view class="orders-list-title">
			<view class="orders-list-title-box" v-for="(item,index) in titleList" :key='index' :class="{'title-red':item.selected}" @click="selectTitle(index)">
				{{item.value}}
			</view>
		</view>
		<view class="orders-list-line">
			<view class="orders-list-line-item" :style="'width:'+ 750/titleLength +'upx;transform:translateX('+ underline_offset +'upx);'"></view>
		</view>
		
		<view class="orders-list-content">
			<view class="orders-list-content-box" v-for="(item,index) in orderList" :key='index'>
				<view class="content-box-img">
					<image class="content-box-img-content" :src="item.user_headimg" mode=""></image>
				</view>
				<view class="content-box-text">
					<view class="content-box-text-up">
						<view class="text-up-nickname">{{item.nickname}}</view>
						<view class="text-up-time">{{item.create_time}}</view>
					</view>
					<view class="content-box-text-down">
						抢购
						<text class="text-down-num">{{item.num}}</text>
						张
						<text class="text-down-goods">{{item.goods_name}}</text>
					</view>
					
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	
	export default{
		name:'diyOrdersList',
		props:{
			partTabData:{
				type: Array,
				default: () => {
					return [];
				}
			},
			awardTabData:{
				type: Array,
				default: () => {
					return [];
				}
			}
		},
		data(){
			return{
				
				titleList:[
					{
						value:'最新参与记录',
						selected:true
					},
					{
						value:'最新获奖记录',
						selected:false
					}
				],
				titleLength:0,
				titleIndex:0,
				underline_offset:0,
				orderList:[]
				
				
			}
		},
		onLoad(){
			
		},
		created(){
			
			this.titleLength = this.titleList.length
			
		},
		mounted() {
			
			// console.log('参与的')
			// console.log(this.partTabData)
			
			// console.log('获奖的')
			// console.log(this.awardTabData)
			
			this.orderList = this.partTabData
			
		},
		watch:{
			partTabData(){
				this.selectTitle(0)
			},
			awardTabData(){
				this.selectTitle(1)
			}
		},
		methods:{
			
			selectTitle(index){
				
				this.titleList.forEach((ite,ind)=>{
					
					this.titleList[ind].selected = false
					
				})
				
				this.titleList[index].selected = true
				
				this.titleIndex = index
				
				this.underline_offset = (750 / this.titleLength) * index
				
				if(index == 0){
					
					this.orderList = this.partTabData
					
				}else if(index == 1){
					
					this.orderList = this.awardTabData
					
				}
				
				this.$emit('indexChange',index)
			}
			
			
		}
		
		
	}
	
</script>

<style>
	
	.orders-list{
		width: 750upx;
		background-color: #fff;
	}
	.orders-list-title{
		width: 750upx;
		display: flex;
		align-items: center;
	}
	.orders-list-title .orders-list-title-box{
		flex: 1;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 32upx;
		letter-spacing: 2upx;
	}
	.orders-list-title .title-red{
		color: #F44D81;
	}
	.orders-list-line{
		height: 4upx;
		width: 750upx;
		background-color: #eee;
	}
	.orders-list-line .orders-list-line-item{
		transition: all .5s;
		height: 4upx;
		background-color: #F44D81;
	}
	.orders-list-content{
		width: 750upx;
		padding: 0 25upx;
		box-sizing: border-box;
	}
	.orders-list-content-box{
		width: 700upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 110upx;
		border-bottom: 1upx solid #eee;
	}
	.orders-list-content-box .content-box-img{
		width: 66upx;
		height: 66upx;
		border-radius: 50%;
		overflow: hidden;
	}
	.content-box-img .content-box-img-content{
		width: 66upx;
		height: 66upx;
	}
	.orders-list-content-box .content-box-text{
		width: 620upx;
		height: 110upx;
		padding: 18upx 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.content-box-text .content-box-text-up{
		width: 620upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.content-box-text-up .text-up-nickname{
		flex: 5;
		white-space: nowrap;
		font-size: 28upx;
		letter-spacing: 1upx;
		line-height: 1;
		box-sizing: border-box;
		padding-right: 4upx;
	}
	.content-box-text-up .text-up-time{
		flex: 3;
		color: #999;
		font-size: 22upx;
		text-align: center;
		letter-spacing: 0;
		line-height: 1;
	}
	.content-box-text .content-box-text-down{
		white-space: nowrap;
		height: 28upx;
		line-height: 1;
		display: flex;
		width: 620upx;
		overflow-x: hidden;
		color: #999;
		font-size: 21upx;
		letter-spacing: 0;
	}
	.content-box-text-down .text-down-num{
		white-space: nowrap;
		color: red;
		line-height: 1;
		font-size: 26upx;
		letter-spacing: 0;
		margin: 0 8upx;
	}
	.content-box-text-down .text-down-goods{
		white-space: nowrap;
		margin-left: 6upx;
		color: #999;
		line-height: 1;
		font-size: 21upx;
		letter-spacing: 0;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	// .orders-list{
	// 	width: 750upx;
	// 	background-color: #fff;
	// 	.orders-list-title{
	// 		width: 750upx;
	// 		display: flex;
	// 		align-items: center;
			
	// 		.orders-list-title-box{
	// 			flex: 1;
	// 			height: 90upx;
	// 			line-height: 90upx;
	// 			text-align: center;
	// 			font-size: 32upx;
	// 			letter-spacing: 2upx;
	// 		}
	// 		.title-red{
	// 			color: #F44D81;
				
	// 		}
			
	// 	}
		
		
	// 	.orders-list-line{
	// 		height: 4upx;
	// 		width: 750upx;
	// 		background-color: #eee;
	// 		// margin-bottom: 100upx;
	// 		.orders-list-line-item{
	// 			transition: all .5s;
	// 			height: 4upx;
	// 			background-color: #F44D81;
				
	// 		}
	// 	}
		
		
		
	// 	.orders-list-content{
	// 		width: 750upx;
	// 		padding: 0 25upx;
	// 		box-sizing: border-box;
	// 		.orders-list-content-box{
				
	// 			width: 700upx;
	// 			display: flex;
	// 			justify-content: space-between;
	// 			align-items: center;
	// 			height: 110upx;
	// 			border-bottom: 1upx solid #eee;
				
	// 			.content-box-img{
	// 				width: 66upx;
	// 				height: 66upx;
	// 				border-radius: 50%;
	// 				overflow: hidden;
	// 				.content-box-img-content{
	// 					width: 66upx;
	// 					height: 66upx;
	// 				}
	// 			}
	// 			.content-box-text{
	// 				width: 620upx;
	// 				height: 110upx;
	// 				padding: 18upx 0;
	// 				box-sizing: border-box;
	// 				display: flex;
	// 				flex-direction: column;
	// 				justify-content: space-between;
					
	// 				.content-box-text-up{
	// 					width: 620upx;
	// 					display: flex;
	// 					justify-content: space-between;
	// 					align-items: center;
						
	// 					.text-up-nickname{
	// 						flex: 5;
	// 						white-space: nowrap;
	// 						font-size: 28upx;
	// 						letter-spacing: 1upx;
	// 						line-height: 1;
	// 						box-sizing: border-box;
	// 						padding-right: 4upx;
	// 					}
	// 					.text-up-time{
	// 						// background-color: pink;
	// 						flex: 3;
	// 						color: #999;
	// 						font-size: 22upx;
	// 						text-align: center;
	// 						letter-spacing: 0;
	// 						line-height: 1;
	// 					}
						
	// 				}
	// 				.content-box-text-down{
	// 					white-space: nowrap;
	// 					height: 28upx;
	// 					line-height: 1;
	// 					display: flex;
	// 					width: 620upx;
	// 					overflow-x: hidden;
	// 					color: #999;
	// 					font-size: 21upx;
	// 					letter-spacing: 0;
	// 					.text-down-num{
	// 						white-space: nowrap;
	// 						color: red;
	// 						line-height: 1;
	// 						font-size: 26upx;
	// 						letter-spacing: 0;
	// 						margin: 0 8upx;
							
	// 					}
	// 					.text-down-goods{
	// 						white-space: nowrap;
	// 						margin-left: 6upx;
	// 						color: #999;
	// 						line-height: 1;
	// 						font-size: 21upx;
	// 						letter-spacing: 0;
	// 					}
	// 				}
	// 			}
				
	// 		}
	// 	}
		
		
	// }
	
	
</style>
