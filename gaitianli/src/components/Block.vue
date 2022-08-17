<template>
  <div class="item-block">
    <div
      class="list"
      :class="[{'mr_20':mrArr_20.includes(index)},{'mr_40':mrArr_40.includes(index)}]"
      v-for="(arr,index) of d"
      :key="index"
    >
      <div
        class="item"
        :class="[{'bg_green':obj.isHas}]"
        v-for="(obj,idx) of arr"
        :key="idx"
      >
        <span
          class="text-box"
          v-if="obj.Days"
        >{{obj.Days}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    d: {
      type: Array,
      default: () => [],
    },

    mrArr_20: {
      type: Array,
      default: () => [6,20,27,34],
    },
    mrArr_40: {
      type: Array,
      default: () => [13],
    },
  },

  data() {
    return {
      // d: [
      //   {
      //     ID: 29,
      //     KuHao: 23,
      //     Lie: -2,
      //     Ceng: 1,
      //     Days: 49,
      //   },
      //   {
      //     ID: 23,
      //     KuHao: 23,
      //     Lie: 1,
      //     Ceng: 1,
      //     Days: 49,
      //   },
      //   {
      //     ID: 30,
      //     KuHao: 23,
      //     Lie: 20,
      //     Ceng: 1,
      //     Days: 48,
      //   },
      //   {
      //     ID: 21,
      //     KuHao: 23,
      //     Lie: 40,
      //     Ceng: 2,
      //     Days: 49,
      //   },
      //   {
      //     ID: 22,
      //     KuHao: 23,
      //     Lie: 8,
      //     Ceng: 3,
      //     Days: 49,
      //   },
      // ],
    };
  },

  created() {
    this.initData();
  },

  methods: {
    initData() {},
  },
};
</script>

<style lang="scss" scoped>
$w: 10px;
$h: 6px;
.item-block {
  // width: 100px;
  // height: 100px;

  display: flex;
  justify-content: center;
  .list {
    // display: flex;
    //  flex-direction: column;
    //  border: 1px solid #fff;
    &.mr_20 {
      margin-right: 10px;
    }

    &.mr_40 {
      margin-right: 50px;
    }
    .item {
      width: $w;
      height: $h;
      border: 1px solid #ccc;
      box-sizing: border-box;
      margin-bottom: 1px;
      margin-right: 2px;
      display: flex;
      align-items: center;
      justify-content: center;

      &.bg_green {
        background-color: green;
        border: 1px solid green;
      }
      .text-box {
        display: inline-block;
        width: $w;
        height: $h;
        line-height: $h;
        text-align: center;
        font-size: 6px;
        color: #fff;
      }
    }
  }
}
</style>