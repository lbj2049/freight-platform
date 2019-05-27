<!-- 日 需求预定 -->

<template>
  <div slot="content">
    <Card :dis-hover="true">
      <p slot="title">日需求预定</p>
      <day-demand-sub-form ref="editItemForm" @handleFormSubmit="doHandleFormSubmit"/>
    </Card>
    <table-paging :columns="columns" :data="list" @selectChange="selectChange" @changePageNum="changePageNum" @changePageSize="changePageSize"></table-paging>
  </div>
</template>
<script>
import {
  getWayBillList,
  saveWayBill
} from '@/api/business.data'
import TablePaging from '@/components/table-paging/table-paging'
import DayDemandSubForm from './day-demand-sub-form'
export default {
  components: {
    DayDemandSubForm,
    TablePaging
  },
  data () {
    return {
      distance: '462px',
      carTypeMap: { 1: '整车', 2: '集装箱', 3: '零担', 4: '其他' },
      list: [],
      columns: [
        { key: 'loadDate', title: '装运日期', width: 90, fixed: 'left' },
        { key: 'reservaNo', title: '预约号', width: 160, fixed: 'left' },
        { key: 'acceptNo', title: '受理号', width: 90, fixed: 'left' },
        { key: 'station', title: '发站', width: 90, fixed: 'left' },
        { key: 'astation', title: '到站', width: 90, fixed: 'left' },
        { key: 'gname', title: '货物名称', width: 160 },
        { key: 'tunnage', title: '需求吨数', width: 90 },
        { key: '', title: '总体积数', width: 90 },
        { key: 'carType', title: '车种', width: 90, combine: true, render: (h, params) => { let carType = params.row.carType; return h('div', this.carTypeMap[carType]) } },
        { key: 'carNum', title: '订车数', width: 90 },
        { key: 'carNum', title: '批车数', width: 90 },
        { key: 'sname', title: '托运人', width: 90 },
        { key: 'aname', title: '收货人', width: 90 },
        { key: 'acceptNo', title: '提交日期', width: 90 },
        { key: '', title: '快运标志', width: 90 },
        {
          title: '操作',
          key: 'action',
          // fixed: 'right',
          width: 80,
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              /*
              h('Button', {
                props: { type: 'error', size: 'small' }
              }, [
                h('Poptip', {
                  props: { confirm: true, transfer: true, placement: 'left-end', title: '确定要删除吗！', type: 'error', size: 'small', width: '300' },
                  on: {
                    'on-ok': () => {
                      this.$Message.info('点击了确定')
                    },
                    'on-cancel': () => {
                      this.$Message.info('点击了取消')
                    }
                  }
                }, '删除')
              ]),
              */
              h('Button', {
                props: { type: 'info', size: 'small' },
                on: {
                  click: () => {
                    this.toEdit(params.row)
                  }
                }
              }, '修改')
            ])
          }

        }
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
  created: function () {
  },
  mounted: function () {
    this.toHandleSearch()
  },
  methods: {
    // 搜索
    doHandleSearch () {
      const UUID = this.getUserId
      const compyID = this.getCompyId
      let params = { UUID, compyID, ...this.pagination }
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
    toHandleSearch () {
      this.doHandleSearch()
    },
    doHandleFormSubmit (formData) {
      const UUID = this.getUserId
      const compyID = this.getCompyId
      let item = { ...formData, UUID, compyID }
      saveWayBill(item).then(res => {
        this.doResultHandler(res)
      })
    },
    doResultHandler (res) {
      const body = res.data
      const data = body.Data
      if (body.Status === 2000) {
        this.toHandleSearch()
        this.multItem = []
        this.$Message.success(data.Result)
      } else {
        this.$Message.error(data.ErrorDes)
      }
    },
    doDelete (item) {
      // console.log('remove', item)
    },
    // 编辑
    toEdit (item) {
      // console.log('edit', item)
      this.$refs.editItemForm.editFormData(item)
    },
    selectChange (value) {
      this.multItem = value
      // console.log('selectChange', value)
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
