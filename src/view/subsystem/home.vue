<template>
  <Card :bordered="false">
    <search-form btnName="搜索" :searchData="searchData" :labelShow="true" :labelWidth="90" @handleFormSubmit="handleSearch" ></search-form>
    <table-paging :columns="columns" :data="list" :distance="distance" @selectChange="selectChange" @changePage="changePage" @changePageSize="changePageSize">
    </table-paging>
  </Card>
</template>
<script>
import SearchForm from '../../components/search-from/search-from'
import TablePaging from '../../components/table-paging/table-paging'
import { mapActions } from 'vuex'
export default {
  components: {
    TablePaging, SearchForm
  },
  data () {
    return {
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
      distance: '220px',
      list: [
        {
          key1: '整车发货练习1',
          key2: '一班、二班',
          key3: '2018-12-10',
          key4: '未初始化'
        },
        {
          key1: '整车发货练习2',
          key2: '一班',
          key3: '2018-12-10',
          key4: '开启'
        },
        {
          key1: '整车发货练习2',
          key2: '二班',
          key3: '2018-12-10',
          key4: '关闭'
        }
      ],
      columns: [
        {
          type: 'index',
          width: 60,
          align: 'center',
          title: '序号'
        },
        {
          key: 'key1', combine: true, title: '实验名称'
        },
        {
          key: 'key2', combine: true, title: '参与班级'
        },
        {
          key: 'key3', combine: true, title: '更新时间'
        },
        {
          key: 'key4', combine: true, title: '状态'
        },
        {
          title: '操作',
          key: 'action',
          // fixed: 'right',
          width: 120,
          render: (btn, params) => {
            return btn('div', [
              btn('Button', {
                props: {
                  type: 'primary'
                },
                on: {
                  click: () => {
                    this.toSubsystem(88)
                    // this.remove(params)
                    // const _this = this

                    /* this.$Modal.confirm({
                        content: '确认删除？',
                        onOk: function () {
                          _this.deleteUser(params)
                        }
                      }) */
                    // _this.$router.push('maketicketsystem/20')
                  }
                }
              }, '进入实验')
            ])
          }
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'handleExperiment'
    ]),
    toSubsystem (experiment_id) {
      this.handleExperiment({ experiment_id }).then(res => {
        this.$router.push('/front/guide')
      })
    },
    handleSearch (search) {
      console.log('search', search)
    },
    selectChange (value) {
      this.multItem = value
      console.log('selectChange', value)
    },
    changePage (page) {
      console.log('page', page)
    },
    changePageSize (pageSize) {
      console.log('pageSize', pageSize)
    }
  }
}
</script>
