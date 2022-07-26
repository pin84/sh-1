Ï<template>
  <div class="shop_register">
    <video
      id="login_video"
      class="register_video"
      autoplay=""
      preload="preload"
      loop=""
    >
      <source :src="login_radio" type="video/mp4" />
    </video>
    <div class="shop_login_bg">
      <div class="shop_login_block">
        <div class="login_block">
          <div class="login_title">
            <div class="logoimg">
              <img src="./assets/zlogo.png" />
            </div>
            <!-- <ul>
              <li class="colors">注册账号</li>
              <li>|</li>
              <li @click="$router.push('/user/login')">账号登录</li>
            </ul> -->
            <!-- <span class="colors">注册账号</span>
            <span @click="$router.push('/user/login')" class="">账号登录</span> -->
          </div>
          <div class="login_body">
            <div class="login_input">
              <el-form
                :model="info"
                :rules="rules"
                ref="info"
                v-if="regist_List"
              >
                <!-- 静态注册项 -->
                <el-form-item prop="username">
                  <span class="left_ico"
                    ><img
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiNGRkYiIG9wYWNpdHk9Ii40IiBjeD0iMjUiIGN5PSIyNSIgcj0iMjQiLz48cGF0aCBkPSJNMzcgMzIuNXMtNy4zLTIuNDY2LTguOTc3LTIuOTUzbC0uNDIxLTEuMTAyYzEuMjk0LTEuMTQ0IDIuMzItMi41MzQgMi44OTQtNC4zODMuNTE2LS42MTYgMS4wNDMtMS41MjMgMS4wNDMtMi42NzIgMC0uNDUtLjIzMy0uNjc0LS41MzktLjg5LS4wMTItMi4wNC0uNDIyLTMuNzY3LTEuMTcyLTQuOTgyQzI4LjgwNiAxMy44NjQgMjcuMTUgMTMgMjUgMTNjLTMuNzUzIDAtNiAyLjYyNy02IDcuNTAydi4wMDJzLS41ODYuMjM3LS41NC45OGE0LjU1NiA0LjU1NiAwIDAwMS4xODkgMi44MDZjLjY4NCAxLjkxOCAxLjgwOSAzLjM3IDIuODkgNC4xNTVsLS41NjIgMS4wNzhDMjAuMTQgMzAuMTA4IDEzIDMyLjUgMTMgMzIuNVYzN2gyNHYtNC41eiIgZmlsbD0iIzMxODFGRiIvPjwvZz48L3N2Zz4="
                  /></span>
                  <el-input
                    type="text"
                    placeholder="用户名"
                    v-model="info.username"
                  ></el-input>
                  <a
                    class="get-username"
                    href="javascript:;"
                    @click="generateAccount"
                    >点击生成账号</a
                  >
                  <span class="rules"
                    >*账号规则：账号只能是数字和字母，长度为3-15位</span
                  >
                </el-form-item>
                <el-form-item prop="password">
                  <span class="left_ico"
                    ><img
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiNGRkYiIG9wYWNpdHk9Ii40IiBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiLz48cGF0aCBkPSJNMjcuMzMzIDE4LjAwMlYyMWgtNi43MDlsLjA0NC0yLjk5OGMwLTEuNjU5LS4xNzctMy4wMDIgMS42NjUtMy4wMDJoMy4zMzRjMS44NDIgMCAxLjY2NiAxLjM0MyAxLjY2NiAzLjAwMnpNMjUuNjY3IDMxLjVoLTMuMzM0bDEuMTQ2LTMuMDk0Yy0uNjYtLjE5OS0xLjE0Ni0uNzQ0LTEuMTQ2LTEuNDA2IDAtLjgzLjc0Ni0xLjUgMS42NjctMS41czEuNjY3LjY3IDEuNjY3IDEuNWMwIC42NjItLjQ4NSAxLjIwNy0xLjE0NiAxLjQwNmwxLjE0NiAzLjA5NHptNS0xMC41di00LjVjMC0yLjQ4Ny0yLjIzOC00LjUtNS00LjVoLTMuMzM0Yy0yLjc2MiAwLTUgMi4wMTMtNSA0LjVWMjFDMTUuNjY3IDIxIDE0IDIyLjM0MyAxNCAyNHY5LjAwM0MxNCAzNC42NTcgMTUuNDk2IDM2IDE3LjMzNyAzNmgxMy4zMjhDMzIuNTA3IDM2IDM0IDM0LjY1NyAzNCAzMy4wMDNWMjRjMC0xLjY1Ny0xLjY2Ny0zLTMuMzMzLTN6IiBmaWxsPSIjMzE4MUZGIi8+PC9nPjwvc3ZnPg=="
                  /></span>
                  <el-input
                    type="password"
                    placeholder="密码"
                    v-model="info.password"
                  ></el-input>
                  <span class="rules"
                    >*密码规则：密码长度要求6-13个字符、以及必须含有数字和字母组合</span
                  >
                </el-form-item>
                <el-form-item prop="repassword">
                  <span class="left_ico"
                    ><img
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiNGRkYiIG9wYWNpdHk9Ii40IiBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiLz48cGF0aCBkPSJNMjcuMzMzIDE4LjAwMlYyMWgtNi43MDlsLjA0NC0yLjk5OGMwLTEuNjU5LS4xNzctMy4wMDIgMS42NjUtMy4wMDJoMy4zMzRjMS44NDIgMCAxLjY2NiAxLjM0MyAxLjY2NiAzLjAwMnpNMjUuNjY3IDMxLjVoLTMuMzM0bDEuMTQ2LTMuMDk0Yy0uNjYtLjE5OS0xLjE0Ni0uNzQ0LTEuMTQ2LTEuNDA2IDAtLjgzLjc0Ni0xLjUgMS42NjctMS41czEuNjY3LjY3IDEuNjY3IDEuNWMwIC42NjItLjQ4NSAxLjIwNy0xLjE0NiAxLjQwNmwxLjE0NiAzLjA5NHptNS0xMC41di00LjVjMC0yLjQ4Ny0yLjIzOC00LjUtNS00LjVoLTMuMzM0Yy0yLjc2MiAwLTUgMi4wMTMtNSA0LjVWMjFDMTUuNjY3IDIxIDE0IDIyLjM0MyAxNCAyNHY5LjAwM0MxNCAzNC42NTcgMTUuNDk2IDM2IDE3LjMzNyAzNmgxMy4zMjhDMzIuNTA3IDM2IDM0IDM0LjY1NyAzNCAzMy4wMDNWMjRjMC0xLjY1Ny0xLjY2Ny0zLTMuMzMzLTN6IiBmaWxsPSIjMzE4MUZGIi8+PC9nPjwvc3ZnPg=="
                  /></span>
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
                    </el-input>
                    <a
                      class="get-code"
                      href="javascript:;"
                      @click="send_sms()"
                      :disabled="yzm_disabled"
                    >
                      <template v-if="yzm_isShow">获取验证码</template>
                      <template v-else>{{ yzm_outTime }}秒后重发</template>
                    </a>
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
              <el-button
                size="large"
                @click="to_register"
                :class="{ error: btn1Disable, primary: !btn1Disable }"
                :disabled="btn1Disable"
                >{{ btn1Name }}</el-button
              >
            </div>
            <div class="login_btn_b">
              <a
                class="register"
                href="javascript:;"
                @click="$router.push('/user/login')"
              >
                已有账号？请登录</a
              >
              <a href="javascript:;" @click="$router.push('/')">返回首页</a>
            </div>

            <div class="kefu">
              <a :href="kefuUrl" target="_blank"
                ><img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOSIgaGVpZ2h0PSIyOCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xNS4zNTQgMS40YzUuOTQzIDAgMTAuODU1IDQuNTg1IDExLjYzNSAxMC41MzRBMi43MDQgMi43MDQgMCAwMTI4IDE0LjA0NXYyLjcxYTIuNzEgMi43MSAwIDAxLTIuMzM4IDIuNjg0Yy0xLjYyNiAzLjA4Ni00LjUgNS4zNjItNy45MTggNi4wOTVhLjk1Ljk1IDAgMDEuMDA2LjEwOGMwIC41NzktLjQ4NSAxLjA0OC0xLjA4MyAxLjA0OEgxNC4wOWMtLjM4NyAwLS43NDUtLjItLjkzOS0uNTI0YTEuMDIgMS4wMiAwIDAxMC0xLjA0OCAxLjA5IDEuMDkgMCAwMS45MzktLjUyNGgyLjU3N2MuMjc0IDAgLjUyNC4wOTguNzE1LjI2IDMuMTYtLjYxNCA1Ljg1LTIuNjQgNy40MzUtNS40M2EyLjcxMiAyLjcxMiAwIDAxLTIuMjM2LTIuNjd2LTIuNzA5YTIuNzEgMi43MSAwIDAxMi43MS0yLjcxbC4wNzYuMDAzYy0uOTkyLTQuODQ4LTUuMTEzLTguNDY0LTEwLjAxMy04LjQ2NC01LjQwMiAwLTkuODU2IDQuMzk1LTEwLjIxNSA5Ljk5LjE3NC4zNTIuMjc0Ljc0OC4yOCAxLjE2NnYyLjc0Yy0uMDI0IDEuNDk1LTEuMjMgMi42OTUtMi43MSAyLjY5NS0xLjQ3OSAwLTIuNjg1LTEuMi0yLjcwOS0yLjY5NXYtMi43NGMuMDI0LTEuNDk1IDEuMjMtMi42OTUgMi43MS0yLjY5NS4zNzggMCAuNzQuMDggMS4wNjcuMjIxQzQuNzEgNS43OTIgOS41MzcgMS40IDE1LjM1NCAxLjR6bS0yLjYyOCA4LjE5NGMuNTY5IDAgMS4wOC41MiAxLjA4IDEuMjM2djMuMDU2YzAgLjY1LS40NTQgMS4yMzYtMS4wOCAxLjIzNi0uNjI2IDAtMS4wOC0uNTg1LTEuMDgtMS4yMzZWMTAuODNjMC0uNjUuNTExLTEuMjM2IDEuMDgtMS4yMzZ6bTUuMDY0LS4wNjVjLjU3IDAgMS4wODEuNTIgMS4wODEgMS4yMzZ2My4wNTZjMCAuNzE2LS41MTIgMS4yMzYtMS4wODEgMS4yMzYtLjU3IDAtMS4wODItLjUyLTEuMDgyLTEuMjM2di0zLjA1NmMwLS42NS41MTItMS4yMzYgMS4wODItMS4yMzZ6Ii8+PHBhdGggZD0iTTAgMGgyOHYyOEgweiIvPjwvZz48L3N2Zz4="
                />联系客服</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <shop-foot></shop-foot> -->
  </div>
</template>

<script>
// import ShopTop from "@/components/home/public/head.vue";
// import ShopFoot from "@/components/home/public/shop_foot.vue";
export default {
  components: {
    // ShopTop,
    // ShopFoot,
  },
  props: {},
  data() {
    return {
      login_radio: require("./assets/video-5ee073f56064761476034d2c34b88edc.mp4"),
      kefuUrl: "",
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
    setupKefu () {
      let kefu = localStorage.getItem("kefu");
      this.kefuUrl = kefu;
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
    // 验证码
    this.setupKefu()
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.primary {
  background-color: #f43f3b;
  color: #ffffff;
}
.shop_login_block {
  box-sizing: border-box;
  .login_block {
    width: 480px;
    margin: 0 auto;
    box-sizing: border-box;
    margin-top: 15px;
    .login_title {
      margin-bottom: 22px;
      .logoimg {
        width: 150px;
        margin: 0 auto;
        img {
          width: 100%;
        }
      }
    }
    .login_body {
      width: 300px;
      margin: 0 auto;
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
      width: 100%;
      button {
        width: 100%;
        border-radius: 20px;
        background-color: #4176fa;
        border: 0 none;
      }
    }
    .el-divider__text {
      color: #999;
    }
    .login_btn_b {
      font-size: 14px;
      color: #fff;
      line-height: 45px;
      display: flex;
      justify-content: space-between;
      a {
        color: #fff;
        &.register {
          color: #4176fa;
        }
      }
      a:hover {
        color: #4176fa;
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
      width: 100%;
    }
    .rules {
      display: inline-block;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
      width: 150%;
      position: absolute;
      left: 100%;
      line-height: 40px;
      top: 0;
      margin-left: 20px;
      .el-button {
        margin-right: 10px;
      }
    }
    .verifycode_img {
      display: block;
      height: 34px;
      border-radius: 8px;
      margin-top: 3px;
    }
  }
}
</style>
<style lang="scss">
.shop_register {
  .register_video {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -1;
  }
  .left_ico {
    display: inline-block;
    width: 25px;
    height: 25px;
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 10;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .el-input {
    height: 40px;
    line-height: 44px;
    width: 100%;
    display: flex;
    border-radius: 5px;
    border-radius: 20px;
    position: relative;
    box-shadow: inset 0 1px 15px 0 #fff;
    background-color: rgba(255, 255, 255, 0.5);
    align-items: center;
    flex-direction: row;
    box-sizing: border-box;
    input {
      width: 229px;
      height: 100%;
      line-height: 100%;
      border: none;
      outline: none;
      padding: 10px 25px 10px 0;
      border: 1px solid rgba(255, 255, 255, 0);
      background-color: rgba(255, 255, 255, 0);
      margin-left: 40px;
      font-size: 14px;
      color: #3e4a70;
      opacity: 0.9;
      font-family: DinProMedium !important;
      &:focus {
        border: 0 none;
      }
    }
  }
  .el-input__suffix {
    right: 18px;
  }

  .kefu {
    margin-top: 30px;
    text-align: center;
    a {
      color: #fff;
      font-size: 14px;
      img {
        display: inline-block;
        width: 30px;
        margin-right: 4px;
        vertical-align: middle;
      }
    }
  }
  .el-form-item {
    .el-form-item__content {
      position: relative;
      .get-username {
        line-height: 40px;
        position: absolute;
        right: 18px;
        top: 0;
        color: #ffffff;
      }
      .get-code {
        line-height: 40px;
        position: absolute;
        right: 18px;
        top: 0;
        color: #fff;
      }
    }
    &.is-error {
      .el-input {
        border: 1px solid #f56c6c;
        .el-input__inner {
          border: 0 none;
        }
      }
    }
  }
  .el-input__inner::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.9) !important;
  }
  .el-input__inner::-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: rgba(255, 255, 255, 0.9);
  }
  .el-input__inner::-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: rgba(255, 255, 255, 0.9);
  }
}
</style>