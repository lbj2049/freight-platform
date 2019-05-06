<!-- 运单受理 -->

<template>
  <div slot="content">
    <Card :dis-hover="true">
      <p slot="title">查询</p>
      <waybill-accept-form ref="searchForm" @handleFormSubmit="doHandleSearch" @handleFormAuth="doHandleAuth"/>
    </Card>
    <table-paging :columns="columns" :data="list" :distance="distance" @selectChange="selectChange" @changePageNum="changePageNum" @changePageSize="changePageSize" :pagination="pagination"></table-paging>
  </div>
</template>
<script>
import {
  getFWayBillList,
  setPass
} from '@/api/freight.data'
import TablePaging from '@/components/table-paging/table-paging'
import WaybillAcceptForm from './waybill-accept-from'
export default {
  components: {
    WaybillAcceptForm,
    TablePaging
  },
  data () {
    return {
      distance: '462px',
      stateMap: { 1: '待用', 2: '待上报', 3: '待受理', 4: '已通过受理', 41: '未通过受理', 5: '已装车', 6: '已发车', 7: '已到达', 8: '已卸车', 9: '已交付', 10: '待理赔', 11: '已理赔', 12: '已作废', 13: '已制票', 14: '通知进货', 400: '退订' },
      dangerousMarkMap: { 1: '普通货物' },
      programTypeMap: { 1: '定型' },
      list: [],
      columns: [
        { type: 'index', width: 38, align: 'center', fixed: 'left' },
        { type: 'selection', width: 45, align: 'center', fixed: 'left' },
        { key: 'station', title: '到站', width: 90, fixed: 'left' },
        { key: 'gname', title: '品名', width: 160, fixed: 'left' },
        { key: 'sname', title: '押运人', width: 160, fixed: 'left' },
        { key: 'needNo', title: '需求号', width: 160, fixed: 'left' },
        { key: 'loadDate', title: '日期', width: 90 },
        { key: 'supercargo', title: '押运人', width: 90 },
        { key: 'state', title: '运单状态', width: 120, render: (h, params) => { let state = params.row.state; return h('div', this.stateMap[state]) } },
        { key: 'acceptNo', title: '受理审核号', width: 160 },
        { key: 'sCarLoadAddr', title: '装车地点', width: 90 },
        { key: 'dangerousMark', title: '危险品标志', width: 120, render: (h, params) => { let dangerousMark = params.row.dangerousMark; return h('div', this.dangerousMarkMap[dangerousMark]) } },
        { key: 'programType', title: '方案类别', width: 90, render: (h, params) => { let programType = params.row.programType; return h('div', this.programTypeMap[programType]) } },
        { key: 'programID', title: '方案编号', width: 90 },
        { key: 'overrunLevel', title: '超限级别', width: 90 },
        { key: 'overloadLevel', title: '超重级别', width: 90 },
        { key: 'keyGoodsMark', title: '其他重点货物标志', width: 160 },
        { key: 'keyGoodsDes', title: '重点货物描述', width: 120 }
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
      getFWayBillList(params).then(res => {
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
    doHandleAuth () {
      let type = 0
      this.$Modal.confirm({
        title: '审核',
        render: (h) => {
          return h('RadioGroup', {
            props: {
              value: 0
            },
            on: {
              'on-change': (val) => {
                type = val
              }
            },
            style: {
              marginLeft: '120px'
            }
          }, [
            h('Radio', {
              props: {
                label: 0
              }
            }, '通过'),
            h('Radio', {
              props: {
                label: 1
              }
            }, '不通过')]
          )
        },
        onOk: () => {
          this.doSetState(type)
        }
      })
    },
    doSetState (type) {
      const UUID = this.getUserId
      const state = type === 1 ? 41 : 4
      const itemIds = this.getBatchIds()
      setPass({ UUID: UUID, wbIDs: itemIds.join(','), state: state }).then(res => {
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
