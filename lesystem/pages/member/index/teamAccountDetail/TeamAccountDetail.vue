<template>
  <view class="team-account-detail">
    <ScreenBar
      :gameTypeData="gameTypeData"
      :startTime="startTime"
      :endTime="endTime"
      @changeStartTime="changeStartTime"
      @changeEndTime="changeEndTime"
      @changeGameType="changeGameType"
    />
    <AccountList
      v-if="accountList.agentList"
      :accountList="accountList"
      :page="page"
      :pageCount="pageCount"
      @showMore="showMore"
      @showLower='showLower'
    />
  </view>
</template>

<script>
import http from "common/js/http.js";
import AccountList from "./AccountList";
import ScreenBar from "./ScreenBar";
export default {
  created() {
    this.init();
  },
  data() {
    return {
      startTime: "",
      endTime: "",
      accountName: "",
      types: "",
      GameTypeCur: 0, //默认当前选择第一个
      page: 1,
      pageCount: 1,
      gameTypeData: [], //游戏种类信息
      accountList: {}, //细目表
      uid: null,
    };
  },
  components: {
    AccountList,
    ScreenBar,
  },
  methods: {
    showLower(obj) {
      let { uid } = obj;
      this.uid = uid;
      this.requestDetaiList();
    },
    init(uid) {
      this.requestData("System.HomePage.getAllGameCategory", {}, (res) => {
        this.gameTypeData = res.data;
      });

      //账目表
      let postData = uni.getStorageSync("teamPostData");
      if (postData) {
        this.startTime = postData.startTime;
        this.endTime = postData.endTime;
        this.accountName = postData.accountName;
        this.types = postData.types;

        this.requestData("System.Agent.getNewTeamReport", postData, (res) => {
          this.accountList = res.data;
          this.page_count = res.data.agentList.page_count;
        });
        uni.removeStorage("teamPostData"); //清除存储数据
      }
    },
    showMore() {
      if (this.page < this.page_count) {
        this.page += 1;
        let postData = this.postData();
        this.requestData("System.Agent.getNewTeamReport", postData, (res) => {
          this.accountList.agentList.list.push(...res.data.agentList.list);
        });
      }
    },
    changeStartTime(value) {
      this.startTime = value;
      this.requestDetaiList();
    },
    changeEndTime(value) {
      this.endTime = value;
      this.requestDetaiList();
    },
    changeGameType(index) {
      //游戏分类
      this.GameTypeCur = index;
      if (this.gameTypeData[index].code == "ZRSX") {
        setTimeout(function () {
          uni.redirectTo({
            url: "/pages/member/index/ZrsxTeamAccountDetail/TeamAccountDetail",
          });
        }, 280);
      } else if (this.gameTypeData[index].code == "CPYX") {
        setTimeout(function () {
          uni.redirectTo({
            url: "/pages/member/index/teamAccountDetail/TeamAccountDetail",
          });
        }, 280);
      } else if (this.gameTypeData[index].code == "DZYX") {
        setTimeout(function () {
          uni.redirectTo({
            url: "/pages/member/index/DzyxTeamAccountDetail/TeamAccountDetail",
          });
        }, 280);
      } else if (this.gameTypeData[index].code == "TYJJ") {
        setTimeout(function () {
          uni.navigateTo({
            url: "/pages/member/index/TyssTeamAccountDetail/TeamAccountDetail",
          });
        }, 280);
      } else if (this.gameTypeData[index].code == "QPYX") {
        setTimeout(function () {
          uni.navigateTo({
            url: "/pages/member/index/QpyxTeamAccountDetail/TeamAccountDetail",
          });
        }, 280);
      } else if (this.gameTypeData[index].code == "BYYX") {
        setTimeout(function () {
          uni.navigateTo({
            url: "/pages/member/index/ByyxTeamAccountDetail/TeamAccountDetail",
          });
        }, 280);
      } else if (this.gameTypeData[index].code == "FBD") {
        setTimeout(function () {
          uni.navigateTo({
            url: "/pages/member/index/FbdTeamAccountDetail/TeamAccountDetail",
          });
        }, 280);
      }
    },
    setRequestData() {
      //生成发送数据
      let postData = {};
      postData.startTime = this.startTime;
      postData.endTime = this.endTime;
      postData.accountName = this.accountName;
      postData.types = this.types;
      postData.page = this.page;
      return postData;
    },
    requestDetaiList() {
      //重新请求数据，page重置为1
      let postData = this.setRequestData();
      postData.page = 1;
      if (this.uid) {
        postData["accountID"] = this.uid;
      }
      this.requestData("System.Agent.getNewTeamReport", postData, (res) => {
        this.accountList = res.data;
        this.page = 1;
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
.team-account-detail {
}
</style>
