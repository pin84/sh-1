<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      站内短信
    </div>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <el-radio-group v-model="labelPosition" size="small">
          <el-radio-button label="sjx">收件箱</el-radio-button>
          <el-radio-button label="fjx">发件箱</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>

    <div class="message-box">
      <h3>收件短信列表</h3>
      <el-button
        @click="deleteRow"
        style="margin: 10px"
        type="primary"
        size="mini"
        >删除</el-button
      >
      <el-table
        ref="messagetable_sjx"
        :data="messageList"
        style="width: 100%"
        empty-text="没有符合查询条件的数据！"
        :row-class-name="tableRowClassName"
        @row-click="clickTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          label="全选"
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column label="发件人" width="" prop="sender">
        </el-table-column>
        <el-table-column label="标题" width="" prop="title"> </el-table-column>
        <el-table-column label="日期" width="" prop="create_time">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            {{ props.row.content }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      style="margin-top: 15px"
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
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "sjx",
      messageList: [],
      total_count: 0,
      page_count: 0,
      currentPage: 1,
      page_size: 10,
      page_sizes: [10, 20, 30, 40, 50],
      multipleSelection: [],
      delarr: [], //存放删除的数据
    };
  },
  computed: {},
  watch: {
    messageList: {
      handler() {
        this.getMessageList;
      },
      deep: true,
      immediate: false,
    },
  },
  methods: {
    // 获取公告列表
    getMessageList() {
      this.$get("Pc.Message.getMessageList", {
        page: this.currentPage,
        page_size: this.page_size,
      }).then((res) => {
        if (res.code == 0) {
          this.messageList = res.data.list;
          this.total_count = res.data.total_count;
          this.page_count = res.data.page_count;
          // console.log(this.messageList);
        } else {
          return this.$message.error(res.message);
        }
      });
    },
    // 设置已读未读样式
    tableRowClassName(row) {
      if (row.row.isRead == 0) {
        return "notready";
      } else {
        return "ready";
      }
    },
    // 点击未读更新样式
    clickTable(row) {
      // 保证打开当前table详情
      let $table = this.$refs.messagetable_sjx;
      this.messageList.map((item) => {
        if (row.id != item.id) {
          $table.toggleRowExpansion(item, false);//修复不能关闭自己
6       }  
      });
      if (row.isRead === 0) {
        // 更新样式
        this.messageList.forEach((item) => {
          if (item.id == row.id) {
            item.isRead = 1;
          }
        });
        this.messageList = Object.assign([], this.messageList); //更新数据
        this.$post("Pc.Message.readMessage", {
          msgId: row.id,
        }).then((res) => {
          if (res.code == 1) {
            $table.toggleRowExpansion(row);
          } else {
            return this.$message.error(res.message);
          }
        });
      }else{
        $table.toggleRowExpansion(row);
      }
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection);
    },
    // 删除所选
    deleteRow() {
      const length = this.multipleSelection.length;
      for (let i = 0; i < length; i++) {
        this.delarr.push(this.multipleSelection[i].id);
      }
      if (length > 0) {
        this.$post("Pc.Message.deleteMessage", {
          msgId: this.delarr,
        }).then((res) => {
          if (res.code == 1) {
            this.getMessageList();
            return this.$message.success(res.message);
          } else {
            return this.$message.error(res.message);
          }
        });
      } else {
        this.$message.error("选择要删除的数据");
      }
    },
    // 分页
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.page_size = val;
      this.getMessageList();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getMessageList();
    },
  },
  created() {
    this.getMessageList();
  },
};
</script>

<style lang="scss">
.message-box {
  margin-top: 15px;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  h3 {
    line-height: 36px;
    background: #eee;
    font-size: 14px;
    padding-left: 10px;
    font-weight: normal;
  }
  .el-collapse-item__header {
    padding-left: 10px;
  }
  .el-collapse-item__content {
    padding: 0 10px;
  }
  .num {
    padding: 0 0 0 10px;
  }
  .ready td {
    font-weight: normal;
  }
  .notready td {
    font-weight: 700;
    color: #000;
  }
  .el-table__expand-icon {
    display: none;
  }
  .el-table__row.expanded{
    td{
      color: #ca151e;
    }
  }
}
</style>