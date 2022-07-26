<!--精确到毫秒的倒计时-->
<template>
  <div class="uni-countdown">
    <div
      :style="{ color: color, fontSize: fontSize }"
      class="uni-countdown__number"
    >
      {{ i }}
    </div>
    <div
      :style="{ color: color, fontSize: fontSize }"
      class="uni-countdown__splitor"
    >
      :
    </div>
    <div
      :style="{ color: color, fontSize: fontSize }"
      class="uni-countdown__number"
    >
      {{ s }}
    </div>
    <div
      :style="{ color: color, fontSize: fontSize }"
      class="uni-countdown__splitor"
    >
      :
    </div>
    <div
      :style="{ color: color, fontSize: fontSize }"
      class="uni-countdown__number"
    >
      {{ ms }}
    </div>
  </div>
</template>
<script>
export default {
  name: "bbscCountDown",
  props: {
    color: {
      type: String,
      default: "#000000",
    },
    fontSize: {
      type: String,
      default: "28px",
    },
    nextOpenTime: {
      type: Number,
       default: ()=>0
    },
    serverTime: {
      type: Number,
      default: ()=>0
    },
    ts: {
      type: Number,
      default: ()=>0
    },
  },
  data() {
    return {
      timer: "",
      //d: '00',
      //h: '00',
      i: "00",
      s: "00",
      ms: "0",
      //leftTime: 0,
      //minute:0,
      //second:0,
      //msecond:0,
      //seconds: 0,
      //倒计时总共多少毫秒
      mseconds: 0,
    };
  },
  watch: {
    ts() {
      clearInterval(this.timer);
      this.setupCountdown();
    },
  },
  created: function (e) {
    clearInterval(this.timer);
    this.setupCountdown();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    setupCountdown() {
      // let start_time = (new Date()).getTime()

      let now = new Date().getTime();

      console.log(now,this.serverTime)

      this.mseconds = this.nextOpenTime - this.serverTime;

      if (this.mseconds <= 0) {

        console.log('aa');
        return;
      }
      this.countDown();
      //每10毫秒倒计时一次
      this.timer = setInterval(() => {
        this.mseconds = this.mseconds - 1000;
        if (this.mseconds <= 0) {
          this.timeUp();
          return;
        }
        this.countDown();
      }, 1000);

      // let end_time = (new Date()).getTime()
      // let diff = end_time - start_time
      // console.log('countDown函数运行时间(ms)为：')
      // console.log(diff)
    },

    // toSeconds(day, hours, minutes, seconds) {
    // 	return day * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + seconds
    // },
    timeUp() {
      clearInterval(this.timer);
      this.$emit("timeup");
    },

    countDown() {
      let mseconds = this.mseconds;
      let [minute, second, msecond] = [0, 0, 0];
      if (mseconds > 0) {
        minute = Math.floor(mseconds / (60 * 1000));
        second = Math.floor(mseconds / 1000) - minute * 60;
        let msecondFull =
          Math.floor(mseconds) - minute * 60 * 1000 - second * 1000;
        msecond = Math.floor(msecondFull / 100); //msecondFull 有三位数，只取两位。比如789毫秒只取78
      } else {
        this.timeUp();
      }

      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }
      // if (msecond < 10) {
      // 	msecond = '0' + msecond
      // }

      this.i = minute + "";
      this.s = second + "";
      this.ms = msecond + "";
      //console.log("count down:"+minute+":"+second+":"+msecond);
    },
  },
};
</script>
<style>
@charset "UTF-8";

.uni-countdown {
  display: inline-flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.uni-countdown__splitor {
  height: 44upx;
  line-height: 44upx;
  margin: 0 4upx;
  /* font-size: 28rpx */
}

.uni-countdown__number {
  line-height: 44upx;
  height: 44upx;
  /* font-size: 28upx; */
}
</style>