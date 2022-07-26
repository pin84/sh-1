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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1010;
}
</style>