<template>
	<div class="news">
	<div class="shop_top">
		<ShopHeader></ShopHeader>
	</div>
    <div class="user_content_blcok w_1080">
		<div data-v-76a29814="" class="user_content_blcok_title" style="position: relative;">
		        {{title}}
		    </div>
        <div class="user_content_blcok_line"></div>
        <div class="news_date">{{publish_time}}</div>
        <div class="news_content">
            <div v-html="news_content"></div>
        </div>
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
          id:1,
		  title:'',
		  publish_time:'',
		  news_content:'',
      };
    },
    watch: {},
    computed: {},
    methods: {
        get_news_info:function(){
            this.$get('Pc.News.getNewsInfo',{id:this.id}).then(res=>{
                this.news_content = res.data.content;
				this.title = res.data.title;
				this.publish_time=res.data.publish_time;
				//this.current_page = res.data.page_count;
            });
        },
        // 分页改变
        current_change:function(e){
            this.current_page = e;
            this.get_news_info();
        },

    },
    created() {
        //
		this.id = this.$route.params.id;
		if(this.$isEmpty(this.id)){
		    return this.$message.error('请检查新闻是否存在');
		}
		this.get_news_info();
    },
    mounted() {}
};
</script>
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