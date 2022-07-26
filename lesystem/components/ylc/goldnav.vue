<template>
  <uni-nav-bar>
    <view slot="left" @click="isShowRightDrawer = true"
      ><i class="iconfont icon-menu menubtn" style="color: #000000"></i
    ></view>
    <view style="text-align: center; margin: 0 auto"
      ><i class="indexlogo"></i
    ></view>
    <!-- <view v-if="!isLogin" slot="right" >
			<span class="text-white loginbtn" @click="loginClick">登录</span>
			<span class="text-white registerbtn" @click="registClick">免费注册</span>
		</view>
		<view v-else slot="right" >
			<span class="text-white loginbtn" @click="gotomembercenter">会员中心</span>
		</view> -->
    <DrawerModalL
      :isShow="isShowRightDrawer"
      :isLogin="isLogin"
      :username="username"
      :balance="balance"
      @hideModal="isShowRightDrawer = false"
    />
  </uni-nav-bar>
</template>

<script>
import DrawerModalL from "@/pages/commonPage/DrawerModalL.vue";
export default {
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
    username: {
      type: String,
      default: "",
    },
    balance: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      //isLogin: false,
      isShowRightDrawer: false,
      //balance: "",
    };
  },
  components: {
    DrawerModalL,
  },
  // computed: {
  //   isUserLogin () {
  // 	  console.log(this.isLogin)
  //     return this.isLogin
  //   }
  // },
  created() {
    // console.log("nav created");
    // let token = uni.getStorageSync("token");
    // if (token) {
    // 	this.isLogin = true;
    // 	// this.refreshUserInfo();
    // }
  },
  methods: {
    registClick() {
      uni.navigateTo({
        url: "/pages/login/register/register",
      });
    },
    gotomembercenter() {
      uni.switchTab({
        url: "/pages/member/index/index",
      });
    },
    loginClick() {
      uni.navigateTo({
        url: "/pages/login/login/login",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.loginbtn,
.registerbtn {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 4px;
  background-color: #c8262c;
  width: 130rpx;
  text-align: center;
}
.indexlogo {
  background-image: url("/static/images/le/goldlogo.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 80rpx;
  width: 210rpx;
  display: block;
  background-origin: content-box;
  margin-top: 4rpx;
}

.registerbtn {
  background-color: #fbbd08;
  margin-left: 6px;
  color: #333;
}
.menubtn {
  font-size: 24px;
  color: #fff;
}
</style>
