<template>
  <view class="play">
    <view class="top">
      <span class="top-item">项目</span>
      <span class="top-item odds">赔率</span>
      <span class="top-item grow-5">号码</span>
      <span class="top-item">选择</span>
    </view>
    <view class="list">
      <view
        @click="selectedItem(obj, n)"
        :class="{ active: obj.active }"
        class="item"
        v-for="(obj, n) in list"
        :key="n"
      >
        <span>{{ obj.N }}</span>
        <span class="odds">{{ obj.odds }}</span>
        <span :class="{ 'grow-5': true }">
          <text
            :style="{ backgroundColor: obj.isEnable ? 'gray' : item.bc }"
            class="text"
            v-for="(item, idx) in obj.numList"
            v-show="item.num < 49"
            :key="idx"
            >{{ item.num }}</text
          >
        </span>
        <span class="iconfont icon-radioactive"> </span>
      </view>
    </view>
  </view>
</template>

<script>
import common from "./common";
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    limitLen: {
      type: Number,
      default: () => 2,
    },
  },
  data() {
    return {
      count: 0,
      jiaqin: {},
      yeshou: {},
      typeArr: [1, 2, 3, 4],
    };
  },

  watch: {
    "$store.state.GDV3.clearSelected": function (val) {
      this.resetData();
    },
  },

  created() {
    let { jiaqin, yeshou } = common.shengxiaoFenLei();
    this.jiaqin = jiaqin;
    this.yeshou = yeshou;
    // this.initData();
  },

  methods: {
    resetData() {
      this.count = 0;
      this.list.forEach((item) => {
        item.active = false;
        item.isEnable = false;
      });

      this.reFreshData();
    },

    reFreshData() {
      this.list.push({});
      this.list.pop();
    },

    handlerList(list) {
      console.log(list);
      let typeArr = [];
      for (let obj of list) {
        if (!obj.active) continue;
        console.log(obj);
        if (this.jiaqin.includes(obj.N)) {
          typeArr.push(1);
        } else {
          typeArr.push(2);
        }

        if (obj.numList[0].num % 2 == 1) {
          typeArr.push(3);
        } else {
          typeArr.push(4);
        }
      }

      let arr = Array.from(new Set(typeArr));
      if (arr.length == 4 || arr.length == 0) return;


      for (let n of this.typeArr) {
        if (arr.includes(n)) continue;
        //禁止野兽
        if (n == 1) {
          for (let obj of this.list) {
            if (obj.active) continue;
            if (this.yeshou.includes(obj.N)) {
              obj.isEnable = true;
            }
          }
        }
        if (n == 2) {
          for (let obj of this.list) {
            if (obj.active) continue;
            if (this.jiaqin.includes(obj.N)) {
              obj.isEnable = true;
            }
          }
        }
        if (n == 3) {
          for (let obj of this.list) {
            if (obj.active) continue;
            if (obj.numList[0].num % 2 == 0) {
              obj.isEnable = true;
            }
          }
        }
        if (n == 4) {
          for (let obj of this.list) {
            if (obj.active) continue;
            if (obj.numList[0].num % 2 != 0) {
              obj.isEnable = true;
            }
          }
        }
      }
    },

    async selectedItem(obj, index) {
      console.log(obj);

      if (obj.active) {
        obj.active = false;
        this.count--;
        this.setDataStatus(this.list, "isEnable", false);
      } else {
        if (obj.isEnable) return;
        obj.active = true;
        this.count++;

        if (this.count >= this.limitLen) {
          this.setDataStatus(this.list, "isEnable", true);
          return;
        }
      }


      if (this.limitLen - this.count == 1) {
        this.handlerList(this.list);
      }

      this.reFreshData();
    },

    setDataStatus(list, attr, status) {
      list.forEach((item) => {
        if (!item.active) {
          item[attr] = status;
        }
      });
      this.reFreshData();
    },
  },
};
</script>

<style lang="scss" scoped>
$w: 60rpx;
$h: 100rpx;
$tw: 40rpx;
$w_odds: 170rpx;
.play {
  width: 100%;
  height: 100%;
  background-color: #fff;
  // overflow: scroll;
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
    .odds {
      flex: 0 0 $w_odds;
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
      &.active {
        background-color: rgb(250, 254, 201);
        .icon-radioactive {
          color: rgb(182, 41, 41);
        }
      }
      span {
        flex: 1 0 $w;
        text-align: center;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        font-size: 24rpx;
        &:last-child {
          border-right: none;
        }
      }
      .odds {
        flex: 0 0 $w_odds;
      }
      .grow-5 {
        flex: 5 0 $w;
        height: $h;
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
        .bg_gray {
          background-color: gray !important;
        }
      }
      .icon-radioactive {
        font-size: 60rpx;
      }
    }
  }
}
</style>
