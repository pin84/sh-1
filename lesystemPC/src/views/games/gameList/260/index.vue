<template>
  <div class="G810">
    <PFushi :config='config'  v-if="type == 'A'" />
    <PDanshi  :config='config'  v-if="type == 'B'" />
    <PDingWeiDan  :config='config'  v-if="type == 'D'" /> 
    <!-- <PFushiApart :config='config'  v-if="type == 'A1'" />
    <PFushiApart1 :config='config'  v-if="type == 'A2'" />
    <PFushiHeZhi :config='config'  v-if="type == 'A3'" />
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
    // PFushiHeZhi:()=>import('./PFushiHeZhi'),
    // PLongHu:()=>import('./PLongHu'),
    // PNiuNiu:()=>import('./PNiuNiu'),
    // PBaiJiaLe:()=>import('./PBaiJiaLe'),
  },

  watch:{
    '$store.state.gd.curGame':{
      handler:function(val){
        console.log('810/index',val.I);
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

  console.log(I);
       
      // let ids = [3183,3186,3192,3189,3195,3198,3201,3204,3207,3210]
      // if(ids.includes(I)){
      //   I = 3183
      // }


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
  // min-height:350px;
  padding:10px 20px;
}
</style>