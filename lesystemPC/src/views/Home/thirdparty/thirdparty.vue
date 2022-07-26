<template>
	<div class="news">
	<div class="shop_top">
		<ShopHeader></ShopHeader>
	</div>
    <div class="user_content_blcok w_1080">

    </div>
	<!--main end-->
	<shop-foot></shop-foot>
	</div>
</template>
<script>
	import ShopHeader from "@/components/home/public/head.vue"
	import ShopFoot from "@/components/home/public/shop_foot.vue"
export default {
    components: {
		ShopHeader,
		ShopFoot,
	},
    props: {},
    data() {
      return {
          gameId:-1,
		  channelId:-1,
		  thirdpartyUrl:'',
      };
    },
    watch: {},
    computed: {},
    methods: {
        get_url:function(){
            this.$get('Pc.ThirdPartyGame.getThirdPartyGameLoginUrl',{gameId:this.gameId,channelId:this.channelId}).then(res=>{
				if (res.code == 0) {	
                this.thirdpartyUrl = res.data;
				location.href =this.thirdpartyUrl; 
				}
				
				// else if(res.code == -9999){
				// 	this.$router.push({ path: "/user/login" });
				// 	return;
				// }
				else{
					this.$alert( res.message, {
					  showClose: true,
					});
					// this.$message({
					//           message: res.message,
					//           type: 'warning'
					//         });
				}
            });
        },

    },
    created() {
		
		
        //
		let token = localStorage.getItem("token");
		if (token == undefined || token == "" || token == null) {
		  this.$router.push({ path: "/user/login" });
		  return;
		}
		
		
		let loading = this.$loading({
		  lock: true, //lock的修改符--默认是false
		  text: "加载中，请耐心等待！", //显示在加载图标下方的加载文案
		  spinner: "el-icon-loading", //自定义加载图标类名
		  background: "rgba(0, 0, 0, 0.7)", //遮罩层颜色
		  target: document.querySelector(".user_content_blcok"),
		}); 
		
		
		let { gameId,channelId} = this.$route.query;
		this.gameId = gameId;
		this.channelId = channelId;
		if(this.$isEmpty(this.gameId)){
		    return this.$message.error('请检查参数id是否存在');
		};
		if(this.$isEmpty(this.channelId)){
		    return this.$message.error('请检查频道id是否存在');
		}
		this.get_url();
    },
    mounted() {}
};
</script>
<style lang="scss">
	.el-loading-spinner i{    color: #ffffff;font-size: 49px;}
	.el-loading-spinner .el-loading-text {
	    color: #ffffff;
	    margin: 3px 0;
	    font-size: 18px;
	}
</style>
<style lang="scss" scoped>
.news_content{
	min-height: 200px;
	display: block;
	padding: 20px;
	    background-color: #f5f5f5
}

.news_date{
    font-size: 14px;
    color:#666;
	margin: 0 auto;
    display: block;
    line-height: 35px;
    text-align: center;
}

</style>