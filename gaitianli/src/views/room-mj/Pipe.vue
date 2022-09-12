<template>
  <div class="pipe" :style="{'width':w != 0 ? w + 'rem' : '100%', 'margin-left':ml+'rem'}" :class="{'bg-green':state}">

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    w: {
      type: Number,
      default: () => 0,
    },
    ml: {
      type: Number,
      default: () => 0,
    },
    state: {
      type: Number,
      default: () => 1,
    },
  },
};
</script>

<style lang="scss" scoped>
.pipe {
  position: relative;
  height: 13px;
  background-color: $bg-pipe-null;
  z-index: 0;
  &.bg-green {
    background-color: $bg-pipe;
    z-index: 10;
  }
  .vale {
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>