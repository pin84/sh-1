<template>
  <view class="page-body">
    <block v-if="loadingType == 'noMore'">
      <view class="top-top">
        <input
          class="uni-input"
          type="text"
          v-model="uname"
          placeholder="用户名"
        />
        <view class="bill-btn" @click="screen">筛选</view>
        <view
          class="iconfont icon-icon-test bill-btn bill-search-icon"
          @click="selectByConditions"
        ></view>
      </view>
      <view class="table">
        <view class="tHead">
          <text>用户名</text>
          <text>用户类型</text>
          <text>余额</text>
          <text>状态</text>
        </view>
        <view class="tBody">
          <view class="item" v-for="(item, index) in tableList" :key="index">
            <block v-if="item.hierarchy == '代理'">
              <navigator
                :url="'./index?uid=' + item.uid"
                hover-class="navigator-hover"
              >
                <text>{{ item.username }}</text>
              </navigator>
            </block>
            <block v-else>
              <text>{{ item.username }}</text>
            </block>
            <text>{{ item.hierarchy }}</text>
            <text class="ns-text-color">{{ item.coin }}</text>
            <text
              :class="item.is_delete == '启用' ? 'success' : 'error'"
              @click="open(item.uid, item, index)"
              >{{ item.is_delete }}</text
            >
          </view>
          <uni-pagination
            :current="page"
            :total="total_count"
            pageSize="10"
            @change="pageChange"
          ></uni-pagination>
        </view>
      </view>
      <uni-popup ref="popup" type="bottom">
        <view @click="goDetail">详情</view>
        <view v-if="curUserIndex" @click="toTransfrerAccount">转账</view>
        <view @click="goTeam">团队总览</view>
        <!-- <view>返点设定</view> -->
        <view @click="goRecord">账变记录</view>
        <view class="block"></view>
        <view @click="close">取消</view>
      </uni-popup>
      <view class="topPop">
        <uni-popup ref="popup_2" type="top" @change="change">
          <view class="hidden">
            <view>
              <text>余额:</text>
              <input class="uni-input" type="digit" v-model="minBalance" />
              <text>至</text>
              <input class="uni-input" type="digit" v-model="maxBalance" />
            </view>
            <view>
              <text>登录时间:</text>
              <view class="bill-time">
                <ruiDatePicker
                    :value="pickStartTime"
                    @change="changeStartTime"
                ></ruiDatePicker>
				 <icon class="iconfont icon-shangxuntubiaoku-" type=""></icon> 
              </view>
              <text>至</text>
              <view class="bill-time">
				  <ruiDatePicker
				      :value="pickEndTime"
				      @change="changeEndTime"
				  	
				  ></ruiDatePicker>
<!--                <date-time-picker
                  class="bill-time-date"
                  :select-time="select_time2"
                  :start-time-stamp="before_stamp2"
                  :end-time-stamp="after_stamp"
                  @dateChange="endDateChange"
                ></date-time-picker>-->
                <icon class="iconfont icon-shangxuntubiaoku-" type=""></icon> 
              </view>
            </view>
            <checkbox-group @change="checkboxChange">
              <label v-for="item in checkBoxList" :key="item.value">
                <checkbox
                  :value="item.value"
                  :checked="item.checked"
                  style="transform: scale(0.6)"
                />{{ item.name }}
              </label>
            </checkbox-group>
            <view class="tip ns-text-color"
              >*仅查询近35天内未充值和未购买的数据</view
            >
          </view>
        </uni-popup>
      </view>
    </block>
    <uni-load-more
      :status="loadingType"
      :contentText="contentText"
    ></uni-load-more>
  </view>
</template>

<script>
import http from "common/js/http.js";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
import uniPagination from "@/components/uni-pagination/uni-pagination.vue";
import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue'
//import dateTimePicker from "@/components/date-time/date-time-picker";
export default {
  components: {
    uniPopup,
    uniLoadMore,
    uniPagination,
    ruiDatePicker,
  },
  data() {
    let date = new Date();
    const year = this.timeFormat(date.getFullYear());
    const month = this.timeFormat(date.getMonth() + 1);
    const day = this.timeFormat(date.getDate());
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * 1);
    const year1 = this.timeFormat(date.getFullYear());
    const month1 = this.timeFormat(date.getMonth() + 1);
    const day1 = this.timeFormat(date.getDate());
    // 初始化第一选择时间选择器的时间戳

    let t = `${year}/${month}/${day} 02:00:00`;

    let before_time_stamp = new Date(t).getTime();

    return {
      curuser: {},
      curUserIndex: 0, //是否显示转账
      loadingType: "loading",
      contentText: {
        contentrefresh: "正在加载...",
        contentnomore: "",
      },
      showModal: false,
      uname: "",
      minBalance: "",
      maxBalance: "",
      isBalance: 0,
      isBuying: 0,
      checkBoxList: [
        {
          value: "0",
          name: "显示未充值",
          checked: false,
        },
        {
          value: "1",
          name: "显示未购买",
          checked: false,
        },
      ],
      tableList: [
        {
          username: "",
          hierarchy: "",
          coin: "",
          is_delete: "",
          uid: "",
        },
      ],
      accountID: "",
      uid: "",
      page: 1,
      page_size: 10,
      total_count: "",
      startTime: "",
      endTime: "",
      before_time_stamp,
      before_stamp: 0,
      after_stamp: 0,
      select_time: 0,
      select_time2: 0,
      before_stamp2: 0,
    };
  },
  methods: {
	  changeStartTime(time){
	  	this.startTime = time;
	  	this.changeTime();
	  },
	  changeEndTime(time) {
	  	this.endTime = time;
	  	this.changeTime();
	  },
	  changeTime(){
	  	this.$emit('changeTime');
	  },
    toTransfrerAccount() {
      //console.log(this.curuser);
      this.close();
      uni.navigateTo({
        url: `/pages/member/memberList/transferaccount?accountId=${this.curuser.uid}`,
      });
    },
    timeFormat(i) {
      return i > 9 ? "" + i : "0" + i;
    },

    getAgentInfo(accountID) {
      this.sendRequest({
        url: "System.Agent.getAgentInfo",
        data: {
          accountID: accountID,
        },
        success: (res) => {
          // console.log(res)
          if (res.code >= 0) {
            this.tableList = [];
            this.tableList.push({
              username: res.data.username,
              hierarchy: res.data.hierarchy,
              coin: res.data.coin,
              is_delete: res.data.is_delete,
              uid: res.data.uid,
            });
            for (var i = 0; i < this.tableList.length; i++) {
              if (this.tableList[i].hierarchy == 0) {
                this.tableList[i].hierarchy = "会员";
              } else if (this.tableList[i].hierarchy >= 1) {
                this.tableList[i].hierarchy = "代理";
              }
              if (this.tableList[i].is_delete == 0) {
                this.tableList[i].is_delete = "停用";
              } else if (this.tableList[i].is_delete == 1) {
                this.tableList[i].is_delete = "启用";
              } else {
                this.tableList[i].is_delete = "暂停";
              }
            }
            this.getMemberList(accountID);
          }
        },
        fail: (err) => {
          console.log(err);
        },
      });
    },
    screen() {
      this.showModal = !this.showModal;
      if (this.showModal == true) {
        this.$refs.popup_2.open();
      } else {
        this.$refs.popup_2.close();
      }
    },
    change(e) {
      this.showModal = e.show;
    },
    selectByConditions() {
      this.$refs.popup_2.close();
      this.tableList = [];
      this.page = 1;
      if (this.accountID == "") {
        this.getAgentInfo(this.accountID);
      } else {
        this.getAgentInfo("");
      }
    },
    checkboxChange(e) {
      var items = this.checkBoxList;
      var values = e.detail.value;
      for (var i = 0; i < items.length; ++i) {
        const item = items[i];
        if (values.includes(item.value)) {
          this.$set(item, "checked", true);
        } else {
          this.$set(item, "checked", false);
        }
      }
      if (this.checkBoxList[0].checked == true) {
        this.isBalance = 1;
      } else {
        this.isBalance = 0;
      }
      if (this.checkBoxList[1].checked == true) {
        this.isBuying = 1;
      } else {
        this.isBuying = 0;
      }
    },
    open(uid, obj, index) {
      this.curUserIndex = index;
      this.curuser = obj;

      this.$refs.popup.open();
      this.uid = uid;
    },
    close() {
      this.$refs.popup.close();
    },
    getMemberList(accountID) {
      //console.log(accountID);
      let d = {
        accountID: accountID,
        startTime: this.startTime,
        endTime: this.endTime,
        uname: this.uname,
        minBalance: this.minBalance,
        maxBalance: this.maxBalance,
        isBalance: this.isBalance,
        isBuying: this.isBuying,
        page: this.page,
        page_size: this.page_size,
      };
      this.sendRequest({
        url: "System.Agent.getMemberList",
        data: d,
        success: (res) => {
          // console.log(res)
          if (res.code >= 0) {
            Object.keys(res.data.list).forEach((key) => {
              let item = res.data.list[key];
              this.tableList.push({
                username: item.username,
                hierarchy: item.hierarchy,
                coin: item.coin,
                is_delete: item.is_delete,
                uid: item.uid,
              });
            });
            this.total_count = res.data.total_count + 1;
            for (var i = 0; i < this.tableList.length; i++) {
              if (
                this.tableList[i].hierarchy == 0 ||
                this.tableList[i].hierarchy == "会员"
              ) {
                this.tableList[i].hierarchy = "会员";
              } else if (
                this.tableList[i].hierarchy >= 1 ||
                this.tableList[i].hierarchy == "代理"
              ) {
                this.tableList[i].hierarchy = "代理";
              }
              if (
                this.tableList[i].is_delete == 0 ||
                this.tableList[i].is_delete == "停用"
              ) {
                this.tableList[i].is_delete = "停用";
              } else if (
                this.tableList[i].is_delete == 1 ||
                this.tableList[i].is_delete == "启用"
              ) {
                this.tableList[i].is_delete = "启用";
              } else if (
                this.tableList[i].is_delete == 2 ||
                this.tableList[i].is_delete == "暂停"
              ) {
                this.tableList[i].is_delete = "暂停";
              }
            }
            this.loadingType = "noMore";
          }
        },
        fail: (err) => {
          console.log(err);
        },
      });
    },
    pageChange(e) {
      this.page = e.current;
      this.getAgentInfo(this.accountID);
    },
    goDetail() {
      this.close();
      this.$util.redirectTo("/pages/member/memberList/detail?uid=" + this.uid, {}, "");
    },
    goTeam() {
      this.close();
      // this.$util.redirectTo("/pages/agency/index?uid=" + this.uid, {}, "");
      this.$util.redirectTo("/pages/member/agency/index?uid=" + this.uid, {}, "");
    },
    goRecord() {
      this.close();
      this.$util.redirectTo("/pages/member/bill/bill?uid=" + this.uid, {}, "");
    },
	getTimeString(type) {     //today, tomorrow
	 let initTime= '02:00:00';
		if (type == 'today') {
			//let date = new Date();
			let tStamp = new Date().getTime();
			tStamp -= 3600 * 24 * 365 * 1000;
			let date = new Date(tStamp);
			let y = date.getFullYear();
			let m = this.prefixZero(date.getMonth() + 1, 2);
			let d = this.prefixZero(date.getDate(), 2);
			return y + '-' + m + '-' + d + ' ' + initTime;
		}else if (type == 'tomorrow') {
			let tStamp = new Date().getTime();
			tStamp += 3600 * 24 * 1000;
			let date = new Date(tStamp);
			let y = date.getFullYear();
			let m = this.prefixZero(date.getMonth() + 1, 2);
			let d = this.prefixZero(date.getDate(), 2);
			return y + '-' + m + '-' + d + ' ' + initTime;
		}
	},
	prefixZero(value,len) {     //前置补充0
		
		if (value.toString().length >= len) {  //不用补0
			return value;
		}
		if (Number.isInteger(value)) {
			let str = '';
			for (let i=0; i<len-1; i++) {
				str += '0';
			}
			return str + value;
		}
	}
  },
  onLoad(option) {
     this.pickStartTime = "2020-01-01 02:00:00";
     this.pickEndTime =  this.getTimeString('tomorrow');
    this.accountID = option.uid == undefined ? "" : option.uid;

    this.getAgentInfo(this.accountID);
  },
  mixins: [http],
};
</script>

<style lang="scss" scoped>
.page-body {
  min-height: 100vh;
  background-color: white;
  /* #ifdef H5 */
  min-height: calc(100vh - 44px);
  /* #endif */

  input {
    border: 2rpx solid #ddd;
    border-radius: 14rpx;
    padding: 6rpx 20rpx;
    text-align: left;
  }

  .top-top {
    background-color: white;
    height: 40px;
    display: flex;
    align-items: flex-start;
    padding: 0 10rpx;

    .bill-btn {
      line-height: 62rpx;
      padding: 0 24rpx;
      border-radius: 14rpx;
      border: 2rpx solid #ddd;
      text-align: center;
      &:active {
        background-color: #ddd;
      }
    }

    view:nth-child(2) {
      width: 160rpx;
      margin: 0 4rpx;
    }

    .bill-search-icon {
      width: 80rpx;
      font-size: 48rpx;
      color: #dc3639;
      font-weight: 600;
    }
  }

  .topPop {
    .uni-popup {
      position: absolute;
      top: 80rpx;

      .hidden {
        padding: 10rpx 10rpx 0;
        background-color: white;

        > view {
          display: flex;
          align-items: center;
          border-bottom: none;

          text:nth-child(1) {
            display: inline-block;
            width: 120rpx;
            text-align: justify;
            text-align-last: justify;
            margin-right: 20rpx;
          }

          text:nth-child(3) {
            margin: 0 20rpx;
          }

          .bill-time {
            padding: 0 12rpx;
            display: flex;
            align-items: center;
            height: 80rpx;

            .bill-time-date {
              width: 200rpx;
              border-bottom: none;
              padding: 0;
            }
          }
        }

        checkbox-group {
          display: flex;
          justify-content: space-around;
          margin-top: 20rpx;
        }

        .tip {
          display: block;
          text-align: center;
          margin-top: 0;
        }
      }
    }
  }

  .table {
    .tHead {
      display: flex;
      justify-content: space-around;
      background-color: #ddd;
      height: 80rpx;
      line-height: 80rpx;

      text {
        width: calc(100% / 4);
        text-align: center;
      }
    }

    .tBody {
      .item {
        display: flex;
        justify-content: space-around;
        height: 80rpx;
        line-height: 80rpx;
        border-bottom: 2rpx solid #eee;

        text,
        navigator {
          width: calc(100% / 4);
          text-align: center;
        }

        navigator {
          color: #4395ff;
        }

        .success {
          color: #4cd964;
        }

        .error {
          color: #ff0036;
        }
      }
    }
  }

  .uni-popup {
    .uni-popup__wrapper-box {
      view {
        text-align: center;
        padding: 20rpx 0;
        border-bottom: 2rpx solid #eee;
      }

      .block {
        background-color: #eee;
        padding: 10rpx 0;
      }

      .block,
      view:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
