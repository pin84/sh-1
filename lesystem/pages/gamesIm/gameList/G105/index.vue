<template>
  <view class="G260">
    <view class="main-body">
          <G1 v-if="playType == 1" />
      <!-- <view v-show="!isShowRecord">
        <view v-show="!isShowBasket">
        </view>
        <view v-if="isShowBasket"><NumberBasket /></view>
      </view>
      <view v-if="isShowRecord"><Record /></view> -->

      <view class="canvas-box" v-if="!isShowBasket && !isShowRecord">
        <view class="name-box">
          <view
            @click="selectedName('0')"
            class="name"
            :class="{ active: isSelectedName == 0 }"
            >路子</view
          >
          <view
            @click="selectedName('1')"
            class="name"
            :class="{ active: isSelectedName == 1 }"
            >长龙</view
          >
        </view>
        <view v-if="isSelectedName == 0"><Wenlu /></view>
        <view v-else><ChangLong /></view>
      </view>
    </view>

 
  </view>
</template>

<script>
import Wenlu from "./Wenlu";
import ChangLong from "./ChangLong";
import G1 from "./G1";

export default {
  data() {
    return {
      isShowBasket: false,
      isShowRecord: false,
      gameConfig: {},
      playType: "",
      titleArr: [],
      isSelectedName: 0,
    };
  },
  components: {
    Wenlu,
    ChangLong,
    G1,
  },

  watch: {
    "$store.state.GDV3.v3CurGame": {
      handler: function (val) {
        this.initData(val);
      },
    },

    "$store.state.GDV3.v3ShowRecord": function (val) {
      this.isShowRecord = val;
    },
    "$store.state.GDV3.v3IsShowNumBaket": function (val) {
      this.isShowBasket = val;
    },
  },

  created() {
    this.initData();
  },
  methods: {
    initData(val) {
      this.playType = "";
      if (!val) {
        val = this.$store.state.GDV3.v3CurGame;
      }
      let { Id } = val;
      if (!Id) return;
      setTimeout(() => {
        this.playType = Id;
      }, 0);

      this.setRatioBarValue();
    },

    setRatioBarValue() {
      let { C } = this.$store.state.GDV3.v3CurGame;

      // console.log(C)

      // let curMxO = 0
      // let obj = {}
      // C.forEach(item=>{
      // 	if(item.MxO > curMxO){
      // 		curMxO = item.MxO
      // 		obj = item
      // 	}
      // })

      this.$store.commit("v3RatioInitValue", C[3].C[0]);
    },

    selectedName(n) {
      this.isSelectedName = n;
    },

    //切换  我要投注 或 投注记录页面
    changeTal(index) {
      this.TabCur = index;
      index == 0 ? (this.isShowRecord = false) : (this.isShowRecord = true);
    },
  },
};
</script>

<style lang="scss" scoped>
.G260 {
  height: 100%;
  display: flex;
  flex-direction: column;
  .main-body {
    height: 100%;
    overflow: scroll;
    background-color: #317455;

    .canvas-box {
      margin-top: 30rpx;
      padding: 10rpx;
      .name-box {
        display: flex;
        margin-bottom: 20rpx;
        .name {
          width: 50%;
          text-align: center;
          color: #fff;
          padding: 5rpx 0;
          font-size: 32rpx;
          border: 1px solid hsla(0, 0%, 100%, 0.3);
        }
        .active {
          color: #f4c829;
          border-color: #f4c829;
        }
      }
    }
  }
  .footer {
    flex-basis: 0 0 250rpx;
  }
}
</style>
