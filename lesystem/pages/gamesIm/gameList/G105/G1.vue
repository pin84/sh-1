<template>
  <view class="play">
    <view class="item" v-for="(item, index) in list" :key="index">
      <view class="item-title" @click="item.isShow = !item.isShow">
        <i
          class="iconfont"
          :class="item.isShow ? 'icon-shousuo' : 'icon-add'"
        ></i>
        <text class="title">{{ item.name }}</text>
      </view>
      <ListSquare
        v-if="item.isShow"
        :list="item.v"
        :repeatLen="item.repeatLen"
      />
    </view>
  </view>
</template>

<script>
import ListSquare from "@/pages/gamesIm/common/commonIm/ListSquareBGGreen";
export default {
  data() {
    return {
      randomArr: [],
      list: [],
      isHasSelected: 0,
    };
  },
  components: {
    ListSquare,
  },
  watch: {
    "$store.state.GDV3.officialRate": {
      handler: function (val) {
        this.changeRate(val);
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
  mounted() {
    this.createRandomList();
  },
  methods: {
    createRandomList() {
      this.list.forEach((outItem) => {
        outItem.v.forEach((item) => {
          this.randomArr.push(item);
        });
      });
    },
    addToBasketRandom(val) {
      let { n } = val;
      let len = this.randomArr.length - 1;
      while (n--) {
        let i = this.$buyDataHandler.createRandomNum(0, len);
        let obj = this.randomArr[i];
        this.$store.commit("v3NumBasket", obj);
      }
      this.$store.commit("v3IsShowNumBaket", true);
    },
    v3ToBuy() {
      let flag = this.addToBasket(false);
      if(!flag)return
      //触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
      let ts = new Date().getTime();
      this.$store.commit("v3ToBuyNext", ts);
    },
    addToBasket(isShowBasket = true) {
      let money = this.$store.state.GDV3.v3InputMoney;
      let temArr = [];
      this.list.forEach((outItem) => {
        outItem.v.forEach((item) => {
          if (item.active) {
            temArr.push(item);
          }
        });
      });

      let basketArr = this.$store.state.GDV3.numBasket;

      if (temArr.length === 0 && basketArr.length === 0) {
        this.$util.showConfirm({
          content: "您还没有勾选",
          showCancel: false,
        });
        return;
      }

  
      let ts = new Date().getTime()
      temArr.forEach((item) => {
        item.money = money
        item.ts = ts

        this.$store.commit("v3NumBasket", item);
      });
      if (isShowBasket) {
        this.$store.commit("v3IsShowNumBaket", true);
      }
      this.$store.commit("v3ClearSelected", new Date().getTime());
      return true
    },
    changeRate(val) {
      let { percentage, selectBack } = val;
      this.list.forEach((outItem) => {
        outItem.v.forEach((item) => {
          item.odds = this.$buyDataHandler.setNumDecimal(
            item.MxO - (item.MxO - item.MiO) * percentage,
            3
          );
        });
        outItem.v.push({});
        outItem.v.pop();
      });
    },
    initData() {
      let { percentage, selectBack } = this.$store.state.GDV3.officialRate;
      let allArr = this.$store.state.GDV3.v3CurGame.C;
      if (!allArr || JSON.stringify(allArr) === "{}") return;
      let arr = [];

      let obj1 = {
        name: "三军/大小",
        isShow: true,
        v: [],
      };
      let ids1 = [899, 902, 907];
      ids1.forEach((id) => {
        let temObj = allArr.find((item) => item.Id == id);
        temObj.C.forEach((item) => {
          item.N1 = temObj.N;
          item.odds = this.$buyDataHandler.setNumDecimal(
            item.MxO - (item.MxO - item.MiO) * percentage,
            3
          );
          obj1.v.push(item);
        });
      });
      arr.push(obj1);

      let obj2 = {
        name: "围骰/全骰",
        isShow: true,
        repeatLen: 3,
        v: [],
      };
      let ids2 = [901, 900];
      ids2.forEach((id) => {
        let temObj = allArr.find((item) => item.Id == id);
        temObj.C.forEach((item) => {
          item.N1 = temObj.N;
          item.odds = this.$buyDataHandler.setNumDecimal(
            item.MxO - (item.MxO - item.MiO) * percentage,
            3
          );
          obj2.v.push(item);
        });
      });
      arr.push(obj2);

      let obj3 = {
        name: "点数",
        isShow: true,
        v: [],
      };
      let ids3 = [903];
      ids3.forEach((id) => {
        let temObj = allArr.find((item) => item.Id == id);
        temObj.C.forEach((item) => {
          item.N1 = temObj.N;
          item.odds = this.$buyDataHandler.setNumDecimal(
            item.MxO - (item.MxO - item.MiO) * percentage,
            3
          );
          obj3.v.push(item);
        });
      });
      arr.push(obj3);

      let obj4 = {
        name: "长牌",
        isShow: true,
        v: [],
      };
      let ids4 = [904];
      ids4.forEach((id) => {
        let temObj = allArr.find((item) => item.Id == id);
        temObj.C.forEach((item) => {
          item.N1 = temObj.N;
          item.odds = this.$buyDataHandler.setNumDecimal(
            item.MxO - (item.MxO - item.MiO) * percentage,
            3
          );
          obj4.v.push(item);
        });
      });
      arr.push(obj4);

      let obj5 = {
        name: "短牌",
        isShow: true,
        v: [],
      };
      let ids5 = [905];
      ids5.forEach((id) => {
        let temObj = allArr.find((item) => item.Id == id);
        temObj.C.forEach((item) => {
          item.N1 = temObj.N;
          item.odds = this.$buyDataHandler.setNumDecimal(
            item.MxO - (item.MxO - item.MiO) * percentage,
            3
          );
          obj5.v.push(item);
        });
      });
      arr.push(obj5);
      this.list = arr;
    },
  },
};
</script>

<style lang="scss" scoped>
.play {
  height: 100%;
  padding: 10rpx;
  background-color: #317455;
  overflow: scroll;

  .item {
    .item-title {
      .iconfont {
        color: #fff;
        font-size: 48rpx;
      }
      .title {
        color: #c4e3cf;
        font-size: 36rpx;
        margin-left: 10rpx;
      }
    }
  }
}
</style>
