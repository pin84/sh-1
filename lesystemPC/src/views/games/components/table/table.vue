<template>
  <div class="m-table">
    <ul class="list">
      <li class="item" v-for="(text,idx) in tableTitle" :key="idx">{{text}}</li>
    </ul>
    <ul class="list list-d">
      <li class="item" v-for="(item,index) in list" :key="index">
        <div>{{item.N2}}</div>
        <div>{{item.N}}</div>
        <div>{{item.len ||1}}</div>
        <div>{{item.MxO}}</div>
        <div>
          <Input class="input" v-model="item.money" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Input from "@/views/gamesIndia/components/input/Input_1.vue";
export default {
  props: {
    tableTitle: {
      type: Array,
      default: () => ["玩法", "项目", "注数", "赔率", "金额"],
    },
    list: {
      type: Array,
      default: () => [{ N2: "a", N: "B", MxO: 1.9 }],
    },
  },

  components: {
    Input,
  },
};
</script>
<style lang="scss" scoped>
.m-table {
  width: 100%;
  color: #868686;
  user-select: none;
  .list {
    display: flex;
    background-color: #f6f6f6;
    .item {
      padding: 8px 0;
      width: 100%;
      text-align: center;
    }
  }
  .list-d {
      background-color: #fff;
      flex-direction: column;
    .item {
      width: 100%;
      display: flex;
      align-items: center;
      &:hover{
        background-color: #fffaec;
      }
      div {
        width: 100%;
        text-align: center;
        .input {
          border: 1px solid #d5d2f8;
          height: 28px;
          border-radius: 20px;
          color: #ff6d53;
          width: 112px;
        }
      }
    }
  }
}
</style>