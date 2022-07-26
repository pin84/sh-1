<template>
  <div class="seriesa">
    <div class="top">
      <span class="no">期数</span>
      <span class="num" :style="styleObj">开奖号码</span>
    </div>

    <ul class="list">
      <li
        :style="{
          borderTop:
            isShowRedLine && idx % 5 == 0 && idx != 0
              ? '1px solid #ca151e'
              : '1px solid #ddd',
        }"
        class="item"
        v-for="(obj, idx) in list"
        :key="idx"
      >
        <span class="no">{{ obj.number }}</span>
        <ul class="num-list">
          <li class="num-item" v-for="(item, n) in obj.result" :key="n">
            <span
              :style="{ backgroundColor: idx % 2 == 0 ? '#00a0e9' : '#FF6501' }"
              class="num"
              >{{ item }}</span
            >
          </li>
        </ul>
      </li>
    </ul>
    <ul class="title" v-if="isShowSum">
      <li
        class="title-item"
        :style="{ color: item.color }"
        v-for="(item, n) in titleList"
        :key="n"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="top">
      <span class="no">期数</span>
      <span class="num" :style="styleObj">开奖号码</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    isShowSum: {
      type: Boolean,
      default: () => true,
    },
    isShowRedLine: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      styleObj: {},
      titleList: [
        {
          name: "出现总次数",
          color: "rgb(255, 0, 255)",
        },
        {
          name: "平均遗漏",
          color: "rgb(72, 90, 48)",
        },
        {
          name: "最大遗漏",
          color: "rgb(128, 57, 5)",
        },
        {
          name: "最大连出",
          color: "rgb(24, 86, 107)",
        },
      ],
    };
  },

  created() {
    this.initPage();
  },
  methods: {
    initPage() {
      let len = this.list[0].result.length * 20 + "px";
      this.styleObj = {
        flex: `0 0 ${len}`,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
$numWidth: 19px;
$numWidth_s: 16px;
.seriesa {
  width: 100%;
  font-size: 14px;
  .top {
    background-color: #efefef;
    color: #000;
    text-align: center;
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid #ddd;
    // box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    .no {
      border: none;
      text-align: center;
      width: 100%;
    }
    .num {
      border-left: 1px solid #ddd;
      display: inline-block;
      box-sizing: border-box;
    }
  }
  .list {
    width: 100%;
    .item {
      display: flex;
      box-sizing: border-box;
      align-items: center;
      width: 100%;
      // border-bottom: 1px solid #ddd;
      &:first-child {
        border-top: none !important;
      }
      &:last-child {
        border-bottom: 1px solid #ddd;
      }
      .no {
        height: $numWidth;
        line-height: $numWidth;
        width: 100%;
        padding: 0 5px;
        text-align: center;
        font-size: 12px;
        box-sizing: border-box;
        // border-bottom: 1px solid #ddd;
      }
      .num-list {
        display: inline-block;
        display: flex;
        .num-item {
          width: $numWidth;
          height: $numWidth;
          overflow: hidden;
          border-left: 1px solid #ddd;
          // border-bottom: 1px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          .num {
            display: inline-block;
            width: $numWidth_s;
            height: $numWidth_s;
            line-height: $numWidth_s;
            text-align: center;
            color: #fff;
            border-radius: 50%;
            font-size: 12px;
            font-weight: 600;
          }
        }
      }
    }
  }
  .title {
    height: 84px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title-item {
      border-bottom: 1px solid #ddd;
      text-align: center;
      font-size: 12px;
      height: 21px;
      line-height: 21px;
      box-sizing: border-box;
    }
  }
}
</style>