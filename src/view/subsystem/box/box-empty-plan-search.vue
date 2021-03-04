<!-- 日 需求 查询 -->

<template>
  <div slot="content">
    <Card :dis-hover="true">
      <p slot="title">查询</p>
      <box-empty-plan-search-form ref="searchForm" @handleFormSubmit="doHandleSearch"/>
    </Card>
    <table-paging :columns="columns" :data="list" :distance="distance" @selectChange="selectChange" @changePageNum="changePageNum" @changePageSize="changePageSize"></table-paging>
  </div>
</template>
<script>
import {
  planEmptyCase
} from '@/api/box.data'
import TablePaging from '@/components/table-paging/table-paging'
import BoxEmptyPlanSearchForm from './box-empty-plan-search-form'
import {getWayBillList} from "@/api/business.data";
export default {
  components: {
    BoxEmptyPlanSearchForm,
    TablePaging
  },
  data () {
    return {
      distance: '462px',
      carTypeMap: { 1: '整车', 2: '集装箱', 3: '零担', 4: '其他' },
      stateMap: { 400: '客户原因', 41: '不可抗因素' },
      list: [],
      columns: [

        { key: '', title: '操作', width: 60, fixed: 'left', render: (h, params) => { return h('div', [ h('Button', { props: { size: 'small', disabled: true } }, '提箱录入') ]) } },
        { key: 'reservaNo', title: '预定号', width: 90, fixed: 'left' },
        { key: '', title: '所属企业', width: 90, fixed: 'left' },
        { key: 'caseDate', title: '提醒日期', width: 90, fixed: 'left' },
        { key: '', title: '预定箱数', width: 90, fixed: 'left' },
        { key: '', title: '配箱数', width: 90, fixed: 'left' },
        { key: '', title: '已提箱数', width: 90, fixed: 'left' },
        { key: '', title: '已提运单箱数', width: 140, fixed: 'left' },
        { key: '', title: '箱型', width: 90, fixed: 'left' },
        { key: '', title: '提箱站', width: 90, fixed: 'left' },
        { key: '', title: '已提箱数', width: 90, fixed: 'left' },
        { key: 'station', title: '发站', width: 90 },
        { key: 'sCarLoadAddr', title: '装车地点', width: 90 },
        { key: 'astation', title: '到站', width: 90 },
        { key: 'aCarDownAddr', title: '卸车地点', width: 90 },
        { key: 'sname', title: '托运人', width: 90 },
        { key: 'aname', title: '收货人', width: 90 },


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
      //let params = { UUID, compyID, ...search, ...this.pagination }
      let params = { ...search, ...this.pagination }
      planEmptyCase(params).then(res => {
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
