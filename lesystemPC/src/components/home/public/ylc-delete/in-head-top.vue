<template>
	<div>
    <div class="top">
    	<div class="topCenter width_center_1320">
    		<div class="topRight loginArea">
    			<ul v-show="!isLogin">
    				<li><a class="btn_add_regist"  @click="registDialogVisible = true"><i class="iconfont icon-zhuce"></i><span>立即注册</span></a></li>
    				<li class="axis"></li>
    				<li><a href="#" class="btn_login" @click="loginDialogAction"><i class="iconfont icon-mima"></i><span>登录</span></a></li>
    				<li class="axis"></li>
    			</ul>
				<ul v-show="isLogin && isLoading" class="top_user_info">
					<li><i class="el-icon-loading"></i>用户资料加载中...</li>
				</ul>
				<ul v-show="isLogin &&!isLoading" class="top_user_info">
					<li ><i class="iconfont icon-zhenshixingming"></i><a href="#" class="userinfo_name"> {{user_info.username}}</a></li>
				    <li class="axis">|</li>
					<li><i class="iconfont icon-qiandai"></i>{{user_info.coin}}</li>
					<li class="axis">|</li>
					<li @click="logout" class="logoutli"><i class="iconfont icon-tuichu1"></i>退出</li>
				</ul>
				<!--
				<ul class="top_user_info">
					<li>
				<el-dropdown class="international" @command="handleSetLanguage">
				  <div class="flag">
				    <i :class="language"></i>
				  </div> 
				  <div class="flag">
				      <i class="iconfont icon-icon-test4" style="color:#fff"></i>
				  </div> 
				
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item :disabled="language==='zh'" command="zh">
				      <span class="zh"></span><span class="lang">中文</span>
				    </el-dropdown-item>
				    <el-dropdown-item :disabled="language==='en'" command="en">
				      <span class="en"></span><span class="lang">English</span>
				    </el-dropdown-item>
					<el-dropdown-item :disabled="language==='in'" command="in">
					  <span class="in"></span><span class="lang">हिंदी</span>
					</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
				</li>
				</ul>
				-->
    		</div>
    	</div>
    </div>
	<el-dialog :visible.sync="loginDialogVisible" title="登陆" width="500px">
		<login @loginsuccess="loginsuccessAction"></login>
	</el-dialog>
	<el-dialog :visible.sync="registDialogVisible" title="立即注册" width="600px">
		<regist></regist>
	</el-dialog>
	</div>
</template>

<script>
	import regist from "@/components/home/public/in-cregist.vue";
	import login from "@/components/home/public/in-clogin.vue";
	import { Loading } from 'element-ui';
export default {
    components: {regist,login},
    props: {
		// isLogin:{
		//     type:Boolean,
		//     default:false,
		// },
		loginDialogVisible:{
		    type:Boolean,
		    default:false,
		},
		
	},
    data() {
      return {
		  isLogin:false,
		  isLoading:false,
          user_info:{},
		  registDialogVisible:false,
      };
    },
    methods: {
        logout(){
            this.$get("Pc.Member.logout").then(()=>{
                // console.log(res);
                localStorage.removeItem('user_info');
                localStorage.removeItem('token');
				this.isLogin=false;

            });
			localStorage.removeItem('user_info');
			localStorage.removeItem('token');
			this.isLogin=false;
        },
		loginsuccessAction(res){
			//console.log(res);
			this.loginDialogVisible =false;
			this.isLogin=true;
			this.loadUserInfo();
		},
		loginDialogAction() {
			this.loginDialogVisible = true;
			
			
		},
		 loadUserInfo(){
		      this.isLoading=true;
			    this.$get("Pc.Member.memberInfo").then((res) => {
			      if (res.code == 0) {
			        this.user_info = res.data;
			        this.isLoading=false;
			      } else {
			        this.$message.error(res.message);
			      }
			    });
		
		}
		
    },
    created() {
        let token = localStorage.getItem('token');
        if(!this.$isEmpty(token)){
            this.isLogin = true;
			this.loadUserInfo();
            //this.user_info = JSON.parse(user_info);
        }
		//this.load_logindata();
    },
    mounted() {}
};
</script>
<style lang="scss">
.el-dialog__header {
    border-bottom: 1px solid #f2f2f2;
    text-align: center;
	}
</style>
<style lang="scss" scoped>
	.flag{box-sizing: border-box;height:30px;margin-top: 2px;cursor: pointer;    display: inline-block;}
	.en{height: 14px;width: 20px;
	    background-image: url(/images/my/en.png);
	    background-repeat: no-repeat;
	    background-size: cover;display:inline-block;
	    background-position: center;}
	.lang{display:inline-block;height: 16px;margin-left:5px;}
	.zh{height: 14px;width: 20px;
		    background-image: url(/images/my/zh.png);
		    background-repeat: no-repeat;
		    background-size: cover;display:inline-block;
		    background-position: center;}
	.in{height: 14px;width: 20px;
	    background-image: url(/images/my/in.png);
	    background-repeat: no-repeat;
	    background-size: cover;display:inline-block;
	    background-position: center;}
	.top_user_info> li .userinfo_name {
	    color: #d4a34c;
	    font-size: 14px;
	}
.el-dialog__header {
    border-bottom: 1px solid #f2f2f2;
    text-align: center;
	}
	.loginArea>ul> li {
	    float: left;
	    margin: 0px 4px;
		color: white;
		line-height: 40px;
	}
.top{
	    height: 40px;
	    width: 100%;
	    background-color: #312f30;
	    background-repeat: no-repeat;
	    background-size: cover;
	    background-position: center;
	    min-width: 1000px;color: #a9c9e1;
}
.loginArea a {
    cursor: pointer;
    color: #fff;
}
.logoutli{cursor: pointer;}
.btn_login {
    text-align: center;
    width: 85px;
    line-height: 22px;
    text-decoration: none;
    background-color: #00b2b9;
    border-radius: 3px;
	    display: block;
		margin-top: 8px;
}
.btn_add_regist {
    width: 85px;
    padding-left: 10px;
	background-color: #ff9000;
	 border-radius: 3px;line-height: 22px;
        display: block;margin-top: 8px;
    text-decoration: none;}
.topCenter{height: 34px;}
a{text-decoration: none}
a:hover{text-decoration: underline;}
.topLeft ul li{float: left}
.topCenter ul li.axis{width: 1px;margin:0px 11px;}
.topCenter .topRight{float: right;box-sizing: border-box;    font-size: 12px;
    height: 40px;}
.topRight ul li{float: left;}
</style>