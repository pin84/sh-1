<template>
  <view class="orther-recharge">
    <block v-if="loadingType == 'noMore'">
      <view class="top">
        <view class="title"> 充值币种： </view>
        <view class="top-content">
          <text class="iconfont icon-dian"></text>
          <view class="uni-list-cell-db">
            <picker
              :disabled="!isRechargeState"
              @change="changeWay"
              class="picker"
              range-key="curshowname"
              :value="curPayIndex"
              :range="onlinePayment"
            >
              <view class="uni-input">{{
                onlinePayment[curPayIndex].curshowname
              }}</view>
            </picker>
            <text class="iconfont icon-icon-test4"></text>
          </view>
        </view>
        <view v-if="card_type_id == 15" class="usdt-box">
          <view class="text">请转账至下列USDTD账户中：</view>
          <view class="text">链名称：{{ usdtName }}</view>
          <view class="usdt-addr text"
            >充值地址：{{ usdtAddr }}
            <button @click="copyText" class="mybtn" type="warn" size="mini">
              复制链接
            </button></view
          >
        </view>
      </view>
      <view class="content">
        <view class="title">
          <text class="iconfont icon-dian"></text>
          <text>请输入充值数量：</text>
          <text class="ns-text-color">[充值教程]</text>
        </view>
        <view class="moneyInput">
          <input
            class="recharge-money-input"
            type="digit"
            v-model="money"
            @blur="moneyBlur"
            @change="moneyChange"
            @input="inputMoney"
            placeholder="请输入充值金额"
          />

          <view class="usdt" v-if="usdtnumber"> ≈ {{ usdtnumber }}个USDT</view>
        </view>
        <view class="infoItem">
          <text class="label">订单号：</text>
          <text class="textContent">{{ orderNumber }}</text>
        </view>

        <view class="tip">
          <view v-if="showTip"
            >您指定存款金额为<text class="ns-text-color">{{ money }}</text
            >,请存入该指定金额,否则无法自动到账</view
          >
          <view v-if="chooseList[chooseListIndex].isCharge"
            >使用该支付方式，需要承担入款手续费<text class="ns-text-color">{{
              chooseList[chooseListIndex].charge
            }}</text
            >%</view
          >

          <view class="rate-box">
            <text
              >当前汇率：
              <span style="color: red">{{ rate || 0 }}</span> CNY/USDT
            </text>
            <button
              v-if="isShowGetRateBtn"
              @click="getImmdiateleRate"
              class="mybtn"
              type="warn"
              size="mini"
            >
              获取实时汇率
            </button>
          </view>
          <view v-if="isRechargeState">
            <view>温馨提示：</view>
            <view
              >1.最小金额：<text class="ns-text-color">{{ minAmount }}</text
              >;最大金额：<text class="ns-text-color">{{
                maxAmount
              }}</text></view
            >
            <view
              >2.充值成功后<text class="ns-text-color">5</text
              >分钟后未到账，请联系客服</view
            >
            <button class="custService" @click="onlineServer">在线客服</button>
            <button
              class="submit"
              :class="isSelected || money ? '' : 'noSubmit'"
              @click="submit"
            >
              {{ isSubmit == false ? "立即支付" : "支付中..." }}
            </button>
          </view>
          <view v-else class="re-status">
            <view class="text"
              >您的订单已提交，请扫描下面二维码进行转账，账务收到款后1-3分钟内为您加入额度</view
            >
            <view class="text">二维码仅限此次使用</view>
            <view>
              <image
                style="width: 200px; height: 200px; background-color: #eeeeee"
                :src="qrCodeImg"
                @error="imageError"
              ></image>
            </view>
          </view>
        </view>

        <view
          style="
            width: 650rpx;
            text-align: center;
            background-color: rgb(249, 249, 249);
            border-radius: 15rpx;
            text-align: left;
            margin: 0px auto;
          "
        >
          <rich-text :nodes="fFrontRemark"></rich-text>
        </view>
      </view>
    </block>
    <uni-load-more
      :status="loadingType"
      :contentText="contentText"
    ></uni-load-more>

    <MyModal
      v-if="isShlwModal"
      @close="isShlwModal = false"
      :isShowTitle="false"
    >
      <view class="modal-box">
        <view>
          <image
            style="width: 200px; height: 200px; background-color: #eeeeee"
            :src="qrCodeImg"
            @error="imageError"
          ></image>
        </view>
        <view class="text text1 text-blue"> USDT钱包地址 </view>
        <view class="text">
          下方产生钱包地址扫描QR码或点击按钮复制付款地址链接以进行存款
        </view>

        <view class="addr">
          <view class="addr-text"> {{ usdtAddr }} </view>
          <button @click="copyText" class="mybtn" type="warn" size="mini">
            复制链接
          </button>
        </view>
        <view class="text text2"> 订单金额：{{ money }} </view>

        <button @click="submitModal" type="primary" class="mybtn2">确认</button>
      </view>
    </MyModal>

    <!-- #ifdef APP-PLUS -->
    <view v-if="src != ''">
      <web-view :src="src" :webview-styles="webviewStyles"></web-view>
    </view>
    <!-- #endif  -->
  </view>
</template>

<script>
import http from "common/js/http.js";
import htmlParser from "@/common/js/html-parser";
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
import MyModal from "pages/gamesIm/common/colorUi/Modal.vue";
export default {
  components: {
    uniLoadMore,
    MyModal,
  },
  data() {
    return {
      qrCodeImg: "",
      isRechargeState: true,
      isShlwModal: false,
      card_type_id: 0,
      usdtName: "",
      usdtAddr: "",
      fFrontRemark: "",
      paymentId: 0,
      usdtnumber: 0,
      rate: 0,
      minAmount: 0,
      maxAmount: 0,
      isShowGetRateBtn: false,
      curPayIndex: 0,
      type: 0,
      loadingType: "loading",
      request_card_type: "",
      contentText: {
        contentrefresh: "正在加载...",
        contentnomore: "",
      },
      isSubmit: false,
      statusList: [
        {
          type: "",
          name: "",
        },
      ],
      titleName: "",
      orderNumber: "",
      onlinePayment: [
        {
          merchantName: "",
          fIsShowShortcut: "",
          fShortcutSet: "",
          minAmount: "",
          maxAmount: "",
          is_deposit_add_random: "",
          deposit_random_num: "",
          id: "",
          isCharge: "",
          charge: "",
        },
      ],
      chooseListIndex: 0,
      chooseList: [
        {
          merchantName: "",
          fIsShowShortcut: "",
          fShortcutSet: "",
          minAmount: "",
          maxAmount: "",
          is_deposit_add_random: "",
          deposit_random_num: "",
          fFrontRemark: "",
          id: "",
          isCharge: "",
          charge: "",
        },
      ],
      selectedBankcode: "",
      bankIndex: 0,
      ToCbankList: [],
      moneyList: [
        {
          value: "",
          selected: "",
        },
      ],
      money: "",
      isSelected: false,
      selectedMoney: "",
      minAmount: "",
      maxAmount: "",
      showTip: false,
      wayTypeArr: [],
      // #ifdef APP-PLUS
      src: "",
      webviewStyles: {
        progress: {
          color: "#FF3333",
        },
      },
      // #endif
    };
  },
  methods: {
    copyText() {
      this.$util.multiPlatformCopy(this.usdtAddr);
    },
    async submitModal() {
      let d = {
        url: "System.Recharge.saveOfflinePayment",
        method: "POST",
        data: {
          amount: this.money,
          companyCardId: "",
          bankId: this.paymentId,
          way: "",
          realName: "ffsd",
          isFirstRecharge: "",
          choicePre: false,
        },
      };

      let res = await this.$http(d);
      if (res.code > 0) {
        this.isShlwModal = false;
        this.isRechargeState = false;
      }
      this.$util.showConfirm({
        content: res.message,
        showCancel: false,
      });
    },
    imageError(e) {
      //console.log(e);
    },
    inputMoney() {
      let num = (this.money / this.rate).toFixed(2);
      this.usdtnumber = Number(num);
    },
    async getImmdiateleRate() {
      let d = {
        url: this.$api.getPayCnyRate,
        data: { coinType: 1 },
      };
      let res = await this.$http(d);
      this.rate = res.data;
      this.inputMoney();
    },

    getRechargeName(option) {
      let { isonline, card_type, card_type_id } = option;
      this.request_card_type = card_type;
      this.card_type_id = card_type_id;
      this.sendRequest({
        url: "System.Recharge.getRechargeName",
        data: {
          card_type,
        },
        success: (res) => {
          if (res.code == 0) {
            this.titleName = res.data.card_type_cn;
            uni.setNavigationBarTitle({
              title: this.titleName,
            });
            this.getPaymentProvider(res.data.card_type, isonline);
          }
        },
      });
      this.sendRequest({
        url: "System.Recharge.getBankNameAndCode",
        success: (res) => {
          if (res.code == 0) {
            for (let key in res.data) {
              this.ToCbankList.push({
                bankname: res.data[key],
                code: key,
              });
            }
            if (this.ToCbankList) {
              this.selectedBankcode = this.ToCbankList[0].code;
            }
            //console.log(this.selectedBankcode);
          }
        },
      });
    },
    getPaymentProvider(card_type, isonline) {
      this.sendRequest({
        url: "System.Recharge.getPaymentProvider",
        data: {
          id: card_type,
          isonline,
        },
        success: (res) => {
          console.log(res.data, isonline);

          if (res.code == 0) {
            let {
              onlinePayment,
              offlinePayment,
              IsAutoRateUSDT,
              IsAutoRateXNB,
              orderNumber,
            } = res.data;

            this.IsAutoRateUSDT = IsAutoRateUSDT;
            this.IsAutoRateXNB = IsAutoRateXNB;
            this.orderNumber = orderNumber;

            let flag;
            if (this.card_type_id == 15) {
              flag = IsAutoRateUSDT;
            } else {
              flag = IsAutoRateXNB;
            }

            if (flag == "True") {
              this.isShowGetRateBtn = false;
            } else {
              this.isShowGetRateBtn = true;
            }
            this.moneyList = [];

            let payment;
            if (isonline == 1) {
              payment = onlinePayment;
            } else {
              payment = offlinePayment;
            }

            payment.forEach((item) => {
              if (item.max_deposit_amount) {
                item.maxAmount = item.max_deposit_amount;
              }
              if (item.min_deposit_amount) {
                item.minAmount = item.min_deposit_amount;
              }

              let curshowname = "";
              if (this.card_type_id == 14) {
                if (item.isShowName == 1) {
                  curshowname = item.showName;
                } else {
                  curshowname = item.merchantName;
                }
              }
              if (this.card_type_id == 15) {
                curshowname = item.branch;
              }
              item.curshowname = curshowname;
            });

            this.onlinePayment = payment;
            this.changeWay({ target: { value: 0 } });
            this.loadingType = "noMore";
          }
        },
      });
    },

    changeWay(e) {
      let index = e.target.value;
      this.curPayIndex = index;

      let {
        maxAmount,
        minAmount,
        rate,
        id,
        fFrontRemark,
        branch,
        card_no,
        qrCodeImg,
      } = this.onlinePayment[index];

      this.maxAmount = maxAmount;
      this.minAmount = minAmount;
      this.rate = rate;
      this.paymentId = id;
      this.fFrontRemark = fFrontRemark;
      this.usdtName = branch;
      this.usdtAddr = card_no;
      this.qrCodeImg = qrCodeImg;

      this.inputMoney();
    },

    submit() {
      if (this.isSelected || this.money != "") {
        if (
          parseFloat(this.money) < parseFloat(this.minAmount) ||
          parseFloat(this.money) > parseFloat(this.maxAmount)
        ) {
          this.$util.showConfirm({
            content: "输入金额不在范围内,请重新输入",
            showCancel: false,
          });
          return false;
        }
        if (this.isSubmit) return;
        this.isSubmit = true;

        this.sendRequest({
          url: "System.Recharge.checkAmount",
          data: {
            amount: this.money,
          },
          success: (res) => {
            console.log(res);

            if (res.code >= 0) {
              this.goToPay();
            } else {
              this.isSubmit = false;
              uni.showModal({
                showCancel: false,
                content: res.message,
                success: function (res) {
                  if (res.confirm) {
                    return false;
                  }
                },
              });
            }
          },
        });
      } else {
        return false;
      }
    },
    goToPay() {
      let _this = this;

      let pdata = {
        amount: this.money,
        paymentId: this.paymentId,
        choicePre: "",
        orderNumber: this.orderNumber,
        wayType: 1,
      };

      if (this.card_type_id == 15) {
        this.isSubmit = false;
        this.isShlwModal = true;
      } else {
        this.sendRequest({
          url: "System.Recharge.goToPay",
          method: "POST",
          data: pdata,
          success: (res) => {
            // console.log(res);
            if (res.code == 0) {
              uni.showModal({
                showCancel: false,
                content: "订单提交成功，请尽快付款！订单号:" + this.orderNumber,
                success: function (res_2) {
                  if (res_2.confirm) {
                    let internal = res.data.internal;

                    if (typeof internal != "undefined" && internal == 1) {
                      let isWechat = res.data.isWechat;

                      if (typeof isWechat != "undefined" && isWechat == 1) {
                        var navData = encodeURIComponent(
                          JSON.stringify(res.data)
                        );
                        let tempUrl =
                          "/pages/member/recharge/wechatrecharge?param=" +
                          navData;
                        _this.$util.redirectTo(tempUrl, {});
                      } else {
                        //console.log(res.data);
                        var navData = encodeURIComponent(
                          JSON.stringify(res.data)
                        );
                        let tempUrl =
                          "/pages/member/recharge/alipayrecharge?param=" +
                          navData;
                        _this.$util.redirectTo(tempUrl, {});
                      }
                    } else {
                      let redirectUrl = res.data.url;
                      let redirectform = res.data.form;
                      //console.log(redirectform);
                      if (typeof redirectform != "undefined") {
                        var navData = encodeURIComponent(redirectform);
                        let tempUrl =
                          "/pages/member/recharge/onlineBankRecharge?param=" +
                          navData;
                        _this.$util.redirectTo(tempUrl, {});
                      } else {
                        // #ifdef H5
                        window.open(redirectUrl);
                        //window.location.href=redirectUrl;
                        // #endif
                        // #ifdef APP-PLUS
                        plus.runtime.openURL(redirectUrl);
                        //_this.src = res.data.url;
                        // #endif
                      }
                    }
                  }
                },
              });
            } else {
              this.$util.redirectTo(
                "/pages/member/recharge/failRecharge?message=" + res.message,
                {}
              );
            }
          },
        });
      }
    },
    onlineServer() {
      // this.sendRequest({
      // 	url: 'System.CustomerService.getCustomerService',
      // 	success: res => {
      // 		// console.log(res)
      // 		if(res.code == 0){
      // 			window.location.href=res.data.kefu_address;
      // 		}
      // 	}
      // })
      this.$util.redirectTo("/pages/kefu/kefu", {}, "tabbar");
    },
    moneyChange() {
      this.random = "";
    },
    moneyBlur(e) {
      if (e.target.value == "") {
        return false;
      }

      var reg =
        /^([1-9]\d*(\.\d*[1-9][0-9])?)|(0\.\d*[1-9][0-9])|(0\.\d*[1-9])$/;
      if (reg.test(e.target.value)) {
        if (this.money.indexOf(".") == -1) {
          //整数
          let deposit_random_num =
            this.onlinePayment[this.chooseListIndex].deposit_random_num;
          let is_deposit_add_random =
            this.onlinePayment[this.chooseListIndex].is_deposit_add_random;
          if (is_deposit_add_random == 1) {
            if (deposit_random_num == 1) {
              if (
                parseFloat(Number(this.money) - this.random) ==
                parseFloat(Number(e.target.value))
              ) {
                this.random = parseFloat(
                  Math.floor(Math.random() * 9 + 1) / 10
                );
                this.money = parseFloat(Number(this.money)) + this.random;
              }
            } else if (deposit_random_num == 2) {
              if (
                parseFloat(Number(this.money) - this.random) ==
                parseFloat(Number(e.target.value))
              ) {
                this.random = parseFloat(
                  (Math.floor(Math.random() * 90) + 10) / 100
                );
                this.money = parseFloat(Number(this.money)) + this.random;
              }
            } else if (deposit_random_num == 3) {
              this.money =
                Number(this.money) - 0 + Math.floor(1 + Math.random() * 9);
              // if(parseFloat(Number(this.money) - this.random) == parseFloat(Number(e.target.value))){
              // 	this.random = parseFloat((Math.floor(Math.random()*90) + 10)/100);
              // 	this.money = parseFloat(Number(this.money)) + this.random;
              // }
            }
            this.showTip = true;
          } else {
            this.showTip = false;
          }
        } else {
          if (this.random != "") {
            this.showTip = true;
          } else {
            this.showTip = false;
          }
        }
      } else {
        this.money = "";
      }

      this.sendRequest({
        url: "System.Recharge.checkAmount",
        data: {
          amount: this.money,
        },
        success: (res) => {
          // console.log(res)
          if (res.code < 0) {
            uni.showModal({
              showCancel: false,
              content: res.message,
              success: function (res) {
                if (res.confirm) {
                  return false;
                }
              },
            });
          }
        },
      });
    },
  },

  onLoad(option) {
    this.getRechargeName(option);
  },
  onHide() {
    this.isSubmit = false;
  },
  mixins: [http],
};
</script>

<style lang="scss">
.uni-list-cell-db {
  border: 1px solid #ccc;
  display: flex;
  margin: 0 auto;
  border-radius: 8rpx;
  .picker {
    width: 90%;
  }
  .uni-input {
    width: 90% !important;
    padding: 0 12rpx;
    // height: 0;
    // line-height: 0;
  }
}
</style>

<style lang="scss" scoped>
.orther-recharge {
  background-color: white;
  min-height: 100vh;
  /* #ifdef H5 */
  min-height: calc(100vh - 44px);
  /* #endif */
  .mybtn {
    font-size: 20rpx;
  }
  .re-status {
    margin-top: 20rpx;
    text-align: center;
    .text {
      color: #666;
      font-size: 20rpx;
    }
  }

  .modal-box {
    .mybtn2 {
      margin: 0;
      margin-top: 10rpx;
    }
    .text {
      font-size: 24rpx;
    }
    .text1 {
      font-size: 32rpx;
    }
    .text2 {
      text-align: left;
      font-size: 28rpx;
      margin-top: 10rpx;
    }

    .addr {
      display: flex;
      justify-content: space-between;
      .addr-text {
        width: 100%;
        border: 1px solid #ccc;
        font-size: 24rpx;
      }
      .mybtn {
        flex: 0 0 150rpx;
        margin: 0;
      }
    }
  }

  .usdt-box {
    padding: 0 60rpx;
    .text {
      font-size: 24rpx;
      color: #666;
    }
    .usdt-addr {
      display: flex;
      align-items: center;
    }
  }
  .moneyInput {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    .recharge-money-input {
      padding: 10rpx 30rpx;
      font-size: 28rpx;
    }
    .usdt {
      padding: 0 30rpx;
      color: #c8262c;
    }
  }

  .icon-dian {
    font-size: 60rpx;
    line-height: 0;
    color: red;
  }

  .top {
    padding: 0 15rpx;
    .title {
      padding: 5rpx 40rpx;
    }
    .top-content {
      display: flex;
      align-items: center;
    }
  }

  .edit-nav {
    box-sizing: border-box;
    height: 80rpx;
    flex-direction: row;
    background: #fff;
    border-bottom: 2rpx solid $ns-border-color-gray;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    display: flex;
    /* #ifdef H5 */
    top: 44px;
    /* #endif */

    .uni-tab-item {
      flex-wrap: nowrap;
      flex-grow: 1;
      box-sizing: border-box;
      text-align: center;
    }

    .uni-tab-item-title {
      color: #555;
      font-size: 30rpx;
      display: block;
      height: 76rpx;
      line-height: 76rpx;
      border-bottom: 2px solid #fff;
      padding: 0 10rpx;
      flex-wrap: nowrap;
    }

    .uni-tab-item-title-active {
      display: block;
      height: 76rpx;
      color: $base-color;
      border-bottom: 2px solid $base-color;
      padding: 0 10rpx;
    }
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
      color: transparent;
    }
  }

  .content {
    .title {
      padding: 10rpx;
      display: flex;
      align-items: center;
    }

    .moneyList {
      display: flex;
      flex-wrap: wrap;
      padding: 20rpx 30rpx 16rpx;
      border-bottom: 2rpx solid #eee;

      .item {
        width: 160rpx;
        height: 60rpx;
        line-height: 60rpx;
        border: 2rpx solid #eee;
        border-radius: 10rpx;
        text-align: center;
        margin: 0 10rpx 10rpx 0;
      }

      .item:nth-child(4n) {
        margin-right: 0;
      }

      .selected {
        background-color: #ff0036;
        color: white !important;
      }
    }

    .infoItem {
      padding: 20rpx 40rpx;
      border-bottom: 2rpx solid #eee;

      .label {
        display: inline-block;
        width: 140rpx;
      }

      .textContent {
        padding-left: 20rpx;
      }
    }

    .uni-list-cell::after {
      height: 0;
    }

    .tip {
      padding: 40rpx 20rpx 20rpx;
      .rate-box {
        display: flex;
        align-items: center;
        .btn {
          font-size: 20rpx;
        }
      }

      .custService {
        margin: 0;
        padding: 0;
        width: 140rpx;
        font-size: 26rpx;
        height: 50rpx;
        line-height: 50rpx;
        background-color: #bc283b;
        color: white;
      }

      .submit {
        background-color: #1ab20a;
        color: white;
        margin: 50rpx 0 0;
      }

      .noSubmit {
        background-color: #ccc;
      }
    }
  }
}
</style>
