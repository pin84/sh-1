<template>
  <view class="play">
    <view class="top">
      <span class="top-item">项目</span>
      <span class="top-item">赔率</span>
      <span class="top-item grow-5">号码</span>
      <span class="top-item">选择</span>
    </view>
    <view class="list">
      <view
        @click="selectedItem(item)"
        :class="{ active: item.active }"
        class="item"
        v-for="(item, n) in list"
        :key="n"
      >
        <span>{{ item.N }}</span>
        <span>{{ item.odds }}</span>
        <span :class="{ 'grow-5': true }">
          <text
            :style="{ backgroundColor: item.bc }"
            class="text"
            v-for="(item, idx) in numArr[n]"
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
import common from './common'
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      numArr: [],
    };
  },
  watch: {
    "$store.state.GDV3.clearSelected": function (val) {
      this.resetData();
    },
  },

  created() {
    this.initData();
  },

  methods: {
    resetData() {
      this.list.forEach((item) => {
        if (item.active) {
          item.active = false;
        }
      });
      this.list.push({});
      this.list.pop();
    },
    selectedItem(obj) {
      obj.active = !obj.active;
      this.list.push({});
      this.list.pop();
    },

    initData() {
      this.numArr = common.ShengXiaoList();
    },
  },
};
</script>

<style lang="scss" scoped>
$w: 60rpx;
$h: 100rpx;
$tw: 40rpx;
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
      }
      .icon-radioactive {
        font-size: 60rpx;
      }
    }
  }
}
</style>
