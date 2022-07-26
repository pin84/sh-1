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
        @click="selectedItem(item, n)"
        :class="{ active: item.active }"
        class="item"
        v-for="(item, n) in list"
        :key="n"
      >
        <span>{{ item.N }}</span>
        <span class="odds">
          <text>{{ item.odds }}</text>
          <text v-if="item.odds1"> / {{ item.odds1 }}</text>
        </span>
        <span :class="{ 'grow-5': true }">
          <text
            :style="{ backgroundColor: item.bc }"
            class="text"
            :class="{ bg_gray: item.outRange }"
            v-for="(item, idx) in numList[n]"
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
export default {
  props: {
    list: {
      //title
      type: Array,
      default: () => [],
    },
    numList: {
      //数字
      type: Array,
      default: () => [],
    },
    limitLen: {
      type: Number,
      default: () => 2,
    },
    ts:{
      type:Number,
      default:()=>0
    }
  },
  data() {
    return {
      count: 0,
      activeList: [],
    };
  },

  watch: {
    "$store.state.GDV3.clearSelected": function (val) {
      this.resetData();
    },
    'ts':function(val){
      this.resetData()
    }
  },

  created() {
    // this.initData();
  },

  methods: {
    resetData() {
      this.count = 0
      this.list.forEach((item) => {
        if (item.active) {
          item.active = false;
        }
      });

      this.numList.forEach((arr) => {
        arr.forEach((item) => {
          item.outRange = false;
        });
      });

      this.activeList = [];
      this.list.push({});
      this.list.pop();

      this.numList.push({});
      this.numList.pop();
    },
    selectedItem(obj, index) {
      if (obj.active) {
        obj.active = false;
        this.count--;
        let idx = this.activeList.findIndex((num) => num == index);
        this.activeList.splice(idx, 1);

        if (this.count <= this.limitLen) {
          let len = this.numList.length;
          for (let i = 0; i < len; i++) {
            this.numList[i].forEach((item) => {
              item.outRange = false;
            });
          }
        }
      } else {
        if (this.count >= this.limitLen) {
          return;
        }
        obj.active = true;
        this.count++;
        this.activeList.push(index);
        if (this.count >= this.limitLen) {
          let len = this.numList.length;
          for (let i = 0; i < len; i++) {
            if (this.activeList.includes(i)) continue;
            this.numList[i].forEach((item) => {
              if (!item.active) {
                item.outRange = true;
              }
            });
          }
        }
      }
      this.list.push({});
      this.list.pop();
    },

    changeList(list) {},
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
