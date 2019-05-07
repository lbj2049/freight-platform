<!-- 运单受理 查询 -->

<template>
  <div slot="content">
    <Card :dis-hover="true">
      <p slot="title">查询</p>
      <waybill-print-form ref="searchForm" @handleFormSubmit="doHandleSearch"/>
      <!--<waybill-print-form ref="searchForm" @handleFormSubmit="doHandleSearch" @handleFormPrint="doHandlePrint" @handleFormOut="doHandleOut"/>-->
    </Card>
    <table-paging :columns="columns" :data="list" :distance="distance" @selectChange="selectChange" @changePageNum="changePageNum" @changePageSize="changePageSize" :pagination="pagination"></table-paging>
  </div>
</template>
<script>
import {
  getWayBillList2
} from '@/api/freight.data'
import TablePaging from '@/components/table-paging/table-paging'
import WaybillPrintForm from './waybill-print-form'
export default {
  components: {
    WaybillPrintForm,
    TablePaging
  },
  data () {
    return {
      distance: '462px',
      stateMap: { 1: '待用', 2: '待上报', 3: '待受理', 4: '已通过受理', 41: '未通过受理', 5: '已装车', 6: '已发车', 7: '已到达', 8: '已卸车', 9: '已交付', 10: '待理赔', 11: '已理赔', 12: '已作废', 13: '已制票', 14: '通知进货', 400: '退订' },
      carTypeMap: { 1: '整车', 2: '集装箱', 3: '零担', 4: '其他' },
      endorseStateMap: { 1: '未签认', 2: '已签认' },
      typeMap: { 1: '普通' },
      admitCarStateMap: { 0: '未匹配', 1: '已匹配' },
      list: [],
      columns: [
        { type: 'index', width: 38, align: 'center', fixed: 'left' },
        { type: 'selection', width: 45, align: 'center', fixed: 'left' },
        { key: 'needNo', title: '需求号', width: 160, fixed: 'left' },
        { key: 'transNo', title: '计划运输号', width: 160, fixed: 'left' },
        { key: 'state', title: '状态', width: 120, render: (h, params) => { let state = params.row.state; return h('div', this.stateMap[state]) } },
        { key: 'astation', title: '到站', width: 90, fixed: 'left' },
        { key: 'gname', title: '品名', width: 160, fixed: 'left' },
        { key: 'state', title: '物品清单', width: 90, render: (h, params) => { return h('div', [ h('Button', { props: { disabled: true, size: 'small' } }, '物品清单') ]) } },
        { key: 'sname', title: '发货人', width: 160, fixed: 'left' },
        { key: 'aname', title: '收货人', width: 90 },
        { key: 'carType', title: '运输方式', width: 90, render: (h, params) => { let carType = params.row.carType; return h('div', this.carTypeMap[carType]) } },
        { key: 'loadDate', title: '装车日期', width: 120 },
        { key: 'groupLine', title: '整列/成组', width: 90 },
        { key: 'groupNum', title: '成组车数', width: 160 },
        { key: 'carTypeNum', title: '车型车号', width: 90 },
        { key: 'biaoZhong', title: '标重', width: 90 },
        { key: 'paulinNum', title: '施封/篷布', width: 90 },
        { key: 'caseNum', title: '件数', width: 90 },
        { key: 'tunnage', title: '货重', width: 90 },
        { key: 'acceptDate', title: '受理日期', width: 120 },
        { key: 'endorseState', title: '签从状态', width: 120, render: (h, params) => { let state = params.row.state; return h('div', this.stateMap[state]) } },
        { key: 'type', title: '类型', width: 90 },
        { key: 'dangerousMark', title: '性质', width: 90 },
        { key: 'admitCarState', title: '承认车', width: 90 },
        { key: 'carNum', title: '车数', width: 90 },
        { key: 'groupNo', title: '成组单号', width: 90 }
      ],
      pagination: {
        total: 0,
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  computed: {
    getUserId () {
      return this.$store.state.user.userId
    },
    getCompyId () {
      return this.$store.state.user.compyId
    }
  },
  mounted: function () {
    this.toHandleSearch()
  },
  methods: {
    // 搜索
    toHandleSearch () {
      this.$refs.searchForm.toHandleSearch()
    },
    doHandleSearch (search) {
      const UUID = this.getUserId
      const compyID = this.getCompyId
      let params = { UUID, compyID, ...search, ...this.pagination }
      getWayBillList2(params).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          this.list = data.datas || []
          this.pagination = {
            total: data.total,
            pageSize: data.pageSize,
            pageNum: data.page
          }
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    selectChange (value) {
      this.multItem = value
    },
    // 切换页面
    changePageNum (pageNum) {
      this.pagination.pageNum = pageNum
      this.toHandleSearch()
    },
    // 切换页面size
    changePageSize (pageSize) {
      this.pagination.pageSize = pageSize
      this.toHandleSearch()
    },
    getBatchIds () {
      if (this.multItem && this.multItem.length > 0) {
        const itemIds = []
        this.multItem.forEach((k, v) => {
          itemIds.push(k.wbID)
        })
        return itemIds
      } else {
        this.$Message.error('请选择数据')
      }
    },
    doHandlePrint () {
      console.log('print')
    },
    doHandleOut () {
      console.log('out')
    },
    resultHandler (res) {
      const body = res.data
      const data = body.Data
      if (body.Status === 2000) {
        this.toHandleSearch()
        this.multItem = []
        this.$Message.success(data.Result)
      } else {
        this.$Message.error(data.ErrorDes)
      }
    }
  }
}
</script>
