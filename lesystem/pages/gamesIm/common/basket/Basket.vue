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
        <view class="num-item-name">
          <text>{{ item.N1 }} :</text>
          <text class="margin-left-xs">{{ item.N }}</text>
        </view>
        <text class="rate">{{ item.odds }}</text>
        <view class="input-box">
          <input class="my-input" placeholder="输入金额" v-model="item.money" @input='inputValue(item)' />
          <text @click="cancelSelect(index)" class="margin-left-xs">取消</text>
        </view>
      </view>
    </view>
    <view class="form" v-else>
      <view class="title">
        <text
          class="title-item text-sm flex-sub"
          :class="{ 'flex-twice': index === 0 }"
          v-for="(title, index) in titleList"
          :key="index"
          >{{ title }}</text
        >
      </view>

      <view class="list">
        <view class="item" v-for="(item, idx) in basketList" :key="idx">
          <text class="text flex-twice">
            <text class="text-sm">{{ item.N1 }}</text>
            <text class="text-red text-sm">@{{ item.N }}</text>
          </text>
          <text class="text flex-sub text-sm"
            >{{ item.odds }}{{ item.odds1 ? "/" + item.odds1 : "" }}</text
          >
          <text class="text flex-sub text-sm">{{ item.money }}</text>
        </view>
      </view>

      <view style="padding: 0 20rpx">共{{ len }}注，下注金额{{ money }}元</view>
    </view>
  </view>
</template>

<script>
import Form from "@/components/lesystem/Form";
export default {
  data() {
    return {
      isShowNumForm: 0,
      btnList: ["清空购物车", "继续下注"],
      titleList: ["项目", "赔率", "金额"],
      basketList: [],
      len: 0,
      money: 0,
    };
  },

  components: {
    Form,
  },
  watch: {
    "$store.state.GDV3.v3BasketShowFrom": function (val) {
      this.showNumberForm(val);
    },
    "$store.state.GDV3.v3InputMoneyBasket": function (val) {
      this.changeMoney(val);
    },

    
  },

  created() {
    this.initData();
  },

  methods: {
    inputValue(item){
      item.money = this.$util.inputDataHandler(item.money)
      this.basketList.push({})
      this.basketList.pop()
    },
    showNumberForm(val) {
      let len = this.basketList.length;
      let money = this.basketList.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.money);
      }, 0);

      this.len = len;
      this.money = money;

      this.isShowNumForm = !val;
    },
    changeMoney(val) {
      this.basketList.forEach((item) => {
        item.money = val;
      });
      this.basketList.push({});
      this.basketList.pop();
    },
    initData() {
      let list = this.$store.state.GDV3.numBasket;
      this.basketList = list;
      for (let item of list) {
        if (!item.money || item.money == "") {
          this.showNumberForm(false);
          this.$store.commit("v3IsHasMoney", 0);
          break;
        }
        this.showNumberForm(true);
        let ts = new Date().getTime();
        this.$store.commit("v3IsHasMoney", ts);
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
          this.$store.commit("v3BasketShowFrom", false);
          this.$store.commit("v3IsShowNumBaket", false);
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.basket {
  // height: 85vh;
  padding-bottom: 45px;
  .my-input{
    width:220rpx;
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
      padding: 10rpx 10rpx 10rpx 10rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px dashed #d0d0d0;
      background-color: #fff;
      .num-item-name {
        width: 330rpx;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .rate {
        color: #f00;
      }
      .input-box {
        display: flex;
        align-items: center;
        .input {
          width: 240rpx;
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
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
