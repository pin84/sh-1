<template>
  <view class="result-list" style="border-top: 1px solid #ccc">
    <view v-if="resultShowType === 1">
      <view class="title-box">
        <view class="text-bold">期数</view>
        <view class="text-bold">开奖号码</view>
        <view class="text-bold">开奖时间</view>
      </view>
      <view class="list">
        <view
          v-for="(item, index) in resultList"
          :key="index"
          class="item flex justify-between bg-white align-center"
          style="padding: 0"
        >
          <view class="time">
            <text>第</text>
            <text class="text-red text-bold">{{ item.period }}</text>
            <text>期</text>
          </view>
          <view class="num-box t1">
            <text
              class="num text-xxl"
              v-for="(n, index) in item.result"
              :key="index"
              >{{ n }}{{ index == item.result.length - 1 ? " = " : " + " }}
            </text>
            <text class="num"> {{ item.sum }}</text>
          </view>
          <view class="detail-time">{{ item.date }}</view>
        </view>
      </view>
    </view>

    <view v-if="resultShowType === 2">
      <view class="cu-form-group">
        <view class="text-center text-bold" style="min-width: 230rpx"
          >开奖时间</view
        >
        <view class="text-center text-bold" style="width: 100%">开奖号码</view>
      </view>
      <view class="list">
        <view
          v-for="(item, index) in resultList"
          :key="index"
          class="item flex justify-between bg-white align-center"
        >
          <view class="time">
            <view style="line-height: 30rpx">
              <text>第</text>
              <text class="text-red text-bold">{{ item.period }}</text>
              <text>期</text>
              <br />
              <text>{{ item.date }}</text>
            </view>
          </view>
          <view class="num-box flex">
            <text
              class="num"
              style="color: #fff"
              :style="{ backgroundColor: numBackground[Number(n % 10)] }"
              v-for="(n, index) in item.result"
              :key="index"
              >{{ n }}</text
            >
          </view>
        </view>
      </view>
    </view>
    <view v-if="resultShowType === 3">
      <view class="cu-form-group">
        <view class="text-center text-bold" style="min-width: 230rpx"
          >开奖时间</view
        >
        <view class="text-center text-bold" style="width: 100%">开奖号码</view>
      </view>
      <view class="list">
        <view
          v-for="(item, index) in resultList"
          :key="index"
          class="item flex justify-between bg-white align-center"
        >
          <view class="time">
            <view style="line-height: 30rpx">
              <text>第</text>
              <text class="text-red text-bold">{{ item.period }}</text>
              <text>期</text>
              <br />
              <text>{{ item.date }}</text>
            </view>
          </view>
          <view class="lhc-num-box">
            <view class="num-box flex">
              <text
                class="num"
                style="color: #fff"
                :style="{ color: numBackground[Number(n % 10)] }"
                v-for="(n, index) in item.result"
                :key="index"
                v-show="index != item.result.length - 1"
                >{{ n }}
              </text>
              +
              <text
                class="num"
                style="color: #fff"
                :style="{
                  color:
                    numBackground[
                      Number(item.result[item.result.length - 1] % 10)
                    ],
                }"
              >
                {{ item.result[item.result.length - 1] }}</text
              >
            </view>
            <view class="num-box flex">
              <text
                class="num"
                :style="{ color: numBackground[item.result[index] % 10] }"
                v-for="(n, index) in item.result1"
                :key="index"
                v-show="index != item.result1.length - 1"
                >{{ n }}</text
              >
              <text style="margin: 0 9rpx;"></text>
              <text
                :style="{ color: numBackground[item.result[item.result.length - 1] % 10] }"
                class="num"
                >{{ item.result1[item.result1.length - 1] }}</text
              >
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import ids from "@/pages/gamesIm/ids.js";
export default {
  data() {
    return {
      resultShowType: 2,
      resultLength: 5,
      resultList: [],
      numBackground: {
        0: "#5234ff",
        1: "#bbb407",
        2: "#0092dd",
        3: "#4b4b4b",
        4: "#ff7600",
        5: "#129d9f",
        6: "#07bf00",
        7: "#9d9d9d",
        8: "#ff2600",
        9: "#780b00",
      },

      shengxiaoColor: {
        "#c4213": ["马", "鼠", "兔", "龙", "蛇", "猴", "鸡", "羊", "虎", "牛"],
        "#38b81b": [],
        "#2373d6": [],
      },
    };
  },

  watch: {
    "$store.state.GDV3.latestPriodData": {
      handler: function (val) {
        this.initData();
      },
      deep: true,
    },
  },

  created() {
    this.initData();
  },
  methods: {
    async initData() {
      let routes = getCurrentPages()
      let { id } = routes[routes.length - 1].options
      id = Number(id);

      let d = {
        url: this.$api.getGameResultList,
        isShowLoading: false,
        data: {
          gameId: id,
        },
      };
      //
      let res = await this.$http(d);


      let curIdType;
      for (let [key, value] of Object.entries(ids)) {
        if (value.includes(id)) {
          curIdType = key;
          break;
        }
      }

      let resultShowType;
      if (curIdType == 118) {
        resultShowType = 1;
        res.data.forEach((item) => {
          item.date = item.date.split(" ")[1];
          let arr = item.result.split(",");
          item.result = arr;
          let sum = arr.reduce((accumulator, currentValue) => {
            return accumulator + Number(currentValue);
          }, 0);
          item.sum = sum;
        });
      } else if (curIdType == 1) {
        resultShowType = 3;
        res.data.forEach((item) => {
          item.date = item.date.split(" ")[1];
          item.result = item.result.split(",");
          item.result1 = [
            item.zm1sx,
            item.zm2sx,
            item.zm3sx,
            item.zm4sx,
            item.zm5sx,
            item.zm6sx,
            item.zm7sx,
          ];
        });
      } else {
        resultShowType = 2;
        res.data.forEach((item) => {
          item.date = item.date.split(" ")[1];
          item.period = item.period.slice(4);
          item.result = item.result.split(",");
        });
      }

      this.resultShowType = resultShowType;

      if (id == 28) {
        res.data = res.data.slice(0, 6);
      }

      this.resultList = res.data;

      this.$emit('changeResult',this.resultList[0].result)
    },
  },
};
</script>

<style lang="scss" scoped>
.title-box {
  display: flex;
  padding: 10rpx 20rpx;
  padding-left: 80rpx;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
.result-list {
  box-shadow: 0 3px 3px gray;
  background-color: #fff;
  .cu-form-group {
    border-bottom: 1px solid #ccc;
    padding: 0;
    min-height: 80rpx;
  }
  .list {
    max-height: 800rpx;
    overflow: scroll;
    background-color: #fff;
    .item {
      border-top: none;
      padding: 10rpx 0;
      .time {
        position: relative;
        border-right: 1px solid #ccc;
        min-height: 70rpx;
        line-height: 70rpx;
        text-align: center;
        flex: 0 0 230rpx;
        padding: 10rpx 0;
      }
      .time::after {
        content: "";
        position: absolute;
        border-bottom: 1px solid #ccc;
        height: 2rpx;
        width: 40rpx;
        right: -20rpx;
        top: 45%;
        display: block;
      }
      .num-box {
        width: 100%;
        padding: 0 15rpx 0 20rpx;
        margin-left: 15rpx;
        flex-wrap: wrap;
        .num {
          display: inline-block;
          width: 40rpx;
          height: 40rpx;
          line-height: 40rpx;
          border-radius: 50%;
          text-align: center;
          color: #dc3b40;
          margin-right: 5rpx;
          font-size: 28rpx;
          margin-bottom: 5rpx;
        }
      }

      .lhc-num-box {
        width: 100%;
        display: flex;
        flex-direction: column;
        .num-box {
          align-items: center;
        }
      }
      .t1 {
        padding-left: 60rpx;
      }

      .detail-time {
        flex: 0 0 140rpx;
        color: #525151;
      }
    }
  }
}
</style>
