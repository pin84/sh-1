<template>
  <view class="list-wrapper">
    <view class="list-box" v-for="(item, idx) in titleArr" :key="idx">
      <view class="title-box flex flex-direction">
        <view class="title text-white text-center">{{ item }}</view>
        <view v-if="idx === 0 && isShowSort" class="text-center">
          <!-- <select class="select" @change="selected" v-model="selectedValue">
            <option v-show="isShowFirstSelect" value="排行">排行</option>
            <option value="不显示">不显示</option>
            <option value="冷热">冷热</option>
            <option value="遗漏">遗漏</option>
          </select> -->

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
      <view class="select-box">
        <view class="slect-type-box" v-if="isShowTitle">
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
        <view class="num-box">
          <view
            @click="selectedNum(i, idx)"
            class="text-box"
            v-for="(i, index) in numArr[idx]"
            :key="index"
          >
            <!-- <view> -->
            <view class="select-num" :class="{ 'active-num': i.active }"></view>
            <text class="innerText" :class="{ 'active-text': i.active }">{{
              i.num
            }}</text>
            <text
              class="hot"
              :class="{
                'text-red':
                  selectedValue === '冷热'
                    ? rank[idx][index].isMaxac
                    : rank[idx][index].isMaxmc,
              }"
              v-if="isShowRank"
            >
              {{
                selectedValue === "冷热"
                  ? rank[idx][index].AC || 1
                  : rank[idx][index].MC || 1
              }}
            </text>
            <!-- </view> -->
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    isMaxLen: {
      type: Boolean,
      default: () => false,
    },
    titleArr: {
      type: Array,
      default: () => ["万位", "千位", "百位", "十位", "个位"],
    },
    isShowTitle: {
      type: Boolean,
      default: () => true,
    },
    size: {
      type: Number,
      default: () => 5,
    },
    isShowSort: {
      type: Boolean,
      default: () => false,
    },
    numList: {
      type: Array,
      default: () => [{ num: 1 }, { num: 1 }, { num: 1 }],
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
      selectedValue: "排行",
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
    // '$store.state.gameData.curGame': {
    // 	handler: function(val) {
    // 		this.resetData();
    // 	}
    // },
  },

  methods: {
    async selected(e) {
      let index = e.target.value;
      this.sindex = index;
      this.selectedValue = this.array[index];
      this.isShowRank = false;

      if (this.selectedValue === "不显示") {
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
        outItem.find((item) => item.MC == mMc|| item.MC == null ).isMaxmc = true;
        outItem.find((item) => item.AC == mAc || item.AC ==null).isMaxac = true;
      });

      this.rank = res.data;
      this.isShowRank = true;
    },
    initData() {
      this.titleArr.forEach((item, idx) => {
        this.textArr.push(JSON.parse(JSON.stringify(this.textObj)));
        this.numArr.push(JSON.parse(JSON.stringify(this.numList)));
      });
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
            item.num > this.size ? (item.active = true) : (item.active = false);
          });
          break;
        case "小":
          this.numArr[idx].forEach((item) => {
            item.num <= this.size
              ? (item.active = true)
              : (item.active = false);
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
      if (!obj.active && this.isMaxLen) {
        this.$util.showConfirm({
          content: "最多只能选择8个",
        });
        return;
      }

      obj.active = !obj.active;
      this.refreshView();
      this.handlerData(idx);
    },

    handlerData(idx) {
      // console.log(this.numArr)
      // let temArr = [];
      // this.numArr.forEach(outItem => {
      // 	outItem.forEach(inItem => {
      // 		if(inItem.active ){
      // 			temArr.push(inItem)
      // 		}
      // 	});
      // });
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
.list-wrapper {
  padding: 10rpx;
  .list-box {
    display: flex;
    padding-top: 35rpx;
    border-top: 1px solid #d0d0d0;
    .title-box {
      flex: 0 0 120rpx;
      padding: 0;
      font-size: 24rpx;
      .title {
        position: relative;
        background-color: #b62929;
        // padding: 0 30rpx;
        height: 60rpx;
        line-height: 60rpx;
        font-size: 24rpx;
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

    .select-box {
      margin-left: 40rpx;
      width: 100%;
      .slect-type-box {
        display: flex;
        margin-bottom: 30rpx;
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
      }

      .num-box {
        flex-wrap: wrap;
        display: flex;
        width: 100%;
        .text-box {
          position: relative;
          width: 20%;
          margin-bottom: 30rpx;
          display: flex;
          .select-num {
            width: 80rpx;
            height: 80rpx;
            line-height: 80rpx;
            border: 1px solid #bfbfbf;
            border-radius: 50%;
            background-color: #fff;
            font-size: 36rpx;
            // transform: rotate(-60deg);
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
            position: relative;
            left: -40rpx;
            line-height: 80rpx;
            transform: translate(-50%, 0%);
            font-size: 32rpx;
            z-index: 1;
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
}

@keyframes rotate_60 {
  0% {
    transform: rotate(-60deg);
  }

  100% {
    transform: rotate(-140deg);
  }
}
</style>
