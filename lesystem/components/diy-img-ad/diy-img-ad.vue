<template>
  <view>
    <view class="single-graph" v-if="value">
      <image
        v-if="value[0].adv_show_type == 1"
        @click="redirectTo(value[0].href)"
        :src="$util.img(value[0].src)"
        mode="widthFix"
      ></image>
      <swiper
        v-else
        class="swiper"
        autoplay="true"
        indicator-dots="true"
        indicator-active-color="#ffffff"
      >
        <swiper-item
          class="swiper-item"
          v-for="(item, index) in value"
          :key="index"
          v-show="item.src"
          @click="redirectTo(item.href)"
        >
          <image :src="$util.img(item.src)" mode="heightFix"></image>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
export default {
  name: "diy-img-ad",
  props: {
    value: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  created() {
    //console.log(this.value);
    
  },
  methods: {
    redirectTo(link) {
      this.$emit("redirectTo", link);
    },
  },
};
</script>

<style>
.single-graph {
  width: 100%;
  line-height: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.single-graph image {
  width: 100%;
}
.swiper {
  height: 350rpx;
}
.swiper-item {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>