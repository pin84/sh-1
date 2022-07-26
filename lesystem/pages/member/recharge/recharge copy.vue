<template>
  <view class="page-body">
    <block v-if="loadingType == 'noMore'">
      <view class="title" style="border-bottom: 1px solid #eee">
        <text class="iconfont iconyuandian ns-text-color"></text>
        请选择充值方式：
      </view>
      <view class="itemList">
        <!--
				<view class="item" @click="kefupayClick">
					<text class="iconfont iconkefu" style="color: #03A9F4;"></text>
					<text class="title">客服激活</text>
					<text class="desc">限首次激活,最低50元</text>
				</view>-->
        <view
          class="item"
          v-if="bankWay.bankDepositIdStr != ''"
          @click="bankWayClick"
        >
          <text
            class="iconfont"
            :class="bankWay.iconfont"
            :style="{ color: '#ff9800' }"
          ></text>
          <text class="title">银行卡转账</text>
          <text class="desc">银行卡转账</text>
        </view>
        <view
          class="item"
          v-for="(item, index) in rechargeWays"
          :key="index"
          @click="otherWayClick(item)"
        >
          <!-- :style="{ color: item.Color }" -->
          <!-- :class="'icon-' + item.card_type" -->
          <span
            class="iconfont"
            :class="'icon-' + item.card_type"
            :style="{ color: item.Color }"
          ></span>
          <text class="title">{{ item.card_type_cn }}</text>
          <text class="desc">{{ item.card_type_desc }}</text>
        </view>
      </view>
    </block>
    <uni-load-more
      :status="loadingType"
      :contentText="contentText"
    ></uni-load-more>
  </view>
</template>

<script>
import http from "common/js/http.js";
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue";
export default {
  components: {
    uniLoadMore,
  },
  data() {
    return {
      colorlist: [
        "#274EC0",
        "#1597ED",
        "#39C964",
        "#aa00a6",
        "#ff9800",
        "#1597ED",
        "#d60000",
      ],
      bankWay: {
        iconfont: "",
        bankDepositIdStr: "",
      },
      rechargeWays: [],
      loadingType: "loading",
      contentText: {
        contentrefresh: "正在加载...",
        contentnomore: "",
      },
    };
  },
  methods: {
    getRechargeTypeList() {
      this.sendRequest({
        url: "System.Recharge.getRechargeTypeList",
        success: (res) => {
          //console.log(res);
          if (res.code == "-9999") {
            uni.removeStorage({
              key: "token",
              success: function (res) {
                //console.log('success');
              },
            });
            this.$util.redirectTo("/pages/login/login/login");
          } 
          if (res.code == 0) {
            if (res.data.bankDepositIdStr != "") {
              this.bankWay.iconfont = "icon-chongzhi1";
              this.bankWay.bankDepositIdStr = res.data.bankDepositIdStr;
            }

            let { userOnlineDepositsCardTypes } = res.data;
            let rechargeWays = userOnlineDepositsCardTypes;

            // rechargeWays.forEach(item=>{
            //   if(item.card_type == 'usdt'){
            //     item.card_type == 'USDT'
            //   }
            // })

            //
            ///console.log(rechargeWays);
            if (rechargeWays != undefined && rechargeWays.length > 0) {
              rechargeWays.forEach((element, idx) => {
                rechargeWays[idx].Color = this.colorlist[idx];
              });

              // this.colorlist.forEach((element, idx) => {
              //   rechargeWays[idx].Color = element;
              //   console.log(rechargeWays);
              // });
            }

            // Object.keys(res.data.userOnlineDepositsCardTypes).forEach((key) => {
            //   let item = res.data.userOnlineDepositsCardTypes[key];
            //   this.rechargeWays.push({
            //     card_type: item.card_type,
            //     card_type_cn: item.card_type_cn,
            //     card_type_desc: item.card_type_cn,
            //     Color: "",
            //     isonline:item.isonline
            //   });
            // });
            // for (var i = 0; i < this.rechargeWays.length; i++) {
            //   if (this.rechargeWays[i].card_type == "yunshanfu") {
            //     this.rechargeWays[i].Color = "#274EC0";
            //   } else if (this.rechargeWays[i].card_type == "zhifubao") {
            //     this.rechargeWays[i].Color = "#1597ED";
            //   } else if (this.rechargeWays[i].card_type == "weixin") {
            //     this.rechargeWays[i].Color = "#39C964";
            //   } else if (this.rechargeWays[i].card_type == "quickpay") {
            //     this.rechargeWays[i].Color = "#aa00a6";
            //   } else if (this.rechargeWays[i].card_type == "bank_b2c") {
            //     this.rechargeWays[i].Color = "#ff9800";
            //   } else {
            //     this.rechargeWays[i].Color = "#1597ED";
            //   }
            // }

            this.rechargeWays = rechargeWays;

            this.loadingType = "noMore";
          }
        },
        // fail:err=>{
        // }
      });
    },
    bankWayClick() {
      this.sendRequest({
        url: "System.Withdraw.getWithdrawLimitTime",
        data: {},
        success: (res) => {
          // console.log(res)
          if (res.code == 0) {
            if (res.data != "" && res.data != "0") {
              let beginTime = res.data.split("-")[0];
              let endTime = res.data.split("-")[1];
              this.isDuringDate(beginTime, endTime);
            } else {
              this.$util.redirectTo(
                "/pages/member/recharge/bankRecharge?bankDepositIdStr=" +
                  this.bankWay.bankDepositIdStr,
                {}
              );
            }
          }
          
        },
      });
    },
    kefupayClick() {
      let kefuUrl = this.$util.getKefuURL();
      // #ifdef H5
      window.open(kefuUrl);
      //window.location.href=redirectUrl;
      // #endif
      // #ifdef APP-PLUS
      plus.runtime.openURL(kefuUrl);
      //_this.src = res.data.url;
      // #endif
    },
    isDuringDate(beginTime, endTime) {
      let date = new Date();
      let nowHour = date.getHours();
      let nowMinute = date.getMinutes();
      let a = beginTime.split(":");
      let b = endTime.split(":");
      if (
        date.setHours(nowHour, nowMinute) >= date.setHours(a[0], a[1]) &&
        date.setHours(nowHour, nowMinute) <= date.setHours(b[0], b[1])
      ) {
        uni.showModal({
          showCancel: false,
          content:
            "非充值时间，请于" + endTime + "以后再使用，或您可以使用在线支付",
          success: function (res) {
            if (res.confirm) {
              return false;
            }
          },
        });
      } else {
        this.$util.redirectTo(
          "/pages/member/recharge/bankRecharge?bankDepositIdStr=" +
            this.bankWay.bankDepositIdStr,
          {}
        );
      }
    },
    otherWayClick(item) {
      let { card_type_id } = item;
      let ids = [14, 15];
      if (ids.includes(card_type_id)) {
        this.$util.redirectTo("/pages/member/recharge/rechargeTypeList/index", {
          card_type: item.card_type,
          isonline: item.isonline,
          card_type_id,
        });
      } else {
        this.$util.redirectTo("/pages/member/recharge/otherRecharge", {
          card_type: item.card_type,
          isonline: item.isonline,
        });
      }
    },
  },
  onLoad() {
    this.getRechargeTypeList();
  },
  onShow() {
  	this.$util.checkLogin();
  },
  mixins: [http],
};
</script>

<style lang="scss" scoped>
.page-body {
  min-height: 100vh;
  background-color: white;

  min-height: calc(100vh - 44px);

  .title {
    padding: 10rpx;
    border-bottom: 2rpx solid #eee;
  }

  .itemList {
    display: flex;
    flex-wrap: wrap;

    .item {
      box-sizing: border-box;
      width: 50%;
      height: 270rpx;
      border-bottom: 2rpx solid #eee;
      border-right: 2rpx solid #eee;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .title {
        font-size: 34rpx;
        font-weight: bold;
        border-bottom: none;
      }
      .desc {
        color: #a2a2a2;
      }
      .iconfont {
        font-size: 80rpx;
      }

      .iconchongzhi1 {
        color: #ed2d2f;
      }

      .yunshanfu {
        color: #274ec0;
      }

      .zhifubao {
        color: #1597ed;
      }

      .weixin {
        color: #39c964;
      }
    }

    .item:nth-child(2n) {
      border-right: none;
    }
  }
}
</style>
