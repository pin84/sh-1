<template>
	<div class="shop_head">
		<head-top :isLogin="isLogin"></head-top>
		<!---top结束-->
		<div style="clear: both"></div>
		<div class="header width_center_1320">
			<div class="left">
				<a href="/"><img src="/images/zlogo.png" /></a>
			</div>
			<div class="right">
				<div v-if="!isLogin">
					<form>
						<ul>
							<li>
								<div class="username">
									<span></span>
									<input type="input" v-model="userInfo.username" />
								</div>
							</li>
							<li>
								<div class="password">
									<span></span><input type="password" v-model="userInfo.password" />
								</div>
							</li>
							<li>
								<div class="yzm">
									<input placeholder="验证码" type="text" v-model="userInfo.validateCode" /><img
										class="verifycode_img" slot="suffix"
										:src="'data:image/jpeg;base64,' + verifycodeImg"
										@click="head_load_verifycode" />
								</div>
							</li>
							<li>
								<div class="login">
									<input type="button" value="登录" @click="headToLogin" />
								</div>
								<div class="regist">
									<input type="button" value="免费开户" @click="headToLogin" />
								</div>
							</li>
						</ul>
					</form>
				</div>
				<div v-else>
					<div class="preson-info" v-show="memberInfo">
						<span class="acc-person">
							<strong class="account_hidden">您好，</strong><label class="value account_name">
								{{ memberInfo.username }}
								<a href="/UserCenter/VipCenter" style="
                    float: none;
                    display: none;
                    width: 25px;
                    height: 20px;
                    background: url() no-repeat;
                    vertical-align: middle;
                    background-size: 100%;
                    margin: 0 5px;
                  "></a>
							</label>
						</span>
						<span class="acc-balance">
							<strong>余额:</strong><label id="Balance" style="color: #e4393c">{{
                memberInfo.coin
              }}</label><i class="refresh"></i>
						</span>
						<div class="info">
							<router-link to="/user/index">用户中心</router-link>
							|<router-link to="/user/recharge/recharge">充值</router-link>
							|<router-link to="/user/withdraw/withdraw">提现</router-link>
							|<router-link to="/user/report/report_bills">交易记录</router-link>
							|<router-link to="/user/message/instation_notice">个人消息</router-link>
							|<span class="btn-login-out" @click="logout">退出</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div style="clear: both"></div>
		<!--header结束---->
		<div class="nav">
			<div class="navBox width_center_1320">
				<div class="navBoxLeft width_280" @mouseover="caizhongleftbarshow = true"
					@mouseleave="caizhongleftbarshow = false">
					选择彩种

					<div class="caizhongleftbar width_280" v-show="caizhongleftbar_allways_show || caizhongleftbarshow">
						<transition>
							<ul>
								<li>
									<router-link to="/games?id=145"><img src="/images/mangk3.png" />曼谷快三</router-link>
									<span>中奖率高 快捷</span>
								</li>
								<li>
									<router-link to="/games?id=150"><img src="/images/jisusaiche.png" />QQ飞车
									</router-link><span>高频游戏 中奖率高</span>
								</li>
								<li>
									<router-link to="/games?id=134"><img src="/images/cz-speed5.png" />百度分分彩
									</router-link><span>60秒 高中奖率</span>
								</li>
								<li>
									<router-link to="/games?id=136"><img src="/images/wx15fc.png" />微信1.5分彩
									</router-link><span>90秒 高中奖率</span>
								</li>
								<li>
									<router-link to="/games?id=162"><img src="/images/djpk10.png" />东京PK10</router-link>
									<span>三分彩 多种玩法</span>
								</li>
								<li>
									<router-link to="#"><img src="/images/lhc.png" />体育彩票</router-link><span>中奖率高
										快捷</span>
								</li>
							</ul>
						</transition>
						<div class="more"><a href="#">更多彩票</a></div>
					</div>
				</div>
				<div class="navBoxRight">
					<ul class="navUl">
						<li>
							<router-link to="/">首页</router-link>
						</li>
						<li class="first" @mouseover="subnav = true" @mouseleave="subnav = false">
							<a href="#"><em class="iconfont icon-xuan-wu"></em><em> 购彩大厅</em></a>
							<transition>
								<div class="second" v-show="subnav">
									<div class="creditPlay menu-child">
										<h1>信用玩法</h1>
										<div class="color">信</div>
										<div class="menu-child-content">
											<ul>
												<li v-for="(v, k) in xinyong_game_list" :key="k">
													<router-link :to="v.urlLink">
														<img :src="v.picUrl" width="60" height="60" />
														<span>{{ v.showName }} </span>
													</router-link>
												</li>
											</ul>
										</div>
									</div>
									<div class="officalPlay menu-child">
										<h1>官方玩法</h1>
										<div class="color">官</div>
										<div class="menu-child-content">
											<ul>
												<li v-for="(gv, gk) in guanfang_game_list" :key="gk">
													<router-link :to="gv.urlLink">
														<img :src="gv.picUrl" width="60" height="60" />
														<span>{{ gv.showName }} </span>
													</router-link>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</transition>
						</li>
						<li class="first" @mouseover="zonghegameSubnav = true" @mouseleave="zonghegameSubnav = false">
							<a href="#"><em class="iconfont icon-dating"></em><em> 综合游戏</em></a>
							<transition>
								<div class="second" v-show="zonghegameSubnav">
									<div class="zonghe_games_item" v-for="(zv, zk) in zonghe_games_list" :key="zk">
										<div class="zonghe_games_item_title">{{zv.channelName}}</div>	
										<div class="zonghe_games_item_content">
										  <ul>
										    <li v-for="(gv, gk) in zv.gameList" :key="gk">
										      <router-link :to="gv.urlLink">
										        <img style="vertical-align: middle" :src="gv.picUrl" width="50" height="50" />
										        <span style="vertical-align: middle;padding-left: 5px;">{{ gv.showName }} </span>
										      </router-link>
										    </li>
										  </ul>
										</div>
									</div>
								</div>
							</transition>
						</li>
						<li>
							<router-link to="/phone"><em class="iconfont icon-shouji1"></em><em> 手机购彩</em></router-link>
						</li>
						<li @click="toResult">
							<router-link :to="{ path: '/result', query: { id: 260}}"><em class="iconfont icon-biaoqiankuozhan_zoushi-198"></em><em>走势图表</em></router-link>
						</li>
						<li>
							<router-link to="/activity"><em class="iconfont icon-youhuiquan"></em><em> 优惠活动</em></router-link>
						</li>
						<li>
							<router-link to="/news"><em class="iconfont icon-xinwen"></em><em> 彩票资讯</em></router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	//import leftBar from "@/components/home/public/leftbar.vue"
	import HeadTop from "@/components/home/public/head_top.vue";
	export default {
		components: {
			//leftBar,
			HeadTop,
		},
		props: {
			caizhongleftbar_allways_show: {
				type: Boolean,
				default: false,
			},
			change_color: {
				type: Boolean,
				default: false,
			},
			cart_change: {
				type: Number,
			},
		},
		data() {
			return {
				subnav: false,
				zonghegameSubnav: false,
				userInfo: {
					username: "",
					password: "",
					validateCode: "",
					uuid: "",
				},
				memberInfo: {},
				//token:'',
				isLogin: false,
				xinyong_game_list: [],
				guanfang_game_list: [],
				zonghe_games_list: [],
				caizhongleftbarshow: false,
				verifycodeImg: "",
				cart_count: 0,
				center_top: true,
			};
		},
		computed: {},
		methods: {
			toResult() {},
			headToLogin: function() {
				//   this.error_num = this.get_error_num();
				if (
					this.$isEmpty(this.userInfo.username) ||
					this.$isEmpty(this.userInfo.password)
				) {
					return this.$message.error("账号密码不能为空");
				} else if (this.$isEmpty(this.userInfo.validateCode)) {
					return this.$message.error("验证码不能为空");
				}
				this.$post("Pc.Login.login", this.userInfo).then((res) => {
					if (res.data.code < 0) {
						return this.$message.error(res.data.message);
					} else {
						this.$message.success("登录成功");
						localStorage.setItem("token", res.data.token);
						this.isLogin = true;
						this.$router.push("/");
					}
				});
			},
			logout: function() {
				this.$get("Pc.Login.logout").then(() => {
					localStorage.removeItem("user_info");
					localStorage.removeItem("token");
					this.$router.push("/user/login");
				});
			},
			head_load_verifycode() {
				this.$get("Pc.Login.vcode").then((res) => {
					this.verifycodeImg = res.data.img;
					this.userInfo.uuid = res.data.uuid;
				});
			},
			search: function() {
				if (this.$route.name == "goods_index") {
					return this.$emit("search_goods", {
						keywords: this.keywords,
					});
				}
				let params = "keywords." + this.keywords;
				this.$router.push("/goods/params/" + params);
			},
			to_my_store: function() {
				if (this.$isEmpty(localStorage.getItem("token"))) {
					this.$message.error("请先登录！");
					return this.$router.push("/user/login");
				}
				this.$get(this.$api.homeIsStore).then((res) => {
					if (res.code == 200) {
						return this.$router.push("/store/" + res.data);
					} else {
						this.$message.error(res.msg);
						return this.$router.push("/store/join");
					}
				});
			},
			getMenuNavInfo: function() {
				this.$get("Pc.HomePage.getNavInfoList").then((res) => {
					this.xinyong_game_list = res.data.gameType0;
					this.guanfang_game_list = res.data.gameType1;
					this.zonghe_games_list = res.data.otherChannel;
					//this.popupNotice = res.data.popupNotice.items;
				});
			},
			//获取用户信息
			getmemberInfo() {
				this.$get("Pc.Member.memberInfo").then((res) => {
					if (res.code == 0) {
						this.memberInfo = res.data;
						localStorage.setItem('memberInfo', JSON.stringify(res.data))
						// this.$store.commit("memberInfo", res.data);

						// if (this.memberInfo.phoneno == "") {
						//   this.phone_dialogVisible = true;
						// }
					} else {
						return this.$message.error(res.message);
					}
				});
			},
		},
		created() {
			let token = localStorage.getItem("token");
			if (!this.$isEmpty(token)) {
				this.isLogin = true;

				this.getmemberInfo();
			}
			if (this.$isEmpty(token)) {
				this.head_load_verifycode(); //加载图形验证码
			}
			// 监听滚动条
			if (this.caizhongleftbar_allways_show) {
				this.caizhongleftbar_allways_show = true;
			}
			this.getMenuNavInfo();
			window.addEventListener(
				"scroll",
				() => {
					var scrollTop =
						window.pageYOffset ||
						document.documentElement.scrollTop ||
						document.body.scrollTop;
					if (scrollTop > 210) {
						this.center_top = false;
					} else {
						this.center_top = true;
					}
				},
				true
			);
		},
		mounted() {},
	};
</script>
<style lang="scss" scoped>
	.btn-login-out {
		cursor: pointer;
		margin-left: 5px;
		display: inline-block;
	}

	.navBoxLeft {
		float: left;
		background: #ca151e;
		box-sizing: border-box;
		text-align: center;
		position: relative;
	}

	.navBoxRight {
		padding-left: 20px;
		position: relative;
	}

	.caizhongleftbar {
		border: 1px solid #c0ccd8;
		box-sizing: border-box;
		position: absolute;
		left: 0px;
		height: 350px;
		display: block;
		z-index: 998;
		color: #333;
		background: #fff;
	}

	.caizhongleftbar ul {
		width: 236px;
		margin: 0 auto;
	}

	.caizhongleftbar ul li {
		height: 50px;
		border-bottom: 1px solid #f0f0f0;
		line-height: 50px;
	}

	.caizhongleftbar ul li a {
		font-weight: bold;
		font-size: 12px;
		color: #807e7f;
	}

	.caizhongleftbar ul li a img {
		float: left;
		padding: 5px 10px;
		width: 35px;
		height: 35px;
	}

	.caizhongleftbar ul li span {
		color: #807e7f;
		font-size: 12px;
		margin-left: 30px;
	}

	.caizhongleftbar .more a {
		color: #807e7f;
		font-weight: bold;
		float: right;
		margin-right: 18px;
		height: 37px;
		line-height: 37px;
	}

	.creditPlay {
		display: inline-block;
		*display: inline;
		*zoom: 1;
		width: 529px;
		zoom: 1;
		font-size: 0;
		float: left;
		border-right: 1px solid #f13131;
	}

	.preson-info {
		margin-top: 15px;
		font-weight: bold;
		white-space: nowrap;
		font-size: 14px;
		height: 74px;
		text-align: right;
		line-height: 36px;

		.info a {
			padding: 0 15px;
			cursor: pointer;
		}
	}

	.officalPlay {
		display: inline-block;
		*display: inline;
		*zoom: 1;
		width: 529px;
		zoom: 1;
		font-size: 0;
		float: left;
	}

	.menu-child .menu-child-content {
		margin-top: 60px;
		border-top: 1px solid #f56c6c;
		padding-top: 20px;
	}

	.menu-child .color {
		width: 23px;
		height: 23px;
		text-align: center;
		float: left;
		line-height: 22px;
		font-size: 15px;
		display: block;
		margin-left: 12px;
		margin-top: 10px;
		color: #ffffff;
		border-radius: 5px;
		background-color: #f56c6c;
	}

	.menu-child h1 {
		width: 70px;
		height: 20px;
		font-size: 16px;
		display: inline-block;
		margin-left: 26px;
		margin-top: 2px;
		float: left;
		color: #000;
	}

	.navBox .menu-child ul li a:hover {
		text-decoration: none;
		background-color: #ffffff;
	}

	.navBoxRight .menu-child ul li {
		float: left;
		position: relative;

		line-height: 28px;
		margin: 5px 0;
		height: 90px;
		width: 102px;
		text-align: center;
	}

	.menu-child ul li span {
		font-size: 12px;
		display: block;
		color: #000;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 28px;
		line-height: 28px;
		overflow: hidden;
	}

	.header {
		height: 82px;
		font-size: 12px;
	}

	.header .left {
		float: left;
		width: 500px;
	}

	.header .right {
		float: right;
		width: 630px;
	}

	.header .right ul {
		margin-top: 18px;
	}

	.header .right ul li {
		float: left;
		margin-left: 7px;
	}

	.header .username,
	.header .password {
		height: 36px;
		width: 128px;
		border: 2px solid #ccc;
		border-radius: 5px;
	}

	.header .username input,
	.header .password input {
		float: right;
		width: 106px;
		height: 32px;
		line-height: 32px;
		border: none;
		outline: none;
		background-color: #fdffd7;
	}

	.header .username span {
		width: 22px;
		height: 32px;
		display: inline-block;
		background: url("/images/username.png") center left no-repeat;
	}

	.header .password span {
		width: 22px;
		height: 32px;
		display: inline-block;
		background: url("/images/password.png") center left no-repeat;
	}

	.header .yzm {
		width: 140px;
		height: 36px;
		border-radius: 3px;
		border: 2px solid #ccc;
	}

	.header .yzm input {
		float: left;
		width: 69px;
		text-indent: 20px;
		outline: none;
		border: none;
		height: 32px;
		line-height: 32px;
	}

	.header .yzm img {
		float: right;
		margin: 6px 2px;
		width: 60px;
		height: auto;
	}

	.header .login {
		float: left;
		padding-top: 4px;
	}

	.header .login input {
		width: 85px;
		color: white;
		height: 32px;
		border-radius: 5px;
		background-color: red;
		outline: none;
		border: none;
		cursor: pointer;
	}

	.header .regist {
		float: right;
		padding-top: 4px;
		margin-left: 5px;
	}

	.header .regist input {
		width: 85px;
		color: white;
		height: 32px;
		border-radius: 5px;
		background-color: #397de4;
		outline: none;
		border: none;
		cursor: pointer;
	}

	.nav {
		background-color: #f15454;
		height: 46px;
		font-size: 14px;
		line-height: 46px;
		color: #fff;
	}

	.navBox {
		margin: 0 auto;
		height: 46px;
	}

	.navBox ul {
		float: left;
	}

	.navBoxRight ul li {
		text-align: center;
		width: 105px;
		float: left;
		color: white;
		height: 46px;
		font-size: 14px;
	}

	.navBoxRight ul li a {
		color: white;
		display: block;
	}

	.navBoxRight ul li a.current {
		background-color: #d33838;
		height: 46px;
	}

	.navBoxRight ul li a:hover {
		background-color: #d33838;
		height: 46px;
	}

	// .navBox .navUl {
	// 	position: relative;
	// }
	.navBoxRight .second {
		box-shadow: 2px 2px 5px #cf5d5d;
		color: black;
		position: absolute;
		left: 0px;
		top: 46px;
		width: 1060px;
		z-index: 999;
		height: auto;
		background-color: white;
		border: 1px solid #f15454;
		border-top: none;
	}

	.navBox .zhyxdl {
		height: 100%;
	}

	.navBox .zhyxdd {
		float: left;
		width: 33.2%;
		border-right: 1px solid #ed6a6a;
		height: 100%;
	}

	.navBox dd.last {
		border: none;
	}

	.navBox .zhyxdl .title {
		height: 40px;
		background-color: #ccc;
	}
	
	.zonghe_games_item{width: 33.3333%; float:left; border-left: 1px solid #ccc;    box-sizing: border-box; }
	
	.zonghe_games_item_title{
	    height: 50px;
	    line-height: 50px;
	    color: #6b6b6b;
	    background: #ededed;
	    font-size: 16px;
	    font-weight: bold;
	    box-sizing: border-box;
		}
		.zonghe_games_item_content ul li {
		    text-align: left;
		    width: 300px;
		    float: left;
		    padding: 10px;
		    line-height:50px;
			height: 50px;
		    font-size: 14px;
		}
		
		.zonghe_games_item_content ul li a{
		    color: #000000;
		    display: block;
			line-height: 50px;
			height: 50px;
		}
		
		.zonghe_games_item_content ul li a:hover {
			text-decoration: none;
			background-color: #FFFFFF;
			color: #FF6D53;
		}
	
</style>
