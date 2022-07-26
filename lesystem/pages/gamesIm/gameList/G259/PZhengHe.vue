<template>
  <view class="play">
    <view class="special-box" v-for="(item, idx) in C1" :key="idx">
      <view class="special">
        <text class="text-bold">{{ item[0] }}</text>
      </view>
      <view class="special-list">
        <view
          class="special-item"
          @click="select(v)"
          :class="{ active: v.active }"
          v-for="(v, index) in item[1]"
          :key="index"
        >
          <text>{{ v.N }}</text>
          <text style="color: #c42133">{{ v.odds }}</text>
        </view>
      </view>

      <view class="special-list" v-if="C2[idx]">
        <view
          class="special-item w_50"
          @click="select(v)"
          :class="{ active: v.active }"
          v-for="(v, index) in C2[idx].C"
          :key="index"
        >
          <text class="text-name" :class="{ 'text-name-b': index === 0 }">{{
            C2[idx].N1 + v.N
          }}</text>
          <text style="color: #c42133">{{ v.odds }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      randomArr: [],
      C1: [],
      C2: [],
      isHasSelected: 0,
    };
  },
  watch: {
    "$store.state.GDV3.clearSelected": {
      handler: function (val) {
        this.cancelAll();
      },
    },
    "$store.state.GDV3.officialRate": {
      handler: function (val) {
        this.initData();
      },
      deep: true,
    },

    "$store.state.GDV3.v3AddRandom": {
      handler: function (val) {
        this.addToBasketRandom(val);
      },
      deep: true,
    },
    "$store.state.GDV3.addToBasket": {
      handler: function (val) {
        this.addToBasket();
      },
      deep: true,
    },
    "$store.state.GDV3.v3ToBuy": function (val) {
      this.v3ToBuy();
    },
  },

  created() {
    this.initData();
  },
  methods: {
    v3ToBuy() {
      let flag = this.addToBasket(false);
      if (!flag) {
        return;
      }

      //触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
      let ts = new Date().getTime();
      this.$store.commit("v3ToBuyNext", ts);
    },
    addToBasket(isShowBasket = true) {
      let temArr = [];
      this.C1.forEach((arr) => {
        arr[1].forEach((item) => {
          if (item.active) {
            temArr.push(item);
          }
        });
      });
      this.C2.forEach((outItem) => {
        if (JSON.stringify(outItem) !== "{}") {
          outItem.C.forEach((item) => {
            if (item.active) {
              temArr.push(item);
            }
          });
        }
      });

      let basket = this.$store.state.GDV3.numBasket;

      if (temArr.length === 0 && basket.length === 0) {
        this.$util.showConfirm({
          content: "您还没有勾选",
          showCancel: false,
        });
        return;
      }
      let m = this.$store.state.GDV3.v3InputMoney;

      temArr.forEach((item) => {
        let obj = this.$buyDataHandler.createBuyObj();
        obj.I = item.I;
        obj.gName = item.N1;
        obj.numStr = item.N;
        obj.orderStr = item.N;
        obj.money = m;
        obj.odds = item.odds;
        obj.MiO = item.MiO;
        obj.MxO = item.MxO;
        this.$store.commit("v3NumBasket", obj);
      });

      if (m) {
        basket.forEach((item) => {
          item.money = m;
        });
      }

      this.cancelAll();
      if (isShowBasket) {
        this.$store.commit("v3IsShowNumBaket", true);
      }

      return true;
    },
    addToBasketRandom(val) {
      let { n } = val;
      while (n--) {
        let i = Math.random() > 0.5 ? 1 : 0;
        let len = this.randomArr.length - 1;
        let n1 = this.$buyDataHandler.createRandomNum(0, len);
        let randomObj = this.randomArr[n1].C[i];
        let obj = this.$buyDataHandler.createBuyObj();

        obj.I = randomObj.I;
        obj.gName = randomObj.N1;
        obj.numStr = randomObj.N;
        obj.orderStr = randomObj.N;
        obj.money = "";
        obj.odds = randomObj.odds;
        obj.MiO = randomObj.MiO;
        obj.MxO = randomObj.MxO;

        this.$store.commit("v3NumBasket", obj);
      }

      this.$store.commit("v3IsShowNumBaket", true);
    },
    cancelAll() {
      this.C1.forEach((arr) => {
        arr[1].forEach((item) => {
          if (item.active) {
            item.active = false;
          }
        });
      });
      this.C2.forEach((outItem) => {
        if (JSON.stringify(outItem) !== "{}") {
          outItem.C.forEach((item) => {
            if (item.active) {
              item.active = false;
            }
          });
        }
      });

      this.refreshPage();
      this.$store.commit("v3IsHasSelected", false);
    },
    select(obj) {
      if (obj.active) {
        obj.active = false;
        this.isHasSelected--;
      } else {
        obj.active = true;
        this.isHasSelected++;
      }

      this.refreshPage();
      if (this.isHasSelected) {
        this.$store.commit("v3IsHasSelected", true);
      } else {
        this.$store.commit("v3IsHasSelected", false);
      }
    },
    initData() {
      let { percentage, selectBack } = this.$store.state.GDV3.officialRate;
      let curGameData = this.$store.state.GDV3.v3CurPlayList
      let {C ,PIs} = curGameData
      if (!C) return;
      this.randomArr = C;

      let c1id = [783,784,785,786,787,788,789,790,791,792,793,794,795,796,797,798,799,800,801,802,803,804]
      let c2id = [805,806,807,808,809]
      let C1 = C.filter(item=>c1id.includes(item.Id))
      let C2 = C.filter(item=>c2id.includes(item.Id))
      let kvArr = [
        ["冠亚和值", []],
        ["冠军", []],
        ["亚军", []],
        ["第三名", []],
        ["第四名", []],
        ["第五名", []],
        ["第六名", []],
        ["第七名", []],
        ["第八名", []],
        ["第九名", []],
        ["第十名", []],
      ];

      kvArr.forEach((kv) => {
        let arr = C1.filter((item) => item.N.includes(kv[0]));
        arr.forEach((outItem) => {
          outItem.C.forEach((inItem) => {
            inItem.P = outItem.P;
            inItem.Id = outItem.Id;
            inItem.N1 = outItem.N;
            inItem.odds = this.$buyDataHandler.setNumDecimal(
              inItem.MxO - (inItem.MxO - inItem.MiO) * percentage,
              3
            );
            kv[1].push(inItem);
          });
        });
      });

      this.C1 = kvArr;

      let nArr = ["1v10:", "2v9:", "3v8:", "4v7:", "5v6:"];
      C2.forEach((outItem, i) => {
        outItem.N1 = nArr[i];
        if (JSON.stringify(outItem) !== "{}") {
          outItem.C.forEach((item) => {
            item.odds = this.$buyDataHandler.setNumDecimal(
              item.MxO - (item.MxO - item.MiO) * percentage,
              3
            );
            item.P = outItem.P;
            item.Id = outItem.Id;
            item.N1 = outItem.N;
          });
        }
      });
      C2.unshift({});

      this.C2 = C2;

    },
    refreshPage() {
      this.C1.push({});
      this.C1.pop();
      this.C2.push({});
      this.C2.pop();
    },
  },
};
</script>

<style lang="scss" scoped>
.play {
  // height: 100%;
  padding: 5rpx;
  background-color: #e5e5e5;
  // overflow: scroll;
  // border: 1px solid red;
  .special-box {
    .special {
      position: relative;
      padding: 5rpx 20rpx;
      background-color: #e5e5e5;
      text-align: center;
      .text-bold {
        font-size: 30rpx;
        color: #5d5d5d;
      }
    }
    .special-list {
      display: flex;
      justify-content: space-around;
      border: 1px solid #f3f3f3;
      width: 100%;
      .special-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 25%;
        border: 1px solid #e3e3e3;
        background-color: #fff;
        border-radius: 15rpx;
        padding: 5rpx 0;
        .text-name {
          color: #ff4372;
          font-weight: 600;
        }
        .text-name-b {
          color: #6ebaff;
        }
      }
      .active {
        background-color: #ffd800;
      }

      .w_50 {
        width: 50%;
      }
    }
  }
}
</style>
