<template>
  <div class="mie-jun">

  
  </div>
</template>

<script>

export default {
  created() {
    this.initData();
  },

  methods: {
    async initData() {
      let res = this.$get("/MieJunGuanList");

      console.log(res);
    },

    async awaitTime(delay) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(true);
        }, delay);
      });
    },
  },

  beforeDestroy() {
    this.isBreak = true;
  },
};
</script>

<style lang="scss" scoped>
$fmw: 100px;
.mie-jun {
  width: 1920px;
  height: 1080px;
  box-sizing: border-box;
  // background: url("../../../public/gaitianli/bg-4.png") center no-repeat;
  background-size: contain;
  position: relative;
  font-size: 10px;
  border: 2px solid red;
  background-color: #fff;
  box-sizing: border-box;


}
</style>