<template>
  <j-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :maskClosable="false"
    switchFullscreen
    @ok="handleOk"
    :okButtonProps="{ class:{'jee-hidden': disableSubmit} }"
    @cancel="handleCancel">
    <wm-color-form ref="realColorForm" @ok="submitCallback" :disabled="disableSubmit"/>
  </j-modal>
</template>

<script>
  import WmColorForm from './WmColorForm'
  export default {
    name: 'WmColorModal',
    components: {
      WmColorForm
    },
    data() {
      return {
        title:'',
        visible: false,
        disableSubmit: false
      }
    },
    methods:{
      add (record) {
        this.visible=true;
        this.$nextTick(()=>{
          this.$refs.realColorForm.add();
          this.$refs.realColorForm.setupOrderHuohaoId(record.orderHuohaoId);
        })
      },
      editColor (record) {
        this.visible=true
        this.$nextTick(()=>{
          this.$refs.realColorForm.edit(record);
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        this.$refs.realColorForm.handleOk();
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

<style scoped>
</style>