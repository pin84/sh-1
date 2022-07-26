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
              {{ item.N }}
            </div>
          </div>

            <span
            v-if="ACMCList.length"
            :class="{ active: mcac[idx][N] == ACMCList[idx][index][N] }"
            class="ex"
            > {{ ACMCList[idx][index][N] }}</span
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
          N: 0,
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
        this.idx = idx;
        this.getCodeRan();
      },
      deep: true,
    },
  },

  created() {
    this.initData();
  },

  methods: {
    async getCodeRan(val) {

      let { id } = this.$route.query
      this.idx == 0 ? (this.N = "AC") : (this.N = "MC");
      let res = await this.$get(this.$gapi.getCodeRank, { gameId: id });
      let mcac = [];
      res.data.forEach((arr) => {
        let AC = Math.min.apply(
          Math,
          arr.map((o) => {
            return o.AC;
          })
        );
        let MC = Math.max.apply(
          Math,
          arr.map((o) => {
            return o.MC;
          })
        );
        mcac.push({ AC, MC });
      });
      this.mcac = mcac;
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
            item.N > this.size
              ? (item.isSelected = true)
              : (item.isSelected = false);
          });
          break;
        case "小":
          this.numList[idx].forEach((item) => {
            item.N <= this.size
              ? (item.isSelected = true)
              : (item.isSelected = false);
          });
          break;
        case "单":
          this.numList[idx].forEach((item) => {
            item.N % 2 !== 0
              ? (item.isSelected = true)
              : (item.isSelected = false);
          });
          break;
        case "双":
          this.numList[idx].forEach((item) => {
            item.N % 2 === 0
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
      let map = new Map();
      this.numList.forEach((arr, idx) => {
        map.set(this.titleArr[idx], []);
        arr.forEach((item) => {
          if (item.isSelected) {
            map.get(this.titleArr[idx]).push(item);
          }
        });
      });

      this.$emit("selectedNum", map);
    },

    initData() {
      this.titleArr.forEach((item) => {
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
        text-align: center;
        width: 10%;
        position: relative;
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
            font-size: 18px;
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
        .ex {
          position: absolute;
          top: -5px;
          right: 5px;
          font-size: 12px;
          color: #9b9b9c;
        }
        .active {
          color: #f00;
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