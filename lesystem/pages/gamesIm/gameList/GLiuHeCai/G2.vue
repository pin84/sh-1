<template>
  <view class="play">
    <view class="top">
      <span class="top-item">项目</span>
      <span class="top-item">赔率</span>
      <span class="top-item grow-5">号码</span>
      <!-- <span class="top-item">选择</span> -->
    </view>
    <view class="list">
      <view
        @click="selectedItem(item)"
        :class="{ active: item.active }"
        class="item"
        v-for="(item, idx) in list1"
        :key="idx"
      >
        <span
          class="left"
          :style="{
            backgroundColor:
              idx < 4 ? '#c42133' : idx > 7 ? '#38b81b' : '#2373d6',
          }"
          >{{ item.N }}</span
        >
        <span>{{ item.odds }}</span>
        <span :class="{ 'grow-5': true }">
          <text
            :style="{
              backgroundColor:
                idx < 4 ? '#c42133' : idx > 7 ? '#38b81b' : '#2373d6',
            }"
            v-for="(n, index) in numList[idx]"
            :key="index"
            class="text"
            >{{ n }}</text
          >
        </span>
        <!-- <span class="iconfont icon-radioactive"> </span> -->
      </view>
    </view>
  </view>
</template>

<script>
import bgcolor from "./bgcolor";
export default {
  data() {
    return {
      numList: [],
      list1: [],
      list2: [],
    };
  },
  watch: {
    "$store.state.GDV3.officialRate": {
      handler: function (val) {
        this.changeRate(val);
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
    "$store.state.GDV3.clearSelected": function (val) {
      this.resetData();
    },
  },

  created() {
    this.initData();
  },

  methods: {
    resetData() {
      this.list1.forEach((item) => {
        if (item.active) {
          item.active = false;
        }
      });

      this.list1.push({});
      this.list1.pop();
    },
    selectedItem(obj) {
      obj.active = !obj.active;

      this.list1.push({});
      this.list1.pop();
    },
    addToBasketRandom(val) {
      let { n } = val;
      let randomArr = [];
      randomArr.push(...this.list1, ...this.list2);
      this.$buyOptions.addToBasketRandomCredit(randomArr, n);
    },
    async v3ToBuy() {
      let flag = await this.addToBasket(false);
      if (!flag) return;
      //触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
      let ts = new Date().getTime();
      this.$store.commit("v3ToBuyNext", ts);
    },

    addToBasket(isShowBasket = true) {
      let selectArr = [];

      let arr1 = this.$buyOptions.filteActive(this.list1);
      selectArr.push(...arr1);

      

      return this.$buyOptions.addToBasket({ selectArr, isShowBasket });
    },

    changeRate(val) {
      let { percentage } = val;
      this.$buyOptions.changeRateOption(this.list1, percentage);
    },

    initData() {
      let { percentage, selectBack } = this.$store.state.GDV3.officialRate;
      let curObj = this.$store.state.GDV3.v3CurGame;
      let list = JSON.parse(JSON.stringify(curObj.C[0].C));
      list.sort((a, b) => a.I - b.I);
      list.forEach((item) => {
        item.goal = item.I
        item.N1 = curObj.C[0].N;
        item.odds = this.$buyDataHandler.setNumDecimal(
          item.MxO - (item.MxO - item.MiO) * percentage,
          3
        );
      });

      let numList = [];
      for (let arr of Object.values(bgcolor)) {
        let temArr1 = arr.filter((n) => n % 2 == 1);
        let temArr2 = arr.filter((n) => n % 2 == 0);
        let temArr3 = arr.filter((n) => n > 24);
        let temArr4 = arr.filter((n) => n <= 24);
        numList.push(temArr1, temArr2, temArr3, temArr4);
      }
      this.numList = numList;
      this.list1 = list;
    },
  },
};
</script>

<style lang="scss" scoped>
$w: 40rpx;
$h: 100rpx;
$tw: 40rpx;
.play {
  height: 100%;
  background-color: #fff;
  overflow: scroll;
  // border: 1px solid red;
  .top {
    display: flex;
    background-color: #7a7a7a;
    .top-item {
      border-right: 1px solid #fff;
      flex: 1 0 $w;
      text-align: center;
      color: #fff;
      padding: 10rpx 0;
      font-size: 26rpx;
      &:last-child {
        border-right: none;
      }
    }
    .grow-5 {
      flex: 5 0 $w;
    }
  }
  .list {
    .item {
      display: flex;
      align-items: center;
      height: $h;
      line-height: $h;
      box-sizing: border-box;
      &.active {
        background-color: rgb(250, 254, 201);
        .icon-radioactive {
          color: rgb(182, 41, 41);
        }
      }
      // box-sizing: border-box;
      span {
        flex: 1 0 $w;
        height: $h;
        line-height: $h;
        text-align: center;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        font-size: 24rpx;
        box-sizing: border-box;
        &:last-child {
          border-right: none;
        }
      }
      .left {
        color: #fff;
        background-color: blue;
        // border: 1px solid red;
        border-right: 1px solid #ccc;
        box-sizing: border-box;
      }

      .grow-5 {
        flex: 5 0 $w;
        display: flex;
        align-items: center;
        // box-sizing: border-box;
        .text {
          display: inline-block;
          width: $tw;
          height: $tw;
          line-height: $tw;
          text-align: center;
          border-radius: 50%;
          background-color: red;
          color: #fff;
          margin-left: 2rpx;
        }
      }
      .icon-radioactive {
        font-size: 60rpx;
      }
    }
  }
}
</style>
