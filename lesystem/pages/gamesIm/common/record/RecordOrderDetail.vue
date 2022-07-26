<template>
  <view class="order-detail padding">
    <view class="header flex align-center">
      <view
        ><image
          style="width: 80px; height: 80px"
          mode="aspectFit"
          :src="mobileIconUrl"
        ></image
      ></view>

      <view class="flex flex-direction" style="margin: 0 20rpx">
        <text class="text-xl">{{ gameName }}</text>
        <text class="text-lg text-gray">{{ pid }}</text>
      </view>

      <view>
        <text class="text-blue text-xl">{{ status }}</text>
      </view>
    </view>
    <view>
      <view
        class="cu-form-group margin-top"
        v-for="(item, index) in list"
        :key="index"
      >
        <view class="title margin-right-sm" style="width: 180rpx">{{
          item.name
        }}</view>
        <view class="title" :class="{ 'text-red': item.name === '赔率' }">{{
          item[item.key]
        }}</view>
      </view>
    </view>

    <view class="my-re cu-form-group"><view class="title">我的投注</view></view>
    <view class="result">
      <view class="result-text">
        <view>{{ playname }}</view>
        <hr />
        <view class="result-content">
          <text>{{ myData }}</text>
        </view>
      </view>
    </view>

    <view class="margin-top-sm">
      <view>资金计算说明：</view>
      <view class="margin-top-sm">
        非常规时时彩中奖后，根据中奖号码球号的奖金组，中奖奖金需要乘以球号的奖金组，如：
        1、北京时时彩后三直选（1800奖金组）：下注321，开奖号码54321，其中3号球的奖金组为：1.014，2号球的奖金组为：0.984，1号球的奖金组为1.022；那么中奖后的实际奖金=1800*1.014*0.984*1.022=1835.509
        2、若北京时时彩后三直选（1800奖金组）：下注246，开奖号码54246，其中2号球的奖金组为：0.984，4号球的奖金组为：0.976，6号球的奖金组为0.98；那么中奖后的实际奖金=1800*0.984*0.976*0.98=1694.117
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      mobileIconUrl: "",
      playname: "",
      myData: "",
      pid: 0,
      status: "",
      gameName: "",
      list: [
        { key: "orderTime", name: "投注时间" },
        { key: "orderNo", name: "投注单号" },
        { key: "username", name: "用户名" },
        { key: "zhushu", name: "投注注数" },
        { key: "fandian", name: "动态返点" },
        { key: "mode", name: "倍数模式" },
        { key: "amount", name: "投注金额" },
        { key: "bonus", name: "派奖奖金" },
        { key: "peilv", name: "赔率" },
        { key: "data", name: "开奖号码" },
      ],
    };
  },
  onShow() {
    this.initData();
  },
  methods: {
    async initData() {
		uni.showLoading({
			title: '加载中...'
		});
      let routes = getCurrentPages();
      let { orderId, pid, status, id, gameType, gameName } = routes[
        routes.length - 1
      ].options;

      id = Number(id);

      if (!orderId || !pid || !status) {
        this.$util.showToast({ title: "缺少必要参数。" });
        uni.reLaunch({
          url: `/`,
        });
		uni.hideLoading();
        return;
      }
      this.pid = pid;
      this.status = status;

      let res1 = await this.$http({
        url: "System.HomePage.getCpGameList",
      });
	  uni.hideLoading();
      let arr = res1.data[gameType].gameCateList;
      for (let obj of arr) {
        for (let item of obj.gameInfoList) {
          if (item.gameId == id) {
            let { mobileIconUrl } = item;
            this.mobileIconUrl = mobileIconUrl;
            break;
          }
        }
      }
      this.gameName = gameName;

      let obj = {
        url: this.$api.getOrderDetail,
        data: {
          gameId: id,
          orderId,
        },
      };

      let res = await this.$http(obj);

      let { data } = res;
      let { playname, myData } = data;
      this.playname = playname;
      this.myData = myData;

      if (res.code === "-9999") {
        return this.$util.showToast({ title: res.message });
      }

      this.list.forEach((item) => {
        item[item.key] = data[item.key];
      });
      this.list.push({});
      this.list.pop();
    },
  },
};
</script>

<style lang="scss" scoped>
.order-detail {
  background-color: #fff;
  .header {
    border-bottom: 1px solid gray;
  }
  .cu-form-group {
    background-color: transparent;
    color: black;
    font-weight: 600;
    justify-content: flex-start;
    border-top: none;
    border-bottom: 1px solid #ccc;
  }
  .my-re {
    margin-top: 20rpx;
    border-bottom: none;
    min-height: 0;
  }
  .result {
    width: 100%;
    height: 280rpx;
    background: url("@/static/images/order-detail.png") no-repeat center;
    background-size: contain;
    display: flex;
    justify-content: center;
    align-items: center;
    .result-text {
      background-color: #fff;
      width: 82%;
      height: 180rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .result-content {
        width: 100%;
        word-break: break-all;
      }
    }
  }
}
</style>
