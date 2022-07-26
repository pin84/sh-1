<template>
	<view class="lebg " style="min-height:100vh">
		<view class=" padding-xl">
			<!-- 用户名，手机号，密码，手机验证码 -->
			<view class="cu-form-group flex justify-center padding-xl text-white">
				<h1>注册账户</h1>
			</view>
			<view>
				<text class="text-xs text-white">如果你已拥有本公司账户，</text>
				<a href="" class="text-xs text-yellow" @click='loginClick'>点击此处登录</a>
			</view>

			<view class="search-form radius flex align-center  padding-sm margin-top-df bg">
				<i class='iconfont icon-yonghu text-white margin-right-sm text-df'></i>
				<input v-model="submitData.userName" placeholder-class="text-gray text-sm" placeholder="请输入3-15个字母或数字组合" name="input"
				 class="text-white text-df flex-sub"></input>
			</view>
			<view class="search-form radius flex align-center  padding-sm margin-top-df bg">
				<i class='iconfont icon-mima text-white margin-right-sm text-df'></i>
				<input v-model="submitData.userPwd" placeholder-class="text-gray text-sm" placeholder="请输入密码（6-14个字母或数字组合）" name="input"
				 class="text-white text-df flex-sub"></input>
			</view>

			<view class="search-form radius flex align-center  padding-sm margin-top-df bg">
				<i class='iconfont icon-shouji text-white margin-right-sm text-df'></i>
				<input v-model="submitData.userPhone" placeholder-class="text-gray text-sm" placeholder="请输入手机号码" name="input"
				 class="text-white text-df flex-sub"></input>
			</view>
			<view class="flex align-center margin-top-df">
				<view class="search-form radius flex align-center  padding-sm bg flex-sub">
					<i class='iconfont icon-yanzhengma1 text-white margin-right-sm text-df'></i>
					<input v-model="submitData.phoneCode" placeholder-class="text-gray text-sm" placeholder="请输入手机验证码" name="input"
					 class="text-white text-df flex-sub"></input>
				</view>

				<view class="flex flex-wrap justify-between align-center"  >
					<button class="cu-btn bg-green round"     @tap="getCodeClick">{{btnVal}}</button>
				</view>

			</view>

			<view class="flex align-center margin-top-sm margin-bottom-sm">
				<!--
				<view>

					<text @click="CheckboxChange" v-if="!isCheck" class='iconfont icon-3209268-boxformrectanglesquareuncheck    text-white margin-right-sm '></text>

					<text @click="CheckboxChange" v-else class='iconfont icon-duoxuanyidong text-white margin-right-sm '></text>

				</view>
				-->
				<view class="text-white">
          <text @click="isShowDou = !isShowDou" :class="isShowDou?'dui iconfont icon-duoxuanyidong':'dui iconfont icon-duoxuan'"></text>
					<text class="text-sm">同意并愿意遵守本公司</text>
					<text class="text-yellow text-sm"  @tap="showModal">用户协议</text>
				</view>
			</view>
			<view class="flex">
				<button @click="register" class='flex-sub' :class="{error:btn1Disable,primary:!btn1Disable}" :disabled="btn1Disable">{{btn1Name}}</button>
			</view>
		</view>

		<!-- <view class="cu-modal" :class="modalName=='DialogModal1'?'show':''"> -->
		<view class="cu-modal show" v-if="isShowModal">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end" >
					<view class="content">用户协议</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl " style="height:30vh; overflow: scroll;text-align: left;">
					在开户后进行一次有效存款，恭喜您成为本公司有效会员！存款免手续费，开户最低入款金额100人民币。本公司严禁会员有重复申请账号行为，每位玩家、每一住址 、每一电子邮箱、每一电话号码、相同支付卡/信用卡号码，及共享计算机环境(例如网吧、其他公共用计算机等)只能拥有一个帐户数据。本公司是提供互联网投注服务的机构。请会员在注册前参考当地政府的法律，在博彩不被允许的地区，如有会员在本公司注册、下注，为会员个人行为，本公司不负责、承担任何相关责任。无论是个人或是团体，如有任何威胁、滥用本公司名义的行为，本公司保留杈利取消、收回玩家账号。玩家注册信息有争议时，为确保双方利益、杜绝身份盗用行为，本公司保留权利要求客户向我们提供充足有效的档，并以各种方式辨别客户是否符合资格享有我们的任何优惠。本公司是使用利鑫科技所提供的在线娱乐软件，若发现您在同系统的娱乐场上开设多个会员账户，并进行套利下注；本公司有权取消您的会员账号并将所有下注营利取消！
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
import http from "common/js/http.js";
export default {
  data() {
    return {
	  btn1Disable: false,
	  btn1CountDown: 3, //按钮提交倒计时
	  btn1CountDownInterval: null,
	  btn1Name: "立即注册",
      isShowDou:true,
      submitData: {
        userName: "",
        userPwd: "",
        userPhone: "",
        phoneCode: "",
        record_id: "",
      },
      count: 0,
      isClick: true,
      btnVal: "获取验证码",
      Interval: null,
      isCheck: false,
      isShowModal: false,
      isTimeOut: true,
    };
  },
  onUnload() {
    if (this.Interval != null) {
      clearInterval(this.Interval);
    }
  },
  methods: {
	  lockBtn() {
	      if (!this.btn1Disable) {
	        this.btn1Disable = true;
	        this.btn1Name = "立即注册(" + this.btn1CountDown-- + ")";
	        this.btn1CountDownInterval = setInterval(() => {
	          if (this.btn1CountDown < 1) {
	            this.unlockBtn();
	          } else {
	            this.btn1Disable = true;
	            this.btn1Name = "立即注册(" + this.btn1CountDown-- + ")";
	          }
	        }, 1000);
	      }
	  },
	  unlockBtn() {
	      this.btn1Disable = false;
	      this.btn1CountDown = 3;
	      this.btn1Name = "立即注册";
	      clearInterval(this.btn1CountDownInterval);
	      this.btn1CountDownInterval = null;
	  },
    showModal() {
      this.isShowModal = true;
    },
    hideModal() {
      this.isShowModal = false;
    },
    CheckboxChange() {
      this.isCheck = !this.isCheck;
    },
    setTime() {
      clearInterval(this.Interval);
      this.isClick = false;
      this.count = 60;
	  this.btnVal = this.count + "s后重新获取";
      this.Interval = setInterval(() => {
        this.count--;
        if (this.count > 0) {
          this.btnVal = this.count + "s后重新获取";
        } else {
          this.btnVal = "重新发送";
          this.isClick = true;
          clearInterval(this.Interval);
        }
      }, 1000);

      this.sendRequest({
        url: "System.SendMsg.sendVeryCode",
        method: "POST",
        data: {
          phone: this.submitData.userPhone,
        },
        success: (res) => {
          if (res.code == 0) {
            this.submitData.record_id = res.data.record_id;
          }
        },
      });
    },
    getCodeClick() {
      if (this.count !== 0) {
        return;
      }
      if (!/^1[3|4|5|8|7|6|9][0-9]\d{4,8}$/.test(this.submitData.userPhone)) {
        this.$util.showToast({
          title: "手机号不正确",
        });
      } else {
        this.setTime();
      }
    },
    registerClick() {

      if(!this.isShowDou){
         this.$util.showToast({
          title: "请先同意用户协议",
        });
        return false;
      }

      if (this.submitData.userName == "") {
        this.$util.showToast({
          title: "用户名不能为空",
        });
        return false;
      }

      if (!/^1[3|4|5|8|7|6|9][0-9]\d{4,8}$/.test(this.submitData.userPhone)) {
        this.$util.showToast({
          title: "手机号不正确",
        });
        return false;
      }
      if (this.submitData.userPwd == "") {
        this.$util.showToast({
          title: "密码不能为空",
        });
        return false;
      }
      if (this.submitData.userPwd.length < 6) {
        this.$util.showToast({
          title: "密码不能少于6个字符",
        });
        return false;
      }
      if (this.submitData.phoneCode == "") {
        this.$util.showToast({
          title: "请填写验证码",
        });
        return false;
      }
      // if (!this.isCheck) {
      //   this.$util.showToast({
      //     title: "请同意用户协议",
      //   });
      //   return false;
      // }

      return true;
      // this.register();
    },
    register() {
      let flag = this.registerClick();

      if (!flag) {
        return;
      }
      //注册接口
	  this.lockBtn();
      this.sendRequest({
        url: "System.Login.mobileRegisterAPI",
        method: "POST",
        data: {
          username: this.submitData.userName,
          phone: this.submitData.userPhone,
          password: this.submitData.userPwd,
          record_id: this.submitData.record_id,
          code: this.submitData.phoneCode,
        },
        success: (res) => {
          if (res.data.code == -1) {
            this.$util.showToast({
              title: res.data.message,
            });
			this.unlockBtn();
            return false;
          }
          if (res.data.code == 1) {
            this.$util.showToast({
              title: "注册成功",
            });
            uni.setStorage({
              key: "token",
              data: res.data.token,
            });
            setTimeout(() => {
              this.$util.redirectTo(
                "/pages/member/index/index",
                {},
                "tabbar",
                "reLaunch"
              );
            }, 1000);
          }
        },
      });
    },
    loginClick() {
      this.$util.redirectTo("/pages/login/login/login", {}, "");
    },
    resetClick() {
      this.$util.redirectTo("/pages/login/reset/reset", {}, "");
    },
  },
  mixins: [http],
};
</script>

<style lang="scss" scoped>
@import "/common/css/bg.css";
.primary{    background-color: #F43F3B;
    color: #ffffff;}
.lebg {
  .bg {
    background-color: rgba(0, 0, 0, 0.4);
  }

  .dui{
    margin-right: 10rpx;
    padding: 10rpx;
    padding-left: 0;
  }

  .btn {
    margin: 0;
    padding: 45rpx 10rpx;
  }

  .iconfont {
    font-size: 24rpx;
  }
}

a {
  text-decoration: none;
}

.cu-form-group {
  background-color: rgba(0, 0, 0, 0);
  padding: 0;
}
</style>
