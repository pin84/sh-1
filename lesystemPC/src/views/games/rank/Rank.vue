<template>
  <div class="rank">
    <div class="title-box">
      <div
        :class="{ active: curTitle == '出码排行' }"
        @click="showRank('出码排行')"
        class="title pointer"
      >
        <span class=" ">出码排行</span>
      </div>
      <div
        :class="{ active: curTitle == '遗漏排行' }"
        @click="showRank('遗漏排行')"
        class="title pointer"
      >
        <span class="">遗漏排行</span>
      </div>
    </div>

    <div class="type">
      <div class="name">{{ curTitle == "出码排行" ? "次数" : "分类" }}</div>

      <el-select
        @change="initData"
        class="select"
        v-model="selectValue"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <ul class="list" v-if="curDataList.length">
      <li class="item" v-for="(item, idx) in curDataList" :key="idx">
        <div class="left">
          <span>{{ item.name || item.GameName }}</span>
          <span class="n"> @{{ item.itemName }}</span>
        </div>
        <div style="padding-left: 5px">{{ item.count }}期</div>
      </li>
    </ul>
    <ul v-else style="color:red;font-size:14px;padding:10px;">
      暂无排名数据
    </ul>
  </div>
</template>

<script>
import idobj from "@/views/games/assets/ids.js";
import typeObj from "./typeObj";
export default {
  data() {
    return {
      options: [],
      selectValue: "",
      isShowRank: false,
      curTitle: "出码排行",
      titleList: ["出码排行", "遗漏排行"],
      // cishuNo: "2期",
      cishu: ["2期", "3期", "4期", "5期", "6期"],
      isYilou: false,
      dataList: [],
      curDataList: [],
    };
  },
  async mounted() {
    this.initPage();
    this.initData();
  },
  methods: {
    async initData() {
      let { id } = this.$store.state.gd.indexGame;
      let d, url;
      if (this.curTitle === "出码排行") {
        d = {
          gameId: id,
          // value:''
        };
        url = this.$gapi.chuma;
      } else {
        d = {
          gameId: id,
          partialName: this.selectValue,
        };

        url = this.$gapi.yilou;
        
      }
      let res = await this.$get(url, d);
      
      if (res.code != 0) {
        this.$gutils.confirm({ text: res.message });
        return;
      }
      this.dataList = res.data;

      this.handlerData();
    },

    handlerData() {
      let list = [];
      if (this.curTitle === "出码排行") {
        let num = Number(this.selectValue.substring(0, 1));
        list = this.dataList.filter((item) => item.count == num);
      } else {
        list = this.dataList;
      }

      this.curDataList = list;
    },

    async showRank(text) {
      this.curTitle = text;
      this.options = [];
      await this.initPage();
      // await this.initData();
    },

    initPage() {
      let { id } = this.$store.state.gd.indexGame;

      if (this.curTitle == "出码排行") {
        this.cishu.forEach((str, idx) => {
          this.options.push({
            value: str,
            label: str,
          });
        });
      } else {
        let temid;
        for (let [key, value] of Object.entries(idobj)) {
          if (value.includes(Number(id))) {
            temid = key;
            break;
          }
        }

        // 10 和79的数据相同
        if(temid == 10){
          temid = 79
        }

        this.options = typeObj[temid];

        
      }
      this.selectValue = this.options[0].value;
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.rank {
  display: flex;
  flex-direction: column;
  height: 600px;
  // border: 1px solid red;
  .title-box {
    display: flex;
    flex: 0 0 40px;
    .title {
      width: 100%;
      text-align: center;
      padding: 10px 0;
      background-color: #000;
      color: #fff;
      &.active {
        background-color: #cf271e;
      }
    }
  }
  .type {
    display: flex;
    align-items: center;
    border-bottom: 1px solid gray;
    font-size: 14px;
    .name {
      flex: 0 0 50%;
      text-align: center;
    }
  }
  .list {
    height: 100%;
    overflow-y: scroll;
    .item {
      display: flex;
      font-size: 13px;
      padding: 0 2px;
      line-height: 22px;
      // border-right: 1px solid #c9c7c7;
      border-bottom: 1px solid #c9c7c7;
      .left {
        flex: 0 0 70%;
        border-right: 1px solid #c9c7c7;
        .n {
          color: red;
        }
      }
    }
  }
}
</style>
