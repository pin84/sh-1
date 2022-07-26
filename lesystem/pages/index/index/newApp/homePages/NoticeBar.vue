<template>
  <view id="notice-bar">
    <i class="iconfont icon-soundon"></i>
    <view class="text">
      <!-- <view id="notice-bar-text">{{note}}</view> -->
      <view id="notice-bar-text"
        >{{note}}</view
      >
    </view>
    <!-- <view class="hot-game"></view> -->
  </view>
</template>
<script>
export default {
  props:{
    text:{
      type:String,
      default:()=>'尊敬的客户：交个朋友 官方让利！邀请好友活动回归！三大活动与您共享！快来与好友一起领取吧！详情请点击优惠页面查看~ 尊敬的客户：为了您的资金安全，防止资料外泄，请勿将个人账户密码提供给以亚博名义自称的工作人员，谨防上当受骗。如有任何问题，请您联系7*24小时在线客服~ 尊敬的客户：体育投注界面直播动画仅供参考，下注时请以当前盘口实时比分为准。感谢您的理解与支持！'
    }
  },
  data() {
    return {
      note: "尊敬的客户：交个朋友 官方让利！邀请好友活动回归！三大活动与您共享！快来与好友一起领取吧！详情请点击优惠页面查看~ 尊敬的客户：为了您的资金安全，防止资料外泄，请勿将个人账户密码提供给以亚博名义自称的工作人员，谨防上当受骗。如有任何问题，请您联系7*24小时在线客服~ 尊敬的客户：体育投注界面直播动画仅供参考，下注时请以当前盘口实时比分为准。感谢您的理解与支持！",
    };
  },
  created(){
    this.initData()
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initData(){

    },  
    initPage() {
      let timer = null;
      let Deg = 0;
      var _requestAnimationFrame_ =
        window.requestAnimationFrame || window.webkitRequestAnimationFrame;
      let angleDiv = document.querySelector("#notice-bar-text");
      let distance = angleDiv.scrollWidth;
      cancelAnimationFrame(timer);
      let fn = () => {
        timer = _requestAnimationFrame_(fn);
        if (Deg < distance) {
          Deg++;
        } else {
          Deg = 0;
          cancelAnimationFrame(timer);
        }
        angleDiv.style.transform = `translateX(-${Deg}px)`;
        // angleDiv.style.WebkitTransform = `rotateZ(${Deg}deg) translateZ(0)`;
      };
      timer = _requestAnimationFrame_(fn);
    },
  },
};
</script>

<style lang="scss" scoped>
#notice-bar {
  width: 100%;
  height: 36rpx;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  margin: 10rpx 0;
  .text {
    overflow: hidden;
    margin: 0 10rpx;
    #notice-bar-text {
      white-space: nowrap;
      font-size: 24rpx;
      height: 36rpx;
      line-height: 36rpx;
      color: #6c7ba8;
      transform: translateX(0px);
    }
  }
  .iconfont {
    display: inline-block;
    flex: 0 0 20rpx;
    color: #3d72fa;
  }
  .hot-game {
    flex: 0 0 120rpx;
    height: 100%;
    background: url("/static/newApp/home/notebar.png") no-repeat center center;
    background-size: contain;
  }
}
</style>