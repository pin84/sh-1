<template>
  <div class="list-circular">
    <div class="title">{{ title }}</div>
    <ul class="num item-list">
      <li
        @click="selectNum(item)"
        class="num-box"
        v-for="(item, index) in numList"
        :key="index"
      >
        <div class="out-line">
          <div class="bg" :class="item.isSelected ? 'active' : ''">
            {{ item.num }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: () => "万位",
    },

    numList: {
      type: Array,
      default: () => [
        {
          isSelected: false,
          num: 0,
        },
      ],
    },
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
    },

    selectNum(item, index) {
      item.isSelected = !item.isSelected;
      this.selected();
    },

    selected() {
      let temArr = [];
      this.numList.forEach((item, idx) => {
        if (item.isSelected) {
          temArr.push(item.num);
        }
      });
      this.$emit("selectedNum", temArr);
    },
  },
};
</script>
<style lang="scss" scoped>
$width: 34px;
$width1: 26px;
$width3: 34px;
$width2: 28px;
.list-circular {
  width: 100%;
  // height: 100%;
  display: flex;
  // flex-direction: column;
  // align-content: center;
  // justify-content: space-around;
  box-sizing: border-box;
  user-select: none;
  // .item {
  //   width: 100%;
  //   display: flex;
  //   // align-items: center;
  //   margin-bottom: 7px;
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
    margin-left: 40px;
    .num-box {
      text-align: center;
      margin: 0 18px 8px 0;
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
    }
  }

  .num {
    width: 70%;
  }
}
// }
</style>