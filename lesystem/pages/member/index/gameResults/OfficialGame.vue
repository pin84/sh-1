<template>
  <div class="game-result">
    <Top
      @changeShowType="changeShowType"
      :gameList="gameList"
      @changeSeries="changeSeries"
    />

    <div class="no-data" v-if="!isDataDone">正在获取数据中　。。。</div>

    <div v-else class="main-body">
      <div class="series-box">
        <Series
          :isShowRedLine="showArr.includes(5)"
          :isShowSum="showArr.includes(4)"
          :list="seriesList"
        />
      </div>
      <div class="canvas-wrapper">
        <div
          class="canvas-item-box"
          v-for="(header, index) in listHeader[0]"
          :key="index"
        >
          <div class="top">
            <div class="title">{{ header }}</div>
            <NumberList :list="listHeader[1]" />
          </div>
          <MyCanvas
            @mcacData="mcacDataHandler($event, header)"
            :numList="numArr[index]"
            :mcacList="mcacList[index]"
            :canvasId="'cid-' + index"
            :drawType="header == '号码分布' ? 2 : 1"
            :drawType2Num="drawType2Num"
            :startNum="startNum"
            :listHeader="listHeader[1]"
            :showArr="showArr"
          />

          <SumList v-if="showArr.includes(4)" :list="allSumData[index]" />
          <div class="top">
            <NumberList :list="listHeader[1]" />
            <div class="title">{{ header }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "./TopOfficial";
import Series from "./Series";
import MyCanvas from "./MyCanvas";
import NumberList from "./NumberList";
import TitleList from "./TitleList";
import SumList from "./SumList";
export default {
  props: {
    gameList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isDataDone: false,
      seriesList: [],
      numList: [], // 开奖号码
      listHeader: [], //头部信息
      seriesNum: 30,
      startNum: 0, // 确定canvas 开始的坐标

      //以下为处理后的数据
      numArr: [],
      mcacList: [],
      drawType2Num: [],

      averageValueList: [],
      maxValueList: [],
      list1: [], //出现总次数
      list2: [], //最大连出
      list3: [], //号码分布出现总次数
      list4: [], //号码分布最大连出

      allSumData: [], //所有的统计数据

      showArr: [0, 1, 2, 3, 4, 5], //显示的类开会在这个数组里
    };
  },
  components: {
    Top,
    Series,
    MyCanvas,
    NumberList,
    TitleList,
    SumList,
  },

  created() {
    let token = localStorage.getItem("token");
    if (token == undefined || token == "" || token == null) {
      uni.reLaunch({
        url: "/user/login",
      });
      return;
    }

    this.initData();
  },
  methods: {
    changeShowType(arr) {
      this.showArr = arr;
    },
    mcacDataHandler(d, type) {
      let averageValueList = [];
      let maxValueList = [];

      // console.log(d, type);

      d.forEach((arr) => {
        let len = arr.length;
        let sum = arr.reduce((accumulator, currentValue) => {
          return accumulator + Number(currentValue);
        }, 0);

        let averageValue = sum / len;
        let maxValue = Math.max(...arr);
        averageValueList.push(Math.ceil(averageValue));
        maxValueList.push(maxValue);
      });

      this.maxValueList.push(maxValueList);
      this.averageValueList.push(averageValueList);
    },
    async initData() {
      this.maxValueList = [];
      this.averageValueList = [];
      this.isDataDone = false;
      let routes = getCurrentPages();
      let { id } = routes[routes.length - 1].options;

      let d = {
        gameId: id,
        pageIndex: 1, //当前请求页码
        pageSize: this.seriesNum, //请求每页条数
      };

      // let p0 = this.$get(this.$gapi.getSimpleCpGameList);
      let p1 = this.$get(this.$gapi.getLotteryResultList, d);

      let pa = await Promise.all([p1]).catch((err) => {});



      let list2 = pa[0].data;
      let len = list2.list.length - 1;

      list2.list.forEach((item) => {
        if (!Array.isArray(item.result)) {
          item.result = item.result.split(",");
        }
      });

      this.seriesList = list2.list;
      let p3 = await this.$get(this.$gapi.getCodeRank, {
        gameId: id,
        periodId: list2.list[len].id,
      });

      let { listHeader } = p3.data;
      this.listHeader = listHeader;
      let startNum = Math.min(...listHeader[1]);
      this.startNum = startNum;

      await this.dataHandler(pa[0].data.list, p3.data.list);
      this.isDataDone = true;

      setTimeout(() => {
        this.numList = pa[0].data.list;
        this.combinationArr();
      }, 1000);
    },

    combinationArr() {
      let allSumData = [];

      this.averageValueList.forEach((arr) => {
        allSumData.push([arr]);
      });

      this.list1.forEach((arr, index) => {
        if (allSumData[index]) {
          allSumData[index].unshift(arr);
        }
      });

      this.maxValueList.forEach((arr, index) => {
        if (allSumData[index]) {
          allSumData[index].push(arr);
        }
      });

      this.list2.forEach((arr, index) => {
        if (allSumData[index]) {
          allSumData[index].push(arr);
        }
      });

      this.allSumData = allSumData;

      // this.allSumData.push([])

      let len = this.allSumData.length - 1;

      this.allSumData[len].unshift(this.list3);
      this.allSumData[len].push(this.list4);
    },

    dataHandler(d2, d3) {
      this.mcacList = d3;
      //d2: 开奖号码数据
      let numArr = [];
      let drawType2Num = [];
      d2.forEach((obj, idx) => {
        drawType2Num.push(obj.result);
        obj.result.forEach((num, index) => {
          if (idx == 0) {
            numArr.push([num]);
          } else {
            numArr[index].push(num);
          }
        });
      });
      this.numArr = numArr;
      this.drawType2Num = drawType2Num;

      //统计号码分布的出现总次数和最大连出
      let list3 = []; //号码分布总次数
      let list4 = []; //号码分布最大连出
      this.listHeader[1].forEach((n) => {
        let i = 0;
        let j = 0;
        let temArr = [];
        drawType2Num.forEach((arr) => {
          let len = arr.filter((item) => Number(item) == n).length;
          i += len;
          if (len !== 0) {
            j++;
            temArr.push(Number(JSON.stringify(j)));
          } else {
            j = 0;
          }
        });

        list3.push(i);
        let max;
        if (temArr.length == 0) {
          max = 0;
        } else {
          max = Math.max(...temArr);
        }
        list4.push(max);
      });

      this.list3 = list3;
      this.list4 = list4;

      let list1 = []; //出现总次数
      let list2 = []; //最大连出
      numArr.forEach((arr) => {
        let tem = [];
        let tem2 = [];

        for (let n of this.listHeader[1]) {
          let len = arr.filter((item) => Number(item) == n).length;
          tem.push(len);

          //最大连出
          let i = 0;
          let temArr = [];
          arr.forEach((num) => {
            if (Number(num) == n) {
              i++;
              temArr.push(Number(JSON.stringify(i)));
            } else {
              i = 0;
            }
          });
          let max;
          if (temArr.length == 0) {
            max = 0;
          } else {
            max = Math.max(...temArr);
          }
          tem2.push(max);
        }

        list1.push(tem);
        list2.push(tem2);
      });

      this.list1 = list1;
      this.list2 = list2;

      return true;
    },

    changeSeries(seriesNum) {
      this.seriesNum = seriesNum;
      this.initData();
    },
  },
};
</script>

<style lang='scss'>
.game-result {
  // border: 1px solid red;
  height: 100%;
  box-sizing: border-box;
  .no-data {
    padding: 50px;
    text-align: center;
  }
  .sum {
    width: 100%;
    height: 84px;
    // border: 1px solid red;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .sum-item {
      border-bottom: 1px solid #ddd;
    }
  }
  .main-body {
    display: flex;
    width: 100%;
    overflow-x: scroll;
    .series-box {
      flex: 0 0 275px;
    }
    .canvas-wrapper {
      width: 100%;
      height: 100%;
      border-left: 1px solid #ddd;
      box-sizing: border-box;
      display: flex;
      // border: 1px solid red;
      .canvas-item-box {
        border-right: 1px solid red;
        box-sizing: border-box;

        .top {
          height: 36px;
          overflow: hidden;
        }
        .title {
          border-bottom: 1px solid #ddd;
          text-align: center;
          background-color: #efefef;
          font-size: 12px;
          height: 20px;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>
