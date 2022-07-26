<template>
  <div class="option-bar">
    <div class="add-box">
      <i class="iconfont icon-qiandai"></i>
      <div v-if="MB" class="slider-box">
        <span class="left-value">{{ leftValue }}%</span>
        <i
          @click="changeSliderClick('0')"
          class="iconfont icon-jian pointer"
        ></i>

        <el-slider
          @input="changeSlider"
          class="slideraa"
          v-model="sliderValue"
          :step="step"
          :max="maxValue"
          :format-tooltip="formatTooltip"
        ></el-slider>
        <i
          @click="changeSliderClick('1')"
          class="iconfont icon-tianjia pointer"
        ></i>
        <!-- <span>{{ rightValue }}</span> -->
      </div>
    </div>

    <div class="btn-box">
      <el-button
        v-show="isShow"
        v-for="(btn, idx) in btnList"
        :key="idx"
        :type="curBtn == idx ? 'warning' : ''"
        @click="bettingType(idx)"
        >{{ btn }}</el-button
      >
      <el-button @click="setMoney" class="btn" type="warning" plain
        >快选金额</el-button
      >
    </div>
  </div>
</template>
<script>
import AddReduce from "../AddReduce";
export default {
  data() {
    return {
      curBtn: 0,
      btnList: ["一般", "快捷"],
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
      sixIds:[1,2,595,],
      ids: [12, 13, 14,8,11], //六合彩
      isShow: true,
    };
  },
  components: {
    AddReduce,
  },
  watch: {
    "$store.state.gd.odds": {
      //playType p1
      handler: function (val) {
        let { MB, MiO, MxO } = val;
        this.MB = MB;
        this.MiO = MiO;
        this.MxO = MxO;
        this.step = 10 / this.MB;
        this.initOdds();
      },
      deep: true,
    },
    "$store.state.gd.curGame": {
      handler: function (val) {
        let { id } = this.$route.query;
        id = Number(id)
        if (!this.sixIds.includes(id) ) {
          this.isShow = true;
          return;
        }
        let { Id } = val;
        if (this.ids.includes(Id)) {
          this.isShow = false;
        } else {
          this.isShow = true;
           this.$store.commit("bettingType", false);
        }
        this.curBtn = 0
      },
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
    setMoney() {
      this.$store.commit("showSetMoney", new Date().getTime());
    },
    bettingType(type) {
      this.$store.commit("clearSelect", new Date().getTime());
      this.$store.commit("inputMoney", "");

      this.curBtn = type;
      this.$store.commit("bettingType", type);
    },

    changeSlider() {
      this.initOdds();
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
        if (this.sliderValue >= 100) {
          this.sliderValue = 100;
          return;
        }
        this.sliderValue += this.step;
      }
      this.initOdds();
    },

    initOdds() {
      this.percentage = (100 - this.sliderValue) / 100;
      this.leftValue = this.$BDH.setNumDecimal(this.MB * this.percentage, 2);

      let obj = {
        percentage: this.percentage,
        selectBack: this.MB - this.leftValue < 0 ? 0 : this.MB - this.leftValue,
      };

      this.$emit("setFootOdds", obj);
      this.$store.commit("footOdds", obj);
    },
  },
};
</script>

<style lang="scss" scoped>
$iSize: 20px;
.option-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  padding: 0px 10px;
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
      width: 45px;
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
  }
  .btn-box {
    display: flex;
    .btn {
      color: #919090;
      &:hover {
        background-color: #f2900e;
        color: #fff;
      }
    }
  }

  .pointer:hover {
    cursor: pointer;
  }
}
</style>