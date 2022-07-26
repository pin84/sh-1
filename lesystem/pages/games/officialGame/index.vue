<template>
  <view class="othergame-list">
    <G810 v-if="curGame == '810'" @buy810="buy810" />
    <G40 v-if="curGame == '40'" @buy810="buy810" />
  </view>
</template>

<script>
import G810 from "./810";
import G40 from "./G40";
export default {
  data() {
    return {
      curGame: "",
    };
  },
  components: {
    G810,
    G40,
  },
  created() {
    this.curGame = "";
    let routes = getCurrentPages();
    let { id } = routes[routes.length - 1].options;
    id = Number(id);
    let idsObj = {
      40: [40, 57, 26, 197],
      810: [810, 64, 61, 137, 142, 67, 135, 44],
    };
    let curId;
    for (let [key, value] of Object.entries(idsObj)) {
      if (value.includes(id)) {
        curId = key;
        break;
      }
    }
    setTimeout(() => {
      this.curGame = curId;
    }, 100);
  },

  methods: {
    async buy810() {
      this.$store.commit("v3IsHasSelected", false);

      let {
        closeTime,
        gameID,
        numberOfPeriod,
        fid,
      } = this.$store.state.GDV3.v4latestPriodData;

      console.log(this.$store.state.GDV3.v4latestPriodData);

      // console.log(closeTime, gameID, numberOfPeriod, fid);
      let baskeyNumObj = this.$store.state.GDV3.numBasket;

      let arr = [];
      let rateObj = {
        1: 1,
        0.1: 2,
        0.01: 3,
        0.001: 4,
      };
      baskeyNumObj.forEach((item) => {
        arr.push({
          i: item.I,
          n: item.len,
          c: item.orderStr,
          t: item.ratio,
          k: item.odds,
          m: rateObj[item.rate],
          a: item.money,
          ts: item.ts,
        });
      });
      let jsonstr = JSON.stringify(arr);

      let d = {
        kjTime: new Date(closeTime.replace(/-/g, "/")).getTime() / 1000,
        gameId: gameID,
        numberOfPeriod,
        periodId: fid,
        isSingle: 1, //0 单式玩法 1复式玩法
        orderList: jsonstr,
      };

      let d1 = {
        method: "POST",
        url: this.$api.addOrders,
        data: d,
      };
      console.log(d1);
      let flag = this.$buyDataHandler.checkSameOrder(d1.data);

      if (!flag) {
        let flag1 = await this.$util.showConfirm({
          content: "你已提交过相同的订单，是否继续",
        });
        if (!flag1) {
           this.$store.commit("v3NumBasket", "clearAll");
          return;
        }
      }
      let res = await this.$http(d1);

      
      if (res.code < 0) {
        // this.$util.showToast({ title: res.message });
        this.$store.commit("v3NumBasket", "clearAll");
        let flag = await this.$util.showConfirm({ content: res.message ,showCancel:false});
        
        // if (flag) {
        //   uni.navigateTo({
        //     url: "/pages/member/recharge/recharge",
        //   });
        // }
      } else {
        let ts = new Date().getTime();
        this.$store.commit("v3selectedNum", {});
        this.$store.commit("v3NumBasket", "clearAll");
        this.$store.commit("v3FootMoney", {});
        this.$store.commit("v3ClearSelected", ts);
        this.$store.commit("updateRecord", ts);

        let flag = await this.$util.showConfirm({
          content: "投注成功",
          confirmText: "继续下注",
          cancelText: "查看投注记录",
        });

        console.log('-fa-',flag);

        if (!flag) {
          this.$store.commit("v3ShowRecord", true);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.othergame-list {
  height: 100%;
  overflow: hidden;
  padding-bottom: 200rpx;
}
</style>
