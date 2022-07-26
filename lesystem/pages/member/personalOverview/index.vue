<template>
  <view class="personal-overview">
    <TitleList
      :bgColor="bgColor"
      :titleList="titleList"
      @tabSelect="tabSelect"
    />
    <block v-if="gameTypeData[curSelectTitle].code == 'CPYX'">
      <view class="bill-time-selector top-top">
        <view class="bill-time">
          <date-time-hms
            class="bill-time-date"
            :select-time="start_select_time"
            :start-time-stamp="start_stamp1"
            :end-time-stamp="end_stamp1"
            @dateChange="dateChange1"
          >
          </date-time-hms>
          <icon class="iconfont icon-xiangxia" type=""></icon>
        </view>
        <view class="bill-time">
          <date-time-hms
            class="bill-time-date"
            :select-time="end_select_time"
            :start-time-stamp="start_stamp2"
            :end-time-stamp="end_stamp2"
            @dateChange="dateChange2"
          >
          </date-time-hms>
          <icon class="iconfont icon-xiangxia" type=""></icon>
        </view>
      </view>

      <view style="margin-bottom: 5rpx">
        <view class="cu-bar bg-white solid-bottom margin-top">
          <view class="action flex align-center">
            <text
              class="iconfont icon-dian text-bold"
              style="transform: scale(2); line-height: 0; color: #b62929"
            ></text>
            <text class="">个人详情</text>
          </view>
        </view>
      </view>

      <view class="main-body margin-bottom-xs">
        <view class="list">
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

      <view style="margin-bottom: 5rpx">
        <view class="cu-bar bg-white solid-bottom margin-top">
          <view class="action flex align-center">
            <text
              class="iconfont icon-dian text-bold"
              style="transform: scale(2); line-height: 0; color: #b62929"
            ></text>
            <text class=""
              >净盈利=中奖金额+打和返款+投注返点+代理返点+优惠+活动奖励-投注金额</text
            >
          </view>
        </view>
      </view>
    </block>
    <block v-if="gameTypeData[curSelectTitle].code == 'ZRSX'">
      <ZrsxOverview></ZrsxOverview>
    </block>
    <block v-if="gameTypeData[curSelectTitle].code == 'DZYX'">
      <DzyxOverview></DzyxOverview>
    </block>
    <block v-if="gameTypeData[curSelectTitle].code == 'TYJJ'">
      <TyssOverview></TyssOverview>
    </block>
    <block v-if="gameTypeData[curSelectTitle].code == 'QPYX'">
      <QpyxOverview></QpyxOverview>
    </block>
    <block v-if="gameTypeData[curSelectTitle].code == 'BYYX'">
      <ByyxOverview inittimes="00:00:00"></ByyxOverview>
    </block>
    <block v-if="gameTypeData[curSelectTitle].code == 'FBD'">
      <FbdOverview></FbdOverview>
    </block>
    <block v-if="gameTypeData[curSelectTitle].code == 'JJYX'">
      <JjyxOverview />
    </block>

  </view>
</template>

<script>
import http from "@/common/js/http.js";
import TitleList from "@/components/lesystem/TitleList";
import SquareList from "@/components/lesystem/SquareList";
import dateTimeHms from "@/components/date-time/date_time_hms";
import ZrsxOverview from "./zrsxOverview";
import DzyxOverview from "./dzyxOverview";
import TyssOverview from "./tyssOverview";
import QpyxOverview from "./qpyxOverview";
import ByyxOverview from "./byyxOverview";
import FbdOverview from "./fbdOverview";
import JjyxOverview from "./jjyxOverview";
export default {
  components: {
    TitleList,
    SquareList,
    dateTimeHms,
    ZrsxOverview,
    DzyxOverview,
    TyssOverview,
    QpyxOverview,
    ByyxOverview,
    FbdOverview,
    JjyxOverview
  },
  mixins: [http],
  data() {
    return {
      bgColor: "#f0f0f0",
      titleList: [],
      curSelectTitle: 0,
      personalSummaryList: [
        {
          code: "userMoney",
          name: "余额",
          val: "",
        },
        {
          code: "rechargeAmount",
          name: "充值",
          val: "",
        },
        {
          code: "withdrawAmount",
          name: "提现",
          val: "",
        },
        {
          code: "buyAmount",
          name: "投注金额",
          val: "",
        },
        {
          code: "winAmount",
          name: "中奖金额",
          val: "",
        },
        {
          code: "daheFankuan",
          name: "打和返款",
          val: "",
        },
        {
          code: "cpFandian",
          name: "投注返点",
          val: "",
        },
        {
          code: "agentFandian",
          name: "代理返点",
          val: "",
        },
        {
          code: "activityAmount",
          name: "优惠",
          val: "",
        },
        {
          code: "activityBonus",
          name: "活动奖励",
          val: "",
        },
        {
          code: "profit",
          name: "净盈利",
          val: "",
        },
      ],
      isshowcan: false,
      personalSummary: {},
      start_stamp1: 0,
      start_stamp2: 0,
      end_stamp1: 0,
      end_stamp2: 0,
      start_select_time: 0,
      end_select_time: 0,
      startTime: "", //作为参数传递到后端
      endTime: "", //作为参数传递到后端
      gameTypeData: [
        {
          code: "",
        },
      ],
    };
  },
  onLoad() {
    this.getAllGameCategory();
    let d = new Date();

    let y = d.getFullYear();
    let m = d.getMonth() + 1;
    m = m > 9 ? m : "0" + m;

    let d1 = d.getDate();
    d1 = d1 > 9 ? d1 : "0" + d1;
    let h = "00";

    let h2 = "23";

    let m1 = "00";
    let m2 = 59;
    let s = "00";

    let s2 = 59;

    this.startTime = y + "/" + m + "/" + d1 + " " + h + ":" + m1 + ":" + s;
    this.endTime = y + "/" + m + "/" + d1 + " " + h2 + ":" + m2 + ":" + s2;

    this.getMemberTotalReport();
  },

  mounted() {
    this.isshowcan = true;
  },

  methods: {
    tabSelect(val) {
      this.curSelectTitle = val;
    },
    getAllGameCategory() {
      this.sendRequest({
        url: "System.HomePage.getAllGameCategory",
        success: (res) => {
          if (res.code == 0) {
            this.gameTypeData = res.data;
            if (res.data.length) {
              this.titleList = [];
              res.data.forEach((item, index) => {
                this.titleList.push(item.name);
              });
            }
          }
        },
      });
    },
    // 对时间数字格式化（转变为 string 格式）
    timeFormat(i) {
      return i > 9 ? "" + i : "0" + i;
    },
    dateChange1(date) {
      console.log("-d1--", date);
      this.startTime =
        date[0] +
        "/" +
        date[1] +
        "/" +
        date[2] +
        " " +
        date[3] +
        ":" +
        date[4] +
        ":" +
        date[5];
      let year = date[0] - 0;
      let month = date[1] - 0;
      let day = date[2] - 0;
      let hour = date[3] - 0;
      let minute = date[4] - 0;
      let second = date[5] - 0;
      let t = `${date[0]}/${date[1]}/${date[2]} ${date[3]}:${date[4]}:${date[5]}`;
      this.start_select_time = new Date(t).getTime();
      if (this.start_select_time > this.end_select_time) {
        this.$util.showToast({
          title: "开始时间不能大于结束时间，请重新设置时间",
          duration: 3000,
        });
        return;
      }

      this.getMemberTotalReport();
    },
    dateChange2(date) {
      this.endTime =
        date[0] +
        "/" +
        date[1] +
        "/" +
        date[2] +
        " " +
        date[3] +
        ":" +
        date[4] +
        ":" +
        date[5];
      let year = date[0] - 0;
      let month = date[1] - 0;
      let day = date[2] - 0;
      let hour = date[3] - 0;
      let minute = date[4] - 0;
      let second = date[5] - 0;
      let t = `${date[0]}/${date[1]}/${date[2]} ${date[3]}:${date[4]}:${date[5]}`;
      this.end_select_time = new Date(t).getTime();

      if (this.start_select_time > this.end_select_time) {
        this.$util.showToast({
          title: "开始时间不能大于结束时间，请重新设置时间",
          duration: 3000,
        });

        return;
      }

      this.getMemberTotalReport();
    },
    getMemberTotalReport() {
      let date = new Date();
      let tomrrow_date_stamp = date.getTime() + 1000 * 60 * 60 * 24 * 1;
      let before35days_date_stamp = date.getTime() - 1000 * 60 * 60 * 24 * 36;
      let tomrrow_date = new Date(tomrrow_date_stamp);

      const year = this.timeFormat(date.getFullYear());
      const month = this.timeFormat(date.getMonth() + 1);
      const day = this.timeFormat(date.getDate());

      const tyear = this.timeFormat(tomrrow_date.getFullYear());
      const tmonth = this.timeFormat(tomrrow_date.getMonth() + 1);
      const tday = this.timeFormat(tomrrow_date.getDate());
      const hour = this.timeFormat(2);
      const minute = this.timeFormat(0);
      const second = this.timeFormat(0);
      this.start_stamp1 = before35days_date_stamp;
      this.start_stamp2 = before35days_date_stamp;
      this.end_stamp1 = tomrrow_date_stamp;
      this.end_stamp2 = tomrrow_date_stamp + 1000 * 60 * 60 * 24 * 1;

      // this.startTime = `${year}/${month}/${day} ${hour}:${minute}:${second}`;
      // this.endTime = `${tyear}/${tmonth}/${tday} ${hour}:${minute}:${second}`;

      //console.log(end_select_date_string);
      this.start_select_time = new Date(this.startTime).getTime();
      this.end_select_time = new Date(this.endTime).getTime();

      let d = {
        startTime: this.startTime,
        endTime: this.endTime,
        channelCode: "CPYX", //先写死了
      };

      this.sendRequest({
        url: "System.Member.getMemberTotalReport",
        data: d,
        success: (res) => {
          if (res.code == 0) {
            //if (res.data) {
            let result = res.data;
            for (let j = 0; j < this.personalSummaryList.length; j++) {
              let code = this.personalSummaryList[j].code;
              let val = result[code];
              this.personalSummaryList[j].val = val;
            }
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;

  .flex-item {
    margin-right: 4rpx;
    width: 244rpx;
    margin-bottom: 4rpx;
    flex-direction: column;

    .iconsize {
      font-size: 40rpx;
    }
  }
}

.list:after {
  content: " ";
  flex: auto;
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

.bill-time-selector {
  width: 750upx;
  height: 54px;
  padding: 2upx 10upx;
  box-sizing: border-box;
  color: #444;
  border-bottom: 1upx solid #eee;
  background-color: #fff;
  font-size: 15px;
  border-top: 1upx solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .bill-time {
    border-right: 1upx solid #eee;
    padding: 0 12upx;
    display: flex;
    align-items: center;
    width: 375rpx;

    .bill-time-date {
      width: 285upx;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .bill-btn {
    line-height: 60upx;
    padding: 0upx 25upx;
    border-radius: 14upx;
    border: 1upx solid #ddd;

    &:active {
      background-color: #ddd;
    }
  }

  .bill-search-icon {
    font-size: 48upx;
    color: #dc3639;
    font-weight: 600;
  }
}
</style>
