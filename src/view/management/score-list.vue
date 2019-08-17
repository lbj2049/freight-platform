<template>
  <div slot="content">
    <form-create ref="fc" v-model="searchApi" :rule="searchRule" :option="searchOption" class="qib-form"></form-create>
    <table-paging :columns="columns" :data="list" @selectChange="selectChange" @changePageNum="changePageNum" @changePageSize="changePageSize" :pagination="pagination">
    </table-paging>

    <Modal v-model="showDetailModel" title="系统评分" @on-ok="showDetailModel = false" width="780" :transfer="true">
      <table-paging :columns="columns1" :data="list1" @changePageNum="changePageNum1" @changePageSize="changePageSize1" :pagination="pagination1">

      </table-paging>
    </Modal>
  </div>
</template>
<script>
import {
  getExpSel,
  getSysGradeList,
  getScoreDetail
} from '@/api/teacher.data'
import SearchForm from '../../components/search-from/search-from'
import TablePaging from '../../components/table-paging/table-paging'
import DemandEdit from './demand-edit'
import { maker } from 'form-create'
export default {
  components: {
    TablePaging, SearchForm, DemandEdit
  },
  data () {
    return {
      showDetailModel: false,
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
      list: [],
      columns: [
        { type: 'index', width: 60, align: 'center' },
        { key: 'userName', title: '学生姓名' },
        { key: 'userNo', title: '学号' },
        { key: 'companyName', title: '公司名称' },
        { key: 'scroe',
          title: '系统评分',
          render: (btn, params) => {
            let btns = []
            btns.push(
              btn('Button', {
                props: { type: 'text', size: 'small' },
                on: {
                  click: () => {
                    const _this = this
                    _this.showDetail(params.row)
                  }
                },
                style: { marginRight: '5px' }
              }, params.row.scroe)
            )
            return btn('div', btns)
          }
        // },
        // { key: 'perScroe', title: '百分制核算'
        }
      ],
      pagination: {
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      list1: [],
      columns1: [
        { type: 'index', width: 60, align: 'center' },
        { key: 'waybillNo', title: '运单号' },
        { key: 'explains', title: '得分项说明' },
        { key: 'score', title: '得分' },
        { key: 'cTime', title: '操作时间' }
      ],
      pagination1: {
        total: 0,
        pageSize: 10,
        pageNum: 1
      },
      currItem: {}
    }
  },
  computed: {
    getUserId () {
      return this.$store.state.user.userId
    }
  },
  created: function () {
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
    toHandleSearch () {
      this.doHandleSearch(this.searchApi.formData())
    },
    // 搜索
    doHandleSearch (search) {
      const receptType = 1
      const teaUUID = this.getUserId
      let params = { teaUUID, receptType, ...search, ...this.pagination }
      getSysGradeList(params).then(res => {
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
    // 选中对象切换
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
    // 切换页面
    changePageNum1 (pageNum) {
      this.pagination1.pageNum = pageNum
      this.toHandleDetail(this.currItem)
    },
    // 切换页面size
    changePageSize1 (pageSize) {
      this.pagination1.pageSize = pageSize
      this.toHandleDetail(this.currItem)
    },
    // 详情
    showDetail (item) {
      this.showDetailModel = true
      this.currItem = item
      this.toHandleDetail(item)
    },
    toHandleDetail (item) {
      const teaUUID = this.getUserId
      const compyID = item.compyID
      let params = { teaUUID, compyID, ...this.pagination1 }
      getScoreDetail(params).then(res => {
        const body = res.data
        const data = body.Data
        if (body.Status === 2000) {
          this.list1 = data.datas || []
          this.pagination1 = {
            total: data.total,
            pageSize: data.pageSize,
            pageNum: data.page
          }
        } else {
          this.$Message.error(data.ErrorDes)
        }
      })
    }
  }
}
</script>
