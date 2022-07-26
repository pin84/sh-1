<template>
  <div class="mask">
    <div class="body">
      <div class="title">第[{{ numberOfPeriod }}]期确认注单</div>
      <div class="body-content">
        <ul class="list">
          <b
            class="item"
            :class="{ left: idx == 0 }"
            v-for="(title, idx) in tableTitle"
            :key="idx"
          >
            {{ title }}
          </b>
        </ul>
        <ul class="list column">
          <li class="item" v-for="(obj, idx) in basketList" :key="idx">
            <span class="left">
              {{ obj.N1 }}：&nbsp;{{
                Array.isArray(obj.N) ? obj.N.join(",") : obj.N
              }}
            </span>
            <span>
              <span v-if="obj.odds1">{{ obj.odds1 }}/</span>
              <span>{{ obj.odds }}</span>
            </span>
            <span>{{ obj.money }}</span>
          </li>
        </ul>
      </div>
      <div class="total">
        <span>
          共 <b>{{ len }}</b> 注，合计下注金额<b>{{ money }}</b>
        </span>
        <el-checkbox v-model="checked"> 按最新赔率提交</el-checkbox>
      </div>

      <div class="btn-box">
        <el-button type="primary" @click="buy">确认下注</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableTitle: ["内容", "赔率", "下注金额"],
      basketList: [],
      checked: true,
      money: 0,
      len: 0,
      numberOfPeriod: 0,
    };
  },

  created() {
    this.initData();
  },

  methods: {
    buy() {
      let ts = new Date().getTime();
      this.$store.commit("toBuyNext", ts);
    },
    closeDialog() {
      this.$store.commit("basketList", "clearBasket");
      this.$store.commit("showCreditBasket", 0);

      let ts = new Date().getTime();
      this.$store.commit("clearSelect", ts);
    },
    initData() {
      let basketList = this.$store.state.gd.basketList;
      let { numberOfPeriod } = this.$store.state.gd.latestPriodData;
      this.numberOfPeriod = numberOfPeriod;
      let money = basketList.reduce((accumulator, currentValue) => {
        return accumulator + Number(currentValue.money);
      }, 0);
      this.money = money;
      this.len = basketList.length;
      this.basketList = basketList;
    },
  },
};
</script>

<style lang="scss" scoped>
$br: 5px;
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
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
        // text-align: center;
        // border: 1px solid red;
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