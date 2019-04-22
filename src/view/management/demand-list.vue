<template>
  <div slot="content">
    <form-create ref="fc" v-model="searchApi" :rule="searchRule" :option="searchOption" class="qib-form"></form-create>
    <table-paging :columns="columns" :data="list" @selectChange="selectChange" @changePageNum="changePageNum" @changePageSize="changePageSize" :pagination="pagination">
      <div slot="toolButtons">
        <Button type="primary" @click="toAdd">添加需求单</Button>
      </div>
    </table-paging>

    <demand-edit ref="editItemForm" :editable="editable" @formConfirmEvent="formConfirmEvent" @formCancelEvent="formCancelEvent" @watchEditableChange="watchEditableChange" @onSuccessValid="handleSubmit"/>
  </div>
</template>
<script>
import {
  getExpSel,
  getTeaWayBill,
  adTeaWayBill,
  updTeaWayBill,
  delTeaWayBill,
  sendTeaWayBill
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
      editable: false,
      searchApi: {},
      searchModel: {},
      // 表单生成规则
      searchRule: [
        // maker.select('实验', 'expID').props({ placeholder: '请选择实验' }).col({ span: 6, labelWidth: 40 }),
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
      carTypeMap: { 1: '整车', 2: '集装箱', 3: '零担', 4: '其他' },
      list: [],
      columns: [
        { type: 'index', width: 60, align: 'center' },
        { key: 'title', title: '需求单名称' },
        { key: 'carType', title: '车种', combine: true, render: (h, params) => { let carType = params.row.carType; return h('div', this.carTypeMap[carType]) } },
        { key: 'uptime', title: '更新时间' },
        {
          title: '操作',
          key: 'action',
          // fixed: 'right',
          width: 180,
          render: (btn, params) => {
            let btns = []
            btns.push(
              btn('Button', {
                props: { type: 'warning', size: 'small' },
                on: {
                  click: () => {
                    const _this = this
                    _this.toDistribute(params.row)
                    // this.toDistribute(params.row)
                  }
                },
                style: { marginRight: '5px' }
              }, '分发')
            )
            btns.push(
              btn('Button', {
                props: { type: 'info', size: 'small' },
                on: {
                  click: () => {
                    this.toEdit(params.row)
                  }
                },
                style: { marginRight: '5px' }
              }, '修改')
            )
            btns.push(
              btn('Poptip', {
                props: { transfer: true, confirm: true, type: 'error', size: 'large', title: '你确定要删除吗?' },
                on: {
                  'on-ok': () => {
                    this.doDelete(params.row)
                  }
                }
              }, [
                btn('Button', { props: { type: 'error', size: 'small' } }, '删除')
              ])
            )
            return btn('div', btns)
          }
        }
      ],
      exps: [],
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
    }
  },
  created: function () {
  },
  mounted: function () {
    this.getExpList()
    this.toHandleSearch()
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
      const teaUUID = this.getUserId
      let params = { teaUUID, ...search, ...this.pagination }
      getTeaWayBill(params).then(res => {
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
    // 分发
    toDistribute (item) {
      const teaUUID = this.getUserId
      let expID
      this.$Modal.confirm({
        title: '选择实验',
        render: (h) => {
          return h('Select', {
            props: {
              value: 1
            },
            on: {
              'on-change': (val) => {
                expID = val
              }
            }
          }, this.exps.map((d) => {
            return h('Option', {
              props: {
                value: d.value,
                label: d.label
              }
            })
          })
          )
        },
        onOk: () => {
          if (expID) {
            sendTeaWayBill({ teaUUID: teaUUID, bwbIDs: item.bwbID, expID: expID, carType: item.carType, receptType: item.receptType }).then(res => {
              this.resultHandler(res)
            })
          } else {
            this.$Message.error('请选择实验')
          }
        }
      })
    },
    // 添加
    toAdd () {
      this.editable = true
      this.$refs.editItemForm.handleReset('editItemForm')
    },
    // 编辑
    toEdit (item) {
      this.editable = true
      this.$refs.editItemForm.editFormData(item)
    },
    getBatchIds () {
      if (this.multItem && this.multItem.length > 0) {
        const itemIds = []
        this.multItem.forEach((k, v) => {
          itemIds.push(k.key1)
        })
        return itemIds
      } else {
        this.$Message.error('请选择数据')
      }
    },
    // 删除
    doDelete (item) {
      const teaUUID = this.getUserId
      delTeaWayBill({ teaUUID: teaUUID, bwbIDs: item.bwbID }).then(res => {
        this.resultHandler(res)
      })
    },
    handleSubmit (info) {
      const teaUUID = this.getUserId
      let item = { ...info, teaUUID }
      if (!item.bwbID) {
        adTeaWayBill(item).then(res => {
          this.resultHandler(res)
        })
      } else {
        updTeaWayBill(item).then(res => {
          this.resultHandler(res)
        })
      }
    },
    resultHandler (res) {
      const body = res.data
      const data = body.Data
      if (body.Status === 2000) {
        this.formCancelEvent()
        this.toHandleSearch()
        this.$Message.success(data.Result)
      } else {
        this.$Message.error(data.ErrorDes)
      }
    },
    // 表单弹窗的状态
    watchEditableChange (e) {
      if (e === false) {
        this.editable = false
      }
    },
    // 弹出事件
    formConfirmEvent () {
      this.editable = false
    },
    // 弹窗消失⌚
    formCancelEvent () {
      this.editable = false
    }
  }
}
</script>
