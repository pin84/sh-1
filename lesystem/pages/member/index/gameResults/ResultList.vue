<template>
  <view class="r-list">
    <view class="list" v-if="showType == 1">
      <view class="item" v-for="(item, index) in list" :key="index">
        <view class="item-top">
          <span>第{{ item.number }}期</span>
          <span>{{ item.time }}</span>
        </view>
        <view class="num-list">
<!-- 			            :style="{ backgroundColor: colorObj[Number(n) % 9] }" -->
          <span
            class="num"
            v-for="(n, i) in item.result"
            :key="i"
            >{{ n }}</span
          >
        </view>
        <view v-if="item.resutl1" class="num-list list1">
          <span class="num num-1" v-for="(n, i) in item.resutl1" :key="i">{{
            n
          }}</span>
        </view>
      </view>
    </view>
    <view class="list" v-if="showType == 2">
      <view class="item item-2" v-for="(item, index) in list" :key="index">
        <view class="item-top">
          <span>第{{ item.number }}期</span>
          <span>{{ item.time }}</span>
        </view>
        <view class="num-list">
          <span class="num" v-for="(n, i) in item.result" :key="i">{{
            n
          }}</span>
        </view>
        <view class="sum">
          <view> 总和：{{ item.zh }}</view>
          <view style="padding: 0 20rpx"></view>
          <view> 大小：{{ item.zds }} </view>
          <view style="padding: 0 20rpx"></view>
          <view> 单双：{{ item.zdx }} </view>
        </view>

        <!-- <view v-if="item.resutl1" class="num-list list1">
          <span class="num num-1" v-for="(n, i) in item.resutl1" :key="i">{{
            n
          }}</span>
        </view> -->
      </view>
    </view>
    <view class="list" v-if="showType == 3">
      <view class="item item-2" v-for="(item, index) in list" :key="index">
        <view class="item-top">
          <span>第{{ item.number }}期</span>
          <span>{{ item.time }}</span>
        </view>
        <view class="num-list">
          <span v-for="(n, i) in item.result" :key="i">
            <span class="num">{{ n }} </span>
            <span v-if="i < item.result.length - 2">+</span>
            <span v-else-if="i < item.result.length - 1">=</span>
          </span>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import ids from '@/pages/gamesIm/ids.js'
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showType: 1,
      colorObj: {
        9: "#b62929",
        1: "#f5f003",
        2: "#0b91ff",
        3: "#4a4d52",
        4: "#ff7401",
        5: "#79ffff",
        6: "#5937fd",
        7: "#e7e7e7",
        8: "#ff2501",
        0: "#03c300",
      },
    };
  },
  created() {
    this.initData();
  },

  methods: {
    initData() {
      let routes = getCurrentPages()
      let { id } = routes[routes.length - 1].options
      if (!id) return;
      id = Number(id);

      let idType;
      for (let [key, value] of Object.entries(ids)) {
        if (value.includes(id)) {
          idType = key;
          break;
        }
      }

      let idobj = {
        2:[10,40],
        3:[118, 119, 116, 121]
      }

      let showType
      for (let [key, value] of Object.entries(idobj)) {
        if (value.includes(Number(idType))) {
          showType = key;
          break;
        }

        showType = 1
      }

  

    

      this.showType = showType;
    },
  },
};
</script>


<style lang="scss" scoped>
$w: 60rpx;
$w1: 50rpx;
.r-list {
  padding: 20rpx;
  overflow: hidden;

  .item {
    margin-bottom: 20rpx;
    .item-top {
      display: flex;
      justify-content: space-between;
      padding: 10rpx 0;
      color: #5d5d5d;
    }
    .num-list {
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      margin-bottom: 5rpx;
      .num {
        display: inline-block;
        border: 1px solid gray;
        width: $w;
        height: $w;
        line-height: $w;
        text-align: center;
        color: #fff;
		background-color: #FF3333;
        border-radius: 10rpx;
        margin-right: 5rpx;
      }
    }
    .list1 {
      // justify-content: center;
      .num-1 {
        width: $w1;
        height: $w1;
        line-height: $w1;
        margin-right: 8rpx;
        color: #4c4c4c;
      }
	  .num{background-color: #ffbcbc;}
    }
  }

  .item-2 {
    .num-list {
      display: flex;
      .num {
        border: none;
        border-radius: 50%;
        background-color: #b62929;
      }
    }
  }

  .sum {
    display: flex;
    view {
      font-size: 22rpx;
    }
  }
}
</style>
