<template>
  <input
    v-bind="$attrs"
    v-bind:value="value"
    v-on="inputListeners"
    pattern="[0-9]*"
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
          if (value.indexOf(".") != -1) {
            value = value.replace(".", "");
          }
          // if (!value) {
          //   value = 1;
          // }
          if (value < 0) {
            value = 0;
          }
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
