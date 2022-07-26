<template>
  <div class="result_page">
    <div class="result_header width_center_1320">
		<el-select v-model="selectCaizhong" placeholder="请选择">
		    <el-option
		      v-for="item in caizhongOptions"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
	</div>
	<div class="content width_center_1320">
	</div>
  </div>
</template>

<script>
export default {
  components: {
  },
  props:{},
  data() {
    return {
		 caizhongOptions: [{
		          value: '选项1',
		          label: '黄金糕'
		        }, {
		          value: '选项2',
		          label: '双皮奶'
		        }, {
		          value: '选项3',
		          label: '蚵仔煎'
		        }, {
		          value: '选项4',
		          label: '龙须面'
		        }, {
		          value: '选项5',
		          label: '北京烤鸭'
		        },
				{
				  value: '选项2',
				  label: '双皮奶'
				}, {
				  value: '选项3',
				  label: '蚵仔煎'
				}, {
				  value: '选项4',
				  label: '龙须面'
				}, {
				  value: '选项5',
				  label: '北京烤鸭'
				},
				 {
				  value: '选项2',
				  label: '双皮奶'
				}, {
				  value: '选项3',
				  label: '蚵仔煎'
				}, {
				  value: '选项4',
				  label: '龙须面'
				}, {
				  value: '选项5',
				  label: '北京烤鸭'
				},
				 {
				  value: '选项2',
				  label: '双皮奶'
				}, {
				  value: '选项3',
				  label: '蚵仔煎'
				}, {
				  value: '选项4',
				  label: '龙须面'
				}, {
				  value: '选项5',
				  label: '北京烤鸭'
				}],
		        selectCaizhong: '',
      login_adv: "/images/bg-article.png",
      error_num: 0,
    };
  },
  watch: {},
  computed: {},
  methods: {
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
      //   if (this.error_num >= 5 && this.$isEmpty(this.info.code)) {
      //     return this.$message.error("请填写短信验证码");
      //   }
      this.$post("Pc.Login.login", this.info).then((res) => {
        if (res.data.code < 0) {
        //   localStorage.setItem("login_error_num", parseInt(this.error_num) + 1);
          return this.$message.error(res.data.message);
        } else {
          this.$message.success("登录成功");
          localStorage.setItem("token", res.data.token);
          //   localStorage.setItem("user_info", JSON.stringify(res.user_info));
          //   localStorage.removeItem("login_error_num");
          this.$router.push("/");
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
      console.log('a');
    },
    // 初始化加载数据
    load_logindata() {
      this.$get("Pc.HomePage.getData").then((res) => {
        this.init_data = res.data;
        this.canPcRegister = res.data.canPcRegister;
        this.notice = res.data.notice.items
      });
    },
  },
  created() {
    this.load_verifycode(); //加载图形验证码
    this.load_logindata(); //初始化页面数据
    // this.error_num = this.get_error_num(); // 获取登录失败次数;
    // this.get_oauth_config();
    // console.log(localStorage.getItem('user_info'));
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.result_page {
  width: 100%;
  margin: 0 auto;
  background: #2d2d2d;
}
.result_header{
	    height: 45px;
		    line-height: 45px;
}

</style>