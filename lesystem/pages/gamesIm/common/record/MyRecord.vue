<template>
  <view>
    <view v-if="curType == 1" class="my-record" :style="styleObj">
      <view style="padding: 0 20rpx"
        ><text class="text-xl text-bold">我的投注</text></view
      >
      <!-- <Record  :isShowNoDataIcon='false' :lineNum='num'/> -->
      <slot></slot>
      <view class="flex justify-end padding-bottom-xl margin-top-sm">
        <text
          @click="toMore"
          class="text-xs"
          style="padding: 0 20rpx; color: #777"
          >更多 >></text
        >
      </view>
    </view>
    <view v-if="curType == 2" class="my-record-2">
      <view><text class="text-xl text-bold text-white">我的投注</text></view>
      <!-- <Record  :isShowNoDataIcon='false' :lineNum='num'/> -->
      <slot></slot>
      <view class="flex justify-end padding-bottom-xl margin-top-sm">
        <text @click="toMore" class="text-xs" style="color: #caebda"
          >更多 >></text
        >
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      num: 3,
      styleObj: {},
      curType: 2,
    };
  },

  components: {
    Record: () => import("./Record.vue"),
  },

  created() {
    this.initPage();
  },

  methods: {
    initPage() {
      let { curGameId, gameType } = this.$store.state.GDV3.v3IndexGameAllData;

      let ids = [106, 8400, 146, 97, 148, 100];

      if (ids.includes(curGameId)) {
        this.curType = 2;
      } else {
        this.curType = 1;
      }
    },
    toMore() {
      uni.navigateTo({
        url: "/pages/member/index/gameRecord/GameRecord",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.my-record {
  padding: 0 20rpx;
}

.my-record-2 {
  padding: 20rpx;
  background-color: #317455;
  .text-box {
    border: 1px solid #ccc;

    .text {
      height: 80rpx;
      line-height: 80rpx;
      border-right: 1px solid #ccc;
    }
    text:last-child {
      border-right: none;
    }
  }
}
</style>
