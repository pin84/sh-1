<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      银行卡管理
    </div>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <el-button size="small" type="primary" @click="$router.push({name: 'bank_manage_add',params: {banklist:bank_list_data}})">新增</el-button>
      </el-col>
    </el-row>
    <!-- 银行卡列表 -->
    <div class="search_content">
      <div class="result_content" v-if="bank_list_data.length > 0">
        <el-table
          :data="bank_list_data"
          border
          style="width: 100%"
          empty-text="没有符合查询条件的数据！"
        >
          <el-table-column label="开户名" width="" prop="card_owner">
          </el-table-column>
          <el-table-column label="开户行" width="" prop="bank_name">
          </el-table-column>
          <el-table-column label="卡号" width="" prop="account">
          </el-table-column>
          <el-table-column label="状态" width="">
               <template slot-scope="scope">
                 <span v-if="scope.row.enable==1">正常</span>
                 <span v-if="scope.row.enable==0">审核中</span>
              </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bank_list_data: [],
    };
  },
  methods: {
    // 初始化银行卡列表
    init_bank_list() {
      this.$get("Pc.Member.getMemberBankCardList").then((res) => {
        if (res.code == 0) {
          this.bank_list_data = res.data;
          console.log(this.bank_list_data)
        } else {
          return this.$message.error(res.message);
        }
      });
    },
  },
  mounted() {},
  // created() {
  //   this.init_bank_list();
  // },
  activated() {
  	this.init_bank_list();
  }
};
</script>

<style lang="scss" scoped>
.search_content {
  margin: 15px 0;
}
</style>