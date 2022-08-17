<template>
  <div class="cultivation-room">
    <div class="box-1">
      <ConveyorBox
        :lineNum='10'
        :statuArr='d1'
        :isShowArr='d1GD'
        :itemType='3'
      />
    </div>
    <div class="box-2">
      <ConveyorBox
        :lineNum='8'
        :statuArr='d2'
        :isShowArr='d2GD'
        :itemType='3'
      />
    </div>
    <div class="box-3">
      <ConveyorBox
        :lineNum='19'
        :statuArr='d3'
        :isShowArr='d3GD'
        :itemType='3'
      />
    </div>
    <div class="box-4">
      <ConveyorBox
        :lineNum='9'
        :statuArr='d4'
        :isShowArr='d4GD'
        :itemType='3'
      />

      <ConveyorBox
        :lineNum='7'
        :statuArr='d4_1'
        :isShowArr='d4GD_1'
        :itemType='3'
      />
    </div>

    <div class="box-5">
      <ConveyorBox
        :lineNum='17'
        :statuArr='d5'
        :isShowArr='d5GD'
        :itemType='3'
      />
    </div>
    <div class="box-6">
      <ConveyorBox
        :lineNum='12'
        :statuArr='d6'
        :isShowArr='d6GD'
        :itemType='3'
      />
    </div>
    <div class="box-7">
      <ConveyorBox
        :lineNum='8'
        :statuArr='d7'
        :isShowArr='d7GD'
        :itemType='3'
      />
    </div>
    <div class="box-8">
      <ConveyorBox
        :lineNum='4'
        :statuArr='d8'
        :isShowArr='d8GD'
        :itemType='3'
      />
    </div>
    <div class="box-9">
      <ConveyorBox
        :lineNum='11'
        :statuArr='d9'
        :isShowArr='d9GD'
        :itemType='3'
      />
    </div>
    <div class="box-10">
      <ConveyorBox
        :lineNum='10'
        :statuArr='d10'
        :isShowArr='d10GD'
        :itemType='3'
      />
    </div>
    <div class="box-11">
      <ConveyorBox
        :lineNum='9'
        :statuArr='d12'
        :isShowArr='d12GD'
        :itemType='3'
      />
      <ConveyorBox
        :lineNum='7'
        :statuArr='d11'
        :isShowArr='d11GD'
        :itemType='3'
      />
    </div>
    <div class="box-13">
      <ConveyorBox
        :lineNum='15'
        :statuArr='d13'
        :isShowArr='d13GD'
        :itemType='3'
      />
    </div>
    <div class="box-14">
      <ConveyorBox
        :lineNum='12'
        :statuArr='d14'
        :isShowArr='d14GD'
        :itemType='3'
      />
    </div>
    <div class="box-15">
      <ConveyorBox
        :lineNum='4'
        :statuArr='d15'
        :isShowArr='d15GD'
        :itemType='3'
      />
    </div>

    <div class="info-box">
      <strong>提升机信息</strong>
      <div class="box">
        <div
          v-for="(item,index) in infoList"
          :key="index"
          class="item mr_10"
        >
          <span>{{item.id}}#:</span>
          <span>{{item.yun_xing_biao_zhi ? '运行' : '停止'}}</span>
          <span v-if="item.wai_bu_ji_ting || item.ping_zan_ting_xin_hao">---急停</span>
        </div>
        <div class="item">
          <span>7#:</span>
          <span class="mr_10">{{tiShengJi7Entity.run ? '运行' : '停止'}}</span>
          <span
            class="mr_10"
            v-if="tiShengJi7Entity.x50"
          >三楼急停</span>
          <span
            class="mr_10"
            v-if="tiShengJi7Entity.x46"
          >四楼急停</span>
          <span v-if="tiShengJi7Entity.x47">提升急停</span>
        </div>
        <div class="item">
          <span>8#:</span>
          <span class="mr_10">{{tiShengJi8Entity.run ? '运行' : '停止'}}</span>
          <span
            class="mr_10"
            v-if="tiShengJi8Entity.x51"
          >三楼急停</span>
          <span
            class="mr_10"
            v-if="tiShengJi8Entity.x47"
          >四楼急停</span>
          <span v-if="tiShengJi8Entity.x50">提升急停</span>
        </div>
      </div>

    </div>

    <div class="block-box">
      <div class="box-item ml_2">
        <Block :d='td7' />
        <div class="middle-width"></div>
        <Block :d='td8' :mrArr_20='intervalAll42' :mrArr_40='[27]' />
      </div>
      <div class="box-item ml_2">
        <Block :d='td9' />
        <div class="middle-width"></div>
        <Block :d='td10' :mrArr_20='intervalAll42' :mrArr_40='[27]' />
      </div>

      <div class="box-item">
        <Block :d='td11' :mrArr_20='intervalAll56' :mrArr_40='[27]'  />
        <div class="middle-width"></div>
        <Block :d='td12' :mrArr_20='intervalAll56' :mrArr_40='[27]' />
      </div>
      <div class="box-item">
        <Block :d='td13' :mrArr_20='intervalAll56' :mrArr_40='[27]'  />
        <div class="middle-width"></div>
        <Block :d='td14' :mrArr_20='intervalAll56' :mrArr_40='[27]' />
      </div>

      <div class="box-item">
        <Block :d='td15' :mrArr_20='intervalAll56' :mrArr_40='[27]'  />
        <div class="middle-width"></div>
        <Block :d='td16' :mrArr_20='intervalAll56' :mrArr_40='[27]' />
      </div>

      <div class="box-item">
        <Block :d='td17' :mrArr_20='intervalAll56' :mrArr_40='[27]'  />
        <div class="middle-width"></div>
        <Block :d='td18' :mrArr_20='intervalAll56' :mrArr_40='[27]' />
      </div>


    </div>
  </div>
</template>
<script>
// import td from "./testData";
import dh from "./dh.js";
import kuDH from "@/views/kuDH.js";
import ConveyorBox from "@/views/ConveyorBox.vue";
import Block from "@/components/Block.vue";
import MyCanvas from "@/components/MyCanvas.vue";
export default {
  data() {
    return {
      isBreak: false,
      infoList: [],
      dayList: [], //天数
      tiShengJi7Entity: {},
      tiShengJi8Entity: {},
      intervalAll56:[6,13,20,34,41,48],
      intervalAll42:[6,13,20,34],
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

    this.getTCData();
    this.getDays();
  },


  methods: {
    async getDays() {
      while (true) {
        if (this.isBreak) {
          break;
        }
        let res = await this.$get("TianCheKuangDbList/3");
        console.log("天数-----", res.list);
        this.dayList = res.list;
        await this.awaitTime(30000);
      }
    },

    //天车
    async getTCData() {
      let arr = [
        {
          ID: 21,
          KuHao: 23,
          Lie: 1,
          Ceng: 1,
          Days: 48,
        },
        {
          ID: 21,
          KuHao: 23,
          Lie: 1,
          Ceng: 2,
          Days: 47,
        },
        {
          ID: 22,
          KuHao: 23,
          Lie: 2,
          Ceng: 1,
          Days: 49,
        },
        {
          ID: 23,
          KuHao: 23,
          Lie: 1,
          Ceng: 1,
          Days: 43,
        },
        {
          ID: 26,
          KuHao: 24,
          Lie: 22,
          Ceng: 1,
          Days: 49,
        },
        {
          ID: 29,
          KuHao: 23,
          Lie: -2,
          Ceng: 1,
          Days: 49,
        },
        {
          ID: 30,
          KuHao: 23,
          Lie: 20,
          Ceng: 1,
          Days: 48,
        },
        {
          ID: 30,
          KuHao: 23,
          Lie: 10,
          Ceng: 1,
          Days: 48,
        },
      ];
      // this.dayList = arr;

      let tstc = [
        {
          ID: 7,
          YunXingZhuangTai: 1,
          DongZuoZhuangTai: 2,
          ZhuaShouZhuangTai: 1,
          X1: 16136,
          X2: 16136,
          Y1: 6762,
          Ceng_Num_m3: 6,
          Ceng_Num1: 6,
          Ceng_Num2: 3,
        },
        {
          ID: 8,
          YunXingZhuangTai: 1,
          DongZuoZhuangTai: 2,
          ZhuaShouZhuangTai: 1,
          X1: 1328,
          X2: 1326,
          Ceng_Num_m4: 6,
          Ceng_Num29: 10,
          Ceng_Num30: 10,
          Ceng_Num31: 10,
          Ceng_Num32: 10,
          Ceng_Num33: 10,
          Ceng_Num34: 10,
          Ceng_Num35: 10,
          Ceng_Num36: 5,
        },
        {
          ID: 9,
          YunXingZhuangTai: 1,
          DongZuoZhuangTai: 2,
          ZhuaShouZhuangTai: 1,
          X1: 2098,
          X2: 2102,
        },
        {
          ID: 10,
          YunXingZhuangTai: 1,
          DongZuoZhuangTai: 2,
          ZhuaShouZhuangTai: 1,
          X1: -21781,
          X2: -21791,
        },
        {
          ID: 11,
          YunXingZhuangTai: 1,
          DongZuoZhuangTai: 2,
          ZhuaShouZhuangTai: 1,
          X1: 2779,
          X2: 2776,
          Y1: 1,
          Ceng_Num15: 16,
          Ceng_Num16: 16,
          Ceng_Num17: 16,
          Ceng_Num18: 16,
          Ceng_Num19: 16,
          Ceng_Num20: 16,
          Ceng_Num21: 11,
          Ceng_Num22: 16,
          Ceng_Num23: 16,
          Ceng_Num24: 16,
          Ceng_Num25: 16,
          Ceng_Num26: 16,
          Ceng_Num27: 16,
          Ceng_Num28: 11,
          Ceng_Num29: 16,
          Ceng_Num30: 16,
          Ceng_Num31: 16,
          Ceng_Num32: 16,
          Ceng_Num33: 16,
          Ceng_Num34: 16,
          Ceng_Num35: 14,
          Ceng_Num36: 16,
          Ceng_Num37: 16,
          Ceng_Num38: 16,
          Ceng_Num39: 16,
          Ceng_Num40: 16,
          Ceng_Num41: 16,
          Ceng_Num42: 13,
          Ceng_Num43: 16,
          Ceng_Num44: 16,
          Ceng_Num45: 16,
          Ceng_Num46: 16,
          Ceng_Num47: 16,
          Ceng_Num48: 16,
          Ceng_Num49: 13,
          Ceng_Num50: 16,
          Ceng_Num51: 16,
          Ceng_Num52: 16,
          Ceng_Num53: 16,
          Ceng_Num54: 16,
          Ceng_Num55: 16,
          Ceng_Num56: 12,
        },
        {
          ID: 12,
          YunXingZhuangTai: 1,
          DongZuoZhuangTai: 1,
          ZhuaShouZhuangTai: 1,
          X1: -77152,
          X2: -77144,
          Y1: 669,
          Ceng_Num1: 16,
          Ceng_Num2: 16,
          Ceng_Num3: 16,
          Ceng_Num4: 16,
          Ceng_Num5: 16,
          Ceng_Num6: 16,
          Ceng_Num7: 12,
          Ceng_Num8: 16,
          Ceng_Num9: 16,
          Ceng_Num10: 16,
          Ceng_Num11: 16,
          Ceng_Num12: 16,
          Ceng_Num13: 16,
          Ceng_Num14: 12,
        },
        {
          ID: 13,
          YunXingZhuangTai: 1,
          DongZuoZhuangTai: 2,
          ZhuaShouZhuangTai: 1,
          X1: -92769,
          X2: -92758,
          Ceng_Num15: 16,
          Ceng_Num16: 16,
          Ceng_Num17: 16,
          Ceng_Num18: 16,
          Ceng_Num19: 16,
          Ceng_Num20: 16,
          Ceng_Num21: 7,
          Ceng_Num22: 16,
          Ceng_Num23: 16,
          Ceng_Num24: 16,
          Ceng_Num25: 16,
          Ceng_Num26: 16,
          Ceng_Num27: 16,
          Ceng_Num28: 7,
          Ceng_Num29: 16,
          Ceng_Num30: 16,
          Ceng_Num31: 16,
          Ceng_Num32: 16,
          Ceng_Num33: 16,
          Ceng_Num34: 16,
          Ceng_Num35: 10,
          Ceng_Num36: 16,
          Ceng_Num37: 16,
          Ceng_Num38: 16,
          Ceng_Num39: 16,
          Ceng_Num40: 16,
          Ceng_Num41: 16,
          Ceng_Num42: 11,
          Ceng_Num43: 16,
          Ceng_Num44: 16,
          Ceng_Num45: 16,
          Ceng_Num46: 16,
          Ceng_Num47: 16,
          Ceng_Num48: 16,
          Ceng_Num49: 11,
          Ceng_Num50: 16,
          Ceng_Num51: 16,
          Ceng_Num52: 16,
          Ceng_Num53: 16,
          Ceng_Num54: 16,
          Ceng_Num55: 16,
          Ceng_Num56: 8,
        },
        {
          ID: 14,
          YunXingZhuangTai: 1,
          DongZuoZhuangTai: 1,
          ZhuaShouZhuangTai: 1,
          X1: -77188,
          X2: -77182,
          Y1: 661,
          Ceng_Num1: 16,
          Ceng_Num2: 16,
          Ceng_Num3: 16,
          Ceng_Num4: 16,
          Ceng_Num5: 16,
          Ceng_Num6: 16,
          Ceng_Num7: 9,
          Ceng_Num8: 16,
          Ceng_Num9: 16,
          Ceng_Num10: 16,
          Ceng_Num11: 16,
          Ceng_Num12: 16,
          Ceng_Num13: 16,
          Ceng_Num14: 8,
        },
        {
          ID: 15,
          YunXingZhuangTai: 1,
          DongZuoZhuangTai: 1,
          ZhuaShouZhuangTai: 1,
          X1: 159756,
          X2: 159750,
          Y1: 729,
          Ceng_Num1: 16,
          Ceng_Num2: 16,
          Ceng_Num3: 16,
          Ceng_Num4: 16,
          Ceng_Num5: 16,
          Ceng_Num6: 16,
          Ceng_Num7: 15,
          Ceng_Num8: 16,
          Ceng_Num9: 16,
          Ceng_Num10: 16,
          Ceng_Num11: 16,
          Ceng_Num12: 16,
          Ceng_Num13: 16,
          Ceng_Num14: 13,
          Ceng_Num15: 16,
          Ceng_Num16: 16,
          Ceng_Num17: 16,
          Ceng_Num18: 16,
          Ceng_Num19: 16,
          Ceng_Num20: 16,
          Ceng_Num21: 13,
          Ceng_Num22: 16,
          Ceng_Num23: 16,
          Ceng_Num24: 16,
          Ceng_Num25: 16,
          Ceng_Num26: 16,
          Ceng_Num27: 16,
          Ceng_Num28: 14,
          Ceng_Num29: 16,
          Ceng_Num30: 16,
          Ceng_Num31: 16,
          Ceng_Num32: 16,
          Ceng_Num33: 16,
          Ceng_Num34: 16,
          Ceng_Num35: 12,
          Ceng_Num36: 16,
          Ceng_Num37: 16,
          Ceng_Num38: 16,
          Ceng_Num39: 16,
          Ceng_Num40: 16,
          Ceng_Num41: 16,
          Ceng_Num42: 10,
          Ceng_Num43: 16,
          Ceng_Num44: 16,
          Ceng_Num45: 13,
          Ceng_Num46: 16,
          Ceng_Num47: 16,
          Ceng_Num48: 16,
          Ceng_Num49: 16,
          Ceng_Num50: 16,
          Ceng_Num51: 16,
          Ceng_Num52: 16,
          Ceng_Num53: 16,
          Ceng_Num54: 16,
          Ceng_Num55: 16,
          Ceng_Num56: 10,
        },
        {
          ID: 16,
          YunXingZhuangTai: 1,
          DongZuoZhuangTai: 1,
          ZhuaShouZhuangTai: 1,
          X1: 1468,
          X2: 1473,
          Ceng_Num1: 16,
          Ceng_Num2: 16,
          Ceng_Num3: 16,
          Ceng_Num4: 16,
          Ceng_Num5: 16,
          Ceng_Num6: 16,
          Ceng_Num7: 6,
          Ceng_Num8: 16,
          Ceng_Num9: 16,
          Ceng_Num10: 16,
          Ceng_Num11: 16,
          Ceng_Num12: 16,
          Ceng_Num13: 16,
          Ceng_Num14: 16,
        },
        {
          ID: 17,
          YunXingZhuangTai: 1,
          DongZuoZhuangTai: 1,
          ZhuaShouZhuangTai: 1,
          X1: 159730,
          X2: 159744,
          Y1: 672,
          Ceng_Num1: 16,
          Ceng_Num2: 16,
          Ceng_Num3: 16,
          Ceng_Num4: 16,
          Ceng_Num5: 9,
          Ceng_Num8: 16,
          Ceng_Num9: 16,
          Ceng_Num10: 16,
          Ceng_Num11: 16,
          Ceng_Num12: 16,
          Ceng_Num13: 16,
          Ceng_Num14: 10,
          Ceng_Num15: 16,
          Ceng_Num16: 16,
          Ceng_Num17: 16,
          Ceng_Num18: 16,
          Ceng_Num19: 16,
          Ceng_Num20: 16,
          Ceng_Num21: 9,
          Ceng_Num22: 16,
          Ceng_Num23: 16,
          Ceng_Num24: 16,
          Ceng_Num25: 16,
          Ceng_Num26: 16,
          Ceng_Num27: 16,
          Ceng_Num28: 5,
          Ceng_Num29: 16,
          Ceng_Num30: 16,
          Ceng_Num31: 16,
          Ceng_Num32: 16,
          Ceng_Num33: 16,
          Ceng_Num34: 16,
          Ceng_Num35: 10,
          Ceng_Num36: 16,
          Ceng_Num37: 16,
          Ceng_Num38: 16,
          Ceng_Num39: 16,
          Ceng_Num40: 16,
          Ceng_Num41: 16,
          Ceng_Num42: 6,
          Ceng_Num43: 16,
          Ceng_Num44: 16,
          Ceng_Num45: 6,
          Ceng_Num46: 16,
          Ceng_Num47: 16,
          Ceng_Num48: 16,
          Ceng_Num49: 16,
          Ceng_Num50: 16,
          Ceng_Num51: 16,
          Ceng_Num52: 16,
          Ceng_Num53: 16,
          Ceng_Num54: 16,
          Ceng_Num55: 16,
          Ceng_Num56: 6,
        },
        {
          ID: 18,
          YunXingZhuangTai: 1,
          DongZuoZhuangTai: 1,
          ZhuaShouZhuangTai: 1,
          X1: -113186,
          X2: -113185,
          Y1: 683,
          Ceng_Num1: 16,
          Ceng_Num2: 16,
          Ceng_Num3: 16,
          Ceng_Num4: 16,
          Ceng_Num5: 16,
          Ceng_Num6: 16,
          Ceng_Num7: 3,
          Ceng_Num8: 16,
          Ceng_Num9: 16,
          Ceng_Num10: 16,
          Ceng_Num11: 16,
          Ceng_Num12: 16,
          Ceng_Num13: 16,
        },
      ];

      while (true) {
        if (this.isBreak) {
          break;
        }

        let res = await this.$get("/TianCheList/3");
        let tc = res.list;

        // tc = tstc
        console.log("天车-----", this.dayList);

        this.td7 = kuDH.getKuData({ d: this.dayList, kuHao: 7, tcd: tc[0] });
        this.td8 = kuDH.getKuData({ d: this.dayList, kuHao: 8, tcd: tc[1] });

        this.td9 = kuDH.getKuData({ d: this.dayList, kuHao: 9, tcd: tc[2] });
        this.td10 = kuDH.getKuData({ d: this.dayList, kuHao: 10, tcd: tc[3] });

        this.td11 = kuDH.getKuData({ d: this.dayList, kuHao: 11, lie:57, tcd: tc[4] });
        this.td12 = kuDH.getKuData({ d: this.dayList, kuHao: 12, lie:57, tcd: tc[5] });
        this.td13 = kuDH.getKuData({ d: this.dayList, kuHao: 13, lie:57, tcd: tc[6] });
        this.td14 = kuDH.getKuData({ d: this.dayList, kuHao: 14, lie:57, tcd: tc[7] });

        this.td15 = kuDH.getKuData({ d: this.dayList, kuHao: 15, lie:57, tcd: tc[6] });
        this.td16 = kuDH.getKuData({ d: this.dayList, kuHao: 16, tcd: tc[7] });
        this.td17 = kuDH.getKuData({ d: this.dayList, kuHao: 17, lie:57, tcd: tc[6] });
        this.td18 = kuDH.getKuData({ d: this.dayList, kuHao: 18, tcd: tc[7] });


        // console.log(this.td7);

        await this.awaitTime(3000);
      }
    },

    createData() {
      let arr = [];
      let str = "16_";
      let start = 0;
      let sum = 8;
      for (let i = start; i < sum; i++) {
        arr.push(str + i);
        // arr.push(str + i + '_1');
      }
      // console.log(arr);
      // console.log(arr.reverse());
    },

    pushItem(n, arr) {
      for (let i = 0; i < n; i++) {
        arr.push(1);
      }
    },
    async initData() {
      // let { aj, ac, bj, bc } = td;
      while (true) {
        // console.log("--cultivationRoom initData--");
        if (this.isBreak) {
          break;
        }
        let res = await this.$get("/SanLouPeiyangShiList");
        let {
          sanloupeiyangshiajinxian: { sanLouPeiYangShiAJinXianEntity },
          sanloupeiyangshiachuxian: { sanLouPeiYangShiAChuXianEntity },
          sanloupeiyangshibchuxian: { sanLouPeiYangShiBChuXianEntity },
          sanloupeiyangshibjinxian: { sanLouPeiYangShiBJinXianEntity },
        } = res;

        // console.log(res);
        // sanLouPeiYangShiAJinXianEntity = aj;
        // sanLouPeiYangShiAChuXianEntity = ac;
        // sanLouPeiYangShiBJinXianEntity = bj;
        // sanLouPeiYangShiBChuXianEntity = bc;

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
        await this.awaitTime(2000);
      }
    },

    //提升机
    async initTSJ() {
      while (true) {
        if (this.isBreak) {
          break;
        }

        let res = await this.$get("/TiShengJiList");

        let {
          tishengji: { list },
          tishengji7: { tiShengJi7Entity },
          tishengji8: { tiShengJi8Entity },
        } = res;
        // list[0].wai_bu_ji_ting = 0
        // list[0].ping_zan_ting_xin_hao = 0
        this.tiShengJi7Entity = tiShengJi7Entity;
        this.tiShengJi8Entity = tiShengJi8Entity;

        this.infoList = list;
        // console.log(res);
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

  .mr_10 {
    margin-right: 10px;
  }
  .block-box {
    @include tl(120px, 241px);
    // border: 1px solid red;
    // display: flex;
    // flex-direction: column;
    .box-item {
      display: flex;
      margin-top: 20px;
      &.ml_2 {
        padding-left: 189px;
        box-sizing: border-box;
      }
      .middle-width {
        flex: 0 0 55px
      }
    }
  }

  .info-box {
    @include tl(260px, 220px);
    width: 190px;
    padding: 10px 5px;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.9);
    .box {
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      // .item{
      //   margin-right: 5px;
      // }
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
    @include tl(464px, 1240px);
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
    @include tl(781px, 334px);
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
    @include tl(371px, 760px);
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