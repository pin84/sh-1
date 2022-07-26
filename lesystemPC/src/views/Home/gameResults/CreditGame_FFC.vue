<template>
  <div class="game-result-credit">
    <Top
      @refreshData="initData"
      @searchWithPeriod="searchWithPeriod"
      :gameList="gameList"
      :isDataDone="isDataDone"
    />

    <div class="no-data" v-if="!isDataDone">正在获取数据中　。。。</div>
    <div class="no-data" v-else-if="noData">没有数据</div>
    <div class="main-body" v-else>
      <TitleSwitch :titleList="titleList" @selectType="selectType" />
      <div class="main-c">
        <div class="series-box">
          <SeriesCredit :seriesList="seriesList" />
        </div>
        <div class="result-box" v-if="curType == 0">
          <BallNumListCredit
            :title1="gameInfo.t1"
            :title2="gameInfo.t2"
            :resultList="resultList"
          />
          <MyList
            v-for="(item, i) in t3"
            :key="i"
            :list="t3List[i]"
            :title="item"
          />
          <div style="display: flex">
            <List14
              v-for="(title, m) in gameInfo.t2"
              :key="m"
              :title="title"
              :titleArr="gameInfo.t2_1"
              :dList="allArr1[m]"
            />
          </div>

          <div style="display: flex">
            <MyList
              v-for="(item, i) in gameInfo.t4"
              :key="i"
              :list="t4List[i]"
              :title="item"
            />
          </div>
        </div>

        <div class="result-box" v-else>
          <BallNumListCredit
            :title1="gameInfo.t1"
            :title2="gameInfo.t5"
            :resultList="resultList"
          />
          <BallNumListCreditFFCLh
            :title1="gameInfo.t6"
            :title2="gameInfo.t6_1"
            :resultList="resultList2"
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
import BallNumListCredit from "./common/BallNumListCreditFFC";
import BallNumListCreditFFCLh from "./common/BallNumListCreditFFCLh";
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
      noData: true,
      totalPage: 20,
      currentPage: 1,
      curPeriod: "",
      curType: 0,
      seriesList: [],
      gameInfo: {},
      resultList: [],
      resultList2: [],
      t3: [],
      t3List: [],
      t4List: [],
      allArr1: [],
      allArr2: [],
      isDataDone: false,
      titleList: ["排名", "大小单双龙虎"],
    };
  },
  components: {
    Top,
    SeriesCredit,
    BallNumListCredit,
    BallNumListCreditFFCLh,
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

      this.titleList = this.gameInfo.t0;
      this.t3 = this.gameInfo.t3;

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


      if (!list.length) {
        this.isDataDone = true;
        this.noData = true
        return;
      }
      this.noData = false
      console.log(list);
      this.totalPage = total;
      let seriesList = [];
      let result = [];
      let resultList2 = [];

      let allArr = [];
      for (let i = 0; i < 5; i++) {
        allArr[i] = [];
        for (let j = 0; j < 2; j++) {
          allArr[i].push([]);
        }
      }
      let allArr2 = [];
      for (let i = 0; i < 10; i++) {
        allArr2[i] = [];
        for (let j = 0; j < 2; j++) {
          allArr2[i].push([]);
        }
      }

      let tem3 = [[], [], []];
      let tem4 = [[], [], []];
      list.forEach((item, idx) => {
        let { number, time } = item;
        seriesList.push({ number, time });

        let resultArr = item.result.split(",");
        result.push(resultArr);

        resultList2.push([
          item.lh1v2,
          item.lh1v3,
          item.lh1v4,
          item.lh1v5,
          item.lh2v3,
          item.lh2v4,
          item.lh2v5,
          item.lh3v4,
          item.lh3v5,
          item.lh4v5,
        ]);

        tem3[0].push(item["zh"]);
        tem3[1].push(item["zds"]);
        tem3[2].push(item["zdx"]);

        tem4[0].push(item["qian3"]);
        tem4[1].push(item["zhong3"]);
        tem4[2].push(item["hou3"]);

        allArr[0][0].push(item.ball1dx);
        allArr[0][1].push(item.ball1ds);

        allArr[1][0].push(item.ball2dx);
        allArr[1][1].push(item.ball2ds);

        allArr[2][0].push(item.ball3dx);
        allArr[2][1].push(item.ball3ds);

        allArr[3][0].push(item.ball4dx);
        allArr[3][1].push(item.ball4ds);

        allArr[4][0].push(item.ball5dx);
        allArr[4][1].push(item.ball5ds);

        allArr2[0][0].push(item.lh1v2);
      });

      this.seriesList = seriesList;
      this.resultList = result;
      this.resultList2 = resultList2;
      this.t3List = tem3;
      this.t4List = tem4;

      this.allArr1 = allArr;

      console.log(allArr);

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
      // .result-box {
      //   display: flex;
      // }
    }
  }
  .page {
    display: flex;
    justify-content: center;
  }
}
</style>
