<template>
  <view class="user-account">
    <ScreenBar
      :gameTypeData="gameTypeData"
      @changeStartTime="changeStartTime"
      @changeEndTime="changeEndTime"
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
      accountList: [], //细目表
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
   async init() {
      let d = {
        url:this.$api.getWithdrawList,
        data:{
          page:1,
          startTime:this.startTime,
          endTime:this.endTime
        }
      }
      let res = await this.$http(d)

      console.log(res);
      this.accountList = res.data.list.list

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
      this.init()
    },
    changeEndTime(time) {
      this.endTime = time;
       this.init()
    },
  },
  mixins: [http],
};
</script>

<style lang="scss" scoped>
</style>
