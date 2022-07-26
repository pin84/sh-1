<template>
  <ul class="list-circular">
    <!-- <li class="item" v-for="(title, idx) in titleArr" :key="idx"> -->
    <div class="title">{{ title }}</div>
    <ul class="num item-list">
      <li @click="selectNum(item)" class="num-box" v-for="(item, index) in numList" :key="index">
        <span class="out-line">
          <span :class="item.isSelected ? 'active' : 'bg'">{{ item.num }}</span>
        </span>
      </li>
    </ul>
    <!-- </li> -->
  </ul>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: () => "aa",
    },
    numLimit: {
      type: Number,
      default: () => 18,
    },
    startNum:{
      type:Number,
      default:()=>0
    }
  },
  data() {
    return {
      curId: "",
      numList: [],
    };
  },

  watch: {
    "$store.state.gd.clearSelect": function (val) {
      this.clearSelected();
    },
  },

  created() {
    this.initData();
  },

  methods: {
    clearSelected() {
      this.numList.forEach((item) => {
        if (item.isSelected) {
          item.isSelected = false;
        }
      });
    },

    selectNum(item, index) {
      item.isSelected = !item.isSelected;
      this.selected();
    },

    selected() {
      this.$myAudio.playClick()
      let selectedArr = [];
      this.numList.forEach((item, idx) => {
        if (item.isSelected) {
          selectedArr.push(item.num);
        }
      });
      if (selectedArr.length == 0) return;
      this.$emit("selectedNum", selectedArr,);
    },

    initData() {
      let i = this.startNum;
      let list = [];
      while (i < this.numLimit) {
        list.push({
          isSelected: false,
          num: i,
        });
        i++;
      }
      this.numList = list;
    },
  },
};
</script>
<style lang="scss" scoped>
$width: 40px;
$width1: 32px;
$width3: 36px;
$width2: 28px;
.list-circular {
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  // justify-content: space-around;
  // padding: 0 30px;
  box-sizing: border-box;
  user-select: none;
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
    align-content: center;
    // justify-content: space-between;
    margin-left: 40px;
    max-width: 70%;
    flex-wrap: wrap;
    .num-box {
      position: relative;
      text-align: center;
      display: flex;
      width: 9%;
      margin-bottom: 10px;
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
</style>