<template>
  <!-- 当前在线人数明细 -->
  <el-dialog title="当前在线人数明细" :visible.sync="teamOnline_Visable" width="60%">
    <el-table
      :data="teamOnline_list.list"
      border
      style="width: 100%"
      empty-text="没有符合查询条件的数据！"
    >
     <el-table-column label="序号" width="84" prop="">
            <template  slot-scope="scope">
                     <span>{{(currentPage - 1) * page_size + scope.$index + 1}}</span>
            </template>
      </el-table-column>
      <el-table-column label="所属层级" width="" prop="">
        <template  slot-scope="scope">
          <span>{{ scope.row.hierarchy>=1?'代理':'会员' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="" prop="username">
      </el-table-column>
      <el-table-column label="最后登录时间" width="" prop="lastLoginTime">
      </el-table-column>
      <el-table-column label="余额" width="" prop="useMoney">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page-box">
      <el-pagination
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
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="teamOnline_Visable = false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      total: 0,
      page_size: 10,
      page_sizes: [10, 20, 30, 40, 50],
      teamOnline_Visable:false,
      teamOnline_list:[],
      total_count:null
    };
  },
  methods:{
      // 分页
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.page_size = val;
      this.getAgentRechargeList();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getAgentRechargeList();
    },
     /* 
     ** 首冲人数明细
     1、无参数
     2、参数 accountID page page_size
    */
    getAgentRechargeList(){
      this.$get("Pc.Agent.getOnlineMemberList", {
            accountID: this.$parent.accountID,
            page:this.currentPage,
            page_size:this.page_size,
        }).then((res) => {
            if (res.code == 0) {
            this.teamOnline_list=res.data;
            this.total_count=Number(res.data.total_count)
            // console.log(this.teamOnline_list);
            } else {
            return this.$message.error(res.message);
            }
        });
    },
  }
};
</script>

<style lang="scss" scoped>
.total {
  padding: 0 10px;
  font-size: 12px;
  color: #666;
  background: #f7f7f7;
  border: 1px solid #eee;
  text-align: center;
  .el-row {
    height: 30px;
    line-height: 30px;
    span {
      text-align: left;
      display: inline-block;
      width: 84px;
      height: 28px;
      float: left;
    }
    .lastone {
      width: 52px;
    }
    .firstone {
      width: 168px;
    }
  }
}
</style>