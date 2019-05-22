<!-- 整车装卸 -->

<template>
  <div slot="content">
    <Card :dis-hover="true">
      <work-1-form ref="searchForm" @handleFormSubmit="doHandleSearch" @handleFormPrint="handlePrint"
                   @handleWorkTime="handleWorkTime" @handleWorkScan="handleWorkScan" @handleWorkCancel="handleWorkCancel" @handleWorkBrand="handleWorkBrand"/>
    </Card>
    <Table size="small" stripe :columns="columns" :data="list"></Table>

    <work1-set1-form ref="set1form" @handleFormSubmit="doHandleSearch"/>
    <work1-set34-form ref="set34form" @handleFormSubmit="doHandleSearch"/>
  </div>
</template>
<script>
import {
  getList,
  getCarPlaceList,
  setCarPlace,
  setPBoardSet,
  bg3CheckLoad,
  ed3CheckLoad,
  bg3CheckUnLoad,
  ed3CheckUnLoad,
  setPBoardMove
} from '@/api/freight.data'
import { formatDate } from '@/libs/tools'
import TablePaging from '@/components/table-paging/table-paging'
import Work1Form from './work-1-form'
import Work1Set1Form from './work-1-set-1-form'
import Work1Set34Form from './work-1-set-34-form'
export default {
  components: {
    Work1Form,
    Work1Set1Form,
    Work1Set34Form,
    TablePaging
  },
  data () {
    return {
      distance: '462px',
      list: [],
      columns: [
        { key: 'yardName', title: '股道', width: 60 },
        { key: 'warehouse', title: '库门', width: 80, tooltip: true },
        { key: 'door', title: '货位名称', width: 90, tooltip: true },
        { key: 'carVersion', title: '车型', width: 80 },
        { key: 'carCard', title: '车号', width: 80 },
        { key: 'gname', title: '品名', width: 80 },
        { key: 'caseNum', title: '件数', width: 60 },
        { key: 'tunnage', title: '货重', width: 60 },
        { key: 'astation', title: '到站', width: 80 },
        { key: 'sname', title: '发货人', width: 80, tooltip: true },
        { key: 'aname', title: '收货人', width: 80, tooltip: true },
        { key: 'groupName', title: '装卸工组', width: 90, tooltip: true },

        {
          key: '',
          title: '接车对位',
          width: 90,
          render: (h, params) => {
            console.log(params.row)
            if (params.row.checkPlace === 1) {
              return h('div', [ h('div', '√') ])
            }
            return h('div', [ h('Button', { props: { size: 'small' }, on: { 'click': () => { console.log(1); this.doSet1(params.row) } } }, '配置') ])
          }
        },
        {
          key: '',
          title: '防护牌安设',
          width: 100,
          render: (h, params) => {
            console.log(params.row)
            if (params.row.PBset === 1) {
              return h('div', [ h('div', '√') ])
            }
            return h('div', [ h('Button', { props: { size: 'small' }, on: { 'click': () => { this.doSet2(params.row) } } }, '配置') ])
          }
        },
        {
          key: '',
          title: '前三检',
          width: 80,
          render: (h, params) => {
            console.log(params.row)
            if (params.row.bgCheck === 1) {
              return h('div', [ h('div', '√') ])
            }
            return h('div', [ h('Button', { props: { size: 'small' }, on: { 'click': () => { this.doSet3(params.row) } } }, '配置') ])
          }
        },
        {
          key: '',
          title: '后三检',
          width: 80,
          render: (h, params) => {
            console.log(params.row)
            if (params.row.endCheck === 1) {
              return h('div', [ h('div', '√') ])
            }
            return h('div', [ h('Button', { props: { size: 'small' }, on: { 'click': () => { this.doSet4(params.row) } } }, '配置') ])
          }
        },
        {
          key: '',
          title: '防护牌撤除',
          width: 100,
          render: (h, params) => {
            console.log(params.row)
            if (params.row.PBmove === 1) {
              return h('div', [ h('div', '√') ])
            }
            return h('div', [ h('Button', { props: { size: 'small' }, on: { 'click': () => { this.doSet7(params.row) } } }, '配置') ])
          }
        },

        { key: '', title: '篷布施封号', width: 80 },
        { key: 'needNo', title: '票据号', width: 160 },
        { key: '', title: '保价金额合计', width: 80 },
        { key: '', title: '保险金额合计', width: 80 },
        { key: 'notepad', title: '托运人记事', width: 80 },
        { key: '', title: '操作', width: 80, render: (h, params) => { return h('div', [ h('Button', { props: { size: 'small', disabled: true } }, '无') ]) } }
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
      let params = { UUID, compyID, ...search }
      getList(params).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          this.list = data || []
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    doSet1 (vo) {
      // console.log(vo)
      this.$refs.set1form.show(vo.wbID)
    },
    doSet2 (vo) {
      let now = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
      let dt = now
      this.$Modal.confirm({
        title: '防护牌安设',
        render: (h) => {
          return h('div', [
            h('div', { style: { float: 'left', width: '120px', lineHeight: '32px' } }, [h('p', '安设防护牌时间')]),
            h('DatePicker', {
              props: {
                type: 'datetime',
                value: now,
                placeholder: '请选择安设防护牌时间'
              },
              on: {
                'on-change': (val) => {
                  dt = val
                }
              }
            })
          ])
        },
        onOk: () => {
          const UUID = this.getUserId
          console.log(dt)
          if (!dt) {
            this.$Message.error('请选择时间')
            return false
          }
          setPBoardSet({ UUID: UUID, wbID: vo.wbID, ctime: dt }).then(res => {
            this.resultHandler(res)
          })
        }
      })
    },
    doSet3 (vo) {
      this.$refs.set34form.show(vo, 3)
    },
    doSet4 (vo) {
      this.$refs.set34form.show(vo, 4)
    },
    doSet7 (vo) {
      let now = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
      let dt = now
      this.$Modal.confirm({
        title: '防护牌移除',
        render: (h) => {
          return h('div', [
            h('div', { style: { float: 'left', width: '120px', lineHeight: '32px' } }, [h('p', '移除防护牌时间')]),
            h('DatePicker', {
              props: {
                type: 'datetime',
                value: now,
                placeholder: '请选择移除防护牌时间'
              },
              on: {
                'on-change': (val) => {
                  dt = val
                }
              }
            })
          ])
        },
        onOk: () => {
          const UUID = this.getUserId
          console.log(dt)
          if (!dt) {
            this.$Message.error('请选择时间')
            return false
          }
          setPBoardMove({ UUID: UUID, wbID: vo.wbID, ctime: dt }).then(res => {
            this.resultHandler(res)
          })
        }
      })
    },
    resultHandler (res) {
      const body = res.data
      const data = body.Data
      if (body.Status === 2000) {
        this.$Message.success(data.Result)
        this.toHandleSearch()
      } else {
        this.$Message.error(data.ErrorDes)
      }
    },
    handleWorkTime () {
      console.log('handleWorkTime')
    },
    handleWorkScan () {
      console.log('handleWorkScan')
    },
    handleWorkCancel () {
      console.log('handleWorkCancel')
    },
    handleWorkBrand () {
      console.log('handleWorkBrand')
    },
    handlePrint () {
      console.log('handlePrint')
    },
    selectChange (value) {
      this.multItem = value
      console.log('selectChange', value)
    },
    changePageNum (page) {
      console.log('page', page)
    },
    changePageSize (pageSize) {
      console.log('pageSize', pageSize)
    }
  }
}
</script>
