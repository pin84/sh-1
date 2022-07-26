<template>
  <view class="num-box">
    <block v-for="(item, idx) in list" :key="idx">
      <view class="item-box">
        <view
          @click="selected(item)"
          class="item-num flex flex-direction"
          :class="{ 'item-num-active': item.active }"
          :key="idx"
          :style="{ backgroundColor: item.bc }"
        >
          <text class="text text-white text-bold text-xxl">{{ item.N }}</text>
          <text class="text text-c text-xs">{{ item.odds || 0 }}</text>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
import bgcolor from "@/pages/gamesIm/gameList/GLiuHeCai/bgcolor.js";
import common from "@/pages/gamesIm/gameList/GLiuHeCai/common.js";
export default {
  props: {
    limitLen: {
      type: Number,
      default: () => 0,
    },
    list: {
      type: Array,
      default: () => [{ N: 1, odds: 3.22, active: true }],
    },
  },

  data() {
    return {
      isHasSelected: 0,
    };
  },

  watch: {
    "$store.state.GDV3.clearSelected": function (val) {
      this.resetData();
    },
    "$store.state.GDV3.curSelectedType": function (val) {
      this.selectedType(val);
    },
  },

  methods: {
    selectedType(val) {
      let daxiao = 24;
      switch (val) {
        case "":
          this.list.forEach((item) => {
            if (item.active) {
              item.active = false;
            }
          });
          break;
        case "家禽":
          let { A } = common.shengXiaoType();
          this.list.forEach((item) => {
            if (A.includes(Number(item.N))) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "野兽":
          let { B } = common.shengXiaoType();
          this.list.forEach((item) => {
            if (B.includes(Number(item.N))) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "单":
          this.list.forEach((item) => {
            if (item.N % 2 == 1) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "双":
          this.list.forEach((item) => {
            if (item.N % 2 == 0) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "大":
          this.list.forEach((item) => {
            if (item.N > 24) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "小":
          this.list.forEach((item) => {
            if (item.N <= 24) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "合单":
          this.list.forEach((item) => {
            let sum = item.N.split("").reduce((accumulator, currentValue) => {
              return accumulator + Number(currentValue);
            }, 0);
            if (sum % 2 == 1) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "合双":
          this.list.forEach((item) => {
            let sum = item.N.split("").reduce((accumulator, currentValue) => {
              return accumulator + Number(currentValue);
            }, 0);
            if (sum % 2 == 0) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "尾大":
          this.list.forEach((item) => {
            let arr = item.N.split("");
            let len = arr.length - 1;
            if (arr[len] > 4) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "尾小":
          this.list.forEach((item) => {
            let arr = item.N.split("");
            let len = arr.length - 1;
            if (arr[len] <= 4) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "合尾大":
          this.list.forEach((item) => {
            let sum = item.N.split("").reduce((accumulator, currentValue) => {
              return accumulator + Number(currentValue);
            }, 0);
            let arr = String(sum).split("");
            let len = arr.length - 1;
            if (arr[len] > 4) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "合尾小":
          this.list.forEach((item) => {
            let sum = item.N.split("").reduce((accumulator, currentValue) => {
              return accumulator + Number(currentValue);
            }, 0);
            let arr = String(sum).split("");
            let len = arr.length - 1;
            if (arr[len] <= 4) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "红":
          this.list.forEach((item) => {
            if (bgcolor["#c42133"].includes(Number(item.N))) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "蓝":
          this.list.forEach((item) => {
            if (bgcolor["#2373d6"].includes(Number(item.N))) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "绿":
          this.list.forEach((item) => {
            if (bgcolor["#38b81b"].includes(Number(item.N))) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "红单":
          this.list.forEach((item) => {
            if (
              bgcolor["#c42133"].includes(Number(item.N)) &&
              item.N % 2 == 1
            ) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "红双":
          this.list.forEach((item) => {
            if (
              bgcolor["#c42133"].includes(Number(item.N)) &&
              item.N % 2 == 0
            ) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "红大":
          this.list.forEach((item) => {
            if (bgcolor["#c42133"].includes(Number(item.N)) && item.N > 24) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "红小":
          this.list.forEach((item) => {
            if (bgcolor["#c42133"].includes(Number(item.N)) && item.N <= 24) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "蓝单":
          this.list.forEach((item) => {
            if (
              bgcolor["#2373d6"].includes(Number(item.N)) &&
              item.N % 2 == 1
            ) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "蓝双":
          this.list.forEach((item) => {
            if (
              bgcolor["#2373d6"].includes(Number(item.N)) &&
              item.N % 2 == 0
            ) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "蓝大":
          this.list.forEach((item) => {
            if (
              bgcolor["#2373d6"].includes(Number(item.N)) &&
              item.N > daxiao
            ) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "蓝小":
          this.list.forEach((item) => {
            if (
              bgcolor["#2373d6"].includes(Number(item.N)) &&
              item.N <= daxiao
            ) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "绿单":
          this.list.forEach((item) => {
            if (
              bgcolor["#38b81b"].includes(Number(item.N)) &&
              item.N % 2 == 1
            ) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "绿双":
          this.list.forEach((item) => {
            if (
              bgcolor["#38b81b"].includes(Number(item.N)) &&
              item.N % 2 == 0
            ) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "绿大":
          this.list.forEach((item) => {
            if (
              bgcolor["#38b81b"].includes(Number(item.N)) &&
              item.N > daxiao
            ) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "绿小":
          this.list.forEach((item) => {
            if (
              bgcolor["#38b81b"].includes(Number(item.N)) &&
              item.N <= daxiao
            ) {
              item.active = true;
            } else {
              item.active = false;
            }
          });
          break;
        case "0头":
          this.startsWithFilter(this.list, "0");
          break;
        case "1头":
          this.startsWithFilter(this.list, "1");
          break;
        case "2头":
          this.startsWithFilter(this.list, "2");
          break;
        case "3头":
          this.startsWithFilter(this.list, "3");
          break;
        case "4头":
          this.startsWithFilter(this.list, "4");
          break;
        case "0尾":
          this.endWithFilter(this.list, "0");
          break;
        case "1尾":
          this.endWithFilter(this.list, "1");
          break;
        case "2尾":
          this.endWithFilter(this.list, "2");
          break;
        case "3尾":
          this.endWithFilter(this.list, "3");
          break;
        case "4尾":
          this.endWithFilter(this.list, "4");
          break;
        case "5尾":
          this.endWithFilter(this.list, "5");
          break;
        case "6尾":
          this.endWithFilter(this.list, "6");
          break;
        case "7尾":
          this.endWithFilter(this.list, "7");
          break;
        case "8尾":
          this.endWithFilter(this.list, "8");
          break;
        case "9尾":
          this.endWithFilter(this.list, "9");
          break;
        case "鼠":
          this.selectShengXiao(this.list, 0);
          break;
        case "牛":
          this.selectShengXiao(this.list, 1);
          break;
        case "虎":
          this.selectShengXiao(this.list, 2);
          break;
        case "兔":
          this.selectShengXiao(this.list, 3);
          break;
        case "龙":
          this.selectShengXiao(this.list, 4);
          break;
        case "蛇":
          this.selectShengXiao(this.list, 5);
          break;
        case "马":
          this.selectShengXiao(this.list, 6);
          break;
        case "羊":
          this.selectShengXiao(this.list, 7);
          break;
        case "猴":
          this.selectShengXiao(this.list, 8);
          break;
        case "鸡":
          this.selectShengXiao(this.list, 9);
          break;
        case "狗":
          this.selectShengXiao(this.list, 10);
          break;
        case "猪":
          this.selectShengXiao(this.list, 11);
          break;
      }

      this.list.push({});
      this.list.pop();
    },

    selectShengXiao(list, index) {

      let arr = common.ShengXiaoList()[index].map((item) => item.num);

      list.forEach((item) => {
        if (arr.includes(Number(item.N))) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
    },

    endWithFilter(list, str) {
      list.forEach((item) => {
        if (item.N.endsWith(str)) {
          item.active = true;
        } else {
          item.active = false;
        }
      });
    },
    startsWithFilter(list, str) {
      console.log(list, str);
      list.forEach((item) => {
        if (str == "0") {
          if (item.N < 10) {
            item.active = true;
          } else {
            item.active = false;
          }
        } else {
          if (item.N.startsWith(str) && item.N > 9) {
            item.active = true;
          } else {
            item.active = false;
          }
        }
      });
    },

    selected(obj) {
      if (obj.active) {
        obj.active = false;
        this.isHasSelected--;
      } else {
        if (this.limitLen) {
          if (this.isHasSelected < this.limitLen) {
            obj.active = true;
            this.isHasSelected++;
          }
        } else {
          obj.active = true;
          this.isHasSelected++;
        }
      }

      this.refreshPage();
    },

    resetData() {
      this.list.forEach((item) => {
        if (item.active) {
          item.active = false;
        }
      });
      this.isHasSelected = 0;
      this.refreshPage();
    },

    refreshPage() {
      this.list.push({});
      this.list.pop();

      if (this.isHasSelected) {
        this.$store.commit("v3IsHasSelected", true);
      } else {
        this.$store.commit("v3IsHasSelected", false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.num-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #f1f1f1;
  width: 100%;
  padding: 10rpx;
  .item-box {
    width: 13%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15rpx;
    .item-num {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      background-color: #b62929;
      align-items: center;
      justify-content: center;
      padding-top: 10rpx;
      display: flex;
      flex-direction: column;
      .text-xxl {
        line-height: 40rpx;
      }
      .text-c {
        color: #e7ff00;
      }
    }
    .item-num-active {
      position: relative;
      background-color: #ffe100 !important;
      .text {
        color: black;
      }
    }

    .item-num-active::after {
      position: absolute;
      left: -15rpx;
      top: -2.2vw;
      content: "";
      display: block;
      width: 0;
      height: 0;
      transform: rotate(213deg);
      // transform: scale(0);
      border-top: 5vw solid transparent;
      border-left: 5vw solid #ffe100;
      border-bottom: 5vw solid transparent;
    }
  }
}
</style>
