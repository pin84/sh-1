<template>
  <div class="m-table">
    <ul class="list">
      <li class="item" v-for="(text, idx) in tableTitle" :key="idx">
        {{ text }}
      </li>
    </ul>
    <ul class="list list-d">
      <li class="item" v-for="(item, index) in list" :key="index">
        <div>{{ item.playedName }}</div>
        <div class="content">
          {{ item.bContent }}
          </div>
        <div>{{ item.beiShu }}</div>
        <div>{{ item.bonusGrade }}</div>
        <div>{{ item.baseBonus }}</div>
        <div>{{ item.getBonus }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tableTitle: {
      type: Array,
      default: () => ["奖级名称", "号码", "倍数", "奖级", "奖金", "中奖奖金"],
    },
    list: {
      type: Array,
      default: () => [{ N2: "a", N: "B", MxO: 1.9 }],
    },
  },
};
</script>
<style lang="scss" scoped>
$H: 28px;
.m-table {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
  color: #868686;
  user-select: none;
  font-size: 12px;
  color: #000;
  .list {
    display: flex;
    background-color: #f6f6f6;
    background-color: rgb(213, 223, 226);
    .item {
      height: $H;
      line-height: $H;
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
      height: $H;
      line-height: $H;
      align-items: center;
      &:hover {
        background-color: #fffaec;
      }
      div {
        width: 100%;
        text-align: center;
        border-bottom: 1px solid #f1f1f1;
      }
      .content {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>