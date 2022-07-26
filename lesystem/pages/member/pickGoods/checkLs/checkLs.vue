<template>
  <view class="page-body">
    <block v-if="loadingType == 'noMore'">
      <view class="content-box">
        <block v-if="recordList.length">
          <view class="top ns-bg-color-gray">
            <view class="top_left">
              余额：<text class="ns-text-color">¥{{ balance }}</text>
            </view>
            <view class="top_right">
              <text class="iconfont iconbangzhu1 ns-text-color"></text>
              <text>本次提现流水详情如是下：</text>
            </view>
          </view>
          <view class="list">
            <view class="item" v-for="(item, index) in recordList" :key="index">
              <view class="info" @click="showMore(index)">
                <view class="left">
                  <view>
                    时间区间：<text class="time_size"
                      >{{ item.beginTime }}~{{ item.endTime }}</text
                    >
                  </view>
                  <view class="info_b">
                    <view class="info_b_grow">
                      <view> 资金类型：{{ item.auditName }} </view>
                      <view> 存款优惠：{{ item.rebate }} </view>
                    </view>
                    <view class="info_b_grow">
                      <view> 金额：{{ item.rechargeAmount }} </view>
                      <view> 会员总有效流水：{{ totalEffectiveAmount }} </view>
                    </view>
                  </view>
                </view>
                <view class="right">
                  <text class="iconfont iconxiangyou"></text>
                </view>
              </view>
              <block v-if="item.showMore">
                <view class="detail ns-bg-color-gray">
                  <view class="detail_t">
                    <text class="detail_t_left">会员有效流水</text>
                  </view>
                  <view class="detail_b" style="flex-wrap: wrap">
                    <view
                      style="width: 50%"
                      class=""
                      v-for="ite in getisCataShowList"
                      :key="ite.index"
                    >
                      {{ ite.fieldCn }}：{{ item[ite.fieldName] }}
                    </view>
                  </view>
                </view>
                <view class="detail ns-bg-color-gray">
                  <view class="detail_t">
                    <text class="detail_t_left">优惠流水审核</text>
                    <text
                      :class="
                        item.passRebateLimit == '通过'
                          ? 'success'
                          : 'ns-text-color'
                      "
                      >{{ item.passRebateLimit }}</text
                    >
                  </view>
                  <view class="detail_b">
                    <view class="left">
                      <view class="">
                        已达流水：{{ item.mallEffectiveAmount }}
                      </view>
                      <view class=""> 差额：{{ item.chDiff }} </view>
                    </view>
                    <view class="right">
                      <view class=""> 综合需流水：{{ item.cHLimit }} </view>
                      <view class="">
                        是否达到：
                        <text
                          :class="item.chDiff > 0 ? 'ns-text-color' : 'success'"
                          >{{ item.chDiffTF }}</text
                        >
                      </view>
                    </view>
                  </view>
                </view>
              </block>
              <view class="detail ns-bg-color-gray">
                <view class="detail_t">
                  <text class="detail_t_left">常态流水审核</text>
                  <text
                    :class="
                      item.passComLimit == '通过' ? 'success' : 'ns-text-color'
                    "
                    >{{ item.passComLimit }}</text
                  >
                </view>
                <view class="detail_b">
                  <view class="left">
                    <view class=""> 所需流水：{{ item.comLimit }} </view>
                    <view class="">
                      需扣除行政费：{{ item.addminCharge }}
                    </view>
                  </view>
                  <view class="right">
                    <view class=""> 放开额度：{{ item.relaxLimit }} </view>
                    <view class=""> 差额：{{ item.commDiff }} </view>
                  </view>
                </view>
              </view>
              <view class="detail ns-bg-color-gray" v-if="item.showMore">
                <view class="detail_t">
                  <text class="detail_t_left">个别流水审核</text>
                  <text
                    :class="
                      item.passIndividualLimit == '通过'
                        ? 'success'
                        : 'ns-text-color'
                    "
                    >{{ item.passIndividualLimit }}</text
                  >
                </view>
                <view class="detail_b" style="flex-wrap: wrap">
                  <view style="width: 50%"> 类别：{{ item.shortName }} </view>
                  <view style="width: 50%">
                    所需流水：{{ item.individualLimit }}
                  </view>
                  <view style="width: 50%">
                    差额：{{ item.individualDiff }}
                  </view>
                </view>
              </view>
              <!-- 彩票流水审核 -->
              <view class="detail ns-bg-color-gray" v-if="item.showMore">
                <view class="detail_t">
                  <text class="detail_t_left">彩票流水审核</text>
                  <text
                    :class="
                      item.passCpLimit == '通过' ? 'success' : 'ns-text-color'
                    "
                    >{{ item.passCpLimit }}</text
                  >
                </view>
                <view class="detail_b" style="flex-wrap: wrap">
                  <view style="width: 50%"> 所需流水：{{ item.cpLimit }} </view>
                  <view style="width: 50%"> 差额：{{ item.cpDiff }} </view>
                </view>
              </view>
              <!-- 反波胆流水审核 -->
              <view class="detail ns-bg-color-gray" v-if="item.showMore">
                <view class="detail_t">
                  <text class="detail_t_left">反波胆流水审核</text>
                  <text
                    :class="
                      item.passFbdLimit == '通过' ? 'success' : 'ns-text-color'
                    "
                    >{{ item.passFbdLimit }}</text
                  >
                </view>
                <view class="detail_b" style="flex-wrap: wrap">
                  <view style="width: 50%">
                    所需流水：{{ item.fbdLimit }}
                  </view>
                  <view style="width: 50%"> 差额：{{ item.fbdDiff }} </view>
                </view>
              </view>
              <!-- 体育流水审核 -->
              <view class="detail ns-bg-color-gray" v-if="item.showMore">
                <view class="detail_t">
                  <text class="detail_t_left">体育流水审核</text>
                  <text
                    :class="
                      item.passSportsLimit == '通过'
                        ? 'success'
                        : 'ns-text-color'
                    "
                    >{{ item.passSportsLimit }}</text
                  >
                </view>
                <view class="detail_b" style="flex-wrap: wrap">
                  <view style="width: 50%">
                    所需流水：{{ item.sportsLimit }}
                  </view>
                  <view style="width: 50%"> 差额：{{ item.sportsDiff }} </view>
                </view>
              </view>
              <!-- 电子游戏流水审核 -->
              <view class="detail ns-bg-color-gray" v-if="item.showMore">
                <view class="detail_t">
                  <text class="detail_t_left">电子游戏流水审核</text>
                  <text
                    :class="
                      item.passElectronicLimit == '通过'
                        ? 'success'
                        : 'ns-text-color'
                    "
                    >{{ item.passElectronicLimit }}</text
                  >
                </view>
                <view class="detail_b" style="flex-wrap: wrap">
                  <view style="width: 50%">
                    所需流水：{{ item.electronicLimit }}
                  </view>
                  <view style="width: 50%">
                    差额：{{ item.electronicDiff }}
                  </view>
                </view>
              </view>
              <!-- 棋牌游戏流水审核 -->
              <view class="detail ns-bg-color-gray" v-if="item.showMore">
                <view class="detail_t">
                  <text class="detail_t_left">棋牌游戏流水审核</text>
                  <text
                    :class="
                      item.passChesscardLimit == '通过'
                        ? 'success'
                        : 'ns-text-color'
                    "
                    >{{ item.passChesscardLimit }}</text
                  >
                </view>
                <view class="detail_b" style="flex-wrap: wrap">
                  <view style="width: 50%">
                    所需流水：{{ item.chesscardLimit }}
                  </view>
                  <view style="width: 50%">
                    差额：{{ item.chesscardDiff }}
                  </view>
                </view>
              </view>
              <!-- 真人视频流水审核 -->
              <view class="detail ns-bg-color-gray" v-if="item.showMore">
                <view class="detail_t">
                  <text class="detail_t_left">真人视频流水审核</text>
                  <text
                    :class="
                      item.passLivesLimit == '通过'
                        ? 'success'
                        : 'ns-text-color'
                    "
                    >{{ item.passLivesLimit }}</text
                  >
                </view>
                <view class="detail_b" style="flex-wrap: wrap">
                  <view style="width: 50%">
                    所需流水：{{ item.livesLimit }}
                  </view>
                  <view style="width: 50%"> 差额：{{ item.livesDiff }} </view>
                </view>
              </view>
              <!-- 捕鱼游戏流水审核 -->
              <view class="detail ns-bg-color-gray" v-if="item.showMore">
                <view class="detail_t">
                  <text class="detail_t_left">捕鱼游戏流水审核</text>
                  <text
                    :class="
                      item.passFishLimit == '通过' ? 'success' : 'ns-text-color'
                    "
                    >{{ item.passFishLimit }}</text
                  >
                </view>
                <view class="detail_b" style="flex-wrap: wrap">
                  <view style="width: 50%">
                    所需流水：{{ item.fishLimit }}
                  </view>
                  <view style="width: 50%"> 差额：{{ item.fishDiff }} </view>
                </view>
              </view>
              <!-- 街机游戏流水审核 -->
              <view class="detail ns-bg-color-gray" v-if="item.showMore">
                <view class="detail_t">
                  <text class="detail_t_left">捕鱼游戏流水审核</text>
                  <text
                    :class="
                      item.passArcadeLimit == '通过' ? 'success' : 'ns-text-color'
                    "
                    >{{ item.passArcadeLimit }}</text
                  >
                </view>
                <view class="detail_b" style="flex-wrap: wrap">
                  <view style="width: 50%">
                    所需流水：{{ item.arcadeLimit }}
                  </view>
                  <view style="width: 50%"> 差额：{{ item.arcadeDiff }} </view>
                </view>
              </view>
            </view>
          </view>
          <view class="tip">
            <view class="ns-text-color">温馨提示</view>
            <view v-if="totalChLimit == 0">
              优惠流水审核：通过优惠流水审核！不需要扣除存款优惠！
            </view>
            <view v-else>
              优惠流水审核：未通过优惠流水审核！需要扣除优惠：{{ totalChLimit }}
            </view>
            <view v-if="totalComLimit == 0">
              常态性流水审核：不需要流水审核
            </view>
            <view v-else>
              常态性流水审核：未通过常态性流水审核{{ admin_fee }}%行政费：{{
                totalComLimit
              }}
            </view>
            <view>
              优惠流水审核+常态性流水审核共需扣除：<text
                class="ns-text-color"
                >{{ totalLimit }}</text
              >
            </view>
            <view v-if="needFee == 1">
              手续费：{{ outMoneyFeeRate }}% 最高：{{ maxOutMoneyFee }}
            </view>
            <view> 此次出款时间为：{{ maxTime }} </view>
          </view>
        </block>
        <block v-else>
          <view class="list noItem">
            <view class="noItem_textAlign">
              <text class="iconfont iconiconfontzhizuobiaozhun023132"></text>
            </view>
            <view class="noItem_textAlign">
              <text>暂无充值记录！</text>
            </view>
          </view>
        </block>
      </view>
    </block>
    <uni-load-more
      v-if="loadingType == 'loading'"
      :status="loadingType"
      :contentText="contentText"
    ></uni-load-more>
  </view>
</template>

<script>
import http from "common/js/http.js";
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
export default {
  components: {
    uniLoadMore,
  },
  data() {
    return {
      loadingType: "loading",
      contentText: {
        contentrefresh: "正在加载...",
        contentnomore: "",
      },
      balance: "",
      recordList: [
        {
          beginTime: "",
          endTime: "",
          auditName: "",
          rebate: "",
          rechargeAmount: "",
          mallEffectiveAmount: "",
          showMore: "",
          passComLimit: "",
          comLimit: "",
          addminCharge: "",
          relaxLimit: "",
          commDiff: "",
          passRebateLimit: "",
          chDiff: "",
          cHLimit: "",
          chDiffTF: "",
          showMore: "",
          lotteryEffectiveAmount: "",
          electronicGamesEffectiveAmount: "",
          cardchessEffectiveAmount: "",
          sportsEffectiveAmount: "",
          electronicSportsEffectiveAmoun: "",
          liveEffectiveAmount: "",
          fanbodanEffectiveAmount: "",
          fishEffectiveAmount: "",
          individualLimit: "",
          passIndividualLimit: "",
          individualDiff: "",
          shortName: "",
          // add 20210719
          cpLimit: "",
          passCpLimit: "",
          cpDiff: "",
          passFbdLimit: "",
          fbdLimit: "",
          fbdDiff: "",
          passSportsLimit: "",
          sportsLimit: "",
          sportsDiff: "",
          passElectronicLimit: "",
          electronicLimit: "",
          electronicDiff: "",
          passChesscardLimit: "",
          chesscardDiff: "",
          chesscardLimit: "",
          passLivesLimit: "",
          livesLimit: "",
          livesDiff: "",
          passFishLimit: "",
          fishDiff: "",
          fishLimit: "",
        },
      ],
      totalChLimit: "",
      totalComLimit: "",
      admin_fee: "",
      totalLimit: "",
      maxTime: "",
      needFee: "",
      outMoneyFeeRate: "",
      maxOutMoneyFee: "",
      isCataShowList: "",
    };
  },
  computed: {
    getisCataShowList() {
      return this.isCataShowList.filter((item) => item.isVisible === 1);
    },
  },
  methods: {
    getAuditData() {
      this.sendRequest({
        url: "System.Withdraw.getAuditData",
        data: {},
        success: (res) => {
          if (res.code == 0) {
            this.recordList = [];
            this.balance = res.data.balance;
            this.totalChLimit = res.data.totalChLimit;
            this.totalComLimit = res.data.totalComLimit;
            this.admin_fee = res.data.admin_fee;
            this.totalLimit = res.data.totalLimit;
            this.maxTime = res.data.maxTime;
            this.needFee = res.data.needFee;
            this.outMoneyFeeRate = res.data.outMoneyFeeRate;
            this.maxOutMoneyFee = res.data.maxOutMoneyFee;
            this.isCataShowList = res.data.isCataShow;
            this.totalEffectiveAmount = res.data.totalEffectiveAmount;
            Object.keys(res.data.financeWithdrawAuditList).forEach((key) => {
              let item = res.data.financeWithdrawAuditList[key];
              this.recordList.push({
                arcadeDiff:item.arcadeDiff,
                passArcadeLimit:item.passArcadeLimit == 0 ? "未通过" : "通过",
                arcadeLimit:item.arcadeLimit,
                beginTime: item.beginTime,
                endTime: item.endTime,
                auditName: item.auditName,
                rebate: item.rebate,
                rechargeAmount: item.rechargeAmount,
                mallEffectiveAmount: item.mallEffectiveAmount,
                passComLimit: item.passComLimit == 0 ? "未通过" : "通过",
                comLimit: item.comLimit,
                addminCharge:
                  item.addminCharge == undefined ? "" : item.addminCharge,
                relaxLimit: item.relaxLimit,
                commDiff: item.commDiff,
                passRebateLimit: item.passRebateLimit == 0 ? "未通过" : "通过",
                chDiff: item.chDiff,
                cHLimit: item.cHLimit,
                chDiffTF: item.chDiff > 0 ? "否" : "是",
                showMore: false,
                lotteryEffectiveAmount: item.lotteryEffectiveAmount,
                electronicGamesEffectiveAmount:
                  item.electronicGamesEffectiveAmount,
                cardchessEffectiveAmount: item.cardchessEffectiveAmount,
                sportsEffectiveAmount: item.sportsEffectiveAmount,
                electronicSportsEffectiveAmoun:
                  item.electronicSportsEffectiveAmoun,
                liveEffectiveAmount: item.liveEffectiveAmount,
                fanbodanEffectiveAmount: item.fanbodanEffectiveAmount,
                fishEffectiveAmount: item.fishEffectiveAmount,
                individualLimit: item.individualLimit,
                passIndividualLimit:
                  item.passIndividualLimit == 0 ? "未通过" : "通过",
                individualDiff: item.individualDiff,
                shortName: item.shortName,
                cpLimit: item.cpLimit,
                passCpLimit: item.passCpLimit == 0 ? "未通过" : "通过",
                cpDiff: item.cpDiff,
                passFbdLimit: item.passFbdLimit == 0 ? "未通过" : "通过",
                fbdLimit: item.fbdLimit,
                fbdDiff: item.fbdDiff,
                passSportsLimit: item.passSportsLimit == 0 ? "未通过" : "通过",
                sportsLimit: item.sportsLimit,
                sportsDiff: item.sportsDiff,
                passElectronicLimit:
                  item.passElectronicLimit == 0 ? "未通过" : "通过",
                electronicLimit: item.electronicLimit,
                electronicDiff: item.electronicDiff,
                passChesscardLimit:
                  item.passChesscardLimit == 0 ? "未通过" : "通过",
                chesscardDiff: item.chesscardDiff,
                chesscardLimit: item.chesscardLimit,
                passLivesLimit: item.passLivesLimit == 0 ? "未通过" : "通过",
                livesDiff: item.livesDiff,
                livesLimit: item.livesLimit,
                passFishLimit: item.passFishLimit == 0 ? "未通过" : "通过",
                fishDiff: item.fishDiff,
                fishLimit: item.fishLimit,
              });
            });

            console.log('==========', this.recordList);
            this.loadingType = "noMore";
          }
        },
      });
    },
    showMore(i) {
      this.recordList[i].showMore = !this.recordList[i].showMore;
    },
  },
  onLoad() {
    this.getAuditData();
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

  .content-box {
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx;

      .top_left {
        flex: 1;
      }

      .top_right {
        display: flex;
        align-items: center;
      }
    }

    .list {
      .item {
        padding: 20rpx;
        background-color: white;
        margin-bottom: 20rpx;

        .info {
          display: flex;
          align-items: center;

          .left {
            flex-grow: 1;

            .time_size {
              font-size: 26rpx;
            }

            .info_b {
              display: flex;

              .info_b_grow {
                width: 50%;
              }
            }
          }
        }

        .detail {
          padding: 20rpx 20rpx 0;

          .detail_t {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .detail_t_left {
              font-weight: 700;
            }
          }

          .detail_b {
            display: flex;

            .left,
            .right {
              width: 50%;
            }
          }
        }

        .detail:last-child {
          padding-bottom: 20rpx;
        }
      }
    }

    .noItem {
      .noItem_textAlign {
        text-align: center;
      }

      .noItem_textAlign:nth-child(1) {
        padding: 160rpx 0 20rpx;

        .iconfont {
          font-size: 70rpx;
        }
      }
    }

    .tip {
      padding: 0 20rpx;
    }
  }

  .success {
    color: #4caf50;
  }
}
</style>
