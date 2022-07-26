<template>
  <div class="picker-box">
    <div class="list" v-for="(arr, idx) in allArr" :key="idx">
      <el-select
        v-model="curValue[idx]"
        filterable
        placeholder="请选择"
        @change="change"
      >
        <el-option
          v-for="item in arr"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <span class="box pointer" v-if="isShowInput">
      <Input
        @blur="lostFocuse"
        @input="inputText"
        :disabled="isDisabled"
        class="input"
        v-model="curMoney"
        @click="isShowList"
      />
      <ul class="list" v-if="curShowSelectList">
        <li class="triangle"></li>
        <li
          class="item"
          @click="selectMoney(moneyObj)"
          v-for="(moneyObj, index) in moneyList"
          :key="index"
        >
          {{ moneyObj.num }}元
        </li>
      </ul>
    </span>
  </div>
</template>

<script>
import Input from "@/views/games/components/input/Input_1.vue";
export default {
  props: {
    isShowInput: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      curMoney: "",
      curShowSelectList: false,
      isDisabled: false,
      selectedObj: {},
      colorObj: {
        "#807f7f": ["0", "13", "14", "27"],
        "#38b81b": ["1", "4", "7", "10", "16", "19", "22", "25"],
        "#408ce8": ["2", "5", "8", "11", "17", "20", "23", "26"],
        "#e13f51": ["3", "6", "9", "12", "15", "18", "21", "24"],
      },
      allArr: [],
      curValue: [0, 1, 2],
      curIndex: [0, 0, 0],
      moneyList: [],
    };
  },
  components: {
    Input,
  },

  watch: {
    "$store.state.gd.clearSelect": function (val) {
      this.curMoney = ''
    },
  },
  created() {
    this.createNumArr();
  },
  methods: {
    isShowList() {
      let moneyList = JSON.parse(localStorage.getItem("moneyList"));
      if (!moneyList) {
        this.curShowSelectList = 0;
        this.moneyList = [];
        return;
      }
      this.moneyList = moneyList;
      this.curShowSelectList = true;
    },
    selectMoney(obj) {
      let money = obj.num;
      this.curMoney = money;
      this.$emit("baosanMoney", money);
    },
    inputText() {
      this.curShowSelectList = false;
    },
    createNumArr() {
      this.allArr = [];
      let curValue = this.curValue;
      curValue.forEach((n, idx) => {
        let fArr = curValue.filter((num) => num != n);
        let i = 0;
        let j = 0;
        let numArr = [];
        while (i < 28) {
          if (fArr.includes(i)) {
            i++;
            j++;
            continue;
          }

          if (n == i) {
            this.curIndex[idx] = i - j;
          }

          numArr.push({ value: i, label: i });
          //   for (let [key, value] of Object.entries(this.colorObj)) {
          //     let str = String(i);
          //     if (value.includes(str)) {
          //       numArr.push({ num: str, bc: key });
          //       continue;
          //     }
          //   }
          i++;
        }
        this.allArr.push(numArr);
      });

      this.$emit("selctedObj", this.curValue);
    },
    change() {
      this.createNumArr();
    },
    lostFocuse() {
      setTimeout(() => {
        this.curShowSelectList = 0;
      }, 200);
    },
    // PickerChange(e, idx) {
    //   let n = e.detail.value;
    //   let m = Number(this.allArr[idx][n].num);
    //   this.curIndex[idx] = n;
    //   this.curValue[idx] = m;
    //   this.allArr = [];
    //   this.createNumArr();
    // },
  },
};
</script>

<style lang="scss" scoped>
$width: 80px;
.picker-box {
  // width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // width: 400px;
  // border: 1px solid red;
  .list {
    width: 100px;
    .el-select {
      margin-left: 10px;
    }
  }

  .iconfont {
    color: #e13f51;
    font-size: 42px;
    font-weight: 600;
  }

  .box {
    position: relative;
    margin-left: 20px;
    .input {
      height: 32px;
    }
    .list {
      position: absolute;
      width: 100%;
      // height: 160px;
      top: 32px;
      border: 1px solid #ccc;
      background-color: #fff;
      z-index: 2;
      box-sizing: border-box;
      border-radius: 5px;
      padding-top: 7px;
      .item {
        padding: 4px 10px;
        z-index: 4;
        color: gray;
        font-size: 13px;
        &:hover {
          background-color: #dcdcdc;
          cursor: pointer;
        }
      }
      .triangle {
        width: 10px;
        height: 10px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-right: none;
        border-bottom: none;
        position: absolute;
        top: -7px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        z-index: 3;
      }
    }
  }
}
</style>
