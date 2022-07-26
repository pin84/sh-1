<template>
  <view class="foot-wrapper">
    <view class="foot flex align-center">
      <view class="flex align-center" style="width: 100%">
        <view class="icon-box" v-if="false">
          <view v-if="!isShowBasket">
            <view v-if="isShowTipBox" class="tip-box"
              ><TipList @clickEvent="clickEvent" :textList="textList"
            /></view>
            <view class="flex-sub text-center" style="flex: 0 0 100rpx">
              <i
                v-if="$store.state.GDV3.v3SelectedCount"
                @click="clearNum"
                class="iconfont icon-huishouzhan"
                style="color: #585858"
              ></i>
              <i
                @click="shuiju"
                v-else
                class="iconfont icon-suiji"
                style="color: #585858"
              ></i>
            </view>
          </view>

          <view v-else>
            <view class="flex-sub text-center" style="flex: 0 0 100rpx"
              ><i
                @click="clearMoney"
                class="iconfont icon-huishouzhan"
                style="color: #585858"
              ></i
            ></view>
          </view>
        </view>

        <view style="width: 100%">
          <input
            v-if="!isShowBasket"
            class="my-input"
            placeholder="输入金额"
            v-model="inputNum"
            @input="inputMoney"
          />

          <view v-else>
            <input
              v-if="!isDone"
              class="my-input"
              placeholder="输入金额"
              @input="checkInput"
              v-model="inputNumBasket"
            />

            <view
              v-else
              class="flex align-center text-white"
              style="width: 100%"
            >
              <text
                @click="isChecked = !isChecked"
                v-if="isChecked"
                class="iconfont icon-duoxuanyidong"
                style="font-size: 24rpx;padding:10rpx"
              ></text>
              <text
                @click="isChecked = !isChecked"
                v-else
                class="iconfont icon-duoxuan"
                style="font-size: 24rpx;padding:10rpx"
              ></text>
              <text class="margin-left-xs text-lg">按最新赔率提交</text>
            </view>
          </view>
        </view>
      </view>

      <view class="btn-box flex justify-around">
        <view class="flex" v-if="!isShowBasket">
          <view class="btn btn-left" @click="addOrder('0')">立即下注
            <text v-if="countdown">({{ countdown }})</text>
          </view>
          <view class="btn btn-right" @click="submitSelect">
            <text>确认选号</text>
            <text v-if="numLength !== 0 && !isShowBasket" class="num">{{
              numLength
            }}</text>
          </view>
        </view>
        <view v-else class="btn btn-right">
          <text v-if="!isDone" @click="submitMoney">确认金额</text>
          <text v-else @click="addOrder('1')">确认下注
            <text v-if="countdown">({{ countdown }})</text>
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

//是否显示回收站 用 v3SelectedCount来决定
<script>
import TipList from "@/pages/games/common/TipList";
export default {
  data() {
    return {
      countdown:0,
      isShowBasket: false,
      inputNum: "",
      inputNumBasket: "",
      numLength: 0,
      isDone: 0,
      isChecked: false,
      textList: ["1注", "5注", "10注"],
      isShowTipBox: false,
    };
  },
  components: {
    TipList,
  },
  watch: {
    "$store.state.GDV3.numBasket": {
      handler: function (val) {
        this.numLength = val.length;
      },
    },
    "$store.state.GDV3.v3IsShowNumBaket": {
      handler: function (val) {
        this.isShowBasket = val;
        if (!val) {
          this.isDone = 0;
        }
      },
    },
    "$store.state.GDV3.v3IsHasMoney": function (val) {
      this.isDone = val;
    },
  },

  methods: {
    inputMoney() {
      this.inputNum = this.$util.inputDataHandler(this.inputNum)
      this.$store.commit("v3InputMoney", this.inputNum);
    },

    async addOrder(type) {
      if( this.countdown) return
      if (type == 0) {
        if (this.inputNum === "") {
          this.$util.showConfirm({
            content: "请输入有效金额！",
            showCancel: false,
          });
          return;
        }
      }

        this.countdown = 3;
      let interval = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          this.countdown = 0;
          clearInterval(interval);
        }
      }, 1000);

      this.$store.commit("v3ToBuy", new Date().getTime());

      setTimeout(() => {
        this.inputNum = "";
        this.$store.commit("v3InputMoney", "");
        // this.clearNum()
      }, 0);
    },

    clickEvent(str) {
      let len = str.length;
      let obj = {
        n: +str.substring(0, len - 1),
        timestamp: new Date().getTime(),
      };
      this.$store.commit("v3AddRandom", obj);
      this.isShowTipBox = false;
      // this.$emit('showBasket');
    },

    shuiju() {
      this.isShowTipBox = !this.isShowTipBox;
    },
    clearNum() {
      this.$store.commit("v3ClearSelected", new Date().getTime());
      this.$store.commit("v3SelectedCount", "clearAll");
    },

    async submitSelect() {
      this.$store.commit("setAddToBasket", new Date().getTime()); //触发当前玩法添加已选择的号码到号码蓝
      setTimeout(() => {
        this.$store.commit("v3InputMoney", "");
        this.inputNum = "";
      }, 0);
      this.$store.commit("v3SelectedCount", "clearAll");
    },

    submitMoney() {
      let arr = this.$store.state.GDV3.numBasket;
      let flag = false;
      for (let obj of arr) {
        if (obj.money === "" || !obj.money) {
          this.$util.showConfirm({
            content: `【${obj.N}】金额不能为空`,
            showCancel: false,
          });
          flag = true;
          break;
        }
      }

      if (flag) return;
      this.$store.commit("v3BasketShowFrom", true);
      let ts = new Date().getTime();
      this.isDone = ts;
      this.inputNumBasket = "";
    },

    clearMoney() {
      this.$store.commit("v3InputMoneyBasket", "");
      this.inputNumBasket = "";
    },
    checkInput() {
      this.inputNumBasket = this.$util.inputDataHandler(this.inputNumBasket)
      this.$store.commit("v3InputMoneyBasket", this.inputNumBasket);
    },
  },
};
</script>

<style lang="scss" scoped>
.foot-wrapper {
  .foot {
    // border: 1px solid red;
    justify-content: space-between;
    // height: 120rpx;
    padding: 10rpx 0;
    background-color: black;
    .icon-box {
      position: relative;
      padding: 0 30rpx;
      .tip-box {
        position: absolute;
        left: 0;
        bottom: 100%;
        width: 100%;
        transform: translateY(-10rpx);
      }
    }
    .my-input {
      color: #bebebe;
      font-size: 36rpx;
    }
    .iconfont {
      font-size: 48rpx;
    }

    .btn-box {
      padding-right: 10rpx;
      .btn {
        min-width: 180rpx;
        padding: 0 10rpx;
        height: 75rpx;
        line-height: 75rpx;
        text-align: center;
        color: #fff;
        font-size: 30rpx;
        border-radius: 10rpx;
        margin-left: 10rpx;
      }
      .btn-left {
        background-color: #e1222a;
      }
      .btn-right {
        position: relative;
        background-color: #e58b30;
        .num {
          position: absolute;
          width: 35rpx;
          height: 35rpx;
          line-height: 35rpx;
          text-align: center;
          border: 1px solid red;
          right: 0rpx;
          top: -10rpx;
          font-size: 24rpx;
          border-radius: 50%;
          background-color: #f00;
        }
      }
    }
  }
}
</style>
