<template>
  <view class="basket-list">
    <NumberBasketOld v-if="curFoot == 'A'" />
    <Basket259 v-if="curFoot == 'B'" />
    <BasketCredit v-if="curFoot == 'C'" />
  </view>
</template>

<script>
import NumberBasketOld from "./NumberBasket";
import BasketCredit from "./Basket";
import Basket259 from "./Basket259";
import ids from "@/pages/gamesIm/ids.js";
export default {
  data() {
    return {
      curFoot: "",
    };
  },

  components: {
    NumberBasketOld,
    BasketCredit,
    Basket259,
  },

  created() {
    this.initData();
  },
  methods: {
    initData() {
      let { curGameId, gameType } = this.$store.state.GDV3.v3IndexGameAllData;
      curGameId = Number(curGameId);
      let curKey;
      for (let [key, value] of Object.entries(ids)) {
        if (value.includes(curGameId)) {
          curKey = key;
          break;
        }
      }
      let curFoot;
      if (curKey == 259) {
        this.curFoot = "B";
        return;
      }

      if (gameType == 1) {
        curFoot = "A";
      } else {
        curFoot = "C";
      }

      this.curFoot = curFoot

    },
  },
};
</script>

<style lang="scss" scoped>
.basket-list {
  height: 100%;
  // border: 1px solid blue;
  box-sizing: border-box;
  overflow: scroll;
}
</style>
