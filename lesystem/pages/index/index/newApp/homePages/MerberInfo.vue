<template>
  <view class="merber-wrapper">
    <view id="merber-info">
      <view class="left">
        <view v-if="!isLogin" @click="toLogin" class="no-log">
          <!-- <view v-if="true" class="no-log"  @click="toLogin"> -->
          <text class="tip1">点击登录/注册</text>
          <text class="tip">登录或者注册新账户</text>
        </view>
        <view class="login" v-else>
          <view class="money">
            <i class="iconfont icon-rmb"></i>
            <text class="coin">{{ balance }}</text>
          </view>
          <view class="username">{{ username }}</view>
        </view>
      </view>
      <view class="right">
        <view @click="toMoneyOptions(0)" class="right-item">
          <view class="savemoney_btn"></view>
          <view><text class="text">存款</text></view>
        </view>
		<view @click="toMoneyOptions(1)" class="right-item">
		  <view class="withdraw_btn"></view>
		  <view><text class="text">取款</text></view>
		</view>
		
		
      </view>
    </view>
  </view>
</template>
<script>
	import http from "@/common/js/http.js";
import UserVip from "../components/UserVip.vue";
import ImageBox from "../components/ImageBox.vue";
export default {
	mixins: [http],
  props: {
    isLogin: {
      type: Boolean,
      default: () => false,
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
   //    coin: 0,
	  // ucoin:0,
	  // uname:"",
      boxStyle: {
        width: "72rpx",
        height: "72rpx",
      },
      textArr: [
        {
          text: "存款",
          img: "/static/images/2020/savemoney.png",
          toUrl: "",
        },
        // {
        //   text: "转账",
        //   img: "/static/newApp/home/2.png",
        //   toUrl: "",
        // },
        {
          text: "取款",
          img: "/static/images/2020/withdrawmoney.png",
          toUrl: "",
        },
        // {
        //   text: "退出",
        //   img: "/static/newApp/home/3.png",
        //   toUrl: "",
        // },
      ],
    };
  },
  components: {
    UserVip,
    ImageBox,
  },

  created() {
 //    console.log(this.userInfo.coin);
	// if(this.userInfo.coin==undefined||this.userInfo.coin==null){
 //       this.refreshUserInfo();
	// }
	// else{
	// 	this.ucoin=this.userInfo.coin;
	// 	this.uname=this.userInfo.username;
	//	this.initData();
	//}
    
  },

  methods: {
	refreshUserInfo() {
	    this.sendRequest({
	      url: "System.Member.memberInfo",
	      success: (res) => {
	        //this.userInfo = res.data;
	        this.ucoin=this.userInfo.coin;
	        this.uname=this.userInfo.username;
	      },
	    });
	  },
    toLogin() {
      uni.navigateTo({
        url: "/pages/login/login/login",
      });
    },
    initData() {
      this.isLogin = JSON.stringify(this.userInfo) == "{}";
    },
    toMoneyOptions(idx) {
      switch (idx) {
        case 0:
          uni.navigateTo({
            url: "/pages/member/recharge/recharge",
          });
          break;
        case 1:
          uni.navigateTo({
            url: "/pages/member/pickGoods/index/index",
          });
          break;
        // case 2:
        //   uni.navigateTo({
        //     url: "/pages/member/pickGoods/index/index",
        //   });
        //   break;

        default:
          break;
      }
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
.savemoney_btn{background: url(/static/images/2020/savemoney.png) no-repeat center center/cover;width: 62rpx;
			height: 62rpx;}
.withdraw_btn{background: url(/static/images/2020/withdrawmoney.png) no-repeat center center/cover;width: 62rpx;
			height: 62rpx;}
.merber-wrapper {
  padding: 0 20rpx;
  #merber-info {
    width: 100%;
    // height: 104rpx;
    padding: 15rpx;
    display: flex;
    background-color: #fff;
    box-sizing: border-box;
    .left {
      flex: 0 0 280rpx;
      padding: 5rpx 5rpx;
      .no-log {
        font-size: 24rpx;
        @extend .df;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        .tip1 {
          color: #5c5c66;
          font-size: 36rpx;
        }
        .tip {
          color: #a1a1b2;
          font-size: 22rpx;
        }
      }
      .login {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .username{
          color: #a1a1b2;
        }
        .money {
          align-items: center;
          display: flex;
          font-size: 36rpx;
          line-height: 36rpx;
          color:#5c5c66;
          .icon-bangzhu1 {
            color: gray;
            margin-left: 10rpx;
          }
        }
      }
    }
    .right {
      @extend .df;
      width: 100%;
      justify-content: flex-end;
      box-sizing: border-box;
      .right-item {
        @extend .df;
        flex-direction: column;
        width: 104rpx;
        height: 114rpx;
        //background: url("/static/newApp/home/5.png") no-repeat center;
        //background-size: contain;
        box-sizing: border-box;
        .item-icon {
          width: 64rpx;
          flex: 0 0 64rpx;
          //height: 64rpx;
          margin-bottom: 20rpx;
          //background-image: linear-gradient(-41deg, #ffc63f, #ffe6aa);

          @extend .df;
          //border-radius: 50%;
          .img {
            color: #fff;
            display: inline-block;
            width: 62rpx;
			height: 62rpx;
          }
        }
        .text {
          color: #1c1e22;
          font-size: 28rpx;
          line-height: 30rpx;
        }
      }
    }
  }
}
</style>