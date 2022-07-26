<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      用户列表
    </div>
    <el-divider></el-divider>
    <el-row>
      <el-col class="datepick">
        <el-form :inline="true" :model="info">
          <el-form-item label="用户名">
            <el-input type="text" v-model="info.uname"></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox
              label="显示未充值"
              v-model="cur_isBalance"
              @change="change_isBalance($event)"
            ></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox
              label="显示未投注"
              v-model="cur_isBuying"
              @change="change_isBuying($event)"
            ></el-checkbox>
          </el-form-item>
          <el-form-item label="余额">
            <el-input
              style="width: 100px"
              type="text"
              v-model="info.minBalance"
            ></el-input>
            <span style="padding: 0 10px">至</span>
            <el-input
              style="width: 100px"
              type="text"
              v-model="info.maxBalance"
            ></el-input>
          </el-form-item>
                <!-- :picker-options="datePickerOptions"
              :default-value="[new Date().setMonth(new Date().getMonth() - 1)]" -->
          <el-form-item label="登录时间">
            <el-date-picker
              v-model="info.select_time"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['02:00:00', '02:00:00']"
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
            <el-button
              @click="reset_info"
              style="margin-left: 12px"
              type="primary"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="search_content">
      <div class="result_content">
        <el-button
              @click="goBack"
              type="primary"
              >返回</el-button
            >
        <p class="right_on">当前位置：{{ currlocation ? currlocation : this.agentInfo_data.username }}</p>
        <el-table
          :data="agentInfo"
          border
          style="width: 100%"
          empty-text="没有符合查询条件的数据！"
          :row-class-name="tableRowClassName"
          row-key="0"
        >
          <el-table-column label="用户名" width="">
            <template slot-scope="scope">
              <el-link
                @click="onsearch_my(scope.row.uid, scope.row.index)"
                type="primary"
                v-if="scope.row.hierarchy >= 1"
                >{{ scope.row.username }}</el-link
              >
              <span v-if="scope.row.hierarchy == 0">{{
                scope.row.username
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户类型" width="">
            <template slot-scope="scope">
              <span v-if="scope.row.hierarchy >= 1">代理</span>
              <span v-if="scope.row.hierarchy == 0">会员</span>
            </template>
          </el-table-column>
          <el-table-column label="注册时间" width="" prop="regTime">
          </el-table-column>
          <el-table-column label="最后登录时间" width="" prop="lastLoginTime">
          </el-table-column>
          <el-table-column label="未登录" width="" prop="daysDiff">
          </el-table-column>
          <el-table-column label="余额" width="" prop="userMoney">
          </el-table-column>
          <el-table-column label="返点级别" width="">
            <template slot-scope="scope">
              <el-link @click="getUserKickback(scope.row.uid)" type="primary"
                >返点</el-link
              >
            </template>
          </el-table-column>
          <el-table-column label="状态" width="" prop="userState">
          </el-table-column>
          <el-table-column type="index" label="用户操作" width="280px">
            <template slot-scope="scope">
              <el-link
                @click="
                  $router.push({
                    name: 'user_list_detail',
                    query: { accountID: scope.row.uid },
                  })
                "
                class="mr-5"
                type="primary"
                >详情</el-link
              >
              <el-link
                v-if="scope.row.isTransferAccounts "
                @click="
                  $router.push({
                    name: 'user_transfer_account',
                    query: { accountID: scope.row.uid },
                  })
                "
                class="mr-5"
                type="primary"
                >转账</el-link
              >
              <el-link
                @click="
                  $router.push({
                    name: 'team_overview',
                    query: {
                      accountID: scope.row.uid,
                      userName: scope.row.username,
                    },
                  })
                "
                class="mr-5"
                type="primary"
                >团队总览</el-link
              >
              <el-link
                @click="
                  $router.push({
                    name: 'user_list_kickback',
                    query: { accountID: scope.row.uid },
                  })
                "
                class="mr-5"
                type="primary"
                >返点设定</el-link
              >
              <el-link
                @click="
                  $router.push({
                    name: 'home_report_bills',
                    query: { accountName: scope.row.username },
                  })
                "
                type="primary"
                >账变记录</el-link
              >
            </template>
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
    <el-dialog
      title="返点等级"
      :visible.sync="dialog_kickback_visable"
      width="265px"
    >
      <div class="kick-box" v-if="cur_typeSetting_list.length > 0">
        <div
          class="kickback"
          v-for="item in cur_typeSetting_list"
          :key="item.index"
        >
          <span>{{ item.name }}</span>
          <span class="num">{{ accMul(item.maxKickback, 100) }}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialog_kickback_visable = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as utilDate from "../../../../plugins/date"; //日期工具函数

export default {
  data() {
    return {
      currlocation: null,
      info: {
        uname: "",
        isBalance: 0,
        isBuying: 0,
        minBalance: null,
        maxBalance: null,
        select_time: [],
      },
      cur_isBalance: false,
      cur_isBuying: false,
      agentInfo: [],
      agentInfo_data: "",
      total_count: 0,
      page_count: 0,
      currentPage: 1,
      page_size: 10,
      page_sizes: [10, 20, 30, 40, 50],
      userKickback: [],
      cur_typeSetting_list: [],
      dialog_kickback_visable: false,
      fastData: [],
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
    accMul(arg1, arg2) {
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e) {}
      try {
        m += s2.split(".")[1].length;
      } catch (e) {}
      let result =
        (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
        Math.pow(10, m);
      // let y = String(result).indexOf(".") + 1; //获取小数点的位置
      // if (y > 0) {
      //   return Math.round(result * Math.pow(10, 1)) / Math.pow(10, 1);
      // } else {
      //   return result;
      // }
	  return result;
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
      this.info.select_time = utilDate.fastDataChangeChoice02to02(time);
    },
    freeDateChange() {
      this.fastData = "";
    },
    // 获取用户列表
    getAgentInfo(accountid) {
      this.$get("Pc.Agent.getAgentInfo", {
        accountID: accountid,
      }).then((res) => {
        if (res.code == 0) {
          res.data.isFirst = 1;
          this.agentInfo_data = res.data;
        } else {
          return this.$message.error(res.message);
        }
      });
    },
    //获取下级会员列表
    getMemberList(accountid) {
      let loading = this.$loading({
        lock: true, //lock的修改符--默认是false
        text: "查询中，请耐心等待！", //显示在加载图标下方的加载文案
        spinner: "el-icon-loading", //自定义加载图标类名
        background: "rgba(0, 0, 0, 0.7)", //遮罩层颜色
        target: document.querySelector(".el-table"),
      }); //loadin覆盖的dom元素节点
      this.$get("Pc.Agent.getMemberList", {
        accountID: accountid,
        startTime: this.info.select_time[0],
        endTime: this.info.select_time[1],
        uname: this.info.uname,
        minBalance: this.info.minBalance,
        maxBalance: this.info.maxBalance,
        isBalance: this.info.isBalance,
        isBuying: this.info.isBalance,
        page: this.currentPage,
        page_size: this.page_size,
      }).then((res) => {
        console.log("--res--", res);


        if (res.code == 0) {

          let {currlocation} = res.data
          this.currlocation = currlocation
       
          let _agentInfo = [];

          res.data.list.forEach((item) => {
            _agentInfo.push(item);
          });

          _agentInfo.unshift(this.agentInfo_data);

          this.total_count = res.data.total_count;
          this.page_count = res.data.page_count;
      
          // _agentInfo.forEach((item, idx) => {
          //   item["fontid"] = idx;
          // });
          this.agentInfo = _agentInfo;
          console.log(_agentInfo);
          loading.close();
        } else {
          return this.$message.error(res.message);
        }
      });
    },
	getMemberListForCurrentAgent(accountid) {
	  let loading = this.$loading({
	    lock: true, //lock的修改符--默认是false
	    text: "查询中，请耐心等待！", //显示在加载图标下方的加载文案
	    spinner: "el-icon-loading", //自定义加载图标类名
	    background: "rgba(0, 0, 0, 0.7)", //遮罩层颜色
	    target: document.querySelector(".el-table"),
	  }); //loadin覆盖的dom元素节点
	  this.$get("Pc.Agent.getMemberList", {
	    accountID: accountid,
	    startTime: this.info.select_time[0],
	    endTime: this.info.select_time[1],
	    //uname: this.info.uname,
	    minBalance: this.info.minBalance,
	    maxBalance: this.info.maxBalance,
	    isBalance: this.info.isBalance,
	    isBuying: this.info.isBalance,
	    page: this.currentPage,
	    page_size: this.page_size,
	  }).then((res) => {
	    console.log("--res--", res);
	
	
	    if (res.code == 0) {
	
	      let {currlocation} = res.data
	      this.currlocation = currlocation
	   
	      let _agentInfo = [];
	
	      res.data.list.forEach((item) => {
	        _agentInfo.push(item);
	      });
	
	      _agentInfo.unshift(this.agentInfo_data);
	
	      this.total_count = res.data.total_count;
	      this.page_count = res.data.page_count;
	  
	      // _agentInfo.forEach((item, idx) => {
	      //   item["fontid"] = idx;
	      // });
	      this.agentInfo = _agentInfo;
	      console.log(_agentInfo);
	      loading.close();
	    } else {
	      return this.$message.error(res.message);
	    }
	  });
	},
    change_isBalance(e) {
      if (e == true) {
        this.info.isBalance = 1;
      } else {
        this.info.isBalance = 0;
      }
    },
    change_isBuying(e) {
      if (e == true) {
        this.info.isBuying = 1;
      } else {
        this.info.isBuying = 0;
      }
      
    },
    // 返回
      goBack(){
        // 非路由跳转，只能返回到第一层
         this.getAgentInfo(),
         this.getMemberList()
      },
    tableRowClassName({ rowIndex }) {
      // row.index = rowIndex;
      if (rowIndex === 0) {
        return "danger-row";
      }
    },
    // 分页
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.page_size = val;
      this.getMemberList();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getMemberList();
    },
    // 查询结果
    onSearch_content() {
      this.getAgentInfo();
      this.getMemberList(this.agentInfo_data.uid);
    },
    // 重置
    reset_info() {
      this.info.uname = "";
      this.info.isBalance = 0;
      this.info.isBuying = 0;
      this.info.minBalance = null;
      this.info.maxBalance = null;
      this.info.select_time = [];
      (this.fastData = []),
        // this.agentInfo_data.uid=null
        //this.agentInfo_data.username=''
        (this.agentInfo = []);
    },
    //查询代理
    onsearch_my(row_uid, row_index) {
      if (row_index !== 0) {
        this.getAgentInfo(row_uid);
        this.getMemberListForCurrentAgent(row_uid);
      }
    },
    // 获取返点
    getUserKickback(row_uid) {
      this.dialog_kickback_visable = true;
      this.$get("Pc.Agent.getUserKickback", {
        accountID: row_uid,
      }).then((res) => {
        if (res.code == 0) {
          this.cur_typeSetting_list = res.data;
          // console.log(this.cur_typeSetting_list);
        } else {
          return this.$message.error(res.message);
        }
      });
    },
  },
  created() {},
  mounted() {
    //this.getNowTime(); //初始化当前时间
    // this.info.select_time = utilDate.getNowTimeAndTomorrowTimeRange(
    //   "02:00:00",
    //   "02:00:00"
    // );
    this.getAgentInfo();
    this.onSearch_content();
  },
};
</script>

<style lang='scss' >
.right_on {
  padding: 10px 0;
  font-size: 12px;
  color: #333;
}
.result_content {
  .mr-5 {
    display: inline-block;
    margin-right: 5px;
  }
}
.datepick {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    margin-right: 12px;
  }
}
.page-box {
  margin: 20px auto;
}
.el-table .danger-row {
  td {
    background: #ff000010;
  }
}
.kick-box {
  margin: 0 20px;
  border: 1px solid #c0c4cc;
  .kickback {
    padding: 0 10px;
    border-bottom: 1px solid #c0c4cc;
    line-height: 30px;
    span {
      display: inline-block;
      width: 80px;
    }
    .num {
      line-height: 24px;
      text-align: center;
      border: 1px solid #eee;
      border-radius: 2px;
    }
  }
  .kickback:last-of-type {
    border: 0 none;
  }
}
</style> 