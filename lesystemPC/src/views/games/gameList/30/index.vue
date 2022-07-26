<template>
  <div class="G810">
    <PFushi :config='config'  v-if="type == 'A'" />
    <PFushiHeZhi :config='config'  v-if="type == 'A1'" />
    <PFushiDaXiaoDanShuang :config='config'  v-if="type == 'A2'" />
    <PDanshi  :config='config'  v-if="type == 'B'" />
    <PDingWeiDan  :config='config'  v-if="type == 'D'" /> 
    <!-- <PFushiApart :config='config'  v-if="type == 'A1'" />
    <PFushiApart1 :config='config'  v-if="type == 'A2'" />
    <PDanshiApart  :config='config'  v-if="type == 'B1'" />
    <PLongHu  :config='config'  v-if="type == 'C'" />
    <PNiuNiu  :config='config'  v-if="type == 'C1'" />
    <PBaiJiaLe  :config='config'  v-if="type == 'C2'" />
    -->
   
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
    PDanshi:()=>import('./PDanshi'),
    PFushi:()=>import('./PFushi'),
    PDingWeiDan:()=>import('./PDingWeiDan'),
    // PDanshiApart:()=>import('./PDanshiApart'),
    // PFushiApart:()=>import('./PFushiApart'),
    // PFushiApart1:()=>import('./PFushiApart_1'),
    PFushiHeZhi:()=>import('./PFushiHeZhi'),
    PFushiDaXiaoDanShuang:()=>import('./PFushiDaXiaoDanShuang'),
    // PLongHu:()=>import('./PLongHu'),
    // PNiuNiu:()=>import('./PNiuNiu'),
    // PBaiJiaLe:()=>import('./PBaiJiaLe'),
  },

  watch:{
    '$store.state.gd.curGame':{
      handler:function(val){
         this.initData(val)
      },
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
      setTimeout(()=>{
        this.type = this.config.type 
      },0)
    }
  }
};
</script>

<style lang="scss" scoped>
.G810{
  // height:240px;
  padding:10px 20px;
}
</style>