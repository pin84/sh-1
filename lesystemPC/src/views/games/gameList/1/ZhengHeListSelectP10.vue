<template>
  <div class="list-p10">
    <ul class="list">
      <li
        v-for="(title, idx) in titleList"
        :class="idx == 1 ? 'w1' : 'w2'"
        :key="idx"
      >
        {{ title }}
      </li>
    </ul>
    <ul class="list list10">
      <li
        @click="selectItema(obj)"
        class="list-num-item"
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
        <span class="w1 num-list">
          <span
            :style="{ backgroundColor: item.bc }"
            class="num"
            v-for="(item, index) in obj.numList"
            :key="index"
            v-show="item.num < 49"
            >{{ item.num }}</span
          >
        </span>
        <div class="w2 input-box">
          <input
            class="box"
            type="checkbox"
            :disabled="obj.isDisabled"
            v-model="obj.active"
          />
        </div>
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
      default: () => ["生肖", "号码", "勾选"],
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
      this.$emit("selectCount", i, obj);
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
.list-p10 {
  min-width: 150px;
  text-align: center;
  font-size: 13px;
  .list {
    display: flex;
    background-color: #f0f0f0;
    padding: 10px 0;
    box-sizing: border-box;
    width: 100%;
    font-size: 13px;
  }

  .list10 {
    flex-direction: column;
    background-color: #fff;
  }

  .list-num-item {
    width: 100%;
    height: 36px;
    padding-right: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #c9c7c7;
    font-weight: 600;
    box-sizing: border-box;
    font-size: 12px;

    .num-box {
      display: flex;
      justify-content: center;
      .num {
        width: $numWidth;
        height: $numWidth;
        text-align: center;
        line-height: 28px;
        border-radius: 50%;
        // background-color: #c42020;
        color: #fff;
        font-size: 14px;
      }
    }

    .input-box {
      position: relative;
      font-size: 14px;
      .inline-input:hover {
        cursor: pointer;
      }
    }

    .num-list {
      margin-left: 10px;
      display: flex;
      border-left: none;
      border-right: none;
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

  .w1 {
    flex: 0 0 50%;
    border-left: 1px solid #c9c7c7;
    border-right: 1px solid #c9c7c7;
  }
  .w2 {
    width: 25%;
  }
}
</style>