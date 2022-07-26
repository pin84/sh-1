<template>
  <view class="bbs-countdown">
    {{ hours < 10 ? `0${hours}` : hours }} :
    {{ minutes < 10 ? `0${minutes}` : minutes }} :
    {{ seconds < 10 ? `0${seconds}` : seconds }}

    <!--{{days}}天,-->
    <!--{{hours}}小时,-->
    <!--{{minutes}}分,-->
    <!--{{seconds}}秒,-->

    <!--{{milliseconds}}毫秒,-->
    <!--{{totalDays}}总天数,-->
    <!--{{totalHours}}总小时数,-->
    <!--{{totalMinutes}}总分钟数,-->
    <!--{{totalSeconds}}总秒数,-->
    <!--{{totalMilliseconds}}总毫秒数,-->
  </view>
</template>
<script>
const MILLISECONDS_SECOND = 1000;
const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND;
const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE;
const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR;

export default {
  name: "bbs-countdown",
  props: {
    /**
     * Starts the countdown automatically when initialized.
     */
    autoStart: {
      type: Boolean,
      default: true,
    },

    /**
     * Emits the countdown events.
     */
    emitEvents: {
      type: Boolean,
      default: true,
    },

    /**
     * The interval time (in milliseconds) of the countdown progress.
     */
    interval: {
      type: Number,
      default: 1000,
      validator: (value) => value >= 0,
    },

    /**
     * Generate the current time of a specific time zone.
     */
    now: {
      type: Function,
      default: () => {
        return Date.now();
      },
    },

    /**
     * The time (in milliseconds) to count down from.
     */
    // time: {
    // 	type: Number,
    // 	default: 0,
    // 	validator: value => value >= 0,
    // },
  },
  computed: {
    /**
     * Remaining days.
     * @returns {number} The computed value.
     */
    days() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_DAY);
    },

    /**
     * Remaining hours.
     * @returns {number} The computed value.
     */
    hours() {
      return Math.floor(
        (this.totalMilliseconds % MILLISECONDS_DAY) / MILLISECONDS_HOUR
      );
    },

    /**
     * Remaining minutes.
     * @returns {number} The computed value.
     */
    minutes() {
      return Math.floor(
        (this.totalMilliseconds % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE
      );
    },

    /**
     * Remaining seconds.
     * @returns {number} The computed value.
     */
    seconds() {
      return Math.floor(
        (this.totalMilliseconds % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND
      );
    },

    /**
     * Remaining milliseconds.
     * @returns {number} The computed value.
     */
    milliseconds() {
      return Math.floor(this.totalMilliseconds % MILLISECONDS_SECOND);
    },

    /**
     * Total remaining days.
     * @returns {number} The computed value.
     */
    totalDays() {
      return this.days;
    },

    /**
     * Total remaining hours.
     * @returns {number} The computed value.
     */
    totalHours() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_HOUR);
    },

    /**
     * Total remaining minutes.
     * @returns {number} The computed value.
     */
    totalMinutes() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_MINUTE);
    },

    /**
     * Total remaining seconds.
     * @returns {number} The computed value.
     */
    totalSeconds() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_SECOND);
    },
  },
  data() {
    return {
      /**
       * It is counting down.
       * @type {boolean}
       */
      counting: false,
      // timeoutId: '',
      /**
       * The absolute end time.
       * @type {number}
       */
      endTime: 0,

      /**
       * The remaining milliseconds.
       * @type {number}
       */
      totalMilliseconds: 0,

      time: 0,
    };
  },

  mounted() {
    this.initData();
  },

  methods: {
    initData() {
      let { closeTime, serverTime, startTime, status, issStopSales } =
        this.$store.state.GDV3.v4latestPriodData;
    
      if (issStopSales) return;
      if (!closeTime) {
        console.log("no-coloseTime");
        setTimeout(() => {
          this.time = 0;
          this.ts = new Date().getTime();
        }, 1000);
        return;
      }

        console.log("--closeTime===", closeTime);
      console.log("--serverTime===", serverTime);
      console.log("--startTime===", startTime);
      console.log("--status===", status);

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

      console.log("--time--", time);

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
    // initData() {
    //   let {
    //     closeTime,
    //     serverTime,
    //     startTime,
    //     status,
    //     issStopSales
    //   } = this.$store.state.GDV3.v4latestPriodData;

    //   if(issStopSales )return
    //   let t1 = new Date(closeTime.replace(/-/g, "/")).getTime();
    //   let t2 = new Date(serverTime.replace(/-/g, "/")).getTime();
    //   let t3 = new Date(startTime.replace(/-/g, "/")).getTime();

    //   if(t1 < t2 ) return

    //   let time;
    //   if (status === 0) {
    //     this.$store.commit("v3IsShowTimeOutDialog", new Date().getTime());
    //     time = t3 - t2;
    //     this.$emit("statusChange", false);
    //   }
    //   if (status === 1) {
    //     time = t1 - t2;
    //     this.$emit("statusChange", true);
    //   }
    //   if (time <= 0) {
    //     time = 0;
    //   }

    //   this.time = time;
    //   console.log('===快3 time===', this.time);

    //   this.totalMilliseconds = this.time;
    //   this.endTime = this.now() + this.time;
    //   if (this.autoStart) {
    //     this.start();
    //   }
    // },

    async end() {
      console.log("end--------",this.counting);
      if (!this.counting) {
        return;
      }
      this.pause();
      this.totalMilliseconds = 0;
      this.counting = false;

      this.initData();
    },

    /**
     * Starts to countdown.
     * @public
     * @emits Countdown#start
     */
    start() {
      if (this.counting) {
        return;
      }

      this.counting = true;
      if (this.emitEvents) {
        /**
         * Countdown start event.
         * @event Countdown#start
         */
        // this.$emit('start');
      }

      this.continue();
    },

    /**
     * Continues the countdown.
     * @private
     */
    continue() {
      if (!this.counting) {
        return;
      }
      const delay = Math.min(this.totalMilliseconds, this.interval);

      if (delay > 0) {
        this.timeoutId = setTimeout(() => {
          this.progress();
        }, delay);
      } else {
        this.end();
      }
    },

    /**
     * Pauses the countdown.
     * @private
     */
    pause() {
      clearTimeout(this.timeoutId);
    },

    /**
     * Progresses to countdown.
     * @private
     * @emits Countdown#progress
     */
    progress() {
      if (!this.counting) {
        return;
      }

      this.totalMilliseconds -= this.interval;

      if (this.emitEvents && this.totalMilliseconds > 0) {
        /**
         * Countdown progress event.
         * @event Countdown#progress
         */
        this.$emit("progress", {
          days: this.days,
          hours: this.hours,
          minutes: this.minutes,
          seconds: this.seconds,
          milliseconds: this.milliseconds,
          totalDays: this.totalDays,
          totalHours: this.totalHours,
          totalMinutes: this.totalMinutes,
          totalSeconds: this.totalSeconds,
          totalMilliseconds: this.totalMilliseconds,
        });
      }

      this.continue();
    },

    /**
     * Aborts the countdown.
     * @public
     * @emits Countdown#abort
     */
    abort() {
      if (!this.counting) {
        return;
      }

      this.pause();
      this.counting = false;

      if (this.emitEvents) {
        /**
         * Countdown abort event.
         * @event Countdown#abort
         */
        this.$emit("abort");
      }
    },

    /**
     * Updates the count.
     * @private
     */
    update() {
      if (this.counting) {
        this.totalMilliseconds = Math.max(0, this.endTime - this.now());
      }
    },
  },
  beforeDestroy() {
    this.pause();
  },
};
</script>
<style lang="scss">
.bbs-countdown {
  color: #c4e3cf;
  font-size: 36rpx;
  line-height: 42rpx;
}
</style>
