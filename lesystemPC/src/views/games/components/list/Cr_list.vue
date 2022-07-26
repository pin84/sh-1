<template>
  <ul class="list-num">
    <li
      @click="selectItema(obj)"
      class="list-num-item"
      :class="{ active: obj.active }"
      v-for="(obj, index) in list"
      :key="index"
    >
      <div class="num-box">
        <div v-if="Array.isArray(obj.N)" class="array-box">
          <div v-for="(n, idx) in obj.N" :key="idx" class="bg" :class="'k3_' + n"></div>
        </div>
        <div v-else-if="obj.showPoint" class="num">{{ obj.N }}</div>
        <div v-else class="bg" :class="'k3_' + obj.N"></div>
      </div>
      <span class="odds" :class="{ gray: status }">{{
        status ? "封盘" : obj.odds || 0
      }}</span>
      <span class="box" v-if="isShowInput">
        <Input
          @blur="lostFocuse"
          @input="inputText(obj)"
          :disabled="isDisabled"
          class="input"
          v-model="obj.money"
          @click="isShowList(obj)"
        />
        <ul class="list" v-if="curShowSelectList == obj.I">
          <li class="triangle"></li>
          <li
            class="item"
            @click="selectMoney(obj, moneyObj)"
            v-for="(moneyObj, index) in moneyList"
            :key="index"
          >
            {{ moneyObj.num }}元
          </li>
        </ul>
      </span>
    </li>
  </ul>
</template>

<script>
import Input from "@/views/games/components/input/Input_1.vue";
export default {
  props: {
    title: {
      type: String,
      default: () => "",
    },
    list: {
      type: Array,
      default: () => [{ N: "aa", odds: 1.9 }],
    },

    // titleList: {
    //   type: Array,
    //   default: () => ["号码", "赔率", "金额"],
    // },
    // isShowInput: {
    //   type: Boolean,
    //   default: () => true,
    // },
  },

  data() {
    return {
      isShowInput:true,
      numList: [{ value: "100元" }, { value: "2000元" }],
      state1: "",
      isDisabled: false, //input
      status: 0,
      curShowSelectList: 0,
    };
  },
  components: {
    Input,
  },

  watch: {
    "$store.state.gd.clearSelect": function (val) {
      this.clearSelect();
    },
    "$store.state.gd.bettingType": {
      handler: function (val) {
        this.isShowInput = !val
      },
      deep: true,
    },
  },

  methods: {
    inputText(obj) {
      if (obj.money) {
        this.curShowSelectList = 0;
      } else {
        this.curShowSelectList = obj.I;
      }
    },
    selectMoney(obj, moneyObj) {
      obj.money = moneyObj.num;
    },
    isShowList(obj) {
      let moneyList = JSON.parse(localStorage.getItem("moneyList"));
      if (!moneyList) {
        this.curShowSelectList = 0;
        this.moneyList = [];
        return;
      }
      this.moneyList = moneyList;
      setTimeout(() => {
        this.curShowSelectList = obj.I;
      }, 202);
    },
    clearSelect() {
      this.list.forEach((item) => {
        if (item.active || item.money) {
          item.active = false;
          item.money = "";
        }
      });

      this.list.push({});
      this.list.pop();
    },
    selectItema(obj) {
      if (this.isShowInput) return;
      obj.active = !obj.active;
      this.list.push({});
      this.list.pop();
    },
    inputValue(n, obj) {
      obj.money = n;
      if (n) {
        obj.active = true;
      } else {
        obj.active = false;
      }
    },
    lostFocuse() {
      setTimeout(() => {
        this.curShowSelectList = 0;
      }, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
// @import url('../../../../../public/iconCss.css');
$numWidth: 24px;
$w-box: 45%;
.list-num {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .list-num-item {
    width: 20%;
    height: 36px;
    padding-right: 5px;
    display: flex;
    align-items: center;
    border-right: 1px solid #c9c7c7;
    border-bottom: 1px solid #c9c7c7;
    font-weight: 600;
    box-sizing: border-box;
    &.active {
      background-color: #fff8b6;
    }

    .odds {
      width: 50%;
      color: #ff0000;
      font-size: 14px;
      text-align: center;
    }
    .gray {
      color: gray;
    }
    .num-box {
      width: 50%;
      // border:1px solid red;
      display: flex;
      justify-content: center;
      font-size: 12px;
      .bg {
        width: $numWidth;
        height: $numWidth;
        text-align: center;
        line-height: $numWidth;
        color: #fff;
        font-size: 12px;
      }
      .array-box {
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }
    }

    .box {
      width: 60%;
      position: relative;
      .inline-input:hover {
        cursor: pointer;
      }
    }
  }
}

input {
  width: 100%;
  height: 26px;
}

.list {
  position: absolute;
  width: 100%;
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