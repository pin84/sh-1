<template>
  <div class="liuhecailist">
    <ul class="title-list">
      <li
        v-for="(title, idx) in titleList"
        :class="[{ 'remain-w': title == '号码' }, { title: title != '号码' }]"
        :key="idx"
      >
        {{ title }}
      </li>
    </ul>
    <ul class="list-num">
      <li
        @click="selectItema(obj)"
        class="list-num-item"
        :class="{ active: obj.active }"
        v-for="(obj, i) in list"
        :key="i"
      >
        <div class="num-box w-s">
          <div
            :style="{ backgroundColor: obj.bgcolor }"
            :class="{ num: !isNaN(obj.N) }"
          >
            {{ obj.N }}
          </div>
        </div>
        <span class="odds w-s" :class="{ gray: status }">{{
          status ? "封盘" : obj.odds
        }}</span>
        <span class="box w-s" v-if="isShowInput">
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

        <span class="num-list">
          <span
            :style="{ backgroundColor: item.bc }"
            class="num"
            v-for="(item, index) in numList[i]"
            :key="index"
            >{{ item.num }}</span
          >
        </span>
      </li>
    </ul>
  </div>
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
      default: () => [],
    },
    numList: {
      type: Array,
      default: () => [{ num: 1, bc: "red" }],
    },

    titleList: {
      type: Array,
      default: () => ["号码", "赔率", "金额", "号码"],
    },
    isShowInput: {
      type: Boolean,
      default: () => true,
    },
  },

  data() {
    return {
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
$numWidth: 26px;
$w-box: 45%;
$w: 80px;
$w1: 20px;
.liuhecailist {
  // min-width: 150px;
  // width: 200px;

  text-align: center;
  // border-right: 1px solid #c9c7c7;
  // border-bottom: 1px solid #c9c7c7;
  // border:1px solid #c9c7c7;
  font-size: 13px;
  .title-list {
    display: flex;
    background-color: #f0f0f0;
    padding: 10px 5px;
    box-sizing: border-box;
    width: 100%;
    font-size: 13px;
    .title {
      flex: 0 0 $w;
      border-right: 1px solid gray;
      box-sizing: border-box;
    }
    .remain-w {
      width: 100%;
    }
  }
  .list-num {
    width: 100%;
    // border-left:1px solid #c9c7c7;
    // border-bottom:1px solid #c9c7c7;
    .list-num-item {
      width: 100%;
      height: 36px;
      padding-right: 5px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #c9c7c7;
      // border-left: 1px solid #c9c7c7;
      font-weight: 600;
      box-sizing: border-box;
      font-size: 12px;
      &.active {
        background-color: #fff8b6;
      }
      .w-s {
        flex: 0 0 $w;
        text-align: center;
      }

      .odds {
        color: #ff0000;
        font-size: 12px;
      }
      .gray {
        color: gray;
      }
      .num-box {
        display: flex;
        justify-content: center;
        .num {
          width: $numWidth;
          height: $numWidth;
          text-align: center;
          line-height: 28px;
          border-radius: 50%;
          background-color: #c42020;
          color: #fff;
          font-size: 14px;
        }
      }

      .box {
        position: relative;
        .inline-input:hover {
          cursor: pointer;
        }
      }
      .num-list {
        // border: 1px solid red;
        margin-left: 10px;
        width: 100%;
        display: flex;
        align-items: center;
        .num {
          display: inline-block;
          width: $w1;
          height: $w1;
          line-height: $w1;
          border-radius: 50%;
          overflow: hidden;
          color: #fff;
        }
      }
    }
  }

  input {
    width: 70px;
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
}
</style>