<template>
  <div class="game-result-k3">
    <Top
      @refreshData="initData"
      @searchWithPeriod="searchWithPeriod"
      :gameList="gameList"
      :isDataDone="isDataDone"
    />

    <div class="no-data" v-if="!isDataDone">正在获取数据中　。。。</div>
    <div class="main-body" v-else-if="!noData">
      <div class="main-c">
        <div class="series-box">
          <SeriesCredit :seriesList="seriesList" />
        </div>
        <div class="result-box">
          <BallNumListCredit :gameInfo="gameInfo" :resultList="resultList" />
          <MyList
            v-for="(item, i) in gameInfo.t3"
            :key="i"
            :list="list1[i]"
            :title="item"
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
    <div class="no-data" v-else>没有数据</div>
  </div>
</template>

<script>
import Top from "./TopCredit";
import SeriesCredit from "./SeriesCredit";
import BallNumListCredit from "@/views/Home/gameResults/common/BallNumListCreditK3.vue";
import ids from "@/views/games/assets/ids.js";
import gameTitle from "./gameTitle";
import MyList from "./List";
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
      seriesList: [],
      gameInfo: {},
      resultList: [],
      list1: [],
      isDataDone: false,
      noData: false,
    };
  },
  components: {
    Top,
    SeriesCredit,
    BallNumListCredit,
    MyList,
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
      this.initData();
    },
    searchWithPeriod(startDate, endDate, period) {
      this.startDate = startDate;
      this.endDate = endDate;
      this.curPeriod = period;
      this.initData();
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
      console.log("---", total);

      if (!total || total == 0) {
        this.isDataDone = true;
        this.noData = true;
        return;
      }
      this.totalPage = total;
      // list.length = 10;

      

      let seriesList = [];
      let result = [];

      let list1 = [[], [], []];

      list.forEach((item, idx) => {
        let { number, time } = item;
        seriesList.push({ number, time });

        let resultArr = item.result.split(",");
        result.push(resultArr);

        list1[0].push(item["zh"]);
        list1[1].push(item["zdx"]);
        list1[2].push(item["zds"]);
      });

      this.seriesList = seriesList;
      this.resultList = result;
      this.list1 = list1;

      this.isDataDone = true;
      this.noData = false;
    },
  },
};
</script>

<style lang='scss'>
.game-result-k3 {
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  .no-data {
    padding: 50px;
    text-align: center;
  }
  .main-body {
    width: 100%;
    .main-c {
      display: flex;
      // border: 1px solid red;
      // justify-content: space-around;
      .series-box {
        flex: 0 0 350px;
      }
      .result-box {
        display: flex;
        width: 100%;
        // border: 1px solid red;
      }
    }
  }
  .page {
    display: flex;
    justify-content: center;
  }
}
</style>
