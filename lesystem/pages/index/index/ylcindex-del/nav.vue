<template>
	<uni-nav-bar backgroundColor="rgb(58, 58, 58)">
		<view slot="left" @click="isShowLeftDrawer=true"><i class="iconfont icon-menu menubtn"></i></view>
		<view style="text-align: center; margin: 0 auto"><i class="indexlogo"></i></view>
		<view v-if="!isLogin" slot="right" >
			<span class="text-white loginbtn" @click="loginClick">登录</span>
			<span class="text-white registerbtn" @click="registClick">免费注册</span>
		</view>
		<view v-else slot="right" >
			<span class="text-white loginbtn">会员中心</span>
			<span class="text-white registerbtn">最近浏览</span>
		</view>
		<DrawerModalL :isShow="isShowLeftDrawer" :balance="balance" @hideModal="isShowLeftDrawer = false" />
	</uni-nav-bar>
</template>

<script>
	import DrawerModalL from '../../../commonPage/DrawerModalL'
	export default{
		data(){
			return{
				isLogin: false,
				isShowLeftDrawer:false,
				balance: "",
			}
		},
		components:{
			DrawerModalL,
		},
		created() {
			let token = uni.getStorageSync("token");
			if (token) {
				this.isLogin = true;
				// this.refreshUserInfo();
			}
		},
		methods:{
			registClick() {
				uni.navigateTo({
					url: "/pages/login/register/register",
				});
			},
			loginClick() {
				uni.navigateTo({
					url: "/pages/login/login/login",
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.loginbtn,.registerbtn{
		display: inline-block;
		padding:2px 10px ;
		border-radius: 4px;
		background-color: #C8262C;
		width: 80px;
		text-align: center;
	}
	.registerbtn{
		background-color: #FBBD08;
		margin-left: 6px;
		color: #333;
	}
	.menubtn{
		font-size: 24px;
		color: #fff;
	}
</style>
