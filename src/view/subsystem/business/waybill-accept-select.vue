<!-- 运单受理 查询 -->

<template>
  <div slot="content">
    <Card :dis-hover="true">
      <p slot="title">查询</p>
      <waybill-accept-select-form ref="searchForm" @handleFormSubmit="doHandleSearch"/>
    </Card>
    <table-paging :columns="columns" :data="list" :distance="distance" @selectChange="selectChange" @changePageNum="changePageNum" @changePageSize="changePageSize" :pagination="pagination">

      <div slot="bottomTools">
        <Button type="primary" @click="toDetail">查看</Button>
        <Button type="primary" @click="toStates">状态跟踪</Button>
      </div>
    </table-paging>

    <Modal v-model="stateModel" title="运单状态图" @on-ok="stateModel = false" width="780" :transfer="true">
      <Card :dis-hover="true">
        <p slot="title">需求号：{{this.item.needNo}}</p>
        <div style="overflow: hidden; text-align: center">
          <!--<Button shape="circle" type="success" icon="ios-radio-button-off" size="small"/>-->
          <div v-for="(m, index) in states" :label="m.value" :key="m.value" style="float: left">
            <div v-if="item.state > m.value">
              <Icon type="ios-radio-button-on" size="32" color="#19be6b"/>
              <Icon type="md-remove" size="32" color="#19be6b" v-if="index < states.length - 1"/>
            </div>
            <div v-if="item.state == m.value">
              <Icon type="ios-radio-button-on" size="32" color="#19be6b"/>
              <Icon type="md-remove" size="32" color="#c5c8ce" v-if="index < states.length - 1"/>
            </div>
            <div v-if="item.state < m.value">
              <Icon type="ios-radio-button-on" size="32" color="#c5c8ce"/>
              <Icon type="md-remove" size="32" color="#c5c8ce" v-if="index < states.length - 1"/>
            </div>
            <span>{{ m.label }}</span>
          </div>
        </div>
      </Card>
    </Modal>

    <waybill-accept-select-view ref="viewModel"/>
  </div>
</template>
<script>
import {
  getWayBillList
} from '@/api/business.data'
import TablePaging from '@/components/table-paging/table-paging'
import WaybillAcceptSelectForm from './waybill-accept-select-form'
import WaybillAcceptSelectView from './waybill-accept-select-view'
export default {
  components: {
    WaybillAcceptSelectForm,
    WaybillAcceptSelectView,
    TablePaging
  },
  data () {
    return {
      distance: '462px',
      stateModel: false,
      multItem: [],
      admitCarStateMap: { 0: '未匹配', 1: '已匹配' },
      carTypeMap: { 1: '整车', 2: '集装箱', 3: '零担', 4: '其他' },
      stateMap: { 1: '待用', 2: '待上报', 3: '待受理', 4: '已通过受理', 41: '未通过受理', 5: '已装车', 6: '已发车', 7: '已到达', 8: '已卸车', 9: '已交付', 10: '待理赔', 11: '已理赔', 12: '已作废', 13: '已制票', 14: '通知进货', 400: '退订' },
      // states: [{ value: 1, label: '待用' }, { value: 2, label: '待上报' }, { value: 3, label: '待受理' }, { value: 4, label: '已通过受理' }, { value: 41, label: '未通过受理' }, { value: 5, label: '已装车' }, { value: 6, label: '已发车' }, { value: 7, label: '已到达' }, { value: 8, label: '已卸车' }, { value: 9, label: '已交付' }, { value: 10, label: '待理赔' }, { value: 11, label: '已理赔' }, { value: 12, label: '已作废' }, { value: 13, label: '已制票' }, { value: 14, label: '通知进货' }, { value: 400, label: '退订' }],
      states: [{ value: 1, label: '待用' }, { value: 2, label: '待上报' }, { value: 3, label: '待受理' }, { value: 4, label: '已通过受理' }, { value: 5, label: '已装车' }, { value: 6, label: '已发车' }, { value: 7, label: '已到达' }, { value: 8, label: '已卸车' }, { value: 9, label: '已交付' }, { value: 10, label: '待理赔' }, { value: 11, label: '已理赔' }],
      list: [],
      item: {},
      columns: [
        {
          title: '选择',
          key: 'chose',
          width: 70,
          align: 'center',
          fixed: 'left',
          render: (h, params) => {
            let currItem = params.row
            let currId = currItem.wbID
            let flag = false
            if (this.item.wbID === currId) {
              flag = true
            } else {
              flag = false
            }
            let self = this
            return h('div', [
              h('Radio', {
                props: {
                  value: flag
                },
                on: {
                  'on-change': () => {
                    self.currentid = currId
                    this.item = currItem
                  }
                }
              })
            ])
          }
        },
        { key: 'needNo', title: '需求号', width: 160, fixed: 'left' },
        // { key: 'admitCarState', title: '车种', width: 90, render: (h, params) => { let admitCarState = params.row.admitCarState; return h('div', this.admitCarStateMap[admitCarState]) } },
        // { key: 'resDate', title: '预定日期', width: 90, fixed: 'left' },
        // { key: 'reservaNo', title: '预约号', width: 160, fixed: 'left' },
        // { key: 'acceptNo', title: '受理号', width: 90, fixed: 'left' },
        { key: 'station', title: '发站', width: 90 },
        { key: 'astation', title: '到站', width: 90 },
        // { key: 'soffic', title: '发局', width: 90, fixed: 'left' },
        // { key: 'aoffic', title: '到局', width: 90, fixed: 'left' },
        { key: 'sname', title: '托运人', width: 90 },
        { key: 'aname', title: '收货人', width: 90 },
        // { key: 'sCarLoadAddr', title: '托运人装车地点', width: 160 },
        { key: 'gname', title: '货物名称' },
        // { key: 'tunnage', title: '货物描述', width: 90 },
        // { key: 'sagent', title: '托运经办人', width: 100 },
        // { key: 'aagent', title: '收货经办人', width: 100 },
        // { key: 'caseNum', title: '件数', width: 90 },
        // { key: 'tunnage', title: '吨数', width: 90 },
        // { key: '', title: '保价', width: 90 },
        { key: 'loadDate', title: '装车日期', width: 90 },
        // { key: 'reservaNo', title: '预约号', width: 160 },
        { key: '', title: '车号', width: 90 },
        // { key: 'carType', title: '车种', width: 90, render: (h, params) => { let carType = params.row.carType; return h('div', this.carTypeMap[carType]) } },
        // { key: 'carNum', title: '车数', width: 90 },
        { key: 'state', title: '运单状态', width: 90, render: (h, params) => { let state = params.row.state; return h('div', this.stateMap[state]) } }
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
    },
    toDetail () {
      console.log(this.item)
      this.$refs.viewModel.show(this.item)
    },
    toStates () {
      console.log(this.item)
      var arr = Object.keys(this.item)
      if (arr.length === 0) {
        this.$Message.error('请选择数据')
        return
      }

      this.stateModel = true
    }
  }
}
</script>
