<template>
  <el-select class="select" v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  props:{
    options:{
      type:Array,
      default:()=>[
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ]
    }
  },
  data() {
    return {
      value: "",
    };
  },

  created(){
    this.initData()
  },

  methods:{
    initData(){
      this.value = this.options[0].label
    }
  }
};
</script>

<style lang="scss" scoped>
.select {
  width: 100px;
  overflow: hidden;
  // border-radius: 30px;
  // border: 1px solid #7269e6;
}
</style>