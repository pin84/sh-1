<template>
  <div class="zhenghe">
    <div class="list1">
      <div
        :class="{ active: curNameIndex1 == idx }"
        class="item pointer"
        v-for="(str, idx) in nameList1"
        :key="idx"
        @click="changeCurList1(idx)"
      >
        {{ str }}
      </div>
    </div>
    <div v-if="curNameIndex1 < 2" class="list">
      <div class="item" v-for="(title, index) in 5" :key="index">
        <ZhengHeList
          :list="list[index]"
          @selectCount="selectCount"
          @clearSelect="clearSelect"
          :limitLen="limitLen1"
          :ts="ts"
        />
      </div>
    </div>
    <div v-else-if="curNameIndex1 > 1 && curNameIndex1 < 4" class="list">
      <div class="item item1" v-for="(title, index) in 2" :key="index">
        <ZhengHeList
          :list="list3[index]"
          :titleList="titleList"
          @selectCount="selectCount"
          @clearSelect="clearSelect"
          :limitLen="limitLen1"
          :ts="ts"
        />
      </div>
    </div>
    <div v-else class="list">
      <div class="item item1" v-for="(title, index) in 2" :key="index">
        <ZhengHeList
          :list="list3[index]"
          :titleList="titleList"
          @selectCount="selectCount"
          @clearSelect="clearSelect"
          :limitLen="limitLen1"
          :ts="ts"
        />
        <ZhengHeList
          :list="list3[2 + index]"
          :titleList="titleList"
          @selectCount="selectCount"
          @clearSelect="clearSelect"
          :limitLen="limitLen1"
          :ts="ts"
        />
      </div>
    </div>

    <div class="list1 pointer">
      <div
        :class="{ active: curplaytype == str }"
        class="item"
        v-for="(str, idx) in nameList"
        :key="idx"
        @click="changeCurList(str)"
      >
        {{ str }}
      </div>
    </div>
  </div>
</template>
<script>
import ZhengHeList from "./ZhengHeListSelectP7";
import common from "./common";
export default {
  data() {
    return {
      ts: 0,
      curplaytype: "",
      limitLen: 12,
      limitLen1: 2,
      count: 0,
      commonMoney: "",
      curIndex: 0,
      selectedArr: [],
      rateObj: { times: 1, mode: 1 },
      listCache: [],
      list: [],
      list2: [],
      list3: [],
      nameList: ["三中二", "三全中", "二全中", "二中特", "特串"],
      nameList1: ["单选/复式", "胆拖", "生肖对碰", "尾数对碰", "混合对碰"],
      curNameIndex1: 0,

      // 对碰
      titleList: ["号码", "赔率", "勾选", "号码"],
      numList: [],
    };
  },

  components: {
    ZhengHeList,
  },

  watch: {
    "$store.state.gd.addToBasket": function () {
      this.addToBasket();
    },

    "$store.state.gd.footOdds": {
      handler: function (val) {
        let { percentage } = val;
        this.setOdds(this.list, percentage);
        this.setOdds(this.list3, percentage);
      },
      deep: true,
    },
  },

  created() {
    this.initData();
  },

  beforeDestroy() {
    this.$store.commit("bettingType", false);
  },

  methods: {
    addToBasket() {
      let commonMoney = this.$store.state.gd.inputMoney;
      if (commonMoney == "") {
        this.$gutils.confirm({ text: "请填写下注金额" });
        return;
      }
      let tem = [];
      this.list.forEach((arr) => {
        arr.forEach((item) => {
          if (item.active) {
            item.money = commonMoney;
            tem.push(item);
          }
        });
      });
      this.list3.forEach((arr) => {
        arr.forEach((item) => {
          if (item.active) {
            item.money = commonMoney;
            tem.push(item);
          }
        });
      });

      let size = 3;
      if (this.curplaytype == "三全中" || this.curplaytype == "三中二") {
        size = 3;
      } else {
        size = 2;
      }

      let list;
      switch (this.curNameIndex1) {
        case 0:
          list = this.handlerData(tem, size);
          break;
        case 1:
          list = this.handlerData1(tem);
          break;
        default:
          list = this.handlerData2(tem);
          break;
      }

      if (list.length == 0) {
        this.$gutils.confirm({ text: "没有下注内容" });
        return;
      }

      let ts = new Date().getTime();
      this.$store.commit("basketList", list);
      setTimeout(() => {
        this.$store.commit("showCreditBasket", ts);
      }, 100);
    },

    handlerData2(tem) {
      if (tem.length < 2) return [];
      let list = [];
      let arr1 = tem[0].numList;
      let arr2 = tem[1].numList;

      let ts = new Date().getTime();
      arr1.forEach((item) => {
        arr2.forEach((obj) => {
          let flag = Number(item.N) < Number(obj.N);
          list.push({
            I: item.I,
            N: flag ? item.N + "," + obj.N : obj.N + "," + item.N,
            odds: tem[0].odds,
            money: tem[0].money,
            N1: this.N1,
            goal: item.I + "," + obj.I,
            ts,
          });
        });
      });
      return list;
    },
    handlerData1(list) {
      let basketList = [];
      let primaryList = [];
      let primaryIds = [];
      let primaryNames = [];
      let other = [];
      list.forEach((item) => {
        if (item.isPrimary) {
          primaryList.push(item);
          primaryIds.push(item.I);
          primaryNames.push(item.N);
        } else {
          other.push(item);
        }
      });
      if (primaryList.length == 0 || other.length == 0) return [];
      let first = primaryList[0];
      other.forEach((item) => {
        let obj = JSON.parse(JSON.stringify(item));
        obj.I = first.I;
        obj.N = primaryNames.join(",") + "," + item.N;
        obj.goal = primaryIds.join(",") + "," + item.I;
        basketList.push(obj);
      });
      return basketList;
    },

    handlerData(list, size) {
      let basketList = [];
      let temArr = this.$BDH.combination(list, size);
      temArr.forEach((arr) => {
        let obj = JSON.parse(JSON.stringify(arr[0]));
        let ids = [];
        let Narr = [];
        arr.forEach((item) => {
          ids.push(item.I);
          Narr.push(item.N);
        });
        obj.N = Narr.join(",");
        obj["goal"] = ids.join(",");
        basketList.push(obj);
      });

      return basketList;
    },

    changeCurList1(idx) {
      if (
        (this.curplaytype == "三全中" || this.curplaytype == "三中二") &&
        idx > 1
      ) {
        this.$gutils.confirm({ text: "只有二全中、二中特、特串支持对碰" });
        return;
      }

      this.refreshData();

      this.curNameIndex1 = idx;

      this.clearAll(this.list);
      this.clearAll(this.list3);
      this.setStatus(this.list, false);
      this.setStatus(this.list3, false);
      if (idx == 0) {
        this.limitLen = 12;
      } else if (idx == 1) {
        this.limitLen = 999;
      } else {
        this.limitLen = 2;
      }

      let ShengXiaoList = common.ShengXiaoList();
      let weishiList = common.weishuList();
      let { MiO, MxO, MB, odds, odds1 } = this.list[0][0];
      let list = [];
      let commonObj = {
        MiO,
        MxO,
        MB,
        odds,
        odds1,
      };

      let size = 6;
      if (idx == 2) {
        list = this.shengxiaoDuiPeng(ShengXiaoList, commonObj);
      }
      if (idx == 3) {
        list = this.weishiDuiPeng(weishiList, commonObj);
        size = 5;
      }

      if (idx == 4) {
        let arr1 = this.$BDH.arrayDivision(
          this.shengxiaoDuiPeng(ShengXiaoList, commonObj),
          6
        );
        let arr2 = this.$BDH.arrayDivision(
          this.weishiDuiPeng(weishiList, commonObj),
          5
        );

        this.list3 = arr1.concat(arr2);

        return;
      }

      if (idx < 2) {
        this.initData;
      } else {
        this.list3 = this.$BDH.arrayDivision(list, size);
      }
    },

    weishiDuiPeng(weishiList, commonObj) {
      let list = [];
      weishiList.forEach((arr, index) => {
        let tem = [];
        arr.forEach((item) => {
          let obj = this.list.flat().find((obj1) => obj1.N == item.num);
          obj["bc"] = item.bc;
          tem.push(obj);
        });

        list.push(
          Object.assign({}, commonObj, {
            N: index,
            numList: tem,
          })
        );
      });

      return list;
    },
    shengxiaoDuiPeng(ShengXiaoList, commonObj) {
      let list = [];
      let shengxiao = common.shengXiaoName();
      ShengXiaoList.forEach((arr, index) => {
        let tem = [];
        arr.forEach((item) => {
          let obj = this.list.flat().find((obj1) => obj1.N == item.num);
          obj["bc"] = item.bc;
          tem.push(obj);
        });

        list.push(
          Object.assign({}, commonObj, {
            N: shengxiao[index],
            numList: tem,
          })
        );
      });
      return list;
    },

    changeCurList(str) {
      this.refreshData();

      if (str == "三中二" || str == "三全中") {
        this.limitLen1 = 2;
      } else {
        this.limitLen1 = 1;
      }
      this.curplaytype = str;

      this.selectedArr = [];
      this.initData("1");
    },
    clearSelect() {
      this.count = 0;
    },
    selectCount(i, obj) {
      this.count += i;
      // console.log(this.count, this.limitLen1);

      if (this.curNameIndex1 == 0 && this.count == 12) {
        this.setStatus(this.list, true);
      } else {
        this.setStatus(this.list, false);
      }

      if (this.curNameIndex1 == 1) {
        if (this.count <= this.limitLen1) {
          if (i == 1) {
            obj.isPrimary = true;
          } else {
            obj.isPrimary = false;
            this.list.forEach((arr) => {
              arr.forEach((item) => {
                item.isDisabled = false;
              });
            });
          }
        } else {
          this.list.forEach((arr) => {
            arr.forEach((item) => {
              if (item.isPrimary) {
                item.isDisabled = true;
              }
            });
          });
        }
      }

      if (this.curNameIndex1 >= 2) {
        if (this.count >= 2) {
          this.setStatus_1(this.list3, true, "isDisabled", 1);
        } else if ((i = -1)) {
          this.setStatus_1(this.list3, false, "isDisabled", 1);
        }
      }
    },

    clearAll(list) {
      list.forEach((arr) => {
        arr.forEach((item) => {
          item.active = false;
        });
        arr.push({});
        arr.pop();
      });
    },

    setStatus(list, statu) {
      list.forEach((arr) => {
        arr.forEach((item) => {
          if (!item.active) {
            item.isDisabled = statu;
          }
        });
        arr.push({});
        arr.pop();
      });
    },

    setStatus_1(list, statu = true, type = "active", isExActive = 1) {
      list.forEach((arr) => {
        arr.forEach((item) => {
          if (isExActive == 1) {
            if (!item.active) {
              item[type] = statu;
            }
          } else {
            item[type] = statu;
          }
        });
        arr.push({});
        arr.pop();
      });
    },

    initData(type) {
      this.$store.commit("bettingType", true);
      let arr = this.$store.state.gd.curGame.C;
      arr.sort((a, b) => a.Id - b.Id);
      let nameList = [];
      arr.forEach((item, idx) => {
        nameList.push(item.N);
      });
      this.nameList = nameList;

      if (!type) {
        this.curplaytype = nameList[0];
        if (this.curplaytype == "三中二" || this.curplaytype == "三全中") {
          this.limitLen1 = 2;
        } else {
          this.limitLen1 = 1;
        }
      }

      let { percentage } = this.$store.state.gd.footOdds;
      let obj = arr.find((obj) => obj.N == this.curplaytype);
      let list = obj.C;

      this.N1 = obj.N;
      let len = list.length;
      list.sort((a, b) => a.N - b.N);
      let list1 = []; // 大
      let list2 = []; // 小

      if (obj.N == "三中二" || obj.N == "二中特") {
        for (let i = 0; i < len; i += 2) {
          let obj1 = list[i];
          let obj2 = list[i + 1];
          if (obj1.MxO < obj2.MxO) {
            list1.push(obj1);
            list2.push(obj2);
          } else {
            list1.push(obj2);
            list2.push(obj1);
          }
        }
      } else {
        list1 = list;
      }

      list1.forEach((item) => {
        item.N1 = obj.N;
        item.isDisabled = false;
        item.active = false;
        item.isPrimary = false;
        for (let [key, value] of Object.entries(common.bgColor())) {
          if (value.includes(Number(item.N))) {
            item.bgcolor = key;
            break;
          }
        }
      });

      this.list = this.$BDH.arrayDivision(list1, 10);
      if (list2.length) {
        this.list2 = this.$BDH.arrayDivision(list2, 10);
      } else {
        this.list2 = [];
      }

      this.setOdds(this.list, percentage);
    },

    setOdds(list, percentage) {
      let flag = this.list2.length;
      list.forEach((arr, index) => {
        arr.forEach((item, idx) => {
          item.odds = this.$BDH.setNumDecimal(
            item.MxO - (item.MxO - item.MiO) * percentage,
            3
          );

          if (flag) {
            let obj = this.list2[index][idx];
            item.odds1 = this.$BDH.setNumDecimal(
              obj.MxO - (obj.MxO - obj.MiO) * percentage,
              3
            );
          }
        });

        arr.push({});
        arr.pop();
      });
    },

    refreshData() {
      this.ts = new Date().getTime();
      this.count = 0;
      this.curNameIndex1 = 0;
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("./style.css");
.zhenghe {
  height: 100%;
  .list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 20%;
      border-right: 1px solid #c9c7c7;
      border-bottom: 1px solid #c9c7c7;
      box-sizing: border-box;
      .name {
        border-right: 1px solid #fff;
        color: #fff;
        background-color: #cf271e;
        padding: 6px 0;
        text-align: center;
        font-size: 14px;
      }
      .bcy {
        background-color: #f69c11;
      }
    }
    .item1 {
      width: 50%;
    }
  }
}
</style>