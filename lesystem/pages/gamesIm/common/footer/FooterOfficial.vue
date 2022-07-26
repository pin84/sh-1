<template>
  <view>
    <view v-if="isShowBasket" class="foot flex">
      <view class="flex left flex-twice align-center">
        <view class="icon-box" style="border-right: 1px solid #585858">
          <view v-if="isShowTips" class="tip-box">
            <TipList @clickEvent="clickEvent" :textList="textList" />
          </view>
          <i
            v-if="isShowRecycle"
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

      <button
        @click="buy(1)"
        :disabled="btn1Disable"
        class="center flex-sub flex align-center justify-center buybtn"
      >
        <text class="text-white">立即投注
          <text v-if="countdown">({{ countdown }})</text>
        </text>
      </button>
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

      <button
        class="
          br
          right-n right
          flex-sub
          padding-left-lg
          flex
          align-center
          justify-center
        "
        @click="buy('2')"
        :disabled="btn2Disable"
      >
        <view class="margin-left-xs"
          ><text class="text-white" style="font-size: 30rpx">立即投注
          <text v-if="countdown">({{ countdown }})</text>
          </text></view
        >
      </button>
    </view>
  </view>
</template>

<script>
import TipList from "@/pages/games/common/TipList";
export default {
  data() {
    return {
      countdown: 0,
      btn1Disable: false,
      btn1CountDown: 3, //按钮提交倒计时
      btn1CountDownInterval: null,
      btn1Name: "立即投注",
      btn2Disable: false,
      btn2CountDown: 3, //按钮提交倒计时
      btn2CountDownInterval: null,
      btn2Name: "立即投注",
      isShowBasket: true,
      isShowTips: false,
      rightText: "继续下注",
      isShowLeftBtn: true,
      leftText: "查看投注记录",
      ratio: 1,
      rate: 1,
      len: 0,
      money: 0,
      footObj: {}, //记录store中的注数和钱数
      basketMoney: 0, //号码蓝里的钱总数
      isShowRecycle: false,
      isHasSelected: false,
      basketNum: 0,
      totallen: 0,
      textList: ["1注", "5注", "10注"],
      banList: [
        2255, 2256, 1767, 2245, 1773, 1399, 1398, 1404, 1358, 1361, 1364, 1368,
        1314, 1318, 1325, 1321, 1328, 1332, 1337, 1338, 1344, 1343, 1298, 1307,
        2531, 3183, 3186, 3189, 3377, 3375, 1376, 1377, 1378, 1379, 1380, 1381,
        1382, 1383, 1384, 1385,
      ],
    };
  },
  components: {
    TipList,
  },
  watch: {
    "$store.state.GDV3.numBasket": {
      //号码蓝
      handler: function (val) {
        if (JSON.stringify(val) == "{}") return;
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
      deep: true,
    },
    "$store.state.GDV3.footMoney": {
      deep: true,
      handler: function (val) {
        this.initData();
      },
    },
    "$store.state.GDV3.selectedNum": {
      handler: function (val) {
        this.initPage();
      },
    },
    "$store.state.GDV3.v3CurGame": {
      handler: function (val) {
        this.initPage();
      },
      deep: true,
    },
    "$store.state.GDV3.v3IsShowNumBaket": function (val) {
      this.isShowBasket = !val;
    },
    // '$store.state.GDV3.v3SelectedCount': function(val) {
    // 	this.initPage();
    // }
  },

  // created() {
  // 	this.initData();
  // },

  methods: {
    lockBtn(btnName) {
      if (btnName == 1) {
        if (!this.btn1Disable) {
          this.btn1Disable = true;
          this.btn1Name = "立即投注(" + this.btn1CountDown-- + ")";
          this.btn1CountDownInterval = setInterval(() => {
            if (this.btn1CountDown < 1) {
              this.unlockBtn(btnName);
            } else {
              this.btn1Disable = true;
              this.btn1Name = "立即投注(" + this.btn1CountDown-- + ")";
            }
          }, 1000);
        }
      } else {
        if (!this.btn2Disable) {
          this.btn2Disable = true;
          this.btn2Name = "立即投注(" + this.btn2CountDown-- + ")";
          this.btn2CountDownInterval = setInterval(() => {
            if (this.btn2CountDown < 1) {
              this.unlockBtn(btnName);
            } else {
              this.btn2Disable = true;
              this.btn2Name = "立即投注(" + this.btn2CountDown-- + ")";
            }
          }, 1000);
        }
      }
    },
    unlockBtn(btnName) {
      if (btnName == 1) {
        this.btn1Disable = false;
        this.btn1CountDown = 3;
        this.btn1Name = "立即投注";
        clearInterval(this.btn1CountDownInterval);
        this.btn1CountDownInterval = null;
      } else {
        this.btn2Disable = false;
        this.btn2CountDown = 3;
        this.btn2Name = "立即投注";
        clearInterval(this.btn2CountDownInterval);
        this.btn2CountDownInterval = null;
      }
    },
    initData() {
      let { num, money } = this.$store.state.GDV3.footMoney;
      this.len = num || 0;
      this.money = this.$buyDataHandler.handlerMoneyDecimal(money) || 0;
    },
    initPage() {
      let { I } = this.$store.state.GDV3.v3CurGame;
      let index = this.banList.findIndex((item) => item == I);
      if (index !== -1) {
        this.isShowRecycle = true;
        return;
      }

      // 	let count = this.$store.state.GDV3.v3SelectedCount;
      // console.log('cout==',count)
      // 	if(count){
      // 		this.isShowRecycle = true;
      // 		return
      // 	} else {
      // 		this.isShowRecycle = false;
      // 	}

      let obj = this.$store.state.GDV3.selectedNum;
      if (Array.isArray(obj)) {
        if (obj.length == 0) {
          this.isShowRecycle = false;
        } else {
          this.isShowRecycle = true;
        }
      } else {
        if (JSON.stringify(obj) == "{}") {
          this.isShowRecycle = false;
        } else {
          this.isShowRecycle = true;
        }
      }
    },

    buy(type) {
      // this.lockBtn(type);
      if (this.countdown) return;

      let { ratio } = this.$store.state.GDV3.officialRate;
      if (!ratio) {
        this.$util.showConfirm({
          content: "倍数不能为空且必须大于0",
          showCancel: false,
        });
        // this.unlockBtn(type);
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

      if (type == "1") {
        if (arr.length == 0) {
          if (this.money == 0) {
            this.$util.showConfirm({
              content: "号码选择不完整，请重新选择",
              showCancel: false,
            });
            // this.unlockBtn(type);
            return;
          } else {
            this.$store.commit("v3ToBuy", new Date().getTime());
          }
        } else {
          this.$store.commit("v3ToBuy", new Date().getTime());
        }
      } else {
        if (arr.length == 0) {
          this.$util.showConfirm({
            content: "投注列表不能为空",
            showCancel: false,
          });
          // this.unlockBtn(type);
          return;
        } else {
          this.$store.commit("v3ToBuy", new Date().getTime());
        }
      }
    },
    addToBasket() {
      if (!this.money) {
        this.$util.showConfirm({
          content: "号码选择不完整，请重新选择",
          showCancel: false,
        });

        // this.unlockBtn(1);
        // this.unlockBtn(2);
        return;
      }
      // let selectObj = this.$store.state.GDV3.selectedNum;
      // if (Array.isArray(selectObj)) {
      // 	if (selectObj.length == 0) {
      // 		this.$util.showConfirm({
      // 			content: '号码选择不完整，请重新选择',
      // 			showCancel: false
      // 		});
      // 		return;
      // 	}
      // }
      // if (selectObj.constructor == Object) {
      // 	if (JSON.stringify(selectObj) == '{}') {
      // 		this.$util.showConfirm({
      // 			content: '号码选择不完整，请重新选择',
      // 			showCancel: false
      // 		});
      // 		return;
      // 	}
      // }

      this.$store.commit("setAddToBasket", new Date().getTime()); //触发当前玩法添加已选择的号码到号码蓝
      this.$store.commit("v3IsHasSelected", false);
    },

    showRecord() {
      this.$emit("showRecord", 1);
    },
    showNumber() {
      this.$store.commit("v3IsShowNumBaket", true);
    },
    clearNum() {
      this.$store.commit("v3IsHasSelected", false);
      this.$store.commit("v3FootMoney", {
        num: 0,
        money: 0,
      });
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
    },
  },
};
</script>

<style lang="scss" scoped>
.buybtn {
  margin: 0px;
  text-align: center;
}

.foot,
.foot-n {
  // border: 1px solid red;
  background-color: #585858;
  height: 120rpx;
  .br {
    margin: 0;
    padding-left: 60rpx ;
  }

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
