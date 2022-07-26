<template>
  <view class="accountList">
    <view class="flex bg-gray text-center row-line">
      <view class="flex-sub"> 用户名 </view>
      <view class="flex-sub"> 所属组 </view>
      <view class="flex-sub"> 盈亏 </view>
      <view class="flex-sub"> 详情 </view>
    </view>

    <scroll-view class="list-view bg-white" scroll-y>
      <!-- 自己的数据 -->
      <block v-if="accountList.selfInfo">
        <view class="flex bg-white text-center row-line">
          <view class="flex-sub text-red">
            {{ accountList.selfInfo.username }}
          </view>
          <view class="flex-sub text-red">
            {{ accountList.selfInfo.hierarchy > 0 ? "代理" : "会员" }}
          </view>
          <view
            class="flex-sub text-red"
            :class="
              stringToFloat(accountList.selfInfo.winLossAmount, 3) < 0
                ? 'text-red'
                : ''
            "
          >
            {{ stringToFloat(accountList.selfInfo.winLossAmount, 3) }}
          </view>
          <view @tap="showDetail('self')" class="flex-sub">
            <i
              class="iconfont iconsize icon-xiangyou text-gray"
              :class="listDetailShow['self'] ? 'arrow-bottom' : ''"
            ></i>
          </view>
        </view>
        <view v-if="listDetailShow['self']">
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub"> 充值 </view>
            <view class="flex-sub">
              {{ stringToFloat(accountList.selfInfo.rechargeAmount, 3) }}
            </view>
            <view class="flex-sub"> 提现 </view>
            <view class="flex-sub">
              {{ stringToFloat(accountList.selfInfo.withdrawAmount, 3) }}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub"> 投注人数 </view>
            <view class="flex-sub">
              {{ accountList.selfInfo.buyNumber }}
            </view>
            <view class="flex-sub"> 中奖金额 </view>
            <view class="flex-sub">
              {{ stringToFloat(accountList.selfInfo.zhongBonus, 3) }}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub"> 投注金额 </view>
            <view class="flex-sub">
              {{ stringToFloat(accountList.selfInfo.betAmount, 3) }}
            </view>
            <view class="flex-sub"> 有效投注 </view>
            <view class="flex-sub">
              {{ stringToFloat(accountList.selfInfo.effectiveAmount, 3) }}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub"> 退水金额 </view>
            <view class="flex-sub">
              {{ stringToFloat(accountList.selfInfo.waterAmount, 3) }}
            </view>
             <view class="flex-sub"> 返点金额 </view>
            <view class="flex-sub">
              {{ stringToFloat(accountList.selfInfo.fandianAmount, 3) }}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
      
            <view class="flex-sub"> 盈亏 </view>
            <view class="flex-sub">
              {{ stringToFloat(accountList.selfInfo.winLossAmount, 3) }}
            </view>
          </view>
        </view>
      </block>
      <!-- 代理数据 -->
      <block v-for="(item, index) in accountList.agentList.list" :key="index">
        <view class="flex bg-white text-center row-line">
          <view
            @tap="getAgentList(item.uid)"
            v-if="item.hierarchy > 0"
            class="flex-sub text-red"
          >
            {{ item.username }}
          </view>
          <view class="flex-sub" v-else>{{ item.username }}</view>
          <view class="flex-sub">
            {{ item.hierarchy > 0 ? "代理" : "会员" }}
          </view>
          <view
            class="flex-sub"
            :class="stringToFloat(item.winLossAmount, 3) < 0 ? 'text-red' : ''"
          >
            {{ stringToFloat(item.winLossAmount, 3) }}
          </view>
          <view @tap="showDetail(index)" class="flex-sub">
            <i
              class="iconfont iconsize icon-xiangyou text-gray"
              :class="listDetailShow[index] ? 'arrow-bottom' : ''"
            ></i>
          </view>
        </view>
        <view v-if="listDetailShow[index]">
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub"> 充值 </view>
            <view class="flex-sub">
              {{ stringToFloat(item.rechargeAmount, 3) }}
            </view>
            <view class="flex-sub"> 提现 </view>
            <view class="flex-sub">
              {{ stringToFloat(item.withdrawAmount, 3) }}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub"> 投注人数 </view>
            <view class="flex-sub">
              {{ item.buyNumber }}
            </view>
            <view class="flex-sub"> 中奖金额 </view>
            <view class="flex-sub">
              {{ stringToFloat(item.zhongBonus, 3) }}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub"> 投注金额 </view>
            <view class="flex-sub">
              {{ stringToFloat(item.betAmount, 3) }}
            </view>
            <view class="flex-sub"> 有效投注 </view>
            <view class="flex-sub">
              {{ stringToFloat(item.effectiveAmount, 3) }}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub"> 退水金额 </view>
            <view class="flex-sub">
              {{ stringToFloat(item.waterAmount, 3) }}
            </view>
            <view class="flex-sub"> 盈亏 </view>
            <view class="flex-sub">
              {{ stringToFloat(item.winLossAmount, 3) }}
            </view>
          </view>
        </view>
      </block>
      <!-- 			<view class="row-line no-border text-center" v-if="!accountList.listReport || accountList.listReport.length == 0">
				<text class="flex-sub  text-gray text-lg">
					暂无数据
				</text>
			</view> -->
      <view class="total-bar">
        <view
          class="flex bg-grey text-center row-line"
          v-if="accountList.total"
          @tap="showDetail('total')"
        >
          <view class="flex-twice text-white"> 总计 </view>

          <view
            class="flex-sub text-white"
            :class="
              stringToFloat(accountList.total.buyAmount, 3) < 0
                ? 'text-red'
                : 'text-white'
            "
          >
            {{ stringToFloat(accountList.total.buyAmount, 3) }}
          </view>
          <view class="flex-sub text-white">
            <i
              class="iconfont iconsize icon-xiangyou text-white"
              :class="listDetailShow['total'] ? 'arrow-bottom' : ''"
            ></i>
          </view>
        </view>
        <view v-if="listDetailShow['total']">
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub"> 充值 </view>
            <view class="flex-sub">
              {{ stringToFloat(accountList.total.rechargeAmount, 3) }}
            </view>
            <view class="flex-sub"> 提现 </view>
            <view class="flex-sub">
              {{ stringToFloat(accountList.total.withdrawAmount, 3) }}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub"> 投注人数 </view>
            <view class="flex-sub">
              {{ accountList.total.buyNumber }}
            </view>
            <view class="flex-sub"> 中奖金额 </view>
            <view class="flex-sub">
              {{ stringToFloat(accountList.total.zhongBonus, 3) }}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub"> 投注金额 </view>
            <view class="flex-sub">
              {{ stringToFloat(accountList.total.betAmount, 3) }}
            </view>
            <view class="flex-sub"> 有效投注 </view>
            <view class="flex-sub">
              {{ stringToFloat(accountList.total.effectiveAmount, 3) }}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub"> 退水金额 </view>
            <view class="flex-sub">
              {{ stringToFloat(accountList.total.waterAmount, 3) }}
            </view>
			<view class="flex-sub"> 返点金额 </view>
            <view class="flex-sub">
              {{ stringToFloat(accountList.total.fandianAmount, 3) }}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub"> 盈亏 </view>
            <view class="flex-sub">
              {{ stringToFloat(accountList.total.winLossAmount, 3) }}
            </view>
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
      listDetailShow: {},
    };
  },
  props: {
    page: Number,
    pageCount: Number,
    accountList: {
      type: Object,
    },
  },
  methods: {
    showDetail(index) {
      //显示详情
      let value = this.listDetailShow[index];
      value = value == null ? false : value;
      this.$set(this.listDetailShow, index, !value);
      for (let key in this.listDetailShow) {
        if (key != index) {
          this.$set(this.listDetailShow, key, false);
        }
      }
    },
    stringToFloat(str, fixNum) {
      //设置number小数位，返回float类型
      if (str == null || str == "") {
        return 0;
      }
      str = "" + str; //转换成字符串处理
      let number = Number.parseFloat(str);
      if (fixNum > 0) number = number.toFixed(fixNum);
      return Number.parseFloat(number);
    },
    showMore() {
      this.$emit("showMore");
    },
    getAgentList(uid) {
      this.$emit("getAgentList", uid);
    },
  },
};
</script>

<style lang="scss" scoped>
.accountList {
  .row-line {
    height: 50px;
    border-bottom: 1px solid #f0f0f0;

    &:last-child,
    &.no-border {
      border-bottom: none;
    }

    .flex-sub,
    .flex-twice {
      line-height: 50px;
    }
  }

  .bg-gray.row-line {
    border-color: #fff;
  }

  .col-2 {
    width: 50%;
  }

  .col-4 {
    width: 25%;
  }

  .list-view {
    height: calc(100vh - 200rpx - var(--status-bar-height) - var(--window-top));
  }

  .icon-xiangyou {
    display: inline-block;
    transition: transform 0.2s ease-in-out;
  }

  .arrow-bottom {
    transform: rotateZ(90deg);
  }

  // .total-bar {
  // 	position: fixed;
  // 	bottom: 0;
  // 	width: 100%;
  // }
}
</style>
