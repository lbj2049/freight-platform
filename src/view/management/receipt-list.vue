<template>
  <div slot="content">
    <search-form btnName="搜索" :searchData="searchData" :labelShow="true" :labelWidth="90" @handleFormSubmit="handleSearch" ></search-form>
    <table-paging :columns="columns" :data="list" @selectChange="selectChange" @changePageNum="changePageNum" @changePageSize="changePageSize">
      <div slot="toolButtons">
        <Button type="primary" @click="doAdd">添加收货单</Button>
      </div>
    </table-paging>

    <receipt-edit :editable="editable" @formConfirmEvent="formConfirmEvent" @formCancelEvent="formCancelEvent" @watchEditableChange="watchEditableChange"/>
  </div>
</template>
<script>
import SearchForm from '../../components/search-from/search-from'
import TablePaging from '../../components/table-paging/table-paging'
import ReceiptEdit from './receipt-edit'
export default {
  components: {
    TablePaging, SearchForm, ReceiptEdit
  },
  data () {
    return {
      editable: false,
      searchData: [
        {
          type: 'input',
          value: 'input',
          clearable: true,
          // prefix: 'ios-contact',
          suffix: 'ios-search',
          // required: true,
          placeholder: '关键词'
        }
      ],
      list: [
        {
          key1: '收货1',
          key2: '整车',
          key3: '2018-12-12',
          key4: '分发'
        },
        {
          key1: '收货2',
          key2: '整车',
          key3: '2018-12-12',
          key4: '分发'
        },
        {
          key1: '收货3',
          key2: '整车',
          key3: '2018-12-12',
          key4: '分发'
        },
        {
          key1: '收货4',
          key2: '整车',
          key3: '2018-12-12',
          key4: '分发'
        },
        {
          key1: '收货5',
          key2: '整车',
          key3: '2018-12-12',
          key4: '分发'
        },
        {
          key1: '收货6',
          key2: '整车',
          key3: '2018-12-12',
          key4: '分发'
        }
      ],
      columns: [
        {
          key: 'key1', combine: true, title: '收货单名称'
        },
        {
          key: 'key2', combine: true, title: '车种'
        },
        {
          key: 'key1', combine: true, title: '更新时间'
        },
        {
          key: 'key1', combine: true, title: '状态'
        },
        {
          title: '操作',
          key: 'action',
          // fixed: 'right',
          width: 180,
          render: (btn, params) => {
            return btn('div', [
              btn('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$Modal.confirm({
                      title: '分发',
                      content: '确定分发？',
                      onOk: function () {
                        this.$Message.success('分发完成')
                      }
                    })
                  }
                }
              }, '分发'),
              btn('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.doEdit(params)
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
      ]
    }
  },
  methods: {
    handleSearch (search) {
      console.log('search', search)
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
    },
    doAdd () {
      this.faultClickEvent()
    },
    doEdit (param) {
      console.log(param.row)
      // this.showUserEditModal()
    },
    /* 表单弹窗事件 */
    // 表单弹窗的状态
    watchEditableChange (e) {
      console.log(e)
      if (e === false) {
        this.editable = false
      };
    },
    // 点击事件
    faultClickEvent () {
      this.editable = true
    },
    // 弹出层的事件
    formConfirmEvent () {
      this.editable = false
    },
    formCancelEvent () {
      this.editable = false
    }
  }
}
</script>
