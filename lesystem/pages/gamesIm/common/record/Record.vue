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
      v-if="isShowNoDataIcon"
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
            class="order-num text-center flex-twice text-blue"
            >{{ record.numberOfPeriod }}</view
          >
          <view class="text-center flex-twice">{{ record.amount }}</view>
          <view class="text-center flex-sub">{{ record.bonus }}</view>
          <view
            @click="deleteOrder(record)"
            class="text-center flex-sub"
            :class="{ 'text-green': record.status_cn === '已派奖' }"
            >{{ record.status_cn }}</view
          >
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
      isShowAll: false,
      titles: ["彩种期号", "投注金额", "奖金", "操作"],
      num: 20,
      isDestroyed: false,
    };
  },
  components: {
    LoadMoreTip,
  },



  methods: {
    async toOrderDetail(record) {
      let routes = getCurrentPages()
      let { id } = routes[routes.length - 1].options
      let { orderId, numberOfPeriod, status_cn } = record;
      let { gameType, gameName } = this.$store.state.GDV3.v3IndexGameAllData;

      gameName = gameType == 0 ? gameName + "[信]" : gameName + "[官]";

      uni.navigateTo({
        url: `/pages/gamesIm/common/record/RecordOrderDetail?orderId=${orderId}&pid=${numberOfPeriod}&status=${status_cn}&id=${id}&gameType=${gameType}&gameName=${gameName}`,
      });
    },
    async deleteOrder(item) {
      // periodStatus =0或者（periodstatus=1 &&orderStatus=1）是
      if (
        item.periodStatus === 0 ||
        (item.periodStatus === 1 && item.orderStatus === 1)
      ) {
        // if(true){
        let flag = await this.$util.showConfirm({
          content: "是否要撤销该笔单？",
        });

        if (!flag) {
          return;
        }
        let routes = getCurrentPages()
      let { id } = routes[routes.length - 1].options
        id = Number(id);
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
