<template>
  <div class="top">
    <span class="title">游戏：</span>
    <el-select class="el-select" @change="changeGame" v-model="selectGame">
      <el-option
        v-for="item in gameList"
        :key="item.id"
        :label="item.gameName"
        :value="item.id"
      >
      </el-option>
    </el-select>

    <span class="title">范围：</span>
    <el-date-picker
      v-model="value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-M-d"
    >
    </el-date-picker>

    <div class="search-box">
      <span class="title">期数：</span>
      <Input style="width: 120px" v-model="inputNum" />
      <el-button class="btn" @click="searchWithPeriod">查询</el-button>
    </div>

    <el-button style="margin-right:5px;" type="primary" :loading="false"
      >{{isDataDone ? '刷新' : '刷新中'}} &nbsp; {{ time }}</el-button
    >
    <el-select @change="changeTime" v-model="value" placeholder="不刷新">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import Input from "@/views/games/components/input/Input_1.vue";
export default {
  props: {
    isDataDone: {
      type: Boolean,
      default: () => true,
    },
    gameList: {
      type: Array,
      default: () => [
        {
          value: "选项1",
          gameName: "黄金糕",
        },
      ],
    },
  },
  data() {
    return {
      inputNum: "",
      options: [
        {
          value: "-",
          label: "不刷新",
        },
        {
          value: "10",
          label: "10",
        },
        {
          value: "30",
          label: "30",
        },
        {
          value: "60",
          label: "60",
        },
        {
          value: "120",
          label: "120",
        },
        {
          value: "500",
          label: "500",
        },
      ],
      time: "-",
      value: "-",
      value1: null,
      curSeriesIndex: 0,
      selectGame: "QQ飞车",

      intervalId: null,
    };
  },

  components: {
    Input,
  },

  created() {
    this.initData();
  },

  methods: {
    changeTime() {
      clearInterval(this.intervalId);
      if (this.value == "-") {
        this.time = "-";
        return;
      }
      this.time = this.value;

      this.intervalId = setInterval(() => {
        if (this.isDataDone) {
          this.time--;
        }
        if (this.time == 0) {
          this.time = this.value;
          this.$emit("refreshData");
        }
      }, 1 * 1000);
    },

    searchWithPeriod() {
      let startDate = "";
      let endDate = "";

      if (this.value1) {
        startDate = this.value1[0] || "";
        endDate = this.value1[1] || "";
      }

      this.$emit("searchWithPeriod", startDate, endDate, this.inputNum);
    },

    initData() {
      let { id } = this.$route.query;
      let { gameName } = this.gameList.find((item) => item.id == id);
      this.selectGame = gameName;
    },

    changeGame() {
      console.log(this.selectGame);
      this.$router.push({ path: "/result", query: { id: this.selectGame } });
      location.reload();
    },
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },
};
</script>
<style lang='scss' scoped>
.top {
  // border: 1px solid red;
  min-width: 1820px;
  height: 45px;
  display: flex;
  align-items: center;
  background-color: #2d2d2d;
  color: #fff;
  font-size: 14px;
  padding: 0 10px;

  .title {
    margin-right: 10px;
  }
  .search-box {
    padding: 0 10px;
    .btn {
      margin-left: 10px;
    }
  }
  .el-select {
    width: 150px;
    margin-right: 20px;
  }
  .select-title {
    padding: 0 10px;
  }

  .group {
    display: flex;
    // width: 300px;
  }
  .checkbox-group-item {
    color: #fff;
    margin-right: 10px;
    span {
      padding-left: 0;
    }
  }
  .el-checkbox__label {
    padding-left: 0;
  }
  .serise-list {
    display: flex;
    margin-left: 20px;
    .item {
      height: 45px;
      line-height: 45px;
      padding: 0 10px;
      &.active {
        background-color: #cf271e;
      }
      &:hover {
        background-color: #cf271e;
      }
    }
    // .active{
    //    background-color: #cf271e;
    // }
  }
}
</style>
