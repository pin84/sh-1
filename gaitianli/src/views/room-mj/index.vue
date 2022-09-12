<template>
  <div class="mie-jun">
    <div class="main-body">
      <div class="box-1">
        <Pipe :w='0.78' :state='f1'>
          <Vale :state='f1' />
        </Pipe>
        <Pipe :w='0.78' :state='f1_1'>
          <Vale :state='f1_1' />
        </Pipe>
      </div>
      <div class="box-2">
        <Pipe :w='0.685' :state='f2'>
          <Vale :state='f2' />
        </Pipe>
        <Pipe :w='0.63' :ml='0.35' :state='f2_1'>
          <Vale :state='f2_1' />
        </Pipe>
        <Pipe :w='0.9' :state='f2_2'>
          <Vale :state='f2_2' :ml="0.1" />
        </Pipe>
      </div>
      <div class="box-3">
        <!-- <Pipe :w='1.365' :state='f3'>
          <Vale :state='f3' />
        </Pipe> -->
        <Pipe :w='2.37' :state='f3_1'>
          <Vale :state='f3_1' />
        </Pipe>
        <Pipe :w='0.155' :state='f2' />
        <Pipe :w='0.17' :state='f1 || f2' />
        <Pipe :ml="0.78" :w='2.67' :state="f4_1" />
        <Pipe :w='0.59' :ml='0.97' :state='f3_3'>
          <Vale :state='f3_3' />
        </Pipe>
      </div>
      <div class="box-4">
        <Pipe :w='0.42' :state='f4' />
        <Pipe :w='0.54' :state='f4' :ml="0.63">
          <Vale :state='f4' />
        </Pipe>
        <Pipe :w='0.15' :state='f4 || f6' />
        <Pipe :w='0.96' :state='f4 || f5 || f6' />
        <Pipe :w='1.23' :ml="0.77" :state='f4_1' />
        <Pipe :w='0.87' :ml="0.63" :state='f4_1' />
        <Pipe :w='0.25' :ml="0.11" :state='f4_1' />
        <Pipe :w='0.23' :ml="0.06" :state='f4_2' />
        <Pipe :w='0.75' :ml='0.11' :state='f4_2'>
          <Vale :state='f4_2' />
        </Pipe>
      </div>

      <div class="box-5">
        <Pipe :w='0.625' :state='f5'>
          <Vale :state='f5' />
        </Pipe>
        <Pipe :w='0.56' :state='f5_1' :ml="2.12">
          <Vale :state='f5_1' />
        </Pipe>
        <Pipe :w='0.59' :state='f5 || f5_1 ' />
        <Pipe :w='1.625' :state='f5_2'>
          <Vale :state='f5_2' />
        </Pipe>
      </div>
      <div class="box-6">
        <Pipe :w='0.768' :state='f6'>
          <Vale :state='f6' />
        </Pipe>
        <Pipe :w='0.63' :state='f6_1'>
          <Vale :state='f6_1' />
        </Pipe>
      </div>
      <div class="box-7">
        <Pipe :w='0.565' :state='f7'>
          <Vale :state='f7' />
        </Pipe>
        <Pipe :w='0.528' :state='f7 || f7_1' />
        <Pipe :w='0.06' :state='f7 || f7_1' />
        <Pipe :w='1.629' :state='f7'>
          <!-- <Vale :state='f7_1' /> -->
        </Pipe>
      </div>
      <div class="box-8">
        <Pipe :state='f8'>
          <Vale :state='f8' />
        </Pipe>
      </div>

      <div class="box-v-2">
        <Pipe :state='f6' />
      </div>
      <div class="box-v-3">
        <Pipe :state='f5' />
      </div>
      <div class="box-v-4">
        <Pipe :state='f2' />
      </div>
      <div class="box-v-5">
        <Pipe :w='2.695' :state='f1' />
      </div>
      <div class="box-v-6">
        <Pipe :w='2.695' :state='f1 || f2' />
      </div>
      <div class="box-v-7">
        <Pipe :state='f4_1' />
      </div>

      <div class="box-v-8">
        <Pipe :w="0.425" :state='f2_1' />
        <Pipe :w="0.38" :ml="1.92" :state='f6_1' />
        <Pipe :w="0.375" :ml="0.475" :state='f8' />
      </div>
      <div class="box-v-9">
        <Pipe :state='f1_1' />
      </div>
      <div class="box-v-10">
        <Pipe :w="0.53" :state='f9'>
          <Vale :state='f9' />
        </Pipe>
        <Pipe :w="0.87" :state='f9_1'>
          <Vale :state='f9_1' />
        </Pipe>
      </div>
      <div class="box-v-11">
        <Pipe :state='f2_2' />
      </div>
      <div class="box-v-12">
        <Pipe :state='f3_3' />
      </div>

      <div class="box-v-13" :class="{'active':!f10}" />
      <div class="box-v-13-1" :class="{'active':!f11}" />

    </div>
  </div>
</template>

<script>
import Vale from "./vale.vue";
import Pipe from "./Pipe.vue";
import test from "./test";
export default {
  data() {
    return {
      t1: 0,
      f1: 0,
      f1_1: 0,
      f2: 0,
      f2_1: 0,
      f2_2: 0,
      f3: 0,
      f3_1: 0,
      f3_2: 0,
      f3_3: 0,

      f4: 0,
      f4_1: 0,
      f4_2: 0,

      f5: 0,
      f5_1: 0,
      f5_2: 0,
      f6: 0,
      f6_1: 0,
      f7: 0,
      f7_1: 0,
      f8: 0,

      f9: 0,
      f9_1: 0,

      f10: 0,
      f11: 0,
    };
  },
  components: {
    Vale,
    Pipe,
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

        let res = await this.$get("/MieJunGuanList");
        // res = test;
        console.log(res);
        let {
          mieJunGuanEntity: {
            Fa_Q3_0,
            Fa_Q2_2,
            Fa_Q2_7,
            Fa_Q0_5,
            Fa_Q2_0,
            Fa_Q3_1,
            Fa_Q2_1,
            Fa_Q2_6,
            Fa_Q4_3,
            Fa_Q3_2,
            Fa_Q0_6,
            Fa_Q2_3,
            Fa_Q3_3,
            Fa_Q0_7,
            Fa_Q3_5,
            Fa_Q3_6,
            Fa_Q4_2,
            Fa_Q0_2,
            Fa_Q3_4,
          },
        } = res;

        this.f1 = Fa_Q3_0;
        this.f1_1 = Fa_Q2_2;
        this.f2 = Fa_Q2_7;
        this.f2_1 = Fa_Q0_5;
        this.f2_2 = Fa_Q2_0;

        this.f3_1 = Fa_Q3_1;
        this.f3_3 = Fa_Q2_1;

        this.f4 = Fa_Q2_6;
        this.f4_1 = Fa_Q3_4;
        this.f4_2 = Fa_Q4_3;

        this.f5 = Fa_Q3_2;
        this.f5_1 = Fa_Q0_6;
        this.f5_2 = Fa_Q2_3;

        this.f6 = Fa_Q3_3;
        this.f6_1 = Fa_Q0_7;

        this.f7 = Fa_Q3_5;
        this.f8 = Fa_Q3_6;

        this.f9 = Fa_Q4_2;
        this.f9_1 = Fa_Q2_2;

        this.f10 = Fa_Q0_2;
        this.f11 = Fa_Q3_4;

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
  // height: $h;
}

.mie-jun {
  width: 1920px;
  height: 1080px;
  box-sizing: border-box;
  background: url("../../../public/gaitianli/junzhongbg.jpg") center no-repeat;
  background-size: contain;
  position: relative;
  font-size: 10px;
  box-sizing: border-box;
  .main-body {
    position: absolute;
    width: 100%;
    height: 100%;
    .box-1 {
      @include tl(172px, 517px);
      width: 675px;
    }
    .box-2 {
      @include tl(256px, 517px);

      width: 1145px;
    }
    .box-3 {
      @include tl(339px, 182px);
      justify-content: flex-start;
      width: 1478px;
      // border: 1px solid red;
    }
    .box-4 {
      @include tl(588px, 182px);
      justify-content: flex-start;
      z-index: 0;
    }
    .box-5 {
      @include tl(703px, 515px);
      justify-content: flex-start;
      width: 1062px;
      // border: 1px solid red;
    }
    .box-6 {
      @include tl(789px, 487px);
      width: 677px;
      // border: 1px solid red;
    }
    .box-7 {
      @include tl(868px, 1042px);
      width: 535px;
      justify-content: flex-start;
      // border: 1px solid red;
    }
    .box-8 {
      @include tl(953px, 1042px);
      width: 121px;
    }

    .box-v-2 {
      @include tl(690px, 398px);
      transform: rotate(90deg);
      width: 192px;
    }
    .box-v-3 {
      @include tl(650px, 466px);
      transform: rotate(90deg);
      width: 112px;
    }
    .box-v-4 {
      @include tl(294px, 603px);
      transform: rotate(90deg);
      width: 80px;
      // border: 1px solid red;
    }
    .box-v-5 {
      @include tl(249px, 588px);
      transform: rotate(90deg);
      width: 167px;
      // border: 1px solid red;
    }
    .box-v-6 {
      @include tl(378px, 652px);
      transform: rotate(90deg);
      width: 80px;
      // border: 1px solid red;
    }
    .box-v-7 {
      @include tl(378px, 815px);
      transform: rotate(90deg);
      width: 80px;
      // border: 1px solid red;
    }
    .box-v-8 {
      @include tl(605px, 812px);
      transform: rotate(90deg);
      justify-content: flex-start;
      width: 690px;
      // border: 1px solid red;
    }
    .box-v-9 {
      @include tl(255px, 1108px);
      transform: rotate(90deg);
      width: 155px;
      // border: 1px solid red;
    }
    .box-v-10 {
      @include tl(601px, 1264px);
      transform: rotate(90deg);
      transform-origin: 0 0;
      z-index: 20;
      // border: 1px solid red;
    }
    .box-v-11 {
      @include tl(275px, 1473px);
      transform: rotate(90deg);
      width: 45px;
      // border: 1px solid red;
    }
    .box-v-12 {
      @include tl(302px, 1513px);
      transform: rotate(90deg);
      width: 80px;
      // border: 1px solid red;
    }

    .box-v-13 {
      width: 118px;
      height: 166px;
      // border: 1px solid red;
      @include tl(455px, 266px);
      &.active {
        background: url("../../../public/gaitianli/jfamen_black.png") center
          no-repeat;
        background-size: cover;
      }
    }
    .box-v-13-1 {
      width: 118px;
      height: 166px;
      // border: 1px solid red;
      @include tl(456px, 1088px);
      z-index: 10;
      &.active {
        background: url("../../../public/gaitianli/jfamen_black.png") center
          no-repeat;
        background-size: cover;
      }
    }
  }
}
</style>