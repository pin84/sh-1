<template>
  <view class="official flex">
    <view class="main-body flex-sub">
      <view v-show="!isShowRecord">
        <view v-show="isShowBasket">
          <ZhongSanMa v-on="$listeners" />
        </view>
        <view v-if="!isShowBasket"
          ><NumberBasket @showNumber="showBasket"
        /></view>
      </view>
      <view v-if="isShowRecord"><Record /></view>
    </view>

    <view class="foot">
      <Ratio v-show="isShowBasket" />
      <Footer
        :isShowBasket="isShowBasket"
        @showBasket="showBasket"
        @showRecord="changeTal(1)"
      />
    </view>
  </view>
</template>

<script>
import Ratio from "@/pages/games/officialGame/common/Ratio.vue";
import Footer from "@/pages/games/officialGame/common/Footer.vue";
import NumberBasket from '@/pages/games/officialGame/common/NumberBasket.vue'
import Record from '@/pages/gamesIm/common/record/index.vue'
import ZhongSanMa from '@/pages/games/officialGame/810/zhongSanMa'
export default {
  data() {
    return {
      TabCur: 0,
      isShowBasket: true,
      isShowRecord: false,
    };
  },

  components: {
    Ratio,
    Footer,
    Record,
    NumberBasket,
    ZhongSanMa,
  },
  watch: {
    "$store.state.GDV3.v3ShowRecord": function (val) {
      this.isShowRecord = val;
    },
  },


  methods: {

    showBasket() {
      //显示号码蓝，foot触发的事件
      this.isShowBasket = !this.isShowBasket;
      this.$store.commit("v3IsShowNumBaket", !this.isShowBasket);
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
.official {
  position: relative;
  height: 100%;
  overflow: hidden;

  // border: 1px solid red;
  flex-direction: column;
  .but-title {
    position: relative;
    .set-box {
      position: absolute;
      right: 0;
      z-index: 99999;
    }
  }
  .play-type-box {
    position: absolute;
    z-index: 2;
    top: 44px;
    width: 100%;
  }
  .c-box {
    padding: 20rpx 20rpx;
  }
  .main-body {
    position: relative;
    overflow: scroll;
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
  .stopped-salling {
    overflow: hidden;
  }

  .drawer-box {
    border: 10px solid red;
  }
  .uni-navbar__header-btns {
    border: 1px solid red;
    width: 0;
  }
}
</style>
