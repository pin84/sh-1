<template>
  <view>
    <scroll-view scroll-x class="nav bg-white text-center text-xl solid">
      <view
        class="cu-item"
        :class="0 == xinyongTabCur ? 'text-orange cur' : ''"
        @tap="xinyongTabSelect"
        data-id="0"
      >
        <text
          class="iconfont text-xl icon-guanfang text-green padding-right-xs"
        ></text>
        <text class="text-bold">官方玩法</text>
      </view>
      <view
        class="cu-item text-bold"
        :class="1 == xinyongTabCur ? 'text-orange cur' : ''"
        @tap="xinyongTabSelect"
        data-id="1"
      >
        <text
          class="iconfont text-xl icon-xin text-red padding-right-xs"
        ></text>
        <text class="text-bold">信用玩法</text>
      </view>
    </scroll-view>
    <view class="game-list">
      <view
        class="flex-item bg-white flex text-center padding-top-sm"
        v-for="(item, indexs) in curGameList"
        :key="indexs"
      >
        <view @click="showGameDetail(item, indexs)">
          <view class="flex justify-center align-center"
            ><image style="width: 120rpx; height: 120rpx" :src="item.picUrl"
          /></view>
          <view>
            <text class="text-lg">{{ item.showName }}</text>
          </view>
        </view>

        <view style="line-height: 20rpx" v-if="indexs === curIndex"
          ><i class="iconfont icon-zu" style="color: #efeadc"></i
        ></view>

        <view
          v-show="indexs === curIndex"
          class="item-detail flex"
          :class="{ tran: indexs % 2 !== 0 }"
        >
          <block v-for="(sub, i) in item.gameInfoList" :key="i">
            <view
              class="flex-direction padding-xs"
              style="width: 33%"
              @click="toGame(sub)"
            >
              <view
                ><image
                  style="width: 100rpx; height: 100rpx"
                  :src="sub.mobileIconUrl"
              /></view>
              <view>
                <text class="text-xs text-gray">{{ sub.frontShowName }}</text>
              </view>
            </view>
          </block>
        </view>

        <view class="type"
          ><text
            class="iconfont"
            style="color: #fff; font-size: 26rpx"
            :class="{ 'icon-guan': !gameType, 'icon-xin3': gameType }"
          ></text
        ></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    gameType: {
      type: Number,
      default: () => {
        return 0;
      },
    },
    gameList: {
      type: Array,
      default: () => {
        return [{ showName: "aa" }];
      },
    },
  },

  data() {
    return {
      curIndex: null,
      xinyongTabCur: 0,
      curGameList: [],
      categoryName: "",
    };
  },

  // watch: {
  // 	gameList: {
  // 		handler: function(val) {
  // 			this.curIndex = null;
  // 		}
  // 	}
  // },

  created() {
    console.log(this.gameList);
    this.initData();
  },

  methods: {
    async initData() {
      this.curGameList = this.gameList[this.xinyongTabCur];
      let obj = {};
      // let res  = this.$http()
    },
    //信用官方切换
    xinyongTabSelect(e) {
      let id = e.currentTarget.dataset.id;
      this.xinyongTabCur = id;
      this.initData();
    },

    toGame(game) {
      // let categoryCode = this.xinyongTabCur == 0 ? 'OFFICIAL_' : 'CREDIT_';
      // game.categoryCode = categoryCode;

      this.$buyDataHandler.changeGame(game);
    },
    showGameDetail(item, index) {
      this.categoryName = item.showName;
      if (this.curIndex === index) {
        this.curIndex = null;
      } else {
        this.curIndex = index;
      }

      this.$nextTick(function () {
        this.$emit("showGameList");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.game-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &:after {
    content: " ";
    flex: auto;
  }
  .flex-item {
    position: relative;
    margin-right: 1px;
    width: calc(((100% - 1px * 2) / 2));
    margin-bottom: 1px;
    flex-direction: column;
    .iconsize {
      font-size: 40rpx;
    }
    .item-detail {
      left: 0;
      bottom: 0;
      width: 100vw;
      z-index: 10;
      flex-wrap: wrap;
      background-color: #efeadc;
    }

    .tran {
      transform: translateX(-50%);
    }

    .type {
      position: absolute;
      width: 40rpx;
      height: 40rpx;
      line-height: 38rpx;
      right: 20rpx;
      top: 20rpx;
      border-radius: 50%;
      background-color: #f6a518;
      text-align: center;
    }
  }
}
</style>
