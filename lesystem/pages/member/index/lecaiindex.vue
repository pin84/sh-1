<template>
  <view class="user-center text-sm text-white">
    <!-- <view class="status_bar"></view> -->

    <view class="lebg flex align-center justify-around" style="height: 30vh">
      <view
        class="text-center register-m"
        :style="{ opacity: memberInfoList.hierarchy >= 1 ? '1' : '0' }"
        @click="registerManage"
      >
        <view
          ><i
            class="iconfont icon-tianjia text-blod text-white"
            style="font-size: 60rpx; line-height: 40rpx"
          ></i
        ></view>
        <view class="text-white"><text>注册管理</text></view>
      </view>

      <view class="text-center">
        <view class=""
          ><image
            style="width: 300rpx; height: 288rpx"
            src="/static/images/le/userico.png"
          ></image
        ></view>
        <view
          v-if="isLogin"
          class="text-white"
          style="transform: translateY(-60rpx); line-height: 32rpx"
        >
          <text>{{ memberInfoList.nickname }}</text>
          <view class="margin-top-xs">
            <text class="text-white">余额：{{ memberInfoList.coin }}元</text>
          </view>
        </view>
      </view>

      <view v-if="isLogin" class="text-center" @click="toggleAccount">
        <view
          ><i
            class="iconfont icon-tuichu1 text-blod text-white"
            style="font-size: 50rpx; line-height: 40rpx"
          ></i
        ></view>
        <view class="text-white"><text>退出登入</text></view>
      </view>
      <view v-else class="text-center" @click="toLogin">
        <view
          ><i
            class="iconfont icon-yonghu text-blod text-white"
            style="font-size: 50rpx; line-height: 40rpx"
          ></i
        ></view>
        <view class="text-white"><text>登 录</text></view>
      </view>
    </view>

    <view
      class="flex align-center"
      style="height: 100rpx; background-color: rgba(0, 0, 0, 0.9)"
    >
      <view
        class="text-gray text-xl flex-sub flex justify-center align-center"
        style="border-right: 1px solid gray; line-height: 100rpx"
      >
        <i class="iconfont icon-chongzhi1 margin-right-sm"></i>
        <text @click="toRecharge">充值</text>
      </view>
      <view
        class="text-gray text-xl flex-sub flex justify-center align-center"
        style="line-height: 100rpx"
      >
        <i class="iconfont icon-tixian margin-right-sm"></i>
        <text @click="toWithdraw">提现</text>
      </view>
    </view>

    <view class="bg-gray">
      <view class="flex-a">
        <view  class="flex-item bg-white flex text-center padding" v-for="(item, indexs) in blokList" :key="indexs" @click="toDetailsPage(item.id)">
			<block v-if="item.id=='zhanneiduanxin'">
			<min-badge  :count="msgNum" :dot='isDot'>
				<view class="text-bold"><i class="iconfont iconsize" :class="[item.iconClass,item.iconColor ? item.iconColor : 'text-red',]"></i></view>
			</min-badge>
          </block>
		  <block v-else>
			  <view class="text-bold"><i class="iconfont iconsize" :class="[item.iconClass,item.iconColor ? item.iconColor : 'text-red',]"></i></view>
		  </block> 
		  
          <view>
            <text class="text-lg">{{ item.name }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import http from "../../../common/js/http.js";

export default {
  mixins: [http],

  data() {
    return {
      isLogin: false,
      blokList: [
		  {
		    iconClass: "icon-liuyanguanli",
		    iconColor: "text-cyan",
		    name: "站内短信",
		    id: "zhanneiduanxin",
		  },
		  {
		    iconClass: "icon-icon-",
		    iconColor: "text-cyan",
		    name: "网站公告",
		    id: "zhanneigonggao",
		  },
        {
          iconClass: "icon-che",
          name: "游戏记录",
          id: "youxijilu",
        },
        // {
        // 	iconClass: 'icon-suiji',
        // 	name: '追号查询'
        // },
        {
          iconClass: "icon-baobiao",
          name: "个人报表",
          id: "gerenbaobiao",
        },
        {
          iconClass: "icon-V",
          iconColor: "text-green",
          name: "团队报表",
          id: "tuanduibaobiao",
        },
        {
          iconClass: "icon-zhangdan",
          iconColor: "text-green",
          name: "帐变报表",
          id: "zhangbianbaobiao",
        },
        {
          iconClass: "icon-04",
          iconColor: "text-green",
          name: "充提记录",
          id: "chongtijilu",
        },
        {
          iconClass: "icon-liwu",
          iconColor: "text-green",
          name: "优惠活动",
          id: "youhuihuodong",
        },
        {
          iconClass: "icon-bingliziliao",
          iconColor: "text-green",
          name: "用户资料",
          id: "yonghuziliao",
        },
        {
          iconClass: "icon-yinhangqia",
          iconColor: "text-green",
          name: "银行卡",
          id: "yinghangka",
        },
        {
          iconClass: "icon-bingliziliao",
          name: "个人总览",
          id: "gerenzonglan",
        },
        // {
        // 	iconClass: 'icon-mima',
        // 	name: '密保设定',
        // 	id:'mibaosheding'
        // },
        {
          iconClass: "icon-mima",
          name: "密码修改",
          id: "mimaxiugai",
        },
        {
          iconClass: "icon-caidan",
          name: "彩种信息",
          id: "caizhongxinxi",
        },
        {
          iconClass: "icon-04",
          name: "彩种限额",
          id: "caizhongxiane",
        },
        {
          iconClass: "icon-jiangbeishengli",
          name: "开奖结果",
          id: "kaijiangjieguo",
        },
        {
          iconClass: "icon-gouwu",
          iconColor: "text-orange",
          name: "走势图",
          id: "zoushitu",
        },
        {
          iconClass: "icon-dailishang",
          iconColor: "text-orange",
          name: "团队总览",
          id: "tuanduizonglan",
        },
        {
          iconClass: "icon-yonghu",
          iconColor: "text-orange",
          name: "用户列表",
          id: "yonghuliebiao",
        },
        {
          iconClass: "icon-che",
          iconColor: "text-cyan",
          name: "注册管理",
          id: "zhuceguanli",
        },
        {
          iconClass: "icon-fenxiang",
          iconColor: "text-cyan",
          name: "推广链接",
          id: "tuiguanglianjie",
        },
        
        // {
        //   iconClass: "icon-icon-",
        //   iconColor: "text-cyan",
        //   name: "邀请注册",
        //   id: "yaoqingzhuce",
        // },
      ],

      //-------------------------
      img_src: "../../../static/images/2020/head_pic.gif",
      memberInfoList: {
        uid: " ",
      },
      memberStatisticsList: {
        todayParticipation: " ",
        todayWin: " ",
        todayLose: " ",
      },
      account_top: "",
      id_top: "",
      goods_id: 26,

      msgNum: 0,
      isDot: false,
    };
  },
  onShow() {
    // this.loginCheck(false, true);
    this.getMessage();
  },
  // onLoad() {
  // 	this.loginCheck(false, true);
  // },

  // onPullDownRefresh() {
  // 	this.loginCheck(false, true);
  // 	setTimeout(() => {
  // 		uni.stopPullDownRefresh();
  // 	}, 1200);
  // },

  created() {
    this.loginCheck(false, true);
    // this.getMessage();
  },
  methods: {
    toRecharge() {
      this.loginCheck(true, true, () => {
        uni.navigateTo({
          url: "/pages/member/recharge/recharge",
        });
      });
    },
    toWithdraw() {
      this.loginCheck(true, true, () => {
        uni.navigateTo({
          url: "/pages/member/pickGoods/index/index",
        });
      });
    },
    registerManage() {
      if (!this.isLogin) {
        return;
      }
      if (this.memberInfoList.hierarchy === 0) {
        return;
      }

      this.$util.redirectTo(
        "/pages/member/user/registerManage/registerManage",
        {}
      );
    },
    // 获取 消息信息
    getMessage() {
      if (uni.getStorageSync("token")) {
        const important_msg_count = uni.getStorageSync("important_msg_count");
        const normal_msg_count = uni.getStorageSync("normal_msg_count");

        if (important_msg_count > 0) {
          this.msgNum = important_msg_count;
          this.isDot = false;
        } else {
          if (normal_msg_count > 0) {
            this.isDot = true;
            this.msgNum = 0;
          } else {
            this.isDot = false;
            this.msgNum = 0;
          }
        }
        this.$util.setupTabBarBadge(important_msg_count, normal_msg_count);
      }
    },
    //"获取会员信息"
    getMemberInfoList() {
      uni.showLoading({
        title: "加载中...",
      });
      this.sendRequest({
        url: "System.Member.memberInfo",

        success: (res) => {
          if (res.code === 0) {
            this.memberInfoList = res.data;
            uni.setStorageSync("userInfo", res.data);
            if (res.data.user_headimg) {
              this.img_src = res.data.user_headimg;
            } else {
              this.img_src = "../../../static/images/2020/head_pic.gif";
            }
            uni.setStorageSync("hierarchy", res.data.hierarchy);
            // if (this.memberInfoList.hierarchy == 0) {
            // 	this.memberInfoList.isMember = false;
            // } else {
            // 	this.memberInfoList.isMember = true;
            // }
          } else if (res.code == "-9999") {
            uni.removeStorage({
              key: "token",
              success: function (res) {},
            });
            //this.$util.redirectTo('/pages/login/login/login',{},'','redirectTo')
          }
        },
        complete: () => {
          uni.hideLoading();
        },
      });
    },
    //"获取用户统计"
    getMemberStatistics() {
      uni.showLoading({
        title: "加载中...",
      });
      this.sendRequest({
        url: "System.Member.memberStatistics",
        success: (res) => {
          if (res.code === 0) {
            this.memberStatisticsList = res.data;
          }
        },
        complete: () => {
          uni.hideLoading();
        },
      });
    },
    loginCheck(isJumpLogin, isPopUup, logined_fn, not_login_fn) {
      if (uni.getStorageSync("token")) {
        this.account_top = "账号：";
        this.id_top = "ID:";
        this.isLogin = "退出账号";

        this.getMemberInfoList();
        this.getMemberStatistics();

        // 已登陆时的回调
        logined_fn && logined_fn();

        return true;
      } else {
        // 判断 是否弹框 未登陆
        if (isPopUup === true) {
          this.$util.showToast({
            title: "当前未登陆",
            duration: 1200,
          });
        }

        this.isLogin = false;
        this.account_top = "未登陆";
        this.memberInfoList.uid = " ";
        this.memberInfoList.username = " ";
        this.id_top = " ";
        this.memberInfoList.phoneno = " ";

        // 判断 是否需要跳转 登陆页面
        if (isJumpLogin === true) {
          setTimeout(() => {
            this.$util.redirectTo("/pages/login/login/login");
          }, 600);
        }

        // 未登陆时的回调
        not_login_fn && not_login_fn();

        return false;
      }
    },
    toggleAccount() {
      this.loginCheck(true, false, () => {
        uni.showModal({
          title: "注 意 ！",
          content: "确定退出当前账号吗？",
          success: (res) => {
            if (res.confirm) {
              this.$util.redirectTo("/pages/login/login/login");
              uni.setStorageSync("token", "");
              uni.removeStorageSync("username");
              uni.removeStorageSync("password");
              this.loginCheck();
            } else if (res.cancel) {
            }
          },
        });
      });
    },
    // toRecharge() {
    // 	this.loginCheck(true, true, () => {
    // 		this.$util.redirectTo('/pages/member/recharge/recharge', {});
    // 	});
    // },
    // toClaimGoods() {
    // 	this.loginCheck(true, true, () => {
    // 		this.$util.redirectTo('/pages/member/pickGoods/index/index', {});
    // 	});
    // },
    toCustomerService() {
      this.$util.redirectTo("/pages/member/message/message", {});
    },
    // 跳转 账变记录页面（ 同时传递参数 - uid ）
    toBillRecords() {
      let uid = this.memberInfoList.uid;
      this.loginCheck(true, true, () => {
        this.$util.redirectTo("/pages/member/bill/bill", { uid: uid });
      });
    },

    // 根据传入的 url 跳转到相应页面，如果没有 url 只判断是否登陆
    toDetailsPage(id) {
      let url = null;
      switch (id) {
        case "youxijilu":
          url = "/pages/member/index/gameRecord/GameRecord";
          break;
        case "gerenbaobiao":
          url = "/pages/member/index/userAccount/UserAccount";
          break;
        case "tuanduibaobiao":
          url = "/pages/member/index/teamAccount/TeamAccount";
          break;
        case "yonghuziliao":
          url = "/pages/member/user/userDetail/userDetail";
          break;
        // case "yaoqingzhuce":
        //   let urla = "/pages/register/generalizeRegister?inviteCode=333ttt";
        //   this.$util.redirectTo(urla, {});
        //   break;
        case "gerenzonglan":
          url = "/pages/member/personalOverview/index";
          break;
        case "caizhongxinxi":
          url = "/pages/member/index/gameInfor/gameInfor";
          break;
        case "caizhongxiane":
          url = "/pages/member/index/gameLimits/gameLimits";
          break;
        case "kaijiangjieguo":
          url = "/pages/member/index/gameResults/index";
          break;
        case "zoushitu":
          url = "/pages/member/index/gameResults/index?TabCur=1";
          break;
        case "zhangbianbaobiao":
          url = "/pages/member/bill/bill";
          break;
        case "chongtijilu":
          url = "/pages/member/rechargeRecord/recordList/recordList";
          break;
        case "youhuihuodong":
          url = "/pages/member/special-offer/special-offer";
          break;
        case "yinghangka":
          url = "/pages/member/bankCard/bankCardList/bankCardList";
          break;
        case "mimaxiugai":
          url = "/pages/member/editPassword/edit/edit";
          break;
        case "tuanduizonglan":
          url = "/pages/member/agency/index";
          break;
        case "yonghuliebiao":
          url = "/pages/member/memberList/index";
          break;
        case "zhanneiduanxin":
          url = "/pages/member/message/message";
          break;
        case "zhuceguanli":
          url = "/pages/member/user/registerManage/registerManage";
          break;
		case "tuiguanglianjie":
		   url="/pages/member/user/registerManage/registerManage?action=1";
          break;
        default:
          this.$util.showToast({
            title: "功能暂未启用。",
          });
          break;
      }

      if (url) {
        this.loginCheck(true, true, () => {
          if (id == "zoushitu") {
            uni.switchTab({ url });
          } else {
            this.$util.redirectTo(url, {});
          }
        });
      }

      // else {
      // 	this.loginCheck(true, true);
      // }
    },
    toLogin() {
      uni.navigateTo({
        url: "/pages/login/login/login",
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.user-center {
  // border 1px solid red
  // height 100vh
  // padding-bottom 200rpx
  box-sizing: border-box;

  .lebg {
    background: url('../../../static/images/le/drawerbg.jpg') no-repeat center;
    background-size: cover;
  }

  // .register-m
  // width 30%
  .flex-a {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &:after {
      content: ' ';
      flex: auto;
    }

    .flex-item {
      margin-right: 2px;
      width: calc(((100% - 2px * 3) / 3));
      margin-bottom: 3px;
      flex-direction: column;

      .iconsize {
        font-size: 40rpx;
      }
    }
  }
}
</style>
