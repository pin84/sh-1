<template>
  <div class="usdt-addr">
    <el-button @click="toAddAddress" type="danger">新增</el-button>

    <el-table class="el-table" :data="tableData" style="width: 100%">
      <el-table-column prop="usdt_address" label="地址" width="180">
      </el-table-column>
      <el-table-column prop="usdt_protocol" label="主网协议" width="180">
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="180">
      </el-table-column>
      <el-table-column prop="statusCn" label="状态" width="180">
      </el-table-column>
      <el-table-column prop="add_time" label="绑定时间"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },

  created() {
    this.initData();
  },
  methods: {
    async initData() {
      let res = await this.$get(this.$gapi.getUserAddressList);
      let { data } = res;
      this.tableData = data;
      console.log(data);
    },

    toAddAddress() {
      this.$router.push({
        path: "/user/usdtAddr/AddAddress",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.usdt-addr {
  padding: 0 15px;
  .el-table {
    margin-top: 20px;
  }
}
</style>