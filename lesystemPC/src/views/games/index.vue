<template>
  <div class="game-index gongyibg">
    <main class="main-body">
      <div v-if="isDoneFirstRequest" class="header">
        <Header
          :numberOfPeriod="numberOfPeriod"
          :previousPeriod="previousPeriod"
          :previousResult="previousResult"
          :gameicon="gameicon"
          :officialUrl="officialUrl"
          @onTimeEnd="isShowOutTimeTips = true"
          :latestPriodData="latestPriodData"
          :indexGameData="indexGameData"
        />
      </div>

      <div class="main-wrapper" v-if="isDoneFirstRequest">
        <aside class="aside bl">
          <Aside />
        </aside>

        <article class="content">
          <section class="game-list">
            <GameList
              :latestPriodData="latestPriodData"
              :indexGameData="indexGameData"
            />
          </section>
          <section v-if="!isShowRight && !sixIds.includes(curId)">
            <Record />
          </section>
          <MyMask v-if="issStopSales">
            <div class="stop-w">
              <div class="stop-sale"></div>
              <div>
                <el-button class="btn" @click="goBack"
                  >返&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回</el-button
                >
              </div>
            </div>
          </MyMask>

          <!-- <CloseGame  @close='closeOutTimeMask' v-if="isShowOutTimeTips" /> -->
        </article>

        <aside v-if="isShowRight" class="aside aside-r">
          <Rank />
        </aside>
      </div>
    </main>
  </div>
</template>

<script>
import GameList from "./gameList/index.vue";
import Header from "./header/index.vue";
import Aside from "./aside/index.vue";
import Record from "./record/index.vue";
import Rank from "@/views/games/rank/Rank.vue";
import MyMask from "@/views/games/gameList/mask/index.vue";
export default {
  data() {
    return {
      interval: null,
      indexGameData: {},
      latestPriodData: {},
      isShowOutTimeTips: false,
      numberOfPeriod: "0",
      previousPeriod: "0",
      previousResult: [],
      previousResultStr: "", //内容同上，只作判断
      gameicon: "",
      officialUrl: "", //官方网址
      isShowRight: false,
      isDoneFirstRequest: false,
      curId: 0,
      sixIds: [1, 2, 595],
      isDestroyed: false,
      curStatus: null, //更新计时
      curSettlefId: null, //更新冷热
      issStopSales: 0,
      settleNumber: 0, //已开奖，播放语音
    };
  },
  components: {
    GameList,
    Header,
    Aside,
    Record,
    Rank,
    MyMask,
    CloseGame: () => import("@/views/games/components/maskTips/CloseGame.vue"),
  },

  created() {
    this.initData();
  },
  destroyed() {
    this.isDestroyed = true;
  },

  methods: {
    closeOutTimeMask() {
      this.isShowOutTimeTips = false;
    },
    goBack() {
      this.$router.go(-1);
      setTimeout(() => {
        location.reload();
      }, 100);
    },
    async loopRequest() {
      this.interval = setInterval(async () => {
        let res = await this.$get(this.$gapi.getNewPeriod, {
          gameId: this.curId,
        });
        if (res.code == -4000) {
          clearInterval(this.interval);
          await this.$gutils.confirm({
            text: "网络连接失败，请重新连接",
          });
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else {
          this.latestPriodDataHandler(res.data);
        }
      }, 2000);
    },

    setTime() {
      return new Promise((resolve, reject) => {
        let time = 2000 + Math.ceil(200 * Math.random());
        setTimeout(() => {
          resolve();
        }, time);
      });
    },

    latestPriodDataHandler(obj) {
      let {
        closeTime,
        serverTime,
        startTime,
        status,
        numberOfPeriod,
        previousPeriod,
        previousResult,
        settlefId,
        settleNumber,
      } = obj;

      if (!numberOfPeriod) return;

      // console.log("==closeTime===", closeTime);
      // console.log("==serverTime===", serverTime);
      // console.log("==startTime===", startTime);
      // console.log("==status===", status);

      if (this.curSettlefId !== settlefId) {
        let ts = new Date().getTime();
        this.$store.commit("settlefId", ts);
        this.curSettlefId = settlefId;
      }

      if (this.numberOfPeriod != numberOfPeriod) {
        this.numberOfPeriod = numberOfPeriod;
      }

      if (this.previousPeriod != previousPeriod) {
        this.previousPeriod = previousPeriod;
      }

      if (this.previousResultStr != previousResult) {
        let arr = previousResult.split(",");
        let arr1 = settleNumber.slice(-4);

        if (this.previousResultStr != "") {
          let list = [];
          arr1.split("").forEach((n) => {
            let num = Number(n);
            list.push(String(num));
          });

          list.unshift("the");
          list.push("period", "lottery");

          this.$myAudio.playTips1(list);
        }
        this.previousResult = arr;
        this.previousResultStr = previousResult;
      }

      // let t1 = new Date(closeTime.replace(/-/g, "/")).getTime();
      // let t2 = new Date(serverTime.replace(/-/g, "/")).getTime();
      // let t3 = new Date(startTime.replace(/-/g, "/")).getTime();
      // console.log("-status=-", status,"-t1-t2=-", t1-t2,"-t3-t2=--", t3-t2);

      this.latestPriodData = obj
      
      this.$store.commit("latestPriodData", obj);
    },

    async initData() {
      this.isDoneFirstRequest = false;
      let { id } = this.$route.query;
      id = Number(id);
      let indexGame = {
        id,
      };
      this.$store.commit("indexGame", indexGame);
      this.curId = id;
      let { code, message, data } = await this.$get(this.$gapi.getIndexData, {
        id,
      });

      console.log(code, message, data);

      if (code == -9999) {
        this.$router.push({ path: "/user/login" });
        return;
      } else if (code < 0) {
        this.$alert(message, "提示", {
          confirmButtonText: "确定",
          callback: () => {
            this.$router.push({ path: "/" });
            //this.$router.go(-1);
          },
        });
        return;
      }
      let { issStopSales } = data.latestPriodData;
      this.issStopSales = issStopSales;

      let { gameType } = data;

      if (gameType == 0) {
        if (this.sixIds.includes(id)) {
          this.isShowRight = false;
        } else {
          this.isShowRight = true;
        }
      } else {
        this.isShowRight = false;
      }

      // data.radix = 1
      this.gameicon = data.officialPcUrl;
      this.officialUrl = data.officialUrl;

      this.$store.commit("indexGameData", data);

      localStorage.setItem("test-indexGameData", JSON.stringify(data));
      // localStorage.setItem("test-latestPriodData", JSON.stringify(data.latestPriodData));

      this.$store.commit("latestPriodData", data.latestPriodData);

      this.latestPriodData = data.latestPriodData;
      this.indexGameData = data;

      setTimeout(() => {
        this.isDoneFirstRequest = true;
      }, 100);
      this.loopRequest();
    },
  },
};
</script>

<style lang="scss" scoped>
.game-index {
  // max-width: 1320px;
  // height: 1200px;
  // min-height: 800px;
  // padding-bottom: 50px;
  background-color: #fff;
  // border: 1px solid red;
  .header {
    width: 1340px;
    margin: 0 auto;
    // height: 116px;
  }
  .main-body {
    width: 1340px;
    margin: 0 auto;
    overflow: hidden;
    box-shadow: 0 0 10px #000;
    .main-wrapper {
      width: 1340px;
      margin: 0 auto;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      .content {
        background-color: #fff;
        position: relative;
        width: 100%;
        overflow: hidden;
        padding-bottom: 50px;
        .game-list {
          // border: 1px solid blue;
          width: 100%;
          box-sizing: border-box;
        }
      }
    }
    .aside {
      flex: 0 0 200px;
      overflow: hidden;
      // border: 1px solid red;
    }
    .bl {
      border-right: 1px solid rgba(0, 0, 0, 0.3);
    }

    .aside-r {
      flex: 0 0 200px;
      height: 600px;
      border-left: 1px solid gray;
      border-bottom: 1px solid gray;
      margin-left: 2px;
    }
  }
  .stop-w {
    display: flex;
    flex-direction: column;
    align-items: center;
    .stop-sale {
      width: 642px;
      height: 600px;
      background: url("../../../public/images/stop_selling_title.png") center
        center no-repeat;
      // background-size: contain;
    }
    .btn {
      margin-top: -10px;
      font-size: 36px;
      width: 300px;
    }
  }
}
</style>