<template>
  <div class="mie-jun">
    <div class="main-body">

    </div>
  </div>
</template>

<script>
import Vale from "@/components/vale.vue";
import Pipe from "@/components/Pipe.vue";
import InfoBar from "./InfoBar.vue";
import test from "./test";
export default {
  data() {
    return {
      f1: 1,
      infoArr: [],
      list: [],
      mlList: [0.1, 1.32, 1.32, 1.32],
      l6: 3,
      l7: 0,
      l8: 0,
      l9: 0,
    };
  },
  components: {
    Vale,
    Pipe,
    InfoBar,
  },
  created() {
    this.initData();
  },

  methods: {
    async initData() {
      while (true) {
        if (this.isBreak) {
          break;
        }
        let res = await this.$get("/ChunShuiXiTongList");
        let { chunShuiXiTongEntity } = res;
        chunShuiXiTongEntity = test;
        console.log(chunShuiXiTongEntity);

        

        await this.awaitTime(5000);
      }
    },

    async awaitTime(delay) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(true);
        }, delay);
      });
    },
  },

  beforeDestroy() {
    this.isBreak = true;
  },
};
</script>

<style lang="scss" scoped>
@mixin tl($top, $left) {
  position: absolute;
  top: $top;
  left: $left;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}
@mixin wh($w, $h) {
  width: $w;
}
@mixin tr-90 {
  transform: rotate(-90deg);
  transform-origin: 0 0;
}

.mie-jun {
  width: 1920px;
  height: 1080px;
  box-sizing: border-box;
  background: url("../../../public/gaitianli/room-cs.png") center no-repeat;
  background-size: contain;
  position: relative;
  font-size: 10px;
  box-sizing: border-box;
  .main-body {
    position: absolute;
    width: 100%;
    height: 100%;
    // border: 1px solid red;
    .active {
      z-index: 10;
    }
    .section-box {
      @include tl(130px, 179px);
      .section-1 {
        position: relative;
        // border: 1px solid red;
        width: 400px;
        height: 689px;
        box-sizing: border-box;
        .box-3 {
          @include tl(174px, 22px);
        }

        .box-4 {
          @include tl(259px, 288px);
        }
        .box-5 {
          @include tl(386px, 70px);
        }

        .box-v-1 {
          width: 395px;
          @include tl(579px, 22px);
          @include tr-90;
        }

        .box-v-2 {
          width: 300px;
          @include tl(689px, 70px);
          @include tr-90;
        }

        .box-v-3 {
          width: 255px;
          @include tr-90;
          @include tl(652px, 121px);
        }
        .box-v-4 {
          @include tr-90;
          @include tl(217px, 165px);
          width: 184px;
        }
        .box-v-5 {
          width: 212px;
          @include tr-90;
          transform: rotate(90deg);
          @include tl(-2px, 238px);
        }
        .box-v-6 {
          width: 190px;
          @include tl(425px, 245px);
          @include tr-90;
          transform: rotate(90deg);
        }
        .box-v-7 {
          width: 35px;
          @include tl(218px, 259px);
          @include tr-90;
        }
        .box-v-8 {
          width: 382px;
          @include tl(652px, 308px);
          @include tr-90;
        }
      }
    }

    .box-1 {
      width: 1587px;
      @include tl(117px, 175px);
    }
    .box-2 {
      width: 1587px;
      @include tl(152px, 175px);
    }

    .box-6 {
      width: 1587px;
      @include tl(707px, 175px);
    }
    .box-7 {
      width: 1587px;
      @include tl(743px, 175px);
    }
    .box-8 {
      width: 1587px;
      @include tl(780px, 175px);
    }
    .box-9 {
      width: 1587px;
      @include tl(817px, 175px);
    }

    .info-box {
      @include tl(895px, 255px);
      // border: 1px solid red;
    }
  }
}
</style>