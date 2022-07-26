<template>
  <div class="sound">
    <text
      @click="selectSound"
      class="bg iconfont icon-iconfontzhizuobiaozhun023132"
    ></text>
    <ul v-if="isShowSelect" class="select">
      <li
        class="option"
        v-for="(item, idx) in options"
        :key="idx"
        @click="selected(idx)"
      >
        <text class="icon-box">
          <text v-if="curIndex == idx" class="iconfont icon-dui"></text>
        </text>
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      curIndex: 0,
      isShowSelect: false,
      options: ["默认音效", "铃声一", "铃声二", "铃声三", "铃声四", "静音"],
    };
  },

  mounted() {
    // const innerAudioContext = uni.createInnerAudioContext();
    // innerAudioContext.autoplay = true;
    // innerAudioContext.src =
    //   "/static/audio/1.mp3";
    // innerAudioContext.onPlay(() => {
    //   console.log("开始播放");
    // });
    // innerAudioContext.onError((res) => {
    //   console.log(res.errMsg);
    //   console.log(res.errCode);
    // });
    // this.innerAudioContext = innerAudioContext
    this.initData();
  },

  methods: {
    initData() {
      let soundIndex = uni.getStorageSync("soundIndex");
      if (soundIndex == "") {
        soundIndex = 0;
      }
      this.selected(soundIndex);
    },
    selectSound() {
      this.isShowSelect = true;
    },
    selected(idx) {
      // this.innerAudioContext.play()
      this.curIndex = idx;
      uni.setStorageSync("soundIndex", idx);

      let src = "/static/audio/1.mp3";
      switch (idx) {
        case 0:
          src = "/static/audio/1.mp3";
          break;
        case 1:
          src = "/static/audio/2.mp3";
          break;
        case 2:
          src = "/static/audio/3.mp3";
          break;
        case 3:
          src = "/static/audio/4.mp3";
          break;
        case 4:
          src = "/static/audio/5.mp3";
          break;
        case 5:
          src = "";
          break;

        default:
          break;
      }

      this.$myAudio.setSrc(src);
      setTimeout(() => {
        this.isShowSelect = false;
      }, 100);
    },
  },
};
</script>
<style lang="scss" scoped>
.sound {
  position: relative;
  .bg {
    font-size: 48rpx;
    padding: 0 15rpx;
  }
  .select {
    position: absolute;
    width: 160rpx;
    top: 0;
    right: 0;
    padding: 10rpx;
    background-color: gray;
    color: #fff;
    z-index: 10;
    border-radius: 10rpx;
    overflow: hidden;
    .option {
      list-style: none;
      display: flex;
      align-items: center;
      .icon-box {
        flex: 0 0 35rpx;
        .iconfont {
          font-size: 24rpx;
          margin-right: 10rpx;
          font-weight: 600;
        }
      }
    }
  }
}
</style>