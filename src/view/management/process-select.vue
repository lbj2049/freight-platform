<!-- 进度 查询 -->

<template>
  <div slot="content">
    <form-create ref="fc" v-model="searchApi" :rule="searchRule" :option="searchOption" class="qib-form"></form-create>
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
            <div v-if="item.state === m.value">
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

    <process-view ref="viewModel"/>
  </div>
</template>
<script>
import {
  getExpSel,
  stuPlanList
} from '@/api/teacher.data'
import TablePaging from '@/components/table-paging/table-paging'
import ProcessView from './process-view'
import { maker } from 'form-create'
export default {
  components: {
    ProcessView,
    TablePaging
  },
  data () {
    return {
      distance: '462px',
      stateModel: false,
      searchApi: {},
      searchModel: {},
      // 表单生成规则
      searchRule: [
        maker.select('实验', 'expID').props({ placeholder: '请选择实验' }).col({ span: 6, labelWidth: 40 }),
        maker.input('关键词', 'keyword').col({ span: 6, labelWidth: 64 }),
        maker.create('i-button')
          .props({ type: 'primary', size: 'default', shape: undefined, long: false, htmlType: 'button', disabled: false, icon: 'ios-upload', loading: false, show: true })
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
      exps: [],
      multItem: [],
      receptTypeMap: { 1: '发车', 2: '', 3: '到站接车' },
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
        { key: 'userName', title: '学生姓名', fixed: 'left' },
        { key: 'userNo', title: '学号' },
        { key: 'companyName', title: '公司名称' },
        { key: 'waybillNo', title: '运单号' },
        { key: 'receptType', title: '类型', render: (h, params) => { let cv = params.row.receptType; return h('div', this.receptTypeMap[cv]) } },
        { key: 'state', title: '进度', render: (h, params) => { let state = params.row.state; return h('div', this.stateMap[state]) } }
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
    this.getExpList()
    // this.toHandleSearch()
    this.searchModel = this.searchApi.model()
  },
  methods: {
    getExpList () {
      const UUID = this.getUserId
      let params = { UUID }
      getExpSel(params).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          if (data) {
            data.forEach(({ expID, expName }) => this.exps.push({ value: expID, label: expName }))

            this.searchModel.expID.options = this.exps
            this.searchApi.changeField('expID', this.exps[ 0 ].value)
            this.searchApi.submit((formData) => {
              // 提交表单
              this.toHandleSearch()
            })
          }
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    },
    // 搜索
    toHandleSearch (search) {
      // this.$refs.searchForm.toHandleSearch(search)
      this.doHandleSearch(this.searchApi.formData())
    },
    doHandleSearch (search) {
      const teaUUID = this.getUserId
      let params = { teaUUID, ...search, ...this.pagination }
      stuPlanList(params).then(res => {
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
      // console.log(this.item)
      this.$refs.viewModel.show(this.item)
    },
    toStates () {
      // console.log(this.item)
      var arr = Object.keys(this.item)
      if (arr.length === 0) {
        this.$Message.error('请选择数据')
        return
      }
      if (!this.item.state) {
        this.item.state = 0
      }
      this.stateModel = true
    }
  }
}
</script>
