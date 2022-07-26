<template>
	<div class="news">
		<!-- <div class="shop_top">
			<ShopHeader></ShopHeader>
		</div> -->
		<div class="shop_top">
			<template v-if="SiteConfig.theme == 'blue'">
				<ShopHeader> </ShopHeader>
			</template>
			<template v-if="SiteConfig.theme == 'ylc'">
				<shop-top :subnav_show="false" :change_color="true"></shop-top>
			</template>
		</div>
		<div class="mobile_main">
			<div class="main_top">
				<div class="main_style w_1080">
					<div class="mobile_icon"></div>
					<div class="download_s">
						<div class="download">
							<div class="down_item">
								<a href="/mobile"><i class="iconfont icon-shouji1"></i>手机H5版</a>
								<a class="ios_down" href="/mobile"><i class="iconfont icon-ios"></i>安卓Iphone版下载</a>
							</div>
							<div class="mobile_erweima">
								<div class="erweima_android">
									<img src="/images/ylc/zhqrcode.png" alt="H5" width="148" height="148">
									<p>扫一扫二维码进入H5版</p>
								</div>
								<div class="erweima_ios">
									<img src="/images/ylc/appqrcode.png" alt="Android Ios" width="148" height="148">
									<p>扫一扫二维码下载App版</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!--main end-->
		<template v-if="SiteConfig.theme == 'blue'">
		<blueShopFoot></blueShopFoot>
		</template>
		<template v-if="SiteConfig.theme == 'ylc'">
			<shop-foot></shop-foot>
		</template>
	</div>
</template>
<script>
	import ShopTop from "@/components/home/public/head.vue";
	import ShopFoot from "@/components/home/public/shop_foot.vue";
	import ShopHeader from "@/views/NewHome/components/head.vue";
	import blueShopFoot from "@/views/NewHome/components/shop_foot.vue";
	export default {
		props: {},
		data() {
			return {
				gameListData: [],
			};
		},
		components:{
			ShopTop,
			ShopFoot,
			ShopHeader,
			blueShopFoot
		},
		watch: {},
		computed: {},
		methods: {


		},
		created() {},
		mounted() {}
	};
</script>
<style lang="scss" scoped>
	.user_index_news_list {
		margin-bottom: 10px;
		margin: 0px auto;
		min-height: 350px;
	}

	.home_fy_block {
		width: 1000px;
		margin: 20px auto;
	}

	.order_time {
		margin-left: 20px;
		color: #666;
		float: right;
		font-size: 12px;
	}

	.main_top {
		background: url(/images/2021/app_top_bg.jpg) no-repeat top center;
		height: 627px;
		margin: 0 0 20px;
		position: relative;
	}

	.main_style {
		height: 627px;
		margin:0px auto 45px;
	}
	.mobile_icon {
	    width: 430px;
	    height: 627px;
	    float: left;
	    background: url(/images/2021/mobile_icon.png) no-repeat center center;
	    display: inline-block;
	    *zoom: 1;
	    *display: inline;
	}
	.download_s {width: 590px;height: 269px;float:left;display: inline-block;vertical-align: top;margin-top: 307px;    margin-left: 160px;}
	.download{margin-left: 43px;}
	.down_item{margin:0 0 20px 10px;}
	.download .down_item a {
	    position: relative;
	    display: inline-block;
	    zoom: 1;
	    width: 166px;
	    padding-left: 50px;
	    height: 50px;
	    line-height: 50px;
	    text-align: center;
	    margin-right: 60px;
	    color: #fff;
	    font-size: 14px;
	    border-radius:5px;
	    background:#af31f1;
	}
	.down_item a i {position: absolute;font-size:40px;left: 0;width: 50px;height: 50px;display: inline-block; *display: inline; *zoom: 1;}
	.down_item .ios_down i{background-position: 6px 6px;}
	.mobile_erweima img{width:148px; height: 148px; border:6px solid #c41e2a;background:#fff;}
	.mobile_erweima>div{display:inline-block;*display:inline;*zoom:1;margin-right: 42px;width: 194px;height: 160px;text-align: center;font: 14px/24px Microsoft Yahei;float:left;}
	.mobile_erweima .erweima_android p,.mobile_erweima .erweima_ios p {color: #cf1d29;font-size:14px;text-align:center;margin-top: 8px;}
	.mobile_erweima .erweima_ios {margin-right:0;}
</style>
