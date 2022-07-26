<template>
  <view class="order-table">
    <view class="flex bg-gray text-center padding-xs">
      <view class="col-3 margin-right-xs"> 彩种期数 </view>
      <view class="width80"> 玩法 </view>
      <view class="flex-sub"> 投注金额 </view>
      <view class="flex-sub"> 奖金 </view>
    </view>

    <!-- http://localhost:8080/pages/gamesIm/common/record/RecordOrderDetail?orderId=12051&pid=202105190745&status=%E6%9C%AA%E4%B8%AD%E5%A5%96&id=135&gameType=1&gameName=%E7%99%BE%E5%BA%A6%E5%88%86%E5%88%86%E5%BD%A9 -->

    <scroll-view
      scroll-y="true"
      class="bg-white"
      :class="showCheckbox ? 'list-scroll1' : 'list-scroll'"
    >
      <view class="cu-list menu text-center">
        <navigator
          class="cu-item flex"
          :url="`/pages/gamesIm/common/record/RecordOrderDetail?orderId=${row.orderId}&pid=${row.numberOfPeriod}&status=${row.status_cn}&id=${row.gameId}&gameType=${row.group_type}&gameName=${row.title}`"

          v-for="(row, index) in data"
          :key="index"
        >
          <view
            class="margin-right-xs"
            @tap.stop="checkboxChange(row.orderId)"
            v-show="showCheckbox"
          >
            <i
              class="iconfont iconsize icon-duoxuan"
              v-show="!checkboxValue[row.orderId]"
            >
            </i>
            <i
              class="iconfont iconsize icon-duoxuanyidong text-blue"
              v-show="checkboxValue[row.orderId]"
            >
            </i>
          </view>
          <view class="col-3 margin-right-xs text-cut">
            {{ row.title }}
            <view class="flex">
              <text class="text-red flex-sub">{{ row.numberOfPeriod }}</text>
              <text>期</text>
            </view>
          </view>
          <view class="width80 margin-right-xs text-cut">
            {{ row.playedName }}
            <view class="text-cut">
              {{ row.content }}
              <text class="text-red" v-if="row.odds">@{{ row.odds }}</text>
            </view>
          </view>
          <view class="flex-sub margin-right-xs text-cut">
            <!-- {{ numberPointSet(row.amount, 3) }} -->
            {{ row.amount }}
          </view>
          <view class="flex-sub text-cut">
            <!-- 奖金列 -->
            <text class="text-red" v-if="row.orderStatus == 3">
              {{ row.bonus }}
            </text>

            <!-- <text
              class="text-blue"
              v-else-if="
                (row.orderStatus == 1 ||
                (row.periodstatus == 1 && row.orderStatus == 1)) && row.uid == userId
              "
            >
              <text @tap.stop="cancelOrder(row.orderId)">可撤单</text>
            </text> -->
            <text
              class="text-blue"
              v-else-if="
                (row.orderStatus == 1 ||
                (row.periodstatus == 1 && row.orderStatus == 1)) && row.uid == userId
              "
            >
              <text @tap.stop="cancelOrder(row.orderId)">可撤单</text>
            </text>
            <text
              class="text-green"
              v-else-if="row.periodStatus == 0 && row.orderStatus == 1"
            >
              未开奖
            </text>
            <text class="text-orange" v-else-if="row.orderStatus == 2">
              未中奖
            </text>
            <text class="text-orange" v-else-if="row.orderStatus == 4">
              已撤单
            </text>
          </view>
        </navigator>
      </view>

      <view class="margin-top-sm margin-bottom-sm" v-if="page < pageCount">
        <view class="flex flex-direction">
          <button class="cu-btn bg-green lg shadow-blur" @tap="showMore">
            查看更多
          </button>
        </view>
        <view class="text-center margin-top-xs" v-show="page > 1">
          <text>第 {{ page }}/{{ pageCount }} 页</text>
        </view>
      </view>
      <view
        class="text-center no-more margin-top-sm"
        v-else-if="page !== 1 || data.length == 0"
      >
        <text>已全部加载~</text>
      </view>
      <view
        class="cu-bar bg-white set-bar"
        v-show="cancelOrderBar && data.length > 0"
      >
        <view class="action">
          <view class="" @tap="tapSelectAll">
            <i class="iconfont iconsize icon-duoxuan" v-show="!selectAll"> </i>
            <i
              class="iconfont iconsize icon-duoxuanyidong text-blue"
              v-show="selectAll"
            >
            </i>
            <text class="margin-left">全选</text>
          </view>
        </view>
        <view class="action">
          <view class="">
            <button class="cu-btn line-black" @tap="cancelOrder('multi')">
              撤单({{ hasSelectCount }})
            </button>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      checkboxValue: {}, //多选orderid
      showCheckbox: false, //默认不展示多选框
      cancelOrderBar: false, //撤单底部操作栏，默认不展示
      selectAll: false, //是否全选
      hasSelectCount: 0, //一选择个数，方便全选统计
    };
  },
  computed:{
	   userId(){
	       let cur_user = uni.getStorageSync("userInfo");
	         return cur_user.uid
	      }
  },
  watch: {
    data() {
      //监测数据变化，进行全选操作
      if (this.selectAll) {
        this.changeAllCheckBox();
      }
    },
  },

  props: {
    data: {
      type: Array,
    },
    page: {
      //当前页
      type: Number,
      default: 1,
    },
    pageCount: {
      //总页数
      type: Number,
      default: 1,
    },
  },


  methods: {
    showMore() {
      this.$emit("showMore");
    },
    cancelOrder(id, num) {
      if (id == "multi") {
        //多选
        console.log(1);
        let arr = [];
        for (let i in this.checkboxValue) {
          if (this.checkboxValue[i] ) {
            arr.push(i);
          }
        }
        id = arr.join(",");
        if (arr.length == 0) {
          //没有选中任何订单
          uni.showModal({
            content: "没有选中任何订单！",
            showCancel: false,
            confirmText: "确定",
            confirmColor: "#000",
          });
          return;
        }
        this.$emit("cancelOrder", {
          id: id,
          num: this.hasSelectCount,
        });
      } else {
        this.$emit("cancelOrder", {
          id: id,
          num: 1,
        });
      }
    },
    toggleCheckbox() {
      this.showCheckbox = !this.showCheckbox;
      this.cancelOrderBar = !this.cancelOrderBar;
    },
    checkboxChange(orderId) {
      let value = this.checkboxValue[orderId];
      value = value == null ? false : value;
      this.$set(this.checkboxValue, orderId, !value);
      //全选统计
      if (!value) {
        this.hasSelectCount += 1;
      } else {
        this.hasSelectCount -= 1;
      }

      if (this.hasSelectCount < this.data.length) {
        this.selectAll = false;
      } else {
        this.selectAll = true;
      }
    },
    tapSelectAll() {
      this.selectAll = !this.selectAll;
      this.changeAllCheckBox();
    },
    changeAllCheckBox() {
      //根据是否全选，更改所有checkbox状态
      for (let i = 0; i < this.data.length; i++) {
        let orderId = this.data[i].orderId;
        this.$set(this.checkboxValue, orderId, this.selectAll);
      }
      //全选统计
      if (this.selectAll) {
        this.hasSelectCount = this.data.length;
      } else {
        this.hasSelectCount = 0;
      }
    },
    numberPointSet(number, pointNum) {
      //设置number小数位，返回string类型
      if (Number.isInteger(number)) {
        if (pointNum > 0) return number.toFixed(pointNum);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.order-table {
  .col-3 {
    width: 33.33%;
  }

  .width80 {
    width: 160rpx;
  }

  .list-scroll {
    height: calc(100vh - 330rpx - var(--status-bar-height) - var(--window-top));
  }

  .list-scroll1 {
    height: calc(100vh - 242rpx - var(--status-bar-height) - var(--window-top));
    padding-bottom: 40px;
  }

  .border-bottom {
    border-bottom: 1px solid #d6d6d6;
  }

  .no-more {
    color: #8cabb2;
  }

  .set-bar {
    position: fixed;
    width: 100%;
    bottom: 0;
  }
}
</style>
