<template>
  <view class="type">
    <view>
      <view class="list">
        <view
          @click="changeType(index)"
          v-for="(title, index) in titleList"
          :key="index"
          class="item"
          :class="{ active: curIndex == index }"
        >
          {{ title }}</view
        >
      </view>
      <view class="list">
        <view
          v-for="(title, index) in titleList1[curIndex]"
          :key="index"
          class="item item1"
          :class="{ active1: curText == title }"
          @click="changeType1(title)"
        >
          {{ title }}</view
        >
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showType: 0,
      curIndex: 0,
      curText: "",
      titleList: ["两面", "波色", "头尾", "生肖"],
      titleList1: [
        [
          "单",
          "双",
          "大",
          "小",
          "合单",
          "合双",
          "家禽",
          "野兽",
          "尾大",
          "尾小",
          "合尾大",
          "合尾小",
        ],

        [
          "红",
          "蓝",
          "绿",
          "红单",
          "红双",
          "红大",
          "红小",
          "蓝单",
          "蓝双",
          "蓝大",
          "蓝小",
          "绿单",
          "绿双",
          "绿大",
          "绿小",
        ],

        [
          "0头",
          "1头",
          "2头",
          "3头",
          "4头",
          "0尾",
          "1尾",
          "2尾",
          "3尾",
          "4尾",
          "5尾",
          "6尾",
          "7尾",
          "8尾",
          "9尾",
        ],

        [
          "鼠",
          "牛",
          "虎",
          "兔",
          "龙",
          "蛇",
          "马",
          "羊",
          "猴",
          "鸡",
          "狗",
          "猪",
        ],
      ],

      selectList1: ["二尾", "三尾", "四尾"],
      selectList1_1: ["单选/复式", "胆拖"],
      curSelect1: "",
    };
  },

  watch: {
    "$store.state.GDV3.clearSelected": function (val) {
      this.curIndex = 0;
      this.curText = "";
    },



   
  },

  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.curSelect1 = this.selectList1[0];

      let { Id } = this.$store.state.GDV3.v3CurGame;

      let ids = [1, 2];
      if (ids.includes(Id)) {
        this.showType = 1;
      }
    },
    changeType(index) {
      this.curIndex = index;
    },

    changeType1(title) {
      let str;
      if (title == this.curText) {
        str = "";
      } else {
        str = title;
      }
      this.curText = str;

      this.$store.commit("curSelectedType", this.curText);
    },

    changeSelect() {
      console.log(this.curSelect1);
    },
  },
};
</script>

<style lang="scss" scoped>
.type {
  // border: 1px solid red;
  padding: 10rpx;
  .s-box {
    display: flex;
    justify-content: space-around;
    padding: 10rpx 0;
    .select {
      width: 48%;
      height: 60rpx;
      outline: none;
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    .item {
      background-color: #757575;
      color: #fff;
      width: 24%;
      text-align: center;
      border-radius: 5rpx;
      margin-bottom: 15rpx;
      margin-right: 4rpx;
    }

    .item1 {
      width: 15%;
      background-color: #ddd;
      color: #555;
      font-size: 22rpx;
      margin-bottom: 10rpx;
      padding: 5rpx 0;
      border-radius: 5rpx;
      box-shadow: 0 4rpx 5rpx gray;
      margin-right: 8rpx;
    }

    .active {
      background-color: #b62929;
    }
    .active1 {
      background-color: #d2ff00;
    }
  }
}
</style>