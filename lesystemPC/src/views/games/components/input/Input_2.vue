<template>
  <input
    v-bind="$attrs"
    v-bind:value="value"
    v-on="inputListeners"
    max="999999"
    type="number"
  />
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["value"],
  computed: {
    inputListeners: function () {
      var vm = this;
      return Object.assign({}, this.$listeners, {
        input: function (event) {
          let value = event.target.value;
          // if (value.indexOf(".") != -1) {
          //   value = value.replace(".", "");
          // }
          // if (!value) {
          //   value = 1;
          // }

          // if (value < 0) {
          //   value = 0;
          // }

          // value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
          // value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
          // value = value
          //   .replace(".", "$#$")
          //   .replace(/\./g, "")
          //   .replace("$#$", ".");
          // value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
          // if (value.indexOf(".") < 0 && value != "") {
          //   //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          //   value = parseFloat(value);
          // }



          vm.$emit("input", value);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  width: 100px;
  height: 35px;
  outline: none;
  padding: 1px 5px;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 3px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
</style>
