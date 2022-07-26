<template>
  <view class="gameResults">
    <view class="status_bar"></view>

    <view class="top flex align-center bg-white border-bottom">
      <view class="bg-gray padding-sm margin-sm inputbox">
        <view class="border form-input">
          <input
            type="text"
            @click="showInfoList"
            @blur="hideInfoList"
            v-model="selectedGame.gameName"
            placeholder-class="text-gray text-sub"
            placeholder="选择彩种信息"
            class="text-df"
          />
          <i class="iconfont icon-icon-test4 text-grey"></i>
        </view>

        <scroll-view
          scroll-y
          class="info-list bg-white border"
          v-show="listShow"
        >
          <view class="cu-list menu">
            <view
              class="cu-item"
              v-for="(item, index) in gameList"
              :key="index"
              @tap="changeGame(item)"
              :class="selectedGame.id == item.id ? 'text-red cur' : ''"
            >
              {{ item.gameName }}
            </view>
          </view>
        </scroll-view>
      </view>
    </view>

    <scroll-view
      scroll-x
      class="bg-gray nav border-bottom"
      scroll-with-animation
      :scroll-left="scrollLeft"
      v-if="tabList.length != 0"
    >
      <view
        class="cu-item title"
        :class="{ active: curTab == index }"
        v-for="(tab, index) in tabList"
        :key="index"
        @tap="tabSelect"
        :data-id="index"
      >
        {{ tab }}
      </view>
    </scroll-view>

    <view v-if="total" class="c-b">
      <ResultList v-if="curTab == 0 && idDoneData" :list="resultList" />

      <MyCanvas
        v-if="idDoneData && curTab != 0"
        @mcList="mcList"
        :seriesList="seriesList"
        :numList="numArr[curListIndex]"
        :mcacList="mcacList[curListIndex]"
        :canvasId="'cid-' + 0"
        :drawType2Num="drawType2Num"
        :startNum="startNum"
        :listHeader="listHeader[1]"
        :sumData="sumData"
        :showType="showType"
      />

      <view class="btn-more">
        <view class="btn" @click="showMore">加载更多</view>
      </view>
    </view>

    <view class="no-data" v-else> 暂无数据 </view>

    <module
      :showModal="modalShow"
      @hideModal="modalShow = false"
      @settingChangeNotice="settingChangeNotice"
    ></module>
  </view>
</template>

<script>
import MyCanvas from "./MyCanvas";
import ResultList from "./ResultList";
// import ids from "@/pages/gamesIm/ids.js";
import module from "./common/modal.vue";

export default {
  data() {
    return {
      total: 0, //数据总数
      showType: {
        zx: 1,
        yl: 1,
        tj: 1,
        ylfc: 1,
      },
      curId: 259,
      curGameIndex: 0,
      idDoneData: false,
      listHeader: [],
      curTab: 0,
      curPageIndex: 1,
      seriesNum: 30,
      selectedGame: {},
      gameList: [],
      info: "",
      listShow: false,
      scrollLeft: 0,
      tabList: [],
      modalShow: false,

      resultList: [],
      sumData: [],
      curListIndex: 0, //
      seriesList: [],
      numArr: [],
      drawType2Num: [],
      mcacList: [],
      startNum: 0,
      showArr: [0, 1, 2, 3, 4, 5], //显示的类开会在这个数组里
      textArr: ["出现次数", "平均遗漏", "最大遗漏", "最大连出"],
    };
  },
  components: {
    module,
    MyCanvas,
    ResultList,
  },
  // onNavigationBarButtonTap(e) {
  //   if (e.index == 1) {
  //     // this.modalShow = true;
  //     uni.redirectTo({
  //       url: this.goback,
  //     });
  //   }
  // },
  onLoad(option) {
    let { goback } = option;
    if (goback) {
      this.goback = goback;
    }
  },

  onShow() {
    this.initData();
  },

  methods: {
    settingChangeNotice(obj) {
      this.showType = obj;
    },
    showMore() {
      this.curPageIndex++;
      this.initData();
    },
    mcList(arr) {
      let averageList = [];
      let maxList = [];

      arr.forEach((arr1) => {
        let len = arr1.length;
        let sum = arr1.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        });
        let max = Math.max(...arr1);
        averageList.push(Math.round(sum / len));
        maxList.push(max);
      });

      let sumData = [
        this.list1[this.curListIndex] || this.list3,
        averageList,
        maxList,
        this.list2[this.curListIndex] || this.list4,
      ];
      this.sumData = sumData;
    },

    changeGame(obj) {
      let { id } = obj;
      this.selectedGame = obj;

      uni.navigateTo({
        url: `/pages/member/index/gameResults/index?id=${id}`,
      });
    },

    async initData() {
      this.idDoneData = false;
      uni.showLoading({
        title: "加载中",
      });
      //获取游戏列表
      let p1 = await this.$http({
        url: this.$api.getSimpleCpGameList,
        isShowLoading: false,
      });
      let p1data = p1.data;

     
      if (!this.noLogin(p1.code)){
         uni.hideLoading();
         return;
      } 
      //获取初始的id，如果没有，就从列表中取第一个
      let routes = getCurrentPages();
      let { id, TabCur } = routes[routes.length - 1].options;
      if (!id) {
        id = p1data[0].id;
      }
      id = Number(id);
      this.curId = id;
      //整理游戏列表数据。
      let curObj = p1data.find((item) => item.id == id);
      let list1 = [];
      let naemArr = Array.from(new Set(p1data.map((item) => item.gameName)));
      naemArr.forEach((name) => {
        let arr = p1data.filter((item) => item.gameName == name);
        if (arr.length == 1) {
          list1.push(arr[0]);
        } else {
          let obj = arr.find((item) => item.groupId == 0);
          list1.push(obj);
        }
      });
      this.gameList = list1;
      this.selectedGame = curObj;

      //请求初始的数据
      // let d = {
      //   url: this.$api.getIndexData,
      //   data: {
      //     id: id,
      //   },
      // };
      // let p0 = await this.$http(d);
      // this.noLogin(p0.code);

      let d2 = {
        url: this.$api.getLotteryResultList,
        data: {
          gameId: id,
          pageIndex: this.curPageIndex, //当前请求页码
          pageSize:this.seriesNum, //请求每页条数
        },
        isShowLoading: false,
      };
      let p2 = await this.$http(d2);


      let { list, total } = p2.data;
      this.total = total;
      if (total == 0 || !total) {
        uni.hideLoading();
        return
      };

      let len = list.length - 1;
      let p3 = await this.$http({
        url: this.$api.ResultGetCodeRank,
        data: {
          gameId: id,
          periodId: list[len].id,
        },
        isShowLoading: false,
      })

      if(!p3){
         this.total = 0
        return 
      }

      let { listHeader } = p3.data;
      this.listHeader = listHeader;
      if(p3.data.list.length == 0 || listHeader.length ==0 ){
          this.total = 0
         uni.hideLoading();
        return 
      }

      let hl = [];
      if (listHeader.length != 0) {
        hl = listHeader[0];
        hl.unshift("开奖");
      }
      this.tabList = hl;

      p2.data.list.forEach((obj, idx) => {
        if (!Array.isArray(obj.result)) {
          obj.result = obj.result.split(",");
        }
      });
      await this.dataHandler(p2.data.list, p3.data.list);
      await this.resultListHandler(p2.data.list);

      if (!TabCur) {
        TabCur = 0;
      }
      let e = {
        currentTarget: {
          dataset: {
            id: TabCur,
          },
        },
      };
      this.tabSelect(e);
      this.idDoneData = true;
      uni.hideLoading();
    },

    noLogin(code) {
      if (code == -9999) {
        uni.reLaunch({
          url: "/pages/login/login/login",
        });
        return;
      }
      return true;
    },

    async resultListHandler(list) {
      let resultList;
      resultList = list;

      let idList1 = [259, 150, 162, 151, 15, 368, 801];
      let idList2 = [40, 57, 26];
      let idList3 = [118, 119, 116, 121];
      let idList4 = [1, 2, 595];

      if (idList1.includes(this.curId)) {
        resultList = await this.dataHandler2(list);
      }

      if (idList2.includes(this.curId)) {
        resultList = await this.dataHandler3(list);
      }
      if (idList3.includes(this.curId)) {
        resultList = await this.dataHandler4(list);
      }
      if (idList4.includes(this.curId)) {
        resultList = await this.dataHandler5(list);
      }
      this.resultList = resultList;
    },

    dataHandler5(list) {
      list.forEach((item) => {
        item["resutl1"] = [];
        item["resutl1"].push(
          item.zm1sx,
          item.zm2sx,
          item.zm3sx,
          item.zm4sx,
          item.zm5sx,
          item.zm6sx,
          item.zm7sx
        );
      });

      return list;
    },
    dataHandler2(list) {
      list.forEach((item) => {
        item["resutl1"] = [];
        item["resutl1"].push(
          item.gyhz,
          item.gyhzds,
          item.gyhzdx,
          item.ball1lh,
          item.ball2lh,
          item.ball3lh,
          item.ball4lh,
          item.ball5lh
        );
      });

      return list;
    },
    dataHandler3(list) {
      list.forEach((item) => {
        item["resutl1"] = [];
        item["resutl1"].push(item.zh, item.zds, item.zdx);
      });

      return list;
    },
    dataHandler4(list) {
      list.forEach((item) => {
        let sum = item.result.reduce((accumulator, currentValue) => {
          return accumulator + Number(currentValue);
        }, 0);
        item.result.push(sum);
      });

      return list;
    },

    dataHandler(d2, d3) {
      let mcacList = [];
      d3.forEach((arr) => {
        let tem = [];
        arr.forEach((obj) => {
          tem.push(obj.MC);
        });
        mcacList.push(tem);
      });

      this.mcacList = mcacList;

      //d2: 开奖号码数据
      let numArr = [];
      let drawType2Num = [];
      let seriesList = [];
      let allNum = [];
      d2.forEach((obj, idx) => {
        drawType2Num.push(obj.result);
        allNum.push(...obj.result);
        obj.result.forEach((num, index) => {
          if (idx == 0) {
            numArr.push([num]);
          } else {
            numArr[index].push(num);
          }
        });
        seriesList.push(obj.number.slice(4) + "期");
      });
      this.drawType2Num = drawType2Num;
      this.numArr = numArr;

      seriesList.unshift("期数");

      this.textArr.forEach((str) => {
        seriesList.push(str);
      });
      this.seriesList = seriesList;

      // 后面的代码都需要要头部列表，有些游戏是没有的，所以返回
      if (this.tabList == 0) {
        return true;
      }

      //百位十位的统计
      this.hd2(numArr);
      //分布的统计
      let list3 = []; //出现次数
      let list4 = []; //最大连出
      let temAll = [];
      this.listHeader[1].forEach((n) => {
        let i = 0;
        let j = 0;
        let tem = [];
        for (let arr of drawType2Num) {
          let index = arr.findIndex((num) => num == n);
          let len = arr.filter((num) => num == n).length;
          i += len;
          if (index != -1) {
            j++;
          } else {
            tem.push(j);
            j = 0;
          }
        }
        list3.push(i);
        temAll.push(tem);
      });

      temAll.forEach((arr) => {
        let maxValue = drawType2Num.length;
        if (arr.length != 0) {
          maxValue = Math.max(...arr);
        }
        list4.push(maxValue);
      });

      this.list3 = list3;
      this.list4 = list4;

      return true;
    },

    hd2(numArr) {
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
    },

    showInfoList() {
      this.listShow = !this.listShow;
    },

    hideInfoList() {
      setTimeout(() => {
        this.listShow = false;
      }, 200);
    },

    // tab 切换
    tabSelect(e) {
      this.sumData = [];
      let id;
      if (!e) {
        let routes = getCurrentPages();
        let { tabId } = routes[routes.length - 1].options;
        if (!tabId) {
          tabId = 0;
        }
        id = tabId;
      } else {
        id = e.currentTarget.dataset.id;
      }

      id = Number(id);
      this.curTab = id;
      if (id == 0) return;
      this.curListIndex = id - 1;
    },
  },
};
</script>

<style lang='scss' scoped>
.gameResults {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 95px);
  overflow: hidden;
  .top {
    // flex: 0 0 50px;
    // overflow: hidden;
    .inputbox {
      width: 100%;
      border-radius: 4px;
      position: relative;
    }
  }

  .status_bar {
    flex: 0 0 var(--status-bar-height);
    width: 100%;
  }
  .nav {
    flex: 0 0 30px;
    .active {
      border-bottom: 6rpx solid #db1c36;
      color: red;
    }
  }

  .c-b {
    height: 100%;
    overflow-y: scroll;
    .btn-more {
      padding: 20rpx;
      .btn {
        background-color: #ef9a13;
        color: #fff;
        text-align: center;
        font-size: 30rpx;
        padding: 20rpx 0;
        border-radius: 15rpx;
      }
    }
  }
  .no-data {
    padding: 30rpx;
    text-align: center;
  }

  .info-list {
    height: 300px;
    border: 1px solid #eeeeee;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 99;
  }

  .uni-input-input {
    border: 1px solid #dddddd;
    height: 30px;
    line-height: 30px;
  }

  .form-input .iconfont {
    font-size: 24px;
    position: absolute;
    right: 6px;
    top: 0;
  }

  .border-bottom {
    border-bottom: 1px solid #ddd;
  }
}
</style>
