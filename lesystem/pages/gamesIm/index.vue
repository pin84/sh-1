<template>
  <view v-if="curGameId" class="buy-wrap flex">
    <view class="status_bar">
      <!-- 这里是虚拟的状态栏,为了在app里不遮挡顶部 -->
    </view>
    <view class="but-title" style="z-index: 30">
      <uni-nav-bar color="#ffffff" backgroundColor="#000" @clickLeft="clickLeft" left-icon="back" right-icon="bars"
        @clickRight="clickRight">
        <NavTitle :isShowTrangle="isShowTitleTrangle" :isOffcial="isOffcial" :title="curGameName"
          @togglePlayType="togglePlayType" @toggleSetting="isShowTitleTrangle = !isShowTitleTrangle"
          @close="isShowTitleTrangle = false" />
      </uni-nav-bar>

      <view v-if="isShowTitleTrangle" class="set-box">
        <NavTitleSetting @close="isShowTitleTrangle = !isShowTitleTrangle" :textList="textList" />
      </view>
    </view>

    <view v-show="isShowPlayType" class="play-type-box" style="z-index: 20">
      <view class="status_bar">
        <!-- 这里是虚拟的状态栏,为了在app里不遮挡顶部 -->
      </view>
      <PlayType v-if="curGameId" @closePlayType="closePlayType" @changeGame="changeplay" />
    </view>
    <view class="bc" v-if="curGameId">
      <Balance />
    </view>

    <view class="main-body" v-if="curGameId">
      <view class="mian-body-c">
        <ChangeGame :latestPriodData="latestPriodData" v-if="!$store.state.GDV3.v3ShowRecord && curGameId" />
        <view v-if="isShowCountDown && curGameId" class="count-down-box">
          <CountDownTime :latestPriodData="latestPriodData" />
        </view>
        <view class="game-box">
          <GameList :isShowRank="isShowRank" :curGameId="curGameId" />

          <StoppedSalling v-if="issStopSales" />
        </view>
      </view>
    </view>

    <view>
      <DrawerModalR :isShow="isShowDrawerR" @hideModal="isShowDrawerR = false" />
      <!-- <GameIsEnable :isEnabled="isEnabled" /> -->
      <!-- <Dialoga  /> -->
    </view>
  </view>
</template>

<script>
import PlayType from "@/pages/gamesIm/common/playType";
import GameIsEnable from "@/pages/gamesIm/common/GameIsEnable.vue";
import Balance from "@/pages/gamesIm/common/Balance.vue";
import ChangeGame from "@/pages/gamesIm/common/ChangeGame";
import NavTitleSetting from "@/pages/gamesIm/common/NavTitleSetting.vue";
import CountDownTime from "@/pages/gamesIm/common/CountDownTime.vue";
import NavTitle from "@/pages/gamesIm/common/NavTitle.vue";
import DrawerModalR from "@/pages/commonPage/DrawerModalR.vue";
import StoppedSalling from "@/pages/commonPage/StoppedSalling.vue";
import GameList from "./gameList";
import Dialoga from "@/components/lesystem/Dialog";
import allIds from "./ids";
export default {
  data() {
    return {
      requestFailTimes: 0,
      interval: null,
      latestPriodData: {},
      textList: [], //导航右边的齿轮的文字列表
      isOffcial: false,
      curGameId: 0,
      isEnabled: 0,
      previousPeriod: 0,
      issStopSales: false,
      isShowTitleTrangle: false,
      isShowDrawerR: false,
      curGameName: "",
      isShowPlayType: false,

      isShowCountDown: true,
      isShowRank: false,
      isShowWenlu: true,
    };
  },
  components: {
    NavTitle,
    PlayType,
    Balance,
    CountDownTime,
    ChangeGame,
    DrawerModalR,
    NavTitleSetting,
    StoppedSalling,
    GameIsEnable,
    GameList,
    Dialoga,
  },

  watch: {
    "$store.state.GDV3.v3IndexGame": {
      handler: async function (val) {
        this.$store.commit("v3IsShowNumBaket", false);
        this.initData();
      },
      deep: true,
    },

    "$store.state.GDV3.v3ShowRecord": function (val) {
      this.initPage(val);
    },
    "$store.state.GDV3.v3IsShowNumBaket": function (val) {
      this.initPage(val);
    },
  },

  onShow: async function () {
    this.$store.commit("v3ShowRecord", false); // 解决点击投注记录页面不切换的问题
  },


  async created() {
    await this.initData();
    this.initPage();
  },

  mounted() {
    this.loopRequest();
  },

  destroyed() {
    this.retsetPage()
  },

  methods: {
    retsetPage() {
      clearInterval(this.interval);

      this.$store.commit("v3ShowRecord", false);
      this.$store.commit("setNumBasket", []);
      this.$store.commit("v3CurPlayList", {});
      this.$store.commit("v3IsShowNumBaket", false);
      this.$store.commit("v3OfficialRate", {
        rate: 1, // 元角分 角为0.1，分为0.01
        ratio: 1, //多少倍,
        odds: 0, //赔率,
        percentage: 0, // 百分比 ,从广西快3后新增的字段
        selectBack: 1, // 信用 ，
      });
    },
    initPage(val) {
      let routes = getCurrentPages();
      let { id } = routes[routes.length - 1].options;
      id = Number(id);

      let idType;
      for (let [key, value] of Object.entries(allIds)) {
        if (value.includes(id)) {
          idType = key;
        }
      }

      let ids = [105, 106];
      if (ids.includes(Number(idType))) {
        this.isShowCountDown = false;
        this.isShowRank = false;
      } else {
        if (val) {
          this.isShowCountDown = false;
        } else {
          this.isShowCountDown = true;
        }
      }

      if (idType == 1) {
        this.isShowRank = false;
      }

      let ids1 = [118, 119, 116, 121, 1, 2, 595];
      if (ids1.includes(id)) {
        this.isShowWenlu = false;
      } else {
        this.isShowWenlu = true;
      }
    },
    async initData() {
      this.$store.commit("v3NumBasket", "clearAll");
      this.curGameId = 0;
      this.isShowPlayType = false;
      let routes = getCurrentPages();
      let { id } = routes[routes.length - 1].options;

      id = Number(id);

      let d = {
        url: this.$api.getIndexData,
        data: {
          id: id,
        },
        // isShowLoading: false,
      };
      // console.log('--index params-', d);
      let res = await this.$http(d);

      // console.log(res);
      let { code, message } = res;
      if (code == -9999) {
        uni.reLaunch({
          url: "/",
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
                uni.redirectTo({
                  url: "/pages/index/index/lecaiIndex",
                });
              }
            },
          });
        }
      }

      // console.log('--index res====', res);
      let { gameType } = res.data;

      let obj1 = Object.assign({}, res.data, { curGameId: id });
      this.$store.commit("v3IndexGameAllData", obj1);

      this.isOffcial = gameType === 0 ? false : true;
      this.isShowRank = gameType === 0 ? true : false;

      let textList = [];
      if (gameType == 0) {
        textList = ["近期开奖", "玩法说明"];
      } else {
        textList = ["走势图", "近期开奖", "玩法说明"];
      }
      this.textList = textList;

      let latestPriodData = res.data.latestPriodData;
      this.latestPriodDataHandler(latestPriodData);
      //初始化具体游戏
      setTimeout(() => {
        this.gameIdHandler(id);
        this.initPage();
      }, 100);

      return;
    },

    gameIdHandler(id) {
      for (let [key, value] of Object.entries(allIds)) {
        if (value.includes(id)) {
          id = key;
          break;
        }
      }

      this.curGameId = Number(id);
    },

    async loopRequest() {
      let routes = getCurrentPages();
      let { id } = routes[routes.length - 1].options;
      id = Number(id);

      let d = {
        url: this.$api.getNewPeriod,
        isShowLoading: false,
        data: {
          gameId: id,
        },
      };

      this.interval = setInterval(async () => {
        let res = await this.$http(d);
        if (res.code == -4000) {
          if (this.requestFailTimes < 60) {
            this.requestFailTimes++;
            return;
          }
          this.requestFailTimes = 0;
          // clearInterval(this.interval);
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

    latestPriodDataHandler(obj) {
      let {
        serverTime,
        status,
        numberOfPeriod,
        previousPeriod,
        previousResult,
        isEnabled,
        issStopSales,
        closeTime,
        startTime,
      } = obj;

      if (previousResult && !Array.isArray(previousResult)) {
        obj.previousResult = previousResult.split(",");
      }


  // console.log(obj,this.curGameId == 106,this.curGameId == 105,obj.previousPeriod,obj.previousPeriod.slice(4));
      if (this.curGameId == 106 || this.curGameId == 105) {
        if (obj.previousPeriod) {
          obj.showPreviousPeriod = obj.previousPeriod.slice(4)
          obj.showNumberOfPeriod = obj.numberOfPeriod.slice(4)
        }
      }


      this.latestPriodData = obj;

      // console.log(obj);
      this.$store.commit("v4latestPriodData", obj);
      this.$store.commit("v3SetIndexGameData", obj);

      if (this.previousPeriod != previousPeriod) {
        //更新问路的数据
        this.$store.commit("setUpdataWenLu", new Date().getTime());
        this.$store.commit("latestPriodData", obj);
        if (this.previousPeriod) {
          this.$myAudio.play();
        }
        this.previousPeriod = previousPeriod;
      }

      this.issStopSales = issStopSales;

      if (isEnabled === 1) {
        this.isEnabled = 1;
      } else {
        this.isEnabled = 0;
      }
      return;
    },

    //选择游戏大类  五星、后四 等。缓存大类的名字，用于切换不同的游戏界面
    changeplay(name) {
      this.curGameName = name;
      // console.log('--1----',this.curGameName);
    },
    closePlayType(name) {
      this.isShowPlayType = false;
      this.curGameName = name;
      // console.log('--3----',this.curGameName);
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
.buy-wrap {
  background-color: #fff;
  position: relative;
  height: 100vh;
  flex-direction: column;
  overflow: hidden;

  .bc {
    flex: 0 0 35px;
    z-index: 10;
  }

  .but-title {
    position: relative;

    .set-box {
      position: absolute;
      right: 0;
      z-index: 99999;
    }
  }

  .play-type-box {
    position: absolute;
    z-index: 2;
    top: 44px;
    width: 100%;
  }

  // .c-box {
  //   padding: 20rpx 20rpx;
  // }
  .main-body {
    height: 100%;
    position: relative;
    overflow: hidden;

    .mian-body-c {
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;

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
