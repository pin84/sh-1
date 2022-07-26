<template>
  <view class="page-body">
    <block>
      <view class="content">
        <view class="top">
          <view class="left">
            <view class=""> 可提现金额(元) </view>
            <view class="ns-text-color ns-font-size-lg">
              {{ account }}
            </view>
          </view>
          <view class="right">
            <view class=""> 手续费 </view>
            <view class="ns-text-color ns-font-size-lg">
              {{ fee }}
            </view>
          </view>
        </view>
        <CardSelect
          :banklist="banklist"
          @curSelectCardType="curSelectCardType"
          @usdtChange="usdtChange"
        />

        <view class="thMoney">
          <view> 提现金额 </view>
          <view class="uni-column" style="display: flex">
            <view class="thMoney_b"
              ><text class="thMoney_size">¥</text>
              <input
                class="uni-input ns-font-size-lg thMoney_size"
                type="digit"
                v-model="money"
                @input="moneyChange"
              />
            </view>
            <view v-if="withdrawalType == 1 && usdtnumber" class="usdt-number">
              <text class="usdt"> ≈ {{ usdtnumber }}USDT </text>
              当前汇率：{{ rate }}CNY/USDT
            </view>
            <view>
              <text v-if="isWithdrawInteger == true">注:只能提取整数</text>
              <text v-if="isWithdrawInteger == false"
                >注:提取金额最多2位小数</text
              >
              <text
                >(免手续费次数<text class="ns-text-color">{{ nofeeTimes }}</text
                >次)</text
              >
            </view>
          </view>
        </view>

        <view class="thPwd">
          <text>提现密码</text>
          <input
            class="uni-input"
            type="text"
            password="true"
            v-model="coinPwd"
          />
        </view>
        <!-- <view class="thAddr">
          <text>提现地址</text>
          <input class="uni-input" type="text" v-model="withdrawAddress" />
        </view> -->
        <view class="tip">
          <view class="ns-text-color"> 注意： </view>
          <view class="uni-flex">
            <view
              >出款上限:
              <text class="ns-text-color">{{ upper_limit }}</text>
            </view>
            <view class="uni-flex-item" style="text-align: right"
              >出款下限:
              <text class="ns-text-color">{{ lower_limit }}</text>
            </view>
          </view>
          <view class="uni-flex">
            <view
              >每日限制次数:
              <text class="ns-text-color">{{ count_limit }}</text>
            </view>
            <view class="uni-flex-item" style="text-align: right"
              >当日最大出款金额:
              <text class="ns-text-color">{{ day_limit }}</text>
            </view>
          </view>
          <view class="btnView">
            <button class="checkBtn mr_10" @click="checkLs">查看流水</button>
            <button class="checkBtn" @click="checkJd">查看提款进度</button>
          </view>
        </view>
        <button class="okBtn" @click="checkout">
          {{ isSubmit == false ? "确认提现" : "提现中..." }}
        </button>
      </view>
    </block>
    <uni-load-more
      :status="loadingType"
      :contentText="contentText"
    ></uni-load-more>
    <view class="showModal" v-if="showModal">
      <view class="uni-mask"></view>
      <view class="uni-modal">
        <view class="uni-modal__bd">
          <button @click="checkLs">查看流水</button>
          <view v-if="canWithdraw == 0"> 未通过打码审核，暂时不能提现 </view>
          <!-- <view v-if="fee > 0">
            <view
              >需要扣除手续费<text class="ns-text-color">{{
                10000
              }}</text></view
            >
            <view>是否继续提现？</view>
          </view> -->
          <view v-if="totalChLimit != 0 && totalComLimit == 0 && fee <= 0">
            <view
              >未通过优惠流水审核！需要扣除优惠:<text class="ns-text-color">{{
                totalChLimit
              }}</text></view
            >
            <view>是否继续提现？</view>
          </view>
          <view v-if="totalChLimit == 0 && totalComLimit != 0 && fee <= 0">
            <view
              >未通过常态性流水审核！需要扣除行政费:<text
                class="ns-text-color"
                >{{ totalComLimit }}</text
              ></view
            >
            <view>是否继续提现？</view>
          </view>

          <view v-if="totalChLimit == 0 && totalComLimit == 0 && fee > 0">
            <view
              >需要扣除手续费:<text class="ns-text-color">{{ fee }}</text></view
            >
            <view>是否继续提现？</view>
          </view>
          <view v-if="totalChLimit != 0 && totalComLimit != 0 && fee <= 0">
            <view
              >未通过优惠流水审核！需要扣除优惠:<text class="ns-text-color">{{
                totalChLimit
              }}</text></view
            >
            <view
              >未通过常态性流水审核！需要扣除行政费:<text
                class="ns-text-color"
                >{{ totalComLimit }}</text
              ></view
            >
            <view>是否继续提现？</view>
          </view>
          <view v-if="totalChLimit != 0 && totalComLimit == 0 && fee > 0">
            <view
              >需要扣除手续费:<text class="ns-text-color">{{ fee }}</text></view
            >
            <view
              >未通过优惠流水审核！需要扣除优惠:<text class="ns-text-color">{{
                totalChLimit
              }}</text></view
            >
            <view>是否继续提现？</view>
          </view>
          <view v-if="totalChLimit == 0 && totalComLimit != 0 && fee > 0">
            <view
              >需要扣除手续费:<text class="ns-text-color">{{ fee }}</text></view
            >
            <view
              >未通过常态性流水审核！需要扣除行政费:<text
                class="ns-text-color"
                >{{ totalComLimit }}</text
              ></view
            >
            <view>是否继续提现？</view>
          </view>
          <view v-if="totalChLimit != 0 && totalComLimit != 0 && fee > 0">
            <view
              >需要扣除手续费:<text class="ns-text-color">{{ fee }}</text></view
            >
            <view
              >未通过优惠流水审核！需要扣除优惠:<text class="ns-text-color">{{
                totalChLimit
              }}</text></view
            >
            <view
              >未通过常态性流水审核！需要扣除行政费:<text
                class="ns-text-color"
                >{{ totalComLimit }}</text
              ></view
            >
            <view>是否继续提现？</view>
          </view>
        </view>
        <view class="uni-modal__ft">
          <view
            class="uni-modal__btn uni-modal__btn_primary"
            @click="goShopping"
            >继续下注</view
          >
          <view
            v-if="canWithdraw != 0"
            class="uni-modal__btn uni-modal__btn_default"
            @click="pickGoods"
            >坚持提现</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import http from "common/js/http.js";
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
import CardSelect from "@/pages/member/pickGoods/index/CardSelect.vue";
import LotteryGameVue from "../../index/gameRecord/LotteryGame.vue";
export default {
  components: {
    uniLoadMore,
    CardSelect,
  },
  data() {
    return {
      usdtnumber: 0,
      rate: 0,
      withdrawalType: 0,
      loadingType: "",
      contentText: {
        contentrefresh: "正在加载...",
        contentnomore: "",
      },
      isSubmit: false,
      account: "",
      isWithdrawInteger: true, //接口返回1表示只能为整数 0：可以有两位小数
      fee: 0,
      outMoneyFeeRate: "",
      maxOutMoneyFee: "",
      nofeeTimes: "",
      bankListIndex: 0,
      banklist: [
        {
          id: "",
          account: "",
        },
      ],
      money: "",
      coinPwd: "",
      withdrawAddress: "",
      upper_limit: "",
      lower_limit: "",
      count_limit: "",
      day_limit: "",
      applyTimes: "",
      totalChLimit: "",
      totalComLimit: "",
      todayWithdrawAmount: "",
      canWithdraw: "",
      showModal: false,
    };
  },
  methods: {
    usdtChange(index) {
      this.bankListIndex = index;
      let { rate } = this.banklist[index];
      this.rate = rate;
      this.countUSDTNumber();
    },
    async curSelectCardType(index) {
      //console.log(index);
      this.withdrawalType = index;

      await this.verifyAndGetWithdrawData();
      this.countUSDTNumber();
    },
    // getThData() {
    //   this.sendRequest({
    //     url: "System.Withdraw.getWithdrawData",
    //     data: {},
    //     success: (res) => {
    //       if (res.code == 0) {
    //         let { banklist } = res.data;
    //         this.banklist = banklist;
    //         console.log(banklist);

    //         this.account = res.data.account;
    //         this.isWithdrawInteger =
    //           res.data.isWithdrawInteger != undefined &&
    //           res.data.isWithdrawInteger == 1
    //             ? true
    //             : false;
    //         this.outMoneyFeeRate = res.data.outMoneyFeeRate;
    //         this.maxOutMoneyFee = res.data.maxOutMoneyFee;
    //         this.nofeeTimes = res.data.nofeeTimes;
    //         this.upper_limit = res.data.defaultWithdrawSetting.upper_limit;
    //         this.lower_limit = res.data.defaultWithdrawSetting.lower_limit;
    //         this.count_limit = res.data.defaultWithdrawSetting.count_limit;
    //         this.day_limit = res.data.defaultWithdrawSetting.day_limit;
    //         this.applyTimes = res.data.applyTimes;
    //         this.totalChLimit = res.data.totalChLimit;
    //         this.totalComLimit = res.data.totalComLimit;
    //         this.todayWithdrawAmount = res.data.todayWithdrawAmount;
    //         this.canWithdraw = res.data.canWithdraw;

    //         // this.banklist = [];
    //         // Object.keys(res.data.banklist).forEach((key) => {
    //         //   let item = res.data.banklist[key];
    //         //   this.banklist.push({
    //         //     id: item.id,
    //         //     account: item.account.replace(
    //         //       /^(\d{4})\d+(\d{4})$/,
    //         //       "$1********$2"
    //         //     ),
    //         //   });
    //         // });

    //         // this.loadingType = "noMore";
    //       }
    //     },
    //   });
    // },

    check_price(p) {
      var price = "" + p;
      if (this.isWithdrawInteger) {
        //只允许整数
        price = price.replace(/[^\d]/g, "");
        price = parseInt(price);
      } else {
        price = price
          .replace(/[^\d.]/g, "") // 清除“数字”和“.”以外的字符
          .replace(/\.{2,}/g, ".") // 只保留第一个. 清除多余的
          .replace(".", "$#$")
          .replace(/\./g, "")
          .replace("$#$", ".")
          .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); // 只能输入两个小数

        if (price != "") {
          // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          price = parseFloat(price);
        }
      }
      return price;
    },

    moneyChange(e) {
      this.money = e.detail.value;
      //1.第一步先要检查是否能输入小数
      this.money = this.check_price(this.money);
      if (this.nofeeTimes == 0) {
        if (e.target.value == "") {
          this.fee = 0;
          return false;
        }
        this.fee = (this.money * this.outMoneyFeeRate) / 100;
        if (
          this.maxOutMoneyFee != 0 &&
          parseFloat(this.fee) > parseFloat(this.maxOutMoneyFee)
        ) {
          this.fee = this.maxOutMoneyFee;
        }
      } else {
        this.fee = 0;
      }

      this.countUSDTNumber();
    },

    countUSDTNumber() {
      if (this.rate == 0) return;

      let num = (this.money / this.rate).toFixed(2);
      this.usdtnumber = Number(num);
    },
    checkout() {
      if (this.money == "") {
        this.$util.showToast({ title: "提现金额必填" });
        return false;
      }
      if (this.coinPwd == "") {
        this.$util.showToast({ title: "提现密码不能为空" });
        return false;
      }
      if (parseFloat(this.money) > parseFloat(this.account)) {
        this.$util.showToast({ title: "提现金额大于您的账户余额" });
        return false;
      }
      if (parseFloat(this.money) > parseFloat(this.upper_limit)) {
        this.$util.showToast({ title: "每次最大提现额为" + this.upper_limit });
        return false;
      }
      if (parseFloat(this.money) < parseFloat(this.lower_limit)) {
        this.$util.showToast({ title: "每次最低提现额为" + this.lower_limit });
        return false;
      }
      if (this.applyTimes >= this.count_limit) {
        this.$util.showToast({
          title: "每日提现次数限制为" + this.count_limit + "次",
        });
        return false;
      }

      if (
        parseFloat(this.money) + parseFloat(this.todayWithdrawAmount) >
        parseFloat(this.day_limit)
      ) {
        this.$util.showToast({
          title:
            "您已提现" +
            this.todayWithdrawAmount +
            ",单日提现金额限制为" +
            this.day_limit,
        });
        return false;
      }

      if (this.nofeeTimes == 0) {
        this.showModal = true;
        return false;
      }

      if (this.canWithdraw == 0) {
        this.showModal = true;
        return false;
      }

      if (this.totalChLimit != 0 && this.totalComLimit == 0 && this.fee <= 0) {
        this.showModal = true;
        return false;
      }
      if (this.totalChLimit == 0 && this.totalComLimit != 0 && this.fee <= 0) {
        this.showModal = true;
        return false;
      }
      if (this.totalChLimit == 0 && this.totalComLimit == 0 && this.fee > 0) {
        this.showModal = true;
        return false;
      }
      if (this.totalChLimit != 0 && this.totalComLimit != 0 && this.fee <= 0) {
        this.showModal = true;
        return false;
      }
      if (this.totalChLimit != 0 && this.totalComLimit == 0 && this.fee > 0) {
        this.showModal = true;
        return false;
      }
      if (this.totalChLimit == 0 && this.totalComLimit != 0 && this.fee > 0) {
        this.showModal = true;
        return false;
      }
      if (this.totalChLimit != 0 && this.totalComLimit != 0 && this.fee > 0) {
        this.showModal = true;
        return false;
      }
      if (this.isSubmit) return;
      this.isSubmit = true;
      this.saveWithdraw();
    },
    saveWithdraw() {
      let d = {
        money: this.money,
        coinPwd: this.coinPwd,
        card_id: this.banklist[this.bankListIndex].id,
        charges: this.fee,
        withdrawAddress: this.withdrawAddress,
        withdrawType: this.withdrawalType,
        usdtNumber: this.usdtnumber,
      };
      this.sendRequest({
        url: "System.Withdraw.saveWithdraw",
        method: "POST",
        data: d,
        success: async (res) => {
          console.log(res);
          //
          if (res.code >= 0) {
            await this.$util.showConfirm({
              content: "取款信息已提交，请等待处理",
              showCancel: false,
            });

            uni.switchTab({
              url: "/pages/member/index/index",
            });

            // /pages/member/index/index

            // uni.showModal({
            //   showCancel: false,
            //   content: "提现成功",
            //   success: function (res) {
            //     if (res.confirm) {
            //       this.$util.redirectTo(
            //         "/pages/member/index/index",
            //         {},
            //         "tabbar"
            //       );
            //     }
            //   },
            // });
          } else {
            this.isSubmit = false;
            await this.$util.showConfirm({
              content: res.message,
              showCancel: false,
            });
          }
        },
      });
    },
    checkLs() {
      this.showModal = false;
      this.$util.redirectTo("/pages/member/pickGoods/checkLs/checkLs", {});
    },

    checkJd() {
      uni.navigateTo({
        url: "/pages/member/pickGoods/checkJd/index",
      });
    },

    goShopping() {
      this.showModal = false;
      this.$util.redirectTo("/", {}, "tabbar");
    },
    pickGoods() {
      this.showModal = false;
      this.saveWithdraw();
    },
    async verifyAndGetWithdrawData() {
      let _this = this;
      let d = {
        url: "System.Withdraw.verifyAndGetWithdrawData",
        data: { withdrawType: this.withdrawalType },
      };
      let res = await this.$http(d);

      // console.log("--------", res);

      if (res.code >= 0) {
        let { banklist } = res.data;
        if (this.withdrawalType == 1) {
          let { rate } = banklist[0];
          this.rate = rate;
          banklist.forEach((item) => {
            item.account = item.usdtAddress;
          });
        }

        this.account = res.data.account;
        this.isWithdrawInteger =
          res.data.isWithdrawInteger != undefined &&
          res.data.isWithdrawInteger == 1
            ? true
            : false;
        this.outMoneyFeeRate = res.data.outMoneyFeeRate;
        this.maxOutMoneyFee = res.data.maxOutMoneyFee;
        // this.maxOutMoneyFee = 10
        this.nofeeTimes = res.data.nofeeTimes;

        this.upper_limit = res.data.defaultWithdrawSetting.upper_limit;
        this.lower_limit = res.data.defaultWithdrawSetting.lower_limit;
        this.count_limit = res.data.defaultWithdrawSetting.count_limit;
        this.day_limit = res.data.defaultWithdrawSetting.day_limit;
        this.applyTimes = res.data.applyTimes;

        let { totalChLimit, totalComLimit } = res.data;

        this.totalChLimit = totalChLimit;
        this.totalComLimit = totalComLimit;
        this.todayWithdrawAmount = res.data.todayWithdrawAmount;
        this.canWithdraw = res.data.canWithdraw;

        this.banklist = banklist;

        return;
      } else if (res.code == "-6001") {
        uni.showModal({
          showCancel: false,
          content: res.message,
          success: function (res) {
            if (res.confirm) {
              _this.$util.redirectTo("/pages/member/index/index", {}, "tabbar");
            }
          },
        });
      } else if (res.code == "-6002") {
        uni.showModal({
          showCancel: false,
          content: res.message,
          success: function (res) {
            if (res.confirm) {
              _this.$util.redirectTo("/pages/member/index/index", {}, "tabbar");
            }
          },
        });
      } else if (res.code == "-6003") {
        uni.showModal({
          showCancel: false,
          content: res.message,
          success: function (res) {
            if (res.confirm) {
              _this.$util.redirectTo(
                "/pages/member/user/bindPhone/bindPhone",
                {},
                ""
              );
            }
          },
        });
      } else if (res.code == "-6004") {
        uni.showModal({
          showCancel: false,
          content: res.message,
          success: function (res) {
            if (res.confirm) {
              _this.$util.redirectTo(
                "/pages/member/editPassword/edit/edit?index=1",
                {},
                ""
              );
            }
          },
        });
      } else if (res.code == "-6005") {
        uni.showModal({
          showCancel: false,
          content: res.message,
          success: function (res) {
            if (res.confirm) {
              _this.$util.redirectTo(
                "/pages/member/bankCard/addBankCard/addBankCard",
                {}
              );
            }
          },
        });
      } else {
        // uni.showLoading({
        //   title: "加载中",
        //   mask:true
        // });
      }
    },
  },
  async onShow() {
    await this.$util.checkLogin();
    this.verifyAndGetWithdrawData();
    //console.log('');
  },
  onHide() {
    this.isSubmit = false;
  },
  mixins: [http],
};
</script>

<style lang="scss" scoped>
.page-body {
  min-height: 100vh;
  background-color: white;
  /* #ifdef H5 */
  min-height: calc(100vh - 44px);
  /* #endif */

  .usdt-number {
    padding-left: 120rpx;
    color: #666;
    font-size: 28rpx;
    .usdt {
      color: red;
      margin-right: 40rpx;
    }
  }

  .content {
    .top {
      display: flex;
      border-top: 2rpx solid #eee;
      border-bottom: 2rpx solid #eee;

      .left,
      .right {
        width: 50%;
        text-align: center;
        padding: 10rpx 0;
      }

      .left {
        border-right: 2rpx solid #eee;
      }
    }

    .bankCard,
    .thPwd,
    .thAddr {
      padding: 10rpx 30rpx;
      border-bottom: 2rpx solid #eee;
      display: flex;
      align-items: center;

      .bankCard_right {
        flex: 1;
      }
    }

    .thMoney {
      padding: 10rpx 30rpx;
      border-bottom: 2rpx solid #eee;

      .thMoney_b {
        display: flex;
        align-items: center;
        padding-left: 90rpx;

        .thMoney_size {
          font-size: 50rpx;
        }

        .uni-input {
          width: 306rpx;
          border-bottom: 2rpx solid #eee;
          margin: 0 20rpx;
        }
      }
    }

    .tip {
      padding: 30rpx;

      .tip_right {
        margin-left: 60rpx;
      }

      .btnView {
        margin-top: 20rpx;
        display: flex;
        .checkBtn {
          min-width: 120rpx;
          padding: 0 10rpx;
          margin: 0;
          font-size: 24rpx;
          height: 50rpx;
          line-height: 50rpx;
          color: #555;
        }
        .mr_10 {
          margin-right: 20rpx;
        }
      }
    }

    .okBtn {
      background-color: #53b12e;
      color: white;
      margin: 0 30rpx;
    }
  }

  .showModal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    display: block;
    box-sizing: border-box;

    .uni-mask {
      position: fixed;
      z-index: 999;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
    }

    .uni-modal {
      position: fixed;
      z-index: 999;
      width: 80%;
      max-width: 600rpx;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      text-align: center;
      border-radius: 6rpx;
      overflow: hidden;

      .uni-modal__bd {
        padding: 40rpx 48rpx 20rpx;
        min-height: 80rpx;
        font-size: 30rpx;
        line-height: 1.4;
        color: #999;
        max-height: 800rpx;
        overflow-y: auto;

        uni-view:nth-child(2) {
          uni-radio-group {
            uni-label {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 80rpx;
            }
          }
        }

        uni-button {
          border: 2rpx solid red;
          background-color: white;
          color: red;
          width: 200rpx;
          margin: 0 auto 20rpx;
          height: 60rpx;
          line-height: 60rpx;
        }
      }

      .uni-modal__ft {
        position: relative;
        display: flex;

        &::after {
          content: " ";
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          height: 2rpx;
          border-top: 2rpx solid #d5d5d6;
          color: #d5d5d6;
          transform-origin: 0 0;
          transform: scaleY(0.5);
        }

        .uni-modal__btn_primary {
          color: rgb(0, 122, 255);
        }

        .uni-modal__btn_default {
          &::after {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            width: 2rpx;
            bottom: 0;
            border-left: 2rpx solid #d5d5d6;
            color: #d5d5d6;
            transform-origin: 0 0;
            transform: scaleX(0.5);
          }
        }

        .uni-modal__btn {
          line-height: 96rpx;
          font-size: 36rpx;
          display: block;
          flex: 1;
          text-decoration: none;
          position: relative;
        }
      }
    }
  }
}
</style>
