<template>
  <div class="online-box">
    <div class="tech01">
      <div class="tech01-head">
        <el-badge value="1"></el-badge>充值教程：请选择线上支付通道：<span
          class="text-primary"
          >（充值提交成功后5分钟未到账，请联系客服）</span
        >
      </div>

      <div class="paymentList-15" v-if="cardTypeId == 15">
        <ul class="paymentList">
          <li
            class="paymentList-item pointer"
            :class="{ active: curIndex == index }"
            v-for="(item, index) in payment"
            :key="index"
            @click="selectUsdt(item, index)"
          >
            <div class="paymentList-item-img-box">
              <img src="/images/userCenterRecharge/icon_usdt01.png" alt="" />
            </div>

            <div class="text-box">
              <div>链名称: {{ item.branch }}</div>
              <div>充值地址: {{ item.card_no }}</div>
            </div>
          </li>
        </ul>

        <div class="tips" v-if="curIndex != null">
          <p>请转账至下列USDT账户中：</p>
          <p>链名称: {{ curSelectUsdt.branch }}</p>
          <div class="addr">
            <p>充值地址: {{ curSelectUsdt.card_no }}</p>
            <el-button class="btn" type="danger">复制地址</el-button>
          </div>
        </div>
      </div>

      <ul v-else class="paymentList">
        <li
          v-for="(item, index) in payment"
          class="item"
          :key="index"
          :class="{ is_Sel: issel_index == index }"
          @click="selectTransfer(item, index)"
        >
          <el-link v-if="item.isShowName == 1">{{ item.showName }}</el-link>
          <el-link v-if="item.isShowName == 0">{{ item.merchantName }}</el-link>
          <i class="iconfont icon-dui"></i>
        </li>
      </ul>
    </div>
    <div class="tech02">
      <div class="tech02-head">
        <el-badge value="2"></el-badge>充值数量（单位：元），<span
          >单笔最低存款金额<span class="text-primary">
            {{ payment[issel_index].minAmount }} </span
          >元以上，<span class="text-primary">
            {{ payment[issel_index].maxAmount }} </span
          >元以下</span
        >
      </div>

      <!-- 快捷方式 -->
      <div class="quick_pay" v-if="payment[issel_index].fIsShowShortcut == 1">
        <ul class="quickpayList">
          <li
            v-for="(item, index) in payment[issel_index].fShortcutSet.split(
              ','
            )"
            :key="item.index"
            :class="{ is_Sel: issel_index1 == index }"
            @click="quickpay(item, index)"
          >
            {{ item }}
            <i class="iconfont icon-dui"></i>
          </li>
        </ul>
      </div>

      <!-- 手动输入 -->

      <div v-else>
        <el-input
          v-model="info.money"
          size="mini"
          placeholder=""
          type="text"
          @input="inputAmount"
          @change="VerificatAmount"
        ></el-input>

        <span
          v-if="xunibi && (cardTypeId == 14 || cardTypeId == 15)"
          class="usdt"
        >
          ≈ {{ xunibi }}个USDT</span
        >
      </div>

      <div v-if="cardTypeId == 14 || cardTypeId == 15" class="tips-1">
        <div v-if="isShowImmediateRate">当前汇率：{{ rate }}CNY/RMB</div>
        <div v-else>
          <span>当前汇率：{{ rate }}CNY/RMB（汇率实时波动，仅供参考）</span>
          <el-button @click="getPayCnyRate" class="btn" type="danger" round
            >获取实时汇率</el-button
          >
        </div>
      </div>

      <div class="tips">
        <span v-if="mathNumVisible"
          >您指定存款金额为<span class="text-primary">{{ info.money }}</span>
          请存入该指定金额，否则无法自动到账</span
        >
        <span v-if="payment[issel_index].isCharge == 1">
          使用该方式，需要承担入款手续费
          <span class="text-primary">{{ payment[issel_index].charge }}</span
          >%
        </span>
      </div>

      <div class="username-box" v-if="needPayee">
        <div><el-badge value="3"></el-badge><span>请输入真实姓名：</span></div>
        <el-input
          size="mini"
          v-model="payee"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <p v-if="dataCheck" class="loading">正在核对数据中，请稍后</p>
    </div>

    <el-button type="primary" :disabled="isVisible" @click="submitAmount"
      >立即充值</el-button
    >

    <!-- 消息提示 -->
    <el-dialog title="消息提示" :visible.sync="tipsVisible">
      <p>尊敬的会员您好：</p>
      <p>
        感谢您选择zh娱乐城 - 专业娱乐平台！恭喜您可获得充值{{
          payment[issel_index].rebatePercent
        }}%（最高：{{
          payment[issel_index].maxRebate == 0
            ? "无上限"
            : payment[issel_index].maxRebate
        }}）的存款优惠，达到基础流水即可提款！
      </p>
      <p>活动详情联系在线客服。</p>
      <el-radio-group style="margin: 15px 0" v-model="info.withDiscount">
        <el-radio label="true">我要获取存款优惠</el-radio>
        <el-radio label="false">我要放弃存款优惠</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="(tipsVisible = false), (info.withDiscount = '')"
          >取 消</el-button
        >
        <el-button type="primary" @click="tipsVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 成功操作提示 -->
    <el-dialog title="操作提示" :visible.sync="successVisible">
      <p style="text-align: center; color: green">
        订单提交成功，请尽快付款！订单号：{{ orderNumber }}
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goToPayPage()">确 定</el-button>
      </span>
    </el-dialog>

    <div v-if="isShowUSDTRechargeQrcode" class="usdt-recharge">
      <p>
        <el-badge value="3" />
        <span>请扫描二维码</span>
      </p>
      <p class="text1">
        您的订单已提交，请扫描下面的二维码进行转账，账务收到款项后1-3分钟内为您加入额度
      </p>
      <div class="qrcode-box">
        <p>(二维码公限此次使用)</p>
        <img :src="qrCodeImg" alt="" />
      </div>
    </div>

    <MyMask @hiddenMask="isShowMask = false" v-if="isShowMask">
      <div class="mask-box">
        <WHeader leftText="提示" @close="isShowMask = false" />
        <div class="mask-content">
          <div>
            <img :src="qrCodeImg" alt="" />
          </div>
          <p>
            订单金额：<span>{{ amount }}</span>
          </p>
          <p>充值地址：</p>
          <p>{{ card_no }}</p>
          <p>
            <el-button class="btn" type="danger">复制地址</el-button>
          </p>
          <p>扫码后请点击确认订单按钮、以完成充值</p>
          <p>
            <el-button class="btn" type="danger" @click="usdtToPay"
              >确认</el-button
            >
          </p>
        </div>
      </div>
    </MyMask>
  </div>
</template>

<script>
import MyMask from "@/views/games/components/mask/index.vue";
import WHeader from "@/views/games/components/widget/WHeader.vue";
export default {
  props: ["cardTypeId", "cardTypeName", "isonline", "bankDepositIdStr"],
  data() {
    return {
      needPayee: 0,
      payee: "",
      qrCodeImg: null,
      bank_id: null,
      isShowUSDTRechargeQrcode: false,
      curPaymentData: {},
      amount: 0,
      card_no: 0,
      isShowMask: false,
      webName: "",
      orderNumber: 0,
      curSelectUsdt: {},
      curIndex: null,
      payment: [
        {
          minAmount: "",
          maxAmount: "",
        },
      ],
      curAmount: 0,
      xunibi: null,
      rate: 1,
      isShowImmediateRate: false,

      issel_index: 0,
      issel_index1: -1,
      info: {
        money: "",
        withDiscount: "",
      },
      isVisible: true,
      mathNumVisible: false,
      dataCheck: false,
      successVisible: false,
      tipsVisible: false,
      need_give_up: true,
      payPageURL: "",
    };
  },

  components: {
    MyMask,
    WHeader,
  },
  created() {
    console.log(this.cardTypeId);
  },

  methods: {
    async usdtToPay() {
      let res1 = await this.$get("Pc.Recharge.getOfflinePayments", {
        bankDepositIdStr: this.bankDepositIdStr,
      });
      if (res1.code != 0) {
        this.$gutils.confirm({
          text: "语法出错",
        });
        return;
      }
      let { rechargeId } = res1.data;

      let d = {
        amount: this.curPaymentData.amount,
        companyCardId: "",
        bankId: this.curSelectUsdt.id,
        way: "",
        place: "",
        realName: "aaafd",
        rechargeId: rechargeId,
        choicePre: false,
      };
      let res = await this.$post(this.$gapi.saveOfflinePayment, d);

      this.isShowMask = false;
      let { code } = res;
      if (code == 1) {
        await this.$gutils.confirm({
          text: "您的订单已提交成功，请关闭此弹窗，扫描二维码关转账",
        });
        this.isShowUSDTRechargeQrcode = true;
      } else {
        this.$gutils.confirm({
          text: res.message,
        });
        this.isShowUSDTRechargeQrcode = false;
      }
    },
    usdtRecharge(d) {
      let { amount } = d;
      let { card_no } = this.curSelectUsdt;
      this.card_no = card_no;
      this.amount = amount;

      this.isShowMask = true;
    },
    selectUsdt(item, index) {
      console.log(item);
      let { bank_id, qrCodeImg } = item;
      this.bank_id = bank_id;
      this.qrCodeImg = qrCodeImg;
      this.curIndex = index;
      this.curSelectUsdt = item;
      this.issel_index = index;
    },
    inputAmount(amount) {
      this.curAmount = amount;
      let xunibi = amount / this.rate;
      this.xunibi = this.$BDH.setNumDecimal(xunibi, 4);
    },
    async getPayCnyRate() {
      let res = await this.$get(this.$gapi.getPayCnyRate, { coinType: 1 });
      let rate = res.data;
      this.rate = rate;
      this.inputAmount(this.curAmount);
    },

    resetData() {
      this.xunibi = null;
      this.curIndex = null;
      this.qrCodeImg = null;
      this.info = {
        money: "",
        withDiscount: "",
      };
    },

    // 根据ID获取online充值
    getPaymentProvider() {
      this.resetData();
      let d = {
        id: this.cardTypeId,
        isonline: this.isonline,
      };
      if (this.cardTypeId) {
        this.$get("Pc.Recharge.getPaymentProvider", d).then((res) => {
          if (res.code == 0) {
            let payment =
              res.data[this.isonline ? "onlinePayment" : "offlinePayment"];
            console.log("----", payment);
            console.log("cartypeid-", this.cardTypeId);
            let { IsAutoRateXNB, IsAutoRateUSDT, orderNumber, webName } =
              res.data;
            this.orderNumber = orderNumber;
            this.webName = webName;
            let flag = this.cardTypeId == 14 ? IsAutoRateXNB : IsAutoRateUSDT;
            if (flag == "False") {
              this.isShowImmediateRate = false;
            } else {
              this.isShowImmediateRate = true;
            }

            payment.forEach((item) => {
              if (item.max_deposit_amount) {
                item.maxAmount = item.max_deposit_amount;
              }
              if (item.min_deposit_amount) {
                item.minAmount = item.min_deposit_amount;
              }
            });

            let { rate, needPayee } = payment[0];
            this.payment = payment;
            this.needPayee = needPayee;
            this.rate = rate;
          } else {
            return this.$message.error(res.message);
          }
        });
      }
    },

    // 选择支付通道
    selectTransfer(v, index) {
      let { needPayee } = v;
      this.needPayee = needPayee;
      console.log(needPayee);

      this.issel_index = index;
      let { rate } = this.payment[index];
      this.rate = rate;
      this.inputAmount(this.curAmount);
    },
    // 快捷支付
    quickpay(v, index) {
      this.isVisible = false;
      this.issel_index1 = index;
      this.info.money = v;
    },
    // 判断是否数字
    myIsNaN(value) {
      return typeof value === "number" && !isNaN(value);
    },
    // 验证金额
    VerificatAmount(v) {
      let isMathNumFlag = true;
      // 判断金额是否为空
      if (v == "") {
        this.$message.error("请输入存款金额");
        return;
      }
      // 判断金额是否是合法数字
      let isNum = this.myIsNaN(Number(v));
      if (isNum) {
        // 判断是否存在小数
        if (parseInt(v) !== parseFloat(v)) {
          isMathNumFlag = false;
        }
        // 判断金额是否需要自动添加随机数
        if (
          // 是否添加随机数
          this.payment[this.issel_index].isDepositAddRandom == 1
        ) {
          this.mathNumVisible = true; //显示提示信息
          if (
            this.payment[this.issel_index].depositRandomNum == 3 //个位随机
          ) {

            let numArr = v.split("");
            let len = numArr.length;
            let lastNum = numArr.splice(len - 1, 1);

            let randonIndex = Math.floor(1 + Math.random() * 7);
            let randomArr = [];
            for (let i = 1; i < 10; i++) {
              if (i == lastNum) continue;
              randomArr.push(i);
            }
            this.info.money = numArr.join("") + randomArr[randonIndex];
          } else if (
            this.payment[this.issel_index].depositRandomNum == 1 && //一位小数随机
            isMathNumFlag
          ) {
            let n1 = this.$BDH.createRandomNum(1, 9);
            this.info.money = `${v}.${n1}`;
          } else if (
            this.payment[this.issel_index].depositRandomNum == 2 && //两位小数随机
            isMathNumFlag
          ) {
            let n1 = this.$BDH.createRandomNum(1, 9);
            let n2 = this.$BDH.createRandomNum(1, 9);
            this.info.money = `${v}.${n1}${n2}`;
          }
        }
      } else {
        this.$message.error("请正确填写数字");
        this.info.money = "";
        this.isVisible = true;
      }
      this.checkAmount();
    },
    // 提交验证
    checkAmount() {
      if (this.info.money !== "") {
        this.dataCheck = true; //check 数据状态
        this.$post("Pc.Recharge.checkAmount", {
          amount: this.info.money,
        }).then((res) => {
          if (res.code == 0) {
            this.dataCheck = false; // check 数据状态
            this.isVisible = false; //修改按钮状态
            // 判断是否需要优惠
            if (
              this.payment[this.issel_index].isGiveup == 1 &&
              this.info.money >= this.payment[this.issel_index].rebateLine &&
              this.need_give_up
            ) {
              this.tipsVisible = true;
              this.need_give_up = false;
            }
          } else {
            this.isVisible = true;
            this.dataCheck = false;
            return this.$message.error(res.message);
          }
        });
      }
    },
    // 提交数据
    async submitAmount() {
      this.isVisible = true;
      this.payPageURL = "";
      setTimeout(() => {
        this.isVisible = false; //点击一次时隔两秒后才能再次点击
      }, 1000);

      let d = {
        paymentId: this.payment[this.issel_index].id,
        amount: this.info.money,
        bankcode: "",
        choicePre: this.info.withDiscount,
        orderNumber: this.orderNumber,
      };

      if (this.needPayee && !this.payee) {
        return this.$gutils.confirm({
          text: "请输入真实姓名。",
        });
      }

      if (this.needPayee) {
        d = Object.assign({}, d, { payee: this.payee });
      }

      if (this.cardTypeId == 15) {
        if (!this.bank_id) {
          this.$gutils.confirm({ text: "请先选择充值的地址" });
          return;
        }
        let { money } = this.info;
        let { minAmount, maxAmount } = this.payment[this.issel_index];
        minAmount = Number(minAmount);
        maxAmount = Number(maxAmount);
        if (money < minAmount) {
          this.$gutils.confirm({
            text: `您输入的金额小于最低存款金额${minAmount}`,
          });
          return;
        }
        if (money > maxAmount) {
          this.$gutils.confirm({
            text: `您输入的金额大于最高存款金额${maxAmount}`,
          });
          return;
        }
        this.curPaymentData = d;

        this.usdtRecharge(d);
        return;
      }

      let res = await this.$post("Pc.Recharge.goToPay", d);
      let { code } = res;
      if (code == 0) {
        this.successVisible = true;
        this.payPageURL = res.data.url;
      } else {
        this.$message.error(res.message);
        return;
      }
    },

    // 去支付页
    goToPayPage() {
      this.successVisible = false;
      if (this.payPageURL) {
        window.open(this.payPageURL);
      }
    },
  },
};
</script>


<style lang="scss"   >
.el-dialog__footer {
  text-align: center !important;
}
.usdt-recharge {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
  .text1 {
    line-height: 30px;
  }
  .qrcode-box {
    width: 400px;
    text-align: center;
    img {
      margin-top: 10px;
    }
  }
}

.mask-box {
  background-color: #fff;
  .mask-content {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #666;
    font-size: 12px;
    .btn {
      padding: 5px 10px;
      margin: 10px 0;
    }
  }
}
.online-box {
  .usdt {
    color: red;
    // line-height: 25px;
    // height: 25px;
  }
  .tips-1 {
    font-size: 12px;
    color: #666;
    margin-top: 5px;
    .btn {
      padding: 5px 10px;
    }
  }
  .username-box {
    display: flex;
    flex-direction: column;
  }
  .tips {
    margin: 10px 0;
    color: #999;
  }
  .text-primary {
    color: #ca151e;
  }
  .loading {
    color: #999;
    margin: 15px 0;
  }
  .is_Sel {
    border: 1px solid #ca151e !important;
    position: relative;
    .icon-dui {
      font-size: 9px;
      display: block;
      position: absolute;
      right: 0px;
      bottom: -1px;
      color: #fff;
      z-index: 10;
      font-weight: 600;
    }
    &::after {
      content: "";
      position: absolute;
      right: -1px;
      bottom: -1px;
      width: 0;
      height: 0;
      border-width: 0 0 24px 24px;
      border-style: solid;
      border-color: transparent transparent red;
    }
  }
  .paymentList {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    position: relative;
    .item {
      padding: 8px 20px;
      border: 1px dotted #ddd;
      margin-right: 15px;
      width: 200px;
      height: 24px;
    }
    .paymentList-item {
      border: 1px dashed #ccc;
      min-width: 350px;
      padding: 3px 10px;
      display: flex;
      align-items: center;
      margin-right: 10px;
      &.active {
        border: 1px solid #ea3146;
      }
      .paymentList-item-img-box {
        width: 50px;
        height: 50px;
        // img{
        //   width: 100%;
        //   height: 100%;
        // }
      }
      .text-box {
        margin-left: 10px;
        // height: 25px;
        line-height: 25px;
        color: #999;
      }
    }
  }

  .paymentList-15 {
    .tips {
      color: #666;
      .addr {
        display: flex;
        .btn {
          padding: 3px 8px;
          margin-left: 10px;
        }
      }
    }
  }

  .quickpayList {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
    position: relative;
    li {
      padding: 8px 20px;
      border: 1px dotted #ddd;
      margin-right: 15px;
      width: 120px;
    }
  }
  .tech01 {
    margin-bottom: 15px;
    .tech01-head {
      margin-bottom: 10px;
    }
  }
  .tech02 {
    margin-bottom: 15px;
    .tech02-head {
      margin-bottom: 15px;
    }
    .el-input {
      width: 240px;
    }
  }
}
</style>