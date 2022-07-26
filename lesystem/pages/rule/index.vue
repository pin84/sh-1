<template>
  <view class="rule-wrapper">
    <view class="status_bar">
      <!-- 这里是状态栏 -->
    </view>
    <view class="content" v-html="htmlStr">
    </view>
  </view>
</template>    

<script>
export default {
  data(){
    return {
      htmlStr:''
    }
  },
  created() {
    this.initData();
  },

  methods: {
    async initData() {
      let routes = getCurrentPages()
      let { id } = routes[routes.length - 1].options
      let d = {
        url: this.$api.getGameRuleContent,
        data: {
          gameId: id,
        },
      };
      let res = await this.$http(d);
      console.log(res);
      this.htmlStr = res.data.game_rules;
    },
  },
};
</script>
<style lang="scss" scoped>
.rule-wrapper {
  background-color: #fff;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .status_bar {
    flex: 0 0 var(--status-bar-height);
    width: 100%;
    // border: 1px solid red;
  }
  .content {
    height: 100%;
    overflow: scroll;
    // border: 1px solid red;
  }
}
</style>