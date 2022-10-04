<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="8">
            <a-form-model-item label="订单号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="orderNo">
              <a-input v-model="model.orderNo" placeholder="请输入订单号"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="货号ID" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="huohaoId">
              <j-popup
                v-model="model.huohaoId"
                field="huohaoId"
                org-fields="id,huohao_name"
                dest-fields="huohaoId,huohaoName"
                code="s_huohao"
                :multi="true"
                @input="popupCallback"
                />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="货号名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="huohaoName">
              <a-input v-model="model.huohaoName" placeholder="请输入货号名称" disabled ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="国家" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="country">
              <j-dict-select-tag type="list" v-model="model.country" dictCode="sys_country" placeholder="请选择国家" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="船期（ETD）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="etd">
              <j-date placeholder="请选择船期（ETD）" v-model="model.etd"  style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="工厂货期" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="fcd">
              <j-date placeholder="请选择工厂货期" v-model="model.fcd"  style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="大货进度" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="dahuojindu">
              <a-input v-model="model.dahuojindu" placeholder="请输入大货进度"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="港口" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="port">
              <j-dict-select-tag type="list" v-model="model.port" dictCode="sys_port" placeholder="请选择港口" />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="总箱数" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="cartonTotal">
              <a-input-number v-model="model.cartonTotal" placeholder="请输入总箱数" style="width: 100%" disabled/>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="remark">
              <a-input v-model="model.remark" placeholder="请输入备注"  ></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </j-form-container>
     <div>
<!--          <a-table
            ref="huohaoTable"
            size="middle"
            :scroll="{x:true}"
            bordered
            rowKey="id"
            :columns="huohaoColumns"
            :dataSource="dataSource"
            :loading="loading"
            class="j-table-force-nowrap">

            <template slot="htmlSlot" slot-scope="text">
              <div v-html="text"></div>
            </template>
            <span slot="action" slot-scope="text, record">
              <a @click="handleEdit(record)">编辑/添加颜色码数</a>

              <a-divider type="vertical" />
            </span>


          </a-table> -->
          <template v-for="(huohao,hindex) in dataSource.wmHuohaoList">
            <div class="huohaoItemDiv">
<!--            <table class="ant-table-fixed" style="width: 100%;">
                <thead class="ant-table-thead"> <tr>
                   <template v-for="(col,i) in huohaoColumns">
                     <th>{{col.title}}</th>
                   </template>
                   <th>操作</th>
                   </tr>
                   <tr>
                   <template v-for="(col,i) in huohaoColumns">
                     <td>{{huohao[col.dataIndex]}}</td>
                   </template>
                   <td><button @click="editColor(huohao.wmColorList)">添加颜色码段</button></td>
                   </tr>

                   </thead>
             </table> -->
             <div class="huohaoItemTitle">
               <span>货号:</span><span>{{huohao["huohaoName"]}}</span>
               <div style="float: right;position: relative;margin-right:5px;height: 23px;">
               <span><button @click="addColor(huohao)" type="button" class="ant-btn ant-btn-primary"><i class="anticon anticon-plus"><svg viewBox="64 64 896 896" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path></svg></i><span>新增颜色</span></button></span>
               </div>
             </div>

             <!--color-->
             <div v-show="huohao.wmColorList==null" style="padding: 10px;">
               暂无此货号的颜色码段.请添加
              </div>
              <div class="colorDiv" v-if="huohao.wmColorList!=null&&huohao.wmColorList!=undefined">
              <template  v-for="(color,cindex) in huohao.wmColorList">
                <div class="colorItemDiv">
                <table class="ant-table-fixed" style="width: 100%;" >
                 <thead class="ant-table-thead"> <tr>
                    <template v-for="(ccol,ci) in colorColumns">
                      <th>{{ccol.title}}</th>
                    </template>
                    <th>操作</th>
                    </tr>
                    <tr>
                    <template v-for="(ccol,ci) in colorColumns">
                      <td v-if="ccol.type!=undefined&& ccol.type=='imgage'">
                        <img :src="getImgView(color[ccol.dataIndex])" alt="" style="max-width:80px;height:25px;"/>
                      </td>
                      <td v-else>{{color[ccol.dataIndex]}}</td>
                    </template>
                    <td><button type="button" class="ant-btn"  @click="editColor(color)">编辑颜色码段</button></td>
                    </tr>
                    </thead>
                 </table>
                 <!--码段-->
                 <div class="maduanDiv" v-if="color.wmMaduanList!=null&&color.wmMaduanList!=undefined">

                   <div class="maduanItemDiv">
                   <table class="ant-table-fixed" style="width: 100%;" >
                    <thead class="ant-table-thead"> <tr>
                       <template v-for="(mcol,mi) in maduanColumns">
                         <th>{{mcol.title}}</th>
                       </template>
                       </tr>
                       <template  v-for="(maduan,mindex) in color.wmMaduanList">
                         <tr>
                       <template v-for="(mcol,mi) in maduanColumns">
                         <td>{{maduan[mcol.dataIndex]}}</td>
                       </template>
                       </tr>
                       </template>
                       </thead>
                    </table>
                    </div>

                 </div>


                 </div>
               </template>
              </div>


             </div>
          </template>

        </div>


    <wm-color-modal ref="modalColorForm" @ok="modalColorFormOk" @close="modalColorFormClose"/>

  </a-spin>
</template>

<script>
  import { httpAction, getAction,getFileAccessHttpUrl } from '@/api/manage'
  import { validateDuplicateValue } from '@/utils/util'
  import WmColorModal from './WmColorModal'
  import WmMaduanSubTable from './WmMaduanSubTable'

  export default {
    name: 'WmOrderForm',
    components: {
      WmColorModal,
      WmMaduanSubTable,
    },
    props: {
      //表单禁用
      disabled: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    data () {
      return {
        dataSource:[],
        loading:false,
         maduanColumns: [
                    {
                      title: '码段',
                      dataIndex: 'maduanName',
                      width:"200px",
                      placeholder: '请输入${title}',
                      defaultValue:'',
                    },
                    {
                      title: '码段类型(3选一)',
                      dataIndex: 'maduanType',
                      dictCode:"sys_peibi_type",
                      width:"200px",
                      placeholder: '请输入${title}',
                      defaultValue:'',
                    },
                    {
                      title: '外规长(毫米)',
                      dataIndex: 'waixiangGuigeL',
                      width:"200px",
                      placeholder: '请输入${title}',
                      defaultValue:'',
                    },
                    {
                      title: '外规宽(毫米)',
                      dataIndex: 'waixiangGuigeW',
                      width:"200px",
                      placeholder: '请输入${title}',
                      defaultValue:'',
                    },
                    {
                      title: '外规高(毫米)',
                      dataIndex: 'waixiangGuigeH',
                      width:"200px",
                      placeholder: '请输入${title}',
                      defaultValue:'',
                    },
                    {
                      title: '外箱流水号',
                      dataIndex: 'waixiangliushuihao',
                      width:"200px",
                      placeholder: '请输入${title}',
                      defaultValue:'',
                    },
                    {
                      title: '每箱装箱数',
                      dataIndex: 'zhuangxiangshuliangMeixiang',
                      width:"200px",
                      placeholder: '请输入${title}',
                      defaultValue:'',
                    },
                    {
                      title: '总箱数',
                      dataIndex: 'xiangshuTotal',
                      width:"200px",
                      placeholder: '请输入${title}',
                      defaultValue:'',
                    },
                    {
                      title: '双数或比例',
                      dataIndex: 'shuangshu',
                      width:"200px",
                      placeholder: '请输入${title}',
                      defaultValue:'',
                    },
                    {
                      title: '双数合计',
                      dataIndex: 'shuangshuTotal',
                      width:"200px",
                      placeholder: '请输入${title}',
                      defaultValue:'',
                    },
                    {
                      title: '工厂价格总计',
                      dataIndex: 'gongchangPriceTotal',
                      width:"200px",
                      placeholder: '请输入${title}',
                      defaultValue:'',
                    },
                  ],
         colorColumns: [
                   {
                     title: '鞋颜色',
                     align: 'center',
                     dataIndex: 'colorName',
                   },
                   {
                     title: '产品图片',
                     align: 'center',
                     dataIndex: 'productPic',
                     type: 'imgage',
                   },
                   {
                     title: '工厂单价',
                     align: 'center',
                     dataIndex: 'gongchangPrice',
                   },
                   {
                     title: '工厂单价单位',
                     align: 'center',
                     dataIndex: 'gongchangPriceCurrency_dictText'
                   },
                   {
                     title: '客户单价',
                     align: 'center',
                     dataIndex: 'kehuPrice',
                   },
                   {
                     title: '客户单价单位',
                     align: 'center',
                     dataIndex: 'kehuPriceCurrency_dictText'
                   },
                   {
                     title: '验货',
                     align: 'center',
                     dataIndex: 'yanhuo',
                   },
                   {
                     title: '备注',
                     align: 'center',
                     dataIndex: 'remark',
                   },
                 ],
        huohaoColumns: [
          {
            title:'货号名称',
            align:"center",
            sorter: true,
            dataIndex: 'huohaoName'
          },
          {
            title:'测试样',
            align:"center",
            dataIndex: 'testSample'
          },
          {
            title:'船样',
            align:"center",
            dataIndex: 'shippingSample'
          },
          {
            title:'是否授权品牌',
            align:"center",
            dataIndex: 'isAuthbrand_dictText'
          },
          {
            title:'投产及封样状态',
            align:"center",
            dataIndex: 'fenyangStatus_dictText'
          },
          {
            title:'确认样进度',
            align:"center",
            dataIndex: 'confirmSampleSchedule'
          },
          {
            title:'年份季节',
            align:"center",
            dataIndex: 'yearAndSeason'
          }
        ],
        model:{
         },
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        validatorRules: {
           orderNo: [
              { required: true, message: '请输入订单号!'},
           ],
        },
        url: {
          add: "/order/wmOrder/add",
          //list: "/order/wmOrder/queryHuohaoById",
          list: "/order/wmOrder/getHuohaosColorsMaduansByOrderId",
          edit: "/order/wmOrder/edit",
          queryById: "/order/wmOrder/queryById"
        }
      }
    },
    computed: {
      formDisabled(){
        return this.disabled
      },
    },
    created () {
       //备份model原始值

      this.modelDefault = JSON.parse(JSON.stringify(this.model));

    },
    methods: {
      initHuoHaoList(){
        var params = {orderId:this.model.id};//查询条件
        this.loading = true;
        getAction(this.url.list, params).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records||res.result;
          }
          else{
            this.$message.warning(res.message)
          }
        }).finally(() => {
          this.loading = false
        })
      },
      getImgView(text){
        if(text && text.indexOf(",")>0){
          text = text.substring(0,text.indexOf(","))
        }
        return getFileAccessHttpUrl(text)
      },
      add () {
        this.edit(this.modelDefault);
      },
      edit (record) {
        this.model = Object.assign({}, record);
        this.visible = true;
        if(record.hasOwnProperty("id")){
            this.initHuoHaoList();
        }
      },
      editColor(record){
        this.$refs.modalColorForm.editColor(record);
        this.$refs.modalColorForm.title = "编辑颜色码段";
        this.$refs.modalColorForm.disableSubmit = false;
      },
      addColor(record){
        this.$refs.modalColorForm.add(record);
        this.$refs.modalColorForm.title = "新增颜色码段("+record["huohaoName"]+")";
        this.$refs.modalColorForm.disableSubmit = false;
      },
      modalColorFormOk(data){
        console.log("ok");
        this.initHuoHaoList();
        //console.log(data);
      },
      modalColorFormClose(){
        //console.log("close");
      },
      submitForm () {
        const that = this;
        // 触发表单验证
        this.$refs.form.validate(valid => {
          if (valid) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            httpAction(httpurl,this.model,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
            })
          }

        })
      },
      popupCallback(value,row){
         this.model = Object.assign(this.model, row);
      },
    }
  }
</script>
<style scoped="scoped">
  .huohaoItemDiv{margin: 10px 2px; padding: 5px; border:1px solid #91d5ff; border-radius: 5px;}
  .huohaoItemTitle{background-color: #e6f7ff;padding: 5px;line-height: 50px;font-weight: bold;}
  .huohaoItemDiv th,.huohaoItemDiv td{text-align: center;}
  .colorDiv{width: 96%;margin: 10px auto;}
  .colorItemDiv{    margin: 10px auto;
    border: 1px dashed #ccc;
    padding: 15px 5px;}
</style>