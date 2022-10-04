<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="订单号">
              <a-input placeholder="请输入订单号" v-model="queryParam.orderNo"></a-input>
            </a-form-item>
          </a-col>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <a-form-item label="国家">
              <j-dict-select-tag placeholder="请选择国家" v-model="queryParam.country" dictCode="sys_country"/>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :xl="10" :lg="11" :md="12" :sm="24">
              <a-form-item label="船期（ETD）">
                <j-date placeholder="请选择开始日期" class="query-group-cust" v-model="queryParam.etd_begin"></j-date>
                <span class="query-group-split-cust"></span>
                <j-date placeholder="请选择结束日期" class="query-group-cust" v-model="queryParam.etd_end"></j-date>
              </a-form-item>
            </a-col>
            <a-col :xl="10" :lg="11" :md="12" :sm="24">
              <a-form-item label="工厂货期">
                <j-date placeholder="请选择开始日期" class="query-group-cust" v-model="queryParam.fcd_begin"></j-date>
                <span class="query-group-split-cust"></span>
                <j-date placeholder="请选择结束日期" class="query-group-cust" v-model="queryParam.fcd_end"></j-date>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="大货进度">
                <a-input placeholder="请输入大货进度" v-model="queryParam.dahuojindu"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="港口">
                <j-dict-select-tag placeholder="请选择港口" v-model="queryParam.port" dictCode="sys_port"/>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="创建者">
                <a-input placeholder="请输入创建者" v-model="queryParam.createBy"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="10" :lg="11" :md="12" :sm="24">
              <a-form-item label="创建时间">
                <j-date :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择开始时间" class="query-group-cust" v-model="queryParam.createTime_begin"></j-date>
                <span class="query-group-split-cust"></span>
                <j-date :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择结束时间" class="query-group-cust" v-model="queryParam.createTime_end"></j-date>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="更新者">
                <a-input placeholder="请输入更新者" v-model="queryParam.updateBy"></a-input>
              </a-form-item>
            </a-col>
            <a-col :xl="10" :lg="11" :md="12" :sm="24">
              <a-form-item label="更新时间">
                <j-date :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择开始时间" class="query-group-cust" v-model="queryParam.updateTime_begin"></j-date>
                <span class="query-group-split-cust"></span>
                <j-date :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择结束时间" class="query-group-cust" v-model="queryParam.updateTime_end"></j-date>
              </a-form-item>
            </a-col>
            <a-col :xl="6" :lg="7" :md="8" :sm="24">
              <a-form-item label="备注">
                <a-input placeholder="请输入备注" v-model="queryParam.remark"></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :xl="6" :lg="7" :md="8" :sm="24">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('订单表')">导出</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('订单表',url.exportOrdersHuohaosColorsMaduansXlsUrl)">导出订单完整信息</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <!-- 高级查询区域 -->
      <j-super-query :fieldList="superFieldList" ref="superQueryModal" @handleSuperQuery="handleSuperQuery"></j-super-query>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        :scroll="{x:true}"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        class="j-table-force-nowrap"
        @change="handleTableChange">

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text,record">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
          <img v-else :src="getImgView(text)" :preview="record.id" height="25px" alt="" style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="downloadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleDetail(record)">详情</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>

    <wm-order-modal ref="modalForm" @ok="modalFormOk"></wm-order-modal>
  </a-card>
</template>

<script>

  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import WmOrderModal from './modules/WmOrderModal'
  import {filterMultiDictText} from '@/components/dict/JDictSelectUtil'

  export default {
    name: 'WmOrderList',
    mixins:[JeecgListMixin, mixinDevice],
    components: {
      WmOrderModal
    },
    data () {
      return {
        description: '订单表管理页面',
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          {
            title:'订单号',
            align:"center",
            sorter: true,
            dataIndex: 'orderNo'
          },
          // {
          //   title:'货号',
          //   align:"center",
          //   dataIndex: 'huohaoId'
          // },
          {
            title:'货号名称',
            align:"center",
            sorter: true,
            dataIndex: 'huohaoName'
          },
          {
            title:'国家',
            align:"center",
            sorter: true,
            dataIndex: 'country_dictText'
          },
          {
            title:'船期（ETD）',
            align:"center",
            sorter: true,
            dataIndex: 'etd',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            }
          },
          {
            title:'工厂货期',
            align:"center",
            sorter: true,
            dataIndex: 'fcd',
            customRender:function (text) {
              return !text?"":(text.length>10?text.substr(0,10):text)
            }
          },
          {
            title:'大货进度',
            align:"center",
            sorter: true,
            dataIndex: 'dahuojindu'
          },
          {
            title:'港口',
            align:"center",
            sorter: true,
            dataIndex: 'port_dictText'
          },
          {
            title:'总箱数',
            align:"center",
            sorter: true,
            dataIndex: 'cartonTotal'
          },
          {
            title:'创建者',
            align:"center",
            sorter: true,
            dataIndex: 'createBy'
          },
          {
            title:'创建时间',
            align:"center",
            sorter: true,
            dataIndex: 'createTime'
          },
          {
            title:'更新者',
            align:"center",
            sorter: true,
            dataIndex: 'updateBy'
          },
          {
            title:'更新时间',
            align:"center",
            dataIndex: 'updateTime'
          },
          {
            title:'备注',
            align:"center",
            dataIndex: 'remark'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed:"right",
            width:147,
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/order/wmOrder/list",
          delete: "/order/wmOrder/delete",
          deleteBatch: "/order/wmOrder/deleteBatch",
          exportXlsUrl: "/order/wmOrder/exportXls",
          importExcelUrl: "order/wmOrder/importExcel",
          exportOrdersHuohaosColorsMaduansXlsUrl:"/order/wmOrder/exportOrdersHuohaosColorsMaduansXls",
          
        },
        dictOptions:{},
        superFieldList:[],
      }
    },
    created() {
    this.getSuperFieldList();
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      },
    },
    methods: {
      // loadData(arg) {
      //   debugger
      //   if(!this.url.list){
      //     this.$message.error("请设置url.list属性!")
      //     return
      //   }
      //   if (arg === 1) {
      //     this.ipagination.current = 1;
      //   }
      //   var params = this.getQueryParams();//查询条件
      //   this.loading = true;
      //   getAction(this.url.list, params).then((res) => {
      //     if (res.success) {
      //       this.dataSource = res.result.records||res.result;
      //       console.log(this.dataSource)
      //       if(res.result.total)
      //       {
      //         this.ipagination.total = res.result.total;
      //       }else{
      //         this.ipagination.total = 0;
      //       }
      //     }else{
      //       this.$message.warning(res.message)
      //     }
      //   }).finally(() => {
      //     this.loading = false
      //   })
      // },
      addBeforeExportXls(){
        //console.log("before xls...");
         if(this.selectedRowKeys.length<1){
           this.$message.warning("至少要选一条记录导出...")
           	      return
         }
        
      },
      initDictConfig(){
      },
      getSuperFieldList(){
        let fieldList=[];
        fieldList.push({type:'string',value:'orderNo',text:'订单号',dictCode:''})
        fieldList.push({type:'popup',value:'huohaoId',text:'货号', popup:{code:'s_huohao',field:'id',orgFields:'id',destFields:'huohao_id'}})
        fieldList.push({type:'string',value:'huohaoName',text:'货号名称',dictCode:''})
        fieldList.push({type:'string',value:'country',text:'国家',dictCode:'sys_country'})
        fieldList.push({type:'date',value:'etd',text:'船期（ETD）'})
        fieldList.push({type:'date',value:'fcd',text:'工厂货期'})
        fieldList.push({type:'string',value:'dahuojindu',text:'大货进度',dictCode:''})
        fieldList.push({type:'string',value:'port',text:'港口',dictCode:'sys_port'})
        fieldList.push({type:'int',value:'cartonTotal',text:'总箱数',dictCode:''})
        fieldList.push({type:'string',value:'createBy',text:'创建者',dictCode:''})
        fieldList.push({type:'datetime',value:'createTime',text:'创建时间'})
        fieldList.push({type:'string',value:'updateBy',text:'更新者',dictCode:''})
        fieldList.push({type:'datetime',value:'updateTime',text:'更新时间'})
        fieldList.push({type:'string',value:'remark',text:'备注',dictCode:''})
        this.superFieldList = fieldList
      }
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less';
</style>