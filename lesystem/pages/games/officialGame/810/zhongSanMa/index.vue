<template>
  <!-- A a1  b  c d  e f  f1 g  h  j  K  L   m n  P  -->
  <view>
    <Fushi v-if="curGame === 'A'" @buy810="$emit('buy810')" />
    <FushiCustom v-if="curGame === 'E'" @buy810="$emit('buy810')" />
    <!-- 同上一个复式，只是选择的时候需要进行组合后才加入到号码蓝 -->
    <FushiCustomC v-if="curGame === 'E1'" @buy810="$emit('buy810')" />
    <Danshi v-if="curGame === 'B'" @buy810="$emit('buy810')" />
    <ZhuHe v-if="curGame === 'C'" @buy810="$emit('buy810')" />
    <ZhuHePistionArr v-if="curGame === 'P'" @buy810="$emit('buy810')" />
    <ZhuXuan120 v-if="curGame === 'D'" @buy810="$emit('buy810')" />
    <ZhuXuan120Random v-if="curGame === 'G'" @buy810="$emit('buy810')" />
    <DanshiRandom v-if="curGame === 'F'" @buy810="$emit('buy810')" />
    <DanshiRandom1 v-if="curGame === 'F1'" @buy810="$emit('buy810')" />
    <ZhuXuan60 v-if="curGame === 'H'" @buy810="$emit('buy810')" />
    <LongHu v-if="curGame === 'J'" @buy810="$emit('buy810')" />
    <NiuNiu v-if="curGame === 'K'" @buy810="$emit('buy810')" />
    <Baijiale v-if="curGame === 'L'" @buy810="$emit('buy810')" />
    <WxZhuHe v-if="curGame === 'M'" @buy810="$emit('buy810')" />
    <ZhuXuan60NoR v-if="curGame === 'N'" @buy810="$emit('buy810')" />
    <PDingWeiDan v-if="curGame === 'A1'" @buy810="$emit('buy810')" />

    <MyRecord>
      <Record :isShowLoadMore="false" :isShowMore="false" :isLimitLine="true" />
    </MyRecord>
  </view>
</template>

<script>
import playList from "./playList.js";
import Record from "@/pages/gamesIm/common/record/index.vue";
import MyRecord from "@/pages/gamesIm/common/record/MyRecord.vue";
import PDingWeiDan from "./PDingWeiDan";
import Danshi from "./Danshi";
import ZhuHe from "./ZhuHe";
import ZhuHePistionArr from "./ZhuHePistionArr";
import ZhuXuan120 from "./ZhuXuan120";
import ZhuXuan120Random from "./ZhuXuan120Random";
import Fushi from "./Fushi";
import FushiCustom from "./FushiCustom";
import FushiCustomC from "./FushiCustomC";
import DanshiRandom from "./DanshiRandom";
import DanshiRandom1 from "./DanshiRandom1";
import ZhuXuan60 from "./ZhuXuan60";
import LongHu from "./LongHu";
import NiuNiu from "./NiuNiu";
import Baijiale from "./Baijiale";
import WxZhuHe from "./WxZhuHe";
import ZhuXuan60NoR from "./ZhuXuan60NoR";

export default {
  data() {
    return {
      curGame: "",
    };
  },

  components: {
    Record,
    MyRecord,
    Danshi,
    ZhuHe,
    ZhuHePistionArr,
    ZhuXuan120,
    ZhuXuan120Random,
    Fushi,
    FushiCustom,
    FushiCustomC,
    DanshiRandom,
    DanshiRandom1,
    ZhuXuan60,
    LongHu,
    NiuNiu,
    Baijiale,
    WxZhuHe,
    ZhuXuan60NoR,
    PDingWeiDan,
  },

  watch: {
    "$store.state.gameData.curGame": {
      handler: function (val) {
        
        this.curGame = "";
        this.$store.commit("setNumBasket", []);
        this.initPage();
      },
      deep: true,
    },
  },

  created() {
    this.initPage();
  },

  methods: {
    initPage() {
      let { N } = this.$store.state.gameData.curGame;
      let n = N;

      let gameConfig = playList[n];

      if (!gameConfig) {
        this.curGame = "";
        return;
      }
      let { playType } = gameConfig;

      setTimeout(() => {
        this.curGame = playType;
      }, 100);
    },
  },
};
</script>

<style></style>
