<template>
  <div class="mie-jun">
    <div class="main-body">
      <div class="com-box s1">
        <div class="item" v-for="(item,idx) in s1List" :key="idx">
          <span>{{item.name}}：</span>
          <div>
            <span>
              {{d[item.mkey]}}
            </span>
            <span v-if="idx == 1">℃</span>
          </div>
        </div>
      </div>
      <div class="com-box s2">
        <div class="item" v-for="(item,idx) in c1List" :key="idx">
          <span>{{item.name}}：</span>
          <div>
            <span>
              {{d[item.mkey]}}
            </span>
            <span v-if="idx == 1">℃</span>
          </div>
        </div>
      </div>

      <div class="com-box s3">
        <span>工作状态：</span>
        <span class="state" :class="{'active':d.ZiDongShouDongZhuangTai}">{{d.ZiDongShouDongZhuangTai ? '自动状态' :'手动状态'}} ，</span>
        <span class="state" :class="{'active':d.YunXingBiaoZhi}">{{d.YunXingBiaoZhi ? '运行状态' :'停止状态'}}</span>
      </div>
      <div class="s4">
        <InfoText :state="d.JinShuiDianCiFa" />
      </div>
      <div class="s5">
        <InfoText :state="d.YuanShuiBeng" />
      </div>
      <div class="s6">
        <InfoText :state="d.YiJiGaoYaBeng" />
      </div>
      <div class="s7">
        <InfoText :state="d.ErJiGaoYaBeng" />
      </div>
      <div class="s8">
        <InfoText :state="d.HengYaGongShuiBeng" />
      </div>

      <div class="s9">
        <Vale :state="d.YiJiYaLiDi" />
      </div>
      <div class="s10">
        <Vale :state="d.YiJiYaLiGao" />
      </div>
      <div class="s11">
        <Vale :state="d.ErJiYaLiGao" />
      </div>
    </div>

  </div>
</template>

<script>
import Vale from "./Vale.vue";
import Pipe from "@/components/Pipe.vue";
import InfoBar from "./InfoBar.vue";
import test from "./test";
import InfoText from "./InfoText.vue";
export default {
  data() {
    return {
      d: {},
      s1List: [
        {
          name: "液位",
          mkey: "YuanShuiXiangDangQianYeWei",
        },
        {
          name: "温度",
          mkey: "YuanShuiXiangWenDu",
        },
      ],
      c1List: [
        {
          name: "液位",
          mkey: "ChunShuiShuiXiangYeWei",
        },
        {
          name: "温度",
          mkey: "ChunShuiXiangWenDu",
        },
      ],
    };
  },
  components: {
    Vale,
    Pipe,
    InfoBar,
    InfoText,
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
        this.d = test;
        console.log(chunShuiXiTongEntity);

        await this.awaitTime(500000);
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
  font-weight: 600;
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
  background: url("../../../public/gaitianli/room-cs.jpg") center no-repeat;
  background-size: contain;
  position: relative;
  font-size: 10px;
  box-sizing: border-box;
  .main-body {
    position: absolute;
    width: 100%;
    height: 100%;
    .active {
      z-index: 10;
    }
    .com-box {
      color: #fff;
      display: flex;
      flex-direction: column;
      font-size: 16px;
      font-weight: 600;
      .item {
        display: flex;
      }
    }
    .s1 {
      @include tl(207px, 355px);
    }
    .s2 {
      @include tl(805px, 655px);
    }
    .s3 {
      flex-direction: row;
      @include tl(107px, 795px);
      font-size: 24px;
      .state {
        color: red;
      }
      .active {
        color: green;
      }
    }

    .s4 {
      @include tl(167px, 255px);
    }
    .s5 {
      @include tl(387px, 705px);
    }
    .s6 {
      @include tl(680px, 1005px);
    }
    .s7 {
      @include tl(677px, 405px);
    }
    .s8 {
      @include tl(982px, 1005px);
    }
    .s9 {
      @include tl(506px, 1125px);
    }
    .s10 {
      @include tl(506px, 845px);
    }
    .s11 {
      @include tl(686px, 208px);
      transform: rotate(-90deg);
    }
  }
}
</style>