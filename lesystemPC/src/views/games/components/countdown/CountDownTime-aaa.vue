<template>
  <div class="count-down flex">
    <span>第</span>
    <span class="numberOfPeriod">{{ numberOfPeriod }}</span>
    <span>期 {{ timeFlag ? "投注时间" : "距开盘" }}</span>

    <div class="text-red"><CountDown :time="time" @end="end"></CountDown></div>

    <div class="cu-modal" :class="isShowModal ? 'show' : ''">
      <div class="cu-dialog">
        <div class="padding-xl flex" style="flex-direction: column">
          <span>{{ numberOfPeriod - 1 }} 期已截止</span>
          <span>{{ numberOfPeriod }} 期即将开售</span>
          <span>投注时请注意期号！</span>
        </div>
        <div class="cu-bar bg-white justify-center">
          <button
            class="cu-btn bg-green margin-left"
            @tap="isShowModal = false"
          >
            确定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountDown from "./bbs-countdown.vue";

const MILLISECONDS_SECOND = 1000;
const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND;
const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE;
const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR;

export default {
  watch: {
    "$store.state.gd.latestPriodData": {
      handler: function (val) {
        let { numberOfPeriod } = val;
        this.numberOfPeriod = numberOfPeriod;
        this.initData(val);
      },
      deep: true,
    },
  },
  data() {
    return {
      isShowModal: false,
      timeFlag: false,
      hours: 0,
      minutes: 0,
      seconds: 0,
      delay: 1000,
      time: 1000,
      numberOfPeriod: 0,
    };
  },

  components: {
    CountDown,
  },

  created() {
    let val = this.$store.state.gd.latestPriodData;
    this.initData(val);
  },

  methods: {
    initData(val) {
      // console.log(val);
      let { closeTime, serverTime, startTime, status } = val;

      let t1 = new Date(closeTime.replace(/-/g, "/")).getTime();
      let t2 = new Date(serverTime.replace(/-/g, "/")).getTime();
      let t3 = new Date(startTime.replace(/-/g, "/")).getTime();

      

      // console.log(t1,t2,t3);

      let time;
      if (status === 0) {
        this.timeFlag = false;
        time = t3 - t2;
        // this.$store.commit('v3IsShowTimeOutDialog',new Date().getTime())
      }
      if (status === 1) {
        this.timeFlag = true;
        time = t1 - t2;
      }
      // console.log('--time----',time);
      if (time < 0) {
        time = 0;
      }
      this.time = time || 0;
    },
    end() {},
  },
};
</script>

<style lang="scss" scoped>
.count-down {
  padding: 20rpx 20rpx;
  .numberOfPeriod {
    color: #b62929;
  }
}
</style>
