
<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      团队总览<span class="rName" v-if="userName">【{{ userName }}】</span>
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

        <el-input
          class="username-input"
          v-model="username"
          placeholder="请输入用户名查询"
        ></el-input>

        <el-button
          style="margin-left: 12px"
          type="primary"
          @click="onSearch_content"
          >查询</el-button
        >
      </el-col>
    </el-row>
    <div class="po_box" v-if="teamReportInfo.length > 0">
      <el-row>
        <el-col :span="24">
          <div class="tit">
            <p>当前团队余额（元）</p>
            <p style="color: #ca151e" class="num">
              {{ teamReportInfo[0].totalBalance }}
            </p>
          </div>
          <div class="tit">
            <p>团队充值（元）</p>
            <a @click="onteam_CZ" class="num">{{
              teamReportInfo[0].totalDepositAmount
            }}</a>
          </div>
          <div class="tit">
            <p>团队提现（元）</p>
            <a @click="onteam_TX" class="num">{{
              teamReportInfo[0].totalEncashment
            }}</a>
          </div>
          <div class="tit">
            <p>总团队人数（人）</p>
            <a @click="onteam_Total" class="num">{{
              teamReportInfo[0].totalCount
            }}</a>
            <span
              >(代理<span style="color: #000">{{
                teamReportInfo[0].agentCount
              }}</span
              >,会员<span style="color: #000">{{
                teamReportInfo[0].userCount
              }}</span
              >)</span
            >
          </div>
          <div class="tit">
            <p>新增人数（人）</p>
            <a @click="onteam_Add" class="num">{{
              teamReportInfo[0].totalRegisterCount
            }}</a>
          </div>
          <div class="tit">
            <p>首充人数（人）</p>
            <a @click="onteam_SC" class="num">{{
              teamReportInfo[0].firstRechargeCount
            }}</a>
          </div>
          <div class="tit">
            <p>活跃人数（人）</p>
            <p style="color: #ca151e" class="num">
              {{ teamReportInfo[0].activeMemberCount }}
            </p>
          </div>
          <div class="tit">
            <p>当前在线（人）</p>
            <a @click="onteam_Online" class="num">{{
              teamReportInfo[0].onlineCount
            }}</a>
          </div>
          <div class="tit">
            <p>3天未登录（人）</p>
            <a @click="onteam_3d" class="num">{{
              teamReportInfo[0].more3dayUnloginCount
            }}</a>
          </div>
          <div class="tit">
            <p>7天未登录（人）</p>
            <a @click="onteam_7d" class="num">{{
              teamReportInfo[0].more7dayUnloginCount
            }}</a>
          </div>
          <div class="tit">
            <p>总盈亏（元）</p>
            <a  class="num">{{
              teamReportInfo[0].totalProfit
            }}</a>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="search_content">
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
              item.code == 'DZYX' ||
              item.code == 'TYJJ' ||
              item.code == 'QPYX' ||
              item.code == 'BYYX' ||
              item.code == 'FBD' ||
              item.code == 'ZRSX'
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
          <el-table-column label="有效投注金额" width="104" prop="fBuyAmount">
          </el-table-column>
          <el-table-column label="中奖金额" width="" prop="fWinningAmount">
          </el-table-column>
          <el-table-column label="打和返款" width="" prop="daheReturn">
          </el-table-column>
          <el-table-column label="投注返点" width="" prop="buyReturn">
          </el-table-column>
          <el-table-column label="代理返点" width="" prop="commissionAmount">
          </el-table-column>
          <el-table-column label="优惠" width="" prop="rebateAmount">
          </el-table-column>
          <el-table-column label="活动奖励" width="" prop="activityBonus">
          </el-table-column>
          <el-table-column label="净盈利" width="" prop="netProfit" />
        </el-table>
        <!-- 电子游戏 -->
        <el-table
          v-if="item.code == 'DZYX'"
          :data="dzyx_totalReport"
          border
          style="width: 100%"
          empty-text="没有符合查询条件的数据！"
        >
          <el-table-column label="有效投注金额" width="104" prop="betAmount">
          </el-table-column>
          <el-table-column label="中奖金额" width="" prop="zhongBonus">
          </el-table-column>
          <el-table-column label="投注退还" width="" prop="waterAmount">
          </el-table-column>
          <el-table-column label="有效投注" width="" prop="effectiveAmount">
          </el-table-column>
          <el-table-column label="净盈利" width="" prop="winLossAmount">
          </el-table-column>
        </el-table>
        <!-- 体育竞技 -->
        <el-table
          v-if="item.code == 'TYJJ'"
          :data="tyjj_totalReport"
          border
          style="width: 100%"
          empty-text="没有符合查询条件的数据！"
        >
          <el-table-column label="有效投注金额" width="104" prop="betAmount">
          </el-table-column>
          <el-table-column label="中奖金额" width="" prop="zhongBonus">
          </el-table-column>
          <el-table-column label="有效投注" width="" prop="effectiveAmount">
          </el-table-column>
          <el-table-column label="净盈利" width="" prop="winLossAmount">
          </el-table-column>
        </el-table>
        <!-- 真人视讯 -->
        <div v-if="item.code == 'ZRSX'">
          <el-table
            :data="zrsx_totalReport"
            border
            style="width: 100%"
            empty-text="没有符合查询条件的数据！"
          >
            <el-table-column label="有效投注金额" width="104" prop="betAmount">
            </el-table-column>
            <el-table-column label="有效投注" width="" prop="effectiveAmount">
            </el-table-column>
            <el-table-column label="中奖金额" width="" prop="zhongBonus">
            </el-table-column>
            <el-table-column label="退水金额" width="" prop="waterAmount">
            </el-table-column>
            <el-table-column label="净盈利" width="" prop="winLossAmount">
            </el-table-column>
          </el-table>
          <div class="text-red mt--10">净盈利=中奖金额-投注金额+退水金额</div>
        </div>
        <!-- 棋牌游戏 -->
        <div v-if="item.code == 'QPYX'">
          <el-table
            :data="qpyx_totalReport"
            border
            style="width: 100%"
            empty-text="没有符合查询条件的数据！"
          >
            <el-table-column label="有效投注金额" width="104" prop="betAmount">
            </el-table-column>
            <el-table-column label="有效投注" width="" prop="effectiveAmount">
            </el-table-column>
            <el-table-column label="中奖金额" width="" prop="zhongBonus">
            </el-table-column>
            <el-table-column label="净盈利" width="" prop="winLossAmount">
            </el-table-column>
          </el-table>
          <div class="text-red mt--10">净盈利=中奖金额-投注金额</div>
        </div>
        <!-- 捕鱼游戏 -->
        <div v-if="item.code == 'BYYX'">
          <el-table
            :data="byyx_totalReport"
            border
            style="width: 100%"
            empty-text="没有符合查询条件的数据！"
          >
            <el-table-column label="有效投注金额" width="104" prop="betAmount">
            </el-table-column>
            <el-table-column label="有效投注" width="" prop="effectiveAmount">
            </el-table-column>
            <el-table-column label="中奖金额" width="" prop="zhongBonus">
            </el-table-column>
            <el-table-column label="退水金额" width="" prop="waterAmount">
            </el-table-column>
            <el-table-column label="净盈利" width="" prop="winLossAmount">
            </el-table-column>
          </el-table>
          <div class="text-red mt--10">净盈利=中奖金额-投注金额 + 退水金额</div>
        </div>
        <!-- 街机游戏 -->
        <div v-if="item.code == 'JJYX'">
          <el-table
            :data="jjyx_totalReport"
            border
            style="width: 100%"
            empty-text="没有符合查询条件的数据！"
          >
            <el-table-column label="有效投注金额" width="104" prop="betAmount">
            </el-table-column>
            <el-table-column label="有效投注" width="" prop="effectiveAmount">
            </el-table-column>
            <el-table-column label="中奖金额" width="" prop="zhongBonus">
            </el-table-column>
            <!-- <el-table-column label="退水金额" width="" prop="waterAmount">
            </el-table-column> -->
            <el-table-column label="净盈利" width="" prop="winLossAmount">
            </el-table-column>
          </el-table>
          <!-- <div class="text-red mt--10">净盈利=中奖金额-投注金额 </div> -->
        </div>
        <!-- 反波胆游戏 -->
        <div v-if="item.code == 'FBD'">
          <el-table
            :data="fbd_totalReport"
            border
            style="width: 100%"
            empty-text="没有符合查询条件的数据！"
          >
            <el-table-column label="有效投注金额" width="104" prop="betAmount">
            </el-table-column>
            <el-table-column label="有效投注" width="" prop="effectiveAmount">
            </el-table-column>
            <el-table-column label="中奖金额" width="" prop="zhongBonus">
            </el-table-column>
            <el-table-column label="净盈利" width="" prop="winLossAmount">
            </el-table-column>
          </el-table>
          <div class="text-red mt--10">净盈利=中奖金额-投注金额 + 退水金额</div>
        </div>
      </div>
    </div>
    <!-- 弹窗明细 -->
    <teamcz ref="teamcz"></teamcz>
    <teamtx ref="teamtx"></teamtx>
    <teamtotal ref="teamtotal"></teamtotal>
    <teamsc ref="teamsc"></teamsc>
    <teamadd ref="teamadd"></teamadd>
    <teamonline ref="teamonline"></teamonline>
    <team3d ref="team3d"></team3d>
    <team7d ref="team7d"></team7d>
  </div>
</template>

<script>
import * as utilDate from "../../../../plugins/date"; //日期工具函数
import teamcz from "../totalOverview/team_CZ_detail";
import teamtx from "../totalOverview/team_TX_detail";
import teamtotal from "../totalOverview/team_Total_detail";
import teamsc from "../totalOverview/team_SC_detail";
import teamadd from "../totalOverview/team_Add_detail";
import teamonline from "../totalOverview/team_Online_detail";
import team3d from "../totalOverview/team_3d_detail";
import team7d from "../totalOverview/team_7d_detail";

export default {
  data() {
    return {
      username: "",
      info: {
        select_time: [],
        channelCode_cpx: "CPYX",
      },
      gameCategory: [],
      teamReportInfo: [],
      cpyx_totalReport: [],
      dzyx_totalReport: [],
      zrsx_totalReport: [],
      tyjj_totalReport: [],
      qpyx_totalReport: [],
      byyx_totalReport: [],
      fbd_totalReport: [],
      jjyx_totalReport: [],
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
      accountID: this.$route.query.accountID,
      userName: this.$route.query.userName,
    };
  },
  components: {
    teamcz,
    teamtx,
    teamtotal,
    teamsc,
    teamadd,
    teamonline,
    team3d,
    team7d,
  },
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
    // },
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
      var now = new Date();
      var year = now.getFullYear(); //得到年份
      var month = now.getMonth() + 1; //得到月份
      var date = now.getDate(); //得到日期
      var hour = " 02:00:00"; //默认时分秒 如果传给后台的格式为年月日时分秒，就需要加这个，如若不需要，此行可忽略
      month = month.toString().padStart(2, "0"); //补全月份
      date = date.toString().padStart(2, "0"); //补全日期
      var today = year + "-" + month + "-" + date + hour;

      var date_yesterday = now.getDate() - 1; //得到昨天日期
      var date_tomorrow = now.getDate() + 1; //得到后一天日期

      //获得截止日期开始时间时间戳
      let curDate = now.getTime();
      var limit = 36 * 24 * 3600 * 1000;
      var day35 = curDate - limit;
      // console.log(this.formatDate(day35))

      let d = [];
      if (time == "昨天") {
        let yestertay = year + "-" + month + "-" + date_yesterday + hour;
        d = [yestertay, today];
      }
      if (time == "今天") {
        let today1 = year + "-" + month + "-" + date_tomorrow + hour;
        d = [today, today1];
      }
      if (time == "上周") {
        let LastWeekStart = utilDate.getLastWeekStartDate() + hour;
        let LastWeekEnd = utilDate._getLastWeekEndDate() + hour;
        d = [LastWeekStart, LastWeekEnd];
      }
      if (time == "本周") {
        let WeekStart = utilDate.getWeekStartDate() + hour;
        let WeekEnd = utilDate._getWeekEndDate() + hour;
        d = [WeekStart, WeekEnd];
      }
      if (time == "上月") {
        let LastMonthStart = utilDate.getLastMonthStartDate() + hour;
        let LastMonthEnd = utilDate._getLastMonthEndDate() + hour;
        let LM = new Date(LastMonthStart).getTime();
        if (LM - day35 < 0) {
          LastMonthStart = this.formatDate(day35);
        }

        d = [LastMonthStart, LastMonthEnd];
      }
      if (time == "本月") {
        let MonthStart = utilDate.getMonthStartDate() + hour;
        let MonthEnd = utilDate._getMonthEndDate() + hour;

        d = [MonthStart, MonthEnd];
      }

      this.info.select_time = d;
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
          // console.log(this.gameCategory);
        } else {
          return this.$message.error(res.message);
        }
      });
    },
    // 团队详情
    getTeamReportInfot() {
      let d = {
          accountID: this.accountID,
          startTime: this.info.select_time[0],
          endTime: this.info.select_time[1],
          username: this.username
        };

      this.requestData(d);
    },
    requestData(postData) {
      let _listReport = [];
      this.teamReportInfo = [];
      this.cpyx_totalReport = [];
      this.zrsx_totalReport = [];
      this.dzyx_totalReport = [];
      this.tyjj_totalReport = [];
      this.qpyx_totalReport = [];
      this.byyx_totalReport = [];
      this.fbd_totalReport = [];
      this.jjyx_totalReport = [];
      this.$get("Pc.Agent.TeamReportInfo", postData).then((res) => {
        console.log("--", res);
        if (res.code == 0) {
          this.teamReportInfo.push(res.data);
          _listReport = [...res.data.listReport];
          _listReport.forEach((item) => {
            if (item.type == 1) {
              this.cpyx_totalReport.push(item.reportModel); // 彩票游戏
            } else if (item.type == 6) {
              this.zrsx_totalReport.push(item.reportModel); // 真人视讯
            } else if (item.type == 5) {
              this.dzyx_totalReport.push(item.reportModel); //电子游戏
            } else if (item.type == 4) {
              this.tyjj_totalReport.push(item.reportModel); //体育竞技
            } else if (item.type == 3) {
              this.qpyx_totalReport.push(item.reportModel); //棋牌游戏
            } else if (item.type == 8) {
              this.byyx_totalReport.push(item.reportModel); //捕鱼游戏
            } else if (item.type == 7) {
              this.fbd_totalReport.push(item.reportModel); //反波胆游戏
            } else if (item.type == 9) {
              this.jjyx_totalReport.push(item.reportModel); //街机游戏
            }
          });
          console.log(res.data);
          this.username = "";
        } else {
          return this.$message.error(res.message);
        }
      });
    },

    //  调用团队充值
    onteam_CZ() {
      this.$refs.teamcz.getAgentRechargeList();
      this.$refs.teamcz.teamCZ_Visable = true; //test
      // if(this.teamCZ_list.length>0){
      //   this.teamCZ_Visable=true
      // }else{
      //    this.teamCZ_Visable=false
      // }
    },
    //  调用团队提现
    onteam_TX() {
      this.$refs.teamtx.getAgentRechargeList();
      this.$refs.teamtx.teamTX_Visable = true; //test
      // if(this.teamTX_list.length>0){
      //   this.teamTX_Visable=true
      // }else{
      //    this.teamTX_Visable=false
      // }
    },
    //  调用团队总人数
    onteam_Total() {
      this.$refs.teamtotal.getAgentRechargeList();
      this.$refs.teamtotal.teamTotal_Visable = true; //test
      // if(this.teamTOTAL_list.length>0){
      //   this.teamTotal_Visable=true
      // }else{
      //    this.teamTotal_Visable=false
      // }
    },
    // 调用首冲人数
    onteam_SC() {
      this.$refs.teamsc.getAgentRechargeList();
      this.$refs.teamsc.teamSC_Visable = true; //test
      // if(this.teamSC_list.length>0){
      //   this.teamSC_Visable=true
      // }else{
      //    this.teamSC_Visable=false
      // }
    },
    // 调用新增人数
    onteam_Add() {
      this.$refs.teamadd.getAgentRechargeList();
      this.$refs.teamadd.teamAdd_Visable = true; //test
      // if(this.teamAdd_list.length>0){
      //   this.teamAdd_Visable=true
      // }else{
      //    this.teamAdd_Visable=false
      // }
    },
    // 调用在线人数
    onteam_Online() {
      this.$refs.teamonline.getAgentRechargeList();
      this.$refs.teamonline.teamOnline_Visable = true; //test
      // if(this.teamOnline_list.length>0){
      //   this.teamOnline_Visable=true
      // }else{
      //    this.teamOnline_Visable=false
      // }
    },
    // 调用3天未在线人数
    onteam_3d() {
      this.$refs.team3d.getAgentRechargeList();
      this.$refs.team3d.team3d_Visable = true; //test
      // if(this.team3d_list.length>0){
      //   this.team3d_Visable=true
      // }else{
      //    this.team3d_Visable=false
      // }
    },
    // 调用7天未在线人数
    onteam_7d() {
      this.$refs.team7d.getAgentRechargeList();
      this.$refs.team7d.team7d_Visable = true; //test
      // if(this.team7d_list.length>0){
      //   this.team7d_Visable=true
      // }else{
      //    this.team7d_Visable=false
      // }
    },

    // 查询团队详情
    onSearch_content() {
      if (this.requestTime) {
        return;
      }
      this.requestTime = 2;
      let interval = setInterval(() => {
        this.requestTime--;
        if (!this.requestTime) {
          clearInterval(interval);
        }
      }, 1000);
      this.getTeamReportInfot();
    },
  },
  watch: {
    $route: {
      handler(to, from) {
        this.accountID = this.$route.query.accountID;
        this.userName = this.$route.query.userName;
        this.getAllGameCategory();
        let postData = {
          accountID: this.accountID,
          startTime: "",
          endTime: "",
        };
        this.requestData(postData);
      },
      immediate: true,
    },
  },
  created() {
    //this.getNowTime(); //初始化当前时间
    this.info.select_time = utilDate.getNowTimeAndTomorrowTimeRange(
      "02:00:00",
      "02:00:00"
    );
  },
  mounted() {},
};
</script>

<style lang='scss' scoped>
.username-input {
  width: 150px;
}
.rName {
  font-size: 16px;
  position: absolute;
  left: 90px;
  top: 0;
}
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
    padding: 10px 5px 5px 5px;
    display: inline-block;
    border: 1px solid #dcdfe6;
    color: #999;
    font-size: 12px;
    border-right: 0 none;
    width: 86px;
    height: 80px;
    vertical-align: middle;
    text-align: center;
    p:first-child {
      height: 30px;
    }
    .num {
      font-size: 16px;
      padding: 5px 0;
      color: #000;
    }
    a.num {
      cursor: pointer;
      color: #ff0000;
      display: block;
    }
  }
  .tit:last-child {
    border-right: 1px solid #c0c4cc;
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
