<template>
  <view class="foot-wrapper">
    <view class="foot flex align-center">
      <view class="flex align-center" style="width: 100%">
        <view class="icon-box">
          <view v-if="isShowBasket">
            <view v-if="isShowTipBox" class="tip-box"
              ><TipList @clickEvent="clickEvent" :textList="textList"
            /></view>
            <view class="flex-sub text-center" style="flex: 0 0 100rpx">
              <i
                v-if="$store.state.gameDataV2.isHasSelected"
                @click="clearNum"
                class="iconfont icon-huishouzhan"
                style="color: #585858"
              ></i>
              <i
                @click="shuiju"
                v-else
                class="iconfont icon-suiji"
                style="color: #585858"
              ></i>
            </view>
          </view>

          <view v-else>
            <view class="flex-sub text-center" style="flex: 0 0 100rpx"
              ><i
                @click="clearMoney"
                class="iconfont icon-huishouzhan"
                style="color: #585858"
              ></i
            ></view>
          </view>
        </view>

        <view style="width: 100%">
          <input
            class="my-input"
            v-if="isShowBasket"
            v-model="inputNum"
            type="number"
            placeholder="输入金额"
            @input="inputValue"
          />

          <view v-else>
            <input
              @input="checkInput"
              class="my-input"
              v-if="isDone"
              v-model="inputNumBasket"
              type="number"
              placeholder="输入金额"
            />

            <view
              v-else
              class="flex align-center text-white"
              style="width: 100%"
            >
              <text
                @click="isChecked = !isChecked"
                v-if="isChecked"
                class="iconfont icon-3209268-boxformrectanglesquareuncheck"
                style="font-size: 12rpx"
              ></text>
              <text
                @click="isChecked = !isChecked"
                v-else
                class="iconfont icon-duoxuanyidong"
                style="font-size: 12rpx"
              ></text>
              <text class="margin-left-xs text-lg">按最新赔率提交</text>
            </view>
          </view>
        </view>
      </view>

      <view class="btn-box flex justify-around">
        <view class="btn btn-left" v-if="isShowBasket" @click="addOrder('0')"
          >立即下注
          <text v-if="countdown">({{ countdown }})</text>
        </view>
        <view class="btn btn-right" @click="submitSelect">
          <text v-if="isDone">{{
            isShowBasket ? "确认选号" : "确认金额"
          }}</text>
          <text @click="addOrder('1')" v-else
            >确认下注

            <text v-if="countdown">({{ countdown }})</text>
          </text>
          <text v-if="numLength !== 0 && isShowBasket" class="num">{{
            numLength
          }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import TipList from "@/pages/games/common/TipList";
export default {
  props: {
    isShowBasket: {
      //
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      countdown: 0,
      inputNum: "",
      inputNumBasket: "",
      numLength: 0,
      isDone: true,
      isChecked: true,
      dialogContent: "",
      isShowDialog: false,
      isShowLeftBtn: true,
      textList: ["1注", "5注", "10注"],
      isShowTipBox: false,
      dataList: [], //缓存游戏数据
    };
  },
  components: {
    TipList,
  },
  watch: {
    isShowBasket: {
      handler: function (val) {
        if (val) {
          this.isDone = true;
          this.inputNumBasket = "";
        }
      },
    },

    "$store.state.gameDataV2.d1": {
      handler: function (val) {
        this.initData(val);
      },
      deep: true,
    },

    "$store.state.gameDataV2.numBasket": {
      handler: function (val) {
        this.numLength = val.length;
      },
      deep: true,
    },
  },

  mounted() {
    let arr = this.$store.state.gameDataV2.d1;
    this.initData(arr);
  },
  methods: {
    inputValue() {
      this.inputNum = this.$util.inputDataHandler(this.inputNum);
    },
    async addOrder(type) {
      if (this.countdown) return;
      let { status } = this.$store.state.GDV3.v4latestPriodData;
      if (status == 0) {
        this.$util.showConfirm({
          content: "当前未开盘",
          showCancel: false,
        });
        return;
      }

      // let { closeTime, gameID, fid } = this.$store.state.gameData.indexGameData;

      let dArr;
      if (type == "0") {
        let arrBasket = this.dataListHanddler_basket(
          this.$store.state.gameDataV2.numBasket
        );
        let arrSelect = this.dataListHanddler(this.$store.state.gameDataV2.d1);
        dArr = arrSelect.concat(arrBasket);
      } else {
        dArr = this.dataListHanddler_basket(
          this.$store.state.gameDataV2.numBasket
        );
      }

     

      if (dArr.length == 0) {
        this.$util.showToast({ title: "您还没有勾选" });
        return;
      }

      this.countdown = 3;
      let interval = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          this.countdown = 0;
          clearInterval(interval);
        }
      }, 1000);

      if (type == "0") {
        if (this.inputNum == "") {
          let flag = false;

        
          dArr.forEach((item) => {
            if (item.amount == "") {
              flag = true;
            }
          });

          if (flag) {
            await this.$util.showConfirm({
              showCancel: false,
              content: "请输入有效金额！",
            });
            return;
          }
        } else {
          dArr.forEach((item) => {
            if (item.amount == "") {
              item.amount = this.inputNum;
            }
          });
        }
      }

      // let money = dArr.reduce((accumulator, currentValue) => {
      //   return accumulator + Number(currentValue.amount);
      // }, 0);
      // let { coin } = uni.getStorageSync("userInfo");

      let { closeTime, gameID, numberOfPeriod, fid } =
        this.$store.state.GDV3.v4latestPriodData;

      let { selectBack } = this.$store.state.gameDataV2.rate;

      console.log('-2--',selectBack);
      let d = {
        url: this.$api.sscAddOrders,
        data: {
          kjTime: new Date(closeTime.replace(/-/g, "/")).getTime() / 1000,
          gameId: gameID,
          periodId: fid,
          selectBack,
          numberOfPeriod,
          orderList: JSON.stringify(dArr),
        },
      };

      let flag = this.$buyDataHandler.checkSameOrder(d.data);
      if (!flag) {
        let flag1 = await this.$util.showConfirm({
          content: "你已提交过相同的订单，是否继续",
        });
        if (!flag1) {
          return;
        }
      }

      console.log("-buy d-", d);
      let res = await this.$http(d);
      console.log("-buy res-", res);
      if (res.code > 0) {
        let ts = new Date().getTime();
        this.$store.commit("updateRecord", ts);
        this.$store.commit("setCancelAll", ts);
        this.$store.commit("setNumBasket", []);
        this.$store.commit("setNumFormData", []);

        this.$emit("buyDone");

        this.inputNum = "";

        let flag = await this.$util.showConfirm({
          content: "投注成功",
          confirmText: "继续下注",
          cancelText: "查看记录",
        });

        if (!flag) {
          this.$store.commit("v3ShowRecord", true);
        }
      } else {
        let flag = await this.$util.showConfirm({ content: res.message,showCancel:false });

        // if (flag) {
        //   uni.navigateTo({
        //     url: "/pages/member/recharge/recharge",
        //   });
        // }
      }
    },
    dataListHanddler_basket(arr) {
      let temArr = [];
      let t = new Date().getTime();
      arr.forEach((inItem) => {
        temArr.push({
          id: inItem.C.I,
          amount: inItem.money,
          odds: inItem.C.curMxO,
          goal: inItem.C.I,
          timestamp: t,
        });
      });

      return temArr;
    },

    dataListHanddler(arr, reset = false) {
      let aaa = arr;

      let temArr = [];
      let bbb = arr;
      let t = new Date().getTime();
      arr.forEach((outItem) => {
        outItem.C.forEach((inItem) => {
          if (reset) {
            inItem.active = false;
          } else {
            if (inItem.active) {
              temArr.push({
                id: inItem.I,
                amount: this.inputNum,
                odds: inItem.curMxO,
                goal: inItem.I,
                timestamp: t,
              });
            }
          }
        });

        if (outItem.bottomText) {
          outItem.bottomText.forEach((bItem) => {
            if (reset) {
              bItem.active = false;
            } else {
              if (bItem.active) {
                temArr.push({
                  id: bItem.I,
                  amount: this.inputNum,
                  odds: bItem.curMxO,
                  goal: bItem.I,
                  timestamp: t,
                });
              }
            }
          });
        }
      });

      return temArr;
    },

    clearMoney() {
      if (!this.isDone) {
        this.$emit("showNumForm", true);
        this.isDone = true;
      } else {
        let basket = this.$store.state.gameDataV2.numBasket;
        basket.forEach((item) => {
          item.money = "";
        });
      }
    },
    initData(arr) {
      let temArr = [];
      arr.forEach((item) => {
        item.C.forEach((inItem) => {
          let obj = {
            N: item.N,
            C: inItem,
            money: this.inputNum,
          };
          temArr.push(obj);
        });
        if (item.bottomText) {
          item.bottomText.forEach((inItem) => {
            let obj = {
              N: item.N,
              C: inItem,
              money: this.inputNum,
            };
            temArr.push(obj);
          });
        }
      });

      this.dataList = temArr;
    },
    clickEvent(text) {
      let temArr = [];
      let len = this.dataList.length - 1;
      let money = "";
      if (this.inputNum !== "") {
        money = this.inputNum;
      }
      switch (text) {
        case "1注":
          let obj = this.dataList[this.$util.createRandomNum(0, len)];
          obj["money"] = money;
          temArr.push(obj);
          break;
        case "5注":
          for (let i = 0; i < 5; i++) {
            let obj = this.dataList[this.$util.createRandomNum(0, len)];
            obj.money = money;
            temArr.push(obj);
          }
          break;

        case "10注":
          for (let i = 0; i < 10; i++) {
            let obj = this.dataList[this.$util.createRandomNum(0, len)];
            obj.money = money;
            temArr.push(obj);
          }
          break;
        default:
          break;
      }
      let arrBasket = this.$store.state.gameDataV2.numBasket;
      arrBasket.push(...temArr);
      this.$store.commit("setNumBasket", arrBasket);
      this.$emit("submitSelect");
      this.isShowTipBox = false;
      this.inputNum = "";
    },

    shuiju() {
      this.isShowTipBox = !this.isShowTipBox;
    },
    clearNum() {
      let time = new Date().getTime();
      this.$store.commit("setCancelAll", time);
    },

    submitSelect() {
      if (this.isShowBasket) {
        let arr = this.$store.state.gameDataV2.d1;
        let temArr = [];
        arr.forEach((item) => {
          item.C.forEach((inItem) => {
            if (inItem.active) {
              let obj = {
                N: item.N,
                C: inItem,
                money: this.inputNum,
              };
              temArr.push(obj);
            }
          });
          if (item.bottomText) {
            item.bottomText.forEach((inItem) => {
              if (inItem.active) {
                let obj = {
                  N: item.N,
                  C: inItem,
                  money: this.inputNum,
                };
                temArr.push(obj);
              }
            });
          }
        });

        if (temArr.length == 0 && this.numLength == 0) {
          this.$util.showToast({ title: "您还没有勾选" });
          return;
        }

        let arrBasket = this.$store.state.gameDataV2.numBasket;
        arrBasket.push(...temArr);
        this.$store.commit("setNumBasket", arrBasket);

        let num = this.$store.state.gameDataV2.isHasSelected;
        this.$store.commit("setIsHasSelected", -num);
        this.$emit("submitSelect");
        this.inputNum = "";
      } else {
        let basket = this.$store.state.gameDataV2.numBasket;
        let index = basket.findIndex((item) => item.money == "");

        if (index !== -1) {
          this.$util.showToast({
            title: `[ ${basket[index].C.N} ]  金额不能为空`,
          });
          return;
        }
        this.$store.commit("setNumFormData", basket);
        this.$emit("showNumForm", false);
        this.isDone = false;
        this.inputNumBasket = "";
      }
    },

    checkInput() {
      this.inputNumBasket = this.$util.inputDataHandler(this.inputNumBasket);
      let basket = this.$store.state.gameDataV2.numBasket;
      let num = Number(this.inputNumBasket);
      basket.forEach((item) => {
        item.money = num;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.foot-wrapper {
  .foot {
    // border: 1px solid red;
    justify-content: space-between;
    // height: 120rpx;
    padding: 10rpx 0;
    background-color: black;
    .icon-box {
      position: relative;
      padding: 0 30rpx;
      .tip-box {
        position: absolute;
        left: 0;
        bottom: 100%;
        width: 100%;
        transform: translateY(-10rpx);
      }
    }
    .my-input {
      color: #bebebe;
      font-size: 36rpx;
    }
    .iconfont {
      font-size: 48rpx;
    }

    .btn-box {
      padding-right: 10rpx;
      .btn {
        min-width: 180rpx;
        padding: 0 10rpx;
        height: 75rpx;
        line-height: 75rpx;
        text-align: center;
        color: #fff;
        font-size: 30rpx;
        border-radius: 10rpx;
        margin-left: 10rpx;
      }
      .btn-left {
        background-color: #e1222a;
      }
      .btn-right {
        position: relative;
        background-color: #e58b30;
        .num {
          position: absolute;
          width: 35rpx;
          height: 35rpx;
          line-height: 35rpx;
          text-align: center;
          border: 1px solid red;
          right: 0rpx;
          top: -10rpx;
          font-size: 24rpx;
          border-radius: 50%;
          background-color: #f00;
        }
      }
    }
  }
}
</style>
