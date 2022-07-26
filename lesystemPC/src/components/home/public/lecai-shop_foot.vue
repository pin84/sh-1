<template>
	<div class="footer">
		<div class="kong"></div>
		<div class="hr"></div>
		<div class="footer1">
			<ul>
				<li class="wz"><a href="#">网站首页</a></li>
				<li class="sx"></li>
				<li class="wz"><a href="#">手机购彩</a></li>
				<li class="sx"></li>
				<li class="wz"><a href="#">优惠活动</a></li>
				<li class="sx"></li>
				<li class="wz"><a href="#">平台公告</a></li>
				<li class="sx"></li>
				<li class="wz"><a href="#">走势图表</a></li>
				<li class="sx"></li>
				<li class="wz"><a href="#">资讯</a></li>
				<li class="sx"></li>
				<li class="wz"><a href="#">在线客服</a></li>
			</ul>
		</div>
		<div class="footer2">
			<ul class="fnav">
				<li><a href="#"><img src="/images/secure.png"></a></li>
				<li><a href="#"><img src="/images/aqjc.png"></a></li>
				<li><a href="#"><img src="/images/xyqy.png"></a></li>
				<li><a href="#"><img src="/images/kxrz.png"></a></li>
				<li><a href="#"><img src="/images/bzzx.png"></a></li>
				<li><a href="#"><img src="/images/dzbz.png"></a></li>
				<li><a href="#"><img src="/images/sfyz.png"></a></li>
				<li><a href="#"><img src="/images/bazz.png"></a></li>
			</ul>
		</div>
		<div class="kong"></div>
		<div class="footer3">
			<ul class="fnav">
				<li><a href="#"><img src="/images/cxwz.png"></a></li>
				<li><a href="#"><img src="/images/jbzx.png"></a></li>
				<li><a href="#"><img src="/images/bjfw.png"></a></li>
				<li><a href="#"><img src="/images/zfb.png"></a></li>
				<li><a href="#"><img src="/images/cft.png"></a></li>
			</ul>
		</div>
		<div class="kong"></div>
		<div class="footer4">
			<h1 class="h1">Copyright2009-2019@乐彩彩票 保留所有权利</h1>
			<h1 class="h2">乐彩彩票郑重提示：彩票有风险，投注需谨慎！不向未满18周岁青少年出售彩票。</h1>
		</div>
	</div>
</template>
<script>
	export default {
		props: {},
		data() {
			return {
				adv: {},
				info: {},
			};
		},
		watch: {},
		computed: {},
		methods: {
			// get_foot_info:function(){
			//     this.$get(this.$api.homeGetFootInfo).then(res=>{
			//         this.adv = res.data.adv.adv[0];
			//         this.info = res.data.info;
			//     });
			// }
		},
		created() {
			//this.get_foot_info();
		},
		mounted() {}
	};
</script>
<style lang="scss" scoped>
	.footer {
		width: 1185px;
		margin: 0 auto;
	}

	.footer1 {
		width: 540px;
		margin: 0 auto;
		padding-top: 52px;
	}

	.footer1 ul {
		overflow: hidden;
	}

	.footer1 ul li {
		float: left;
		height: 30px;
		line-height: 30px;
	}

	.footer1 ul li.wz a {
		font-size: 12px;
		color: #404040;
		height: 30px;
		line-height: 30px;
	}

	.footer1 ul li.sx {
		width: 1px;
		height: 13px;
		background-color: #404040;
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 9px;
	}

	.footer2 {
		width: 965px;
		margin: 0 auto;
	}

	.footer2 ul {
		margin-top: 5px;
	}

	.footer2 ul li {
		float: left;
		margin-left: 13px;
	}

	.footer3 {
		width: 590px;
		margin: 0 auto;
		clear: both;
	}

	.footer3 ul {
		margin-top: 10px;
	}

	.footer3 ul li {
		float: left;
		margin-left: 13px;
	}

	.footer4 {
		text-align: center;
	}

	.footer4 h1 {
		font-size: 14px;
		font-weight: normal
	}

	.kong {
		clear: both;
	}

	.hr {
		clear: both;
		margin-top: 39px;
		width: 100%;
		height: 2px;
		background-color: #dedede;
	}
</style>
