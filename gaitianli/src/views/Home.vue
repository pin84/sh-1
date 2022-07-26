<template>
  <div class="home">
    <div class="btn-box">
      <el-button
        @click="test(idx)"
        class="btn"
        v-for="(item,idx) in btnList"
        :key="idx"
        type="primary"
      >{{item}}</el-button>
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


    <!-- 
      lineNum:
      itemType:1为小的，其他为大的
     -->

    <div class="l1d1">
      <ConveyorBox  :lineNum='6' :statuArr='l1d1' :isShowArr='l1d1GD' :itemType='1' />
    </div>
    <div class="l1d2">
      <ConveyorBox :lineNum='5'   :statuArr='l1d2'  :isShowArr='l1d2GD' :itemType='1'  />
    </div>

    <div class="l1d4">
      <ConveyorBox :lineNum='10'   :statuArr='l1d4'  :isShowArr='l1d4GD' :itemType='1'  />
    </div>

   
    <div class="tp-box-1-1">
        <ConveyorBox  :lineNum='5' :statuArr='l1d5'  :isShowArr='l1d5GD'   />
    </div>
    <div class="tp-box-1-2">
        <ConveyorBox  :lineNum='5' :statuArr='l1d6'  :isShowArr='l1d6GD'   />
    </div>
    <div class="tp-box-1-3">
        <ConveyorBox  :lineNum='5' :statuArr='l1d7'  :isShowArr='l1d7GD'   />
    </div>
    <div class="tp-box-03-01">
        <ConveyorBox  :lineNum='5' :statuArr='l1d8'  :isShowArr='l1d8GD'   />
    </div>
    <div class="tp-box-03-02">
        <ConveyorBox  :lineNum='5' :statuArr='l1d9'  :isShowArr='l1d9GD'   />
    </div>
  </div>
</template>

<script>
import testData from '@/views/testData.js'
import tpss from '@/views/tpss.js'
import dataHandler from "@/views/dataHandler.js";
import Item from "@/views/Item.vue";
import Item2 from "@/views/Item-2.vue";
import Item3 from "@/views/Item-3.vue";
import Item4 from "@/views/Item-4.vue";
import Info from "@/views/Info.vue";
import ConveyorBox from '@/views/ConveyorBox.vue'

export default {
  components: {
    Item,
    Item2,
    Item3,
    Item4,
    Info,
    ConveyorBox
  },
  props: {},
  data() {
    return {
      testData:[0,1,2,0,1],
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
      l1d1GD:[] , // 1线装瓶光电信号1

      l1d2: [], //1线装瓶电机信号2
      l1d2GD:[] , // 1线装瓶光电信号2

      l1d4: [], //1线装瓶电机信号2
      l1d4GD:[] , // 1线装瓶光电信号2


      l1d5: [], //1线托盘传送线电机信号1
      l1d5GD:[] , // 1线托盘传送线光电信号1

      l1d6: [], //1线托盘传送线电机信号
      l1d6GD:[] , // 1线托盘传送线光电信号

      l1d7: [], //1线托盘传送线电机信号
      l1d7GD:[] , // 1线托盘传送线光电信号
      l1d8: [], //1线托盘传送线电机信号
      l1d8GD:[] , // 1线托盘传送线光电信号
      l1d9: [], //1线托盘传送线电机信号
      l1d9GD:[] , // 1线托盘传送线光电信号


    };
  },
  methods: {
    test(idx) {
      console.log(idx);
      if(idx <= 2){
        this.l1d1 = this.pushD(idx);
        // this.l1d2GD = this.pushD(idx);
        
        // this.l2d1GD = this.pushD(idx);
        // this.l2d2GD = this.pushD(idx);
      }

      if(idx > 2){
        let i = 1
        if(idx == 4){
          i = 0
        }
        this.l1d1GD = this.pushD(i)

      }

      console.log( this.l1d1);
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
        let res = await this.$get("/bankuang");
        let {
          bangkuangji: { list },
          zhuangpingshusongxian: { zhuangPingShuSongXianEntity },
          tuopanshusongxian
        } = res;
        // console.log(tuopanshusongxian);
        // zhuangPingShuSongXianEntity = testData
        // tuopanshusongxian = tpss

        this.l1d1 = dataHandler.getL1D1(zhuangPingShuSongXianEntity);
        this.l1d1GD = dataHandler.getL1D1GD(zhuangPingShuSongXianEntity);

        this.l1d2 = dataHandler.getL1D2(zhuangPingShuSongXianEntity);
        this.l1d2GD = dataHandler.getL1D2GD(zhuangPingShuSongXianEntity);

        this.l1d4 = dataHandler.getL1D4(zhuangPingShuSongXianEntity);
        this.l1d4GD = dataHandler.getL1D4GD(zhuangPingShuSongXianEntity);


        let [l1d5GD,l1d5] = dataHandler.getL1D5(tuopanshusongxian);
        this.l1d5GD = l1d5GD
        this.l1d5 = l1d5


        let [l1d6GD,l1d6] = dataHandler.getL1D6(tuopanshusongxian);
        this.l1d6GD = l1d6GD
        this.l1d6 = l1d6

        let [l1d7GD,l1d7] = dataHandler.getL1D7(tuopanshusongxian);
        this.l1d7GD = l1d7GD
        this.l1d7 = l1d7

        let [l1d8GD,l1d8] = dataHandler.getL10301(tuopanshusongxian);
        this.l1d8GD = l1d8GD
        this.l1d8 = l1d8

        let [l1d9GD,l1d9] = dataHandler.getL10302(tuopanshusongxian);
        this.l1d9GD = l1d9GD
        this.l1d9 = l1d9




        // console.log( this.l1d4,this.l1d4GD);

        // this.l2d1 = dataHandler.getL2D1(zhuangPingShuSongXianEntity);
        // this.l2d1GD = dataHandler.getL2D1GD(zhuangPingShuSongXianEntity);
        // this.l2d2 = dataHandler.getL2D2(zhuangPingShuSongXianEntity);
        // this.l2d2GD = dataHandler.getL2D2GD(zhuangPingShuSongXianEntity);

        await this.awaitTime(2000);
        if (!list) continue;
        if (list.lenght == 0) continue;
        this.d1 = list[0];
        this.d2 = list[1];
        this.d3 = list[2];
        this.d4 = list[3];
      }
    },
    async initDataMiejunqi() {
      while (true) {
        if (this.isBreak) {
          break;
        }
        let { list } = await this.$get("/miejunqi");
        await this.awaitTime(2000);
        if (!list) continue;
        if (list.lenght == 0) continue;
        this.info1 = list[0];
        this.info2 = list[1];
        this.info3 = list[2];
        this.info4 = list[3];
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
    // this.initDataMiejunqi();
  },
  mounted() {},
  beforeDestroy() {
    this.isBreak = true;
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 1920px;
  height: 1080px;
  box-sizing: border-box;
  background: url("../../public/gaitianli/bg032.jpg") center no-repeat;
  background-size: contain;
  position: relative;

  .l1d1{
    position: absolute;
    left: 95px;
    top: 679px;
  }
  .l1d2{
    position: absolute;
    left: 125px;
    top: 822px;
    transform: rotate(-90deg);
  }

  .l1d4{
    position: absolute;
    left: 318px;
    top: 405px;
    transform: rotate(-90deg);
  }




  .btn-box {
    color: #fff;
    padding: 400px 50px 0 50px;
    display: flex;
    width: 300px;
    flex-wrap: wrap;
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
    position: absolute;
    top: 250px;
    left: 400px;
  }
  .item-box-2 {
    position: absolute;
    top: 600px;
    left: 400px;
  }
  .item-box-3 {
    position: absolute;
    top: 690px;
    left: 1121px;
  }
  .item-box-4 {
    position: absolute;
    top: 360px;
    left: 1121px;
  }



  .item-info-box-1 {
    position: absolute;
    top: 880px;
    left: 733px;
  }
  .item-info-box-2 {
    position: absolute;
    top: 720px;
    left: 733px;
  }
  .item-info-box-3 {
    position: absolute;
    top: 430px;
    left: 733px;
  }
  .item-info-box-4 {
    position: absolute;
    top: 270px;
    left: 733px;
  }






  .tp-box-1-1 {
    position: absolute;
    top: 308px;
    left: 332px;
    transform: rotate(180deg);
  }

  .tp-box-1-2 {
    position: absolute;
    top: 83px;
    left: 512px;
    transform: rotate(-90deg);
  }

  .tp-box-1-3 {
    position: absolute;
    top: 305px;
    left: 680px;
  }
  .tp-box-03-01 {
    position: absolute;
    top: 192px;
    left: 960px;
  }
  .tp-box-03-02 {
    position: absolute;
    top: 280px;
    left: 983px;
    transform: rotate(-90deg);
  }
}
</style>

