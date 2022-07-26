<template>
  <view class="card-select">
    <view class="card-box">
      <radio-group class="group" @change="radioChange">
        <label
          class="uni-list-cell uni-list-cell-pd"
          v-for="(item, index) in cardList"
          :key="item.value"
        >
          <view>
            <radio
              style="transform: scale(0.7)"
              :value="item.value"
              :checked="index === current"
            />
          </view>
          <view>{{ item.name }}</view>
        </label>
      </radio-group>
    </view>

    <view class="select-box">
      <view v-if="!isHasCard" class="no-card">
        <text>{{ text1 }}</text>
        <text
          >您还未绑定任何{{ text1 }}
          <text style="color: red" @click="toCreateCard">去绑定</text>
        </text>
      </view>
      <view v-else class="uni-list-cell">
        <view class="uni-list-cell-left"> {{text1}} </view>
        <view class="uni-list-cell-db">
          <picker
            @change="bindPickerChange"
            :value="pickerindex"
            :range="banklist"
            range-key='account'
          >
            <view class="uni-input">{{ banklist[pickerindex].account }}</view>
          </picker>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    banklist: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      curRadioIndex: 0,
      isHasCard: true,
      pickerindex: 0,
      text1: "银行卡",
      current: 0,
      cardList: [
        { name: "银行卡提现", value: "0" },
        { name: "USDT提现", value: "1" },
      ],
    };
  },

  methods: {
    toCreateCard() {
      let url;
      if (this.curRadioIndex == 1) {
        url = "/pages/member/usdtAddr/index";
      } else {
        url = "/pages/member/bankCard/bankCardList/bankCardList";
      }
      uni.navigateTo({
        url,
      });
    },

    bindPickerChange(e) {
      let index = e.target.value
      this.pickerindex = index
      this.$emit('usdtChange',index)
      
      console.log(index);
    },
    radioChange(e) {
      this.pickerindex = 0
      let index = e.detail.value;
      this.curRadioIndex = index;
      if(index ==1){
        this.text1 = 'USDT地址'
      }else {
        this.text1 = '银行卡'
      }
      this.$emit("curSelectCardType", index);
    },
  },
};
</script>



<style lang="scss" scoped>
.card-select {
  .card-box {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding: 20rpx 0;

    .group {
      display: flex;
      justify-content: space-around;
      .uni-list-cell-pd {
        padding: 10rpx 40rpx;
        border: 1px solid #ccc;
      }
      .uni-list-cell::after {
        height: 0;
      }
    }
  }
  .select-box {
    padding: 15rpx 30rpx;
    border-bottom: 1px solid #ccc;
    .no-card {
      display: flex;
      justify-content: space-between;
    }
    .uni-list-cell {
      display: flex;
      align-items: center;
      height: 80rpx;
    }
    .uni-input {
      height: 0;
      line-height: 0;
      padding: 20rpx;
    }
  }
}
</style>