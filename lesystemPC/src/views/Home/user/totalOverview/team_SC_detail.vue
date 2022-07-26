<template>
  <!-- 首充人数明细 -->
  <el-dialog title="首充人数明细" :visible.sync="teamSC_Visable" width="60%">
    <el-table
      :data="teamSC_list.list"
      border
      style="width: 100%"
      empty-text="没有符合查询条件的数据！"
    >
     <el-table-column label="序号" width="84" prop="">
            <template  slot-scope="scope">
                     <span>{{(currentPage - 1) * page_size + scope.$index + 1}}</span>
            </template>
      </el-table-column>
      <el-table-column label="用户名" width="" prop="userName">
      </el-table-column>
      <el-table-column label="所属层级" width="" prop="">
        <template  slot-scope="scope">
          <span>{{ scope.row.hierarchy>=1?'代理':'会员' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="充值类型" width="" prop="rechargeType">
      </el-table-column>
      <el-table-column label="流水号" width="" prop="flowId">
      </el-table-column>
      <el-table-column label="金额" width="" prop="amount">
      </el-table-column>
      <el-table-column label="手续费" width="" prop="depositFee">
      </el-table-column>
      <el-table-column label="注册时间" width="" prop="registerTime"> </el-table-column>
      <el-table-column label="充值时间" width="" prop="depositDate">
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
      <el-button type="primary" @click="teamSC_Visable = false">关闭</el-button>
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
      teamSC_Visable:false,
      teamSC_list:[],
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
     2、参数 accountID startTime endTime page page_size
    */
    getAgentRechargeList(){
      this.$get("Pc.Agent.getFirstRechargeList", {
            accountID: this.$parent.accountID,
            startTime:this.$parent.info.select_time[0],
            endTime:this.$parent.info.select_time[1],
            page:this.currentPage,
            page_size:this.page_size,
        }).then((res) => {
            if (res.code == 0) {
            this.teamSC_list=res.data;
            this.total_count=Number(res.data.total_count)
            // console.log(this.teamSC_list);
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