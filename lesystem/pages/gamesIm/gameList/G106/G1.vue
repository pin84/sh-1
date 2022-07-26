<template>
  <view class="hezhi">
    <view class="top">
      <view class="left">
        三颗骰子开出之点数总和值3-10为小、阴，点数总和值11-18为大、阳。请注意：若【第一颗、第二颗、第三颗】点数相同，通吃【大】、【小】、【单】、【双】、【阴】、【阳】各注。
      </view>
      <view class="audio"></view>
    </view>
    <view>
      <ListSquare
        :dataList="dataList_1"
        prefixText="赔率"
        @selected="selected"
      />
      <ListSquare :dataList="dataList" @selected="selected" />
    </view>
  </view>
</template>

<script>
import ListSquare from "./ListSquare.vue";
export default {
  data() {
    return {
      dataList: [],
      dataList_1: [],
    };
  },
  components: {
    ListSquare,
  },
  watch: {
    "$store.state.GDV3.officialRate": {
      handler: function (val) {
        this.changeRate(val);
        this.selected();
      },
      deep: true,
    },

    "$store.state.GDV3.v3AddRandom": {
      handler: function (val) {
        this.addToBasketRandom(val);
      },
      deep: true,
    },
    "$store.state.GDV3.addToBasket": {
      handler: function (val) {
        this.addToBasket();
      },
      deep: true,
    },
    "$store.state.GDV3.v3ToBuy": function (val) {
      this.v3ToBuy();
    },
 
  },
  created() {
    this.initData();
  },

  methods: {
    v3ToBuy() {
      this.addToBasket(false);
      //触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
      let ts = new Date().getTime();
      this.$store.commit("v3ToBuyNext", ts);
    },
    addToBasket(isShowBasket = true) {
      let numArr = [];
      this.dataList.forEach((item) => {
        if (item.active) {
          numArr.push(item);
        }
      });
      this.dataList_1.forEach((item) => {
        if (item.active) {
          numArr.push(item);
        }
      });

      if (numArr.length == 0) return;

      let temArr = [];
      numArr.forEach((item) => {
        let obj = this.$buyDataHandler.createBuyObj();
        obj.I = item.I;
        obj.numStr = item.N;
        obj.orderStr = item.N;
        obj.gName = item.N1;
        temArr.push(obj);
      });

      console.log(temArr);
      // if (numArr.length !== 0) {
      //   let obj = this.$buyDataHandler.createBuyObj();
      //   obj.I = this.dataList[0].I;
      //   obj.numStr = numArr.join(",");
      //   obj.orderStr = numArr.join(",");
      //   let len = numArr.length;
      //   obj.len = len;
      //   obj.money = obj.money * len;
      //   temArr.push(obj);
      // }

      // this.dataList_1.forEach((item) => {
      //   if (item.active) {
      //     let obj = this.$buyDataHandler.createBuyObj();
      //     obj.I = item.I;
      //     obj.numStr = item.N;
      //     obj.orderStr = item.N;
      //     obj.gName = item.N1;
      //     temArr.push(obj);
      //   }
      // });

      let basketArr = this.$store.state.GDV3.numBasket;
      if (temArr.length === 0 && basketArr.length === 0) {
        this.$util.showConfirm({
          content: "您还没有勾选",
          showCancel: false,
        });
        return;
      }

      temArr.forEach((item) => {
        this.$store.commit("v3NumBasket", item);
      });
      if (isShowBasket) {
        this.$store.commit("v3IsShowNumBaket", true);
      }
      this.$store.commit("v3ClearSelected", new Date().getTime());
      this.$store.commit("v3FootMoney", {});
    },
    selected() {
      let temArr = [];
      this.dataList.forEach((item) => {
        if (item.active) {
          temArr.push(item);
        }
      });
      this.dataList_1.forEach((item) => {
        if (item.active) {
          temArr.push(item);
        }
      });

     
      this.$store.commit("v3selectedNum", temArr);
      let { rate, ratio } = this.$store.state.GDV3.officialRate;
      let { radix } = this.$store.state.GDV3.v3IndexGameAllData;
      let num = temArr.length;
      let money = radix * num * rate * ratio;
      this.$store.commit("v3FootMoney", { num, money });
      let temObj = {};
      let temNum = 0;
      let maxObj = {};
      temArr.forEach((item) => {
        if (temObj[item.tid]) {
          if (temObj[item.tid] < item.odds) {
            temObj[item.tid] = item.odds;
          }
        } else {
          temObj[item.tid] = item.odds;
        }
        if (item.odds > temNum) {
          maxObj = item;
          temNum = item.odds;
        }
      });
      let sumBonus = Object.values(temObj).reduce(
        (accumulator, currentValue) => {
          return accumulator + currentValue;
        },
        0
      );

      if (num !== 0) {
        this.$store.commit("sumBonus", sumBonus);
        this.$store.commit("v3RatioCurValue", maxObj);
      } else {
        this.$store.commit("sumBonus", 0);
        this.$store.commit("v3RatioCurValue", {});
      }
    },
    initData() {
      let obj = this.$store.state.GDV3.v3CurGame;

      let { rate, ratio, percentage } = this.$store.state.GDV3.officialRate;

      let temArr = [];
      let sortArr = [];
      let num = 0;
      let temObj = {};
      JSON.parse(JSON.stringify(obj.C)).forEach((outItem) => {
        if (outItem.I == 1774) {
          outItem.C.forEach((item) => {
            let arr = item.N.split(",");
            arr.forEach((n) => {
              let obj = JSON.parse(JSON.stringify(item));
              obj.N = n;
              obj.N1 = outItem.N;
              obj.tid = outItem.I;
              obj.odds = this.$buyDataHandler.setNumDecimal(
                (item.MxO - (item.MxO - item.MiO) * percentage) * rate,
                3
              );
              if (obj.MxO > num) {
                num = obj.MxO;
                temObj = obj;
              }
              sortArr.push(obj);
            });
          });
        } else {
          outItem.C.forEach((item) => {
            item.N1 = outItem.N;
            item.tid = outItem.I;
            item.odds = this.$buyDataHandler.setNumDecimal(
              (item.MxO - (item.MxO - item.MiO) * percentage) * rate,
              3
            );
            if (item.MxO > num) {
              num = item.MxO;
              temObj = item;
            }
            temArr.unshift(item);
          });
        }
      });

      let { MB, MxO, MiO } = temObj;
      let ratioObj = {
        MB,
        MxO,
        MiO,
      };
      this.$store.commit("v3RatioInitValue", ratioObj);
      sortArr.sort((a, b) => a.N - b.N);
      this.dataList = sortArr;
      this.dataList_1 = temArr;
    },

    changeRate(val) {
      let { rate, ratio, percentage } = val;
      this.dataList.forEach((item) => {
        item.odds = this.$buyDataHandler.setNumDecimal(
          (item.MxO - (item.MxO - item.MiO) * percentage) * rate,
          3
        );
      });

      this.dataList_1.forEach((item) => {
        item.odds = this.$buyDataHandler.setNumDecimal(
          (item.MxO - (item.MxO - item.MiO) * percentage) * rate,
          3
        );
      });
      this.dataList_1.push({});
      this.dataList_1.pop();
    },
  },
};
</script>

<style lang="scss" scoped>
.hezhi {
  background-color: #317455;
  color: #fff;
  padding: 20rpx;
  .top {
    .left {
      width: 70%;
      line-height: 42rpx;
      color: #fff;
      font-size: 30rpx;
    }
  }
}
</style>
