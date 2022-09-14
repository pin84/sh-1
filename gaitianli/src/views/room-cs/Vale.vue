<template>
  <div class="vale" :class="{'active':state}" >
  </div>
</template>
<script>
export default {
  props:{
    state:{
      type:Number,
      default:()=>0
    },
  
  },
  data(){
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.vale{
  color: #fff;
  font-size: 16px;
  width: 60px;
  height: 60px;
  background: url('../../../public/gaitianli/room-cs-vale.png') center no-repeat;
  background-size: contain;
  &.active{
    background: url('../../../public/gaitianli/room-cs-vale-active.png') center no-repeat;
    background-size: contain;
  }
}
</style>