<template>
  <view class="bread-box" v-if="isShow">
    <!-- <select
      v-model="curOption"
      v-if="showType == 'A'"
      class="select"
      @change="changeOptions"
    >
      <option :value="item.label" v-for="(item, n) in optionList" :key="n">
        {{ item.label }}
      </option>
    </select> -->

    <view v-if="showType == 'A'" class="uni-list-cell-db">
      <picker
        mode="selector"
        @change="changeOptions"
        :value="index"
        :range="optionList"
        range-key="label"
      >
        <view class="uni-input">{{ optionList[index].label }}</view>
      </picker>

      <text class="iconfont icon-icon-test4 text-red"></text>
    </view>

    <view v-else class="right" @click="showCombinationType">
      <text>快速组合</text>
      <text class="iconfont icon-icon-test4 text-red"></text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      showType: null,
      optionList: [],
      curOption: "",
      isShow: false,
    };
  },
  watch: {
    "$store.state.GDV3.v3CurGame": {
      handler: function (val) {
        this.initData();
      },
    },
  },

  created() {
    this.initData();
  },
  methods: {
    changeOptions(e) {
      let index = e.target.value;
      this.index = index;
      let label = this.optionList[index].value;
      // console.log(label);

      this.$store.commit("temValue", label);
    },
    initData() {
      let { Id, C } = this.$store.state.GDV3.v3CurGame;
      let id = Number(Id);
      console.log(id);
      let routes = getCurrentPages();
      let query = routes[routes.length - 1].options;
      let ids1 = [1, 2, 595];

      if (!ids1.includes(Number(query.id))) {
        this.isShow = false;
        return;
      }
      let hiddenList = [2, 3, 4, 8, 10, 9, 13, 14, 15];
      if (hiddenList.includes(id)) {
        this.isShow = false;
        return;
      } else {
        this.isShow = true;
      }

      let optionList = [];
      if (id == 6) {
        optionList = [
          {
            label: "正码特一",
            value: "正码特一",
          },
          {
            label: "正码特二",
            value: "正码特二",
          },
          {
            label: "正码特三",
            value: "正码特三",
          },
          {
            label: "正码特四",
            value: "正码特四",
          },
          {
            label: "正码特五",
            value: "正码特五",
          },
          {
            label: "正码特六",
            value: "正码特六",
          },
        ];
      } else if (id == 7) {
        optionList = [
          {
            label: "正码一",
            value: "正码1",
          },
          {
            label: "正码二",
            value: "正码2",
          },
          {
            label: "正码三",
            value: "正码3",
          },
          {
            label: "正码四",
            value: "正码4",
          },
          {
            label: "正码五",
            value: "正码5",
          },
          {
            label: "正码六",
            value: "正码6",
          },
        ];
      } else if (id == 11) {
        optionList = [
          {
            label: "一肖",
            value: "一肖",
          },
          {
            label: "二肖",
            value: "二肖",
          },
          {
            label: "三肖",
            value: "三肖",
          },
          {
            label: "四肖",
            value: "四肖",
          },
          {
            label: "五肖",
            value: "五肖",
          },
          {
            label: "六肖",
            value: "六肖",
          },
          {
            label: "七肖",
            value: "七肖",
          },
          {
            label: "八肖",
            value: "八肖",
          },
          {
            label: "九肖",
            value: "九肖",
          },
          {
            label: "十肖",
            value: "十肖",
          },
          {
            label: "十一肖",
            value: "十一肖",
          },
        ];
      } else if (id == 12) {
        let arr = [];
        C.sort((a,b)=>a.Id - b.Id)
        C.forEach((obj) => {
          arr.push({
            label: obj.N,
            value: obj.N,
          });
        });
        optionList = arr;
      }

      let showType;
      let ids = [6, 7, 11, 12];
      if (ids.includes(id)) {
        showType = "A";
        this.curOption = optionList[0].value;
        this.optionList = optionList;
      }
      this.showType = showType;

      this.$store.commit("temValue", this.curOption);
    },
    showCombinationType() {
      //专给六合彩用
      let ts = new Date().getTime();
      this.$store.commit("showCombinationType", ts);
    },
  },
};
</script>


<style lang="scss" >
.uni-list-cell-db {
  border: 1px solid #ccc;
  padding: 0;
  // width: 250rpx;
  height: 70rpx;
  line-height: 70rpx;
  display: flex;
  .uni-input {
    font-size: 24rpx;
  }
}
</style>

<style lang="scss" scoped>
.bread-box {
  .right {
    border: 1px solid gray;
    padding: 0 5rpx;
    border-radius: 8rpx;
  }

  .select {
    width: 160rpx;
    height: 70rpx;
    outline: none;
  }
}
</style>