<template>
  <div class="fast-bets">
    <div class="top">
      <div
        @click="titleIndex = idx"
        :class="{ active: titleIndex == idx }"
        class="top-item pointer"
        v-for="(title, idx) in titleList"
        :key="idx"
      >
        {{ title }}
      </div>
    </div>

    <div v-if="titleIndex == 1">
      <div class="text">输入下单文字：</div>
      <div class="textarea-box">
        <textarea
          v-model="inputNum"
          class="textarea"
          name=""
          id=""
          cols="22"
          rows="5"
          @input="inputBets"
        ></textarea>
      </div>

      <div class="btn-box">
        <el-button @click="submit" class="btn w5" type="info">确定</el-button>
        <el-button @click="selectAll" class="btn w5" type="info"
          >清空</el-button
        >
      </div>

      <div class="text">
        格式：号码=金额，以空格分开每一笔 例如：【3=188 26=280】
        代表特码3号188元 特码26号280元
      </div>
    </div>

    <div v-else>
      <div class="list">
        <div
          @click="selectItem(item)"
          :class="{ active: item.active }"
          class="item pointer"
          v-for="(item, index) in list"
          :key="index"
        >
          {{ item.N }}
        </div>
      </div>
      <div class="list">
        <div
          @click="selectItem(item)"
          :class="{ active: item.active }"
          class="item item1 pointer"
          v-for="(item, index) in typeList"
          :key="index"
        >
          {{ item.num }}
        </div>
      </div>
      <div class="list">
        <div
          @click="selectItem(item)"
          :class="{ active: item.active }"
          class="item item2 pointer"
          v-for="(item, index) in shengXiaoList"
          :key="index"
        >
          {{ item.num }}
        </div>
      </div>
      <div class="list">
        <div
          @click="selectItem(item)"
          :class="{ active: item.active }"
          :style="{
            color: item.num.startsWith('红')
              ? 'red'
              : item.num.startsWith('蓝')
              ? '#09A3C8'
              : '#00C400',
          }"
          class="item item1 pointer"
          v-for="(item, index) in colorType"
          :key="index"
        >
          {{ item.num }}
        </div>
      </div>

      <div class="input-box">
        <span class="m">金额</span>
        <InputList @input="input" />
        <el-button @click="tobuy" class="btn" type="danger">提交</el-button>
      </div>

      <div class="textarea-box">
        <textarea
          v-model="selectArr"
          class="textarea"
          name=""
          id=""
          cols="22"
          rows="5"
          readonly
        ></textarea>
      </div>

      <div class="btn-box">
        <el-button @click="reset" class="btn w5" type="info">重置</el-button>
        <el-button @click="selectAll" class="btn w5" type="info"
          >全选</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import common from "./common";
import InputList from "@/views/games/components/input/InputSelectList_3.vue";
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      titleIndex: 0,
      titleList: ["快速投注", "键盘投注"],
      typeList: [],
      shengXiaoList: [],
      colorType: [],
      selectArr: [],
      curMoney: "",

      inputNum: "",
    };
  },
  components: {
    InputList,
  },
  watch: {
    "$store.state.gd.clearSelect": function (val) {
      this.reset();
    },
  },

  created() {
    this.initData();
  },

  methods: {
    inputBets() {
      this.inputNum = this.inputNum.replace(/[^\r\n0-9\,\=,\ ]/g, "");
    },

    submit() {
      let list = this.inputNum.split(" ");
      let tem = []
      for (let str of list) {
        let arr = str.split("=")
        if (arr.length != 2 || arr[0] > 49 || arr[0] < 1) {
          this.$gutils.confirm({
            text: "输入的格式不正确，请检查",
          });
          return 
        }
        tem.push(arr)
      }

      let selectArr = []
      tem.forEach(arr=>{
        let obj = this.list.find(item=>item.N == arr[0])
        obj.money = arr[1]
        selectArr.push(obj)
      })

     

      let ts = new Date().getTime();
      // this.$store.commit("clearSelect", ts);  //购买成功后再清除。共用一个Object,提前清除数据也会跟着清除
      this.$store.commit("basketList", selectArr);

      setTimeout(() => {
        this.$store.commit("showCreditBasket", ts);
      }, 100);

      this.inputNum = ''
      this.selectArr = []

    },

    reset() {
      this.listHandler(this.list, false);
      this.listHandler(this.shengXiaoList, false);
      this.listHandler(this.typeList, false);
      this.listHandler(this.colorType, false);
      this.curMoney = ''

      this.selectArr = [];
    },
    selectAll() {
      this.selectArr = this.listHandler(this.list, true);
    },

    listHandler(list, flag) {
      let tem = [];
      list.forEach((item) => {
        item.active = flag;
        tem.push(item.N);
      });
      return tem;
    },

    input(money) {
      this.curMoney = money;
    },

    tobuy() {
      if (this.curMoney == "") {
        this.$gutils.confirm({ text: "金额不能为空" });
        return;
      }
      let tem = [];
      this.list.forEach((item) => {
        if (item.active) {
          item.money = this.curMoney;
          tem.push(item);
        }
      });

      if (tem.length == 0) {
        this.$gutils.confirm({ text: "请选择号码" });
        return;
      }

      let ts = new Date().getTime();
      // this.$store.commit("clearSelect", ts);  //购买成功后再清除。共用一个Object,提前清除数据也会跟着清除
      this.$store.commit("basketList", tem);

      setTimeout(() => {
        this.$store.commit("showCreditBasket", ts);
      }, 100);
    },

    selectItem(item) {
      item.active = !item.active;
      let { num } = item;
      if (Number(num)) return;
      let arr = this.selectedType(num, item.active);
      this.selectArr = arr;
    },

    selectedType(val, flag) {
      let daxiao = 24;
      let colorObj = common.bgColor();
      switch (val) {
        case "家禽":
          let { A } = common.shengXiaoType();
          this.list.forEach((item) => {
            if (A.includes(Number(item.N))) {
              item.active = flag;
            }
          });
          break;
        case "野兽":
          let { B } = common.shengXiaoType();
          this.list.forEach((item) => {
            if (B.includes(Number(item.N))) {
              item.active = flag;
            }
          });
          break;
        case "单":
          this.list.forEach((item) => {
            if (item.N % 2 == 1) {
              item.active = flag;
            }
          });
          break;
        case "双":
          this.list.forEach((item) => {
            if (item.N % 2 == 0) {
              item.active = flag;
            }
          });
          break;
        case "大":
          this.list.forEach((item) => {
            if (item.N > daxiao) {
              item.active = flag;
            }
          });
          break;
        case "小":
          this.list.forEach((item) => {
            if (item.N <= daxiao) {
              item.active = flag;
            }
          });
          break;
        case "合单":
          this.list.forEach((item) => {
            let sum = String(item.N)
              .split("")
              .reduce((accumulator, currentValue) => {
                return accumulator + Number(currentValue);
              }, 0);
            if (sum % 2 == 1) {
              item.active = flag;
            }
          });
          break;
        case "合双":
          this.list.forEach((item) => {
            let sum = String(item.N)
              .split("")
              .reduce((accumulator, currentValue) => {
                return accumulator + Number(currentValue);
              }, 0);
            if (sum % 2 == 0) {
              item.active = flag;
            }
          });
          break;
        case "大单":
          this.list.forEach((item) => {
            if (item.N > daxiao && item.N % 2 == 1) {
              item.active = flag;
            }
          });
          break;
        case "大双":
          this.list.forEach((item) => {
            if (item.N > daxiao && item.N % 2 == 0) {
              item.active = flag;
            }
          });
          break;
        case "小双":
          this.list.forEach((item) => {
            if (item.N <= daxiao && item.N % 2 == 0) {
              item.active = flag;
            }
          });
          break;
        case "小单":
          this.list.forEach((item) => {
            if (item.N <= daxiao && item.N % 2 == 1) {
              item.active = flag;
            }
          });
          break;
        case "红波":
          this.selectColorType(this.list, flag, "#c42133");
          break;
        case "蓝波":
          this.selectColorType(this.list, flag, "#2373d6");
          break;
        case "绿波":
          this.selectColorType(this.list, flag, "#38b81b");
          break;
        case "红单":
          this.list.forEach((item) => {
            if (
              colorObj["#c42133"].includes(Number(item.N)) &&
              item.N % 2 == 1
            ) {
              item.active = flag;
            }
          });
          break;
        case "红双":
          this.list.forEach((item) => {
            if (
              colorObj["#c42133"].includes(Number(item.N)) &&
              item.N % 2 == 0
            ) {
              item.active = flag;
            }
          });
          break;
        case "红大":
          this.list.forEach((item) => {
            if (
              colorObj["#c42133"].includes(Number(item.N)) &&
              item.N > daxiao
            ) {
              item.active = flag;
            }
          });
          break;
        case "红小":
          this.list.forEach((item) => {
            if (
              colorObj["#c42133"].includes(Number(item.N)) &&
              item.N <= daxiao
            ) {
              item.active = flag;
            }
          });
          break;
        case "蓝单":
          this.list.forEach((item) => {
            if (
              colorObj["#2373d6"].includes(Number(item.N)) &&
              item.N % 2 == 1
            ) {
              item.active = flag;
            }
          });
          break;
        case "蓝双":
          this.list.forEach((item) => {
            if (
              colorObj["#2373d6"].includes(Number(item.N)) &&
              item.N % 2 == 0
            ) {
              item.active = flag;
            }
          });
          break;
        case "蓝大":
          this.list.forEach((item) => {
            if (
              colorObj["#2373d6"].includes(Number(item.N)) &&
              item.N > daxiao
            ) {
              item.active = flag;
            }
          });
          break;
        case "蓝小":
          this.list.forEach((item) => {
            if (
              colorObj["#2373d6"].includes(Number(item.N)) &&
              item.N <= daxiao
            ) {
              item.active = flag;
            }
          });
          break;
        case "绿单":
          this.list.forEach((item) => {
            if (
              colorObj["#38b81b"].includes(Number(item.N)) &&
              item.N % 2 == 1
            ) {
              item.active = flag;
            }
          });
          break;
        case "绿双":
          this.list.forEach((item) => {
            if (
              colorObj["#38b81b"].includes(Number(item.N)) &&
              item.N % 2 == 0
            ) {
              item.active = flag;
            }
          });
          break;
        case "绿大":
          this.list.forEach((item) => {
            if (
              colorObj["#38b81b"].includes(Number(item.N)) &&
              item.N > daxiao
            ) {
              item.active = flag;
            }
          });
          break;
        case "绿小":
          this.list.forEach((item) => {
            if (
              colorObj["#38b81b"].includes(Number(item.N)) &&
              item.N <= daxiao
            ) {
              item.active = flag;
            }
          });
          break;

        case "鼠":
          this.selectShengXiao(this.list, flag, 0);
          break;
        case "牛":
          this.selectShengXiao(this.list, flag, 1);
          break;
        case "虎":
          this.selectShengXiao(this.list, flag, 2);
          break;
        case "兔":
          this.selectShengXiao(this.list, flag, 3);
          break;
        case "龙":
          this.selectShengXiao(this.list, flag, 4);
          break;
        case "蛇":
          this.selectShengXiao(this.list, flag, 5);
          break;
        case "马":
          this.selectShengXiao(this.list, flag, 6);
          break;
        case "羊":
          this.selectShengXiao(this.list, flag, 7);
          break;
        case "猴":
          this.selectShengXiao(this.list, flag, 8);
          break;
        case "鸡":
          this.selectShengXiao(this.list, flag, 9);
          break;
        case "狗":
          this.selectShengXiao(this.list, flag, 10);
          break;
        case "猪":
          this.selectShengXiao(this.list, flag, 11);
          break;
      }

      this.list.push({});
      this.list.pop();
      let temArr = [];
      this.list.forEach((item) => {
        if (item.active) {
          temArr.push(item.N);
        }
      });

      return temArr;
    },

    selectColorType(list, flag, colorName) {
      let colorObj = common.bgColor();
      list.forEach((item) => {
        if (colorObj[colorName].includes(Number(item.N))) {
          item.active = flag;
        }
      });
    },

    selectShengXiao(list, type, index) {
      let arr = common.ShengXiaoList()[index].map((item) => item.num);
      list.forEach((item) => {
        if (arr.includes(Number(item.N))) {
          item.active = type;
        }
      });
    },

    initData() {
      // let list = [];
      // for (let i = 1; i < 50; i++) {
      //   list.push({ num: i, active: false });
      // }
      // this.list = this.list;
      this.typeList = this.createList(common.typeList());
      this.shengXiaoList = this.createList(common.shengXiaoName());
      this.colorType = this.createList(common.colorType());
    },

    createList(arr) {
      let list = [];
      arr.forEach((item) => {
        list.push({ num: item, active: false });
      });
      return list;
    },
  },
};
</script>
<style lang="scss" scoped>
$h: 45px;
.fast-bets {
  font-size: 12px;
  .text {
    padding: 10px;
    line-height: 25px;
  }
  .top {
    font-size: 12px;
    display: flex;
    margin-bottom: 5px;
    .top-item {
      width: 50%;
      background-color: #000;
      color: #fff;
      height: $h;
      line-height: $h;
      text-align: center;
      font-weight: 600;
    }
    .active {
      background-color: #cf271e;
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    // justify-content: space-between;
    .item {
      border: 1px solid gray;
      width: 19%;
      height: 23px;
      line-height: 23px;
      box-sizing: border-box;
      margin-right: 2px;
      margin-bottom: 2px;
      text-align: center;
      font-size: 12px;
    }
    .item1 {
      width: 24%;
    }
    .item2 {
      width: 15.55%;
    }
    .active {
      background-color: #fff600;
    }
  }
  .input-box {
    display: flex;
    align-items: center;
    padding: 5px 5px;

    .m {
      flex: 0 0 35px;
    }
  }
  .textarea-box {
    display: flex;
    justify-content: center;
    .textarea {
      outline: none;
      padding: 5px;
      resize: none;
    }
  }
  .btn-box {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  }

  .btn {
    margin-left: 5px;
    padding: 6px 15px;
  }
  .w5 {
    width: 40%;
  }
}
</style>