<template>
  <div class="home">
    <div class="btn-box" v-if="1">
      <el-button @click="test(idx)" class="btn" v-for="(item,idx) in btnList" :key="idx" type="primary">{{item}}</el-button>
    </div>
    <div class="item-box-1">
      <Item :d="d1" />
    </div>
    <div class="item-box-2">
      <Item2 :d="d2" />
    </div>
    <div class="item-box-3">
      <Item3 :d="d3" />
    </div>
    <div class="item-box-4">
      <Item4 :d="d4" />
    </div>

    <div class="item-info-box-1">
      <Info :d="info1" />
    </div>
    <div class="item-info-box-2">
      <Info :d="info2" />
    </div>
    <div class="item-info-box-3">
      <Info :d="info3" />
    </div>
    <div class="item-info-box-4">
      <Info :d="info4" />
    </div>

    <div class="info-box-1">
      <div>
        <strong>线1</strong>
        <div>DDJ本次运行产量:{{zpx1.DDJ_BenCiYunXingChanLiang}}</div>
        <div>DDJ 运行标识:{{zpx1.DDJ_YunXingBiaoZhi}}</div>
        <div>DDJ 运行速度:{{zpx1.DDJ_YunXingSuDu}}</div>
        <div>ZPJ 本次运行产量:{{zpx1.ZPJ_BenCiYunXingChanLiang}}</div>
        <div>ZPJ 运行标识:{{zpx1.ZPJ_YunXingBiaoZhi}}</div>
        <div>ZPJ 运行速度:{{zpx1.ZPJ_YunXingSuDu}}</div>
      </div>
    </div>
    <div class="info-box-2">
      <div>
        <strong>线2</strong>
        <div>DDJ本次运行产量:{{zpx2.DDJ_BenCiYunXingChanLiang}}</div>
        <div>DDJ 运行标识:{{zpx2.DDJ_YunXingBiaoZhi}}</div>
        <div>DDJ 运行速度:{{zpx2.DDJ_YunXingSuDu}}</div>
        <div>ZPJ 本次运行产量:{{zpx2.ZPJ_BenCiYunXingChanLiang}}</div>
        <div>ZPJ 运行标识:{{zpx2.ZPJ_YunXingBiaoZhi}}</div>
        <div>ZPJ 运行速度:{{zpx2.ZPJ_YunXingSuDu}}</div>
      </div>
    </div>

    <div class="l1d1">
      <ConveyorBox :lineNum='7' :statuArr='l1d1' :isShowArr='l1d1GD' :itemType='1' />
    </div>
    <div class="l1d2">
      <ConveyorBox :lineNum='5' :statuArr='l1d2' :isShowArr='l1d2GD' :itemType='1' />
    </div>
    <div class="l1d3">
      <ConveyorBox :lineNum='15' :statuArr='l1d3' :isShowArr='l1d3GD' :itemType='1' />
    </div>

    <div class="l1d4">
      <ConveyorBox :lineNum='10' :statuArr='l1d4' :isShowArr='l1d4GD' :itemType='1' />
    </div>

    <div class="l2d1">
      <ConveyorBox :lineNum='8' :statuArr='l2d1' :isShowArr='l2d1GD' :itemType='1' />
    </div>
    <div class="l2d2">
      <ConveyorBox :lineNum='7' :statuArr='l2d2' :isShowArr='l2d2GD' :itemType='1' />
    </div>

    <div class="l2d3">
      <ConveyorBox :lineNum='14' :statuArr='l2d3' :isShowArr='l2d3GD' :itemType='1' />
    </div>
    <div class="l2d4">
      <ConveyorBox :lineNum='17' :statuArr='l2d4' :isShowArr='l2d4GD' :itemType='1' />
    </div>

    <div class="tp-box-1-1">
      <ConveyorBox :lineNum='5' :statuArr='l1d5' :isShowArr='l1d5GD' />
      <ConveyorBox :lineNum='5' :statuArr='l1d5_1' :isShowArr='l1d5GD_1' />
    </div>
    <div class="tp-box-1-2">
      <ConveyorBox :lineNum='5' :statuArr='l1d6' :isShowArr='l1d6GD' />
    </div>
    <div class="tp-box-1-3">
      <ConveyorBox :lineNum='5' :statuArr='l1d7' :isShowArr='l1d7GD' />
      <ConveyorBox :lineNum='5' :statuArr='l1d7_1' :isShowArr='l1d7GD_1' />
    </div>

    <div class="tp-box-1-4">
      <ConveyorBox :lineNum='5' :statuArr='d10' :isShowArr='d10GD' :onlyTP='1' />
      <ConveyorBox :lineNum='5' :statuArr='d10_1' :isShowArr='d10GD_1' :onlyTP='1' />
    </div>

    <div class="tp-box-1-5">
      <ConveyorBox :lineNum='11' :statuArr='d11' :isShowArr='d11GD' :onlyTP='1' />
      <ConveyorBox :lineNum='5' :statuArr='d11_1' :isShowArr='d11GD_1' :onlyTP='1' />
    </div>

    <div class="tp-box-1-6">
      <ConveyorBox :lineNum='5' :statuArr='d12' :isShowArr='d12GD' />
    </div>
    <div class="tp-box-1-7">
      <ConveyorBox :lineNum='5' :statuArr='d13' :isShowArr='d13GD' :onlyTP='1' />
    </div>
    <div class="tp-box-1-8">
      <ConveyorBox :lineNum='11' :statuArr='d14' :isShowArr='d14GD' :onlyTP='1' />
      <ConveyorBox :lineNum='5' :statuArr='d14_1' :isShowArr='d14GD_1' :onlyTP='1' />
    </div>

    <div class="tp-box-03-01">
      <ConveyorBox :lineNum='5' :statuArr='l1d8' :isShowArr='l1d8GD' />
      <ConveyorBox :lineNum='5' :statuArr='l1d8_1' :isShowArr='l1d8GD_1' />
    </div>
    <div class="tp-box-03-02">
      <ConveyorBox :lineNum='5' :statuArr='l1d9' :isShowArr='l1d9GD' />
      <ConveyorBox :lineNum='5' :statuArr='l1d9_1' :isShowArr='l1d9GD_1' />
    </div>

    <div class="lqj-1">

      <div class="lq-com lqj-1-1">
        <ConveyorBox :lineNum='8' :statuArr='lqj1' :isShowArr='lqj1GD' :itemType='1' />
      </div>
      <div class="lq-com lqj-1-2">
        <ConveyorBox :lineNum='20' :statuArr='lqj2' :isShowArr='lqj2GD' :itemType='1' />
        <ConveyorBox :lineNum='20' :statuArr='lqj3' :isShowArr='lqj3GD' :itemType='1' />
      </div>
    </div>

    <div class="lgj-2">
      <ConveyorBox :lineNum='7' :statuArr='lqj4' :isShowArr='lqj4GD' :itemType='1' />
      <ConveyorBox :lineNum='14' :statuArr='lqc5' :isShowArr='lqc5GD' :itemType='1' />
    </div>
    <div class="lgj-3">
      <ConveyorBox :lineNum='11' :statuArr='lqc6' :isShowArr='lqc6GD' :itemType='1' />
      <ConveyorBox :lineNum='9' :statuArr='lqc7' :isShowArr='lqc7GD' :itemType='1' />

      <div class="lgj-3-1">
        <ConveyorBox :lineNum='16' :statuArr='lqc8' :isShowArr='lqc8GD' :itemType='1' />
        <ConveyorBox :lineNum='16' :statuArr='lqc9' :isShowArr='lqc9GD' :itemType='1' />

      </div>
    </div>

    <div class="title">槐耳菌质生产车间</div>
    <div class="section-box">
      <div class="border-red box-1">
        <span>装瓶区</span>
        <span class="text1-2 f_z_22">搬筐机2</span>
        <span class="text1-1 f_z_22">搬筐机1</span>
      </div>
      <div class="border-red box-2">灭菌区</div>
      <div class="border-red box-3">

        <span>冷却缓冲区</span>
        <span class="text3-2 f_z_22">搬筐机4</span>
        <span class="text3-1 f_z_22">搬筐机3</span>
      </div>
      <div class="border-red box-4">冷却室</div>
      <div class="border-red box-5">接种室</div>
    </div>
  </div>
</template>

<script>
import dataHandler from "@/views/dataHandler.js";
import Item from "@/views/Item.vue";
import Item2 from "@/views/Item-2.vue";
import Item3 from "@/views/Item-3.vue";
import Item4 from "@/views/Item-4.vue";
import Info from "@/views/Info.vue";
import ConveyorBox from "@/views/ConveyorBox.vue";

export default {
  components: {
    Item,
    Item2,
    Item3,
    Item4,
    Info,
    ConveyorBox,
  },
  props: {},
  data() {
    return {
      zpx1: {},
      zpx2: {},
      btnList: ["电机停止", "电机运行", "电机反转", "光电信号有", "光电信号无"],
      isBreak: false,
      d1: {},
      d2: {},
      d3: {},
      d4: {},

      info1: {},
      info2: {},
      info3: {},
      info4: {},

      l1d1: [], //1线装瓶电机信号1
      l1d1GD: [], // 1线装瓶光电信号1

      l1d2: [], //1线装瓶电机信号2
      l1d2GD: [], // 1线装瓶光电信号2
      l1d3: [],
      l1d3GD: [],
      l1d4: [], //1线装瓶电机信号2
      l1d4GD: [], // 1线装瓶光电信号2

      l2d1: [],
      l2d1GD: [],
      l2d2: [],
      l2d2GD: [],
      l2d3: [],
      l2d3GD: [],
      l2d4: [],
      l2d4GD: [],

      l1d5: [], //1线托盘传送线电机信号1
      l1d5GD: [], // 1线托盘传送线光电信号1
      l1d5_1: [], //1线托盘传送线电机信号1
      l1d5GD_1: [], // 1线托盘传送线光电信号1

      l1d6: [], //1线托盘传送线电机信号
      l1d6GD: [], // 1线托盘传送线光电信号

      l1d7: [], //1线托盘传送线电机信号
      l1d7GD: [], // 1线托盘传送线光电信号
      l1d7_1: [], //1线托盘传送线电机信号
      l1d7GD_1: [], // 1线托盘传送线光电信号

      l1d8: [], //1线托盘传送线电机信号
      l1d8GD: [], // 1线托盘传送线光电信号
      l1d8_1: [], //1线托盘传送线电机信号
      l1d8GD_1: [], // 1线托盘传送线光电信号

      l1d9: [], //1线托盘传送线电机信号
      l1d9GD: [], // 1线托盘传送线光电信号
      l1d9_1: [], //1线托盘传送线电机信号
      l1d9GD_1: [], // 1线托盘传送线光电信号

      d10: [],
      d10GD: [],
      d10_1: [],
      d10GD_1: [],
      d11: [],
      d11GD: [],
      d11_1: [],
      d11GD_1: [],

      d12: [],
      d12GD: [],
      d13: [],
      d13GD: [],
      d14: [],
      d14GD: [],
      d14_1: [],
      d14GD_1: [],

      lqj1: [],
      lqj1GD: [],

      lqj2: [],
      lqj2GD: [],
      lqj3: [],
      lqj3GD: [],
      lqj4: [],
      lqj4GD: [],
      lqc5: [],
      lqc5GD: [],
      lqc6: [],
      lqc6GD: [],
      lqc7: [],
      lqc7GD: [],
      lqc8: [],
      lqc8GD: [],
      lqc9: [],
      lqc9GD: [],
    };
  },
  methods: {
    test(idx) {
      console.log(idx);
      if (idx <= 2) {
        this.l2d1 = this.pushD(idx);
        this.l2d1GD = this.pushD(idx);

        // this.l2d1GD = this.pushD(idx);
        // this.l2d2GD = this.pushD(idx);

        console.log( this.l1d1);
      }

      if (idx > 2) {
        let i = 1;
        if (idx == 4) {
          i = 0;
        }
        this.l1d1GD = this.pushD(i);
      }

      console.log(this.l1d1);
    },

    pushD(type = 0) {
      let arr = [];
      // if (type == 0) {
      for (let i = 0; i < 5; i++) {
        arr.push(type);
      }
      // }

      return arr;
    },

    async initData() {
      while (true) {
        if (this.isBreak) {
          break;
        }
        console.log("--home initData--");
        let res = await this.$get("/BankuangList");
        await this.awaitTime(1000);
        if (res.code == -1) continue;
        let {
          bangkuangji: { list },
          zhuangpingshusongxian: { zhuangPingShuSongXianEntity },
          tuopanshusongxian,
          lengqueshijinxian: { lengQueShiJinXianEntity },
          lengqueshichuxian: { lengQueShiChuXianEntity },
        } = res;
        if (!list) continue;
        if (list.lenght == 0) continue;
        this.d1 = list[0];
        this.d2 = list[1];
        this.d3 = list[2];
        this.d4 = list[3];

        this.l1d1 = dataHandler.getL1D1(zhuangPingShuSongXianEntity);
        this.l1d1GD = dataHandler.getL1D1GD(zhuangPingShuSongXianEntity);

        this.l1d2 = dataHandler.getL1D2(zhuangPingShuSongXianEntity);
        this.l1d2GD = dataHandler.getL1D2GD(zhuangPingShuSongXianEntity);

        this.l1d3 = dataHandler.getL1D3(zhuangPingShuSongXianEntity);
        this.l1d3GD = dataHandler.getL1D3GD(zhuangPingShuSongXianEntity);

        this.l1d4 = dataHandler.getL1D4(zhuangPingShuSongXianEntity);
        this.l1d4GD = dataHandler.getL1D4GD(zhuangPingShuSongXianEntity);

        this.l2d1 = dataHandler.getL2D1(zhuangPingShuSongXianEntity);
        this.l2d1GD = dataHandler.getL2D1GD(zhuangPingShuSongXianEntity);
        this.l2d2 = dataHandler.getL2D2(zhuangPingShuSongXianEntity);
        this.l2d2GD = dataHandler.getL2D2GD(zhuangPingShuSongXianEntity);
        this.l2d3 = dataHandler.getL2D3(zhuangPingShuSongXianEntity);
        this.l2d3GD = dataHandler.getL2D3GD(zhuangPingShuSongXianEntity);
        this.l2d4 = dataHandler.getL2D4(zhuangPingShuSongXianEntity);
        this.l2d4GD = dataHandler.getL2D4GD(zhuangPingShuSongXianEntity);

        let [l1d5GD, l1d5] = dataHandler.getL1D5(tuopanshusongxian);
        this.l1d5GD = l1d5GD;
        this.l1d5 = l1d5;
        let [l1d5GD_1, l1d5_1] = dataHandler.getL1D5_1(tuopanshusongxian);
        this.l1d5GD_1 = l1d5GD_1;
        this.l1d5_1 = l1d5_1;

        let [l1d6GD, l1d6] = dataHandler.getL1D6(tuopanshusongxian);
        this.l1d6GD = l1d6GD;
        this.l1d6 = l1d6;

        let [l1d7GD, l1d7] = dataHandler.getL1D7(tuopanshusongxian);
        this.l1d7GD = l1d7GD;
        this.l1d7 = l1d7;
        let [l1d7GD_1, l1d7_1] = dataHandler.getL1D7_1(tuopanshusongxian);
        this.l1d7GD_1 = l1d7GD_1;
        this.l1d7_1 = l1d7_1;

        let [l1d8GD, l1d8] = dataHandler.getL10301(tuopanshusongxian);
        this.l1d8GD = l1d8GD;
        this.l1d8 = l1d8;
        let [l1d8GD_1, l1d8_1] = dataHandler.getL10301_1(tuopanshusongxian);
        this.l1d8GD_1 = l1d8GD_1;
        this.l1d8_1 = l1d8_1;

        let [l1d9GD, l1d9] = dataHandler.getL10302(tuopanshusongxian);
        this.l1d9GD = l1d9GD;
        this.l1d9 = l1d9;

        let [l1d9GD_1, l1d9_1] = dataHandler.getL10302_1(tuopanshusongxian);
        this.l1d9GD_1 = l1d9GD_1;
        this.l1d9_1 = l1d9_1;

        let [d10GD, d10] = dataHandler.getD10(tuopanshusongxian);
        this.d10GD = d10GD;
        this.d10 = d10;

        let [d10GD_1, d10_1] = dataHandler.getD10_1(tuopanshusongxian);
        this.d10GD_1 = d10GD_1;
        this.d10_1 = d10_1;

        let [d11GD, d11] = dataHandler.getD11(tuopanshusongxian);
        this.d11GD = d11GD;
        this.d11 = d11;

        let [d11GD_1, d11_1] = dataHandler.getD11_1(tuopanshusongxian);
        this.d11GD_1 = d11GD_1;
        this.d11_1 = d11_1;

        let [d12GD, d12] = dataHandler.getD12(tuopanshusongxian);
        this.d12GD = d12GD;
        this.d12 = d12;
        let [d13GD, d13] = dataHandler.getD13(tuopanshusongxian);
        this.d13GD = d13GD;
        this.d13 = d13;
        let [d14GD, d14] = dataHandler.getD14(tuopanshusongxian);
        this.d14GD = d14GD;
        this.d14 = d14;
        let [d14GD_1, d14_1] = dataHandler.getD14_1(tuopanshusongxian);
        this.d14GD_1 = d14GD_1;
        this.d14_1 = d14_1;

        let { lqj1, lqj1GD } = dataHandler.getLQJd1(lengQueShiJinXianEntity);
        this.lqj1 = lqj1;
        this.lqj1GD = lqj1GD;

        let { lqj2, lqj2GD } = dataHandler.getLQJd2(lengQueShiJinXianEntity);
        this.lqj2 = lqj2;
        this.lqj2GD = lqj2GD;

        let { lqj3, lqj3GD } = dataHandler.getLQJd3(lengQueShiJinXianEntity);
        this.lqj3 = lqj3;
        this.lqj3GD = lqj3GD;

        let { lqj4, lqj4GD } = dataHandler.getLQJd4(lengQueShiJinXianEntity);
        this.lqj4 = lqj4;
        this.lqj4GD = lqj4GD;
        let { lqc5, lqc5GD } = dataHandler.getLQJd5(lengQueShiChuXianEntity);
        this.lqc5 = lqc5;
        this.lqc5GD = lqc5GD;
        let { lqc6, lqc6GD } = dataHandler.getLQJd6(lengQueShiChuXianEntity);
        this.lqc6 = lqc6;
        this.lqc6GD = lqc6GD;
        let { lqc7, lqc7GD } = dataHandler.getLQJd7(lengQueShiChuXianEntity);
        this.lqc7 = lqc7;
        this.lqc7GD = lqc7GD;
        let { lqc8, lqc8GD } = dataHandler.getLQJd8(lengQueShiChuXianEntity);
        this.lqc8 = lqc8;
        this.lqc8GD = lqc8GD;
        let { lqc9, lqc9GD } = dataHandler.getLQJd9(lengQueShiChuXianEntity);
        this.lqc9 = lqc9;
        this.lqc9GD = lqc9GD;
      }
    },
    async initDataMiejunqi() {
      while (true) {
        console.log("--home initDataMiejunqi--");
        if (this.isBreak) {
          break;
        }
        let { list } = await this.$get("/MiejunqiList");
        // console.log(list);
        await this.awaitTime(2000);
        if (!list) continue;
        if (list.lenght == 0) continue;
        this.info1 = list[0];
        this.info2 = list[1];
        this.info3 = list[2];
        this.info4 = list[3];
      }
    },
    async initZhuangPingList() {
      while (true) {
        console.log("--home initZhuangPingList--");
        if (this.isBreak) {
          break;
        }
        let {
          list: [zpx1, zpx2],
        } = await this.$get("/ZhuangpingxianList");
        this.zpx1 = zpx1;
        this.zpx2 = zpx2;
        await this.awaitTime(3000);
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

  created() {
    this.initData();
    this.initDataMiejunqi();
    this.initZhuangPingList();
  },
  mounted() {},
  beforeDestroy() {
    this.isBreak = true;
  },
};
</script>
<style lang="scss" scoped>
@mixin df {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  overflow: hidden;
}
$w: 56px;

@mixin position($top, $left, $w: 100%, $h: 100%) {
  position: absolute;
  top: $top;
  left: $left;
  height: $h;
  width: $w;
}
@mixin tl($top, $left) {
  position: absolute;
  top: $top;
  left: $left;
}

.home {
  width: 1920px;
  height: 1080px;
  box-sizing: border-box;
  background: url("../../public/gaitianli/bg032.jpg") center no-repeat;
  background-size: contain;
  position: relative;
  font-size: 10px;
  // background-color: #003366;
  .section-box {
    // width: 100%;
    height: 800px;
    @include tl(180px, 40px);
    color: red;
    text-align: center;
    font-size: 28px;
    display: flex;
    align-items: center;
    .border-red {
      border: 1px solid red;
      height: 100%;
      position: relative;
    }
    .f_z_22 {
      font-size: 22px;
    }
    .box-1 {
      width: 630px;
      .text1-2 {
        @include tl(250px, 260px);
      }
      .text1-1 {
        @include tl(450px, 260px);
      }
    }
    .box-2 {
      width: 225px;
    }
    .box-3 {
      width: 275px;
      height: 750px;
      .text3-2{
          @include tl(165px, 130px);
      }
      .text3-1{
          @include tl(565px, 130px);
      }
    }
    .box-4 {
      width: 610px;
      height: 580px;
    }
    .box-5 {
      width: 100px;
      height: 580px;
    }
  }

  .title {
    color: #ccffff;
    font-size: 32px;
    font-weight: 600;
    // opacity: 0.8;
    @include tl(15px, 835px);
  }
  .lqj-1 {
    @include position(344px, 1120px, 535px, 479px);
    .lq-com {
      @include df;
      @include tl(0, 0);
      width: 100%;
      height: 100%;
    }
    .lqj-1-1 {
      align-items: flex-end;
      padding: 15px 0;
    }

    .lqj-1-2 {
      padding-bottom: 28px;
      transform: rotate(-90deg);
      @include position(-28px, 28px, 478px, 535px);
      flex-direction: row;
    }
  }

  .lgj-2 {
    @include position(386px, 1307px, 311px, 397px);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .lgj-3 {
    position: relative;
    @include position(360px, 1342px, 443px, 443px);
    // border: 1px solid red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    .lgj-3-1 {
      position: absolute;
      width: 100%;
      height: 100%;
      // border: 1px solid red;
      transform: rotate(-90deg);
      z-index: 3;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .info-box-1 {
    @include tl(722px, 72px);
    color: #fff;
    display: flex;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    transform: scale(0.5);
  }
  .info-box-2 {
    @include tl(722px, 262px);
    color: #fff;
    display: flex;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    transform: scale(0.5);
  }

  .l1d1 {
    @include tl(671px, 78px);
  }
  .l1d2 {
    @include tl(836px, 125px);
    transform: rotate(-90deg);
  }
  .l1d3 {
    @include tl(535px, 170px);
  }

  .l1d4 {
    @include tl(389px, 318px);
    transform: rotate(-90deg);
  }

  .l2d1 {
    @include position(642px, 51px, 0, 0);
  }
  .l2d2 {
    @include tl(818px, 153px);
    transform: rotate(-90deg);
  }
  .l2d3 {
    @include tl(608px, 253px);
  }

  .l2d4 {
    @include tl(507px, 361px);
    transform: rotate(-90deg);
  }

  .btn-box {
    color: #fff;
    padding: 50px 50px 0 50px;
    display: flex;
    width: 300px;
    flex-wrap: wrap;
    z-index: 100;
    .btn {
      border: 1px solid #fff;
      width: 80px;
      cursor: pointer;
      margin-left: 0;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  .item-box-1 {
    @include tl(250px, 400px);
    z-index: 2;
  }
  .item-box-2 {
    @include tl(600px, 400px);
    z-index: 2;
  }
  .item-box-3 {
    @include tl(690px, 1121px);
    z-index: 2;
  }
  .item-box-4 {
    @include tl(360px, 1121px);
    z-index: 2;
  }

  .item-info-box-1 {
    @include tl(880px, 733px);
  }
  .item-info-box-2 {
    @include tl(720px, 733px);
  }
  .item-info-box-3 {
    @include tl(430px, 733px);
  }
  .item-info-box-4 {
    @include tl(270px, 733px);
  }

  .tp-box-1-1 {
    @include tl(305px, 397px);
    height: 610px;
    @include df;
  }

  .tp-box-1-2 {
    @include tl(139px, 507px);
    transform: rotate(-90deg);
  }

  .tp-box-1-3 {
    @include tl(306px, 620px);
    height: 552px;
    @include df;
  }

  .tp-box-1-4 {
    @include position(527px, 344px, 278px, $w);
    transform: rotate(90deg);
    @include df;
    flex-direction: row;
  }
  .tp-box-1-5 {
    @include position(416px, 511px, $w, 277px);
    @include df;
  }

  .tp-box-1-6 {
    @include position(777px, 539px, $w, 221px);
    @include df;
    transform: rotate(90deg);
  }
  .tp-box-1-7 {
    @include position(277px, 815px, $w, 554px);
    @include df;
    transform: rotate(-90deg);
  }
  .tp-box-1-8 {
    @include position(416px, 1120px, $w, 334px);
    @include df;
    // transform: rotate(-90deg);
  }

  .tp-box-03-01 {
    @include tl(248px, 897px);
    @include df;
    height: 667px;
  }
  .tp-box-03-02 {
    @include tl(500px, 871px);
    transform: rotate(90deg);
    width: 333px;
    @include df;
    flex-direction: row;
  }
}
</style>

