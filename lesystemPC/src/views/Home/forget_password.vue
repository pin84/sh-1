<template>
  <div class="shop_register">
   <div class="shop_top">
   	<template v-if="SiteConfig.theme == 'blue'">
   		<ShopHeader :isInLoginPage="true"> </ShopHeader>
   	</template>
   	<template v-if="SiteConfig.theme == 'ylc'">
   		<shop-top :subnav_show="false" :change_color="true" :isInLoginPage="true"></shop-top>
   	</template>
   </div>
    <div class="shop_login_bg" :style="'background:url(' + login_adv + ')'">
      <div class="shop_login_block width_center_1200 content">
        <div class="login_right">
          <div class="login_block" v-if="showStep == 1">
			  <div>重置密码</div>
            <div class="login_input">
              <div class="input_block">
                <input v-model="info.account" type="text" placeholder="账号" />
              </div>
              <div class="input_block">
                <input v-model="info.phone" type="text" placeholder="手机号" />
              </div>
            </div>
            <div class="login_btn" @click="checkPhone">下一步</div>
          </div>
          <div class="login_block" v-else>
            <!-- <div class="login_title">
              <ul>
                <li @click="$router.push('/user/register')">注册账号</li>
                <li>|</li>
                <li @click="$router.push('/user/login')">账号登录</li>
              </ul>
            </div> -->
            <div class="login_input">
              <!-- <div class="input_block">
                <input v-model="info.phone" type="text" placeholder="手机号" />
              </div> -->
              <div class="input_block">
                <input
                  v-model="info.password"
                  type="password"
                  placeholder="新密码"
                />
              </div>
              <div class="input_block">
                <input
                  v-model="info.password_comp"
                  type="password"
                  placeholder="确认密码"
                />
              </div>
              <div class="input_block">
                <input
                  v-model="info.code"
                  type="text"
                  class="yzm"
                  placeholder="短信验证码"
                /><input
                  class="send"
                  type="button"
                  @click="send_sms()"
                  :value="btnText"
                />
              </div>
            </div>
            <div class="login_btn" @click="to_register">修改密码</div>

            <div class="login_btn_b">
              <router-link to="/user/register">没有账号？</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
   <template v-if="SiteConfig.theme == 'blue'">
 	<blueShopFoot></blueShopFoot> 
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
      showStep: 1,
      btnText: "发送验证码",
      login_adv: "/images/2021/loginbg.jpg",
      info: {
        account: "" ,
        phone: "" ,
        password: "",
        record_id: 0,
        password_comp: ""  ,
        code: "",
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    async checkPhone() {
      let d = {
        account: this.info.account,
        mobile: this.info.phone,
      };
      let res = await this.$get("Pc.Member.checkMobile", d);
      let { code } = res;
      if (code == 0) {
        this.showStep = 2;
      }
      else{
		 this.$gutils.confirm({
		   text: res.message,
		 }); 
	  }
      

      //console.log(res);
    },
    // 发送短信
    async send_sms() {
      if (this.timeout) return;
      clearInterval(this.interval);
      if (this.$isEmpty(this.info.phone)) {
        return this.$message.error("请先填写手机号码");
      }
      let res = await this.$post("Pc.SendMsg.sendVeryCode", {
        phone: this.info.phone,
        is_type: 5,
      });
      let timeout = 60;
      this.interval = setInterval(() => {
        timeout--;
        this.btnText = `${timeout}秒后再发送`;
        if (timeout <= 0) {
          timeout = 0;
          this.btnText='发送验证码'
          clearInterval(this.interval);
        }
      }, 1000);

      this.timeout = timeout;
      if (res.code == 0) {
        let { record_id } = res.data;
        this.info.record_id = record_id;
      }
      this.$message.success(res.message);
    },
    async to_register() {
      if (
        this.$isEmpty(this.info.phone) ||
        this.$isEmpty(this.info.password) ||
        this.$isEmpty(this.info.password_comp) ||
        this.$isEmpty(this.info.code)
      ) {
        return this.$message.error("请先认真填写完整");
      }
      if (this.info.password != this.info.password_comp) {
        return this.$message.error("两次密码不相同");
      }
      let res = await this.$post("Pc.Login.resetPassword", this.info);
      if (res.code == 0) {
        this.$message.success(res.message);
        this.$router.push("/user/login");
      } else {
        this.$message.error(res.message);
      }
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>
<style lang="scss" scoped>
.content {
  // border: 1px solid red;
  display: flex;
  align-items: center;
  .login_right {
    // border: 1px solid red;
    margin: 0 auto;
  }
}
.login_left {
  // position: absolute;
  // top: 0;
  // left: ;
  width: 50%;
  box-sizing: border-box;
  height: 550px;
}
.login_right {
  // width: 50%;
  box-sizing: border-box;
  .login_block {
    width: 800px;
	margin: 40px auto;
	    opacity: 0.95;
	border-radius: 10px;
    background: #fff;
    height: 450px;
    // float: right;
    box-sizing: border-box;
    padding: 40px;
    // margin-top: 50px;
    .login_title {
      width: 217px;
      margin: 0 auto;
      ul:after {
        clear: both;
        display: block;
        content: "";
      }
      ul li {
        float: left;
        margin-right: 20px;
        font-size: 20px;
        color: #444;
      }
      ul li:hover {
        color: #ca151e;
      }
      ul li.colors {
        color: #ca151e;
      }
      ul li:last-child {
        margin-right: 0;
      }
    }
    .login_input {
      margin-top: 30px;
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
      color: #fff;
      background: #ca151e;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
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
  }
}
</style>