<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      账变报表
    </div>
    <el-divider></el-divider>

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
            v-model="info.accountName"
            placeholder="用户名"
          ></el-input>
        </el-form-item>

        <el-form-item v-if='Hierarchy>0'>
          <el-checkbox
            label="包含下级"
            v-model="isContainSub"
            @change="change_isContainSub($event)"
          ></el-checkbox>
        </el-form-item>
        <el-form-item label="账变类型">
          <el-button type="button" @click="get_CashChangeType()"
            >请选择</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="onsearch_BillsList">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="result_content">
        <el-table
          :data="accountChangeList"
          border
          style="width: 100%"
          empty-text="没有符合查询条件的数据！"
        >
          <el-table-column label="用户名" width="140" prop="username">
          </el-table-column>
          <el-table-column label="时间" width="140" prop="action_time">
          </el-table-column>
          <el-table-column label="账变类型" width="140" prop="liq_type_name">
          </el-table-column>
          <el-table-column label="支出" width="140">
            <template slot-scope="scope">
              <span v-if="scope.row.deposit_or_withdraw == 1"
                >{{ scope.row.coin }}{{ (scope.row.rebate_charge==0?'':` (${scope.row.rebate_charge}) `) }}</span
              >
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column label="收入" width="140" prop="deposit_or_withdraw">
            <template slot-scope="scope">
              <span v-if="scope.row.deposit_or_withdraw == 0">{{
                scope.row.coin
              }}</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column label="余额" width="140" prop="balance">
          </el-table-column>
          <el-table-column label="备注" width="" prop="remark">
          </el-table-column>
        </el-table>
        <div class="total" v-if="accountChangeList.length > 0">
          <el-row >
            <el-col :span='24'>
                <span>
                  小计：{{ subTotalCount }}
                </span>
                <span></span>
                <span></span>
                <span class="high-light">
                  {{ Sub_totalExpenditureDiscount }}({{Sub_totalExpenditureDiscount}})
                </span>
                <span>
                  {{ Sub_totalIncomeAmount }}({{Sub_totalIncomeDiscount}})
                </span>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span='24'>
                <span>
                  总计：{{total_count}}
                </span>
                <span></span>
                <span></span>
                <span class="high-light" >
                  {{ totalExpenditureAmount }}({{totalExpenditureDiscount}})
                </span>
                <span>
                 {{ totalIncomeAmount }}({{ totalIncomeDiscount }})
                </span>
            </el-col>
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
        <div class="tips">备注：本页资金变动为所有用户资金变动之和</div>
      </div>
      <!-- 账变类型 dialog -->
      <el-dialog title="账变类型" :visible.sync="dialogFormVisible">
        <el-row class="check-head">
          <el-col :span="4">
            <el-checkbox v-model="checkedAll"  @change='change_All' border size="medium"
              >全部</el-checkbox
            ></el-col
          >
          <el-col :span="4">
            <el-checkbox v-model="checkedIncomeAll" @change='change_incomeAll' border size="medium"
              >收入</el-checkbox
            ></el-col
          >
          <el-col :span="4">
            <el-checkbox v-model="checkedSpendAll"  @change='change_spendAll' border size="medium"
              >支出</el-checkbox
            ></el-col
          >
        </el-row>
        <el-divider></el-divider>
        <el-form>
          <div v-for="(item) in bills_type_list" :key="item.id">
            <div class="first-lever">
              <el-checkbox-group
                v-model="checkedcChildren"
              >
                <el-checkbox :key="item.index" :label="item.id" border  @change='check_children'>{{
                  item.Key
                }}</el-checkbox>
              </el-checkbox-group>
              <el-form-item
                class="second-lever"
                label="收入"
                prop="second_list"
              >
                <el-checkbox-group
                  v-model="income"
                  @change="change_income($event)"
                >
                  <el-checkbox
                    v-if="ite.FType == 0"
                    v-for="ite in item.Value"
                    :key="ite.index"
                    :label="ite.FId"
                    name="income"
                    >{{ ite.FName }}</el-checkbox
                  >
                </el-checkbox-group>
              </el-form-item>
              <el-form-item
                class="second-lever"
                label="支出"
                prop="second_list"
              >
                <el-checkbox-group
                  v-model="spend"
                  @change="change_spend($event)"
                >
                  <el-checkbox
                    v-if="ite.FType == 1"
                    v-for="ite in item.Value"
                    :key="ite.index"
                    :label="ite.FId"
                    name="spend"
                    >{{ ite.FName }}</el-checkbox
                  >
                </el-checkbox-group>
              </el-form-item>
              <el-divider></el-divider>
            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel_check">取 消</el-button>
          <el-button type="primary" @click="submit_check">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

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
        current_isContainSub: 0,
      },
      income: [],
      spend: [],
      bills_type_list: [],
      checkedAll: "",
      checkedIncomeAll: "",
      checkedSpendAll: "",

      checkedcChildren: [],
      checkType: [], //传给后台的数据
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
      isContainSub: false,
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
      accountChangeList: [],
      currentPage: 1,
      page_count: 0,
      total: 0,
      page_size: 10,
      page_sizes: [10, 20, 30, 40, 50],

      dialogFormVisible: false,
      subTotalCount: 0,
      Sub_totalExpenditureAmount: "",
      Sub_totalExpenditureDiscount: "",
      Sub_totalIncomeAmount: "",
      Sub_totalIncomeDiscount: "",
      total_count: 0,
      totalExpenditureAmount: "",
      totalExpenditureDiscount: "",
      totalIncomeAmount: "",
      totalIncomeDiscount: "",
      Hierarchy: 1 //0和’‘ 是会员 1，是一级代理 2.二级代理 3 三级代理
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
    //   var defaultDate = `${year}-${month}-${date}${hour}`; // 当日时间
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
    //获取账变记录
    onsearch_BillsList() {
      let postData = {
            startTime: this.info.select_time[0],
            endTime: this.info.select_time[1],
            accountName: this.info.accountName,
            checkType: this.checkType.join(","),
            isContainSub: this.Hierarchy > 0 ? this.info.current_isContainSub:0,
            page: this.currentPage,
            page_size: this.page_size,
          };
        this.requestData(postData);
    },
     requestData(postData) {
       let loading = this.$loading({
            lock: true,//lock的修改符--默认是false
            text: '查询中，请耐心等待！',//显示在加载图标下方的加载文案
            spinner: 'el-icon-loading',//自定义加载图标类名
            background: 'rgba(0, 0, 0, 0.7)',//遮罩层颜色
            target: document.querySelector('.el-table')})//loadin覆盖的dom元素节点
      this.accountChangeList = [];
      this.$get("Pc.Member.getAccountChangeList", postData).then((res) => {

        console.log(res);
        if (res.code == 0) {
          this.accountChangeList = res.data.data;
          this.page_count = res.data.page_count;
          //console.log(res.data);
          this.subTotalCount = res.data.subTotal.subTotalCount;
          this.Sub_totalExpenditureAmount =
            res.data.subTotal.totalExpenditureAmount; //小计
          this.Sub_totalExpenditureDiscount =
            res.data.subTotal.totalExpenditureDiscount;
          this.Sub_totalIncomeAmount = res.data.subTotal.totalIncomeAmount;
          this.Sub_totalIncomeDiscount = res.data.subTotal.totalIncomeDiscount;
          this.total_count = res.data.total_count; //总计
          this.totalExpenditureAmount =
            res.data.total[0].totalExpenditureAmount;
          this.totalExpenditureDiscount =
            res.data.total[0].totalExpenditureDiscount;
          this.totalIncomeAmount = res.data.total[0].totalIncomeAmount;
          this.totalIncomeDiscount = res.data.total[0].totalIncomeDiscount;
          loading.close();
        } else {
          return this.$message.error(res.message);
        }
      });
     },
    // 分页
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.page_size = val;
      this.onsearch_BillsList();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.onsearch_BillsList();
    },
    //获取账变类型
    get_CashChangeType() {
      this.dialogFormVisible = true;
      this.$get("Pc.Member.getCashChangeType").then((res) => {
        if (res.code == 0) {
          let local_type_list = res.data;
          local_type_list.forEach((k, index) => {
            this.$set(k, "id", "f" + index);//添加
            this.$set(k, "check", false);
          });
          this.bills_type_list = local_type_list;
          console.log(this.bills_type_list)
        } else {
          return this.$message.error(res.msg);
        }
      });
    },
    //收入change
    change_income(value) {
       //console.log(value)
    },
    //支出change
    change_spend(value) {
       //console.log(value)
    },
    //提交数据
    submit_check() {
      this.dialogFormVisible = false;
      let new_arr = this.income.concat(this.spend);
      //console.log(new_arr);
      this.checkType = this.heavy(new_arr);
    },
    // 取消数据
    cancel_check() {
      this.dialogFormVisible = false;
      this.income=[]
      this.spend=[]
      this.checkedIncomeAll=false
      this.checkedAll=false
      this.checkedSpendAll=false
      this.checkedcChildren=[]
      this.checkType = [];
    },
    // indexof去重
    heavy(arr) {
      var newArr = [];
      for (var i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) === -1) {
          newArr.push(arr[i]);
        }
      }
      return newArr;
    },
    // 全选子节点
    check_children(value){
     let current_select_income=[]
     let current_select_spend=[]
      this.bills_type_list.forEach((k)=>{
        if(k.id==event.target.defaultValue){
            k.Value.forEach((ite) => {
               if(ite.FType==0){
                  current_select_income.push(ite.FId)
               }else if(ite.FType==1){
                  current_select_spend.push(ite.FId)
               }
              
              this.income=this.income.concat(current_select_income)
              this.spend=this.spend.concat(current_select_spend)
            })
        }else{
          if(event.target.defaultValue && value==false){
            this.income = this.income.filter(item=>current_select_income.indexOf(item)==-1);//删除当前
            this.spend = this.spend.filter(item=>current_select_spend.indexOf(item)==-1);//删除当前
          }
          return
        }
      })
      //console.log(event.target)
    },
    //选择全部收入
    change_incomeAll(value){
      if(value){
         this.checkedAll=false
         this.checkedSpendAll=false
         this.spend=[]
         this.bills_type_list.forEach((item)=>{
           item.Value.forEach((ite)=>{
              if(ite.FType==0){
                this.income=this.income.concat(ite.FId)
                this.checkedcChildren=[]
              }else{
                return
              }
           })
         })
      }else{
         this.income=[]
      }
    },
    //选择全部支出
    change_spendAll(value){
      if(value){
         this.checkedIncomeAll=false
         this.checkedAll=false
         this.income=[]
         this.bills_type_list.forEach((item)=>{
           item.Value.forEach((ite)=>{
             if(ite.FType==1){
                 this.spend=this.spend.concat(ite.FId)
                 this.checkedcChildren=[]
             }else{
               return
             }
           
           })
         })
      }else{
         this.spend=[]
      }
    },
    // 选择全部
    change_All(value){
      if(value){
        this.checkedIncomeAll=false
        this.checkedSpendAll=false
         this.bills_type_list.forEach((item)=>{
           this.checkedcChildren=this.checkedcChildren.concat(item.id)
           item.Value.forEach((ite)=>{
             this.income=this.income.concat(ite.FId)
             this.spend=this.spend.concat(ite.FId)
           })
         })
      }else{
         this.income=[]
         this.spend=[]
         this.checkedcChildren=[]
      }
    }
  },
  watch: {
      $route: {
        handler(to, from) {
          this.info.accountName = this.$route.query.accountName;
          this.onsearch_BillsList();
          let postData = {
            startTime: this.info.select_time[0],
            endTime: this.info.select_time[1],
            accountName: this.info.accountName,
            checkType: this.checkType.join(","),
            isContainSub: this.Hierarchy > 0 ? this.info.current_isContainSub:0,
            page: this.currentPage,
            page_size: this.page_size,
          };
          this.requestData(postData);
        },
        immediate: true,
      },
    },
  created() {
    this.timeDefaultShow = new Date();
    this.timeDefaultShow.setMonth(new Date().getMonth() - 1);
	  this.info.select_time = utilDate.getNowTimeAndTomorrowTimeRange("02:00:00","02:00:00");
    // this.getNowTime();
    //初始化订单
    //this.onsearch_BillsList();
  },
  mounted() {},
};
</script>
<style lang="scss">
.high-light{
  font-weight: bold;
  color: red;
}
.tips{
  font-size: 12px;
  color:#999
}
.check-head {
  margin-bottom: 10px;
}
.first-lever .el-checkbox-group {
  margin-bottom: 10px;
}
.second-lever .el-form-item__label {
 // height: 40px !important;
}
.search_content {
  margin: 10px 0;
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
.first-lever{
  .el-form-item--small .el-form-item__content{
  line-height: 22px!important;  
  }
  .el-divider--horizontal{
    margin: 12px 0;
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
    span{
      text-align: left;
      display: inline-block;
      width: 140px;
      height: 28px;
      float: left;
    }
     .lastone{
        width:72px
      }
  }
}

</style>