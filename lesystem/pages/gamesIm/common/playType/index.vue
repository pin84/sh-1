<template>
  <view>
    <P2
      v-if="curType === 'B'"
      @changeGameType="changeGameType"
      @closePlayType="closePlayType"
      :curId="curId"
    />
    <P3
      v-if="curType === 'C'"
      @changeGameType="changeGameType"
      @closePlayType="closePlayType"
      :curId="curId"
    />
  </view>
</template>

<script>
import P2 from "./P2.vue";
import P3 from "./P3.vue";
import ids from '@/pages/gamesIm/ids.js'
export default {
  data() {
    return {
      curType: "A",
      curId: 0,
    };
  },
  components: {
    P2,
    P3,
  },

 

  created() {
    this.initData();
  },

  methods: {
    initData(val) {
      this.curType = "";
      let routes = getCurrentPages()
      let { id } = routes[routes.length - 1].options
      id = Number(id);
      this.curId = id;

      let idType 
      for(let [key,value] of Object.entries(ids)){
        if(value.includes(id)){
          idType = key
        }
      }
      if (idType == 105 || idType == 106) {
        setTimeout(() => {
          this.curType = 'B';
        }, 100);
      } else {
        setTimeout(() => {
          this.curType = "C";
        }, 100);
      }
    },
    changeGameType(val) {
      this.$emit("changeGameType", val);
    },
    closePlayType(val) {
      this.$emit("closePlayType", val);
    },
  },
};
</script>

<style></style>
