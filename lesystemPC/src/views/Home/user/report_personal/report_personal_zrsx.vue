<template>
  <!-- 报表搜索 -->
  <div class="search_content">
    <el-form :inline="true" :model="info">
      <el-form-item label="时间">
        <el-date-picker
          v-model="info.select_time"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="datePickerOptions"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="onsearch_BillsList">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="result_content">
      <el-table
        :data="personalChangeList"
        border
        style="width: 100%"
        empty-text="没有符合查询条件的数据！"
      >
        <el-table-column label="日期" width="110" prop="days">
        </el-table-column>
        <el-table-column label="充值" width="110" prop="rechargeAmount">
        </el-table-column>
        <el-table-column label="提款" width="110" prop="withdrawAmount">
        </el-table-column>
        <el-table-column label="投注金额" width="110" prop="betAmount">
        </el-table-column>
        <el-table-column label="有效投注" width="110" prop="effectiveAmount">
        </el-table-column>
        <el-table-column label="中奖金额" width="110" prop="zhongBonus">
        </el-table-column>
        <el-table-column label="退水金额" width="110" prop="waterAmount">
        </el-table-column>
        <el-table-column label="盈亏" width="" prop="winLossAmount">
        </el-table-column>
      </el-table>
      <div class="total" v-if="personalChangeList.length > 0">
        <el-row no-gutter>
          <el-col :span="24">
            <span>本页合计</span>
            <span>{{ personalChangeTotal.rechargeAmount }}</span>
            <span>{{ personalChangeTotal.withdrawAmount }}</span>
            <span>{{ personalChangeTotal.betAmount }}</span>
            <span>{{ personalChangeTotal.effectiveAmount }}</span>
            <span>{{ personalChangeTotal.zhongBonus }}</span>
            <span>{{ personalChangeTotal.waterAmount }}</span>
            <span class="lastone">{{ personalChangeTotal.winLossAmount }}</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import * as utilDate from "../../../../plugins/date"; //日期工具函数

export default {
  data() {
    return {
      info: {
        select_time: [],
      },
       gameCategory: [],
      personalChangeList:[],
      personalChangeTotal:[],
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
      var hour = " 12:00:00"; //默认时分秒 如果传给后台的格式为年月日时分秒，就需要加这个，如若不需要，此行可忽略
      month = month + 1;
      month = month.toString().padStart(2, "0");
      date = date.toString().padStart(2, "0");
      var defaultDate = `${year}-${month}-${date}${hour}`; //当日时间
      var defaultDate2 = `${year}-${month}-${date2}${hour}`; //第二天时间

      self.info.select_time = [defaultDate, defaultDate2];
    },
    //获取个人报表
    onsearch_BillsList() {
      let loading = this.$loading({
            lock: true,//lock的修改符--默认是false
            text: '查询中，请耐心等待！',//显示在加载图标下方的加载文案
            spinner: 'el-icon-loading',//自定义加载图标类名
            background: 'rgba(0, 0, 0, 0.7)',//遮罩层颜色
            target: document.querySelector('.el-table')})//loadin覆盖的dom元素节点
      this.accountChangeList = [];
      this.$get("Pc.Report.liveGamesIndividualReport", {
        startTime: this.info.select_time[0],
        endTime: this.info.select_time[1],
      }).then((res) => {
        if (res.code == 0) {
          this.personalChangeList = res.data.listReport;
          this.personalChangeTotal = res.data.total;
          loading.close();
          console.log(res)
          // console.log(this.personalChangeTotal)
        } else {
          return this.$message.error(res.message);
        }
      });
    },
  },
  created() {
    this.info.select_time= utilDate.getNowTime();
    this.onsearch_BillsList()
  },
};
</script>

<style lang="scss" scoped>
.high-light{
  font-weight: bold;
  color: red;
}
.check-head {
  margin-bottom: 10px;
}
.first-lever .el-checkbox-group {
  margin-bottom: 10px;
}
.second-lever .el-form-item__label {
  height: 80px !important;
}
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
    span{
      text-align: left;
      display: inline-block;
      width: 110px;
      height: 28px;
      float: left;
    }
     .lastone{
        width:72px
      }
  }
}
</style>