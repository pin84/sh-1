<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      查看流水
    </div>
    <el-divider></el-divider>

    <div class="withdraw-box">
      <div class="search_content">
        <div class="tips" v-if="info_turnover.length > 0">
          自出款后第一次存款之后，总有效投注：{{
            this.info_turnover[0].totalEffectiveAmount
          }}（即所有产品有效投注额）
        </div>
        <div class="result_content">
          <el-row style="margin-bottom: 15px">
            <el-button @click="yxVisible = !yxVisible" type="success"
              >{{ !yxVisible ? "显示" : "隐藏" }}您的有效流水</el-button
            >
            <el-button @click="chVisible = !chVisible" type="primary"
              >{{ !chVisible ? "显示" : "隐藏" }}优惠流水审核</el-button
            >
            <el-button @click="gbVisible = !gbVisible" type="primary"
              >{{ !gbVisible ? "显示" : "隐藏" }}个别流水</el-button
            >
            <el-button @click="cpVisible = !cpVisible" type="primary"
              >{{ !cpVisible ? "显示" : "隐藏" }}彩票流水</el-button
            >
            <el-button @click="fbdVisible = !fbdVisible" type="primary"
              >{{ !fbdVisible ? "显示" : "隐藏" }}反波胆流水</el-button
            >
            <el-button @click="dzyxVisible = !dzyxVisible" type="primary"
              >{{ !dzyxVisible ? "显示" : "隐藏" }}电子游戏流水</el-button
            >
            <el-button @click="qpyxVisible = !qpyxVisible" type="primary"
              >{{ !qpyxVisible ? "显示" : "隐藏" }}棋牌游戏流水</el-button
            >
            <el-button
              @click="$router.push('/user/withdraw/withdraw_detail')"
              type="primary"
              >提款进度</el-button
            >
          </el-row>
          <el-table
            :data="info_turnover[0].financeWithdrawAuditList"
            border
            style="width: 100%"
            empty-text="没有符合查询条件的数据！"
            :header-cell-class-name="handlemyclass"
          >
            <!-- 流水 -->
            <el-table-column label="存款日期区间" width="180px">
              <template slot-scope="scope">
                <p>起始：{{ scope.row.beginTime }}</p>
                <p>结束：{{ scope.row.endTime }}</p>
              </template>
            </el-table-column>
            <el-table-column label="存款金额" width="">
              <template slot-scope="scope">
                <p>
                  {{ scope.row.rechargeAmount }}
                </p>
              </template>
            </el-table-column>
            <el-table-column label="存款优惠" width="">
              <template slot-scope="scope">
                <p>{{ scope.row.rebate }}</p>
              </template>
            </el-table-column>
            <el-table-column label="活动" width="">
              <template slot-scope="scope">
                <p>{{ scope.row.activityName }}</p>
              </template>
            </el-table-column>
            <el-table-column
              v-if="yxVisible && isCataShowList.length > 0"
              label="您的有效流水"
            >
              <el-table-column
                :label="item.fieldCn"
                width=""
                v-for="(item, index) in getisCataShowList"
                :key="index"
                :prop="item.fieldName"
              >
              </el-table-column>
            </el-table-column>

            <!-- 优惠流水审核 -->
            <el-table-column v-if="chVisible" label="优惠流水审核" width="">
              <el-table-column label="所需流水" width="">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.cHLimit }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="通过" width="">
                <template slot-scope="scope">
                  <p
                    :class="
                      scope.row.passRebateLimit == 1 ? 'text-green' : 'text-red'
                    "
                  >
                    {{ scope.row.passRebateLimit == 1 ? "通过" : "未通过" }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="综合所需流水" width="100px">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.cHLimit }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="是否达到" width="">
                <template slot-scope="scope">
                  <p
                    :class="
                      scope.row.passRebateLimit == 1 ? 'text-green' : 'text-red'
                    "
                  >
                    {{ scope.row.passRebateLimit == 1 ? "是" : "否" }}
                  </p>
                </template>
              </el-table-column>
            </el-table-column>

            <!-- 常态流水审核 -->
            <el-table-column label="常态流水审核" width="">
              <el-table-column label="所需流水 " width="">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.comLimit }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="放宽额度" width="">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.relaxLimit }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="通过 " width="">
                <template slot-scope="scope">
                  <p
                    :class="
                      scope.row.passComLimit == 1 ? 'text-green' : 'text-red'
                    "
                  >
                    {{ scope.row.passComLimit == 1 ? "通过" : "未通过" }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="需扣除行政费" width="100px">
                <template slot-scope="scope">
                  <p
                    :class="
                      (scope.row.addminCharge = 1 ? 'text-green' : 'text-red')
                    "
                  >
                    {{ (scope.row.addminCharge = 1 ? "是" : "否") }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="需扣除金额" width="">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.commDiff }}
                  </p>
                </template>
              </el-table-column>
            </el-table-column>

            <!-- 个别流水审核 -->
            <el-table-column v-if="gbVisible" label="个别流水审核" width="">
              <el-table-column label="类别" width="">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.shortName }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="所需流水  " width="">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.individualLimit }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="通过  " width="">
                <template slot-scope="scope">
                  <p
                    :class="
                      scope.row.passIndividualLimit == 1
                        ? 'text-green'
                        : 'text-red'
                    "
                  >
                    {{ scope.row.passIndividualLimit == 1 ? "通过" : "未通过" }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="差额" width="100px">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.individualDiff }}
                  </p>
                </template>
              </el-table-column>
            </el-table-column>

            <!-- 彩票流水审核 -->
            <el-table-column v-if="cpVisible" label="彩票流水审核" width="">
              <el-table-column label=" 所需流水" width="">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.cpLimit }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label=" 通过" width="">
                <template slot-scope="scope">
                  <p
                    :class="
                      scope.row.passCpLimit == 1 ? 'text-green' : 'text-red'
                    "
                  >
                    {{ scope.row.passCpLimit == 1 ? "通过" : "未通过" }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label=" 差额" width="100px">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.cpDiff }}
                  </p>
                </template>
              </el-table-column>
            </el-table-column>

            <!-- 反波胆流水审核 -->
            <el-table-column v-if="fbdVisible" label="反波胆流水审核" width="">
              <el-table-column label="  所需流水" width="">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.fbdLimit }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="  通过" width="">
                <template slot-scope="scope">
                  <p
                    :class="
                      scope.row.passFbdLimit == 1 ? 'text-green' : 'text-red'
                    "
                  >
                    {{ scope.row.passFbdLimit == 1 ? "通过" : "未通过" }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="  差额" width="100px">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.fbdDiff }}
                  </p>
                </template>
              </el-table-column>
            </el-table-column>

            <!-- 体育流水审核 -->
            <el-table-column label="体育流水审核" width="">
              <el-table-column label="   所需流水" width="">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.sportsLimit }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="   通过" width="">
                <template slot-scope="scope">
                  <p
                    :class="
                      scope.row.passSportsLimit == 1 ? 'text-green' : 'text-red'
                    "
                  >
                    {{ scope.row.passSportsLimit == 1 ? "通过" : "未通过" }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="   差额" width="100px">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.sportsDiff }}
                  </p>
                </template>
              </el-table-column>
            </el-table-column>

            <!-- 电子游戏流水审核 -->
            <el-table-column
              v-if="dzyxVisible"
              label="电子游戏流水审核"
              width=""
            >
              <el-table-column label="    所需流水" width="">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.electronicLimit }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="    通过" width="">
                <template slot-scope="scope">
                  <p
                    :class="
                      scope.row.passElectronicLimit == 1
                        ? 'text-green'
                        : 'text-red'
                    "
                  >
                    {{ scope.row.passElectronicLimit == 1 ? "通过" : "未通过" }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="    差额" width="100px">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.electronicDiff }}
                  </p>
                </template>
              </el-table-column>
            </el-table-column>

            <!-- 棋牌游戏流水审核 -->
            <el-table-column
              v-if="qpyxVisible"
              label="棋牌游戏流水审核"
              width=""
            >
              <el-table-column label="     所需流水" width="">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.chesscardLimit }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="     通过" width="">
                <template slot-scope="scope">
                  <p
                    :class="
                      scope.row.passChesscardLimit == 1
                        ? 'text-green'
                        : 'text-red'
                    "
                  >
                    {{ scope.row.passChesscardLimit == 1 ? "通过" : "未通过" }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="     差额" width="100px">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.chesscardDiff }}
                  </p>
                </template>
              </el-table-column>
            </el-table-column>

            <!-- 真人视频流水审核 -->
            <el-table-column label="真人视频流水审核" width="">
              <el-table-column label="      所需流水" width="">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.livesLimit }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="      通过" width="">
                <template slot-scope="scope">
                  <p
                    :class="
                      scope.row.passLivesLimit == 1 ? 'text-green' : 'text-red'
                    "
                  >
                    {{ scope.row.passLivesLimit == 1 ? "通过" : "未通过" }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="      差额" width="100px">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.livesDiff }}
                  </p>
                </template>
              </el-table-column>
            </el-table-column>

            <!-- 捕鱼游戏流水审核 -->
            <el-table-column label="捕鱼游戏流水审核" width="">
              <el-table-column label="       所需流水" width="">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.fishLimit }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="       通过" width="">
                <template slot-scope="scope">
                  <p
                    :class="
                      scope.row.passFishLimit == 1 ? 'text-green' : 'text-red'
                    "
                  >
                    {{ scope.row.passFishLimit == 1 ? "通过" : "未通过" }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="       差额" width="100px">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.fishDiff }}
                  </p>
                </template>
              </el-table-column>
            </el-table-column>

            <!-- 街机游戏流水审核 -->
            <el-table-column label="街机游戏流水审核" width="">
              <el-table-column label="       所需流水" width="">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.arcadeLimit }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="       通过" width="">
                <template slot-scope="scope">
                  <p
                    :class="
                      scope.row.passArcadeLimit == 1 ? 'text-green' : 'text-red'
                    "
                  >
                    {{ scope.row.passArcadeLimit == 1 ? "通过" : "未通过" }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="       差额" width="100px">
                <template slot-scope="scope">
                  <p>
                    {{ scope.row.arcadeDiff }}
                  </p>
                </template>
              </el-table-column>
            </el-table-column>

            <!-- 共扣除金额 -->
            <el-table-column label="共扣除金额" width="" prop="userState">
              <template slot-scope="scope">
                <p>
                  {{ scope.row.totalFee }}
                </p>
              </template>
            </el-table-column>
          </el-table>
          <div v-if="info_turnover.length > 0">
            <div
              class="bottom-tips"
              v-if="
                info_turnover[0].totalChLimit == 0 &&
                info_turnover[0].totalComLimit == 0
              "
            >
              <p>优惠流水审核：通过优惠流水审核！不需要扣除存款优惠！</p>
              <p>不需要流水审核%行政费：0</p>
              <p class="last">
                <span>优惠流水审核 + 常态性流水审核共需扣除：0</span>
              </p>
              <p>此次出款时间：{{ info_turnover[0].maxTime }}</p>
            </div>
            <div class="bottom-tips" v-else>
              <p>
                优惠流水审核：未通过优惠流水审核！需扣除优惠：{{
                  info_turnover[0].totalChLimit
                }}
              </p>
              <p>
                常态性流水审核：未通过常态性流水审核需扣除2%行政费：{{
                  info_turnover[0].totalComLimit
                }}
              </p>
              <p class="last">
                <span
                  >优惠流水审核 + 常态性流水审核共需扣除：{{
                    info_turnover[0].totalLimit
                  }}</span
                >
              </p>
              <p>此次出款时间：{{ info_turnover[0].maxTime }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
      info_turnover: [
        {
          financeWithdrawAuditList: [],
        },
      ],
      isCataShowList: [],
      yxVisible: true,
      chVisible: true,
      gbVisible: true,
      cpVisible: true,
      fbdVisible: true,
      dzyxVisible: true,
      qpyxVisible: true,
    };
  },
  computed: {
    getisCataShowList() {
      return this.isCataShowList[0].filter((item) => item.isVisible === 1);
    },
  },
  methods: {
    // 获取流水信息
    getAuditData() {
      this.$get("Pc.Withdraw.getAuditData").then((res) => {
        if (res.code == 0) {
          this.info_turnover = [];
          this.isCataShowList = [];
          this.info_turnover.push(res.data);
          this.isCataShowList.push(this.info_turnover[0].isCataShow);
          this.info_turnover = Object.assign([], this.info_turnover);

          console.log( '----',this.info_turnover);

          this.isCataShowList = Object.assign([], this.isCataShowList);
          console.log(this.isCataShowList);
          console.log(this.info_turnover);
        } else {
          return this.$message.error(res.message);
        }
      });
    },
    // 修改表头颜色
    handlemyclass: function (row) {
      // console.log(row);
      if (
        row.column.label == "存款日期区间" ||
        row.column.label == "存款金额" ||
        row.column.label == "存款优惠" ||
        row.column.label == "活动" ||
        row.column.label == "您的有效流水" ||
        row.column.label == "彩票" ||
        row.column.label == "电子" ||
        row.column.label == "棋牌" ||
        row.column.label == "体育" ||
        row.column.label == "电竞" ||
        row.column.label == "视讯" ||
        row.column.label == "反波胆" ||
        row.column.label == "捕鱼"
      ) {
        return "lightblue";
      } else if (
        row.column.label == "优惠流水审核" ||
        row.column.label == "所需流水" ||
        row.column.label == "是否达到" ||
        row.column.label == "通过" ||
        row.column.label == "综合所需流水"
      ) {
        return "lightred";
      } else if (
        row.column.label == "常态流水审核" ||
        row.column.label == "所需流水 " ||
        row.column.label == "放宽额度" ||
        row.column.label == "通过 " ||
        row.column.label == "需扣除行政费" ||
        row.column.label == "需扣除金额"
      ) {
        return "lightgreen";
      } else if (
        row.column.label == "个别流水审核" ||
        row.column.label == "所需流水  " ||
        row.column.label == "通过  " ||
        row.column.label == "差额" ||
        row.column.label == "类别"
      ) {
        return "lightpurplue";
      } else if (
        row.column.label == "彩票流水审核" ||
        row.column.label == " 所需流水" ||
        row.column.label == " 通过" ||
        row.column.label == " 差额"
      ) {
        return "c-BDF5FF";
      } else if (
        row.column.label == "反波胆流水审核" ||
        row.column.label == "  所需流水" ||
        row.column.label == "  通过" ||
        row.column.label == "  差额"
      ) {
        return "c-FFD4E0";
      } else if (
        row.column.label == "体育流水审核" ||
        row.column.label == "   所需流水" ||
        row.column.label == "   通过" ||
        row.column.label == "   差额"
      ) {
        return "c-FFEA80";
      } else if (
        row.column.label == "电子游戏流水审核" ||
        row.column.label == "    所需流水" ||
        row.column.label == "    通过" ||
        row.column.label == "    差额"
      ) {
        return "c-78E6EF";
      } else if (
        row.column.label == "棋牌游戏流水审核" ||
        row.column.label == "     所需流水" ||
        row.column.label == "     通过" ||
        row.column.label == "     差额"
      ) {
        return "c-BCFFB8";
      } else if (
        row.column.label == "真人视频流水审核" ||
        row.column.label == "      所需流水" ||
        row.column.label == "      通过" ||
        row.column.label == "      差额"
      ) {
        return "c-7FD2CE";
      } else if (
        row.column.label == "捕鱼游戏流水审核" ||
        row.column.label == "       所需流水" ||
        row.column.label == "       通过" ||
        row.column.label == "       差额"
      ) {
        return "c-FFBC3D";
      } else if (row.column.label == "共扣除金额") {
        return "blue";
      }
    },
  },
  created() {
    this.getAuditData(); //初始化流水详情信息
  },
};
</script>

<style lang="scss">
.withdraw-box {
  padding-bottom: 15px;
  .text-green {
    color: green;
  }
  .text-red {
    color: red;
  }
  .tips {
    display: inline-block;
    font-size: 12px;
    color: #999;
    margin-bottom: 15px;
  }
  .el-table {
    th .cell {
      padding: 0 4px;
    }
    th,
    td {
      text-align: center;
    }
    th.lightblue {
      background: #c5d9f1;
      color: #666;
    }
    th.lightred {
      background: #f2dcdb;
      color: #666;
    }
    th.lightgreen {
      background: #d8e4bc;
      color: #666;
    }
    th.lightpurplue {
      background: #dbbce4;
      color: #666;
    }
    th.blue {
      background: #c5d9f1;
      color: #666;
    }
    th.c-BDF5FF {
      background: #bdf5ff;
      color: #666;
    }
    th.c-FFD4E0 {
      background: #ffd4e0;
      color: #666;
    }
    th.c-FFEA80 {
      background: #ffea80;
      color: #666;
    }
    th.c-78E6EF {
      background: #78e6ef;
      color: #666;
    }
    th.c-BCFFB8 {
      background: #bcffb8;
      color: #666;
    }
    th.c-7FD2CE {
      background: #7fd2ce;
      color: #666;
    }
    th.c-FFBC3D {
      background: #ffbc3d;
      color: #666;
    }
  }
  .bottom-tips {
    margin: 15px 0;
    color: #999;
    p {
      margin-bottom: 10px;
    }
    p.last {
      span {
        display: inline-block;
        background: #ca151e;
        color: #fff;
        padding: 2px 4px;
        border-radius: 4px;
      }
    }
  }
}
</style>