<template>
  <div class="history">
    <div class="top">
      <div class="betting pointer" @click="deleteSomeOrder">
        批量撤单 ({{ num }})
      </div>
      <div>游戏记录</div>
      <div class="more pointer" @click="isShowDialog = true">
        <el-button @click="refresh" class="btn" type="danger">
          <i class="iconfont icon-shuaxin"></i>
          刷新
        </el-button>
        <el-button @click="toMore" class="btn" type="warning"
          >更多记录</el-button
        >
      </div>
    </div>
    <div class="table-box">
      <Table
      @changeSelected='changeSelected'
        @deleteOrder="deleteOrder"
        @updateRecord="initData"
        @addOrder="addOrder"
        :tableTitle="tableTitle"
        :list="list"
      />
    </div>

    <myMask v-if="isShowMask" @hiddenMask="isShowMask = false">
      <BaskitOfficeAddOrder :addOrderObj="addOrderObj" />
    </myMask>
  </div>
</template>

<script>
import Table from "./table";
import myMask from "@/views/games/components/mask/index.vue";

// import Dialog from "@/views/gamesIndia/components/dialog/index.vue";
// import SelectDate from "@/views/gamesIndia/history/SelectDate.vue";
// import SelectList from "@/views/gamesIndia/history/SelectList.vue";
export default {
  data() {
    return {
      isShowMask: false,
      addOrderObj: {},
      isDestroyed: false,
      num: 0,
      lang: "zh",
      list: [],
      curidx: 0,
      isShowDialog: false,
      tableTitle: [],
      dTitle: "",
      typeArr: [],
      list1: [],
      list2: [],
      list3: [],
    };
  },
  components: {
    Table,
    myMask,
    BaskitOfficeAddOrder: () =>
      import("@/views/games/components/basket/BasketOfficeAddOrder.vue"),
    // Dialog,
    // SelectDate,
    // SelectList,
  },

  watch: {
    "$store.state.gd.updateRecord": function (val) {
      this.initData();
    },
    "$store.state.gd.clearSelect": function (val) {
      this.isShowMask = false
    },
  },

  created() {
    this.initPage();
    this.initData();
  },

  mounted() {
    this.loopRequest();
  },

  beforeDestroy() {
    this.isDestroyed = true;
  },

  methods: {
    changeSelected(){
      let i = 0
      this.list.forEach((item) => {
        if (item.isChecked) {
          i++;
        }
      });
      this.num = i
    },
    addOrder(obj) {
      // let {gameName} = this.$store.state.gd.indexGameData
      // obj.gameName = gameName
      this.addOrderObj = obj;
      this.isShowMask = true;
    },
    async loopRequest() {
      while (true) {
        if (this.isDestroyed) {
          break;
        }
        await this.initData();
        await this.setTime();
      }
    },
    setTime() {
      return new Promise((resolve, reject) => {
        let time = 15000 + Math.ceil(200 * Math.random());
        setTimeout(() => {
          resolve();
        }, time);
      });
    },
    async deleteOrder(item, isShowTips = true) {
      if (!Array.isArray(item)) {
        if (item.periodStatus != 1 || item.orderStatus != 1) return;
      }
      if (isShowTips) {
        let flag = await this.$gutils.confirm({
          text: "是否要撤销订单？",
          showCancelButton: true,
        });

        if (!flag) {
          return;
        }
      }

      let ids;
      if (Array.isArray(item)) {
        ids = item.join(",");
      } else {
        ids = item.orderId;
      }

      let { id } = this.$store.state.gd.indexGame;
      let obj = {
        gameId: id,
        ids,
      };

      let res = await this.$get(this.$gapi.revokeOrder, obj);
      this.$store.commit("updateRecord", new Date().getTime());
      this.$gutils.confirm({
        text: res.message,
      });
      this.num = 0;
    },
    async deleteSomeOrder() {
      // let i = 0;
      let orderId = [];

      this.list.forEach((item) => {
        if (item.isChecked) {
          // i++;
          orderId.push(item.orderId);
        }
      });

      if (orderId.length == 0) {
        this.$gutils.confirm({
          text: "当前没有可撤销的注单！",
          showCancelButton: false,
        });
        return;
      }
      // this.num = i;
      this.list.push({});
      this.list.pop();

      this.deleteOrder(orderId, false);
    },
    toMore() {
      this.$router.push({ path: "/user/order" });
    },
    refresh() {
      this.initData();
    },
    selectType(idx) {
      this.curidx = idx;
    },
    async initData() {
      let { id } = this.$store.state.gd.indexGame;
      let res = await this.$get(this.$gapi.getHistoryOrdersForPc, {
        gameId: id,
        num: 10,
      });
      let { data } = res;
      let i = 0;
      data.forEach((item) => {
        item.option = item.status_cn;
        item.isChecked = false;
        if (item.orderStatus == 4) {
          item.option = "已撤单";
        }
        if (item.periodStatus == 1 && item.orderStatus == 1) {
          item.option = "可撤单";
          item.isShowCheckbox = true;
          // item.isChecked = true;
          i++;
        }
        if (item.periodStatus == 0) {
          item.option = "可撤单";
          item.isShowCheckbox = true;
          // item.isChecked = true;
          i++;
        }

        if (item.periodStatus == 0 && item.orderStatus == 1) {
          item.option = "未开奖";
        }
        if (item.orderStatus == 2) {
          item.option = "未中奖";
        }
      });
      this.list = data;
      // this.num = i;

      return;
    },

    initPage() {
      this.tableTitle = [
        "注单编号",
        "玩法",
        "期号",
        "投注时间",
        "投注内容",
        "倍模",
        "总金额",
        "奖金",
        "状态",
        "操作",
      ];
    },
  },
};
</script>
<style lang="scss" scoped>
.history {
  height: 210px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // align-items: center;
  .top {
    flex: 0 0 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    border-bottom: 1px solid #f0f0f0;
    background-color: #f1f1f1;
    font-size: 14px;
    .betting {
      background-image: linear-gradient(180deg, #f7a200, #ffbf44);
      color: #fff;
      border-radius: 24px;
      padding: 3px 15px;
      font-size: 13px;
      font-weight: 600;
    }
    .more {
      color: #7269e6;
      font-size: 14px;
      display: flex;
      align-items: center;
      .btn {
        height: 25px;
        padding: 0 10px;
        font-size: 14px;
        .iconfont {
          height: 25px;
          line-height: 25px;
        }
      }
    }
  }
  .no-data {
    height: 100%;
    margin: 0 auto;
    // background: url("../assets/gameIcon/no-data.svg") no-repeat center;
    font-size: 12px;
    color: #7269e6;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    box-sizing: border-box;
    padding-bottom: 10px;
  }
  .table-box {
    height: 100%;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    box-sizing: border-box;
    overflow: hidden;
  }
  .content-d {
    box-sizing: border-box;
    // border: 1px solid red;
    height: 700px;
    overflow: hidden;
    .table-box-d {
      height: 550px;
      overflow-y: scroll;
    }
    .total {
      padding: 0 10px;
      color: #868686;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #f1f1f1;
      .c_r {
        color: #ff6d53;
        font-size: 18px;
      }
    }
    .type-box {
      display: flex;
      align-items: center;
      padding: 10px 10px;
      border-top: 1px solid #f1f1f1;
      .el-box {
        margin-right: 10px;
      }
      .btn-s {
        height: 30px;
      }
      .type {
        color: #7269e6;
        margin-right: 10px;
        border-radius: 10px;
        padding: 2px 8px;
        &.active {
          background-color: orange;
          color: #fff;
        }
      }
    }
  }
}
</style>