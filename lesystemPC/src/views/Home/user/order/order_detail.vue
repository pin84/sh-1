<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      个人订单
    </div>
    <el-divider></el-divider>
    <div class="detai-box">
      <el-row :gutter='20'>
        <el-col :span='8'>
          <el-row class="rowlist">
            <el-col class="left" :span="8">用户名：</el-col>
            <el-col class="right" :span="16">{{order_datail.username}}</el-col>
          </el-row>
          <el-row class="rowlist">
            <el-col class="left" :span="8">注单编号：</el-col>
            <el-col class="right" :span="16">{{order_datail.orderNo}}</el-col>
          </el-row>
          <el-row class="rowlist">
            <el-col class="left" :span="8">倍数模式：</el-col>
            <el-col class="right" :span="16">{{order_datail.mode}}</el-col>
          </el-row>
          <el-row class="rowlist">
            <el-col class="left" :span="8">奖期</el-col>
            <el-col class="right" :span="16">{{order_datail.periodNo}}</el-col>
          </el-row>
          <el-row class="rowlist">
            <el-col class="left" :span="8">投注注数</el-col>
            <el-col class="right" :span="16">{{order_datail.zhushu}}</el-col>
          </el-row>
        </el-col>
        <el-col :span='8'>
          <el-row class="rowlist">
            <el-col class="left" :span="8">动态返点：</el-col>
            <el-col class="right" :span="16">{{order_datail.fandian}}</el-col>
          </el-row>
          <el-row class="rowlist">
            <el-col class="left" :span="8">游戏：</el-col>
            <el-col class="right" :span="16">{{order_datail.gameName}}</el-col>
          </el-row>
          <el-row class="rowlist">
            <el-col class="left" :span="8">投单时间：</el-col>
            <el-col class="right" :span="16">{{order_datail.orderTime}}</el-col>
          </el-row>
          <el-row class="rowlist">
            <el-col class="left" :span="8">注单奖金：</el-col>
            <el-col class="right" :span="16">{{order_datail.bonus}}</el-col>
          </el-row>
          <el-row class="rowlist">
            <el-col class="left" :span="8">开奖内容：</el-col>
            <el-col class="right" :span="16">{{order_datail.data}}</el-col>
          </el-row>
        </el-col>
        <el-col :span='8'>
         <el-row class="rowlist">
            <el-col class="left" :span="8">玩法：</el-col>
            <el-col class="right" :span="16">{{order_datail.playname}}</el-col>
          </el-row>
          <el-row class="rowlist">
            <el-col class="left" :span="8">总金额：</el-col>
            <el-col class="right" :span="16">{{order_datail.amount}}</el-col>
          </el-row>
          <el-row class="rowlist">
            <el-col class="left" :span="8">动态返点：</el-col>
            <el-col class="right" :span="16">{{order_datail.fandian}}</el-col>
          </el-row>
          <el-row class="rowlist">
            <el-col class="left" :span="8">注单奖金：</el-col>
            <el-col class="right" :span="16">{{order_datail.bonus}}</el-col>
          </el-row>
          <el-row class="rowlist">
            <el-col class="left" :span="8">订单状态：</el-col>
            <el-col class="right" :span="16">
              <span v-if="(order_datail.periodStatus==1 && order_datail.orderStatus==1) || order_datail.periodStatus==0" style="color:#2EA7E0">可撤单</span>
              <span v-if="order_datail.periodStatus==2 && order_datail.orderStatus==1" style="color:green">未开奖</span>
              <span v-if="order_datail.periodStatus==3 && order_datail.orderStatus==2" style="color:#999">未中奖</span>
              <span v-if="order_datail.periodStatus==3 && order_datail.orderStatus==3" style="color:red">已派奖</span>
              <span v-if="order_datail.periodStatus==3 && order_datail.orderStatus==1" style="color:#999">未结算</span>
              <span v-if="order_datail.orderStatus==4" style="color:#999">已撤单</span>
              <span v-if="order_datail.orderStatus==5" style="color:#999">下单失败</span>
              <span v-if="order_datail.orderStatus==99" style="color:#999">处理中</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col class="tz_haoma" :span="24">
          <el-row>
              <el-col :span="4">
                  投注内容
              </el-col>
              <el-col class="tz_haoma_content" :span="20">
                {{order_datail.myData}}
              </el-col>
          </el-row>
        </el-col>
        <el-col class="zj_bottom" :span="24">
          <el-row>
            <el-col :span="4">奖级名称</el-col>
            <el-col :span="4">号码</el-col>
            <el-col :span="4">倍数</el-col>
            <el-col :span="4">奖级</el-col>
            <el-col :span="4">奖金</el-col>
            <el-col :span="4">中奖金额</el-col>
          </el-row>
          <el-row class="zj_bottom_content" v-for="(item,index) in order_zjqk" :key="index">
            <el-col :span="4">{{item.bonusName}}</el-col>
            <el-col :span="4">{{item.winData}}</el-col>
            <el-col :span="4">{{item.beishu}}</el-col>
            <el-col :span="4">{{item.winLevel}}</el-col>
            <el-col :span="4">{{item.bonus}}</el-col>
            <el-col :span="4">{{item.winBonus}}</el-col>
          </el-row>
        </el-col>
        <el-col class="order_buttons" :span="24">
          <el-button  @click="handelcedan()" v-show="(order_datail.periodStatus==1 && order_datail.orderStatus==1) || order_datail.periodStatus==0" type="success">撤单</el-button>
          <el-button @click.native="$router.push('/user/order')" type="success">返回</el-button>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="操作提示"
      :visible.sync="cd_dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>是否撤销该订单？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cd_dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="removeeOrder()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="操作提示"
      :visible.sync="qr_dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>{{qr_dialogmessage}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="qr_dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="qr_dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      order_datail:[],
      order_zjqk:[],
      orderId:'',
      cd_dialogVisible:false,
      qr_dialogVisible:false,
      qr_dialogmessage:''
    }
  },
  methods:{
    // 撤单弹窗
    handelcedan() {
      this.cd_dialogVisible=true
    },
    // 关闭撤单弹窗
     handleClose(done) {
       done();
      },
    // 确认撤销订单
    removeeOrder(){
        this.cd_dialogVisible=false
        this.$get("Pc.GameIndex.revokeOrder", {
            ids:this.orderId
      }).then((res) => {
        if (res.code == 0) {
          this.qr_dialogVisible=true
          this.qr_dialogmessage=res.message
        } else {
          this.qr_dialogVisible=true
          this.qr_dialogmessage=res.message;
        }
      });
    },
  },
  watch: {
    '$route' (to, from) {
      let parmms =  Object.keys(this.$route.params); 
      if(parmms.length){
        this.order_datail=this.$route.params.detail.orderInfo
        this.order_zjqk=this.$route.params.detail.possibleGet
        this.orderId=this.$route.params.orderId
      }else{
        return false
      }
      
  }
 },
  created(){
    this.order_datail=this.$route.params.detail.orderInfo
    this.order_zjqk=this.$route.params.detail.possibleGet
    this.orderId=this.$route.params.orderId
    //console.log(this.order_datail)
    console.log(this.order_zjqk)
  }
}
</script>

<style lang="scss">
.detai-box{
  background: #e1effb6b;
  color:#434343;
  padding: 30px 15px 15px 15px;
  .rowlist{
    margin-bottom: 15px;
  }
  .tz_haoma{
    border-radius: 4px;
    margin-top: 30px;
    padding: 10px;
    background: rgba(0,0,0,.05);
    text-align: center;
    .tz_haoma_content{
      text-align: left;
    }
  }
  .zj_bottom{
    border-radius: 4px;
    margin-top: 30px;
    padding: 10px;
    background: rgba(0,0,0,.05);
    text-align: center;
    .el-row{
      padding: 10px 0 ;
    }
    .zj_bottom_content{
      background: rgba(255,255,255,.7);
      border-bottom: 1px solid #eee;
    }
  }
  .order_buttons{
    margin-top: 20px;
  }
  .right{
    text-align: right;
  }
}
</style>