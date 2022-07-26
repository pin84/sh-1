<template>
  <view class="G7">
    <view class="s-box">
      <view class="uni-list-cell-db">
        <picker
          @change="changeSelect1"
          :value="titleIndex1"
          :range="selectList1"
        >
          <view class="uni-input">{{ selectList1[titleIndex1] }}</view>
        </picker>
        <text class="iconfont icon-icon-test4"></text>
      </view>
      <view class="uni-list-cell-db">
        <picker
          @change="changeSelect"
          :value="titleIndex2"
          :range="selectList2"
        >
          <view class="uni-input">{{ selectList2[titleIndex2] }}</view>
        </picker>
        <text class="iconfont icon-icon-test4"></text>
      </view>
    </view>

    <view class="list">
      <ShengXiao :list="list" :limitLen="limitLen" @selectedNum="selectedNum" />
    </view>
  </view>
</template>

<script>
import ListSquare from "@/pages/gamesIm/common/commonIm/ListSquare";
import bgcolor from "./bgcolor";
import ShengXiao from "./ShengXiao_G12";
export default {
  data() {
    return {
      titleIndex1: 0,
      titleIndex2: 0,
      limitLen: 0,
      curSelect1: "连肖二肖",
      selectList1: [],
      selectListobj: [
        {
          name: "连肖二肖",
          num: 2,
        },
        {
          name: "连肖三肖",
          num: 3,
        },
        {
          name: "连肖四肖",
          num: 4,
        },
        {
          name: "连肖五肖",
          num: 5,
        },
      ],

      selectList2: ["单选/复式", "胆拖"],
      curSelect2: "单选/复式",
      list: [{ N: "aa", odds: 3.3 }],
      list1: [],

      selectedList: [],
    };
  },
  components: {
    ListSquare,
    ShengXiao,
  },
  watch: {
    "$store.state.GDV3.officialRate": {
      handler: function (val) {
        let { percentage } = val;
        this.changeRate(this.list, percentage);
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

    changeRate(list, percentage) {
      list.forEach((item) => {
        if (item.MxO1) {
          item.odds1 = this.$buyDataHandler.setNumDecimal(
            item.MxO1 - (item.MxO1 - item.MiO1) * percentage,
            5
          );
        }
        item.odds = this.$buyDataHandler.setNumDecimal(
          item.MxO - (item.MxO - item.MiO) * percentage,
          5
        );
      });

      list.push({});
      list.pop();
    },
    selectedNum(arr) {
      this.selectedList = arr;
    },

    changeSelect1(e) {
      let index = e.target.value;
      this.titleIndex1 = index;
      this.curSelect1 = this.selectList1[index];

      console.log(this.curSelect1);
      this.titleIndex2 = 0;
      this.limitLen = 0;
      this.initData();
    },
    changeSelect(e) {
      let index = e.target.value;
      this.titleIndex2 = index;
      this.curSelect2 = this.selectList2[index];
      this.$store.commit("v3ClearSelected", new Date().getTime());
      if (this.curSelect2 == "胆拖") {
        let num =
          this.selectListobj.find((obj) => obj.name == this.curSelect1).num - 1;
        console.log(num);
        this.limitLen = num;
      } else {
        this.limitLen = 0;
      }
    },

    addToBasketRandom(val) {
      let randomArr = [];
      this.allData.forEach((arr) => {
        randomArr.push(...arr);
      });
      let { n } = val;
      this.$buyOptions.addToBasketRandomCredit(randomArr, n);
    },
    async v3ToBuy() {
      let flag = await this.addToBasket(false);
      if (!flag) return;
      //触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
      let ts = new Date().getTime();
      this.$store.commit("v3ToBuyNext", ts);
    },

    addToBasket(isShowBasket = true) {
      let len = this.selectedList.length;
      let basketLen = this.$store.state.GDV3.numBasket.length;
      // let idx = this.selectList1.findIndex((str) => str == this.curSelect1) + 2;
      let idx = this.selectListobj.find(
        (obj) => obj.name == this.curSelect1
      ).num;
      if (basketLen == 0) {
        if (len < idx) {
          this.$util.showConfirm({
            content: `至少需要勾选${idx}个`,
            showCancel: false,
          });
          return;
        }
      }
      console.log(this.selectedList);

      let money = this.$store.state.GDV3.v3InputMoney;
      let ts = new Date().getTime();
      let list1 = [];
      if (this.curSelect2 == "胆拖") {
        let arr = this.selectedList.splice(0, idx - 1);
        let nameList = [];
        let idList = [];
        arr.forEach((item) => {
          nameList.push(item.N);
          idList.push(item.I);
        });

        let index = arr.findIndex((item) => item.N == "牛");
        if (index != -1) {
          let temArr = arr.splice(index, 1);
          arr.unshift(temArr[0]);
        }

        this.selectedList.forEach((item) => {
          let flag = item.N == "牛";
          let N = flag
            ? item.N + "," + nameList.join(",")
            : nameList.join(",") + "," + item.N;
          list1.push({
            N1: this.curSelect1,
            N,
            odds: flag ? item.odds : arr[0].odds,
            money,
            I: flag ? item.I : idList[0],
            goal: flag
              ? item.I + "," + idList.join(",")
              : idList.join(",") + "," + item.I,
            ts,
          });
        });
      } else {
        let index = this.selectedList.findIndex((item) => item.N == "牛");
        if (index != -1) {
          let temArr = this.selectedList.splice(index, 1);
          this.selectedList.unshift(temArr[0]);
        }
        let nameList = [];
        this.selectedList.forEach((item) => {
          nameList.push(item.N);
        });

        let list = this.$buyDataHandler.getCombine(nameList, idx);

        list.forEach((name) => {
          let { odds } = this.selectedList.find((item) =>
            name.startsWith(item.N)
          );
          let arr = name.split("");
          let idList = [];
          arr.forEach((n) => {
            let { I } = this.selectedList.find((item) => item.N == n);
            idList.push(I);
          });

          list1.push({
            N1: this.curSelect1,
            N: name.split("").join(","),
            odds,
            money,
            I: idList[0],
            goal: idList.join(","),
            ts,
          });
        });
      }

      list1.forEach((item) => {
        this.$store.commit("v3NumBasket", item);
      });

      if (isShowBasket) {
        this.$store.commit("v3IsShowNumBaket", true);
      }
      this.$store.commit("v3ClearSelected", new Date().getTime());
      this.selectedList = [];
      return true;
    },

    initData() {
      let { percentage, selectBack } = this.$store.state.GDV3.officialRate;
      let arr = this.$store.state.GDV3.v3CurGame.C;
      arr.sort((a, b) => a.Id - b.Id);
      let selectList1 = [];
      arr.forEach((obj) => {
        selectList1.push(obj.N);
      });
      this.selectList1 = selectList1;
      this.curSelect1 = selectList1[this.titleIndex1];

      let curObj = arr.find((item) => item.N == this.curSelect1);
      let list = JSON.parse(JSON.stringify(curObj.C));
      list.sort((a, b) => a.I - b.I);

      list.forEach((item) => {
        item.N1 = this.curSelect1;
        item.odds = this.$buyDataHandler.setNumDecimal(
          item.MxO - (item.MxO - item.MiO) * percentage,
          5
        );
      });

      this.list = list;
    },
  },
};
</script>
<style lang="scss" >
.uni-list-cell-db {
  border: 1px solid #ccc;
  border-radius: 10rpx;
  margin-left: 2rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  .uni-input {
    padding: 0;
    width: 300rpx;
    text-align: center;
  }
}
</style>


<style lang="scss" scoped>
$w: 56rpx;
.G7 {
  width: 100%;
  padding: 0 5rpx;
  .s-box {
    display: flex;
    justify-content: space-around;
    padding: 10rpx 0;
    .select {
      width: 48%;
      height: 60rpx;
      outline: none;
    }
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 8rpx;
    // border: 1px solid red;
    .special-item {
      display: flex;
      height: 126rpx;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid #e3e3e3;
      background-color: #fff;
      border-radius: 15rpx;
      padding: 5rpx 0;
      &.bg_green {
        background-color: rgba(23, 255, 77, 0.3);
        .odds {
          color: #000;
        }
      }

      &.bg_yellow {
        background-color: #ffd800;
        .odds {
          color: #000;
        }
      }
      .text {
        display: inline-block;
        width: $w;
        height: $w;
        line-height: $w;
        border-radius: 50%;
        background-color: red;
        text-align: center;
        color: #fff;
        font-size: 34rpx;
      }
      .odds {
        font-size: 28rpx;
        color: #c42133;
      }
    }
    .active {
      background-color: #ffd800;
    }
  }
}
</style>