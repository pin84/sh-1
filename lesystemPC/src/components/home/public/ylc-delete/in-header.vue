<template>
	<div class="shop_head">
		<head-top :loginDialogVisible="loginDialogVisible"></head-top>
		<!---top结束-->
		<div style="clear: both;"></div>
		<div class="header width_center_1190">
			<div class="logo-container"><div class="logo"></div></div>
			<div class="right">
				<div class="menu">
				<ul class="ul_menu-main">
					<li> <a class="menuA active">首页
					<p>HOME</p>
					</a>
					</li>
				<li> <a class="menuA"><span class="iconfont icon-luckyturning"></span>电子游戏
				<p>ELEC GAMES</p>
				</a>
				</li>
				<li>
				</li>
				<li>
				<a class="menuA"><span class="iconfont icon-meinv" style="color:#e89abe"></span>真人视讯
				<p>LIVE CASINO</p>
				</a>
				</li>
				<li>
				</li>
				<li>
				<a class="menuA"><span class="iconfont icon-kapai"></span>棋牌对战<p>CHESS CARDS</p></a>
				
				</li>
				<li>
					<li>
					<a class="menuA"><span class="iconfont icon-yu"></span>捕鱼游戏
        <p>FISH GAMES</p></a>
					
					</li>
					<li>
				</li>
				<li @click="goLottery">
				<a class="menuA"><span class="iconfont icon-xuan-wu"></span>彩票游戏<p>LOTTERY</p></a>
				</li>
				<li>
				</li>
				<li>
				<a class="menuA"><span class="iconfont icon-youhuiquan"></span>优惠活动<p>PROMOTIONS</p></a>
				</li>
				<li>
				</li>
				<li>
				<a class="menuA"><span class="iconfont icon-shouji"></span>手机下注<p>MOBILE</p></a>
				</li>
				<li>
				</li>
				<li>
				<a class="menuA">
				<span class="iconfont icon-kefu"></span>在线客服<p>ONLINE SERVICE</p>
				</a>
				</li>
				</ul>
				
				</div>
				</div>
			</div>
			<div style="clear: both;"></div>
		</div>
		
		<!--header结束---->
</template>
<script>
	import HeadTop from "@/components/home/public/in-head-top.vue"
	export default {
		components: {
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
			}
		},
		data() {
			return {
				subnav: false,
				loginDialogVisible:false,
				userInfo: {
					username: "",
					password: "",
					validateCode: "",
					uuid: "",
				},
				//token:'',
				isLogin: false,
				xinyong_game_list: [],
				guanfang_game_list: [],
				zhenrenshow: false,
				verifycodeImg: "",
				cart_count: 0,
				center_top: true,
			};
		},
		computed: {},
		methods: {
			goLottery(){
				if (this.$isEmpty(localStorage.getItem('token'))) {
					this.loginDialogVisible=true;
					}else{
				this.$router.push('/games-india');
				}
			}
		},
		created() {
			let token = localStorage.getItem('token');
			if (!this.$isEmpty(token)) {
				this.isLogin = true;
			}
			if (this.$isEmpty(token)) {
				//this.head_load_verifycode(); //加载图形验证码
			}
			// 监听滚动条
			if (this.caizhongleftbar_allways_show) {
				this.caizhongleftbar_allways_show = true;
			}
			window.addEventListener('scroll', () => {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				if (scrollTop > 210) {
					this.center_top = false;
				} else {
					this.center_top = true;
				}
			}, true);
		},
		mounted() {

		}
	};
</script>
<style lang="scss" scoped>
	.shop_head{background-color: #020001;}
	.header{    position: relative;height: 85px;}
	.header .left {
		display: inline-block;
		width: 250px;
	}
	.header .logo{height: 85px;width: 150px; background: url(/images/ylc/logo.png) no-repeat; background-size:100% 100%;
	}
	
	.header .right {}
	.logo-container{position:absolute}
	.ul_menu-main{padding-top:30px;display:block;margin:auto;text-align:right;}
	.menuA{
	    font-size: 14px;
	    float: left;
	    width: 100%;
	    min-width: 88px;
	    color: #555;
	    text-align: center;
	    cursor: pointer;
	    box-sizing: border-box;
	    text-decoration: none;
	}
	.menuA {
	    position: relative;
	}
	.bg_menuShadow {
	    width: 100%;
	    position: absolute;
		border: 1px solid #ccc;
	    top: 0px;
	    z-index: 40;
	}
	.menuSubList {
	    margin: 0 auto;
	    position: absolute;
	    left: 0;
	    right: 0;
	    top: 85px;
	    z-index: 901;
	}
	.subList {
	    margin: 0 auto;
	    position: relative;
	    width: 1000px;
	}
	
	    .ul_menu-main .active,.menuA:hover {
	        border-bottom:2px solid #e8d77c;color:#f1eda9;background:none;text-shadow:2px 2px rgba(0,0,0,.5);font-weight:400;
	    }
		.ul_menu-main li a{width:85px;height:55px;color:#fff;font:14px/1.5 Microsoft YaHei;float:left;position:relative;text-align:center;display:block;box-sizing:border-box;cursor:pointer;text-decoration:none;text-shadow:2px 2px rgba(0,0,0,.5)}
	.menu > ul li > span {
	    color: #dadada;
	}
	.ul_menu-main li a p{font-size:10px;color:#949494;white-space:nowrap;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;}
	.menu ul li{display:inline-block;position:relative;zoom:1}
</style>
