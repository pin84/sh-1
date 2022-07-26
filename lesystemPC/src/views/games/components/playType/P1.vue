<template>
  <div class="play-type selectnone">
    <ul class="list-top">
          <!-- v-show="item.N != '合肖'" -->
      <div class="list-box">
        <li
          @click="selectGame(item)"
          class="item1 pointer"
          :class="{ active: selectedGameId == item.Id }"
          v-for="(item, index) in games"
          :key="index"
        >
          {{ item.N }}
        </li>
      </div>

      <div v-if="isShowSwitch" class="switch-box">
        <span>信</span>
        <el-switch
          @change="changeGameType"
          v-model="switchValue"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
        <span>官</span>
      </div>
    </ul>

    <ul v-if="playList.length !== 0" class="list2">
      <li class="item2" v-for="(item, index) in playList" :key="index">
        <span class="item2-name">{{ item.N }}：</span>
        <span
          @click="selectPlay(play)"
          class="item2-play pointer"
          :class="{ active: selectedPlayId == play.I }"
          v-for="(play, idx) in playList2[index]"
          :key="idx"
          >{{ play.N }}</span
        >
      </li>
    </ul>
  </div>
</template>
<script>
import oddsHandler from "./oddsHandler";
import allids from '@/views/games/assets/ids.js'
export default {
  data() {
    return {
      games: [],
      selectedGameId: null,
      playList: [],
      selectedPlayId: null,
      playList2: [],
      switchValue: true,
      curId: null,
      isShowSwitch: false,
    };
  },

  created() {
    this.initData();
    this.initPage();
  },

  methods: {
    initPage() {
      let { id } = this.$route.query;
      let hiddenSwitchlist = [118, 119, 116, 121, 5, 13, 6, 1, 2, 595,44,30];
      if (hiddenSwitchlist.includes(Number(id))) {
        this.isShowSwitch = false;
      } else {
        this.isShowSwitch = true;
      }
    },
    changeGameType() {
      let { gameOtherGroupTypeId, gameName } =
        this.$store.state.gd.indexGameData;

      let obj = {
        id: gameOtherGroupTypeId,
        showName: gameName,
      };

      if (gameOtherGroupTypeId == 0) {
        alert("gameOtherGroupTypeId不能为 0");
        return;
      }

      this.$router.push({ path: `/games?id=${gameOtherGroupTypeId}` });
      location.reload();

      // localStorage.setItem("indexGame", JSON.stringify(obj));
      // this.$store.commit("indexGame", obj);
    },

    resetData() {
      let ts = new Date().getTime();
      this.$store.commit("footMoney", {});
      this.$store.commit("moneyDeviation", 0);
      this.$store.commit("codeRank", {});

      // this.$store.commit("clearSelect", ts);
    },
    selectGame(item) {
      //给Tips用，保存当前的玩法大类
      this.$store.commit("curPlayType", item);

      this.resetData();
      let { Id } = item;
      this.selectedGameId = Id;

      // let oneLineIds = [79,105,259,58,118,5,368];

      if (!this.switchValue) {
        this.$store.commit("curGame", item);
        localStorage.setItem("test-curGame", JSON.stringify(item));
        //注掉的保留，
        let oddsObj = item.C[0].C[0];

        // if (this.curId == 79) {
        //   oddsObj = item.C[0].C[0]
        // } else {
        //   oddsObj = item.C[0]
        // }
        this.$store.commit("odds", oddsObj);
        this.$store.commit("isDoneCurGame", this.curId);

        return;
      }

      //2
      let playList = [];
      playList = item.c;
      if (Id === 3182) {
        item.c.forEach((obj) => {
          obj.I = obj.C[0].I;
        });
        playList = [{ N: "龙虎", C: item.c }];
      }
      if (Id === 3374) {
        item.c.forEach((obj) => {
          obj.I = obj.C[0].I;
        });
        playList = [{ N: "牛牛", C: item.c }];
      }
      if (Id === 3376) {
        item.c.forEach((obj) => {
          obj.I = obj.C[0].I;
        });
        playList = [{ N: "百家乐", C: item.c }];
      }
      if (Id === 1767) {
        // item.c.forEach((obj) => {
        //   obj.I = obj.C[0].I;
        // });
        playList = [{ N: "和值", C: item.c }];
      }

      this.playList = playList;

      //3

      let arr = [];
      this.playList.forEach((outItem) => {
        let tem = [];
        outItem.C.forEach((item) => {
          tem.push(item);
        });
        arr.push(tem);
      });

      if (Id === 1767) {
        arr = [[{ N: "和值", I: 1767, C: this.playList }]];
      }

      this.playList2 = arr;

      this.selectPlay(this.playList2[0][0]);
    },

    selectPlay(play) {

      this.resetData();
      let { I } = play;
      this.selectedPlayId = I;
      // let c = this.$store.state.gd.curGame;
      this.$store.commit("odds", oddsHandler(play));
      this.$store.commit("curGame",play);
      localStorage.setItem("test-curGame", JSON.stringify(play));
      this.$store.commit("isDoneCurGame", this.curId);
    },

    async initData() {
      this.$store.commit("isDoneCurGame", 0);
      let { id } = this.$route.query;
      let { gameType } = this.$store.state.gd.indexGameData;

      this.curId = id;

      let url;
      if (gameType == 0) {
        url = this.$gapi.getCreditNavListJson;
        this.switchValue = false;
      } else {
        url = this.$gapi.getOfficialNavListJson;
        this.switchValue = true;
      }
      console.log("--url-", url);
      let res = await this.$get(url, { id });
      let { data } = res;
      if (data.length == 0) {
        this.$gutils.confirm({
          text: "玩法列表没有返回",
        });
        return;
      }
      console.log("--playType--", res);
      this.$store.commit("curPlayList", data);

      // let arr = this.dataHandler(data);
      //118合并在一起
      let ids = [118, 119, 116, 121];
      if (ids.includes(Number(id))) {
        data = [data[0]];
      }
      
      
      if(allids['1'].includes(Number(id))){
        data = data.slice(1)
      }

      console.log(data);
      this.games = data;

      let obj = data.find((item) => item.isDefault == 1) || data[0];

      this.selectGame(obj);
    },

    dataHandler(data) {
      let arr = [];
      arr = data;

      // if (this.curId == 79) {
      //   let ids = [737, 261];
      //   let temArr = [];
      //   let obj = {
      //     Id: 53,
      //     N: "整合",
      //     P: 0,
      //     c: [],
      //   };
      //   data.forEach((item) => {
      //     if (ids.includes(item.Id)) {
      //       temArr.push(item);
      //     } else {
      //       obj.c.push(item);
      //     }
      //   });

      //   temArr.unshift(obj);
      //   arr = temArr;
      // }

      return arr;
    },
  },
};
</script>
<style lang="scss" scoped>
.play-type {
  border-bottom: 1px solid #ccc;
  .list-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #e2e0dd;
    // height: ;
    .list-box {
      display: flex;
      .item1 {
        padding: 0 8px;
        height: 45px;
        line-height: 45px;
        font-size: 14px;
        &.active {
          background-color: #dc1404;
          color: #fff;
        }
      }
    }

    .switch-box {
      margin-right: 30px;
      display: flex;
      align-items: center;
      font-size: 12px;
      span {
        padding: 0 5px;
      }
    }
  }

  .list2 {
    display: flex;
    flex-direction: column;
    height: 82px;
    .item2 {
      display: flex;
      align-items: center;
      font-size: 14px;
      .item2-name {
        padding: 10px 10px;
        margin-right: 20px;
      }
      .item2-play {
        margin: 0 10px;
        border-bottom: 3px solid transparent;
        &.active {
          color: #dc1404;
          border-bottom: 3px solid #dc1404;
        }
      }
    }
  }
}
</style>