<template>
  <ul class="list-circular">
    <li class="item" v-for="(title, idx) in titleArr" :key="idx">
      <div class="title">{{ title }}</div>
      <ul class="item-list">
        <li
          @click="selectNum(item,idx,index)"
          class="num-box pointer"
          v-for="(item, index) in numArr[idx]"
          :key="index"
          :class="item.active ? 'active' : ''"
        >{{ item.num }}</li>
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
    numArr: {
      type: Array,
      default: () => [[{ num: 1, active: true }]],
    },
    isRadio:{
      type:Number,
      default:()=>0
    }
  },
  data() {
    return {
      idx: null, //冷热or遗漏
      mcac: [],
      N: "MC",
      curId: "",
    };
  },

  watch: {
    "$store.state.gd.clearSelect": function (val) {
      this.clearSelected();
    },
  },

  created() {},

  methods: {
    clearSelected() {
      this.numArr.forEach((arr) => {
        arr.forEach((item) => {
          if (item.active) {
            item.active = false;
          }
        });
      });
      this.numArr.push({});
      this.numArr.pop();
    },

    selectNum(item, idx, index) {
      this.$myAudio.playClick()
      if(this.isRadio){
        let i = idx == 1 ? 0 : 1;
        if (this.numArr[i][index].active) {
          this.numArr[i][index].active = false;
        }
      }

      item.active = !item.active;
      this.numArr.push({});
      this.numArr.pop();

      let selectedArr = [];

     
      this.numArr.forEach((arr, idx) => {
        let temArr = [];
        arr.forEach((item) => {
          if (item.active) {
            temArr.push(item.num);
          }
        });
        if (temArr.length !== 0) {
          selectedArr.push(temArr);
        }
      });
      // if (selectedArr.length == 0) return;
      this.$emit("selectedNum", selectedArr);
    },
  },
};
</script>
<style lang="scss" scoped>
$width: 40px;
$width1: 32px;
$width3: 36px;
$width2: 28px;
$height: 32px;
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
      height: $height;
      line-height: $height;
      text-align: center;
      background-color: #5a5a5a;
      color: #fff;
      border-radius: 5px;
      font-style: oblique;
      font-weight: 600;
    }
    .item-list {
      width: 100%;
      display: flex;
      // justify-content: space-between;
      margin-left: 40px;
      // border: 1px solid red;
      .num-box {
        text-align: center;
        width: 75px;
        height: $height;
        line-height: $height;
        border-radius: 5px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        background: linear-gradient(#fff 20%, #ccc);
        margin-right: 25px;
        font-size:14px;
        &:hover {
          background: #ffd037;
        }
      }
      .active {
        background: #b62929;
        border: 1px solid #b62929;
        color: #fff;
        &:hover {
          background: #b62929;
        }
      }
    }
  }
}
</style>