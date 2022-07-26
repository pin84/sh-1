<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      彩种信息
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
    <!-- 彩种信息列表 -->
    <div class="search_content">
      <div class="result_content">
        <el-table
          :key='tablekey'
          :data="game_info"
          border
          style="width: 100%"
          :cell-style="cellStylePadding0"
          empty-text="没有符合查询条件的数据！"
        >
          <el-table-column label="玩法类型" width="" prop="playName">
          </el-table-column>
          <el-table-column v-if="info.curgid==1" label="玩法分类" width="" >
              <template slot-scope="scope">
                  <div v-if="scope.row.children.length > 1" v-for="item in scope.row.children" :key='item.index'>
                    <span  v-if="info.curgid==1" class="divrow">{{item.itemName}}</span>
                  </div>
              </template>
          </el-table-column>
          <el-table-column label="最高奖金" >
            <template slot-scope="scope">
              <div v-if="info.curgid==1" v-for="item in scope.row.children" :key='item.index'>
                <span class="divrow">{{item.maxBonus}}</span>
              </div>
              <div v-if="info.curgid==0" >
                <span class="divrow">{{scope.row.children[0].maxBonus}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="返点" width="">
             <template slot-scope="scope">
              <div v-if="info.curgid==1" v-for="item in scope.row.children" :key='item.index'>
                <span class="divrow">{{item.maxKickback}}</span>
              </div>
              <div v-if="info.curgid==0">
                <span class="divrow">{{scope.row.children[0].maxKickback}}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        current_gameid: "",
        current_select_cz: '',
        curgid:''
      },
      curCzlist: [],
      game_info:[],
      tablekey:1
    };
  },
  methods: {
    // 获取彩种
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
          if (lastlist.length > 0) {
            lastlist.sort(function compareFunction(param1, param2) {
              return param1.gameName.localeCompare(param2.gameName, "zh");
            });
            this.curCzlist = lastlist;
          }
          // console.log(this.curCzlist);
        } else {
          return this.$message.error(res.message);
        }
      });
    },
    // 获取彩种信息
    getGameInfomation(){
      let loading = this.$loading({
            lock: true,//lock的修改符--默认是false
            text: '查询中，请耐心等待！',//显示在加载图标下方的加载文案
            spinner: 'el-icon-loading',//自定义加载图标类名
            background: 'rgba(0, 0, 0, 0.7)',//遮罩层颜色
            target: document.querySelector('.el-table')})//loadin覆盖的dom元素节点
      this.$get("Pc.Member.getGameInfomation",{
        gameId:this.info.current_gameid
      }).then((res) => {
        if (res.code == 0) {
          loading.close();
          this.game_info = res.data;
          //console.log(this.game_info)
        } else {
          loading.close();
          return this.$message.error(res.message);
          
        }
      })
    },
    
    // 获取彩种，存当前gameId
    changegame(current_id) {
      this.info.current_gameid = current_id; //修改当前彩种ID
      this.curCzlist.forEach((item)=>{
        if(item.gameId == current_id){
          this.info.curgid=item.groupId
        }
      })
      console.log(current_id)
      //console.log(this.info.curgid)
      this.getGameInfomation()
    },
    cellStylePadding0({ row, column, ronIndex, columnIndex }) {
      return "padding:0";
    },
  },
  mounted() {
    this.getGameInfomation()
  },
  created() {
    this.get_caizhong_list() //初始化彩种
    this.info.current_select_cz=810 //默认显示腾讯分分彩select
    this.info.current_gameid=810 //默认加载腾讯分分彩
    this.info.curgid=1 //默认显示官
}
}
</script>

<style lang="scss" scoped>
.search_content {
  margin: 15px 0;
   .el-table{
      border-collapse:collapse;
   }
  .divrow{
    display: block;
    line-height: 28px;
    margin: 0 -10px;
    padding: 0 10px;
    position: relative;
  }
  .divrow:after{
    content:'';
    width: 100%;
    height: 1px;
    background:#EBEEF5;
    position: absolute;
    left: 0;
    bottom: -1px;
  }
}
</style>