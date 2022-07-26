<template>
  <div class="tip-wrapper padding-20">
    <div class="tips">
      <div>
        <span>{{ N1 }}：</span>
        <span>{{ N }}</span>
      </div>

      <ul class="check-box" v-if="isShowCheckBox">
        <li
          @click="changeState(index)"
          class="itema"
          v-for="(item, index) in listArr"
          :key="index"
        >
          <i class="iconfont icon-duoxuanyidong" v-if="index == curIndex"></i>
          <i class="iconfont icon-duoxuan" v-else></i>
          <span class="text">{{ item.name }}</span>
        </li>
      </ul>
      <div class="pop-box">
        <Pop :rule="rule" :example="example" />
        <span>{{ description }}</span>
      </div>
    </div>

    <div style="padding: 10px 0">
      提示：{{ gameName }}单玩法最高派奖300000元，单期最高派奖500000元。
    </div>
  </div>
</template>

<script>
import Pop from "./Pop";
// import gameInfo from "./106";
import idsObj from '@/views/games/assets/ids.js'

export default {
  data() {
    return {
      gameName: "",
      curIndex: null,
      listArr: [
        { name: "冷热", isChecked: false },
        { name: "遗漏", isChecked: false },
      ],
      N1: "",
      N: "",
      rule: "",
      example: "",
      description: "",
      isShowCheckBox: false,
      showCheckBoxList: [
        1415,
        1297,
        1306,
        1298,
        1320,
        1313,
        2531,
        2530,
        1333,
        1335,
        2650,
        1307,
        1327,
        1345,
        1386,
        1387,
        1388,1389,1390,1391,1392,1393,1394,1395,1407,1415
      ],

      // idsObj: {
      //   810: [810, 64, 61, 137, 142, 67, 135, 44, 40, 57, 26],
      //   32: [32, 46, 50],
      //   // 40:[40,57,26],
      //   260: [260, 152, 153, 154, 29, 369, 802],
      //   106: [106, 8400, 146, 97, 148, 100, 111],
      //   28: [28],
      //   30: [30],
      // },
    };
  },

  components: {
    Pop,
  },

  watch: {
    "$store.state.gd.curGame": {
      handler: function (val) {
        this.initData(val);
      },
      deep: true,
    },
    "$store.state.gd.curPlayType": {
      handler: function (val) {
        let { N } = val;
        this.N1 = N;
      },
      deep: true,
    },
  },

  created() {
    let val = this.$store.state.gd.curGame;
    this.initData(val);

    // let playList = this.$store.state.gd.curPlayList;
    // this.N1 = playList.N;
  },

  methods: {
    changeState(idx) {
      if (idx == this.curIndex) {
        this.curIndex = null;
        this.$store.commit("codeRank", {});
        return;
      }

      this.curIndex = idx;
      this.listArr[idx].isChecked = !this.listArr[idx].isChecked;
      this.$store.commit("codeRank", { ts: new Date().getTime(), idx });
    },
    async initData(val) {
      this.curIndex = null;
      if (JSON.stringify(val) == "{}") return;
      let { N, I } = val;
      this.N = N;
      this.isShowCheckBox = this.showCheckBoxList.includes(I);
      let { id } = this.$route.query;

      for (let [key, value] of Object.entries(idsObj)) {
        if (value.includes(Number(id))) {
          id = key;
          break;
        }
      }

      if(id == 40){
        id = 810
      }

      let gameInfo = await import(`./${id}`).catch((err) => {
      });

      if (!gameInfo) return;
      let info = gameInfo.default[I];
      if (!info) return;
      let { example, rule, description } = info;
      this.description = description;
      this.example = example;
      this.rule = rule;

      let { gameName } = this.$store.state.gd.indexGameData;
      this.gameName = gameName;
    },
  },
};
</script>

<style lang="scss" scoped>
.tip-wrapper {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  user-select: none;
  font-size: 14px;
  .tips {
    display: flex;
    align-items: center;
    .check-box {
      display: flex;
      align-items: center;
      margin-left: 60px;

      .itema {
        margin-left: 10px;
        .iconfont {
          font-weight: 600;
          margin-right: 2px;
        }
        .icon-duoxuanyidong {
          color: #b62929;
        }
      }
    }
    .pop-box {
      display: flex;
      align-items: center;
      margin-left: 20px;
    }
  }
}
</style>