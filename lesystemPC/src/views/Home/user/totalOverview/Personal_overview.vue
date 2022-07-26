
<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      个人总览
    </div>
    <el-divider></el-divider>
    <el-row>
      <el-col class="datepick">
        <el-date-picker
          v-model="info.select_time"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['02:00:00', '02:00:00']"
          :picker-options="datePickerOptions"
          :default-value="[new Date().setMonth(new Date().getMonth() - 1)]"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="freeDateChange"
        >
        </el-date-picker>
        <el-radio-group v-model="fastData" @change="fastDataChange">
          <el-radio-button label="昨天"></el-radio-button>
          <el-radio-button label="今天"></el-radio-button>
          <el-radio-button label="上周"></el-radio-button>
          <el-radio-button label="本周"></el-radio-button>
          <el-radio-button label="上月"></el-radio-button>
          <el-radio-button label="本月"></el-radio-button>
        </el-radio-group>
        <el-button
          style="margin-left: 12px"
          type="primary"
          @click="onSearch_content"
          >查询</el-button
        >
      </el-col>
    </el-row>
    <div class="po_box" v-if="cpyx_totalReport.length > 0">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="tit">
            <i class="el-icon-coin"></i>
            <p>余额（元）</p>
            <p class="num">{{ cpyx_totalReport[0].userMoney }}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="tit">
            <i class="el-icon-coin"></i>
            <p>充值（元）</p>
            <p class="num">{{ cpyx_totalReport[0].rechargeAmount }}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="tit">
            <i class="el-icon-coin"></i>
            <p>提现（元）</p>
            <p class="num">{{ cpyx_totalReport[0].withdrawAmount }}</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div   class="search_content">
      <div
        class="result_content"
        v-for="item in gameCategory"
        :key="item.index"
      >
        <h4>
          {{ item.name }} 
          <span
            class="jstime"
            v-if="
              item.code == 'DZYX' || item.code == 'TYJJ' || item.code == 'QPYX' || item.code == 'BYYX' || item.code == 'FBD' || item.code == 'ZRSX'
            "
            >结算时间为00:00:00-23:59:59</span
          >
        </h4>
        <el-table
          v-if="item.code == 'CPYX'"
          :data="cpyx_totalReport"
          border
          style="width: 100%"
          empty-text="没有符合查询条件的数据！"
        >
          <el-table-column label="投注金额" prop="buyAmount"> </el-table-column>
          <el-table-column label="中奖金额" prop="winAmount"> </el-table-column>
          <el-table-column label="打和返款" prop="daheFankuan">
          </el-table-column>
          <el-table-column label="投注返点" prop="cpFandian"> </el-table-column>
          <el-table-column label="代理返点" prop="agentFandian">
          </el-table-column>
          <el-table-column label="优惠" prop="activityAmount">
          </el-table-column>
          <el-table-column label="活动奖励" prop="activityBonus">
          </el-table-column>
          <el-table-column label="净盈利" prop="profit"> </el-table-column>
        </el-table>
        <div v-if="item.code == 'DZYX'">
          <el-table
            :data="dzyx_totalReport"
            border
            style="width: 100%"
            empty-text="没有符合查询条件的数据！"
          >
            <el-table-column label="投注金额" prop="betAmount">
            </el-table-column>
            <el-table-column label="中奖金额" prop="zhongBonus">
            </el-table-column>
            <el-table-column label="投注退还" prop="waterAmount">
            </el-table-column>
            <el-table-column label="有效投注" prop="effectiveAmount">
            </el-table-column>
            <el-table-column label="净盈利" prop="winLossAmount">
            </el-table-column>
          </el-table>
         <!-- <div class="text-red mt--10">
            净盈利=中奖金额 + 投注退还 - 投注金额
          </div> -->
        </div>

        <div v-if="item.code == 'TYJJ'">
          <el-table
            :data="tyjj_totalReport"
            border
            style="width: 100%"
            empty-text="没有符合查询条件的数据！"
          >
            <el-table-column label="投注金额" prop="betAmount">
            </el-table-column>
            <el-table-column label="有效投注" prop="effectiveAmount">
            </el-table-column>
            <el-table-column label="中奖金额" prop="zhongBonus">
            </el-table-column>
            <el-table-column label="净盈利" prop="winLossAmount">
            </el-table-column>
          </el-table>
          <!-- <div class="text-red mt--10">净盈利=中奖金额-投注金额</div> -->
        </div>

        <div v-if="item.code == 'ZRSX'">
          <el-table
            :data="zrsx_totalReport"
            border
            style="width: 100%"
            empty-text="没有符合查询条件的数据！"
          >
            <el-table-column label="投注金额" prop="betAmount">
            </el-table-column>
            <el-table-column label="有效投注" prop="effectiveAmount">
            </el-table-column>
            <el-table-column label="中奖金额" prop="zhongBonus">
            </el-table-column>
            <el-table-column label="退水" prop="waterAmount"> </el-table-column>
            <el-table-column label="净盈利" prop="winLossAmount">
            </el-table-column>
          </el-table>
          <!-- <div class="text-red mt--10">净盈利=中奖金额-投注金额+退水金额</div> -->
        </div>

        <div v-if="item.code == 'QPYX'">
          <el-table
            :data="qpyx_totalReport"
            border
            style="width: 100%"
            empty-text="没有符合查询条件的数据！"
          >
            <el-table-column label="投注金额" prop="betAmount">
            </el-table-column>
            <el-table-column label="中奖金额" prop="zhongBonus">
            </el-table-column>
            <el-table-column label="有效投注" prop="effectiveAmount">
            </el-table-column>
            <el-table-column label="净盈利" prop="winLossAmount">
            </el-table-column>
          </el-table>
          <!-- <div class="text-red mt--10">净盈利=中奖金额 - 投注金额</div> -->
        </div>
        <div v-if="item.code == 'BYYX'">
          <el-table
            :data="byyx_totalReport"
            border
            style="width: 100%"
            empty-text="没有符合查询条件的数据！"
          >
            <el-table-column label="投注金额" prop="betAmount">
            </el-table-column>
            <el-table-column label="中奖金额" prop="zhongBonus">
            </el-table-column>
            <el-table-column label="有效投注" prop="effectiveAmount">
            </el-table-column>
             <el-table-column label="退水" prop="waterAmount">
            </el-table-column>
            <el-table-column label="净盈利" prop="winLossAmount">
            </el-table-column>
          </el-table>
          <!-- <div class="text-red mt--10">净盈利=中奖金额 - 投注金额 + 退水金额</div> -->
        </div>
        <div v-if="item.code == 'FBD'">
          <el-table
            :data="fbd_totalReport"
            border
            style="width: 100%"
            empty-text="没有符合查询条件的数据！"
          >
            <el-table-column label="投注金额" prop="betAmount">
            </el-table-column>
            <el-table-column label="中奖金额" prop="zhongBonus">
            </el-table-column>
            <el-table-column label="有效投注" prop="effectiveAmount">
            </el-table-column>
            <el-table-column label="净盈利" prop="winLossAmount">
            </el-table-column>
          </el-table>
         <!-- <div class="text-red mt--10">净盈利=中奖金额 - 投注金额 </div> -->
        </div>
            <div v-if="item.code == 'JJYX'">
          <el-table
            :data="jjyx_totalReport"
            border
            style="width: 100%"
            empty-text="没有符合查询条件的数据！"
          >
            <el-table-column label="投注金额" prop="betAmount">
            </el-table-column>
            <el-table-column label="中奖金额" prop="zhongBonus">
            </el-table-column>
            <el-table-column label="有效投注" prop="effectiveAmount">
            </el-table-column>
            <el-table-column label="净盈利" prop="winLossAmount">
            </el-table-column>
          </el-table>
          <!-- <div class="text-red mt--10">净盈利=中奖金额 - 投注金额 + 退水金额</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as utilDate from "@/plugins/date"; //日期工具函数

export default {
  data() {
    return {
      info: {
        select_time: [],
        channelCode_cpx: "CPYX",
      },
      gameCategory: [],
      cpyx_totalReport: [],
      dzyx_totalReport: [],
      tyjj_totalReport: [],
      zrsx_totalReport: [],
      qpyx_totalReport: [],
      byyx_totalReport: [],
      fbd_totalReport:[],
      jjyx_totalReport:[],
      fastData: [],
      datePickerOptions: {
        disabledDate(time) {
          let lastday = Date.now() + 1 * 24 * 3600 * 1000;
          let curDate = new Date().getTime();
          let jiezhi = 36 * 24 * 3600 * 1000;
          let day35 = curDate - jiezhi;
          return time.getTime() > lastday || time.getTime() <= day35;
        },
      },
    };
  },
  methods: {
    //初始化时间
   //  getNowTime() {
   //    let self = this;
   //    let now = new Date();
	  // //console.log(now);
   //    let year = now.getFullYear(); //得到年份
   //    let month = now.getMonth()+1; //得到月份
   //    let day = now.getDate(); //得到日期
	  
	  
   //    let endDateTime=new Date(now.setDate(now.getDate()+1));
	  // let eYear = endDateTime.getFullYear();
	  // let eMonth = endDateTime.getMonth()+1; //得到月份
	  // let eDay = endDateTime.getDate(); //得到日期
	  
   //    var hour = " 02:00:00"; //默认时分秒 如果传给后台的格式为年月日时分秒，就需要加这个，如若不需要，此行可忽略
   // //    month = month + 1;
	  // // eMonth=
   //    month = month.toString().padStart(2, "0");
   //    day = day.toString().padStart(2, "0");
	  // eMonth = eMonth.toString().padStart(2, "0");
	  // eDay = eDay.toString().padStart(2, "0");
   //    var defaultDate = `${year}-${month}-${day}${hour}`; //当日时间
   //    var defaultDate2 = `${eYear}-${eMonth}-${eDay}${hour}`; //第二天时间
   //    self.info.select_time = [defaultDate, defaultDate2];
	  
   //  },
    // 时间戳转日期
    formatDate(d) {
      var now = new Date(parseInt(d));
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var date = now.getDate();
      var hour = " 02:00:00";
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
      // var hour = " 02:00:00"; //默认时分秒 如果传给后台的格式为年月日时分秒，就需要加这个，如若不需要，此行可忽略
      // month = month.toString().padStart(2, "0"); //补全月份
      // date = date.toString().padStart(2, "0"); //补全日期
      // var today = year + "-" + month + "-" + date + hour;

      // var date_yesterday = now.getDate() - 1; //得到昨天日期
      // var date_tomorrow = now.getDate() + 1; //得到后一天日期

      // //获得截止日期开始时间时间戳
      // let curDate = now.getTime();
      // var limit = 34 * 24 * 3600 * 1000;
      // var day35 = curDate - limit;
      // // console.log(this.formatDate(day35))

      // let d = [];
      // if (time == "昨天") {
      //   let yestertay = year + "-" + month + "-" + date_yesterday + hour;
      //   d = [yestertay, today];
      // }
      // if (time == "今天") {
      //   let today1 = year + "-" + month + "-" + date_tomorrow + hour;
      //   d = [today, today1];
      // }
      // if (time == "上周") {
      //   let LastWeekStart = utilDate.getLastWeekStartDate() + hour;
      //   let LastWeekEnd = utilDate._getLastWeekEndDate() + hour;
      //   d = [LastWeekStart, LastWeekEnd];
      // }
      // if (time == "本周") {
      //   let WeekStart = utilDate.getWeekStartDate() + hour;
      //   let WeekEnd = utilDate._getWeekEndDate() + hour;
      //   d = [WeekStart, WeekEnd];
      // }
      // if (time == "上月") {
      //   let LastMonthStart = utilDate.getLastMonthStartDate() + hour;
      //   let LastMonthEnd = utilDate._getLastMonthEndDate() + hour;
      //   let LM = new Date(LastMonthStart).getTime();
      //   if (LM - day35 < 0) {
      //     LastMonthStart = this.formatDate(day35);
      //   }

      //   d = [LastMonthStart, LastMonthEnd];
      // }
      // if (time == "本月") {
      //   let MonthStart = utilDate.getMonthStartDate() + hour;
      //   let MonthEnd = utilDate._getMonthEndDate() + hour;

      //   d = [MonthStart, MonthEnd];
      // }

      this.info.select_time = utilDate.fastDataChangeChoice02to02(time);
	  //console.log(this.info.select_time);
    },
    freeDateChange() {
      this.fastData = "";
    },
    // 获取彩种游戏种类
    getAllGameCategory() {
      this.$get("Pc.HomePage.getAllGameCategory").then((res) => {
        if (res.code == 0) {
          this.gameCategory = res.data;
          this.info.channelCode_cpx = this.gameCategory[0].code; //暂时写死
          //   console.log(this.gameCategory);
        } else {
          return this.$message.error(res.message);
        }
      });
    },
    // 个人详情

    getMemberTotalReport() {
      this.cpyx_totalReport = [];
      this.zrsx_totalReport = [];
      this.dzyx_totalReport = [];
      this.tyjj_totalReport = [];
      this.qpyx_totalReport = [];
      this.byyx_totalReport = [];
      this.fbd_totalReport =[]
      this.jjyx_totalReport =[]
      let postData ={ 
        startTime: this.info.select_time[0],
        endTime: this.info.select_time[1],
        channelCode: this.info.channelCode_cpx,
      }
      this.ruquestData(postData)
      
    },
    ruquestData(postData){
        this.$get("Pc.Member.getMemberTotalReport", postData).then((res) => {
          //console.log(res);
        if (res.code == 0) {
          this.cpyx_totalReport.push(res.data);
          this.zrsx_totalReport.push(res.data.liveGameReport);
          this.dzyx_totalReport.push(res.data.electronicGameReport);
          this.tyjj_totalReport.push(res.data.sportsGameReport);
          this.qpyx_totalReport.push(res.data.chessCardGameReport);
          this.byyx_totalReport.push(res.data.fishGameReport);
          this.fbd_totalReport.push(res.data.fbdGameReport)
          this.jjyx_totalReport.push(res.data.arcadeGameReport)
          //console.log(res);
        } else {
          return this.$message.error(res.message);
        }
      });
      },
    onSearch_content() {
      this.getMemberTotalReport();
    },
  },
  created() {
	  this.info.select_time=utilDate.getNowTimeAndTomorrowTimeRange("02:00:00","02:00:00");
    //this.getNowTime(); //初始化当前时间
    // this.getMemberTotalReport();
    this.getAllGameCategory();
    let postData ={ 
        startTime: '',
        endTime: '',
        channelCode: '',
      }
    this.ruquestData(postData)
  },
  mounted() {

    
  },
};
</script>

<style lang='scss' scoped>
.result_content {
  h4 {
    margin: 15px 0 5px 0;
  }
  .el-table {
    margin-bottom: 20px;
  }
}
.po_box {
  margin: 15px 0;
  .tit {
    background: #fff;
    padding: 15px;
    position: relative;
    border: 1px solid #c0c4cc;
    i {
      display: inline-block;
      width: 80px;
      height: 40px;
      line-height: 40px;
      font-size: 20px;
      font-size: 28px;
      position: absolute;
      text-align: center;
      left: 10px;
      top: 15px;
      z-index: 1;
      color: #ca151e;
    }
    P {
      margin-left: 80px;
    }
    p.num {
      font-size: 18px;
      color: #ca151e;
      padding: 5px 0;
    }
  }
}
.datepick {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    margin-right: 12px;
  }
}
.text-red {
  color: #ca151e;
}
.jstime {
  font-weight: normal;
  color: #ca151e;
}
.mt--10 {
  margin-top: -15px;
}
</style>