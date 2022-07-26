<template>
  <div class="rule">
    <WHeader leftText="规则说明" v-on="$listeners" />
    <ul class="list">
      <li
        @click="selectGame(item)"
        :class="{ active: curId == item.id }"
        class="item pointer"
        v-for="(item, index) in gameList"
        :key="index"
      >
        {{ item.gameName }}
      </li>
    </ul>

    <div class="list list-type">
      <span
        @click="selectType(idx)"
        :class="{ active: curTypeIndex == idx }"
        class="item pointer"
        v-for="(type, idx) in typeList"
        :key="idx"
        >{{ type }}</span
      >
    </div>

    <div class="content-box" v-html="htmlStr"></div>
  </div>
</template>
<script>
import WHeader from "@/views/games/components/widget/WHeader.vue";
export default {
  data() {
    return {
      curTypeIndex: 0,
      curId: 0,
      gameList: [],
      typeList: ["规则说明"],
      htmlStr: "",
    };
  },
  components: {
    WHeader,
  },

  created() {
    this.initData();
  },

  methods: {
    async initData() {
      let res = await this.$get(this.$gapi.getSimpleCpGameList);
      let { gameType } = this.$store.state.gd.indexGameData;
      let { id } = this.$store.state.gd.indexGame;
      this.curId = id;
      let tem = [];
      res.data.forEach((element) => {
        if (element.groupId == gameType) {
          tem.push(element);
        }
      });
      this.gameList = tem;
      let curItem = this.gameList.find((item) => item.id == this.curId);
      this.selectGame(curItem);
    },
    async selectGame(item) {
      let { id } = item;
      this.curId = id;
      let res = await this.$get(this.$gapi.getGameRuleContent, {
        gameId: this.curId,
      });
      this.htmlStr = res.data.game_rules;
    },
    selectType(idx) {
      this.curTypeIndex = idx;
    },
  },
};
</script>

<style lang="scss" scoped>
.rule {
  width: 860px;
  height: 650px;
  background-color: #fff;
  border: 4px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  .list {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    background-color: #eee;
    flex: 0 0 80px;
    .item {
      padding: 3px 6px;
      &.active {
        color: #ff6a00;
      }
      &:hover {
        color: #f01011;
      }
    }
  }
  .list-type {
    padding: 0px 10px;
    flex: 0 0 20px;
    border-top: 1px solid #ccc;
    .active {
      background-color: #fff;
    }
  }
  .content-box {
    height: 100%;
    overflow: scroll;
    padding: 5px;
  }
}
</style>