<template>
  <view class="change-game">
    <view class="main-box">
      <view class="main-item" @click="showGameList">
        <text class="text-df margin-right-xs">{{ curGame }}</text>
        <i class="iconfont icon-icon-test1" style="font-size: 48rpx"></i>
      </view>

      <view
        class="main-item qihao"
        @click="isShowResultList = !isShowResultList"
      >
        <view>
          <text class="text-xs">第</text>
          <text class="previousPeriod text-xs">{{ latestPriodData.showPreviousPeriod }}</text>
          <text class="text-xs">期</text>
        </view>
        <view class="result">
          <view class="result-box"
            ><view
              ref="dice"
              class="dice"
              :class="'dice-0' + n"
              v-for="(n, i) in latestPriodData.previousResult"
              :key="i"
            ></view
          ></view>
          <i class="iconfont icon-icon-test1"></i>
        </view>
      </view>

      <view class="main-item time">
        <text>距{{ latestPriodData.showNumberOfPeriod}}期{{ statusText }}</text>
        <CountDownTimeSimple
          @statusChange="statusChange"
          @progress="progress"
          :latestPriodData="latestPriodData"
        />

        <CountDownTimeCss :ts="ts" />
      </view>
    </view>

    <view v-if="isShowResultList" class="result-list"><ResultList /></view>
    <view v-show="isShowSelectGame">
      <view
        class="cu-modal bottom-modal"
        :class="true ? 'show' : ''"
        @click.self="isShowSelectGame = false"
      >
        <view class="cu-dialog">
          <view class="padding-xl" style="padding: 0"><GameList /></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import ResultList from "./C1_resultList";
import GameList from "./ChangeGame_list.vue";
// import CountDownTimeSimple from "../CountDownTime_simple";
import CountDownTimeSimple from "../CountDownTimeSimple.vue";
import CountDownTimeCss from "../CountDownTime_css";
export default {
  props: {
    latestPriodData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      statusText: "截止",
      resultShowType: 1,
      isShowResultList: false,
      isShowSelectGame: false,
      gameObj: {},
      curGame: "",
      ts: 0, //传给css的倒计时
      nextPeriod: 0,
      numberOfPeriod: 0,
      previousResult: "",
      ids: [],
      els: [],
    };
  },
  components: {
    GameList,
    ResultList,
    CountDownTimeSimple,
    CountDownTimeCss,
  },

  created(){
    let {gameName} = this.$store.state.GDV3.v3IndexGameAllData
    this.curGame = gameName
  },

 

  methods: {
    rotateEl(el) {
      let deg = 0;
      let sid = setInterval(() => {
        el.style.transform = `rotateZ(${deg}deg) translateZ(0)`;
        deg += 10;

        if (deg > 360) {
          deg = 0;
        }
      }, 20);

      this.ids.push(sid);
    },

    cancleInterval() {
      this.ids.forEach((id) => {
        clearInterval(id);
      });

      this.els.forEach((obj) => {
        obj.$el.style.transform = `rotateZ(0deg) translateZ(0)`;
      });
    },

    statusChange(flag) {
      if (flag) {
        this.statusText = "截止";
        this.cancleInterval();
      } else {
        this.statusText = "开盘";

        console.log(this.els);
        this.els.forEach((obj) => {
          this.rotateEl(obj.$el);
        });
      }
    },

    progress(obj) {
      let { minutes, seconds } = obj;
      let m = minutes * 60 * 1000;
      let s = seconds * 1000;

      let { closeTime, startTime, serverTime } =
        this.$store.state.GDV3.v4latestPriodData;
      let t1 = new Date(closeTime.replace(/-/g, "/"));
      let t2 = new Date(startTime.replace(/-/g, "/"));
      // let t3 = new Date(serverTime).getTime()
      let t = +m + s;

      this.ts = (t / (t1 - t2)) * 100;
    },

    showGameList() {
      this.isShowSelectGame = true;
    },


  },
};
</script>

<style lang="scss" scoped>
@import url("@/common/css/imgcss.scss");
.change-game {
  position: relative;
  border-bottom: 1px solid #1c5a3f;
  background-color: #317455;
  // display: flex;
  // justify-content: space-around;
  .main-box {
    display: flex;
    justify-content: space-around;
    .main-item {
      width: 100%;
      color: #c4e3cf;
      display: flex;
      align-items: center;
      justify-content: center;
      text {
        color: #c4e3cf;
      }
    }
    .qihao {
      flex-direction: column;
      border-left: 1px solid #1c5a3f;
      border-right: 1px solid #1c5a3f;
      .result {
        display: flex;
        align-items: center;
        .dice {
          transform: rotate(0deg);
        }
        .result-box {
          display: flex;
        }
        .icon-icon-test1 {
          color: #c4e3cf;
        }
      }
    }
    .time {
      flex-direction: column;
      font-size: 20rpx;
      line-height: 30rpx;
      padding: 10rpx;
    }
  }

  .previousPeriod {
    color: #b62929;
  }

  .result-list {
    position: absolute;
    width: 100%;
    z-index: 10;
  }
}
</style>
