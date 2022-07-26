<template>
  <view class="game-record">
    <scroll-view scroll-x class="bg-white nav">
      <view class="flex text-center">
        <view
          class="cu-item flex-sub bg-gray"
          :class="index == TabCur ? 'text-orange cur' : ''"
          v-for="(item, index) in gameType"
          :key="index"
          @tap="tabSelect(item, $event)"
          :data-id="index"
        >
          {{ item.name }}
        </view>
      </view>
    </scroll-view>
    <view v-if="curPlatform == 'CPYX'">
      <view class="position-relative">
        <ScreenBar
          @filterTap="filterTap"
          @tapCancelButton="tapCancelButton"
          @changeStartTime="changeStartTime"
          @changeEndTime="changeEndTime"
          :ShowCancelButton="true"
        />
        <FilterPanel
          v-show="filterPanelShow"
          :listDropItems="listDropItems"
          @submit="searchSubmit"
          @showInfoList="showInfoList"
        />
      </view>

      <view v-show="!cancelStatus">
        <TitleList :titleList="titleList" @tabSelect="tabSelectTitle" />
      </view>
      <OrderTable
        :data="cancelStatus ? cancelList : orderList"
        :page="cancelStatus ? cancelPage : page"
        :pageCount="cancelStatus ? cancelPageCount : pageCount"
        @showMore="showMore"
        @cancelOrder="cancelOrder"
        ref="orderComp"
      />
    </view>
    <view v-if="curPlatform == 'ZRSX'">
      <ZrsxGame></ZrsxGame>
    </view>
    <view v-if="curPlatform == 'DZYX'">
      <DzyxGame></DzyxGame>
    </view>
    <view v-if="curPlatform == 'TYJJ'">
      <TyssGame></TyssGame>
    </view>
    <view v-if="curPlatform == 'QPYX'">
      <QpyxGame></QpyxGame>
    </view>
    <view v-if="curPlatform == 'FBD'">
      <FbdGame></FbdGame>
    </view>
    <view v-if="curPlatform == 'BYYX'">
      <ByyxGame></ByyxGame>
    </view>
    <view v-if="curPlatform == 'JJYX'">
      <JjyxGame />
    </view>
  </view>
</template>

<script>
import http from "common/js/http.js";
import ScreenBar from "./ScreenBar";
import TitleList from "@/components/lesystem/TitleList.vue";
import FilterPanel from "./FilterPanel.vue";
import OrderTable from "./OrderTable";
import ZrsxGame from "./ZrsxGame";
import DzyxGame from "./DzyxGame";
import TyssGame from "./TyssGame";
import QpyxGame from "./QpyxGame";
import ByyxGame from "./ByyxGame";
import FbdGame from "./FbdGame";
import JjyxGame from "./JjyxGame";
export default {
  data() {
    return {
      TabCur: 0,
      gameType: [],
      filterPanelShow: false,
      startTime: "",
      endTime: "",
      page: 1, //非取消订单状态页标记录
      pageCount: 0,
      cancelPage: 1, //取消订单页标记录
      cancelPageCount: 0,
      filterData: {}, //筛选数据记录
      listDropItems: [], //彩种信息
      orderList: [], //订单信息
      cancelList: [], //撤单信息
      titleList: ["全部", "未开奖", "已中奖", "未中奖"],
      titleSelected: 0,
      titleStatus: [-1, 1, 3, 2],
      cancelStatus: false, //点击撤单时不显示
      // add by guxy
      curPlatform: "CPYX",
    };
  },
  components: {
    ScreenBar,
    TitleList,
    FilterPanel,
    OrderTable,
    ZrsxGame,
    DzyxGame,
    TyssGame,
    QpyxGame,
    ByyxGame,
    FbdGame,
    JjyxGame,
  },
  created() {
    this.initData();
  },
  mounted() {},
  computed: {
    userId() {
      let cur_user = uni.getStorageSync("userInfo");
      return cur_user.uid;
    },
  },
  methods: {
    initData() {
      //初始化数据
      this.requestData("System.HomePage.getAllGameCategory", {}, (res) => {
        //游戏种类请求
        this.gameType = res.data;
        console.log(this.gameType);
      });

      //请求订单
      let postData = this.setPostData();
      this.requestOrderList("System.Report.getOrderList", postData);
    },
    tabSelect(item, e) {
      this.TabCur = e.currentTarget.dataset.id;
      this.curPlatform = item.code;
      if (item.code == "YYZB") {
        location.reload()
      }
      // this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
    },
    tabSelectTitle(index) {
      //全部、未开奖等切换
      this.titleSelected = index;
      let postData = this.setPostData();
      postData.page = 1;
      this.requestOrderList("System.Report.getOrderList", postData, (res) => {
        this.filterPanelShow = false; //隐藏筛选面板
      });
    },
    changeStartTime(value) {
      //更改起始时间
      this.startTime = value;
      //请求订单
      let postData = this.setPostData();
      postData.page = 1;
      this.requestOrderList("System.Report.getOrderList", postData, (res) => {
        this.filterPanelShow = false; //隐藏筛选面板
      });
    },
    changeEndTime(value) {
      //更改结束时间
      this.endTime = value;
      //请求订单
      let postData = this.setPostData();
      postData.page = 1;
      this.requestOrderList("System.Report.getOrderList", postData, (res) => {
        this.filterPanelShow = false; //隐藏筛选面板
      });
    },
    filterTap() {
      //点击筛选按钮
      this.filterPanelShow = !this.filterPanelShow;
    },
    showInfoList() {
      //请求彩种数据
      if (this.listDropItems.length > 0) return;
      this.sendRequest({
        url: "System.HomePage.getSimpleGameInfoList",
        success: (res) => {
          if (res.code == 0) {
            this.listDropItems = res.data;
          } else {
            this.$util.showToast({
              title: res.message,
            });
          }
        },
      });
    },
    searchSubmit(obj) {
      //提交搜索
      this.filterData = obj; //记录数据
      let postData = this.setPostData();
      postData.page = 1;
      this.requestOrderList("System.Report.getOrderList", postData, (res) => {
        this.filterPanelShow = false; //隐藏筛选面板
      });
    },
    showMore() {
      //请求订单
      if (this.cancelStatus) {
        //撤单状态
        if (this.cancelPage < this.cancelPageCount) {
          this.cancelPage += 1;
          let postData = this.setPostData();
          this.requestData("System.Report.getOrderList", postData, (res) => {
            this.cancelList.push(...res.data.list);
          });
        }
      } else {
        if (this.page < this.pageCount) {
          this.page += 1;
          let postData = this.setPostData();
          this.requestData("System.Report.getOrderList", postData, (res) => {
            this.orderList.push(...res.data.list);
          });
        }
      }
    },
    cancelOrder(cancelData) {
      //订单撤销
      let self = this;
      // uni.showModal({
      // title: '温馨提示',
      // content: '根据信息，您可以：<\br>1.选择可以;<\br>2.选择不可以',
      // showCancel: false,
      // confirmText: '知道了',
      // });
      uni.showModal({
        content: `即将撤销${cancelData.num}笔注单，确定要继续操作吗？`,
        success: function (res) {
          if (res.confirm) {
            let postData = {
              ids: cancelData.id,
            };
            self.requestData(
              "System.GameIndex.revokeOrder",
              postData,
              (res) => {
                //刷新列表数据
                let postData = this.setPostData();
                this.cancelPage = 1;
                this.page = 1;
                this.requestOrderList("System.Report.getOrderList", postData);

                //返回撤单成功的消息
                uni.showModal({
                  content: res.message,
                  showCancel: false,
                  confirmText: "确定",
                });
              }
            );
          }
        },
      });
    },
    tapCancelButton() {
      //点击撤单按钮显示多选框
      this.$refs.orderComp.toggleCheckbox();
      this.cancelStatus = !this.cancelStatus; //撤单时不显示标题栏
      this.page = 1;
      this.cancelPage = 1;
      let postData = this.setPostData();
      this.requestOrderList("System.Report.getOrderList", postData);
    },
    setPostData() {
      //生成发送数据
      if (this.cancelStatus) {
        //撤单状态
        return {
          status: 1,
          page: this.cancelPage,

          //正式上线去掉时间
          startTime: this.startTime,
          endTime: this.endTime,
        };
      }
      let postData = {};
      let keys = ["startTime", "endTime", "page"];
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (this[key] != "") {
          postData[key] = this[key];
        }
      }
      postData = Object.assign(postData, this.filterData);
      postData.status = this.titleStatus[this.titleSelected];
      return postData;
    },
    requestOrderList(url, data, callback) {
      //请求订单列表
      this.requestData(url, data, (res) => {
        if (this.cancelStatus) {
          //撤单状态
          let _cancelList = res.data.list;
          this.cancelList = _cancelList.filter((item) => {
            return item.uid == this.userId;
          });
          // this.cancelList = res.data.list;
          this.cancelPageCount = res.data.page_count;
        } else {
          this.orderList = res.data.list;
          // console.log(this.orderList);
          // Aconsole.log(this.orderList);
          uni.setStorageSync("text-list", res.data.list);
          this.pageCount = res.data.page_count;
        }
        if (callback) {
          callback(res);
        }
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
.nav {
  .cu-item {
    margin: 0;
  }

  .cur {
    background-color: #fff;
    color: #b82a28;
    border-bottom: 2px solid #b52b2b;
  }
}
</style>
