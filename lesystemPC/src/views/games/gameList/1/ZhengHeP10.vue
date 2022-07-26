<template>
  <div class="zhenghe">
    <div class="list1">
      <div
        :class="[
          { active: curNameIndex1 == idx },
          { prohibit: idx > 3 },
          { prohibit1: isProhibit },
        ]"
        class="item pointer"
        v-for="(str, idx) in nameList1"
        :key="idx"
        @click="changeCurList1(idx)"
      >
        {{ str }}
      </div>
    </div>
    <div class="list">
      <div class="item" v-for="(title, index) in 2" :key="index">
        <ZhengHeList
          :list="list[index]"
          @selectCount="selectCount"
          @clearSelect="clearSelect"
        />
      </div>
    </div>
    <ul class="list-radio">
      <li class="item" v-for="(item, index) in unHandlerList" :key="index">
        <div class="item-title">{{ item.N }}</div>
        <div class="item-content" v-for="(item1, idx) in item.C" :key="idx">
          <div class="left">
            <input
              class="pointer"
              type="radio"
              :value="item1.I"
              name="curRadio"
              v-model="curRadio"
              @change="changeInput(item1)"
            />
            <span class="text" v-if="item1.N.includes('不')">不中</span>
            <span class="text" v-else>中</span>
          </div>

          <span class="odds">{{ item1.odds }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import ZhengHeList from "./ZhengHeListSelectP10";
import common from "./common";
export default {
  data() {
    return {
      limitLen: 0,
      count: 0,
      commonMoney: "",
      selectedArr: [],
      list: [],
      indexList: [
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
      ],
      nameList1: ["前肖", "后肖", "天肖", "地肖", "野兽", "家禽", "单", "双"],
      curNameIndex1: null,

      titleList: ["号码", "赔率", "勾选", "号码"],
      numList: [],
      unHandlerList: [],
      curRadio: "",
      curObj: {},
      isProhibit: true,
      prohibitIds: [1909, 1910],
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
        this.setOdds(this.unHandlerList, percentage);
      },
      deep: true,
    },
  },

  created() {
    this.initData();
  },

  mounted() {
    let { jiaqin, yeshou, qianxiao, houxiao, tianxiao, dixiao } =
      common.shengxiaoFenLei();
    this.jiaqin = jiaqin;
    this.yeshou = yeshou;
    this.qianxiao = qianxiao;
    this.houxiao = houxiao;
    this.tianxiao = tianxiao;
    this.dixiao = dixiao;
  },

  beforeDestroy() {
    this.$store.commit("bettingType", false);
  },

  methods: {
    changeInput(obj) {
      this.curNameIndex1 = null;
      this.curObj = obj;
      let { N, I } = obj;
      let index = this.indexList.findIndex((str) => str == N.split("肖")[0]);
      this.limitLen = index + 1;
      console.log(this.limitLen, index);

      if (this.prohibitIds.includes(I)) {
        this.isProhibit = false;
      } else {
        this.isProhibit = true;
      }
      this.resetData(this.list);
    },

    resetData(list) {
      list.forEach((arr) => {
        arr.forEach((item) => {
          item.active = false;
          item.isDisabled = false;
        });

        arr.push({});
        arr.pop();
      });
    },

    setDataStatus(list, atr, status) {
      list.forEach((arr) => {
        arr.forEach((item) => {
          item[atr] = status;
        });

        arr.push({});
        arr.pop();
      });
    },

    addToBasket() {
      let commonMoney = this.$store.state.gd.inputMoney;
      if (commonMoney == "") {
        this.$gutils.confirm({ text: "请填写下注金额" });
        return;
      }

      let nameArr = [];
      let idArr = [];
      this.list.forEach((arr) => {
        arr.forEach((item) => {
          if (item.active) {
            nameArr.push(item.N);
            idArr.push(item.I);
          }
        });
      });

      if (idArr.length == 0) {
        this.$gutils.confirm({ text: `没有下注内容` });
        return;
      }
      if (idArr.length < this.limitLen) {
        this.$gutils.confirm({
          text: `至少还需要勾选${this.limitLen - idArr.length}个生肖`,
        });
        return;
      }

      let ts = new Date().getTime();

      let { I, N1, odds } = this.curObj;
      let obj = {
        I,
        N1,
        odds,
        N: nameArr.join(","),
        goal: idArr.join(","),
        money: commonMoney,
        ts,
      };
      this.$store.commit("basketList", obj);
      setTimeout(() => {
        this.$store.commit("showCreditBasket", ts);
      }, 100);
    },

    selectCount() {
      if (this.curObj.N1 == "合肖一肖") {
        this.setDataStatus1(this.list, "isDisabled", true);
        return;
      }

      let list = [];
      let i = 0;
      this.list.forEach((arr) => {
        arr.forEach((item) => {
          if (item.active) {
            i++;
            if (this.jiaqin.includes(item.N)) {
              list.push(1);
            } else {
              list.push(2);
            }

            if (item.numList[0].num % 2 == 0) {
              list.push(3);
            } else {
              list.push(4);
            }
          }
        });
      });

      if (i == this.limitLen) {
        this.setDataStatus1(this.list, "isDisabled", true);
        return;
      }

      let list1 = Array.from(new Set(list));
      if (list.length == 0) {
        this.setDataStatus1(this.list, "isDisabled", false);
        return;
      }

      if (this.limitLen - i == 1) {
        if (list1.length == 4) {
          this.setDataStatus1(this.list, "isDisabled", false);
        } else {
          let numArr = [1, 2, 3, 4];
          numArr.forEach((num) => {
            if (!list1.includes(num)) {
              if (num == 1) {
                this.list.forEach((arr) => {
                  arr.forEach((item) => {
                    if (this.yeshou.includes(item.N) && !item.active) {
                      item.isDisabled = true;
                    }
                  });

                  arr.push({});
                  arr.pop();
                });
              }
              if (num == 2) {
                this.list.forEach((arr) => {
                  arr.forEach((item) => {
                    if (this.jiaqin.includes(item.N) && !item.active) {
                      item.isDisabled = true;
                    }
                  });

                  arr.push({});
                  arr.pop();
                });
              }
              if (num == 3) {
                this.list.forEach((arr) => {
                  arr.forEach((item) => {
                    if (item.numList[0].num % 2 != 0 && !item.active) {
                      item.isDisabled = true;
                    }
                  });

                  arr.push({});
                  arr.pop();
                });
              }
              if (num == 4) {
                this.list.forEach((arr) => {
                  arr.forEach((item) => {
                    if (item.numList[0].num % 2 == 0 && !item.active) {
                      item.isDisabled = true;
                    }
                  });

                  arr.push({});
                  arr.pop();
                });
              }
            }
          });
        }
      } else {
        this.setDataStatus1(this.list, "isDisabled", false);
      }
    },

    setDataStatus1(list, atr, status) {
      list.forEach((arr) => {
        arr.forEach((item) => {
          if (!item.active) {
            item[atr] = status;
          }
        });
        arr.push({});
        arr.pop();
      });
    },

    changeCurList1(idx) {
      let { I } = this.curObj;
      if (!this.prohibitIds.includes(I)) {
        this.$gutils.confirm({
          text: "快捷方式只有选中六肖中(不中)后才能使用",
        });
        return;
      }
      if (idx > 3) {
        this.$gutils.confirm({
          text: `系统不允许同时选择 【${this.nameList1[idx]}】`,
        });
        return;
      }

      this.resetData(this.list);

      switch (idx) {
        case 0:
          this.setDataStatus2(this.list, this.qianxiao);
          this.setDataStatus1(this.list, "isDisabled", true);
          break;
        case 1:
          this.setDataStatus2(this.list, this.houxiao);
          this.setDataStatus1(this.list, "isDisabled", true);
          break;
        case 2:
          this.setDataStatus2(this.list, this.tianxiao);
          this.setDataStatus1(this.list, "isDisabled", true);
          break;
        case 3:
          this.setDataStatus2(this.list, this.dixiao);
          this.setDataStatus1(this.list, "isDisabled", true);
          break;

        default:
          break;
      }

      this.curNameIndex1 = idx;
    },

    setDataStatus2(list, list1) {
      list.forEach((arr) => {
        arr.forEach((item) => {
          if (list1.includes(item.N)) {
            item.active = true;
          }
        });
        arr.push({});
        arr.pop();
      });
    },

    clearSelect() {
      this.count = 0;
    },

    initData() {
      this.$store.commit("bettingType", true);
      let { percentage } = this.$store.state.gd.footOdds;
      let arr = this.$store.state.gd.curGame.C;

      console.log(arr);

      arr.sort((a, b) => a.Id - b.Id);
      arr.forEach((obj) => {
        obj.C.sort((a, b) => a.I - b.I);
        obj.C.forEach((item) => {
          item.N1 = obj.N + (item.N.includes("不") ? "不中" : "中");
          item.isSelcted = false;
        });
      });
      this.setOdds(arr, percentage);
      this.unHandlerList = arr;
      let playObj =  this.$store.state.gd.curPlayList.find(item=>item.Id == 9)
      let list = playObj.C[0].C;
      list.sort((a, b) => a.I - b.I);
      let shengxiao = common.ShengXiaoList();

      list.forEach((item, index) => {
        item.numList = shengxiao[index];
        item.active = false;
        item.isDisabled = true;
      });
      this.list = this.$BDH.arrayDivision(list, 6);
    },

    setOdds(list, percentage) {
      list.forEach((obj, index) => {
        obj.C.forEach((item, idx) => {
          item.odds = this.$BDH.setNumDecimal(
            item.MxO - (item.MxO - item.MiO) * percentage,
            3
          );
        });

        obj.C.push({});
        obj.C.pop();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("./style.css");
.zhenghe {
  height: 100%;
  .list1 {
    .item {
      padding: 4px 20px;
    }

    .prohibit {
      background-color: #ccc;
    }
    .prohibit1 {
      background-color: #ccc;
    }
  }
  .list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 50%;
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

  .list-radio {
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
    .item {
      width: 16%;
      border: 1px solid #ccc;
      margin-bottom: 1px;
      margin-right: 1px;
      .item-title {
        color: #fff;
        background-color: #cf271e;
        text-align: center;
        height: 25px;
        line-height: 25px;
      }
      .item-content {
        font-size: 12px;
        padding: 7px 20px 7px 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
        }
        .text {
          margin-left: 5px;
        }
        .odds {
          color: red;
          font-weight: 600;
        }
      }
    }
  }
}
</style>