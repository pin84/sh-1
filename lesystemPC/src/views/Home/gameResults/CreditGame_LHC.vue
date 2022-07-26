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
            <BallNumListCreditLHC2
              :title1="gameInfo.t1_1"
              :title2="gameInfo.t2_1"
              :resultList="resultList2"
            />
          </div>

          <!-- <div style="display: flex">
            <MyList
              v-for="(item, i) in gameInfo.t4"
              :key="i"
              :list="t4List[i]"
              :title="item"
            />
          </div> -->
        </div>

        <div class="result-box" v-else>
          <BallNumListCredit
            :title1="gameInfo.t1"
            :title2="gameInfo.t2"
            :resultList="resultList"
          />
          <BallNumListCreditLHC3
            :title1="gameInfo.t4"
            :title2="gameInfo.t4_1"
            :resultList="resultList3"
          />
          <div  >
            <BallNumListCreditLHC3
              :title1="gameInfo.t5"
              :title2="gameInfo.t5_1"
              :resultList="resultList4"
            />
          </div>
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
import BallNumListCredit from "./common/BallNumListCreditLHC";
import BallNumListCreditLHC2 from "./common/BallNumListCreditLHC_2";
import BallNumListCreditLHC3 from "./common/BallNumListCreditLHC_3";
import BallNumListCreditFFCLh from "./common/BallNumListCreditFFCLh";
import ids from "@/views/games/assets/ids.js";
import gameTitle from "./gameTitle";
import MyList from "./List";
import TitleSwitch from "@/views/Home/gameResults/common/TitleSwitch.vue";
import List14 from "@/views/Home/gameResults/common/List1_4.vue";
import common from "@/views/games/gameList/1/common.js";

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
    BallNumListCreditLHC2,
    BallNumListCreditLHC3,
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
      // console.log(list);

      this.totalPage = total;
      let seriesList = [];
      let result = [];
      let resultList2 = [];
      let resultList3 = [];
      let resultList4 = [];

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

      let dataObj = common.shengXiaoClassify();
      let tem3 = [[], [], []];
      let tem4 = [[], [], []];
      list.forEach((item, idx) => {
        let { number, time } = item;
        seriesList.push({ number, time });

        let resultArr = item.result.split(",");
        let tem = [];
        resultArr.forEach((n) => {
          for (let [key, value] of Object.entries(dataObj)) {
            let index = value.findIndex((item) => item.num == n);
            if (index != -1) {
              tem.push({
                type: key,
                n,
                bc: value[index].bc,
              });
              break;
            }
          }
        });
        result.push(tem);

        resultList2.push([
          item.tds,
          item.tdx,
          item.thds,
          item.thdx,
          item.thhwdx,
          item.tjq,
          item.tbd,
        ]);

        tem3[0].push(item["zh"]);
        tem3[1].push(item["zds"]);
        tem3[2].push(item["zdx"]);

        resultList3.push([item.shangxia, item.jiou]);

        resultList4.push([
          item.lh1_2,
          item.lh1_3,
          item.lh1_4,
          item.lh1_5,
          item.lh1_6,
          item.lh1_7,
          item.lh2_3,
          item.lh2_4,
          item.lh2_5,
          item.lh2_6,
          item.lh2_7,
          item.lh3_4,
          item.lh3_5,
          item.lh3_6,
          item.lh3_7,
          item.lh4_5,
          item.lh4_6,
          item.lh4_7,
          item.lh5_6,
          item.lh5_7,
          item.lh6_7,
        ]);
      });

      this.seriesList = seriesList;
      this.resultList = result;

      this.resultList2 = resultList2;
      this.resultList3 = resultList3;
      
      this.resultList4 = resultList4;

      // console.log(resultList2);
      this.t3List = tem3;
      this.t4List = tem4;

      this.allArr1 = allArr;

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
  .no-data {
    padding: 50px;
    text-align: center;
  }
  .main-body {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .main-c {
      // display: flex;
      width: 100%;
      overflow: scroll;
      // .series-box {
      //   flex: 0 0 350px;
      // }
      // .result-box {
        // flex: 0 0 2400px;
        // border:1px solid blue;
      // }
    }
  }
  .page {
    display: flex;
    justify-content: center;
  }
}
</style>
