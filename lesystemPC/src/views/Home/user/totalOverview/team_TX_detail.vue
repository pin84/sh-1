<template>
  <!-- 团队提现明细 -->
  <el-dialog title="团队提现明细" :visible.sync="teamTX_Visable" width="60%">
    <el-table
      :data="teamTX_list.list"
      border
      style="width: 100%"
      empty-text="没有符合查询条件的数据！"
    >
      <el-table-column label="订单号" width="84" prop="id">
      </el-table-column>
      <el-table-column label="用户名" width="" prop="username">
      </el-table-column>
      <el-table-column label="提现时间" width="" prop="apply_time">
      </el-table-column>
      <el-table-column label="提现金额" width="" prop="actualMoney">
      </el-table-column>
      <el-table-column label="提现银行" width="" prop="bank_name">
      </el-table-column>
      <el-table-column label="银行卡尾数" width="" prop="card_id">
      </el-table-column >
      <el-table-column label="手续费" width="" prop="charges"> </el-table-column>
      <el-table-column label="备注" width="" prop="Remark"></el-table-column>
      <el-table-column label="充值状态" width="" prop="statcn"></el-table-column>
    </el-table>
    <div class="total" v-if="teamTX_list">
      <el-row no-gutter>
        <el-col :span="24">
          <span>总笔数：{{ teamTX_list.total_count }}</span>
          <span></span>
          <span></span>
          <span></span>
          <span>提现成功：{{ teamTX_list.successOutMoney }}</span>
        </el-col>
      </el-row>
    </div>
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
      <el-button type="primary" @click="teamTX_Visable = false">关闭</el-button>
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
      teamTX_Visable:false,
      teamTX_list:[],
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
     ** 团队提现
     1、无参数
     2、参数 accountID isContainSub =1 startTime endTime page page_size status =1
    */
    getAgentRechargeList(){
      this.$get("Pc.Agent.getAgentWithdrawList", {
            accountID: this.$parent.accountID,
            isContainSub:1,
            startTime:this.$parent.info.select_time[0],
            endTime:this.$parent.info.select_time[1],
            page:this.currentPage,
            page_size:this.page_size,
            status:1
        }).then((res) => {
            if (res.code == 0) {
            this.teamTX_list=res.data;
            this.total_count=Number(res.data.total_count)
            // console.log(this.teamTX_list);
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
      width: 104px;
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