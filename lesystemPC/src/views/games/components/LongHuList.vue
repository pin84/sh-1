<template>
  <ul class="longhua">
    <li
      class="item"
      :style="{ width: itemWidth }"
      v-for="(outObj, idx) in list"
      :key="idx"
    >
      <div class="name">{{ outObj.N }}</div>
      <div class="item-content">
        <div
          @click="selectItema(obj)"
          class="content"
          :class="{ active: obj.active }"
          v-for="(obj, index) in outObj.C"
          :key="index"
        >
          <div class="c-top">
            <span style="margin-right: 10px" :class="'c_' + index">{{
              obj.N
            }}</span>
            <span v-if="isShowInput" :class="{ gray: status }" class="odds">{{
              status ? "封盘" : obj.odds
            }}</span>
          </div>
          <!-- <div  v-if="isShowInput">
              <InputSelectList
                :inputStyle="inputStyle"
                :isDisabled="status? true :false"
                @inputValue="inputValue($event, obj)"
              />
            </div>
            <span v-else class="odds">{{obj.odds}}</span> -->

          <div class="box" v-if="isShowInput">
            <Input
              @blur="lostFocuse"
              @input="inputText(obj)"
              :disabled="isDisabled"
              class="input"
              v-model="obj.money"
              @click="isShowList(obj)"
            />
            <ul class="lista" v-if="curShowSelectList == obj.I">
              <li class="triangle"></li>
              <li
                class="lista-item"
                @click="selectMoney(obj, moneyObj)"
                v-for="(moneyObj, index) in moneyList"
                :key="index"
              >
                {{ moneyObj.num }}元
              </li>
            </ul>
          </div>
          <span v-else class="odds">{{ obj.odds }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import Input from "@/views/games/components/input/Input_1.vue";
export default {
  props: {
    itemWidth: {
      type: String,
      default: () => "24.5%",
    },
    isShowInput: {
      type: Boolean,
      default: () => true,
    },
    list: {
      type: Array,
      default: () => [{ N: "a" }],
    },
  },

  data() {
    return {
      curShowSelectList: 0,
      numList: [{ value: "100元" }, { value: "2000元" }],
      state1: "",
      isDisabled: false, //input
      status: 0,
      inputStyle: {
        height: "20px",
        width: "62px",
      },
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
      this.list.forEach((obj) => {
        obj.C.forEach((item) => {
          if (item.active || item.money) {
            item.active = false;
            item.money = "";
          }
        });
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
      this.$nextTick(() => {});
      setTimeout(() => {
        this.curShowSelectList = 0;
      }, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
.longhua {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 12px;
  .item {
    width: 24.5%;
    margin: 0 1px;
    border: 1px solid #ccc;
    border-top: none;
    .name {
      background-color: #cf271e;
      color: #fff;
      padding: 6px 0;
      text-align: center;
      font-size: 12px;
    }
    .item-content {
      display: flex;
      box-sizing: border-box;
      // border: 1px solid red;
      .content {
        width: 100%;
        padding: 8px 2px;
        box-sizing: border-box;
        text-align: center;
        .c-top {
          padding: 5px 0 10px 0;
          font-size: 13px;
          font-weight: 600;
          .c_0 {
            color: #ff4848;
          }
          .c_1 {
            color: #06a21b;
          }
          .c_2 {
            color: #0020ff;
          }
        }
        .odds {
          color: #ff4848;
        }
        .gray {
          color: gray;
        }
      }
      .active {
        background-color: #fff8b6;
      }
    }
  }

  input {
    width: 70px;
    height: 20px;
  }

  .box {
    // flex: 0 0 $w-box;
    position: relative;
    // border: 1px solid red;
    width: 100%;
    input {
      width: 90%;
      outline: none;
      border: 1px solid #ccc;
    }
    .lista {
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
      .lista-item {
        width: 100%;
        padding: 4px 6px;
        box-sizing: border-box;
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
}
</style>