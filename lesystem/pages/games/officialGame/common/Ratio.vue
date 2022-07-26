<template>
  <view>
    <view v-if="isShowGains" class="tips bg-white text-black">
      <i class="iconfont icon-dian"></i>
      <text>若中奖：奖金{{ bonus }}元，盈利{{ gains }}元</text>
    </view>

    <view class="ratio flex align-center">
      <view class="flex">
        <view class="picker-box radius">
          <picker
            class="picker text-center"
            @change="PickerChange"
            :value="unitIndex"
            :range="unit"
          >
            <view class="picker">{{ unit[unitIndex] }}</view>
          </picker>
        </view>
        <text>模式</text>

        <!-- <view class="picker-box text-center radius"
          ><input type="number" v-model="ratio" @input="inputRatio"
        /></view> -->

        <view class="picker-box" @click="inputDialogOpen">{{ ratio }}</view>

        <text>倍</text>
      </view>
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
        <view class="text">{{ rightValue }}</view>
      </view>
      <view class="bonus" v-else>奖金：{{ bonus }}</view>
    </view>

<!--    <Pop v-show="isShowPop" @changeTimes="changeTimes" /> -->
	<uni-popup ref="inputDialog" type="dialog">
		<uni-popup-dialog ref="inputClose"  mode="input" title="请输入更改的倍数(整数)" v-model="ratio"
			placeholder="请输入您要更改的倍数" @confirm="changeTimes">
		</uni-popup-dialog>
	</uni-popup>
  </view>
</template>

<script>
//import Pop from "@/pages/gamesIm/common/Pop.vue";
import uniPopup from '@/components/uni-popup-2022/uni-popup/uni-popup.vue';
import uniPopupDialog from '@/components/uni-popup-2022/uni-popup-dialog/uni-popup-dialog.vue';
export default {
  data() {
    return {
      times: 1,
      isShowPop: false,
      MB: 0,
      MxO: 0,
      MiO: 0,
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
      rateIndex: [1, 0.1, 0.01, 0.001],
      curRateObj: {}, //当前的比率对象
      money: "",
    };
  },

  components: {
    uniPopup,
    uniPopupDialog
  },

  watch: {
    "$store.state.gameData.curGame": {
      handler: function (val) {
        this.initData(val);
      },
    },
    "$store.state.GDV3.v3RatioCurValue": {
      handler: function (val) {
        let obj;
        if (JSON.stringify(val) != "{}") {
          obj = val;
        } else {
          obj = this.curRateObj;
        }

        let { MB, MxO, MiO } = obj;

        this.MB = MB;
        this.MxO = MxO;
        this.MiO = MiO;
        this.maxValue = MB * 10;
        this.curSliderV = MB * 10;

        this.setValue();
      },
      deep: true,
    },
    "$store.state.GDV3.footMoney": {
      handler: function (val) {
        let { money, num } = val;

        // console.log('---moeny--',money);
        if (!money) {
          this.isShowGains = false;
          return;
        } else {
          this.isShowGains = true;
        }
        this.money = money;
        this.setBonus();
      },
      deep: true,
    },
  },

  created() {
    this.initPage();
    this.buyModel.forEach((num) => this.unit.push(this.unitArr[num]));
    let obj = this.$store.state.gameData.curGame;
    if (!obj || JSON.stringify(obj) == "{}") return;

    this.initData(obj);
  },
  methods: {
    changeTimes(val) {
     const r = /^\+?[1-9][0-9]*$/;
     if (!r.test(val)) {
             uni.showToast({
             	icon:'none',
             	title:'请输入整数倍数'
             });
     }
	  else{
		 this.ratio = Math.floor(val);
		 this.$refs.inputDialog.close();
		 this.setValue();
		 this.setStore(); 
	  }
      
    },
	inputDialogOpen() {
		//console.log("....");
		this.$refs.inputDialog.open();
	},
  
    initPage() {
      let { rate, ratio, odds, percentage } =
        this.$store.state.GDV3.officialRate;
      this.rate = rate;
      this.ratio = ratio;

      let index = this.rateIndex.findIndex((item) => item == rate);
      this.unitIndex = index;

      let obj = {
        rate: this.rate, //钱单位
        ratio: this.ratio, //倍数
        odds: 0,
        percentage: 0,
      };
      this.$store.commit("v3OfficialRate", obj);
    },
    setBonus() {
      let sumBonus = this.$store.state.GDV3.sumBonus || 1;
      let num = this.rightValue * sumBonus;

      this.bonus = this.$buyDataHandler.setNumDecimal_1(num * this.ratio, 2);
      this.gains = this.$buyDataHandler.setNumDecimal_1(
        this.bonus - this.money,
        2
      );
    },
    initData(val) {
      console.log(val);
      let obj;
      let { gameType } = val;
      if (gameType == "龙虎" || gameType == "百家乐" || gameType == "牛牛") {
        let maxNum = 0;
        let maxObj = {};
        val.C.forEach((obj) => {
          obj.C.forEach((item) => {
            if (item.MxO > maxNum) {
              maxNum = item.MxO;
              maxObj = item;
            }
          });
        });
        obj = maxObj;
      } else {
        obj = val.C[0];
      }

      this.curRateObj = obj;
      let { MB, MxO, MiO } = obj;

      this.MB = MB;
      this.MxO = MxO;
      this.MiO = MiO;
      this.maxValue = MB * 10;
      this.curSliderV = MB * 10;

      // if (MB == 0) {
      //   let obj = {
      //     rate: this.rate, //钱单位
      //     ratio: this.ratio, //倍数
      //     odds: 1,
      //     percentage: this.percentage,
      //   };
      //   this.$store.commit("v3OfficialRate", obj);
      // }

      this.setValue();
    },

    sliderChange(e) {
      this.curSliderV = e.detail.value;
      this.setValue();
      this.setStore();
    },

    setValue() {
      let r = (this.maxValue - this.curSliderV) / this.maxValue;
      this.percentage = isNaN(r) ? 0: r;

      this.rightValue = this.$buyDataHandler.setNumDecimal(
        (this.MxO - (this.MxO - this.MiO) * this.percentage) * this.rate,
        3
      );
      this.leftValue = (this.maxValue - this.curSliderV) / 10;

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
      }

      this.setValue();
      this.setStore();
    },

    PickerChange(e) {
      let i = e.detail.value;
      this.unitIndex = i;
      let rate;
      switch (this.unit[i]) {
        case "元":
          rate = 1;
          break;
        case "角":
          rate = 0.1;
          break;
        case "分":
          rate = 0.01;
          break;
        case "厘":
          rate = 0.001;
          break;
        default:
          rate = 1;
          break;
      }

      this.rate = rate;
      this.setValue();
      this.setStore();
      this.setBonus();
    },

    setStore() {
      let obj = {
        rate: this.rate, //钱单位
        ratio: this.ratio, //倍数
        odds: this.leftValue,
        percentage: this.percentage,
      };
      this.$store.commit("v3OfficialRate", obj);
    },
  },
};
</script>

<style lang="scss" scoped>
.bonus {
  margin-left: 45%;
}
.slider-box {
  display: flex;
  align-items: center;
  line-height: 0;
  width: 400rpx;
  margin-left: 40rpx;
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
  text-align: center;
  border: 1px solid gray;
}

.uni-common-mt {
  margin: 0;
  padding: 0;
}
</style>
