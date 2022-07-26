<template>
  <view class="accountList">
    <view class="flex bg-gray text-center row-line">
      <view class="flex-sub"> 提现时间 </view>
      <view class="flex-sub"> 提现金额 </view>
      <view class="flex-sub"> 申请状态 </view>
      <view class="flex-sub"> 进度 </view>
      <view class="flex-sub"> 详情 </view>
    </view>

    <scroll-view class="list-view bg-white" scroll-y>
      <block v-for="(item, index) in accountList" :key="index">
        <view
          class="flex bg-white text-center row-line"
          @tap="showDetail(index)"
        >
          <view class="flex-sub apply-time">
            {{ item.apply_time }}
          </view>
          <view class="flex-sub text-red">
            {{ item.applyingAmount }}
          </view>
          <view class="flex-sub">
            {{ item.statcn }}
          </view>
          <view class="flex-sub text-red">
            {{ item.applyProcess }}
          </view>
          <view class="flex-sub">
            <text class="iconfont icon-icon-test5"></text>
          </view>
        </view>
        <view
          class="flex bg-gray detail-list"
          v-if="curIndex == index && item.settingType == 1"
        >
          <view class="flex item">
            <text>用户名：</text>
            <text>{{ item.username }}</text>
          </view>
          <view class="flex item">
            <text>银行：</text>
            <text>USDT</text>
          </view>
          <view class="flex item">
            <text>主网协议：</text>
            <text>{{ item.usdtProtocol }}</text>
          </view>
          <view class="flex item">
            <text>USDT数量：</text>
            <text>{{ item.usdtAmount }}</text>
          </view>
          <view class="flex item">
            <text>地址：</text>
            <text>{{ item.usdtAddress }}</text>
          </view>
          <view class="flex item">
            <text>地址：</text>
            <text>{{ item.remark }}</text>
          </view>
        </view>
        <view
          class="flex bg-gray detail-list"
          v-if="curIndex == index && item.settingType == 0"
        >
          <view class="flex item">
            <text>用户名：</text>
            <text>{{ item.username }}</text>
          </view>
          <view class="flex item">
            <text>银行：</text>
            <text>{{ item.BankName }}</text>
          </view>
          <view class="flex item">
            <text>银行卡姓名：</text>
            <text>{{ item.realName }}</text>
          </view>
          <view class="flex item">
            <text>银行卡号：</text>
            <text>{{ item.card_id }}</text>
          </view>
          <view class="flex item">
            <text>备注：</text>
            <text>{{ item.remark }}</text>
          </view>
        </view>
      </block>

      <view
        class="row-line no-border text-center"
        v-if="accountList.length == 0"
      >
        <text class="flex-sub text-gray text-lg"> 暂无数据 </text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      curIndex: null,
    };
  },
  props: {
    accountList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    showDetail(index) {
      this.curIndex = index;
    },

  },
};
</script>

<style lang="scss" scoped>
.accountList {
  .row-line {
    border-bottom: 1px solid #f0f0f0;
    &:last-child,
    &.no-border {
      border-bottom: none;
    }
    .flex-sub {
      width: 82rpx;
      line-height: 50px;
      height: 50px;
      &.apply-time {
        display: flex;
        align-items: center;
        line-height: 28rpx;
      }
    }
  }

  .detail-list {
    padding: 8rpx;
    flex-wrap: wrap;
    .item {
      min-width: 45%;
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
