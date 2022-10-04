<template>
  <a-spin :spinning="confirmLoading">
     <a-divider orientation="left">请选择需要的标签</a-divider>
    <template v-for="(tag,key) in baozhuangTags" >
       <a-checkable-tag @change="handleTagChange(tag,key)" :checked="selectedTags.indexOf(key)>-1">
         {{ tag.tagName }}
       </a-checkable-tag>
     </template>
     <a-divider></a-divider>
    <j-form-container :disabled="formDisabled">
      <!-- 主表单区域 -->
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24" >
            <a-form-model-item label="包装名称" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="baozhuangName">
              <a-input v-model="model.baozhuangName" placeholder="请输入包装名称" ></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </j-form-container>
      <!-- 子表单区域 -->
    <a-tabs v-model="activeKey">
      <a-tab-pane tab="包装辅料明细" :key="refKeys[0]" :forceRender="true">
        <j-vxe-table
          keep-source
          :loading="wmBaozhuangfuliaoDetailTable.loading"
          :columns="wmBaozhuangfuliaoDetailTable.columns"
          :dataSource="wmBaozhuangfuliaoDetailTable.dataSource"
          :maxHeight="300"
          :disabled="formDisabled"
          :rowNumber="false"
          :rowSelection="true"
          :rowSelectionType="'radio'"
          :toolbar="false">
          <template v-slot:action="props">
            <a-select style="width: 120px" v-model="props.row.tagCode" disabled="disabled">
              <template v-for="(tag,key) in wmBaozhuangfuliaoDetailTable.dataList" >
                <a-select-option :value="tag.value"> {{ tag.text }}</a-select-option>
              </template>
            </a-select>
          </template>

          <template v-slot:showAction="props">
              <a-textarea v-model:value="props.row.supplierAddress"  v-if="props.row.isSpecifiedSupplier=='N' "  disabled="disabled" />
              <a-textarea v-model:value="props.row.supplierAddress"  v-if="props.row.isSpecifiedSupplier=='Y' "  />
          </template>

          <template v-slot:descAction="props">
            <a-textarea v-model:value="props.row.baozhuangDesc"  />
          </template>
        </j-vxe-table>
      </a-tab-pane>
    </a-tabs>
  </a-spin>
</template>

<script>

  import { httpAction,getAction } from '@/api/manage'
  import { JVxeTableModelMixin } from '@/mixins/JVxeTableModelMixin.js'
  import { JVXETypes } from '@/components/jeecg/JVxeTable'
  import { getRefPromise,VALIDATE_FAILED} from '@/components/jeecg/JVxeTable/utils/vxeUtils.js'
  import JFormContainer from '@/components/jeecg/JFormContainer'

  export default {
    name: 'WmBaozhuangfuliaoForm',
    mixins: [JVxeTableModelMixin],
    components: {
      JFormContainer,
    },
    data() {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 2 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        baozhuangTags:[],
        selectedTags: [],   //1,0,1
        model:{
         },
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
           baozhuangName: [
              { required: true, message: '请输入包装名称!'},
           ],
        },
        refKeys: ['wmBaozhuangfuliaoDetail', ],
        tableKeys:['wmBaozhuangfuliaoDetail', ],
        activeKey: 'wmBaozhuangfuliaoDetail',
        // 包装辅料明细
        wmBaozhuangfuliaoDetailTable: {
          loading: false,
          dataSource: [],
          dataList:[],
          columns: [
            {
              title: '辅料标签名称',
              key: 'action',
              width: '160px',
              type: JVXETypes.slot,
              slotName: 'action'
            },
            {
              title: '图片',
              key: 'pic',
              type: JVXETypes.image,
              token:true,
              responseName:"message",
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '描述说明',
              key: 'descAction',
              type: JVXETypes.slot,
              width:"200px",
              placeholder: '请输入${title}',
              slotName: 'descAction',
              defaultValue:'',
            },
            {
              title: '是否指定供应商',
              key: 'isSpecifiedSupplier',
              type: JVXETypes.checkbox,
              customValue: ['Y', 'N'],
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:''
            },
            {
              title: '供应商地址信息',
              key: 'showAction',
              width: '300px',
              align: 'center',
              type: JVXETypes.slot,
              placeholder: '请输入${title}',
              slotName: 'showAction',
              defaultValue:'',
            }
          ]
        },
        url: {
          add: "/baozhuang/wmBaozhuangfuliao/add",
          edit: "/baozhuang/wmBaozhuangfuliao/edit",
          queryById: "/baozhuang/wmBaozhuangfuliao/queryById",
          getAllBoazhuangTags:"/baozhuang/wmBaozhuangfuliao/getAllBoazhuangTags",
          wmBaozhuangfuliaoDetail: {
            list: '/baozhuang/wmBaozhuangfuliao/queryWmBaozhuangfuliaoDetailByMainId'
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
      this.initBaozhuangTags();
    },
    methods: {
      add () {
        this.edit(this.modelDefault);
      },
      edit (record) {
        this.model = Object.assign({}, record);
        this.visible = true;
        this.getDetailsList(this.model);
      },
      //根据包装辅料的id来查找对应的辅料明细
      getDetailsList(record){
          if(record.hasOwnProperty("id") && record.id){
            let params = { id: record.id }
            this.requestSubTableData(this.url.wmBaozhuangfuliaoDetail.list, params, this.wmBaozhuangfuliaoDetailTable)
          }
      },
      submitForm () {
        const that = this;
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
            //追加列表
            if(this.wmBaozhuangfuliaoDetailTable.dataSource.length>0){
              that.model['wmBaozhuangfuliaoDetailList'] = this.wmBaozhuangfuliaoDetailTable.dataSource;
            }else{
              that.$message.warning("请添加包装辅料明细");
              return;
            }
            httpAction(httpurl,that.model,method).then((res)=>{
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
      handleTagChange(tag,key){
        //必须用push,splice方法是因为只有这样数组才会动态改变页面视图
        if(this.selectedTags.indexOf(key)==-1){
            this.selectedTags.push(key);
            //获取明细列表数据
            let record_ = tag.tagCode;
            let Ishave = false;
            for(let index_=0;index_<this.wmBaozhuangfuliaoDetailTable.dataSource.length;index_++){
              let data = this.wmBaozhuangfuliaoDetailTable.dataSource[index_];
              if(data.tagCode == record_){
                Ishave = true;
                break;
              }
            }
           if(!Ishave){
            let record = {tagCode:tag.tagCode,pic:'',baozhuangDesc:'',isSpecifiedSupplier:'N',supplierAddress:''}
            this.wmBaozhuangfuliaoDetailTable.dataSource.push(record)
           }
        }else{
           const that = this;
           this.$confirm({
             title: tag.tagName+'类型的当前数据将被删除,确定要取消这个标签吗?',
             okText: '确认',
             cancelText: '取消',
             onOk:function(){
               let delIndex = that.selectedTags.indexOf(key);
               that.selectedTags.splice(delIndex,1);
               let record = tag.tagCode;
               for(let index_=0;index_<that.wmBaozhuangfuliaoDetailTable.dataSource.length;index_++){
                 let data = that.wmBaozhuangfuliaoDetailTable.dataSource[index_];
                 if(data.tagCode==record){
                   that.wmBaozhuangfuliaoDetailTable.dataSource.splice(index_,1);
                   break;
                 }
               }
             }
           });
        }
      },
      initBaozhuangTags(){
          let params = {};//查询条件
          this.loading = true;
          const that = this;
          getAction(this.url.getAllBoazhuangTags, params).then((res) => {
            if (res.success) {
              that.baozhuangTags = res.result.records||res.result;
              //包装辅料明细包装列表中标签名称的下拉列表的options
              for(let index_=0;index_<that.baozhuangTags.length;index_++){
                let record = that.baozhuangTags[index_];
                that.wmBaozhuangfuliaoDetailTable.dataList.push({text:record.tagName, value: record.tagCode});
              }
              //编辑的时候渲染标签
              that.selectedTags = []
              that.wmBaozhuangfuliaoDetailTable.dataSource.forEach(function (item, index) {
                that.baozhuangTags.forEach(function (item_, index_){
                  if(item.tagCode==item_.tagCode){
                    that.selectedTags.push(index_);
                  }
                })
              });
              //如果是薪资
              if(!that.model.hasOwnProperty("id")){
                if(that.baozhuangTags.length>0){
                    that.handleTagChange(that.baozhuangTags[0],0);
                }
              }
            }
            else{
              that.$message.warning(res.message)
            }
          }).finally(() => {
            this.loading = false
          })
      },
      addBefore(){
        this.wmBaozhuangfuliaoDetailTable.dataSource=[]
      },
      getAllTable() {
        let values = this.tableKeys.map(key => getRefPromise(this, key))
        return Promise.all(values)
      },
      /** 调用完edit()方法之后会自动调用此方法 */
      editAfter() {
        this.$nextTick(() => {
        })
        // 加载子表数据
        if (this.model.id) {
          let params = { id: this.model.id }
          this.requestSubTableData(this.url.wmBaozhuangfuliaoDetail.list, params, this.wmBaozhuangfuliaoDetailTable)
        }
      },

    }
  }
</script>

<style scoped>
  .ant-tag{padding: 10px 7px;cursor: pointer;
    border: 1px dashed #e7e7e7;}
</style>