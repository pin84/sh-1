<template>
  <view>
    <view v-if="isShowGains" class="tips bg-white text-black">
      <i class="iconfont icon-dian"></i>
      <text>若中奖：奖金{{ bonus }}元，盈利{{ gains }}元</text>
    </view>
    <view class="ratio flex align-center justify-between">
      <view class="rule">游戏规则</view>
      <view v-if="MB" class="flex align-center" style="width: 60%">
        <view class="text-center" style="flex: 0 0 80rpx">
          <text>{{ leftValue }} %</text>
        </view>
        <view class="add" @click="changeRatio('0')"
          ><text
            class="iconfont icon-jian text-red"
            style="font-size: 20rpx"
          ></text
        ></view>
        <view class="uni-padding-wrap uni-common-mt"
          ><slider
            :value="curSliderV"
            block-size="15"
            @change="sliderChange"
            :max="maxValue"
            :step="step"
        /></view>
        <view class="add" @click="changeRatio('1')"
          ><text
            class="iconfont icon-tianjia text-red"
            style="font-size: 20rpx"
          ></text
        ></view>

        <view v-if="false" class="text-center" style="flex: 0 0 80rpx">
          <text>{{ rightValue }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      MB:1, 
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

  watch: {
    "$store.state.GDV3.v3CurGame": {
      handler: function (val) {
        this.initData(val);
      },
      // deep: true
    },
  },

  created() {
     
  	// this.initData()
  },

  //只给118用。其他的不用。
  methods: {
    initData(val) {
      // let { MB, MiO, MxO } = val[0].c[0].C[0];
      let { MB, MiO, MxO } = val[0].C[0].C[0];
      this.maxValue = MB;
      this.curSliderV = MB;
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
      if (num === "0") {
        this.curSliderV = 0;
        return;
      }
      this.curSliderV = num;
      this.setValue(num);
    },

    setValue(num) {
      this.leftValue = Math.round((this.maxValue - num) * 10) / 10;
      let percentage = this.leftValue / this.maxValue;
      let selectBack = this.maxValue - this.leftValue;
      this.$store.commit("v3OfficialRate", { percentage, selectBack });
    },
  },
};
</script>

<style lang="scss" scoped>
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

uni-slider {
  margin: 0 20rpx;
}
.uni-common-mt {
  margin: 0;
  padding: 0;
}

.add {
  width: 30rpx;
  height: 30rpx;
  line-height: 25rpx;
  text-align: center;
  border: 1px solid gray;
  border-radius: 50%;
}
</style>
