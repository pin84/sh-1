<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">充值</div>
    <el-divider></el-divider>

    <div class="withdraw-box">
      <div class="search_content">
        <div class="result_content">
          <el-tabs
            type="border-card"
            @tab-click="handleClick"
            v-model="activeName"
            class="cz-box"
          >
            <el-tab-pane name="recentlyused">
              <span slot="label">
                <svg
                  style="fill: #ca151e; width: 20px; margin-right: 4px"
                  class="icon"
                  aria-hidden="true"
                >
                  <use xlink:href="#icon-chongzhi"></use>
                </svg>
                我最常用</span
              >
              <div class="recently-used">
                <div class="used-tips">
                  选择一个最近使用的支付通道：<span class="text-red"
                    >（充值提交成功后5分钟未到账，请联系客服<el-button
                      @click="openkefu()"
                      style="margin: 0 10px"
                      size="mini"
                      type="primary"
                      >联系客服</el-button
                    >）</span
                  >
                </div>
                <ul>
                  <li
                    v-for="item in info.recentlyList.onlineRecharge"
                    :key="item.bankId"
                    @click="goToOnlineTransfer(item)"
                  >
                    <span v-if="item.card_type == 'weixin'">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-weixin_2"></use>
                      </svg>
                    </span>
                    <span v-if="item.card_type == 'zhifubao'">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zhifubao"></use>
                      </svg>
                    </span>
                    <span v-if="item.card_type == 'yunshanfu'">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-yunshanfu"></use>
                      </svg>
                    </span>
                    <span v-if="item.card_type == 'quickpay'">
                      <svg
                        style="fill: #ca151e"
                        class="icon"
                        aria-hidden="true"
                      >
                        <use xlink:href="#icon-quickpay"></use>
                      </svg>
                    </span>
                    <span v-if="item.card_type == 'bank_b2c'">
                      <svg
                        style="fill: #ca151e"
                        class="icon"
                        aria-hidden="true"
                      >
                        <use xlink:href="#icon-bank_b2c"></use>
                      </svg>
                    </span>

                    {{ item.alias }}
                  </li>
                  <li
                    v-for="item in info.recentlyList.offlineRecharge"
                    :key="item.index"
                    @click="goToOfflineTransfer(item)"
                  >
                    <svg
                      style="width: 40px; vertical-align: 6px"
                      class="icon"
                      aria-hiden="true"
                    >
                      <use xlink:href="#icon-bank_b2c1"></use>
                    </svg>

                    <div style="display: inline-block">
                      <p>{{ item.bankName }}</p>
                      <p>{{ item.holders }}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane name="cardtransfer">
              <span slot="label">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-yinhangqiaguanli"></use>
                </svg>
                银行卡转账</span
              >
              <card-transfer
                ref="cardtransfer"
                :bankId="curBankId"
                :bankDepositIdStr="curBankDepositIdStr"
                @getchildrendata="local_getOfflinePayments"
              ></card-transfer>
            </el-tab-pane>

            <!-- 在线充值 -->
            <el-tab-pane
              v-for="item in userOnlineDepositsCardTypes"
              :key="item.index"
              :name="item.card_type"
              :label="item.card_type_cn"
            >
              <span v-if="item.card_type == 'weixin'" slot="label">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-weixin_2"></use>
                </svg>
                微信
              </span>
              <span v-if="item.card_type == 'zhifubao'" slot="label">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-zhifubao"></use>
                </svg>
                支付宝
              </span>
              <span v-if="item.card_type == 'yunshanfu'" slot="label">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-yunshanfu"></use>
                </svg>
                云闪付
              </span>
              <span v-if="item.card_type == 'quickpay'" slot="label">
                <svg style="fill: #ca151e" class="icon" aria-hidden="true">
                  <use xlink:href="#icon-quickpay"></use>
                </svg>
                快捷支付
              </span>
              <span v-if="item.card_type == 'bank_b2c'" slot="label">
                <svg style="fill: #ca151e" class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bank_b2c"></use>
                </svg>
                在线支付
              </span>

              <onlineTransfer
                ref="onlinetransfer"
                :cardTypeId="item.card_type_id"
                :cardTypeName="item.card_type"
                :isonline="item.isonline"
                :bankDepositIdStr="curBankDepositIdStr"
              ></onlineTransfer>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cardTransfer from "./cardTransfer";
import onlineTransfer from "./onlineTransfer";
export default {
  data() {
    return {
      info: {
        recentlyList: [],
      },
      rechargeList: {},
      activeName: "recentlyused",
      curBankId: "",
      curBankDepositIdStr: "",
      userOnlineDepositsCardTypes: [],
      localUserBankDepositLists: "",
    };
  },
  components: {
    cardTransfer,
    onlineTransfer,
  },
  watch: {
    localUserBankDepositLists: function () {
      var _this = this;
      _this.$nextTick(function () {
        if (this.localUserBankDepositLists.userBankDepositLists.length > 0) {
          this.localUserBankDepositLists.userBankDepositLists.forEach(
            (item, index) => {
              if (item.id == this.curBankId) {
                this.$refs.cardtransfer.showCardDetail(item, index);
              }
            }
          );
        }
      });
    },
  },
  methods: {
    // 打开客服链接
    openkefu() {
      let url = this.rechargeList.kefuUrl;
      window.open(url, "_blank"); // 新窗口打开外链接
    },

    local_getOfflinePayments(data) {
      this.localUserBankDepositLists = data;
    },

    // tab切换
    handleClick(tab, event) {
      if (tab.name == "cardtransfer") {
        this.$refs.cardtransfer.getOfflinePayments();
      } else if (tab.name !== "recentlyused" && tab.name !== "cardtransfer") {
        this.$refs.onlinetransfer.forEach((item, index) => {
          if (item.cardTypeName == tab.name) {
            this.$refs.onlinetransfer[index].getPaymentProvider();
          }
        });
      }
    },

    // 跳转银行卡转账
    goToOfflineTransfer(v) {
      this.activeName = "cardtransfer";
      this.curBankId = v.bankId;

      this.$refs.cardtransfer.getOfflinePayments();
      if (this.localUserBankDepositLists.userBankDepositLists.length > 0) {
        this.localUserBankDepositLists.userBankDepositLists.forEach(
          (item, index) => {
            if (item.id == v.bankId) {
              this.$refs.cardtransfer.showCardDetail(item, index);
            }
          }
        );
      }
    },

    // 跳转线上转账
    goToOnlineTransfer(v) {
      this.activeName = v.card_type;
      this.$refs.onlinetransfer.forEach((item, index) => {
        if (item.cardTypeName == v.card_type) {
          this.$refs.onlinetransfer[index].getPaymentProvider();
        }
      });
      //  console.log(v);
    },
    // 获取充值列表
    onsearch_rechargeList() {
      this.$get("Pc.Recharge.getRechargeTypeList").then((res) => {
        if (res.code == 0) {
          this.rechargeList = res.data;
          //   最近使用
          this.info.recentlyList = res.data.recentlyUsed;
          this.curBankDepositIdStr = res.data.bankDepositIdStr;
          this.userOnlineDepositsCardTypes =
            res.data.userOnlineDepositsCardTypes;
        } else {
          this.$message.error(res.message);
          if (res.code == -6005) {
            setTimeout(() => {
              this.$router.push("/user/bank_manage");
            }, 1000);
          }
          return;
        }
      });
    },
  },
  created() {
    this.onsearch_rechargeList();
  },
};
</script>

<style lang="scss">
.cz-box {
  &.el-tabs--border-card {
    box-shadow: none;
  }
  .el-tabs__content {
    padding: 15px;
  }
  svg {
    width: 24px;
    height: 24px;
    vertical-align: -5px;
  }
}
.recently-used {
  ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 60px;
    li {
      padding: 8px 20px;
      border: 1px dotted #ddd;
      margin-right: 15px;
      width: 120px;
      height: 40px;
    }
  }
}
.used-tips {
  margin: 10px 0;
}
</style>