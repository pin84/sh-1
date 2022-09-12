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
      <view class="flex align-center">
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

    <view
      v-if="isShowSecondLine"
      class="list-wrapper"
      style="padding: 0 20rpx; margin: 10rpx 0"
    >
      <view class="flex" v-for="(item, index) in curGameList" :key="index">
        <view style="flex: 0 0 180rpx; color: #626262">{{ item.N }}:</view>
        <view class="flex" style="width: 100%; flex-wrap: wrap">
          <view
            @click="selectedGame(game)"
            class="
              text-box text-center
              padding-xs
              radius-sm
              margin-right-xs margin-bottom-xs
            "
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
  data() {
    return {
      secondLindGame: {},
      curSelectedGame: "",
      initIDObj: {},
      curID: 0,
      games: [],
      active: 0,
      playType: ["官方玩法", "信用玩法"],
      curGameName: "",
      curGameList: [],
      isShowSecondLine: true,
    };
  },

  created() {
    this.initPage();
  },

  methods: {
    initPage() {
      let { gameType, curGameId, gameOtherGroupTypeId } =
        this.$store.state.GDV3.v3IndexGameAllData;

      //只显示官方
      let routes = getCurrentPages();
      let { id } = routes[routes.length - 1].options;
      if (id == 44) {
        this.playType = ["官方玩法"];
      } else {
        this.playType = ["官方玩法", "信用玩法"];
      }

      if (gameType == 1) {
        gameType = 0;
      } else {
        gameType = 1;
      }
      this.active = gameType;
      this.active == 1
        ? (this.isShowSecondLine = false)
        : (this.isShowSecondLine = true);

      this.curID = Number(curGameId);

      this.getGameData();

      this.initIDObj = {
        activeType: this.active,
        curGameId: this.curID,
        gameOtherGroupTypeId,
      };
    },

    async getGameData() {
      let url =
        this.active == 0
          ? this.$api.getOfficialNavListJson
          : this.$api.getCreditNavListJson;

      let d = {
        url,
        data: {
          id: this.curID,
        },
      };

      let res = await this.$http(d);
      if (Number(res.code) !== 0) {
        return this.$util.showToast({ title: res.message });
      }
      this.games = res.data;
      this.showCurGame();
    },

    showCurGame() {
      let { gameType } = this.$store.state.GDV3.v3IndexGameAllData;
      let curPlayIndex = this.$store.state.GDV3.curPlayIndex;
      let obj =
        this.games[curPlayIndex] ||
        this.games.find((item) => item.isDefault == 1) ||
        this.games[0];
      this.changeCurGame(obj);

      if (gameType == 1) {
        let { n, m } = this.$store.state.GDV3.curPlayIndexnm;
        let obj2 = obj.c[n].C[m] || obj.c[0].C[0];
        this.selectedGame(obj2);
      }
    },

    //选择游戏类名
    changeCurGame(game) {
      this.$store.commit("setNumBasket", []);
      let index = this.games.findIndex((obj) => obj.Id == game.Id);
      this.$store.commit("curPlayIndex", index);
      this.secondLindGame = this.games[index];
 

      // if (game.N == "龙虎斗") {
      //   game.C.forEach((obj) => {
      //     let newArr = this.swapArray(obj.C, 1, 2);
      //     obj.C = newArr;
      //   });
      // }

      let curList = game.c || game.C;

      if (game.Id == 3182) {
        game.C = game.c;
        curList = [game];
      }

      if (game.Id == 3376) {
        game.C = game.c;
        curList = [game];
      }
      if (game.Id == 3374) {
        game.C = game.c;
        curList = [game];
      }

      this.curGameName = game.N;
      this.curGameList = curList;

      if (this.active == 1) {
        this.$emit("closePlayType", game.N);
      }
      uni.setStorageSync("curPlayList", game); //保存当前玩法的列表。用于渲染玩法页面
      this.$store.commit("setCurPlayList", game); //便于watch,
        this.$emit('donePlayType',true)
    },

    //选择具体游戏
    selectedGame(game) {
      let n = 0,
        m = 0;
      this.secondLindGame.c.forEach((obj, idx) => {
        obj.C.forEach((item, index) => {
          if (item.I == game.I) {
            n = idx;
            m = index;
          }
        });
      });
      this.$store.commit("curPlayIndexnm", { n, m });

      // this.curGameList.forEach((item) => {
      //   item.C.forEach((item_1) => {
      //     item_1.active = false;
      //   });
      // });
      this.curSelectedGame = game.N;
      let obj = Object.assign({}, game, { gameType: this.curGameName });
      this.$store.commit("setCurGame", obj); //保存当前选择的游戏
      uni.setStorageSync('curGame',obj)
      this.$emit("closePlayType", game.N);
      this.$store.commit("setSelectedNum", []);
      this.$store.commit("v3IsHasSelected", false);
      this.$store.commit("v3FootMoney", {});
      this.$store.commit("v3ClearSelected", new Date().getTime());
      this.$store.commit("sumBonus", 0);
      // this.curGameList.push({});
      // this.curGameList.pop();

        this.$emit('donePlayType',true)   
    },
    //官方玩法，信用玩法
    changeType(index) {
      if (index == this.active) {
        return;
      }
      this.$store.commit("curPlayIndex", "");
      this.$store.commit("curPlayIndexnm", { n: 0, m: 0 });

      let { gameOtherGroupTypeId } = this.$store.state.GDV3.v3IndexGameAllData;
      if (gameOtherGroupTypeId == 0) {
        this.$util.showConfirm({
          content: "另一组的ID不能为0",
          showCancel: false,
        });
        return;
      }

      uni.reLaunch({
        url: `/pages/games/index?id=${gameOtherGroupTypeId}`,
      });
    },
    swapArray(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
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
