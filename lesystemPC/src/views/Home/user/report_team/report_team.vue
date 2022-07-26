<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      团队报表
    </div>
    <el-divider></el-divider>
    <!-- 游戏 -->
    <el-row>
      <el-col :span="24">
        <el-button
          :type="item.code == current_game ? 'danger' : ''"
          v-for="item in gameCategory"
          :key="item.index"
          size="small"
          @click="current_game = item.code"
          >{{ item.name }}</el-button
        >
      </el-col>
    </el-row>
    <el-row v-if="current_game == 'CPYX'">
      <el-col :span="3">
        <div class="left-label">
          <ul>
            <li>日期范围：</li>
            <li>查询账号：</li>
            <li>彩票类型：</li>
            <li>全部彩种：</li>
            <li v-show="isVisable">全部选中：</li>
            <li v-show="isVisable">彩票种类：</li>
          </ul>
        </div>
      </el-col>
      <el-col :span="21">
        <div class="right-search">
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
                :default-value="[
                  new Date().setMonth(new Date().getMonth() - 1),
                ]"
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
              <el-button style="margin-left: 12px" type="default"
                >返回</el-button
              >
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-input
                type="text"
                v-model="info.accountName"
                placeholder="用户名"
              ></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-checkbox
                v-model="info.checkedAlltype"
                border
                @change="change_Alltype"
                >全部类型</el-checkbox
              >
              <el-checkbox
                v-model="info.checkedGuan"
                border
                @change="change_Guantype"
                >官方彩</el-checkbox
              >
              <el-checkbox
                v-model="info.checkedXin"
                border
                @change="change_Xintype"
                >信用彩</el-checkbox
              >
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-checkbox
                v-model="info.checkedAllCz"
                border
                @change="checked_AllCz"
                >全部彩种</el-checkbox
              >
            </el-col>
          </el-row>
          <el-row v-show="isVisable">
            <el-col>
              <el-checkbox v-model="info.checkAllSel" border @change="chack_All"
                >全选</el-checkbox
              >
            </el-col>
          </el-row>
          <el-row v-show="isVisable">
            <el-col class="caizhong">
              <el-checkbox-group
                v-model="info.czList"
                @change="check_cz($event)"
                  v-if="local_curCzlist.length > 0"
              >
                <el-checkbox
                  v-for="item in local_curCzlist"
                  :key="item.index"
                  :label="item.gameId"
                >
                  {{
                    item.gameName +
                    [item.groupId == 1 ? "[官]" : ""] +
                    [item.groupId == 0 ? "[信]" : ""]
                  }}</el-checkbox
                >
              </el-checkbox-group>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-button type="primary" size="large" @click="onsearch_TeamList"
                >查询</el-button
              >
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <teamZrsx v-if="current_game == 'ZRSX'"></teamZrsx>
    <teamDzyx v-if="current_game == 'DZYX'"></teamDzyx>
    <teamTyjj v-if="current_game == 'TYJJ'"></teamTyjj>
    <teamQpyx v-if="current_game == 'QPYX'"></teamQpyx>
    <teamByyx v-if="current_game == 'BYYX'"></teamByyx>
    <teamFbd v-if="current_game == 'FBD'"></teamFbd>
    <teamJjyx v-if="current_game == 'JJYX'"></teamJjyx>
    <el-dialog
      title="操作提示"
      :visible.sync="qr_dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>请选择游戏类型！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qr_dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="qr_dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as utilDate from "../../../../plugins/date"; //日期工具函数
import teamZrsx from "../report_team/report_team_zrsx";
import teamDzyx from "../report_team/report_team_dzyx";
import teamTyjj from "../report_team/report_team_tyjj";
import teamQpyx from "../report_team/report_team_qpyx";
import teamByyx from "../report_team/report_team_byyx";
import teamFbd from "../report_team/report_team_fbd";
import teamJjyx from "../report_team/report_team_jjyx";
export default {
  components: {
    teamZrsx,
    teamDzyx,
    teamTyjj,
    teamQpyx,
    teamByyx,
    teamFbd,
    teamJjyx,
  },
  props: {},
  data() {
    return {
      info: {
        select_time: [],
        accountName: "",
        checkedAlltype: true, //初始化全选
        checkedGuan: false,
        checkedXin: false,
        checkedAllCz: "",
        checkAllSel: "",
        czList: [], //绑定所要提交的数据
        local_czList: [], //暂存类型可选类型彩种
      },
      current_game: "CPYX",
      gameCategory: [],
      curCzlist: [],
      local_curCzlist: [], //彩种gameId
      datePickerOptions: {
        disabledDate(time) {
          let lastday = Date.now() + 1 * 24 * 3600 * 1000;
          let curDate = new Date().getTime();
          let jiezhi = 37 * 24 * 3600 * 1000;
          let day35 = curDate - jiezhi;
          return time.getTime() > lastday || time.getTime() < day35;
        },
      },
      fastData: "",
      teamChangeList: "",
      detail_list_data: "",
      selfInfo_data: "",
      type_data: "",
      qr_dialogVisible: false,
      isVisable: true,
      Hierarchy: 0, //0和’‘ 是会员 1，是一级代理 2.二级代理 3 三级代理
    };
  },

  //9  10 11  12 13 15 19  20 21 24 25  26 27  28 29 30 31

  watch: {},
  computed: {},
  methods: {
    // 初始化游戏种类
    get_game_category() {
      this.$post("Pc.HomePage.getAllGameCategory").then((res) => {
        if (res.code == 0) {
          this.gameCategory = res.data;
          // console.log(this.gameCategory)
        } else {
          return this.$message.error(res.msg);
        }
      });
    },
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
    // 获取彩种信息
    get_caizhong_list() {
      if (this.curCzlist.length > 0) return;
      this.$post("Pc.HomePage.getCpGameList").then((res) => {
        if (res.code == 0) {
          let mylistdata = Object.values(res.data);
          let firlist = []; //存放第一层遍历的值
          let seclist = []; //存放第二层遍历的值
          let lastlist = [];
          for (let i = 0; i < mylistdata.length; i++) {
            firlist.push(mylistdata[i].gameCateList);
            for (let j = 0; j < firlist[i].length; j++) {
              seclist.push(firlist[i][j]);
            }
          }
          for (let k = 0; k < seclist.length; k++) {
            if (seclist[k].channelCode == "CPYX") {
              for (let m = 0; m < seclist[k].gameInfoList.length; m++) {
                lastlist.push(seclist[k].gameInfoList[m]);
              }
            }
          }
          if (lastlist.length > 0) {
            lastlist.sort(function compareFunction(param1, param2) {
              return param1.gameName.localeCompare(param2.gameName, "zh");
            });
            // 添加全部
            this.curCzlist = lastlist;
            this.local_curCzlist = this.curCzlist;
            this.local_curCzlist.forEach((item) => {
              //初始化全选
              this.info.czList.push(item.gameId);
            });
            this.info.checkAllSel = true; //初始化高亮全选按钮
          }
          //console.log(this.curCzlist);
        } else {
          return this.$message.error(res.message);
        }
      });
    },
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
    },
    freeDateChange() {
      this.fastData = "";
    },
    // 选择全部类型
    change_Alltype(value) {
      if (value) {
        this.local_curCzlist = [];
        this.info.czList = [];
        this.info.checkedXin = false;
        this.info.checkedGuan = false;
        this.info.checkedAllCz = false;
        this.info.checkAllSel = true; //高亮全选按钮
        this.local_curCzlist = this.curCzlist; //显示全部彩种
        this.local_curCzlist.forEach((item) => {
          this.info.czList.push(item.gameId);
        });
      } else {
        this.info.local_czList = [];
        this.info.czLis = [];
      }
    },
    //选择官类型
    change_Guantype(value) {
      if (value) {
        this.local_curCzlist = [];
        this.info.czList = [];
        this.info.checkedXin = false;
        this.info.checkedAlltype = false;
        this.info.checkedAllCz = false;
        this.info.checkAllSel = true; //高亮全选按钮
        this.curCzlist.forEach((item) => {
          if (item.groupId == 1) {
            this.local_curCzlist.push(item); //显示官彩种
          }
        });
        this.local_curCzlist.forEach((ite) => {
          //全选官彩种
          this.info.czList.push(ite.gameId);
        });
      } else {
        this.info.local_czList = [];
        this.info.czLis = [];
      }
    },
    //选择信类型
    change_Xintype(value) {
      this.local_curCzlist = [];
      this.info.czList = [];
      this.info.checkedGuan = false;
      this.info.checkedAlltype = false;
      this.info.checkAllSel = true; //高亮全选按钮
      this.info.checkedAllCz = false;
      this.info.local_czList = [];
      if (value) {
        this.curCzlist.forEach((item) => {
          //全选信彩种
          if (item.groupId == 0) {
            this.local_curCzlist.push(item); //显示信彩种
          }
        });
        this.local_curCzlist.forEach((ite) => {
          //全选官彩种
          this.info.czList.push(ite.gameId);
        });
      } else {
        this.info.local_czList = [];
        this.info.czLis = [];
      }
    },

    //  选择彩种
    check_cz(value) {
      //console.log(value);
      if (value.length > 0) {
        this.type_data = value.join(",");
      } else {
        this.type_data = "";
      }
    },

    // 选择全部彩种
    checked_AllCz(value) {
      this.info.checkAllSel = false;
      if (value) {
        //this.local_curCzlist = [];
        this.type_data = 0;
        this.isVisable = false;
      } else {
        // this.local_curCzlist = this.curCzlist;
        this.type_data = "";
        this.isVisable = true;
      }
    },

    //全选
    chack_All(value) {
      //是否全选
      if (value) {
        this.local_curCzlist.forEach((item) => {
          this.info.czList.push(item.gameId);
          this.type_data = this.info.czList.join(",");
        });
      } else {
        this.info.czList = [];
        this.type_data = "";
      }
    },

    //报表查询
    onsearch_TeamList() {
      //请求之前
      this.init_all();
      //判断是否选择类型
      if (
        this.info.checkedAlltype == false &&
        this.info.checkedGuan == false &&
        this.info.checkedXin == false
      ) {
        this.qr_dialogVisible = true;
        return;
      }

      this.$get("Pc.Agent.getNewTeamReport", {
        startTime: this.info.select_time[0],
        endTime: this.info.select_time[1],
        accountName: this.info.accountName,
        types: this.type_data,
      }).then((res) => {
        if (res.code == 0) {
          this.detail_list_data = res.data;
          let local_daital = {
            detail_list: this.detail_list_data,
            startTime: this.info.select_time[0],
            endTime: this.info.select_time[1],
            types: this.type_data,
            accountName: this.info.accountName,
          };
          let valueLocal = localStorage.getItem("local_daital");
          if (valueLocal) {
            localStorage.removeItem("local_daital");
          }
          localStorage.setItem("local_daital", JSON.stringify(local_daital));
          this.$router.push({
            name: "home_report_team_detail",
          });
          //loading.close();
        } else {
          //loading.close();
          return this.$message.error(res.message);
        }
      });
    },
    //el-table 添加class
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "danger-row";
      }
      return "";
    },
    // 关闭撤单弹窗
    handleClose(done) {
      done();
    },
    //初始化显示数据
    init_all() {
      if (this.info.checkedAllCz == true) {
        this.type_data = 0;
      } else {
        this.type_data = this.info.czList.join(",");
      }
    },
  },
  created() {
    //初始化游戏种类
    this.get_game_category();
    //获取彩种
    this.get_caizhong_list();
    //初始化
  },
  mounted() {
    //this.init_all()
    //this.getNowTime(); //初始化当前时间
    this.info.select_time = utilDate.getNowTimeAndTomorrowTimeRange(
      "02:00:00",
      "02:00:00"
    );
  },
};
</script>
<style lang="scss">
.high-light {
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
    span {
      text-align: left;
      display: inline-block;
      width: 84px;
      height: 28px;
      padding-left: 1px;
    }
    .lastone {
      width: 72px;
    }
  }
}
.left-label {
  padding: 12px;
  ul {
    li {
      height: 32px;
      line-height: 32px;
      margin-bottom: 12px;
      text-align: right;
    }
  }
}
.right-search {
  padding: 12px;
  .el-row {
    margin-bottom: 12px;
  }
  .datepick {
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      margin-right: 12px;
    }
  }
  .caizhong {
    margin-top: 6px;
    .el-checkbox {
      margin-bottom: 12px;
    }
  }
}
.el-table .danger-row {
  color: red;
  background: #ff000010;
}
</style>