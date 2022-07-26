<template>
  <view>
    <view class="basket">
      <view class="flex justify-around bg-gray options">
        <view
          @click="btnOption(btnText)"
          class="options-item flex align-center justify-center"
          v-for="(btnText, index) in btnList"
          :key="index"
        >
          <i v-if="index === 1" class="iconfont icon-shuangxiang"></i>
          <i v-else class="iconfont icon-huishouzhan"></i>
          <text class="margin-left-sm text-lg">{{ btnText }}</text>
        </view>
      </view>

      <view v-if="isShowNumForm" class="num-list">
        <view class="num-item" v-for="(item, index) in basketList" :key="index">
          <view class="flex align-center text-bold" style="min-width: 200rpx">
            <text>{{ item.N }} :</text>
            <text class="margin-left-xs">{{ item.C.N }}</text>
          </view>
          <text class="rate">{{ item.C.curMxO }}</text>
          <view class="input-box">
            <input
              class="my-input"
              @input="inputValue(item)"
              v-model="item.money"
              placeholder="输入金额"
            />
            <text @click="cancelSelect(index)" class="margin-left-xs"
              >取消</text
            >
          </view>
        </view>
      </view>
      <view v-else><Form /></view>
    </view>
  </view>
</template>

<script>
import Form from "@/components/lesystem/Form";
export default {
  props: {
    isShowNumForm: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      btnList: ["清空购物车", "继续下注"],
      basketList: [],
    };
  },

  components: {
    Form,
  },
  watch: {
    "$store.state.gameDataV2.rate": {
      handler: function (val) {
        this.changeRatio(val);
      },
      deep: true,
    },
    "$store.state.gameDataV2.numBasket": {
      handler: function (val) {
        this.basketList = val;
      },
    },
  },

  methods: {
    inputValue(item) {
      item.money = this.$util.inputDataHandler(item.money);
    },
    async cancelSelect(index) {
      let len = this.basketList.length;
      if (len === 1) {
        let flag = await this.$util.showConfirm({
          content: "是否清空所有号码?",
        });

        if (!flag) {
          return;
        }
        this.$emit("hiddenBasket");
      }

      this.basketList.splice(index, 1);
    },
    changeRatio(val) {
      let { ratio } = val;
      this.basketList.forEach((item) => {
        item.C.curMxO = Number((+item.C.MxO + ratio).toFixed(2));
      });

      this.basketList.push({});
      this.basketList.pop();
    },
    async btnOption(btnText) {
      switch (btnText) {
        case "清空购物车":
          let flag = await this.$util.showConfirm({
            content: "是否清空所有号码?",
          });
          if (!flag) {
            return;
          }
          this.$store.commit("setNumBasket", []);
          this.$emit("hiddenBasket");
          break;
        case "继续下注":
          this.$emit("hiddenBasket");
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.basket {
  height: 100%;
  .my-input {
    width: 250rpx;
    background-color: #ccc;
  }
  .options {
    .options-item {
      width: 50%;
      border: 1px solid #ccc;
      padding: 20rpx 0;
      .iconfont {
        font-size: 36rpx;
        line-height: 0;
      }
    }
  }
  .num-list {
    display: flex;
    flex-direction: column;
    color: black;
    .num-item {
      width: 100%;
      padding: 10rpx 10rpx 10rpx 30rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px dashed #d0d0d0;
      background-color: #fff;
      .rate {
        color: #f00;
      }
      .input-box {
        display: flex;
        align-items: center;
        .input {
          width: 300rpx;
          background-color: #ccc;
          border-radius: 5rpx;
          color: #333;
        }
      }
    }
  }
}
</style>
