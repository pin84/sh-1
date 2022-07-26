<template>
  <view class="page-body">
    <view class="content">
      <view>
        <text class="title">用户名称：</text>
        <text>{{ username }}</text>
      </view>
      <view>
        <text class="title">用户昵称：</text>
        <text>{{ nickname }}</text>
      </view>
      <view>
        <text class="title">用户等级：</text>
        <text>{{ hierarchy }}</text>
      </view>
      <view>
        <text class="title">可用金额：</text>
        <text>{{ coin }}</text>
      </view>
      <view>
        <text class="title">注册时间：</text>
        <text>{{ reg_time }}</text>
      </view>
      <view>
        <text class="title">最后登录时间：</text>
        <text>{{ last_login_date }}</text>
      </view>
      <view>
        <text class="title">消费返点比例</text>
        <button @click="open">{{isShowList? '关闭':'查看'}}</button>
      </view>
      <view class="list-box" v-if="isShowList">
        <view class="item" v-for="(item, index) in detailList" :key="index">
          <text class="name">{{ item.name }}</text>
          <text>{{ item.maxKickback }}</text>
        </view>
      </view>
    </view>
    <!-- <uni-popup ref="popup" type="bottom">
      <view class="head">
        <text class="ns-font-size-lg">消费返点详情</text>
        <text class="iconfont iconcuo" @click="close"></text>
      </view>
      <view class="list">
        <view v-for="(item, index) in detailList" :key="index">
          <text>{{ item.name }}</text>
          <text>{{ item.maxKickback }}</text>
        </view>
      </view>
    </uni-popup> -->
  </view>
</template>

<script>
import http from "common/js/http.js";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
export default {
  components: {
    uniPopup,
  },
  data() {
    return {
      isShowList:false,
      accountID: "",
      username: "",
      nickname: "",
      hierarchy: "",
      coin: "",
      reg_time: "",
      last_login_date: "",
      detailList: [],
    };
  },
  methods: {
    getUserInfo() {
      this.sendRequest({
        url: "System.Agent.getUserInfo",
        data: {
          accountID: this.accountID,
        },
        success: (res) => {
          // console.log(res)
          if (res.code >= 0) {
            this.username = res.data.username;
            this.nickname = res.data.nickname;
            this.hierarchy = res.data.hierarchy == 0 ? "会员" : "代理";
            this.coin = res.data.coin;
            this.reg_time =
              res.data.reg_time == null
                ? ""
                : this.formatDate(new Date(parseInt(res.data.reg_time) * 1000));
            this.last_login_date =
              res.data.last_login_date == null
                ? ""
                : this.formatDate(
                    new Date(parseInt(res.data.last_login_date) * 1000)
                  );
          }
        },
      });
    },
    formatDate(date) {
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      return (
        year +
        "-" +
        (String(month).length > 1 ? month : "0" + month) +
        "-" +
        (String(day).length > 1 ? day : "0" + day) +
        " " +
        (String(hour).length > 1 ? hour : "0" + hour) +
        ":" +
        (String(minute).length > 1 ? minute : "0" + minute) +
        ":" +
        (String(second).length > 1 ? second : "0" + second)
      );
    },
    getUserKickback() {
      this.sendRequest({
        url: "System.Agent.getUserKickback",
        data: {
          accountID: this.accountID,
        },
        success: (res) => {
          console.log(res);
          if (res.code >= 0) {
            this.detailList = res.data;
          }
        },
      });
    },
    open() {
      // this.$refs.popup.open();
      this.isShowList = !this.isShowList

      if(!this.detailList.length){
        this.getUserKickback();
      } 
    },
    close() {
      this.$refs.popup.close();
    },
  },
  onLoad(option) {
    this.accountID = option.uid;
    this.getUserInfo();
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

  .content {
    > view {
      padding: 20rpx;
      border-bottom: 2rpx solid #eee;
      display: flex;
      align-items: center;
      &:last-child {
        border-bottom: none;
      }

      .title {
        width: 220rpx;
        text-align: left;
      }
    }

    .list-box {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .item {
        width: 100%;
        border-bottom: 1px solid #eee;
        padding: 10rpx 0;
        &:last-child {
          border-bottom: none;
        }
        .name {
          display: inline-block;
          width: 200rpx;
        }
      }
    }

    button {
      margin: 0;
      height: 60rpx;
      line-height: 60rpx;
      background-color: #2dae88;
      color: white;
      padding: 0 16rpx;
      font-size: 28rpx;
    }
  }

  .uni-popup {
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8rpx 20rpx;
      background-color: #eee;

      .iconcuo {
        font-size: 46rpx;
      }
    }

    .list {
      view {
        display: flex;
        padding: 16rpx 0 16rpx 60rpx;
        border-bottom: 2rpx solid #eee;

        text {
          width: 50%;
        }
      }
    }
  }
}
</style>
