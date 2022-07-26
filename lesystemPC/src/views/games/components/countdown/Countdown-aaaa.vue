<template>
  <ul class="vuejs-countdown">
    <!-- <li v-if="days > 0" >
      <p >{{ days | twoDigits }}</p>
      <p class="text">{{ days > 1 ? "days" : "day" }}</p>
    </li> -->
    <li class="digit">
      {{ hours | twoDigits }}
      <!-- <p class="text">{{ hours > 1 ? "hours" : "hour" }}</p> -->
    </li>
    <li class="digit">
      {{ minutes | twoDigits }}
      <!-- <p class="text">min</p> -->
    </li>
    <li class="digit">
      {{ seconds | twoDigits }}
      <!-- <p class="text">Sec</p> -->
    </li>
  </ul>
</template>

<script>
let interval = null;
export default {
  name: "vuejsCountDown",
  props: {
    ts: {
      type: Number,
      default: () => 0,
    },
    deadline: {
      type: String,
      default: () => "0",
    },
    stop: {
      type: Boolean,
    },
    curTime: {
      type: String,
      default: () => "0",
    },
  },
  data() {
    return {
      now: Math.trunc(new Date().getTime() / 1000),
      date: null,
      diff: 0,
    };
  },
  created() {
    this.startCount();
  },

  methods: {
    startCount() {
      if (!this.deadline) {
        throw new Error("Missing props 'deadline'");
      }

      this.date = Math.trunc(
        Date.parse(this.deadline.replace(/-/g, "/")) / 1000
      );

      if (!this.date) {
        throw new Error("Invalid props value, correct the 'deadline'");
      }
      let t = Math.trunc(new Date(this.curTime).getTime() / 1000);
      interval = setInterval(() => {
        t += 1;
        this.diff = this.date - t;
        // console.log(" this.diff==", this.diff);
        if (this.diff <= 0 || this.stop) {
          this.diff = 0;
          // Remove interval
          clearInterval(interval);
          this.$emit("timeEnd");
        }
      }, 1000);
    },
  },

  computed: {
    seconds() {
      return Math.trunc(this.diff) % 60;
    },

    minutes() {
      return Math.trunc(this.diff / 60) % 60;
    },

    hours() {
      return Math.trunc(this.diff / 60 / 60) % 24;
    },

    days() {
      return Math.trunc(this.diff / 60 / 60 / 24);
    },
  },
  watch: {
    ts(value) {
      this.startCount()
      // this.diff = this.date - this.now;
      // console.log(" this.diff==", this.diff);
      // if (this.diff <= 0 || this.stop) {
      //   this.diff = 0;
      //   // Remove interval
      //   clearInterval(interval);
      //   this.$emit("timeEnd");
      // }
    },
  },
  filters: {
    twoDigits(value) {
      if (value.toString().length <= 1) {
        return "0" + value.toString();
      }
      return value.toString();
    },
  },
  destroyed() {
    clearInterval(interval);
  },
};
</script>
<style>
.vuejs-countdown {
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  /* border: 1px solid blue; */
}
.vuejs-countdown li {
  display: inline-block;
  margin: 0 8px;
  text-align: center;
  position: relative;
}
/* .vuejs-countdown li p {
  margin: 0;
} */
.vuejs-countdown li:after {
  content: ":";
  position: absolute;
  top: 0;
  right: -13px;
  font-size: px;
}
.vuejs-countdown li:first-of-type {
  margin-left: 0;
}
.vuejs-countdown li:last-of-type {
  margin-right: 0;
}
.vuejs-countdown li:last-of-type:after {
  content: "";
}
.vuejs-countdown .digit {
  font-size: 26px;
  /* font-weight: 600; */
  color: #fff;
  /* line-height: 1.4; */
  /* margin-bottom: 0; */
}
.vuejs-countdown .text {
  text-transform: uppercase;
  margin-bottom: 0;
  font-size: 10px;
}
</style>
