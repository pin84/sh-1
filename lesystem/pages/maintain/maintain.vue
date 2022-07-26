<template>
	<view class="bg" :style="{height:height+'px'}">
		<view>
			<image class="logo" src="/static/images/2020/yougou_logo.png" />
	   </view>
	   <view class="timer-box">
	               <h5>{{SiteConfig.siteName}}正在升级，将在{{maintainTime}}后开启:</h5>
	               <view id="countdown">
					   <FlipCountdown selectType="2" :endTimeString="maintainTime"></FlipCountdown>
	               </view>
	   </view>
	   <!--
	   <view  class=".uni-column  uni-center">
		   <view style="margin-top: 30rpx;color: #fff;"><text>{{MaintainTime}}</text></view>
		  <view style="margin-top: 30rpx;color: #fff;" @click="navigatorOut(kefu_address)"> <text>在线客服</text></view>
	   </view>
		-->
	</view>
</template>

<script>
	import http from 'common/js/http.js';
	import Config from 'common/js/config.js';
	//import FlipCountdown from "@/components/FlipCountdown/FlipCountdown.vue";
	import FlipCountdown from "@/components/FlipCountdown/flipcountdown-uni.vue";
	export default {
		components: {
			FlipCountdown,
		},
		data() {
			return {
				//websiteName:this.SiteConfig.siteName,
				height:1175,
				maintainTime:"",
				kefu_address:"",
				timer:null
			}
		},
		methods: {
			getWapPageLayout() {
				
				this.maintainTime = this.$util.getMaintainTime();
				//console.log(this.maintainTime)
				this.sendRequest({
					url: 'System.Params.getIndexParams',
					success: res => {
						uni.stopPullDownRefresh();
						let data = res.data;
						this.isMaintain = data.IsMaintain;
						if(this.isMaintain==1){
							let maintainTime = data.MaintainTime;
							this.$util.setMaintainTime(maintainTime);
							//this.kefu_address = data.kefu_address;
						}else{
						   this.$util.removeMaintainTime();
						   clearInterval(this.timer);
						   this.timer=null;
						   uni.switchTab({
							url:"/pages/default/default"
						  })
						}
						
					}
				});
				
				uni.getSystemInfo({
					success: (res) => {
						//计算页面的高度
							this.height = res.windowHeight;
					}
				});
			},
			navigatorOut(src) {
				this.$util.redirectTo('/pages/kefu/onlinekefu');
			}
			
		},
		//下拉刷新
		onPullDownRefresh() {
			this.getWapPageLayout();
		},
		onLoad(data) {
			//console.log(data);
			this.getWapPageLayout();
			this.timer = setInterval(this.getWapPageLayout, 30000);//30秒去读一次
		},
		mixins: [http],
		
			
	}
</script>

<style>
page{ background-color:#add4f5;background: url(/static/images/2020/download_bg.jpg) no-repeat center top;
    background-size: cover;}
	.logo{width:750rpx; height:118rpx;padding-top:60rpx;}
	.maintain-pic{width:626rpx; height:182rpx}
	.timer-box {
	width:650rpx;padding: 70rpx 10rpx;
	background: #f5f5f5;
	margin:100rpx auto;
	text-align: center;
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
	border-radius: 10px;
	
	-moz-box-shadow: 0 0 5px #000;
	-webkit-box-shadow: 0 0 5px#000;
	box-shadow: 0 0 5px #000;
	border: 1px solid #fff;
	}
	.timer-box h5 {
       padding-bottom: 20rpx;
	}
</style>
