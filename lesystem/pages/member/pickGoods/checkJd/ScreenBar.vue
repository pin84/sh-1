<template>
  <view class="screen-bar">
    <view class="flex bg-white">
      <view class="picker-box flex justify-between align-center">
        <ruiDatePicker
          class="picker"
          :value="startTime"
          @change="changeStartTime"
        ></ruiDatePicker>
        <i class="iconfont icon-icon-test1"></i>
      </view>
      <view class="picker-box flex justify-between align-center">
        <ruiDatePicker
          class="picker"
          :value="endTime"
          @change="changeEndTime"
        ></ruiDatePicker>
        <i class="iconfont icon-icon-test1"></i>
      </view>
      <!-- <view class="flex-sub flex justify-between align-center">
				<picker class="flex-sub margin-left-sm text-cut" mode="selector" :range='gameTypeData'
					:value='gamePickerCur' range-key='name' @change="changeGameType">
					<view v-if="gameTypeData[gamePickerCur]">
						{{gameTypeData[gamePickerCur].name}}
					</view>
				</picker>
				<i class='iconfont icon-icon-test1 margin-right-xs'></i>
			</view> -->
    </view>
  </view>
</template>

<script>
import ruiDatePicker from "@/components/rattenking-dtpicker/rattenking-dtpicker.vue";
export default {
  data() {
    return {
      initTime: "02:00:00",
      // gamePickerCurMap: null ,
    };
  },
  props: {
    gameTypeData: {
      type: Array,
    },
  },
  components: {
    ruiDatePicker,
  },
  computed: {
    startTime() {
      return this.getTimeString("today");
    },
    endTime() {
      return this.getTimeString("tomorrow");
    },
    gamePickerCur: {
      get() {
        let _gamePickerCur = null;
        this.gameTypeData.forEach((item, index) => {
          if (item.code == "CPYX") {
            _gamePickerCur = index;
          }
        });
        return _gamePickerCur;
      },
      set() {},
    },
  },
  methods: {
    getTimeString(type) {
      //today, tomorrow
      if (type == "today") {
        let date = new Date();
        let y = date.getFullYear();
        let m = this.prefixZero(date.getMonth() + 1, 2);
        let d = this.prefixZero(date.getDate(), 2);
        return y + "-" + m + "-" + d + " " + this.initTime;
      } else if (type == "tomorrow") {
        let tStamp = new Date().getTime();
        tStamp += 3600 * 24 * 1000;
        let date = new Date(tStamp);
        let y = date.getFullYear();
        let m = this.prefixZero(date.getMonth() + 1, 2);
        let d = this.prefixZero(date.getDate(), 2);
        return y + "-" + m + "-" + d + " " + this.initTime;
      }
    },
    prefixZero(value, len) {
      //前置补充0
      if (value.toString().length >= len) {
        //不用补0
        return value;
      }
      if (Number.isInteger(value)) {
        let str = "";
        for (let i = 0; i < len - 1; i++) {
          str += "0";
        }
        return str + value;
      }
    },
    changeStartTime(value) {
      this.$emit("changeStartTime", value);
    },
    changeEndTime(value) {
      this.$emit("changeEndTime", value);
    },
    changeGameType(e) {
      this.$emit("changeGameType", e.target.value);
      this.gamePickerCur = e.target.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.screen-bar {
  .rui-picker {
    border: none;
    white-space: nowrap;
    overflow: hidden;
  }

  .picker-box {
    height: 40px;
    width: 50%;
    border-right: 0.5px solid #ddd;
    box-sizing: border-box;
    .picker {
      width: 100%;
    }
  }

  button {
    margin: 0;
    font-size: 15px;
    width: 110rpx;
    border: 0.5px solid #ddd;
    background-color: #fff;
    padding: 0;
    margin-right: 2px;

    .iconfont {
      font-size: 18px;
      line-height: 35px;
    }
  }
}
</style>
