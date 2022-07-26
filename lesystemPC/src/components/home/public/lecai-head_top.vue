<template>
    <div class="top">
    	<div class="topCenter width_center_1320">
    		<div class="topLeft">
    			<ul>
					<li class="welcome">您好,欢迎来到乐彩彩票!</li>
					<li class="axis"></li>
    				<li v-if="!isLogin"><router-link to="/user/login">请登录</router-link></li>
    				<li v-if="!isLogin" class="axis"></li>
    				<li v-if="!isLogin"><router-link to="/user/register">免费注册</router-link></li>
    				<li v-if="!isLogin" class="axis"></li>
    			</ul>
    		</div>
    		<div class="topRight">
    			<ul>
    				<!--<li><a href="#" class="red">[乐彩公益]</a></li>
    				<li class="axis"></li>
    				<li><a href="#" class="red">766开奖网</a></li>
    				<li class="axis"></li>
    				<li class="axis"></li>-->
    				<li><a :href="kefuUrl" target="_blank" class="black">在线客服</a></li>
    				<!--<li class="axis"></li>-->
    			</ul>
    		</div>
    	</div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
		isLogin:{
		    type:Boolean,
		    default:false,
		},
	},
    data() {
      return {
          user_info:{},
		  kefuUrl:'',
      };
    },
    watch: {
		isLogin:function(val){
		        this.isLogin = val;
		    },
	},
    computed: {},
    methods: {
        logout:function(){
            this.$get("Pc.Login.logout").then(()=>{
                localStorage.removeItem('user_info');
                localStorage.removeItem('token');
                this.$router.push('/user/login');

            });
        },
		setupKefu:function(){
		    let kefu = localStorage.getItem("kefu");
		    this.kefuUrl=kefu;
		},
    },
    created() {
        let token = localStorage.getItem('token');
        if(!this.$isEmpty(token)){
            this.isLogin = true;
            //this.user_info = JSON.parse(user_info);
        }
		this.setupKefu();
    },
    mounted() {}
};
</script>
<style lang="scss" scoped>
.welcome{line-height: 34px;font-size: 12px;
    height: 34px;
    color: #666;}
.top{height: 34px;border-top: 1px solid #b6b4b6;border-bottom:1px solid #b6b4b6;background:#f3f3f3 ;}
.topCenter{height: 34px;}
.topLeft{margin-left:7px;}
a{text-decoration: none}
a:hover{text-decoration: underline;}
.topLeft ul li{float: left}
.topCenter ul li.axis{height: 13px;width: 1px;margin:10px 11px; background-color: #ccc}
.topLeft ul li a.login{line-height: 34px;height: 34px;color: #666}
.topLeft ul li a.register{color: #f87f25}
.topCenter a{font-size: 12px;height: 34px;line-height: 34px}
.topCenter .topRight{float: right;}
.topRight ul li{float: left;}
.topRight a.red{color: #f15454}
.topRight a.black{color:black;}
</style>