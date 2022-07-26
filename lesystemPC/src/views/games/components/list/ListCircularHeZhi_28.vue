<template>
  <ul class="list-circular">
    <li class="item" v-for="(title, idx) in titleArr" :key="idx">
      <div class="title">{{ title }}</div>
      <ul class="num item-list">
        <li
          @click="selectNum(item, idx)"
          class="num-box"
          v-for="(item, index) in Nlist[idx]"
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
//只给28用，有的游戏最多只能选择8个号码
export default {
  props: {
    isLimitEight: {
      type: Boolean,
      default: () => false,
    },
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
      ],
    },
  },

  data() {
    return {
      selectedObj: {},
    };
  },

  watch: {
    "$store.state.gd.clearSelect": function (val) {
      this.clearSelected();
    },
  },

  methods: {
    clearSelected() {
      this.Nlist.forEach((arr) => {
        arr.forEach((item) => {
          if (item.isSelected) {
            item.isSelected = false;
          }
        });
      });
      this.selectedObj = {};
    },

    async selectNum(item, index) {
       this.$myAudio.playClick()
      let s = Object.values(this.selectedObj).reduce(
        (accumulator, currentValue) => {
          return accumulator + currentValue.length;
        },
        0
      );

      if (s >= 8 && this.isLimitEight) {
        await this.$gutils.confirm({ text: "最多只能选择8个" });
        return;
      }

      item.isSelected = !item.isSelected;

      let tem = [];
      this.Nlist[index].forEach((item) => {
        if (item.isSelected) {
          tem.push(item.num);
        }
      });

      this.selectedObj[this.titleArr[index]] = tem;

      this.$emit("selectedNum", Object.values(this.selectedObj));
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
}
</style>