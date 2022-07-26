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
        <span :class="item.iconClass" class="iconfont icon-radioactive"> </span>
      </view>
    </view>
  </view>
</template>

<script>
import bgcolor from "./bgcolor";
export default {
  props: {
    numArr:{
      type: Array,
      default: () => [],
    },
    limitLen: {
      type: Number,
      default: () => 3,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedArr: [],
    };
  },
  watch: {
    "$store.state.GDV3.clearSelected": function (val) {
      this.resetData();
    },
  },


  methods: {
    resetData() {
      this.list.forEach((item) => {
        if (item.active) {
          item.active = false;
          item["iconClass"] = "";
        }
      });
      this.selectedArr = [];
      this.list.push({});
      this.list.pop();
    },
    selectedItem(item) {
      let index = this.selectedArr.findIndex((obj) => obj.N == item.N);
      if (this.limitLen) {
        if (item.active) {
          let len = this.selectedArr.length;
          if (len > this.limitLen) {
            if (index > this.limitLen - 1) {
              this.selectedArr.splice(index, 1);
              item.active = false;
            }
          } else {
            this.selectedArr.splice(index, 1);
            item.active = false;
          }
        } else {
          item.active = true;
          this.selectedArr.push(item);
        }
      } else {
        item.active = !item.active;
        if (index != -1) {
          this.selectedArr.splice(index, 1);
        } else {
          this.selectedArr.push(item);
        }
      }

      item["iconClass"] = "";
      if (this.limitLen && this.selectedArr.length > this.limitLen) {
        for (let i = 0; i < this.limitLen; i++) {
          this.selectedArr[i]["iconClass"] = "green";
        }
      } else {
        this.selectedArr.forEach((item) => {
          item["iconClass"] = "";
        });
      }
      this.list.push({});
      this.list.pop();

      this.$emit("selectedNum", this.selectedArr);
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
      .green {
        color: #17ff4d !important;
      }
    }
  }
}
</style>
