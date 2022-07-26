<template>
      <div class="shop_login_block">
        <div class="login_block">
          <div class="login_body">
             <div class="login_input">
            <el-form
              label-width="120px"
              :model="info"
              :rules="rules"
              ref="info"
              v-if="regist_List"
            >
              <!-- 静态注册项 -->
              <el-form-item label="用户名" prop="username">
                <el-input
                  type="text"
                  placeholder="用户名"
                  v-model="info.username"
                ></el-input> 
				<el-button style="margin-left: 5px;"  @click="generateAccount" size="small" type="danger">点击生成账号</el-button>
                <span class="rules"
                  >*账号规则：账号只能是数字和字母，长度为3-15位</span
                >
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  type="password"
                  placeholder="密码"
                  v-model="info.password"
                ></el-input>
                <span class="rules"
                  >*密码规则：密码长度要求6-13个字符、以及必须含有数字和字母组合</span
                >
              </el-form-item>
              <el-form-item label="确认密码" prop="repassword">
                <el-input
                  type="password"
                  placeholder="确认密码"
                  v-model="info.repassword"
                ></el-input>
                <span class="rules">*必填</span>
              </el-form-item>

              <!-- 动态注册项 -->

              <el-form-item
                v-for="item in regist_List"
                :key="item.index"
                :label="item.name_cn"
                :prop="item.name"
              >
                <template v-if="item.name == 'birthday'">
                  <el-date-picker
                    type="date"
                    :placeholder="item.placeholder"
                    value-format="yyyy-MM-dd"
                    v-model="info[item.name]"
                  ></el-date-picker>
                </template>
                <template v-else-if="item.name == 'fundPassword'">
                  <el-input
                    type="password"
                    :placeholder="item.placeholder"
                    v-model="info[item.name]"
                  >
                  </el-input>
                </template>
                <template v-else-if="item.name == 'qq'">
                  <el-input
                    type="text"
                    :placeholder="item.placeholder"
                    v-model.number="info[item.name]"
                  >
                  </el-input>
                </template>
                <template v-else-if="item.name == 'refundPassword'">
                  <el-input
                    type="password"
                    :placeholder="item.placeholder"
                    v-model="info[item.name]"
                  >
                  </el-input>
                </template>
                <template v-else-if="item.name == 'verifycode'">
                  <el-input
                    type="text"
                    :placeholder="item.placeholder"
                    v-model="info[item.name]"
                  >
                    <img
                      class="verifycode_img"
                      slot="suffix"
                      :src="'data:image/jpeg;base64,' + verifycode_img"
                      @click="load_verifycode"
                    />
                  </el-input>
                </template>
                <template v-else-if="item.name == 'code'">
                  <el-input
                    type="text"
                    :placeholder="item.placeholder"
                    v-model="info[item.name]"
                  >
                    <el-button
                      @click.native="send_sms()"
                      :disabled="yzm_disabled"
                      slot="append"
                    >
                      <template v-if="yzm_isShow">获取验证码</template>
                      <template v-else>{{ yzm_outTime }}秒后重发</template>
                    </el-button>
                  </el-input>
                </template>
                <template v-else>
                  <el-input
                    type="text"
                    :placeholder="item.placeholder"
                    v-model="info[item.name]"
                  ></el-input>
                </template>

                <span class="rules">{{ item.rule }}</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="login_btn" >
             <el-button size="large" @click="to_register" type="danger">马上注册</el-button>
          </div>
          </div>
        </div>
      </div>
</template>
<script>
	export default {
		props: {
			// caizhongleftbar_allways_show: {
			// 	type: Boolean,
			// 	default: false,
			// },
			// change_color: {
			// 	type: Boolean,
			// 	default: false,
			// },
			// cart_change: {
			// 	type: Number,
			// }
		},
		data() {
		    return {
		      info: {
		        //inviter_id: 0,
		        username: "",
		        phone: "",
		        password: "",
		        repassword: "",
		        qq: "",
		        wechat: "",
		        realname: "",
		        email: "",
		        introducer: "",
		        inviteCode: "",
		        birthday: "",
		        fundPassword: "",
		        refundPassword: "", // 确认资金验证码
		        verifycode: "", //图形验证码
		        uuid: "", //图形返回uuid
		        record_id: "", //手机带回record_id
		        code: "", //手机验证码
		      },
		      yzm_disabled: false, // 判断是否发送验证码
		      yzm_time: null, // 设置默认定时器为null
		      yzm_isShow: true, // 获取验证码禁用标识
		      yzm_outTime: 60, // 设置验证码倒计时时间
		      verifycode_img: "",
		      regist_List: [], //动态注册数据项
		      rules: {
		        username: [
		          { required: true, message: "请输入用户名", trigger: "blur" },
		          { min: 3, max: 15, message: "账号长度3-15个字符", trigger: "blur" },
		          { validator: this.validateUsername, trigger: "blur" },
		        ],
		        password: [
		          { required: true, validator: this.validatePass, trigger: "blur" },
		          {
		            min: 6,
		            max: 13,
		            message: "密码长度要求6-13个字符",
		            trigger: "blur",
		          },
		        ],
		        repassword: [
		          { required: true, validator: this.validatePass2, trigger: "blur" },
		        ],
		        fundPassword: [
		          { required: true, validator: this.validatezjPass, trigger: "blur" },
		          { min: 4, max: 6, message: "密码长度要求4-6个字符", trigger: "blur" },
		        ],
		        refundPassword: [
		          { required: true, validator: this.validatezjPass2, trigger: "blur" },
		        ],
		        qq: [
		          { required: true, message: "请输入QQ号", trigger: "blur" },
		          { type: "number", message: "只能是数字哦", trigger: "blur" },
		        ],
		        wechat: [
		          { required: true, message: "请输入微信号", trigger: "blur" },
		          { min: 6, max: 13, message: "长度要求6-13个字符", trigger: "blur" },
		          { validator: this.validateWechat, trigger: "blur" },
		        ],
		        realname: [
		          { required: true, message: "请输入真实姓名", trigger: "blur" },
		        ],
		        phone: [{ validator: this.validatePhone, trigger: "blur" }],
		        email: [{ validator: this.validateEmail, trigger: "blur" }],
		        birthday: [
		          {
		            type: "date",
		            required: true,
		            message: "请选择日期",
		            trigger: "change",
		          },
		        ],
		      },
		    };
		  },
		  watch: {},
		  computed: {},
		  methods: {
		    // 发送短信
		    send_sms: function () {
		      if (this.$isEmpty(this.info.phone)) {
		        return this.$message.error("请先填写手机号码");
		      }
		      if (this.yzm_disabled) {
		        return;
		      }
		      this.yzm_disabled = true; // 禁用发送验证码按钮
		      this.yzm_isShow = false; // 隐藏获取验证码字符串
		      if (!this.yzm_time) {
		        // 当定时器不为null时
		        this.yzm_time = setInterval(() => {
		          this.yzm_outTime = this.yzm_outTime - 1; // 没过一秒数字减一
		          if (this.yzm_outTime < 0) {
		            // 倒计时结束清除定时器
		            clearInterval(this.yzm_time);
		            this.yzm_isShow = true; // 显示获取验证码字符串
		            this.yzm_outTime = 60;
		            this.yzm_time = null;
		            this.yzm_disabled = false; //将按钮设置为可用状态
		          }
		        }, 1000); // 每秒执行一次
		      }
		      this.$post("Pc.SendMsg.sendVeryCode", {
		        phone: this.info.phone,
		      }).then((res) => {
		        this.info.record_id = res.data.record_id;
		        // console.log(this.info.record_id);
		      });
		    },
		    //注册
		    to_register: function () {
		      if (
		        this.$isEmpty(this.info.username) || 
		        this.$isEmpty(this.info.password) ||
		        this.$isEmpty(this.info.repassword) 
		        ) {
		        return this.$message.error("请先认真填写完整");
		      }
		      this.$post("Pc.Login.registeredMemberAdd", this.info).then((res) => {
		        if (res.code >= 0) {
		          this.$message.success(res.message);
		          this.$router.push("/user/login");
		        } else {
		          if(res.code < 0)
		          return this.$message.error(res.message);
		        }
		      });
		    },
		
		    // 获取注册项数据
		    load_regist_List() {
		      this.$get("Pc.MemberAdregister.accountRegistered").then((res) => {
		        var local_regist_List = [];
		        local_regist_List = res.data.list;
		        //排序
		        var objectArraySort = function (keyName) {
		          return function (objectN, objectM) {
		            var valueN = objectN[keyName];
		            var valueM = objectM[keyName];
		            if (valueN > valueM) return 1;
		            else if (valueN < valueM) return -1;
		            else return 0;
		          };
		        };
		        local_regist_List.sort(objectArraySort("sort"));
		        var refundPassword = {
		          name: "refundPassword",
		          name_cn: "确认资金密码",
		          needed: 1,
		          placeholder: "确认资金密码",
		          rule: "*密码规则：4-6个数字和字母",
		          sort: "",
		          value: "",
		        };
		        for (var i = 0; i < local_regist_List.length; i++) {
		          if (local_regist_List[i].name == "fundPassword") {
		            local_regist_List.splice(i + 1, 0, refundPassword);
		            this.regist_List = local_regist_List;
		            // console.log(this.regist_List);
		            return;
		          } else {
		            return;
		          }
		        }
		      });
		    },
		    //生成图形验证码
		    load_verifycode() {
		      this.$get("Pc.Login.vcode").then((res) => {
		        this.verifycode_img = res.data.img;
		        this.info.uuid = res.data.uuid;
		      });
		    },
		    // 生成账号
		    generateAccount() {
		      this.$get("Pc.MemberAdregister.getAutoAccount").then((res) => {
		        let regist_Account = res.data;
		        this.info.username = regist_Account;
		      });
		    },
		    // 表单验证
		    // 验证密码
		    validatePass(rule, value, callback) {
		      // 是否包含数字
		      const regNumber = /(?=.*[\d])/;
		      // 是否包含一位字母
		      const regLetter = /(?=.*[a-zA-Z])/;
		      if (value === "") {
		        callback(new Error("请输入密码"));
		      } else {
		        if (!regNumber.test(value) || !regLetter.test(value)) {
		          callback(new Error("密码必须含有数字和字母组合"));
		        } else if (this.info.repassword !== "") {
		          this.$refs.info.validateField("repassword");
		        }
		        callback();
		      }
		    },
		    validatePass2(rule, value, callback) {
		      if (value === "") {
		        callback(new Error("请再次输入密码"));
		      } else if (value !== this.info.password) {
		        callback(new Error("两次输入密码不一致!"));
		      } else {
		        callback();
		      }
		    },
		    //验证资金密码
		    validatezjPass(rule, value, callback) {
		      // 是否包含数字
		      const regNumber = /(?=.*[\d])/;
		      // 是否包含一位字母
		      const regLetter = /(?=.*[a-zA-Z])/;
		      if (value === "") {
		        callback(new Error("请输入密码"));
		      } else {
		        if (!regNumber.test(value) || !regLetter.test(value)) {
		          callback(new Error("以及必须含有数字和字母组合"));
		        } else if (this.info.refundPassword !== "") {
		          this.$refs.info.validateField("refundPassword");
		        }
		        callback();
		      }
		    },
		    validatezjPass2(rule, value, callback) {
		      if (value === "") {
		        callback(new Error("请再次输入密码"));
		      } else if (value !== this.info.fundPassword) {
		        callback(new Error("两次输入密码不一致!"));
		      } else {
		        callback();
		      }
		    },
		    // 验证微信
		    validateWechat(rule, value, callback) {
		      // 是否包含数字
		      const regNumber = /(?=.*[\d])/;
		      // 是否包含一位字母
		      const regLetter = /(?=.*[a-zA-Z])/;
		      if (!regNumber.test(value) && !regLetter.test(value)) {
		        callback(new Error("必须由字母或数字组成"));
		      } else {
		        callback();
		      }
		    },
		    // 验证用户名
		    validateUsername(rule, value, callback) {
		      // 是否包含数字
		      const regNumber = /(?=.*[\d])/;
		      // 是否包含一位字母
		      const regLetter = /(?=.*[a-zA-Z])/;
		      if (!regNumber.test(value) || !regLetter.test(value)) {
		        callback(new Error("必须由字母和数字组成"));
		      } else {
		        callback();
		      }
		    },
		    // 验证手机号
		    validatePhone(rule, value, callback) {
		      if (value === "") {
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
		  },
		  created() {
		    //动态加载注册选项
		    this.load_regist_List();
		    // 生成图形验证码
		    this.load_verifycode();
		  },
		  mounted() {},
		};
</script>
<style lang="scss" scoped>
	.shop_login_block{
		height: 420px; overflow: auto;
	}
	  .login_input {
	    .input_block {
	      margin: 15px auto;
	      width: 320px;
	      input {
	        height: 35px;
	        width: 320px;
	        border: 1px solid #e1e1e1;
	        outline: none;
	        padding: 0 10px;
	        box-sizing: border-box;
	      }
	      input.yzm {
	        width: 160px;
	        float: left;
	      }
	      input.send {
	        background: #333;
	        color: #fff;
	        width: 140px;
	        margin-left: 20px;
	        border: none;
	      }
	    }
	  }
	  .login_btn {
	    margin-left: 120px;
	    a {
	      color: #fff;
	    }
	  }
	  .el-divider__text {
	    color: #999;
	  }
	  .login_btn_b {
	    text-align: right;
	    font-size: 12px;
	    color: #666;
	    line-height: 45px;
	    a {
	      color: #666;
	    }
	    a:hover {
	      color: #ca151e;
	    }
	  }
	  .other_login {
	    width: 82px;
	    margin: 0 auto;
	    ul li {
	      float: left;
	      margin-right: 20px;
	      i {
	        font-size: 28px;
	      }
	    }
	    ul li:last-child {
	      margin-right: 0;
	    }
	  }
	  .el-input {
	    width: 40%;
	  }
	  .rules {
	    display: inline-block;
	    margin-top: 4px;
	    font-size: 12px;
	    color: #efc068;
	    .el-button {
	      margin-right: 10px;
	    }
	  }
	  .verifycode_img {
	    display: block;
	    height: 26px;
	    margin-top: 3px;
	  }
	
</style>
