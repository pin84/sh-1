<template>
  <div class="order-detail">
    <WHeader v-on="$listeners" />

    <div class="info">
      <div class="info-item" v-for="(n, index) in 3" :key="n">
        <div v-for="(item, idx) in nameList[index]" :key="idx">
          <span class="name">{{ item.lable }}</span>
          <span>{{ order[item.value] }}</span>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="left">投注内容</div>
      <div class="content-right">
        {{ order.content }}
      </div>
    </div>

    <div class="text">可能中奖的情况</div>
    <div class="table-box">
      <MyTable :list="order.possibleBonus" />
    </div>

    <div class="btn-box">
      <el-button class="btn" @click="$emit('addOrder', order)" type="danger"
        >再次下注</el-button
      >
      <el-button @click="$emit('close')" class="btn" type="danger">确定</el-button>
      <el-button v-if="false" class="btn" type="info">追号详单</el-button>
    </div>
  </div>
</template>

<script>
import WHeader from "@/views/games/components/widget/WHeader.vue";
import MyTable from "./table_2";
export default {
  props: {
    order: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      nameList: [
        [
          { lable: "用户名", value: "username" },
          { lable: "注单编号", value: "orderNumber" },
          { lable: "倍数模式", value: "beiShu" },
          { lable: "奖期", value: "numberOfPeriod" },
          { lable: "投注注数", value: "actionNum" },
        ],
        [
          { lable: "游戏", value: "gameName" },
          { lable: "投单时间", value: "actionTime" },
          { lable: "注单奖金", value: "bonus" },
          { lable: "开奖内容", value: "lotteryNo" },
        ],
        [
          { lable: "玩法", value: "playedName" },
          { lable: "总金额", value: "amount" },
          { lable: "动态返点", value: "null" },
          { lable: "订单状态", value: "status_cn" },
        ],
      ],
    };
  },
  components: {
    WHeader,
    MyTable,
  },



};
</script>
<style lang="scss" scoped>
.order-detail {
  background-color: #484544;
  width: 700px;
  height: 500px;
  border: 5px solid rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  color: #fff;
  display: flex;
  flex-direction: column;
  .info {
    display: flex;
    padding: 5px;
    font-size: 12px;
    color: #fff;
    .info-item {
      width: 33.33%;
      border-right: 1px solid #ccc;
      margin-right: 10px;
      line-height: 28px;
      padding-left: 5px;
      &:last-child {
        border-right: none;
      }
      .name {
        display: inline-block;
        width: 70px;
      }
    }
  }
  .content {
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    width: 98%;
    margin: 0 auto;
    height: 60px;
    padding: 5px;
    color: #000;
    font-size: 14px;
    margin-top: 10px;
    .left {
      line-height: 60px;
      padding: 0 20px;
      border-right: 1px solid #ccc;
      margin-right: 10px;
      font-size: 16px;
      flex: 0 0 70px;
    }
    .content-right{
      word-break: break-all;
    }

  }
  .text {
    font-size: 12px;
    text-align: center;
    padding: 10px;
  }
  .table-box {
    height: 100%;
  }
  .btn-box {
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    padding: 10px 0;
    .btn {
      width: 30%;
      height: 40px;
    }
  }
}
</style>