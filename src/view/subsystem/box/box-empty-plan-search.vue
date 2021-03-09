<!-- 日 需求 查询 -->

<template>
  <div slot="content">
    <Card :dis-hover="true">
      <p slot="title">查询</p>
      <box-empty-plan-search-form ref="searchForm" @handleFormSubmit="doHandleSearch"/>
    </Card>
    <table-paging :columns="columns" :data="list" :distance="distance" @selectChange="selectChange" @changePageNum="changePageNum" @changePageSize="changePageSize"></table-paging>

    <Modal v-model="emptyBoxModel" title="提箱录入" @on-ok="emptyBoxModel = false" width="905" :transfer="true">

      <tables ref="tables" :editable="true" v-model="ls1" :columns="clmns1"/>

      <div slot="footer">
        <div style="text-align: left; width: 200px; float: left;">
        装车地点：
        <RadioGroup v-model="caseAddr">
          <Radio :label="1">站外</Radio>
          <Radio :label="2">站内</Radio>
        </RadioGroup>
        </div>
        <Button type="primary" @click="doHandleSaveEmptyBox">确定</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
import {
  planEmptyCase,
  getCaseInfoListByWbID,
  updCaseInfoByWbID
} from '@/api/box.data'
import Tables from '_c/tables'
import TablePaging from '@/components/table-paging/table-paging'
import BoxEmptyPlanSearchForm from './box-empty-plan-search-form'
export default {
  components: {
    BoxEmptyPlanSearchForm,
    TablePaging,
    Tables
  },
  data () {
    return {
      distance: '462px',
      carTypeMap: { 1: '整车', 2: '集装箱', 3: '零担', 4: '其他' },
      stateMap: { 400: '客户原因', 41: '不可抗因素' },
      list: [],
      columns: [

        { key: '',
          title: '操作',
          width: 90,
          fixed: 'left',
          render: (h, params) => {
            return h('div', [ h('Button', { props: { size: 'small' },
              on: {
                click: () => {
                  this.emptyBoxModel = true
                  console.log(params)
                  this.doGetCaseInfoList(params.row.id)
                }
              } }, '提箱录入') ])
          } },
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
        { key: 'aname', title: '收货人', width: 90 }

      ],
      pagination: {
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      emptyBoxModel: false,
      caseAddr: 1,
      ls1: [],
      clmns1: [

        { key: 'caseNo',
          title: '箱号',
          width: 90,
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.row.caseNo,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.ls1[params.index].caseNo = val
                }
              }
            })
          } },
        { key: 'casePlace',
          title: '箱区',
          width: 90,
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.row.casePlace,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.ls1[params.index].casePlace = val
                }
              }
            })
          } },
        { key: 'PXDate', title: '配箱时间', width: 120 },
        { key: 'operator', title: '操作', width: 90 },
        { key: 'TXDate', title: '提箱时间', width: 120 },
        { key: 'caseID',
          title: '集卡号',
          width: 90,
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.row.caseID,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.ls1[params.index].caseID = val
                }
              }
            })
          } },
        { key: 'getName',
          title: '领箱人',
          width: 90,
          render: (h, params) => {
            return h('Input', {
              props: {
                value: params.row.getName,
                size: 'small'
              },
              on: {
                input: (val) => {
                  this.ls1[params.index].getName = val
                }
              }
            })
          } },
        { key: 'nullDuty', title: '落空责任', width: 90 },
        { key: 'nullWhy', title: '落空原因', width: 90 }

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
      // console.log(search)
      const UUID = this.getUserId
      const compyID = this.getCompyId
      let params = { UUID, compyID, ...search, ...this.pagination }
      // let params = { ...search, ...this.pagination }
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
    },
    doGetCaseInfoList (wbID) {
      let params = { wbID }
      // let params = { ...search, ...this.pagination }
      getCaseInfoListByWbID(params).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          this.ls1 = data || []
          console.log(this.ls1)
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    doHandleSaveEmptyBox () {
      let jsonstr = JSON.stringify(this.ls1)
      let caseAddr = this.caseAddr

      let item = { jsonstr, caseAddr }
      console.log(item)
      updCaseInfoByWbID(item).then(res => {
        this.doResultSaveEmptyBoxHandler(res)
      })
    },
    doResultSaveEmptyBoxHandler (res) {
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
