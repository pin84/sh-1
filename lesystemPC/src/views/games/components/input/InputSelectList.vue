<template>
  <div style="position: relative">
    <Input
      @blur="lostFocuse"
      @input="inputText"
      :disabled="isDisabled"
      class="input"
      v-model="num"
      @click="isShowList"
      :style="inputStyle"
    />
    <ul class="list" v-if="isShow">
      <li class="triangle"></li>
      <li
        @click="selectMoney(obj)"
        class="item"
        v-for="(obj, index) in moneyList"
        :key="index"
      >
        {{ obj.num }}元
      </li>
    </ul>
  </div>
</template>

<script>
import Input from "./Input_1";
export default {
  props: {
    isDisabled: {
      type: Boolean,
      default: () => false,
    },
    inputStyle: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isShow: false,
      num: null,
      moneyList: [],
    };
  },
  components: {
    Input,
  },

  // watch: {
  //   "$store.state.gd.clearSelect": function (val) {
  //     this.num = null;
  //   },
  // },

  methods: {
    isShowList() {
      let moneyList = JSON.parse(localStorage.getItem("moneyList"));
      if (!moneyList) {
        this.isShow = false;
        this.moneyList = [];
        return;
      }
      this.moneyList = moneyList;
      this.isShow = !this.isShow;
    },
    lostFocuse() {
      setTimeout(() => {
        this.isShow = false;
      }, 200);
    },
    inputText() {
      this.isShow = false;
      this.$emit("inputValue", this.num);
    },
    selectMoney(obj) {
      this.num = obj.num;
      this.isShow = false;
      this.$emit("inputValue", this.num);
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  width: 70px;
  height: 26px;
}

.list {
  position: absolute;
  width: 100%;
  // height:150px;
  top: 32px;
  border: 1px solid #ccc;
  background-color: #fff;
  z-index: 2;
  box-sizing: border-box;
  border-radius: 5px;
  padding-top: 7px;
  .item {
    padding: 6px 10px;
    z-index: 4;
    color: gray;
    font-size: 13px;
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
</style>
