<template>
    <div slot="content">
      <search-form btnName="搜索" :searchData="searchData" :labelShow="true" :labelWidth="90" @handleFormSubmit="handleSearch" ></search-form>
      <table-paging :columns="columns" :data="list" :distance="distance" @selectChange="selectChange" @changePage="changePage" @changePageSize="changePageSize" :pagination="pagination">
        <div slot="toolButtons">
          <Button type="text" @click="doRePass">密码初始化</Button>
          <Button type="primary" @click="doAdd">新增</Button>
          <Button type="error" @click="doBatchDelete">批量删除</Button>
          <Button type="warning" @click="doAuth">审核</Button>
        </div>
      </table-paging>
      <teacher-edit :editable="editable" @formConfirmEvent="formConfirmEvent" @formCancelEvent="formCancelEvent" @watchEditableChange="watchEditableChange"/>
    </div>
</template>
<script>
import {
  getTeaList
} from '@/api/admin.data'
import SearchForm from '../../components/search-from/search-from'
import TablePaging from '../../components/table-paging/table-paging'
import TeacherEdit from './teacher-edit'

export default {
  components: {
    TablePaging, SearchForm, TeacherEdit
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
      distance: '272px',
      list: [],
      columns: [
        {
          type: 'selection', width: 60, align: 'center'
        },
        {
          key: 'loginName', combine: true, title: '用户名'
        },
        {
          key: 'userName', combine: true, title: '姓名'
        },
        {
          key: 'userTel', title: '手机'
        },
        {
          key: 'userSex', combine: true, title: '性别',
          render: (h, params) => {
            // 状态：0 未审核 1 正常 2 禁用
            let userSex = params.row.userSex
            let userSexTxt = '男'
            if (userSex === 2) {
              userSexTxt = '女'
            }
            return h('div', userSexTxt)
          }
        },
        {
          key: 'state', combine: true, title: '状态',
          render: (h, params) => {
            // 状态：0 未审核 1 正常 2 禁用
            let state = params.row.state
            let stateTxt = '禁用'
            if (state === 0) {
              stateTxt = '未审核'
            } else if (state === 1) {
              stateTxt = '正常'
            }
            return h('div', stateTxt)
          }
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
              btn('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    // this.remove(params)
                    alert(params.row.key1)
                    const _this = this
                    this.$Modal.confirm({
                      content: '确认审核？',
                      onOk: function () {
                        _this.deleteUser(params)
                      }
                    })
                  }
                }
              }, '审核'),
              btn('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.edit(params)
                  }
                }
              }, '修改'),
              btn('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    // this.remove(params)
                    const _this = this
                    this.$Modal.confirm({
                      content: '确认删除？',
                      onOk: function () {
                        _this.deleteUser(params)
                      }
                    })
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  mounted: function () {
    this.handleSearch('')
  },
  methods: {
    // 搜索
    handleSearch (search) {
      console.log('search', search)
      getTeaList(search).then(res => {
        const body = res.data
        // commit('setToken', data.token)
        if (body.Status === 2000) {
          const data = body.Data
          console.log(data)
          this.list = data.datas || []
          this.pagination = {
            total: data.total,
            pageSize: data.pageSize,
            currentPage: data.page
          }
          console.log(this.pagination)
        } else {
        }
      })
    },
    // 选中对象切换
    selectChange (value) {
      this.multItem = value
      console.log('selectChange', value)
    },
    // 切换页面
    changePage (page) {
      console.log('page', page)
    },
    // 切换页面size
    changePageSize (pageSize) {
      console.log('pageSize', pageSize)
    },
    // 列表方法
    doRePass () {
      this.$Message.success('密码初始化完成')
    },
    // 添加老师
    doAdd () {
      this.editable = true
    },
    // 批量删除
    doBatchDelete () {
      if (this.multItem) {
        const userIds = []
        this.multItem.forEach((k, v) => {
          userIds.push(k.key1)
        })
        console.log(userIds)

        this.$Modal.confirm({
          title: '批量删除',
          content: '确定删除？',
          onOk: function () {
            this.$Message.success('删除完成')
          }
        })
      }
    },
    // 批量审核
    doAuth () {
      this.$Modal.confirm({
        title: '审核',
        content: '确定审核？',
        onOk: function () {
          this.$Message.success('审核完成')
        }
      })
    },
    // 表单弹窗的状态
    watchEditableChange (e) {
      console.log(e)
      if (e === false) {
        this.editable = false
      };
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
