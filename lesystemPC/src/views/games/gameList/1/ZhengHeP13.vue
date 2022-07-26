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
    <div class="list">
      <div class="item" v-for="(title, index) in 2" :key="index">
        <ZhengHeList
          :isShowInput="isShowInput"
          :list="list[index]"
          :titleList="bettingType"
          :numList="numList[index]"
          @selectCount="selectCount"
          @clearSelect="clearSelect"
        />
      </div>
    </div>

    <div class="list1">
      <div
        :class="{ active: curNameIndex == idx }"
        class="item pointer"
        v-for="(str, idx) in nameList"
        :key="idx"
        @click="changeCurList(idx)"
      >
        {{ str }}
      </div>
    </div>
  </div>
</template>
<script>
import ZhengHeList from "./ZhengHeListSelect";
import common from "./common";
export default {
  data() {
    return {
      limitLen: 2,
      count: 0,
      commonMoney: "",
      isShowInput: true,
      curIndex: 0,
      lenLimit: 5,
      selectedArr: [],
      rateObj: { times: 1, mode: 1 },
      listCache: [],
      list: [],
      list2: [],
      nameList: [
        "连尾二尾",
        "连尾三尾",
        "连尾四尾",
        "连尾二尾不中",
        "连尾三尾不中",
        "连尾四尾不中",
      ],
      nameObj: [
        { name: "连尾二尾", num: 2 },
        { name: "连尾三尾", num: 3 },
        { name: "连尾四尾", num: 4 },
        { name: "连尾二尾不中", num: 2 },
        { name: "连尾三尾不中", num: 3 },
        { name: "连尾四尾不中", num: 4},
      ],
      curNameIndex: 0,
      nameList1: ["单选/复式", "胆拖"],
      curNameIndex1: 0,
      bettingType: ["生肖", "赔率", "勾选", "号码"],
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
        this.changeOdds(val);
      },
      deep: true,
    },
  },

  created() {
    this.initData();
  },

  methods: {
    clearSelect() {
      this.count = 0;
      this.selectedArr = [];
    },
    selectCount(i, obj) {
      if (this.curNameIndex1 == 1) {
        if (i == 1) {
          this.selectedArr.push(obj);
          this.setStatus(this.selectedArr, this.limitLen);
        } else {
          let index = this.selectedArr.findIndex((item) => item.I == obj.I);
          this.selectedArr.splice(index, 1);
          this.setStatus(this.selectedArr, this.limitLen);
        }
      }
    },

    setStatus(list, limitLen) {
      let len = list.length;
      if (len >= limitLen) {
        for (let i = 0; i < limitLen - 1; i++) {
          list[i].isDisabled = true;
        }
      } else {
        list.forEach((item) => {
          item.isDisabled = false;
        });
      }

      this.list.forEach((arr) => {
        arr.push({});
        arr.pop();
      });
    },
    changeCurList1(idx) {
      this.curNameIndex1 = idx;
      this.count = 0;
      // this.limitLen = 2;
      // this.curNameIndex = idx;

      this.initData();
    },
    changeCurList(idx) {
      this.count = 0;
      this.curNameIndex = idx;

      let num = this.nameObj.find((obj) => obj.name == this.nameList[idx]).num;
      this.limitLen = num;
      this.selectedArr = [];
      this.initData();
    },

    initData() {
      this.$store.commit("bettingType", true);
      let arr = this.$store.state.gd.curGame.C;
      arr.sort((a, b) => a.Id - b.Id);
      let nameList = [];
      arr.forEach((item) => {
        nameList.push(item.N);
      });
      this.nameList = nameList;

      let { percentage } = this.$store.state.gd.footOdds;
      let obj = arr.find((obj) => obj.N == this.nameList[this.curNameIndex]);
      let tem1 = JSON.parse(JSON.stringify(obj.C));

      tem1.sort((a, b) => a.I - b.I);
      tem1.forEach((item) => {
        item.N1 = obj.N;
        for (let [key, value] of Object.entries(common.bgColor())) {
          if (value.includes(Number(item.N))) {
            item.bgcolor = key;
            break;
          }
        }
        this.setOdds(item, percentage);
      });

      let list1 = this.$BDH.arrayDivision(tem1, 5);
      this.list = list1;

      let list2 = common.weishuList();
      this.numList = this.$BDH.arrayDivision(list2, 5);
    },

    setOdds(item, percentage) {
      item.odds = this.$BDH.setNumDecimal(
        item.MxO - (item.MxO - item.MiO) * percentage,
        3
      );
    },

    changeOdds(val) {
      let { percentage } = val;
      this.list.forEach((arr) => {
        arr.forEach((item) => {
          this.setOdds(item, percentage);
        });
        arr.push({});
        arr.pop();
      });
    },

    // toBuy() {
    //   this.addToBasket();
    //   let ts = new Date().getTime();
    //   this.$store.commit("toBuyNext", ts);
    // },

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
      let len = tem.length;
      if (len < this.limitLen) {
        this.$gutils.confirm({
          text: `还需要勾选${this.limitLen - len}个球号`,
        });
        return;
      }

      let ids = [];
      let sarr = [];

      if (this.curNameIndex1 == 0) {
        tem.forEach((item) => {
          ids.push(item.I);
        });
        let arr = this.$BDH.combination(ids, this.limitLen);
        arr.forEach((ids) => {
          let arr = tem.filter((item) => ids.includes(item.I));
          let obj = JSON.parse(JSON.stringify(arr[0]));
          obj.goal = ids.join(",");
          let namelist = [];
          arr.forEach((item) => {
            namelist.push(item.N);
          });
          obj.N = namelist.join(",");
          sarr.push(obj);
        });
      } else {
        let splitArr = this.selectedArr.splice(0, this.limitLen - 1);

        let nameArr = [];
        let idArr = [];
        splitArr.forEach((item) => {
          nameArr.push(item.N);
          idArr.push(item.I);
        });

        let tem = [];
        this.selectedArr.forEach((item) => {
          let obj = JSON.parse(JSON.stringify(item));
          obj.N = item.N + "," + nameArr.join(",");
          obj.goal = item.I + "," + idArr.join(",");

          tem.push(obj);
        });
        sarr = tem;
      }

      let ts = new Date().getTime();
      // this.$store.commit("clearSelect", ts);  //购买成功后再清除。共用一个Object,提前清除数据也会跟着清除
      this.$store.commit("basketList", sarr);
      setTimeout(() => {
        this.$store.commit("showCreditBasket", ts);
      }, 100);
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
  }
}
</style>