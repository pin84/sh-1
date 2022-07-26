<template>
  <div class="game-result-credit">
    <Top
      @refreshData="initData"
      @searchWithPeriod="searchWithPeriod"
      :gameList="gameList"
      :isDataDone="isDataDone"
    />

    <div class="no-data" v-if="!isDataDone">正在获取数据中　。。。</div>
    <div class="main-body" v-else>
      <TitleSwitch @selectType="selectType" />
      <div class="main-c">
        <div class="series-box">
          <SeriesCredit :seriesList="seriesList" />
        </div>
        <div v-if="curType == 0" class="result-box">
          <BallNumListCredit :gameInfo="gameInfo" :resultList="resultList" />
          <MyList
            v-for="(item, i) in t3"
            :key="i"
            :list="item.d"
            :title="item.name"
          />
        </div>

        <div class="result-box" v-if="curType == 1">
          <List14
            v-for="(title, m) in gameInfo.t4"
            :key="m"
            :title="title"
            :titleArr="gameInfo.t4_1"
            :dList="allArr1[m]"
          />
        </div>
        <div class="result-box" v-if="curType == 1">
          <List14
            v-for="(title, i) in gameInfo.t5"
            :key="i"
            :title="title"
            :titleArr="gameInfo.t5_1"
            :dList="allArr2[i]"
          />
        </div>
      </div>
      <div class="page" v-if="totalPage > 20">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          layout="prev, pager, next"
          :total="totalPage"
          :page-size="20"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "./TopCredit";
import SeriesCredit from "./SeriesCredit";
import BallNumListCredit from "./BallNumListCredit";
import ids from "@/views/games/assets/ids.js";
import gameTitle from "./gameTitle";
import MyList from "./List";
import TitleSwitch from "@/views/Home/gameResults/common/TitleSwitch.vue";
import List14 from "@/views/Home/gameResults/common/List1_4.vue";

export default {
  props: {
    gameList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      totalPage: 20,
      currentPage: 1,
      curPeriod: "",
      curType: 0,
      seriesList: [],
      gameInfo: {},
      resultList: [],
      t3: [],
      allArr1: [],
      allArr2: [],
      isDataDone: false,
    };
  },
  components: {
    Top,
    SeriesCredit,
    BallNumListCredit,
    MyList,
    TitleSwitch,
    List14,
  },

  created() {
    let token = localStorage.getItem("token");
    if (token == undefined || token == "" || token == null) {
      this.$router.push({ path: "/user/login" });
      return;
    }

    this.initData();
  },
  methods: {
    handleCurrentChange() {
      console.log(this.currentPage);
      this.initData();
    },
    searchWithPeriod(startDate, endDate, period) {
      this.startDate = startDate;
      this.endDate = endDate;
      this.curPeriod = period;
      this.initData();
    },
    selectType(idx) {
      this.curType = idx;
    },

    async initData() {
      this.isDataDone = false;
      let { id } = this.$route.query;

      let curKey;
      for (let [key, value] of Object.entries(ids)) {
        if (value.includes(Number(id))) {
          curKey = key;
          break;
        }
      }
      this.gameInfo = gameTitle[curKey];

      let d = {
        gameId: id,
        pageIndex: this.currentPage, //当前请求页码
        pageSize: 20, //请求每页条数
        startDate: this.startDate,
        endDate: this.endDate,
        period: this.curPeriod,
      };

      

      let res = await this.$get(this.$gapi.getLotteryResultList, d);
      
      let { list, total } = res.data;
      this.totalPage = total;
      // list.length = 10;
      let seriesList = [];
      let result = [];

      let tem3 = [[], [], []];

      let list1 = [];
      let allArr = [];

      for (let i = 0; i < 10; i++) {
        allArr[i] = [];
        for (let j = 0; j < 3; j++) {
          allArr[i].push([]);
        }
      }

      list.forEach((item, idx) => {
        let { number, time } = item;
        seriesList.push({ number, time });

        let resultArr = item.result.split(",");
        result.push(resultArr);

        tem3[0].push(item["gyhz"]);
        tem3[1].push(item["gyhzdx"]);
        tem3[2].push(item["gyhzds"]);

        resultArr.forEach((n, index) => {
          if (list1[index]) {
            list1[index].push(n);
          } else {
            list1.push([n]);
          }
        });

        allArr[0][0].push(item.ball1ds);
        allArr[0][1].push(item.ball1dx);
        allArr[0][2].push(item.ball1lh);

        allArr[1][0].push(item.ball2ds);
        allArr[1][1].push(item.ball2dx);
        allArr[1][2].push(item.ball2lh);

        allArr[2][0].push(item.ball3ds);
        allArr[2][1].push(item.ball3dx);
        allArr[2][2].push(item.ball3lh);

        allArr[3][0].push(item.ball4ds);
        allArr[3][1].push(item.ball4dx);
        allArr[3][2].push(item.ball4lh);

        allArr[4][0].push(item.ball5ds);
        allArr[4][1].push(item.ball5dx);
        allArr[4][2].push(item.ball5lh);

        allArr[5][0].push(item.ball6ds);
        allArr[5][1].push(item.ball6dx);
        // tem6lh.push(item.ball6lh);

        allArr[6][0].push(item.ball7ds);
        allArr[6][1].push(item.ball7dx);
        // tem7lh.push(item.ball7lh);

        allArr[7][0].push(item.ball8ds);
        allArr[7][1].push(item.ball8dx);
        // tem8lh.push(item.ball8lh);

        allArr[8][0].push(item.ball9ds);
        allArr[8][1].push(item.ball9dx);
        // tem9lh.push(item.ball9lh);

        allArr[9][0].push(item.ball10ds);
        allArr[9][1].push(item.ball10dx);
        // tem10lh.push(item.ball10lh);
      });

      this.seriesList = seriesList;
      this.resultList = result;

      let t3 = this.gameInfo.t3;
      t3.forEach((item, idx) => {
        item.d = tem3[idx];
      });
      this.t3 = t3;

      list1.forEach((arr, idx) => {
        allArr[idx].unshift(arr);
      });

      this.allArr1 = allArr.slice(0, 5);

      let temArr = [];
      allArr.slice(5).forEach((arr) => {
        temArr.push(arr.filter((a) => a.length));
      });
      this.allArr2 = temArr;

      this.isDataDone = true;
    },
  },
};
</script>

<style lang='scss'>
.game-result-credit {
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  // overflow-x: scroll;
  .no-data {
    padding: 50px;
    text-align: center;
  }
  .main-body {
    // border: 1px solid red;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-x: scroll;

    .main-c {
      display: flex;
      .series-box {
        flex: 0 0 350px;
      }
      .result-box {
        display: flex;
      }
    }
  }
  .page {
    display: flex;
    justify-content: center;
  }
}
</style>
