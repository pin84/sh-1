<template>
  <view class="add-usdt">
    <!-- <view class="tips pl">增加绑定USDT地址需提供最近一次绑定的地址信息！</view>

    <view class="list">
      <view class="item">
        <text class="label">{{ usdtList[0].label }}</text>
        <input
          class="input"
          :placeholder="usdtList[0].placeholder"
          type="text"
          v-model="usdtList[0].inputText"
        />
      </view>
    </view> -->
    <view class="list">
      <view class="item"> 新增USDT地址 </view>
    </view>
    <view class="list bb">
      <view
        class="item"
        v-for="(item, index) in usdtList"
        :key="index"
      >
        <text class="label">{{ item.label }}</text>

        <view v-if="index == 0" class="uni-list-cell-db">
          <picker
            @change="bindPickerChange"
            :value="selectIdnex"
            :range="ProtocolList"
          >
            <view class="uni-input">{{ ProtocolList[selectIdnex] }}</view>
          </picker>

          <text class="tips">
            提示：主网协议必须跟提现钱包或者交易所的协议一致！否则无法到账！
          </text>
        </view>
        <input
          v-else
          class="input"
          :placeholder="item.placeholder"
          type="text"
          v-model="item.inputText"
        />
      </view>
    </view>

    <view class="btn-box">
      <button class="btn bg-green" @click="submit">提交</button>
      <button class="btn bg-black" @click="reset">重填</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      selectIdnex: 0,
      ProtocolList: [],
      usdtList: [
        // {
        //   label: "USDT地址：",
        //   placeholder: "最近一次绑定的USDT提现地址",
        //   inputText: "",
        // },
        {
          label: "主网协议：",
          placeholder: "请选择主网协议",
        },
        {
          label: "地址",
          placeholder: "钱包或交易所的充值地址",
          inputText: "",
        },
        {
          label: "备注",
          placeholder: "关于此地址的一些备注,便于区分",
          inputText: "",
        },
      ],
    };
  },

  created() {
    // this.initPage();

    this.initData();
  },

  methods: {
    async submit() {
      let d = {
        url: this.$api.usdtAddressAdd,
        method: "POST",
        data: {
          bankId: this.ProtocolList[this.selectIdnex],
          address: this.usdtList[1].inputText,
          remark: this.usdtList[2].inputText,
        },
      };

      let res = await this.$http(d);

      let { code, message } = res;
      if (code > 0) {
        this.reset();
      }

      console.log(res);

      this.$util.showConfirm({
        content: message,
        showCancel:false
      });
    },
    async initData() {
      let res = await this.$http({ url: this.$api.getUsdtProtocol });
      let arr = Object.values(res);
      arr.unshift("请选择主网协议");
      this.ProtocolList = arr;
    },
    initPage() {
      this.usdtList.forEach((item) => {
        item.inputText = "";
      });
    },
    bindPickerChange(e) {
      let index = e.target.value;
      this.selectIdnex = index;
    },
    reset() {
      console.log("aaa");
      this.usdtList.forEach((item) => {
        item.inputText = "";
      });
      this.selectIdnex = 0;
      this.usdtList.push({});
      this.usdtList.pop();

      console.log(this.usdtList);
    },
  },
};
</script>

<style lang="scss">
.uni-input {
  padding: 0 10rpx;
  border: 1px solid #ccc;
  font-size: 24rpx;
}
</style>

<style lang="scss" scoped>
.add-usdt {
  .tips {
    color: #c42133;
    font-size: 24rpx;
    height: 40rpx;
  }
  .pl {
    padding: 30rpx;
    margin-bottom: 30rpx;
  }
  .list {
    .item {
      display: flex;
      align-items: center;
      border-top: 1px solid #ccc;
      padding: 20rpx 30rpx;
      .label {
        flex: 0 0 200rpx;
      }
      .input {
        font-size: 24rpx;
        width: 100%;
      }
    }
  }
  .bb {
    border-bottom: 1px solid #ccc;
  }
  .btn-box {
    display: flex;
    justify-content: space-around;
    margin-top: 30rpx;
    .btn {
      width: 45%;
    }
  }
}
</style>