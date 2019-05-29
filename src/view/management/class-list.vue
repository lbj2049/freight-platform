<template>
  <div slot="content">
    <search-form ref="searchForm" btnName="搜索" :searchData="searchData" :labelShow="true" :labelWidth="90" @handleFormSubmit="doHandleSearch" ></search-form>
    <table-paging :columns="columns" :data="list" :distance="distance" @selectChange="selectChange" @changePageNum="changePageNum" @changePageSize="changePageSize" :pagination="pagination">
      <div slot="topTools">
        <Button type="primary" @click="toAdd">新增</Button>
      </div>
    </table-paging>
    <class-edit ref="editClassForm" :editable="editable" @formConfirmEvent="formConfirmEvent" @formCancelEvent="formCancelEvent" @watchEditableChange="watchEditableChange" @onSuccessValid="handleSubmit"/>
  </div>
</template>
<script>
import {
  getClassList,
  addClassInfo,
  editClassInfo,
  delClassInfo
} from '@/api/teacher.data'
import SearchForm from '../../components/search-from/search-from'
import TablePaging from '../../components/table-paging/table-paging'
import ClassEdit from './class-edit'

export default {
  components: {
    TablePaging, SearchForm, ClassEdit
  },
  data () {
    return {
      loading: false,
      editable: false,
      multItem: [],
      searchData: [
        {
          type: 'input',
          value: 'keyword',
          clearable: true,
          // prefix: 'ios-contact',
          suffix: 'ios-search',
          // required: true,
          placeholder: '关键词'
        }
      ],
      distance: '282px',
      list: [],
      columns: [
        {
          type: 'index', width: 60, align: 'center'
        },
        {
          key: 'className', combine: true, title: '班级名称'
        },
        {
          title: '操作',
          key: 'action',
          // fixed: 'right',
          className: 'btn-ops',
          align: 'center',
          width: 180,
          render: (btn, params) => {
            return btn('div', [
              /*
              btn('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                on: {
                  click: () => {
                    const _this = this
                    _this.doAuth(params.row)
                  }
                }
              }, '审核'),
              */
              btn('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  click: () => {
                    const _this = this
                    _this.toEdit(params.row)
                  }
                }
              }, '修改'),
              btn('Poptip', {
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
                  },
                  style: {
                    marginRight: '5px'
                  }
                }, '删除')
              ])
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
    }
  },
  mounted: function () {
    this.toHandleSearch()
  },
  methods: {
    toHandleSearch () {
      this.$refs.searchForm.handleSubmit('submitForm')
    },
    // 搜索
    doHandleSearch (search) {
      const UUID = this.getUserId
      let params = { ...search, ...this.pagination, UUID }
      getClassList(params).then(res => {
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
    // 添加
    toAdd () {
      this.editable = true
      // this.$refs.editClassForm.editFormData({})
      this.$refs.editClassForm.handleReset('editClassForm')
    },
    // 编辑
    toEdit (item) {
      this.editable = true
      this.$refs.editClassForm.editFormData(item)
    },
    getBatchIds () {
      if (this.multItem && this.multItem.length > 0) {
        const itemIds = []
        this.multItem.forEach((k, v) => {
          itemIds.push(k.classID)
        })
        return itemIds
      } else {
        this.$Message.error('请选择数据')
      }
    },
    // 删除
    doDelete (item) {
      delClassInfo({ classID: item.classID }).then(res => {
        this.resultHandler(res)
      })
    },
    handleSubmit (classInfo) {
      const info = { ...classInfo }
      if (!info.classID) {
        addClassInfo(classInfo).then(res => {
          this.resultHandler(res)
        })
      } else {
        editClassInfo(classInfo).then(res => {
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
        this.multItem = []
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
