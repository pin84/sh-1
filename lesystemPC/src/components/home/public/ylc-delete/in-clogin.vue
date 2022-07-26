<template>
	<div class="login_body">
		<el-form label-width="120px" :model="info" ref="info">
			<el-form-item label="用户名">
				<el-input type="text" placeholder="用户名" v-model="info.username"></el-input>
				<span class="rules">请输入用户名（3-15个英文、数字）</span>
			</el-form-item>
			<el-form-item label="密码">
				<el-input type="password" placeholder="输入密码" v-model="info.password"></el-input>
			</el-form-item>
			<el-form-item label="验证码">
				<el-input type="text" placeholder="输入验证码" v-model="info.validateCode">
					<img v-show="verifycode_img!=''" class="verifycode_img" slot="suffix" :src="'data:image/jpeg;base64,' + verifycode_img"
					 @click="load_verifycode" /></el-input>
			</el-form-item>
		</el-form>
		<div class="login_btn">
			<el-button size="large" @click="to_login" type="danger">立即登录</el-button>
		</div>
	</div>
</template>
<script>
	export default {
		props: {},
		data() {
			return {
				info: {
					username: "",
					password: "",
					validateCode: "",
					uuid: "",
				},
				verifycode_img: '',
				canPcRegister: false
			}
		},
		watch: {},
		computed: {},
		methods: {
			to_login: function() {
				if (
					this.$isEmpty(this.info.username) ||
					this.$isEmpty(this.info.password)
				) {
					return this.$message.error("账号密码不能为空");
				} else if (this.$isEmpty(this.info.validateCode)) {
					return this.$message.error("验证码不能为空");
				}
				this.$post("Pc.Login.login", this.info).then((res) => {
					if (res.data.code < 0) {
						this.load_verifycode();
						return this.$message.error(res.data.message);
					} else {
						this.$message.success("登录成功");
						localStorage.setItem("token", res.data.token);
						this.$emit('loginsuccess', res);
						//   localStorage.setItem("user_info", JSON.stringify(res.user_info));
						//   localStorage.removeItem("login_error_num");
						//this.$router.push("/");
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
			// 初始化加载数据
			load_logindata() {
				this.$get("Pc.HomePage.getData").then((res) => {
					//this.init_data = res.data;
					this.canPcRegister = res.data.canPcRegister;
					//this.notice = res.data.notice.items
				});
			}
			
		},
		created() {
			this.load_verifycode(); //加载图形验证码
		},
		mounted() {},
	};
</script>
<style lang="scss" scoped>
	.el-form {
		margin-left: 30px;

		.el-input {
			width: 200px;
			;
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
	.login_btn{text-align: center;}
</style>
