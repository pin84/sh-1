<template>
  <view>
    <view v-if="isShowBasket" class="foot flex">
      <view class="flex left flex-twice align-center">
        <view class="icon-box" style="border-right: 1px solid #585858">
          <view v-if="isShowTips" class="tip-box"
            ><TipList @clickEvent="clickEvent" :textList="textList"
          /></view>
          <i
            v-if="isHasSelected || isShowRecycle"
            @click="clearNum"
            class="iconf iconfont icon-huishouzhan"
            style="color: #585858"
          ></i>
          <i
            v-else
            @click="addShuiji"
            class="iconf iconfont icon-suiji"
            style="color: #585858"
          ></i>
        </view>

        <view @click="addToBasket" class="flex-sub"
          ><i
            class="iconf iconfont icon-tianjia"
            style="color: #585858; font-size: 80rpx; line-height: 80rpx"
          ></i
        ></view>

        <view class="flex-twice">
          <view style="line-height: 40rpx">
            <text class="text-orange">{{ len }}</text>
            <text class="text-white">注</text>
          </view>
          <view style="line-height: 40rpx">
            <text class="text-orange">{{ money }}</text>
            <text class="text-white">元</text>
          </view>
        </view>
      </view>

      <view
        @click="buy('1')"
        class="center flex-sub padding-left-xs flex align-center justify-center"
        ><text class="text-white"
          >立即投注
          <text v-if="countdown">({{ countdown }})</text>
        </text></view
      >
      <view
        class="right flex-sub padding-left-sm flex align-center justify-center"
      >
        <view class="number-basket-box">
          <text v-if="basketNum !== 0" class="num text-xs">{{
            basketNum
          }}</text>
          <i class="iconfont icon-lanzi text-white"></i>
        </view>

        <view @click="showNumber" class="margin-left-xs"
          ><text class="text-white">号码篮</text></view
        >
      </view>
    </view>

    <view v-else class="flex foot-n">
      <view class="flex left flex-twice align-center padding-sm">
        <view class="flex-twice">
          <view style="line-height: 40rpx; font-size: 32rpx">
            <text class="text-white">方案</text>
            <text class="text-orange">{{ totallen }}</text>
            <text class="text-white">注</text>
            <text class="text-orange">{{ basketMoney }}</text>
            <text class="text-white">无</text>
          </view>
          <view style="line-height: 40rpx"
            ><text class="text-gray text-xs">普通方案</text></view
          >
        </view>
      </view>

      <view
        class="
          right-n right
          flex-sub
          padding-left-lg
          flex
          align-center
          justify-center
        "
      >
        <view @click="buy('2')" class="margin-left-xs"
          ><text class="text-white" style="font-size: 30rpx"
            >立即投注
            <text v-if="countdown">({{ countdown }})</text>
          </text></view
        >
      </view>
    </view>
  </view>
</template>

<script>
import TipList from "@/pages/games/common/TipList";
export default {
  props: {
    isShowBasket: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      countdown: 0,
      isShowTips: false,
      rightText: "继续下注",
      isShowLeftBtn: true,
      leftText: "查看投注记录",
      isShowDialog: false,
      dialogContent: "",
      ratio: 1,
      rate: 1,
      len: 0,
      money: 0,
      basketMoney: 0, //号码蓝里的钱总数
      isShowRecycle: true,
      isHasSelected: false,
      basketNum: 0,
      totallen: 0,
      textList: ["1注", "5注", "10注"],
    };
  },
  components: {
    TipList,
  },
  watch: {
    "$store.state.GDV3.numBasket": {
      handler: function (val) {
        this.initData(val);
      },
      deep: true,
    },
    "$store.state.GDV3.footMoney": {
      deep: true,
      handler: function (val) {
        let { num, money } = val;
        this.len = num || 0;
        this.money = this.$util.handlerMoneyDecimal(money) || 0;
      },
    },
    "$store.state.gameData.curGame": {
      handler: function (val) {
        this.initPage(val);
      },
      deep: true,
    },
    "$store.state.GDV3.v3IsHasSelected": {
      handler: function (val) {
        this.isHasSelected = val;
      },
    },
  },

  created() {
    this.initData();
  },

  methods: {
    initData(val) {
      if (!val) {
        val = this.$store.state.GDV3.numBasket;
      }

      this.basketNum = val.length;
      this.basketMoney = this.$util.handlerNum(
        val.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.money;
        }, 0),
        3
      );
      this.totallen = val.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.len;
      }, 0);
    },
    initPage(val) {
      let { N } = val;
      let banList = [
        "五星组合",
        "后三直选和值",
        "后二直选和值",
        "前二直选和值",
        "中三直选和值",
        "万千",
        "万百",
        "万十",
        "万个",
        "千百",
        "千十",
        "千个",
        "百十",
        "百个",
        "十个",
        "任二组选和值",
        "任二直选和值",
        "任二直选和值",
        "前四组合",
        "后四组合",
        "牛牛",
        "百家乐",
      ];
      let index = banList.findIndex((item) => item === N);
      index !== -1 ? (this.isShowRecycle = true) : (this.isShowRecycle = false);
    },

    async buy(type) {
      if (this.countdown) return;
      let { status } = this.$store.state.GDV3.v4latestPriodData;

      if (status == 0) {
        this.$util.showConfirm({
          content: "当前未开盘",
          showCancel: false,
        });
        return;
      }
      let { ratio } = this.$store.state.GDV3.officialRate;
      if (!ratio) {
        this.$util.showConfirm({
          content: "倍数不能为空且必须大于0",
          showCancel: false,
        });
        return;
      }

      this.countdown = 3;
      let interval = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          this.countdown = 0;
          clearInterval(interval);
        }
      }, 1000);

      let arr = this.$store.state.GDV3.numBasket;
      if (type === "1") {
        if (arr.length === 0) {
          if (this.money === 0) {
            this.$util.showConfirm({
              content: "号码选择不完整，请重新选择",
              showCancel: false,
            });
            return;
          }
        }
      }

      if (type == "2") {
        if (arr.length === 0) {
          this.$util.showConfirm({
            content: "投注列表不能为空",
            showCancel: false,
          });
          return;
        }
      }


      this.$store.commit("v3ToBuy", new Date().getTime());
    },
    addToBasket() {
      this.$store.commit("setAddToBasket", new Date().getTime()); //触发当前玩法添加已选择的号码到号码蓝
      this.$store.commit("v3IsHasSelected", false);
    },

    showRecord() {
      this.isShowDialog = false;
      this.$emit("showRecord", 1);
    },
    showNumber() {
      this.$emit("showBasket");
      this.$store.commit("v3IsShowNumBaket", true);
    },
    clearNum() {
      // this.selectedArr = [];
      // this.$store.commit('setSelectedNum', []);
      this.$store.commit("v3IsHasSelected", false);
      // this.len = 0
      // this.money = 0
      this.$store.commit("v3FootMoney", {});
      this.$store.commit("v3selectedNum", {});
      this.$store.commit("v3ClearSelected", new Date().getTime());
    },
    addShuiji() {
      this.isShowTips = !this.isShowTips;
    },
    clickEvent(str) {
      let len = str.length;
      let obj = {
        n: +str.substring(0, len - 1),
        timestamp: new Date().getTime(),
      };
      this.$store.commit("v3AddRandom", obj);
      this.isShowTips = false;
      this.$emit("showBasket");
    },
  },
};
</script>

<style lang="scss" scoped>
.foot,
.foot-n {
  // border: 1px solid red;
  height: 120rpx;
  .icon-box {
    position: relative;
    height: 100%;
    padding: 0 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .tip-box {
      position: absolute;
      left: 8rpx;
      bottom: 100%;
      width: 100%;
    }
  }

  .left {
    background-color: black;
  }

  .center {
    position: relative;
    background-color: #b72928;
  }

  .right {
    position: relative;
    background-color: #585858;
  }

  .center::before,
  .right::before {
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -60rpx;
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-top: 60rpx solid transparent;
    border-left: 25rpx solid #010101;
    border-bottom: 60rpx solid transparent;
  }

  .right::before {
    border-left: 25rpx solid #b72928;
  }
  .right-n {
    background-color: #b72928;
    letter-spacing: 2px;
    font-weight: 600;
  }
  .right-n::before {
    border-left: 65rpx solid #010101;
  }

  .number-basket-box {
    position: relative;
    .num {
      position: absolute;
      width: 30rpx;
      height: 30rpx;
      line-height: 35rpx;
      top: -10rpx;
      left: 50%;
      transform: translateX(-50%);
      background-color: red;
      color: #fff;
      border-radius: 50%;
      text-align: center;
    }
  }

  .iconf {
    font-size: 50rpx;
    line-height: 50rpx;
  }
}
</style>
