<template>
  <view class="play">
    <view class="item" v-for="(item, index) in P1" :key="index">
      <view class="item-title text-bold">{{ item.N }}</view>
      <view class="num-box flex">
        <block v-for="(C_1, idx) in item.C" :key="idx">
          <view
            @click="selected(C_1)"
            class="item-num flex flex-direction"
            :class="{ 'item-num-active': C_1.active }"
            :key="idx"
          >
            <text class="text text-white text-bold text-xxl">{{ C_1.N }}</text>
            <text class="text text-yellow text-xs">{{ C_1.curMxO }}</text>
          </view>
        </block>
      </view>

      <view class="flex bottom-list">
        <view
          @click="selectedType(text)"
          class="bottom-item flex flex-direction justify-center align-center"
          :class="{ 'text-active': text.active }"
          v-for="(text, ids) in item.bottomText"
          :key="ids"
        >
          <text>{{ text.N }}</text>
          <text style="color: #c42133">{{ text.curMxO }}</text>
        </view>
      </view>
    </view>

    <view class="special-box">
      <view class="special flex align-center justify-center">
        <text class="text-bold">总和</text>
        <!-- 	<select class="select" v-model="curObjName" @change="changeSelected">
					<option :value="item.N" v-for="(item, idx) in P3" :key="idx">{{ item.N }}</option>
				</select> -->
      </view>
      <view class="special-list flex justify-around">
        <view
          @click="selectedSpecial(it)"
          class="special-item-single special-item flex flex-direction align-center justify-center"
          :class="{ 'special-item-active': it.active }"
          v-for="(it, ids) in P3[0].C"
          :key="ids"
        >
          <text>{{ it.N }}</text>
          <text style="color: #c42133">{{ it.curMxO }}</text>
        </view>
      </view>
    </view>

    <view class="special-box">
      <view class="special flex align-center justify-center">
        <text class="text-bold">特殊玩法</text>
        <select class="select" v-model="curObjName" @change="changeSelected">
          <option :value="item.N" v-for="(item, idx) in P2" :key="idx">
            {{ item.N }}
          </option>
        </select>
      </view>
      <view class="special-list flex justify-around">
        <view
          @click="selectedSpecial(it)"
          class="special-item flex flex-direction align-center justify-center"
          :class="{ 'special-item-active': it.active }"
          v-for="(it, ids) in P2CurObj.C"
          :key="ids"
        >
          <text>{{ it.N }}</text>
          <text style="color: #c42133">{{ it.curMxO }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      curPlayList: {},
      P1: [], //本页面第一部份的数据
      P2: [], //本页面第二部份的数据
      P3: [], //本页面第三部份的数据
      curObjName: "前三",
      P2CurObj: {}, //当前选择的P2里的对象。用于页面显示
      curRatio: 0.9,
      curSelectArr: [],
    };
  },
  watch: {
    "$store.state.gameDataV2.cancelAll": {
      handler: function (val) {
        this.cancelAll();
      },
    },

    "$store.state.gameDataV2.rate": {
      handler: function (val) {
        this.handlerData(this.curPlayList);
      },
      deep: true,
    },
  },
  components: {
    // Wenlu:()=>import('@/pages/games/otherGame/common/Wenlu')
  },
  created() {
    let list = uni.getStorageSync("curPlayList");
    if (list) {
      this.curPlayList = list;
      this.handlerData(this.curPlayList);
    } else {
      setTimeout(() => {
        let list = uni.getStorageSync("curPlayList");
        this.curPlayList = list;
        this.handlerData(this.curPlayList);
      }, 0);
    }
  },

  methods: {
    cancelAll() {
      this.P1.forEach((outItem) => {
        outItem.C.forEach((inItem) => {
          inItem.active = false;
        });

        outItem.bottomText.forEach((b) => {
          b.active = false;
        });
      });

      this.P2.forEach((outItem) => {
        outItem.C.forEach((inItem) => {
          inItem.active = false;
        });
      });
      this.refreshPage();

      let num = this.$store.state.gameDataV2.isHasSelected;
      this.$store.commit("setIsHasSelected", -num);
    },
    selected(C1) {
      C1.active ? (C1.active = false) : (C1.active = true);
      this.refreshPage();

      this.$store.commit("setIsHasSelected", C1.active ? 1 : -1);
    },

    changeSelected() {
      this.P2CurObj = this.curPlayList.C.find(
        (item) => item.N === this.curObjName
      );
    },
    selectedSpecial(it) {
      it.active ? (it.active = false) : (it.active = true);
      this.refreshPage();
      this.$store.commit("setIsHasSelected", it.active ? 1 : -1);
    },
    selectedType(text) {
      text.active ? (text.active = false) : (text.active = true);
      this.refreshPage();
      this.$store.commit("setIsHasSelected", text.active ? 1 : -1);
    },

    handlerNum(num, decimal = 1) {
      let obj = {
        1: 10,
        2: 100,
        3: 1000,
      };
      let n = Math.round(num * obj[decimal]) / obj[decimal];
      return n ;
    },

    handlerData(obj) {
      let { percentage } = this.$store.state.gameDataV2.rate;
      this.curRatio = percentage;
      // this.curRatio = 0;

      let ids = [218, 221, 224, 227, 230];
      let ids1 = [220, 219, 223, 222, 226, 225, 229, 228, 232, 231];

      let list = obj.C.filter((item) => ids.includes(item.Id));

      let list1 = obj.C.filter((item) => ids1.includes(item.Id));
      let dLsit = this.$buyDataHandler.arrayDivision(list1, 2);
      
      list.forEach((obj, index) => {
        obj["bottomText"] = [];
        dLsit[index].forEach((item) => {
          item.C.forEach((o) => {
            o.curMxO = this.handlerNum(
              +Number(o.MxO) - (+Number(o.MxO) - Number(o.MiO)) * this.curRatio,
              2
            );
            obj["bottomText"].push(o);
          });
        });

        obj.C.forEach((C) => {
          C.curMxO = this.handlerNum(
            +Number(C.MxO) - (+Number(C.MxO) - Number(C.MiO)) * this.curRatio,
            2
          );
        });
      });
    
      
      this.P1 = list;
      
      let P2 = obj.C.slice(17, 20);
      P2.forEach((item) => {
        item.C.forEach((inItem) => {
          inItem.curMxO = this.handlerNum(
            +inItem.MxO - (+inItem.MxO - inItem.MiO) * this.curRatio,
            3
          );
        });
      });
      this.P2 = P2;
      this.P2CurObj = P2.find((item) => item.N === this.curObjName);

      let nameArr = ["总和大小", "总和单双"];
      let P3 = [];
      nameArr.forEach((name) => {
        let numObj = obj.C.find((item) => item.N === name);
        P3.push(...numObj.C);
      });
      P3.forEach((item) => {
        item.curMxO = this.handlerNum(
          +item.MxO - (+item.MxO - item.MiO) * this.curRatio,
          3
        );
      });

      let P3Obj = {
        N: "总和单双",
        C: P3,
      };
      this.P3 = [P3Obj];
      let arr = this.P1.concat(this.P2, this.P3);
      this.$store.commit("setD1", arr);
    },

    refreshPage() {
      this.P1.push({});
      this.P1.pop();
    },
  },
};
</script>

<style lang="scss" scoped>
.play {
  height: 100%;
  overflow: scroll;
  .item {
    padding-bottom: 30rpx;
    .item-title {
      background-color: #e5e5e5;
      color: #5d5d5d;
      text-align: center;
      padding: 10rpx 10rpx;
    }
    .num-box {
      flex-wrap: wrap;
      justify-content: space-around;
      .item-num {
        width: 13vw;
        height: 13vw;
        margin: 10rpx 20rpx 10rpx 20rpx;
        border-radius: 50%;
        background-color: #b62929;
        align-items: center;
        justify-content: center;
        padding-top: 15rpx;
        .text {
          line-height: 40rpx;
        }
      }
      .item-num-active {
        position: relative;
        background-color: #ffe100;
        .text {
          color: black;
        }
      }

      .item-num-active::after {
        position: absolute;
        left: -15rpx;
        top: -2.2vw;
        content: "";
        display: block;
        width: 0;
        height: 0;
        transform: rotate(213deg);
        // transform: scale(0);
        border-top: 5vw solid transparent;
        border-left: 5vw solid #ffe100;
        border-bottom: 5vw solid transparent;
      }
    }

    .bottom-list {
      justify-content: space-around;
      margin-top: 20rpx;
      .bottom-item {
        width: 24vw;
        height: 12vw;
        border-radius: 10rpx;
        border: 1px solid #e3e3e3;
        background-color: white;
        text {
          line-height: 40rpx;
        }
      }
      .text-active {
        background-color: #ffe100;
      }
    }
  }

  .special-box {
    .special {
      position: relative;
      padding: 10rpx 20rpx;
      background-color: #e5e5e5;
      .select {
        position: absolute;
        right: 20rpx;
        border: none;
        outline: none;
        background-color: #e5e5e5;
        padding: 10rpx;
      }
    }

    .special-list {
      padding-bottom: 40rpx;
      .special-item {
        width: 19.5vw;
        border: 1px solid #e3e3e3;
        padding: 10rpx 0;
        border-radius: 15rpx;
        margin-top: 5rpx;
        text {
          line-height: 40rpx;
        }
      }
      .special-item-active {
        background-color: #ffd800;
      }

      .special-item-single {
        width: 24%;
      }
    }
  }
}
</style>
