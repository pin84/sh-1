<template>
  <view class="record flex flex-direction">
    <view class="title-bg flex">
      <view
        class="title-item text-center flex-sub"
        :class="{ 'flex-twice': index === 0 || index === 1 }"
        v-for="(title, index) in titles"
        :key="index"
        >{{ title }}</view
      >
    </view>

    <view
      v-if="recordList.length === 0"
      style="height: 100%; padding-top: 300rpx"
      class="flex align-center flex-direction margin-top-xl"
    >
      <i
        class="iconfont icon-kelian text-gray"
        style="font-size: 200rpx; line-height: 180rpx"
      ></i>
      <view><text class="text-xl text-gray">暂无记录</text></view>
    </view>
    <view v-else class="main-body">
      <view class="body-content">
        <view
          class="flex re-item"
          v-for="(record, index) in recordList"
          :key="index"
        >
          <view
            @click="toOrderDetail(record)"
            class="order-num text-center flex-twice"
          >
            <text class="text-sm">{{ record.game_name }}</text>
            <br />
            <text class="text-red text-sm">{{ record.numberOfPeriod }}</text>
            期
          </view>
          <view @click="toOrderDetail(record)" class="text-center flex-twice">
            <text class="text-sm">{{ record.playedName }}</text>
            <br />
            <text class="text-sm">{{ record.content }}</text>
            <text v-if="record.odds != null &&record.odds!=''" class="text-red text-sm">@{{ record.odds }}</text>
          </view>
          <view
            @click="toOrderDetail(record)"
            class="text-center flex-sub flex align-center justify-center"
            >{{ Number(record.amount) }}</view
          >
          <view class="text-center flex-sub flex align-center justify-center">
            <text
              @click="toOrderDetail(record)"
              v-if="record.periodStatus === 3 && record.orderStatus === 1"
              >{{ record.status_cn }}</text
            >
            <text
              @click="toOrderDetail(record)"
              v-if="record.orderStatus === 3"
              >{{ record.status_cn }}</text
            >
            <text
              @click="deleteOrder(record)"
              v-if="
                record.periodStatus === 0 ||
                (record.periodStatus === 1 && record.orderStatus === 1)
              "
              class="text-blue"
              style="text-decoration: underline"
            >
              可撤单
            </text>
            <text v-if="record.orderStatus == 4">已撤单</text>
            <text
              @click="toOrderDetail(record)"
              class="text-green"
              v-if="record.periodStatus === 0 && record.orderStatus === 1"
              >未开奖</text
            >
            <text
              @click="toOrderDetail(record)"
              class="text-orange"
              v-if="record.orderStatus === 2"
              >未中奖</text
            >
          </view>
        </view>
      </view>
      <view v-if="isShowLoadMore" class="tip-box"
        ><LoadMoreTip :isShowAll="isLosdmore"
      /></view>
    </view>
  </view>
</template>

<script>
import LoadMoreTip from "@/components/lesystem/LoadMoreTips.vue";
export default {
  props: {
    isShowNoDataIcon: {
      type: Boolean,
      default: () => true,
    },
    isShowLoadMore: {
      type: Boolean,
      default: () => true,
    },
    isLosdmore: {
      type: Boolean,
      default: () => true,
    },
    recordList: {
      type: Array,
      default: () => [],
    },
    isShowMore: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      curname: "",
      isShowAll: false,
      titles: ["彩种期号", "玩法", "投注金额", "奖金"],
      num: 20,
    };
  },
  components: {
    LoadMoreTip,
    // TitleList
  },
  created() {
	//console.log(this.recordList);
    this.initPage();
  },

  methods: {
    async cancelOrder(record) {
      let confirmObj = {
        content: "即将撤销一笔订单，确定要继续操作吗？",
      };
      let flag = await this.$util.showConfirm(confirmObj);
      if (flag) {
        this.deleteOrder(record);
      }
    },
    initPage() {
      let {gameName} = this.$store.state.GDV3.v3IndexGameAllData
      this.curname = gameName + "[信]";


    },

    async toOrderDetail(record) {
       let routes = getCurrentPages()
      let { id } = routes[routes.length - 1].options
      let { orderId, numberOfPeriod, status_cn } = record;
       let { gameType, gameName } = this.$store.state.GDV3.v3IndexGameAllData;
       uni.navigateTo({
        url: `/pages/gamesIm/common/record/RecordOrderDetail?orderId=${orderId}&pid=${numberOfPeriod}&status=${status_cn}&id=${id}&gameType=${gameType}&gameName=${gameName}`,
      });
    },
    async deleteOrder(item) {
      if (
        item.periodStatus === 0 ||
        (item.periodStatus === 1 && item.orderStatus === 1)
      ) {
        let flag = await this.$util.showConfirm({
          content: "是否要撤销该笔单？",
        });

        if (!flag) {
          return;
        }
        let routes = getCurrentPages()
      let { id } = routes[routes.length - 1].options
        let obj = {
          url: this.$api.revokeOrder,
          data: {
            gameId: id,
            ids: item.orderId,
          },
        };

        
        let res = await this.$http(obj);
        
        this.$store.commit("updateRecord", new Date().getTime());
        this.$util.showConfirm({
          content: res.message,
          showCancel: false,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.record {
  height: 100%;
  .title-bg {
    // padding: 15rpx 20rpx;
    .title-item {
      width: 100%;
      background-color: #3c3c3c;
      color: #fff;
      height: 70rpx;
      line-height: 70rpx;
      padding: 0 5rpx;
      border-right: 1px solid gray;
      // padding: 15rpx 20rpx;
    }
  }

  .main-body {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .body-content {
      height: 100%;
      overflow: scroll;
    }
    .tip-box {
      flex: 0 0 100rpx;
    }
    .re-item {
      padding: 10rpx 0;
      border-bottom: 1px solid #ccc;
      .order-num {
        // text-decoration: underline;
      }
    }
  }

  .loadmore {
  }
}
</style>
