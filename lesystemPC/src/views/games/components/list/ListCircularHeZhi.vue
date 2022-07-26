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
      this.numList.forEach((arr) => {
        arr.forEach((item) => {
          if (item.isSelected) {
            item.isSelected = false;
          }
        });
      });
    },

    selectNum(item, index) {
      item.isSelected = !item.isSelected;
      this.selected();
    },

    selected() {
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
        this.numList.push(JSON.parse(JSON.stringify(this.Nlist)));
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
  box-sizing: border-box;
  user-select: none;
  .item {
    width: 100%;
    display: flex;
    // align-items: center;
    margin-bottom: 7px;
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
        margin: 0 20px 10px 0;
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
      width: 60%;
    }
  }
}
</style>