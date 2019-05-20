<!-- 装车计划 -->
<style lang="less">
  @import 'plan-1';
</style>
<template>
  <div slot="content">
    <Row>
      <Col span="24">
        <Card :dis-hover="true">
          <plan-1-search-form ref="searchForm" @handleFormSubmit="doHandleSearch" @handlePlan="handlePlan" @handleExport="handleExport"/>
        </Card>
      </Col>
    </Row>
    <div class="split-pane-wrapper">
      <Split v-model="split1" mode="vertical">
        <div slot="top" class="split-pane-2">
          <Split v-model="split2" style="height: 100%">
            <div slot="left" class="split-pane-2-padding" :style="dataStyle">
                <Table size="small" stripe :columns="columns1" :data="list1" highlight-row ref="list1" @on-current-change="getCurrentData1"></Table>
            </div>
            <div slot="right" class="split-pane-2-padding" :style="dataStyle">
              <Card :bordered="false" class="card-content">
                <p slot="title">货场资源</p>
                <Table size="small" stripe :columns="columns2" :data="list2" highlight-row ref="list2" @on-current-change="getCurrentData2"></Table>
              </Card>
            </div>
          </Split>
        </div>
        <div slot="bottom" class="split-pane-2">
          <Split v-model="split3" mode="horizontal">
            <div slot="left" class="split-pane-2-padding" :style="dataStyle">
              <Card :bordered="false" class="card-content">
                <p slot="title">装车需求</p>
                <Table size="small" stripe :columns="columns3" :data="list3"></Table>
              </Card>
            </div>
            <div slot="right" class="split-pane-2">

              <Split v-model="split4" mode="horizontal">
                <div slot="left" class="split-pane-2-padding" :style="dataStyle">
                  <Card :bordered="false" class="card-content">
                    <p slot="title">外勤货运员表</p>
                    <Table size="small" stripe :columns="columns4" :data="list4" highlight-row ref="list4" @on-current-change="getCurrentData4"></Table>
                  </Card>
                </div>
                <div slot="right" class="split-pane-2-padding" :style="dataStyle">
                  <Card :bordered="false" class="card-content">
                    <p slot="title">装卸工组表</p>
                    <Table size="small" stripe :columns="columns5" :data="list5" highlight-row ref="list5" @on-current-change="getCurrentData5"></Table>
                  </Card>
                </div>
              </Split>
            </div>
          </Split>
        </div>
      </Split>
    </div>

  </div>
</template>
<script>
import {
  compyGyardList,
  compyOutworkerList,
  compyLoadGroupList,
  truckLoadList,
  executePlan,
  loadCarNeedList
} from '@/api/freight.data'
import TablePaging from '@/components/table-paging/table-paging'
import Plan1SearchForm from './plan-1-search-form'

export default {
  components: {
    Plan1SearchForm,
    TablePaging
  },
  props: {
  },
  data () {
    return {
      dataStyle: {
        height: 'calc(100% - 5px)',
        overflow: 'auto'
      },
      split1: 0.5,
      split2: 0.6,
      split3: 0.5,
      split4: 0.5,
      th: 300,
      pi: {
        wbID: '',
        cgyID: '',
        clgID: '',
        cowID: '',
        type: 1
      },
      ppi: { },
      admitCarStateMap: { 0: '未匹配', 1: '已匹配' },
      carTypeMap: { 1: '整车', 2: '集装箱', 3: '零担', 4: '其他' },
      stateMap: { 1: '待用', 2: '待上报', 3: '待受理', 4: '已通过受理', 41: '未通过受理', 5: '已装车', 6: '已发车', 7: '已到达', 8: '已卸车', 9: '已交付', 10: '待理赔', 11: '已理赔', 12: '已作废', 13: '已制票', 14: '通知进货', 400: '退订' },
      paramStateMap: { 1: '空闲', 2: '作业中' },
      paramTypeMap: { 1: '路工' },
      list1: [],
      columns1: [
        { type: 'index', width: 38, align: 'center', fixed: 'left' },
        { key: 'needNo', title: '需求号', width: 160, fixed: 'left' },
        { key: 'carType', title: '车种', width: 90, render: (h, params) => { let carType = params.row.carType; return h('div', this.carTypeMap[carType]) }, fixed: 'left' },
        { key: 'admitCarState', title: '车种', width: 80, render: (h, params) => { let admitCarState = params.row.admitCarState; return h('div', this.admitCarStateMap[admitCarState]) }, fixed: 'left' },
        { key: 'resDate', title: '承认车', width: 80 },
        { key: 'reservaNo', title: '计划运输号' },
        // { key: 'acceptNo', title: '受理号', width: 90, fixed: 'left' },
        { key: 'astation', title: '到站', width: 90 },
        { key: 'aoffic', title: '到局', width: 90 },
        { key: 'gname1', title: '品名1', width: 120 },
        { key: 'tunnage1', title: '货重1（kg）', width: 120 },
        { key: 'caseNum1', title: '件数1', width: 90 },
        { key: 'gname2', title: '品名2', width: 120 },
        { key: 'tunnage2', title: '货重2（kg）', width: 120 },
        { key: 'caseNum2', title: '件数2', width: 90 },
        { key: 'gname3', title: '品名3', width: 120 },
        { key: 'tunnage3', title: '货重3（kg）', width: 120 },
        { key: 'caseNum3', title: '件数3', width: 90 },
        { key: '', title: '物品清单', width: 90, render: (h, params) => { return h('div', [ h('Button', { props: { size: 'small', disabled: true } }, '查看物流') ]) } },
        { key: 'state', title: '运单状态', width: 90, render: (h, params) => { let state = params.row.state; return h('div', this.stateMap[state]) } },

        { key: 'yardName', title: '股道名称', width: 90 },
        { key: 'sname', title: '发货人', width: 90 },
        { key: 'aname', title: '收货人', width: 90 },
        { key: 'tunnage', title: '成组单号', width: 90 }
      ],
      list2: [],
      columns2: [
        { type: 'index', width: 38, align: 'center', fixed: 'left' },
        { key: 'yardName', title: '股道名称', width: 90, fixed: 'left' },
        { key: 'allCarNum', title: '总货位容车数', width: 160 },
        { key: 'nullCarNum', title: '空货位空车位', width: 160 },
        { key: 'orderCarNum', title: '预约货位空车', width: 160 },
        { key: 'usedCarNum', title: '占用货位重车数', width: 160 }
      ],
      list3: [],
      columns3: [
        { type: 'index', width: 38, align: 'center', fixed: 'left' },
        { key: 'carType', title: '车种', width: 90, render: (h, params) => { let carType = params.row.carType; return h('div', this.carTypeMap[carType]) } },
        { key: 'yardName', title: '股道名称', width: 90 },
        { key: 'gname1', title: '品名1', width: 120 },
        { key: 'gname2', title: '品名2', width: 120 },
        { key: 'gname3', title: '品名3', width: 120 },
        { key: 'astation', title: '到站', width: 90 },
        { key: 'workerName', title: '工作人员名称', width: 160 },
        { key: 'groupName', title: '小组名称', width: 90 },
        { key: 'sname', title: '托运人', width: 90 },
        { key: 'needNo', title: '需求号', width: 90 }
      ],
      list4: [],
      columns4: [
        { type: 'index', width: 38, align: 'center', fixed: 'left' },
        { key: 'workerName', title: '工作人员名称', width: 110 },
        { key: 'state', title: '状态', width: 60, render: (h, params) => { let state = params.row.state; return h('div', this.paramStateMap[state]) } },
        { key: 'workAddr', title: '工作地点', width: 90 }
      ],
      list5: [],
      columns5: [
        { type: 'index', width: 38, align: 'center', fixed: 'left' },
        { key: 'groupName', title: '小组名称', width: 90 },
        { key: 'state', title: '状态', width: 60, render: (h, params) => { let state = params.row.state; return h('div', this.paramStateMap[state]) } },
        { key: 'type', title: '类型', width: 90, render: (h, params) => { let type = params.row.type; return h('div', this.paramTypeMap[type]) } }
      ]
    }
  },
  created () {
    // 保留初始值
    this.ppi = { ...this.pi }
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
      this.loadData2()
      this.loadData3()
      this.loadData4()
      this.loadData5()
      this.$refs.searchForm.toHandleSearch()
    },
    doHandleSearch (search) {
      const UUID = this.getUserId
      const compyID = this.getCompyId
      let params = { UUID, compyID, ...search, ...this.pagination }
      truckLoadList(params).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          this.list1 = data || []
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
      this.cleanSelected()
    },
    cleanSelected () {
      this.$refs.list1.clearCurrentRow()
      this.$refs.list2.clearCurrentRow()
      this.$refs.list4.clearCurrentRow()
      this.$refs.list5.clearCurrentRow()
      this.pi = { ...this.ppi }
    },
    loadData2 (search) {
      const UUID = this.getUserId
      const compyID = this.getCompyId
      let params = { UUID, compyID, ...search, ...this.pagination }
      compyGyardList(params).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          this.list2 = data || []
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    loadData3 (search) {
      const UUID = this.getUserId
      const compyID = this.getCompyId
      let params = { UUID, compyID, ...search, ...this.pagination }
      loadCarNeedList(params).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          this.list3 = data || []
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    loadData4 (search) {
      const UUID = this.getUserId
      const compyID = this.getCompyId
      let params = { UUID, compyID, ...search, ...this.pagination }
      compyOutworkerList(params).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          this.list4 = data || []
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    loadData5 (search) {
      const UUID = this.getUserId
      const compyID = this.getCompyId
      let params = { UUID, compyID, ...search, ...this.pagination }
      compyLoadGroupList(params).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          this.list5 = data || []
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    getCurrentData1 (data) {
      if (data) {
        this.pi.wbID = data.wbID
      }
    },
    getCurrentData2 (data) {
      if (data) {
        this.pi.cgyID = data.cgyID
      }
    },
    getCurrentData4 (data) {
      if (data) {
        this.pi.cowID = data.cowID
      }
    },
    getCurrentData5 (data) {
      if (data) {
        this.pi.clgID = data.clgID
      }
    },
    handlePlan () {
      console.log(this.pi)
      if (!this.pi.wbID) {
        this.$Message.error('请选择装车计划')
        return
      }
      if (!this.pi.cgyID) {
        this.$Message.error('请选择股道')
        return
      }
      if (!this.pi.clgID) {
        this.$Message.error('请选择装卸工组')
        return
      }
      if (!this.pi.cowID) {
        this.$Message.error('请选择外勤工作人员')
        return
      }
      const UUID = this.getUserId
      executePlan({ UUID, ...this.pi }).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          this.$Message.success(data.Result)
          this.toHandleSearch()
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    handleExport () {
      console.log('handleExport')
    },
    selectChange (value) {
      this.multItem = value
      console.log('selectChange', value)
    }
  }
}
</script>
