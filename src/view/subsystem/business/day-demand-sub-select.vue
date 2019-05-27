<!-- 日 需求预定 查询 -->

<template>
  <div slot="content">
    <Card :dis-hover="true">
      <p slot="title">查询</p>
      <day-demand-sub-search-form ref="searchForm" @handleFormSubmit="doHandleSearch"/>
    </Card>
    <table-paging :columns="columns" :data="list" @selectChange="selectChange" @changePageNum="changePageNum" @changePageSize="changePageSize" :pagination="pagination"></table-paging>
  </div>
</template>
<script>
import {
  getWayBillList
} from '@/api/business.data'
import TablePaging from '@/components/table-paging/table-paging'
import DayDemandSubSearchForm from './day-demand-sub-select-form'
export default {
  components: {
    DayDemandSubSearchForm,
    TablePaging
  },
  data () {
    return {
      distance: '462px',
      carTypeMap: { 1: '整车', 2: '集装箱', 3: '零担', 4: '其他' },
      stateMap: { 400: '客户原因', 41: '不可抗因素' },
      list: [],
      columns: [
        { key: '', title: '批量修改订单信息', width: 90 },
        { key: 'resDate', title: '预定日期', width: 90, fixed: 'left' },
        { key: 'reservaNo', title: '订车号', width: 160, fixed: 'left' },
        { key: 'acceptNo', title: '受理号', width: 90, fixed: 'left' },
        { key: 'station', title: '发站', width: 90, fixed: 'left' },
        { key: 'astation', title: '到站', width: 90, fixed: 'left' },
        { key: 'aoffic', title: '到局', width: 90, fixed: 'left' },
        { key: 'gname', title: '货物名称', width: 160 },
        { key: 'tunnage', title: '货物描述', width: 90 },
        { key: 'carType', title: '车种', width: 90, combine: true, render: (h, params) => { let carType = params.row.carType; return h('div', this.carTypeMap[carType]) } },
        { key: 'carNum', title: '订车数', width: 90 },
        { key: 'carNum', title: '批车数', width: 90 },
        { key: 'carNum', title: '完车数', width: 90 },
        { key: 'tunnage', title: '需求吨数', width: 90 },
        { key: '', title: '总体积数', width: 90 },
        { key: 'sname', title: '托运人', width: 90 },
        { key: 'aname', title: '收货人', width: 90 },
        { key: 'ctime', title: '提交日期', width: 90 },
        { key: 'sname', title: '提交企业', width: 90 },
        { key: '', title: '物流', width: 90, render: (h, params) => { return h('div', [ h('Button', { props: { size: 'small', disabled: true } }, '查看物流') ]) } },
        { key: 'state', title: '退订信息', width: 90, render: (h, params) => { let state = params.row.state; return h('div', this.stateMap[state]) } },
        { key: '', title: '运单', width: 90 },
        { key: '', title: '领货凭证', width: 90, render: (h, params) => { return h('div', [ h('Button', { props: { size: 'small', disabled: true } }, '查看凭证') ]) } },
        { key: '', title: '单据性质', width: 90 }
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
      // console.log(search)
      const UUID = this.getUserId
      const compyID = this.getCompyId
      let params = { UUID, compyID, ...search, ...this.pagination }
      getWayBillList(params).then(res => {
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
    }
  }
}
</script>
