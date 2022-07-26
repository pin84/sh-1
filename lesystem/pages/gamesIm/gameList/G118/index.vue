<template>
  <view class="G260">
    <G1 v-if="playType == '1'" />
  </view>
</template>

<script>
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

      setTimeout(() => {
        this.playType = "1";
      }, 0);
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

// .G260 {
// 	height: 100%;
// 	display: flex;
// 	flex-direction: column;
// 	.main-body {
// 		height: 100%;
// 		overflow: scroll;
// 		// background-color: #317455;
// 		background-color: #f1f1f1;

// 		.canvas-box {
// 			margin-top: 30rpx;
// 			padding: 10rpx;
// 			.name-box {
// 				display: flex;
// 				margin-bottom: 20rpx;
// 				.name {
// 					width: 50%;
// 					text-align: center;
// 					color: #fff;
// 					padding: 5rpx 0;
// 					font-size: 32rpx;
// 					border: 1px solid hsla(0, 0%, 100%, 0.3);
// 				}
// 				.active {
// 					color: #f4c829;
// 					border-color: #f4c829;
// 				}
// 			}
// 		}
// 	}
// 	.footer {
// 		flex-basis: 0 0 250rpx;
// 	}
// }
// </style>
