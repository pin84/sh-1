<template>
	<div class="footer">
		<div class="footer-main width_center_1190">
			<div class="footer-img">
				<img src="/images/ylc/footer_b.png">
		    </div> 
			    <!--
				<div data-v-551b793e="" class="footer-nav"><a data-v-551b793e="" href="#/dc?id=ab" class="">
		          关于我们
		        </a><a data-v-551b793e="" href="#/dc?id=wd" class="">
		          如何存款
		        </a><a data-v-551b793e="" href="#/dc?id=dr" class="">
		          如何取款
		        </a><a data-v-551b793e="" href="#/dc?id=pb" class="">
		          常见问题
		        </a><a data-v-551b793e="" href="#/dc?id=rs" class="">
		          责任博彩
		        </a><a data-v-551b793e="" href="#/dc?id=rl" class="">
		          协议与规则
		        </a><a data-v-551b793e="" href="#/dc?id=pi" class="">
		          隐私声明
		        </a>
				</div> 
				-->
			<div class="footer-copyright"><span>版权声明：Copyright ©版权所有 Reserved</span></div></div>
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
		width: 100%;
		margin: 0 auto;
	}
    .footer-copyright{    width: 100%;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    cursor: default;color: #FFFDEF;}
</style>
