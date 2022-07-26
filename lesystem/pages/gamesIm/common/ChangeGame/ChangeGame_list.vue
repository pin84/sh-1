<template>
  <view @click.stop='selfClick' class="game-list">
    <view class="padding-sm" style="border-bottom: 1px solid gray">
      <view
        class="btn-box flex radius-lg"
        style="width: 250rpx; margin: 0 auto"
      >
        <button
          v-for="(item, index) in playType"
          @click.stop="changeType(index)"
          :class="{
            'bg-red': active === index,
            'text-white': active === index,
          }"
          class="cu-btn lg text-red"
          :key="index"
        >
          {{ item }}
        </button>
      </view>
    </view>
    <view class="main-body flex">
      <view >
        <view class="bg-red title text-lg" style="width: 250rpx">
          <i class="iconfont icon-dian"></i>
          <text>最爱彩种</text>
        </view>

        <view class="favor list padding-sm">
          <text
            :class="{ active: game.gameName == curFavorGame }"
            @click="toGame(game)"
            class="favor-text"
            v-for="(game, index) in userGames"
            :key="index"
            >{{ game.gameName }}</text
          >
        </view>
      </view>

      <view class="" v-for="(item, index) in curGameList" :key="index">
        <view class="bg-red title text-lg" style="width: 250rpx">
          <i class="iconfont icon-dian"></i>
          <text>{{ item.categoryName }}</text>
        </view>

        <view class="flex list padding-sm">
          <text
            @click="toGame(i)"
            class="game margin-bottom-sm margin-right-xs radius"
            :class="{ selected: i.gameName == curSelectedName }"
            v-for="(i, index) in item.gameInfoList"
            :key="index"
          >
            {{ i.gameName }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userGames: [],
      allData: [],
      curSelectedName: "",
      curFavorGame: "",
      active: 0,
      playType: ["官", "信"],
      curGameList: [],
      isCurFavorGame: false,
    };
  },

  watch: {
    "$store.state.GDV3.userGames": {
      handler: function (val) {
        this.userGames = val;
      },
      deep: true,
    },
  },

  created() {
    this.initData();

    this.userGames = this.$store.state.GDV3.userGames
  },

  methods: {
	  selfClick(){
		 //方法阻止点击穿透，不要删除 
	  },
    toGame(obj) {
      console.log(obj);
      this.$buyDataHandler.changeGame(obj);
    },

    async initData() {
      let d = {
        url: this.$api.getCpGameList,
      };

      let res = await this.$http(d);

      let {
        gameType,
        curGameId,
        gameName,
      } = this.$store.state.GDV3.v3IndexGameAllData;

      
      let index = 0;
      if (gameType == 0) {
        this.active = 1;
      } else {
        this.active = 0;
      }
      this.allData = res.data;

      

      let gamelist = this.allData[gameType].gameCateList;
      let i = 0;
      for (let obj of gamelist) {
        let idx = obj.gameInfoList.findIndex(
          (item) => item.gameId == curGameId
        );
        i++;
        if (idx !== -1) {
          let sobj = obj.gameInfoList.splice(idx, 1);
          obj.gameInfoList.unshift(sobj[0]);
          break;
        }
      }
      let temArr = gamelist.splice(i - 1, 1);
      gamelist.unshift(temArr[0]);
      this.curSelectedName = gameName;
      this.curFavorGame = gameName;

      this.curGameList = gamelist;
    },
    changeType(index) {
      this.curSelectedName = "";
      this.active = index;
      let i = 0;
      if (index == 0) {
        i = 1;
      }

      let gamelist = this.allData[i].gameCateList;
      this.curGameList = gamelist;
    },
  },
};
</script>

<style lang="scss" scoped>
.game-list {
  width: 100%;
  z-index: 100;
  .favor {
    display: flex;
    // justify-content: space-between;
    .favor-text {
      border-radius: 8rpx;
      margin-bottom: 20rpx;
      margin-right: 10rpx;
      width: 30%;
      border: 1px solid #8b8b8b;
    }
    .active {
      border: 1px solid #e54d42;
      color: #e54d42;
    }
  }
  .btn-box {
    border: 2px solid #e54d42;
    overflow: hidden;
    .cu-btn {
      width: 100%;
      border-radius: 0;
      margin: 0;
      height: 60rpx;
      padding: 0;
    }
  }

  .main-body {
    position: relative;
    padding: 20rpx 0 20rpx 0;
    height: 700rpx;
    min-height: 700rpx;
    overflow: scroll;
    flex-direction: column;
    .title {
      // left: -30rpx;
      border-radius: 40rpx;
      padding: 10rpx 30rpx;
      transform: translateX(-30rpx);
    }

    .list {
      width: 100vw;
      box-sizing: border-box;
      flex-wrap: wrap;
      display: flex;
      .game {
        width: 30%;
        border: 1px solid #8b8b8b;
        // margin: 5rpx 10rpx;
      }
      .selected {
        border: 1px solid #f3090a;
        color: #f3090a;
      }
    }
  }
}
</style>
