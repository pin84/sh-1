<template>
  <view class="accountList">
    <view class="flex bg-gray text-center row-line">
      <view class="flex-sub ">
        用户名
      </view>
      <view class="flex-sub ">
        所属组
      </view>
      <view class="flex-sub ">
        投注金额
      </view>
      <view class="flex-sub ">
        输赢
      </view>
    </view>

    <scroll-view
      class="list-view bg-white"
      scroll-y
    >
      <!-- 自己的数据 -->
      <block v-if="accountList.selfInfo">
        <view
          class="flex bg-white text-center row-line"
          @tap="showDetail('self')"
        >
          <view class="flex-sub ">
            {{accountList.selfInfo.username}}
          </view>
          <view class="flex-sub ">
            {{accountList.selfInfo.hierarchy>0? '代理' : '会员'}}
          </view>
          <view class="flex-sub ">
            {{stringToFloat(accountList.selfInfo.buyAmount,3)}}
          </view>
          <view
            class="flex-sub "
            :class="stringToFloat(accountList.selfInfo.winAndLoss,3) <0?'text-red':''"
          >
            {{stringToFloat(accountList.selfInfo.winAndLoss,3)}}
          </view>
        </view>
        <view v-if="listDetailShow['self']">

           <view
            class="flex bg-gray text-center row-line"
            v-if="accountList.selfInfo.hierarchy>0"
          >
            <view class="flex-sub btn-m-box">
              <view
                class="btn-m"
                @click="showLowerLevel(accountList.selfInfo)"
              >查看下级</view>
            </view>
            <view class="flex-sub "></view>

            <view class="flex-sub btn-m-box">
            </view>
            <view class="flex-sub "></view>
          </view>

          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub ">
              投注返点
            </view>
            <view class="flex-sub ">
              {{stringToFloat(accountList.selfInfo.cpFandian, 3)}}
            </view>
            <view class="flex-sub ">
              代理返点
            </view>
            <view class="flex-sub ">
              {{stringToFloat(accountList.selfInfo.agentFandian, 3)}}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub ">
              投注人数
            </view>
            <view class="flex-sub ">
              {{accountList.selfInfo.buyNumber}}
            </view>
            <view class="flex-sub ">
              返奖总额
            </view>
            <view class="flex-sub ">
              {{stringToFloat(accountList.selfInfo.winAmount,3)}}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub ">
              活动金额
            </view>
            <view class="flex-sub ">
              {{stringToFloat(accountList.selfInfo.activityAmount,3)}}
            </view>
            <view class="flex-sub ">
              日工资
            </view>
            <view class="flex-sub ">
              {{stringToFloat(accountList.selfInfo.wages,3)}}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub ">
              充值总额
            </view>
            <view class="flex-sub ">
              {{stringToFloat(accountList.selfInfo.rechargeAmount,3)}}
            </view>
            <view class="flex-sub ">
              提现总额
            </view>
            <view class="flex-sub ">
              {{stringToFloat(accountList.selfInfo.withdrawAmount,3)}}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub ">
              实际投注金额
            </view>
            <view class="flex-sub ">
              {{stringToFloat(accountList.selfInfo.effectiveAmount,3)}}
            </view>
            <view class="flex-sub ">
              总盈亏
            </view>
            <view
              class="flex-sub "
              :class="stringToFloat(accountList.selfInfo.winAndLoss,3) <0?'text-red':''"
            >
              {{stringToFloat(accountList.selfInfo.winAndLoss,3)}}
            </view>
          </view>

        </view>
      </block>
      <!-- 代理数据 -->
      <block
        v-for="(item,index) in accountList.agentList.list"
        :key="index"
      >
        <view
          class="flex bg-white text-center row-line"
          @tap="showDetail(index)"
        >
          <view class="flex-sub ">
            {{item.username}}
          </view>
          <view class="flex-sub ">
            {{item.hierarchy>0? '代理' : '会员'}}
          </view>
          <view class="flex-sub ">
            {{stringToFloat(item.buyAmount,3)}}
          </view>
          <view
            class="flex-sub "
            :class="stringToFloat(item.winAndLoss,3) <0?'text-red':''"
          >
            {{stringToFloat(item.winAndLoss,3)}}
          </view>
        </view>
        <view v-if="listDetailShow[index]">

          <view
            class="flex bg-gray text-center row-line"
            v-if="item.hierarchy>0"
          >
            <view class="flex-sub btn-m-box">
              <view
                class="btn-m"
                @click="showLowerLevel(item)"
              >查看下级</view>
            </view>
            <view class="flex-sub "></view>
            <view class="flex-sub ">

            </view>
            <view class="flex-sub ">

            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub ">
              投注返点a
            </view>
            <view class="flex-sub ">
              {{stringToFloat(item.cpFandian,3)}}
            </view>
            <view class="flex-sub ">
              代理返点
            </view>
            <view class="flex-sub ">
              {{stringToFloat(item.agentFandian,3)}}
            </view>
          </view>

          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub ">
              投注人数
            </view>
            <view class="flex-sub ">
              {{item.buyNumber}}
            </view>
            <view class="flex-sub ">
              返奖总额
            </view>
            <view class="flex-sub ">
              {{stringToFloat(item.winAmount,3)}}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub ">
              活动金额
            </view>
            <view class="flex-sub ">
              {{stringToFloat(item.activityAmount,3)}}
            </view>
            <view class="flex-sub ">
              日工资
            </view>
            <view class="flex-sub ">
              {{stringToFloat(item.wages,3)}}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub ">
              充值总额
            </view>
            <view class="flex-sub ">
              {{stringToFloat(item.rechargeAmount,3)}}
            </view>
            <view class="flex-sub ">
              提现总额
            </view>
            <view class="flex-sub ">
              {{stringToFloat(item.withdrawAmount,3)}}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub ">
              实际投注金额
            </view>
            <view class="flex-sub ">
              {{stringToFloat(item.effectiveAmount,3)}}
            </view>
            <view class="flex-sub ">
              总盈亏
            </view>
            <view
              class="flex-sub "
              :class="stringToFloat(item.winAndLoss,3) <0?'text-red':''"
            >
              {{stringToFloat(item.winAndLoss,3)}}
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
          class="flex  bg-grey text-center  row-line"
          v-if="accountList.total"
          @tap="showDetail('total')"
        >
          <view class="flex-twice text-white">
            总计（资金变动总额）
          </view>

          <view
            class="flex-sub text-white"
            :class="stringToFloat(accountList.total.buyAmount,3) <0?'text-red':'text-white'"
          >
            {{stringToFloat(accountList.total.buyAmount, 3)}}
          </view>
          <view class="flex-sub text-white ">
            <i
              class="iconfont iconsize icon-xiangyou text-white"
              :class="listDetailShow['total']? 'arrow-bottom':''"
            ></i>
          </view>
        </view>
        <view v-if='listDetailShow["total"]'>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub ">
              投注返点
            </view>
            <view class="flex-sub ">
              {{stringToFloat(accountList.total.cpFandian, 3)}}
            </view>
            <view class="flex-sub ">
              代理返点
            </view>
            <view class="flex-sub ">
              {{stringToFloat(accountList.total.agentFandian, 3)}}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub ">
              投注人数
            </view>
            <view class="flex-sub ">
              {{accountList.total.buyNumber}}
            </view>
            <view class="flex-sub ">
              返奖总额
            </view>
            <view class="flex-sub ">
              {{stringToFloat(accountList.total.winAmount,3)}}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub ">
              活动金额
            </view>
            <view class="flex-sub ">
              {{stringToFloat(accountList.total.activityAmount,3)}}
            </view>
            <view class="flex-sub ">
              日工资
            </view>
            <view class="flex-sub ">
              {{stringToFloat(accountList.total.wages,3)}}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub ">
              充值总额
            </view>
            <view class="flex-sub ">
              {{stringToFloat(accountList.total.rechargeAmount,3)}}
            </view>
            <view class="flex-sub ">
              提现总额
            </view>
            <view class="flex-sub ">
              {{stringToFloat(accountList.total.withdrawAmount,3)}}
            </view>
          </view>
          <view class="flex bg-gray text-center row-line">
            <view class="flex-sub ">
              实际投注金额
            </view>
            <view class="flex-sub ">
              {{stringToFloat(accountList.total.effectiveAmount,3)}}
            </view>
            <view class="flex-sub ">
              总盈亏
            </view>
            <view
              class="flex-sub "
              :class="stringToFloat(accountList.total.winAndLoss,3) <0?'text-red':''"
            >
              {{stringToFloat(accountList.total.winAndLoss,3)}}
            </view>
          </view>
        </view>
      </view>

      <view
        class="margin-top-sm margin-bottom-sm"
        v-if="page < pageCount"
      >
        <view class="flex flex-direction margin-top-df">
          <button
            class='cu-btn bg-green radius lg shadow-blur'
            @tap="showMore"
          >查看更多</button>
        </view>
        <view
          class="text-center margin-top-xs"
          v-show="page > 1"
        >
          <text>第 {{page}}/{{pageCount}} 页</text>
        </view>
      </view>
      <view
        class="text-center text-grey margin-top-sm"
        v-else-if="page !== 1 || accountList.agentList.list.length == 0"
      >
        <text>已全部加载~</text>
      </view>

    </scroll-view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      listDetailShow: {},
      totalDetailItem: [
        { name: "提款", key: "withdrawAmount" },
        { name: "充值", key: "rechargeAmount" },
        { name: "彩票中奖", key: "winLoss" },
        { name: "代理返点", key: "agentFadian" },
        { name: "投注返点", key: "fanDian" },
      ],
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
    async showLowerLevel(obj) {
      this.$emit("showLower",obj);

      // let postData = uni.getStorageSync("teamPostData");
      // let {
      //   selfInfo: { uid },
      // } = this.accountList;
      // postData["accountID"] = uid;
      // let obj = {
      //   url: "System.Agent.getNewTeamReport",
      //   data: postData,
      // };
      // debugger;
      // let res = await this.$http(obj);

      // console.log(res);
    },
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

  .btn-m-box {
    display: flex;
    align-items: center;
    justify-content: center;
    .btn-m {
      background-color: green;
      color: #fff;
      padding: 5px 10px;
      border-radius: 5px;
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
