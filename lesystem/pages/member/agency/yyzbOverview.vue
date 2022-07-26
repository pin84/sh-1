<template>
  <view>
    <ScreenBar
      ref="ScreenBar"
      inittimes="00:00:00"
      @changeStartTime="changeStartTime"
      @changeEndTime="changeEndTime"
    ></ScreenBar>
    <view class="username-search-box">
      <input
        v-model="username"
        type="text"
        placeholder="请输入用户名搜索"
        class="input"
      />
      <span class="btn" @click="searchByUsername">搜索</span>
    </view>
    <view style="margin-bottom: 5rpx">
      <view class="cu-bar bg-white solid-bottom margin-top">
        <view class="action flex align-center">
          <text
            class="iconfont icon-dian text-bold"
            style="transform: scale(2); line-height: 0; color: #b62929"
          ></text>
          <text class="">团队详情</text>
        </view>
      </view>
    </view>

    <view class="main-body margin-bottom-xs">
      <view class="list" v-if="personalSummaryList">
        <view
          class="flex-item bg-white flex text-center padding"
          v-for="(item, index) in personalSummaryList"
          :key="index"
        >
          <view class="text-bold text-orange"
            ><span class="text-lg">{{ item.val }}</span></view
          >
          <view>
            <text class="text-lg">{{ item.name }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- <view style="margin-bottom: 5rpx">
      <view class="cu-bar bg-white solid-bottom margin-top">
        <view class="action flex align-center">
          <text
            class="iconfont icon-dian text-bold"
            style="transform: scale(2); line-height: 0; color: #b62929"
          ></text>
          <text class="text-red">净盈利=中奖金额-投注金额</text>
        </view>
      </view>
    </view> -->
  </view>
</template>

<script>
import http from "@/common/js/http.js";
import ScreenBar from "./ScreenBar";
export default {
  mixins: [http],
  data() {
    return {
      username: "",
      personalSummaryList: [
        {
          code: "totalCount",
          name: "团队人数",
          val: "",
        },
        {
          code: "totalRegisterCount",
          name: "注册人数",
          val: "",
        },
        {
          code: "totalBalance",
          name: "余额",
          val: "",
        },
        {
          code: "totalDepositAmount",
          name: "充值",
          val: "",
        },

        {
          code: "totalEncashment",
          name: "提现",
          val: "",
        },
        {
          code: "cpWinLossAmount",
          name: "彩票盈亏",
          val: "",
        },
        {
          code: "electroniceWinLossAmount",
          name: "电子盈亏",
          val: "",
        },
        {
          code: "liveWinLossAmount",
          name: "视讯盈亏",
          val: "",
        },
        {
          code: "chessCardWinLossAmount",
          name: "棋牌盈亏",
          val: "",
        },
        {
          code: "fbdWinLossAmount",
          name: "反波胆盈亏",
          val: "",
        },
        {
          code: "fishWinLossAmount",
          name: "捕鱼盈亏",
          val: "",
        },
        {
          code: "sportsWinLossAmount",
          name: "体育盈亏",
          val: "",
        },
        {
          code: "arcadeWinLossAmount",
          name: "街机盈亏",
          val: "",
        },
        {
          code: "totalWinLossAmount",
          name: "总盈亏",
          val: "",
        },
      ],
      startTime: this.getTimeString("start"),
      endTime: this.getTimeString("end"),
    };
  },
  components: {
    ScreenBar,
  },

  methods: {
    searchByUsername() {
   
      this.getZrsxOverviewList();
    },
    getTimeString(type) {
      //start, end
      if (type == "start") {
        let date = new Date();
        let y = date.getFullYear();
        let m = this.prefixZero(date.getMonth() + 1, 2);
        let d = this.prefixZero(date.getDate(), 2);
        return y + "-" + m + "-" + d + " " + "00:00:00";
      } else if (type == "end") {
        let date = new Date();
        let y = date.getFullYear();
        let m = this.prefixZero(date.getMonth() + 1, 2);
        let d = this.prefixZero(date.getDate(), 2);
        return y + "-" + m + "-" + d + " " + "23:59:59";
      }
    },
    prefixZero(value, len) {
      //前置补充0
      if (value.toString().length >= len) {
        //不用补0
        return value;
      }
      if (Number.isInteger(value)) {
        let str = "";
        for (let i = 0; i < len - 1; i++) {
          str += "0";
        }
        return str + value;
      }
    },
    changeStartTime(value) {
      this.startTime = value;
 
      this.getZrsxOverviewList();
    },
    changeEndTime(value) {
      this.endTime = value;

      this.getZrsxOverviewList();
    },

    getZrsxOverviewList() {
      let self = this;
      let d = {
        startTime: self.startTime,
        endTime: self.endTime,
        username: self.username,
      };
      self.sendRequest({
        url: "System.Agent.TeamReportInfo",
        data: d,
        success: (res) => {
          if (res.code == 0) {
            // let result = res.data.listReport;
            // console.log(result)
            let _result = res.data.profit;
            let _total = {
              totalBalance: res.data.totalBalance,
              totalCount: res.data.totalCount,
              totalDepositAmount: res.data.totalDepositAmount,
              totalEncashment: res.data.totalEncashment,
              totalRegisterCount: res.data.totalRegisterCount,
            };
            // result.forEach((item) => {
            //   if (item.type == 9) {
            //     //等于为街机游戏
            //     _result = item.reportModel;
            //     console.log(_result);
            //   }
            // });
            let newresult = Object.assign(_total, _result);
            for (let j = 0; j < self.personalSummaryList.length; j++) {
              let code = self.personalSummaryList[j].code;
              let value = newresult[code];
              self.personalSummaryList[j].val = value;
            }
          } else {
            this.$util.showConfirm({
              content: res.message,
              showCancel: false,
            });
          }
        },
      });
    },
  },
  created() {
    this.getZrsxOverviewList();
  },
};
</script>

<style lang="scss" scoped>
.username-search-box {
  display: flex;
  .input {
    border: 1px solid #eee;
    border-right: 0;
    height: 60rpx;
    box-sizing: border-box;
    width: 100%;
    padding-left: 10rpx;
    font-size: 24rpx;
  }
  .btn {
    background-color: #f37b1d;
    padding: 0 10px;
    color: #fff;
    flex: 0 0 120rpx;
    font-size: 24rpx;
    text-align: center;
    height: 60rpx;
    line-height: 60rpx;
    // border-radius: 0  8rpx 8rpx 0;
  }
}
.list {
  display: flex;
  flex-wrap: wrap;

  .flex-item {
    margin-right: 4rpx;
    width: calc(33.3% - 4rpx);
    margin-bottom: 4rpx;
    flex-direction: column;
    border-left: 1px solid #eee;
    border-bottom: 1px solid #eee;
    .iconsize {
      font-size: 40rpx;
    }
  }
}

.personal-overview {
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;

  .main-body {
    border: 1px solid #cdc9c9;
    height: 100%;
  }
}
</style>
