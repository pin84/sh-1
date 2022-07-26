<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      团队报表
    </div>
    <el-divider></el-divider>
    <!-- 查询 -->
    <el-row>
      <el-col :span="24">
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
              >
              </el-date-picker>
              <el-button
                style="margin-left: 12px"
                type="primary"
                @click="onsearch_TeamDetailList()"
                >查询</el-button
              >
              <el-button
                @click="goback"
                style="margin-left: 12px"
                type="default"
                >返回</el-button
              >
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!-- 团队报表 -->
    <div class="search_content">
      <div class="result_content" v-if="agentList_data.length > 0">
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
          <el-table-column label="投注人数" width="" prop="buyNumber">
          </el-table-column>
          <el-table-column label="投注金额" width="" prop="buyAmount" sortable>
          </el-table-column>
          <el-table-column
            label="有效投注金额"
            width=""
            prop="effectiveAmount"
            sortable
          >
          </el-table-column>
          <el-table-column label="投注返点" width="" prop="cpFandian">
          </el-table-column>
          <el-table-column
            label="代理返点"
            width=""
            prop="agentFandian"
            sortable
          >
          </el-table-column>
          <el-table-column label="返奖总额" width="" prop="winAmount" sortable>
          </el-table-column>
          <el-table-column label="活动总额" width="" prop="activityAmount">
          </el-table-column>
          <el-table-column label="日工资" width="" prop="wages">
          </el-table-column>
          <el-table-column label="充值总额" width="" prop="rechargeAmount">
          </el-table-column>
          <el-table-column label="提现总额" width="" prop="withdrawAmount">
          </el-table-column>
          <el-table-column label="总盈亏" width="" prop="winAndLoss" sortable>
          </el-table-column>
        </el-table>
        <div class="total" v-if="total_lsit">
          <el-row no-gutter>
            <el-col :span="24">
              <span class="firstone">总计(资金变化总额)</span>
              <span>{{ total_lsit.buyNumber }}</span>
              <span>{{ total_lsit.buyAmount }}</span>
              <span>{{ total_lsit.effectiveAmount }}</span>
              <span>{{ total_lsit.cpFandian }}</span>
              <span>{{ total_lsit.agentFandian }}</span>
              <span>{{ total_lsit.winAmount }}</span>
              <span>{{ total_lsit.activityAmount }}</span>
              <span>{{ total_lsit.wages }}</span>
              <span>{{ total_lsit.rechargeAmount }}</span>
              <span>{{ total_lsit.withdrawAmount || 0 }}</span>
              <span class="lastone">{{ total_lsit.winAndLoss }}</span>
            </el-col>
          </el-row>
        </div>
        <div class="tips">备注：如需要查看代理或用户详情请点击相应用户名</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as utilDate from "../../../../plugins/date"; //日期工具函数
import newsVue from '../../news.vue';
export default {
  props: {},
  data() {
    return {
      info: {
        select_time: [],
      },
      agentList_data: [],
      accountID: "",
      startTime:'',
      endTime: '',
      types: '',
      datePickerOptions: {
        disabledDate(time) {
          let lastday = Date.now() + 1 * 24 * 3600 * 1000;
          let curDate = new Date().getTime();
          let jiezhi = 35 * 24 * 3600 * 1000;
          let day35 = curDate - jiezhi;
          return time.getTime() > lastday || time.getTime() < day35;
        },
      },
      total_lsit: "",
      accountName: '',
      Hierarchy: 0, //0和’‘ 是会员 1，是一级代理 2.二级代理 3 三级代理
    };
  },
  computed: {},
  watch: {
    $route:{
      handler:function(to,from){
        if (to.fullPath=='/user/report/report_team_detail') {
          this.init_tabledata();
        }
      },
      immediate: true
    } 
  },
  methods: {
    //go back
    goback() {
      this.$router.go(-1);
    },
    init_tabledata() {
      let local_detail = JSON.parse(
        localStorage.getItem("local_daital")
      );
      let selfInfo_Data = local_detail.detail_list.selfInfo;
      local_detail.detail_list.agentList.list.unshift(selfInfo_Data);
      this.agentList_data = local_detail.detail_list.agentList.list;
      this.total_lsit = local_detail.detail_list.total;
      
      this.startTime =local_detail.startTime
      this.endTime =local_detail.endTime
      this.accountID = selfInfo_Data.uid
      this.accountName = local_detail.accountName
      this.types=local_detail.types
      this.getNowTime()
      // this.onsearch_TeamDetailList()
    },

    //初始化时间
    getNowTime() {
      var self = this;
      self.info.select_time = [this.startTime, this.endTime];
    },

    //报表查询
    onsearch_TeamDetailList() {
      let loading = this.$loading({
        lock: true, //lock的修改符--默认是false
        text: "查询中，请耐心等待！", //显示在加载图标下方的加载文案
        spinner: "el-icon-loading", //自定义加载图标类名
        background: "rgba(0, 0, 0, 0.7)", //遮罩层颜色
        target: document.querySelector(".el-table"),
      }); // loadin覆盖的dom元素节点
      console.log('1234')
      //请求之前
      this.$get("Pc.Agent.getNewTeamReport", {
        startTime: this.info.select_time[0],
        endTime: this.info.select_time[1],
        accountName: this.accountName,
        accountID: this.accountID,
        types: this.types,
      }).then((res) => {
        if (res.code == 0) {
          //console.log(res.data)
          //组装数据
          let local_agentList_data = res.data.agentList.list;
          let local_selfInfo_data = res.data.selfInfo;
          let local_total_data = res.data.total;
          if (local_selfInfo_data != "") {
            local_agentList_data.unshift(local_selfInfo_data);
          }
          this.agentList_data = local_agentList_data;
          this.total_lsit = local_total_data;
          loading.close();
        } else {
          return this.$message.error(res.message);
        }
      });
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
      if (rowIndex === 0) {
        return "danger-row";
      }
    },
    showMemberDetail(row) {
      var index = row.index;
      if (index !== 0) {
        this.accountID = row.uid;
        this.onsearch_TeamDetailList();
      }
    },
  },
  created() {
    // this.init_tabledata();
    this.getNowTime()
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
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
  // padding: 0 10px;
  padding-left: 10px;
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
      width: 83px;
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