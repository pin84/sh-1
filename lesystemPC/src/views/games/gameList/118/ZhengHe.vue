<template>
  <div class="zhenghe">
    <div class="list">
      <div class="item" v-for="(title, index) in 4" :key="index">
        <ZhengHeList
          :isShowInput="isShowInput"
          :titleList="bettingType"
          :list="list[index]"
        />
      </div>
    </div>
    <div class="list baosan">
      <div
        class="sb"
        :class="{ active: isSelectedBaosan }"
        @click="selectedBaosan"
      >
        <div class="title">特码包三</div>
        <div class="odds">{{ baosanobj.odds }}</div>
      </div>
      <ListPicker
        :isShowInput="isShowInput"
        @selctedObj="selctedArr"
        @baosanMoney="baosanMoney"
      />
      <!-- <div
        class="c-box"
        @click.self="selectedBaosan"
        :class="{ 'c-box-active': isSelected }"
      >
      </div> -->
    </div>
    <div class="list">
      <div class="item" v-for="(title, index) in 4" :key="index">
        <ZhengHeList
          :isShowInput="isShowInput"
          :titleList="bettingType"
          :list="list2[index]"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ListPicker from "@/views/games/components/list/ListPicker.vue";
import ZhengHeList from "@/views/games/components/ZhengHeList";
import Input from "@/views/games/components/input/InputSelectList";
// import Tips from "@/views/games/components/tips";
export default {
  data() {
    return {
      isSelectedBaosan: false,
      isSelected: false,
      commonMoney: "",
      isShowInput: true,
      curIndex: 0,
      lenLimit: 5,
      selectedArr: [],
      rateObj: { times: 1, mode: 1 },
      listCache: [],
      list: [],
      list2: [],
      baosanobj: {},
      titleList: [
        "特",
        "正码一",
        "正码二",
        "正码三",
        "正码四",
        "正码五",
        "正码六",
        "正码七",
        "总",
      ],
      titleList1: ["前三", "中三", "后三"],
      bettingType: ["号码", "赔率", "金额"],
      bgcolor: {
        "#807f7f": ["0", "13", "14", "27"],
        "#38b81b": ["1", "4", "7", "10", "16", "19", "22", "25"],
        "#408ce8": ["2", "5", "8", "11", "17", "20", "23", "26"],
        "#e13f51": ["3", "6", "9", "12", "15", "18", "21", "24"],
      },
    };
  },

  components: {
    ZhengHeList,
    Input,
    ListPicker,
    // Tips
  },

  watch: {
    "$store.state.gd.clearSelect": function (val) {
      this.baosanobj.money = "";
    },
    "$store.state.gd.addToBasket": function () {
      this.addToBasket();
    },
    "$store.state.gd.bettingType": {
      handler: function (val) {
        this.changeBettingType(val);
      },
      deep: true,
    },
    "$store.state.gd.footOdds": {
      handler: function (val) {
        this.changeOdds(val);
      },
      deep: true,
    },
  },

  created() {
    this.initData();
  },

  methods: {
    baosanMoney(money) {
      this.baosanobj.money = money;
    },
    selctedArr(arr) {
      this.curSelectedArr = arr;
    },
    selectedBaosan() {
      if (this.isShowInput) return;
      let flag = this.baosanobj.active;
      if (flag) {
        this.isSelectedBaosan = false;
        this.$set(this.baosanobj, "active", false);
      } else {
        this.isSelectedBaosan = true;
        this.$set(this.baosanobj, "active", true);
      }

    },

    changeBettingType(val) {
      this.isSelected = false;
      this.isSelectedBaosan = false
      if (val == 0) {
        this.isShowInput = true;
        this.bettingType = ["号码", "赔率", "金额"];
      } else {
        this.isShowInput = false;
        this.bettingType = ["号码", "赔率"];
      }
    },
    inputValue(n) {
      this.commonMoney = n;
    },
    selected(index) {
      this.curIndex = index;
      let arr = this.listCache[index];
      let list = [];
      arr.forEach((item) => {
        list.push([item]);
      });
      this.list2 = list;
    },

    dataHandler(titleList, arr, percentage) {
      let allArr = [];
      titleList.forEach((title) => {
        let tem = [];
        let list = arr.filter((item) => item.N.includes(title));
        list.forEach((obj1) => {
          obj1.C.forEach((obj) => {
            obj.N1 = obj1.N;
            obj.odds = obj.MxO - (obj.MxO - obj.MiO) * percentage;
            tem.unshift(obj);
          });
        });
        allArr.push(tem);
      });
      return allArr;
    },

    initData() {
      let type = this.$store.state.gd.bettingType;
      this.changeBettingType(type);

      let { percentage } = this.$store.state.gd.footOdds;

      let allArr = this.$store.state.gd.curPlayList;

      let list = this.$BDH.arrayDivision(allArr[0].C[0].C, 7);
      list.forEach((arr) => {
        arr.forEach((item) => {
          for (let [key, value] of Object.entries(this.bgcolor)) {
            if (value.includes(String(item.N))) {
              item.bgcolor = key;
              continue;
            }
          }
          item.N1 = allArr[0].C[0].N;
          item.odds = this.$BDH.setNumDecimal(
            item.MxO - (item.MxO - item.MiO) * percentage,
            3
          );
        });
      });

      let list2 = allArr[3].C[0].C;
      list2.forEach((item) => {
        item.N1 = allArr[3].C[0].N;
        item.odds = this.$BDH.setNumDecimal(
          item.MxO - (item.MxO - item.MiO) * percentage,
          3
        );
      });

      let tem3 = [];
      allArr[2].C.forEach((obj) => {
        obj.C.forEach((item) => {
          item.N1 = obj.N;
          item.odds = this.$BDH.setNumDecimal(
            item.MxO - (item.MxO - item.MiO) * percentage,
            3
          );
          tem3.push(item);
        });
      });

      let list3 = this.$BDH.arrayDivision(tem3, 5);

      let list4 = allArr[4].C[0].C;
      list4.forEach((item) => {
        item.N1 = allArr[4].C[0].N;
        item.odds = this.$BDH.setNumDecimal(
          item.MxO - (item.MxO - item.MiO) * percentage,
          3
        );
      });

      this.list = list;
      this.list2.push(...list3, list2, list4);

      let obj = allArr[1].C[0].C[0];
      obj.N1 = obj.N;
      obj.active = false;
      obj.odds = this.$BDH.setNumDecimal(
        obj.MxO - (obj.MxO - obj.MiO) * percentage,
        3
      );
      obj.money = "";

      this.baosanobj = obj;
    },

    changeOddsOption(list, percentage) {
      list.forEach((arr) => {
        arr.forEach((item) => {
          item.odds = this.$BDH.setNumDecimal(
            item.MxO - (item.MxO - item.MiO) * percentage,
            3
          );
        });
        arr.push({});
        arr.pop();
      });
    },

    changeOdds(val) {
      let { percentage } = val;
      this.changeOddsOption(this.list, percentage);
      this.changeOddsOption(this.list2, percentage);

      let item = this.baosanobj;
      item.odds = this.$BDH.setNumDecimal(
        item.MxO - (item.MxO - item.MiO) * percentage,
        3
      );
    },

    // toBuy() {
    //   this.addToBasket();
    //   let ts = new Date().getTime();
    //   this.$store.commit("toBuyNext", ts);
    // },

    addToBasket() {
      let commonMoney = this.$store.state.gd.inputMoney;
      if (!this.isShowInput && commonMoney == "") {
        this.$gutils.confirm({ text: "请填写下注金额" });
        return;
      }

      let tem = [];
      this.list.forEach((arr) => {
        arr.forEach((item) => {
          if (item.active || item.money) {
            if (!this.isShowInput) {
              item.money = commonMoney;
            }
            tem.push(item);
          }
        });
      });
      this.list2.forEach((arr) => {
        arr.forEach((item) => {
          if (item.active || item.money) {
            if (!this.isShowInput) {
              item.money = commonMoney;
            }
            tem.push(item);
          }
        });
      });


      if (this.baosanobj.active || this.baosanobj.money) {
        if (!this.isShowInput) {
          this.baosanobj.money = commonMoney;
        }
        this.baosanobj.goal = this.curSelectedArr.join(",");
        tem.push(this.baosanobj);
      }

      if (tem.length == 0) {
        this.$gutils.confirm({ text: "请选择号码" });
        return;
      }

      let ts = new Date().getTime();
      // this.$store.commit("clearSelect", ts);  //购买成功后再清除。共用一个Object,提前清除数据也会跟着清除
      this.$store.commit("basketList", tem);

      setTimeout(() => {
        this.$store.commit("showCreditBasket", ts);
        this.isSelectedBaosan = false;
        this.baosanobj.active = false;
        // this.baosanobj.money = '';
      }, 100);
    },
  },
};
</script>
<style lang="scss" scoped>
.zhenghe {
  height: 100%;
  .baosan {
    align-items: center;
    padding: 5px 0;
    .sb {
      display: flex;
      align-items: center;
      padding: 0 20px;
      &.active {
        background-color: #fff8b6;
      }
      .title {
        background-color: #c42133;
        color: #fff;
        border-radius: 5px;
        font-size: 12px;
        padding: 10px 15px;
      }
      .odds {
        color: #e13f51;
        margin: 0 20px;
      }
    }
  }
  .list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .c-box {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid red;
      // padding: 30px;
      .odds {
        color: #e13f51;
        margin-left: 20px;
      }
    }
    .item {
      width: 25%;
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
  }
  .list2 {
    display: flex;
  }
  .btn-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    margin: 10px auto;
    .input-box {
      width: 80px;
      margin-right: 5px;
    }
    .btn {
      width: 65px;
    }
  }
}
</style>