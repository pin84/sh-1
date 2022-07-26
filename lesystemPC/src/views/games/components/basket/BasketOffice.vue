<template>
  <div class="list-wrapper">
    <ul class="list">
      <li class="item" v-for="(item, idx) in list" :key="idx">
        <span>{{ item.gName }}</span>
        <span class="numstr ellipsis">{{ item.numStr }}</span>
        <span>{{ item.modeName }}</span>
        <span>{{ item.num }}注</span>
        <span>{{ item.times }}倍</span>
        <span class="money ellipsis">{{ item.money }}元</span>
        <i @click="deleteItem(idx)" class="iconfont icon-guanbi"></i>
      </li>
    </ul>

    <ul class="list total">
      <li class="item">
        <span>选择</span>
        <span>
          <span class="ce">{{ totalNum }}</span>
          注
          <span class="ce">{{ listLen }}</span>
          单
        </span>
      </li>
      <li class="item">
        <span>投注</span>
        <span>
          <span class="ce">{{ totalMoney }}</span>
          元
        </span>
      </li>
      <li v-if="false" class="item">
        <span>追号</span>
        <span>无追号 </span>
      </li>
    </ul>

    <div class="btn-box">
      <div  v-if="false"  class="btns">
        <el-button class="btn1" type="info"
          ><i class="iconfont icon-fenxiang"></i> 我要追号</el-button
        >

        <el-checkbox-group class="btn" v-model="checkList">
          <el-checkbox label="官方跳开即停"></el-checkbox>
          <el-checkbox label="中奖后停止追号"></el-checkbox>
        </el-checkbox-group>
      </div>
      <el-button @click="buy" class="btn2" type="warning"
        ><i class="iconfont icon-zhengque"></i> 确认下注</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkList: ["选中且禁用", "复选框 A"],
      totalTitle: ["选择", "投注 ", "追号"],
      list: [],
      totalMoney: 0,
      totalNum: 0,
      listLen: 0,
    };
  },
  watch: {
    "$store.state.gd.basketList": {
      handler: function (val) {
        this.initData(val);
      },
      deep: true,
    },
  },

  created() {},

  methods: {
    initData(val) {
      val.forEach(item=>{
        item.money = this.$BDH.setNumDecimal( item.money,3);
      })
      this.list = val;
      let num = 0,
        money = 0;

      val.forEach((item) => {
        num += item.num;
        money += item.money;
      });
      this.totalMoney = this.$BDH.setNumDecimal(money,3);
      this.totalNum = num;
      this.listLen = this.list.length;
    },
    deleteItem(idx) {
      this.list.splice(idx, 1);
    },
    buy() {
      if (this.list.length == 0) {
        this.$alert("投注列表为空！", {
          showClose: false,
        });
        return;
      }

      let ts = new Date().getTime();
      this.$store.commit("toBuyNext", ts);
    },
  },
};
</script>

<style lang="scss" scoped>
.list-wrapper {
  
  display: flex;
  // background-color: #f1f1f1;
  .list {
    width: 50%;
    height: 150px;
    overflow-y: scroll;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-bottom: 1px solid #ccc;
      .icon-guanbi {
        padding: 3px 0;
        font-size: 24px;
        color: #cf271e;
      }
      .numstr {
        width: 160px;
      }
      .money {
        width: 100px;
      }
    }
  }
  .total {
    width: 20%;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    // align-items: space-between;
    justify-content: space-around;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    .item {
      padding: 0 10px;
      border-bottom: none;
      justify-content: space-between;
    }
  }

  .btn-box {
    // border:1px solid red;
    width: 30%;
    padding: 10px 40px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .btns {
      display: flex;
      justify-content: space-between;
      .btn1 {
        font-size: 18px;
      }
      .btn {
        margin-left: 20px;
      }
    }
    .btn2 {
      font-size: 20px;
      .iconfont {
        font-size: 20px;
      }
    }
  }
  .ce {
    color: #f00;
  }
}
</style>