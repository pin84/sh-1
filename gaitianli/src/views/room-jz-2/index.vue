<template>
  <div class="mie-jun">
    <div class="main-body">
      <div class="box-1" :class="{'active':f1}">
        <Pipe :state='f1'> </Pipe>
      </div>
      <div class="box-2" :class="{'active':f1}">
        <Pipe :state='f1'></Pipe>
      </div>
      <div class="section-box">
        <div class="section-1" :style="{'margin-left':index == 0 ? 0 : 0.0365 + 'rem'}" v-for="(item,index) in list" :key="index">
          <div class="box-3" :class="{'active':false}">
            <Pipe :state='item.ChuYeFa' :w='0.748'>
              <Vale :state='item.ChuYeFa' />
            </Pipe>
            <Pipe :state='item.PaiQiFa' :ml='0.488' :w='0.54'>
              <Vale :state='item.PaiQiFa' />
            </Pipe>
          </div>
          <div class="box-4">
            <Pipe  :state='item.JiaCengJinShuiFa' :w='0.162'>
            </Pipe>
            <Pipe :state='item.JiaCengHuiQiFa' :w='0.4'>
              <Vale :state='item.JiaCengHuiQiFa' />
            </Pipe>


          </div>
          <div class="box-5" :class="{'active':item.JiaCengHuiQiFa || item.JiaCengJinShuiFa || item.JiaCengPaiShuiFa}"  >
            <Pipe :state='item.JiaCengHuiQiFa || item.JiaCengJinShuiFa || item.JiaCengPaiShuiFa' :w='0.375' />
          </div>

          <div class="box-v-1" :class="{'active':false}">
            <Pipe :state='item.ChuYeFa'></Pipe>
          </div>
          <div class="box-v-2" :class="{'active':false}">
            <Pipe :state='item.JiaCengJinShuiFa'>
              <Vale :state='item.JiaCengJinShuiFa' />
            </Pipe>
          </div>

          <div class="box-v-3" :class="{'active':item.JiaCengPaiShuiFa}">
            <Pipe :state='item.JiaCengPaiShuiFa'> <Vale :state='item.JiaCengPaiShuiFa' />  </Pipe>
          </div>
          <div class="box-v-4" :class="{'active':false}">
            <Pipe :w='0.235' :state='item.JinYeFa || item.ChuYeFa'></Pipe>
            <Pipe :w='0.725' :state='item.JinYeFa'>
              <Vale :state='item.JinYeFa' />
            </Pipe>
          </div>
          <div class="box-v-5" :class="{'active':false}">
            <Pipe :state='item.JinQiFa'>
              <Vale :state='item.JinQiFa' />
            </Pipe>
          </div>
          <div class="box-v-6" :class="{'active':item.PaiXieFa}">
            <Pipe :state='item.PaiXieFa'>  <Vale :state='item.PaiXieFa' :ml='-0.05' /> </Pipe>
          </div>
          <div class="box-v-7">
            <Pipe :state='item.PaiQiFa'></Pipe>
          </div>
          <div class="box-v-8">
            <Pipe :state='item.JiaCengJinShuiFa'></Pipe>
          </div>
        </div>
      </div>

      <div class="box-6" :class="{'active':false}">
        <Pipe :state='l6'></Pipe>
      </div>
      <div class="box-7" :class="{'active':false}">
        <Pipe :state='l7'></Pipe>
      </div>
      <div class="box-8" :class="{'active':l8 || l9}">
        <Pipe :state='l8 || l9'></Pipe>
      </div>
      <div class="box-9" :class="{'active':0}">
        <Pipe :state='l9'></Pipe>
      </div>

      <div class="info-box">
        <InfoBar :ml='mlList[idx]' v-for="(obj ,idx) of infoArr" :key="idx" :d="obj" />
      </div>
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
      mlList: [0.1, 1.48, 1.48, 1.42],
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
        let res = await this.$get("/PeiYangGuanList/2");

        let { list } = res;
        let infoArr = [];
        list.sort((a, b) => a.ID - b.ID);
        this.list = list;
        for (let obj of list) {
          let {
            JiShi,
            WenDu,
            YaLi,
            ZhuanSu,
            JinYeFa,
            ChuYeFa,
            JinQiFa,
            PaiQiFa,
            PaiXieFa,
            JiaCengJinShuiFa,
            JiaCengPaiShuiFa,
            JiaCengHuiQiFa,
          } = obj;

          infoArr.push({
            JiShi,
            WenDu,
            YaLi:YaLi.toFixed(4),
            ZhuanSu,
          });
        }
        this.infoArr = infoArr;

        let l6index = list.findIndex((item) => item.ChuYeFa == 1);
        l6index == -1 ? (this.l6 = 0) : (this.l6 = 1);

        let l7index = list.findIndex((item) => item.PaiXieFa == 1);
        l7index == -1 ? (this.l7 = 0) : (this.l7 = 1);

        let l8index = list.findIndex((item) => item.JiaCengHuiQiFa == 1);
        l8index == -1 ? (this.l8 = 0) : (this.l8 = 1);
        let l8index_1 = list.findIndex((item) => item.JiaCengPaiShuiFa == 1);
        l8index_1 == -1 ? (this.l8 = 0) : (this.l8 = 1);

        let l9index = list.findIndex((item) => item.JiaCengJinShuiFa == 1);
        l9index == -1 ? (this.l9 = 0) : (this.l9 = 1);

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
  background: url("../../../public/gaitianli/junzhong5-8.jpg") center no-repeat;
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
    }
  }
}
</style>