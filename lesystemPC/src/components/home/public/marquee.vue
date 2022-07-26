<template>
  <div class="wraps" id="wraps">
    <div id="box">
      <div id="marquee" @click="newsShow">{{text}}</div>
    </div>
    <div id="node" @click="newsShow">{{text}}</div>
  </div>
</template>
<script>
export default {
  props: ["lists"],
  data() {
    return {
      text: "",
    };
  },
  // 把父组件传入的arr转化成字符串
  watch: {
    lists(val) {
      if (val) {
        this.text = "";
        for (let i = 0; i < val.length; i++) {
          this.text +=val[i].title;
        }
      }
    }
  },
  methods: {
    move() {
      let width = document.getElementById("node").getBoundingClientRect().width;
      let box = document.getElementById("box");
      let totalWidth = document.getElementById("wraps").getBoundingClientRect()
        .width;
      let distance = totalWidth;
      box.style.transform = "translateX(" + distance + "px)"; //初始值
      setInterval(function() {
        distance = distance - 1;
        if (-distance >= width) {
          distance = totalWidth;
        }
        box.style.transform = "translateX(" + distance + "px)";
      }, 20); //控制速度
    },
    newsShow() {
      this.$parent.newsShow();
    }
  },
  // 更新的时候运动
  updated: function() {
    this.move();
  }
};
</script>
<style scoped>
.wraps {
  overflow: hidden;
  float: left;
  height: 45px;
  font-size: 10px;
  width: 100%;
  -moz-box-flex: 1;
  -webkit-box-flex: 1;
  box-flex: 1;
  -moz-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
#box {
  width: 80000%;
}
#box div {
  float: left;
}
#marquee {
  margin: 0 16px 0 0;
}
#node {
  position: absolute;
  z-index: -999;
  top: -999999px;
}
</style>