<template>
	<view class="ippage">
		<div class="ku_txt">
		<i class="hintLogo"></i>
		<div>
		<h1 class="rh1">
			<i class="iprestcted_icon"></i>
		<span>
		访问受限
		</span> / <span>Access Restricted</span>
		</h1>
		</div>
		<p>
		很抱歉，由于您的所在地不在我们服务的允许范围内，我们暂时无法为您服务。
		<br>
		<span>
		The location in which you are trying to access this page has been restricted. We apologize for any inconvenience that this may have caused.
		</span>
		<br>
		<span style="color:orange;">
		IP:{{ip}}
		</span>
		</p>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ip:'',
			};
		},
		onLoad(data) {
			//console.log(data);
			if (data.ip!=undefined && data.ip!="")
			{
			   this.ip = data.ip;
			}
		}
	}
</script>

<style lang="scss">
	.ippage{
	    background-color: #0b6a65;
	    background-image: url('/static/images/2020/bg_restricted.jpg');
	    background-repeat: no-repeat;
	    background-position: top;
		height: 100vh;
	}
	div:after {
	    content: "";
	    display: block;
	    height: 0;
	    clear: both;
	    visibility: hidden;
	}
	
	.ku_txt {
	    margin: 0 auto;
		padding: 60rpx 0;
	    width: 750rpx;
	    height: auto;
	}
	.iprestcted_icon{
		margin: 0 10rpx;
		display: inline-block;
		background: url('/static/images/2020/icon_restricted.png');
		background-size: cover;
		width: 31rpx;
		height:25rpx ;
	}
	.hintLogo {
	    margin: 0 auto;
	    display: block;
		background: url('/static/images/2020/zhlogo.png');
		background-size: cover;
		width: 180rpx;
		height:82rpx ;
	}
	
	.ku_txt > div {
	    border-bottom: 1px solid rgba(255,255,255,0.6);
	    display: table;
	    margin: 0 auto;
	    padding: 10px 15px;
	}
	
	.ku_txt h1 {
	    color: #fff;
	    font-size: 32rpx;
	    display: inline-block;
	    line-height: 26rpx;
	    font-weight: bold;
	    margin-left: 10px;
	}
	
	.ku_txt p {
	   color: #c9c9c9;
	    font-size: 26rpx;
	    width: 80%;
	    margin: 20rpx auto 0;
	    background-color: #162135;
	    padding: 25rpx;
	    border-radius: 20rpx;
	}
	
	    .ku_txt p span {
	        font-weight: normal;
	    }


</style>
