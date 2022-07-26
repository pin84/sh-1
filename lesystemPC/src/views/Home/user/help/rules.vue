<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      网站帮助
    </div>
    <el-divider></el-divider>
    <div class="notice-box">
      <h3>游戏规则说明</h3>
	  <div class="news_list" >
	     <ul>
		<li v-for="(item,index) in noticeList" :key="index">        
                     <router-link :to="'/user/help/help_info/'+item.id">   <div class="news_title">{{index+1}}. {{item.help_title}}</div> </router-link> 
        </li>
		</ul>
      </div>
    </div>
    <el-pagination
      style="margin-top: 15px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="page_sizes"
      :page-size="page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total_count"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeList: [],
      total_count: 0,
      page_count: 0,
      currentPage: 1,
	  rulesHelpTypeId:5,//游戏规则的id是5
      page_size: 10,
      page_sizes: [10, 20, 30, 40, 50],
    };
  },
  methods: {
    // 获取公告列表
    getNoticeList() {
      this.$get("Pc.Help.getHelpListByType", {
        page: this.currentPage,
		helpType:this.rulesHelpTypeId,
        page_size: this.page_size,
      }).then((res) => {
        if (res.code == 0) {
          this.noticeList = res.data.list;
          this.total_count= res.data.total_count
          this.page_count= res.data.page_count
          // console.log(this.noticeList);
        } else {
          return this.$message.error(res.message);
        }
      });
    },
    t_index(index) {
      return (this.currentPage - 1) * this.page_size + index + 1;
    },
    // 分页
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.page_size = val;
      this.getNoticeList();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getNoticeList();
    },
  },
  created() {
    this.getNoticeList();
  },
};
</script>

<style lang="scss">
.notice-box {
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  h3 {
    line-height: 36px;
    background: #eee;
    font-size: 14px;
    padding-left: 10px;
    font-weight: normal;
  }
  .news_list li{height: 48px;
    line-height: 48px;
    padding: 0px 10px;}    
}
</style>