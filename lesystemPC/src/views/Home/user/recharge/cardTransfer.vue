<template>
  <div class="card-box">
    <!-- level1 -->
    <el-row>
      <el-col :span="24">
        <div class="cz-teach">
          <el-badge value="1"></el-badge>充值教程：请选择入款银行账号：<span
            class="text-primary"
            >（充值成功后5分钟未到账，请联系客服。）</span
          >
        </div>
        <div class="cardList" v-if="OfflinePayments">
          <ul>
            <li
              v-for="(item, index) in OfflinePayments.userBankDepositLists"
              :key="item.id"
              :class="{ is_Sel: issel_index == index }"
              @click="showCardDetail(item, index)"
            >
              <svg class="icon banksvg" aria-hidden="true">
                <use xlink:href="#icon-bank_b2c1"></use>
              </svg>
              <div style="margin-left: 40px">
                <p>开户银行：{{ item.name }}</p>
                <p>开户网点：{{ item.branch }}</p>
                <p>收款账户：{{ item.card_no }}</p>
                <p>收款人：{{ item.holders }}</p>
              </div>

              <i class="iconfont icon-dui"></i>
            </li>
          </ul>
        </div>
        <div v-show="detialVisible" class="cardDetail">
          <p>请转账至下来账户中：</p>
          <table class="info_table">
            <tr>
              <td>收款账户名：</td>
              <td>{{ info.holders }}</td>
              <td><el-link @click="copyToClip(info.holders)">复制</el-link></td>
            </tr>
            <tr>
              <td>卡号</td>
              <td>{{ info.card_no }}</td>
              <td><el-link @click="copyToClip(info.card_no)">复制</el-link></td>
            </tr>
            <tr>
              <td>开户城市</td>
              <td>{{ info.branch }}</td>
              <td><el-link @click="copyToClip(info.branch)">复制</el-link></td>
            </tr>
            <tr>
              <td>订单号</td>
              <td>{{ OfflinePayments.rechargeId }}</td>
              <td>
                <el-link @click="copyToClip(OfflinePayments.rechargeId)"
                  >复制</el-link
                >
              </td>
            </tr>
          </table>
          <p>
            *您目前选择的是<span class="text-primary">{{ info.name }}</span
            >充值服务
          </p>
        </div>
      </el-col>
    </el-row>

    <!-- level2 -->
    <el-row v-show="detialVisible">
      <el-col :span="24">
        <div class="write-info">
          <div><el-badge value="2"></el-badge>填写转账资料</div>
          <table class="info_table">
            <tr>
              <td>存入金额：</td>
              <td>
                <el-input
                  :disabled="isdone"
                  v-model="info.money"
                  size="mini"
                  placeholder=""
                  @change="VerificationAmount"
                  maxlength="7"
                  type="text"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td>存款人姓名：</td>
              <td>
                <el-input
                 :disabled="isdone"
                  v-model="info.realname"
                  size="mini"
                  placeholder=""
                ></el-input>
              </td>
            </tr>
            <tr v-if="info.is_charge == 1">
              <td colspan="2">
                使用该支付方式，需要承担入款手续费<span class="text-red"
                  >{{info.charge}}</span
                >%
              </td>
            </tr>
          </table>
          <div class="text-primary write-tips">
            <p>
              *此处所填写金额必须与您实际支付金额一致，若不一致，降无法自动到账。
            </p>
            <p>
              *此处所填写姓名必须与您付款卡姓名一致，若不一致，降无法自动到账。
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- level3 -->
    <el-row v-show="detialVisible">
      <el-col :span="24">
        <div class="transfer-type">
          <el-badge value="3"></el-badge>选择转账类型
        </div>
        <div>
          <ul class="typeList">
            <li
              v-for="(item, index) in transferWay"
              :key="index"
              :class="{ is_Sel: issel_index1 == index }"
              @click="selectTransferWay(item, index)"
            >
              <svg class="icon typesvg" aria-hidden="true">
                <use :xlink:href="item.svg"></use>
              </svg>
              <el-link>{{ item.label }}</el-link>
              <i class="iconfont icon-dui"></i>
            </li>
          </ul>
          <div class="branch" v-if="branchVisible">
            <el-form ref="form" :model="branch" label-width="120px" size="mini">
              <el-form-item label="所属分行">
                <el-input style="width: 200px" v-model="branch.name"></el-input>
                <span style="color: #999; font-size: 14px; padding-left: 12px"
                  >例如：广东省 佛山市 豪苑支行</span
                >
              </el-form-item>
            </el-form>
          </div>
          <p v-if="Number(info.money) > 0">
            您指定存款金额为<span class="text-primary">{{ info.money }}</span
            >，请输入该指定金额，否则无法自动到账。
          </p>
        </div>
      </el-col>
    </el-row>

    <el-button
      v-if="submitVisible"
      style="margin: 15px 0"
      type="primary"
      @click="submitInfo"
      :disabled="isVisible"
      >提交</el-button
    >
    <p v-else>
      申请有效时间为30分钟，为了保障充值成功，请在30分钟之内充值。倒计时
      <span class="text-red">{{ minute }}:{{ second }}</span>
    </p>
    <div class="cz-tips">
      <p>转账须知：</p>
      <p v-if="info.min_deposit_amount !== ''">
        *单笔最低存款金额<span class="text-primary">{{
          info.min_deposit_amount
        }}</span
        >元
      </p>
      <p v-if="info.max_deposit_amount !== ''">
        *单笔最高存款金额<span class="text-primary">{{
          info.max_deposit_amount
        }}</span
        >元
      </p>
      <p>{{ OfflinePayments.attentionNeed }}</p>
    </div>

    <!-- 消息提示 -->
    <el-dialog title="消息提示" :visible.sync="tipsVisible">
      <p>尊敬的会员您好：</p>
      <p>
        感谢您选择ZH娱乐-专业的娱乐平台！恭喜您可获得充值{{
          info.preference_percent
        }}%（最高：{{
          info.preference_max == 0 ? "无上限" : info.preference_max
        }}）的存款优惠，达到基础流水即可提款！
      </p>
      <p>活动详情联系在线客服。</p>
      <el-radio-group style="margin: 15px 0" v-model="withDiscount">
        <el-radio label="true">我要获取存款优惠</el-radio>
        <el-radio label="false">我要放弃存款优惠</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="(tipsVisible = false), (withDiscount = '')"
          >取 消</el-button
        >
        <el-button type="primary" @click="tipsVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 成功操作提示 -->
    <el-dialog class="succssdialog" title="操作提示" :visible.sync="successVisible">
      <h3>{{ successMessage1 }}！</h3>
      <h3 class="text-red">{{successMessage2}}！</h3>
      <p class="text-green">{{successMessage3}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="successVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: ["bankId", "bankDepositIdStr"],
    data() {
      return {
        info: {
          holders: "",
          card_no: "",
          branch: "",
          name: "",
          is_charge: "",
          min_deposit_amount: "",
          max_deposit_amount: "",
          money: "",
          realname: "",
          bankId: "",
          tway:"",
          is_give_up: "",
          preference_line: "",
          preference_max: "",
          preference_percent: "",
          is_deposit_add_random: "",
          deposit_random_num: "",
          charge:''
        },
        transferWay: [
          {
            label: "网银转账",
            wid: 0,
            svg: "#icon-bank_b2c",
          },
          {
            label: "银行柜台",
            wid: 1,
            svg: "#icon-tixian",
          },
          {
            label: "手机转账",
            wid: 2,
            svg: "#icon-shouji1",
          },
          {
            label: "支付宝",
            wid: 3,
            svg: "#icon-zhifubao",
          },
          {
            label: "微信",
            wid: 4,
            svg: "#icon-weixin_2",
          },
        ],
        isVisible: false,
        branch: {
          name: "",
        },
        detialVisible: false,
        OfflinePayments: "",
        issel_index: -1, //-1默认不选择银行卡
        issel_index1: -1, //-1默认不选择转账类型
        tipsVisible: false,
        withDiscount: "",
        branchVisible: false,
        successVisible: false,
        successMessage1: "",
        successMessage2: "",
        successMessage3: "",
        submitVisible: true,
        need_give_up_flag: true,
        minutes: 29, // 此处修改分钟数量
        seconds: 59, // 此处修改秒数数量
        isdone:false
      };
    },
    watch: {
      second: {
        handler(newVal) {
          this.num(newVal);
        },
      },
      minute: {
        handler(newVal) {
          this.num(newVal);
        },
      },
    },
    computed: {
      second: function () {
        return this.num(this.seconds);
      },
      minute: function () {
        return this.num(this.minutes);
      },
    },
    methods: {
      //   获取银行卡列表
      getOfflinePayments() {
        if (this.OfflinePayments == "") {
          this.$get("Pc.Recharge.getOfflinePayments", {
            bankDepositIdStr: this.bankDepositIdStr,
          }).then((res) => {

            
            if (res.code == 0) {
              this.OfflinePayments = res.data;

              console.log('--offline-',res.data);
              this.$emit("getchildrendata", this.OfflinePayments);
              console.log(this.OfflinePayments);
            } else {
              return this.$message.error(res.message);
            }
          });
        }
      },
      showCardDetail(v, index) {
        this.info = [];
        this.detialVisible = true;
        this.issel_index = index;
        this.$set(this.info, "holders", v.holders);
        this.$set(this.info, "card_no", v.card_no);
        this.$set(this.info, "branch", v.branch);
        this.$set(this.info, "name", v.name);
        this.$set(this.info, "is_charge", v.is_charge);
        this.$set(this.info, "min_deposit_amount", v.min_deposit_amount);
        this.$set(this.info, "max_deposit_amount", v.max_deposit_amount);
        this.$set(this.info, "is_give_up", v.is_give_up);
        this.$set(this.info, "preference_line", v.preference_line);
        this.$set(this.info, "preference_max", v.preference_max);
        this.$set(this.info, "preference_percent", v.preference_percent);
        this.$set(this.info, "bankId", v.id);
        this.$set(this.info, "is_deposit_add_random", v.is_deposit_add_random);
        this.$set(this.info, "deposit_random_num", v.deposit_random_num);
        this.$set(this.info, "charge", v.charge);
      },
      // 选择转账类型
      selectTransferWay(v, index) {
        this.issel_index1 = index;
        this.info.tway = v.label;
        if (v.label == "银行柜台") {
          this.branchVisible = true;
        } else {
          this.branchVisible = false;
        }
      },
      // 判断是否数字
      myIsNaN(value) {
        return typeof value === "number" && !isNaN(value);
      },
      // 验证金额
      VerificationAmount(v) {
        let isMathNumFlag = true;
        // 判断金额是否为空
        if (v == "") {
          this.$message.error("请输入存款金额");
          return;
        } else if (Number(v) > this.info.max_deposit_amount) {
          // 判断金额是在可选否范围之内
          this.$message.error(
            "您输入金额大于最大存款金额" + this.info.max_deposit_amount + "元"
          );
        } else if (Number(v) < this.info.min_deposit_amount) {
          this.$message.error(
            "您输入金额小于最小存款金额" + this.info.min_deposit_amount + "元"
          );
        }
        // 判断金额是否是合法数字
        let isNum = this.myIsNaN(Number(v));
        if (isNum) {
          let mathNum1 = Math.ceil(Math.random() * 10);
          let mathNum2 = Math.ceil(Math.random() * 100);
          // 判断是否存在小数
          if (parseInt(v) !== parseFloat(v)) {
            isMathNumFlag = false;
          }
          // 判断金额是否需要自动添加小数
          if (this.info.is_deposit_add_random == 1) {
            if (this.info.deposit_random_num == 1 && isMathNumFlag) {
              this.info.money = v + "." + mathNum1;
            } else if (this.info.deposit_random_num == 2 && isMathNumFlag) {
              this.info.money = v + "." + mathNum2;
            }
          }
        } else {
          this.$message.error("请正确填写数字");
          this.info.money = "";
        }
        // 判断是否需要优惠

        if (
          this.info.is_give_up == 1 &&
          this.info.money >= this.info.preference_line &&
          this.need_give_up_flag
        ) {
          this.tipsVisible = true;
          this.need_give_up_flag = false;
        }
      },
      // 倒计时
      num: function (n) {
        return n < 10 ? "0" + n : "" + n;
      },
      add: function () {
        var _this = this;
        var time = window.setInterval(function () {
          if (_this.seconds === 0 && _this.minutes !== 0) {
            _this.seconds = 59;
            _this.minutes -= 1;
          } else if (_this.minutes === 0 && _this.seconds === 0) {
            _this.seconds = 0;
            window.clearInterval(time);
          } else {
            _this.seconds -= 1;
          }
        }, 1000);
      },

      // 银行卡转账，提交信息
      submitInfo() {
        this.isVisible = true; //防止重复提交
        setTimeout(() => {
          this.isVisible = false; //点击一次时隔两秒后才能再次点击
        }, 2000);

        // 类型判断 银行柜台判断是否填写分行
        if (this.info.tway == "" || this.info.tway==undefined) {
          return this.$message.error("请选择转账类型");
        } else if (this.info.tway == "银行柜台" && this.branch.name == "") {
            return this.$message.error("请输入所属分行");
        }


        let d = {
          amount: this.info.money,
          companyCardId: this.info.card_no,
          bankId: this.info.bankId,
          way: this.info.tway,
          place: this.info.branch,
          realName: this.info.realname,
          rechargeId: this.OfflinePayments.rechargeId,
          choicePre: this.withDiscount,
        }

        

        this.$post("Pc.Recharge.saveOfflinePayment",d ).then((res) => {
          if (res.code == 1) {
            let successMessage = res.message;
            this.successMessage3 =successMessage.substring(successMessage.indexOf('（'), successMessage.length + 1)
            this.successMessage2 =successMessage.substring(12,successMessage.indexOf('!'))
            this.successMessage1 =successMessage.substring(0,11)
            this.successVisible = true;
            this.submitVisible = false;
            this.isdone = true
            this.add(); //倒计时开始
          } else {
            return this.$message.error(res.message);
          }
        });
      },

      /**
       * 复制内容到粘贴板
       * content : 需要复制的内容
       * message : 复制完后的提示，不传则默认提示"复制成功"
       */
      copyToClip(content, message) {
        var aux = document.createElement("input");
        aux.setAttribute("value", content);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
        if (message !== null) {
          this.$message.success("复制成功");
        }
      },
    },
    mounted() {},
    created() {},
  };
</script>

<style lang="scss">
.text-red{
    color: #ca151e;
  }
  .text-green{
    color: green;
  }
.succssdialog{
  h3{
    text-align: center;
    color: #ca151e;
    margin: 10px 0;
  }
   p{
      text-align: center;
      margin: 10px 0;
    }
  
  .el-dialog__footer{
    text-align: center;
   
  }
}
  .banksvg {
    position: absolute;
    left: 10px;
    top: 20px;
    width: 30px;
  }
  .typesvg {
    position: absolute;
    left: 10px;
    top: 4px;
    width: 30px;
    fill: #ca151e;
  }
  .icon-dui {
    display: none;
  }
  .card-box {
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
    .text-primary {
      color: #ca151e;
    }
    table.info_table {
      width: 400px;
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
    .cz-teach {
      margin-bottom: 10px;
    }
    .cardList {
      ul {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        li {
          padding: 8px 20px;
          border: 1px dotted #ddd;
          margin-right: 15px;
          width: 240px;
          position: relative;
        }
        li:hover {
          border: 1px solid #ca151e;
        }
      }
    }
    .cardDetail {
      margin-bottom: 10px;
      p {
        margin: 10px 0;
      }
    }
    .write-info {
      margin: 20px 0 10px 0;
      position: relative;
      .write-tips {
        position: absolute;
        left: 415px;
        top: 24px;
        p {
          line-height: 37px;
        }
      }
    }

    .transfer-type {
      margin: 20px 0 10px 0;
    }
    .cz-tips {
      margin-top: 20px;
      color: #999;
      padding: 15px;
      border: 1px dashed #ddd;
      height: 240px;
    }
    .typeList {
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
        width: 200px;
        position: relative;
        padding-left: 40px;
      }
    }
  }
</style>