<!-- 运单受理 查询 -->

<template>
  <div slot="content">
    <Card :dis-hover="true">
      <p slot="title">查询</p>
      <ticket-notice-form ref="searchForm" @handleFormSubmit="doHandleSearch" @handleNotice="doHandleNotice"/>
    </Card>
    <Table size="small" stripe :columns="columns" :data="list" @on-selection-change="selectChange"></Table>
  </div>
</template>
<script>
import {
  getNoticCarList,
  noticCar
} from '@/api/freight.data'
import TablePaging from '@/components/table-paging/table-paging'
import TicketNoticeForm from './ticket-notice-form'
export default {
  components: {
    TicketNoticeForm,
    TablePaging
  },
  data () {
    return {
      distance: '462px',
      stateModel: false,
      multItem: [],
      noticeCarMap: { 0: '未通知', 1: '已通知' },
      writeBackMap: { 0: '未回写', 1: '已回写' },
      carTypeMap: { 1: '整车', 2: '集装箱', 3: '零担', 4: '其他' },
      list: [],
      item: {},
      columns: [
        {
          type: 'selection', width: 60, align: 'center'
        },
        { key: 'needNo', title: '需求号', width: 80 },
        { key: 'carType', title: '车种', width: 90, render: (h, params) => { let carType = params.row.carType; return h('div', this.admitCarStateMap[carType]) } },
        { key: 'carCard', title: '车号', width: 160 },
        { key: 'loadDate', title: '装车日期', width: 90 },
        { key: 'station', title: '发站', width: 120 },
        { key: 'astation', title: '到站', width: 120 },
        { key: 'gname', title: '货物名称', width: 180 },
        { key: 'noticeCar', title: '取车标志状态', width: 120, render: (h, params) => { let noticeCar = params.row.noticeCar; return h('div', this.noticeCarMap[noticeCar]) } },
        { key: 'writeBack', title: '现车回写状态', width: 120, render: (h, params) => { let writeBack = params.row.writeBack; return h('div', this.writeBackMap[writeBack]) } },
        { key: 'billNum', title: '票据张数', width: 90 }
      ]
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
      getNoticCarList(params).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          this.list = data || []
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    selectChange (value) {
      this.multItem = value
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
    doHandleNotice () {
      const ids = this.getBatchIds()
      if (!ids) {
        return
      }
      const wbIDs = ids.join(',')
      noticCar({ wbIDs }).then(res => {
        this.resultHandler(res)
      })
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
