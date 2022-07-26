<template>
  <div class="shop_login">
<!--    <div class="shop_top">
      <shop-top
        :subnav_show="false"
        :change_color="true"
        :isInLoginPage="true"
      ></shop-top> -->
	  
	  <div class="shop_top">
	  	<template v-if="SiteConfig.theme == 'blue'">
	  		<ShopHeader :isInLoginPage="true"> </ShopHeader>
	  	</template>
	  	<template v-if="SiteConfig.theme == 'ylc'">
	  		<shop-top :subnav_show="false" :change_color="true" :isInLoginPage="true"></shop-top>
	  	</template>
	  </div>
	  
    <div class="shop_login_bg">
      <div class="shop_login_block width_center_1200">
        <!-- 走马灯 -->
        <div class="noticebox" v-if="notice">
          <el-tag size="medium" type="warning" style="width: 100%;padding: 0 20px 0px 5px;">
            <i
              class="iconfont icon-gonggao"
            ></i>
            <marquee direction="left" scrollamount="5">
              <span v-for="item in notice" :key="item.index">{{
                item["notice"]
              }}</span>
            </marquee>
          </el-tag>
        </div>

        <div class="login_block">
          <div class="login_title">
            <span class="colors">帐号登录</span>
            <span class="rightspan" v-show="canPcRegister == 1"
              >没有账号？<router-link to="/user/register"
                >立即注册</router-link
              ></span
            >
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
            <el-form label-width="120px" :model="info" ref="info">
              <el-form-item label="用户名">
                <el-input
                  type="text"
                  placeholder="用户名"
                  v-model="info.username"
                  @blur="changeUserName"
                ></el-input>
                <span class="rules">请输入用户名（3-15个英文、数字）</span>
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                  type="password"
                  autocomplete="new-password"
                  placeholder="输入密码"
                  v-model="info.password"
                ></el-input>
              </el-form-item>

              <el-form-item v-if="ifShowPhoneCode" label="手机号">
                <el-input
                  auto-complete="off"
                  placeholder="输入手机号"
                  v-model="info.phone"
                ></el-input>
              </el-form-item>
              <el-form-item
                v-if="ifShowPhoneCode"
                class="verification-code"
                label="手机号码验证"
              >
                <el-input placeholder="手机验证码" v-model="info.code">
                </el-input>
                <el-button class="get-code" plain @click="send_sms">{{
                  getCodeText
                }}</el-button>
              </el-form-item>

              <el-form-item label="验证码">
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
              </el-form-item>
            </el-form>
			<div style="margin-left: 200px; margin-bottom: 20px;">
				<el-switch
				  v-model="info.remember" active-value="1" inactive-value="0"
				  active-text="记住密码">
				</el-switch>
			</div>
			
            <div class="login_btn">
              <el-button size="large" @click="to_login" type="danger"
                >立即登录</el-button
              >
              <el-button
                @click="$router.push('/user/register')"
                v-show="canPcRegister == 1"
                size="large"
                type="danger"
                >免费开户</el-button
              >
            </div>
            <div class="login_btn_b">
              <!-- <router-link >在线客服</router-link> -->
              <router-link to="/user/forget_password">忘记密码？</router-link>
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
      timeout: 0,
      ifShowPhoneCode: false,
      getCodeText: "获取验证码",
      login_adv: "/images/bg-article.png",
      error_num: 0,
      info: {
		remember:0,
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

      this.$post("Pc.Login.login", this.info).then((res) => {
        if (res.code == -3333) {
          this.ifShowPhoneCode = true;
        } else {
          this.ifShowPhoneCode = false;
        }
        if (res.code < 0) {
          localStorage.removeItem("token");
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
  },
  created() {
    this.goback = this.$route.query.goback;
    //console.log(this.goback);
    this.load_verifycode(); //加载图形验证码
    this.load_logindata(); //初始化页面数据
    // this.error_num = this.get_error_num(); // 获取登录失败次数;
    // this.get_oauth_config();
  },
  mounted() {},
};
</script>
<style>
	.el-tag.el-tag--warning{line-height: 40px;height: 40px;margin-bottom: 10px;}
	
</style>
<style lang="scss" scoped>
	.shop_login_bg{background:url(/images/2021/zhloginbg.jpg)  repeat top center;min-height:90vh;}
	.shop_login_block {
	  box-sizing: border-box;
	  padding: 30px;}
.verification-code {
  position: relative;
  .get-code {
    right: 0;
    transform: translate(-80px);
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
	line-height: 40px;
	font-size: 14px;
  }
  .iconfont {
    display: block;
        float: left;
  }
}
.login_block {
  width: 1000px;
  border-radius: 10px;
  background: #fff;
      opacity:0.8;
      filter:alpha(opacity=80); /* 针对 IE8 以及更早的版本 */
  box-sizing: border-box;
  margin: 0 auto;
  border: 1px solid #eee;
  .login_title {
    border-radius:10px 10px 0px 0px;
    margin: 0 auto;
    height: 50px;
    background: #eee;
    line-height: 50px;
    padding: 0 25px;
    position: relative;
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
    .rightspan {
      font-size: 12px;
      position: absolute;
      right: 0;
      top: 0px;
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
    margin-left: 200px;
  }
  .el-divider__text {
    color: #999;
  }
  .login_btn_b {
    font-size: 12px;
    color: #666;
    line-height: 45px;
    margin-left: 200px;
    a {
      color: #666;
    }
    a:hover {
      color: #ca151e;
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
    margin-left: 80px;
    .el-input {
      width: 40%;
    }
    .rules {
      display: inline-block;
      margin-left: 30px;
      font-size: 12px;
      color: #efc068;
    }
    .verifycode_img {
      display: block;
      height: 26px;
      margin-top: 3px;
    }
  }
}
</style>