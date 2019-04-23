<!-- 日 需求退订 查询 -->

<template>
  <div slot="content">
    <Card :dis-hover="true">
      <p slot="title">查询</p>
      <form-create ref="fc" v-model="searchApi" :rule="searchRule" :option="searchOption" class="qib-form"></form-create>
    </Card>
    <table-paging :columns="columns" :data="list" @selectChange="selectChange" @changePageNum="changePageNum" @changePageSize="changePageSize" :pagination="pagination"></table-paging>
  </div>
</template>
<script>
import {
  getTDWayBillList
} from '@/api/business.data'
import TablePaging from '@/components/table-paging/table-paging'
import { maker } from 'form-create'

export default {
  components: {
    TablePaging
  },
  data () {
    return {
      searchApi: {},
      searchModel: {},
      // 表单生成规则
      searchRule: [
        maker.date('装车日期', 'loadDate').col({ span: 6, labelWidth: 64 }).props({ size: 'small', type: 'date' }),
        maker.input('订单号', 'roderNo').col({ span: 6, labelWidth: 64 }).props({ size: 'small' }),
        maker.create('i-button')
          .props({ type: 'primary', size: 'small', shape: undefined, long: false, htmlType: 'button', disabled: false, icon: 'ios-upload', loading: false, show: true })
          .col({ span: 2 })
          .on({
            'click': () => {
              this.toHandleSearch()
            }
          })
          .children([ '查询' ])
      ],
      // 组件参数配置
      searchOption: {
        // submitBtn: { innerText: '查询', size: 'small', col: { span: 2 } }
        submitBtn: false

      },
      carTypeMap: { 1: '整车', 2: '集装箱', 3: '零担', 4: '其他' },
      stateMap: { 400: '客户原因', 41: '不可抗因素' },
      list: [],
      columns: [
        { key: 'reservaNo', title: '订单号', width: 160, fixed: 'left' },
        { key: 'loadDate', title: '装运日期', width: 90, fixed: 'left' },
        { key: 'acceptNo', title: '受理号', width: 90, fixed: 'left' },
        { key: 'station', title: '发站', width: 90, fixed: 'left' },
        { key: 'astation', title: '到站', width: 90, fixed: 'left' },
        { key: 'gname', title: '货物名称', width: 160 },
        { key: 'carType', title: '车种', width: 90, render: (h, params) => { let carType = params.row.carType; return h('div', this.carTypeMap[carType]) } },
        { key: 'carNum', title: '车数', width: 90 },
        { key: 'tunnage', title: '吨数', width: 90 },
        { key: 'sname', title: '托运人', width: 90 },
        { key: 'aname', title: '收货人', width: 90 },
        { key: 'state', title: '退订信息', width: 90, render: (h, params) => { let state = params.row.state; return h('div', this.stateMap[state]) } }
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
      this.doHandleSearch(this.searchApi.formData())
    },
    doHandleSearch (search) {
      const UUID = this.getUserId
      const compyID = this.getCompyId
      let params = { UUID, compyID, ...search, ...this.pagination }
      getTDWayBillList(params).then(res => {
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
      console.log('selectChange', value)
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
