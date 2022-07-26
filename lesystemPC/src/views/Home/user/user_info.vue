<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      用户资料
    </div>
    <el-divider></el-divider>
    <div class="admin_form_main">
      <el-form label-width="100px" ref="info" :model="info" :rules="rules">
        <el-form-item
          label="用户昵称"
          ><el-input :disabled="is_edit" placeholder="请输入内容" v-model="info.nickname"></el-input
        ></el-form-item>

        <el-form-item label="用户手机" prop="phoneno"
          ><el-input  :disabled="is_edit" placeholder="请输入内容" v-model="info.phoneno"></el-input
        ></el-form-item>

        <el-form-item label="真实姓名" prop="name"
          ><el-input  :disabled="is_edit" placeholder="请输入内容" v-model="info.name"></el-input
        ></el-form-item>

        <el-form-item label="生日日期" prop="birthday"
          ><template>
                  <el-date-picker
                   :disabled="is_edit"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    v-model="info.birthday"
                  ></el-date-picker>
                </template>
          </el-form-item>

        <el-form-item label="用户邮箱" prop="email"
          ><el-input  :disabled="is_edit" placeholder="请输入内容" v-model="info.email"></el-input
        ></el-form-item>

        <el-form-item label="用户QQ" prop="qq"
          ><el-input  :disabled="is_edit" placeholder="请输入内容"  v-model.number="info.qq"></el-input
        ></el-form-item>

        <el-form-item label="用户微信" prop="wechat"
          ><el-input  :disabled="is_edit"  placeholder="请输入内容" v-model="info.wechat"></el-input
        ></el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm('info')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- dialog -->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>绑定成功，2秒后自动刷新页面！</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      info: {
        nickname: "",
        phoneno:'',
        name:'',
        birthday:'',
        email:'',
        qq:'',
        wechat:'',
        canchangeprofile:''
      },
      info_list:[],//原始数据
      diffData: '',	// 差异
      dialogVisible:false,
      rules: {
           qq: [
          { message: "请输入QQ号", trigger: "blur" },
          { type: "number", message: "只能是数字哦", trigger: "blur" },
            ],
           phoneno: [{ validator: this.validatePhone, trigger: "blur" }],
           email: [{ validator: this.validateEmail, trigger: "blur" }],

      },
      is_edit:false,
      upload_headers: {},
    };
  },
  watch: {},
  computed: {},
  methods: {
    submitForm() {
        this.edit_user_info();
    },
    handleAvatarSuccess(res) {
      this.info.avatar = res.data;
      this.$forceUpdate();
      
    },
    // 获取用户信息
    get_user_info: function () {
      this.$get("Pc.Member.getMemberEditableInfo").then((res) => {
        if (res.code == 0) {
          this.info = res.data;
          this.info_list= { ...res.data }
           console.log(this.info_list)
          //判断能否编辑
          if(this.info.canchangeprofile==0){
              this.is_edit=true
          }else{
                this.is_edit=false
          }
        } else {
          return this.$message.error(res.message);
        }
      });
    },
    //比较有没有修改
    diffFormData () {
      for (let k in this.info_list) {
        if (this.info_list[k] !== this.info[k]) {
          if (!this.diffData) {
            this.diffData = {}
          }
          this.diffData[k] = this.info[k]
        }
      }
    },
    //提交数据
    edit_user_info: function () {
      this.diffFormData()
      if(!this.diffData){
        this.$message.error('没有修改，无需提交！');
      }else{
          this.$post('Pc.Member.editMyAccount', this.diffData).then((res) => {
        if (res.code == 1) {
            this.$message.success("修改成功");
            this.dialogVisible=true //打开弹窗
            this.get_user_info();//刷新数据
            this.diffData=''//清空修改内容
        }else{
            return this.$message.error(res.message);
        }
      });
      }
      
    },
     // 验证手机号
    validatePhone(rule, value, callback) {
      if (!value) {
        callback(new Error("请输入手机号"));
      } else {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }
    },
     // 验证郵箱
    validateEmail(rule, value, callback) {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      if (mailReg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的邮箱格式"));
      }
    },
    handleClose(done) {
        done();
     },
  },
  created() {
    this.get_user_info();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.admin_form_main {
  width: 40%;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
}
</style>