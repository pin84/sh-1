<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      查看提款进度
    </div>
    <el-divider></el-divider>

    <div class="withdraw-box">
      <div class="search_content">
        <el-form :inline="true" :model="info">
          <el-form-item label="时间">
            <el-date-picker
              v-model="info.select_time"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['02:00:00', '02:00:00']"
              :picker-options="datePickerOptions"
              :default-value="timeDefaultShow"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="onsearch_WithdrawList"
              >查询</el-button
            >
          </el-form-item>
        </el-form>

        <div class="result_content">
          <el-table
            :data="info_detail"
            border
            style="width: 100%"
            empty-text="没有符合查询条件的数据！"
          >
            <el-table-column label="用户名" width="" prop="username">
            </el-table-column>
            <el-table-column label="时间" width="" prop="apply_time">
            </el-table-column>
            <el-table-column label="提现方式" width="" prop="BankName">
            </el-table-column>
            <el-table-column label="账户信息" width="180">
              <div v-if="scope.row.settingType ==0" slot-scope="scope">
                <p>银行卡姓名：{{scope.row.realName}}</p>
                <p>银行卡号：{{scope.row.card_id}}</p>
              </div>
              <div v-else slot-scope="scope">
                <p>主网协议：{{scope.row.usdtProtocol}}</p>
                <p>地址：{{scope.row.usdtAddress}}</p>
                <p>汇率：{{scope.row.exchangeRate}}</p>
                <p>USDT数量：{{scope.row.usdtAmount}}</p>
              </div>
            </el-table-column>
            <el-table-column label="金额" width="" prop="applyingAmount">
            </el-table-column>
            <el-table-column label="申请状态" width="" prop="statcn">
            </el-table-column>
            <el-table-column label="进度" width="" prop="applyProcess">
            </el-table-column>
            <el-table-column label="备注" width="" prop="remark">
            </el-table-column>
          </el-table>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        select_time: [],
      },
      info_detail: [],
      total_count: 0,
      page_count: 0,
      currentPage: 1,
      page_size: 10,
      page_sizes: [10, 20, 30, 40, 50],
      datePickerOptions: {
        disabledDate(time) {
          let lastday = Date.now() + 1 * 24 * 3600 * 1000;
          let curDate = new Date().getTime();
          let jiezhi = 35 * 24 * 3600 * 1000;
          let day35 = curDate - jiezhi;
          return time.getTime() > lastday || time.getTime() < day35;
        },
      },
    };
  },
  methods: {
     //初始化时间
    getNowTime() {
      var self = this;
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth(); //得到月份
      var date = now.getDate(); //得到日期
      var date2 = now.getDate() + 1; //得到日期
      var hour = " 02:00:00"; //默认时分秒 如果传给后台的格式为年月日时分秒，就需要加这个，如若不需要，此行可忽略
      month = month + 1;
      month = month.toString().padStart(2, "0");
      date = date.toString().padStart(2, "0");
      var defaultDate = `${year}-${month}-${date}${hour}`; //当日时间
      var defaultDate2 = `${year}-${month}-${date2}${hour}`; //第二天时间
      
      self.info.select_time = [defaultDate, defaultDate2];
    },
    // 获取提现信息
    onsearch_WithdrawList() {
      this.$get("Pc.Withdraw.getWithdrawList", {
        startTime: this.info.select_time[0],
        endTime: this.info.select_time[1],
        page: this.currentPage,
        page_size: this.page_size,
      }).then((res) => {

        console.log(res);
        if (res.code == 0) {
          this.info_detail = res.data.list.list;
          this.total_count= res.data.list.total_count
          // console.log(res.data)
        } else {
          return this.$message.error(res.message);
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.page_size = val;
      this.onsearch_WithdrawList();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.onsearch_WithdrawList();
    },
  },
  created() {
    this.timeDefaultShow = new Date();
    this.timeDefaultShow.setMonth(new Date().getMonth() - 1);
    this.getNowTime();
    this.onsearch_WithdrawList(); //初始化提现详情信息
  },
};
</script>

<style lang="scss">
.withdraw-box {
  padding-bottom: 15px;
  .el-input {
    width: 40%;
  }
  .num {
    font-size: 16px;
    font-weight: 700;
    color: #ca151e;
  }
  .tips {
    display: inline-block;
    margin-left: 10px;
    font-size: 12px;
    color: #999;
  }
  .withcard {
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0 15px;
    line-height: 32px;
    height: 32px;
  }
  table.info_table {
    width: 100%;
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-spacing: 0; /*去掉单元格间隙*/
    color: #606266;
    td {
      padding: 4px 15px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
    }
  }
  .bank_box {
    display: block;
    width: 400px;
    height: 50px;
    border: 1px solid #eee;
    margin: 6px 0;
    line-height: 50px;
    text-align: left;
    span {
      padding-right: 15px;
      display: inline-block;
      vertical-align: middle;
      margin-top: -38px;
    }
  }
  .bank_box.is_Sel {
    border-color: #ca151e;
  }
  .bank_box:hover {
    border-color: #ca151e;
  }
  .page-box{margin: 15px 0;}
}
</style>