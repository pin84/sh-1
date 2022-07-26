<template>
  <div class="box">
    <!-- <div class="item-box"> -->
    <div class="com-css liangan"></div>
    <div v-show="zhuaShouYouKuang" ref="zhuashou" class="com-css zhua-shou">
      <div ref="item" class="com-css item"></div>
      <span class="bg"></span>
      <span class="left"></span>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  props: {
    d: {
      type: Object,
      default: () => {
        return {
          id: 1,
          x_zuo_biao: 0,
        };
      },
    },
  },
  data() {
    return {
      trY: 450,
      trX: 399,
      requestId: null,
      zhuashou: null,
      zhuaShouYouKuang:false
    };
  },

  watch: {
    d: {
      handler: function (val) {
        this.moveItem(val);
      },
      deep: true,
    },
  },
  mounted() {
    this.item = this.$refs.item;
    this.zhuashou = this.$refs.zhuashou;
    // this.item.style.transform = `translateY(${-0}px)`
  },

  methods: {
    moveItem(val) {
           let { x_zuo_biao ,zhua_shou_you_kuang} = val;
          this.zhuaShouYouKuang = zhua_shou_you_kuang
      if(!zhua_shou_you_kuang) return
      if (x_zuo_biao > 2380) {
        x_zuo_biao = 2380;
      }
      let dis = (x_zuo_biao / 2380) * 60;
      // this.item.style.transform = `translateY(-${dis}px)`;
      this.zhuashou.style.transform = `translateY(-${dis}px)`;
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  user-select: none;
  width: 50px;
  height: 115px;
  // border: 1px solid red;
  .com-css {
    position: absolute;
    transition: 0.3s linear;
  }
  .liangan {
    border: 2px solid #ccc;
    width: 9px;
    height: 110px;
    box-sizing: border-box;
    right: -14px;
    top: 3px;
    border-radius: 1px;
  }
  .zhua-shou {
    // border: 1px solid red;
    width: 67px;
    height: 30px;
    right: -15.5px;
    bottom: 10px;
    .bg {
      width: 12px;
      height: 38px;
      background-color: #ccc;
      transform: translateY(-4px);
      border-radius: 1px;
      position: absolute;
      right: 0px;
      bottom: -8px;
    }
    .left {
      position: absolute;
      right: 2px;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color: #ccc;
      align-items: center;
      background: url("../../public/gaitianli/item04.png") center no-repeat;
      background-size: cover;
      transform: rotate(180deg);
    }
    .item {
      left: 2px;
      bottom: 0px;
      width: 50px;
      height: 25px;
      background: url("../../public/gaitianli/yidong08.jpg") center no-repeat;
      background-size: contain;
      // border: 1px solid red;
    }
  }
}
// }

@keyframes move {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-200%);
  }
  100% {
    transform: translateY(-400%);
  }
}
</style>