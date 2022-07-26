<template>
  <div>
    <div class="user_content_blcok_title" style="position: relative">转账</div>
    <el-divider></el-divider>

    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="100px"
      size="small"
    >
      <el-form-item label="用户账号：">
        {{ username }}
      </el-form-item>
      <el-form-item label="您的余额：">
        {{ balance }}
      </el-form-item>
      <el-form-item label="充值类型：">
        <el-radio-group v-model="form.transType">
          <el-radio
            :label="val"
            v-for="(val, index) in rechargeType"
            :key="index"
          ></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="充值金额：" prop="amount">
        <!-- <el-input
          :style="{ width: width }"
          v-model.number="form.amount"
          autocomplete="off"
        ></el-input> -->
        <Input :max="999999999999" v-model="form.amount" />
      </el-form-item>
      <el-form-item label="取款密码：" prop="withdrawalPwd">
        <el-input
          :style="{ width: width }"
          v-model="form.withdrawalPwd"
          type="password"
        ></el-input>
      </el-form-item>

      <el-form-item label="备注：" prop="remark">
        <el-input
          :style="{ width: width }"
          rows="5"
          resize="none"
          type="textarea"
          v-model="form.remark"
        ></el-input>
        <span style="margin-left: 10px; color: red"
          >(最多只能输入200个字符)</span
        >
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="toBack">返回</el-button>
        <el-button type="primary" @click="onSubmit('form')"
          >下一步
          <span v-if="isTimeout">({{ isTimeout }})</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import Input from '@/views/games/components/input/Input_1.vue'
import Input from "@/views/games/components/input/MyNumberInput.vue";
export default {
  data() {
    var checkAmount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入转账金额"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 1) {
            callback(new Error("转账金额不能小于0"));
          } else if (value > this.balance) {
            callback(new Error("余额不足"));
          } else {
            callback();
          }
        }
      }, 500);
    };
    return {
      isTimeout: 0,
      width: "250px",
      balance: 0,
      username: "",
      rechargeType: [],
      accountID: this.$route.query.accountID,
      form: {
        transType: "",
        remark: "",
        amount: "",
        withdrawalPwd: "",
      },
      rules: {
        withdrawalPwd: [
          { required: true, message: "请输入转账密码", trigger: "blur" },
        ],
        remark: [
          {
            min: 0,
            max: 200,
            message: "最多只能输入200个字符",
            trigger: "change",
          },
        ],
      },
    };
  },

  components: {
    Input,
  },

  created() {
    this.initData();
  },
  mounted() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        // console.log("页面被挂起--",new Date());
      } else {
        setTimeout(() => {
          console.log("页面呼出-a-");
          this.initData();
        }, 1000);
      }
    });
  },

  methods: {
    toBack() {
      let { query } = this.$route;
      this.$router.push({
        path: "/user/user_list",
        query,
      });
    },
    onSubmit(formName) {
      if (this.isTimeout) return;
      this.isTimeout = 5;
      this.interval = setInterval(() => {
        this.isTimeout--;
        if (this.isTimeout <= 0) {
          clearInterval(this.interval);
        }
      }, 1000);

      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let flag = await this.$gutils.confirm({
            text: `确定转账【${this.form.amount}】元，给下级【${this.username}】吗？`,
            showCancelButton: true,
          });
          if (!flag) return;

          let d = Object.assign({}, this.form, {
            accountId: this.accountID,
          });
          let res = await this.$post("Pc.Recharge.leaderRecharge", d);

          await this.$gutils.confirm({
            text: res.message,
          });

          if (res.code >= 0) {
            this.toBack();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async initData() {
      let res = await this.$get("Pc.Agent.getTransferAccountInfo", {
        accountId: this.accountID,
      });

      let { username, rechargeType, balance, isSetCoinPwd } = res.data;
      this.balance = balance;
      this.username = username;
      this.rechargeType = Object.values(rechargeType);
      this.form.transType = this.rechargeType[0];

      if (isSetCoinPwd == 0) {
        await this.$gutils.confirm({
          text: "请先设定资金密码",
        });
        this.$router.push("/user/withdraw/changepassword");
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.user_transfer_account {
  border: 1px solid red;
}
</style>