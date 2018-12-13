<template>
    <div slot="content">
      <search-form btnName="搜索" :searchData="searchData" :labelShow="true" :labelWidth="90" @handleFormSubmit="handleSearch" ></search-form>
      <table-paging :columns="columns" :data="list" @selectChange="selectChange" @changePage="changePage" @changePageSize="changePageSize"></table-paging>
    </div>
</template>
<script>
import SearchForm from '../../components/search-from/search-from'
import TablePaging from '../../components/table-paging/table-paging'
export default {
  components: {
    TablePaging, SearchForm
  },
  data () {
    return {
      searchData: [
        {
          type: "input",
          value: "input",
          clearable: true,
          // prefix: "ios-contact",
          suffix: "ios-search",
          // required: true,
          placeholder: "关键词"
        }
      ],
      list: [
        {
          key1: "aaa",
          key2: "bbb",
          key3: "ccc"
        },
        {
          key1: "aaa",
          key2: "bbb",
          key3: "ccc"
        },
        {
          key1: "111",
          key2: "222",
          key3: "333"
        },
        {
          key1: "111",
          key2: "222",
          key3: "333"
        },
        {
          key1: "111",
          key2: "222",
          key3: "333"
        },
        {
          key1: "111",
          key2: "222",
          key3: "333"
        }
      ],
      columns: [
        {
          type: "selection", width: 60, align: "center"
        },
        {
          key: "key1", combine: true, title: "用户名"
        },
        {
          key: "key3", combine: true, title: "姓名"
        },
        {
          key: "key2", title: "手机"
        },
        {
          key: "key3", combine: true, title: "性别"
        },
        {
          key: "key3", combine: true, title: "状态"
        },
        {
          title: '操作',
          key: 'action',
          // fixed: 'right',
          width: 120,
          render: (h, params) => {
            return h('div', [
              h('Button', {
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
              }, '删除'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.edit(params)
                  }
                }
              }, '修改')
            ]);
          }
        }
      ]
    }
  },
  methods: {
    handleSearch (search) {
      console.log("search", search)
    },
    selectChange (value) {
      console.log("selectChange", value)
    },
    changePage (page) {
      console.log("page", page)
    },
    changePageSize (pageSize) {
      console.log("pageSize", pageSize)
    }
  }
}
</script>
