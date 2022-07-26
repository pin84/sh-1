<template>
  <div class="shop_login">
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
        <!-- 走马灯 -->
        <!-- <div class="noticebox" v-if="notice">
          <el-tag size="medium" type="warning">
            <i
              class="
                iconfont
                icon-xiaoxitongzhitixinglingshenglingdang-xianxing
              "
            ></i>
            <marquee direction="left" scrollamount="5">
              <span v-for="item in notice" :key="item.index">{{
                item["notice"]
              }}</span>
            </marquee>
          </el-tag>
        </div> -->

        <div class="login_block">
          <div class="login_title">
            <div class="logoimg">
              <img src="./assets/zlogo.png" />
            </div>
          </div>
          <!-- <div class="login_input">
            <div class="input_block">
              <input type="text" @keyup.enter.native="to_login" v-model="info.phone" placeholder="手机号" />
            </div>
            <div class="input_block">
              <input type="password" @keyup.enter.native="to_login" v-model="info.password" placeholder="密码" />
            </div>
            <div class="input_block" v-show="error_num >= 5">
              <input v-model="info.code" @keyup.enter.native="to_login" type="text" class="yzm" placeholder="短信验证码" />
              <input @click="send_sms" class="send" type="button" value="发送验证码" />
            </div>
          </div>
           -->
          <div class="login_body">
            <el-form :model="info" ref="info">
              <el-form-item>
                <span class="left_ico"
                  ><img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiNGRkYiIG9wYWNpdHk9Ii40IiBjeD0iMjUiIGN5PSIyNSIgcj0iMjQiLz48cGF0aCBkPSJNMzcgMzIuNXMtNy4zLTIuNDY2LTguOTc3LTIuOTUzbC0uNDIxLTEuMTAyYzEuMjk0LTEuMTQ0IDIuMzItMi41MzQgMi44OTQtNC4zODMuNTE2LS42MTYgMS4wNDMtMS41MjMgMS4wNDMtMi42NzIgMC0uNDUtLjIzMy0uNjc0LS41MzktLjg5LS4wMTItMi4wNC0uNDIyLTMuNzY3LTEuMTcyLTQuOTgyQzI4LjgwNiAxMy44NjQgMjcuMTUgMTMgMjUgMTNjLTMuNzUzIDAtNiAyLjYyNy02IDcuNTAydi4wMDJzLS41ODYuMjM3LS41NC45OGE0LjU1NiA0LjU1NiAwIDAwMS4xODkgMi44MDZjLjY4NCAxLjkxOCAxLjgwOSAzLjM3IDIuODkgNC4xNTVsLS41NjIgMS4wNzhDMjAuMTQgMzAuMTA4IDEzIDMyLjUgMTMgMzIuNVYzN2gyNHYtNC41eiIgZmlsbD0iIzMxODFGRiIvPjwvZz48L3N2Zz4="
                /></span>
                <el-input
                  type="text"
                  placeholder="用户名"
                  v-model="info.username"
                  @blur="changeUserName"
                ></el-input>
                <!-- <span class="rules">请输入用户名（3-15个英文、数字）</span> -->
              </el-form-item>
              <el-form-item>
                <span class="left_ico"
                  ><img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiNGRkYiIG9wYWNpdHk9Ii40IiBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiLz48cGF0aCBkPSJNMjcuMzMzIDE4LjAwMlYyMWgtNi43MDlsLjA0NC0yLjk5OGMwLTEuNjU5LS4xNzctMy4wMDIgMS42NjUtMy4wMDJoMy4zMzRjMS44NDIgMCAxLjY2NiAxLjM0MyAxLjY2NiAzLjAwMnpNMjUuNjY3IDMxLjVoLTMuMzM0bDEuMTQ2LTMuMDk0Yy0uNjYtLjE5OS0xLjE0Ni0uNzQ0LTEuMTQ2LTEuNDA2IDAtLjgzLjc0Ni0xLjUgMS42NjctMS41czEuNjY3LjY3IDEuNjY3IDEuNWMwIC42NjItLjQ4NSAxLjIwNy0xLjE0NiAxLjQwNmwxLjE0NiAzLjA5NHptNS0xMC41di00LjVjMC0yLjQ4Ny0yLjIzOC00LjUtNS00LjVoLTMuMzM0Yy0yLjc2MiAwLTUgMi4wMTMtNSA0LjVWMjFDMTUuNjY3IDIxIDE0IDIyLjM0MyAxNCAyNHY5LjAwM0MxNCAzNC42NTcgMTUuNDk2IDM2IDE3LjMzNyAzNmgxMy4zMjhDMzIuNTA3IDM2IDM0IDM0LjY1NyAzNCAzMy4wMDNWMjRjMC0xLjY1Ny0xLjY2Ny0zLTMuMzMzLTN6IiBmaWxsPSIjMzE4MUZGIi8+PC9nPjwvc3ZnPg=="
                /></span>
                <el-input
                  type="password"
                  autocomplete="new-password"
                  placeholder="密码"
                  v-model="info.password"
                ></el-input>
              </el-form-item>

              <el-form-item  v-if="ifShowPhoneCode">
                <el-input
                  auto-complete="off"
                  placeholder="输入手机号"
                  v-model="info.phone"
                ></el-input>
              </el-form-item>
             <el-form-item
                class="verification-code"
                v-if="ifShowPhoneCode"
              >
               <span class="left_ico"
                  ><img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiNGRkYiIG9wYWNpdHk9Ii40IiBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiLz48cGF0aCBkPSJNMjcuMzMzIDE4LjAwMlYyMWgtNi43MDlsLjA0NC0yLjk5OGMwLTEuNjU5LS4xNzctMy4wMDIgMS42NjUtMy4wMDJoMy4zMzRjMS44NDIgMCAxLjY2NiAxLjM0MyAxLjY2NiAzLjAwMnpNMjUuNjY3IDMxLjVoLTMuMzM0bDEuMTQ2LTMuMDk0Yy0uNjYtLjE5OS0xLjE0Ni0uNzQ0LTEuMTQ2LTEuNDA2IDAtLjgzLjc0Ni0xLjUgMS42NjctMS41czEuNjY3LjY3IDEuNjY3IDEuNWMwIC42NjItLjQ4NSAxLjIwNy0xLjE0NiAxLjQwNmwxLjE0NiAzLjA5NHptNS0xMC41di00LjVjMC0yLjQ4Ny0yLjIzOC00LjUtNS00LjVoLTMuMzM0Yy0yLjc2MiAwLTUgMi4wMTMtNSA0LjVWMjFDMTUuNjY3IDIxIDE0IDIyLjM0MyAxNCAyNHY5LjAwM0MxNCAzNC42NTcgMTUuNDk2IDM2IDE3LjMzNyAzNmgxMy4zMjhDMzIuNTA3IDM2IDM0IDM0LjY1NyAzNCAzMy4wMDNWMjRjMC0xLjY1Ny0xLjY2Ny0zLTMuMzMzLTN6IiBmaWxsPSIjMzE4MUZGIi8+PC9nPjwvc3ZnPg=="
                /></span>
                <el-input placeholder="手机验证码" v-model="info.code">
                </el-input>
                <a href="javascript:;" class="get-code" @click="send_sms">{{getCodeText}}</a>
              </el-form-item>

              <el-form-item>
                <span class="left_ico"
                  ><img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGZpbGw9IiNGRkYiIG9wYWNpdHk9Ii40IiBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiLz48cGF0aCBkPSJNMjcuMzMzIDE4LjAwMlYyMWgtNi43MDlsLjA0NC0yLjk5OGMwLTEuNjU5LS4xNzctMy4wMDIgMS42NjUtMy4wMDJoMy4zMzRjMS44NDIgMCAxLjY2NiAxLjM0MyAxLjY2NiAzLjAwMnpNMjUuNjY3IDMxLjVoLTMuMzM0bDEuMTQ2LTMuMDk0Yy0uNjYtLjE5OS0xLjE0Ni0uNzQ0LTEuMTQ2LTEuNDA2IDAtLjgzLjc0Ni0xLjUgMS42NjctMS41czEuNjY3LjY3IDEuNjY3IDEuNWMwIC42NjItLjQ4NSAxLjIwNy0xLjE0NiAxLjQwNmwxLjE0NiAzLjA5NHptNS0xMC41di00LjVjMC0yLjQ4Ny0yLjIzOC00LjUtNS00LjVoLTMuMzM0Yy0yLjc2MiAwLTUgMi4wMTMtNSA0LjVWMjFDMTUuNjY3IDIxIDE0IDIyLjM0MyAxNCAyNHY5LjAwM0MxNCAzNC42NTcgMTUuNDk2IDM2IDE3LjMzNyAzNmgxMy4zMjhDMzIuNTA3IDM2IDM0IDM0LjY1NyAzNCAzMy4wMDNWMjRjMC0xLjY1Ny0xLjY2Ny0zLTMuMzMzLTN6IiBmaWxsPSIjMzE4MUZGIi8+PC9nPjwvc3ZnPg=="
                /></span>
                <el-input
                  type="text"
                  placeholder="输入验证码"
                  v-model="info.validateCode"
                >
                  <img
                    class="verifycode_img"
                    slot="suffix"
                    :src="'data:image/jpeg;base64,' + verifycode_img"
                    @click="load_verifycode"
                /></el-input>
               <div class="login_btn_b"> <router-link to="/user/forget_password">忘记密码？</router-link></div>
              </el-form-item>
            </el-form>
          
            <div class="login_btn">
              <el-button size="large" @click="to_login" type="danger"
                >立即登录</el-button
              >
            </div>

            <div class="login_btn_b">
              <a
                class="register"
                href="javascript:;"
                @click="$router.push('/user/register')"
                v-show="canPcRegister == 1"
                >注册新账号</a
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
            <!-- <el-divider>其他登录方式</el-divider>
            <div class="other_login">
              <ul>
                <li @click="wechat_login">
                  <i class="icon iconfont" style="color: #50b674">&#xe73b;</i>
                </li>
                <li>
                  <i class="icon iconfont" style="color: #06b4fd">&#xe60b;</i>
                </li>
              </ul>
            </div> -->
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
      timeout: 0,
      ifShowPhoneCode: false,
      getCodeText: "获取验证码",
      login_adv: "/images/bg-article.png",
      error_num: 0,
      info: {
        phone: "",
        record_id: "",
        code: "",
        username: "",
        password: "",
        validateCode: "",
        uuid: "",
      },
      goback: "",
      canPcRegister: "",
      verifycode_img: "",
      init_data: [],
      notice: "",
      oauth: {},
      login_radio: require("./assets/video-5ee073f56064761476034d2c34b88edc.mp4"),
      kefuUrl: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    async send_sms() {
      if (this.timeout) {
        return;
      }
      if (this.$isEmpty(this.info.phone)) {
        return this.$message.error("请先填写手机号码");
      }
      let res = await this.$post("Pc.SendMsg.sendVeryCode", {
        phone: this.info.phone,
      });

      if (res.code == 0) {
        this.$message.success(res.message);
        this.timeout = 60;
        let interval = setInterval(() => {
          this.timeout--;
          this.getCodeText = `${this.timeout} 秒后再发送`;
          this.info.record_id = res.data.record_id;

          if (!this.timeout || this.timeout < 0) {
            clearInterval(interval);
            this.timeout = 0;
          }
        }, 1000);
      }

      // .then((res) => {
      //   this.info.record_id = res.data.record_id;
      // });
    },

    async changeUserName() {
      let res = await this.$get("Pc.Login.checkUser", {
        username: this.info.username,
      });

      let { code } = res;
      if (code == -3333) {
        this.ifShowPhoneCode = true;
      } else {
        this.ifShowPhoneCode = false;
      }
      this.getCodeText = "获取验证码";
    },

    // 登录
    to_login: function () {
      //   this.error_num = this.get_error_num();
      if (
        this.$isEmpty(this.info.username) ||
        this.$isEmpty(this.info.password)
      ) {
        return this.$message.error("账号密码不能为空");
      } else if (this.$isEmpty(this.info.validateCode)) {
        return this.$message.error("验证码不能为空");
      }

      if (this.ifShowPhoneCode) {
        if (this.$isEmpty(this.info.phone)) {
          return this.$message.error("手机号不能为空");
        } else if (this.$isEmpty(this.info.code)) {
          return this.$message.error("手机验证码不能为空");
        }
      }
      if (this.error_num >= 5 && this.$isEmpty(this.info.code)) {
        return this.$message.error("请填写短信验证码");
      }

      console.log(this.info);

      this.$post("Pc.Login.login", this.info).then((res) => {
        if (res.code == -3333) {
          this.ifShowPhoneCode = true;
        } else {
          this.ifShowPhoneCode = false;
        }
        if (res.code < 0) {
          localStorage.removeItem("token");
		  localStorage.removeItem("chatRoomIndex");
          return this.$message.error(res.message);
        } else {
          this.$message.success("登录成功");
          localStorage.setItem("token", res.data.token);
          if (
            res.data.isNeedChangePassword != undefined &&
            res.data.isNeedChangePassword != "" &&
            res.data.isNeedChangePassword > 0
          ) {
            this.dealwithPasswordchangeNotice(res.data.isNeedChangePassword);
          } else if (this.goback != "") {
            let backurl = decodeURIComponent(this.goback);
            this.$router.push(backurl);
          } else {
            this.$router.push("/");
          }
        }
      });
    },
    // 获取本地存储登录失败次数
    get_error_num: function () {
      let error_num = localStorage.getItem("login_error_num");
      if (this.$isEmpty(error_num)) {
        error_num = 0;
      }
      return error_num;
    },
    wechat_login: function () {
      location.href =
        "https://open.weixin.qq.com/connect/qrconnect?appid=" +
        this.oauth.appid +
        "&redirect_uri=%2fuser%2fwechat_login&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect";
    },
    dealwithPasswordchangeNotice(isNeedChangePassword) {
      if (isNeedChangePassword == 1) {
        this.$alert("您需要重新设置登陆密码才能正常使用", "重要提示", {
          confirmButtonText: "确定跳转修改",
          callback: (action) => {
            this.$router.push("/user/withdraw/changepassword?index=1");
          },
        });
      } else if (isNeedChangePassword == 2) {
        this.$alert("您需要重新设置资金密码才能正常使用", "重要提示", {
          confirmButtonText: "确定跳转修改",
          callback: (action) => {
            this.$router.push("/user/withdraw/changepassword?index=2");
          },
        });
      } else if (isNeedChangePassword == 3) {
        this.$alert(
          "您需要同时修改设置登陆密码和资金密码才能正常使用",
          "重要提示",
          {
            confirmButtonText: "确定跳转修改",
            callback: (action) => {
              this.$router.push("/user/withdraw/changepassword?index=1");
            },
          }
        );
      }
    },
    // // 获取配置数据
    // get_oauth_config: function () {
    //   this.$get(this.$api.homeGetOauthConfig).then((res) => {
    //     this.oauth = res.data;
    //   });
    // },

    //生成图形验证码
    load_verifycode() {
      this.$get("Pc.Login.vcode").then((res) => {
        this.verifycode_img = res.data.img;
        this.info.uuid = res.data.uuid;
      });
    },
    // 初始化加载数据
    load_logindata() {
      this.$get("Pc.HomePage.getData").then((res) => {
        this.init_data = res.data;
        this.canPcRegister = res.data.canPcRegister;
        this.notice = res.data.notice.items;
      });
    },
    setupKefu: function () {
      let kefu = localStorage.getItem("kefu");
      this.kefuUrl = kefu;
    },
  },
  created() {
    this.goback = this.$route.query.goback;
    //console.log(this.goback);
    this.load_verifycode(); //加载图形验证码
    this.load_logindata(); //初始化页面数据
    this.setupKefu();
    // this.error_num = this.get_error_num(); // 获取登录失败次数;
    // this.get_oauth_config();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped >
.verification-code {
  .get-code {
    line-height: 40px;
    position: absolute;
    right: 18px;
    top: 0;
    color: #fff;
  }
}
.login_left {
  float: left;
  width: 50%;
  box-sizing: border-box;
  height: 550px;
}
.noticebox {
  width: 1000px;
  margin: 15px auto 0px;
  position: relative;
  marquee {
    width: 100%;
    height: 40px;
  }
  .iconfont {
    position: absolute;
    top: 1px;
    left: 10px;
    width: 25px;
    height: 20px;
    background: #fdf6ec;
    padding: 0 4px;
    z-index: 90;
  }
}
.login_block {
  width: 480px;
  box-sizing: border-box;
  margin: 0 auto;
  padding-top: calc(50vh - 200px);
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
      &.register{
        color: #4176fa;
      }
    }
    a:hover {
      color: #4176fa;
    }
  }
  .other_login {
    width: 82px;
    height: 50px;
    margin: 15px auto;
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
  .el-form {
    .rules {
      display: inline-block;
      margin-left: 30px;
      font-size: 12px;
      color: #efc068;
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
.shop_login {
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
