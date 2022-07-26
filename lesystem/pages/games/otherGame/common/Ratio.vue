<template>
  <view>
    <view v-if="isShowGains" class="tips bg-white text-black">
      <i class="iconfont icon-dian"></i>
      <text>若中奖：奖金{{ bonus }}元，盈利{{ gains }}元</text>
    </view>
    <view class="ratio flex align-center justify-between"
      ><view style="border: 1px solid #ccc; padding: 5rpx 20rpx">游戏规则</view>
      <view v-if="MB" class="slider-box">
        <view class="text">{{ leftValue }}%</view>
        <text @click="changeRatio('0')" class="iconfont icon-reduce"></text>
        <view style="width: 240rpx"
          ><slider
            class="slider"
            :value="curSliderV"
            block-size="15"
            @changing="sliderChange"
            :max="maxValue"
            min="0"
        /></view>
        <text @click="changeRatio('1')" class="iconfont icon-Addr"></text>
        <!-- <view class="text">{{ rightValue }}</view> -->
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    buyModel: {
      type: Array,
      default: () => {
        return [1, 2, 3, 4];
      },
    },
  },
  data() {
    return {
      fixed: 2,
      isShowGains: false,
      bonus: 0,
      gains: 0,
      maxValue: 1,
      curSliderV: 1,
      step: 0.1,
      leftValue: 0,
      rightValue: 0,
      ratio: 1,
      unitIndex: 0,
      unit: [],
      rate: 1,
    };
  },
  created() {
    // this.initData();
  },

  watch: {
    "$store.state.gameData.curPlayList": {
      handler: function (val) {
        this.initData();
      },
      deep: true,
    },
  },

  created(){
    this.initData()
  },


  methods: {
    initData() {
      let obj = this.$store.state.gameData.curPlayList
      let { MB, MiO, MxO } = obj.C[0].C[0];
      this.maxValue = MB;
      this.curSliderV = MB;
      this.MxO = MxO
      this.MB = MB
      this.setValue(this.curSliderV);
    },

    changeRatio(type) {
      if (type === "0") {
        if (this.curSliderV <= 0) {
          this.curSliderV = 0;
          return;
        }

        this.curSliderV -= this.step;
      }

      if (type === "1") {
        if (this.curSliderV >= this.maxValue) {
          this.curSliderV = this.maxValue;
          return;
        }
        this.curSliderV += this.step;
        if (this.curSliderV >= this.maxValue) {
          this.curSliderV = this.maxValue;
          return;
        }
      }

      this.setValue(this.curSliderV);
    },

    sliderChange(e) {
      let num = e.detail.value;
      console.log(num)
      if (num === "0") {
        this.curSliderV = 0;
        return;
      }
      this.curSliderV = num;
      this.setValue(num);
    },

    setValue(num) {
      this.leftValue = Math.round((this.maxValue - num) * 10) / 10;
      let percentage = this.leftValue / this.maxValue  || 0;
      let selectBack = this.maxValue - this.leftValue;


      this.$store.commit("setRate", {
        percentage,
        selectBack,
        rate: 1,
        ratio: 1,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.slider-box {
  display: flex;
  align-items: center;
  line-height: 0;
  // justify-content: center;
  width: 400rpx;
  .text {
    width: 110rpx;
    text-align: center;
    display: block;
  }
  .iconfont {
    font-size: 48rpx;
    line-height: 0;
  }
  .icon-reduce {
    margin-right: 15rpx;
  }
  .slider {
    margin: 0;
    padding: 0;
    width: 90%;
  }
}
.tips {
  font-size: 24rpx;
  height: 70rpx;
  line-height: 70rpx;
  border-top: 1px solid #c5c3c3;
}
.ratio {
  border-top: 1px solid #c2bfbf;
  padding: 20rpx 20rpx;
}
.picker-box {
  width: 60rpx;
  border: 1px solid gray;
}
</style>
