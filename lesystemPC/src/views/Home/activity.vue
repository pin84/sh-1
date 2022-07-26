<template>
	<div class="news">
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
                     <ul>
                       <li v-for="(item, n) in list" :key="n" @click="openDetailImage(n)">
                         <img :src="item.activity_image_url" class="active_img_list" />
						
                       </li>
                     </ul>
				</div>
			</div>
		</div>
		<el-dialog
		  title="活动详情"
		  :visible.sync="centerDialogVisible "
		  width="40%"
		  center>
		  <div class="activity_image_enroll_url_div"><img :src="activity_image_enroll_url" class="activity_image_enroll_url" /></div>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
		

		<!--main end-->
		<template v-if="SiteConfig.theme == 'blue'">
		<blueShopFoot></blueShopFoot>
		</template>
		<template v-if="SiteConfig.theme == 'ylc'">
			<shop-foot></shop-foot>
		</template>
<!-- 		<shop-foot></shop-foot> -->
	</div>
</template>
<script>
	import ShopTop from "@/components/home/public/head.vue";
	import ShopFoot from "@/components/home/public/shop_foot.vue";
	import ShopHeader from "@/views/NewHome/components/head.vue";
	import blueShopFoot from "@/views/NewHome/components/shop_foot.vue";
	
	// import ShopHeader from "@/components/home/public/head.vue"
	// import ShopFoot from "@/components/home/public/shop_foot.vue"
	export default {
		components: {
			ShopTop,
			ShopFoot,
			ShopHeader,
			blueShopFoot
		},
		props: {},
		data() {
			return {
				list:[],
				centerDialogVisible:false,
				activity_image_enroll_url:'',
			
			};
		},
		watch: {},
		computed: {},
		methods: {
        openDetailImage(index){
			console.log(index);
			if(this.list.length>0){
				for(let i=0;i<this.list.length;i++){
					if(i==index){
						this.activity_image_enroll_url=this.list[i].activity_image_enroll_url;
					}
				}
			}
			this.centerDialogVisible=true;
		},
			getActivityList() {
                   this.$get('Pc.Activity.getActivityList').then(res=>{
					if (res.code == -9999) {
					  this.$router.push({ path: "/user/login" });
					  return;
					}
					if (res.code == 0) {
                   this.list = res.data.items;
				   console.log(this.list)
				   }
				//this.current_page = res.data.page_count;
               });
			},
		},
		created() {
			if(this.$isEmpty(localStorage.getItem('token'))){
			   this.$router.push({ path: "/user/login" });
			  return;
			  }
			this.getActivityList();
		},
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
		background: url(/images/2021/active_bg.jpg) repeat top center;
		height: auto;
		margin: 0 auto;
		position: relative;
	}

	.main_style {
		height: auto;
		    min-height: 500px;
		margin: 0px auto;
		    padding:20px 0px 50px 560px;
	}
	.active_img_list{
		width: 700px;
		height: 300px;
		margin: 0 auto;
		border-radius: 12px;
	}
	.activity_image_enroll_url_div{
		text-align: center;
		    height: 350px;
		    overflow-y: scroll;
	}
	.activity_image_enroll_url{
		width: 90%;
		height: auto;
	}
</style>
