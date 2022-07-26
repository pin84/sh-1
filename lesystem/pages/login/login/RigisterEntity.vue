<template>
  <view id="register-entity">
    <view class="list">
      <view class="item" v-for="(item, idx) in list" :key="idx">
        <text class="iconfont" :class="item.icon"></text>
        <input
          v-model="item.inputText"
          class="input"
          :type="idx == 1 ? 'password' : idx == 2 ? 'number' : 'text'"
          :placeholder="item.placeholder"
          autocomplete="new-password"
        />
        <button
          v-if="item.placeholder == '请输入验证码'"
          class="btn"
          type="primary"
          @click="send_sms"
        >
          {{ btnText }}
        </button>
      </view>
    </view>

    <view class="agreen-box text-black">
      <text
        @click="isShowDou = !isShowDou"
        :class="
          isShowDou
            ? 'dui iconfont icon-duoxuanyidong'
            : 'dui iconfont icon-duoxuan'
        "
      ></text>
      <text class="text-sm">同意并愿意遵守本公司</text>
      <text class="text-yellow text-sm" @tap="isShowModal = true"
        >用户协议</text
      >
    </view>

    <button
      class="log-btn"
      :class="{ ban: loginTimeout }"
      type="primary"
      @click="register"
    >
      {{ btnName }}
      <text v-if="loginTimeout" class="loginTimeout">({{ loginTimeout }})</text>
    </button>
	
	<view  class="flex margin-top-df" style="margin-top: 20px;margin-left: 100rpx;">
	    <text class="text-black margin-right-sm text-sm text-blod" @click="backHome"
	      >返回首页</text
	    >
	    <text class="text-black text-sm text-blod margin-right-sm "
	      ><navigator url="/pages/index/app/app">APP下载 </navigator></text
	    >
		<text  @click="backKefu" class="text-black  text-sm text-blod">联系客服</text>
	  </view>

    <view class="cu-modal show" v-if="isShowModal">
      <view class="cu-dialog">
        <view class="cu-bar bg-white justify-end">
          <view class="content">用户协议</view>
          <view class="action" @tap="hideModal">
            <text class="cuIcon-close text-red"></text>
          </view>
        </view>
        <view
          class="padding-xl"
          style="height: 30vh; overflow: scroll; text-align: left"
        >
          在开户后进行一次有效存款，恭喜您成为本公司有效会员！存款免手续费，开户最低入款金额100人民币。本公司严禁会员有重复申请账号行为，每位玩家、每一住址
          、每一电子邮箱、每一电话号码、相同支付卡/信用卡号码，及共享计算机环境(例如网吧、其他公共用计算机等)只能拥有一个帐户数据。本公司是提供互联网投注服务的机构。请会员在注册前参考当地政府的法律，在博彩不被允许的地区，如有会员在本公司注册、下注，为会员个人行为，本公司不负责、承担任何相关责任。无论是个人或是团体，如有任何威胁、滥用本公司名义的行为，本公司保留杈利取消、收回玩家账号。玩家注册信息有争议时，为确保双方利益、杜绝身份盗用行为，本公司保留权利要求客户向我们提供充足有效的档，并以各种方式辨别客户是否符合资格享有我们的任何优惠。本公司是使用利鑫科技所提供的在线娱乐软件，若发现您在同系统的娱乐场上开设多个会员账户，并进行套利下注；本公司有权取消您的会员账号并将所有下注营利取消！
        </view>
        <view class="cu-bar bg-white justify-end">
          <view class="action">
            <button class="cu-btn bg-green margin-left" @tap="hideModal">
              确定
            </button>
          </view>
        </view>
		
      </view>
    </view>
  </view>
</template>

<script>
import http from "common/js/http.js";
export default {
  mixins: [http],
  data() {
    return {
      isShowModal: false,
      isShowDou: true,
      record_id: "",
      timeout: 0,
      isShowPhoneCode: false,
      btnName: "注册",
      btnText: "获取验证码",
      loginTimeout: 0,
      goback: "",
      list: [
        {
          icon: "icon-yonghu",
          placeholder: "请输入3-15个母数字组合",
          inputText: "",
        },
        {
          icon: "icon-mima",
          placeholder: "请输入密码6-14个字母或数字组合",
          inputText: "",
        },
        {
          icon: "icon-shouji",
          placeholder: "请输入手机号",
          inputText: "",
        },
        {
          icon: "icon-yanzhengma",
          placeholder: "请输入验证码",
          inputText: "",
        },
      ],

      warnList: [
        "用户名不能为空",
        "密码不能少于6个字符",
        "请输入手机号码",
        "请填写验证码",
      ],

      agreement: "",
    };
  },

  methods: {
	  backHome() {
	    uni.switchTab({
	      url: "/pages/index/index/index",
	    });
	  },
	  backKefu() {
	    uni.switchTab({
	      url: "/pages/kefu/kefu",
	    });
	  },
    async send_sms() {
      if (this.timeout) {
        return;
      }
      if (this.list[2].inputText == "") {
        this.$util.showToast({
          title: "请先填写手机号码",
        });
        return;
      }

      let d = {
        url: "System.SendMsg.sendVeryCode",
        methods: "POST",
        data: {
          phone: this.list[2].inputText,
        },
      };
      let res = await this.$http(d);

      if (res.code == 0) {
        this.$util.showToast({
          title: res.message,
        });
        this.timeout = 60;
        let interval = setInterval(() => {
          this.timeout--;
          this.btnText = `${this.timeout} 秒后再发送`;
          this.record_id = res.data.record_id;
          if (!this.timeout || this.timeout < 0) {
            clearInterval(interval);
            this.timeout = 0;
            this.btnText = `获取验证码`;
          }
        }, 1000);
      }
    },

    register() {
      let flag = this.registerCheck();
      if (!flag) {
        return;
      }

      let data = {
          username: this.list[0].inputText,
          phone: this.list[2].inputText,
          password: this.list[1].inputText,
          record_id: this.record_id,
          code: this.list[3].inputText,
        }

      this.sendRequest({
        url: "System.Login.mobileRegisterAPI",
        method: "POST",
        data,
        success: (res) => {
          if (res.data.code == -1) {
            this.$util.showToast({
              title: res.data.message,
            });
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
    registerCheck() {
      if (!this.isShowDou) {
        this.$util.showToast({
          title: "请先同意用户协议",
        });
        return false;
      }
      let i = 0;
      for (let obj of this.list) {
        if (obj.inputText == "") {
          this.$util.showToast({
            title: this.warnList[i],
          });
          return false;
        }

        if (i == 2) {
          let flag = this.checkPhone(obj.inputText);
          if (!flag) {
            this.$util.showToast({
              title: "手机号不正确",
            });
            return false;
          }
        }

        i++;
      }
      return true;
    },

    checkPhone(phone) {
      let reg =
        /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/;
      let flag = reg.test(phone);
      return flag;
    },

  

    hideModal() {
      this.isShowModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.df {
  display: flex;
  justify-content: center;
  align-items: center;
}
#register-entity {
  width: 100%;
  padding: 30rpx;
  .list {
    @extend .df;
    flex-direction: column;
    width: 100%;
    .item {
      position: relative;
      width: 100%;
      @extend .df;
      background-color: #fff;
      padding: 20rpx 20rpx;
      font-size: 24rpx;
      border-radius: 6rpx;
      overflow: hidden;
      margin-bottom: 16rpx;
      .iconfont {
        display: inline-block;
        flex: 0 0 60rpx;
      }
      .input {
        width: 100%;
        font-size: 28rpx;
        outline: none;
        border: none;
      }
      .btn {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        line-height: 100rpx;
        width: 150rpx;
        font-size: 20rpx;
        margin: 0;
        padding-left: 0;
        padding-right: 0;
        background-color: rgb(9, 88, 119) !important;
        border-radius: 0;
      }
    }
  }
  .agreen-box {
    padding: 20rpx 0;
    .dui {
      margin-right: 10rpx;
      padding: 60rpx 10rpx;
      padding-left: 0;
      font-size: 24rpx;
    }
  }

  .log-btn {
    width: 100%;
    margin: 0;
    padding-left: 0;
    padding-right: 0;
    &.ban {
      background-color: gray !important;
    }
  }
  .loginTimeout {
    margin-left: 10rpx;
  }
}
</style>