<template>
  <div class="info-bar" :style="{'margin-left':ml + 'rem'}">
    <div v-for="(item,index) in list" :key="index">
      <span>{{item.name}}：</span>
      <span>{{d[item.mkey]}}{{item.unit}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    ml:{
      type:Number,
      default:()=>0
    },
    d:{
      type:Object,
      default:()=>{}
    }
  },
  data(){
    return {
      list:[
        {
          name:'计时',
          unit:'分',
          mkey:'JiShi'
        },
        {
          name:'温度',
          unit:'度',
          mkey:'WenDu'
        },
        {
          name:'压力',
          unit:'MPa',
          mkey:'YaLi'
        },
        {
          name:'搅拌',
          unit:'Hz',
          mkey:'ZhuanSu'
        }
     
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.info-bar{
  color: #fff;
  font-size: 16px;
}
</style>