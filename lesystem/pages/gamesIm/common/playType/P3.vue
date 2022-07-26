<template>
  <view class="play-type">
    <view
      class="padding-sm"
      style="padding-bottom: 0; border: 1px solid #ededed"
    >
      <view class="btn-box flex radius-lg">
        <button
          v-for="(item, index) in playType"
          @click="changeType(index)"
          :class="{
            'bg-orange': active == index,
            'text-white': active == index,
          }"
          class="cu-btn lg text-orange"
          :key="index"
        >
          {{ item }}
        </button>
      </view>
      <view class="flex align-center" v-if="isShowFirstLine">
            <!-- v-show="item.N !== '合肖'" -->
        <view class="game-list text-lg">
          <text
            v-for="(item, index) in games"
            :key="index"
            class="margin-right-xl text-gray text-xl"
            :class="{ curGame: curGameName == item.N }"
            @click="changeCurGame(item)"
          >
            {{ item.N }}
          </text>
        </view>
        <view class=""><i class="iconfont icon-xiangyou"></i></view>
      </view>
    </view>

    <view class="list-wrapper" style="padding: 0 20rpx; margin: 10rpx 0">
      <view class="flex" v-for="(item, index) in curGameList" :key="index">
        <view class="flex align-center" style="flex: 0 0 180rpx; color: #626262"
          >{{ item.N }}:</view
        >
        <view class="flex" style="width: 100%; flex-wrap: wrap">
          <view
            @click="selectedGame(game)"
            class="text-box text-center padding-xs radius-sm margin-right-xs margin-bottom-xs"
            v-for="(game, index) in item.C"
            :key="index"
            :class="{ 'selected-text': curSelectedGame == game.N }"
            style="white-space: pre-wrap; min-width: 20%"
          >
            <text
              class="text-gray"
              :class="{ 'text-red': curSelectedGame == game.N }"
              >{{ game.N }}</text
            >
            <i v-if="curSelectedGame == game.N" class="iconfont icon-dui"></i>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    curId: {
      type: Number,
      default: () => 0,
    },
  },

  data() {
    return {
      curSelectedGame: "",
      initIDObj: {},
      games: [],
      active: 0,
      playType: ["官方玩法", "信用玩法"],
      curGameName: "",
      curGameList: [],
      curGame: "",
      isShowFirstLine: true, //
      closeIds: [5, 259, 58, 79, 13, 6, 150, 162, 151, 15, 55, 56, 1, 2, 595,370],
    };
  },
  // 思路。第一行。存到 curPalyList里。放在storage中   信用玩法
  // 第二行，存到中curGame中。放在store里。  官方玩法

  created() {
    this.initPage();
    this.initData();
  },

  methods: {
    initPage() {
      let ids = [118, 119, 116, 121];
      if (ids.includes(this.curId)) {
        this.isShowFirstLine = false;
      } else {
        this.isShowFirstLine = true;
      }

      let obj = {
        A: [30, 44, 28], //只显示官方
        b: [5, 1, 118, 119, 116, 121, 13, 6, 2, 595], // 只显示信用
      };
      let playType;
      for (let [key, value] of Object.entries(obj)) {
        let index = value.findIndex((n) => n == this.curId);
        if (index !== -1) {
          playType = key;
          break;
        }
      }
      if (!playType) {
        this.playType = ["官方玩法", "信用玩法"];
      } else if (playType == "A") {
        this.playType = ["官方玩法"];
      } else {
        this.playType = ["信用玩法"];
      }
    },
    async initData() {
      let { gameType } = this.$store.state.GDV3.v3IndexGameAllData;
      let url;
      if (gameType == 0) {
        this.active = 1;
        url = this.$api.getCreditNavListJson;
      } else {
        this.active = 0;
        url = this.$api.getOfficialNavListJson;
      }

      if (this.playType.length == 1) {
        this.active = 0;
      }

      let d = {
        url,
        data: {
          id: this.curId,
        },
      };
      console.log("--a--", d);
      let res = await this.$http(d);

      if (Number(res.code) !== 0) {
        return this.$util.showToast({ title: res.message });
      }
    

      this.$store.commit("v3playList", res.data);
      uni.setStorageSync("test-v3playList", res.data);

      this.games = res.data;
      this.showCurGame();
      return true;
    },

    //官方玩法，信用玩法
    async changeType(index) {
      if (index == this.active) {
        return;
      }

      let { gameOtherGroupTypeId } = this.$store.state.GDV3.v3IndexGameAllData;
      if (gameOtherGroupTypeId == 0) {
        this.$util.showConfirm({
          content: "另一组的ID不能为0",
          showCancel: false,
        });
        return;
      }

      uni.reLaunch({
        url: `/pages/gamesIm/index?id=${gameOtherGroupTypeId}`,
      });
    },

    showCurGame() {
      let routes = getCurrentPages();
      let { id } = routes[routes.length - 1].options;
      id = Number(id);
      let { gameType } = this.$store.state.GDV3.v3IndexGameAllData;
      let curGame;
      if (gameType == 0) {
        curGame = this.games[0];
      } else {
        curGame =
          this.games.find((item) => item.isDefault == 1) || this.games[0];
      }

      let hiddenSecondLine = [118, 119, 116, 121];
      if (hiddenSecondLine.includes(id)) {
        this.$emit("closePlayType", curGame.N);
        this.$store.commit("v3CurGame", this.games); //保存当前选择的游戏
        return;
      }
      let spIds = [5, 13, 6];
      if (spIds.includes(id)) {
        let arr = [];
        let ids = [1, 2];
        ids.forEach((id) => {
          let obj = this.games.find((item) => item.Id == id);
          arr.push(...obj.C);
        });
        this.$store.commit("v3AllCurPlayList", arr);
      }

      //六合彩-返回
      let ids1 = [1, 2, 595];
      if (ids1.includes(id)) {
        let name = curGame.N;
        this.curGame = name;
        this.curGameName = name; //active
        this.$emit("closePlayType", name);
        this.$store.commit("v3CurGame", curGame); //保存
         uni.setStorageSync("test-curGame", curGame); 
        return;
      }

      if (gameType == 0) {
        this.$emit("closePlayType", curGame.N);
        this.changeCurGame(curGame);
        this.curGame = curGame.N;
      } else {
        this.$emit("closePlayType", curGame.N);
        this.changeCurGame(curGame);
        this.curGame = curGame.N;
        this.selectedGame(curGame.c[0].C[0]);
      }
    },

    //选择游戏类名
    changeCurGame(game) {
      this.$store.commit("v3IsShowNumBaket", false);

      this.curGame = "";
      let n = game.N;
      let curList = game.c || game.C;

      if (game.Id == 3182) {
        game.C = game.c;
        game.C.forEach((item) => {
          item.I = item.C[0].I;
        });
        curList = [game];
      }

      if (game.Id == 3376) {
        game.C = game.c;
        game.C.forEach((item) => {
          item.I = item.C[0].I;
        });
        curList = [game];
      }
      if (game.Id == 3374) {
        game.C = game.c;
        game.C.forEach((item) => {
          item.I = item.C[0].I;
        });
        curList = [game];
      }

      if (this.curGameName !== n) {
        this.curSelectedGame = "";
      }
      this.curGameName = n;

      if (this.active == 1) {
        this.curGameList = [];
      } else {
        this.curGameList = curList;
      }

      let { curGameId,gameType } = this.$store.state.GDV3.v3IndexGameAllData;

      let ids1 = [5, 13, 6, 1, 2, 595];
      if (ids1.includes(curGameId)) {
          this.$store.commit("v3ClearSelected", new Date().getTime());
        this.curGameList = [];
      }
      if (this.closeIds.includes(curGameId)) {
        this.$emit("closePlayType", game.N);
      }
      //早期的用法。保留
      uni.setStorageSync("curPlayList", game); //保存当前玩法的列表。用于渲染信用玩法页面
      this.$store.commit("v3CurPlayList", game); //便于watch,

      if(gameType == 0){
        this.$store.commit("v3CurGame", game);
        uni.setStorageSync("test-curGame", game); 
      }
    },

    //选择具体游戏
    selectedGame(game) {
      this.curGameList.forEach((item) => {
        item.C.forEach((item_1) => {
          item_1.active = false;
        });
      });
      this.curSelectedGame = game.N;
      this.$store.commit(
        "v3CurGame",
        Object.assign({}, game, { gameType: this.curGameName })
      ); //保存当前选择的游戏
      this.$emit("closePlayType", game.N);
      // this.$store.commit('setSelectedNum', []);
      this.$store.commit("v3selectedNum", {});
      this.$store.commit("v3IsHasSelected", false);
      this.$store.commit("v3FootMoney", {});
      this.$store.commit("v3ClearSelected", new Date().getTime());
      this.$store.commit("sumBonus", 0);
      if (this.active == 1) {
        this.$store.commit("v3NumBasket", "clearAll");
      }

      this.curGameList.push({});
      this.curGameList.pop();
    },
  },

  destroyed() {
    uni.removeStorageSync("curPlayList");
  },
};
</script>

<style lang="scss" scoped>
.play-type {
  box-shadow: 0 0 12rpx black;
  padding-bottom: 10rpx;
  background-color: #fff;
  .btn-box {
    border: 2px solid #f37b1d;
    overflow: hidden;
    .cu-btn {
      width: 100%;
      border-radius: 0;
      margin: 0;
    }
  }

  .game-list {
    padding: 10rpx 0;
    white-space: nowrap;
    overflow: scroll;
    .curGame {
      color: red;
    }
  }
  .list-wrapper {
    max-height: 700rpx;
    overflow: scroll;
    .text-box {
      position: relative;
      border: 1px solid #e5e5e5;
      .icon-dui {
        position: absolute;
        color: red;
        right: 0rpx;
        bottom: -18rpx;
      }
    }

    .selected-text {
      border: 1px solid #e13232;
    }
    .text-red {
      color: #e13232;
    }
  }

  .game-name-list {
    flex-direction: column;
  }
}
</style>
