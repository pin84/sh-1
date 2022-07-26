<template>
  <div class="item">
    <div class="title">{{title}}</div>
    <ul class="num item-list">
      <li @click="selectNum(item)" class="num-box" v-for="(item, index) in numList" :key="index">
        <span class="out-line">
          <span :class="item.isSelected ? 'active' : 'bg'">{{ item.N }}</span>
        </span>
        <span class="odds">{{item.odds}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: () => "a",
    },
    numList: {
      type: Array,
      default: () => [{ N: "a", odds: 99 }],
    },
  },

  data() {
    return {
      selectedArr: [],
      radix: 2,
      mode: 1,
      times: 1,
      MaxOdds: {},
    };
  },

  watch: {
    "$store.state.gd.clearSelect": function (val) {
      this.clearSelected();
    },
  },

  methods: {
    clearSelected() {
      this.numList.forEach((item) => {
        if (item.isSelected) {
          item.isSelected = false;
        }
      });
      this.numList.push({});
      this.numList.pop();
    },

    selectNum(item, index) {
      this.$myAudio.playClick()
      item.isSelected = !item.isSelected;
      this.numList.push({});
      this.numList.pop();

      let selectedArr = [];
      this.numList.forEach((item) => {
        if (item.isSelected) {
          selectedArr.push(item);
        }
      });
      this.$emit("selectedNum", selectedArr);
    },


  },
};
</script>
<style lang="scss" scoped>
$width: 38px;
$width1: 32px;
$width3: 32px;
$width2: 26px;
.item {
  width: 100%;
  // height: 100%;
  display: flex;
  align-items: stretch;
  user-select: none;
  padding-bottom: 20px;
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
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-between;
    margin-left: 40px;
    .num-box {
      width: 80px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      .odds {
        color: #444;
        margin-top: 10px;
      }
      .out-line {
        display: inline-block;
        width: $width;
        height: $width;
        border: 1px solid #ccc;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        .bg,
        .active {
          display: inline-block;
          width: $width1;
          height: $width1;
          line-height: $width1;
          background-color: #adaead;
          border-radius: 50%;
          color: #fff;
          font-size: 20px;
          // font-weight:600;
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
        top: 0;
        right: -12px;
        // border:1px solid red;
        font-size: 12px;
        color: #9b9b9c;
      }
      .active {
        color: #f00;
      }
    }
  }

  // .num {
  //   width: 100%;
  // }
}
</style>