<template>
  <view @click.self="hideModal" class="cu-modal show">
    <view class="cu-dialog">
      <view v-if="isShowTitle" class="cu-bar bg-white justify-end">
        <view class="content">{{title}}</view>
        <view class="action" @tap="hideModal">
          <text class="iconfont icon-cuo text-red"></text>
        </view>
      </view>
      <view class="padding-xl">
        <slot />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props:{
    isShowTitle:{
      type:Boolean,
      default:()=>true
    },
    title:{
      type:String,
      default:()=>'Modal标题'
    }
  },
  methods:{
    hideModal(){
      this.$emit('close')
    }
  }
};
</script>

<style lang="scss" scoped>
.cu-modal{
  z-index: 999;
}
</style>