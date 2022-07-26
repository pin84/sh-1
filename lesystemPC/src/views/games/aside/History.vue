<template>
  <div class="history">
    <el-tabs v-model="historyTab" type="card" @tab-click="historyTabHandle">
      <el-tab-pane label="开奖结果" name="kaijiangjieguo">
        <div class="item">
          <div class="kj" v-for="(obj, idx) in list" :key="idx">
            <li>
              <span class="span1">{{ idx + 1 }}</span
              ><span class="span2">{{ obj.period }}</span>

              <div v-if="Array.isArray(obj.result)">
                <span
                  class="span3 ellipsis"
                  v-for="(text, index) in obj.result"
                  :key="index"
                  >{{ text
                  }}{{ index == obj.result.length - 1 ? "=" : "+" }}</span
                >
                <b>{{ obj.sum }}</b>
              </div>
              <span v-else class="span3 ellipsis">{{ obj.result }}</span>
            </li>
          </div>
          <div class="more" >
            <a :href="resultUrl" target="_blank" >更多开奖结果</a>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="本期投注" name="benqitouzhu">
        暂无最新注单信息
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      historyTab: "kaijiangjieguo",
      list: [],
      interval: null,
	  resultUrl:'',
    };
  },

  created() {
	  let { id } = this.$store.state.gd.indexGame;
	  this.resultUrl="/result?id="+id;
	  
    // let { resultList } = this.$store.state.gd.indexGameData;
    // this.initData(resultList.list);
  },

  mounted() {
	  this.refreshGameResultList(); 
    this.interval = setInterval(() => {
      this.refreshGameResultList();
      // this.$store.commit('updateUserInfo' ,new Date().getTime())
    }, 12000);
  },
  methods: {
	  // toResult() {
	    
	  
	  //   this.$router.push({ path: "/result", query: { id } });
	  // },
    initData(list) {
      let { id } = this.$store.state.gd.indexGame;

      list.forEach((item) => {
        if (item.period.length > 7) {
          item.period = item.period.slice(4);
        }
      });

      let ids = [118, 119, 116, 121];
      if (ids.includes(Number(id))) {
        list.forEach((item) => {
          if (!Array.isArray(item.result)) {
            item.result = item.result.split(",");
            item.sum = item.result.reduce((accumulator, currentValue) => {
              return accumulator + Number(currentValue);
            }, 0);
          }
        });
      }

      this.list = list;
    },

    async refreshGameResultList() {
      let { id } = this.$store.state.gd.indexGame;
      let res = await this.$get(this.$gapi.getGameResultList, { gameId: id });
      let list = res.data.slice(0, 6);
      this.initData(list);
    },

    historyTabHandle(tab, event) {
    },
  },

  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>
<style lang="scss" scoped>
.history {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
.kj li {
  list-style: none;
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #e4e1e1;
  display: flex;
  align-items: center;
  padding-right: 5px;
}
.kj li .span1 {
  display: inline-block;
  height: 19px;
  line-height: 19px;
  text-align: center;
  border-radius: 4px;
  margin-left: 8px;
  margin-right: 9px;
  flex: 0 0 19px;
  background-color: #463e3e;
  color: white;
}
.kj li .span2 {
  margin-right: 8px;
}
.kj li .span3 {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  font-weight: bold;
}
.item .more {
  text-align: center;
  margin-top: 13px;
}
.item .more a {
  color: #c42133;
  margin-top: 13px;
  text-align: center;
  font-size: 13px;
}
</style>
