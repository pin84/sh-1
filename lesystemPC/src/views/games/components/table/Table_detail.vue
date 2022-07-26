<template>
  <!-- 团队总人数明细 -->
  <el-dialog :title="title" :visible.sync="show" width="60%"  :show-close='false'>
    <el-table
      :data="list"
      border
      style="width: 100%"
      empty-text="没有符合查询条件的数据！"
    >
      <el-table-column label="序号" width="84" prop="">
        <template slot-scope="scope">
          <span>{{ (currentPage - 1) * page_size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="" prop="username">
      </el-table-column>
      <el-table-column label="所属层级" width="" prop="">
        <template slot-scope="scope">
          <span>{{ scope.row.hierarchy >= 1 ? "代理" : "会员" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" width="" prop="regTime">
      </el-table-column>
      <el-table-column label="用户状态" width="" prop="userState">
      </el-table-column>
      <el-table-column label="最后登录时间" width="" prop="lastLoginTime">
      </el-table-column>
    </el-table>
    <!-- <div class="total" v-if="teamTotal_list">
      <el-row no-gutter>
        <el-col :span="24">
          <span>总计：{{ teamTotal_list.total_count }}</span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </el-col>
      </el-row>
    </div> -->
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
    <span slot="footer" class="dialog-footera">
      <el-button type="primary" @click="$emit('cloesDialog')">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    list:{
      type:Array,
      default:()=>[]
    },
    isShowDialog: {
      type: Boolean,
      default: () => true,
    },
    title:{
      type:String,
      default:()=>'注册人员详情'
    },
    page_count:{
      type:Number,
      default:()=>0
    },
    total_count:{
      type:Number,
      default:()=>0
    },
  },
  data() {
    return {
      show:true,
      currentPage: 1,
      page_size: 10,
      page_sizes: [10, 20, 30, 40, 50],
      teamTotal_Visable: true,
      teamTotal_list: [],
    };
  },


  methods: {
    // 分页
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.page_size = val;
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage = val;
    },

  },
};
</script>

<style lang="scss" scoped>
  .dialog-footera{
    display: flex;
    justify-content: center;
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
</style>