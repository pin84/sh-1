<template>
  <ul class="list-circular">
    <li class="item" v-for="(title, idx) in titleArr" :key="idx">
      <div class="title">{{ title }}</div>
      <ul class="num item-list">
        <li
          @click="selectNum(item)"
          class="num-box"
          v-for="(item, index) in numList[idx]"
          :key="index"
        >
          <div class="out-line">
            <div class="bg" :class="item.isSelected ? 'active' : ''">
              {{ item.num }}
            </div>
          </div>
          <span
            v-if="ACMCList.length"
            :class="{ active: ACMCList[idx][index].active }"
            class="ex"
            >{{ ACMCList[idx][index][acOrmc] }}</span
          >
        </li>
      </ul>

      <ul class="type item-list">
        <li
          @click="selectText(item, idx)"
          class="num-box"
          v-for="(item, index) in textList[idx]"
          :key="index"
        >
          <div class="out-line">
            <div :class="item.isSelected ? 'active' : 'bg'">
              {{ item.text }}
            </div>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    titleArr: {
      type: Array,
      default: () => ["万位", "千位", "百位", "十位", "个位"],
    },
    size: {
      type: Number,
      default: () => 4,
    },
    Nlist: {
      type: Array,
      default: () => [
        {
          isSelected: false,
          num: 0,
        },
        {
          isSelected: false,
          num: 1,
        },
        {
          isSelected: false,
          num: 2,
        },
        {
          isSelected: false,
          num: 3,
        },
        {
          isSelected: false,
          num: 4,
        },
        {
          isSelected: false,
          num: 5,
        },
        {
          isSelected: false,
          num: 6,
        },
        {
          isSelected: false,
          num: 7,
        },
        {
          isSelected: false,
          num: 8,
        },
        {
          isSelected: false,
          num: 9,
        },
      ],
    },
    Tlist: {
      type: Array,
      default: () => [
        {
          isSelected: false,
          text: "全",
        },
        {
          isSelected: false,
          text: "大",
        },
        {
          isSelected: false,
          text: "小",
        },
        {
          isSelected: false,
          text: "单",
        },
        {
          isSelected: false,
          text: "双",
        },

        {
          isSelected: false,
          text: "清",
        },
      ],
    },
  },
  data() {
    return {
      idx: null, //冷热or遗漏
      mcac: [],
      N: "MC",
      curId: "",
      numList: [],
      textList: [],
      ACMCList: [],
      acOrmc: "AC",
    };
  },

  watch: {
    "$store.state.gd.clearSelect": function (val) {
      this.clearSelected();
    },
    "$store.state.gd.settlefId": function (val) {
      if (this.ACMCList.length == 0) return;
      this.getCodeRan();
    },
    "$store.state.gd.codeRank": {
      handler: function (val) {
        if (JSON.stringify(val) == "{}") {
          this.ACMCList = [];
          return;
        }
        let { idx } = val;
        if (idx == 0) {
          this.acOrmc = "AC";
        } else {
          this.acOrmc = "MC";
        }
        this.getCodeRan();
      },
      deep: true,
    },
  },

  created() {
    this.initData();
  },

  methods: {
    async getCodeRan() {
       this.ACMCList = []
      let { id } = this.$store.state.gd.indexGame;
      let res = await this.$get(this.$gapi.getCodeRank, { gameId: id });

      let flag = this.acOrmc == "AC";
      res.data.forEach((arr) => {
        let temArr = [];
        arr.forEach((item) => {
          temArr.push(item[this.acOrmc]);
        });

        let num;
        if (flag) {
          num = Math.min(...temArr);
        } else {
          num = Math.max(...temArr);
        }

        let filterArr = arr.filter((obj) => obj[flag ? "AC" : "MC"] == num);
        filterArr.forEach((obj1) => {
          obj1.active = true;
        });
      });
      this.ACMCList = res.data;

    },
    clearSelected() {
      this.numList.forEach((arr) => {
        arr.forEach((item) => {
          if (item.isSelected) {
            item.isSelected = false;
          }
        });
      });
      this.textList.forEach((arr) => {
        arr.forEach((item) => {
          if (item.isSelected) {
            item.isSelected = false;
          }
        });
      });
    },
    selectText(item, idx) {
      this.textList[idx].forEach((obj) => {
        obj.isSelected = false;
      });

      if (item.text != "清") {
        item.isSelected = !item.isSelected;
      }

      switch (item.text) {
        case "全":
          this.numList[idx].forEach((item) => (item.isSelected = true));
          break;
        case "大":
          this.numList[idx].forEach((item) => {
            item.num > this.size
              ? (item.isSelected = true)
              : (item.isSelected = false);
          });
          break;
        case "小":
          this.numList[idx].forEach((item) => {
            item.num <= this.size
              ? (item.isSelected = true)
              : (item.isSelected = false);
          });
          break;
        case "单":
          this.numList[idx].forEach((item) => {
            item.num % 2 !== 0
              ? (item.isSelected = true)
              : (item.isSelected = false);
          });
          break;
        case "双":
          this.numList[idx].forEach((item) => {
            item.num % 2 === 0
              ? (item.isSelected = true)
              : (item.isSelected = false);
          });
          break;
        case "清":
          this.numList[idx].forEach((item) => (item.isSelected = false));
          break;
        // default:
        //   this.numList[idx].forEach((item) => (item.isSelected = false));
        //   break;
      }

      this.selected();
    },
    selectNum(item, index) {
      item.isSelected = !item.isSelected;
       
      this.selected();
    },

    selected() {
      this.$myAudio.playClick()
      let selectedArr = [];
      let nameArr = [];
      this.numList.forEach((arr, idx) => {
        let temArr = [];
        arr.forEach((item) => {
          if (item.isSelected) {
            nameArr.push(this.titleArr[idx]);
            temArr.push(item.num);
          }
        });
        if (temArr.length !== 0) {
          selectedArr.push(temArr);
        }
      });
      // if (selectedArr.length == 0) return;
      let set = new Set(nameArr);
      this.$emit("selectedNum", selectedArr, Array.from(set));
    },

    initData() {
      this.titleArr.forEach((item) => {
        // let i = 10,
        //   arr = [];
        // while (i--) {
        //   arr.unshift({
        //     isSelected: false,
        //     num: i,
        //   });
        // }
        this.numList.push(JSON.parse(JSON.stringify(this.Nlist)));
        this.textList.push(JSON.parse(JSON.stringify(this.Tlist)));
      });
    },
  },
};

</script>
<style lang="scss" scoped>
$width: 36px;
$width1: 28px;
$width3: 34px;
$width2: 28px;
.list-circular {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-around;
  // padding: 0 30px;
  box-sizing: border-box;
  user-select: none;
  .item {
    width: 100%;
    // height: 100px;
    display: flex;
    align-items: center;
    margin-bottom: 7px;
    font-size: 14px;
    // border: 1px solid green;
    .title {
      flex: 0 0 100px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      background-color: #5a5a5a;
      color: #fff;
      border-radius: 5px;
      font-style: oblique;
      font-weight: 600;
    }
    .item-list {
      display: flex;
      // align-content: center;
      // justify-content: space-between;
      margin-left: 40px;
      .num-box {
        position: relative;
        text-align: center;
        width: 10%;
        // border: 1px solid red;
        .out-line {
          position: relative;
          margin: 0 auto;
          width: $width;
          height: $width;
          border: 1px solid #ccc;
          border-radius: 50%;
          .bg,
          .active {
            display: inline-block;
            width: $width1;
            height: $width1;
            line-height: $width1;
            background-color: #adaead;
            border-radius: 50%;
            color: #fff;
            font-size: 16px;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            text-align: center;
          }
          .bg:hover {
            background-color: orange;
            cursor: pointer;
          }
          .active {
            background-color: #cf271e;
          }
          .active:hover {
            cursor: pointer;
          }
        }
        // .odds{
        //   border:1px solid red;
        // }
        .ex {
          position: absolute;
          top: -5px;
          right: 5px;
          font-size: 12px;
          color: #9b9b9c;
        }
        .active {
          color: #f00;
          font-weight: 600;
        }
      }
    }

    .num {
      width: 100%;
    }

    .type {
      flex: 0 0 280px;
      .num-box {
        width: 18%;
        .out-line {
          width: $width3;
          height: $width3;
          border-radius: 5px;
          background-color: #f1f1f1;
          .bg,
          .active {
            width: $width2;
            height: $width2;
            line-height: $width2;
            border-radius: 5px;
          }
        }

        .out-line:hover {
          background-color: gray;
        }
      }
    }
  }
}
</style>