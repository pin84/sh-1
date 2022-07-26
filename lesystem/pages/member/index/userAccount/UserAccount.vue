<template>
  <view class="user-account">
    <ScreenBar
      :gameTypeData="gameTypeData"
      @changeStartTime="changeStartTime"
      @changeEndTime="changeEndTime"
      @changeGameType="changeGameType"
    />
    <AccountList :accountList="accountList" />
  </view>
</template>

<script>
import AccountList from "./AccountList";
import ScreenBar from "./ScreenBar";
import http from "common/js/http.js";
export default {
  data() {
    return {
      startTime: this.getTimeString("today"),
      endTime: this.getTimeString("tomorrow"),
      GameTypeCur: 0, //0
      gameTypeData: [], //游戏种类信息
      accountList: {}, //细目表
    };
  },
  created() {
    this.init();
  },
  components: {
    AccountList,
    ScreenBar,
  },
  methods: {
    init() {
      //初始化
      let postData = this.setRequestData();
      this.requestData("System.HomePage.getAllGameCategory", {}, (res) => {
        this.gameTypeData = res.data;
      });

      //初始化彩票游戏
      this.requestData("System.Report.cpIndividualReport", postData, (res) => {
        console.log("-accountList-", res.data);
        this.accountList = res.data;
      });
    },
    getTimeString(type) {
      //today, tomorrow
      let self = this;
      if (type == "today") {
        let date = new Date();
        let y = date.getFullYear();
        let m = self.prefixZero(date.getMonth() + 1, 2);
        let d = self.prefixZero(date.getDate(), 2);
        return y + "-" + m + "-" + d + " " + "02:00:00";
      } else if (type == "tomorrow") {
        let tStamp = new Date().getTime();
        tStamp += 3600 * 24 * 1000;
        let date = new Date(tStamp);
        let y = date.getFullYear();
        let m = self.prefixZero(date.getMonth() + 1, 2);
        let d = self.prefixZero(date.getDate(), 2);
        return y + "-" + m + "-" + d + " " + "02:00:00";
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
    changeStartTime(time) {
      this.startTime = time;
      let postData = this.setRequestData();
      this.requestList(postData);
    },
    changeEndTime(time) {
      this.endTime = time;
      let postData = this.setRequestData();
      this.requestList(postData);
    },
    changeGameType(index) {
      //更换游戏种类选项
      this.GameTypeCur = index;
      console.log(this.gameTypeData);
      

      if (this.gameTypeData[index].code == "ZRSX") {
        setTimeout(function () {
          uni.redirectTo({
            url: "/pages/member/index/ZrsxUserAccount/UserAccount",
          });
        }, 280);
      } else if (this.gameTypeData[index].code == "CPYX") {
        setTimeout(function () {
          uni.redirectTo({
            url: "/pages/member/index/userAccount/UserAccount",
          });
        }, 280);
      } else if (this.gameTypeData[index].code == "DZYX") {
        setTimeout(function () {
          uni.redirectTo({
            url: "/pages/member/index/DzyxUserAccount/UserAccount",
          });
        }, 280);
      } else if (this.gameTypeData[index].code == "TYJJ") {
        setTimeout(function () {
          uni.redirectTo({
            url: "/pages/member/index/TyssUserAccount/UserAccount",
          });
        }, 280);
      } else if (this.gameTypeData[index].code == "QPYX") {
        setTimeout(function () {
          uni.redirectTo({
            url: "/pages/member/index/QpyxUserAccount/UserAccount",
          });
        }, 280);
      } else if (this.gameTypeData[index].code == "BYYX") {
        setTimeout(function () {
          uni.redirectTo({
            url: "/pages/member/index/ByyxUserAccount/UserAccount",
          });
        }, 280);
      } else if (this.gameTypeData[index].code == "FBD") {
        setTimeout(function () {
          uni.redirectTo({
            url: "/pages/member/index/FbdUserAccount/UserAccount",
          });
        }, 280);
      } else if (this.gameTypeData[index].code == "JJYX") {
        setTimeout(function () {
          uni.redirectTo({
            url: "/pages/member/index/JjyxUserAccount/UserAccount",
          });
        }, 280);
      }
    },
    setRequestData() {
      //生成发送数据
      let postData = {};
      postData.startTime = this.startTime;
      postData.endTime = this.endTime;
      return postData;
    },
    requestList(data, callback) {
      let postData = this.setRequestData();
      this.requestData("System.Report.cpIndividualReport", postData, (res) => {
        this.accountList = res.data;
        if (typeof callback == "function") callback(res);
      });
    },
    requestData(url, data, callback, failCallback) {
      uni.showLoading({
        title: "加载中...",
      });
      this.sendRequest({
        //游戏订单请求
        url: url,
        data: data,
        success: (res) => {
          if (res.code == 0) {
            //成功返回
            if (callback) callback(res);
          } else {
            this.$util.showToast({
              title: res.message,
            });
          }
        },
        fail: () => {
          if (failCallback) {
            failCallback();
          }
        },
        complete: () => {
          uni.hideLoading();
        },
      });
    },
  },
  mixins: [http],
};
</script>

<style lang="scss" scoped>
</style>
