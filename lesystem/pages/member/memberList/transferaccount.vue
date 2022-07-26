<template>
  <view class="ts">
    <view class="cu-form-group">
      <view class="title">用户账户：</view>
      {{ username }}
    </view>
    <view class="cu-form-group">
      <view class="title">您的余额：</view>
      {{ balance }}
    </view>
    <view class="cu-form-group">
      <view class="title">充值类型：</view>
      <view class="radio-box">
        <radio-group @change="radioChange">
          <label
            class="uni-list-cell uni-list-cell-pd"
            v-for="(val, index) in rechargeType"
            :key="index"
          >
            <view>
              <radio
                style="transform: scale(0.7)"
                :value="val"
                :checked="index === current"
              />
            </view>
            <view>{{ val }}</view>
          </label>
        </radio-group>
      </view>
    </view>

    <view class="cu-form-group margin-top">
      <view class="title">充值金额：</view>
      <input
        type="number"
        v-model="amount"
        class="uni-input"
        @input="inputMoney"
        min="0"
        max="99999999999"
      />
    </view>
    <view class="cu-form-group margin-top">
      <view class="title">取款密码：</view>
      <input
        placeholder=""
        type="password"
        name="input"
        v-model="withdrawalPwd"
      />
    </view>
    <view class="cu-form-group margin-top">
      <view class="title">取款密码：</view>
      <textarea
        v-model="remark"
        class="textarea"
        maxlength="200"
        @input="inputRemark"
      />
    </view>

    <button @click="submit" class="btn cu-btn bg-red margin-tb-sm lg">
      下一步
    </button>
  </view>
</template>

<script>
import MyNumberInput from "@/pages/gamesIm/common/input/MyNumberInput.vue";
export default {
  data() {
    return {
      username: "",
      balance: 0,
      option: {},
      amount: "",
      withdrawalPwd: "",
      remark: "",
      transType: "",
      current: 0,
      rechargeType: [],
    };
  },

  components: {
    MyNumberInput,
  },

  onLoad: function (option) {
    console.log("onload--", option);
    this.option = option;
    this.initData();
  },

  //  this.inputNum = this.$util.moneyNumHandler(this.inputNum);
  methods: {
    async submit() {
      let flag = await this.$util.showConfirm({
        content: `确定转账【${this.amount}】元，给下级【${this.username}】吗？`,
      });

      if (!flag) return;

      let d = {
        url: "System.Recharge.leaderRecharge",
        data: {
          accountId: this.option.accountId,
          amount: this.amount,
          withdrawalPwd: this.withdrawalPwd,
          transType: this.transType,
          remark: this.remark,
        },
      };
      let res = await this.$http(d);
      await this.$util.showConfirm({
        content: res.message,
        showCancel: false,
      });

      if (res.code >= 0) {
        uni.navigateTo({
          url: "/pages/member/memberList/index",
        });
      }
    },
    inputRemark() {
      let len = this.remark.length;
      if (len >= 200) {
        this.$util.showConfirm({
          content: "备注最多只能输入200个字符",
          showCancel: false,
        });
      }
    },
    inputMoney(e) {
      let num = e.detail.value;
      if (!num) {
        num = "0";
      }
      let str = num.replace(/[^\d.]/g, "");
      setTimeout(async () => {
        this.amount = Number(str);
        if (this.amount > this.balance) {
          await this.$util.showConfirm({
            content: "余额不足",
            showCancel: false,
          });
          this.amount = this.balance;
        }
      }, 10);
    },
    async initData() {
      let d = {
        url: "System.Agent.getTransferAccountInfo",
        data: {
          accountId: this.option.accountId,
        },
      };
      let res = await this.$http(d);
      let { rechargeType, balance, username, isSetCoinPwd } = res.data;
      // isSetCoinPwd = 0
      if (isSetCoinPwd == 0) {
        let page = getCurrentPages()
        let {fullPath} =page[0].__page__
        await this.$util.showConfirm({
          content: "请先设定资金密码",
          showCancel: false,
        });

        uni.navigateTo({
          url: `/pages/member/editPassword/edit/edit?tabType=1&fullPath=${fullPath}`,
        });
        
      }

      console.log(res);
      this.rechargeType = Object.values(rechargeType);
      this.balance = balance;
      this.username = username;
      this.transType = this.rechargeType[0];
    },
    radioChange(e) {
      this.transType = e.detail.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.ts {
  .cu-form-group {
    display: flex;
    justify-content: start;
    .radio-box {
      radio-group {
        display: flex;
      }
      .uni-list-cell::after {
        display: none;
      }
    }
    .textarea {
      border: 1px solid #f1f1f1;
      padding: 10rpx;
    }
  }
  .btn {
    width: 90vw;
  }
}
</style>