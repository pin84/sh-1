<template>
  <div class="user-info">
    <div class="leftGamesNav">
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        active-text-color="#cf0f00"
        :unique-opened="true"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-submenu
          :index="String(index)"
          v-for="(item, index) in gameCateList"
          :key="index"
        >
          <template slot="title">
            <i class="iconfont icon-qiche gamenavicon"></i>
            <span>{{ item.categoryName }}</span>
          </template>
          <el-menu-item
            @click="toGame(obj)"
            v-for="(obj, idx) in item.gameInfoList"
            :key="idx"
            :index="String(index) + '-' + String(idx)"
          >
            {{ obj.gameName }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultActive: "0-0",
      gameCateList: [],
    };
  },

  created() {
    this.initData();
  },
  methods: {
    toGame(obj) {
      let { gameId } = obj;
      this.$router.push({ path: "/games", query: { id: gameId } });
      location.reload();
    },
    async initData() {
      let { gameType } = this.$store.state.gd.indexGameData;
      let { id } = this.$store.state.gd.indexGame;
      let res = await this.$get(this.$gapi.getGameList);
      let { data } = res;
      this.gameCateList = data[gameType].gameCateList;
      let i = 0;
      let index = 0;
      for (let outObj of this.gameCateList) {
        let idx = outObj.gameInfoList.findIndex((item) => item.gameId == id);
        if (idx != -1) {
          index = idx;
          break;
        }
        i++;
      }

      this.defaultActive = i + "-" + index;
    },
    handleOpen(key, keyPath) {
      this.defaultActive = key + "-0";
    },
    handleClose(key, keyPath) {
    },
  },
};
</script>
<style lang="scss">
.el-submenu .el-menu-item {
  height: 28px;
  line-height: 28px;
}
.el-submenu__title {
  height: 40px;
  line-height: 40px;
  border-bottom-color: #ca151e;
  background-color: #eeeeee;
  border: 1px solid #b3190c;
  border-radius: 5px;
  width: 98%;
  margin: 2px auto;
  color: #000000;
}

.el-submenu.is-active .el-submenu__title {
  border-bottom-color: #ca151e;
  background-color: #c52e22;
  border: 1px solid #b3190c;
  border-radius: 5px;
  width: 98%;
  margin: 0 auto;
  color: #ffffff;
}
.el-submenu__title i {
  color: #000000;
}
.el-submenu.is-active .el-submenu__title i {
  color: #ffffff;
}
</style>
<style lang="scss" scoped>
.leftGamesNav {
  margin-top: 20px;
}

.gamenavicon {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 22px;
  vertical-align: middle;
}
</style>
