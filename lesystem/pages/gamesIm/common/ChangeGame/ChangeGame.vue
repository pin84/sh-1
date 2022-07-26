<template>
  <view class="change-game">
    <view class="bg-white flex justify-between align-center">
      <view
        @click="showGameList"
        class="flex align-center cur justify-between radius"
        style="padding: 0 10rpx"
      >
        <text class="text-xs text-center" style="width: 90%">{{
          curGame
        }}</text>
        <i
          class="iconfont icon-icon-test4 text-red text-blod"
          style="font-weight: 600"
        ></i>
      </view>

      <view>
        <view v-if="resultShowType == 2" @click="toShowList"
          ><text class="text-red text-xs">点击查看开奖结果</text></view
        >

        <view v-if="resultShowType == 1" class="flex" @click="toShowList">
          <view
            class="text-box"
            v-for="(num, idx) in previousResult"
            :key="idx"
          >
            <text class="text-white">{{ num }}</text>
          </view>
        </view>
        <view v-if="resultShowType == 3" class="flex" @click="toShowList">
          <block v-for="(item, idx) in previousResult" :key="idx">
            <view class="text-box" :style="{ backgroundColor: item.bc }">
              <text class="text-white">{{ item.num }}</text>
            </view>
            <view>{{ idx == previousResult.length - 1 ? "=" : "+" }}</view>
          </block>
          <view
            v-if="sumArr.length !== 0"
            class="text-box"
            :style="{ backgroundColor: sumArr[0].bc }"
          >
            <text class="text-white">{{ sumArr[0].num }}</text>
          </view>
        </view>
      </view>

      <view>
        <text class="text-xs">第</text>
        <text class="previousPeriod text-xs">{{ latestPriodData.previousPeriod }}</text>
        <text class="text-xs">期</text>
      </view>
    </view>

    <view v-show="isShowResultList" class="result-list"><ResultList @changeResult='changeResult' /></view>
    <view
      class="cu-modal bottom-modal"
      :class="isShowSelectGame ? 'show' : ''"
      @click.stop="showSelectGame"
    >
      <view class="cu-dialog">
        <view class="padding-xl" style="padding: 0"><GameList /></view>
      </view>
    </view>
  </view>
</template>

<script>
import ResultList from "./ChangeGame_resultList.vue";
import GameList from "./ChangeGame_list.vue";
// import ids from '../../ids'
export default {
  props: {
    latestPriodData: {
      type: Object,
      default: () => {},
    },
  },
 
  data() {
    return {
      resultShowType: 1,
      isShowResultList: false,
      isShowSelectGame: false,
      gameObj: {},
      curGame: "",
      previousResult: [],
      previousPeriod: 0,
      colorObj: {
        "#807f7f": ["0", "13", "14", "27"],
        "#38b81b": ["1", "4", "7", "10", "16", "19", "22", "25"],
        "#408ce8": ["2", "5", "8", "11", "17", "20", "23", "26"],
        "#e13f51": ["3", "6", "9", "12", "15", "18", "21", "24"],
      },
      sumArr: [], //加拿大28专用。
      sliceIds: [
        259, 150, 162, 151, 15, 368, 260, 152, 153, 154, 29, 369, 119, 116, 121,
        10, 59, 7, 79, 5, 13, 6,
      ],
    };
  },

  components: {
    GameList,
    ResultList,
  },

  created() {
    this.initData();
  },

  watch:{
    previousPeriod:function(val){
      console.log('==previousPeriod===',val,this.previousResult);
    }
  },

  methods: {

    changeResult(result){
      this.previousResult = result
    },
    showSelectGame() {
      this.isShowSelectGame = false;
    },
    async toShowList() {
      this.isShowResultList = !this.isShowResultList;
    },
    setPageData(val) {
      let { previousResult, previousPeriod, gameID } = val;
      gameID= Number(gameID)


      

      if (!previousResult || !previousPeriod) return;
      if (this.sliceIds.includes(gameID)) {
        previousPeriod = previousPeriod.slice(4);
      }
      this.previousPeriod = previousPeriod;

      let list = [];
      if ([118, 119, 116, 121].includes(gameID)) {
        list = this.createColorObj(previousResult);
        let sum = previousResult.reduce((accumulator, currentValue) => {
          return accumulator + Number(currentValue);
        }, 0);

        this.sumArr = this.createColorObj([sum]);
      } else {
        list = previousResult;
      }

      this.previousResult = list;

    },

    createColorObj(arr) {
      let list = [];
      arr.forEach((num) => {
        for (let [key, value] of Object.entries(this.colorObj)) {
          if (value.includes(String(num))) {
            list.push({
              bc: key,
              num,
            });
            continue;
          }
        }
      });
      return list;
    },
    initData() {
      let { curGameId, gameType, gameName } =
      this.$store.state.GDV3.v3IndexGameAllData;
      this.curGame = gameName;
      let idObj = {
        1: [810, 79, 32, 30],
        2: [
          259, 260, 5, 28, 152, 153, 154, 29, 369, 150, 162, 151, 15, 368, 13,
          6, 201, 1, 2, 595,370,371
        ],
        3: [118, 119, 116, 121],
      };



      for (let [key, value] of Object.entries(idObj)) {
        if (value.includes(curGameId)) {
          this.resultShowType = Number(key);
          break;
        }
      }

      if(!this.latestPriodData)return

      this.setPageData(this.latestPriodData);
    },


    async showGameList() {
      this.isShowSelectGame = true;
    },
    selectedGame(game) {
      this.curGame = game.gameName;
      this.isShowSelectGame = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.change-game {
  position: relative;
  border-bottom: 1px solid #b62929;
  padding: 10rpx 20rpx;
  background-color: #fff;

  .cur {
    width: 230rpx;
    border: 1px solid gray;
  }
  .text-box {
    width: 50rpx;
    height: 50rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #b62929;
  }

  .previousPeriod {
    color: #b62929;
  }

  .result-list {
    position: absolute;
    width: 100%;
    z-index: 10;
    left: 0;
  }
}
</style>
