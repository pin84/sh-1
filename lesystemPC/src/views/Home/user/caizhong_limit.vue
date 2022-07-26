<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      彩种限额
    </div>
    <el-divider></el-divider>
    <el-form :inline="true" :model="info">
      <el-form-item label="彩种">
        <el-select
          v-model="info.current_select_cz"
          placeholder="彩种"
          @focus="get_caizhong_list"
          @change="changegame($event)"
        >
          <el-option
            v-for="item in curCzlist"
            :label="
              item.gameName +
              [item.groupId == 1 ? '[官]' : ''] +
              [item.groupId == 0 ? '[信]' : '']
            "
            :value="item.gameId"
            :key="item.index"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="24">
      </el-col>
    </el-row>
    <!-- 彩种限额列表 -->
    <div class="search_content">
      <el-table
          :data="game_limit"
          border
          style="width: 100%"
          empty-text="没有符合查询条件的数据！"
        >
          <el-table-column label="玩法类型" width="" prop="groupName">
          </el-table-column>
          <el-table-column label="单注最低" width="" prop="lowest">
          </el-table-column>
          <el-table-column label="单注最高" width="" prop="highest">
          </el-table-column>
          <el-table-column label="单项最高" width="" prop="itemhighest">
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info:{
        current_gameid: "",
        current_select_cz: '',
      },
      game_limit: [],
      curCzlist: [],
      tablekey:1
    };
  },
  methods: {
    // 获取彩种 只去信数据
    get_caizhong_list() {
      if (this.curCzlist.length > 0) return;
      this.$post("Pc.HomePage.getCpGameList").then((res) => {
        if (res.code == 0) {
          let mylistdata = Object.values(res.data)
          let firlist = []; //存放第一层遍历的值
          let seclist = []; //存放第二层遍历的值
          let lastlist = [];
          for (let i = 0; i < mylistdata.length; i++) {
            firlist.push(mylistdata[i].gameCateList);
            for (let j = 0; j < firlist[i].length; j++) {
              seclist.push(firlist[i][j]);
            }
          }
          for (let k = 0; k < seclist.length; k++) {
            if (seclist[k].channelCode == "CPYX") {
              for (let m = 0; m < seclist[k].gameInfoList.length; m++) {
                lastlist.push(seclist[k].gameInfoList[m]);
              }
            }
          }
          //只取信彩种
          let gropXin_list=[]
          lastlist.forEach((item)=>{
            if(item.groupId==0){
                gropXin_list.push(item)
            }
            
          })
          if (gropXin_list.length > 0) {
            gropXin_list.sort(function compareFunction(param1, param2) {
              return param1.gameName.localeCompare(param2.gameName, "zh");
            });
            this.curCzlist = gropXin_list;
          }
          //console.log(this.curCzlist);
        } else {
          return this.$message.error(res.message);
        }
      });
    },

     // 获取彩种，存当前gameId
    changegame(current_id) {
      this.info.current_gameid = current_id; //修改当前彩种ID
      this.curCzlist.forEach((item)=>{
        if(item.gameId == current_id){
          this.info.curgid=item.groupId
        }
      })
      //console.log(current_id)
      this.getGameLimit()
    },
     // 获取彩种限额
    getGameLimit(){
      let loading = this.$loading({
            lock: true,//lock的修改符--默认是false
            text: '查询中，请耐心等待！',//显示在加载图标下方的加载文案
            spinner: 'el-icon-loading',//自定义加载图标类名
            background: 'rgba(0, 0, 0, 0.7)',//遮罩层颜色
            target: document.querySelector('.el-table')})//loadin覆盖的dom元素节点
      this.$get("Pc.Member.getGameLimits",{
        gameId:this.info.current_gameid
      }).then((res) => {
        if (res.code == 0) {
          this.game_limit = res.data;
           loading.close();
          //console.log(this.game_limit)
        } else {
          loading.close();
          return this.$message.error(res.message);
          
        }
      })
    },
  },
  mounted() {},
  created() {
  },
};
</script>

<style lang="scss" scoped>
.search_content {
  margin: 15px 0;
}
</style>