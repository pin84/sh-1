<template>
  <div class="option-bar">
    <div class="add-box">
      <div style="width: 90px">
        <AddReduce @addReduce="addReduce" />
      </div>
      <span>&nbsp;倍 模式&nbsp;</span>
      <el-select
        @change="changeSelect"
        class="el-select"
        v-model="mode"
        placeholder="元"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.mode"
        ></el-option>
      </el-select>

      <i class="iconfont icon-qiandai"></i>
    </div>
    <div v-if="MB" class="slider-box">
      <span class="left-value">{{ leftValue }}%</span>
      <i @click="changeSliderClick('0')" class="iconfont icon-jian pointer"></i>
      <el-slider
        @input="changeSlider"
        class="slideraa"
        :step="step"
        :max="maxValue"
        :format-tooltip="formatTooltip"
        v-model="sliderValue"
      ></el-slider>
      <i
        @click="changeSliderClick('1')"
        class="iconfont icon-tianjia pointer"
      ></i>
      <span>{{ rightValue }}</span>
    </div>

    <div class="sum-info">
      共选
      <span style="color: red">{{ num }}</span>
      注，共投
      <span style="color: red">{{ money }}</span>
      元，盈利
      <span style="color: red">{{ profit }}</span
      >元
    </div>

    <div class="btn-box">
      <el-button @click="submit" class="btn" :type="btnType">
        <i class="iconfont icon-bianji"></i> &nbsp;确认选号
      </el-button>
      <el-button @click="buy" class="btn" :type="btnType">
        <i class="iconfont icon-checkbox-line"></i> &nbsp;立即下注
      </el-button>
    </div>
  </div>
</template>
<script>
import AddReduce from "../AddReduce";
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "元",
          mode: 1,
        },
        {
          value: "选项2",
          label: "角",
          mode: 0.1,
        },
        {
          value: "选项3",
          label: "分",
          mode: 0.01,
        },
        {
          value: "选项4",
          label: "厘",
          mode: 0.001,
        },
      ],
      mode: 1,
      sliderValue: 100,
      maxValue: 100,
      step: 1,
      btnType: "info",
      num: 0,
      money: 0,
      times: 1,
      profit: 0,
      percentage: 0,
      leftValue: 0,
      rightValue: 0,
      MB: 9,
      MiO: 180000,
      MxO: 198000,
    };
  },
  components: {
    AddReduce,
  },
  watch: {
    "$store.state.gd.footMoney": {
      handler: function (val) {
        if (JSON.stringify(val) == "{}") {
          this.num = 0;
          this.money = 0;
          this.profit = 0;
          this.btnType = "info";
          return;
        }
        let { num, money } = val;
        this.num = num;

        this.money = this.$BDH.setNumDecimal(money, 3);
        this.btnType = "warning";
        this.changeMoney(val);
      },
      deep: true,
    },


    "$store.state.gd.odds": {
      handler: function (val) {
        let { MB, MiO, MxO } = val;
        this.MB = MB;
        this.MiO = MiO;
        this.MxO = MxO;

        this.step = 10 / this.MB;
        this.initOdds();
        this.changeMoney();
      },
      deep: true,
    },
  },

  created() {
    let val = this.$store.state.gd.odds;
    let { MB, MiO, MxO } = val;
    this.MB = MB;
    this.MiO = MiO;
    this.MxO = MxO;

    this.step = 10 / this.MB;
    this.initOdds();
  },

  methods: {
    formatTooltip(val) {
      if (!val) {
        val = 0;
      }
      return val.toFixed(2);
    },
    async buy() {
      let flag = await this.submit(false);
      if (!flag) return;

      this.$store.commit("basketList", "clearBasket");

      setTimeout(() => {
        let ts = new Date().getTime();
        this.$store.commit("toBuy", ts);
      }, 10);
    },

    changeSlider() {
      this.initOdds();
      this.changeMoney();
    },

    changeSliderClick(type) {
      if (type == 0) {
        if (this.sliderValue <= 0) {
          this.sliderValue = 0;
          return;
        }
        this.sliderValue -= this.step;
      }
      if (type == 1) {
        if (this.sliderValue >= this.maxValue) {
          this.sliderValue = this.maxValue;
          return;
        }
        this.sliderValue += this.step;
      }

      // this.initOdds();  //@input  事件触发了
      this.changeMoney();
    },

    initOdds() {
      this.percentage = (this.maxValue - this.sliderValue) / this.maxValue;

      // this.leftValue =  this.percentage * 10
      this.leftValue = this.$BDH.setNumDecimal(this.MB * this.percentage, 4);

      this.rightValue = this.$BDH.setNumDecimal(
        (this.MxO - (this.MxO - this.MiO) * this.percentage) * this.mode,
        4
      );

      // console.log(this.rightValue);
      let obj = {
        percentage: this.percentage,
        selectBack: this.leftValue,
      };


      this.$emit("setFootOdds", obj);
      this.$store.commit("footOdds", obj);
    },
    changeSelect() {
      this.rightValue = this.$BDH.setNumDecimal(
        (this.MxO - (this.MxO - this.MiO) * this.percentage) * this.mode,
        4
      );

      this.setRate();
    },
    addReduce(times) {
      this.times = times;
      this.setRate();
    },

    setRate() {
      let obj = {
        times: this.times,
        mode: this.mode,
      };
      this.$store.commit("footRate", obj);
    },

    async submit(isAddToBasket = true) {
      this.$myAudio.playClick();
      if (this.money == 0) {
        await this.$alert("号码选择不完整，请重新选择", {
          showClose: false,
        });
        return;
      }
      let ts = new Date().getTime();
      if (isAddToBasket) {
        this.$store.commit("addToBasket", ts);
      }
      return true;
    },
    changeMoney() {
      if (!this.money) {
        this.profit = 0;
        return;
      }
      let moneyDeviation = this.$store.state.gd.moneyDeviation;

      let profit;
      let ids = [2650];
      if (false) {
      } else {
        profit = (this.rightValue + moneyDeviation) * this.times - this.money;
      }

      this.profit = this.$BDH.setNumDecimal(profit, 2);
    },
  },
};
</script>

<style lang="scss" scoped>
$iSize: 20px;
.option-bar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  padding: 10px 5px;
  font-size: 14px;
  .add-box {
    display: flex;
    align-items: center;
    .el-select {
      width: 70px;
    }
    .icon-qiandai {
      color: orange;
      font-size: 26px;
      margin-left: 5px;
    }
  }
  .slider-box {
    display: flex;
    align-items: center;
    width: 310px;
    text-align: center;
    .left-value {
      display: inline-block;
      width: 40px;
      text-align: center;
    }
    .iconfont {
      display: inline-block;
      width: $iSize;
      height: $iSize;
      text-align: center;
      line-height: $iSize;
      border: 1px solid gray;
      font-size: 18px;
      border-radius: 50%;
      font-weight: 600;
    }
    .icon-jian {
      margin-right: 10px;
    }
    .icon-tianjia {
      margin-left: 10px;
    }
    .slideraa {
      width: 150px;
    }
  }

  .sum-info {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  .btn-box {
    display: flex;
    .btn {
      width: 120px;
      font-size: 18px;
      padding-left: 10px;
    }
  }

  .pointer:hover {
    cursor: pointer;
  }
}
</style>