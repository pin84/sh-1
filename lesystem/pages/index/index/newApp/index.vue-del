<template>
  <view id="home-page">
    <view v-if="initPageDone" class="top-box">
      <Swiper />
      <NoticeBar />
      <MerberInfo />
    </view>
    <view class="game-overview-box">
      <GameOverview />
    </view>
  </view>
</template>

<script>
import Swiper from "./homePages/Swiper";
import NoticeBar from "./homePages/NoticeBar.vue";
import MerberInfo from "./homePages/MerberInfo.vue";
import GameOverview from "./homePages/GameOverview.vue";
export default {
  data() {
    return {
      initPageDone:false,
      userinfo: {},
    };
  },

  components: {
    Swiper,
    NoticeBar,
    MerberInfo,
    GameOverview,
  },

  created() {
    this.initData();
  },

  methods: {
    async initData() {
      this.initPageDone = false
      let d = {
        url: "System.Member.memberInfo",
      };

      let res = await this.$http(d);
      
      if (res.code == 0) {
        this.$store.commit('yb_userinfo',res.data)
        
      } else {
        this.$util.showConfirm({
          content: res.message,
          showCancel: false,
        });
      }
       this.initPageDone = true
    },
  },
};
</script>

<style lang="scss" scoped>
#home-page {
  height: 85vh;
  display: flex;
  flex-direction: column;
  .top-box {
    flex: 0 0 480rpx;
  }
  .game-overview-box {
    height: 100%;
    overflow: hidden;
  }
}
</style>