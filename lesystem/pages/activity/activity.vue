<template>
	<view class="special-offer" v-if="specialOfferList">
		<view class="special-offer-item" v-for="(item,index) in specialOfferList" :key='index' @click="toEventDetail(index)">     
			<image :src="item.activity_image_url" mode="widthFix"></image>
		</view>
		<view v-show="isEmpty" style="text-align: center;">
		暂无优惠信息。请登陆后再查看...
		</view>
		
		<uni-popup ref="popup" type="center">
			<view class="popup">
				<view class="popup-img">
					<image :src="eventDetailSrc" mode="widthFix"></image>
				</view>
				<view class="popup-btn" @click="closePopup">关闭</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import http from '@/common/js/http.js';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	
	export default{
		mixins: [http],
		components:{
			uniPopup
			
		},
		data(){
			return{
				page:1,
				page_size:10,
				specialOfferList:[],
				eventDetailSrc:'',
				isEmpty:false,
			}
		},
		onLoad(e) {
			// console.log(e);
			// this.getSpecialOfferList();
			
		},
		onShow(){
			this.getSpecialOfferList();
		},
		methods:{
			// 获取 优惠活动 列表数据
			getSpecialOfferList(){
				this.sendRequest({
					url:'System.Activity.getActivityList',
					data:{
						page:this.page,
						page_size:this.page_size
					},
					success:res=>{
						this.specialOfferList = res.data.items;
						if(this.specialOfferList == undefined ||this.specialOfferList ==null|| this.specialOfferList.length <=0){
							this.isEmpty=true;
						}
					},
					fail: (err) => {
						// #ifdef H5
						uni.showToast({
						  title: "网络连接超时，刷新页面重试！",
						  icon: "none",
						});
						// #endif
						//#ifdef APP-PLUS
						uni.showToast({
						  title: "网络超时.检查网络再重试",
						  icon: "none",
						});
						//#endif
						
					}
				})
			},
			// 点击活动图片后弹出对应到详情图
			toEventDetail(index){
				this.$refs.popup.open()
				this.eventDetailSrc = this.specialOfferList[index].activity_image_enroll_url
			},
			// 关闭弹框
			closePopup(){
				this.$refs.popup.close()
			}
			
		}
		
	}
</script>

<style lang="scss">
	
	
.special-offer{
	width: 750upx;
	padding: 15upx 0;
	.special-offer-item{
		width: 700upx;
		margin: 0 auto 15upx;
		border-radius: 12upx;
		overflow: hidden;
		image{
			vertical-align: top;
			width: 700upx;
		}
		
	}
	.popup{
		width: 600upx;
		max-height: 900upx;
		padding: 15upx;
		box-sizing: border-box;
		.popup-img{
			width: 570upx;
			image{
				width: 570upx;
			}
		}
		.popup-btn{
			width: 400upx;
			margin: 16upx auto 32upx;
			border: 1upx solid #eee;
			border-radius: 20upx;
			font-size: 30upx;
			color: #888;
			letter-spacing: 20upx;
			height: 66upx;
			line-height: 66upx;
			text-align: center;
			&:active{
				background-color: #fafafa;
			}
		}
	}
	
}
	
</style>
