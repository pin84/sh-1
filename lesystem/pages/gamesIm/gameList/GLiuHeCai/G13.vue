<template>
  <view class="G7">
    <view class="s-box">
      <view class="uni-list-cell-db">
        <picker
          @change="changeSelect1"
          :value="titleIndex1"
          :range="selectList1"
          range-key="lable"
        >
          <view class="uni-input">{{ selectList1[titleIndex1].lable }}</view>
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
      <ShengXiao
        :list="list"
        :numArr="numArr"
        :limitLen="limitLen"
        @selectedNum="selectedNum"
      />
    </view>
  </view>
</template>

<script>
import ListSquare from "@/pages/gamesIm/common/commonIm/ListSquare";
import bgcolor from "./bgcolor";
import ShengXiao from "./ShengXiao_G13";
import common from "./common";
export default {
  data() {
    return {
      titleIndex1: 0,
      titleIndex2: 0,
      limitLen: 0,
      curSelect1: "二尾",
      selectList1: [],
      selectList3: [
        { lable: "二尾", limit: 2 },
        { lable: "三尾", limit: 3 },
        { lable: "四尾", limit: 4 },
        { lable: "二尾不中", limit: 2 },
        { lable: "三尾不中", limit: 3 },
        { lable: "四尾不中", limit: 4 },
      ],
      selectList2: ["单选/复式", "胆拖"],
      curSelect2: "单选/复式",
      list: [{ N: "aa", odds: 3.3 }],

      numArr: [],
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
        this.changeRate(percentage);
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
    changeRate(percentage) {
      this.list.forEach((item) => {
        item.odds = this.$buyDataHandler.setNumDecimal(
          item.MxO - (item.MxO - item.MiO) * percentage,
          5
        );
      });

      this.list.push({});
      this.list.pop();
    },
    selectedNum(arr) {
      this.selectedList = arr;
    },

    changeSelect1(e) {
      let index = e.target.value;
      this.titleIndex1 = index;
      this.curSelect1 = this.selectList1[index].lable;

      this.titleIndex2 = 0;

      this.curSelect2 = "单选/复式";
      this.limitLen = 0;
      this.initData();
    },
    changeSelect(e) {
      let index = e.target.value;
      this.titleIndex2 = index;
      this.curSelect2 = this.selectList2[index];

      this.$store.commit("v3ClearSelected", new Date().getTime());
      if (this.curSelect2 == "胆拖") {
        let obj = this.selectList1.find((obj) => obj.lable == this.curSelect1);
        this.limitLen = obj.limit - 1;
      } else {
        this.limitLen = 0;
      }
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
      let { limit } = this.selectList1.find(
        (obj) => obj.lable == this.curSelect1
      );
      if (basketLen == 0) {
        if (len < limit) {
          this.$util.showConfirm({
            content: `至少需要勾选${limit}个`,
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
        let arr = this.selectedList.splice(0, limit - 1);
        let nameList = [];
        let idList = [];
        arr.forEach((item) => {
          nameList.push(item.N);
          idList.push(item.I);
        });

        this.selectedList.forEach((item) => {
          list1.push({
            N1: "连尾" + this.curSelect1,
            N: nameList.join(",") + "," + item.N,
            odds: item.odds,
            money,
            I: item.I,
            goal: item.I + "," + idList.join(","),
            ts,
          });
        });
      } else {
        let nameList = [];
        this.selectedList.forEach((item) => {
          nameList.push(item.N);
        });
      console.log('=nameList=',nameList);
        let list = this.$buyDataHandler.getCombine(nameList, limit);
        list.forEach((name) => {

          let sortArr = this.selectedList.filter(item=> name.split('').includes(item.N)).sort((a,b)=>a.odds-b.odds)

          let {odds,I} = sortArr[0]
          // let {  I } = this.selectedList.find((item) =>
          //   name.startsWith(item.N)
          // );
          let arr = name.split("");
          let idList = [];
          arr.forEach((n) => {
            let { I } = this.selectedList.find((item) => item.N == n);
            idList.push(I);
          });

          list1.push({
            N1: "连尾" + this.curSelect1,
            N: arr.join(","),
            odds,
            money,
            I,
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
      this.numArr = common.weishuList();
      let { percentage, selectBack } = this.$store.state.GDV3.officialRate;
      let arr = this.$store.state.GDV3.v3CurGame.C;
      arr.sort((a,b)=>a.Id - b.Id)
      let selectList1 = []
      arr.forEach(obj=>{
        let limit = this.selectList3.find(item=> obj.N.includes(item.lable)).limit
        selectList1.push( { lable: obj.N, limit},)
      })
      this.selectList1 = selectList1
      this.curSelect1 = selectList1[this.titleIndex1].lable
      let idx = this.selectList1.findIndex(
        (obj) => obj.lable == this.curSelect1
      );
      arr.sort((a, b) => a.Id - b.Id);

      let obj = JSON.parse(JSON.stringify(arr[idx]));

      obj.C.forEach((item) => {
        item.N1 = obj.N;
        item.odds = this.$buyDataHandler.setNumDecimal(
          item.MxO - (item.MxO - item.MiO) * percentage,
          5
        );
      });
      obj.C.sort((a, b) => a.N - b.N);
      this.list = obj.C;
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