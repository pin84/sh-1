<template>
  <div class="wenlu">
    <div class="title">
      <select class="select" v-model="site" @change="changeSelect">
        <option
          :value="selectItem"
          v-for="(selectItem, index) in selectList"
          :key="index"
        >
          {{ selectItem }}
        </option>
      </select>

      <div class="title-btn-box">
        <div
          @click="selectBtn(ids)"
          v-for="(btn, ids) in site === '龙虎斗'
            ? buttonList_longhu
            : buttonList"
          :key="ids"
          class="btna pointer"
          :class="{ 'bg-orange': btnIndex === ids }"
        >
          {{ btn }}
        </div>
      </div>
    </div>

    <div class="wrapper">
      <div class="btn-box">
        <div
          @click="activeBtn(lt, id)"
          class="btn pointer"
          :class="[
            { 'btn-right': id === 1 },
            { 'ac-btn-0': isActive_0 && id === 0 },
            { 'ac-btn-1': isActive_1 && id === 1 },
          ]"
          style="width: 48%"
          v-for="(lt, id) in curBtnList"
          :key="id"
        >
          <div class="left">{{ lt }}</div>
        </div>
      </div>
      <div class="btn-box icon-wrapper">
        <div class="randomicon-box" v-for="n in 2" :key="n">
          <i
            :style="{ color: randomColorList[Math.round(Math.random())] }"
            :class="name"
            class="iconfont"
            v-for="(name, idx) in iconArr"
            :key="idx"
          ></i>
        </div>
      </div>

      <div class="canvas-wrapper">
        <div class="lu-box">
          <div class="name"><span class="dalu">大路</span></div>
          <div class="canvas-boxa" v-if="nums.length !== 0">
            <NumberCanvas
              :btnIndex="btnIndex"
              :numList="nums"
              :gameType="site === '龙虎斗' ? 1 : 0"
              canvasId="abcd"
              v-if="isShowCanvas"
            />
          </div>
        </div>
        <div class="line"></div>
        <div class="lu-box">
          <div class="lu-box" v-for="(lu, idx) in luName" :key="idx">
            <div class="name">
              <span class="dalu">{{ lu.lu }}</span>
            </div>
            <div v-if="isShowCanvas" class="canvas-boxa">
              <NumberCanvas
                :drawPicType="lu.drawPicType"
                :btnIndex="btnIndex"
                :numList="lu.nums"
                :gameType="site === '龙虎斗' ? 1 : 0"
                :orderType="lu.orderType"
                :canvasId="'id-' + idx"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NumberCanvas from "./NumberCanvas";
import canvasDataHandler from "./canvasDataHandler";
export default {
  data() {
    return {
      isShowCanvas: false,
      unHandlerList: [], //暂时缓存后台请求回来的数据
      nums: [], //经过处理的数据 。传给canvas
      isShowDaluCanvas: false,
      width_1: 4400, //第一个canvas的宽度
      width_2: 750, //第一个canvas的宽度
      boundary: 5, //大小的分界
      site: "冠军",
      temList: [], //缓存 以下两个list
      buttonList: [],
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
      selectList: [],
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
      randomColorList: ["#c8262c", "#0656cb"],
      iconColor: ["text-red", "text-blue"],
      curBtnList: ["问路", "问路"],
      iconColorList: [],
    };
  },

  components: {
    NumberCanvas,
  },

  created() {
    this.initPage();
    this.initData();
  },
  mounted() {
    this.createColorList();
  },
  // watch: {
  //   "$store.state.gameDataV2.updataWenLu": {
  //     //在pages/games/index.vue里存
  //     handler: function (val) {
  //       this.initData();
  //     },
  //   },
  // },

  methods: {
    initPage() {
      let { id } = this.$store.state.gd.indexGame;
      id = Number(id)
      let ids = [56, 58, 55];
      let ids1 = [196];
      let buttonList = [],
        selectList = [],
        site = "";
      if (ids.includes(id)) {
        buttonList = [
          "号码",
          "单双",
          "大小",
          "总和单双",
          "总和大小",
          "总尾大小",
        ];
        selectList = ["特码", "正码一", "正码二", "正码三", "正码四", "龙虎斗"];
        site = "特码";
      } else if (ids1.includes(id)) {
        buttonList = ["号码", "单双", "大小", "总和单双", "总和大小"];
        selectList = ["特码", "正码一", "正码二", "正码三", "正码四", "龙虎斗"];
        site = "特码";
      } else {
        buttonList = ["名次", "单双", "大小"];
        selectList = [
          "冠军",
          "亚军",
          "第三名",
          "第四名",
          "第五名",
          "第六名",
          "第七名",
          "第八名",
          "第九名",
          "第十名",
          "龙虎斗",
        ];
        site = "冠军";
      }

      this.buttonList = buttonList
      this.selectList = selectList
      this.site = site

    },
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
    changeSelect() {
      this.nums = [];
      this.luName[0].nums = [];
      this.luName[1].nums = [];
      this.luName[2].nums = [];
      this.luName[3].nums = [];
      this.isActive_1 = false;
      this.isActive_0 = false;
      this.btnIndex = 0;
      // longhu: ['龙问路','虎问路'],
      if (this.site === "龙虎斗") {
        this.curBtnList = ["龙问路", "虎问路"];
      } else {
        this.curBtnList = ["问路", "问路"];
      }

      this.initData();
    },
    async initData() {
      this.isShowCanvas = false;
      let { id } = this.$store.state.gd.indexGame;
      let flag = this.site == "龙虎斗";
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
        5: "daxiao",
      };
      let obj = {
        lang: "zh",
        gameId: id,
        topSize: 100,
        site,
        type: flag ? "longhu" : btnObj[this.btnIndex],
      };
      
      let { data } = await this.$get(this.$gapi.G_wenlu, obj);
      
      let d = data.reverse();
      this.unHandlerList = d;
      this.handlerData();
      this.isShowCanvas = true;
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


      // this.luName[0].nums = canvasDataHandler.handlerData_1(this.unHandlerList);
      this.luName[0].nums = this.unHandlerList;
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

<style lang="scss" scoped>
.wenlu {
  height: 321px;
  overflow: hidden;
  .title {
    // height: 30px;
    display: flex;
    align-items: center;
    margin-bottom: 3px;
    .select {
      padding: 3px 10px;
      flex: 0 0 120px;
      font-size: 14px;
      outline: none;
    }
    .title-btn-box {
      width: 100%;
      display: flex;
      .btna {
        word-break: keep-all;
        margin: 0 5px;
        padding: 4px 15px;
        font-size: 12px;
        border: 1px solid #ccc;

        &.bg-orange {
          background-color: #cf271e;
          color: #fff;
        }
      }
    }
  }
  .wrapper {
    display: flex;
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    .canvas-wrapper {
      width: 100%;

      overflow: hidden;
      .line {
        height: 3px;
      }
      .lu-box {
        display: flex;
        // margin-bottom: 3px;
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        height: 144px;
        // border: 1px solid blue;
        .name {
          background-color: #2b2b2b;
          display: flex;
          text-align: center;
          align-items: center;
          flex: 0 0 30px;
          .dalu {
            color: #fff;
            font-size: 16px;
            line-height: 20px;
          }
        }
        .canvas-boxa {
          width: 100%;
          // border: 1px solid red;
          overflow-x: scroll;
          border: 1px solid #ccc;
        }
      }
    }

    .btn-box {
      flex: 0 0 45px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      // border: 1px solid red;
      .btn {
        background: #c8262c;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        background-image: linear-gradient(to bottom, #c8262c, #6f0004);
        padding: 10px 10px;
        height: 124px;
        border-radius: 5px;
        text-align: center;
        writing-mode: vertical-rl;
        letter-spacing: 10px;
        .left {
          font-size: 18px;
          color: #fff;
        }
        .right {
          display: flex;
          align-items: center;
          justify-content: center;
          .icon-box {
            width: 100%;
            height: 60px;
            border: 1px solid black;
            background-color: #000;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            .iconfont {
              font-size: 48px;
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

    .icon-wrapper {
      flex: 0 0 30px;
      .randomicon-box {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        i {
          font-size: 24px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
