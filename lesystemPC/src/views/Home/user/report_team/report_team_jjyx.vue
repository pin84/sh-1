<template>
  <div class="search_content">
    <el-row>
      <el-col class="datepick">
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
              @change="freeDateChange"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input
              type="text"
              v-model="info.accountName"
              placeholder="用户名"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-radio-group v-model="fastData" @change="fastDataChange">
              <el-radio-button label="昨天"></el-radio-button>
              <el-radio-button label="今天"></el-radio-button>
              <el-radio-button label="上周"></el-radio-button>
              <el-radio-button label="本周"></el-radio-button>
              <el-radio-button label="上月"></el-radio-button>
              <el-radio-button label="本月"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button
              style="margin-left: 12px"
              @click="onSerachLiveGames()"
              type="primary"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <div class="result_content">
      <el-table
        :data="agentList_data"
        border
        style="width: 100%"
        empty-text="没有符合查询条件的数据！"
        :row-class-name="tableRowClassName"
        @row-click="showMemberDetail"
      >
        <el-table-column label="用户名" width="84">
          <template slot-scope="scope">
            <a class="text-red">{{ scope.row.username }}</a>
          </template>
        </el-table-column>
        <el-table-column label="所属组" width="84">
          <template slot-scope="scope">
            <span v-if="scope.row.hierarchy > 0">代理</span>
            <span v-if="scope.row.hierarchy == 0">会员</span>
          </template>
        </el-table-column>
        <el-table-column label="充值" width="125" prop="rechargeAmount">
        </el-table-column>
        <el-table-column label="提款" width="115" prop="withdrawAmount">
        </el-table-column>
        <el-table-column label="投注人数" width="115" prop="buyNumber"> </el-table-column>
        <el-table-column label="投注金额" width="115" prop="betAmount" sortable>
        </el-table-column>
        <el-table-column
          label="有效投注"
          width="115"
          prop="effectiveAmount"
          sortable
        >
        </el-table-column>
        <el-table-column label="中奖金额" width="115" prop="zhongBonus" sortable>
        </el-table-column>
        <el-table-column label="退水金额" width="" prop="fandianAmount" sortable>
        </el-table-column>
        <el-table-column label="盈亏" width="115" prop="winLossAmount" sortable>
          <template slot-scope="scope">
            <span :class="scope.row.winLossAmount < 0 ? 'text-red' : ''">{{
              scope.row.winLossAmount
            }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="total" v-if="total_lsit">
        <el-row no-gutter>
          <el-col >
            <span class="firstone">总计</span>
            <span>{{ total_lsit.rechargeAmount }}</span>
            <span>{{ total_lsit.withdrawAmount }}</span>
            <span>{{ total_lsit.buyNumber }}</span>
            <span>{{ total_lsit.betAmount }}</span>
            <span>{{ total_lsit.effectiveAmount }}</span>
            <span>{{ total_lsit.zhongBonus }}</span>
            <span>{{ total_lsit.fandianAmount }}</span>
            <span class="lastone">{{ total_lsit.winLossAmount }}</span>
          </el-col>
        </el-row>
      </div>
      <div class="tips">备注：如需要查看代理或用户详情请点击相应用户名</div>
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
          accountName: "",
        },
        fastData: "",
        agentList_data: [],
        accountID: "",
        startTime: "",
        endTime: "",
        types: "",
        datePickerOptions: {
          disabledDate(time) {
            let lastday = Date.now() + 1 * 24 * 3600 * 1000;
            let curDate = new Date().getTime();
            let jiezhi = 35 * 24 * 3600 * 1000;
            let day35 = curDate - jiezhi;
            return time.getTime() > lastday || time.getTime() < day35;
          },
        },
        agentList_list: "",
        total_lsit: "",
        selfInfo_lsit: "",
        accountName: "",
        Hierarchy: 0, //0和’‘ 是会员 1，是一级代理 2.二级代理 3 三级代理
      };
    },
    methods: {
      // 时间戳转日期
      formatDate(d) {
        var now = new Date(parseInt(d));
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = " 00:00:00";
        month = month.toString().padStart(2, "0"); //补全月份
        date = date.toString().padStart(2, "0"); //补全日期
        return year + "-" + month + "-" + date + hour;
      },
       // 时间筛选
      fastDataChange(time) {
        // var now = new Date();
        // var year = now.getFullYear(); //得到年份
        // var month = now.getMonth() + 1; //得到月份
        // var date = now.getDate(); //得到日期
        // var hour = " 00:00:00"; //开始时间
        // var endhour = " 23:59:59"; //结束时间
        // month = month.toString().padStart(2, "0"); //补全月份
        // date = date.toString().padStart(2, "0"); //补全日期
        // var today = year + "-" + month + "-" + date + hour;
        // var todayafter = year + "-" + month + "-" + date + endhour;
        // var date_yesterday = now.getDate() - 1; //得到开始时间

        // //获得截止日期开始时间时间戳
        // let curDate = now.getTime();
        // var limit = 34 * 24 * 3600 * 1000;
        // var day35 = curDate - limit;
        // // console.log(this.formatDate(day35))

        // let d = [];
        // if (time == "昨天") {
        //   let yestertay = year + "-" + month + "-" + date_yesterday + hour;
        //   let yestertayafter = year + "-" + month + "-" + date_yesterday + endhour;

        //   d = [yestertay, yestertayafter];
        // }
        // if (time == "今天") {
        //   d = [today, todayafter];
        // }
        // if (time == "上周") {
        //   let LastWeekStart = utilDate.getLastWeekStartDate() + hour;
        //   let LastWeekEnd = utilDate.getLastWeekEndDate() + endhour;
        //   d = [LastWeekStart, LastWeekEnd];
        // }
        // if (time == "本周") {
        //   let WeekStart = utilDate.getWeekStartDate() + hour;
        //   let WeekEnd = utilDate.getWeekEndDate() + endhour;
        //   d = [WeekStart, WeekEnd];
        // }
        // if (time == "上月") {
        //   let LastMonthStart = utilDate.getLastMonthStartDate() + hour;
        //   let LastMonthEnd = utilDate.getLastMonthEndDate() + endhour;
        //   let LM = new Date(LastMonthStart).getTime();
        //   if (LM - day35 < 0) {
        //     LastMonthStart = this.formatDate(day35);
        //   }

        //   d = [LastMonthStart, LastMonthEnd];
        // }
        // if (time == "本月") {
        //   let MonthStart = utilDate.getMonthStartDate() + hour;
        //   let MonthEnd = utilDate.getMonthEndDate() + endhour;

        //   d = [MonthStart, MonthEnd];
        // }
        this.info.select_time = utilDate.fastDataChangeChoice00to23(time);
      },
      freeDateChange() {
        this.fastData = "";
      },
      onSerachLiveGames() {
        let loading = this.$loading({
          lock: true, //lock的修改符--默认是false
          text: "查询中，请耐心等待！", //显示在加载图标下方的加载文案
          spinner: "el-icon-loading", //自定义加载图标类名
          background: "rgba(0, 0, 0, 0.7)", //遮罩层颜色
          target: document.querySelector(".el-table"),
        }); //loadin覆盖的dom元素节点
        this.$get("Pc.Agent.getTeamArcadeGamesReport", {
          startTime: this.info.select_time[0],
          endTime: this.info.select_time[1],
          accountID: this.accountID,
		  accountName:this.info.accountName,
        }).then((res) => {
          if (res.code == 0) {
            //组装数据
            let local_agentList_data = res.data.agentList.list;
            let local_selfInfo_data = res.data.selfInfo;
            let local_total_data = res.data.total;
            if (local_selfInfo_data != "") {
              local_agentList_data.unshift(local_selfInfo_data);
            }
            this.agentList_data = local_agentList_data;
            this.total_lsit = local_total_data;
            //console.log(res);
            loading.close();
          } else {
            loading.close();
            return this.$message.error(res.message);
          }
        });
      },
      showMemberDetail(row) {
        var index = row.index;
        if (index !== 0) {
          this.accountID = row.uid;
          this.onSerachLiveGames();
        }
      },
      tableRowClassName({ row, rowIndex }) {
        row.index = rowIndex;
        if (rowIndex === 0) {
          return "danger-row";
        }
      },
    },
    created() {
       this.info.select_time= utilDate.getNowTime();
       this.onSerachLiveGames()
    },
  };
</script>

<style lang="scss" scoped>
  .datepick {
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      margin-right: 12px;
    }
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
      width: 340px;
    }
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
      span {
        text-align: left;
        display: inline-block;
        width: 110px;
        height: 28px;
        float: left;
        // padding: 0 10px; 
        // box-sizing: border-box;
      }
      .lastone {
        // width: 52px;
        // border: 1px solid red;
      }
      .firstone {
        width: 165px;
       
      }
    }
  }
  .el-table .danger-row {
    color: red;
    background: #ff000010;
    .text-red {
      color: red;
    }
  }
  .tips {
    font-size: 12px;
    color: #999;
  }
  .text-red {
    color: #ca151e;
  }
</style>