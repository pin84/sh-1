<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      游戏记录
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
    <!-- 搜索条件 -->
    <div class="search_content" v-if="current_game == 'CPYX'">
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
        <el-form-item label="用户名">
          <el-input
            type="text"
            v-model="info.username"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="彩种">
          <el-select
            v-model="info.current_select_cz"
            placeholder="彩种"
            @focus="get_caizhong_list"
            @change="changegame($event)"
          >
            <el-option
              v-for="item in curCzlist"
              :label="
                item.gameName +
                [item.groupId == 1 ? '[官]' : ''] +
                [item.groupId == 0 ? '[信]' : '']
              "
              :value="item.gameId"
              :key="item.index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="玩法">
          <el-select
            v-model="info.current_select_wf"
            placeholder="玩法"
            @focus="get_play_lsit"
            @change="changeplay($event)"
          >
            <el-option
              v-for="item in curplaylist"
              :label="item.name"
              :value="item.id"
              :key="item.index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
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
          <el-table-column fixed label="注单编号" width="150">
            <template slot-scope="scope">
              <a href="#" @click="to_detail(scope.$index, scope.row)">{{
                scope.row.orderNumber
              }}</a>
            </template>
          </el-table-column>
          <el-table-column label="投注时间" width="120" prop="actionTime">
          </el-table-column>
          <el-table-column label="用户" width="100" prop="username">
          </el-table-column>
          <el-table-column label="彩种" width="100" prop="title">
          </el-table-column>
          <el-table-column label="玩法" width="100" prop="playedName">
          </el-table-column>
          <el-table-column label="投注内容" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.content }}</span>
              <span style="color: red" v-show="scope.row.odds !== null">
                {{
                  scope.row.group_type == 1 ? "" : "@" + scope.row.odds
                }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="投注期号" width="100" prop="numberOfPeriod">
          </el-table-column>
          <el-table-column label="投注金额" width="100" prop="amount">
          </el-table-column>
          <el-table-column label="投注返点" width="100" prop="fanDianAmount">
          </el-table-column>
          <el-table-column label="奖金" width="100" prop="bonus">
          </el-table-column>
          <el-table-column label="开奖号码" width="100" prop="data">
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              <el-button
                v-if="
                  ((scope.row.periodStatus == 1 && scope.row.orderStatus == 1) ||
                  scope.row.periodStatus == 0 ) && scope.row.uid == userId
                "
                size="mini"
                type="success"
                @click="handelcedan(scope.$index, scope.row)"
                >可撤单</el-button
              >
              <span
                v-if="scope.row.periodStatus == 2 && scope.row.orderStatus == 1"
                style="color: green"
                >未开奖</span
              >
              <span
                v-if="scope.row.periodStatus == 3 && scope.row.orderStatus == 2"
                style="color: #999"
                >未中奖</span
              >
              <span
                v-if="scope.row.periodStatus == 3 && scope.row.orderStatus == 3"
                style="color: red"
                >已派奖</span
              >
              <span
                v-if="scope.row.periodStatus == 3 && scope.row.orderStatus == 1"
                style="color: #999"
                >未结算</span
              >
              <span v-if="scope.row.orderStatus == 4" style="color: #999"
                >已撤单</span
              >
              <span v-if="scope.row.orderStatus == 5" style="color: #999"
                >下单失败</span
              >
              <span v-if="scope.row.orderStatus == 99" style="color: #999"
                >处理中</span
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="total" v-if="this.orderlist.length > 0">
          <el-row>
            <el-col :span="6">小计</el-col>
            <el-col :span="6"
              >投注金额：<span>{{ subtotal_totalAmount }}</span></el-col
            >
            <el-col :span="6"
              >投注返点：<span>{{ subtotal_totalFanDianAmount }}</span></el-col
            >
            <el-col :span="6"
              >奖金：<span>{{ subtotal_totalBonus }}</span></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="6">总计</el-col>
            <el-col :span="6"
              >投注金额：<span>{{ totalAmount }}</span></el-col
            >
            <el-col :span="6"
              >投注返点：<span>{{ totalFanDianAmount }}</span></el-col
            >
            <el-col :span="6"
              >奖金：<span>{{ totalBonus }}</span></el-col
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
    
    <div v-if="current_game == 'ZRSX'">
      <orderzrsx></orderzrsx>
    </div>
    <div v-if="current_game == 'TYJJ'">
      <ordertyjj></ordertyjj>
    </div>
    <div v-if="current_game == 'DZYX'">
      <orderdzyx></orderdzyx>
    </div>
    <div v-if="current_game == 'QPYX'">
      <orderqpyx></orderqpyx>
    </div>
    <div v-if="current_game == 'BYYX'">
      <orderbyyx></orderbyyx>
    </div>
    <div v-if="current_game == 'FBD'">
      <orderfbd></orderfbd>
    </div>
    <div v-if="current_game == 'JJYX'">
      <orderjjyx></orderjjyx>
    </div>
    
    <el-dialog
      title="操作提示"
      :visible.sync="cd_dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>是否撤销该订单？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cd_dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="removeeOrder()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="操作提示"
      :visible.sync="qr_dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>{{ qr_dialogmessage }}</span>
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
import * as utilDate from "@/plugins/date"; //日期工具函数
import orderzrsx from "../order/order_zrsx.vue";
import ordertyjj from "../order/order_tyjj.vue";
import orderdzyx from "../order/order_dzyx.vue";
import orderqpyx from "../order/order_qpyx.vue";
import orderbyyx from "../order/order_byyx.vue";
import orderfbd from "../order/order_fbd.vue";
import orderjjyx from "../order/order_jjyx.vue";
export default {
  props: {},
  data() {
    return {
      info: {
        select_time: [],
        username: "",
        current_select_cz: "",
        current_select_wf: "",
        current_status: -1,
        current_isContainSub: 1,
      },
      curCzlist: "",
      curplaylist: "",
      status: [
        {
          name: "全部",
          value: -1,
        },
        {
          name: "未开奖",
          value: 1,
        },
        {
          name: "已中奖",
          value: 3,
        },
        {
          name: "未中奖",
          value: 2,
        },
      ],
      isContainSub: true,
      gameCategory: [],
      current_gameid: "",
      current_gameplayid: "",
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
      cd_dialogVisible: false,
      qr_dialogVisible: false,
      qr_dialogmessage: "",
      currentSelectRow: "",
      currentPage: 1,
      orderDetail: [],
      page_count: 0,
      total_count: 0,
      total: 0,
      page_size: 10,
      page_sizes: [10, 20, 30, 40, 50],
      totalAmount: "",
      totalBonus: "",
      totalFanDianAmount: "",
      subtotal_totalAmount: "",
      subtotal_totalBonus: "",
      subtotal_totalFanDianAmount: "",
      current_game: "CPYX",
    };
  },
  components: {
    orderzrsx,
    ordertyjj,
    orderdzyx,
    orderqpyx,
    orderbyyx,
    orderfbd,
    orderjjyx
  },
  watch: {},
  computed: {
    userId(){
     let cur_user = this.$store.state.gd.userInfo;
       return cur_user.uid
    }
  },
  methods: {
    // 初始化游戏种类
    get_game_category() {
      this.$post("Pc.HomePage.getAllGameCategory").then((res) => {
        if (res.code == 0) {
          this.gameCategory = res.data;

        } else {
          return this.$message.error(res.message);
        }
      });
    },
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
            let allcz = {
              gameName: "全部",
              gameId: "",
            };
            lastlist.splice(0, 0, allcz);
            this.curCzlist = lastlist;
          }

          //console.log(this.curCzlist);
        } else {
          return this.$message.error(res.message);
        }
      });
    },
    // 获取彩种，存当前gameId
    changegame(current_id) {
      this.current_gameid = current_id; //修改当前彩种ID
      this.info.current_select_wf = ""; //修改彩种后，初始化玩法
    },
    //获取玩法
    changeplay(current_id) {
      this.current_gameplayid = current_id; //修改当前玩法ID
    },
    // 获取玩法
    get_play_lsit() {
      if (this.current_gameid !== "") {
        this.$get("Pc.GameIndex.GetGamePlayList", {
          gameId: this.current_gameid,
        }).then((res) => {
          if (res.code == 0) {
            let lastwf = res.data;
            if (lastwf.length > 0) {
              let allwf = {
                name: "所有玩法",
                id: "",
              };
              lastwf.splice(0, 0, allwf);
            }
            this.curplaylist = lastwf;
            //console.log(this.curplaylist);
          } else {
            return this.$message.error(res.message);
          }
        });
      }
    },

    // //初始化时间
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
      let d = {
        startTime: this.info.select_time[0],
        endTime: this.info.select_time[1],
        accountName: this.info.username,
        gameID: this.current_gameid,
        gamePlayId: this.current_gameplayid,
        isContainSub: this.info.current_isContainSub,
        page_index: this.currentPage,
        page_size: this.page_size,
        status: this.info.current_status,
      }

      console.log(d);

      this.$get("Pc.Report.getOrderList", d).then((res) => {
        if (res.code == 0) {
          this.orderlist = res.data.list;
          this.page_count = res.data.page_count;
          this.total_count = res.data.total_count;
          this.totalAmount = res.data.total.totalAmount;
          this.totalBonus = res.data.total.totalBonus;
          this.totalFanDianAmount = res.data.total.totalFanDianAmount;
          this.subtotal_totalAmount = res.data.subTotal.totalAmount;
          this.subtotal_totalBonus = res.data.subTotal.totalBonus;
          this.subtotal_totalFanDianAmount =
            res.data.subTotal.totalFanDianAmount;
          loading.close();
          console.log(this.orderlist)
        } else {
          return this.$message.error(res.message);
        }
      });
    },
    // 撤单弹窗
    handelcedan(index, row) {
      this.cd_dialogVisible = true;
      this.currentSelectRow = row;
    },
    // 关闭撤单弹窗
    handleClose(done) {
      done();
    },
    // 确认撤销订单
    removeeOrder() {
      this.cd_dialogVisible = false;
      this.$get("Pc.GameIndex.revokeOrder", {
        ids: this.currentSelectRow.orderId,
      }).then((res) => {
        if (res.code == 0) {
          this.qr_dialogVisible = true;
          this.qr_dialogmessage = res.message;
        } else {
          this.qr_dialogVisible = true;
          this.qr_dialogmessage = res.message;
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
    // 去详情页面
    to_detail(index, row) {
      this.$get("Pc.GameIndex.getOrderDetail", {
        orderId: row.orderId,
        gameId: row.gameId,
      }).then((res) => {
        if (res.code == 0) {
          this.orderDetail = res.data;
          this.$router.push({
            name: "user_order_detail",
            params: { detail: this.orderDetail, orderId: row.orderId },
          });
        } else {
          return this.$message.error(res.message);
        }
      });
    },
  },
  created() {
    //初始化游戏种类
    this.get_game_category();
    this.get_caizhong_list();
    this.timeDefaultShow = new Date();
    this.timeDefaultShow.setMonth(new Date().getMonth() - 1);
    //this.getNowTime();
    this.info.select_time = utilDate.getNowTimeAndTomorrowTimeRange(
      "00:00:00",
      "00:00:00"
    );
    //初始化订单
    this.onsearch_order();
  },
  mounted() {},
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