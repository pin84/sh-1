<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title">修改密码</div>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <el-radio-group
          style="margin-bottom: 20px"
          v-model="labelPosition"
          @change="changeGroup"
          size="small"
        >
          <el-radio-button label="loginPassword">修改登录密码</el-radio-button>
          <el-radio-button label="zjPassword">设置资金密码</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <!-- 设置资金密码 -->
    <el-row>
      <el-col :span="24">
        <el-form
          class="changepassword"
          v-if="labelPosition == 'zjPassword'"
          label-width="120px"
          ref="wthdrawpwd_info_set"
          :model="wthdrawpwd_info_set"
        >
          <div class="tips">
            资金密码由4-6位数字或字母，或数字和字母组成，在线取款时需要输入资金密码才能进行取款
          </div>
          <el-form-item
            label="资金密码"
            prop="newPwd"
            :rules="[
              { required: true, message: '新密码不能为空', trigger: 'blur' },
            ]"
            ><el-input
              placeholder=""
              type="password"
              v-model="wthdrawpwd_info_set.newPwd"
            ></el-input
          ></el-form-item>
          <el-form-item
            label="确认资金密码"
            prop="okPwd"
            :rules="[
              { required: true, message: '确认密码不能为空', trigger: 'blur' },
            ]"
            ><el-input
              placeholder=""
              type="password"
              v-model="wthdrawpwd_info_set.okPwd"
            ></el-input
          ></el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitwthdrawpwd_set('wthdrawpwd_info_set')"
              >设置</el-button
            >
            <el-button type="primary" @click="cancelPassword()">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 修改登录密码 -->
    <el-row>
      <el-col :span="24">
        <el-form
          class="changepassword"
          v-if="labelPosition == 'loginPassword'"
          label-width="120px"
          ref="pwd_info"
          :model="pwd_info"
        >
          <el-form-item
            label="原登录密码"
            prop="oldPwd"
            :rules="[
              {
                required: true,
                message: '原登录密码不能为空',
                trigger: 'blur',
              },
            ]"
            ><el-input
              placeholder=""
              type="password"
              v-model="pwd_info.oldPwd"
            ></el-input
          ></el-form-item>
          <el-form-item
            label="新登录密码"
            prop="newPwd"
            :rules="[
              { required: true, message: '新密码不能为空', trigger: 'blur' },
            ]"
            ><el-input
              placeholder="6-13个字符（数字和字母）"
              type="password"
              v-model="pwd_info.newPwd"
            ></el-input
          ></el-form-item>
          <el-form-item
            label="确认登录密码"
            prop="okPwd"
            :rules="[
              { required: true, message: '确认密码不能为空', trigger: 'blur' },
            ]"
            ><el-input
              placeholder=""
              type="password"
              v-model="pwd_info.okPwd"
            ></el-input
          ></el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitpPassword('pwd_info')"
              >提交</el-button
            >
            <el-button type="danger" @click="cancel_loginPassword()"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "zjPassword",
      wthdrawpwd_info_set: {
        newPwd: "",
        okPwd: "",
      },
      pwd_info: {
        oldPwd: "",
        newPwd: "",
        okPwd: "",
      },
    };
  },
  activated() {
    let { index } = this.$route.query;
    if (index != undefined && index != "" && index == 1) {
      this.labelPosition = "loginPassword";
    }
    if (index != undefined && index != "" && index == 2) {
      this.labelPosition = "zjPassword";
    }
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {

      let {fullPath} = from
      vm.fullPath = fullPath
      // 通过 `vm` 访问组件实例
    });
  },

  methods: {
    changeGroup(e) {
      if (e == "zjPassword") {
        // console.log(e);
      }
    },
    // 设定资金密码
    submitwthdrawpwd_set: function (e) {
      let _this = this;
      // 验证表单
      this.$refs[e].validate(function (res) {
        if (res) {
          if (
            _this.wthdrawpwd_info_set.newPwd != _this.wthdrawpwd_info_set.okPwd
          ) {
            return _this.$message.error("两次密码不一致");
          }
          _this.update_wthdrawpwd_set();
        }
      });
    },
    update_wthdrawpwd_set: function () {
      this.$post(
        "Pc.Member.updateWithdrawNewPwd",
        this.wthdrawpwd_info_set
      ).then((res) => {
        if (res.code == 1) {
          this.$message.success("资金密码设定成功");
          // this.$router.push("/user/withdraw/withdraw");
          this.$router.push(this.fullPath);
          return;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 重置资金密码
    cancelPassword() {
      this.wthdrawpwd_info_set.okPwd = "";
      this.wthdrawpwd_info_set.newPwd = "";
    },

    // 修改密码提交
    submitpPassword: function (e) {
      let _this = this;
      // 验证表单
      this.$refs[e].validate(function (res) {
        if (res) {
          if (_this.pwd_info.newPwd != _this.pwd_info.okPwd) {
            return _this.$message.error("两次密码不一致");
          }
          _this.update_login_pwd();
        }
      });
    },
    update_login_pwd: function () {
      this.$post("Pc.Member.updateLoginPwd", this.pwd_info).then((res) => {
        if (res.code == 1) {
          this.$message.success(res.message);

          let isNeedChangePassword = res.data.isNeedChangePassword;
          if (isNeedChangePassword != undefined && isNeedChangePassword == 2) {
            this.$alert("您需要重新设置资金密码才能正常使用", "重要提示", {
              confirmButtonText: "确定跳转修改",
              callback: (action) => {
                this.labelPosition = "zjPassword";
              },
            });
          } else {
            this.$router.push("/user/index");
          }

          //return;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    cancel_loginPassword() {
      this.pwd_info.oldPwd = "";
      this.pwd_info.newPwd = "";
      this.pwd_info.okPwd = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.changepassword {
  .tips {
    margin-bottom: 15px;
    color: #999;
    margin-left: 120px;
  }
  .el-input {
    width: 240px;
  }
}
</style>