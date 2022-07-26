<template>
  <view class="g-79">
    <view class="body_79">
      <view v-if="!isShowRecord">
        <view v-if="isShowBasket">
          <Rank />
          <view v-if="curId == 1"><P1 /></view>
          <view v-if="curId == 7"><LongHuDou /></view>
          <view v-if="curId == 8"><QuanWuZhongYi /></view>
          <view v-if="isShowWenLu"><Wenlu /></view>
        </view>

        <view v-show="!isShowBasket"
          ><Basket @hiddenBasket="hiddenBasket" :isShowNumForm="isShowNumForm"
        /></view>
      </view>

      <view class="record" v-if="isShowRecord"><Record /></view>
    </view>
    <view class="footer">
      <Ratio v-show="isShowBasket" class="margin-top-sm" />

      <Footer
        @buyDone="buyDone"
        @submitSelect="submitSelect"
        @showNumForm="showNumForm"
        :isShowBasket="isShowBasket"
      />
    </view>
  </view>
</template>

<script>
import Rank from "@/pages/gamesIm/common/rank/Rank.vue";
import P1 from "@/pages/games/otherGame/common/P1";
import LongHuDou from "@/pages/games/otherGame/common/LongHuDou";
import Ratio from "@/pages/games/otherGame/common/Ratio.vue";
import Footer from "@/pages/games/otherGame/common/Footer";
import Wenlu from "@/pages/games/otherGame/common/Wenlu";
import Basket from "@/pages/games/otherGame/common/Basket";
import QuanWuZhongYi from "@/pages/games/otherGame/common/QuanWuZhongYi";
import Record from "@/pages/gamesIm/common/record"

export default {
  data() {
    return {
      isShowRecord: false,
      isShowWenLu: true,
      isEnabled: 0,
      curId: "",
      isShowBasket: true,
      isShowNumForm: true, //切换号码蓝号码列表的显示方式,
    };
  },
  watch: {
    "$store.state.GDV3.v3ShowRecord": function (val) {
      
      this.isShowRecord = val;
    },

    "$store.state.gameData.curPlayList": {
      handler: function (val) {
        this.$store.commit("setNumBasket", []);
        this.curId = val.Id;
        this.hiddenBasket();
      },
      deep: true,
    },
  },
  components: {
    Rank,
    P1,
    LongHuDou,
    QuanWuZhongYi,
    Ratio,
    Footer,
    Wenlu,
    Basket,
    Record,
  },

  mounted() {
    this.initData();
  },

  methods: {
    buyDone() {
      this.isShowBasket = true;
      this.isShowNumForm = true;
    },
    initData() {
      this.curId = "";
      setTimeout(() => {
        let { N, C, Id } = uni.getStorageSync("curPlayList");
        this.curId = Id;
        if(!C)return
        let obj = C[0].C[0];
        this.$store.commit("v3RatioInitValue", obj);
      }, 100);
    },
    showNumForm(flag) {
      this.isShowNumForm = flag;
    },
    submitSelect() {
      this.isShowBasket = false;
    },
    hiddenBasket() {
      this.isShowBasket = true;
      this.isShowNumForm = true;
      if (this.curId == 8) {
        this.isShowWenLu = false;
      } else {
        this.isShowWenLu = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.g-79 {
  position: relative;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .body_79 {
    height: 100%;
    overflow: scroll;
    .record {
      height: 100%;
      overflow: scroll;
    }
  }

  .foot {
    // flex: 0 0 300rpx;
    background-color: #fff;
    bottom: 0;
    // padding-bottom: 0;
    // padding-bottom: constant(safe-area-inset-bottom);
    // padding-bottom: env(safe-area-inset-bottom);
    position: fixed;
    left: var(--window-left);
    right: var(--window-right);
    // display: -webkit-box;
    // display: -webkit-flex;
    display: flex;
    flex-direction: column;
    z-index: 998;
    // box-sizing: border-box;
  }
}
</style>
