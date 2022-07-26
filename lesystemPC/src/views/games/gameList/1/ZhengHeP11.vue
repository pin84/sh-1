<template>
  <div class="zhenghe">
    <div class="list">
      <div class="item" v-for="(title, index) in 5" :key="index">
        <!-- <div v-if="index == 0" class="name">特码</div>
        <div v-else-if="index == 8" class="name">总和</div>
        <div v-else class="name">{{ title }}</div> -->
        <ZhengHeList
          :isShowInput="isShowInput"
          :titleList="bettingType"
          :list="list[index]"
          @selectCount="selectCount"
          @clearSelect="clearSelect"
        />
      </div>
    </div>

    <div class="list1 pointer">
      <div
        :class="{ active: curNameIndex == idx }"
        class="item"
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
      limitLen: 5,
      count: 0,
      curNameIndex: 0,
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
        "五不中",
        "六不中",
        "七不中",
        "八不中",
        "九不中",
        "十不中",
        "十一不中",
        "十二不中",
      ],
      nameobj: [
        {
          name: "五不中",
          num: 5,
        },
        {
          name: "六不中",
          num: 6,
        },
        {
          name: "七不中",
          num: 7,
        },
        {
          name: "八不中",
          num: 8,
        },
        {
          name: "九不中",
          num: 9,
        },
        {
          name: "十不中",
          num: 10,
        },
        {
          name: "十一不中",
          num: 11,
        },
        {
          name: "十二不中",
          num: 12,
        },
      ],

      titleList1: ["前三", "中三", "后三"],
      bettingType: ["号码", "赔率", "勾选"],
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
    },
    selectCount(i) {
      this.count += i;
      if (this.count == this.limitLen) {
        this.setStatus(this.list, true);
      } else {
        this.setStatus(this.list, false);
      }
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

    changeCurList(idx) {
      this.count = 0;
      this.curNameIndex = idx;
      let num = this.nameobj.find(
        (item) => item.name == this.nameList[idx]
      ).num;
      this.limitLen = num;
      this.initData("1");
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
        let num = this.nameobj.find(
          (item) => item.name == this.nameList[0]
        ).num;
        this.limitLen = num;
        console.log(num);
      }
      let { percentage } = this.$store.state.gd.footOdds;
      let obj = arr.find((obj) => obj.N == this.nameList[this.curNameIndex]);
      let tem1 = JSON.parse(JSON.stringify(obj.C));
      tem1.sort((a, b) => a.N - b.N);
      tem1.forEach((item) => {
        // item.isDisabled=true
        item.N1 = obj.N;
        for (let [key, value] of Object.entries(common.bgColor())) {
          if (value.includes(Number(item.N))) {
            item.bgcolor = key;
            break;
          }
        }
        this.setOdds(item, percentage);
      });

      let list1 = this.$BDH.arrayDivision(tem1, 10);

      this.list = list1;
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
          if (item.active || item.money) {
            item.money = commonMoney;
            tem.push(item);
          }
        });
      });
      let len = tem.length;
      // if (len == 0) {
      //   this.$gutils.confirm({ text: "请选择号码" });
      //   return;
      // }

      console.log(this.limitLen);

      if (len < this.limitLen) {
        this.$gutils.confirm({
          text: `还需要勾选${this.limitLen - len}个球号`,
        });
        return;
      }

      let ids = [];
      let strArr = [];
      console.log(tem);
      tem.forEach((item) => {
        ids.push(item.I);
        strArr.push(item.N);
      });

      let obj = JSON.parse(JSON.stringify(tem[0]));
      obj["goal"] = ids.join(",");
      obj.N = strArr.join(",");

      console.log(obj);

      let ts = new Date().getTime();
      // this.$store.commit("clearSelect", ts);  //购买成功后再清除。共用一个Object,提前清除数据也会跟着清除
      this.$store.commit("basketList", obj);
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
  }
}
</style>