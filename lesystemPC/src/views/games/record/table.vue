<template>
  <div class="m-table">
    <ul class="list">
      <li
        class="item"
        :class="{ no: idx == 0 }"
        v-for="(text, idx) in tableTitle"
        :key="idx"
      >
        {{ text }}
      </li>
    </ul>

    <ul class="list-d">
      <li @click="toDetail(item)" class="item" v-for="(item, index) in list" :key="index">
        <el-checkbox
          @change="changeCheked"
          v-if="item.isShowCheckbox"
          v-model="item.isChecked"
        ></el-checkbox>
        <div class="no no_c">{{ item.orderNumber }}</div>
        <div>
          {{ item.playedName }}
        </div>
        <div class="type">
          <span class="c_r">{{ item.numberOfPeriod }}</span>
        </div>
        <div class="type">{{ item.actionTime }}</div>
        <div class="c_r ellipsis">{{ item.content }}</div>
        <div>{{ item.beiShu }}倍 / {{item.mode_cn}}</div>
        <div>{{ item.amount }}</div>
        <div>{{ item.bonus }}</div>
        <div
          @click.stop="deleteOrder(item)"
          :class="{ 'delete-order': item.option == '可撤单' }"
        >
          {{ item.option }}
        </div>
        <div>
          <el-button
            @click.stop="$emit('addOrder', item)"
            class="btn"
            type="warning"
            round
            >再下一注</el-button
          >
        </div>
      </li>
    </ul>

    <MyMask v-if="isShow">
      <OrderDetail  v-on="$listeners"  @close='isShow = false'  :order='order' />
    </MyMask>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [{ N2: "a", N: "B", MxO: 1.9 }],
    },
    tableTitle: {
      type: Array,
      default: () => ["玩法", "项目", "注数", "赔率", "金额"],
    },
  },

  data(){
    return {
      isShow:false,
      order:{}
    }
  },

  components: {
    MyMask: () => import("@/views/games/components/mask/index.vue"),
    OrderDetail: () => import("./OrderDetail"),
  },

  methods: {
    toDetail(item){
      let {username}= this.$store.state.gd.userInfo
      item.username = username
      console.log(item);
      this.order = item
      this.isShow = !this.isShow
    },
    changeCheked() {
      this.list.push({});
      this.list.pop();

      this.$emit("changeSelected");
    },
    async deleteOrder(item) {
      this.$emit("deleteOrder", item);
    },
  },
};
</script>
<style lang="scss" scoped>
.m-table {
  width: 100%;
  height: 100%;
  color: #868686;
  user-select: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  .ellipsis {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  //  padding: 8px ;
  .no {
    flex: 0 0 16%;

    //  border:1px solid red;
  }
  .list {
    flex: 0 0 36px;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid gray;
    padding-left: 4px;
    .item {
      font-size: 13px;
      box-sizing: border-box;
      width: 10%;
      text-align: center;
    }
  }
  .list-d {
    background-color: #fff;
    flex-direction: column;
    box-sizing: border-box;
    // border:1px solid blue;
    height: 100%;
    .item {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 5px 0;
      padding-left: 5px;

      &:hover {
        background-color: #fffaec;
      }
      .btn {
        height: 18px;
        // line-height: 10px;
        font-size: 10px;
        padding: 3px 5px;
      }
      .delete-order {
        cursor: pointer;
        color: blue;
        text-decoration: underline;
      }
      .c_r {
        color: #ff6d53;
      }
      div {
        width: 10%;
        text-align: center;
        font-size: 13px;
        box-sizing: border-box;
      }
      .type {
        display: flex;
        flex-direction: column;
      }
      .no_c {
        color: #7269e6;
      }
    }
  }
}
</style>