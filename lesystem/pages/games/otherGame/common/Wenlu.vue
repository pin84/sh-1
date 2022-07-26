<template>
  <view class="wenlu">
    <view class="title">
      <!-- <select class="select" v-model="site" @change="changeSelect">
        <option
          :value="selectItem"
          v-for="(selectItem, index) in selectList"
          :key="index"
        >
          {{ selectItem }}
        </option>
      </select> -->

      <view class="uni-list-cell-db">
        <picker @change="changeSelect" :value="selectIndex" :range="selectList">
          <view class="uni-input">{{ selectList[selectIndex] }}</view>
        </picker>
      </view>

      <view class="title-btn-box">
        <view
          @click="selectBtn(ids)"
          v-for="(btn, ids) in site === '龙虎斗'
            ? buttonList_longhu
            : buttonList"
          :key="ids"
          class="btna"
          :class="{ 'bg-orange': btnIndex === ids }"
        >
          {{ btn }}
        </view>
      </view>
    </view>

    <view class="lu-box margin-top-xs">
      <view class="name"><text class="dalu">大路</text></view>
      <scroll-view
        class="canvas-boxa"
        v-if="nums.length !== 0"
        scroll-x="true"
        scroll-left="5000"
      >
        <NumberCanvas
          :btnIndex="btnIndex"
          :numList="nums"
          :gameType="site === '龙虎斗' ? 1 : 0"
        />
      </scroll-view>
    </view>

    <view class="flex flex-wrap">
      <view
        class="lu-box flex margin-top-xs"
        style="width: 50%"
        v-for="(lu, idx) in luName"
        :key="idx"
      >
        <view class="name">
          <text class="dalu">{{ lu.lu }}</text>
        </view>
        <scroll-view
          class="canvas-boxa"
          v-if="lu.nums.length !== 0"
          scroll-x="true"
          scroll-left="5000"
        >
          <NumberCanvas
            :drawPicType="lu.drawPicType"
            :btnIndex="btnIndex"
            :numList="lu.nums"
            :gameType="site === '龙虎斗' ? 1 : 0"
            :orderType="lu.orderType"
            :id="'id-' + idx"
          />
        </scroll-view>
      </view>
    </view>

    <view class="btn-box flex justify-between">
      <view
        @click="activeBtn(lt, id)"
        class="flex btn"
        :class="[
          { 'btn-right': id === 1 },
          { 'ac-btn-0': isActive_0 && id === 0 },
          { 'ac-btn-1': isActive_1 && id === 1 },
        ]"
        style="width: 48%"
        v-for="(lt, id) in curBtnList"
        :key="id"
      >
        <view class="flex-sub left">{{ lt }}</view>
        <view class="flex-sub right">
          <view class="icon-box">
            <text
              v-show="btnIndex !== 0"
              v-for="(iconName, idx) in iconArr"
              :key="idx"
              class="iconfont"
              :class="[iconName, iconColor[iconColorList[+btnIndex + id][idx]]]"
            ></text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import NumberCanvas from "@/components/lesystem/NumberCanvas";
import canvasDataHandler from "./canvasDataHandler";
export default {
  props: {
    selectList: {
      type: Array,
      default: () => [
        "第一球",
        "第二球",
        "第三球",
        "第四球",
        "第五球",
        "龙虎斗",
      ],
    },
  },
  data() {
    return {
      selectIndex: 0,
      unHandlerList: [], //暂时缓存后台请求回来的数据
      nums: [], //经过处理的数据 。传给canvas
      isShowDaluCanvas: false,
      width_1: 4400, //第一个canvas的宽度
      width_2: 750, //第一个canvas的宽度
      boundary: 5, //大小的分界
      site: "第一球",
      temList: [], //缓存 以下两个list
      buttonList: ["球号", "单双", "大小", "总和单双", "总和大小"],
      buttonList_longhu: [
        "1vs2",
        "1vs3",
        "1vs4",
        "1vs5",
        "2vs3",
        "2vs4",
        "2vs5",
        "3vs4",
        "3vs5",
        "4vs5",
      ],

      btnIndex: 0,
      isActive_0: false,
      isActive_1: false,
      isHasNum1: false,
      isHasNum2: false,

      luName: [
        { lu: "珠盘路", orderType: "2", drawPicType: 1, nums: [] },
        { lu: "大眼路", orderType: "1", drawPicType: 2, nums: [] },
        { lu: "小眼路", orderType: "1", drawPicType: 3, nums: [] },
        { lu: "曱甴路", orderType: "1", drawPicType: 4, nums: [] },
      ],
      iconArr: ["icon-yuanquan", "icon-yuan", "icon-Italic"],
      iconColor: ["text-red", "text-blue"],
      curBtnList: ["问路", "问路"],
      iconColorList: [],
    };
  },

  components: {
    NumberCanvas,
  },

  watch: {
    "$store.state.gameDataV2.updataWenLu": {
      //在pages/games/index.vue里存
      handler: function (val) {
        this.initData();
      },
    },
  },

  created() {
    this.createColorList();
    this.initData();
  },

  methods: {
    createColorList() {
      let i = 0;
      while (i++ < 50) {
        this.iconColorList.push([
          Math.round(Math.random()),
          Math.round(Math.random()),
          Math.round(Math.random()),
        ]);
      }
    },
    changeSelect(e) {
      let index = e.target.value;
      this.selectIndex = index;
      this.site = this.selectList[index];

      this.nums = [];
      this.luName[0].nums = [];
      this.luName[1].nums = [];
      this.luName[2].nums = [];
      this.luName[3].nums = [];
      this.isActive_1 = false;
      this.isActive_0 = false;
      this.btnIndex = 0;
      // longhu: ['龙问路','虎问路'],
      // 			other:
      if (this.site === "龙虎斗") {
        this.curBtnList = ["龙问路", "虎问路"];
      } else {
        this.curBtnList = ["问路", "问路"];
      }

      this.initData();
    },
    async initData() {
      let routes = getCurrentPages();
      let { id } = routes[routes.length - 1].options;
      let flag = this.site === "龙虎斗";
      let idx = this.selectList.findIndex((item) => item === this.site);
      let site = flag
        ? this.buttonList_longhu[this.btnIndex].replace("vs", "-")
        : +idx + 1;

      let btnObj = {
        0: "haoma",
        1: "danshuang",
        2: "daxiao",
        3: "zongdanshuang",
        4: "zongdaxiao",
      };

      let obj = {
        url: this.$api.G_wenlu,
        isShowLoading: false,
        data: {
          lang: "zh",
          gameId: id,
          topSize: 100,
          site,
          type: flag ? "longhu" : btnObj[this.btnIndex],
        },
      };

      let { data } = await this.$http(obj);
      let d = data.reverse();
      this.unHandlerList = d;
      this.handlerData();
    },

    handlerData() {
      let flag = this.site === "龙虎斗";

      let arr;
      if (flag) {
        let isHe = true;
        while (isHe) {
          if (this.unHandlerList[0] === "和") {
            this.unHandlerList.shift();
          } else {
            isHe = false;
          }
        }
        arr = canvasDataHandler.handlerDataLonghu(this.unHandlerList);
      } else {
        arr = canvasDataHandler.handlerData(this.unHandlerList, 0);
      }
      this.nums = [];
      this.nums = arr;

      this.luName[0].nums = canvasDataHandler.handlerData_1(this.unHandlerList);
      if (this.btnIndex === 0 && !flag) {
        this.luName[1].nums = [];
        this.luName[2].nums = [];
        this.luName[3].nums = [];
      } else {
        this.luName[1].nums = [];
        this.luName[2].nums = [];
        this.luName[3].nums = [];
        this.luName[1].nums = canvasDataHandler.handlerData_2(arr);
        this.luName[2].nums = canvasDataHandler.handlerData_3(arr);
        this.luName[3].nums = canvasDataHandler.handlerData_4(arr);
      }
    },

    async activeBtn(item, id) {
      if (this.btnIndex === 0 && this.site !== "龙虎斗") {
        return;
      }
      let text = item.substring(0, 1);
      let t;
      if (text === "单") {
        t = "单";
      }
      if (text === "双") {
        t = "双";
      }
      if (text === "大") {
        t = "大";
      }
      if (text === "小") {
        t = "小";
      }
      if (text === "龙") {
        t = "龙";
      }
      if (text === "虎") {
        t = "虎";
      }
      if (id === 0) {
        this.isActive_0 ? (this.isActive_0 = false) : (this.isActive_0 = true);
        this.isActive_1 = false;
        while (true) {
          if (!this.isActive_0 || this.isHasNum1) {
            break;
          }
          if (this.isHasNum2) {
            this.unHandlerList.pop();
            this.handlerData();
            this.isHasNum2 = false;
          }
          await this.pushNum(t, id);
          if (this.isHasNum1) {
            await this.popNum(id);
          }
        }
      } else {
        this.isActive_1 ? (this.isActive_1 = false) : (this.isActive_1 = true);
        this.isActive_0 = false;
        while (true) {
          if (!this.isActive_1 || this.isHasNum2) {
            break;
          }
          if (this.isHasNum1) {
            this.unHandlerList.pop();
            this.handlerData();
            this.isHasNum1 = false;
          }

          await this.pushNum(t, id);
          if (this.isHasNum2) {
            await this.popNum(id);
          }
        }
      }
    },

    async textFn() {},

    pushNum(t, index) {
      return new Promise((resolve, reject) => {
        this.unHandlerList.push(t);
        this.handlerData();
        if (index === 0) {
          this.isHasNum1 = true;
        } else {
          this.isHasNum2 = true;
        }
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    },

    popNum(index) {
      return new Promise((resolve, reject) => {
        this.unHandlerList.pop();
        this.handlerData();
        if (index === 0) {
          this.isHasNum1 = false;
        } else {
          this.isHasNum2 = false;
        }
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    },

    selectBtn(ids) {
      this.nums = [];
      this.luName[0].nums = [];
      this.luName[1].nums = [];
      this.luName[2].nums = [];
      this.luName[3].nums = [];
      this.isActive_1 = false;
      this.isActive_0 = false;
      this.btnIndex = ids;
      if (this.btnIndex === 0) {
        this.curBtnList = ["问路", "问路"];
      } else {
        let btnList = [
          ["大问路", "小问路"],
          ["双问路", "单问路"],
        ];
        let idx = this.btnIndex % 2;
        this.curBtnList = btnList[idx];
      }
      this.initData();
    },
  },
};
</script>

<style lang="scss">
.uni-list-cell-db {
  border: 1px solid #ccc;
  box-sizing: border-box;
  flex: 0 0 150rpx;
  font-size: 20rpx;
  margin-right: 10rpx;
  .uni-input {
    padding: 0;
    text-align: center;
    height: 60rpx;
    font-size: 24rpx;
    line-height: 60rpx;
  }
}
</style>

<style lang="scss" scoped>
.wenlu {
  min-height: 400rpx;
  .title {
    display: flex;
    .select {
      padding: 10rpx;
      flex: 0 0 100rpx;
      font-size: 24rpx;
    }
    .title-btn-box {
      width: 100%;
      overflow: scroll;
      display: flex;
      .btna {
        word-break: keep-all;
        margin: 0 5rpx;
        padding: 10rpx 18rpx;
        font-size: 24rpx;
        border: 1px solid #ccc;
      }
    }
  }
  .lu-box {
    display: flex;
    min-height: 265rpx;
    // height:305rpx;
    .name {
      background-color: #2b2b2b;
      display: flex;
      text-align: center;
      align-items: center;
      flex: 0 0 65rpx;
      .dalu {
        color: #fff;
        font-size: 36rpx;
      }
    }
    .canvas-boxa {
      width: 100%;
      overflow: scroll;
    }
  }

  // .box {
  // 	border-top: 1px solid #ccc;
  // 	width: 100%;
  // 	overflow: hidden;
  // 	padding-right: 10rpx;
  // }

  .btn-box {
    padding: 0 20rpx;
    margin-top: 30rpx;
    .btn {
      background: #c8262c;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
      background-image: linear-gradient(to bottom, #c8262c, #6f0004);
      padding: 10rpx;
      border-radius: 15rpx;
      .left {
        text-align: center;
        font-size: 40rpx;
        color: #fff;
      }
      .right {
        display: flex;
        align-items: center;
        justify-content: center;
        .icon-box {
          width: 100%;
          height: 60rpx;
          border: 1px solid black;
          background-color: #000;
          border-radius: 20rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          .iconfont {
            font-size: 48rpx;
            font-weight: 600;
          }
        }
      }
    }
    .btn-right {
      background: #0656cb;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
      background-image: linear-gradient(to bottom, #0656cb, #202052);
    }

    .ac-btn-0 {
      background: #902b2f;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
      background-image: linear-gradient(to right, #bf575b, #902b2f);
    }
    .ac-btn-1 {
      // background: #902b2f;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
      background-image: linear-gradient(to right, #0656cb, #202052);
    }
  }
}
</style>
