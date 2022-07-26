<template>
  <view class="page-body">
    <block v-if="loadingType == 'noMore'">
      <view id="tab-bar" class="edit-nav">
        <view
          v-for="(item, index) in statusList"
          :key="index"
          class="uni-tab-item"
          :data-current="index"
          @click="ontabtap"
        >
          <text
            class="uni-tab-item-title"
            :class="type == index ? 'uni-tab-item-title-active' : ''"
            >{{ item.name }}</text
          >
        </view>
      </view>
      <view class="content">
        <view class="title">
          <text class="iconfont iconyuandian ns-text-color"></text>
          请输入充值金额:
          <text class="iconfont iconbangzhu1 ns-text-color"></text>
          <text class="ns-text-color">[充值教程]</text>
        </view>
        <view
          class="moneyList"
          v-if="chooseList[chooseListIndex].fIsShowShortcut == 1"
        >
          <text
            class="item ns-text-color"
            :class="item.selected ? 'selected' : ''"
            v-for="(item, index) in moneyList"
            :key="index"
            @click="moneySelect(index)"
            >{{ item.value }}元</text
          >
        </view>
        <view class="moneyInput" v-else>
          <input
            class="recharge-money-input"
            type="digit"
            v-model="money"
            @blur="moneyBlur"
            @change="moneyChange"
            @input="moneyInput"
            placeholder="请输入充值金额"
          />
        </view>

        <view class="infoItem username-box" v-if="needPayee">
          <text class="label">真实姓名：</text>
          <input
            v-model="payee"
            class="username-input"
            type="text"
            placeholder="请输入真实姓名"
          />
        </view>
        <view class="infoItem">
          <text class="label">订单号：</text>
          <text class="textContent">{{ orderNumber }}</text>
        </view>
        <view class="infoItem uni-list-cell">
          <text class="label">选择通道：</text>
          <view class="uni-list-cell-db">
            <picker
              @change="changeWay"
              :value="chooseListIndex"
              :range="chooseList"
              :range-key="'merchantName'"
            >
              <view class="uni-input" style="padding: 0 20rpx">{{
                chooseList[chooseListIndex].merchantName
              }}</view>
            </picker>
          </view>
        </view>
        <view
          v-if="request_card_type == 'bank_b2c'"
          class="infoItem uni-list-cell"
        >
          <text class="label">选择银行：</text>
          <view class="uni-list-cell-db">
            <picker
              @change="changeBank"
              :value="bankIndex"
              :range="ToCbankList"
              :range-key="'bankname'"
            >
              <view class="uni-input" style="padding: 0 20rpx">{{
                ToCbankList[bankIndex].bankname
              }}</view>
            </picker>
          </view>
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
          <view>温馨提示：</view>
          <view
            >1.最小金额：<text class="ns-text-color">{{
              chooseList[chooseListIndex].minAmount
            }}</text
            >;最大金额：<text class="ns-text-color">{{
              chooseList[chooseListIndex].maxAmount
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

        <view
          style="
            width: 650rpx;
            padding: 20rpx;
            text-align: center;
            background-color: rgb(249, 249, 249);
            border-radius: 15rpx;
            text-align: left;
            margin: 0px auto;
          "
        >
          <rich-text
            :nodes="chooseList[chooseListIndex].fFrontRemark"
          ></rich-text>
        </view>
      </view>
    </block>
    <uni-load-more
      :status="loadingType"
      :contentText="contentText"
    ></uni-load-more>

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
export default {
  components: {
    uniLoadMore,
  },
  data() {
    return {
      hasChangeMoney: false,
      payee: "",
      needPayee: 0,
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
    moneyInput() {
      if (!this.hasChangeMoney) return;
      this.hasChangeMoney = false;
    },
    ontabtap(e) {
      let index = e.target.dataset.current || e.currentTarget.dataset.current;
      this.switchTab(index);
    },
    switchTab(index) {
      if (this.type === index) {
        return;
      }
      this.type = index;
      this.isSelected = false;
      this.money = "";
      this.chooseList = [];
      this.moneyList = [];
      if (
        this.statusList.length == 1 &&
        this.statusList[0].name == this.titleName + "客户端支付"
      ) {
        for (var i = 0; i < this.onlinePayment.length; i++) {
          if (this.onlinePayment[i].wayType == 0) {
            this.chooseList.push(this.onlinePayment[i]);
          } else if (this.onlinePayment[i].wayType == 2) {
            this.chooseList.push(this.onlinePayment[i]);
          }
        }
        if (this.chooseList[this.chooseListIndex].fIsShowShortcut == 1) {
          let arr =
            this.chooseList[this.chooseListIndex].fShortcutSet.split(",");
          Object.keys(arr).forEach((key) => {
            let item = arr[key];
            this.moneyList.push({
              value: item,
              selected: false,
            });
          });
        }
      } else if (
        this.statusList.length == 1 &&
        this.statusList[0].name == this.titleName + "扫码支付"
      ) {
        for (var i = 0; i < this.onlinePayment.length; i++) {
          if (this.onlinePayment[i].wayType == 0) {
            this.chooseList.push(this.onlinePayment[i]);
          } else if (this.onlinePayment[i].wayType == 1) {
            this.chooseList.push(this.onlinePayment[i]);
          }
        }
        if (this.chooseList[this.chooseListIndex].fIsShowShortcut == 1) {
          let arr =
            this.chooseList[this.chooseListIndex].fShortcutSet.split(",");
          Object.keys(arr).forEach((key) => {
            let item = arr[key];
            this.moneyList.push({
              value: item,
              selected: false,
            });
          });
        }
      } else if (this.statusList.length == 2) {
        this.chooseList = [];
        this.chooseListIndex = 0;
        if (this.type == 0) {
          for (var i = 0; i < this.onlinePayment.length; i++) {
            if (this.onlinePayment[i].wayType == 0) {
              this.chooseList.push(this.onlinePayment[i]);
            } else if (this.onlinePayment[i].wayType == 2) {
              this.chooseList.push(this.onlinePayment[i]);
            }
          }
          if (this.chooseList[this.chooseListIndex].fIsShowShortcut == 1) {
            let arr =
              this.chooseList[this.chooseListIndex].fShortcutSet.split(",");
            Object.keys(arr).forEach((key) => {
              let item = arr[key];
              this.moneyList.push({
                value: item,
                selected: false,
              });
            });
          }
        } else {
          for (var i = 0; i < this.onlinePayment.length; i++) {
            if (this.onlinePayment[i].wayType == 0) {
              this.chooseList.push(this.onlinePayment[i]);
            } else if (this.onlinePayment[i].wayType == 1) {
              this.chooseList.push(this.onlinePayment[i]);
            }
          }
          if (this.chooseList[this.chooseListIndex].fIsShowShortcut == 1) {
            let arr =
              this.chooseList[this.chooseListIndex].fShortcutSet.split(",");
            Object.keys(arr).forEach((key) => {
              let item = arr[key];
              this.moneyList.push({
                value: item,
                selected: false,
              });
            });
          }
        }
      }
    },
    moneySelect(index) {
      for (var i = 0; i < this.moneyList.length; i++) {
        this.moneyList[i].selected = false;
      }
      this.moneyList[index].selected = !this.moneyList[index].selected;
      this.isSelected = true;
      this.selectedMoney = this.moneyList[index].value;
      this.sendRequest({
        url: "System.Recharge.checkAmount",
        data: {
          amount: this.selectedMoney,
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
    getRechargeName(option) {
      let { isonline, card_type } = option;
      this.request_card_type = card_type;
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
          console.log("-------", res);
          if (res.code == 0) {
            this.orderNumber = res.data.orderNumber;
            this.moneyList = [];
            this.chooseList = [];
            this.onlinePayment = [];
            Object.keys(res.data.onlinePayment).forEach((key) => {
              let item = res.data.onlinePayment[key];
              this.onlinePayment.push({
                wayType: item.wayType,
                merchantName: item.merchantName,
                fIsShowShortcut: item.fIsShowShortcut,
                fShortcutSet: item.fShortcutSet,
                fFrontRemark: htmlParser(item.fFrontRemark),
                minAmount: item.minAmount,
                is_deposit_add_random: item.isDepositAddRandom,
                deposit_random_num: item.depositRandomNum,
                maxAmount: item.maxAmount,
                id: item.id,
                isCharge: item.isCharge,
                charge: item.charge,
                needPayee: item.needPayee,
              });
            });
            this.needPayee = this.onlinePayment[0].needPayee;
            // console.log(this.onlinePayment);
            for (var i = 0; i < this.onlinePayment.length; i++) {
              this.wayTypeArr.push(this.onlinePayment[i].wayType);
            }
            this.wayTypeArr = new Set(this.wayTypeArr);
            this.wayTypeArr = [...this.wayTypeArr].sort();
            if (
              JSON.stringify(this.wayTypeArr) == JSON.stringify([0]) ||
              JSON.stringify(this.wayTypeArr) == JSON.stringify([0, 1]) ||
              JSON.stringify(this.wayTypeArr) == JSON.stringify([0, 2]) ||
              JSON.stringify(this.wayTypeArr) == JSON.stringify([1, 2]) ||
              JSON.stringify(this.wayTypeArr) == JSON.stringify([0, 1, 2])
            ) {
              this.statusList = [
                {
                  type: 0,
                  name: this.titleName + "客户端支付",
                },
                {
                  type: 1,
                  name: this.titleName + "扫码支付",
                },
              ];
              for (var i = 0; i < this.onlinePayment.length; i++) {
                if (this.onlinePayment[i].wayType == 0) {
                  this.chooseList.push(this.onlinePayment[i]);
                } else if (this.onlinePayment[i].wayType == 2) {
                  this.chooseList.push(this.onlinePayment[i]);
                }
              }
              if (this.chooseList[this.chooseListIndex].fIsShowShortcut == 1) {
                let arr =
                  this.chooseList[this.chooseListIndex].fShortcutSet.split(",");
                Object.keys(arr).forEach((key) => {
                  let item = arr[key];
                  this.moneyList.push({
                    value: item,
                    selected: false,
                  });
                });
              }
            } else if (JSON.stringify(this.wayTypeArr) == JSON.stringify([1])) {
              this.statusList = [
                {
                  type: 0,
                  name: this.titleName + "扫码支付",
                },
              ];
              for (var i = 0; i < this.onlinePayment.length; i++) {
                this.chooseList.push(this.onlinePayment[i]);
              }
              if (this.chooseList[this.chooseListIndex].fIsShowShortcut == 1) {
                let arr =
                  this.chooseList[this.chooseListIndex].fShortcutSet.split(",");
                Object.keys(arr).forEach((key) => {
                  let item = arr[key];
                  this.moneyList.push({
                    value: item,
                    selected: false,
                  });
                });
              }
            } else if (JSON.stringify(this.wayTypeArr) == JSON.stringify([2])) {
              this.statusList = [
                {
                  type: 0,
                  name: this.titleName + "客户端支付",
                },
              ];
              for (var i = 0; i < this.onlinePayment.length; i++) {
                this.chooseList.push(this.onlinePayment[i]);
              }
              if (this.chooseList[this.chooseListIndex].fIsShowShortcut == 1) {
                let arr =
                  this.chooseList[this.chooseListIndex].fShortcutSet.split(",");
                Object.keys(arr).forEach((key) => {
                  let item = arr[key];
                  this.moneyList.push({
                    value: item,
                    selected: false,
                  });
                });
              }
            }
            this.loadingType = "noMore";
          }
        },
      });
    },
    changeBank(e) {
      this.bankIndex = e.target.value;
      this.selectedBankcode = this.ToCbankList[this.bankIndex].code;
      //console.log(this.selectedBankcode);
    },
    changeWay(e) {
      let index = e.target.value;
      this.chooseListIndex = index;
      let { needPayee } = this.onlinePayment[index];
      this.needPayee = needPayee;
      this.moneyList = [];
      this.isSelected = false;
      this.showTip = false;
      this.money = "";
      if (this.chooseList[index].fIsShowShortcut == 1) {
        let arr = this.chooseList[index].fShortcutSet.split(",");
        Object.keys(arr).forEach((key) => {
          let item = arr[key];
          this.moneyList.push({
            value: item,
            selected: false,
          });
        });
      }
    },
    submit() {
      if (this.isSelected || this.money != "") {
        if (
          parseFloat(this.money) <
            parseFloat(this.chooseList[this.chooseListIndex].minAmount) ||
          parseFloat(this.money) >
            parseFloat(this.chooseList[this.chooseListIndex].maxAmount)
        ) {
          this.$util.showToast({ title: "输入金额不在范围内,请重新输入" });
          this.money = "";
          return false;
        }

        if (this.needPayee && !this.payee) {
          this.$util.showToast({ title: "请输入真实姓名" });
          return;
        }

        let d = {
          amount: this.money || this.selectedMoney,
        };

        if (this.isSubmit) return;
        this.isSubmit = true;
        this.sendRequest({
          url: "System.Recharge.checkAmount",
          data: d,
          success: (res) => {
            // console.log(res)
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
      let pdata = {};

      //console.log(this.onlinePayment);
      //console.log( this.type);

      if (this.request_card_type == "bank_b2c") {
        //需要传递bankcode
        pdata = {
          amount: this.money || this.selectedMoney,
          paymentId: this.chooseList[this.chooseListIndex].id,
          choicePre: "",
          bankcode: this.selectedBankcode,
          orderNumber: this.orderNumber,
          wayType: this.type,
        };
      } else {
        pdata = {
          amount: this.money || this.selectedMoney,
          paymentId: this.chooseList[this.chooseListIndex].id,
          choicePre: "",
          orderNumber: this.orderNumber,
          wayType: this.type,
        };
      }

      if (this.needPayee) {
        pdata = Object.assign({}, pdata, { payee: this.payee });
      }
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
          // console.log('=====',reg.test(e.target.value), deposit_random_num  ,is_deposit_add_random);
          if (is_deposit_add_random == 1) {
            if (deposit_random_num == 1) {
              if (!this.hasChangeMoney) {
                let n1 = this.$buyDataHandler.createRandomNum(1, 9);
                this.money = `${this.money}.${n1}`;
                this.hasChangeMoney = true;
              }
            } else if (deposit_random_num == 2) {
              if (!this.hasChangeMoney) {
                let n1 = this.$buyDataHandler.createRandomNum(1, 9);
                let n2 = this.$buyDataHandler.createRandomNum(1, 9);
                this.money = `${this.money}.${n1}${n2}`;
                this.hasChangeMoney = true;
              }
            } else if (deposit_random_num == 3) {
              if (!this.hasChangeMoney) {
                let numArr = this.money.split("");
                let len = numArr.length;
                let lastNum = numArr.splice(len - 1, 1);

                let randonIndex = Math.floor(1 + Math.random() * 7);
                let randomArr = [];
                for (let i = 1; i < 10; i++) {
                  if (i == lastNum) continue;
                  randomArr.push(i);
                }
                this.money = numArr.join("") + randomArr[randonIndex];
                this.hasChangeMoney = true;
              }
            }
            this.showTip = true;
            this.money = this.money + "";
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

<style lang="scss" scoped>
.recharge-money-input {
  padding: 10px 30rpx;
  color: #c8262c;
  height: 100rpx;
  border: 1px dashed #ccc;
  margin: 10rpx;
}
.page-body {
  background-color: white;
  min-height: 100vh;
  /* #ifdef H5 */
  min-height: calc(100vh - 44px);
  /* #endif */

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
    padding-top: 80rpx;

    .title {
      padding: 10rpx;
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
    .username-box {
      display: flex;
      align-items: center;
      .username-input {
        font-size: 28rpx;
        padding-left: 20rpx;
      }
    }

    .uni-list-cell::after {
      height: 0;
    }

    .tip {
      padding: 40rpx 20rpx 20rpx;

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
