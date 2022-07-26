<template>
  <view class="list-square">
    <view
      class="special-item"
      @click="selectedItem(v)"
      :class="{ active: v.active }"
      v-for="(v, index) in list"
      :key="index"
      :style="{ width: itemWidth }"
    >
      <text>{{ v.N }}</text>
      <text style="color: #c42133">{{ v.odds }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [{ N: "AA", odds: "AA" }],
    },
    itemWidth: {
      type: String,
      default: () => "25%",
    },
  },
  data() {
    return {
      count: 0,
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
        }
      });

      this.list.push({});
      this.list.pop();
    },
    selectedItem(item) {
      if (item.active) {
        item.active = false;
        this.count--;
        this.$store.commit("v3SelectedCount", -1);
      } else {
        item.active = true;
        this.count++;
        this.$store.commit("v3SelectedCount", 1);
      }

      this.list.push({});
      this.list.pop();

      if (this.count) {
        this.$store.commit("v3IsHasSelected", true);
      } else {
        this.$store.commit("v3IsHasSelected", false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list-square {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 5rpx;
  .special-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    // width: 25%;
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
}
</style>
