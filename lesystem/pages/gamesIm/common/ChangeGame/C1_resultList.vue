<template>
  <view class="result-list">
    <view class="title-box bb bb_1">
      <text
        class="title"
        :class="'f' + index"
        v-for="(item, index) in titleObj"
        :key="index"
        >{{ item.name }}</text
      >
    </view>

    <view>
      <view class="title-box bb" v-for="(obj, idx) in resultList" :key="idx">
        <text class="f0 br">{{ obj.period }}期</text>
        <view class="dice-box f0">
          <view v-for="(n, i) in obj.result" :key="i" :class="'dice-0' + n"></view>
        </view>
        <text class="f2">{{ obj.sum }}</text>
        <text class="f2">{{ obj.size }}</text>
        <text class="f2">{{ obj.sd }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      resultList: [],
      titleObj: [
        { name: "期次", fo: 3 },
        { name: "开奖号码", fo: 3 },
        { name: "和值", fo: 1 },
        { name: "大小", fo: 1 },
        { name: "单双", fo: 1 },
      ],
    };
  },

  created() {
    this.initData();
  },
  methods: {
    async initData() {
      let routes = getCurrentPages()
      let { id } = routes[routes.length - 1].options
      let d = {
        url: this.$api.getGameResultList,
        data: {
          gameId: id,
        },
      };

      let res = await this.$http(d);
      res.data.forEach((item) => {
        item.date = item.date.split(" ")[1];
        item.period = item.period.slice(4);
        let arr = item.result.split(",");
        item.result = arr;

        let sum = arr.reduce((accumulator, currentValue) => {
          return accumulator + Number(currentValue);
        }, 0);
        item.sum = sum;
        item.size = sum > 10 ? "大" : "小";
        item.sd = sum % 2 == 0 ? "双" : "单";
      });

      this.resultList = res.data;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("@/common/css/imgcss.scss");
.result-list {
  box-shadow: 0 3px 3px gray;
  background-color: #1c5a3f;
  padding-bottom: 10rpx;
  text {
    color: #fff;
  }
  .title-box {
    display: flex;
    align-items: center;
    width: 100%;
    text {
      text-align: center;
    }
    .dice-box {
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 60rpx;
      padding: 0 25rpx;
    }

    .f0,
    .f1 {
      width: 30%;
    }
    .f3,
    .f4,
    .f2 {
      width: 13%;
    }
    .br {
      border-right: 1px solid #000;
    }
  }
  .bb {
    border-top: 1px dashed #000;
    padding: 5rpx 0;
  }
  .bb_1 {
    padding: 15rpx 0;
    border-top: none;
  }
}
</style>
