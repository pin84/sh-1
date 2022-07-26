<template>
  <view class="long-hu">
    <view class="item" v-for="(item, index) in list" :key="index">
      <view class="item-name">{{ item.N1 }}</view>
      <view class="item-con-box">
        <view
          @click="selectedItem(C)"
          class="item-con flex-sub"
          :class="{ active: C.active }"
          v-for="(C, idx) in item.C"
          :key="idx"
        >
          <text class="item-n" :class="'idx-' + idx">{{ C.N }}</text>
          <text class="item-r">{{ C.odds }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [
        {
          N1: "AA",
          C: [
            { N: "AA", odds: "33" },
            { N: "AA", odds: "33" },
          ],
        },
      ],
    },
  },
  data() {
    return {
      num: 0,
    };
  },
  watch: {
    "$store.state.GDV3.clearSelected": function (val) {
      this.resetData();
    },
  },

  methods: {
    resetData() {
      this.list.forEach((outItem) => {
        outItem.C.forEach((item) => {
          if (item.active) {
            item.active = false;
          }
        });
      });

      this.refreshData();
      this.$store.commit("v3IsHasSelected", false);
    },
    selectedItem(item) {
      if (item.active) {
        item.active = false;
        this.num--;
      } else {
        item.active = true;
        this.num++;
      }

      if (this.num) {
        this.$store.commit("v3IsHasSelected", true);
      } else {
        this.$store.commit("v3IsHasSelected", false);
      }

      this.refreshData();
    },

    refreshData() {
      this.list.push({});
      this.list.pop();
    },
  },
};
</script>

<style lang="scss" scoped>
.long-hu {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 5rpx;
  .item {
    width: 49vw;
    margin-bottom: 6rpx;
    .item-name {
      text-align: center;
      padding: 10rpx 0;
      background-color: #e5e5e5;
      color: #5d5d5d;
      font-size: 36rpx;
    }
    .item-con-box {
      display: flex;
      .item-con {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 25rpx 20rpx;
        background-color: #fff;
        border-right: 1px solid #f1f1f1;
        .item-n {
          width: 70rpx;
          height: 70rpx;
          line-height: 70rpx;
          border-radius: 50%;
          background-color: red;
          text-align: center;
          font-weight: 700;
          color: white;
          font-size: 36rpx;
        }
        .idx-0 {
          background-color: #cf271e;
        }
        .idx-1 {
          background-color: #2373d6;
        }
        .idx-2 {
          background-color: #2373d6;
        }
        .item-r {
          color: #c42133;
          margin-top: 15rpx;
        }
      }

      .active {
        background-color: rgba(255, 199, 25, 0.4);
      }
    }
  }
}
</style>
