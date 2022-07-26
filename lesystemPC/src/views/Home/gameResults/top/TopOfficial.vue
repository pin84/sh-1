<template>
  <div class="top">
    <el-select class="el-select" @change="changeGame" v-model="selectGame">
      <el-option
        v-for="item in gameList"
        :key="item.id"
        :label="item.gameName"
        :value="item.id"
      >
      </el-option>
    </el-select>

    <span class="select-title"> 标注形式选择</span>
    <el-checkbox-group
      v-model="checkedCities"
      @change="handleCheckedCitiesChange"
      class="group"
    >
      <el-checkbox
        class="checkbox-group-item"
        v-for="city in cities"
        :label="city"
        :key="city"
        >{{ city }}</el-checkbox
      >
    </el-checkbox-group>

    <ul class="serise-list">
      <li
        :class="{ active: curSeriesIndex == idx }"
        class="item pointer"
        v-for="(item, idx) in series"
        :key="idx"
        @click="selectedSerise(idx)"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script>
const cityOptions = [
  "显示走势折线",
  "显示号温",
  "显示遗漏分层",
  "显示遗漏",
  "显示统计",
  "显示辅助线",
];
export default {
  props: {
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
      curSeriesIndex: 0,
      series: [
        {
          text: "最近30期",
          num: 30,
          isActive: false,
        },
        {
          text: "最近50期",
          num: 50,
          isActive: false,
        },
        {
          text: "最近100期",
          num: 100,
          isActive: false,
        },
        {
          text: "最近200期",
          num: 200,
          isActive: false,
        },
        {
          text: "最近300期",
          num: 300,
          isActive: false,
        },
      ],
      checkedCities: [
        "显示走势折线",
        "显示号温",
        "显示遗漏分层",
        "显示遗漏",
        "显示统计",
        "显示辅助线",
      ],
      cities: cityOptions,
      isIndeterminate: true,
      selectGame: "QQ飞车",

      checkObj: {
        显示走势折线: 1,
        显示号温: 2,
        显示遗漏分层: 3,
        显示遗漏: 4,
        显示统计: 5,
        显示辅助线: 6,
      },
    };
  },


  created(){
    this.initData();
  },



  methods: {
    selectedSerise(idx) {
      this.curSeriesIndex = idx;
      let { num } = this.series[idx];
      this.$emit("changeSeries", num);
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

    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;

      let indexArr = [];
      this.checkedCities.forEach((str) => {
        let index = cityOptions.findIndex((item) => item == str);
        indexArr.push(index);
      });
      this.$emit("changeShowType", indexArr);
      // console.log(indexArr);

      // noCheckList
    },
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
  .el-select {
    width: 130px;
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
