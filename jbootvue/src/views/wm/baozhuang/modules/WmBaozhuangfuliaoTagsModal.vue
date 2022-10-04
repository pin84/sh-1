<template>
  <j-modal
    :title="title"
    :width="width"
    :visible="visible"
    switchFullscreen
    @ok="handleOk"
    :okButtonProps="{ class:{'jee-hidden': disableSubmit} }"
    @cancel="handleCancel"
    cancelText="关闭">
    <wm-baozhuangfuliao-tags-form ref="realForm" @ok="submitCallback" :disabled="disableSubmit"></wm-baozhuangfuliao-tags-form>
  </j-modal>
</template>

<script>

  import WmBaozhuangfuliaoTagsForm from './WmBaozhuangfuliaoTagsForm'
  export default {
    name: 'WmBaozhuangfuliaoTagsModal',
    components: {
      WmBaozhuangfuliaoTagsForm
    },
    data () {
      return {
        title:'',
        width:800,
        visible: false,
        disableSubmit: false
      }
    },
    methods: {
      add () {
        this.visible=true
        this.$nextTick(()=>{
          this.$refs.realForm.add();
        })
      },
      edit (record) {
        this.visible=true
        this.$nextTick(()=>{
          this.$refs.realForm.edit(record);
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        this.$refs.realForm.submitForm();
      },
      submitCallback(){
        this.$emit('ok');
        this.visible = false;
      },
      handleCancel () {
        this.close()
      }
    }
  }
</script>