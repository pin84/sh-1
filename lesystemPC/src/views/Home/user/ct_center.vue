<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      充提中心
    </div>
    <el-divider></el-divider>
    <!-- 游戏 -->
    <el-row>
      <el-col :span="24">
       <el-radio-group v-model="labelPosition" size="small">
        <el-radio-button label="czjl">充值记录</el-radio-button>
        <el-radio-button label="txjl">提现记录</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>

    <!-- 充值搜索 -->
    <div v-if="labelPosition=='czjl'" class="search_content">
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
        <el-form-item label="订单号">
          <el-input
            type="text"
            v-model="info.orderNum"
            placeholder="订单号"
          ></el-input>
        </el-form-item>
       <el-form-item label="用户名">
          <el-input
            type="text"
            v-model="info.accountName"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="充值状态">
          <el-select
            v-model="info.current_status"
            placeholder="状态"
            @change="change_status($event)"
          >
            <el-option
              v-for="item in status"
              :label="item.name"
              :value="item.value"
              :key="item.index"
            ></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item>
          <el-checkbox
            label="包含下级"
            v-model="isContainSub"
            @change="change_isContainSub($event)"
          ></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="onsearch_RechargeList">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="result_content">
        <el-table
          :data="rechargeList"
          border
          style="width: 100%"
          empty-text="没有符合查询条件的数据！"
        >
          <el-table-column fixed label="订单号" width="150" prop='recharge_id'>
          </el-table-column>
          <el-table-column label="用户名" width="120" prop="username">
          </el-table-column>
          <el-table-column label="充值时间" width="" prop="deposit_date">
          </el-table-column>
          <el-table-column label="充值金额" width="100" prop="amount">
          </el-table-column>
          <el-table-column label="充值方式" width="100" prop="paytypecn">
          </el-table-column>
          <el-table-column label="入款手续费" width="100" prop="deposit_fee">
          </el-table-column>
          <el-table-column label="优惠" width="100" prop="rebate">
          </el-table-column>
          <el-table-column label="充值状态" width="100" prop="statcn">
          </el-table-column>
          <el-table-column label="实际充值金额" width="100" prop="actual_amount">
          </el-table-column>
        </el-table>
        <div class="total" v-if="this.rechargeList.length>0">
        <el-row>
            <el-col :span='4'>总计：<span>{{totalNumber}}</span></el-col>
            <el-col :span='5'>充值成功：<span>{{totalSuccessMoney}}</span></el-col>
            <el-col :span='5'>充值失败：<span>{{totalFailedAmount}}</span></el-col>
            <el-col :span='5'>优惠：<span>{{totalRebate}}</span></el-col>
            <el-col :span='5'>实际充值金额：<span>{{totalActualAmount}}</span></el-col>
        </el-row>
        </div>
        
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

    <!-- 提现搜索 -->
     <div v-if="labelPosition=='txjl'" class="search_content">
      <el-form :inline="true" :model="tx_info">
        <el-form-item label="时间">
          <el-date-picker
            v-model="tx_info.select_time"
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
        <el-form-item label="订单号">
          <el-input
            type="text"
            v-model="tx_info.orderNum"
            placeholder="订单号"
          ></el-input>
        </el-form-item>
       <el-form-item label="用户名">
          <el-input
            type="text"
            v-model="tx_info.accountName"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="提现状态">
          <el-select
            v-model="tx_info.current_status"
            placeholder="状态"
            @change="change_status($event)"
          >
            <el-option
              v-for="item in tx_status"
              :label="item.name"
              :value="item.value"
              :key="item.index"
            ></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item>
          <el-checkbox
            label="包含下级"
            v-model="isContainSub"
            @change="change_isContainSub($event)"
          ></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="onsearch_WithdrawList">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="result_content">
        <el-table
          :data="withdrawList"
          border
          style="width: 100%"
          empty-text="没有符合查询条件的数据！"
        >
          <el-table-column fixed label="订单号" width="" prop='id'>
          </el-table-column>
          <el-table-column label="用户名" width="120" prop="username">
          </el-table-column>
          <el-table-column label="提现时间" width="100" prop="apply_time">
          </el-table-column>
          <el-table-column label="提现金额" width="100" prop="applyingAmount">
          </el-table-column>
          <el-table-column label="手续费" width="100" prop="charges">
          </el-table-column>
          <el-table-column label="提现方式" width="100" prop="BankName">
          </el-table-column>
          <el-table-column label="收款账户尾数" width="100" prop="account">
          </el-table-column>
          <!-- <el-table-column label="USDT数量" width="100" prop="uid">
          </el-table-column> -->
          <el-table-column label="USDT数量" width="100" prop="usdtAmount">
          </el-table-column>
          <el-table-column label="提现状态" width="100" prop="statcn">
          </el-table-column>
          <el-table-column label="备注" width="100" prop="refuse_reason">
          </el-table-column>
        </el-table>
        <div class="total" v-if="this.withdrawList.length>0">
        <el-row>
            <el-col :span='4'>总计：<span>{{tx_totalNumber}}</span></el-col>
            <el-col v-if="tx_info.current_status==-1 || tx_info.current_status==1 " :span='5'>提现成功：<span>{{tx_totalsuccessamount}}</span></el-col>
            <el-col v-if="tx_info.current_status==-1 || tx_info.current_status==2 "  :span='5'>提现失败：<span>{{tx_totalFailedAmount}}</span></el-col>
        </el-row>
        </div>
        
        <div class="page-box">
          <el-pagination
            @size-change="tx_handleSizeChange"
            @current-change="tx_handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="tx_page_sizes"
            :page-size="tx_page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tx_total_count"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

// BankName: "中国银行"
// account: "1236********749"
// apply_time: "2022-02-09 15:12:09"
// applyingAmount: 1200
// approve_status: 4
// card_id: "372"
// charges: 60
// exchangeRate: "0.0000"
// id: 629
// realName: "王平"
// refuse_reason: "不好"
// risk_operate_status: 1
// settingType: 0
// statcn: "提现失败"
// uid: 9348
// usdtAddress: null
// usdtAmount: 0
// usdtProtocol: null
// username: "ceshi168"

<script>
	import * as utilDate from "@/plugins/date"; //日期工具函数
export default {
  components: {},
  props: {},
  data() {
    return {
      info: {
        select_time: [],
        accountName: "",
        orderNum:'',
        current_status: -1,
        current_isContainSub: 1,
      },
      tx_info:{
        select_time: [],
        accountName: "",
        current_status: -1,
        current_isContainSub: 1,
        orderNum:''
      },
      status: [
        {
          name: "全部",
          value: -1,
        },
        {
          name: "充值成功",
          value: 1,
        },
        {
          name: "充值失败",
          value: 2,
        },
        {
          name: "等待支付",
          value: 0,
        },
      ],
      tx_status: [
        {
          name: "全部",
          value: -1,
        },
        {
          name: "提现成功",
          value: 1,
        },
        {
          name: "提现失败",
          value: 2,
        },
      ],
      isContainSub: true,
      datePickerOptions: {
        disabledDate(time) {
          let lastday = Date.now() + 1 * 24 * 3600 * 1000;
          let curDate = new Date().getTime();
          let jiezhi = 35 * 24 * 3600 * 1000;
          let day35 = curDate - jiezhi;
          return time.getTime() > lastday || time.getTime() < day35;
        },
      },
      timeDefaultShow: [],
      rechargeList: [],
      withdrawList:[],
      currentPage: 1,
      tx_currentPage: 1,

      orderDetail: [],
      page_count: 0,
      total_count: 0,
      tx_total_count:0,
      total: 0,
      page_size: 10,
      page_sizes: [10, 20, 30, 40, 50],
      tx_page_size: 10,
      tx_page_sizes: [10, 20, 30, 40, 50],
      totalNumber:'',
      totalSuccessMoney:'',
      totalFailedAmount:'',
      totalRebate:'',
      totalActualAmount:'',
      labelPosition:'czjl',
      tx_totalNumber:'',
      tx_totalsuccessamount:'',
      tx_totalFailedAmount:''

      
    };
  },
  watch: {},
  computed: {},
  methods: {
   
    //初始化时间
    // getNowTime() {
    //   var self = this;
    //   var now = new Date();
    //   var year = now.getFullYear(); //得到年份
    //   var month = now.getMonth(); //得到月份
    //   var date = now.getDate(); //得到日期
    //   var date2 = now.getDate() + 1; //得到日期
    //   var hour = " 02:00:00"; //默认时分秒 如果传给后台的格式为年月日时分秒，就需要加这个，如若不需要，此行可忽略
    //   month = month + 1;
    //   month = month.toString().padStart(2, "0");
    //   date = date.toString().padStart(2, "0");
    //   var defaultDate = `${year}-${month}-${date}${hour}`; //当日时间
    //   var defaultDate2 = `${year}-${month}-${date2}${hour}`; //第二天时间
      
    //   self.info.select_time = [defaultDate, defaultDate2];
    //   self.tx_info.select_time = [defaultDate, defaultDate2];
    // },
    //获取status
    change_status(status) {
      this.info.current_status = status;
    },
    //修改isContainSub
    change_isContainSub(contain) {
      if (contain == true) {
        this.info.current_isContainSub = 1;
      } else {
        this.info.current_isContainSub = 0;
      }
    },
    //获取充值订单
    onsearch_RechargeList() {
      this.rechargeList = [];
      this.$get("Pc.Recharge.getRechargeList", {
        startTime: this.info.select_time[0],
        endTime: this.info.select_time[1],
        accountName: this.info.accountName,
        orderNum:this.info.orderNum,
        isContainSub: this.info.current_isContainSub,
        page: this.currentPage,
        page_size: this.page_size,
        status: this.info.current_status,
      }).then((res) => {
        if (res.code == 0) {
          this.rechargeList = res.data.list;
          this.page_count = res.data.page_count;
          this.total_count = parseInt(res.data.total_count);
          //console.log(res.data);
          this.totalNumber=res.data.total.totalNumber
          this.totalSuccessMoney=res.data.total.totalSuccessMoney
          this.totalFailedAmount=res.data.total.totalFailedAmount
          this.totalRebate=res.data.total.totalRebate
          this.totalActualAmount=res.data.total.totalActualAmount
        } else {
          return this.$message.error(res.message);
        }
      });
    },

   //获取提现订单
    onsearch_WithdrawList() {
      this.withdrawList = [];
      this.$get("Pc.Withdraw.getAgentWithdrawList", {
        startTime: this.tx_info.select_time[0],
        endTime: this.tx_info.select_time[1],
        accountName: this.tx_info.accountName,
        orderNum:this.tx_info.orderNum,
        isContainSub: this.tx_info.current_isContainSub,
        page: this.tx_currentPage,
        page_size: this.tx_page_size,
        status: this.tx_info.current_status,
      }).then((res) => {
        if (res.code == 0) {
          this.withdrawList = res.data.list;
          this.page_count = res.data.page_count;
          this.tx_total_count = parseInt(res.data.total_count);
          //console.log(res.data);
          this.tx_totalNumber=res.data.totalInfo.totalNumber
          this.tx_totalsuccessamount=res.data.totalInfo.totalSuccessAmount
          this.tx_totalFailedAmount=res.data.totalInfo.totalFailedAmount
        } else {
          return this.$message.error(res.message);
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.page_size = val;
      this.onsearch_RechargeList();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.onsearch_RechargeList();
    },
    // 提现分页
    tx_handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.page_size = val;
      this.onsearch_WithdrawList();
    },
    tx_handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.tx_currentPage = val;
      this.onsearch_WithdrawList();
    },
  },
  created() {
    //初始化游戏种类
    this.timeDefaultShow = new Date();
    this.timeDefaultShow.setMonth(new Date().getMonth() - 1);
    //this.getNowTime();
	this.info.select_time =utilDate.getNowTimeAndTomorrowTimeRange("02:00:00","02:00:00");
	this.tx_info.select_time = utilDate.getNowTimeAndTomorrowTimeRange("02:00:00","02:00:00");
	
    //初始化订单
    this.onsearch_RechargeList();
    this.onsearch_WithdrawList();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.search_content {
  margin: 15px 0;
  .el-select.el-select--small {
    width: 150px;
  }
  .el-input.el-input--small {
    width: 150px;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 332px;
  }
}

.user_content_blcok_title {
  margin-bottom: 15px;
}
.page-box {
  margin: 20px auto;
}
.total{
    padding: 0 15px;
    font-size:12px;
    color: #666;
    background: #f7f7f7;
    border: 1px solid #eee;
    text-align: center;
    .el-row{
        height: 30px;
        line-height: 30px;
    }
    }
</style>