<template>
  <view class="setting">
    <block v-for="(text, index) in textList" :key="index">
      <view @click="toDetail(text,index)" class="text-box text-lg">{{ text }}</view>
    </block>
  </view>
</template>

<script>
export default {
  props: {
    textList: {
      type: Array,
      default: () => ["走势图", "近期开奖","玩法说明"],
    },
  },
  // "玩法说明", "官方网址"

  methods: {
    toDetail(text,index) {
      let routes = getCurrentPages()
  //console.log(routes[routes.length - 1].__page__.fullPath);
      let curURL = "";
      let { id } = routes[routes.length - 1].options
      let url = "";
	  //console.log(curURL);
      switch (text) {
        case "走势图": //"走势图":
          url = `/pages/member/index/gameResults/index?TabCur=1&id=${id}&goback=${curURL}`
          break;
        case "近期开奖"://"近期开奖":
          url = `/pages/member/index/gameResults/index?id=${id}&goback=${curURL}`
          break;
        case "玩法说明"://"玩法说明":
          url = `/pages/rule/index?id=${id}`;
          break;
        default:
          break;
      }

      
      this.$myAudio.setSrc("");
      this.$emit("close");


      

      // if (text == "走势图" || text=='近期开奖' ) {
      //   uni.reLaunch({
      //     url,
      //   });
      // } else {
        uni.navigateTo({
          url,
        });
      //}
    },
  },
};
</script>

<style lang="scss" scoped>
.setting {
  background-color: #fff;
  padding: 10rpx 20rpx;
  width: 280rpx;
  text-align: center;
  box-shadow: 0 0 6rpx #000;
  .text-box {
    padding: 15rpx 0;
    border-bottom: 1px solid #efefef;
    color: #434955;
  }

  .text-box:last-child {
    border-bottom: none;
  }
}
</style>
