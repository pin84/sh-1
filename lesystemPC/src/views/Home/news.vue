<template>
	<div class="news">
	<div class="shop_top">
		<ShopHeader></ShopHeader>
	</div>
    <div class="user_content_blcok w_1080">
		<div data-v-76a29814="" class="user_content_blcok_title" style="position: relative;">
		        新闻资讯
		    </div>
        <div class="user_content_blcok_line"></div>
        <div class="user_index_news_list" v-if="news_list.length>0">
            <div class="news_list" >
               <ul>
                    <li v-for="(vo,key) in news_list" :key="key">
                        <router-link :to="'/news_info/'+vo.id">
                        <div class="news_title">{{vo.title}}</div>                     
                        <div class="news_date">{{vo.publish_time}}</div>
                        </router-link>
                        <div class="clear"></div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 没有新闻则 -->
        <div class="empty_order" v-else>
            <dl>
                <dt><img src="/pc/not-common-icon.png" alt=""></dt>
                <dd>还没有新闻哟~</dd>
            </dl>
        </div>

        <div class="home_fy_block" v-show="news_list.length>0">
            <el-pagination @current-change="current_change" background layout="prev, pager, next,jumper,total" :total="total_count" :page-size="page_size" :current-page="current_page"></el-pagination>
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
          news_list:[],
          order_num:{},
          total_count:0, // 总条数
          page_size:10,
          current_page:1,
          order_no:'',
          order_type:'',
      };
    },
    watch: {},
    computed: {},
    methods: {
        get_news_list:function(){
            // console.log(this.order_type);
            this.$get('Pc.News.getNewsList',{page:this.current_page,page_size:this.page_size}).then(res=>{
                this.news_list = res.data.list;
				this.total_count = res.data.total_count;
				//this.current_page = res.data.page_count;
            });
        },
        // 分页改变
        current_change:function(e){
            this.current_page = e;
            this.get_news_list();
        },

    },
    created() {
        this.get_news_list();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.user_index_news_list{margin-bottom:10px;margin:0px auto; min-height:350px;}
.home_fy_block{width: 1000px;margin:20px auto;}
.order_time{margin-left: 20px;color:#666;float: right; font-size: 12px;}
.news_list{
    ul li{
        border-bottom: 1px solid #efefef;
        line-height: 35px;
		padding:1px 5px;
    }
	ul li:hover{
		background-color: #ffeaea;
	}
    ul li:last-child{
        border-bottom: none;
    }
}
.news_title{
    font-size: 12px;
    color:#666;
    width: 580px;
    float: left;
	font-weight: bold;
}
.news_date{
    font-size: 12px;
    color:#666;
    float: right;
    display: block;
    line-height: 40px;
    width: 200px;
    text-align: right;
}
</style>