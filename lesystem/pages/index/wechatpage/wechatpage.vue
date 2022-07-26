<template>
	<view class="wepage">
		<div class="zhezhao"></div>
		<div class="jiantou"></div>
		<div class="desc">
		 <div> <span class="number">1</span> 点击右上角的 ... 按钮 </div>
		 <div> <span class="number">2</span> 选择在浏览器 中打开</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad(data) {
			if(!this.$util.isWeiXin()){
				let url = data.page;
				if(url!=undefined && url!=''){
					url = unescape(url);
					window.location.href= url;
				}
				else{
					window.location.pathname = '/';
				}
			}
			
		}
		
	}
</script>

<style lang="scss">
.wepage{position: relative;background: #16d5cb  url('/static/images/2020/kuailegou_bg.jpg') top/cover no-repeat;width: 750rpx; 
	    height: 100vh; }
.zhezhao{
	background: #000000; 
	    position: fixed; 
	    left: 0px; 
	    top: 0px; 
	    width: 750rpx; 
	    height: 100vh; 
	    z-index: 20; 
	    filter: alpha(opacity=80); 
	    opacity: 0.8 !important; 
}
.desc{position: absolute;top:180rpx;left:50rpx;z-index: 21;font-size: 48rpx; color:#fff; font-weight: 300;}
.desc div{margin-bottom: 20rpx;}
.number{display: inline-block; height: 80rpx;line-height: 80rpx;width: 80rpx;border-radius:35%;color: #FFFFFF;background-color: #dc1010;text-align: center;margin-right: 30rpx;}
.jiantou{position: absolute;top:0px; right:0px; height:132rpx; width:200rpx ;z-index: 21;background: url(/static/images/2020/jiantou.png) no-repeat; background-size:100% 100%; }
</style>
