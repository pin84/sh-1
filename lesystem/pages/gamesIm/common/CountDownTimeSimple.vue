<template>
  <view>
    <CountDown
      :time="time"
      @end="end"
      :ts="ts"
      :styleObj="styleObj"
      @progress="progress1"
    />
  </view>
</template>

<script>
import CountDown from "@/components/bbs-countdown/bbs-countdown.vue";

export default {
  props: {
    latestPriodData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      styleObj: {
        color: "#fff",
        fontSize: "30rpx",
      },
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
    };
  },

  watch: {
    "$store.state.GDV3.updateCountdown": function (val) {
      console.log("updateCountdown");
      this.initData();
    },
  },

  components: {
    CountDown,
  },

  created() {
    this.initData();
    // this.initPage(val);
  },

  methods: {
    progress1(obj) {
      this.$emit("progress", obj);
    },

    initData() {
      let { closeTime, serverTime, startTime, status, issStopSales } =
        this.latestPriodData;
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
          this.$emit("statusChange", false);
        }
        if (status === 1) {
          this.timeFlag = true;
          time = t1 - t2;
          this.$emit("statusChange", true);
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
