<template>
  <view class="bettin-shop">
    <view class="list-wrapper">
      <view
        class="flex list-box align-start padding-top-sm"
        v-for="(item, idx) in titleArr"
        :key="idx"
      >
        <view class="title-box flex flex-direction">
          <view class="title text-white text-center">{{ item }}</view>
          <view v-if="idx == 0 && isShowSort" class="s-box text-center">

            <view class="uni-list-cell-db-m">
              <picker
                class="select"
                model="select"
                :value="sindex"
                :range="array"
                @change="selected"
              >
                <view class="uni-input">{{ array[sindex] }}</view>
              </picker>
              <text class="iconfont icon-xiangxia"></text>
            </view>
            
          </view>
        </view>
        <view class="select-box margin-left-xl" style="width: 100%">
          <view class="flex justify-between">
            <text
              @click="selsectType(text, idx)"
              :class="{ 'select-type-active': text.active }"
              class="select-type radius margin-right-sm"
              v-for="(text, index) in textArr[idx]"
              :key="index"
            >
              {{ text.t }}
            </text>
          </view>
          <view class="flex num-box justify-between">
            <view
              @click="selectedNum(i, idx)"
              class="text-box"
              v-for="(i, index) in numArr[idx]"
              :key="index"
            >
              <view>
                <view
                  class="select-num"
                  :class="{ 'active-num': i.active }"
                ></view>
                <text
                  class="innerText text-lg"
                  :class="{ 'active-text': i.active }"
                  >{{ i.num }}</text
                >
              </view>
              <text
                class="hot"
                :class="{
                  'text-red':
                    selectedValue == '冷热'
                      ? rank[idx][index].isMaxac
                      : rank[idx][index].isMaxmc,
                }"
                v-if="isShowRank"
              >
                {{
                  selectedValue == "冷热"
                    ? rank[idx][index].AC
                    : rank[idx][index].MC
                }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    titleArr: {
      type: Array,
      default: () => ["万位", "千位", "百位", "十位", "个位"],
    },
    isShowSort: {
      type: Boolean,
      default: () => true,
    },
    numberObj: {
      type: Array,
      default: () => [
        { num: 0 },
        { num: 1 },
        { num: 2 },
        { num: 3 },
        { num: 4 },
        { num: 5 },
        { num: 6 },
        { num: 7 },
        { num: 8 },
        { num: 9 },
      ],
    },
  },
  data() {
    return {
      sindex: 0,
      array: ["不显示", "冷热", "遗漏"],
      temText: "",
      textArr: [],
      numArr: [],
      textObj: [
        { t: "全" },
        { t: "大" },
        { t: "小" },
        { t: "单" },
        { t: "双" },
        { t: "清" },
      ],
      curGame: {},
      selectedData: [],
      selectedValue: "不显示",
      isShowFirstSelect: false,
      rank: [], //冷热数据
      isShowRank: false,
      selectedCount: 0,
    };
  },

  mounted() {
    this.initData();
  },

  watch: {
    "$store.state.GDV3.clearSelected": function (val) {
      this.resetData();
    },
  },

  methods: {
    initData() {
      this.titleArr.forEach((item, idx) => {
        this.textArr.push(JSON.parse(JSON.stringify(this.textObj)));
        this.numArr.push(JSON.parse(JSON.stringify(this.numberObj)));
      });
    },
    async selected(e) {
      // if (this.selectedValue == "不显示") {
      //   this.selectedValue = "排行";
      //   this.isShowRank = false;
      //   return;
      // }

      let index = e.target.value;
      this.sindex = index;
      this.selectedValue = this.array[index];

      this.isShowRank = false;
      if (this.selectedValue == "不显示") {
        return;
      }

      let routes = getCurrentPages();
      let { id } = routes[routes.length - 1].options;
      let obj = {
        url: this.$api.getCodeRank,
        data: {
          gameId: id,
        },
      };
      let res = await this.$http(obj);

      res.data.forEach((outItem) => {
        let mMc = Math.max(...outItem.map((m) => m.MC));
        let mAc = Math.min(...outItem.map((m) => m.AC));
        console.log(mAc);
        outItem.find(
          (item) => item.MC == mMc || item.MC == null
        ).isMaxmc = true;
        outItem.find(
          (item) => item.AC == mAc || item.AC == null
        ).isMaxac = true;
      });

      this.rank = res.data;
      this.isShowRank = true;
    },

    selsectType(obj, idx) {
      this.textArr[idx].forEach((item) => (item.active = false));
      if (obj.t !== "清") {
        obj.active = true;
      }
      this.textArr.push({});
      this.textArr.pop();

      this.numArr[idx].forEach((item) => (item.active = false));
      switch (obj.t) {
        case "全":
          this.numArr[idx].forEach((item) => (item.active = true));
          break;
        case "大":
          this.numArr[idx].forEach((item) => {
            item.num > 4 ? (item.active = true) : (item.active = false);
          });
          break;
        case "小":
          this.numArr[idx].forEach((item) => {
            item.num < 5 ? (item.active = true) : (item.active = false);
          });
          break;
        case "单":
          this.numArr[idx].forEach((item) => {
            item.num % 2 !== 0 ? (item.active = true) : (item.active = false);
          });
          break;
        case "双":
          this.numArr[idx].forEach((item) => {
            item.num % 2 === 0 ? (item.active = true) : (item.active = false);
          });
          break;
        case "清":
          this.numArr[idx].forEach((item) => (item.active = false));
          break;
        default:
          this.numArr[idx].forEach((item) => (item.active = false));
          break;
      }
      this.refreshView();
      this.handlerData(idx);
    },
    selectedNum(obj, idx) {
      obj.active = !obj.active;
      this.refreshView();
      this.handlerData(idx);
    },

    handlerData(idx) {
      let title = this.titleArr[idx];
      let temArr = [];
      this.numArr[idx].forEach((item) => {
        if (item.active) {
          temArr.push(item);
        }
      });

      let obj = {};
      obj[title] = temArr;
      this.$emit("selectedNum", obj);
      this.isHasSelected();
    },

    isHasSelected() {
      let len = this.numArr.length;
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < 10; j++) {
          if (this.numArr[i][j].active) {
            this.$store.commit("v3IsHasSelected", true);
            i = len;
            j = 10;
          } else {
            this.$store.commit("v3IsHasSelected", false);
          }
        }
      }
    },

    resetData() {
      this.textArr.forEach((outItem) => {
        outItem.forEach((inItem) => (inItem.active = false));
      });
      this.numArr.forEach((outItem) => {
        outItem.forEach((inItem) => (inItem.active = false));
      });
      this.refreshView();
    },

    refreshView() {
      this.numArr.push({});
      this.numArr.pop();
    },
  },
};
</script>



<style lang="scss" scoped>
.bettin-shop {
  .list-wrapper {
    .list-box {
      border-top: 1px solid #d0d0d0;
      .title-box {
        flex: 0 0 120rpx;
        padding: 0;
        font-size: 24rpx;
        .title {
          position: relative;
          background-color: #b62929;
          height: 60rpx;
          line-height: 60rpx;
          z-index: 2;
        }
        .s-box {
          position: relative;
          // .select {
          //   font-size: 10rpx !important;
          //   position: absolute;
          //   top: -20rpx;
          //   width: 100%;
          // }
        }
        .title:after {
          position: absolute;
          right: -30rpx;
          top: 50%;
          margin-top: -30rpx;
          content: "";
          display: block;
          width: 0;
          height: 0;
          border-top: 30rpx solid transparent;
          border-left: 30rpx solid #b62929;
          border-bottom: 30rpx solid transparent;
        }
        .select {
          border: none;
          outline: none;
          background-color: #f1f1f1;
          font-size: 20rpx;
        }
      }

      .select-type {
        font-size: 32rpx;
        padding: 0 20rpx;
        color: #3b3a3a;
        background: #fff;
        border: 1px solid #bfbfbf;
      }

      .select-type-active {
        border: 1px solid #b62929;
        background-color: #b62929;
        color: #fff;
      }
      .num-box {
        flex-wrap: wrap;
        margin-top: 20rpx;
        padding-right: 10rpx;
        display: flex;
        .text-box {
          position: relative;
          padding: 16rpx 20rpx;
          padding-left: 0;
          display: flex;
          .select-num {
            width: 80rpx;
            height: 80rpx;
            line-height: 80rpx;
            border: 1px solid #bfbfbf;
            border-radius: 50%;
            background-color: #fff;
            font-size: 36rpx;
            transform: rotate(-60deg);
            transition: 0.2s;
          }
          .select-num::after {
            position: absolute;
            right: -18rpx;
            top: 60%;
            margin-top: -38rpx;
            content: "";
            display: block;
            width: 0;
            height: 0;
            transform: scale(0);
            border-top: 30rpx solid transparent;
            border-left: 30rpx solid #b62929;
            border-bottom: 30rpx solid transparent;
          }
          .hot {
            position: absolute;
            top: 8rpx;
            right: 5rpx;
            width: 26rpx;
            height: 26rpx;
            line-height: 26rpx;
            text-align: center;
            overflow: hidden;
            font-size: 18rpx;
          }
          .innerText {
            position: absolute;
            left: 40%;
            top: 50%;
            transform: translate(-50%, -50%);
            // display: inline-block;
          }
          .active-text {
            color: #fff;
          }
          .active-num {
            position: relative;
            border-color: #b62929;
            background-color: #b62929;
            // color: #fff;
            transform: rotate(-140deg);
            .innerText {
              color: #fff;
            }
          }
          .active-num::after {
            transform: scale(1);
          }
        }
      }
    }
  }

  @keyframes rotate_60 {
    0% {
      transform: rotate(-60deg);
    }

    100% {
      transform: rotate(-140deg);
    }
  }
}
</style>
