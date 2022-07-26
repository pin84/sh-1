<template>
  <div class="G810">
    <PFushi :config='config'  v-if="type == 'A'" />
    <PFushi1 :config='config'  v-if="type == 'B'" />
  </div>
</template>

<script>
import gameConfig from './gameConfig'
export default {
  data(){
    return {
      config:null,
      type:null,
    }
  },
  components:{
    PFushi:()=>import('./PFushi'),
    PFushi1:()=>import('./PFushi1'),
  },

  watch:{
    '$store.state.gd.curGame':{
      handler:function(val){
         this.initData(val)
      },
      // deep:true
    }
  },

  created(){
    let curGame = this.$store.state.gd.curGame
    if(!curGame) return
    this.initData(curGame)
  },

  methods:{
    initData(val){
      this.type = null
      let {I} = val
      this.config = gameConfig[I] || null
      if(!this.config) return

      console.log('-sdfds--',I);
      setTimeout(()=>{
        this.type = this.config.type 
      },0)
    }
  }
};
</script>

<style lang="scss" scoped>
.G810{
  min-height:260px;
  // height: 260px;;
  //  border:1px solid red;
  padding:10px 20px;
}
</style>