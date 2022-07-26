<template>
  <div class="gameHeader">
    <div class="header">
      <div class="headerMain">
        <div class="left">
          <div class="pkleft">
            <img :src="gameicon" width="60" height="60" />
          </div>
          <div class="pkright">
            <ul>
              <li>{{ gameName }}</li>
              <li v-show="officialUrl != ''">
                <a :href="officialUrl" target="_blank">官方网址</a>
              </li>
            </ul>
            <div class="kong"></div>
            <div class="tzBox">
              <div class="tzleft">
                <p>
                  第<span>{{ numberOfPeriod }}</span
                  >期
                </p>
                <p>{{ tooltipText }}</p>
              </div>
              <div v-if="serverTime" class="tztime">
                <Countdown
                  :timestamps="ts"
                  :deadline="time"
                  @timeElapsed="onTimeEnd"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="center">
          <div class="numBox">
            <span v-for="(n, idx) in previousResult" :key="idx">{{ n }}</span>
          </div>
          <div class="qi">
            <p class="dqi">
              第 <span>{{ previousPeriod }}</span> 期
            </p>
            <span class="jg pointer" @click="toResult">开奖结果</span>
            <span class="audio" @click="isShowAudio = !isShowAudio"></span>

            <span class="au-box" v-show="isShowAudio">
              <SwitchAudio
                @openSound="openSound"
                @close="isShowAudio = false"
              />
            </span>
            <!--<a href="#">开奖动画</a>-->
          </div>
        </div>
        <div class="right">
          <ul>
            <li>
              <router-link to="/"
                ><img src="/images/games/fhsy.png" />
                <p>返回首页</p>
              </router-link>
            </li>
            <li>
              <a :href="kefuUrl" target="_blank"
                ><img src="/images/games/zxkf.png" />
                <p>在线客服</p>
              </a>
            </li>
            <li @click="isShow = !isShow">
              <a href="#"
                ><img src="/images/games/gzsm.png" />
                <p>规则说明</p>
              </a>
            </li>
            <li>
              <a @click="logout" style="cursor: pointer"
                ><img src="/images/games/dczh.png" />
                <p>登出账号</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <MyMask v-if="isShow">
      <Rule @close="close" />
    </MyMask>
  </div>
</template>
<script>
import Countdown from "@/views/games/components/countdown/FlipSecondsCountdown.vue";

export default {
  components: {
    Countdown,
    SwitchAudio: () => import("./SwitchAudio"),
    Rule: () => import("@/views/games/rule/index.vue"),
    MyMask: () => import("@/views/games/components/mask/index.vue"),
  },
  props: {
    indexGameData: {
      type: Object,
      default: () => {},
    },
    latestPriodData: {
      type: Object,
      default: () => {},
    },
    numberOfPeriod: {
      type: String,
      default: () => "0",
    },
    previousPeriod: {
      type: String,
      default: () => "0",
    },
    previousResult: {
      type: Array,
      default: () => [],
    },
    gameicon: {
      type: String,
      default: () => "",
    },
    officialUrl: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      curTime: "",
      closeTime: "",
      isShow: false,
      isShowAudio: true,
      target: "2021/04/20 23:40",
      time: 5,

      ts: 0,
      gameName: "",
      tooltipText: "剩余投注时间",
      curId: 0,
      kefuUrl: "",
      isOpenSound: false,
      status: null,
      serverTime: 0,
    };
  },

  created() {
    this.initData();
  },

  mounted() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        // console.log("页面被挂起--",new Date());
      } else {
        setTimeout(() => {
          console.log("页面呼出--", new Date());
          this.setTime();
        }, 2000);
      }
    });
  },

  methods: {
    setTime() {
      let { closeTime, serverTime, startTime, status } = this.latestPriodData
      this.status = status
      // console.log('==closeTime-a===',closeTime);
      // console.log('==serverTime-a===', serverTime);
      // console.log('==startTime-a===',startTime);
      // console.log('==status-a===',status);
      let t1;
      if (closeTime) {
        t1 = new Date(closeTime.replace(/-/g, "/")).getTime();
      }
      let t2 = new Date(serverTime.replace(/-/g, "/")).getTime();
      let t3 = new Date(startTime.replace(/-/g, "/")).getTime();
      this.serverTime = t2;
      let time;
      if (status == 0) {
        this.tooltipText = "距开盘时间";
        time = t3 - t2;
      } else {
        this.tooltipText = "剩余投注时间";
        time = t1 - t2;
      }
      // console.log('--time--',time);
      if(time == 0 || time < 0){
       time = 5000 
       this.tooltipText = "距开盘时间";
      } 



       this.time = time / 1000;

      let ts = new Date().getTime();
      this.ts = ts;
      this.closeTime = closeTime;
      this.status = status;
    },
    close() {
      this.isShow = !this.isShow;
    },
    openSound(flag) {
      this.isOpenSound = flag;
    },
    async progress(obj) {
      let { totalSeconds } = obj;
      if (totalSeconds == 30) {
        let url = "sound/closeTip";
        this.$myAudio.playTips(url);
      }

      if (totalSeconds == 8) {
        let url = "sound/closeCount";
        this.$myAudio.playTips(url);
      }
    },
    onTimeEnd() {
      // console.log('end');
      // if (this.status == 1) {
      //   this.$emit("onTimeEnd");
      // }
      this.setTime()
    },
    toResult() {
      let { id } = this.$store.state.gd.indexGame;

      this.$router.push({ path: "/result", query: { id } });
    },
    logout: function () {
      this.$get("Pc.Login.logout").then(() => {
        localStorage.removeItem("user_info");
        localStorage.removeItem("token");
        this.$router.push("/user/login");
      });
    },
    async initData() {
      let kefu = localStorage.getItem("kefu");
      this.kefuUrl = kefu;
      let { closeTime, serverTime, startTime, status } = this.latestPriodData;
      let { gameName } = this.indexGameData;
      this.gameName = gameName;
      this.status = status

      this.setTime()

   
    },
  },
};
</script>

<style lang="scss" scoped>
.kong {
  clear: both;
}

.hide {
  display: none;
}

.top {
  height: 34px;
  border-top: 1px solid #b6b4b6;
  border-bottom: 1px solid #b6b4b6;
  background: #f3f3f3;
}

.topCenter {
  width: 1320px;
  height: 34px;
  margin: 0 auto;
}

.topLeft {
  margin-left: 7px;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.topLeft ul li {
  float: left;
}

.topCenter ul li.axis {
  height: 13px;
  width: 1px;
  margin: 10px 11px;
  background-color: #ccc;
}

.topLeft ul li a.login {
  line-height: 34px;
  height: 34px;
  color: #666;
}

.topLeft ul li a.register {
  color: #f87f25;
}

.topCenter a {
  font-size: 13px;
  height: 34px;
  line-height: 34px;
}

.topCenter .topRight {
  float: right;
}

.topRight ul li {
  float: left;
}

.topRight a.red {
  color: #f15454;
}

.topRight a.black {
  color: black;
}

.header {
  width: 100%;
  height: 122px;
  background-color: #f15454;
}

.headerMain {
  width: 1320px;
  margin: 0 auto;
  position: relative;
}

.headerMain .left {
  float: left;
  width: 430px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100px;
  background-color: #da352f;
  border-radius: 5px;
  margin-top: 11px;
}

.headerMain .left .pkleft {
  float: left;
  margin-left: 16px;
  margin-top: 15px;
}

.headerMain .left .pkright {
  float: left;
  margin-left: 18px;
}

.headerMain .left .pkright ul {
  height: 22px;
  margin-top: 17px;
}

.headerMain .left .pkright ul li {
  float: left;
  color: white;
  font-size: 22px;
  font-weight: bold;
}

.headerMain .left .pkright ul li a {
  display: inline-block;
  text-align: center;
  width: 75px;
  height: 22px;
  line-height: 22px;
  background-color: #eb2629;
  font-size: 13px;
  border-radius: 4px;
  color: white;
  margin-left: 83px;
}

.headerMain .left .pkright .tzBox {
  height: 42px;
  width: 290px;
  border: 1px solid #b4221a;
  border-radius: 5px;
  background-color: #cf271e;
  margin-top: 5px;
  border: 1px solid #fff;
  display: flex;
  justify-content: space-between;
}

.headerMain .left .pkright .tzleft {
  float: left;
  margin-left: 26px;
  margin-right: 22px;
}

.headerMain .left .pkright .tzleft p {
  color: white;
  height: 21px;
  line-height: 21px;
  font-size: 13px;
}

.headerMain .left .pkright .tzleft p span {
  color: #f78400;
}

.headerMain .left .pkright .tztime {
  float: right;
  margin-top: 6px;
  // border: 1px solid #fff;
}

.headerMain .left .pkright .tztime .time {
  font-size: 20px;
  color: white;
}

.headerMain .left .pkright .tztime .mtime {
  color: white;
}

.headerMain .center {
  width: 560px;
  height: 100px;
  float: left;
  position: absolute;
  left: 438px;
  border-radius: 5px;
  background-color: #da352f;
  border-radius: 5px;
  margin-top: 11px;
}

.headerMain .center .numBox span {
  display: inline-block;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  text-align: center;
  line-height: 30px;
  color: #c82d25;
  background-color: white;
  margin-right: 19px;
  margin-top: 18px;
  box-shadow: 2px 2px 5px #a11e17;
}

.headerMain .center .qi {
  padding-top: 14px;
  text-align: center;
}

.headerMain .center .qi .dqi {
  display: inline-block;
  font-size: 14px;
  color: white;
}

.headerMain .center .qi .au-box {
  position: absolute;
  z-index: 100;
  top: 40px;
  right: 150px;
}

.headerMain .center .qi .jg {
  font-size: 14px;
  color: white;
  margin-left: 15px;
  display: inline-block;
}

.headerMain .center .qi .audio {
  width: 21px;
  height: 20px;
  display: inline-block;
  background: url("/images/games/audio.png") left center no-repeat;
  margin-left: 12px;
  margin-right: 5px;
  vertical-align: middle;
}

.headerMain .center .qi .audio:hover {
  cursor: pointer;
}

.headerMain .center .qi a {
  display: inline-block;
  width: 93px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  color: black;
  background-color: #eeb4b0;
  border-radius: 5px;
  font-size: 13px;
}

.headerMain .right {
  width: 314px;
  float: left;
  height: 100px;
  position: absolute;
  right: 0px;
  border-radius: 5px;
  background-color: #da352f;
  margin-left: 3px;
  margin-top: 11px;
}

.headerMain .right ul {
  margin-top: 18px;
  margin-left: 25px;
}

.headerMain .right ul li {
  float: left;
  margin-right: 22px;
}

.headerMain .right ul li a {
  display: inline-block;
  color: white;
  width: 50px;
  text-align: center;
}

.headerMain .right ul li a p {
  font-size: 12px;
  color: white;
}

.headerMain .center .numBox {
  height: 51px;
  width: 100%;
  text-align: center;
}
</style>
