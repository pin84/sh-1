<template>
  <view class="num-box">
    <block v-for="(item, idx) in list" :key="idx">
      <view class="item-box" >
        <view
          @click="selected(item)"
          class="item-num flex flex-direction"
          :class="{ 'item-num-active': item.active }"
          :key="idx"
        >
          <text class="text text-white text-bold text-xxl">{{ item.N }}</text>
          <text class="text text-c text-xs">{{ item.odds || 0 }}</text>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [{ N: 1, odds: 3.22 }],
    },
  },
  data() {
    return {
      isHasSelected: 0,
    };
  },

  watch: {
    "$store.state.GDV3.clearSelected": function (val) {
      this.resetData();
    },
  },

  methods: {
    selected(obj) {
      if (obj.active) {
        obj.active = false;
        this.$store.commit("v3SelectedCount", -1);
      } else {
        obj.active = true;
        this.$store.commit("v3SelectedCount", 1);
      }

      this.refreshPage();
    },

    resetData() {
      this.list.forEach((item) => {
        if (item.active) {
          item.active = false;
        }
      });
      this.refreshPage();
    },

    refreshPage() {
      this.list.push({});
      this.list.pop();
      this.$store.commit("v3IsHasSelected", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.num-box {
  display: flex;
  flex-wrap: wrap;
  background-color: #f1f1f1;
  width: 100%;
  padding: 10rpx;
  .item-box {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15rpx;
    .item-num {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      background-color: #b62929;
      align-items: center;
      justify-content: center;
      padding-top: 10rpx;
      display: flex;
      flex-direction: column;
      .text-xxl {
        line-height: 40rpx;
      }
      .text-c {
        color: #e7ff00;
      }
    }
    .item-num-active {
      position: relative;
      background-color: #ffe100;
      .text {
        color: black;
      }
    }

    .item-num-active::after {
      position: absolute;
      left: -15rpx;
      top: -2.2vw;
      content: "";
      display: block;
      width: 0;
      height: 0;
      transform: rotate(213deg);
      // transform: scale(0);
      border-top: 5vw solid transparent;
      border-left: 5vw solid #ffe100;
      border-bottom: 5vw solid transparent;
    }
  }
}
</style>
