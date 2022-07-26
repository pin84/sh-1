<template>
  <input class="input" :style="styleObj" v-model="num" @input="inputText" />
</template>

<script>
export default {
  props: {
    ratio: {
      type: Number,
      default: () => 1,
    },
    styleObj: {
      type: Object,
      default: () => {
        return {
          height: '26px',
        }
      }
    }

  },
  data() {
    return {
      num: 1,
    };
  },

  created() {
    this.num = this.ratio;
  },

  methods: {
    inputText() {
      let val = this.num;
      if (val.indexOf(".") != -1) {
        val = val.replace(".", "");
      }
      // if (!val) {
      //   val = 1;
      // }

      if (val > 99) {
        val = 99;
      }
      if (val < 0) {
        val = 0;
      }
      if (val && String(val).startsWith("0")) {
        val = val.substring(1);
      }

      this.num = val;
      this.$emit("inputValue", this.num);
    },
  },
};
</script>

<style lang="scss" scoped>
$height: 26px;
.input {
  width: 100%;
  border: none;
  outline: none;
  padding: 1px 5px;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #ccc;
}
</style>
