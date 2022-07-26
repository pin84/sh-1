<template>
  <div>
    <!-- 3天未登录人数明细 -->
    <el-dialog
      title="3天未登录人数明细"
      :visible.sync="team3d_Visable"
      width="60%"
    >
      <el-table
        :data="team3d_list.list"
        border
        style="width: 100%"
        empty-text="没有符合查询条件的数据！"
      >
        <el-table-column label="序号" width="84" prop="">
          <template slot-scope="scope">
            <span>{{ (currentPage - 1) * page_size + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属层级" width="" prop="">
          <template slot-scope="scope">
            <span>{{ scope.row.hierarchy >= 1 ? "代理" : "会员" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户名" width="" prop="username">
        </el-table-column>
        <el-table-column label="最后登录时间" width="" prop="lastLoginTime">
        </el-table-column>
        <el-table-column label="余额" width="" prop="userMoney">
        </el-table-column>
        <el-table-column label="返点等级" width="" prop="">
          <template slot-scope="scope">
            <el-link @click="getUserKickback(scope.row.uid)" type="primary"
              >返点</el-link
            >
          </template>
        </el-table-column>
        <el-table-column label="状态" width="" prop="userState">
        </el-table-column>
      </el-table>
      <!-- 分页 -->
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

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="team3d_Visable = false"
          >关闭</el-button
        >
      </span>
    </el-dialog>
    <!-- 弹窗 -->
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
          <span class="num">{{ Number(item.maxKickback) * 100 }}</span>
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
export default {
  data() {
    return {
      currentPage: 1,
      total: 0,
      page_size: 10,
      page_sizes: [10, 20, 30, 40, 50],
      team3d_Visable: false,
      team3d_list: [],
      total_count: null,
      dialog_kickback_visable: false,
      cur_typeSetting_list: [],
    };
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.page_size = val;
      this.getAgentRechargeList();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getAgentRechargeList();
    },
    /* 
     ** 3天未登录人数明细
     1、无参数
     2、参数 accountID page page_size
    */
    getAgentRechargeList() {
      this.$get("Pc.Agent.getMore3daysUnloginMemberList", {
        accountID: this.$parent.accountID,
        page: this.currentPage,
        page_size: this.page_size,
      }).then((res) => {
        if (res.code == 0) {
          this.team3d_list = res.data;
          this.total_count = Number(res.data.total_count);
          // console.log(this.team3d_list);
        } else {
          return this.$message.error(res.message);
        }
      });
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
};
</script>

<style lang="scss" scoped>
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

.kick-box{
  margin: 0 20px;
  border: 1px solid #c0c4cc;
  .kickback{
    padding: 0 10px;
    border-bottom:1px solid #c0c4cc;
    line-height: 30px;
    span{
      display: inline-block;
      width: 80px;
    }
    .num{
      line-height: 24px;
      text-align: center;
      border:1px solid #eee;
      border-radius: 2px;
    }
   
  }
   .kickback:last-of-type{
      border: 0 none;
    }
}
</style>