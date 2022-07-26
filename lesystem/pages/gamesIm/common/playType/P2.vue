<template>
  <view class="play-type">
    <view class="btn-box flex radius-lg">
      <button
        v-for="(item, index) in playType"
        @click="changeType(index)"
        :class="{ 'btn-active': index == active }"
        class="cu-btn lg"
        :key="index"
      >
        {{ item }}
      </button>
    </view>
    <view class="secondline" v-if="active == 0">
      <view
        class="play-box"
        @click="changeCurGame(item)"
        v-for="(item, idx) in games"
        :key="idx"
      >
        <view class="play-box-content">
          <view class="name">{{ item.N }}</view>
          <view v-if="idx == 0" class="num"
            >{{ item.minMxo }}-{{ item.maxMxo }}倍</view
          >
          <view v-else class="num">赔率{{ item.C[0].MxO }}倍</view>
          <view class="icon-box">
            <view :class="iconArr[idx][0]"></view>
            <text class="add">+</text>
            <view :class="iconArr[idx][1]"></view>
            <text class="add">+</text>
            <view :class="iconArr[idx][2]"></view>
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
      curSelectedGame: "",
      initIDObj: {},
      curID: 0,
      games: [],
      active: 0,
      playType: ["官方玩法", "信用玩法"],
      curGameName: "",
      iconArr: [
        ["dice-01", "dice-02", "dice-03"],
        ["dice-01", "dice-01", "dice-03"],
        ["dice-01", "dice-02", "dice-03"],
        ["dice-01", "dice-02", "dice-03"],
        ["dice-01", "dice-02", "dice-03"],
        ["dice-01", "dice-02", "dice-03"],
        ["dice-01", "dice-02", "dice-03"],
        ["dice-01", "dice-02", "dice-03"],
        ["dice-01", "dice-02", "dice-03"],
        ["dice-01", "dice-02", "dice-03"],
        ["dice-01", "dice-02", "dice-03"],
      ],
    };
  },
  // 思路。第一行。存到 curPalyList里。放在storage中   信用玩法
  // 第二行，存到中curGame中。放在store里。  官方玩法

  created() {
    this.initData();
  },

  methods: {
    async initData() {
      let { curGameId, gameType } = this.$store.state.GDV3.v3IndexGameAllData;
      this.curID = curGameId;
      let url;
      if (gameType == 0) {
        this.active = 1;
        url = this.$api.getCreditNavListJson;
      } else {
        this.active = 0;
        url = this.$api.getOfficialNavListJson;
      }

      let d = {
        url,
        data: {
          id: curGameId,
        },
      };

      console.log('-d-',d);
      let res = await this.$http(d);
      console.log('---',res);

      if (Number(res.code) !== 0) {
        return this.$util.showToast({ title: res.message });
      }

      let arr;
      if (this.active == 0) {
        arr = this.HD_1(res.data);
      } else {
        arr = res.data;
      }

      this.games = arr;
      this.changeCurGame();
    },

    HD_1(data) {
      let temArr = [];
      let hezhiArr = [];
      let MxOArr = [];
      for (const v1 of data) {
        if (v1.Id == 1767) {
          for (const v2 of v1.c) {
            for (const v3 of v2.C) {
              v3.N1 = v2.N;
              v3.C.forEach((item) => {
                MxOArr.push(item.MxO);
              });
              hezhiArr.push(v3);
            }
          }
          continue;
        }
        for (const v2 of v1.c) {
          for (const v3 of v2.C) {
            temArr.push(v3);
          }
        }
      }

      let obj = {
        I: 1767,
        N: "和值",
        P: 0,
        C: hezhiArr,
        minMxo: Math.min(...MxOArr),
        maxMxo: Math.max(...MxOArr),
      };

      temArr.unshift(obj);

      return temArr;
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

    //选择游戏类名
    changeCurGame(item) {
      this.$store.commit("v3NumBasket", "clearAll");
      this.$emit("hiddenBasket");
      if (!item) {
        item = this.games[0];
      }
      

       this.$store.commit("v3FootMoney", {});

      this.$emit("closePlayType", item.N);
      this.$store.commit("v3CurGame", item);
      uni.setStorageSync('k3_curGame', item);
    },
  },

  destroyed() {
    uni.removeStorageSync("curPlayList");
  },
};
</script>

<style lang="scss" scoped>
@import url("@/common/css/imgcss.scss");
.play-type {
  background-color: #317455;
  padding: 20rpx;
  box-shadow: 0 0 12rpx black;
  .btn-box {
    border: 2px solid #184b36;
    overflow: hidden;
    .cu-btn {
      width: 100%;
      border-radius: 0;
      margin: 0;
      color: #c4e3cf;
      background-color: #317455;
    }
    .btn-active {
      background-color: #fcdc34;
      color: #29845c;
    }
  }
  .secondline {
    margin-top: 20rpx;
    display: flex;
    flex-wrap: wrap;
    .play-box {
      width: 33.33%;
      padding: 10rpx 5rpx;
      .play-box-content {
        border: 1px solid #f1f1f1;
        height: 200rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        .name {
          color: #fff;
          font-size: 30rpx;
          padding: 15rpx 0 5rpx;
        }
        .num {
          color: #caebda;
          font-size: 28rpx;
        }
        .icon-box {
          display: flex;
          align-items: center;
          .add {
            color: #caebda;
          }
        }
      }
    }
  }
}
</style>
