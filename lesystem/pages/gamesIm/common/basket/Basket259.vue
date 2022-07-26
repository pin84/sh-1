<template>
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
          <text>{{ item.gName }} :</text>
          <text class="margin-left-xs">{{ item.numStr }}</text>
        </view>
        <text class="rate">{{ item.odds }}</text>
        <view class="input-box">
          <input
            class="my-input"
            @input="inputValue(item)"
            placeholder="输入金额"
            v-model="item.money"
          />
          <text @click="cancelSelect(index)" class="margin-left-xs">取消</text>
        </view>
      </view>
    </view>
    <view class="form" v-else>
      <view class="title">
        <text
          class="title-item text-xs flex-sub"
          :class="{ 'flex-twice': index === 0 }"
          v-for="(title, index) in titleList"
          :key="index"
          >{{ title }}</text
        >
      </view>

      <view class="list">
        <view class="item" v-for="(item, idx) in basketList" :key="idx">
          <text class="text flex-twice">
            <text class="text-xs">{{ item.gName }}</text>
            <text class="text-red text-xs">@{{ item.numStr }}</text>
          </text>
          <text class="text flex-sub text-xs">{{ item.odds }}</text>
          <text class="text flex-sub text-xs">{{ item.money }}</text>
        </view>
      </view>

      <view style="padding: 0 20rpx">共{{ len }}注，下注金额{{ money }}元</view>
    </view>
  </view>
</template>

<script>
import BasketForm from "./BasketForm";
export default {
  data() {
    return {
      isShowNumForm: true,
      btnList: ["清空购物车", "继续下注"],
      titleList: ["项目", "赔率", "金额"],
      basketList: [],
      len: 0,
      money: 0,
    };
  },

  components: {
    BasketForm,
  },

  watch: {
    "$store.state.GDV3.v3BasketShowFrom": function (val) {
      this.showNumForm(val);
    },
    "$store.state.GDV3.v3InputMoneyBasket": function (val) {
      this.changeMoney(val);
    },
  },

  created() {
    this.isShowNumForm = true;
    this.initData();
  },

  methods: {
    inputValue(item) {
      item.money = this.$util.inputDataHandler(item.money);
      this.basketList.push({});
      this.basketList.pop();
    },
    changeMoney(val) {
      this.basketList.forEach((item) => {
        item.money = val;
      });
    },

    showNumForm(val) {
      let len = this.basketList.length;
      let money = this.basketList.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.money);
      }, 0);

      this.len = len;
      this.money = money;

      this.isShowNumForm = !val;
    },
    initData() {
      let list = this.$store.state.GDV3.numBasket;
      let { percentage } = this.$store.state.GDV3.officialRate;
      let flag = 1;
      list.forEach((item) => {
        if (item.money == "") {
          flag = 2;
        }
        item.odds = this.$buyDataHandler.setNumDecimal(
          item.MxO - (item.MxO - item.MiO) * percentage,
          3
        );
      });
      this.basketList = list;
      if (flag == 1) {
        this.isShowNumForm = false;
        this.showNumForm(true);
      }
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
        this.$store.commit("v3IsShowNumBaket", false);
      }

      this.basketList.splice(index, 1);
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
          this.$store.commit("v3NumBasket", "clearAll");
          this.$store.commit("v3IsShowNumBaket", false);
          break;
        case "继续下注":
          this.$store.commit("v3IsShowNumBaket", false);
          this.$store.commit("v3BasketShowFrom", false);
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.basket {
  height: 100%;
  height: 80vh;
  // border: 1px solid red;
  .my-input {
    background-color: #ccc;
    width: 220rpx;
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
  .form {
    .title {
      display: flex;
      width: 100%;
      .title-item {
        background-color: rgba(0, 0, 0, 0.2);
        padding: 15rpx 0;
        border-right: 1px solid #fff;
        // flex-grow:1;
        text-align: center;
      }
    }
    .list {
      background-color: #fff;
      .item {
        display: flex;
        text-align: center;
        border-bottom: 1px solid #f1f1f1;
        .text {
          border-right: 1px solid #f1f1f1;
          padding: 8rpx 0;
        }
      }
    }
  }
}
</style>
