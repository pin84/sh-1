<template>
  <div
    @mousewheel="mousewheel"
    class="mask"
    @click.self="hidden"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowMask: false,
    };
  },
  created() {
  },

  methods: {
    hidden() {
     this.$emit('hiddenMask')
    },
    mousewheel(e) {
      e.preventDefault();
    },
  },
};
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1010;
}
</style>