<template>
  <div class="el-box">
    <el-popover placement="top-start" title="" width="200" trigger="hover">
      <ul class="tips-content" v-html="example"></ul>
      <el-button class="example" slot="reference">示例</el-button>
    </el-popover>

    <el-popover placement="top-start" title="" width="200" trigger="hover">
      <ul class="tips-content" v-html="rule"></ul>
      <el-button slot="reference" class="iconfont icon-wenhao1"> </el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {
    example: {
      type: String,
      default: ''
    },
    rule: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      text1: "aaa",
      text2: "bbb",
      text3: "ccc",
    };
  },
};
</script>

<style lang="scss" scoped>
$width: 20px;
.el-box {
  display: flex;
  align-items: center;
  .example {
    background-color: gray;
    border-radius: 20px;
    color: #fff;
    font-size: 14px;
    padding: 4px 15px;
  }

  .icon-wenhao1 {
    border: none;
    font-size: 18px;
  }
}
</style>