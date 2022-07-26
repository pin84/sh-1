<template>
  <label>
    <input
      v-bind="$attrs"
      v-bind:value="value"
      v-on="inputListeners"
      class="my-input"
			type="number"
    />
    {{ label }}
  </label>
</template>




<script>
export default {
  inheritAttrs: false,
  props: ["label", "value"],
  computed: {
    inputListeners: function() {
      var vm = this;
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign(
        {},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function(event) {
						let v = event.target.value
            vm.$emit("input", v.replace('.',''));
          }
        }
      );
    }
  },

  // created(){
  //   this.debounce(this.inputEmit)
  // },

  // methods: {
  //   inputa(e) {
  //     this.debounce(this.inputEmit);
  //   },

  //   inputEmit() {
  //     console.log('event.target.value');

  //     // this.$emit("inputText", event.target.value);
  //   },
  //   debounce(fn) {
  //     this.timer = null;
  //     return function() {
  //       clearTimeout(this.timer);
  //       this.timer = setTimeout(() => {
  //         fn.apply(this, arguments)
  //       }, 1000);
  //     };
  //   }
  // }
};
</script>
<style lang="scss" scoped>
.my-input {
  width: 100%;
	height: 75rpx;
  border: none;
  background-color:rgba(255,255,255,0.3);
  // padding :3rpx 20rpx;
  border-radius:10rpx;
  text-align: center;
	font-size: 28rpx;
  // box-sizing: border-box;

}
</style>