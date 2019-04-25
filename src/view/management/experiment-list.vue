<template>
  <div slot="content">
    <form-create ref="fc" v-model="searchApi" :rule="searchRule" :option="searchOption" class="qib-form"></form-create>
    <table-paging :columns="columns" :data="list" @selectChange="selectChange" @changePageNum="changePageNum" @changePageSize="changePageSize" :pagination="pagination">
      <div slot="topTools">
        <Button type="primary" @click="toAdd">添加实验</Button>
      </div>
    </table-paging>
    <experiment-edit ref="editItemForm" :editable="editable" @formConfirmEvent="formConfirmEvent" @formCancelEvent="formCancelEvent" @watchEditableChange="watchEditableChange" @onSuccessValid="handleSubmit"/>
  </div>
</template>
<script>
import {
  getExpList,
  adExp,
  updExp,
  delExp,
  setExpState
} from '@/api/teacher.data'
import SearchForm from '../../components/search-from/search-from'
import TablePaging from '../../components/table-paging/table-paging'
import ExperimentEdit from './experiment-edit'
import { maker } from 'form-create'

export default {
  components: {
    TablePaging, SearchForm, ExperimentEdit
  },
  data () {
    return {
      loading: false,
      editable: false,
      searchApi: {},
      searchModel: {},
      // 表单生成规则
      searchRule: [
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
      stateMap: { 0: '未初始化', 1: '完成初始化', 2: '开始', 4: '关闭' },
      nextStateMap: { 0: '初始化', 1: '开始', 2: '关闭', 4: '开始' },
      list: [],
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          key: 'expName', combine: true, title: '实验名称'
        },
        {
          key: 'classNames', combine: true, title: '班级'
        },
        {
          key: 'state',
          combine: true,
          title: '实验状态',
          render: (h, params) => {
            // 状态：0：未初始化；1：完成初始化；2：开始；4：关闭
            let state = params.row.state
            return h('div', this.stateMap[state])
          }
        },
        {
          key: 'upTime', combine: true, title: '更新时间'
        },
        {
          title: '操作',
          key: 'action',
          // fixed: 'right',
          width: 180,
          render: (btn, params) => {
            let btns = []
            btns.push(btn('Poptip', {
              props: {
                transfer: true,
                confirm: true,
                type: 'warning',
                size: 'large',
                title: '你确定要' + this.nextStateMap[params.row.state] + '吗?'
              },
              on: {
                'on-ok': () => {
                  const _this = this
                  _this.doAuth(params.row)
                }
              }
            }, [
              btn('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                }
              }, this.nextStateMap[params.row.state])
            ]))
            btns.push(btn('Button', {
              props: {
                type: 'info',
                size: 'small'
              },
              on: {
                click: () => {
                  const _this = this
                  _this.toEdit(params.row)
                }
              },
              style: {
                marginRight: '5px'
              }
            }, '修改'))

            if (params.row.state !== 2) {
              btns.push(btn('Poptip', {
                props: {
                  transfer: true,
                  confirm: true,
                  type: 'error',
                  size: 'large',
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    const _this = this
                    _this.doDelete(params.row)
                  }
                }
              }, [
                btn('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  }
                }, '删除')
              ]))
            }
            return btn('div', btns)
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
    }
  },
  created: function () {

  },
  mounted: function () {
    this.searchModel = this.searchApi.model()
    this.toHandleSearch()
  },
  methods: {
    toHandleSearch () {
      this.doHandleSearch(this.searchApi.formData())
    },
    // 搜索
    doHandleSearch (search) {
      const UUID = this.getUserId
      const params = { ...search, ...this.pagination, UUID }
      getExpList(params).then(res => {
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
    // 列表方法
    doRePass () {
      this.$Message.success('密码初始化完成')
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
          itemIds.push(k.expID)
        })
        return itemIds
      } else {
        this.$Message.error('请选择数据')
      }
    },
    // 删除
    doDelete (item) {
      const UUID = this.getUserId
      delExp({ UUIDs: UUID, expID: item.expID }).then(res => {
        this.resultHandler(res)
      })
    },
    // 审核
    doAuth (item) {
      const UUID = this.getUserId
      let state = item.state
      // 0: '未初始化', 1: '完成初始化', 2: '开始', 4: '关闭'
      if (state === 0) {
        state = 1
      } else if (state === 1) {
        state = 2
      } else if (state === 2) {
        state = 4
      } else if (state === 4) {
        state = 2
      }

      setExpState({ UUID: UUID, expID: item.expID, state: state }).then(res => {
        this.resultHandler(res)
      })
    },
    handleSubmit (info) {
      const UUID = this.getUserId
      let item = { ...info, UUID }
      if (!item.expID) {
        adExp(item).then(res => {
          this.resultHandler(res)
        })
      } else {
        updExp(item).then(res => {
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
    },
    // 审核或者禁用
    auditOrDisable () {

    }
  }
}
</script>
