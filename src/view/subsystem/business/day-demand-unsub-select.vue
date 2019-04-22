<!-- 日 需求退订 查询 -->

<template>
  <div slot="content">
    <Card :dis-hover="true">
      <p slot="title">查询</p>
      <day-demand-unsub-search-form @handleToHandleSearch="doHandleSearch"/>
    </Card>
    <table-paging :columns="columns" :data="list" :distance="distance" @selectChange="selectChange" @changePageNum="changePageNum" @changePageSize="changePageSize"></table-paging>
  </div>
</template>
<script>
import {
  getTDWayBillList
} from '@/api/business.data'
import TablePaging from '@/components/table-paging/table-paging'
import DayDemandUnsubSearchForm from './day-demand-unsub-search-form'
export default {
  components: {
    DayDemandUnsubSearchForm,
    TablePaging
  },
  data () {
    return {
      distance: '312px',
      list: [
        {
          key1: 'aaa',
          key2: 'bbb',
          key3: 'ccc'
        },
        {
          key1: 'aaa',
          key2: 'bbb',
          key3: 'ccc'
        },
        {
          key1: '111',
          key2: '222',
          key3: '333'
        },
        {
          key1: '111',
          key2: '222',
          key3: '333'
        },
        {
          key1: '111',
          key2: '222',
          key3: '333'
        },
        {
          key1: '111',
          key2: '222',
          key3: '333'
        }
      ],
      columns: [
        {
          key: 'key1', combine: true, title: '托运信息'
        },
        {
          key: 'key1', combine: true, title: '搬运日期'
        },
        {
          title: '操作',
          key: 'action',
          // fixed: 'right',
          width: 120,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: { type: 'error', size: 'small' }
              }, [
                h('Poptip', {
                  props: { confirm: true, transfer: true, placement: 'left-end', title: '确定要删除吗！', type: 'error', size: 'small', width: '300' },
                  on: {
                    'on-ok': () => {
                      this.$Message.info('点击了确定')
                    },
                    'on-cancel': () => {
                      this.$Message.info('点击了取消')
                    }
                  }
                }, '删除')
              ]),
              h('Button', {
                props: { type: 'info', size: 'small' },
                on: {
                  click: () => {
                    this.edit(params)
                  }
                }
              }, '修改')
            ])
          }

        }
      ]
    }
  },
  computed: {
    getUserId () {
      return this.$store.state.user.userId
    }
  },
  methods: {
    remove (value) {
      console.log('remove', value)
    },
    edit (value) {
      console.log('edit', value)
    },
    doHandleSearch (search) {
      const UUID = this.getUserId
      let params = { UUID, ...search, ...this.pagination }
      getTDWayBillList(params).then(res => {
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
      console.log('selectChange', value)
    },
    changePageNum (page) {
      console.log('page', page)
    },
    changePageSize (pageSize) {
      console.log('pageSize', pageSize)
    }
  }
}
</script>
