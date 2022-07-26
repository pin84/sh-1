<template>
  <view id="com-img-box" :style="boxStyle">
    <image style="width: 100%; height: 100%" :src="src"></image>
  </view>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      default: ()=>"/static/images/user-info/gico2.png",
    },
    boxStyle: {
      type: Object,
      default: () => {
        return {
          border: "1px solid red",
          width: "128rpx",
          // height: "128rpx",
        };
      },
    },
  },
  created(){
    // console.log(this.src);
  }
};
</script>
<style lang="scss" scoped>
#com-img-box {
  // border: 1px solid red;
  width: 100%;
  height: 100%;
}
</style>