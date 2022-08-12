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
        :lineNum='10'
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
        :lineNum='10'
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
  </div>
</template>
<script>
import td from "./testData";
import dh from "@/views/cultivationRoom/dh.js";
import ConveyorBox from "@/views/ConveyorBox.vue";
export default {
  data() {
    return {
      isBreak: false,
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
    };
  },
  components: {
    ConveyorBox,
  },

  created() {
    this.initData();
    // this.pushItem(12,this.d3)
    // this.pushItem(24,this.d4)
    // this.pushItem(24,this.d4GD)
    // this.pushItem(6,this.d5)
    // this.pushItem(14,this.d6)
    // this.pushItem(1,this.d7)
    // this.pushItem(1,this.d8)
    // this.pushItem(4,this.d9)
    // this.pushItem(6,this.d10)
     // this.pushItem(24,this.d11)
    // this.pushItem(24,this.d12)
    // this.pushItem(17,this.d13)
    // this.pushItem(13,this.d14)
    // this.pushItem(1,this.d15)

    this.createData();
  },

  methods: {
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
      let { aj, ac, bj, bc } = td;
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


        let [d1,d1GD] = dh.getD1(sanLouPeiYangShiAJinXianEntity)
        this.d1 = d1
        this.d1GD = d1GD
        let [d2,d2GD] = dh.getD2(sanLouPeiYangShiAJinXianEntity)
        this.d2 = d2
        this.d2GD = d2GD
        let [d3,d3GD] = dh.getD3(sanLouPeiYangShiAJinXianEntity)
        this.d3 = d3
        this.d3GD = d3GD
        let [d4_1,d4GD_1] = dh.getD4_1(sanLouPeiYangShiAJinXianEntity)
        this.d4_1 = d4_1
        this.d4GD_1 = d4GD_1


        let [d4,d4GD] = dh.getD4(sanLouPeiYangShiAChuXianEntity)
        this.d4 = d4
        this.d4GD = d4GD
        let [d5,d5GD] = dh.getD5(sanLouPeiYangShiAChuXianEntity)
        this.d5 = d5
        this.d5GD = d5GD
        let [d6,d6GD] = dh.getD6(sanLouPeiYangShiAChuXianEntity)
        this.d6 = d6
        this.d6GD = d6GD
        let [d7,d7GD] = dh.getD7(sanLouPeiYangShiAChuXianEntity)
        this.d7 = d7
        this.d7GD = d7GD


        let [d8,d8GD] = dh.getD8(sanLouPeiYangShiBJinXianEntity)
        this.d8 = d8
        this.d8GD = d8GD
        let [d9,d9GD] = dh.getD9(sanLouPeiYangShiBJinXianEntity)
        this.d9 = d9
        this.d9GD = d9GD
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
  border: 1px solid red;
  width: 1920px;
  height: 1080px;
  box-sizing: border-box;
  background: url("../../../public/gaitianli/sanloubg.png") center no-repeat;
  background-size: contain;
  position: relative;
  font-size: 10px;

  .box-1 {
    @include tl(664px, 1793px);
    transform: rotate(-90deg);
  }

  .box-2 {
    @include tl(710px, 1834px);
  }
  .box-3 {
    @include tl(444px, 1240px);
    transform: rotate(-90deg);
  }
  .box-4 {
    width: 37px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include tl(115px, 621px);
  }

  .box-5 {
    @include tl(762px, 344px);
    transform: rotate(-90deg);
  }
  .box-6 {
    @include tl(280px, 68px);
  }
  .box-7 {
    @include tl(225px, 108px);
    transform: rotate(-90deg);
  }
  .box-8 {
    @include tl(720px, 1782px);
    transform: rotate(-90deg);
  }
  .box-9 {
    @include tl(750px, 1811px);
  }

  .box-10 {
    @include tl(844px, 1635px);
    transform: rotate(-90deg);
  }

  .box-11 {
    width: 38px;
    display: flex;
    justify-content: space-between;
    @include tl(115px, 1438px);
    align-items: center;
  }

  .box-13 {
    @include tl(351px, 760px);
    transform: rotate(-90deg);
  }

  .box-14 {
    @include tl(310px, 94px);
  }

  .box-15 {
    @include tl(275px, 118px);
    transform: rotate(-90deg);
  }
}
</style>