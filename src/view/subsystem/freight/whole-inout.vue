<!-- 整车货场进出站 -->

<template>
  <div slot="content">
    <Row>
      <Col span="4">
        <Card :dis-hover="true">
          <p slot="title">查询</p>
          <whole-inout-ticket-verify-from ref="searchForm" @handleFormSubmit="doHandleSearch" @handleTicketVerify="handleTicketVerify"/>
        </Card>
      </Col>
      <Col span="12">
        <Card :dis-hover="true">
          <p slot="title">进出货历史查询</p>
          <whole-inout-his-search-from ref="searchHisForm" @handleFormSubmit="doHandleSearch" @handleFormOut="doHandleOut"/>
        </Card>
      </Col>
    </Row>
    <table-paging :columns="columns" :data="list" :border="true" :distance="distance" @selectChange="selectChange" @changePageNum="changePageNum" @changePageSize="changePageSize" :pagination="pagination"></table-paging>
  </div>
</template>
<script>
import {
  inOutStationList
} from '@/api/freight.data'
import TablePaging from '@/components/table-paging/table-paging'
import WholeInoutHisSearchFrom from './whole-inout-his-search-from'
import WholeInoutTicketVerifyFrom from './whole-inout-ticket-verify-from'
export default {
  components: {
    WholeInoutHisSearchFrom,
    WholeInoutTicketVerifyFrom,
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
      receptTypeMap: { 1: '发车', 2: '到站接车' },
      list: [],
      columns: [
        { type: 'index', width: 38, align: 'center', fixed: 'left' },
        { key: 'station', title: '货场', width: 90, fixed: 'left' },
        { key: 'glocation', title: '获取货位名称', width: 160, fixed: 'left' },
        { key: 'yardName', title: '股道', width: 160, fixed: 'left' },
        { key: 'gname', title: '品名', width: 160, fixed: 'left' },
        { key: 'gtype', title: '品类', width: 160 },
        { key: 'tunnage', title: '货物重量', width: 90 },
        { key: 'caseNum', title: '件数', width: 90 },
        { key: 'astation', title: '到站', width: 90 },
        { key: 'transNo', title: '计划运输号', width: 160 },
        { key: 'reserveDate', title: '预约日期', width: 120 },
        { key: 'inoutDate', title: '进/取货完成时间', width: 160 },
        { key: 'userName', title: '登记人', width: 160 },
        { key: 'carType', title: '运输方式', width: 90, render: (h, params) => { let carType = params.row.carType; return h('div', this.carTypeMap[carType]) } },
        { key: 'receptType', title: '签从状态', width: 120, render: (h, params) => { let state = params.row.state; return h('div', this.stateMap[state]) } },
        { key: 'needNo', title: '需求号', width: 160 }
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
    this.toHandleHisSearch()
  },
  methods: {
    // 搜索
    toHandleSearch () {
      this.$refs.searchForm.toHandleSearch()
    },
    toHandleHisSearch () {
      this.$refs.searchHisForm.toHandleSearch()
    },
    doHandleSearch (search) {
      const UUID = this.getUserId
      const compyID = this.getCompyId
      let params = { UUID, compyID, ...search, ...this.pagination }
      inOutStationList(params).then(res => {
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
    doHandleOut () {
      console.log('out')
    },
    handleAuth () {
      console.log('handleAuth')
    },
    handleTicketVerify () {
      console.log('handleTicketVerify')
    }
  }
}
</script>
