<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">提现</div>
    <el-divider></el-divider>
    <div class="withdraw-box">
      <el-row>
        <el-col :span="16">
          <el-form ref="form" :model="info" label-width="140px">
            <el-form-item label="可提款金额（元）">
              <span class="num">{{ info_data.account }}</span>
            </el-form-item>
            <el-form-item label="手续费（元）">
         
              <span class="num" >{{ tixianCharges }}</span>

            </el-form-item>

            <div class="select-type-box">
              <el-radio-group v-model="radio" @change="changeRadio">
                <el-radio class="radio" label="1">银行卡提现</el-radio>
                <el-radio class="radio" label="2">USDT提现</el-radio>
              </el-radio-group>
            </div>

            <div v-if="false" class="select-type-box">
              <p v-if="radio == 1">
                提款银行卡，您还未绑定任何银行卡
                <span
                  @click="$router.push('/user/bank_manage')"
                  class="pointer"
                  style="color: blue"
                  >去绑定</span
                >
              </p>
              <p v-else>
                提款USDT，您还未绑定任何USDT地址
                <span
                  @click="$router.push('/user/usdtAddr')"
                  class="pointer"
                  style="color: blue"
                  >去绑定</span
                >
              </p>
            </div>

            <div v-else>
              <el-form-item v-if="radio == 1" label="提款银行卡">
                <a
                  v-for="(item, index) in bank_list_data"
                  :key="index"
                  class="bank_box"
                  :class="{ is_Sel: issel_index === index }"
                  @click="sel_bank(item, index)"
                >
                  <b class="bank-icon" :class="item.logo"></b>
                  <span>{{ item.carOwner }}</span>
                  <span>{{ item.account }}</span>
                  <i class="iconfont icon-dui"></i>
                </a>
              </el-form-item>
              <div v-if="radio == 2">
                <el-form-item label="USDT地址">
                  <el-select
                    style="width: 233px"
                    v-model="info.open_bank"
                    placeholder="请选择"
                    @change="changeUSDT"
                  >
                    <el-option
                      v-for="item in bank_list_data"
                      :key="item.usdtAddress"
                      :label="item.usdtAddress"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>

              <el-form-item label="提款金额">
                <el-input
                  v-model="info.withdraw"
                  @change="get_money"
                  @input="countUSDT"
                  @keyup.native="proving"
                ></el-input>

                <!-- <MyInput  v-model="info.withdraw" @input="countUSDT" @change="get_money" /> -->

                <span v-if="info_data.defaultWithdrawSetting" class="tips"
                  >单次提现金额：下限{{
                    info_data.defaultWithdrawSetting.lower_limit
                  }}元 ~ 上限{{
                    info_data.defaultWithdrawSetting.upper_limit
                  }}元</span
                >
                <div v-if="radio == 2 && rate && usdtNumber" class="tips1">
                  ≈{{ usdtNumber }}USDT 当前汇率：{{ rate }}CNY/USDT
                </div>
              </el-form-item>

              <el-form-item label="资金密码">
                <el-input
                  type="text"
                  autocomplete="off"
                  onfocus="this.type='password'"
                  v-model="info.zjpassword"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onSubmit">提交申请</el-button>
                <el-button
                  type="primary"
                  @click="$router.push('/user/withdraw/withdraw_detail')"
                  >查看提款进度</el-button
                >
                <el-button
                  type="primary"
                  @click="$router.push('/user/withdraw/withdraw_turnover')"
                  >查看流水</el-button
                >
              </el-form-item>
            </div>
          </el-form>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="16">
          <table class="info_table">
            <colgroup>
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
              <col width="25%" />
            </colgroup>
            <tr>
              <td>账户总余额</td>
              <td>{{ info_data.account }}</td>
              <td>提现时间</td>
              <td>
                {{
                  info_data.tixianTime == "" ? "24小时" : info_data.tixianTime
                }}
              </td>
            </tr>
            <tr>
              <td>当日最大出款金额</td>
              <td>
                <span v-if="info_data.defaultWithdrawSetting">{{
                  info_data.defaultWithdrawSetting.day_limit
                }}</span>
              </td>
              <td>今日已提次数</td>
              <td>{{ info_data.applyTimes }}次</td>
            </tr>
            <tr>
              <td>每日免手续费次数</td>
              <td colspan="3">{{ info_data.nofeeTimes }}次</td>
            </tr>
            <tr>
              <td>每日限制次数</td>
              <td colspan="3">
                <span v-if="info_data.defaultWithdrawSetting"
                  >{{ info_data.defaultWithdrawSetting.count_limit }}次</span
                >
              </td>
            </tr>
            <tr>
              <td>手续费说明</td>
              <td colspan="3">
                手续费：输入金额 *{{ info_data.outMoneyFeeRate }} 最高：{{
                  info_data.maxOutMoneyFee
                }}
              </td>
            </tr>
          </table>
        </el-col>
      </el-row>
      <!-- showtips -->
      <el-dialog width="25%" title="查看流水" :visible.sync="tipsVisible">
        <p v-if="info_data.totalChLimit !== 0">
          未通过优惠流水审核！需扣除优惠<span style="color: red">{{
            info_data.totalChLimit
          }}</span
          >元,
        </p>
        <p v-if="info_data.totalComLimit !== 0">
          未通过常态性流水审核！需扣除行政费<span style="color: red">{{
            info_data.totalComLimit
          }}</span
          >元,
        </p>
        <p v-if="tixianCharges !== 0">
          需扣除手续费<span style="color: red">{{ tixianCharges }}</span
          >元,
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="tipsVisible = false">继续投资</el-button>
          <el-button
            type="primary"
            @click="(tipsVisible = false), saveWithdraw()"
            >坚持出款</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import MyInput from "@/views/games/components/input/Input_2.vue";
export default {
  inject: ["reload"],
  data() {
    return {
      rate: null,
      usdtNumber: 0,
      radio: "1",
      info: {
        withdraw: "",
        charges_info: "",
        zjpassword: "",
        bank: "",
        open_bank: "",
      },
      info_data: [],
      bank_list_data: [],
      tipsVisible: false,
      issel: false,
      issel_index: "",
      tixianCharges:0,
    };
  },
  components: {
    MyInput,
  },

  created() {
    this.getWithdrawData();
  },
  methods: {
    proving() {
      this.info.withdraw = this.info.withdraw.replace(/[^\.\d]/g, "");
      this.info.withdraw = this.info.withdraw.replace(".", "");
    },

    changeRadio(index) {
      console.log(this.radio);
      this.info = {};

      this.getWithdrawData(); //初始化提现信息
    },
    changeUSDT(id) {
      let obj = this.bank_list_data.find((item) => item.id == id);
      // this.info.open_bank =
      let { rate } = obj;
      console.log(obj, rate);
      this.rate = rate;
    },
    countUSDT(v) {
      console.log(v);
      let rate = Number(this.rate);
      let num = v / rate;
      this.usdtNumber = Number(num.toFixed(2));
      // console.log(v, rate, v / rate, this.usdtNumber);
    },
    // 获取提现信息
    getWithdrawData() {
      let d = {
        withdrawType: this.radio - 1,
      };
      this.$get("Pc.Withdraw.verifyAndGetWithdrawData", d).then((res) => {
        if (res.code == 0) {
          // let {totalChLimit,totalComLimit} = res.data

          // res.data.defaultWithdrawSetting.count_limit = 20;
          // res.data.applyTimes = 2;



          this.info_data = res.data;
          let bankList = res.data.banklist;

          console.log("----bankList-", res);
          this.bank_list_data = bankList;
          // console.log(this.info_data);
          // console.log(this.bank_list_data);
        } else if (res.code == -6004) {
          this.$alert("请设置资金密码后再来重试", "没有设置资金密码", {
            confirmButtonText: "确定",
            callback: (action) => {
              this.$router.replace("/user/withdraw/changepassword");
            },
          });

          // 跳转资金密码页面
          //this.$router.replace("/user/withdraw/changepassword");
        } else if (res.code == -6005) {
          // 没有银行卡
          this.$alert("请先绑定绑定银行卡后再来重试", "请先绑定绑定银行卡", {
            confirmButtonText: "确定",
            callback: (action) => {
              let goback = encodeURIComponent("/user/withdraw/withdraw");
              this.$router.replace("/user/bank_manage_add?goback=" + goback);
            },
          });
          //this.$message.error("请先绑定绑定银行卡");
          //this.$router.replace("/user/bank_manage");
        } else if (res.code == -6003) {
          this.$alert("请到安全中心先绑定手机号后再来重试", "请先绑定手机号", {
            confirmButtonText: "确定",
            callback: (action) => {
              this.$router.replace("/user/safe");
            },
          });
          // 没有绑定手机
          //this.$message.error("请先绑定手机号");
          //this.$router.replace("/user/safe")
        } else if (res.code < 0) {
          return this.$message.error(res.message);
        }
      });
    },
    //选择当前银行
    sel_bank(v, index) {
      this.info["open_bank"] = v.id;
      this.issel_index = index;
    },
    // 提取金额 nofeeTimes = 0 计算手续费 否则说明 输入金额 * outMoneyFeeRate %  最高maxOutMoneyFee
    get_money(e) {
      let _uper = Number(this.info_data.defaultWithdrawSetting.upper_limit);
      let _account = this.info_data.account;
      if (Number(e) > _account) {
        this.info.withdraw = "";
        this.usdtNumber = 0;
        return this.$message.error("提款金额超出当前余额");
      } else if (Number(e) > _uper) {
        this.info.withdraw = "";
        return this.$message.error("最大取款金额为" + _uper);
      }
      let _charges = e * this.info_data.outMoneyFeeRate * 0.01; //手续费率
   
      let maxOutMoneyFee = this.info_data.maxOutMoneyFee
      if (this.info_data.nofeeTimes == 0) {
        if(maxOutMoneyFee !=0&&_charges>maxOutMoneyFee){
          this.tixianCharges = maxOutMoneyFee
        }else {
          this.tixianCharges=_charges
        }
      } else {
        this.tixianCharges = 0
      }

    },

    // 提交数据
    onSubmit() {
      let { applyTimes } = this.info_data;
      let { count_limit } = this.info_data.defaultWithdrawSetting;
      if (applyTimes >= count_limit) {
        // if (true) {
        this.$gutils.confirm({
          text: "今日提现次数已用完，请明日再来。",
        });
        return;
      }

      if (this.info.withdraw == "") {
        return this.$message.error("最小取款金额100元");
      } else if (this.info.zjpassword == "") {
        return this.$message.error("请填写资金密码");
      } else if (this.info.open_bank == "") {
        return this.$message.error("请先选择银行卡");
      }
      // 判断是否可提现
      if (this.info_data.canWithdraw == 0) {
        return this.$message.error("未通过打码审核，暂时不能提现");
      }
      // 判断 totalChLimit优惠扣除   totalComLimit是行政费 手续费


      if (
        this.info_data.totalChLimit !== 0 ||
        this.info_data.totalComLimit !== 0 ||
        this.tixianCharges !== 0
      ) {
        this.tipsVisible = true;
      } else {
        this.saveWithdraw();
      }
    },
    // saveWithdraw 坚持出款
    async saveWithdraw() {
      let d = {
        money: this.info.withdraw,
        coinPwd: this.info.zjpassword,
        // coinPwd: "go1234",
        card_id: this.info.open_bank,
        charges: this.tixianCharges,
        withdrawAddress: "",
        withdrawType: this.radio - 1,
        usdtNumber: this.usdtNumber,
      };

      let res = await this.$post("Pc.Withdraw.saveWithdraw", d);
      if (res.code == 1) {
        await this.$gutils.confirm({
          text: "取款信息已提交，请等待处理",
        });
        this.$router.go(0); //刷新路由
      } else if (res.code < 0) {
        await this.$gutils.confirm({
          text: res.message,
        });
      }
    },
  },
  // activated() {
  //   this.getWithdrawData(); //初始化提现信息
  // },
};
</script>

<style lang="scss" scoped>
@import "/bank.css";

.withdraw-box {
  padding-bottom: 15px;

  .select-type-box {
    padding-left: 80px;
    margin: 10px 0;
    font-size: 12px;
    .radio {
      border: 1px solid #ccc;
      padding: 5px 12px;
      border-radius: 5px;
    }
  }
  .el-input {
    width: 40%;
  }
  .num {
    font-size: 16px;
    font-weight: 700;
    color: #ca151e;
  }
  .tips {
    display: inline-block;
    margin-left: 10px;
    font-size: 12px;
    color: #999;
  }
  .tips1 {
    font-size: 12px;
    color: #999;
  }
  .withcard {
    display: inline-block;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0 15px;
    line-height: 32px;
    height: 32px;
  }
  table.info_table {
    width: 100%;
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-spacing: 0; /*去掉单元格间隙*/
    color: #606266;
    td {
      padding: 4px 15px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
    }
  }
  .bank_box {
    display: block;
    width: 400px;
    height: 50px;
    border: 1px solid #eee;
    margin: 6px 0;
    line-height: 50px;
    text-align: left;
    position: relative;
    span {
      padding-right: 15px;
      display: inline-block;
      vertical-align: middle;
      margin-top: -38px;
    }
  }
  .bank_box.is_Sel {
    border-color: #ca151e;
  }
  .bank_box:hover {
    border-color: #ca151e;
  }
  .icon-dui {
    display: none;
  }
  .is_Sel {
    border: 1px solid #ca151e !important;
    position: relative;
    .icon-dui {
      font-size: 9px;
      display: block;
      position: absolute;
      right: 0px;
      bottom: -18px;
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
}
</style>