<template>
  <div class="result-box">
    <div v-if="gameType == 1">
      <OfficialGame :gameList="gameList" />
    </div>
    <div v-if="gameType == 2">
      <CreditGame :gameList="gameList" v-if="curId == 259" />
      <CreditGameK3 :gameList="gameList" v-if="curId == 105" />
      <CreditGameFFC :gameList="gameList" v-if="curId == 79" />
      <CreditGamePCDD :gameList="gameList" v-if="curId == 118" />
      <CreditGame115 :gameList="gameList" v-if="curId == 58" />
      <CreditGameLHC :gameList="gameList" v-if="curId == 1" />
      <CreditGameK10 :gameList="gameList" v-if="curId == 5" />
    </div>
    <!-- <div class="no-data" v-if="gameType == 3">
      没有数据
    </div> -->
  </div>
</template>
<script>
import OfficialGame from "./OfficialGame";
import CreditGame from "./CreditGame";
import ids from "@/views/games/assets/ids.js";

export default {
  data() {
    return {
      gameType: null,
      gameList: [],
      curId: 0,
      totalPage: 20,
      currentPage: 1,
    };
  },
  components: {
    OfficialGame,
    CreditGame,
    CreditGameK3: () => import("./CreditGame_K3"),
    CreditGameFFC: () => import("./CreditGame_FFC"),
    CreditGame115: () => import("./CreditGame_11_5"),
    CreditGamePCDD: () => import("./CreditGamePCDD"),
    CreditGameLHC: () => import("./CreditGame_LHC"),
    CreditGameK10: () => import("./CreditGame_K10"),
  },

  created() {
    this.initData();
  },

  methods: {
 
    async initData() {
      let { id } = this.$route.query;
      id = Number(id);

      let p0 = this.$get(this.$gapi.getSimpleCpGameList);
      let p1 = this.$get(this.$gapi.getIndexData, { id });

      let pa = await Promise.all([p0, p1]).catch((err) => {
        console.log("Promise.all() 错误。");
      });

      let { code, data } = pa[1];

      if (code == -9999) {
        this.$router.push({ path: "/user/login" });
        return;
      }
      let { gameType } = data;
      if (gameType == 1) {
        this.gameType = 1;
      } else {
        this.gameType = 2;
      }

      for (let [key, value] of Object.entries(ids)) {
        if (value.includes(id)) {
          if (key == 10) {
            key = 79;
          }
          this.curId = key;
          break;
        }
      }

      // console.log(this.curId);
      

      let list1 = pa[0].data;
      list1.forEach((item) => {
        if (item.groupId == 1) {
          item.gameName = item.gameName + "[官]";
        } else {
          item.gameName = item.gameName + "[信]";
        }
      });
      this.gameList = list1;
    },
  },
};
</script>
<style lang="scss" scoped>
.result-box {
  // border: 1px solid red;
  // width: 100%;
  overflow: hidden;
  .no-data{
    text-align: center;
    padding: 50px;
  }

}
</style>