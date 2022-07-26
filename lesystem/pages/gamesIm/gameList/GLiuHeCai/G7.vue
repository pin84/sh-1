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

    <view v-if="curSelect2 == '单选/复式' || curSelect2 == '胆拖'" class="list">
      <view
        class="special-item"
        @click="selectedItem(v)"
        :class="[{ active: v.active }, { bg_green: v.isPrime }]"
        v-for="(v, index) in list"
        :key="index"
        :style="{ width: '33%' }"
      >
        <text class="text" :style="{ backgroundColor: v.bc }">{{ v.N }}</text>
        <text class="odds"
          >{{ v.odds }} {{ v.odds1 ? "/ " + v.odds1 : "" }}
        </text>
      </view>
    </view>

    <view v-else class="list">
      <ShengXiao :ts="ts" :list="list2" :numList="numList" />
    </view>
  </view>
</template>

<script>
import ListSquare from "@/pages/gamesIm/common/commonIm/ListSquare";
import bgcolor from "./bgcolor";
import ShengXiao from "./ShengXiaoIm_G7";
import common from "./common";
import loginVue from "../../../login/login/login.vue";
export default {
  data() {
    return {
      curPercentage:0,
      titleIndex1: 0,
      titleIndex2: 0,
      limitLen: 3,
      count: 0,
      curSelect1: "三中二",
      selectList1: ["三中二", "三全中", "二全中", "二中特", "特串"],
      selectList2: ["单选/复式", "胆拖"],
      curSelect2: "单选/复式",
      list: [{ N: "aa", odds: 3.3 }], //单式/复式数据
      numList: [],
      list2: [],
      ts: 0,
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
        let list;
        if (this.curSelect2 == "单选/复式" || this.curSelect2 == "胆拖") {
          list = this.list;
        } else {
          list = this.list2;
        }
        this.curPercentage = percentage
        this.changeRate(list, percentage);
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
    "$store.state.GDV3.clearSelected": function (val) {
      this.resetData();
    },
  },

  created() {
    this.initData();
  },

  methods: {
    changeSelect1(e) {
      let index = e.target.value;
      this.titleIndex1 = index;
      this.curSelect1 = this.selectList1[index];
      this.titleIndex2 = 0;
      let limitLen;
      if (this.curSelect1.startsWith("三")) {
        this.selectList2 = ["单选/复式", "胆拖"];
        limitLen = 3;
      } else {
        limitLen = 2;
        this.selectList2 = [
          "单选/复式",
          "胆拖",
          "生肖对碰",
          "尾数对碰",
          "混合对碰",
        ];
      }
      this.limitLen = limitLen;
      this.resetData();
      this.initData();
    },

    changeSelect(e) {
      this.ts = new Date().getTime();
      let index1 = e.target.value;
      this.titleIndex2 = index1;
      this.curSelect2 = this.selectList2[index1];

      let index = this.selectList2.findIndex((str) => str == this.curSelect2);
      let temList = [];
      let list = [];
      let numList = [];
      let odds1 = this.list[0].odds1 ? "/" + this.list[0].odds1 : "";
      let odds =
        this.list[0].odds +
        String(this.list[0].odds1 ? "/" + this.list[0].odds1 : "");

      if (index == 2) {
        temList = common.shengXiaoName();
        numList = common.ShengXiaoList();
      } else if (index == 3) {
        for (let i = 0; i < 10; i++) {
          temList.push(i);
        }
        numList = common.weishuList();
      } else if (index == 4) {
        temList = common.shengXiaoName();
        for (let i = 0; i < 10; i++) {
          temList.push(i);
        }

        let list1 = common.ShengXiaoList();
        let list2 = common.weishuList();
        numList = list1.concat(list2);
      }

      temList.forEach((name) => {
        let obj = JSON.parse(JSON.stringify(this.list[0]));
        obj.N = name;
        list.push(obj);
      });

      this.changeRate(list,this.curPercentage)
      this.list2 = list;
      this.numList = numList;
      this.resetData();
    },
    resetData() {
      this.count = 0;
      this.list.forEach((item, idx) => {
        if (item.active) {
          item.active = false;
          item.isPrime = false;
        }
      });
      this.refreshPage();
    },

    refreshPage() {
      this.list.push({});
      this.list.pop();
    },
    selectedItem(obj) {
      if (this.curSelect2 == "单选/复式") {
        if (obj.active) {
          obj.active = false;
          this.count--;
        } else {
          if (this.count >= 12) return;
          obj.active = true;
          this.count++;
        }
      } else {
        let len = this.limitLen - 1;
        if (obj.active) {
          if (obj.isPrime && this.count > len) return;
          obj.active = false;
          obj.isPrime = false;
          this.count--;
        } else {
          if (this.count < len) {
            obj.isPrime = true;
          }
          obj.active = true;
          this.count++;
        }
      }
      this.refreshPage();
    },

    async v3ToBuy() {
      let flag = await this.addToBasket(false);

      let list = this.$store.state.GDV3.numBasket;


      if (!flag && list.length ==0) return;
      //触发购买的方法，在@/pages/gamesIm/gameList/index.vue里监听
      let ts = new Date().getTime();
      this.$store.commit("v3ToBuyNext", ts);
    },

    addToBasket(isShowBasket = true) {
      let basketLen = this.$store.state.GDV3.numBasket.length;
      let money = this.$store.state.GDV3.v3InputMoney;
      let index = this.selectList2.findIndex((str) => str == this.curSelect2);

      let slist = [];
      let prime = [];
      let curList = [];
      if (index < 2) {
        curList = this.list;
      } else {
        curList = this.list2;
      }

      curList.forEach((item) => {
        if (item.active && item.isPrime) {
          prime.push(item);
        } else if (item.active) {
          slist.push(item);
        }
      });

      let list;

      if (basketLen == 0) {
        let flag = this.moneyLengthCheck(slist, prime);
        if (!flag) return;
      }

      switch (index) {
        case 0:
          list = this.handlerData1(slist, this.limitLen);
          break;
        case 1:
          if (slist.length && prime.length) {
            list = this.handlerData2(slist, prime, this.limitLen);
          }
          break;

        case 2:
          if (slist.length) {
            let ShengXiaoList = common.ShengXiaoList();
            list = this.handlerData3(ShengXiaoList);
          }
          break;

        case 3:
          if (slist.length) {
            let ShengXiaoList = common.weishuList();
            list = this.handlerData3(ShengXiaoList);
          }
          break;

        case 4:
          if (slist.length) {
            let ShengXiaoList = common.ShengXiaoList();
            let weishuList = common.weishuList();
            let list2 = ShengXiaoList.concat(weishuList);
            list = this.handlerData3(list2);
          }
          break;
      }

      if (list) {
        return this.$buyOptions.addToBasket({
          selectArr: JSON.parse(JSON.stringify(list)),
          isShowBasket,
        });
      } else {
        return false;
      }
    },
    handlerData3(numList) {
      let indexList = [];
      this.list2.forEach((item, index) => {
        if (item.active) {
          indexList.push(index);
        }
      });
      let arr1 = numList[indexList[0]];
      let arr2 = numList[indexList[1]];
      let tem = [];
      let ts = new Date().getTime();
      let {odds,odds1} = this.list2[0]
      arr1.forEach((outObj) => {
        let obj = this.list.find((item) => item.N == outObj.num);
        arr2.forEach((outObj1) => {
          let obj1 = this.list.find((item) => item.N == outObj1.num);

          let flag = Number(obj.N) > Number(obj1.N);
          tem.push({
            I: obj1.I,
            N1: this.curSelect1,
            N: flag ? obj1.N + "," + obj.N : obj.N + "," + obj1.N,
            // odds: obj.odds,
            // odds1: obj.odds + obj.odds1 ? "/" + obj.odds1 : "",
            odds: odds,
            odds1: odds + odds1 ? "/" + odds1 : "",
            ts,
            goal: obj1.I + "," + obj.I,
          });
        });
      });

      return tem;
    },

    handlerData2(slist, prime, limitLen) {
      let list = [];
      let { I, odds, odds1 } = prime[0];
      let ts = new Date().getTime();
      let name = [];
      let ids = [];
      prime.forEach((item) => {
        name.push(item.N);
        ids.push(item.I);
      });
      slist.forEach((item) => {
        list.push({
          I,
          N1: this.curSelect1,
          N: name.join(",") + "," + item.N,
          odds,
          odds1,
          ts,
          goal: ids.join(",") + "," + String(item.I),
        });
      });

      return list;
    },

    moneyLengthCheck(list, prime) {
      let len = list.length + prime.length;

      if (len < this.limitLen) {
        this.$util.showConfirm({
          content: `至少需要勾选${this.limitLen}个`,
          showCancel: false,
        });
        return;
      }
      let money = this.$store.state.GDV3.v3InputMoney;
      if (money == "" || !money) {
        this.$util.showConfirm({
          content: "请输入有效金额！",
          showCancel: false,
        });
        return;
      }

      return true;
    },

    handlerData1(list, limitLen) {
      let arr1 = [];
      list.forEach((item) => {
        arr1.push(item.I);
      });
      let idArr = this.$buyDataHandler.combination(arr1, limitLen);
      let ts = new Date().getTime();
      let tem = [];
      idArr.forEach((arr) => {
        let objArr = list.filter((item) => arr.includes(item.I));

        let goal = [];
        let nameArr = [];
        objArr.forEach((item) => {
          goal.push(item.I);
          nameArr.push(item.N);
        });
        let { I, odds, odds1 } = objArr[0];

        tem.push({
          I,
          N1: this.curSelect1,
          N: nameArr.join(","),
          odds,
          odds1,
          ts,
          goal: goal.join(","),
        });
      });
      return tem;
    },
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
    initData() {
      let { percentage, selectBack } = this.$store.state.GDV3.officialRate;
      let arr = this.$store.state.GDV3.v3CurGame.C;
      arr.sort((a, b) => a.Id - b.Id);
      let selectList1 = [];
      arr.forEach((obj, idx) => {
        selectList1.push(obj.N);
      });
      this.selectList1 = selectList1;
      this.curSelect1 = selectList1[this.titleIndex1];
      let curObj = arr.find((item) => item.N == this.curSelect1);
      let list = JSON.parse(JSON.stringify(curObj.C));
      list.sort((a, b) => a.N - b.N);
      let len = list.length;
      let big = [];
      let small = [];
      if (this.curSelect1 == "三中二" || this.curSelect1 == "二中特") {
        for (let i = 0; i < len; i += 2) {
          if (list[i].MxO > list[i + 1].MxO) {
            big.push(list[i]);
            small.push(list[i + 1]);
          } else {
            big.push(list[i + 1]);
            small.push(list[i]);
          }
        }
        small.forEach((item, idx) => {
          item.MiO1 = big[idx].MiO;
          item.MxO1 = big[idx].MxO;
        });
      } else {
        small = list;
        big = [];
      }

      small.forEach((item) => {
        item.N1 = this.curSelect1;
        for (let [key, value] of Object.entries(bgcolor)) {
          if (value.includes(Number(item.N))) {
            item.bc = key;
            break;
          }
        }
      });

      this.changeRate(small, percentage);
      this.list = small;
      this.curSelect2 = "单选/复式";
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
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10rpx;
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