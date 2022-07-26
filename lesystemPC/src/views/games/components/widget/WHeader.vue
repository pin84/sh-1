<template>
  <div class="w-header">
    <span>{{leftText}}</span>
    <i @click="close" class="iconfont icon-cuo pointer"></i>
  </div>
</template>
<script>
export default {
  props:{
    leftText:{
      type:String,
      default:()=>'注单详情'
    }
  },
  methods:{
    close(){
      this.$emit('close')
    }
  }
  
}
</script>
<style lang="scss" scoped>
.w-header{
  width: 100%;
  min-width: 200px;
  height: 35px ;
  flex: 0 0 35px;
  background-color: #cf271e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 14px;
  color: #fff;
  .iconfont{
    padding: 5px;
  }
}
</style>