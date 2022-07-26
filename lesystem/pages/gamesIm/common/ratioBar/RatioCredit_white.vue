<template>
  <view>
    <!-- 	<view v-if="isShowGains" class="tips bg-white text-black ">
			<i class="iconfont icon-dian"></i>
			<text>若中奖：奖金{{ bonus }}元，盈利{{ gains }}元</text>
		</view> -->
    <view class="ratio flex align-center">
      <view class="rule">游戏规则</view>
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
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      MB: 0,
      selectBack: 0,
      percentage: 0,
      odds: 1,
      isShowGains: false,
      bonus: 0,
      gains: 0,
      maxValue: 100,
      curSliderV: 100,
      leftValue: 0,
      rightValue: 0,
      step: 1,
      ratio: 1,
      unitIndex: 0,
      unit: [],
      rate: 1,
      unitArr: {
        1: "元",
        2: "角",
        3: "分",
        4: "厘",
      },
      buyModel: [1, 2, 3, 4],
      curRateObj: {}, //当前的比率对象
      isInit:true,
    };
  },

  watch: {
    "$store.state.GDV3.v3RatioInitValue": {
      handler: function (val) {
        this.initData(val);
      },
      deep: true,
    },

    "$store.state.GDV3.v3RatioCurValue": function (val) {
      this.curRateObj = val;
      if (JSON.stringify(val) === "{}") {
        this.curRateObj = this.$store.state.GDV3.v3RatioInitValue;
      }
      this.setValue();
    },

    // '$store.state.GDV3.clearSelected': function(val) {
    // 	this.isShowGains = false;
    // },

    "$store.state.GDV3.footMoney": {
      handler: function (val) {
        let { money } = val;
        if (!money) {
          this.isShowGains = false;
        } else {
          this.isShowGains = true;
        }

        this.setBonus(money);
      },
      deep: true,
    },
  },

  created() {
    this.buyModel.forEach((num) => this.unit.push(this.unitArr[num]));
    let v3RatioInitValue = this.$store.state.GDV3.v3RatioInitValue;

    this.initData(v3RatioInitValue);
  },
  methods: {
    setBonus(money) {
      let sumBonus = this.$store.state.GDV3.sumBonus;
      let num;
      if (sumBonus) {
        num = sumBonus;
      } else {
        num = this.rightValue;
      }

      this.bonus = this.$buyDataHandler.setNumDecimal(num * this.ratio);
      this.gains = this.$buyDataHandler.setNumDecimal(this.bonus - money);
    },
    initData(val) {
      this.curRateObj = val;
      let { MB, MxO, MiO } = this.curRateObj;
      this.MB = MB;
      this.MxO = MxO;
      this.MiO = MiO;
      this.maxValue = MB * 10;
      // this.curSliderV = MB * 10;

      if (this.maxValue) {
        if (this.isInit) {
          this.curSliderV = MB * 10;
          this.isInit = false;
        }
        this.setValue();
        this.setStore();
      }
    },

    sliderChange(e) {
      this.curSliderV = e.detail.value;
      this.setValue();
      this.setStore();
    },

    setValue() {
      let r = (this.maxValue - this.curSliderV) / this.maxValue;
      this.percentage = isNaN(r) ? 0 : r;
      this.rightValue = this.$buyDataHandler.setNumDecimal(
        (this.MxO - (this.MxO - this.MiO) * r) * this.rate,
        3
      );
      // let leftValue = (this.maxValue - this.curSliderV) / 10;
      this.leftValue = Number(
        ((this.maxValue - this.curSliderV) / 10).toFixed(1)
      );
      this.selectBack = this.MB - this.leftValue;
    },

    changeRatio(type) {
      if (type === "0") {
        if (this.curSliderV <= 0) {
          this.curSliderV = 0;
          return;
        }
        this.curSliderV = this.curSliderV - this.step;
      }
      if (type === "1") {
        if (this.curSliderV >= this.maxValue) {
          this.curSliderV = this.maxValue;
          return;
        }
        this.curSliderV = this.curSliderV + this.step;
      }

      this.setValue();
      this.setStore();
    },

    setStore() {
      let obj = {
        rate: this.rate, //钱单位
        ratio: this.ratio, //倍数
        odds: this.leftValue,
        percentage: this.percentage,
        selectBack: this.selectBack,
      };

      //  console.log(obj.selectBack)
      this.$store.commit("v3OfficialRate", obj);
    },
  },
};
</script>

<style lang="scss" scoped>
.rule {
  border: 1px solid gray;
  padding: 5rpx 15rpx;
}
.slider-box {
  display: flex;
  align-items: center;
  line-height: 0;
  margin-left: 40rpx;
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
  // background-color: #3f8a6a;
}
.ratio {
  border-top: 1px solid #c2bfbf;
  padding: 20rpx 20rpx;
}
.picker-box {
  width: 60rpx;
  border: 1px solid gray;
}

.uni-common-mt {
  margin: 0;
  padding: 0;
}
</style>
