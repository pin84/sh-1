<template>
  <view class="balance flex bg-gray justify-between" style="padding: 0 20rpx">
    <view class="flex">
      <scroll-view class="bg-gray nav">
        <view
          class="cu-item"
          :class="index == TabCur ? 'text-red cur' : ''"
          v-for="(item, index) in tabName"
          :key="index"
          @tap="tabSelect"
          :data-id="index"
          >{{ item }}</view
        >
      </scroll-view>

      <view @click="isFavorGame">
        <i v-if="isFavor" class="iconfont icon-xin1"></i>
        <i v-else class="iconfont icon-xin2 text-red"></i>
      </view>
    </view>

    <view v-if="isShowBalance">
      <text v-if="requestDone">￥ {{ money }}</text>
      <text v-else>￥ 刷新中...</text>

      <i class="iconfont icon-shuaxin margin-left-sm" @click="refleshMoney"></i>
    </view>
    <view v-else>
      <text>余额 ****</text>
      <i class="iconfont icon-yan margin-left-sm" @click="showBalance"></i>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    ts: {
      //初始化页面
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      isFavor: true,
      TabCur: 0,
      requestDone: false,
      isShowBalance: false,
      tabName: ["我要投注", "投注记录"],
      money: 0,
      userGames: [],
    };
  },
  watch: {
    ts: function () {
      this.TabCur = 0;
    },
    "$store.state.GDV3.v3IndexGame": {
      handler: function (val) {
        this.TabCur = 0;
        this.$store.commit("v3ShowRecord", false);
      },
      deep: true,
    },

    "$store.state.gameDataV2.indexGame": {
      handler: function (val) {
        this.TabCur = 0;
      },
      deep: true,
    },
    "$store.state.GDV3.v3ShowRecord": function (val) {
      if (val) {
        this.TabCur = 1;
      } else {
        this.TabCur = 0;
      }
    },
    "$store.state.GDV3.updateRecord": function (val) {
      this.initPageData();
    },
  },
  mounted() {
    this.initPageData();
    this.interval = setInterval(() => {
      this.initPageData();
    }, 60000);
    this.getFavor();
  },
  methods: {
    async isFavorGame() {
      if (this.userGames.length == 6 && this.isFavor) {
        this.$util.showConfirm({
          content: "最多只能收藏6个我喜欢的彩种",
          showCancel: false,
        });
        return;
      }
      this.isFavor = !this.isFavor;
      let routes = getCurrentPages();
      let { id } = routes[routes.length - 1].options;
      id = Number(id);
      let d = {
        url: this.$api.addUserGames,
        method: "POST",
        data: {
          gameids: id,
        },
      };

      let res = await this.$http(d);
      this.getFavor();
    },

    async getFavor() {
      let routes = getCurrentPages();
      let { id } = routes[routes.length - 1].options;
      id = Number(id);
      let d1 = {
        url: this.$api.getIndexData,
        data: {
          id,
        },
      };

      let { data } = await this.$http(d1);

      let { userGames } = data;
      this.userGames = userGames;

      let index = userGames.findIndex((item) => item.gameId == id);
      if (index !== -1) {
        this.isFavor = false;
      }
      this.$store.commit("userGames", userGames);
    },

    async initPageData() {
      let d = {
        url: this.$api.memberInfo,
        isShowLoading: false,
      };
      let { data } = await this.$http(d);
      this.money = data.coin;
    },
    showBalance() {
      this.isShowBalance = true;
      this.refleshMoney();
    },
    refleshMoney() {
      this.requestDone = false;
      setTimeout(() => {
        this.requestDone = true;
      }, 2000);
    },
    tabSelect(e) {
      this.TabCur = e.currentTarget.dataset.id;
      if (this.TabCur == 0) {
        this.$store.commit("v3ShowRecord", false);
      } else {
        this.$store.commit("v3ShowRecord", true);
      }
    },
  },

  destroy() {
    clearInterval(this.interval);
  },
};
</script>

<style lang="scss" scoped>
.balance {
  scroll-view {
    width: 280rpx;
  }
  .cu-item {
    height: 60rpx;
    line-height: 60rpx;
    padding: 0;
  }
}
</style>
