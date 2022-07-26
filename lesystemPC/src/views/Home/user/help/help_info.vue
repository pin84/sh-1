<template>
    <div>
		<div class="user_content_blcok_title">
		        {{title}}
		</div>
        <div class="user_content_blcok_line"></div>
        <div class="news_content">
            <div v-html="news_content"></div>
        </div>
    </div>
	</div>
</template>
<script>
export default {
    props: {},
    data() {
      return {
          id:1,
		  title:'',
		  news_content:'',
      };
    },
    watch: {},
    computed: {},
    methods: {
        get_news_info:function(){
            this.$get('Pc.Help.getHelpInfo',{id:this.id}).then(res=>{
                this.news_content = res.data.help_content;
				this.title = res.data.help_title;
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
		    return this.$message.error('请检查帮助文档是否存在');
		}
		this.get_news_info();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.user_content_blcok_title{    background-color: #fff;
    padding: 15px;
    border-radius: 8px;}
.news_content{
	min-height: 200px;
	display: block;
	padding: 20px;
	    background-color: #ffffff;border-radius: 8px;
	
}
.news_content img{max-width: 90%;overflow: hidden;}

.news_date{
    font-size: 14px;
    color:#666;
	margin: 0 auto;
    display: block;
    line-height: 35px;
    text-align: center;
}

</style>