<template>
   <a-spin :spinning="confirmLoading">
     <j-form-container :disabled="formDisabled">
       <!-- 主表单区域 -->
       <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
         <a-row>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="鞋颜色" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="colorName">
              <a-input v-model="model.colorName" placeholder="请输入鞋颜色" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="产品图片" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="productPic">
              <j-image-upload isMultiple  v-model="model.productPic" ></j-image-upload>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="码段配比" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="maduanpeibi">
              <j-popup
                v-model="model.maduanpeibi"
                field="maduanpeibi"
                org-fields="id"
                dest-fields="maduanpeibi"
                code="s_maduanpeibi"
                :multi="true"
                @input="popupCallback"
                />
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="工厂单价" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="gongchangPrice">
              <a-input-number v-model="model.gongchangPrice" placeholder="请输入工厂单价" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="工厂单价单位" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="gongchangPriceCurrency">
              <j-dict-select-tag type="list" v-model="model.gongchangPriceCurrency"  dictCode="sys_currency" placeholder="请选择工厂单价单位" />
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="客户单价" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="kehuPrice">
              <a-input-number v-model="model.kehuPrice" placeholder="请输入客户单价" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="客户单价单位" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="kehuPriceCurrency">
              <j-dict-select-tag type="list" v-model="model.kehuPriceCurrency"  dictCode="sys_currency" placeholder="请选择客户单价单位" />
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="验货" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="yanhuo">
              <a-input v-model="model.yanhuo" placeholder="请输入验货" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :xs="24" :sm="12">
            <a-form-model-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="remark">
              <a-input v-model="model.remark" placeholder="请输入备注" ></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
     </j-form-container>
      <!-- 子表单区域 -->
      <a-tabs v-model="activeKey" @change="handleChangeTabs">
        <a-tab-pane tab="码段" :key="refKeys[0]" :forceRender="true">
          <j-editable-table
            :ref="refKeys[0]"
            :loading="wmMaduanTable.loading"
            :columns="wmMaduanTable.columns"
            :dataSource="wmMaduanTable.dataSource"
            :maxHeight="300"
            :disabled="formDisabled"
            :rowNumber="true"
            :rowSelection="true"
            :actionButton="true"/>
        </a-tab-pane>
      </a-tabs>
    </a-spin>
</template>

<script>
  import {getAction } from '@/api/manage'
  import { FormTypes,getRefPromise,VALIDATE_NO_PASSED } from '@/utils/JEditableTableUtil'
  import { JEditableTableModelMixin } from '@/mixins/JEditableTableModelMixin'
  import { validateDuplicateValue } from '@/utils/util'

  export default {
    name: 'WmColorForm',
    mixins: [JEditableTableModelMixin],
    components: {
    },
    data() {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        model:{
        },
        validatorRules: {
           colorName: [
              { required: true, message: '请输入鞋颜色!'},
           ],
           productPic: [
              { required: true, message: '请输入产品图片!'},
           ],
           maduanpeibi: [
              { required: true, message: '请输入码段配比!'},
           ],
           gongchangPrice: [
              { required: true, message: '请输入工厂单价!'},
           ],
           gongchangPriceCurrency: [
              { required: true, message: '请输入工厂单价单位!'},
           ],
           kehuPrice: [
              { required: true, message: '请输入客户单价!'},
           ],
        },
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        refKeys: ['wmMaduan', ],
        tableKeys:['wmMaduan', ],
        activeKey: 'wmMaduan',
        // 码段
        wmMaduanTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '码段',
              key: 'maduanName',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '码段类型(3选一)',
              key: 'maduanType',
              type: FormTypes.select,
              dictCode:"sys_peibi_type",
              width:"200px",
              placeholder: '请输入${title}',
              disabled:true,
              defaultValue:'',
            },
            {
              title: '外规长(毫米)',
              key: 'waixiangGuigeL',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '外规宽(毫米)',
              key: 'waixiangGuigeW',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '外规高(毫米)',
              key: 'waixiangGuigeH',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '外箱流水号',
              key: 'waixiangliushuihao',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '每箱装箱数',
              key: 'zhuangxiangshuliangMeixiang',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '总箱数',
              key: 'action',
              type: FormTypes.slot,
              slotName: 'action',
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:''
            },
            {
              title: '双数或比例',
              key: 'shuangshu',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '双数合计',
              key: 'shuangshuTotal',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '工厂价格总计',
              key: 'gongchangPriceTotal',
              type: FormTypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
          ]
        },
        url: {
          add: "/order/wmColor/add",
          edit: "/order/wmColor/edit",
          wmMaduan: {
            list: '/order/wmColor/queryWmMaduanByMainId',
            queryByIdList:'/basedata/wmMaduanPeibiSetting/queryByIdList',
          },
        }
      }
    },
    props: {
      //表单禁用
      disabled: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    computed: {
      formDisabled(){
        return this.disabled
      },
    },
    created () {
    },
    methods: {
     addBefore(){
            this.wmMaduanTable.dataSource=[]
      },
      getAllTable() {
        let values = this.tableKeys.map(key => getRefPromise(this, key))
        return Promise.all(values)
      },
      setupOrderHuohaoId(orderHuohaoId){
        this.model.orderHuohaoId=orderHuohaoId;
        console.log(this.model);
      },
      /** 调用完edit()方法之后会自动调用此方法 */
      editAfter() {
        this.$nextTick(() => {
        })
        // 加载子表数据
        if (this.model.id) {
          let params = { id: this.model.id }
          this.requestSubTableData(this.url.wmMaduan.list, params, this.wmMaduanTable)
        }
      },
      //校验所有一对一子表表单
    validateSubForm(allValues){
        return new Promise((resolve,reject)=>{
          Promise.all([
          ]).then(() => {
            resolve(allValues)
          }).catch(e => {
            if (e.error === VALIDATE_NO_PASSED) {
              // 如果有未通过表单验证的子表，就自动跳转到它所在的tab
              this.activeKey = e.index == null ? this.activeKey : this.refKeys[e.index]
            } else {
              console.error(e)
            }
          })
        })
    },
      /** 整理成formData */
      classifyIntoFormData(allValues) {
        let main = Object.assign(this.model, allValues.formValue)

        return {
          ...main, // 展开
          wmMaduanList: allValues.tablesValue[0].values,
        }
      },
      validateError(msg){
        this.$message.error(msg)
      },
     close() {
        this.visible = false
        this.$emit('close')
        this.$refs.form.clearValidate();
      },
     popupCallback(value,row){
        this.model = Object.assign(this.model, row);
        //通过id来找到对应
        if(value){
            let that = this;
            getAction(that.url.wmMaduan.queryByIdList, {ids:value}).then((res) => {
                if (res.success) {
                    let dataList = res.result;
                    dataList.forEach(function (item, index) {
                        //配比类型
                        let peibiType = item.peibiType;
                        //码段(逗号分割)
                        let maduanDesc = item.maduanDesc;
                        //比列
                        let peibiRate = item.peibiRate
                        //单码
                        if(peibiType=='dm' && (maduanDesc.indexOf(",") !=-1 || maduanDesc.indexOf("，") !=-1))
                        {
                            let sizList=[]
                            if(maduanDesc.indexOf(",") !=-1){
                                sizList = maduanDesc.split(",");
                            }else if(maduanDesc.indexOf("，") !=-1){
                                sizList = maduanDesc.split("，");
                            }else{
                                sizList.push(maduanDesc);
                            }
                            sizList.forEach(function(item,index){
                                let item_={}
                                item_['maduanName'] = item;
                                item_['maduanType'] = peibiType;
                                item_['waixiangGuigeL'] = '';
                                item_['waixiangGuigeW'] = '';
                                item_['waixiangGuigeH'] = '';
                                item_['waixiangliushuihao'] = '';
                                item_['zhuangxiangshuliangMeixiang'] = '';
                                item_['xiangshuTotal'] = '';
                                item_['shuangshu'] = '';
                                item_['shuangshuTotal'] = '';
                                item_['gongchangPriceTotal'] = '';
                                that.wmMaduanTable.dataSource.push(item_)
                            })
                        }
                        //混码
                        else if(peibiType=='hm'){
                            let item_={}
                            let blList = []
                            if(peibiRate.indexOf(":") !=-1){
                                blList = peibiRate.split(":")
                            }else if(peibiRate.indexOf("：") !=-1){
                                blList = peibiRate.split("：")
                            }
                            let total = 0;
                            blList.forEach(function(item,index){
                                total += Number(item);
                            })
                            item_['maduanName'] = maduanDesc;
                            item_['maduanType'] = peibiType;
                            item_['waixiangGuigeL'] = '';
                            item_['waixiangGuigeW'] = '';
                            item_['waixiangGuigeH'] = '';
                            item_['waixiangliushuihao'] = '';
                            item_['zhuangxiangshuliangMeixiang'] = total;
                            item_['xiangshuTotal'] = '';
                            item_['shuangshu'] = peibiRate;
                            item_['shuangshuTotal'] = '';
                            item_['gongchangPriceTotal'] = '';
                            that.wmMaduanTable.dataSource.push(item_)
                        }
                        //单码混装
                        else if(peibiType=='hz'){

                        }
                    });
                }
                else{
                    this.$message.warning(res.message)
                }
            }).finally(() => {
                this.loading = false
            })
        }
     },

    }
  }
</script>

<style scoped>
</style>