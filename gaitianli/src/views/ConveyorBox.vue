<template>
  <div
    class="conveyor-box"
    :class="[{'middle-box' : itemType == 2},{'w_12':itemType==3}]"
  >
    <div
      v-for="(n,idx) in statuArr"
      :key="idx"
    >

      <ItemConveyorBeltMidlle
        v-if="itemType == 2"
        v-bind="$attrs"
        :statu='statuArr[idx]'
      />
      <ItemConveyorBelt
        v-else
        v-bind="$attrs"
        :statu='n'
      />
    </div>

    <div class="tp-box">
      <div
        v-for="(n,index) in statuArr"
        :key="index"
      >
        <ItemCssMiddle
          v-if="itemType == 2"
          v-bind="$attrs"
          :isHas='isShowArr[index]'
        />
        <ItemCss
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
    wh: {
      type: Object,
      default: () => {
        return {
          width: "12px",
        };
      },
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
.conveyor-box {
  width: 15px;
  position: relative;
  overflow: hidden;
  &.middle-box {
    width: 57px;
  }
  &.w_12 {
    width: 12px;
  }

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