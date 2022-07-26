<template>
  <div class="z-lista">
    <ul class="title-list">
      <!-- :class="[{ f: idx == 0 }, { border: idx == 1 }, { w: idx == 2 }]" -->
      <li
        v-for="(title, idx) in titleList"
        :class="idx == titleList.length - 1 ? 'title-last' : 'title'"
        :key="idx"
      >
        {{ title }}
      </li>
    </ul>
    <ul class="list-num">
      <li
        @click="selectItema(obj)"
        class="list-num-item pointer"
        :class="{ active: obj.active }"
        v-for="(obj, index) in list"
        :key="index"
      >
        <div class="w2 num-box">
          <div
            :style="{ backgroundColor: obj.bgcolor }"
            :class="{ num: !isNaN(obj.N) }"
          >
            {{ obj.N }}
          </div>
        </div>
        <span class="w2 odds" :class="{ gray: status }">{{
          status ? "封盘" : obj.odds
        }}</span>
        <input
          class="w2 box"
          type="checkbox"
          :disabled="obj.isDisabled"
          v-model="obj.active"
        />

        <span v-if="numList.length" class="num-list">
          <span
            :style="{ backgroundColor: item.bc }"
            class="num"
            v-for="(item, index) in numList[index]"
            :key="index"
            >{{ item.num }}</span
          >
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    numList: {
      type: Array,
      default: () => [],
    },

    titleList: {
      type: Array,
      default: () => ["号码", "赔率", "勾选"],
    },

    limitLen: {
      type: Number,
      default: () => 3,
    },
  },

  data() {
    return {
      isDisabled: false, //input
      status: 0,
    };
  },
  watch: {
    "$store.state.gd.clearSelect": function (val) {
      this.clearSelect();
    },
  },

  methods: {
    clearSelect() {
      this.list.forEach((item) => {
        if (item.active || item.money) {
          item.active = false;
          item.money = "";
        }
        item.isDisabled = false;
      });

      this.list.push({});
      this.list.pop();
      this.$emit("clearSelect");
    },
    selectItema(obj) {
      if (obj.isDisabled) return;
      let i;
      if (obj.active) {
        obj.active = false;
        i = -1;
      } else {
        obj.active = true;
        i = 1;
      }
      this.$emit("selectCount", i,obj);
      this.list.push({});
      this.list.pop();
    },
  },
};
</script>

<style lang="scss" scoped>
$numWidth: 26px;
$w-box: 45%;
$w1: 20px;
$w2: 60px;
.z-lista {
  min-width: 150px;
  text-align: center;
  // border-right: 1px solid #c9c7c7;
  // border-bottom: 1px solid #c9c7c7;
  // border:1px solid #c9c7c7;
  font-size: 13px;
  .title-list {
    display: flex;
    background-color: #f0f0f0;
    padding: 10px 0;
    box-sizing: border-box;
    width: 100%;
    font-size: 13px;
    .title {
      flex: 0 0 $w2;
      border-right: 1px solid gray;
      // border: 1px solid red;
    }
    .title-last {
      width: 100%;
      // border: 1px solid blue;
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
      // &.active {
      //   background-color: #fff8b6;
      // }
      .w2 {
        flex: 0 0 $w2;
      }

      .odds {
        color: #ff0000;
        font-size: 12px;
        // border: 1px solid red;
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
        width: 100%;
        position: relative;
        font-size: 14px;
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
}
</style>