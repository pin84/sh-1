<template>
  <div class="box">
    <input
      @click="isShowList"
      class="input"
      type="number"
      @input="inputText"
      @blur="lostFocuse"
      :style="styleObj"
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
export default {
  props: {
    styleObj: {
      type: Object,
      default: () => {
        return {
          height: '26px',
        }
      }
    }
  },
  data() {
    return {
      num: null,
      isShow: false,
      moneyList: []
    };
  },

  watch: {
    '$store.state.gd.clearSelect': function (val) {
      this.num = null
    }
  },

  created() {
    this.initData()
  },



  methods: {
    isShowList() {
      let moneyList = JSON.parse(localStorage.getItem('moneyList'))
      if (!moneyList) {
        this.isShow = false
        this.moneyList = []
        return
      }
      this.moneyList = moneyList
      this.isShow = !this.isShow
    },
    initData() {

    },
    lostFocuse() {
      setTimeout(() => {
        this.isShow = false
      }, 200)
    },
    selectMoney(obj) {
      this.num = obj.num
      this.isShow = false
      this.$emit("inputValue", this.num);
    },
    inputText() {
      this.isShow = false
      let val = this.num;
      if (val.indexOf(".") != -1) {
        val = val.replace(".", "");
      }
      // if (!val) {
      //   val = 1;
      // }


      if (val < 0) {
        val = 0;
      }
      if (val && String(val).startsWith("0")) {
        val = val.substring(1);
      }

      this.num = val;
      this.$emit("inputValue", this.num);
    },
  },
};
</script>

<style lang="scss" scoped>
$height: 26px;
.box {
  position: relative;
  .input {
    width: 100%;
    // height: 26px;
    border: none;
    outline: none;
    padding: 1px 5px;
    text-align: center;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }

  // input[type="number"] {
  //   -moz-appearance: textfield;
  // }
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
