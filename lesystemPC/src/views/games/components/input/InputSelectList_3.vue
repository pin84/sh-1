<template>
  <div class="box" v-if="isShowInput">
    <Input
      @blur="lostFocuse"
      @input="input"
      :disabled="isDisabled"
      class="input"
      @click="isShowList"
      v-model="inputText"
    />
    <ul class="list" v-if="isShow && moneyList.length">
      <li class="triangle"></li>
      <li
        class="item"
        @click="selectMoney(money)"
        v-for="(money, index) in moneyList"
        :key="index"
      >
        {{ money.num }}元
      </li>
    </ul>
  </div>
</template>


<script>
import Input from "@/views/games/components/input/Input_1.vue";
export default {
  props: {
    isShowInput: {
      type: Boolean,
      default: () => true,
    },
  },

  watch: {
    "$store.state.gd.clearInput": function (val) {
      this.inputText = ''
    },
  },

  data() {
    return {
      moneyList: [100, 200, 500],
      inputText: "",
      isDisabled: false, //input
      status: 0,
      isShow: false,
    };
  },
  components: {
    Input,
  },

  methods: {
    input() {
      this.isShow = false
      this.$emit("input", this.inputText);

    },
    selectMoney(money) {
      this.inputText = money.num;
      this.lostFocuse();
      this.$emit("input", this.inputText);
    },
    isShowList() {
      let moneyList = JSON.parse(localStorage.getItem("moneyList"));

      
      if (!moneyList) {
        moneyList = [];
      }
      this.moneyList = moneyList;
      this.isShow = !this.isShow;
    },

    lostFocuse() {
      setTimeout(() => {
        this.isShow = 0;
      }, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
$numWidth: 26px;
$w-box: 45%;
.box {
  width: 100%;
  position: relative;
  .input {
    height: 25px;
  }
  .list {
    position: absolute;
    width: 65px;
    // height: 160px;
    top: 32px;
    border: 1px solid #ccc;
    background-color: #fff;
    z-index: 2;
    box-sizing: border-box;
    border-radius: 5px;
    padding-top: 7px;
    .item {
      padding: 4px 10px;
      z-index: 4;
      color: gray;
      font-size: 12px;
      &:hover {
        background-color: #dcdcdc;
        cursor: pointer;
      }
    }
    .triangle {
      width: 10px;
      height: 10px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-right: none;
      border-bottom: none;
      position: absolute;
      top: -7px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      z-index: 3;
    }
  }
}
</style>