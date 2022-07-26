<template>
  <!-- <ul class="list-circular"> -->
  <div class="list">
    <div class="title">{{ title }}</div>
    <ul v-if="isSquare" class="num item-list square">
      <li
        @click="selectNum(item)"
        class="num-box"
        v-for="(item, index) in numList"
        :key="index"
      >
        <div class="bg bg1" :class="item.isSelected ? 'active' : ''">
          <div>
            {{ item.N }}
          </div>
          <div v-if="item.desc" style="margin-top: 5px">
            {{ item.desc }}
          </div>
        </div>
        <div class="odds">{{ item.odds || 0 }}</div>
      </li>
    </ul>
    <ul v-else class="num item-list">
      <li
        @click="selectNum(item)"
        class="num-box"
        v-for="(item, index) in numList"
        :key="index"
      >
        <div class="out-line">
          <div class="bg" :class="item.isSelected ? 'active' : ''">
            {{ item.N }}
          </div>
        </div>
        <div class="odds">{{ item.odds || 0 }}</div>
      </li>
    </ul>

    <ul v-if="isShowSelectType" class="type item-list">
      <li
        @click="selectText(item)"
        class="num-box"
        v-for="(item, index) in Tlist"
        :key="index"
      >
        <div class="out-line">
          <div :class="item.isSelected ? 'active' : 'bg'">
            {{ item.text }}
          </div>
        </div>
      </li>
    </ul>
  </div>
  <!-- </ul> -->
</template>
<script>
export default {
  props: {
    isShowSelectType: {
      type: Boolean,
      default: () => true,
    },
    isSquare: {
      type: Boolean,
      default: () => false,
    },
    numList: {
      type: Array,
      default: () => [{ N: 1, odds: 33 }],
    },
    title: {
      type: String,
      default: () => "aa",
    },
    size: {
      type: Number,
      default: () => 4,
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
    return {};
  },

  watch: {
    "$store.state.gd.clearSelect": function (val) {
      this.clearSelected();
    },
  },

  created() {},

  methods: {
    clearSelected() {
      this.numList.forEach((item) => {
        if (item.isSelected) {
          item.isSelected = false;
        }
      });
      this.Tlist.forEach((item) => {
        if (item.isSelected) {
          item.isSelected = false;
        }
      });

      this.numList.push({});
      this.numList.pop();
    },
    selectText(item) {
      this.Tlist.forEach((obj) => {
        obj.isSelected = false;
      });

      if (item.text != "清") {
        item.isSelected = !item.isSelected;
      }

      switch (item.text) {
        case "全":
          this.numList.forEach((item) => (item.isSelected = true));
          break;
        case "大":
          this.numList.forEach((item) => {
            item.N > this.size
              ? (item.isSelected = true)
              : (item.isSelected = false);
          });
          break;
        case "小":
          this.numList.forEach((item) => {
            item.N <= this.size
              ? (item.isSelected = true)
              : (item.isSelected = false);
          });
          break;
        case "单":
          this.numList.forEach((item) => {
            item.N % 2 !== 0
              ? (item.isSelected = true)
              : (item.isSelected = false);
          });
          break;
        case "双":
          this.numList.forEach((item) => {
            item.N % 2 === 0
              ? (item.isSelected = true)
              : (item.isSelected = false);
          });
          break;
        case "清":
          this.numList.forEach((item) => (item.isSelected = false));
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
      this.numList.push({});
      this.numList.pop();
    },

    selected() {
      this.$myAudio.playClick();
      let selectedArr = [];
      let temArr = [];
      this.numList.forEach((item, idx) => {
        if (item.isSelected) {
          temArr.push(item);
        }
      });
      this.$emit("selectedNum", temArr);
    },
  },
};
</script>
<style lang="scss" scoped>
$width: 36px;
$width1: 29px;
$width3: 32px;
$width2: 26px;

.list {
  width: 100%;
  display: flex;
  margin-bottom: 7px;
  
  .title {
    flex: 0 0 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #5a5a5a;
    color: #fff;
    border-radius: 5px;
    font-style: oblique;
    font-weight: 600;
  }

  .item-list {
    display: flex;
    flex-wrap: wrap;
    margin-left: 40px;
    .num-box {
      text-align: center;
      width:75px;
      margin-bottom: 20px;
      // border: 1px solid red;
      .out-line {
        position: relative;
        margin: 0 auto;
        width: $width;
        height: $width;
        border: 1px solid #ccc;
        border-radius: 50%;
        font-size: 14px;
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
          // font-size:14px;
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
      .odds {
        margin-top: 10px;
        color: #444;
        font-size: 14px;
      }
    }
  }
  .square {
    .num-box {
      padding: 0 10px;
      .bg {
        border: 1px solid #f1f1f1;
        border-radius: 5px;
        padding: 5px 0;
        font-size: 14px;
        background: linear-gradient(#fff, #f1f1f1);
        &:hover {
          background: orange;
          cursor: pointer;
        }
        &.active {
          background: #cf271e;
          color: #fff;
        }
        &.active:hover {
          cursor: pointer;
        }
      }
      .odds {
        color: #f00;
      }
    }
  }

  .num {
    width: 100%;
    // border: 1px solid red;
  }

  .type {
    flex: 0 0 280px;
    // border: 1px solid red;
    .num-box {
      width: 16%;
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
</style>