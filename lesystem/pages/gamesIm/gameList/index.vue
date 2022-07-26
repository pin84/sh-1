<template>
  <view class="list">
    <view class="gl-w">
      <view v-show="!isShowRecord && !isShowBasket" class="gl">
        <view class="rank-box" v-if="isShowRank">
          <Rank />
        </view>
        <view class="l">
          <G259 v-if="curGameId == 259" />
          <G260 v-if="curGameId == 260" />
          <G106 v-if="curGameId == 106" />
          <G105 v-if="curGameId == 105" />
          <G32 v-if="curGameId == 32" />
          <G58 v-if="curGameId == 58" />
          <G118 v-if="curGameId == 118" />
          <G30 v-if="curGameId == 30" />
          <G44 v-if="curGameId == 44" />
          <G5 v-if="curGameId == 5" />
          <G28 v-if="curGameId == 28" />
          <GLiuHeCai v-if="curGameId == 1" />
          <view v-show="!isShowBasket && isShowMyRecord">
            <MyRecord
              ><Record
                :isShowLoadMore="false"
                :isShowMore="false"
                :isLimitLine="true"
            /></MyRecord>
          </view>

          <view class="wenlu" v-if="isShowRank" style="padding: 20rpx"
            ><Wenlu
          /></view>
        </view>
      </view>
      <view v-if="isShowRecord && !isShowBasket" class="gl">
        <view class="l"><Record /></view>
      </view>
      <view class="gl" v-if="isShowBasket"><Basket /></view>
    </view>

    <view class="footer">
      <Ratio v-show="!isShowBasket" />
      <Footer :isShowBasket="!isShowBasket" @showRecord="changeTal(1)" />
    </view>
  </view>
</template>

<script>
import ids from '../ids'
import Ratio from "@/pages/gamesIm/common/ratioBar/index.vue";
import Footer from "@/pages/gamesIm/common/footer/index.vue";
import Record from "@/pages/gamesIm/common/record/index.vue";
import MyRecord from "@/pages/gamesIm/common/record/MyRecord.vue";
import Basket from "@/pages/gamesIm/common/basket/index.vue";
import Rank from "@/pages/gamesIm/common/rank/Rank.vue";
import Wenlu from "@/pages/gamesIm/common/Wenlu.vue";
import G259 from "./G259";
import G260 from "./G260";
import G106 from "./G106";
import G105 from "./G105";
import G32 from "./G32";
import G58 from "./G58";
import G118 from "./G118";
import G30 from "./G30";
import G44 from "./G44";
import G5 from "./G5";
import G28 from "./G28";
import GLiuHeCai from "./GLiuHeCai";

export default {
  props: {
    isShowRank: {
      type: Boolean,
      default: () => false,
    },
    curGameId: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      gameType: "",
      isShowBasket: false,
      isShowRecord: false,
      isShowMyRecord: true,
      isShowWenlu: false,
    };
  },

  components: {
    G259,
    G260,
    G106,
    G105,
    G32,
    G58,
    G118,
    G30,
    G44,
    G5,
    G28,
    GLiuHeCai,
    Footer,
    Ratio,
    Record,
    MyRecord,
    Basket,
    Rank,
    Wenlu,
  },

  watch: {
    "$store.state.GDV3.v3IsShowNumBaket": function (val) {
      this.isShowBasket = val;
    },
    "$store.state.GDV3.v3ToBuyNext": function () {
      this.buy();
    },
    "$store.state.GDV3.v3ShowRecord": function (val) {
      this.isShowRecord = val;
    },
  },

  created() {
    this.initPage();
  },

  methods: {
    initPage() {
      let { gameType } = this.$store.state.GDV3.v3IndexGameAllData;
      if (gameType == 1) {
        this.isShowMyRecord = true;
      } else {
        this.isShowMyRecord = false;
      }
    },
    //切换  我要投注 或 投注记录页面
    changeTal(index) {
      this.TabCur = index;
      index == 0 ? (this.isShowRecord = false) : (this.isShowRecord = true);
    },
    async buy() {
      let { status } = this.$store.state.GDV3.v4latestPriodData;

      if (status == 0) {
        this.$util.showConfirm({
          content: "当前未开盘",
          showCancel: false,
        });
        this.$store.commit("v3IsShowNumBaket", false);
        return;
      }
      this.$store.commit("v3IsHasSelected", false);
      let baskeyNumObj = this.$store.state.GDV3.numBasket;
      let bl = baskeyNumObj.length - 1;
      let arr = [];
      let rateObj = {
        1: 1,
        0.1: 2,
        0.01: 3,
        0.001: 4,
      };

      let { gameType, curGameId } = this.$store.state.GDV3.v3IndexGameAllData;
      if (gameType == 0) {
        baskeyNumObj.forEach((item) => {
          let goal;
          if ([25315].includes(item.I)) {
            goal = item.N;
          } else if (ids['1'].includes(Number(curGameId))) {
            goal = item.goal;
          } else {
            goal = item.I;
          }
          arr.push({
            id: item.I,
            goal,
            odds: item.odds,
            amount: item.money || baskeyNumObj[bl].money,
            timestamp: item.ts,
          });
        });
      } else {
        baskeyNumObj.forEach((item) => {
          arr.push({
            i: item.I,
            n: item.len,
            c: item.orderStr,
            t: item.ratio,
            k: item.odds,
            m: rateObj[item.rate],
            a: item.money,
            ts: item.ts,
          });
        });
      }

      let jsonstr = JSON.stringify(arr);
      let { closeTime, gameID, numberOfPeriod, fid } =
        this.$store.state.GDV3.v4latestPriodData;

      // console.log(closeTime);

      let { selectBack } = this.$store.state.GDV3.officialRate;


      let d = {
        kjTime: new Date(closeTime.replace(/-/g, "/")).getTime() / 1000,
        gameId: gameID,
        numberOfPeriod,
        periodId: fid,
        isSingle: 0, //0 单式玩法 1复式玩法
        orderList: jsonstr,
        selectBack,
      };

      let url;

      let liuhecaiids = [1,595,2]
      if (gameType == 0) {
        if (liuhecaiids.includes(curGameId)) {
          url = this.$api.addSixOrders;
        } else {
          url = this.$api.sscAddOrders;
        }
      } else {
        url = this.$api.addOrders;
      }
      console.log(url);

      let d1 = {
        method: "POST",
        url,
        data: d,
      };

      // let checkFlag = true
      let checkFlag = this.$buyDataHandler.checkSameOrder(d1.data);
      if (!checkFlag) {
        let flag1 = await this.$util.showConfirm({
          content: "你已提交过相同的订单，是否继续",
        });
        if (!flag1) {
           this.$store.commit("v3NumBasket", "clearAll");
          return;
        }
      }

      console.log("-buy d-", d1);
      let res = await this.$http(d1);
      console.log("-buy res-", res.data);
      if (res.code < 0) {
        this.$store.commit("v3NumBasket", "clearAll");
        let flag = await this.$util.showConfirm({ content: res.message });
        if (flag && res.code == -2002) {
          uni.navigateTo({
            url: "/pages/member/recharge/recharge",
          });
        }
      } else {
        let ts = new Date().getTime();
        this.$store.commit("v3selectedNum", {});
        this.$store.commit("v3NumBasket", "clearAll");
        this.$store.commit("v3FootMoney", {});
        this.$store.commit("v3ClearSelected", ts);
        this.$store.commit("v3IsShowNumBaket", false);
        this.$store.commit("v3SelectedCount", "clearAll");
        this.$store.commit("updateRecord", ts);
        this.$store.commit("curSelectedType", ""); //六合彩
        let flag = await this.$util.showConfirm({
          content: "投注成功",
          confirmText: "继续下注",
          cancelText: "查看投注记录",
        });
        if (!flag) {
          this.$store.commit("v3ShowRecord", true);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  overflow: hidden;
  // border: 1px solid red;
  .gl-w {
    height: 100%;
    overflow: hidden;
    // padding-bottom: 200rpx;
    .gl {
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      .rank-box {
        flex: 0 0 80rpx;
      }
      .l {
        // border: 1px solid red;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        // height: 100%;
        overflow: scroll;
        padding-bottom: 180rpx;
        .wenlu {
          flex: 0 0 370px;
        }
      }
    }
  }
  .footer {
    // border: 1px solid red;
    bottom: 0;
    // padding-bottom: 0;
    // padding-bottom: constant(safe-area-inset-bottom);
    // padding-bottom: env(safe-area-inset-bottom);
    position: fixed;
    left: var(--window-left);
    right: var(--window-right);
    // display: -webkit-box;
    // display: -webkit-flex;
    display: flex;
    flex-direction: column;
    z-index: 998;
    // box-sizing: border-box;
  }
}
</style>
