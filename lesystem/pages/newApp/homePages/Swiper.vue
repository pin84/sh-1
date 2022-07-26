<template>
  <view>
    <view class="uni-padding-wrap">
      <view class="page-section swiper">
        <view class="page-section-spacing">
          <swiper
            class="swiper"
            :indicator-dots="indicatorDots"
            :autoplay="autoplay"
            :interval="interval"
            :duration="duration"
            :circular="true"
          >
            <swiper-item class="item" v-for="(item, idx) in 2" :key="idx">
              <view class="swiper-item uni-bg-red">
                <ImageBox :boxStyle="boxStyle" :src='require(`static/newApp/banner/${idx+1}.jpeg`)' />
              </view>
            </swiper-item>
          </swiper>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import ImageBox from "@/pages/newApp/components/ImageBox.vue";
export default {
  data() {
    return {
      boxStyle: {
        width: "100%",
        height: "300rpx",
      },
      background: ["color1", "color2", "color3"],
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
    };
  },
  components: {
    ImageBox,
  },
  methods: {
    changeIndicatorDots(e) {
      this.indicatorDots = !this.indicatorDots;
    },
    changeAutoplay(e) {
      this.autoplay = !this.autoplay;
    },
    intervalChange(e) {
      this.interval = e.target.value;
    },
    durationChange(e) {
      this.duration = e.target.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.uni-padding-wrap {
  width: 100%;
  .item {
    width: 100%;
    border-radius: 10rpx;
    overflow: hidden;
    .swiper-item {
      width: 100%;
    }
  }
}
</style>