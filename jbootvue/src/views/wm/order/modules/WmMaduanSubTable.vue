<template>
  <a-table
    rowKey="id"
    size="middle"
    bordered
    :loading="loading"
    :columns="columns"
    :dataSource="dataSource"
    :pagination="false"
  >

    <template slot="htmlSlot" slot-scope="text">
      <div v-html="text"></div>
    </template>

    <template slot="imgSlot" slot-scope="text,record">
      <div style="font-size: 12px;font-style: italic;">
        <span v-if="!text">无图片</span>
        <img v-else :src="getImgView(text)" :preview="record.id" alt="" style="max-width:80px;height:25px;"/>
      </div>
    </template>

    <template slot="fileSlot" slot-scope="text">
      <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
      <a-button
              v-else
              ghost
              type="primary"
              icon="download"
              size="small"
              @click="downloadFile(text)"
      >
        <span>下载</span>
      </a-button>
    </template>

  </a-table>
</template>

<script>
  import { getAction } from '@api/manage'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'

  export default {
    name: 'WmMaduanSubTable',
    mixins: [JeecgListMixin],
    props: {
      record: {
        type: Object,
        default: null,
      }
    },
    data() {
      return {
        description: '码段内嵌列表',
        disableMixinCreated: true,
        loading: false,
        dataSource: [],
        columns: [
          {
            title: '颜色id',
            align: 'center',
            dataIndex: 'orderHuohaoColorId',
          },
          {
            title: '码段',
            align: 'center',
            dataIndex: 'maduanName',
          },
          {
            title: '码段类型(3选一)',
            align: 'center',
            dataIndex: 'maduanType_dictText'
          },
          {
            title: '外规长(毫米)',
            align: 'center',
            dataIndex: 'waixiangGuigeL',
          },
          {
            title: '外规宽(毫米)',
            align: 'center',
            dataIndex: 'waixiangGuigeW',
          },
          {
            title: '外规高(毫米)',
            align: 'center',
            dataIndex: 'waixiangGuigeH',
          },
          {
            title: '外箱流水号',
            align: 'center',
            dataIndex: 'waixiangliushuihao',
          },
          {
            title: '每箱装箱数',
            align: 'center',
            dataIndex: 'zhuangxiangshuliangMeixiang',
          },
          {
            title: '总箱数',
            align: 'center',
            dataIndex: 'xiangshuTotal',
          },
          {
            title: '双数或比例',
            align: 'center',
            dataIndex: 'shuangshu',
          },
          {
            title: '双数合计',
            align: 'center',
            dataIndex: 'shuangshuTotal',
          },
          {
            title: '工厂价格总计',
            align: 'center',
            dataIndex: 'gongchangPriceTotal',
          },
        ],
        url: {
          listByMainId: '/order/wmColor/queryWmMaduanByMainId',
        },
      }
    },
    watch: {
      record: {
        immediate: true,
        handler() {
          if (this.record != null) {
            this.loadData(this.record)
          }
        }
      }
    },
    methods: {

      loadData(record) {
        this.loading = true
        this.dataSource = []
        getAction(this.url.listByMainId, {
          id: record.id
        }).then((res) => {
          if (res.success) {
            this.dataSource = res.result.records
          }
        }).finally(() => {
          this.loading = false
        })
      },

    },
  }
</script>

<style scoped>

</style>
