<template>
  <div class="cultivation-room">
    <div class="box-1">
      <ConveyorBox :lineNum='10' :statuArr='d1' :isShowArr='d1GD' :itemType='3' />
    </div>
    <div class="box-2">
      <ConveyorBox :lineNum='8' :statuArr='d2' :isShowArr='d2GD' :itemType='3' />
    </div>
    <div class="box-3">
      <ConveyorBox :lineNum='19' :statuArr='d3' :isShowArr='d3GD' :itemType='3' />
    </div>
    <div class="box-4">
      <ConveyorBox :lineNum='9' :statuArr='d4' :isShowArr='d4GD' :itemType='3' />

      <ConveyorBox :lineNum='7' :statuArr='d4_1' :isShowArr='d4GD_1' :itemType='3' />
    </div>

    <div class="box-5">
      <ConveyorBox :lineNum='17' :statuArr='d5' :isShowArr='d5GD' :itemType='3' />
    </div>
    <div class="box-6">
      <ConveyorBox :lineNum='12' :statuArr='d6' :isShowArr='d6GD' :itemType='3' />
    </div>
    <div class="box-7">
      <ConveyorBox :lineNum='8' :statuArr='d7' :isShowArr='d7GD' :itemType='3' />
    </div>
    <div class="box-8">
      <ConveyorBox :lineNum='4' :statuArr='d8' :isShowArr='d8GD' :itemType='3' />
    </div>
    <div class="box-9">
      <ConveyorBox :lineNum='11' :statuArr='d9' :isShowArr='d9GD' :itemType='3' />
    </div>
    <div class="box-10">
      <ConveyorBox :lineNum='10' :statuArr='d10' :isShowArr='d10GD' :itemType='3' />
    </div>
    <div class="box-11">
      <ConveyorBox :lineNum='9' :statuArr='d12' :isShowArr='d12GD' :itemType='3' />
      <ConveyorBox :lineNum='7' :statuArr='d11' :isShowArr='d11GD' :itemType='3' />
    </div>
    <div class="box-13">
      <ConveyorBox :lineNum='15' :statuArr='d13' :isShowArr='d13GD' :itemType='3' />
    </div>
    <div class="box-14">
      <ConveyorBox :lineNum='12' :statuArr='d14' :isShowArr='d14GD' :itemType='3' />
    </div>
    <div class="box-15">
      <ConveyorBox :lineNum='4' :statuArr='d15' :isShowArr='d15GD' :itemType='3' />
    </div>

    <div class="info-box">
      <strong>提升机信息</strong>
      <div class="box">
        <div v-for="(item,index) in infoList" :key="index" class="item mr_10">
          <span>{{item.id}}#:</span>
          <span>{{item.yun_xing_biao_zhi ? '运行' : '停止'}}</span>
          <span v-if="item.wai_bu_ji_ting || item.ping_zan_ting_xin_hao">---急停</span>
        </div>
        <div class="item">
          <span>7#:</span>
          <span class="mr_10">{{tiShengJi7Entity.run ? '运行' : '停止'}}</span>
          <span class="mr_10" v-if="tiShengJi7Entity.x50">三楼急停</span>
          <span class="mr_10" v-if="tiShengJi7Entity.x46">四楼急停</span>
          <span v-if="tiShengJi7Entity.x47">提升急停</span>
        </div>
        <div class="item">
          <span>8#:</span>
          <span class="mr_10">{{tiShengJi8Entity.run ? '运行' : '停止'}}</span>
          <span class="mr_10" v-if="tiShengJi8Entity.x51">三楼急停</span>
          <span class="mr_10" v-if="tiShengJi8Entity.x47">四楼急停</span>
          <span v-if="tiShengJi8Entity.x50">提升急停</span>
        </div>
      </div>

    </div>

    <div class="block-box" v-if="isInit">
      <div class="box-item ml_2">
        <Block :d='td7' :TCStyle='TCStyle[0]' :mrArr_40='[13]' />
        <div class="middle-width"></div>
        <Block :d='td8' :TCStyle='TCStyle[1]' :mrArr_20='intervalAll56' :mrArr_40='[27]' />
      </div>
      <div class="box-item ml_2">
        <Block :d='td9' :TCStyle='TCStyle[2]' :mrArr_40='[13]'  />
        <div class="middle-width"></div>
        <Block :d='td10' :TCStyle='TCStyle[3]' :mrArr_20='intervalAll56' :mrArr_40='[27]' />
      </div>

      <div class="box-item">
        <Block :d='td11' :TCStyle='TCStyle[4]' :mrArr_20='intervalAll56' :mrArr_40='[27]' />
        <div class="middle-width"></div>
        <Block :d='td12' :TCStyle='TCStyle[5]' :mrArr_20='intervalAll56' :mrArr_40='[27]' />
      </div>
      <div class="box-item">
        <Block :d='td13' :TCStyle='TCStyle[6]' :mrArr_20='intervalAll56' :mrArr_40='[27]' />
        <div class="middle-width"></div>
        <Block :d='td14' :TCStyle='TCStyle[7]' :mrArr_20='intervalAll56' :mrArr_40='[27]' />
      </div>

      <div class="box-item">
        <Block :d='td15' :TCStyle='TCStyle[8]' :mrArr_20='intervalAll56' :mrArr_40='[27]' />
        <div class="middle-width"></div>
        <Block :d='td16' :TCStyle='TCStyle[9]' :mrArr_20='intervalAll42' :mrArr_40='[27]' />
      </div>

      <div class="box-item">
        <Block :d='td17' :TCStyle='TCStyle[10]' :mrArr_20='intervalAll56' :mrArr_40='[27]' />
        <div class="middle-width"></div>
        <Block :d='td18' :TCStyle='TCStyle[11]' :mrArr_20='intervalAll42' :mrArr_40='[27]' />
      </div>
    </div>

  
  </div>
</template>
<script>
import dh from "./dh.js";
import kuDH from "@/views/kuDH.js";
import ConveyorBox from "@/views/ConveyorBox.vue";
import Block from "@/components/Block.vue";
import MyCanvas from "@/components/MyCanvas.vue";
export default {
  data() {
    return {
      isInit: false,
      isBreak: false,
      infoList: [],
      dayList: [], //天数
      tiShengJi7Entity: {},
      tiShengJi8Entity: {},
      TCStyle: [], //天车和抓手的数据
      intervalAll67: [9, 16, 23, 30, 37, 44, 51, 58],
      intervalAll56: [6, 13, 20, 27, 34, 41, 48],
      intervalAll42: [6, 13, 20, 27, 34],
      intervalAll49: [6, 13, 20, 34, 41],
      ts: 0,
      d1: [],
      d1GD: [],
      d2: [],
      d2GD: [],
      d3: [],
      d3GD: [],
      d4: [],
      d4GD: [],
      d4_1: [],
      d4GD_1: [],
      d5: [],
      d5GD: [],
      d6: [],
      d6GD: [],
      d7: [],
      d7GD: [],
      d8: [],
      d8GD: [],
      d9: [],
      d9GD: [],
      d10: [],
      d10GD: [],
      d11: [],
      d11GD: [],
      d12: [],
      d12GD: [],
      d13: [],
      d13GD: [],
      d14: [],
      d14GD: [],
      d15: [],
      d15GD: [],

      td7: [],
      td8: [],
      td9: [],
      td10: [],

      td11: [],
      td12: [],
      td13: [],
      td14: [],

      td15: [],
      td16: [],
      td17: [],
      td18: [],
    };
  },
  components: {
    ConveyorBox,
    Block,
    MyCanvas,
  },

  async created() {
    this.initData();
    this.initTSJ();

    this.getDays();
  },

  methods: {
    async getDays() {
      while (true) {
        if (this.isBreak) {
          break;
        }

        try {
          let res = await this.$get("TianCheKuangDbList/3");
          let { list } = res;
          console.log("天数-----", res);
          this.dayList = list || [];
          await this.getTCData();

          this.isInit = true;
        } catch (error) {}

        await this.awaitTime(1500);
      }
    },

    //天车
    async getTCData() {
      let res = await this.$get("/TianCheList/3");
      let tc = res.list || [];
      // console.log('---天车---',tc);

        // tc = [
        //   {
        //     ID: 17,
        //     DongZuoZhuangTai: 2,
        //     X1: -23769,
        //     X2: -23768,
        //     Y1: 1500,
        //     Ceng_Num1: 1,
        //     Ceng_Num2: 16,
        //     Ceng_Num3: 16,
        //     Ceng_Num56: 16,
        //   },
        // ];



      let TCStyle = kuDH.createTCStyle(tc);
      this.TCStyle = TCStyle;

      this.td7 = kuDH.getKuData({ d: this.dayList, kuHao: 7, tcd: tc[0] });
      this.td8 = kuDH.getKuData({ d: this.dayList, kuHao: 8,  lie: 57, tcd: tc[1] });

      this.td9 = kuDH.getKuData({ d: this.dayList, kuHao: 9, tcd: tc[2] });
      this.td10 = kuDH.getKuData({ d: this.dayList, kuHao: 10,  lie: 57, tcd: tc[3] });

      this.td11 = kuDH.getKuData({
        d: this.dayList,
        kuHao: 11,
        lie: 57,
        tcd: tc[4],
      });
      this.td12 = kuDH.getKuData({
        d: this.dayList,
        kuHao: 12,
        lie: 57,
        tcd: tc[5],
      });
      this.td13 = kuDH.getKuData({
        d: this.dayList,
        kuHao: 13,
        lie: 57,
        tcd: tc[6],
      });
      this.td14 = kuDH.getKuData({
        d: this.dayList,
        kuHao: 14,
        lie: 57,
        tcd: tc[7],
      });

      this.td15 = kuDH.getKuData({
        d: this.dayList,
        kuHao: 15,
        lie: 57,
        tcd: tc[8],
      });
      this.td16 = kuDH.getKuData({ d: this.dayList, kuHao: 16, tcd: tc[9] });

      // let tcdText = {
      //   ID: 17,
      //   DongZuoZhuangTai: 2,
      //   X1: -23769,
      //   X2: -23768,
      //   Y1: 1500,
      //   Ceng_Num1: 1,
      //   Ceng_Num2: 16,
      //   Ceng_Num3: 16,
      //   Ceng_Num56: 16,
      // };

      this.td17 = kuDH.getKuData({
        d: this.dayList,
        kuHao: 17,
        lie: 57,
        tcd: tc[10],
        // tcd: tcdText,
      });

      this.td18 = kuDH.getKuData({ d: this.dayList, kuHao: 18, tcd: tc[11] });
    },

    async initData() {
      while (true) {
        // console.log("--cultivationRoom initData--");
        if (this.isBreak) {
          break;
        }

        try {
          let res = await this.$get("/SanLouPeiyangShiList");
          let {
            sanloupeiyangshiajinxian: { sanLouPeiYangShiAJinXianEntity },
            sanloupeiyangshiachuxian: { sanLouPeiYangShiAChuXianEntity },
            sanloupeiyangshibchuxian: { sanLouPeiYangShiBChuXianEntity },
            sanloupeiyangshibjinxian: { sanLouPeiYangShiBJinXianEntity },
          } = res;

          let [d1, d1GD] = dh.getD1(sanLouPeiYangShiAJinXianEntity);
          this.d1 = d1;
          this.d1GD = d1GD;
          let [d2, d2GD] = dh.getD2(sanLouPeiYangShiAJinXianEntity);
          this.d2 = d2;
          this.d2GD = d2GD;
          let [d3, d3GD] = dh.getD3(sanLouPeiYangShiAJinXianEntity);
          this.d3 = d3;
          this.d3GD = d3GD;
          let [d4_1, d4GD_1] = dh.getD4_1(sanLouPeiYangShiAJinXianEntity);
          this.d4_1 = d4_1;
          this.d4GD_1 = d4GD_1;

          let [d4, d4GD] = dh.getD4(sanLouPeiYangShiAChuXianEntity);
          this.d4 = d4;
          this.d4GD = d4GD;
          let [d5, d5GD] = dh.getD5(sanLouPeiYangShiAChuXianEntity);
          this.d5 = d5;
          this.d5GD = d5GD;
          let [d6, d6GD] = dh.getD6(sanLouPeiYangShiAChuXianEntity);
          this.d6 = d6;
          this.d6GD = d6GD;
          let [d7, d7GD] = dh.getD7(sanLouPeiYangShiAChuXianEntity);
          this.d7 = d7;
          this.d7GD = d7GD;

          let [d8, d8GD] = dh.getD8(sanLouPeiYangShiBJinXianEntity);
          this.d8 = d8;
          this.d8GD = d8GD;
          let [d9, d9GD] = dh.getD9(sanLouPeiYangShiBJinXianEntity);
          this.d9 = d9;
          this.d9GD = d9GD;
          let [d10, d10GD] = dh.getD10(sanLouPeiYangShiBJinXianEntity);
          this.d10 = d10;
          this.d10GD = d10GD;
          let [d11, d11GD] = dh.getD11(sanLouPeiYangShiBJinXianEntity);
          this.d11 = d11;
          this.d11GD = d11GD;
          let [d12, d12GD] = dh.getD12(sanLouPeiYangShiBJinXianEntity);
          this.d12 = d12;
          this.d12GD = d12GD;

          let [d13, d13GD] = dh.getD13(sanLouPeiYangShiBChuXianEntity);
          this.d13 = d13;
          this.d13GD = d13GD;

          let [d14, d14GD] = dh.getD14(sanLouPeiYangShiBChuXianEntity);
          this.d14 = d14;
          this.d14GD = d14GD;

          let [d15, d15GD] = dh.getD15(sanLouPeiYangShiBChuXianEntity);
          this.d15 = d15;
          this.d15GD = d15GD;
        } catch (error) {}

        await this.awaitTime(1500);
      }
    },

    //提升机
    async initTSJ() {
      while (true) {
        if (this.isBreak) {
          break;
        }

        try {
          let res = await this.$get("/TiShengJiList");
          let {
            tishengji: { list },
            tishengji7: { tiShengJi7Entity },
            tishengji8: { tiShengJi8Entity },
          } = res;
          this.tiShengJi7Entity = tiShengJi7Entity;
          this.tiShengJi8Entity = tiShengJi8Entity;

          this.infoList = list;
        } catch (error) {}

        // console.log(res);
        await this.awaitTime(1500);
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
  // border: 1px solid red;
}
.cultivation-room {
  width: 1920px;
  height: 1080px;
  box-sizing: border-box;
  background: url("../../../public/gaitianli/bg-3.png") center no-repeat;
  background-size: contain;
  position: relative;
  font-size: 10px;
  .tc-arr {
    border: 2px solid red;
    width: 150px;
    @include tl(605px, 83px);
    color: #fff;
    .item{
      display: flex;
    }
  }
  .mr_10 {
    margin-right: 10px;
  }
  .block-box {
    @include tl(60px, 241px);
    // border: 1px solid red;
    // display: flex;
    // flex-direction: column;
    .box-item {
      display: flex;
      margin-top: 35px;
      &.ml_2 {
        padding-left: 189px;
        box-sizing: border-box;
      }
      .middle-width {
        flex: 0 0 55px;
      }
    }
  }

    .info-box {
    @include tl(60px, 50px);
    width: 190px;
    padding: 10px 5px;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.9);
    .box {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .box-1 {
    @include tl(697px, 1810px);
    transform: rotate(-90deg);
  }

  .box-2 {
    @include tl(735px, 1850px);
  }
  .box-3 {
    @include tl(462px, 1240px);
    transform: rotate(-90deg);
  }
  .box-4 {
    width: 38px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include tl(115px, 612px);
  }

  .box-5 {
    @include tl(780px, 334px);
    transform: rotate(-90deg);
  }
  .box-6 {
    @include tl(160px, 37px);
  }
  .box-7 {
    @include tl(115px, 78px);
    transform: rotate(-90deg);
  }
  .box-8 {
    @include tl(761px, 1800px);
    transform: rotate(-90deg);
  }
  .box-9 {
    @include tl(780px, 1825px);
  }

  .box-10 {
    @include tl(862px, 1635px);
    transform: rotate(-90deg);
  }

  .box-11 {
    width: 39px;
    display: flex;
    justify-content: space-between;
    @include tl(115px, 1447px);
    align-items: center;
  }

  .box-13 {
    @include tl(369px, 760px);
    transform: rotate(-90deg);
  }

  .box-14 {
    @include tl(205px, 63px);
  }

  .box-15 {
    @include tl(174px, 95px);
    transform: rotate(-90deg);
  }
}
</style>