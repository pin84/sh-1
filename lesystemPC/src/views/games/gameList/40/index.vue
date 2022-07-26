<template>
  <div class="G810">
    <PFushi :config='config'  v-if="type == 'A'" />
    <PFushiApart :config='config'  v-if="type == 'A1'" />
    <PFushiApart1 :config='config'  v-if="type == 'A2'" />
    <PFushiHeZhi :config='config'  v-if="type == 'A3'" />
    <PDanshi  :config='config'  v-if="type == 'B'" />
    <PDanshiApart  :config='config'  v-if="type == 'B1'" />
    <PLongHu  :config='config'  v-if="type == 'C'" />
    <PNiuNiu  :config='config'  v-if="type == 'C1'" />
    <PBaiJiaLe  :config='config'  v-if="type == 'C2'" />
    <PDingWeiDan  :config='config'  v-if="type == 'D'" />
   
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
    PDanshiApart:()=>import('./PDanshiApart'),
    PFushi:()=>import('./PFushi'),
    PFushiApart:()=>import('./PFushiApart'),
    PFushiApart1:()=>import('./PFushiApart_1'),
    PFushiHeZhi:()=>import('./PFushiHeZhi'),
    PLongHu:()=>import('./PLongHu'),
    PNiuNiu:()=>import('./PNiuNiu'),
    PBaiJiaLe:()=>import('./PBaiJiaLe'),
    PDingWeiDan:()=>import('./PDingWeiDan'),
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


      let ids = [3183,3186,3192,3189,3195,3198,3201,3204,3207,3210]
      if(ids.includes(I)){
        I = 3183
      }


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
  height:240px;
  padding:10px 20px;
}
</style>