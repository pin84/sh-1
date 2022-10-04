<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="码段配比名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="maduanPeibiName">
              <a-input v-model="model.maduanPeibiName" placeholder="请输入码段配比名称"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="配比类型" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="peibiType">
              <j-dict-select-tag type="list" v-model="model.peibiType" dictCode="sys_peibi_type" placeholder="请选择配比类型" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="码段(逗号分割)" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="maduanDesc">
              <a-input v-model="model.maduanDesc" placeholder="请输入码段(逗号分割)"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="比例" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="peibiRate">
              <a-input v-model="model.peibiRate" placeholder="请输入比例"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="remark">
              <a-input v-model="model.remark" placeholder="请输入备注"  ></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </j-form-container>
  </a-spin>
</template>

<script>

  import { httpAction, getAction } from '@/api/manage'
  import { validateDuplicateValue } from '@/utils/util'

  export default {
    name: 'WmMaduanPeibiForm',
    components: {
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
           maduanPeibiName: [
              { required: true, message: '请输入码段配比名称!'},
           ],
           peibiType: [
              { required: true, message: '请输入配比类型!'},
           ],
           maduanDesc: [
              { required: true, message: '请输入码段(逗号分割)!'},
           ],
           peibiRate: [
              { required: true, message: '请输入比例!'},
           ],
        },
        url: {
          add: "/modules/wmMaduanPeibi/add",
          edit: "/modules/wmMaduanPeibi/edit",
          queryById: "/modules/wmMaduanPeibi/queryById"
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
      add () {
        this.edit(this.modelDefault);
      },
      edit (record) {
        this.model = Object.assign({}, record);
        this.visible = true;
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
    }
  }
</script>