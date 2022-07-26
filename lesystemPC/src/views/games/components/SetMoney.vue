<template>
  <div class="wrapper" v-if="centerDialogVisible">
    <div class="body">
      <div class="title">
        <span>快选金额</span>
        <i @click="close" class="iconfont icon-cuo close pointer"></i>
      </div>
      <div class="body-content">
        <div style="fontSize:12px;">
          注意：设置只保存在您的电脑，清空浏览器缓存或更换电脑会显示默认值。
        </div>
        <ul class="list">
          <li class="item" v-for="(money, idx) in moneyList" :key="idx">
            <span class="input-box">
              <Input class="input" v-model="moneyList[idx].num" />
              <span
                @click="add"
                class="del pointer"
                v-if="idx == moneyList.length - 1 && moneyList.length < 5"
                >增加</span
              >
            </span>
            <span class="del pointer" @click="delMoney(idx)">删除</span>
          </li>
        </ul>
        <div class="tip">{{ tips }}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="forbid">{{
          btnType == 0 ? "禁 用" : "启 用"
        }}</el-button>
        <el-button type="success" @click="save">保 存</el-button>
      </span>
    </div>
  </div>
</template>
<script>
import Input from "@/views/games/components/input/Input_1";
export default {
  data() {
    return {
      btnType: 0,
      tips: "",
      isShowAdd: true,
      centerDialogVisible: false,
      moneyList: [
        { num: 100 },
        { num: 200 },
        { num: 500 },
        { num: 1000 },
        { num: 5000 },
      ],
    };
  },
  components: {
    Input,
  },

  watch: {
    "$store.state.gd.showSetMoney": function (val) {
      this.initData(val);
    },
  },

  methods: {
    close() {
      this.$store.commit("showSetMoney", 0);
    },
    add() {
      let len = this.moneyList.length
      if(len == 5){
        this.isShowAdd = false
        return 
      }
      this.moneyList.push({});
    },
    save() {
      localStorage.setItem("moneyList", JSON.stringify(this.moneyList));
      this.tips = "保存本地成功";
      this.btnType = 0;
    },
    forbid() {
      if (this.btnType == 0) {
        localStorage.removeItem("moneyList");
        this.tips = "已禁用";
        this.btnType = 1;
      } else {
        localStorage.setItem("moneyList", JSON.stringify(this.moneyList));
        this.tips = "已启用";
        this.btnType = 0;
      }
    },
    delMoney(idx) {
      if (this.moneyList.length == 1) {
        this.tips = "至少保留一项";
        setTimeout(() => {
          this.tips = "";
        }, 2000);
        return;
      }
      this.moneyList.splice(idx, 1);
      this.isShowAdd = true;
    },
    closeDialog() {
      this.$store.commit("basketList", "clearBasket");
      this.centerDialogVisible = false;
    },
    initData(val) {
      if (!val) {
        this.centerDialogVisible = false;
        return;
      }
      this.centerDialogVisible = true;

      let moneyList = JSON.parse(localStorage.getItem("moneyList"));
      if (moneyList) {
        this.moneyList = moneyList;
      } else {
        this.btnType = 1;
        return;
      }

      if (this.moneyList.length == 5) {
        this.isShowAdd = false;
      } else {
        this.isShowAdd = true;
      }

      localStorage.setItem("moneyList", JSON.stringify(this.moneyList));
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
}

.body {
  background-color: #fff;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  padding-bottom: 10px;
  .title {
    width: 100%;
    background-color: #cf271e;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    .close {
      padding: 10px;
    }
  }
  .body-content {
    // max-height: 200px;
    overflow-y: scroll;
    padding: 10px;
    .tip {
      color: red;
      text-align: center;
      margin-top: 10px;
      font-size: 13px;
    }
    .list {
      // display: flex;
      // justify-content: space-around;
      .item {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 10px;
        .input-box {
          flex: 0 0 180px;
          .input {
            margin-right: 10px;
          }
        }
        .del {
          background-color: #414141;
          color: #fff;
          padding: 10px 15px;
          border-radius: 3px;
          // margin-left:10px;
        }
      }
    }
  }
}
</style>