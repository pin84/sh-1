Ï<template>
  <div class="shop_register">
	<div class="shop_top">
		<template v-if="SiteConfig.theme == 'blue'">
			<ShopHeader> </ShopHeader>
		</template>
		<template v-if="SiteConfig.theme == 'ylc'">
			<shop-top :subnav_show="false" :change_color="true"></shop-top>
		</template>
	</div>
    <div class="shop_login_bg">
      <div class="shop_login_block width_center_1200">
        <div class="login_block">
          <div class="login_title">
            <!-- <ul>
              <li class="colors">注册账号</li>
              <li>|</li>
              <li @click="$router.push('/user/login')">账号登录</li>
            </ul> -->
            <span class="colors">注册账号</span>
            <span @click="$router.push('/user/login')" class="">账号登录</span>
          </div>
          <div class="login_body">
            <div class="login_input">
              <!-- <div class="input_block"><input v-model="info.phone" type="text" placeholder="手机号"></div>
                            <div class="input_block"><input v-model="info.password" type="password" placeholder="密码"></div>
                            <div class="input_block"><input v-model="info.password_comp" type="password" placeholder="确认密码"></div>
                            <div class="input_block"><input v-model="info.code" type="text" class="yzm" placeholder="短信验证码"><input class="send" type="button" @click="send_sms()" value="发送验证码"></div> -->
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
                  <span class="rules"
                    ><el-button
                      @click="generateAccount"
                      size="small"
                      type="danger"
                      >点击生成账号</el-button
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
            <div class="login_btn">
              <el-button size="large" @click="to_register" :class="{error:btn1Disable,primary:!btn1Disable}" :disabled="btn1Disable">{{btn1Name}}</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="SiteConfig.theme == 'blue'">
    <!-- 	<blueShopFoot></blueShopFoot> -->
    	</template>
    	<template v-if="SiteConfig.theme == 'ylc'">
    		<shop-foot></shop-foot>
    	</template>
  </div>
</template>

<script>
import ShopTop from "@/components/home/public/head.vue";
	import ShopFoot from "@/components/home/public/shop_foot.vue";
	import ShopHeader from "@/views/NewHome/components/head.vue";
	import blueShopFoot from "@/views/NewHome/components/shop_foot.vue";
export default {
  components: {
    ShopTop,
    ShopFoot,
    ShopHeader,
    blueShopFoot
  },
  props: {},
  data() {
    return {
		btn1Disable: false,
		btn1CountDown: 3, //按钮提交倒计时
		btn1CountDownInterval: null,
		btn1Name: "立即注册",
      login_adv: "/images/lebg.png",
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
	  lockBtn() {
	      if (!this.btn1Disable) {
	        this.btn1Disable = true;
	        this.btn1Name = "立即注册(" + this.btn1CountDown-- + ")";
	        this.btn1CountDownInterval = setInterval(() => {
	          if (this.btn1CountDown < 1) {
	            this.unlockBtn();
	          } else {
	            this.btn1Disable = true;
	            this.btn1Name = "立即注册(" + this.btn1CountDown-- + ")";
	          }
	        }, 1000);
	      }
	  },
	  unlockBtn() {
	      this.btn1Disable = false;
	      this.btn1CountDown = 3;
	      this.btn1Name = "立即注册";
	      clearInterval(this.btn1CountDownInterval);
	      this.btn1CountDownInterval = null;
	  },
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
		this.lockBtn();
      if (
        this.$isEmpty(this.info.username) ||
        this.$isEmpty(this.info.password) ||
        this.$isEmpty(this.info.repassword)
        // this.$isEmpty(this.info.phone) ||
        // this.$isEmpty(this.info.code) ||
        // this.$isEmpty(this.info.wechat) ||
        // this.$isEmpty(this.info.realname) ||
        // this.$isEmpty(this.info.email) ||
        // this.$isEmpty(this.info.introducer) ||
        // this.$isEmpty(this.info.inviteCode) ||
        // this.$isEmpty(this.info.birthday) ||
        // this.$isEmpty(this.info.verifycode) ||
        // this.$isEmpty(this.info.fundPassword) ||
        // this.$isEmpty(this.info.refundPassword) ||
        // this.$isEmpty(this.info.qq)
      ) {
		  this.unlockBtn();
        return this.$message.error("请先认真填写完整");
      }
      //console.log(this.info);
      this.$post("Pc.Login.registeredMemberAdd", this.info).then((res) => {
        
        let code = res.code;

        if (code >= 0) {
          this.$message.success("注册成功");
          setTimeout(() => {
            this.$router.push("/user/login");
          }, 1000);
        } else {
		  this.unlockBtn();
          this.$message.error(res.message);
        }
        // if (res.code == 0) {
        //   this.$message.success(res.message);
        //   this.$router.push("/user/login");
        // } else {
        //   if (res.code < 0) return this.$message.error(res.message);
        // }
      });
    },

    // 获取注册项数据
    load_regist_List() {
      this.$get("Pc.MemberAdregister.accountRegistered").then((res) => {
        //console.log(res);
        
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
            return;
          } 
        }
		this.regist_List = local_regist_List;
		//console.log(this.regist_List);
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
    // 邀请人
    // if (!this.$isEmpty(this.$route.query.inviter_id)) {
    //   this.inviter_id = this.$route.query.inviter_id;
    // }
    //动态加载注册选项
    this.load_regist_List();
    // 生成图形验证码
    this.load_verifycode();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
	.shop_login_bg{background:url(/images/2021/zhloginbg.jpg)  repeat top center;min-height:90vh;}
	.primary{    background-color: #F43F3B;
	    color: #ffffff;}
.shop_login_block {
  box-sizing: border-box;
  padding: 30px;
  .login_block {
    width: 1000px;
	border-radius: 10px;
    background: #fff;
	opacity:0.8;
	filter:alpha(opacity=80); 
    margin: 0 auto;
    box-sizing: border-box;
    margin-top: 15px;
    border: 1px solid #eee;
    .login_title {
      border-radius:10px 10px 0px 0px;
      margin: 0 auto;
      height: 50px;
      background: #eee;
      line-height: 50px;
      padding: 0 25px;
      span {
        display: inline-block;
        margin-right: 20px;
        font-size: 16px;
        color: #999;
        cursor: pointer;
      }
      .colors {
        color: #ca151e;
      }
    }
    .login_body {
      padding: 40px;
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
      margin-left: 30px;
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
  }
}
</style>