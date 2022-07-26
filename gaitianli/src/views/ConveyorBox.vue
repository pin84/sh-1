<template>
  <div class="conveyor-box middle-box">
    <div
      v-for="(n,idx) in statuArr"
      :key="idx"
    >
      <ItemConveyorBelt
        v-if="itemType == 1"
        v-bind="$attrs"
        :statu='n'
      />

      <ItemConveyorBeltMidlle
        v-else
        v-bind="$attrs"
        :statu='statuArr[idx]'
      />
    </div>

    <div class="tp-box">
      <div
        v-for="(n,index) in statuArr"
        :key="index"
      >
        <ItemCss
          v-if="itemType == 1"
          v-bind="$attrs"
          :isHas='isShowArr[index]'
        />
        <ItemCssMiddle
          v-else
          v-bind="$attrs"
          :isHas='isShowArr[index]'
        />

      </div>
    </div>
  </div>
</template>

<script>
import ItemConveyorBelt from "@/views/ItemConveyorBelt.vue";
import ItemConveyorBeltMidlle from "@/views/ItemConveyorBeltMidlle.vue";
import ItemCss from "@/views/ItemCss.vue";
import ItemCssMiddle from "@/views/ItemCssMiddle.vue";
export default {
  props: {
    itemType: {
      type: Number,
      default: 2,
    },
    isShowArr: {
      type: Array,
      default: () => [],
    },
    statuArr: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ItemConveyorBelt,
    ItemConveyorBeltMidlle,
    ItemCss,
    ItemCssMiddle,
  },
};
</script>
<style lang="scss" scoped>
$w: 12px;
// $h:20px;
@mixin wh($w, $h: $w) {
  width: $w;
  height: $h;
}
.conveyor-box {
  width: 100%;
  // &.middle-box{
  //    width: 60px;
  // }

  .tp-box {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
}
</style>