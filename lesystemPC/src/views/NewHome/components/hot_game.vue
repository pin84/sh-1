<template>
  <div class="hot_game width_center_1190">
    <div class="title">
      <img
        src="../assets/indexgamebg.png"
      />
    </div>
    <div class="game-list">
      <div class="tabs-box">
        <a
          v-for="(item, index) in GagmeList"
          :key="index"
          class="default-btn"
          :class="activeIndex == index ? 'active' : ''"
          @click="activeIndex = index"
          >{{ item.name }}</a
        >
      </div>
      <div
        class="g-box"
        v-for="(ite, index) in GagmeList"
        :key="'g' + index"
        v-show="activeIndex == index"
      >
        <div class="g-left">
          <img :src="ite.img" />
        </div>
        <div class="g-right">
          <div class="info">
            <div class="info-text">
              {{ ite.text }}
            </div>
            <div class="app-box">
              <div v-if="ele.isMaintain!=1"
                class="info-app"
                v-for="(ele, index) in ite.list"
                :key="'i' + index"
                @click="toUrlLink(ele)"
              >
                <img :src="ele.picUrl" />
                <span class="tit">{{ ele.showName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      gameList: {
        default: () => [],
      },
    },
    data() {
      return {
        activeIndex: "0",
        isLogin: false,
        GagmeList: [
          {
            name: "电子",
            code: "DZYX",
            text: "提供各类经典老虎机游戏、刮刮乐、街机等游戏，更多免费游戏，爆分大奖等你来。",
            list: [],
            img: require("../assets/sslotgame-image-dz.png"),
          },
          {
            name: "真人",
            code: "ZRSP",
            text: "互动娱乐在线直播平台，让玩家游戏的同时，观赏美女主播表演、参与互动游戏。设有多个真人荷官桌台，包括：百家乐、竞咪、龙虎、骰宝、轮盘等多款游戏。",
            list: [],
            img: require("../assets/sslotgame-image-02@2x-5a73dd11066b00cac37e9e8404741fe6.png"),
          },
          {
            name: "体育",
            code: "TYJJ",
            text: "业内最高赔率，覆盖世界各地赛事，让球、大小、半全场、波胆、单双、总入球、连串过关等多元竞猜。更有动画直播、视频直播，让您轻松体验聊球投注，乐在其中。",
            list: [],
            img: require("../assets/sslotgame-image-01@2x-23a557a766cffe2dba1d14517aad1294.png"),
          },
          {
            name: "棋牌",
            code: "QPYX",
            text: "提供市面上热门游戏种类，选择全面多元，应有尽有玩家能不断游戏不感无趣！抢庄牛牛、龙虎斗，多款棋牌任君选，好友相约竞技，游戏改变生活。",
            list: [],
            img: require("../assets/sslotgame-image-03@2x-9b2049fcb1f083b2ae9a3841452deb79.png"),
          },
          {
            name: "反波胆",
            code: "FBD",
            text: "提供所有大型赛事，每月玩家可期待超过百场比赛及上万盘口！拥有令人惊叹的视觉界面及高效的用户体验，所以能让您轻松上手，一目了然，轻松投注",
            list: [],
            img: require("../assets/hotgame-fbd-bg.png"),
          },
          {
            name: "捕鱼",
            code: "BYYX",
            text: "市面上热门捕鱼游戏，等你来体验...",
            list: [],
            img: require("../assets/sslotgame-image-by.png"),
          },
          // {
          //   name: "街机",
          //   code: "JJYX",
          //   text: "",
          //   list: [],
          //   img: "",
          // },
          {
            name: "乐彩彩票",
            code: "Lc",
            text: "超过百种彩票玩法任您赢！ZH为全球各彩票玩家提供了丰富多样的游戏内容，致力为玩家打造高品质的娱乐环境，安心乐享游戏空间，只为公平、公正的开奖结果。",
            list: [{picUrl: "https://img.iyileimg.com/upload/mobile/images/game-icon/lecai.png",showName: "乐彩彩票",urlLink: "/games?id=79"}],
            img: require("../assets/sslotgame-image-05@2x-eb7eb738ef4a99a034ae965a7dcfbe26.png"),
          },
        ],
      };
    },
    watch: {
      gameList: {
        handler(newval, oldval) {
          this.GagmeList.forEach((element) => {
            if (newval[element.code]!=undefined&&element.code == newval[element.code].channelCode) {
              element.list = [...newval[element.code].gameList];
            }
          });
        },
      },
    },
    methods: {
      toUrlLink(obj) {
        //console.log(obj);
        let { isMaintain } = obj;
        if (isMaintain) {
          return;
        } else if (!this.isLogin) {
          //console.log(obj.urlLink);
          let gobackurl = encodeURIComponent(obj.urlLink);
          this.$router.push({ name: "user_login", query: { goback: gobackurl } });
          return;
        } else {
          this.$router.push(obj.urlLink);
        }
        setTimeout(() => {
          location.reload();
        }, 100);
      },
    },
    created() {
      let token = localStorage.getItem("token");
      if (!this.$isEmpty(token)) {
        this.isLogin = true;
      }
	  //console.log(this.gameList);
    },
  };
</script>

<style lang="scss" scoped>
  @keyframes hotTemplate_iconAnimationIn__3fttE {
    0% {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }

    to {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  .hot_game {
    .title {
      width: 100%;
      height: 110px;
      margin: 40px 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .tabs-box {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 20px;
      margin-top: 20px;
    }
    .default-btn {
      display: block;
      width: 120px;
      height: 40px;
      margin: 0 15px;
      color: #595859;
      line-height: 40px;
      text-align: center;
      border-radius: 30px;
      box-shadow: 0 4px 8px 0 rgba(194, 211, 222, 0.5);
      cursor: pointer;
      background: url(../assets/default-btn.png)
        no-repeat;
      background-size: 100% 100%;
      position: relative;
      &.active {
        color: #fff;
        background: url("../assets/indexappdownloadbg.png")
          no-repeat 0 0 / cover;
        box-shadow: 0 2px 4px 0 rgba(247, 195, 138, 0.7);
      }
    }
    .g-box {
      display: flex;
      justify-content: flex-end;
      position: relative;
      .g-left {
        width: 750px;
        height: 590px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 9;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .g-right {
        width: 700px;
        height: 460px;
        position: relative;
        margin-top: 35px;
        background: url("../assets/common-card-background-game@2x-18f646784a2004e9a58e0a77c079e7a2.png");
        background-size: cover;
        z-index: 2;
        border-radius: 24px;
        box-shadow: 0 20px 30px -10px #cdd2dd;
        .info {
          padding: 40px 40px 40px 220px;
          .info-text {
            min-height: 72px;
            line-height: 1.5;
            margin-top: 30px;
            font-size: 16px;
            color: #595859;
            text-align: justify;
          }
          .app-box {
            display: flex;
            justify-content: flex-start;
            margin: 40px 0 0 0;
            .info-app {
              width: 58px;
              height: 58px;
              margin: 0 8px;
              border-radius: 12.7px;
              box-shadow: 0 4px 8px 0 rgba(112, 146, 215, 0.14);
              position: relative;
              text-align: center;
              cursor: pointer;
              &:after {
                content: "";
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0BAMAAACmtAsUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAG1BMVEVHcEz7/f/7/P/5+v/8/f/9/v/2+P7w8v3q7fxQh+ygAAAABXRSTlMAFGKg0QmQh5wAAAT9SURBVHja5VmxbtxWEFzJBtIKhu06AeLUBgw5rRJY6S3pUW7thLwr04jHH0h4n+2dmV2vQcDQkZ3h0fG9tzszu8snVSezxLM3f/XtEXT/vPnFljj7tZ2IPy8W1t/ayfhkRII9T+5rVnjeVuGPcp7366zdz5Z41VbixgJP2mq8rqYb2563DdDbvtxi/WjAdeva2itudzUv7b2vHYK+wyfTKhxsD853TPwckZx+crGDZB8nBT1WFlH9K96vzvTCTGijTZ2ww8sauuMzL04bnDwS6umxlKpJqWr13YWd85BeKvWqjFKJNHzUIsAf41PfVC+70IgnTVRmRkP6emUvfRuYQuek9QmpdqWq+Ee/JWSBoQ2RdkidJkIUEsQneztQKM3ATRIH1toKbH9jb1lEpJqL7Quqt8StXYNLfVmq1rf4Oxs9q1Yu6Ad48IRkUDr57it+Z0ODYoCgXhDhABnkmRBVodEGqGuU5q8rYyRk6MRrIOMato5CJvCECEuk4yCxdZREtaFKyN2B6sAAJKhAxuDMrjltdNUl0JOXJj7eFaRKDXyiBSOE6RH0vhrU+vS6AA9DQvXTQ3CI8Kpr1Rz0yol8i8yocsA0FiWVTm0NjyIsrXqILGoVYkoqy1fIANZC6QuVqGnSimgN6l0fEWBfoKyP4Huzjidbd7GOOu2yQPGiZR39hAcfpoPOkMIUpG232w02SiYR8yNVDEV66ZpEBaKrq3I+z0MmYaR3NHNBM25U2qhy8EMqnrFaOZ9xbVSa5kaMgiikYnQwq+nzlSmLrrojWrjqpCnURLwOwIFR3HBYys+y7Bf6LxpVAcwbsDE2QNwBq1dPFgdCIVfzB3nKeC01KMAMWXYjwh1dSyEckP4WopUdDjBoLaBrMEu+uo7Ij1x3sXuMs0d4Fjx2/hzQlUkagIESFoeg+MAAJQfO3xTEOiMijVcWoMgbZA7FLIbDoia4A9Ex2sgFET7SopjJiWaycTItY5nQC4uEShoIFQOjOiGknw0CeAEp0MTAqB6FOqSLOZ0UgE9YVZRfpkR6Q6Nw1HyWxgTSXKtpsHULgilfDaRcYiy7jrsauAqcirQWfiDrvMo6uR5rnCb4Z56BBT9hFW/Mz7O0Uyq4z45pwTPUyUD6Ix/4aJ29io+BELOx3hVROLlxYS/BWQAEc/RaJFFmzq6AmgdyAoocVJnURw/JMXKAJhC7XNUowgm8TahD9hjVcPTskQNnTnfmFMvzZFGdMwtwSFMDS8/mgp8se6K7UIojs5VTkL3M+SPmS4nI8oovlMiOMPE5ziwh9axB3FU8P8Xb5EUjNSGdEVgWKp5R8XZMATogDbuHePgDXiUXvM0UgOCAzKujnMkjxiMCq8kQk0iJExZVWvIAV8sTaDlCHcSS181DY0jhFFLQFOoMVlvyU/JHo1RpHMsTCm2ySccTuk5kSlPICWItt3Sw0lxt52IjnCsqgVv3lViH/2EV1ls/bLX+Z/dbrQ82bLUOdr3VemfX+423dGevPmy8pRt70W2z9u/tp7bN2v61J22/6VXbaztrmyZ+aBdml21a75zbrZm9aPcb7re917fD0/qm+oa4b936pl1+s7xfe73tJr9a7taNzK+WiUs/rnTemvC0rfJCfWVWbdv+tKEf+mrKtyXuD49ihDHftP45svEfJJcrjBy3cHa5wnlhQHl/P9X5dzoLz971Jxjf1T+gPgMZ8/ycDqJwQgAAAABJRU5ErkJggg==)
                  no-repeat 0 0 / cover;
                z-index: -1;
              }
              &:hover {
                box-shadow: 0 4px 8px 0 #b6bfdb;
                &:after {
                  background: url(data:image/png;base64,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)
                    no-repeat 0 0 / cover;
                  animation: hotTemplate_iconAnimationIn__3fttE 0.5s ease forwards;
                }
              }
              .tit {
                font-size: 14px;
                color: #595859;
                display: inline-block;
                margin-top: 10px;
              }
              img {
                width: 40px;
                height: 40px;
                margin: 9px;
              }
            }
          }
        }
      }
    }
  }
</style>