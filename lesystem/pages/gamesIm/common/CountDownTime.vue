<template>
  <view class="count-down">
    <view class="left">
      <text>第</text>
      <text class="numberOfPeriod">{{ latestPriodData.numberOfPeriod }}</text>
      <text>期 {{ timeFlag ? "投注时间" : "距开盘" }}</text>

      <view class="text-red">
        <CountDownBbsLHC v-if="isLiuHeCai" :time="time" @end="end" :ts="ts" />
        <CountDownBbs v-else :time="time" @end="end" :ts="ts" />
      </view>
    </view>

    <view class="bs">
      <Bread />
      <Sound />
    </view>
  </view>
</template>

<script>
import CountDownBbs from "@/components/bbs-countdown/bbs-countdown.vue";
import CountDownBbsLHC from "@/components/bbs-countdown/bbs-countdown-2.vue";
import CountDown from "./FlipSecondsCountdown";
import Bread from "@/pages/gamesIm/gameList/GLiuHeCai/Bread.vue";
import Sound from "@/pages/gamesIm/sound/index.vue";
const MILLISECONDS_SECOND = 1000;
const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND;
const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE;
const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR;

export default {
  props: {
    latestPriodData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isLiuHeCai: true,
      ts: 0,
      // isShowModal: false,
      timeFlag: false,
      hours: 0,
      minutes: 0,
      seconds: 0,
      delay: 1000,
      time: 1000,
      numberOfPeriod: 0,
      noSliceIds: [118, 65, 1, 2, 595],
      isShowBread: true,

      gameIdList: [1, 2, 595],
    };
  },

  components: {
    CountDownBbs,
    CountDown,
    Bread,
    Sound,
    CountDownBbsLHC
  },

  watch: {
    "$store.state.GDV3.updateCountdown": function (val) {
      this.initData();
    },
  },

  created() {
    this.initData();
  },

  methods: {
    initData() {
      let { closeTime, serverTime, startTime, status, issStopSales, gameID } =
        this.latestPriodData;
      if (this.gameIdList.includes(Number(gameID))) {
        this.isLiuHeCai = true;
      } else {
        this.isLiuHeCai = false;
      }

      // console.log("--closeTime===", closeTime);
      // console.log("--serverTime===", serverTime);
      // console.log("--startTime===", startTime);
      // console.log("--status===", status);
      if (issStopSales) return;
      if (!closeTime) {
        console.log("no-coloseTime");
        setTimeout(() => {
          this.time = 0;
          this.ts = new Date().getTime();
        }, 1000);
        return;
      }

      let t1 = new Date(closeTime.replace(/-/g, "/")).getTime();
      let t2 = new Date(serverTime.replace(/-/g, "/")).getTime();
      let t3 = new Date(startTime.replace(/-/g, "/")).getTime();
      let time;
      let routes = getCurrentPages();
      let { id } = routes[routes.length - 1].options;
      id = Number(id);
      if (id != 28) {
        if (status === 0) {
          this.timeFlag = false;
          time = t3 - t2;
          this.$store.commit("v3IsShowTimeOutDialog", new Date().getTime());
        }
        if (status === 1) {
          this.timeFlag = true;
          time = t1 - t2;
        }
        if (time < 0) {
          time = 0;
        }
      } else {
        time = t1 - t2;
        this.timeFlag = true;
      }

      // console.log("--time--", time);

      if (time == 0) {
        setTimeout(() => {
          this.time = time || 0;
          this.ts = new Date().getTime();
        }, 1000);
      } else {
        this.time = time;
        this.ts = new Date().getTime();
        // console.log('---end---',this.ts);
      }
    },

    end() {
      // console.log("end");
      this.initData();
    },
  },
};
</script>

<style lang="scss" scoped>
.count-down {
  padding: 0 20rpx;
  display: flex;
  height: 84rpx;
  align-items: center;
  justify-content: space-between;
  // border: 1px solid gray;
  .left {
    display: flex;
  }
  .bs {
    display: flex;
    align-items: center;
  }

  .numberOfPeriod {
    color: #b62929;
  }
}
</style>
