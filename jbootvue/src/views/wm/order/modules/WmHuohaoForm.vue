<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="货号名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="huohaoName">
              <a-input v-model="model.huohaoName" placeholder="请输入货号名称"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="测试样" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="testSample">
              <a-input v-model="model.testSample" placeholder="请输入测试样"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="船样" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="shippingSample">
              <a-input v-model="model.shippingSample" placeholder="请输入船样"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="是否授权品牌" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="isAuthbrand">
              <j-dict-select-tag type="list" v-model="model.isAuthbrand" dictCode="sys_yesno" placeholder="请选择是否授权品牌" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="投产及封样状态" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="fenyangStatus">
              <j-dict-select-tag type="list" v-model="model.fenyangStatus" dictCode="sys_yesno" placeholder="请选择投产及封样状态" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="确认样进度" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="confirmSampleSchedule">
              <a-input v-model="model.confirmSampleSchedule" placeholder="请输入确认样进度"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="年份季节" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="yearAndSeason">
              <a-input v-model="model.yearAndSeason" placeholder="请输入年份季节"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="remark">
              <a-textarea v-model="model.remark" rows="4" placeholder="请输入备注" />
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
    name: 'WmHuohaoForm',
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
           huohaoName: [
              { required: true, message: '请输入货号名称!'},
           ],
        },
        url: {
          add: "/order/wmHuohao/add",
          edit: "/order/wmHuohao/edit",
          queryById: "/order/wmHuohao/queryById"
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