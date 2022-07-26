<template>
  <div class="top-bar">
    <div class="top">
      <div v-show="isShowRandom" class="random-box">
        <span>随机 &nbsp;</span>
        <!-- <input class="input" v-model="inputNum" placeholder="1" /> -->
        <Input @inputValue="inputValue" />
        <span>&nbsp;&nbsp;注</span>

        <div @click="addRandom" class="random pointer">
          <i class="iconfont icon-suiji"></i>
          <span>随机</span>
        </div>
      </div>
      <div style="margin:0 80px;">投注列表</div>

      <div @click="clearBasket" class="random pointer">
        <i class="iconfont icon-huishouzhan"></i>
        <span>清空</span>
      </div>
    </div>

    <div class="top top-right">
      <div>操作状态</div>

      <el-switch
        v-model="switchValue"
        active-color="#13ce66"
        inactive-color="gray"
        active-text="是否锁定倍数"
      ></el-switch>
    </div>
  </div>
</template>
<script>
import Input from "@/views/games/components/input/Input";
export default {
  props: {
    isShowRandom: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      switchValue: true,
      inputNum: 1,
    };
  },
  components: {
    Input,
  },

  methods: {
    addRandom() {
      let ts = new Date().getTime();
      this.$store.commit("addRandom", { ts, n: this.inputNum });
    },
    inputValue(n) {
      this.inputNum = n;
    },
    clearBasket() {
      this.$store.commit("basketList", "clearBasket");
    },
  },
};
</script>
<style lang="scss" scoped>
.top-bar {
  user-select: none;
  display: flex;
  width: 100%;
  box-sizing: border-box;
  .top {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px 20px;
    background-color: #dddddd;
    width: 50%;
    box-sizing: border-box;
    .random-box {
      display: flex;
      align-items: center;
      .input {
        width: 40px;
        text-align: center;
        outline: none;
        padding: 5px !important;
      }
    }

    .random {
      color: #fff;
      background-color: #cf0f00;
      padding: 5px 10px;
      border-radius: 5px;
      margin-left: 20px;
      .iconfont {
        margin-right: 10px;
      }
    }
  }
  .top-right {
    box-sizing: border-box;
    width: 50%;
    justify-content: space-around;
  }
}
</style>