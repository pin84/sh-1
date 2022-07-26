<template>
  <view class="usdt-addr">
    <view class="list">
      <view class="item" v-for="(item, index) in usdtList" :key="index">
        <view class="item-row">
          <text class="text-box">
            <text>{{item.remark}}</text>
            <text class="status" :class="item.className" >{{item.statusCn}}</text>
          </text>
          <text>{{item.usdt_protocol}}</text>
        </view>
        <view class="item-row">
          <text>{{item.usdt_address}}</text>
          <text>{{item.add_time}}</text>
        </view>
      </view>
    </view>
    <view class="btn-box">
      <button class="btn" @click="addUsdtAddr">添加USDT地址</button>

      <view class="tips"> 您已绑定2个USDT地址，最多可绑定5个地址 </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      usdtList: [1],
    };
  },

  created() {
    this.initData();
  },

  methods: {
    addUsdtAddr() {
      uni.navigateTo({
        url: "/pages/member/usdtAddr/addUsdtAddr",
      });
    },
    async initData() {
      let d = {
        url: this.$api.getUserAddressList,
      };

      let res = await this.$http(d);
      let arr = res.data.list
      arr.forEach(item => {
        switch (item.statusCn) {
          case '待审核':
            item['className']='status-1'
            break;
          case '已启用':
            item['className']='status-2'
            break;
          default:
             item['className']='status-3'
            break;
        }
      });
      this.usdtList = arr
      console.log("------", res);
    },
  },
};
</script>

<style lang="scss" scoped>
.usdt-addr {
  width: 100%;
  text-align: center;
  .list {
    .item {
      padding: 0 10rpx;
      border-bottom: 1px solid #ccc;
      .item-row {
        display: flex;
        justify-content: space-between;
        .text-box{
          display: flex;
          align-items: center;
          .status{
            color:#fff;
            font-size: 20rpx;
            padding: 5rpx;
            border-radius: 6rpx;
            margin-left: 10rpx;
          }
          .status-1{
            background-color: red;
          }
          .status-2{
            background-color: #03c300;
          }
          .status-3{
            background-color: orange;
          }
        }
      }

      &:first-child {
        border-top: 1px solid #ccc;
      }
    }
  }
  .btn-box {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .btn {
    width: 95%;
    font-size: 28rpx;
    margin: 40rpx 0 20rpx 0;
    padding: 10rpx 0;
    background-color: #444443;
    color: #fff;
  }
  .tips {
    width: 95%;
    color: #f46e00;
    background-color: #fffdeb;
    border: 1px solid #f8e2b9;
    padding: 15rpx;
  }
}
</style>