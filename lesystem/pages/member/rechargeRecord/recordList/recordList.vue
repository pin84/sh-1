<template>
  <view class="record-list">
    <uni-nav-bar
      :status-bar="true"
      color="#ffffff"
      backgroundColor="#2e2e2e"
      @clickLeft="clickLeft"
      left-icon="back"
    >
      <view class="text-center" style="width: 80%">
        <view class="cu-capsule radius nav-tab padding-xm">
          <view
            class="cu-tag"
            :class="typeCur == 0 ? 'bg-white text-red' : 'line-white'"
            @tap="changeTab(0)"
          >
            充值记录
          </view>
          <view
            class="cu-tag"
            :class="typeCur == 1 ? 'bg-white text-red' : 'line-white'"
            @tap="changeTab(1)"
          >
            提现记录
          </view>
        </view>
      </view>
    </uni-nav-bar>

    <swiper
      :current="typeCur"
      class="swiper-box"
      style="flex: 1"
      :duration="200"
      @change="ontabchange"
    >
      <swiper-item>
        <view class="position-relative">
          <ScreenBar
            @filterTap="filterTap"
            @changeTime="changeTime"
            ref="screenBar0"
            @filterSubmit="filterSubmit"
          />
          <FilterPanel
            v-show="filterPanelShow0"
            :filterType="typeCur"
            :isAgent="isAgnet"
            ref="filter0"
          />
        </view>
        <RechargeList
          v-if="rechargeList"
          :rechargeList="rechargeList"
          :page="rechargePage"
          :pageCount="rechargePageCount"
          @showMore="showMoreList"
        />
      </swiper-item>
      <swiper-item>
        <view class="position-relative">
          <ScreenBar
            @filterTap="filterTap"
            @changeTime="changeTime"
            ref="screenBar1"
            @filterSubmit="filterSubmit"
          />
          <FilterPanel
            v-show="filterPanelShow1"
            :filterType="typeCur"
            :isAgent="isAgnet"
            ref="filter1"
          />
        </view>
        <WithdrawList
          v-if="withdrawList"
          :withdrawList="withdrawList"
          :page="withdrawPage"
          :pageCount="withdrawPageCount"
          @showMore="showMoreList"
        />
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import http from "common/js/http.js";
import ScreenBar from "./ScreenBar";
import FilterPanel from "./FilterPanel";
import RechargeList from "./RechargeList";
import WithdrawList from "./WithdrawList";
export default {
  components: {
    ScreenBar,
    FilterPanel,
    RechargeList,
    WithdrawList,
  },
  created() {
    this.init();
  },
  data() {
    return {
      typeCur: 0, //0代表充值记录，1代表提现记录
      userInfo: "",
      isAgnet: false,
      filterPanelShow0: false,
      rechargePage: 1,
      rechargePageCount: 0,
      rechargeList: null,

      filterPanelShow1: false,
      withdrawPage: 1,
      withdrawPageCount: 0,
      withdrawList: null,
    };
  },
  methods: {
    init() {
      //用户信息
      this.requestData("System.Member.memberInfo", {}, (res) => {
        this.userInfo = res.data;
        console.log(this.userInfo.hierarchy);
        if (
          this.userInfo.hierarchy != undefined &&
          this.userInfo.hierarchy > 0
        ) {
          this.isAgnet = true;
        }
      });

      //充值记录
      this.requestData("System.Recharge.getRechargeList", {}, (res) => {
        this.rechargeList = res.data;
        this.rechargePageCount = res.data.page_count;
      });
    },
    clickLeft() {
      uni.navigateBack();
    },
    clickRight() {},
    changeTab(num) {
      //切换tab页
      this.typeCur = num;
      if (num == 1 && !this.withdrawList) {
        //提现记录请求数据
        //提现记录
        let postData = this.setRequestData();
        this.requestData(
          "System.Withdraw.getAgentWithdrawList",
          postData,
          (res) => {
            this.withdrawList = res.data;
            console.log(res.data);
            this.withdrawPageCount = res.data.page_count;
          }
        );
      }
    },
    ontabchange(e) {
      this.changeTab(e.detail.current);
    },
    filterTap() {
      //显示筛选面板
      let typeCur = this.typeCur;
      let key = "filterPanelShow" + typeCur;
      let value = this[key];
      this[key] = !value;
    },
    changeTime() {
      let postData = this.setRequestData();
      if (this.typeCur == 0) {
        this.rechargePage = 1;
        this.requestData("System.Recharge.getRechargeList", postData, (res) => {
          //充值记录
          this.rechargeList = res.data;
          this.rechargePageCount = res.data.page_count;
        });
      } else if (this.typeCur == 1) {
        this.withdrawPage = 1;
        this.requestData(
          "System.Withdraw.getAgentWithdrawList",
          postData,
          (res) => {
            //提现记录
            this.withdrawList = res.data;
            this.withdrawPageCount = res.data.page_count;
          }
        );
      }
    },
    filterSubmit() {
      //筛选点击搜索按钮
      let typeCur = this.typeCur;
      if (typeCur == 0) {
        this.rechargePage = 1;
        let postData = this.setRequestData();
        this.requestData("System.Recharge.getRechargeList", postData, (res) => {
          //充值记录
          this.rechargeList = res.data;
          this.rechargePageCount = res.data.page_count;
          this.filterPanelShow0 = false;
        });
      } else if (this.typeCur == 1) {
        this.withdrawPage = 1;
        let postData = this.setRequestData();
        this.requestData(
          "System.Withdraw.getAgentWithdrawList",
          postData,
          (res) => {
            //提现记录
            this.withdrawList = res.data;
            this.withdrawPageCount = res.data.page_count;
            this.filterPanelShow1 = false;
          }
        );
      }
    },
    showMoreList() {
      //显示更多
      let typeCur = this.typeCur;
      if (typeCur == 0) {
        this.rechargePage++;
        let postData = this.setRequestData();
        this.requestData("System.Recharge.getRechargeList", postData, (res) => {
          //充值记录
          this.rechargeList.list.push(...res.data.list);
          this.rechargeList.page_total = this.mergePageTotal(
            this.rechargeList.page_total,
            res.data.page_total
          );
          this.rechargeList.total = res.data.total;
        });
      } else if (this.typeCur == 1) {
        this.withdrawPage++;
        let postData = this.setRequestData();
        this.requestData(
          "System.Withdraw.getAgentWithdrawList",
          postData,
          (res) => {
            //提现记录
            this.withdrawList.list.push(...res.data.list);
            this.withdrawList.pageInfo = this.mergePageTotal(
              this.withdrawList.pageInfo,
              res.data.pageInfo
            );
            this.withdrawList.totalInfo = res.data.totalInfo;
          }
        );
      }
    },
    mergePageTotal(oldPageTotal, newPageTotal) {
      //小计合并
      let newObj = {};
      for (let i in oldPageTotal) {
        let oldValue = oldPageTotal[i] - 0;
        let newValue = newPageTotal[i] - 0;
        newObj[i] = oldValue + newValue;
      }
      return newObj;
    },
    setRequestData() {
      //生成发送数据
      let postData = {};
      if (this.typeCur == 0) {
        let time = this.$refs.screenBar0.getTime();
        let filterData = this.$refs.filter0.getFilterData();
        postData = {
          ...time,
          ...filterData,
        };
        postData.page = this.rechargePage;
      } else if (this.typeCur == 1) {
        let time = this.$refs.screenBar1.getTime();
        let filterData = this.$refs.filter1.getFilterData();
        postData = {
          ...time,
          ...filterData,
        };
        postData.page = this.withdrawPage;
      }
      return postData;
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
.record-list {
  // height: 100vh;
  // background-color: white;
  .swiper-box {
    height: calc(100vh - 44px - var(--status-bar-height) - var(--window-top));
  }
  .nav-tab {
    margin-left: -6rpx;
  }
}
</style>
