<template>
  <view class="nav flex align-center" style="width: 100%">
	  <view class="status_bar">
	     <!-- 这里是虚拟的状态栏,为了在app里不遮挡顶部 -->
	  </view>
    <view
      @click="$emit('togglePlayType')"
      class="nav-title nav-center-title-wt flex align-center justify-center text-white"
    >
      <i v-if="isOffcial" class="iconfont icon-guanfang"></i>
      <i v-else class="iconfont icon-xin"></i>
      <text class="text-xl">{{ title }}</text>
      <i class="iconfont icon-icon-test4" style="font-size: 36rpx"></i>
    </view>

    <view
      @click="toggleSetting"
      class="set-box padding-left-xs padding-right-xs"
      ><i
        class="iconfont icon-setting-copy text-white"
        style="font-size: 42rpx"
      ></i>

      <i v-if="isShowTrangle" class="iconfont icon-zu" style="color: #fff"></i>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    isShowTrangle: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    isOffcial: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    title: {
      type: String,
      default: () => '定位胆',
    },
  },

 

  methods: {
    toggleSetting() {
      this.$emit("toggleSetting");
    },
  },
};
</script>

<style lang="scss" scoped>
	.nav-center-title-wt{width:420rpx;}
.nav {
  height: 44px;

  .set-box {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    .icon-zu {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -35%;
    }
  }
}
.nav-title {
  font-size: 86rpx;
}
</style>
