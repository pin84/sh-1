<template>
  <view  v-if="indexGamgeDone" class="game-aa">
    <view class="status_bar">
      <!-- 这里是虚拟的状态栏,为了在app里不遮挡顶部 -->
    </view>
    <view class="but-title" style="z-index: 30">
      <uni-nav-bar
        color="#ffffff"
        backgroundColor="rgb(47 47 47)"
        @clickLeft="clickLeft"
        left-icon="back"
        right-icon="bars"
        @clickRight="clickRight"
        class="uni-nav-bar"
      >
        <NavTitle
          :isShowTrangle="isShowTitleTrangle"
          :isOffcial="isOffcial"
          :title="curGameName"
          @togglePlayType="togglePlayType"
          @toggleSetting="toggleSetting"
        />
      </uni-nav-bar>

      <view v-if="isShowTitleTrangle" class="set-box" >
        <NavTitleSetting @close="closeSetting" :textList="textList" />
      </view>
    </view>

    <view v-show="isShowPlayType" class="play-type-box" style="z-index: 20">
      <view class="status_bar">
        <!-- 这里是虚拟的状态栏,为了在app里不遮挡顶部 -->
      </view>
      <PlayType
        v-if="indexGamgeDone"
        @donePlayType="donePlayType"
        @closePlayType="closePlayType"
        @changeGame="changeGame"
        @changeGameType="changeGameType"
      />
    </view>

    <view class="bc-box" v-if="indexGamgeDone" style="z-index: 10">
      <Balance :ts="ts" />
    </view>

    <view
      v-if="indexGamgeDone && isDonePlayType"
      class="main-body"
      :class="{ 'stopped-salling': isStoppedSalling }"
    >
      <view class="mian-body-c">
        <ChangeGame
          v-if="!isShowRecord"
          :previousPeriod="previousPeriod"
          :previousResult="previousResult"
          :latestPriodData="latestPriodData"
        />
        <view
          class="count-down-box"
          v-show="!isShowRecord && !$store.state.GDV3.v3IsShowNumBaket"
        >
          <CountDownTime :latestPriodData="latestPriodData" />
        </view>

        <view class="game-box">
          <OfficialGame v-if="isOffcial" />
          <OtherGame v-else />

          <StoppedSalling v-if="isStoppedSalling" />
        </view>
      </view>
    </view>

    <view>
      <DrawerModalR
        :isShow="isShowDrawerR"
        @hideModal="isShowDrawerR = false"
      />
      <!-- <Dialog /> -->
    </view>
  </view>
  <!-- <GameIsEnable/ :isEnabled="isEnabled" /> -->
</template>

<script>
import OtherGame from "./otherGame";
import OfficialGame from "./officialGame";
import PlayType from "@/pages/games/common/PlayType.vue";
import NavTitle from "@/pages/gamesIm/common/NavTitle.vue";
import Balance from "@/pages/gamesIm/common/Balance.vue";
import ChangeGame from "@/pages/gamesIm/common/ChangeGame/index.vue";
import DrawerModalR from "@/pages/commonPage/DrawerModalR.vue";
import NavTitleSetting from "@/pages/gamesIm/common/NavTitleSetting.vue";
import StoppedSalling from "@/pages/commonPage/StoppedSalling.vue";
import CountDownTime from "@/pages/gamesIm/common/CountDownTime.vue";
import Dialog from "@/components/lesystem/Dialog";
export default {
  // mixins: [http],
  data() {
    return {
      requestFailTimes: 0,
      interval: null,
      latestPriodData: {},
      textList: [], //导航右边的齿轮的文字列表
      isShowRecord: false,
      ts: 0, //初始化Balance页面
      isDonePlayType: false,
      indexGamgeDone: false,
      countDownStatus: 2,
      isOffcial: false,
      countDownObj: {},
      curGameId: 0,
      isEnabled: 0,
      numberOfPeriod: 1,
      previousPeriod: 0,
      previousResult: [],
      strPreviousResult: "", //previousResult 的string类型缓存，比较用数据变化用
      isStoppedSalling: false,
      isShowTitleTrangle: false,
      isShowDrawerR: false,
      isShowBasket: true,
      isShowPlayType: false,
      curGameName: "定位胆",
    };
  },
  components: {
    OtherGame,
    OfficialGame,
    NavTitle,
    PlayType,
    Balance,
    CountDownTime,
    ChangeGame,
    DrawerModalR,
    NavTitleSetting,
    StoppedSalling,
    Dialog,
  },

  watch: {
    "$store.state.GDV3.v3ShowRecord": function (val) {
      this.isShowRecord = val;
    },
  },

  onShow: function () {
    this.$store.commit("v3ShowRecord", false);
    // this.resetpage();
    // this.getGameData();
    // this.loopRequest();

    // console.log('=======onShow=========');
  },

  created() {
    this.getGameData();
  },

  mounted() {
    this.loopRequest();
  },

  destroyed() {
    this.resetpage();
  },

  methods: {
    resetpage() {
      clearInterval(this.interval);
      this.$store.commit("setNumBasket", []);
    },
    donePlayType() {
      this.isDonePlayType = true;
    },
    closeSetting() {
      this.isShowTitleTrangle = false;
    },
    toggleSetting() {
      this.isShowTitleTrangle = !this.isShowTitleTrangle;
    },
    async getGameData() {
      this.indexGamgeDone = false;
      let routes = getCurrentPages();
      let { id } = routes[routes.length - 1].options;
      this.curGameId = id;

      this.isShowPlayType = false;
      let d = {
        url: this.$api.getIndexData,
        data: {
          id: this.curGameId,
        },
      };
      let res = await this.$http(d);
      console.log(res);
      let { code, message } = res;
      if (code == -9999) {
        uni.reLaunch({
          url: "/pages/login/login/login",
        });
        return;
      } else if (code < 0) {
        if (code == -4000) {
        } else {
          uni.showModal({
            title: "提示",
            content: message,
            showCancel: false,
            success: (showResult) => {
              if (showResult.confirm) {
                console.log("ok");
                uni.redirectTo({
                  url: "/pages/index/index/lecaiIndex",
                });
              }
            },
          });
        }
      }

      let obj = Object.assign({}, res.data, { curGameId: this.curGameId });
      this.$store.commit("v3IndexGameAllData", obj);

      let { gameType, resultList } = res.data;
      this.isOffcial = gameType === 0 ? false : true;

      let textList = [];
      if (gameType == 0) {
        textList = ["近期开奖", "玩法说明"];
      } else {
        textList = ["走势图", "近期开奖", "玩法说明"];
      }
      this.textList = textList;

      this.$store.commit("setGameResultList", resultList);
      await this.latestPriodDataHandler(res.data.latestPriodData);

      setTimeout(() => {
        this.indexGamgeDone = true;
      }, 100);
    },

    async loopRequest() {
      let routes = getCurrentPages();
      let { id } = routes[routes.length - 1].options;

      let d = {
        url: this.$api.getNewPeriod,
        isShowLoading: false,
        data: {
          gameId: id,
        },
      };

      this.interval = setInterval(async () => {
        let res = await this.$http(d);
        console.log(res);
        if (res.code == -4000) {
          if (this.requestFailTimes < 60) {
            this.requestFailTimes++;
            return;
          }
          this.requestFailTimes = 0;
          await this.$util.showConfirm({
            content: "网络连接失败，点确定刷新页面",
            showCancel: false,
          });
          setTimeout(() => {
            location.reload();
          }, 500);
        } else {
          this.requestFailTimes = 0;
          this.latestPriodDataHandler(res.data);
        }
      }, 2000);
    },

    clickRight() {
      this.isShowDrawerR = true;
    },

    changeGameType(id) {
      this.isDestroyed = true;
      this.curGameId = id;
      this.getGameData();

      this.loopRequest();
    },

    latestPriodDataHandler(obj) {
      let {
        status,
        previousPeriod,
        previousResult,
        numberOfPeriod,
        isEnabled,
        issStopSales,
        closeTime,
        serverTime,
        startTime,
        nextPeriod,
        fid
      } = obj;

      if (!Array.isArray(obj.previousResult)) {
        if(previousResult){
          obj.previousResult = obj.previousResult.split(",");
        } else {
          obj.previousResult = []
        }

      }

      this.latestPriodData = obj;
      this.$store.commit("v4latestPriodData", obj);
      //v3写法
      if (this.previousPeriod != previousPeriod) {
        this.previousPeriod = Number(previousPeriod);
        //更新问路的数据
        // this.$store.commit("setUpdataWenLu", new Date().getTime());
        this.$store.commit("latestPriodData", obj);
      }

      if (this.countDownStatus == 2 || this.countDownStatus !== status) {
        this.countDownStatus = status;
        this.$store.commit("setIndexGameData", obj); //保留，第一版的写法用
        this.$store.commit("v3SetIndexGameData", obj);
      }

      this.numberOfPeriod = Number(numberOfPeriod || 0);

      if (previousResult) {
        if (this.strPreviousResult !== previousResult) {
          this.previousResult = previousResult.split(",");
          //更新问路的数据
          this.$store.commit("setUpdataWenLu", new Date().getTime());
          if (this.strPreviousResult != "") {
            this.$myAudio.play();
          }
          this.strPreviousResult = previousResult;
        }
      }
      this.isStoppedSalling = issStopSales;
      if (isEnabled === 1) {
        this.isEnabled = 1;
      } else {
        this.isEnabled = 0;
      }

      return true;
    },

    showBasket() {
      //显示号码蓝，foot触发的事件
      this.isShowBasket = !this.isShowBasket;
    },

    //选择游戏大类  五星、后四 等。缓存大类的名字，用于切换不同的游戏界面
    changeGame(name) {
      this.curGameName = name;
      // uni.setNavigationBarTitle({
      //   title: name,
      // });
    },
    closePlayType(name) {
      this.isShowPlayType = false;
      this.curGameName = name;

      //playType完成

      // uni.setNavigationBarTitle({
      //   title: name,
      // });
    },
    togglePlayType() {
      this.isShowPlayType = !this.isShowPlayType;
    },
    clickLeft() {
      uni.reLaunch({
        url: "/pages/index/index/lecaiIndex",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.game-aa {
  position: relative;
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .but-title {
    position: relative;
    .uni-nav-bar {
      width: 100%;
      overflow: hidden;
    }
    .set-box {
      position: absolute;
      right: 0;
      // width: 300rpx;
      // height: 300rpx;
      // border: 1px solid red;
      z-index: 99999;
    }
  }
  .play-type-box {
    position: absolute;
    z-index: 2;
    top: 44px;
    width: 100%;
  }
  .bc-box {
    flex: 0 0 30px;
  }
  .main-body {
    height: 100%;
    overflow: scroll;
    .mian-body-c {
      height: 100%;
      display: flex;
      flex-direction: column;
      .game-box {
        position: relative;
        height: 100%;
        overflow: hidden;
      }
    }
  }
  .stopped-salling {
    overflow: hidden;
  }

  .uni-navbar__header-btns {
    // border: 1px solid red;
    width: 0;
  }
}
</style>
