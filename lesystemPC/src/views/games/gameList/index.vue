<template>
  <div class="game-list">
    <div class="top-box">
      <PlayType />
    </div>
    <div v-if="isShowTopOp">
      <OperationBar @setFootOdds="setFootOdds" />
    </div>
    <div class="list">
      <G810 v-if="curId == 810" />
      <G44 v-if="curId == 44" />
      <G79 v-if="curId == 79" />
      <G106 v-if="curId == 106" />
      <G260 v-if="curId == 260" />
      <G30 v-if="curId == 30" />
      <G32 v-if="curId == 32" />
      <G28 v-if="curId == 28" />
      <G40 v-if="curId == 40" />
      <G105 v-if="curId == 105" />
      <G259 v-if="curId == 259" />
      <G58 v-if="curId == 58" />
      <G5 v-if="curId == 5" />
      <!-- <G368 v-if="curId == 368" /> -->
      <G10 v-if="curId == 10" />
      <G118 v-if="curId == 118" />
      <G1 v-if="curId == 1" />

      <div v-if="!gameType" class="btn-box">
        <Input v-if="isShowInputMoney" class="input" @inputValue="inputMoney" />
        <el-button @click="addToBasket" class="btn" type="success"
          >确定</el-button
        >
        <el-button @click="cancelSelected" class="btn" type="info"
          >取消</el-button
        >
      </div>
    </div>

    <div class="op-box">
      <div v-if="!isShowTopOp">
        <Tips />
        <OperationBar @setFootOdds="setFootOdds" />
      </div>

      <Basket />
      <SetMoney />

      <Wenlu v-if="isShowTopOp && isShowWenlu" />
    </div>
  </div>
</template>

<script>
import Input from "@/views/games/components/input/InputSelectList";
import PlayType from "@/views/games/components/playType/index.vue";
import OperationBar from "@/views/games/components/operationBar/index.vue";
import Tips from "@/views/games/components/tips/index.vue";
import Basket from "@/views/games/components/basket/index.vue";
import G810 from "./810/index.vue";
import G79 from "./79/index.vue";
import G106 from "./106/index.vue";
import G260 from "./260/index.vue";
import idsObj from "@/views/games/assets/ids.js";
export default {
  props: {
    latestPriodData: {
      type: Object,
      default: () => {},
    },
    indexGameData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      footOdds: {},
      isShowInputMoney: false,
      isShowTopOp: false,
      gameType: 0,
      curId: 0,
      topOperationBarIds: [79, 105, 259, 58],
      money: 0,
      isShowWenlu: true,
    };
  },

  components: {
    Wenlu: () => import("@/views/games/components/wenlu/Wenlu.vue"),
    Input,
    Tips,
    PlayType,
    OperationBar,
    Basket,
    G810,
    G79,
    G106,
    G260,
    SetMoney: () => import("@/views/games/components/SetMoney"),
    G44: () => import("./44/index.vue"),
    G30: () => import("./30/index.vue"),
    G32: () => import("./32/index.vue"),
    G28: () => import("./28/index.vue"),
    G40: () => import("./40/index.vue"),
    G105: () => import("./105/index.vue"),
    G259: () => import("./259/index.vue"),
    G58: () => import("./58/index.vue"),
    G5: () => import("./5/index.vue"),
    G10: () => import("./10/index.vue"),
    G118: () => import("./118/index.vue"),
    G1: () => import("./1/index.vue"),
  },

  watch: {
    "$store.state.gd.bettingType": {
      handler: function (val) {
        this.isShowInputMoney = val;
      },
      deep: true,
    },
    "$store.state.gd.toBuyNext": function (val) {
      this.buy();
    },

    "$store.state.gd.isDoneCurGame": function (val) {
      if (val == 0) return;
      this.initPage(val);
    },
  },

  methods: {
    setFootOdds(obj) {
      this.footOdds = obj;
    },
    cancelSelected() {
      let ts = new Date().getTime();
      this.$store.commit("clearSelect", ts);
    },
    inputMoney(money) {
      this.$store.commit("inputMoney", money);
    },
    initPage(id) {
      let { gameType } = this.indexGameData;
      this.gameType = gameType;
      if (gameType == 0) {
        this.isShowTopOp = true;
      } else {
        this.isShowTopOp = false;
      }

      for (let [key, value] of Object.entries(idsObj)) {
        if (value.includes(Number(id))) {
          this.curId = key;
          break;
        }
      }
      if (this.curId == 118 || this.curId == 1) {
        this.isShowWenlu = false;
      } else {
        this.isShowWenlu = true;
      }
    },
    addToBasket() {
      let ts = new Date().getTime();
      this.$store.commit("addToBasket", ts);
    },
    async buy() {
      let { closeTime, numberOfPeriod, fid, issStopSales, status } =
        this.latestPriodData;

      

      if (status == 0) {
        this.$gutils.confirm({
          text: "当前末开盘",
        });
        return;
      }

      if (issStopSales) {
        this.$gutils.confirm({
          text: "这个彩种已停止销售，请选择其他彩种",
        });
        return;
      }
      let { id } = this.$route.query;
      id = Number(id);
      let LHCIds = idsObj["1"];

      let { gameType } = this.indexGameData;
      let { selectBack } = this.footOdds;
      let basketArr = this.$store.state.gd.basketList;

      let arr = [];
      if (gameType == 1) {
        basketArr.forEach((element) => {
          let tem = {
            i: element.I,
            c: element.orderStr,
            n: element.num,
            t: element.times,
            k: element.selectBack,
            m: element.mode,
            a: element.money,
            ts: element.ts,
          };
          arr.push(tem);
        });
      } else {
        basketArr.forEach((element) => {
          let ids = [25315];
          let goal;
          if (ids.includes(Number(element.I))) {
            goal = element.goal;
          } else {
            if (LHCIds.includes(id)) {
              goal = element.goal ? element.goal : element.I;
            } else {
              goal = element.I;
            }
          }
          arr.push({
            id: element.I,
            amount: element.money,
            odds: element.odds || element.odds1,
            goal,
            timestamp: element.ts || new Date().getTime(),
          });
        });
      }
 



      let d = {
        // kjTime: 1620262071,
        // gameId: 260,
        gameId: id,
        kjTime: new Date(closeTime.replace(/\-/g, "/")).getTime() / 1000,
        numberOfPeriod,
        periodId: fid,
        isSingle: 0, //0 单式玩法 1复式玩法
        orderList: JSON.stringify(arr),
        selectBack,
      };


      

      let arr1 = JSON.parse(d.orderList);
      arr1.forEach((item) => {
        item.timestamp = 0;
        item.ts = 0;
      });
      let str = d.gameId + d.periodId + JSON.stringify(arr1);
     
     
      let md5str = this.$md5(str);
      let localmd5str = localStorage.getItem("md5orderdata");
      if (localmd5str == md5str) {
        let flag1 = await this.$gutils.confirm({
          text: "你已提交过相同的订单，是否继续？",
          showCancelButton: true,
        });

        if (!flag1) {
          this.$store.commit("basketList", "clearBasket");
           this.$store.commit("showCreditBasket", 0);
           let ts = new Date().getTime()
           this.$store.commit("clearSelect",ts );
           this.$store.commit("clearInput", ts);
          return;
        }
      } else {
        localStorage.setItem("md5orderdata", md5str);
      }

      let url = "";
      if (gameType == 1) {
        url = this.$gapi.addOrders;
      } else {
        if (LHCIds.includes(id)) {
          url = this.$gapi.addSixOrders;
        } else {
          url = this.$gapi.addOrdersCredit;
        }
      }

      console.log("=====", url, d);

    
      let res = await this.$post(url, d);
      console.log("==res===", res);
      let { code } = res;

      this.$alert(`${res.message}`, {
        showClose: false,
      });

      if (code == -1) {
        return;
      }

      this.$store.commit("basketList", "clearBasket");
      let ts = new Date().getTime();
      this.$store.commit("updateRecord", ts);
      this.$store.commit("clearSelect", ts);
      this.$store.commit("updateUserInfo", ts);
      this.$store.commit("clearInput", ts);
      if (gameType == 0) {
        this.$store.commit("showCreditBasket", 0);
      }
    },
  },

  destroyed() {
    this.$store.commit("basketList", "clearBasket");
  },
};
</script>

<style lang="scss" scoped>
.game-list {
  background-color: #fff;
  .list {
    box-sizing: border-box;
  }
  .btn-box {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    .btn {
      width: 65px;
      margin-left: 10px;
    }
  }
}
</style>