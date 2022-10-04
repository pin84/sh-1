<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    switchFullscreen
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form-model ref="form" :model="model" :rules="validatorRules">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="包装辅料外键" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="baozhuangfuliaoId">
              <a-input v-model="model.baozhuangfuliaoId"placeholder="请输入包装辅料外键" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="辅料标签Code" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="tagCode">
              <a-input v-model="model.tagCode"placeholder="请输入辅料标签Code" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="图片" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="pic">
              <j-image-upload isMultiple  v-model="model.pic"></j-image-upload>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="描述说明" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="baozhuangDesc">
              <a-textarea v-model="model.baozhuangDesc" rows="4" placeholder="请输入描述说明" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="是否指定供应商" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="isSpecifiedSupplier">
              <j-switch v-model="model.isSpecifiedSupplier" ></j-switch>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="供应商地址信息" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="supplierAddress">
              <a-textarea v-model="model.supplierAddress" rows="4" placeholder="请输入供应商地址信息" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-spin>
  </j-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import { validateDuplicateValue } from '@/utils/util'

  export default {
    name: "WmBaozhuangfuliaoDetailModal",
    components: {
    },
    props:{
      mainId:{
        type:String,
        required:false,
        default:''
      }
    },
    data () {
      return {
        title:"操作",
        width:800,
        visible: false,
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
           baozhuangfuliaoId: [
              { required: true, message: '请输入包装辅料外键!'},
           ],
           tagCode: [
              { required: true, message: '请输入辅料标签Code!'},
           ],
        },
        url: {
          add: "/baozhuang/wmBaozhuangfuliao/addWmBaozhuangfuliaoDetail",
          edit: "/baozhuang/wmBaozhuangfuliao/editWmBaozhuangfuliaoDetail",
        }

      }
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
      close () {
        this.$emit('close');
        this.visible = false;
        this.$refs.form.clearValidate();
      },
      handleOk () {
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
            this.model['baozhuangfuliaoId'] = this.mainId
            httpAction(httpurl,this.model,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })
          }else{
             return false
          }
        })
      },
      handleCancel () {
        this.close()
      },


    }
  }
</script>
