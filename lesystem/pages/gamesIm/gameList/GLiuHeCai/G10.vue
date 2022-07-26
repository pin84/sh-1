<template>
  <view class="hexiao">
    <view class="top">
      <view
        class="title"
        :class="{ active: curTitleIndex == index }"
        v-for="(title, index) in titleList"
        :key="index"
        @click="changeTitle(index)"
        >{{ title }}</view
      >
    </view>

    <ShengXiao v-if="list1.length" :list="list1" :limitLen="xiaoLimit" />
  </view>
</template>

<script>
import ShengXiao from "./ShengXiao_G10";
import ListSquare from "@/pages/gamesIm/common/commonIm/ListSquare";
import common from "./common";
export default {
  data() {
    return {
      list: [],
      list1: [],
      titleList: ["一肖中", "一肖不中"],
      curTitleIndex: 0,
      curType: "一肖",
      xiaoArr: [
        "一肖",
        "二肖",
        "三肖",
        "四肖",
        "五肖",
        "六肖",
        "七肖",
        "八肖",
        "九肖",
        "十肖",
        "十一肖",
      ],
      xiaoLimit: 1,
      numList: [],
      curItem: {}, //当前的生肖，一肖中 或一肖不中
    };
  },
  components: {
    ShengXiao,
    ListSquare,
  },
  watch: {
    "$store.state.GDV3.officialRate": {
      handler: function (val) {
        this.changeRate(val);
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
    "$store.state.GDV3.temValue": function (val) {
      console.log(val);
      this.xiaoLimit = this.xiaoArr.findIndex((str) => str == val) + 1;
      this.curType = val;
      this.titleList = [this.curType + "中", this.curType + "不中"];
      this.initData();
    },
  },

  created() {
    this.initData();
  },

  methods: {
    changeTitle(index) {
      this.curTitleIndex = index;
      this.xiaoLimit = this.xiaoLimit =
        this.xiaoArr.findIndex((str) => str == this.curType) + 1;
      this.initData();
    },

    async v3ToBuy() {
      let flag = await this.addToBasket(false);
      if (!flag) return;
      //触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
      let ts = new Date().getTime();
      this.$store.commit("v3ToBuyNext", ts);
    },

    // [{"id":1899,"amount":1,"odds":11.61,"goal":"1474","timestamp":1623413478}]
    // [{"id":1899,"goal":"1474","odds":10.89,"amount":"1","timestamp":1623413597112}]

    addToBasket(isShowBasket = true) {
      let arr1 = [];
      this.list1.forEach((item) => {
        if (item.active) {
          arr1.push(item);
        }
      });
      let len = arr1.length;
      let basketArr = this.$store.state.GDV3.numBasket;
      if (isShowBasket) {
        if (basketArr.length) {
        } else {
          if (len < this.xiaoLimit) {
            this.$util.showConfirm({
              content: `必须勾选${this.xiaoLimit}个`,
              showCancel: false,
            });
            return false;
          }
        }
      } else {
        if (basketArr.length == 0 && len < this.xiaoLimit) {
          this.$util.showConfirm({
            content: `必须勾选${this.xiaoLimit}个`,
            showCancel: false,
          });
          return false;
        }
      }

      if (len == this.xiaoLimit) {
        let goal = [];
        let nameArr = [];
        arr1.forEach((item) => {
          goal.push(item.I);
          nameArr.push(item.N);
        });

        let money = this.$store.state.GDV3.v3InputMoney;
        let { I, N } = this.curItem;
        let { odds } = arr1[0];
        let ts = new Date().getTime();
        let obj = {
          N1: N,
          goal: goal.join(","),
          N: nameArr.join(),
          money,
          I,
          odds,
          ts,
        };

        this.$store.commit("v3NumBasket", obj);
        this.$store.commit("v3ClearSelected", ts);
      }

      if (isShowBasket) {
        this.$store.commit("v3IsShowNumBaket", true);
      }
      return true;
    },

    changeRate(val) {
      let { percentage } = val;
      this.$buyOptions.changeRateOption(this.list1, percentage);
    },

    initData() {
      this.list1 = [];
      let { percentage, selectBack } = this.$store.state.GDV3.officialRate;
      let curObj = JSON.parse(
        JSON.stringify(
          this.$store.state.GDV3.v3CurGame.C.find((obj) =>
            obj.N.includes(this.curType)
          )
        )
      );

      let temShengxiaoList = this.$store.state.GDV3.v3playList;
      let shengxiaoList = JSON.parse(JSON.stringify(temShengxiaoList.find((item) => item.Id == 9).C[0].C))

      shengxiaoList.sort((a, b) => a.I - b.I);

      let curItem;
      if (this.curTitleIndex == 1) {
        curItem = curObj.C.find((obj) => obj.N.includes("不"));
      } else {
        curItem = curObj.C.find((obj) => !obj.N.includes("不"));
      }

      this.curItem = curItem;

      let { MB, MiO, MxO } = curItem;
      shengxiaoList.forEach((obj, index) => {
        obj.active = false;
        obj.isEnable = false;
        obj.N1 = curObj.N;
        obj.MB = MB;
        obj.MiO = MiO;
        obj.MxO = MxO;
        obj.odds = this.$buyDataHandler.setNumDecimal(
          MxO - (MxO - MiO) * percentage,
          3
        );
        obj.numList = common.ShengXiaoList()[index];
      });
      setTimeout(() => {
        this.list1 = shengxiaoList;
      }, 100);
    },
  },
};
</script>
<style lang="scss" scoped>
.hexiao {
  .top {
    display: flex;
    .title {
      background-color: rgba(0, 0, 0, 0.2);
      width: 50%;
      border-right: 1px solid #fff;
      text-align: center;
      // padding: 8rpx 0;
      height: 60rpx;
      line-height: 60rpx;
      font-size: 28rpx;
      border-bottom: 1px solid transparent;
      box-sizing: border-box;
      &.active {
        border-bottom: 2px solid #b62929;
        color: #b62929;
      }
    }
  }
}
</style>
