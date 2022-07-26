<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      下属用户详情
    </div>
    <el-divider></el-divider>
    <ul class="czgame-list" v-if="curCzlist.length > 0">
      <li ref="firstone" :class="flag ? 'active' : ''">
        <a @click="checkfirst" href="javascript:;">下属用户信息</a>
      </li>
      <li
        :class="{ active: index == current_num }"
        v-for="(item, index) in curCzlist"
        :key="item.index"
      >
        <a @click="changegame(item.gameId, index)" href="javascript:;">{{
          item.groupId == 1 ? item.gameName + "[官]" : item.gameName + "[信]"
        }}</a>
      </li>
    </ul>
    <div class="search_content">
      <div v-show="flag == true" class="userinfo" v-if="agentInfo_data !== ''">
        <ul>
          <li>用户名称</li>
          <li>{{ agentInfo_data.username }}</li>
        </ul>
        <ul>
          <li>用户昵称</li>
          <li>{{ agentInfo_data.nickname }}</li>
        </ul>
        <ul>
          <li>用户等级</li>
          <li>
            <span v-if="agentInfo_data.hierarchy >= 1">代理用户</span>
            <span v-if="agentInfo_data.hierarchy == 0">会员</span>
          </li>
        </ul>
        <ul>
          <li>可用金额</li>
          <li>{{ agentInfo_data.userMoney }}</li>
        </ul>
        <ul>
          <li>最后登录时间</li>
          <li>{{ agentInfo_data.lastLoginTime }}</li>
        </ul>
      </div>
      <div v-show="flag == false" class="table-data">
        <el-table
          :key="tablekey"
          :data="game_info"
          border
          style="width: 100%"
          :cell-style="cellStylePadding0"
          empty-text="没有符合查询条件的数据！"
        >
          <el-table-column label="玩法类型" width="" prop="playName">
          </el-table-column>
          <el-table-column v-if="info.curgid == 1" label="玩法分类" width="">
            <template slot-scope="scope">
              <div
                v-if="scope.row.children.length > 1"
                v-for="item in scope.row.children"
                :key="item.index"
              >
                <span v-if="info.curgid == 1" class="divrow">{{
                  item.itemName
                }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="最高奖金">
            <template slot-scope="scope">
              <div
                v-if="info.curgid == 1"
                v-for="item in scope.row.children"
                :key="item.index"
              >
                <span class="divrow">{{ item.maxBonus }}</span>
              </div>
              <div v-if="info.curgid == 0">
                <span class="divrow">{{ scope.row.children[0].maxBonus }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="返点" width="">
            <template slot-scope="scope">
              <div
                v-if="info.curgid == 1"
                v-for="item in scope.row.children"
                :key="item.index"
              >
                <span class="divrow">{{ item.maxKickback }}</span>
              </div>
              <div v-if="info.curgid == 0">
                <span class="divrow">{{
                  scope.row.children[0].maxKickback
                }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-button
        style="float: left; margin-top: 15px"
        @click="$router.go(-1)"
        type="primary"
        >返回</el-button
      >
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        info: {
          current_gameid: "",
          current_select_cz: "",
          curgid: "",
        },
        accountID: this.$route.query.accountID,
        game_info: [],
        curCzlist: [],
        agentInfo_data: "",
        current_gameid: 810,
        tablekey: 1,
        current_num: null,
        flag: true,
      };
    },
    methods: {
      // 获取彩种
      get_caizhong_list() {
        if (this.curCzlist.length > 0) return;
        this.$post("Pc.HomePage.getCpGameList").then((res) => {
          if (res.code == 0) {
            let mylistdata = Object.values(res.data);
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
            console.log(this.curCzlist);
          } else {
            return this.$message.error(res.message);
          }
        });
      },
      // 获取用户列表
      getAgentInfo() {
        this.$get("Pc.Agent.getAgentInfo", {
          accountID:this.accountID ,
        }).then((res) => {
          if (res.code == 0) {
            this.agentInfo_data = res.data;
            console.log(this.agentInfo_data);
          } else {
            return this.$message.error(res.message);
          }
        });
        
      },
      // 获取彩种信息
      getGameInfomation() {
        let loading = this.$loading({
          lock: true, //lock的修改符--默认是false
          text: "查询中，请耐心等待！", //显示在加载图标下方的加载文案
          spinner: "el-icon-loading", //自定义加载图标类名
          background: "rgba(0, 0, 0, 0.7)", //遮罩层颜色
          target: document.querySelector(".el-table"),
        }); //loadin覆盖的dom元素节点
        this.$get("Pc.Member.getGameInfomation", {
          gameId: this.current_gameid,
          accountID: this.accountID,
        }).then((res) => {
          if (res.code == 0) {
            loading.close();
            this.game_info = res.data;
            //console.log(this.game_info)
          } else {
            loading.close();
            return this.$message.error(res.message);
          }
        });
      },
      // 获取彩种，存当前gameId
      changegame(current_id, ide) {
        this.flag = false;
        this.current_num = ide;
        this.info.current_gameid = current_id; //修改当前彩种ID
        this.curCzlist.forEach((item) => {
          if (item.gameId == current_id) {
            this.info.curgid = item.groupId;
          }
        });
        // console.log(current_id);
        //console.log(this.info.curgid)
        this.getGameInfomation();
      },
      // 选择下属用户信息
      checkfirst() {
        this.flag = !this.flag;
        this.current_num = null;
      },
      cellStylePadding0({ row, column, rowIndex, columnIndex }) {
        return "padding:0";
      },
    },
    mounted() {},
    watch: {
      $route: {
        handler(to, from){
          this.accountID = this.$route.query.accountID;
          this.getAgentInfo();
          this.get_caizhong_list();
        },
       immediate: true
      },
     
    },
    created() {
    
    },
  };
</script>

<style lang="scss" scoped>
  .user_content_blcok {
    float: left;
  }
  .czgame-list {
    float: left;
    li {
      float: left;
      padding: 4px 10px;
    }
  }
  .userinfo {
    float: left;
    border: 1px solid #eee;
    border-bottom: 0 none;
    width: 100%;
    margin-top: 20px;
    ul {
      li {
        display: inline-block;
        width: calc(50% - 1px - 10px);
        height: 32px;
        line-height: 32px;
        border-bottom: 1px solid #eee;
        padding-left: 10px;
      }
      li:first-child {
        border-right: 1px solid #eee;
      }
    }
  }
  .table-data {
    float: left;
    margin-top: 20px;
    width: 100%;
  }
  .active {
    background: #ca151e;
    padding: 4px 10px;
    border-radius: 4px;
    a {
      color: #fff;
    }
  }
  .search_content {
    margin: 15px 0;
    .el-table {
      border-collapse: collapse;
    }
    .divrow {
      display: block;
      line-height: 28px;
      margin: 0 -10px;
      padding: 0 10px;
      position: relative;
    }
    .divrow:after {
      content: "";
      width: 100%;
      height: 1px;
      background: #ebeef5;
      position: absolute;
      left: 0;
      bottom: -1px;
    }
  }
</style>