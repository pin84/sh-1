<template>
  <div class="body">
    <div class="title">{{ title }}</div>

    <div class="info">
      <div>游戏：{{ addOrderObj.gameName }}</div>
      <div>第{{ addOrderObj.numberOfPeriod }}期</div>
      <div>玩法：{{ addOrderObj.playedName }}</div>
    </div>
    <div class="num-box">
      {{ addOrderObj.content }}
    </div>
    <div class="add-box">
      <span>&nbsp;倍数：&nbsp;</span>
      <div style="width: 90px">
        <AddReduce :ratio="addOrderObj.beiShu" @addReduce="addReduce" />
      </div>
      <span>&nbsp;倍 模式&nbsp;</span>
      <el-select
        @change="changeSelect"
        class="el-select"
        v-model="addOrderObj.mode"
        placeholder="元"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.mode"
        ></el-option>
      </el-select>
    </div>

    <div class="total">
      <span>
        操作状态： <b>{{ addOrderObj.actionNum }}</b> 注，<b>{{ 1 }}</b>
        单，投注金额<b>{{ addOrderObj.amount }}</b>
      </span>
      <!-- <el-checkbox v-model="checked"> 按最新赔率提交</el-checkbox> -->
    </div>

    <div class="btn-box">
      <el-button type="primary" @click="buy">确认下注</el-button>
      <!-- <el-button @click="closeDialog">取 消</el-button> -->
    </div>
  </div>
</template>
<script>
import AddReduce from "@/views/games/components/AddReduce.vue";

export default {
  props: {
    title: {
      type: String,
      default: () => "再下一注",
    },
    addOrderObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      moneytimes: 1,
      amount: 0,
      tableTitle: ["内容", "赔率", "下注金额"],
      basketList: [],
      checked: true,
      money: 0,
      catchMoney: 0, //换算
      len: 0,
      options: [
        {
          value: "选项1",
          label: "元",
          mode: 1,
          moneyMode: 1,
          moneytimes: 1,
        },
        {
          value: "选项2",
          label: "角",
          mode: 2,
          moneyMode: 10,
          moneytimes: 0.1,
        },
        {
          value: "选项3",
          label: "分",
          mode: 3,
          moneyMode: 100,
          moneytimes: 0.01,
        },
        {
          value: "选项4",
          label: "厘",
          mode: 4,
          moneyMode: 1000,
          moneytimes: 0.001,
        },
      ],
    };
  },

  components: {
    AddReduce,
  },

  created() {
    this.initData();
  },

  methods: {
    changeSelect(idx) {
      let times = this.options[idx - 1].moneytimes;

      let n = this.$BDH.setNumDecimal(times / this.moneytimes, 3);

      let money = this.$BDH.setNumDecimal(this.addOrderObj.amount * n, 4);

      this.addOrderObj.amount = money;

      this.amount = this.amount * n;
      this.moneytimes = times;
      // // this.amount = money;
    },
    addReduce(n) {
      this.addOrderObj.beiShu = n;
      let money = this.$BDH.setNumDecimal(this.amount * n, 4);
      this.addOrderObj.amount = money;
    },
    buy() {
      let { status } = this.$store.state.gd.latestPriodData;
      if (status == 0) {
        this.$gutils.confirm({
          text: "当前末开盘",
        });
        return;
      }

      let obj = this.$BDH.createBuyObj();
      let {
        mode,
        amount,
        beiShu,
        actionNum,
        content,
        playedItemId,
      } = this.addOrderObj;
      obj.I = playedItemId;
      obj.orderStr = content;
      obj.numStr = content;
      obj.times = beiShu;
      obj.money = amount;
      obj.mode = mode;
      obj.num = actionNum;

      this.$store.commit("basketList", obj);

      let ts = new Date().getTime();
      this.$store.commit("toBuyNext", ts);
    },
    closeDialog() {
      // this.$store.commit("basketList", "clearBasket");
      // this.$store.commit("showCreditBasket", 0);
    },
    initData() {
      let { amount, mode, beiShu } = this.addOrderObj;
      this.amount = amount / beiShu;
      this.moneytimes = this.options[mode - 1].moneytimes;
    },
  },
};
</script>

<style lang="scss" scoped>
$br: 5px;

.body {
  user-select: none;
  background-color: #fff;
  width: 500px;
  max-height: 500px;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: $br;
  padding-bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
  .title {
    border-radius: $br $br 0 0;
    background-color: #cf271e;
    color: #fff;
    padding: 10px;
  }
  .info {
    display: flex;
    padding: 8px 5px;
    div {
      font-size: 12px;
      // padding: 5px 0;
      color: gray;
      padding-right: 15px;
    }
  }
  .num-box {
    background-color: #f1f1f1;
    width: 98%;
    height: 40px;
    border-radius: 2px;
    box-sizing: border-box;
    margin: 0 auto;
    overflow: hidden;
    padding: 5px;
    color: gray;
  }
  .add-box {
    margin-top: 10px;
    display: flex;
    align-items: center;
    .el-select {
      width: 70px;
    }
    .icon-qiandai {
      color: orange;
      font-size: 26px;
      margin-left: 5px;
    }
  }
  .options {
    margin-top: 10px;
  }
  .body-content {
    // max-height: 200px;
    overflow-y: scroll;
    padding: 10px 0;
    .list {
      display: flex;
      justify-content: space-around;
      .item {
        display: flex;
        justify-content: space-around;
      }
      .left {
        display: inline-block;
        flex: 0 0 50%;
        text-align: center;
      }
      span,
      b {
        width: 100%;
        text-align: center;
      }
    }
    .column {
      flex-direction: column;
      margin-top: 10px;
    }
  }
  .total {
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px;
    b {
      color: red;
      padding-left: 5px;
    }
  }
  .btn-box {
    display: flex;
    justify-content: center;
  }
}
</style>