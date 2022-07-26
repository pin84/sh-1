<template>
  <!-- 搜索条件 -->
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
          :default-value="timeDefaultShow"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input
          type="text"
          v-model="info.username"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox
          label="包含下级"
          v-model="isContainSub"
          @change="change_isContainSub($event)"
        ></el-checkbox>
      </el-form-item>
      <el-form-item label="游戏平台">
        <el-select
          v-model="info.current_platform"
          placeholder="全部"
          @focus="getPlatform"
        >
          <el-option
            v-for="item in curPlatform"
            :label="item.gameName"
            :value="item.gameId"
            :key="item.index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="onsearch_order">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="result_content">
      <el-table
        :data="orderlist"
        border
        style="width: 100%"
        empty-text="没有符合查询条件的数据！"
      >
        <el-table-column  label="订单编号" width="150" prop="orderNo">
        </el-table-column>
        <el-table-column label="开始时间" width="120" prop="begin_time">
        </el-table-column>
        <el-table-column label="结束时间" width="120" prop="end_time">
        </el-table-column>
        <el-table-column label="用户" width="100" prop="username">
        </el-table-column>
        <el-table-column label="游戏平台" width="100" prop="gameHall">
        </el-table-column>
        <el-table-column label="游戏名称" width="100" prop="gameName">
        </el-table-column>
        <el-table-column label="房间类型" width="100" prop="roomName">
        </el-table-column>
         <el-table-column label="桌子号" width="100" prop="tableId">
        </el-table-column>
         <el-table-column label="座位号" width="100" prop="chairId">
        </el-table-column>
        <el-table-column label="初始资金" width="100" prop="curScore">
        </el-table-column>
        <el-table-column label="中奖金额" width="100" prop="gameWinAmount">
        </el-table-column>
        <el-table-column label="投注金额" width="100" prop="gameBetAmount">
        </el-table-column>
        <el-table-column label="有效投注" width="100" prop="effectiveAmount">
        </el-table-column>
        <el-table-column label="游戏盈亏" width="100" prop="winLossAmount">
        </el-table-column>
      </el-table>
      <div class="total" v-if="this.orderlist.length > 0">
        <el-row>
          <el-col :span="4">小计</el-col>
          <el-col :span="4"
            >投注金额<span>{{ subTotal.totalAmount }}</span></el-col
          >
          <el-col :span="4"
            >有效投注：<span>{{ subTotal.totalEffectiveAmount }}</span></el-col
          >
          <el-col :span="4"
            >游戏盈亏：<span>{{ subTotal.totalWinLossAmount }}</span></el-col
          >
          <el-col :span="4"
            >初始金额：<span>{{ subTotal.curScore }}</span></el-col
          >
          <el-col :span="4"
            >中奖金额：<span>{{ subTotal.totalGameWinAmount }}</span></el-col
          >
        </el-row>
        <el-row>
          <el-col :span="4">总计</el-col>
           <el-col :span="4"
            >投注金额<span>{{ total.totalAmount }}</span></el-col
          >
          <el-col :span="4"
            >有效投注：<span>{{ total.totalEffectiveAmount }}</span></el-col
          >
          <el-col :span="4"
            >游戏盈亏：<span>{{ total.totalWinLossAmount }}</span></el-col
          >
          <el-col :span="4"
            >初始金额：<span>{{ total.curScore }}</span></el-col
          >
          <el-col :span="4"
            >中奖金额：<span>{{ total.totalGameWinAmount }}</span></el-col
          >
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
</template>

<script>
	import * as utilDate from "@/plugins/date"; //日期工具函数
export default {
  data() {
    return {
      info: {
        select_time: [],
        username: "",
        current_platform: "",
        current_isContainSub: 1,
        current_orderType: "",
      },
      cur_platformID:'',
      curPlatform: [],
      current_gameid: "",
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
      orderlist: [],
      currentPage: 1,
      orderDetail: [],
      page_count: 0,
      total_count: 0,
      page_size: 10,
      page_sizes: [10, 20, 30, 40, 50],
      subTotal:'',
      total:'',
    };
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
    //   var hour = " 00:00:00"; //默认时分秒 如果传给后台的格式为年月日时分秒，就需要加这个，如若不需要，此行可忽略
    //   month = month + 1;
    //   month = month.toString().padStart(2, "0");
    //   date = date.toString().padStart(2, "0");
    //   var defaultDate = `${year}-${month}-${date}${hour}`; //当日时间
    //   var defaultDate2 = `${year}-${month}-${date2}${hour}`; //第二天时间

    //   self.info.select_time = [defaultDate, defaultDate2];
    // },
    //修改isContainSub
    change_isContainSub(contain) {
      if (contain == true) {
        this.info.current_isContainSub = 1;
      } else {
        this.info.current_isContainSub = 0;
      }
    },
    //获取订单
    onsearch_order() {
      //let paramsData = this.setparamsData;
      let loading = this.$loading({
        lock: true, //lock的修改符--默认是false
        text: "查询中，请耐心等待！", //显示在加载图标下方的加载文案
        spinner: "el-icon-loading", //自定义加载图标类名
        background: "rgba(0, 0, 0, 0.7)", //遮罩层颜色
        target: document.querySelector(".el-table"),
      }); //loadin覆盖的dom元素节点
      this.orderlist = [];
      this.$get("Pc.Report.getChessCardBetRecord", {
        startTime: this.info.select_time[0],
        endTime: this.info.select_time[1],
        accountName: this.info.username,
        //gameID: this.cur_platformID,
		gameID: this.info.current_platform,
        isContainSub: this.info.current_isContainSub, 
        page_index: this.currentPage,
        page_size: this.page_size,
      }).then((res) => {
        if (res.code == 0) {
          this.orderlist = res.data.list;
          this.page_count = res.data.page_count;
          this.total_count = res.data.total_count;
          //console.log(res.data);
          this.total=res.data.total
          this.subTotal=res.data.subTotal
          loading.close();
        } else {
          loading.close();
          return this.$message.error(res.message);
        }
      });
    },
    // 获取游戏平台
    getPlatform() {
      this.$get("Pc.Report.getPlatform", {
        channelCode: "QPYX",
      }).then((res) => {
        if (res.code == 0) {
          this.curPlatform = res.data;
		  this.curPlatform.unshift({
		                gameId:0,
		                gameName:"全部"
		              });
          //this.cur_platformID=0
          // console.log(res.data);
        } else {
          return this.$message.error(res.message);
        }
      });
    },
      // 分页
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.page_size = val;
      this.onsearch_order();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.onsearch_order();
    },
  },
  created() {
    this.timeDefaultShow = new Date();
    this.timeDefaultShow.setMonth(new Date().getMonth() - 1);
    //this.getNowTime();
	this.info.select_time = utilDate.getNowTimeAndTomorrowTimeRange("00:00:00","00:00:00");
    this.onsearch_order();
  },
};
</script>

<style lang="scss" scoped>
.el-table {
  a {
    color: #ca151e;
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

.user_content_blcok_title {
  margin-bottom: 15px;
}
.page-box {
  margin: 20px auto;
}
.total {
  padding: 0 15px;
  font-size: 12px;
  color: #666;
  background: #f7f7f7;
  border: 1px solid #eee;
  text-align: center;
  .el-row {
    height: 30px;
    line-height: 30px;
  }
}
</style>