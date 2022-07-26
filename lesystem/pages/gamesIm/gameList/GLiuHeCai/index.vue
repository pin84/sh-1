<template>
  <view class="liuhecai">
    <TopType v-show="isShowType" />
      <!-- 特码 -->
    <G1 v-if="playType == 1" />
    <!-- 色波 -->
    <G2 v-if="playType == 3" />
    <!-- 两面 -->
    <GLiangmian v-if="playType == 2" />
    <GTeXiao v-if="playType == 4" />
    <!-- 正特 -->
    <GZhengTe v-if="playType == 6" />
      <!-- 正码1--6 -->
    <G6 v-if="playType == 7" />
    <!-- 连码-->
    <G7 v-if="playType == 8" />
    <!-- 一肖 -->
    <G8 v-if="playType == 9" />
    <!-- 尾数 -->
    <G9 v-if="playType == 10" />
    <!-- 合肖 -->
    <G10 v-if="playType == 11" />
    <!-- 自选不中 -->
    <G11 v-if="playType == 12" />
    <!-- 连肖 -->
    <G12 v-if="playType == 13" />
    <!-- 连尾 -->
    <G13 v-if="playType == 14" />
    <!-- 龙虎斗 -->
    <GLongHuDou v-if="playType == 15" />




  </view>
</template>

<script>
import G1 from "./G1";
import G2 from "./G2";
import G3 from "./G3";
import G5 from "./G5";
import G6 from "./G6";
import G7 from "./G7";
import G8 from "./G8";
import G9 from "./G9";
import G10 from "./G10";
import G11 from "./G11";
import G12 from "./G12";
import G13 from "./G13";
import GLongHuDou from "./GLongHuDou";
import GLiangmian from "./GLiangmian";
import GTeXiao from "./GTeXiao";
import GZhengTe from "./GZhengTe";
import TopType from "./TopType";
export default {
  data() {
    return {
      isShowType: false,
      isShowBasket: false,
      isShowRecord: false,
      gameConfig: {},
      playType: "",
      titleArr: [],
      isSelectedName: 0,
    };
  },
  components: {
    TopType,
    G1,
    G2,
    G3,
    G5,
    G6,
    G7,
    G8,
    G9,
    G10,
    G11,
    G12,
    G13,
    GLongHuDou,
    GLiangmian,
    GTeXiao,
    GZhengTe,
  },

  watch: {
    "$store.state.GDV3.v3CurGame": {
      handler: function (val) {
        this.initData(val);
      },
    },

    "$store.state.GDV3.v3ShowRecord": function (val) {
      this.isShowRecord = val;
    },
    "$store.state.GDV3.v3IsShowNumBaket": function (val) {
      this.isShowBasket = val;
      if (val) {
        this.isShowType = false;
      }
    },
    "$store.state.GDV3.showCombinationType": function (val) {
      this.isShowType = !this.isShowType;
    },
  },

  created() {
    this.initData();
  },
  methods: {
    initData(val) {
      this.isShowType = false;
      this.$store.commit("v3NumBasket", "clearAll");
      this.playType = "";
      if (!val) {
        val = this.$store.state.GDV3.v3CurGame;
      }

      let { Id } = val;
      if (!Id) return;
      setTimeout(() => {
        if (Id == 5 ) {
          Id = 1;
        }

        this.playType = Id;
      }, 100);


      let obj = val.C[0].C[0];
      this.$store.commit("v3RatioInitValue", obj);
    },

    selectedName(n) {
      this.isSelectedName = n;
    },

    //切换  我要投注 或 投注记录页面
    changeTal(index) {
      this.TabCur = index;
      index == 0 ? (this.isShowRecord = false) : (this.isShowRecord = true);
    },
  },
};
</script>


<style lang="scss" scoped>

</style>
